Renders the 3D wordmark (three.js 0.170 + polygon-clipping 0.15.7, run in headless Chromium).
Setup: npm i three@0.170.0 polygon-clipping@0.15.7 playwright here, write logo.js from src/brand/logoData.ts.

Flat, front-on (Nov 23, current): no tilt, orthographic camera, depth only from the bevel.
  node go.cjs "w=3000&h=1000&cam=ortho&ppu=25&bump=2.5&fl=7500&ex=1.4&only=N" FN.png   for N=0..7
  crop to (107,93,2893,907) → 2786 x 814, save as src/assets/glass/:
    0–5 koraa-glass-N.webp (K, o with the star cut out, r, a, a, apostrophe)
    6   koraa-glass-o-plain.webp (the o before the star lands)
    7   koraa-glass-star.webp (the star, in place at the centre of the o)
  The animation constants in src/nx/NxHome.tsx (PX_W, PX_H, BASE, CX, origins) follow this frame.

Old tilted look (before Nov 23): "w=2880&h=1120&z=122&rx=-0.14&ry=0.07&bump=2.5&fl=7500&ex=1.4", crop (55,113,2687,906).
