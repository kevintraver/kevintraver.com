# Agent skills grid (prototype)

Throwaway prototype for a page showcasing curated agent skills: an endless,
draggable staggered grid of glowing keycaps on a dark background. Clicking a
key lifts it and shows a card with the skill's name, description and source
link. Not wired into the Next.js site yet.

Open `index.html` directly in a browser, or serve this folder:

```bash
python3 -m http.server 4173 --directory prototypes/agent-skills-grid
```

- Data: the 14 skills from the "Agent Skills Library" in Notion (Primary +
  Secondary), exported by hand into the `CURATED` array.
- Icons are placeholder line glyphs; final icons will be designed separately.
- `reference/` holds the generated images the look is based on.
- Chrome performance: avoid CSS `filter`, `backdrop-filter` and blurred
  `box-shadow` on the per-key elements. Chrome repaints each one every frame
  inside the 3D plane (Firefox doesn't). Shadows, glows and dimming use radial
  gradients and opacity instead.
