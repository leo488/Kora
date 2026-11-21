Renders the footer wordmark in 3D (three.js 0.170 + polygon-clipping 0.15.7, run in headless Chromium).
Setup: npm i three@0.170.0 polygon-clipping@0.15.7 here, write logo.js from src/brand/logoData.ts, then
node go.cjs "w=2880&h=1120&z=122&rx=-0.14&ry=0.07&bump=2.5&fl=7500&ex=1.4&only=N" LN.png for N=0..5,
crop to (55,113,2687,906) and save as src/assets/glass/koraa-glass-N.webp.
