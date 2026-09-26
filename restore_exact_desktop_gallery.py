import re

# Read Desktop reference HTML file
with open("/Users/macbook/Desktop/Design Your Model Y _ Tesla.html", "r", encoding="utf-8") as f:
    desktop_html = f.read()

# Extract exact gallery HTML from desktop_html
start_tag = '<div class="gallery MainGallery-gallery.EXTERIOR is-active"'
start_idx = desktop_html.find(start_tag)
end_tag = '<div class="gallery-overlay">'
end_idx = desktop_html.find(end_tag, start_idx)

exact_gallery_html = desktop_html[start_idx:end_idx]

# Fix file path in exact_gallery_html (Design%20Your%20Model%20Y%20_%20Tesla_files/ -> Model Y _files/)
exact_gallery_html = exact_gallery_html.replace("Design%20Your%20Model%20Y%20_%20Tesla_files/", "Model Y _files/")

# Read local target index.html file
target_path = "/Users/macbook/Desktop/TESLA WEBSITE/modely/design/index.html"
with open(target_path, "r", encoding="utf-8") as f:
    target_html = f.read()

t_start_idx = target_html.find('<div class="gallery MainGallery-gallery.EXTERIOR is-active"')
t_end_idx = target_html.find('<div class="gallery-overlay">', t_start_idx)

# Replace target gallery HTML with exact_gallery_html
updated_html = target_html[:t_start_idx] + exact_gallery_html + target_html[t_end_idx:]

with open(target_path, "w", encoding="utf-8") as f:
    f.write(updated_html)

print("Successfully restored exact gallery HTML structure from Desktop file!")
