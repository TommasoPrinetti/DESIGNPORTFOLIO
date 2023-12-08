import os
from PIL import Image

def compress_image(image_path):
    with Image.open(image_path) as img:
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img.save(image_path, quality=90, optimize=True)

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_path = os.path.join(root, file)
                print(f'Compressing {image_path}...')
                compress_image(image_path)

if __name__ == '__main__':
    directory = 'path/to/your/folder'  # Change this to your directory
    process_directory(directory)
