import os
import subprocess
from PIL import Image
from tqdm import tqdm

def compress_image(image_path, quality=75):
    original_size = os.path.getsize(image_path)
    with Image.open(image_path) as img:
        if img.format == 'PNG':
            # Use pngquant for PNG files
            subprocess.run(['pngquant', '--force', '--output', image_path, '--quality', f'{quality}-100', image_path])
        elif img.format == 'JPEG':
            img.save(image_path, quality=quality, optimize=True)
        else:
            img.save(image_path, optimize=True)

    new_size = os.path.getsize(image_path)
    return original_size - new_size

def process_directory(directory):
    total_saved = 0
    image_files = []

    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_files.append(os.path.join(root, file))

    for image_path in tqdm(image_files, desc="Compressing images"):
        saved = compress_image(image_path)
        total_saved += saved

    return total_saved

if __name__ == '__main__':
    directory = '/Users/tommasoprinetti/Library/CloudStorage/OneDrive-PolitecnicodiMilano/Desktop/PORTFOLIOS/CODING_WEBPORTFOLIO/ROOT/IMAGES'  # Change this to your directory
    total_saved = process_directory(directory)
    print(f"Total space saved: {total_saved / (1024 * 1024):.2f} MB")
