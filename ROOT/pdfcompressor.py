import pikepdf
from tqdm import tqdm

def compress_pdf(input_path, output_path, quality):
    pdf = pikepdf.open(input_path)

    # Reducing image quality
    for image in tqdm(pdf.pages.images, desc="Compressing Images"):
        # Modify image here - this requires an understanding of image formats and compression
        pass

    # Remove unnecessary objects
    # This might include fonts, metadata, etc.

    # Save compressed PDF
    pdf.save(output_path, compression=pikepdf.CompressionLevel(quality))

input_pdf = '/Users/tommasoprinetti/Library/CloudStorage/OneDrive-PolitecnicodiMilano/Desktop/portfolio_fullsize.pdf'
output_pdf = '/Users/tommasoprinetti/Library/CloudStorage/OneDrive-PolitecnicodiMilano/Desktop/portfolio_compressionpy.pdf'
target_quality = 'default' # You can adjust this based on experimentation

compress_pdf(input_pdf, output_pdf, target_quality)
