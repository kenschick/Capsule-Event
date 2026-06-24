# Publishing & sharing this project

This is the **TuxMat® Capsule™ launch presentation site** — a Vite + React app.
Everything needed to run it is included **except** `node_modules` (dependencies)
and `dist` (the build output), which are regenerated locally. See `README.md`
for the full project overview.

## Run it locally

You need [Node.js](https://nodejs.org) (v18 or newer). Then:

```bash
npm install      # download dependencies (one time)
npm run dev      # start the dev server → http://localhost:5173
```

To make a production build:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Put it on GitHub

All assets are now small (the largest file is the ~7 MB launch film), so any
method works. The recommended way is the command line, which handles the whole
folder structure in one step:

1. Create a new, **empty** repository on GitHub (no README, no .gitignore — keep
   it empty so the first push is clean).
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Initial commit — TuxMat Capsule launch site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

That's it — the whole project is on GitHub, and others can clone it and run
`npm install && npm run dev`.

## Sharing without GitHub

This folder is fully self-contained — you can also just zip it and send it.
The recipient runs `npm install && npm run dev`. (They do **not** need the
`node_modules` folder; `npm install` recreates it.)

## A note on the launch film

`public/assets/launch/film-lifestyle.mp4` has been compressed (H.264, CRF 18,
~7 MB, 1280×720) for easy sharing while keeping high visual quality. If you ever
need to swap in a different clip, drop it in `public/assets/launch/` and update
`PAGES.launch.film.src` in `src/lib/manifest.js`.
