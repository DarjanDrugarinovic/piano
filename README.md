# Little Piano

A colorful one-octave piano that helps a toddler get familiar with music. Pick a song and the
key to press next lights up in its color, with a bouncing 👇 above it; the other keys fade back.
Pressing the right key plays the note, throws stars and moves on; any other key still sounds,
with no scolding. At the end of a song there's a little party, then the song starts again.

Play it: https://darjandrugarinovic.github.io/piano/

- **Songs:** 🎹 free play, ⭐ Twinkle Twinkle, 🐑 Mary Had a Little Lamb, 🥐 Hot Cross Buns,
  🚣 Row Your Boat, 🎵 Ode to Joy. Each song plays its first notes when picked.
- **Keys:** C4 to C5, white keys only, each with its own color. Touch, mouse, or the computer
  keyboard (A S D F G H J K, or 1–8).
- One file, `index.html`, no build step. Sound is made with Web Audio, so it needs one tap to
  start (the 🎹 screen). Works best on a tablet in landscape.

Add a song by adding an entry to `SONGS` in `index.html` (notes are key names `C D E F G A B C2`).
