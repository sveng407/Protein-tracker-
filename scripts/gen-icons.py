#!/usr/bin/env python3
"""Generate PWA PNG icons from an inline SVG flower icon."""
import cairosvg, os

# App icon: pink/purple gradient background with a white flower
ICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFB7C5"/>
      <stop offset="100%" style="stop-color:#C4A8FF"/>
    </linearGradient>
    <linearGradient id="stem" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#A8EED4"/>
      <stop offset="100%" style="stop-color:#88CCAA"/>
    </linearGradient>
  </defs>

  <!-- Background rounded square -->
  <rect width="512" height="512" rx="115" fill="url(#bg)"/>

  <!-- Subtle inner glow -->
  <rect width="512" height="512" rx="115" fill="white" opacity="0.08"/>

  <!-- Soil mound -->
  <ellipse cx="256" cy="430" rx="110" ry="28" fill="#C9A87C" opacity="0.9"/>
  <ellipse cx="256" cy="422" rx="85"  ry="18" fill="#DEC09A" opacity="0.9"/>

  <!-- Stem -->
  <path d="M 256 420 C 252 390 260 330 256 220"
        stroke="#A8D8B9" stroke-width="18" stroke-linecap="round" fill="none"/>

  <!-- Left leaf -->
  <ellipse cx="210" cy="330" rx="52" ry="22"
           fill="#A8D8B9" transform="rotate(-42,210,330)" opacity="0.95"/>

  <!-- Right leaf -->
  <ellipse cx="302" cy="285" rx="52" ry="22"
           fill="#A8D8B9" transform="rotate(42,302,285)"  opacity="0.90"/>

  <!-- Petals (6x) -->
  <g transform="translate(256,220)">
    <ellipse cx="0" cy="-72" rx="34" ry="62" fill="white" opacity="0.92" transform="rotate(0)"/>
    <ellipse cx="0" cy="-72" rx="34" ry="62" fill="white" opacity="0.92" transform="rotate(60)"/>
    <ellipse cx="0" cy="-72" rx="34" ry="62" fill="white" opacity="0.92" transform="rotate(120)"/>
    <ellipse cx="0" cy="-72" rx="34" ry="62" fill="white" opacity="0.92" transform="rotate(180)"/>
    <ellipse cx="0" cy="-72" rx="34" ry="62" fill="white" opacity="0.92" transform="rotate(240)"/>
    <ellipse cx="0" cy="-72" rx="34" ry="62" fill="white" opacity="0.92" transform="rotate(300)"/>
    <!-- Petal highlights -->
    <ellipse cx="0" cy="-78" rx="14" ry="28" fill="white" opacity="0.30" transform="rotate(0)"/>
    <ellipse cx="0" cy="-78" rx="14" ry="28" fill="white" opacity="0.30" transform="rotate(60)"/>
    <ellipse cx="0" cy="-78" rx="14" ry="28" fill="white" opacity="0.30" transform="rotate(120)"/>
    <ellipse cx="0" cy="-78" rx="14" ry="28" fill="white" opacity="0.30" transform="rotate(180)"/>
    <ellipse cx="0" cy="-78" rx="14" ry="28" fill="white" opacity="0.30" transform="rotate(240)"/>
    <ellipse cx="0" cy="-78" rx="14" ry="28" fill="white" opacity="0.30" transform="rotate(300)"/>
    <!-- Center -->
    <circle r="44" fill="#FFE4A0"/>
    <circle r="30" fill="#FFD080"/>
    <circle cx="-10" cy="-10" r="8" fill="white" opacity="0.35"/>
  </g>

  <!-- Sparkles -->
  <circle cx="370" cy="155" r="10" fill="white" opacity="0.70"/>
  <circle cx="155" cy="175" r="7"  fill="white" opacity="0.55"/>
  <circle cx="390" cy="290" r="6"  fill="white" opacity="0.45"/>
  <circle cx="145" cy="350" r="5"  fill="white" opacity="0.40"/>
</svg>"""

out = os.path.join(os.path.dirname(__file__), '..', 'public')
os.makedirs(out, exist_ok=True)

for size, name in [(512, 'pwa-512.png'), (192, 'pwa-192.png'), (180, 'apple-touch-icon.png')]:
    cairosvg.svg2png(bytestring=ICON_SVG.encode(), write_to=os.path.join(out, name),
                     output_width=size, output_height=size)
    print(f'✓ {name} ({size}x{size})')

# Also a maskable icon with less padding (for Android adaptive icons)
cairosvg.svg2png(bytestring=ICON_SVG.encode(), write_to=os.path.join(out, 'pwa-512-maskable.png'),
                 output_width=512, output_height=512)
print('✓ pwa-512-maskable.png (512x512 maskable)')
