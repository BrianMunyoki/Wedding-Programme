# Lynnette & Kelvin ceremony programme

Mobile-first React/Vite implementation based on the supplied Figma reference.

## Pages
- `#/` — Ceremony programme
- `#/speeches` — Order of speeches

The "View Order of Speeches" button uses a hash route, so it works on simple static hosting without server rewrite rules.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The deployable files will be in `dist/`.

## Easy content edits
Open `src/App.jsx` and edit:
- `timeline` for ceremony items
- `speeches` for speech groups
- `mpesaNumber` in `GiftCard()`
- date/time/venue in `EventInfo()`

## Notes
- The M-PESA number is currently `123456` as shown in the reference.
- The copy button uses the browser clipboard API and falls back to a simple copy prompt.
- The floral treatment is a local SVG asset, so the page does not depend on external image URLs.


## Reference-matching updates
- Main page background uses the supplied warm cream tone: `#F9F6F0`.
- The ceremony hero now includes the pale floral top/side treatment from the supplied reference.
- A gold flourish is included above the main ceremony title.
