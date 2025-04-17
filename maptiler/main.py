from PIL import Image
import os

def generate_tiles(image_path, output_dir, tile_size, max_zoom):
    """
    生成不同缩放等级的瓦片。

    :param image_path: 输入图片路径
    :param output_dir: 瓦片保存目录
    :param tile_size: 瓦片大小 (宽, 高)
    :param max_zoom: 最大缩放等级
    """
    # 打开原始图片
    img = Image.open(image_path).convert("RGBA")

    # 计算图片的新尺寸，使其宽高均为 tile_size 的整数倍
    new_width = (img.width + tile_size[0] - 1) // tile_size[0] * tile_size[0]
    new_height = (img.height + tile_size[1] - 1) // tile_size[1] * tile_size[1]

    # 创建一个新的透明背景图片
    new_img = Image.new("RGBA", (new_width, new_height), (0, 0, 0, 0))
    new_img.paste(img, (0, 0))

    # 遍历缩放等级
    for zoom in range(max_zoom + 2):
        # 缩放图片
        if zoom < max_zoom:
            scale = 2 ** (max_zoom - zoom)
            zoom_width = new_img.width // scale
            zoom_height = new_img.height // scale
            resized_img = new_img.resize((zoom_width, zoom_height), Image.Resampling.LANCZOS)
        else:
            # 缩放级别 5，使用临近采样放大原始图片
            scale = 2 ** (zoom - max_zoom)
            zoom_width = new_img.width * scale
            zoom_height = new_img.height * scale
            resized_img = new_img.resize((zoom_width, zoom_height), Image.Resampling.LANCZOS)

        # 创建当前缩放等级的目录
        zoom_dir = os.path.join(output_dir, f"zoom_{zoom}")
        os.makedirs(zoom_dir, exist_ok=True)

        # 瓦片化当前缩放等级的图片
        tile_count = 0
        for y in range(0, zoom_height, tile_size[1]):
            for x in range(0, zoom_width, tile_size[0]):
                # 定义瓦片区域
                box = (x, y, x + tile_size[0], y + tile_size[1])
                tile = resized_img.crop(box)

                # 保存瓦片
                tile_filename = os.path.join(zoom_dir, f"tile_{x // tile_size[0]}_{y // tile_size[1]}.webp")
                tile.save(tile_filename, format="WEBP")
                tile_count += 1

        print(f"缩放等级 {zoom} 完成，共生成 {tile_count} 个瓦片。")

# 示例用法
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    image_path = "full.png"  # 输入图片路径
    output_dir = "../docs/.vuepress/public/map/tiles/256/"           # 瓦片保存目录
    tile_size = (256, 256)         # 瓦片大小 (宽, 高)
    max_zoom = 4                   # 最大缩放等级

    generate_tiles(image_path, output_dir, tile_size, max_zoom)
