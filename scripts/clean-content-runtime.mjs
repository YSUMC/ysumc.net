import { rmSync } from 'node:fs'

rmSync(new URL('../.output/public/__nuxt_content/', import.meta.url), { recursive: true, force: true })
