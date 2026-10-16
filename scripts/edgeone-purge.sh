#!/usr/bin/env bash
#
# scripts/edgeone-purge.sh —— 通过 EdgeOne OpenAPI 操作 CDN
#
# 用法:
#   # 首次接入: 列出账号下所有 zone,挑一个 ZoneId 配进 GitHub Secrets
#   TENCENT_CLOUD_SECRET_ID=AKIDxxx TENCENT_CLOUD_SECRET_KEY=xxx \
#     ./scripts/edgeone-purge.sh --list-zones
#
#   # 清除 CDN URL 缓存
#   TENCENT_CLOUD_SECRET_ID=AKIDxxx TENCENT_CLOUD_SECRET_KEY=xxx \
#   ZONE_ID=zone-2xxxxxxxx \
#   TARGETS="https://tools.imjz.net/ https://tools.imjz.net/index.html" \
#     ./scripts/edgeone-purge.sh
#
#   # 调试签名(不发请求):两个 flag 可任意组合
#   ./scripts/edgeone-purge.sh --list-zones --dry-run
#
# flag:
#   --dry-run      算签名但不调 API
#   --list-zones   跑 DescribeZones,输出 zone_id / zone_name / status 三列
#
# CAM 权限:
#   list-zones:   teo:DescribeZones
#   purge:        teo:CreatePurgeTask
#
# 注意: 只清 HTML 入口;hash 命名的 assets/*.js|.css 不要清。

set -euo pipefail

DRY_RUN=0
LIST_ZONES=0
LIST_JSON=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --list-zones) LIST_ZONES=1 ;;
    --json) LIST_JSON=1 ;;
    *) echo "unknown flag: $arg" >&2; exit 2 ;;
  esac
done

: "${TENCENT_CLOUD_SECRET_ID:?must set TENCENT_CLOUD_SECRET_ID}"
: "${TENCENT_CLOUD_SECRET_KEY:?must set TENCENT_CLOUD_SECRET_KEY}"

if [[ $LIST_ZONES -eq 0 ]]; then
  : "${ZONE_ID:?must set ZONE_ID}"
  : "${TARGETS:?must set TARGETS (space-separated URLs)}"
fi

HOST="${EDGEONE_API_HOST:-teo.tencentcloudapi.com}"
SERVICE="teo"
VERSION="2022-09-01"
REGION="${EDGEONE_REGION:-ap-beijing}"
ALGO="TC3-HMAC-SHA256"

if [[ $LIST_ZONES -eq 1 ]]; then
  ACTION="DescribeZones"
  PAYLOAD='{}'
else
  ACTION="CreatePurgeTask"
  # TEO CreatePurgeTask 的 Type:
  #   purge_url      URL 刷新(我们这个场景)
  #   purge_prefix   目录刷新
  #   purge_host     Hostname 刷新
  #   purge_all      站点下全部缓存
  #   purge_cache_tag cache-tag 刷新
  # Method(invalidate / delete)只对 prefix/host/all 生效,URL 刷新不能带,带了就 InvalidParameterValue
  TARGETS_JSON=$(printf '%s\n' "$TARGETS" | tr ' ' '\n' | jq -R . | jq -s 'map(select(length > 0))')
  PAYLOAD=$(jq -nc \
    --arg zone "$ZONE_ID" \
    --argjson targets "$TARGETS_JSON" \
    '{ZoneId: $zone, Type: "purge_url", Targets: $targets}')
fi

TS=$(date +%s)
# Linux GNU date: -d "@TS";macOS BSD fallback: -r TS
# Linux GNU date: -d "@TS" +format;macOS BSD fallback: -r TS +format
DATE=$(date -u -d "@$TS" +%Y-%m-%d 2>/dev/null || date -u -r "$TS" +%Y-%m-%d)

# 用 -binary + xxd -p 拿字节级 hex,避开不同 openssl 版本的输出格式(token 数、大小写)差异
sha256_hex() { openssl dgst -sha256 -binary 2>/dev/null | xxd -p -c 256; }
# 第一次 HMAC:key 是用户 secret_key("TC3" + secret_key) 的明文字符串,用 key: 透传
hmac_sha256_hex() {
  local key="$1"
  openssl dgst -sha256 -mac HMAC -macopt "key:${key}" -binary 2>/dev/null | xxd -p -c 256
}
# 后续 HMAC:key 是上一轮 .hex() 的字符串,需要先按 hex 解码成 32 字节二进制才能当 key 用;
# 走 key: 会把 64 字符 hex 当成 64 字节的 key,sig 就完全错位 —— 之前 CI 一直 SignatureFailure
# 就是这个原因。hexkey: 让 openssl 自己 decode
hmac_sha256_hexkey() {
  local hexkey="$1"
  openssl dgst -sha256 -mac HMAC -macopt "hexkey:${hexkey}" -binary 2>/dev/null | xxd -p -c 256
}

HASHED_PAYLOAD=$(printf '%s' "$PAYLOAD" | sha256_hex)

# 腾讯 TC3 官方 SDK (Python / Go) 都只签 content-type;host,x-tc-action 不进签名
# 跟着 SDK 走;TEO/CVM 等 API 服务端都按这个格式验签
CANONICAL_HEADERS=$'content-type:application/json; charset=utf-8\nhost:'"$HOST"$'\n'
SIGNED_HEADERS="content-type;host"

# 7 行: method / uri / 空行(= 空 query) / canonical-headers / 空行 /
# signed-headers / hashed-payload
# 公式 CanonicalHeaders + "\n" + SignedHeaders 要求 headers 和 signed-headers
# 之间有一个空行(双 \n)
CANONICAL_REQ="POST
/

${CANONICAL_HEADERS}
${SIGNED_HEADERS}
${HASHED_PAYLOAD}"

HASHED_CANONICAL=$(printf '%s' "$CANONICAL_REQ" | sha256_hex)

CREDENTIAL_SCOPE="${DATE}/${SERVICE}/tc3_request"
STRING_TO_SIGN="${ALGO}
${TS}
${CREDENTIAL_SCOPE}
${HASHED_CANONICAL}"

SECRET_DATE=$(printf '%s' "$DATE" | hmac_sha256_hex "TC3${TENCENT_CLOUD_SECRET_KEY}")
SECRET_SERVICE=$(printf '%s' "$SERVICE" | hmac_sha256_hexkey "$SECRET_DATE")
SECRET_SIGNING=$(printf '%s' "tc3_request" | hmac_sha256_hexkey "$SECRET_SERVICE")
SIGNATURE=$(printf '%s' "$STRING_TO_SIGN" | hmac_sha256_hexkey "$SECRET_SIGNING")

AUTH="${ALGO} Credential=${TENCENT_CLOUD_SECRET_ID}/${CREDENTIAL_SCOPE}, SignedHeaders=${SIGNED_HEADERS}, Signature=${SIGNATURE}"

if [[ $DRY_RUN -eq 1 ]]; then
  printf '== DRY RUN ==\nendpoint: https://%s/\naction:   %s\n' "$HOST" "$ACTION"
  if [[ $LIST_ZONES -eq 0 ]]; then
    printf 'zone:     %s\nregion:   %s\n' "$ZONE_ID" "$REGION"
  fi
  printf 'payload:  %s\nsignature:%s\n== END ==\n' "$PAYLOAD" "$SIGNATURE"
  exit 0
fi

resp=$(curl -fsS -X POST "https://${HOST}/" \
  -H "Authorization: ${AUTH}" \
  -H "Content-Type: application/json; charset=utf-8" \
  -H "Host: ${HOST}" \
  -H "X-TC-Action: ${ACTION}" \
  -H "X-TC-Timestamp: ${TS}" \
  -H "X-TC-Version: ${VERSION}" \
  -H "X-TC-Region: ${REGION}" \
  -d "$PAYLOAD")

if [[ $LIST_ZONES -eq 1 ]]; then
  if [[ $LIST_JSON -eq 1 ]]; then
    echo "$resp" | jq '.Response.Zones[]?'
  else
    echo "$resp" | jq -r '.Response.Zones[]? | [.ZoneId, .ZoneName, (.Status // "?")] | @tsv'
  fi
  exit 0
fi

err_code=$(echo "$resp" | jq -r '.Response.Error.Code // empty')
if [[ -n "$err_code" ]]; then
  err_msg=$(echo "$resp" | jq -r '.Response.Error.Message')
  echo "EdgeOne API error: ${err_code} — ${err_msg}" >&2
  exit 1
fi

echo "$resp" | jq '.Response'
