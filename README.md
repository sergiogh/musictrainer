# Signal Path Jam Trainer

Mobile-first guitar jam training that runs entirely in the browser. No account, no backend, no guitar input: just headphones, practical listening exercises, and full-neck guitar maps.

Signal Path is built around the real jam-session question chain:

```text
What key are they in? -> What chords belong? -> What scale/riff fits? -> What chord tones should I land on?
```

## What It Trains

- Key-center recognition for common guitar jam keys
- Chords in a key, including Roman numerals and practical chord names
- Progression hearing: I-IV-V, I-V-vi-IV, ii-V-I, modal vamps, borrowed color, and more
- Scale/riff choice: major pentatonic, minor pentatonic, blues, major, minor, Mixolydian, Dorian, harmonic minor
- Full-fretboard navigation from fret 0-12
- Root, note, interval, scale-tone, and chord-tone overlays
- Movable chord thinking: root 6, root 5, root 4 shells, and top-string triads

## Main App Areas

- `Jam Ready`: choose a jam key and see the practical band map: key, likely progression, chords, and playable scale.
- `Play / Trainer`: audio-first jam drills that repeat automatically until you answer.
- `Neck / Fretboard`: full 0-12 fretboard views for roots, intervals, scales, and chord tones.
- `Grip / Chords`: build and move chords across the neck instead of staying in open-position shapes.

## Features

- Real local MP3 instrument samples routed through Tone.js
- Auto-repeating exercises until the user answers
- Feedback that maps the answer back to chords and the fretboard
- Browser-only persistence with `localStorage`
- PWA-ready static deployment for Vercel
- No server or build step required

## Run Locally

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

## Verify

```bash
/opt/homebrew/bin/node --check app.js
git diff --check
```

## Deploy

This is a static app. Deploy the repository directly to Vercel with no build command.

## Audio Credits

The bundled sample subset comes from the FluidR3 General MIDI soundfont rendered by the MIDI.js Soundfonts project:

https://github.com/gleitz/midi-js-soundfonts

See `samples/README.md` for details.
