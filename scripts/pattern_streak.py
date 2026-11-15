"""iPayBTC streak-zigzag background pattern.
Short horizontal streaks in rows, slightly darker inside soft zig-zag bands.
Usage: python3 scripts/pattern_streak.py OUT.png [W H] [--color EFA3B4] [--depth 6]
"""
import sys
import numpy as np
from PIL import Image

args = [a for a in sys.argv[1:]]
out = args[0]
W, H = (int(args[1]), int(args[2])) if len(args) > 2 and args[1].isdigit() else (3584, 4480)
col = args[args.index('--color') + 1] if '--color' in args else 'EFA3B4'
depth = float(args[args.index('--depth') + 1]) if '--depth' in args else 6.0
base = np.array([int(col[i:i + 2], 16) for i in (0, 2, 4)], np.float32)
s = W / 3584  # keep proportions at any size
rng = np.random.default_rng(3)
shade = np.zeros((H, W), np.float32)
rowh = max(2, int(22 * s))


def band(x, y):
    zig = abs(((y / (1100 * s)) % 2) - 1) * 700 * s
    return 1.0 if ((x * 0.9 + y * 0.35 + zig) / (620 * s)) % 1 < 0.5 else 0.0


for r in range(0, H, rowh):
    x = -int(rng.integers(0, int(200 * s) + 1))
    while x < W:
        L = int(rng.integers(int(50 * s) + 1, int(300 * s) + 2))
        mid = x + L / 2 + rng.normal(0, 40 * s)
        shade[r:r + rowh, max(x, 0):x + L] = -depth * band(mid, r) + rng.normal(0, 1.6)
        x += L
img = np.clip(base + shade[..., None], 0, 255).astype(np.uint8)
Image.fromarray(img).save(out)
print('saved', out, W, H, '#' + col)
