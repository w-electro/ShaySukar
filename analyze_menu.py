import easyocr
import cv2
from colorthief import ColorThief
from PIL import Image
import numpy as np

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

# Read image
img_path = 'Menu.jpeg'
img = cv2.imread(img_path)

# Extract text
results = reader.readtext(img)

text_lines = []
for (bbox, text, confidence) in results:
    if confidence > 0.5:  # Filter low confidence
        text_lines.append(text)

print("Extracted Text:")
for line in text_lines:
    print(line)

# Extract colors
ct = ColorThief(img_path)
dominant_color = ct.get_color(quality=1)
palette = ct.get_palette(color_count=5)

print("\nDominant Color (RGB):", dominant_color)
print("Color Palette:", palette)

# Get image size
img_pil = Image.open(img_path)
width, height = img_pil.size
print(f"\nImage Size: {width}x{height}")

# Save analysis to file
with open('menu_analysis.txt', 'w') as f:
    f.write("Extracted Text:\n")
    for line in text_lines:
        f.write(line + '\n')
    f.write(f"\nDominant Color: {dominant_color}\n")
    f.write(f"Palette: {palette}\n")
    f.write(f"Size: {width}x{height}\n")
