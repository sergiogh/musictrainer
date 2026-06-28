# Signal Path

Mobile-first ear training for guitar players. Signal Path runs entirely in the browser: no account, no backend, no guitar input, just headphone-based listening drills with local progress.

## What It Trains

- Intervals: first note, then target note one second later
- Scale type recognition
- Chord progression recognition
- Chord quality and extension color
- Melody completion by ear

## Features

- Real local MP3 instrument samples routed through Tone.js
- Auto-repeating exercises until the user answers
- Adaptive concept selection based on local progress
- Multiple answer styles, including tap choices, delayed reveal, free response, and A/B compare
- Browser-only persistence with `localStorage`
- PWA-ready static deployment for Vercel

## Run Locally

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

## Deploy

This is a static app. It can be deployed directly to Vercel from this repository with no build step.

## Audio Credits

The bundled sample subset comes from the FluidR3 General MIDI soundfont rendered by the MIDI.js Soundfonts project:

https://github.com/gleitz/midi-js-soundfonts

See `samples/README.md` for details.
