import re

file_path = "/Users/macbook/Desktop/TESLA WEBSITE/modely/design/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Strip any style="..." from any div with class gallery_asset--section
def clean_section(m):
    tag = m.group(0)
    return re.sub(r'\s+style="[^"]*"', '', tag)

content = re.sub(r'<div[^>]*gallery_asset--section[^>]*>', clean_section, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Completely stripped style attributes from all gallery_asset--section divs!")
