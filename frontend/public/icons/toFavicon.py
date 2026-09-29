import sys
from PIL import Image

if len(sys.argv) < 2:
    print("Usage: python convert.py <input_filename>")
    sys.exit(1)

input_file = sys.argv[1]

# Open the source image provided via command line
img = Image.open(input_file).convert("RGBA")

# Save as ICO with standard favicon sizes
img.save("favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print(f"Successfully converted {input_file} to favicon.ico")
