import re

# 1. Update modely/design/index.html CSS
html_path = "/Users/macbook/Desktop/TESLA WEBSITE/modely/design/index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html_text = f.read()

target_css = """    .gallery_asset--section {
      position: absolute !important;
      inset: 0 !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
    }
    .gallery_asset--section.is-active {
      display: flex !important;
      opacity: 1 !important;
      visibility: visible !important;
      z-index: 2 !important;
      pointer-events: auto !important;
    }"""

new_css = """    .gallery_asset--section {
      position: absolute !important;
      inset: 0 !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.4s ease-in-out !important;
      transform: scale(0.98) !important;
    }
    .gallery_asset--section.is-active {
      display: flex !important;
      opacity: 1 !important;
      visibility: visible !important;
      z-index: 2 !important;
      pointer-events: auto !important;
      transform: scale(1) !important;
    }"""

if target_css in html_text:
    html_text = html_text.replace(target_css, new_css)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_text)
    print("Updated index.html carousel CSS successfully!")
else:
    print("target_css in index.html not found!")

# 2. Update modely-interactive.js showSlide implementation
js_path = "/Users/macbook/Desktop/TESLA WEBSITE/modely/design/modely-interactive.js"
with open(js_path, "r", encoding="utf-8") as f:
    js_text = f.read()

show_slide_target = """        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('is-active');
                slide.style.cssText = 'display: flex !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; opacity: 1 !important; visibility: visible !important; z-index: 2 !important; align-items: center; justify-content: center;';
            } else {
                slide.classList.remove('is-active');
                slide.style.cssText = 'display: none !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; opacity: 0 !important; visibility: hidden !important; z-index: 0 !important;';
            }
        });"""

show_slide_replacement = """        const allSections = document.querySelectorAll('.gallery_asset--section');
        if (!allSections.length) return;
        if (index < 0) index = allSections.length - 1;
        if (index >= allSections.length) index = 0;
        currentSlide = index;

        // Lazy load interior images on demand
        if (currentSlide === 4) {
            const studSeatSection = document.querySelector('[data-id="STUD_SEAT-gallery-view"]');
            if (studSeatSection && !studSeatSection.querySelector('svg')) {
                studSeatSection.innerHTML = `
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="asset-loader--svg-container asset-loader-2 group--main-content--asset" id="Model_Y_Stud_Seat_View">
                        <title id="Model_Y_Stud_Seat_View">Interior Front View of Model Y</title>
                        <image width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./Model Y _files/modely_stud_seat.jpg" preserveAspectRatio="xMidYMid meet" alt="Interior Front View of Model Y"></image>
                    </svg>
                `;
            }
        } else if (currentSlide === 5 || currentSlide === 6) {
            const row2Section = document.querySelector('[data-id="INTERIOR_ROW2-gallery-view"]') || document.querySelector('[data-id="INTERIOR_ROW3-gallery-view"]');
            if (row2Section && !row2Section.querySelector('svg')) {
                row2Section.innerHTML = `
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="asset-loader--svg-container asset-loader-2 group--main-content--asset" id="Model_Y_Interior_Row2_View">
                        <title id="Model_Y_Interior_Row2_View">Interior Rear View of Model Y</title>
                        <image width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./Model Y _files/modely_interior_row2.jpg" preserveAspectRatio="xMidYMid meet" alt="Interior Rear View of Model Y"></image>
                    </svg>
                `;
            }
        }

        allSections.forEach((sec, i) => {
            if (i === currentSlide) {
                sec.classList.add('is-active');
                sec.style.cssText = 'opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; z-index: 2 !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; display: flex !important; align-items: center; justify-content: center; transform: scale(1) !important; transition: opacity 0.4s ease, transform 0.4s ease;';
            } else {
                sec.classList.remove('is-active');
                sec.style.cssText = 'opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; z-index: 0 !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; display: flex !important; align-items: center; justify-content: center; transform: scale(0.98) !important; transition: opacity 0.4s ease, transform 0.4s ease;';
            }
        });"""

if show_slide_target in js_text:
    js_text = js_text.replace(show_slide_target, show_slide_replacement)
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_text)
    print("Updated JS showSlide carousel implementation successfully!")
else:
    print("show_slide_target in JS not found!")
