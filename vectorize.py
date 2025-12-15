import cv2
import numpy as np

# Load image
img = cv2.imread('Menu.jpeg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Edge detection
edges = cv2.Canny(gray, 50, 150)

# Find contours
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Create SVG
svg = '<svg width="{}" height="{}" xmlns="http://www.w3.org/2000/svg">\n'.format(img.shape[1], img.shape[0])

for contour in contours:
    if len(contour) > 2:  # At least 3 points for a path
        path = 'M {} {} '.format(contour[0][0][0], contour[0][0][1])
        for point in contour[1:]:
            path += 'L {} {} '.format(point[0][0], point[0][1])
        path += 'Z'  # Close path
        svg += '<path d="{}" fill="none" stroke="black" stroke-width="1"/>\n'.format(path)

svg += '</svg>'

with open('Menu_vector.svg', 'w') as f:
    f.write(svg)
