# The tilted 3D wordmark (hero + footer, until Nov 23 2026)

Leo likes this one and may bring it back: the slight tilt, the camera a touch
below and to the side, the side walls of the letters showing. Replaced on
Nov 23 2026 by the flat, front-on render (PR #35) for a cleaner look.

## Exact restore

The six images here are the exact files that were live (2675 x 805 each):
K, o (star cut out), r, a, a, apostrophe = koraa-glass-0 … 5.webp.
They are also in git at commit 24451d2, src/assets/glass/.

To put them back:
1. Copy these six files over src/assets/glass/koraa-glass-0…5.webp.
2. src/nx/nx.css, `.nx-glass`: `aspect-ratio: 2675 / 805;`
3. src/nx/NxHome.tsx (HeroMark animation constants):
   - `PX_W = 25 / 2675`, `PX_H = 25 / 805`
   - `BASE = 0.947`
   - `CX = [0.126, 0.3187, 0.4961, 0.6591, 0.8686]`
   - transform origins: letters `${CX[i]*100}% ${BASE*100}%`, apostrophe `'95% 33.7%'`
   Simplest: take src/nx/NxHome.tsx and src/nx/nx.css from commit 24451d2.
   (That version has no flying star; the o shows its star from the start.)

## How it was rendered

scripts/glass-logo (three.js 0.170, perspective camera, fov 22):
`node go.cjs "w=2880&h=1120&z=122&rx=-0.14&ry=0.07&bump=2.5&fl=7500&ex=1.4&only=N"`
for N = 0..5. Camera at (0, -6, z) looking at (0, -2, 0); the logo rotated
rx = -0.14, ry = 0.07 (radians). Re-running gives the same look but not a
pixel-exact frame (the live files were cropped slightly differently), so use
the six images here for an exact match.
