import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image, ImageDraw, ImageFont

def generate_favicons():
    os.makedirs('public', exist_ok=True)
    font_path = 'temp_fonts/syne-800.ttf'
    font = TTFont(font_path)
    glyphset = font.getGlyphSet()

    pen_a = SVGPathPen(glyphset)
    glyphset['A'].draw(pen_a)
    path_a = pen_a.getCommands()

    pen_s = SVGPathPen(glyphset)
    glyphset['S'].draw(pen_s)
    path_s = pen_s.getCommands()

    # Glyph geometry in font units
    s_offset = 1120
    dot_cx = s_offset + 1016 + 75 + 85
    dot_cy = 75
    dot_r = 85

    total_w_font = (dot_cx + dot_r) - 10
    total_h_font = 681

    # For 512x512 SVG canvas
    target_w = 385.0
    scale = target_w / total_w_font
    w_px = total_w_font * scale
    h_px = total_h_font * scale

    tx = 256.0 - (w_px / 2.0) - (10.0 * scale)
    ty = 256.0 + (320.0 * scale)

    # 1. Generate crisp public/favicon.svg
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#161618" />
      <stop offset="100%" stop-color="#080809" />
    </linearGradient>
    <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#C8F04E" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background squircle with macOS style rounded corners -->
  <rect x="20" y="20" width="472" height="472" rx="116" fill="url(#bgGrad)" stroke="rgba(255, 255, 255, 0.14)" stroke-width="6" />
  <rect x="26" y="26" width="460" height="460" rx="110" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="2" />

  <!-- Monogram Glyph Group -->
  <g transform="translate({tx:.2f}, {ty:.2f}) scale({scale:.5f}, {-scale:.5f})">
    <!-- Letter A -->
    <path d="{path_a}" fill="#F2EFEB" />

    <!-- Letter S -->
    <g transform="translate({s_offset}, 0)">
      <path d="{path_s}" fill="#F2EFEB" />
    </g>

    <!-- Signature Accent Dot -->
    <circle cx="{dot_cx}" cy="{dot_cy}" r="{dot_r}" fill="#C8F04E" filter="url(#dotGlow)" />
  </g>
</svg>
'''
    with open('public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print('Created public/favicon.svg')

    # 2. Render master 512x512 PNG with Pillow using Syne font
    size = 512
    img512 = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw512 = ImageDraw.Draw(img512)

    radius = 116
    padding = 20
    box = [padding, padding, size - padding, size - padding]

    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(box, radius=radius, fill=255)

    bg = Image.new('RGBA', (size, size), (10, 10, 11, 255))
    bg_draw = ImageDraw.Draw(bg)
    for y in range(padding, size - padding):
        ratio = (y - padding) / (size - 2 * padding)
        r = int(22 * (1 - ratio) + 8 * ratio)
        g = int(22 * (1 - ratio) + 8 * ratio)
        b = int(26 * (1 - ratio) + 9 * ratio)
        bg_draw.line([(padding, y), (size - padding, y)], fill=(r, g, b, 255))

    img512.paste(bg, (0, 0), mask)
    draw512.rounded_rectangle(box, radius=radius, outline=(255, 255, 255, 38), width=6)
    inner_box = [padding + 6, padding + 6, size - padding - 6, size - padding - 6]
    draw512.rounded_rectangle(inner_box, radius=radius - 6, outline=(255, 255, 255, 12), width=2)

    fs = 175
    pil_font = ImageFont.truetype(font_path, fs)
    as_mask = pil_font.getmask('AS')
    as_bbox = as_mask.getbbox()
    as_w = as_bbox[2] - as_bbox[0]
    as_h = as_bbox[3] - as_bbox[1]

    dot_d = 28
    dot_spacing = 14
    total_w = as_w + dot_spacing + dot_d
    total_h = as_h

    start_x = (size - total_w) // 2
    start_y = (size - total_h) // 2

    # Draw 'AS'
    draw512.text((start_x - as_bbox[0], start_y - as_bbox[1]), 'AS', font=pil_font, fill=(244, 242, 237, 255))

    # Draw accent dot with glow
    dot_left = start_x + as_w + dot_spacing
    dot_top = start_y + as_h - dot_d - 4
    dot_box = [dot_left, dot_top, dot_left + dot_d, dot_top + dot_d]

    glow_expand = 8
    glow_box = [dot_left - glow_expand, dot_top - glow_expand, dot_left + dot_d + glow_expand, dot_top + dot_d + glow_expand]
    draw512.ellipse(glow_box, fill=(200, 240, 78, 60))
    draw512.ellipse(dot_box, fill=(200, 240, 78, 255))

    # Save 512x512
    img512.save('public/android-chrome-512x512.png', 'PNG')
    print('Created public/android-chrome-512x512.png')

    # 192x192
    img192 = img512.resize((192, 192), Image.Resampling.LANCZOS)
    img192.save('public/android-chrome-192x192.png', 'PNG')
    print('Created public/android-chrome-192x192.png')

    # 180x180 (Apple touch icon)
    img180 = img512.resize((180, 180), Image.Resampling.LANCZOS)
    img180.save('public/apple-touch-icon.png', 'PNG')
    print('Created public/apple-touch-icon.png')

    # 32x32
    img32 = img512.resize((32, 32), Image.Resampling.LANCZOS)
    img32.save('public/favicon-32x32.png', 'PNG')
    print('Created public/favicon-32x32.png')

    # 16x16
    img16 = img512.resize((16, 16), Image.Resampling.LANCZOS)
    img16.save('public/favicon-16x16.png', 'PNG')
    print('Created public/favicon-16x16.png')

    # 3. Multi-resolution ICO: 16x16, 32x32, 48x48, 64x64
    img48 = img512.resize((48, 48), Image.Resampling.LANCZOS)
    img64 = img512.resize((64, 64), Image.Resampling.LANCZOS)

    img512.save(
        'public/favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
        append_images=[img16, img32, img48, img64]
    )
    print('Created public/favicon.ico')

    # 4. site.webmanifest
    manifest = '''{
  "name": "Anubhav Sethi — Portfolio",
  "short_name": "AS Portfolio",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#080808",
  "background_color": "#080808",
  "display": "standalone"
}
'''
    with open('public/site.webmanifest', 'w', encoding='utf-8') as f:
        f.write(manifest)
    print('Created public/site.webmanifest')

if __name__ == '__main__':
    generate_favicons()
