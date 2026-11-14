# Image workflow for case studies

How we make the mockups and plates on the case study pages. Follow it in order.
The taste rules are in [DESIGN-STYLE.md](DESIGN-STYLE.md).

## The rules that never change

- One thread per case study.
- When Leo gives a reference page or screenshot, copy it exactly: same mockups, same order top to
  bottom, same mockup style, lighting, colour tone, people and image choice. Only the brand changes.
- The client's Figma or brand book is only for the logo, colours, fonts and a few needed assets.
  Never paste brand-book pages in place of the reference's mockups.
- No app or web screens on billboards or posters unless the reference does it. Billboards and
  posters are proper ad designs.
- Very few screens, usually two: the strongest ones.
- Everything clean, premium and truly 4K. No rough or low-quality images. A fine grain is welcome.
- No box shadows, no wobbling 3D, no standalone 2D illustrations.
- Magnific credits: quote the cost, get Leo's yes, test two scenes before a big batch.
  Never download stock through Magnific; Leo downloads it himself.

## The steps

1. **Read the reference.** List every plate top to bottom: scene, camera, light, what is on it.
2. **Plan and quote.** One line per plate, and the total credit cost. Wait for Leo's yes.
3. **Generate blank scenes.** In Magnific (Nano Banana 2.1; 2K is 65 credits, 4K is 145), make each
   scene with **blank** screens, blank billboards and blank merch. Never ask the model to draw the
   logo, the UI or text.
4. **Test two first.** Show Leo two finished scenes before running the rest.
5. **Design the artwork in code.** Ads, posters, screens and logo placements are built as HTML/SVG
   with the real logo file, brand fonts and colours, then rendered to PNG.
6. **Composite.** Place the artwork onto the blank scene with a perspective warp, match the light,
   add a fine grain. (Refreeg's scripts are kept in the archive: `gen.py`, `comp.py`, `grade.py`.)
7. **Check sharpness.** Open at 100%. The long edge must be 3,700px or more and text must stay crisp.
8. **Export for the site.** JPG at three widths (`-1600`, `-2800`, `-full`) into `src/assets/<client>/`.
9. **Lay out the page** in `src/caseStudies.ts`, following the iPayBTC page: a mix of bento rows and
   landscape plates, not all full width, and full-width plates not too tall.
10. **Archive the rest.** Rejected rounds, blank scenes and sources go into `archive/<client>/` as a zip.

## Page layout pattern (from the iPayBTC page)

- Full-width landscape plate, then an inset plate in the centred column, then a pair (bento), repeat.
- One 24px gutter everywhere. No repeated images. Films sit in the same plates as images.

## Where each project stands (Nov 14, 2026)

| Project | Page | Reference followed |
|---|---|---|
| iPayBTC | `/work/ipaybtc` | Ragged Edge Wise scenes, Surgepay-style 3D in our coin shape |
| 3PROJECTS | `/work/3projects` | Billboard hero + brand guide film |
| Refreeg | `/work/refreeg` | "Remono" presentation, plate for plate, plus launch film and final bento |
