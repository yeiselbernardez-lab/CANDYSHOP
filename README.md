## The Candy Store of New York (Expo + React Native + Web)

This repo contains a mobile-first **React Native** app (built with **Expo**) that visually simulates people entering and exiting a candy store on a NYC city block.

The Expo project lives in `candy-store-nyc/`.

### Run locally

```bash
cd candy-store-nyc
npm install
npm run start
```

- **Web**: press `w` in the Expo CLI, or run `npm run web`
- **Mobile**: scan the QR code with Expo Go

### Build for web (static output)

```bash
cd candy-store-nyc
npm run build:web
```

This produces a static site in `candy-store-nyc/dist/`.

### Deploy to Vercel

- This repo includes a `vercel.json` that builds the Expo web bundle and serves `candy-store-nyc/dist`.
- In Vercel, import the repo and deploy (no extra settings required).

