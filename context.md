# piano: context

State of this project for the next session. What the app does and how to add a song: `README.md`.

## What it is

Little Piano, a one-page web app that helps the user's toddler get familiar with music: pick a
song and the key to press next lights up in its color with a bouncing 👇; other keys fade.
Wrong keys still sound, with no scolding. One file, `site/index.html`, no build, sound from Web
Audio (one tap on the 🎹 start screen unlocks it).

- Keys C4 to C5, white keys only, each its own color. Landscape: one row of tall keys.
  Portrait (phones, upright tablets): a 2-column grid of big tiles (C D / E F / G A / B C),
  about 177×171 px each on a 390 px wide phone.
- Songs: free play, Twinkle Twinkle, Mary Had a Little Lamb, Hot Cross Buns, Row Your Boat,
  Ode to Joy.

## Hosting and deploy

- Live at https://piano.darjandrugarinovic.com (Cloudflare Pages project
  `darjandrugarinovic-piano`, `CNAME piano`, Proxied). Public, indexable.
- Every push to `main` touching `site/`, `scripts/` or the workflow deploys it through
  `.github/workflows/deploy-pages.yml`, after `scripts/verify-site.mjs` passes (404 page,
  headers, no noindex, robots.txt, sitemap). Manual run: Actions tab.
- Secrets: `CLOUDFLARE_API_TOKEN` (token `darjandrugarinovic-piano-pages-deploy`, Pages Edit
  only, no expiry) and `CLOUDFLARE_ACCOUNT_ID`.
- Full hosting record: contabo repo, `documentation/projekti/piano.md`. Update it there when
  hosting changes.
- GitHub Pages was used briefly at first and is turned off.

## Testing

No tests. Check changes in the debug Edge (`file:///.../site/index.html`) with phone
(390×844, touch) and tablet landscape (1024×768) emulation; drive keys with `pointerdown`
events and read which key has the `target` class.

## Open items

- Not yet tried on a real phone or tablet by the user (sound, full screen, touch).
- Ideas if wanted: more songs, black keys, a "listen" button that plays the whole song.
