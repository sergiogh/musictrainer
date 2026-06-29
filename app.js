const STORAGE_KEY = "signal-path-v2";
const ASSET_VERSION = "20260629l";
const SESSION_LENGTH = 7;
const DAILY_SESSION_LENGTH = 5;
const AUTO_ADVANCE_MS = 1300;
const QUESTION_REPEAT_DELAY_MS = 650;

const SECTION_DEFS = {
  intervals: {
    id: "intervals",
    title: "Intervals",
    label: "Listen and identify intervals",
    accent: "orange",
    blurb: "Single-note jumps, harmonic stacks, and interval color under pressure.",
    modes: [
      { id: "ascending", label: "Ascending", detail: "One note up after another" },
      { id: "descending", label: "Descending", detail: "Reverse the direction" },
      { id: "harmonic", label: "Root + target", detail: "Root note, then target note" },
      { id: "mixed", label: "Mixed", detail: "Randomized interval motion" },
    ],
    defaultMode: "mixed",
  },
  scales: {
    id: "scales",
    title: "Scale Type",
    label: "Hear the scale family",
    accent: "teal",
    blurb: "Short melodic fragments built to expose the scale's character fast.",
    modes: [
      { id: "phrase", label: "Phrase", detail: "Melodic motif only" },
      { id: "drone", label: "With drone", detail: "Tonic drone under the line" },
    ],
    defaultMode: "phrase",
  },
  progressions: {
    id: "progressions",
    title: "Progressions",
    label: "Identify harmonic movement",
    accent: "gold",
    blurb: "Roman numeral listening from simple cadences to richer movement.",
    modes: [
      { id: "triads", label: "Triads", detail: "Compact diatonic chords" },
      { id: "sevenths", label: "7th colors", detail: "Richer chord textures" },
    ],
    defaultMode: "triads",
  },
  theory: {
    id: "theory",
    title: "Theory Drill",
    label: "Other guitar theory",
    accent: "blue",
    blurb: "Chord quality, extensions, and tonal color without touching the fretboard.",
    modes: [
      { id: "quality", label: "Chord quality", detail: "Major, minor, altered, suspended" },
      { id: "extensions", label: "Extensions", detail: "7ths and tensions by ear" },
    ],
    defaultMode: "quality",
  },
  melody: {
    id: "melody",
    title: "Melody Fix",
    label: "Complete the melody",
    accent: "red",
    blurb: "Hear the gap, predict the target, and finish the line cleanly.",
    modes: [
      { id: "degrees", label: "Scale degrees", detail: "Choose the missing degree" },
      { id: "chromatic", label: "Chromatic", detail: "Extra outside-note traps" },
    ],
    defaultMode: "degrees",
  },
  jam: {
    id: "jam",
    title: "Jam Lab",
    label: "Join the progression",
    accent: "green",
    blurb: "Intermediate-to-advanced jam drills: key center, Roman numerals, modal vamps, borrowed color, and chord-tone targets.",
    modes: [
      { id: "function", label: "Function", detail: "Hear the progression as Roman numerals" },
      { id: "modal", label: "Modal vamps", detail: "Choose the scale or mode for the jam" },
      { id: "borrowed", label: "Outside color", detail: "Spot borrowed chords and secondary dominants" },
      { id: "targets", label: "Target tones", detail: "Land on guide tones over changing chords" },
    ],
    defaultMode: "function",
  },
  noteid: {
    id: "noteid",
    title: "Note Finder",
    label: "Identify fretboard notes",
    accent: "teal",
    blurb: "Name notes from string and fret prompts until the neck stops feeling like a maze.",
    modes: [
      { id: "natural", label: "Naturals", detail: "White-key note names first" },
      { id: "chromatic", label: "Chromatic", detail: "Sharps and flats across the full neck" },
    ],
    defaultMode: "chromatic",
  },
  keyid: {
    id: "keyid",
    title: "Key Signatures",
    label: "Identify key signatures",
    accent: "gold",
    blurb: "Read sharp and flat key signatures, then connect them back to jam keys.",
    modes: [
      { id: "major", label: "Major keys", detail: "Major key signatures" },
      { id: "minor", label: "Minor keys", detail: "Relative minor signatures" },
      { id: "mixed", label: "Mixed", detail: "Major and minor together" },
    ],
    defaultMode: "major",
  },
};

const DIFFICULTIES = [
  {
    id: "beginner",
    label: "Beginner",
    detail: "Recognizable core sounds with fewer distractors",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    detail: "Broader palette and closer answer choices",
  },
  {
    id: "advanced",
    label: "Advanced",
    detail: "Faster, denser, and more deceptive material",
  },
];

const TONES = [
  { id: "clean", label: "Clean guitar", detail: "Bright plucked electric tone" },
  { id: "acoustic", label: "Acoustic guitar", detail: "Woody strum and string attack" },
  { id: "piano", label: "Felt piano", detail: "Soft hammer with longer bloom" },
];

const CHOICE_COUNTS = [4, 6];
const GOALS = [
  { id: "mastery", label: "Mastery", detail: "Tighten weak concepts and due reviews" },
  { id: "speed", label: "Speed", detail: "Favor fast recognition and tighter timing" },
  { id: "fresh", label: "New material", detail: "Bias toward new or less-practiced sounds" },
];

const ANSWER_STYLES = [
  { id: "tap", label: "Tap choices", detail: "Standard multiple choice" },
  { id: "delayed", label: "Delayed reveal", detail: "Hear first, then reveal the choices" },
  { id: "free", label: "Free response", detail: "Type what you heard before feedback" },
  { id: "compare", label: "A / B compare", detail: "Compare two clips and pick the match" },
];

const ARTICULATIONS = [
  { id: "focused", label: "Focused", detail: "Clear, balanced note length" },
  { id: "muted", label: "Muted", detail: "Shorter attack for tighter ear focus" },
  { id: "sustain", label: "Sustain", detail: "Longer tails and more ambient space" },
];

const LEARNING_PATHS = {
  foundation: {
    id: "foundation",
    title: "Foundation",
    detail: "Intervals, major/minor color, and simple cadences first.",
    sections: ["intervals", "scales", "melody"],
    roadmap: [
      { label: "Intervals to 80%", sectionId: "intervals", threshold: 80 },
      { label: "Scale families to 70%", sectionId: "scales", threshold: 70 },
      { label: "Melody completion to 65%", sectionId: "melody", threshold: 65 },
    ],
  },
  blues: {
    id: "blues",
    title: "Blues / Rock",
    detail: "Pentatonic, blues scale, riffs, and modal rock motion.",
    sections: ["jam", "scales", "progressions"],
    roadmap: [
      { label: "Minor pentatonic confidence", sectionId: "scales", threshold: 75 },
      { label: "Cadence and turnaround hearing", sectionId: "progressions", threshold: 65 },
      { label: "Jam lab function to 70%", sectionId: "jam", threshold: 70 },
    ],
  },
  jazz: {
    id: "jazz",
    title: "Jazz Harmony",
    detail: "ii-V-I hearing, chord color, and tension recognition.",
    sections: ["jam", "progressions", "theory"],
    roadmap: [
      { label: "Progression function", sectionId: "jam", threshold: 75 },
      { label: "Chord color recognition", sectionId: "theory", threshold: 75 },
      { label: "Mode discrimination", sectionId: "scales", threshold: 70 },
    ],
  },
  melody: {
    id: "melody",
    title: "Melodic Hearing",
    detail: "Finish phrases, hear cadences, and predict line endings.",
    sections: ["melody", "intervals", "scales"],
    roadmap: [
      { label: "Phrase completion", sectionId: "melody", threshold: 75 },
      { label: "Interval instinct", sectionId: "intervals", threshold: 75 },
      { label: "Scale pull in context", sectionId: "scales", threshold: 70 },
    ],
  },
  jam: {
    id: "jam",
    title: "Jam Sessions",
    detail: "Roman numerals, modal choices, full-fretboard roots, and guide-tone targets.",
    sections: ["jam", "progressions", "scales"],
    roadmap: [
      { label: "Jam progressions to 75%", sectionId: "jam", threshold: 75 },
      { label: "Functional progressions to 75%", sectionId: "progressions", threshold: 75 },
      { label: "Scale color to 75%", sectionId: "scales", threshold: 75 },
    ],
  },
};

const PLAYLISTS = [
  {
    id: "weakspots",
    title: "Weak Spots",
    detail: "Focus the current weakest lane with due concepts first.",
  },
  {
    id: "commute",
    title: "Commute 5",
    detail: "Five fast questions with delayed choices and speed goal.",
  },
  {
    id: "compare",
    title: "Compare Lab",
    detail: "A/B comparison drills inside your current learning path.",
  },
  {
    id: "pathfocus",
    title: "Path Focus",
    detail: "Train the sections your selected path emphasizes.",
  },
];

const REVIEW_STEPS_MS = [
  10 * 60 * 1000,
  60 * 60 * 1000,
  12 * 60 * 60 * 1000,
  24 * 60 * 60 * 1000,
  72 * 60 * 60 * 1000,
];

const INTERVAL_BANK = [
  { id: "m2", label: "Minor 2nd", semitones: 1, difficulty: 0, note: "One semitone apart." },
  { id: "M2", label: "Major 2nd", semitones: 2, difficulty: 0, note: "Two semitones apart." },
  { id: "m3", label: "Minor 3rd", semitones: 3, difficulty: 0, note: "Three semitones apart." },
  { id: "M3", label: "Major 3rd", semitones: 4, difficulty: 0, note: "The major third brightens the sound." },
  { id: "P4", label: "Perfect 4th", semitones: 5, difficulty: 0, note: "Stable and open." },
  { id: "TT", label: "Tritone", semitones: 6, difficulty: 1, note: "Sharp tension right in the middle." },
  { id: "P5", label: "Perfect 5th", semitones: 7, difficulty: 0, note: "The strongest open consonance." },
  { id: "m6", label: "Minor 6th", semitones: 8, difficulty: 1, note: "A darker leap." },
  { id: "M6", label: "Major 6th", semitones: 9, difficulty: 1, note: "Wide and warm." },
  { id: "m7", label: "Minor 7th", semitones: 10, difficulty: 2, note: "A restless upper color." },
  { id: "M7", label: "Major 7th", semitones: 11, difficulty: 2, note: "Very close to the octave, but tense." },
  { id: "P8", label: "Octave", semitones: 12, difficulty: 0, note: "Same note class at a higher register." },
];

const SCALE_BANK = [
  {
    id: "major",
    label: "Major / Ionian",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: [0, 1, 2, 4, 5, 4, 2],
    difficulty: 0,
    note: "Major keeps the natural 3rd and 7th.",
  },
  {
    id: "minor",
    label: "Natural minor / Aeolian",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: [0, 2, 3, 4, 2, 1, 0],
    difficulty: 0,
    note: "Natural minor gives you flat 3, flat 6, and flat 7.",
  },
  {
    id: "majorPent",
    label: "Major pentatonic",
    intervals: [0, 2, 4, 7, 9],
    degrees: [0, 1, 2, 4, 2, 1, 0],
    difficulty: 0,
    note: "Major pentatonic leaves out the unstable scale degrees.",
  },
  {
    id: "minorPent",
    label: "Minor pentatonic",
    intervals: [0, 3, 5, 7, 10],
    degrees: [0, 1, 2, 4, 2, 1, 0],
    difficulty: 0,
    note: "Minor pentatonic carries the blues-rock center of gravity.",
  },
  {
    id: "blues",
    label: "Blues scale",
    intervals: [0, 3, 5, 6, 7, 10],
    degrees: [0, 1, 2, 3, 4, 2, 1],
    difficulty: 1,
    note: "The blue note creates the rough edge.",
  },
  {
    id: "dorian",
    label: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degrees: [0, 1, 2, 4, 5, 4, 2],
    difficulty: 1,
    note: "Minor 3rd with a natural 6th is the Dorian giveaway.",
  },
  {
    id: "mixolydian",
    label: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    degrees: [0, 1, 2, 4, 5, 4, 1],
    difficulty: 1,
    note: "Major color with a flat 7th.",
  },
  {
    id: "lydian",
    label: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    degrees: [0, 1, 3, 4, 5, 3, 1],
    difficulty: 2,
    note: "The raised 4th makes the major sound float.",
  },
  {
    id: "phrygian",
    label: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    degrees: [0, 1, 2, 4, 3, 1, 0],
    difficulty: 2,
    note: "The flat 2nd is the immediate fingerprint.",
  },
  {
    id: "harmonicMinor",
    label: "Harmonic minor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    degrees: [0, 1, 2, 4, 6, 4, 2],
    difficulty: 2,
    note: "Raised 7th against a minor 3rd gives the dramatic pull.",
  },
  {
    id: "melodicMinor",
    label: "Melodic minor",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    degrees: [0, 1, 2, 4, 5, 6, 4],
    difficulty: 2,
    note: "Minor 3rd with a natural 6th and 7th changes the contour.",
  },
];

const PROGRESSION_BANK = [
  {
    id: "I-IV-V",
    label: "I - IV - V",
    degreeSet: [0, 3, 4],
    mode: "major",
    sevenths: false,
    difficulty: 0,
    note: "The classic major cadence frame.",
  },
  {
    id: "I-V-vi-IV",
    label: "I - V - vi - IV",
    degreeSet: [0, 4, 5, 3],
    mode: "major",
    sevenths: false,
    difficulty: 0,
    note: "Pop progression gravity with the vi pull in the middle.",
  },
  {
    id: "ii-V-I",
    label: "ii - V - I",
    degreeSet: [1, 4, 0],
    mode: "major",
    sevenths: true,
    difficulty: 1,
    note: "Strong functional cadence resolving to tonic.",
  },
  {
    id: "vi-IV-I-V",
    label: "vi - IV - I - V",
    degreeSet: [5, 3, 0, 4],
    mode: "major",
    sevenths: false,
    difficulty: 1,
    note: "A circular pop-rock movement around tonic.",
  },
  {
    id: "i-bVII-bVI-bVII",
    label: "i - bVII - bVI - bVII",
    degreeSet: [0, 6, 5, 6],
    mode: "minor",
    sevenths: false,
    difficulty: 1,
    note: "Minor modal rock movement.",
  },
  {
    id: "ii-V-I-vi",
    label: "ii - V - I - vi",
    degreeSet: [1, 4, 0, 5],
    mode: "major",
    sevenths: true,
    difficulty: 2,
    note: "Cadence plus deceptive continuation.",
  },
  {
    id: "I-bVII-IV",
    label: "I - bVII - IV",
    degreeSet: [0, 6, 3],
    mode: "major",
    sevenths: false,
    difficulty: 2,
    note: "Major center with a borrowed flat 7 for modal rock pull.",
  },
  {
    id: "i-iv-v",
    label: "i - iv - v",
    degreeSet: [0, 3, 4],
    mode: "minor",
    sevenths: false,
    difficulty: 2,
    note: "Minor modal pull without the raised leading tone.",
  },
];

const QUALITY_BANK = [
  {
    id: "majorTriad",
    label: "Major triad",
    intervals: [0, 4, 7],
    difficulty: 0,
    note: "Major 3rd over the root gives the brightness.",
  },
  {
    id: "minorTriad",
    label: "Minor triad",
    intervals: [0, 3, 7],
    difficulty: 0,
    note: "Flat 3rd shifts the chord into minor.",
  },
  {
    id: "diminished",
    label: "Diminished triad",
    intervals: [0, 3, 6],
    difficulty: 0,
    note: "Stacked minor 3rds sound unstable immediately.",
  },
  {
    id: "augmented",
    label: "Augmented triad",
    intervals: [0, 4, 8],
    difficulty: 1,
    note: "The raised 5th creates the floating quality.",
  },
  {
    id: "sus2",
    label: "Sus2",
    intervals: [0, 2, 7],
    difficulty: 1,
    note: "The 2nd replaces the 3rd, so major/minor disappears.",
  },
  {
    id: "sus4",
    label: "Sus4",
    intervals: [0, 5, 7],
    difficulty: 1,
    note: "The 4th wants to resolve back to the 3rd.",
  },
  {
    id: "dominant7",
    label: "Dominant 7",
    intervals: [0, 4, 7, 10],
    difficulty: 2,
    note: "Major triad plus flat 7 wants to move.",
  },
  {
    id: "major7",
    label: "Major 7",
    intervals: [0, 4, 7, 11],
    difficulty: 2,
    note: "Major 7 sits right under the octave with a glossy tension.",
  },
  {
    id: "minor7",
    label: "Minor 7",
    intervals: [0, 3, 7, 10],
    difficulty: 2,
    note: "Minor 3rd plus flat 7 keeps the darker softness.",
  },
  {
    id: "add9",
    label: "Add9",
    intervals: [0, 4, 7, 14],
    difficulty: 2,
    note: "The 9th opens the triad without dominant pull.",
  },
  {
    id: "minor9",
    label: "Minor 9",
    intervals: [0, 3, 7, 10, 14],
    difficulty: 2,
    note: "Minor 7 with the 9th adds width without losing the dark center.",
  },
];

const MELODY_BANK = [
  {
    id: "major_5",
    label: "5 (dominant)",
    scale: "major",
    degrees: [0, 2, 4],
    missing: 4,
    difficulty: 0,
    note: "The line wants to land on the dominant.",
  },
  {
    id: "major_1",
    label: "1 (tonic)",
    scale: "major",
    degrees: [4, 2, 1],
    missing: 0,
    difficulty: 0,
    note: "The phrase resolves to tonic.",
  },
  {
    id: "minor_b3",
    label: "b3",
    scale: "minor",
    degrees: [0, 1, 4],
    missing: 2,
    difficulty: 1,
    note: "Minor color shows up in the flat 3rd target.",
  },
  {
    id: "major_6",
    label: "6",
    scale: "major",
    degrees: [0, 2, 4],
    missing: 5,
    difficulty: 1,
    note: "The phrase keeps opening instead of resolving early.",
  },
  {
    id: "minor_7",
    label: "b7",
    scale: "minor",
    degrees: [0, 2, 4],
    missing: 6,
    difficulty: 2,
    note: "The flat 7 keeps the phrase hanging.",
  },
  {
    id: "chromatic_lead",
    label: "#4 / b5",
    scale: "blues",
    degrees: [0, 2, 3],
    missing: 4,
    difficulty: 2,
    note: "The blues-color passing tone completes the line.",
  },
  {
    id: "cadence_3",
    label: "3",
    scale: "major",
    degrees: [4, 3, 1],
    missing: 2,
    difficulty: 1,
    note: "The phrase settles on a bright upper chord tone instead of tonic.",
  },
  {
    id: "deceptive_6",
    label: "b6",
    scale: "minor",
    degrees: [4, 2, 1],
    missing: 5,
    difficulty: 2,
    note: "The line side-steps the expected resolution into a darker deceptive color.",
  },
];

const SCALE_REFERENCE = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  blues: [0, 3, 5, 6, 7, 10],
};

const DEGREE_LABELS = ["1", "2", "3", "4", "5", "6", "7"];
const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NOTE_TO_PC = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

const GUITAR_STRINGS = [
  { label: "e", open: 4, midi: 64 },
  { label: "B", open: 11, midi: 59 },
  { label: "G", open: 7, midi: 55 },
  { label: "D", open: 2, midi: 50 },
  { label: "A", open: 9, midi: 45 },
  { label: "E", open: 4, midi: 40 },
];

const STRING_ANCHORS = [
  { label: "Root 6", string: "E", open: 4 },
  { label: "Root 5", string: "A", open: 9 },
  { label: "Root 4", string: "D", open: 2 },
];

const JAM_SCALE_LIBRARY = {
  major: {
    id: "major",
    label: "Major / Ionian",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    formula: "1 2 3 4 5 6 7",
    tab: ["e|-----------2-3-5-|", "B|-------3-5-------|", "G|---2-4-5---------|", "D|-2-4-5-----------|", "A|-2-3-5-----------|", "E|-3-5-------------|"],
  },
  majorPent: {
    id: "majorPent",
    label: "Major pentatonic",
    intervals: [0, 2, 4, 7, 9],
    formula: "1 2 3 5 6",
    tab: ["e|-----------2-3-|", "B|-------3-5-----|", "G|---2-4---------|", "D|-2-5-----------|", "A|-2-5-----------|", "E|-3-5-----------|"],
  },
  mixolydian: {
    id: "mixolydian",
    label: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    formula: "1 2 3 4 5 6 b7",
    tab: ["e|-----------3-5-|", "B|-------3-5-----|", "G|---2-4-5-------|", "D|-2-3-5---------|", "A|-3-5-----------|", "E|-3-5-----------|"],
  },
  minor: {
    id: "minor",
    label: "Natural minor / Aeolian",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    formula: "1 2 b3 4 5 b6 b7",
    tab: ["e|-----------5-7-8-|", "B|-------5-6-8-----|", "G|---4-5-7---------|", "D|-5-7-------------|", "A|-5-7-8-----------|", "E|-5-7-8-----------|"],
  },
  minorPent: {
    id: "minorPent",
    label: "Minor pentatonic",
    intervals: [0, 3, 5, 7, 10],
    formula: "1 b3 4 5 b7",
    tab: ["e|---------5-8-|", "B|-----5-8-----|", "G|-5-7---------|", "D|-5-7---------|", "A|-5-7---------|", "E|-5-8---------|"],
  },
  blues: {
    id: "blues",
    label: "Blues scale",
    intervals: [0, 3, 5, 6, 7, 10],
    formula: "1 b3 4 b5 5 b7",
    tab: ["e|---------5-8-|", "B|-----5-8-----|", "G|-5-7-8-------|", "D|-5-7---------|", "A|-5-6-7-------|", "E|-5-8---------|"],
  },
  dorian: {
    id: "dorian",
    label: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    formula: "1 2 b3 4 5 6 b7",
    tab: ["e|-----------5-7-|", "B|-------5-6-8---|", "G|---4-5-7-------|", "D|-4-5-7---------|", "A|-5-7-----------|", "E|-5-7-8---------|"],
  },
  harmonicMinor: {
    id: "harmonicMinor",
    label: "Harmonic minor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    formula: "1 2 b3 4 5 b6 7",
    tab: ["e|-----------4-5-7-|", "B|-------5-6-------|", "G|---4-5-7---------|", "D|-5-6-7-----------|", "A|-5-7-8-----------|", "E|-5-7-8-----------|"],
  },
};

const CHORD_QUALITY_INTERVALS = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dom7: [0, 4, 7, 10],
  min7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  dim: [0, 3, 6],
  sus4: [0, 5, 7],
};

const QUALITY_SUFFIX = {
  maj: "",
  min: "m",
  dom7: "7",
  min7: "m7",
  maj7: "maj7",
  dim: "°",
  sus4: "sus4",
};

const QUALITY_LABEL = {
  maj: "Major triad",
  min: "Minor triad",
  dom7: "Dominant 7",
  min7: "Minor 7",
  maj7: "Major 7",
  dim: "Diminished",
  sus4: "Sus4",
};

const JAM_KEYS = [
  { name: "G", pc: 7, midi: 43, mode: "major" },
  { name: "A", pc: 9, midi: 45, mode: "major" },
  { name: "C", pc: 0, midi: 48, mode: "major" },
  { name: "D", pc: 2, midi: 50, mode: "major" },
  { name: "E", pc: 4, midi: 40, mode: "major" },
  { name: "Am", pc: 9, midi: 45, mode: "minor" },
  { name: "Dm", pc: 2, midi: 50, mode: "minor" },
  { name: "Em", pc: 4, midi: 40, mode: "minor" },
];

const JAM_PROGRESSIONS = [
  {
    id: "I-V-vi-IV",
    label: "I - V - vi - IV",
    category: "function",
    keyMode: "major",
    scale: "majorPent",
    difficulty: 1,
    note: "The pop-rock gravity loop: tonic, dominant lift, relative minor, then IV warmth.",
    steps: [
      { roman: "I", semitone: 0, quality: "maj" },
      { roman: "V", semitone: 7, quality: "maj" },
      { roman: "vi", semitone: 9, quality: "min" },
      { roman: "IV", semitone: 5, quality: "maj" },
    ],
  },
  {
    id: "vi-IV-I-V",
    label: "vi - IV - I - V",
    category: "function",
    keyMode: "major",
    scale: "majorPent",
    difficulty: 1,
    note: "Starts on the relative minor, then opens into IV, I, and V.",
    steps: [
      { roman: "vi", semitone: 9, quality: "min" },
      { roman: "IV", semitone: 5, quality: "maj" },
      { roman: "I", semitone: 0, quality: "maj" },
      { roman: "V", semitone: 7, quality: "maj" },
    ],
  },
  {
    id: "ii-V-I",
    label: "ii - V - I",
    category: "function",
    keyMode: "major",
    scale: "major",
    difficulty: 1,
    note: "Predominant, dominant, tonic. Hear the V pull into I.",
    steps: [
      { roman: "ii7", semitone: 2, quality: "min7" },
      { roman: "V7", semitone: 7, quality: "dom7" },
      { roman: "Imaj7", semitone: 0, quality: "maj7" },
    ],
  },
  {
    id: "I-vi-ii-V",
    label: "I - vi - ii - V",
    category: "function",
    keyMode: "major",
    scale: "major",
    difficulty: 2,
    note: "Rhythm-changes DNA: tonic, relative minor, ii, dominant.",
    steps: [
      { roman: "Imaj7", semitone: 0, quality: "maj7" },
      { roman: "vi7", semitone: 9, quality: "min7" },
      { roman: "ii7", semitone: 2, quality: "min7" },
      { roman: "V7", semitone: 7, quality: "dom7" },
    ],
  },
  {
    id: "I-bVII-IV",
    label: "I - bVII - IV",
    category: "modal",
    keyMode: "major",
    scale: "mixolydian",
    difficulty: 2,
    note: "Major center with bVII rock color: this is Mixolydian territory.",
    steps: [
      { roman: "I", semitone: 0, quality: "maj" },
      { roman: "bVII", semitone: 10, quality: "maj" },
      { roman: "IV", semitone: 5, quality: "maj" },
    ],
  },
  {
    id: "i-bVII-bVI-bVII",
    label: "i - bVII - bVI - bVII",
    category: "modal",
    keyMode: "minor",
    scale: "minor",
    difficulty: 1,
    note: "Minor rock descent through bVII and bVI. Natural minor / Aeolian is the home color.",
    steps: [
      { roman: "i", semitone: 0, quality: "min" },
      { roman: "bVII", semitone: 10, quality: "maj" },
      { roman: "bVI", semitone: 8, quality: "maj" },
      { roman: "bVII", semitone: 10, quality: "maj" },
    ],
  },
  {
    id: "i-IV",
    label: "i - IV",
    category: "modal",
    keyMode: "minor",
    scale: "dorian",
    difficulty: 2,
    note: "Minor tonic plus major IV signals Dorian: b3 with natural 6.",
    steps: [
      { roman: "i7", semitone: 0, quality: "min7" },
      { roman: "IV7", semitone: 5, quality: "dom7" },
    ],
  },
  {
    id: "I-IV-iv-I",
    label: "I - IV - iv - I",
    category: "borrowed",
    keyMode: "major",
    scale: "major",
    difficulty: 2,
    note: "The minor iv is borrowed from the parallel minor and pulls back home with a darker voice-leading color.",
    outside: "Borrowed iv",
    steps: [
      { roman: "I", semitone: 0, quality: "maj" },
      { roman: "IV", semitone: 5, quality: "maj" },
      { roman: "iv", semitone: 5, quality: "min", outside: true },
      { roman: "I", semitone: 0, quality: "maj" },
    ],
  },
  {
    id: "I-Vofvi-vi-IV",
    label: "I - V/vi - vi - IV",
    category: "borrowed",
    keyMode: "major",
    scale: "major",
    difficulty: 2,
    note: "V/vi is a secondary dominant. It sounds more tense than the key expects, then resolves to vi.",
    outside: "Secondary dominant V/vi",
    steps: [
      { roman: "I", semitone: 0, quality: "maj" },
      { roman: "V/vi", semitone: 4, quality: "dom7", outside: true },
      { roman: "vi", semitone: 9, quality: "min" },
      { roman: "IV", semitone: 5, quality: "maj" },
    ],
  },
  {
    id: "i-V7-i",
    label: "i - V7 - i",
    category: "borrowed",
    keyMode: "minor",
    scale: "harmonicMinor",
    difficulty: 2,
    note: "The major V7 in minor borrows the raised 7th from harmonic minor.",
    outside: "Harmonic minor V7",
    steps: [
      { roman: "i", semitone: 0, quality: "min" },
      { roman: "V7", semitone: 7, quality: "dom7", outside: true },
      { roman: "i", semitone: 0, quality: "min" },
    ],
  },
];

const JAM_MODE_CHOICES = [
  { id: "major", label: "Major / Ionian" },
  { id: "mixolydian", label: "Mixolydian" },
  { id: "dorian", label: "Dorian" },
  { id: "minor", label: "Natural minor / Aeolian" },
  { id: "minorPent", label: "Minor pentatonic" },
  { id: "blues", label: "Blues scale" },
  { id: "harmonicMinor", label: "Harmonic minor" },
];

const OPEN_CHORD_FINGERINGS = {
  "G:maj": "320003",
  "C:maj": "x32010",
  "D:maj": "xx0232",
  "A:maj": "x02220",
  "E:maj": "022100",
  "F:maj": "133211",
  "Am:min": "x02210",
  "Dm:min": "xx0231",
  "Em:min": "022000",
  "A:dom7": "x02020",
  "D:dom7": "xx0212",
  "E:dom7": "020100",
  "G:dom7": "320001",
  "C:dom7": "x32310",
};

const PRACTICAL_KEY_CHOICES = [
  { id: "A", label: "A", mode: "major" },
  { id: "C", label: "C", mode: "major" },
  { id: "D", label: "D", mode: "major" },
  { id: "E", label: "E", mode: "major" },
  { id: "G", label: "G", mode: "major" },
  { id: "Am", label: "Am", mode: "minor" },
  { id: "Em", label: "Em", mode: "minor" },
  { id: "Dm", label: "Dm", mode: "minor" },
];

const FRETBOARD_VIEWS = [
  { id: "roots", label: "Roots", detail: "Find home notes fast" },
  { id: "notes", label: "Notes", detail: "Learn every fret" },
  { id: "intervals", label: "Intervals", detail: "See scale degrees" },
  { id: "scale", label: "Scale", detail: "Safe notes to riff" },
  { id: "chord", label: "Chord tones", detail: "Landing targets" },
];

const PRACTICAL_SCALES = [
  "majorPent",
  "minorPent",
  "blues",
  "major",
  "minor",
  "mixolydian",
  "dorian",
  "harmonicMinor",
];

const MAJOR_KEY_STEPS = [
  { roman: "I", semitone: 0, quality: "maj", role: "home chord" },
  { roman: "ii", semitone: 2, quality: "min", role: "pre-dominant" },
  { roman: "iii", semitone: 4, quality: "min", role: "color / passing" },
  { roman: "IV", semitone: 5, quality: "maj", role: "big lift" },
  { roman: "V", semitone: 7, quality: "maj", role: "pulls home" },
  { roman: "vi", semitone: 9, quality: "min", role: "relative minor" },
  { roman: "vii°", semitone: 11, quality: "dim", role: "leading tension" },
];

const MINOR_KEY_STEPS = [
  { roman: "i", semitone: 0, quality: "min", role: "home chord" },
  { roman: "ii°", semitone: 2, quality: "dim", role: "dark tension" },
  { roman: "bIII", semitone: 3, quality: "maj", role: "relative major" },
  { roman: "iv", semitone: 5, quality: "min", role: "minor lift" },
  { roman: "v", semitone: 7, quality: "min", role: "natural minor pull" },
  { roman: "bVI", semitone: 8, quality: "maj", role: "rock color" },
  { roman: "bVII", semitone: 10, quality: "maj", role: "modal rock" },
];

const PRACTICAL_JAM_RECIPES = [
  {
    id: "major-rock",
    title: "Major rock",
    keyMode: "major",
    progression: "I - IV - V",
    chords: ["I", "IV", "V"],
    scale: "majorPent",
    riff: "Major pentatonic first. Add 4 and 7 only when you hear a more melodic sound.",
    clue: "Home feels bright; IV opens the room; V wants to resolve.",
  },
  {
    id: "pop-loop",
    title: "Pop / rock loop",
    keyMode: "major",
    progression: "I - V - vi - IV",
    chords: ["I", "V", "vi", "IV"],
    scale: "majorPent",
    riff: "Major pentatonic is safest. Target each chord's 3rd when the loop changes.",
    clue: "The relative minor gives the emotional dip before IV lifts back.",
  },
  {
    id: "minor-rock",
    title: "Minor rock",
    keyMode: "minor",
    progression: "i - bVII - bVI - bVII",
    chords: ["i", "bVII", "bVI", "bVII"],
    scale: "minorPent",
    riff: "Minor pentatonic is home base. Add b6 for natural minor drama.",
    clue: "The flat VII and flat VI make the classic descending rock sound.",
  },
  {
    id: "blues-rock",
    title: "Blues / dominant jam",
    keyMode: "major",
    progression: "I7 - IV7 - V7",
    chords: ["I", "IV", "V"],
    scale: "blues",
    riff: "Minor pentatonic plus the blues note works, then land on dominant chord tones.",
    clue: "Dominant chords everywhere: major chord energy with a gritty b7.",
  },
  {
    id: "dorian-vamp",
    title: "Dorian vamp",
    keyMode: "minor",
    progression: "i - IV",
    chords: ["i", "IV"],
    scale: "dorian",
    riff: "Minor pentatonic plus natural 6. That 6 is the Dorian tell.",
    clue: "Minor home chord with a major IV instead of minor iv.",
  },
];

const CHROMATIC_INTERVAL_LABELS = ["R", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];
const FRETBOARD_ROOTS = ["C", "D", "E", "F", "G", "A", "B"];
const FRETBOARD_ACCIDENTALS = [
  { id: "natural", label: "(N)", detail: "Natural notes" },
  { id: "sharp", label: "#", detail: "Prefer sharps" },
  { id: "flat", label: "b", detail: "Prefer flats" },
];
const FRETBOARD_HARMONY_MODES = [
  { id: "scale", label: "Scale" },
  { id: "chord", label: "Chord" },
  { id: "custom", label: "Custom" },
];
const FRETBOARD_FINGERINGS = [
  { id: "3nps", label: "3nps", detail: "Three notes per string zones" },
  { id: "caged", label: "CAGED", detail: "CAGED position anchors" },
  { id: "none", label: "None", detail: "Full-neck map only" },
];
const FRETBOARD_MARKERS = [
  { id: "notes", label: "Notes" },
  { id: "degrees", label: "Degrees" },
  { id: "intervals", label: "Intervals" },
  { id: "none", label: "None" },
];
const FRETBOARD_EXERCISES = [
  {
    id: "intervals",
    title: "Interval Trainer",
    text: "Hear melodic and harmonic distances, then answer from the interval pool.",
    sectionId: "intervals",
    settings: { difficulty: "intermediate", choices: 6, mode: "mixed", answerStyle: "tap" },
  },
  {
    id: "chords",
    title: "Chord Trainer",
    text: "Recognize triads, sus colors, sevenths, and extensions by ear.",
    sectionId: "theory",
    settings: { difficulty: "advanced", choices: 6, mode: "extensions", answerStyle: "tap" },
  },
  {
    id: "noteid",
    title: "Note Finder",
    text: "Name the note at a string and fret, then reveal the matching neck map.",
    sectionId: "noteid",
    settings: { difficulty: "intermediate", choices: 6, mode: "chromatic", answerStyle: "tap" },
  },
  {
    id: "keyid",
    title: "Key Signatures",
    text: "Read the signature and name the key before the chart becomes automatic.",
    sectionId: "keyid",
    settings: { difficulty: "intermediate", choices: 6, mode: "mixed", answerStyle: "tap" },
  },
];
const KEY_SIGNATURE_BANK = [
  { id: "C", label: "C major", mode: "major", fifths: 0, relative: "Am", note: "No sharps or flats." },
  { id: "G", label: "G major", mode: "major", fifths: 1, relative: "Em", note: "One sharp: F#." },
  { id: "D", label: "D major", mode: "major", fifths: 2, relative: "Bm", note: "Two sharps: F# and C#." },
  { id: "A", label: "A major", mode: "major", fifths: 3, relative: "F#m", note: "Three sharps: F#, C#, G#." },
  { id: "E", label: "E major", mode: "major", fifths: 4, relative: "C#m", note: "Four sharps: F#, C#, G#, D#." },
  { id: "B", label: "B major", mode: "major", fifths: 5, relative: "G#m", note: "Five sharps: F#, C#, G#, D#, A#." },
  { id: "F#", label: "F# major", mode: "major", fifths: 6, relative: "D#m", note: "Six sharps." },
  { id: "F", label: "F major", mode: "major", fifths: -1, relative: "Dm", note: "One flat: Bb." },
  { id: "Bb", label: "Bb major", mode: "major", fifths: -2, relative: "Gm", note: "Two flats: Bb and Eb." },
  { id: "Eb", label: "Eb major", mode: "major", fifths: -3, relative: "Cm", note: "Three flats: Bb, Eb, Ab." },
  { id: "Ab", label: "Ab major", mode: "major", fifths: -4, relative: "Fm", note: "Four flats: Bb, Eb, Ab, Db." },
  { id: "Db", label: "Db major", mode: "major", fifths: -5, relative: "Bbm", note: "Five flats." },
  { id: "Am", label: "A minor", mode: "minor", fifths: 0, relative: "C", note: "Relative minor of C major." },
  { id: "Em", label: "E minor", mode: "minor", fifths: 1, relative: "G", note: "Relative minor of G major." },
  { id: "Bm", label: "B minor", mode: "minor", fifths: 2, relative: "D", note: "Relative minor of D major." },
  { id: "F#m", label: "F# minor", mode: "minor", fifths: 3, relative: "A", note: "Relative minor of A major." },
  { id: "C#m", label: "C# minor", mode: "minor", fifths: 4, relative: "E", note: "Relative minor of E major." },
  { id: "Dm", label: "D minor", mode: "minor", fifths: -1, relative: "F", note: "Relative minor of F major." },
  { id: "Gm", label: "G minor", mode: "minor", fifths: -2, relative: "Bb", note: "Relative minor of Bb major." },
  { id: "Cm", label: "C minor", mode: "minor", fifths: -3, relative: "Eb", note: "Relative minor of Eb major." },
  { id: "Fm", label: "F minor", mode: "minor", fifths: -4, relative: "Ab", note: "Relative minor of Ab major." },
];
const NOTE_IDENTIFICATION_BANK = GUITAR_STRINGS.flatMap((string, stringIndex) =>
  Array.from({ length: 13 }, (_, fret) => {
    const pc = pitchClass(string.open + fret);
    return {
      id: `${string.label}${stringIndex}:${fret}`,
      label: noteNameForPc(pc),
      string: string.label,
      stringIndex,
      fret,
      pc,
      difficulty: fret <= 5 ? 0 : fret <= 12 ? 1 : 2,
      note: `${string.label} string, fret ${fret} is ${noteNameForPc(pc)}.`,
    };
  })
);

function createDefaultSectionSettings() {
  return Object.fromEntries(
    Object.values(SECTION_DEFS).map((section) => [
      section.id,
      {
        difficulty: section.id === "theory" || section.id === "jam" ? "intermediate" : "beginner",
        choices: 4,
        tone: "clean",
        goal: "mastery",
        answerStyle: "tap",
        articulation: "focused",
        context: false,
        reference: false,
        mode: section.defaultMode,
      },
    ])
  );
}

function createDefaultProgress() {
  return Object.fromEntries(
    Object.keys(SECTION_DEFS).map((id) => [
      id,
      { attempts: 0, correct: 0, sessions: 0, itemStats: {} },
    ])
  );
}

function createDefaultOnboarding() {
  return {
    completed: false,
    startingLevel: "intermediate",
    preferredTone: "clean",
    preferredPath: "jam",
  };
}

function createDefaultDailyHistory() {
  return {
    id: null,
    attempts: 0,
    bestAccuracy: 0,
    completed: false,
  };
}

function createDefaultSessionLog() {
  return [];
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Unable to load saved state", error);
    return null;
  }
}

function normalizePersistedSettings(settings) {
  const merged = {
    ...createDefaultSectionSettings(),
    ...(settings || {}),
  };
  Object.entries(merged).forEach(([sectionId, sectionSettings]) => {
    const section = SECTION_DEFS[sectionId];
    if (!section) {
      return;
    }
    const validModes = section.modes.map((mode) => mode.id);
    if (!validModes.includes(sectionSettings.mode)) {
      sectionSettings.mode = section.defaultMode;
    }
    if (!TONES.some((tone) => tone.id === sectionSettings.tone)) {
      sectionSettings.tone = "clean";
    }
    if (!GOALS.some((goal) => goal.id === sectionSettings.goal)) {
      sectionSettings.goal = "mastery";
    }
    if (!ANSWER_STYLES.some((style) => style.id === sectionSettings.answerStyle)) {
      sectionSettings.answerStyle = "tap";
    }
    if (!ARTICULATIONS.some((articulation) => articulation.id === sectionSettings.articulation)) {
      sectionSettings.articulation = "focused";
    }
    if (!CHOICE_COUNTS.includes(sectionSettings.choices)) {
      sectionSettings.choices = 4;
    }
    if (!DIFFICULTIES.some((difficulty) => difficulty.id === sectionSettings.difficulty)) {
      sectionSettings.difficulty = "beginner";
    }
    sectionSettings.context = false;
    sectionSettings.reference = false;
  });
  return merged;
}

function normalizeProgress(progress) {
  const merged = {
    ...createDefaultProgress(),
    ...(progress || {}),
  };
  Object.keys(SECTION_DEFS).forEach((sectionId) => {
    const itemStats = merged[sectionId]?.itemStats;
    merged[sectionId] = {
      attempts: Number(merged[sectionId]?.attempts || 0),
      correct: Number(merged[sectionId]?.correct || 0),
      sessions: Number(merged[sectionId]?.sessions || 0),
      itemStats: normalizeItemStats(itemStats),
    };
  });
  return merged;
}

function normalizeItemStats(itemStats) {
  if (!itemStats || typeof itemStats !== "object") {
    return {};
  }
  const normalized = {};
  Object.entries(itemStats).forEach(([conceptId, stats]) => {
    normalized[conceptId] = {
      attempts: Number(stats?.attempts || 0),
      correct: Number(stats?.correct || 0),
      averageMs: Number(stats?.averageMs || 0),
      streak: Number(stats?.streak || 0),
      nextDueAt: Number(stats?.nextDueAt || 0),
      lastSeenAt: Number(stats?.lastSeenAt || 0),
      toneStats: typeof stats?.toneStats === "object" && stats.toneStats ? stats.toneStats : {},
      confusedWith: typeof stats?.confusedWith === "object" && stats.confusedWith ? stats.confusedWith : {},
    };
  });
  return normalized;
}

const persisted = loadState();
const state = {
  tab: "home",
  screen: persisted?.onboarding?.completed ? "home" : "onboarding",
  selectedSection: persisted?.selectedSection || "intervals",
  selectedJamKey: persisted?.selectedJamKey || "A",
  selectedFretboardView: persisted?.selectedFretboardView || "scale",
  selectedFretboardScale: persisted?.selectedFretboardScale || "majorPent",
  fretboardRoot: persisted?.fretboardRoot || "C",
  fretboardAccidental: persisted?.fretboardAccidental || "natural",
  fretboardHarmony: persisted?.fretboardHarmony || "scale",
  fretboardFingering: persisted?.fretboardFingering || "none",
  fretboardMarker: persisted?.fretboardMarker || "notes",
  fretboardShowTriads: persisted?.fretboardShowTriads ?? true,
  fretboardShowAll: persisted?.fretboardShowAll ?? true,
  fretboardShowRoot: persisted?.fretboardShowRoot ?? true,
  fretboardFrets: clamp(Number(persisted?.fretboardFrets || 17), 5, 24),
  metronomeBpm: clamp(Number(persisted?.metronomeBpm || 60), 40, 220),
  metronomeOn: false,
  selectedChordRoot: persisted?.selectedChordRoot || "A",
  selectedChordQuality: persisted?.selectedChordQuality || "maj",
  sectionSettings: normalizePersistedSettings(persisted?.sectionSettings),
  preferences: {
    reducedMotion:
      persisted?.preferences?.reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    largeButtons: persisted?.preferences?.largeButtons || false,
    haptics: persisted?.preferences?.haptics ?? true,
  },
  onboarding: {
    ...createDefaultOnboarding(),
    ...(persisted?.onboarding || {}),
  },
  progress: normalizeProgress(persisted?.progress),
  sessionLog: Array.isArray(persisted?.sessionLog) ? persisted.sessionLog.slice(-120) : createDefaultSessionLog(),
  dailyHistory: {
    ...createDefaultDailyHistory(),
    ...(persisted?.dailyHistory || {}),
  },
  streak: persisted?.streak || { count: 0, lastDate: null },
  session: null,
  summary: null,
  audioReady: false,
  installAvailable: false,
  isStandalone:
    window.matchMedia("(display-mode: standalone)").matches || Boolean(window.navigator.standalone),
};

const appRoot = document.querySelector("#app");
let audioContext = null;
let autoAdvanceTimer = null;
let questionRepeatTimer = null;
let questionPlaybackToken = 0;
let lastRenderedScreen = null;
let activeSources = [];
let activeToneNodes = [];
const sampleInstrumentCache = new Map();
const renderedNoteCache = new Map();
let intervalSampleBufferPromise = null;
let deferredInstallPrompt = null;
let roomImpulseBuffer = null;
let metronomeTimer = null;
let metronomeBeat = 0;

function saveState() {
  const snapshot = {
    selectedSection: state.selectedSection,
    selectedJamKey: state.selectedJamKey,
    selectedFretboardView: state.selectedFretboardView,
    selectedFretboardScale: state.selectedFretboardScale,
    fretboardRoot: state.fretboardRoot,
    fretboardAccidental: state.fretboardAccidental,
    fretboardHarmony: state.fretboardHarmony,
    fretboardFingering: state.fretboardFingering,
    fretboardMarker: state.fretboardMarker,
    fretboardShowTriads: state.fretboardShowTriads,
    fretboardShowAll: state.fretboardShowAll,
    fretboardShowRoot: state.fretboardShowRoot,
    fretboardFrets: state.fretboardFrets,
    metronomeBpm: state.metronomeBpm,
    selectedChordRoot: state.selectedChordRoot,
    selectedChordQuality: state.selectedChordQuality,
    sectionSettings: state.sectionSettings,
    preferences: state.preferences,
    onboarding: state.onboarding,
    progress: state.progress,
    sessionLog: state.sessionLog,
    dailyHistory: state.dailyHistory,
    streak: state.streak,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function todayId() {
  return new Date().toISOString().slice(0, 10);
}

function difficultyIndex(difficultyId) {
  return DIFFICULTIES.findIndex((entry) => entry.id === difficultyId);
}

function getCurrentSettings(sectionId = state.selectedSection) {
  return state.sectionSettings[sectionId];
}

function getSectionProgress(sectionId) {
  if (!state.progress[sectionId]) {
    state.progress[sectionId] = { attempts: 0, correct: 0, sessions: 0, itemStats: {} };
  }
  return state.progress[sectionId];
}

function getMastery(sectionId) {
  const progress = getSectionProgress(sectionId);
  if (!progress.attempts) {
    return 0;
  }
  return Math.round((progress.correct / progress.attempts) * 100);
}

function getActivePath() {
  return LEARNING_PATHS[state.onboarding.preferredPath] || LEARNING_PATHS.foundation;
}

function getRecommendedSection() {
  const focusSections = getActivePath().sections;
  return focusSections
    .map((sectionId) => ({ sectionId, mastery: getMastery(sectionId) }))
    .sort((left, right) => left.mastery - right.mastery)[0]?.sectionId || "intervals";
}

function getStrongestSection() {
  return Object.keys(SECTION_DEFS)
    .map((sectionId) => ({ sectionId, mastery: getMastery(sectionId) }))
    .sort((left, right) => right.mastery - left.mastery)[0]?.sectionId || "intervals";
}

function getCurrentWeekId() {
  const now = new Date();
  const firstDay = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const pastDays = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - firstDay) / 86400000);
  const week = Math.floor((pastDays + firstDay.getUTCDay()) / 7);
  return `${now.getUTCFullYear()}-W${week}`;
}

function getWeeklySessions() {
  const weekId = getCurrentWeekId();
  return state.sessionLog.filter((entry) => entry.weekId === weekId).length;
}

function getWeeklyTarget() {
  return 5;
}

function countDueConcepts(sectionId = null) {
  const now = Date.now();
  const sectionIds = sectionId ? [sectionId] : Object.keys(SECTION_DEFS);
  return sectionIds.reduce((sum, id) => {
    const itemStats = getSectionProgress(id).itemStats;
    return (
      sum +
      Object.values(itemStats).filter((stats) => stats.nextDueAt && stats.nextDueAt <= now).length
    );
  }, 0);
}

function getDueConceptIds(sectionId) {
  const now = Date.now();
  const itemStats = getSectionProgress(sectionId).itemStats;
  return Object.entries(itemStats)
    .filter(([, stats]) => stats.nextDueAt && stats.nextDueAt <= now)
    .sort((left, right) => (left[1].nextDueAt || 0) - (right[1].nextDueAt || 0))
    .map(([conceptId]) => conceptId);
}

function getTopWeakConcepts(limit = 6) {
  const rows = [];
  Object.entries(SECTION_DEFS).forEach(([sectionId, section]) => {
    Object.entries(getSectionProgress(sectionId).itemStats).forEach(([conceptId, stats]) => {
      if (!stats.attempts) {
        return;
      }
      rows.push({
        sectionId,
        section: section.title,
        conceptId,
        accuracy: Math.round((stats.correct / stats.attempts) * 100),
        attempts: stats.attempts,
      });
    });
  });
  return rows
    .sort((left, right) => left.accuracy - right.accuracy || right.attempts - left.attempts)
    .slice(0, limit);
}

function getTopConfusions(limit = 4) {
  const rows = [];
  Object.entries(SECTION_DEFS).forEach(([sectionId, section]) => {
    const itemStats = getSectionProgress(sectionId).itemStats;
    Object.entries(itemStats).forEach(([conceptId, stats]) => {
      Object.entries(stats.confusedWith || {}).forEach(([otherId, count]) => {
        rows.push({
          sectionId,
          section: section.title,
          from: conceptId,
          to: otherId,
          count,
        });
      });
    });
  });
  return rows.sort((left, right) => right.count - left.count).slice(0, limit);
}

function getTonePerformance() {
  const result = {};
  TONES.forEach((tone) => {
    result[tone.id] = { attempts: 0, correct: 0 };
  });
  Object.values(state.progress).forEach((section) => {
    Object.values(section.itemStats).forEach((stats) => {
      Object.entries(stats.toneStats || {}).forEach(([toneId, toneStats]) => {
        if (!result[toneId]) {
          result[toneId] = { attempts: 0, correct: 0 };
        }
        result[toneId].attempts += Number(toneStats.attempts || 0);
        result[toneId].correct += Number(toneStats.correct || 0);
      });
    });
  });
  return result;
}

function formatConceptLabel(sectionId, conceptId) {
  const banks = {
    intervals: INTERVAL_BANK,
    scales: SCALE_BANK,
    progressions: PROGRESSION_BANK,
    theory: QUALITY_BANK,
    melody: MELODY_BANK,
    jam: JAM_PROGRESSIONS,
    noteid: NOTE_IDENTIFICATION_BANK,
    keyid: KEY_SIGNATURE_BANK,
  };
  return banks[sectionId]?.find((item) => item.id === conceptId)?.label || conceptId.replace(/_/g, " ");
}

function getAchievements() {
  const weeklySessions = getWeeklySessions();
  return [
    { title: "First rep", unlocked: totalSessions() >= 1 },
    { title: "Week in motion", unlocked: weeklySessions >= getWeeklyTarget() },
    { title: "Daily complete", unlocked: getDailyHistory().completed },
    { title: "80 club", unlocked: overallAccuracy() >= 80 && totalSessions() >= 5 },
  ];
}

function updateStreak() {
  const today = todayId();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (state.streak.lastDate === today) {
    return;
  }
  if (state.streak.lastDate === yesterday) {
    state.streak.count += 1;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function sampleOptions(pool, correctItem, totalChoices) {
  const working = pool.filter((item) => item.id !== correctItem.id);
  const options = [correctItem];
  while (options.length < totalChoices && working.length) {
    const pickIndex = Math.floor(Math.random() * working.length);
    options.push(working.splice(pickIndex, 1)[0]);
  }
  return shuffle(options).map((item) => ({ id: item.id, label: item.label }));
}

function sampleOptionsForConcept(pool, correctItem, totalChoices, sectionId) {
  const stats = getSectionProgress(sectionId).itemStats[correctItem.id];
  const confusionIds = Object.entries(stats?.confusedWith || {})
    .sort((left, right) => right[1] - left[1])
    .map(([conceptId]) => conceptId);
  const prioritized = [];
  confusionIds.forEach((conceptId) => {
    const found = pool.find((item) => item.id === conceptId && item.id !== correctItem.id);
    if (found && !prioritized.some((item) => item.id === found.id)) {
      prioritized.push(found);
    }
  });
  const remaining = shuffle(
    pool.filter(
      (item) => item.id !== correctItem.id && !prioritized.some((prioritizedItem) => prioritizedItem.id === item.id)
    )
  );
  const combined = [...prioritized, ...remaining];
  return shuffle([correctItem, ...combined.slice(0, Math.max(0, totalChoices - 1))]).map((item) => ({
    id: item.id,
    label: item.label,
  }));
}

function selectWeightedItem(pool, sectionId, settings) {
  const progress = getSectionProgress(sectionId);
  const now = Date.now();
  const weights = pool.map((item) => {
    const itemStats = progress.itemStats[item.id];
    if (!itemStats || !itemStats.attempts) {
      return settings.goal === "fresh" ? 4.2 : 2.8;
    }
    const accuracy = itemStats.correct / itemStats.attempts;
    const dueBoost = itemStats.nextDueAt && itemStats.nextDueAt <= now ? 1.4 : 0;
    const confusionBoost = Object.values(itemStats.confusedWith || {}).reduce((sum, count) => sum + count, 0) * 0.08;
    const freshnessBoost = settings.goal === "fresh" ? clamp(2 - itemStats.attempts * 0.15, 0, 1.8) : 0;
    const masteryBoost = settings.goal === "mastery" ? clamp(1.8 - accuracy * 1.1, 0.3, 1.6) : 0.8 - accuracy * 0.3;
    const speedBoost = settings.goal === "speed" ? clamp((itemStats.averageMs || 2200) / 1800, 0.4, 1.4) : 0;
    return clamp(0.7 + dueBoost + confusionBoost + freshnessBoost + masteryBoost + speedBoost, 0.55, 6);
  });
  const total = weights.reduce((sum, value) => sum + value, 0);
  let threshold = Math.random() * total;
  for (let index = 0; index < pool.length; index += 1) {
    threshold -= weights[index];
    if (threshold <= 0) {
      return pool[index];
    }
  }
  return pool[pool.length - 1];
}

function optionPoolFor(bank, difficulty, desiredChoices) {
  let pool = bank.filter((item) => item.difficulty <= difficulty);
  if (pool.length >= desiredChoices) {
    return pool;
  }
  pool = bank.filter((item) => item.difficulty <= difficulty + 1);
  if (pool.length >= desiredChoices) {
    return pool;
  }
  return [...bank];
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let mixed = Math.imul(value ^ (value >>> 15), value | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailyChallenge() {
  const id = todayId();
  const random = mulberry32(hashString(id));
  const sectionIds = getActivePath().sections;
  const sectionId = sectionIds[Math.floor(random() * sectionIds.length)];
  const section = SECTION_DEFS[sectionId];
  const difficulty = DIFFICULTIES[Math.floor(random() * DIFFICULTIES.length)].id;
  const mode = section.modes[Math.floor(random() * section.modes.length)].id;
  const tone = TONES[Math.floor(random() * TONES.length)].id;

  return {
    id,
    title: `${section.title} Daily`,
    sectionId,
    blurb: `${DIFFICULTIES[difficultyIndex(difficulty)].label} listening sprint in ${section.title.toLowerCase()}.`,
    settings: {
      difficulty,
      choices: 4,
      tone,
      reference: false,
      context: false,
      mode,
    },
    questionCount: DAILY_SESSION_LENGTH,
  };
}

function getDailyHistory() {
  const id = todayId();
  if (state.dailyHistory.id !== id) {
    state.dailyHistory = {
      id,
      attempts: 0,
      bestAccuracy: 0,
      completed: false,
    };
    saveState();
  }
  return state.dailyHistory;
}

function markDailyAttempt(accuracy) {
  const history = getDailyHistory();
  history.attempts += 1;
  history.completed = true;
  history.bestAccuracy = Math.max(history.bestAccuracy, accuracy);
}

function buildQuestion(sectionId, settings, forcedConceptId = null) {
  switch (sectionId) {
    case "intervals":
      return buildIntervalQuestion(settings, forcedConceptId);
    case "scales":
      return buildScaleQuestion(settings, forcedConceptId);
    case "progressions":
      return buildProgressionQuestion(settings, forcedConceptId);
    case "theory":
      return buildTheoryQuestion(settings, forcedConceptId);
    case "melody":
      return buildMelodyQuestion(settings, forcedConceptId);
    case "jam":
      return buildJamQuestion(settings, forcedConceptId);
    case "noteid":
      return buildNoteIdentificationQuestion(settings, forcedConceptId);
    case "keyid":
      return buildKeyIdentificationQuestion(settings, forcedConceptId);
    default:
      throw new Error(`Unknown section ${sectionId}`);
  }
}

function buildIntervalQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const pool = INTERVAL_BANK.filter((item) => item.difficulty <= difficulty);
  const optionPool = optionPoolFor(INTERVAL_BANK, difficulty, settings.choices);
  const correct = forcedConceptId ? pool.find((item) => item.id === forcedConceptId) || pool[0] : selectWeightedItem(pool, "intervals", settings);
  const direction =
    settings.mode === "mixed"
      ? randomItem(["ascending", "descending", "harmonic"])
      : settings.mode;
  const intervalFloor = 43;
  const intervalCeiling = direction === "harmonic" ? 64 : 67;
  const minRoot = direction === "descending" ? intervalFloor + correct.semitones : 45;
  const maxRoot = direction === "descending" ? 60 : intervalCeiling - correct.semitones;
  const clampedMin = Math.min(minRoot, maxRoot);
  const clampedMax = Math.max(minRoot, maxRoot);
  const rootMidi = clampedMin + Math.floor(Math.random() * (clampedMax - clampedMin + 1));
  const options = sampleOptionsForConcept(optionPool, correct, settings.choices, "intervals");
  const otherMidi = direction === "descending" ? rootMidi - correct.semitones : rootMidi + correct.semitones;

  return {
    id: `intervals:${correct.id}:${direction}:${rootMidi}`,
    conceptId: correct.id,
    prompt: "Which interval did you hear?",
    support:
      direction === "ascending"
        ? "First note, then the higher note one second later."
        : direction === "descending"
          ? "First note, then the lower note one second later."
          : "Two notes, one second apart. Judge the distance between them.",
    correctId: correct.id,
    correctLabel: correct.label,
    options,
    note: correct.note,
    aliases: [correct.label, correct.id],
    explanation: `Cue: ${correct.note} Try singing the distance before looking at the answer.`,
    async play() {
      const firstMidi = direction === "descending" ? otherMidi : rootMidi;
      const secondMidi = direction === "descending" ? rootMidi : otherMidi;
      await playIntervalSampleSequence([firstMidi, secondMidi], settings.tone, settings.articulation);
    },
  };
}

function buildScalePattern(correct, difficulty) {
  const highestDegree = correct.intervals.length - 1;
  const upperColor = Math.min(5, highestDegree);
  const topTurn = Math.min(6, highestDegree);
  const variants = [
    correct.degrees,
    [0, 1, 2, Math.min(4, highestDegree), upperColor, Math.min(4, highestDegree), 2, 0],
    [0, 2, Math.min(4, highestDegree), topTurn, upperColor, 3, 2, 0],
    [0, Math.min(4, highestDegree), 2, upperColor, 3, 1, 0],
  ];
  return randomItem(variants.slice(0, Math.min(variants.length, difficulty + 2))).map((degreeIndex) =>
    clamp(degreeIndex, 0, highestDegree)
  );
}

function buildRhythmicNoteSteps(rootMidi, intervals, degreePattern, gain = 0.18) {
  const rhythms = randomItem([
    [0.3, 0.3, 0.42, 0.3, 0.3, 0.48, 0.36, 0.58],
    [0.38, 0.24, 0.24, 0.44, 0.28, 0.28, 0.52],
    [0.26, 0.26, 0.26, 0.5, 0.32, 0.44, 0.58],
  ]);
  return degreePattern.map((degreeIndex, index) => ({
    notes: [rootMidi + intervals[clamp(degreeIndex, 0, intervals.length - 1)]],
    duration: rhythms[index % rhythms.length],
    gap: index === degreePattern.length - 1 ? 0 : randomItem([0.035, 0.055, 0.08]),
    gain,
  }));
}

function pushChordEvent(sequence, notes, duration, gap, gain, style = "block") {
  const sorted = notes.slice().sort((left, right) => left - right);
  if (style === "arp") {
    sorted.forEach((note, index) => {
      sequence.push({
        notes: [note],
        duration: index === sorted.length - 1 ? Math.max(0.36, duration * 0.72) : 0.18,
        gap: index === sorted.length - 1 ? gap : 0.035,
        gain: gain * 0.92,
      });
    });
    return;
  }
  if (style === "strum") {
    sequence.push({ notes: [sorted[0]], duration: 0.12, gap: 0.02, gain: gain * 0.75 });
    sequence.push({ notes: sorted.slice(1), duration: Math.max(0.42, duration - 0.14), gap, gain });
    return;
  }
  sequence.push({ notes: sorted, duration, gap, gain });
}

function varyMelodyDegrees(degrees, missing, difficulty) {
  const variants = [
    degrees,
    degrees.concat(degrees.slice(-2).reverse()),
    degrees.length > 2 ? [degrees[0], degrees[1], degrees[0], ...degrees.slice(1)] : degrees,
  ];
  const selected = randomItem(variants.slice(0, Math.min(variants.length, difficulty + 1)));
  return selected.filter((degreeIndex) => degreeIndex !== missing).slice(0, 6);
}

function buildScaleQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const pool = SCALE_BANK.filter((item) => item.difficulty <= difficulty);
  const optionPool = optionPoolFor(SCALE_BANK, difficulty, settings.choices);
  const correct = forcedConceptId ? pool.find((item) => item.id === forcedConceptId) || pool[0] : selectWeightedItem(pool, "scales", settings);
  const options = sampleOptionsForConcept(optionPool, correct, settings.choices, "scales");
  const rootMidi = 50 + Math.floor(Math.random() * 10);
  const scaleIntervals = correct.intervals;
  const melodyPattern = buildScalePattern(correct, difficulty);

  return {
    id: `scales:${correct.id}:${rootMidi}`,
    conceptId: correct.id,
    prompt: "Name the scale color.",
    support:
      settings.mode === "drone"
        ? "Listen for the scale color against the low tonic."
        : "Listen for the scale shape in the phrase.",
    correctId: correct.id,
    correctLabel: correct.label,
    options,
    note: correct.note,
    aliases: [correct.label, correct.id, correct.label.split("/")[0].trim()],
    explanation: `Cue: ${correct.note} Listen for the color tone against the tonic, not just the first note.`,
    async play() {
      const sequence = buildRhythmicNoteSteps(rootMidi, scaleIntervals, melodyPattern, 0.18);
      if (settings.mode === "drone") {
        sequence.unshift({ notes: [rootMidi - 12], duration: 0.7, gap: 0.03, gain: 0.1 });
      }
      await playSequence(sequence, settings.tone, settings.articulation);
    },
  };
}

function progressionChordMidi(mode, degree, rootMidi, sevenths) {
  const majorScale = [0, 2, 4, 5, 7, 9, 11];
  const minorScale = [0, 2, 3, 5, 7, 8, 10];
  const scale = mode === "minor" ? minorScale : majorScale;
  const root = rootMidi + scale[degree];
  let chord;
  if (mode === "minor") {
    const minorTriads = [
      [0, 3, 7],
      [0, 3, 7],
      [0, 4, 7],
      [0, 3, 7],
      [0, 3, 7],
      [0, 4, 7],
      [0, 4, 7],
    ];
    chord = minorTriads[degree];
  } else {
    const majorTriads = [
      [0, 4, 7],
      [0, 3, 7],
      [0, 3, 7],
      [0, 4, 7],
      [0, 4, 7],
      [0, 3, 7],
      [0, 3, 6],
    ];
    chord = majorTriads[degree];
  }
  const seventhInterval = mode === "minor" ? (degree === 5 ? 11 : 10) : degree === 0 ? 11 : 10;
  const notes = chord.map((interval) => root + interval);
  if (sevenths) {
    notes.push(root + seventhInterval);
  }
  return notes;
}

function buildProgressionQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const allowSevenths = settings.mode === "sevenths";
  const pool = PROGRESSION_BANK.filter(
    (item) => item.difficulty <= difficulty && (!allowSevenths || item.sevenths || item.difficulty < 2)
  );
  const optionPool = optionPoolFor(PROGRESSION_BANK, difficulty, settings.choices);
  const correct = forcedConceptId ? pool.find((item) => item.id === forcedConceptId) || pool[0] : selectWeightedItem(pool, "progressions", settings);
  const options = sampleOptionsForConcept(optionPool, correct, settings.choices, "progressions");
  const rootMidi = correct.mode === "minor" ? 45 + Math.floor(Math.random() * 7) : 48 + Math.floor(Math.random() * 7);

  return {
    id: `progressions:${correct.id}:${rootMidi}:${settings.mode}`,
    conceptId: correct.id,
    prompt: "Identify the progression.",
    support: correct.mode === "minor" ? "Listen for the minor home base." : "Focus on the tonic pull.",
    correctId: correct.id,
    correctLabel: correct.label,
    options,
    note: correct.note,
    aliases: [correct.label, correct.id],
    explanation: `Cue: ${correct.note} Focus on where the progression wants to resolve, not each chord in isolation.`,
    async play() {
      const sequence = [];
      const chordStyle = randomItem(["block", "strum", allowSevenths ? "arp" : "block"]);
      correct.degreeSet.forEach((degree, index) => {
        pushChordEvent(
          sequence,
          progressionChordMidi(correct.mode, degree, rootMidi, allowSevenths || correct.sevenths),
          index === correct.degreeSet.length - 1 ? 0.92 : randomItem([0.62, 0.72, 0.82]),
          randomItem([0.055, 0.085, 0.12]),
          0.16,
          chordStyle
        );
      });
      await playSequence(sequence, settings.tone, settings.articulation);
    },
  };
}

function buildTheoryQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const extensionsMode = settings.mode === "extensions";
  const pool = QUALITY_BANK.filter((item) =>
    extensionsMode ? item.difficulty >= 1 && item.difficulty <= difficulty + 1 : item.difficulty <= difficulty
  );
  const optionPool = optionPoolFor(QUALITY_BANK, difficulty, settings.choices);
  const correct = forcedConceptId ? pool.find((item) => item.id === forcedConceptId) || pool[0] : selectWeightedItem(pool, "theory", settings);
  const options = sampleOptionsForConcept(optionPool, correct, settings.choices, "theory");
  const rootMidi = 50 + Math.floor(Math.random() * 10);
  const inversionShift = difficulty > 0 ? randomItem([0, 0, 12]) : 0;

  return {
    id: `theory:${correct.id}:${rootMidi}:${settings.mode}`,
    conceptId: correct.id,
    prompt: settings.mode === "extensions" ? "What chord color is this?" : "Which chord quality is this?",
    support: "Listen for the 3rd, 5th, and top color against the root.",
    correctId: correct.id,
    correctLabel: correct.label,
    options,
    note: correct.note,
    aliases: [correct.label, correct.id],
    explanation: `Cue: ${correct.note} Hear the 3rd first, then the top tension or altered color.`,
    async play() {
      const notes = correct.intervals.map((interval, index) => rootMidi + interval + (index === 0 ? 0 : inversionShift));
      const spread = shuffle(notes).sort((left, right) => left - right);
      const sequence = [];
      pushChordEvent(sequence, spread, 1.08, 0, 0.17, randomItem(["block", "arp", "strum"]));
      await playSequence(sequence, settings.tone, settings.articulation);
    },
  };
}

function buildMelodyQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const pool = MELODY_BANK.filter((item) => item.difficulty <= difficulty);
  const correct = forcedConceptId ? pool.find((item) => item.id === forcedConceptId) || pool[0] : selectWeightedItem(pool, "melody", settings);
  const rootMidi = correct.scale === "minor" ? 52 : 55;
  const scale = SCALE_REFERENCE[correct.scale];
  const answerChoices = buildMelodyChoices(correct, difficulty, settings);
  const prompt =
    settings.mode === "chromatic"
      ? "Which note completes the line?"
      : "Choose the missing scale degree.";

  return {
    id: `melody:${correct.id}:${rootMidi}:${settings.mode}`,
    conceptId: correct.id,
    prompt,
    support: "The last note is missing. Hear where the phrase wants to go.",
    correctId: correct.id,
    correctLabel: correct.label,
    options: answerChoices,
    note: correct.note,
    aliases: [correct.label, correct.id],
    explanation: `Cue: ${correct.note} Hear whether the phrase wants rest, lift, or a hanging tension.`,
    async play() {
      const phraseDegrees = varyMelodyDegrees(correct.degrees, correct.missing, difficulty);
      const sequence = buildRhythmicNoteSteps(rootMidi, scale, phraseDegrees, 0.18);
      sequence.push({ notes: [], duration: 0.25, gap: 0.04, gain: 0 });
      await playSequence(sequence, settings.tone, settings.articulation);
    },
  };
}

function buildMelodyChoices(correct, difficulty, settings) {
  const scale = SCALE_REFERENCE[correct.scale];
  const allowed = [];
  scale.forEach((_, degreeIndex) => {
    if (degreeIndex < 7) {
      allowed.push({
        id: `${correct.scale}_${degreeIndex}`,
        label: degreeLabelForIndex(correct.scale, degreeIndex),
      });
    }
  });
  if (settings.mode === "chromatic" || difficulty >= 2) {
    allowed.push({ id: "outside_flat5", label: "#4 / b5" });
    allowed.push({ id: "outside_major7", label: "7 (leading tone)" });
  }
  const correctOption = {
    id: correct.id,
    label: correct.label,
  };
  const correctDegreeLabel = degreeLabelForIndex(correct.scale, correct.missing);
  const distractors = allowed.filter(
    (item) =>
      normalizeAnswer(item.label) !== normalizeAnswer(correct.label) &&
      normalizeAnswer(item.label) !== normalizeAnswer(correctDegreeLabel)
  );
  return sampleOptions(distractors, correctOption, settings.choices);
}

function fretboardNoteOptions(correct, settings) {
  const preferFlats = state.fretboardAccidental === "flat";
  const naturalPcs = [0, 2, 4, 5, 7, 9, 11];
  const pool = (settings.mode === "natural" ? naturalPcs : Array.from({ length: 12 }, (_, pc) => pc)).map((pc) => ({
    id: noteNameForPc(pc, preferFlats),
    label: noteNameForPc(pc, preferFlats),
    pc,
  }));
  const correctOption = {
    id: noteNameForPc(correct.pc, preferFlats),
    label: noteNameForPc(correct.pc, preferFlats),
    pc: correct.pc,
  };
  return sampleOptions(pool, correctOption, settings.choices);
}

function buildNoteIdentificationQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const pool = NOTE_IDENTIFICATION_BANK.filter((item) =>
    settings.mode === "natural"
      ? item.difficulty <= difficulty && [0, 2, 4, 5, 7, 9, 11].includes(item.pc)
      : item.difficulty <= difficulty + 1
  );
  const correct = forcedConceptId
    ? pool.find((item) => item.id === forcedConceptId) || pool[0]
    : randomItem(pool.length ? pool : NOTE_IDENTIFICATION_BANK);
  const preferFlats = state.fretboardAccidental === "flat";
  const label = noteNameForPc(correct.pc, preferFlats);
  const map = {
    keyName: `${label} note map`,
    root: label,
    rootPc: correct.pc,
    progression: `${correct.string} string · fret ${correct.fret}`,
    scaleId: "majorPent",
    scaleName: "All matching notes",
    scaleFormula: label,
    scaleIntervals: [],
    scaleTab: [],
    view: "roots",
    frets: state.fretboardFrets,
    anchors: rootAnchorsForPc(correct.pc),
    chordRows: [],
    chordTonePcs: [],
    preferFlats,
    theory: `Find every ${label} across strings. The prompt note is on the ${correct.string} string at fret ${correct.fret}.`,
  };
  return {
    id: `noteid:${correct.id}:${label}`,
    conceptId: label,
    prompt: "What note is this fret?",
    support: `${correct.string} string · fret ${correct.fret}`,
    correctId: label,
    correctLabel: label,
    options: fretboardNoteOptions(correct, settings),
    note: correct.note.replace(correct.label, label),
    aliases: [label],
    visual: renderFretPromptVisual(correct, label),
    guitarMap: map,
    explanation: `Cue: count from the open ${correct.string} string, then memorize the same ${label} shape on nearby strings.`,
    async play() {
      await playSequence([{ notes: [40 + correct.pc + Math.floor(correct.fret / 5) * 12], duration: 0.62, gap: 0, gain: 0.17 }], settings.tone, settings.articulation);
    },
  };
}

function keySignatureSymbols(fifths) {
  if (fifths > 0) {
    return Array.from({ length: fifths }, (_, index) => ["F", "C", "G", "D", "A", "E", "B"][index]).map((note) => `${note}#`);
  }
  if (fifths < 0) {
    return Array.from({ length: Math.abs(fifths) }, (_, index) => ["B", "E", "A", "D", "G", "C", "F"][index]).map((note) => `${note}b`);
  }
  return [];
}

function buildKeyIdentificationQuestion(settings, forcedConceptId = null) {
  const difficulty = difficultyIndex(settings.difficulty);
  const mode = settings.mode || "major";
  const pool = KEY_SIGNATURE_BANK.filter((item) => {
    const modeMatch = mode === "mixed" || item.mode === mode;
    const complexity = Math.abs(item.fifths) <= (difficulty === 0 ? 2 : difficulty === 1 ? 4 : 6);
    return modeMatch && complexity;
  });
  const optionPool = KEY_SIGNATURE_BANK.filter((item) => mode === "mixed" || item.mode === mode);
  const correct = forcedConceptId
    ? pool.find((item) => item.id === forcedConceptId) || pool[0]
    : randomItem(pool.length ? pool : KEY_SIGNATURE_BANK);
  return {
    id: `keyid:${correct.id}:${correct.mode}`,
    conceptId: correct.id,
    prompt: `What ${correct.mode} key is this?`,
    support: correct.fifths === 0 ? "No sharps or flats." : `${Math.abs(correct.fifths)} ${correct.fifths > 0 ? "sharp" : "flat"}${Math.abs(correct.fifths) === 1 ? "" : "s"}.`,
    correctId: correct.id,
    correctLabel: correct.label,
    options: sampleOptions(optionPool, correct, settings.choices),
    note: correct.note,
    aliases: [correct.id, correct.label, correct.relative],
    visual: renderKeySignatureVisual(correct),
    explanation: `Cue: ${correct.note} Relative key: ${correct.relative}.`,
    async play() {
      const root = 48 + (NOTE_TO_PC[correct.id.replace(/m$/, "")] ?? 0);
      await playSequence([{ notes: [root, root + 4, root + 7], duration: 0.8, gap: 0, gain: 0.13 }], settings.tone, settings.articulation);
    },
  };
}

function degreeLabelForIndex(scaleName, degreeIndex) {
  if (scaleName === "minor") {
    const labels = ["1", "2", "b3", "4", "5", "b6", "b7"];
    return labels[degreeIndex] || DEGREE_LABELS[degreeIndex];
  }
  return DEGREE_LABELS[degreeIndex] || `${degreeIndex + 1}`;
}

function pitchClass(value) {
  return ((value % 12) + 12) % 12;
}

function noteNameForPc(pc, preferFlats = false) {
  return (preferFlats ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[pitchClass(pc)];
}

const DOMINANT_SEVENTH_SPELLINGS = {
  C: ["C", "E", "G", "Bb"],
  "C#": ["C#", "E#", "G#", "B"],
  Db: ["Db", "F", "Ab", "Cb"],
  D: ["D", "F#", "A", "C"],
  "D#": ["D#", "F##", "A#", "C#"],
  Eb: ["Eb", "G", "Bb", "Db"],
  E: ["E", "G#", "B", "D"],
  F: ["F", "A", "C", "Eb"],
  "F#": ["F#", "A#", "C#", "E"],
  Gb: ["Gb", "Bb", "Db", "Fb"],
  G: ["G", "B", "D", "F"],
  "G#": ["G#", "B#", "D#", "F#"],
  Ab: ["Ab", "C", "Eb", "Gb"],
  A: ["A", "C#", "E", "G"],
  "A#": ["A#", "C##", "E#", "G#"],
  Bb: ["Bb", "D", "F", "Ab"],
  B: ["B", "D#", "F#", "A"],
};

function keyRootName(key) {
  return key.mode === "minor" ? key.name.replace(/m$/, "") : key.name;
}

function selectJamKey(mode) {
  const keys = JAM_KEYS.filter((key) => key.mode === mode);
  return randomItem(keys.length ? keys : JAM_KEYS);
}

function chordRootPc(key, step) {
  return pitchClass(key.pc + step.semitone);
}

function preferFlatsForJamStep(key, step) {
  const roman = step.roman.toLowerCase();
  if (key.name.includes("b") || roman.includes("b")) {
    return true;
  }
  // Borrowed minor iv is usually spelled with the flat-side color (for example Fm = F Ab C in C).
  return Boolean(step.outside && roman === "iv");
}

function chordRootName(key, step) {
  return noteNameForPc(chordRootPc(key, step), preferFlatsForJamStep(key, step));
}

function chordNameForStep(key, step) {
  return `${chordRootName(key, step)}${QUALITY_SUFFIX[step.quality] || ""}`;
}

function accidentalSuffix(diff) {
  if (diff === 0) return "";
  if (diff > 0) return "#".repeat(diff);
  return "b".repeat(Math.abs(diff));
}

function spellChordTones(rootName, quality) {
  const intervals = CHORD_QUALITY_INTERVALS[quality] || CHORD_QUALITY_INTERVALS.maj;
  const letterOffsets = {
    sus4: [0, 3, 4],
    sus2: [0, 1, 4],
  }[quality] || [0, 2, 4, 6, 8].slice(0, intervals.length);
  const letters = ["C", "D", "E", "F", "G", "A", "B"];
  const naturalPc = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const rootLetter = rootName[0];
  const rootLetterIndex = letters.indexOf(rootLetter);
  const rootPc = NOTE_TO_PC[rootName] ?? NOTE_TO_PC[rootLetter] ?? 0;
  if (rootLetterIndex < 0) {
    return intervals.map((interval) => noteNameForPc(rootPc + interval, rootName.includes("b")));
  }
  return intervals.map((interval, index) => {
    const letter = letters[(rootLetterIndex + letterOffsets[index]) % letters.length];
    const targetPc = pitchClass(rootPc + interval);
    let diff = targetPc - naturalPc[letter];
    if (diff > 6) diff -= 12;
    if (diff < -6) diff += 12;
    return `${letter}${accidentalSuffix(diff)}`;
  });
}

function dominantToneNamesForStep(key, step) {
  return DOMINANT_SEVENTH_SPELLINGS[chordRootName(key, step)] || null;
}

function normalizedChordRootMidi(key, step) {
  let root = key.midi + step.semitone;
  while (root < 40) root += 12;
  while (root > 55) root -= 12;
  return root;
}

function chordMidiForJamStep(key, step) {
  const root = normalizedChordRootMidi(key, step);
  return (CHORD_QUALITY_INTERVALS[step.quality] || CHORD_QUALITY_INTERVALS.maj).map((interval) => root + interval);
}

function rootAnchorsForPc(pc) {
  return STRING_ANCHORS.map((anchor) => {
    const fret = pitchClass(pc - anchor.open);
    return {
      label: anchor.label,
      string: anchor.string,
      fret,
    };
  });
}

function movableShapeHint(quality) {
  const hints = {
    maj: "Root 6: E-shape major / Root 5: A-shape major",
    min: "Root 6: E-minor shape / Root 5: A-minor shape",
    dom7: "Root 6: E7 shape / Root 5: A7 shape",
    min7: "Root 6: Em7 shape / Root 5: Am7 shape",
    maj7: "Root 6 or 5 major-7 shell voicing",
    dim: "Moveable diminished triad or dim7 grip",
    sus4: "Moveable sus4 grip from the major barre shape",
  };
  return hints[quality] || "Moveable root-6 or root-5 barre shape";
}

function chordFingeringForStep(key, step) {
  const name = chordRootName(key, step);
  const open = OPEN_CHORD_FINGERINGS[`${name}:${step.quality}`];
  if (open) {
    return `Shape: ${open}`;
  }
  const anchors = rootAnchorsForPc(chordRootPc(key, step));
  const root6 = anchors.find((anchor) => anchor.label === "Root 6");
  const root5 = anchors.find((anchor) => anchor.label === "Root 5");
  return `${movableShapeHint(step.quality)} · ${root6?.string}${root6?.fret ?? "?"} / ${root5?.string}${root5?.fret ?? "?"}`;
}

function chordToneNamesForStep(key, step) {
  return spellChordTones(chordRootName(key, step), step.quality);
}

function getPracticalKey(keyId = state.selectedJamKey) {
  return JAM_KEYS.find((key) => key.name === keyId) || JAM_KEYS.find((key) => key.name === "A");
}

function getPracticalKeyRoot(key = getPracticalKey()) {
  return keyRootName(key);
}

function stepsForKey(key = getPracticalKey()) {
  return key.mode === "minor" ? MINOR_KEY_STEPS : MAJOR_KEY_STEPS;
}

function diatonicRowsForKey(key = getPracticalKey()) {
  return stepsForKey(key).map((step) => ({
    ...step,
    name: chordNameForStep(key, step),
    root: chordRootName(key, step),
    tones: chordToneNamesForStep(key, step),
    fingering: chordFingeringForStep(key, step),
    qualityLabel: QUALITY_LABEL[step.quality] || step.quality,
  }));
}

function findDiatonicStep(key, roman) {
  return stepsForKey(key).find((step) => step.roman === roman) || stepsForKey(key)[0];
}

function chordTonePcsForStep(key, step) {
  return (CHORD_QUALITY_INTERVALS[step.quality] || CHORD_QUALITY_INTERVALS.maj).map((interval) =>
    pitchClass(chordRootPc(key, step) + interval)
  );
}

function recommendedScaleIdForKey(key = getPracticalKey()) {
  if (key.mode === "minor") {
    return state.selectedFretboardScale === "majorPent" ? "minorPent" : state.selectedFretboardScale;
  }
  return state.selectedFretboardScale === "minor" ? "majorPent" : state.selectedFretboardScale;
}

function getPracticalRecipe(key = getPracticalKey()) {
  return PRACTICAL_JAM_RECIPES.find((recipe) => recipe.keyMode === key.mode) || PRACTICAL_JAM_RECIPES[0];
}

function chordNamesForRecipe(key, recipe) {
  return recipe.chords.map((roman) => {
    const step = findDiatonicStep(key, roman);
    return chordNameForStep(key, step);
  });
}

function buildLearningFretboardMap(options = {}) {
  const key = options.key || getPracticalKey();
  const scaleId = options.scaleId || recommendedScaleIdForKey(key);
  const scale = JAM_SCALE_LIBRARY[scaleId] || JAM_SCALE_LIBRARY.majorPent;
  const chordStep = options.chordStep || findDiatonicStep(key, key.mode === "minor" ? "i" : "I");
  const view = options.view || state.selectedFretboardView;
  const keyName = key.mode === "minor" ? key.name : `${key.name} major`;
  return {
    keyName,
    root: getPracticalKeyRoot(key),
    rootPc: key.pc,
    progression: options.progression || "full neck",
    scaleId: scale.id,
    scaleName: scale.label,
    scaleFormula: scale.formula,
    scaleIntervals: scale.intervals,
    scaleTab: scale.tab,
    view,
    anchors: rootAnchorsForPc(key.pc),
    chordRows: diatonicRowsForKey(key).slice(0, key.mode === "minor" ? 7 : 7),
    chordTonePcs: chordTonePcsForStep(key, chordStep),
    activeChord: {
      roman: chordStep.roman,
      name: chordNameForStep(key, chordStep),
      tones: chordToneNamesForStep(key, chordStep),
    },
    preferFlats: key.name.includes("b") || stepsForKey(key).some((step) => preferFlatsForJamStep(key, step)),
    theory: options.theory || "Use the neck as a map: roots first, scale next, chord tones when the chord changes.",
  };
}

function intervalLabelForPc(pc, rootPc) {
  return CHROMATIC_INTERVAL_LABELS[pitchClass(pc - rootPc)] || "?";
}

function renderKeyChips(action, selectedId = state.selectedJamKey) {
  return PRACTICAL_KEY_CHOICES.map(
    (key) => `
      <button class="stage-chip ${selectedId === key.id ? "active" : ""}" data-action="${action}" data-value="${key.id}">
        ${key.label}
      </button>
    `
  ).join("");
}

function renderScaleChips() {
  return PRACTICAL_SCALES.map((scaleId) => {
    const scale = JAM_SCALE_LIBRARY[scaleId];
    return `
      <button class="stage-chip ${state.selectedFretboardScale === scaleId ? "active" : ""}" data-action="set-fretboard-scale" data-value="${scaleId}">
        ${scale.label}
      </button>
    `;
  }).join("");
}

function renderFretboardViewChips() {
  return FRETBOARD_VIEWS.map(
    (view) => `
      <button class="stage-chip ${state.selectedFretboardView === view.id ? "active" : ""}" data-action="set-fretboard-view" data-value="${view.id}">
        ${view.label}
      </button>
    `
  ).join("");
}

function chordQualityChips() {
  return ["maj", "min", "dom7", "min7", "maj7"].map(
    (quality) => `
      <button class="stage-chip ${state.selectedChordQuality === quality ? "active" : ""}" data-action="set-chord-quality" data-value="${quality}">
        ${QUALITY_SUFFIX[quality] || "maj"}
      </button>
    `
  ).join("");
}

function selectedChordPseudoKey() {
  const root = NOTE_TO_PC[state.selectedChordRoot] ?? NOTE_TO_PC.A;
  return {
    name: state.selectedChordRoot,
    pc: root,
    midi: 40 + root,
    mode: state.selectedChordQuality.includes("min") ? "minor" : "major",
  };
}

function selectedChordStep() {
  return { roman: "Chord", semitone: 0, quality: state.selectedChordQuality };
}

function selectedChordToneNames() {
  const key = selectedChordPseudoKey();
  return chordToneNamesForStep(key, selectedChordStep());
}

function selectedChordName() {
  const key = selectedChordPseudoKey();
  return chordNameForStep(key, selectedChordStep());
}

function selectedChordMap() {
  const key = selectedChordPseudoKey();
  const step = selectedChordStep();
  return {
    keyName: selectedChordName(),
    root: state.selectedChordRoot,
    rootPc: key.pc,
    progression: "movable chord",
    scaleId: "majorPent",
    scaleName: QUALITY_LABEL[state.selectedChordQuality] || "Chord tones",
    scaleFormula: selectedChordToneNames().join(" · "),
    scaleIntervals: [],
    scaleTab: [],
    view: "chord",
    anchors: rootAnchorsForPc(key.pc),
    chordRows: [
      {
        roman: "R",
        name: selectedChordName(),
        quality: QUALITY_LABEL[state.selectedChordQuality] || state.selectedChordQuality,
        fingering: chordFingeringForStep(key, step),
        tones: selectedChordToneNames(),
      },
    ],
    chordTonePcs: chordTonePcsForStep(key, step),
    activeChord: { roman: "R", name: selectedChordName(), tones: selectedChordToneNames() },
    preferFlats: state.selectedChordRoot.includes("b"),
    theory: "Chord tones are the notes you can land on anywhere on the neck.",
  };
}

function chordShapeCards() {
  const key = selectedChordPseudoKey();
  const anchors = rootAnchorsForPc(key.pc);
  const root6 = anchors.find((anchor) => anchor.label === "Root 6");
  const root5 = anchors.find((anchor) => anchor.label === "Root 5");
  const root4 = anchors.find((anchor) => anchor.label === "Root 4");
  const majorMinor = state.selectedChordQuality.includes("min") ? "minor" : "major";
  return [
    {
      title: "Root 6 barre",
      anchor: `${root6.string}${root6.fret}`,
      formula: majorMinor === "minor" ? "R 5 R b3 5 R" : "R 5 R 3 5 R",
      use: "Big rock chord from the low E string. This is the first movable home base.",
    },
    {
      title: "Root 5 barre",
      anchor: `${root5.string}${root5.fret}`,
      formula: majorMinor === "minor" ? "x R 5 R b3 5" : "x R 5 R 3 5",
      use: "Move the A-shape family up the neck. Great for rhythm parts that stay out of the bass.",
    },
    {
      title: "Root 4 shell",
      anchor: `${root4.string}${root4.fret}`,
      formula: state.selectedChordQuality.includes("7") ? "R 3 b7" : "R 3 5",
      use: "Compact grip for jams. Less mud, more band-friendly.",
    },
    {
      title: "Top-string triads",
      anchor: "strings 1-3",
      formula: majorMinor === "minor" ? "R b3 5 inversions" : "R 3 5 inversions",
      use: "Solo and comp at the same time. These are the secret weapon for playing everywhere.",
    },
  ];
}

function labRootName() {
  const flatRoots = { D: "Db", E: "Eb", G: "Gb", A: "Ab", B: "Bb" };
  const sharpRoots = { C: "C#", D: "D#", F: "F#", G: "G#", A: "A#" };
  if (state.fretboardAccidental === "flat" && flatRoots[state.fretboardRoot]) {
    return flatRoots[state.fretboardRoot];
  }
  if (state.fretboardAccidental === "sharp" && sharpRoots[state.fretboardRoot]) {
    return sharpRoots[state.fretboardRoot];
  }
  return state.fretboardRoot;
}

function selectedLabScaleId() {
  if (state.fretboardHarmony === "chord") {
    return "major";
  }
  return state.selectedFretboardScale;
}

function selectedLabKey() {
  const root = labRootName();
  const pc = NOTE_TO_PC[root] ?? NOTE_TO_PC[state.fretboardRoot] ?? 0;
  return {
    name: root,
    pc,
    midi: 48 + pc,
    mode: ["minor", "minorPent", "blues", "dorian", "harmonicMinor"].includes(state.selectedFretboardScale) ? "minor" : "major",
  };
}

function selectedLabChordStep() {
  const quality = state.fretboardHarmony === "chord" ? state.selectedChordQuality : "maj";
  return { roman: "I", semitone: 0, quality };
}

function buildFretboardLabMap() {
  const key = selectedLabKey();
  const scaleId = selectedLabScaleId();
  const markerToView = {
    notes: "notes",
    degrees: "scale",
    intervals: "intervals",
    none: "roots",
  };
  const map = buildLearningFretboardMap({
    key,
    scaleId,
    view: state.fretboardHarmony === "chord" ? "chord" : markerToView[state.fretboardMarker] || "notes",
    chordStep: selectedLabChordStep(),
    progression: state.fretboardHarmony,
  });
  map.frets = state.fretboardFrets;
  map.preferFlats = state.fretboardAccidental === "flat";
  map.showRoot = state.fretboardShowRoot;
  map.showAll = state.fretboardShowAll;
  map.showTriads = state.fretboardShowTriads;
  map.fingering = state.fretboardFingering;
  map.marker = state.fretboardMarker;
  map.harmony = state.fretboardHarmony;
  if (state.fretboardHarmony === "chord") {
    map.scaleName = `${labRootName()}${QUALITY_SUFFIX[state.selectedChordQuality] || ""}`;
    map.scaleFormula = chordToneNamesForStep(key, selectedLabChordStep()).join(" · ");
    map.chordTonePcs = chordTonePcsForStep(key, selectedLabChordStep());
    map.activeChord = {
      roman: "I",
      name: map.scaleName,
      tones: chordToneNamesForStep(key, selectedLabChordStep()),
    };
  }
  return map;
}

function renderOptionButtons(items, action, activeValue, key = "value") {
  return items.map((item) => {
    const value = item.id || item;
    const label = item.label || item;
    return `
      <button class="stage-chip ${activeValue === value ? "active" : ""}" data-action="${action}" data-${key}="${value}">
        ${label}
      </button>
    `;
  }).join("");
}

function renderFretPromptVisual(note, label) {
  return `
    <div class="question-visual fret-prompt-card">
      <span class="fret-string">${note.string}</span>
      <span class="fret-position">fret ${note.fret}</span>
      <span class="fret-target">${label}</span>
    </div>
  `;
}

function renderKeySignatureVisual(signature) {
  const symbols = keySignatureSymbols(signature.fifths);
  return `
    <div class="question-visual key-signature-card">
      <div class="staff-lines" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="signature-symbols">
        ${symbols.length ? symbols.map((symbol) => `<span>${symbol}</span>`).join("") : `<span class="natural-key">C / Am</span>`}
      </div>
      <p>${signature.fifths > 0 ? "Sharp key" : signature.fifths < 0 ? "Flat key" : "No accidentals"}</p>
    </div>
  `;
}

function renderQuestionVisual(question) {
  return question.visual ? `<div class="question-visual-wrap">${question.visual}</div>` : "";
}

function renderFretboardUtilityPanel(map) {
  const scale = JAM_SCALE_LIBRARY[selectedLabScaleId()] || JAM_SCALE_LIBRARY.majorPent;
  return `
    <article class="stage-panel lab-utility-panel">
      <div>
        <p class="amp-label">${map.keyName} · ${map.scaleName}</p>
        <h2 class="section-title">${map.scaleFormula}</h2>
        <p class="section-copy">Fingering: ${FRETBOARD_FINGERINGS.find((item) => item.id === state.fretboardFingering)?.label || "None"} · frets 0-${state.fretboardFrets}</p>
      </div>
      <div class="utility-actions">
        <button class="pick-button" data-action="play-fretboard-scale">Play scale</button>
        <div class="metronome-box ${state.metronomeOn ? "active" : ""}">
          <strong>Metronome ${state.metronomeBpm}bpm</strong>
          <input class="lab-range" type="range" min="40" max="220" value="${state.metronomeBpm}" data-role="metronome-bpm" />
          <button class="secondary-button" data-action="toggle-metronome">${state.metronomeOn ? "Stop" : "Start"}</button>
        </div>
      </div>
      <div class="scale-notes-row">
        ${scale.intervals.map((interval) => `<span>${noteNameForPc(map.rootPc + interval, map.preferFlats)}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderFretboardExerciseDeck() {
  return `
    <section class="exercise-deck">
      ${FRETBOARD_EXERCISES.map((exercise, index) => `
        <button class="exercise-card" data-action="start-fretboard-exercise" data-exercise="${exercise.id}">
          <span class="answer-number">${String(index + 1).padStart(2, "0")}</span>
          <strong>${exercise.title}</strong>
          <p>${exercise.text}</p>
        </button>
      `).join("")}
    </section>
  `;
}

function renderFretboardTheoryStrip(map) {
  return `
    <section class="lab-theory-strip">
      <article class="shape-card">
        <span class="shape-anchor">Formula</span>
        <h2>${map.scaleFormula}</h2>
        <p>Start from any ${map.root} and keep the interval recipe. The same sound repeats from every root.</p>
      </article>
      <article class="shape-card">
        <span class="shape-anchor">Triads</span>
        <h2>${state.fretboardShowTriads ? "Visible" : "Hidden"}</h2>
        <p>Use 1-3-5 around each chord as your safe landing zone before adding faster scale runs.</p>
      </article>
      <article class="shape-card">
        <span class="shape-anchor">Positions</span>
        <h2>${state.fretboardFingering.toUpperCase()}</h2>
        <p>${FRETBOARD_FINGERINGS.find((item) => item.id === state.fretboardFingering)?.detail || "Full-neck view"}</p>
      </article>
    </section>
  `;
}

function chordRowsForProgression(key, progression) {
  return progression.steps.map((step) => ({
    roman: step.roman,
    name: chordNameForStep(key, step),
    quality: QUALITY_LABEL[step.quality] || step.quality,
    fingering: chordFingeringForStep(key, step),
    tones: chordToneNamesForStep(key, step),
    outside: Boolean(step.outside),
  }));
}

function buildJamGuitarMap(key, progression, scaleId, activeStep = null, target = null) {
  const scale = JAM_SCALE_LIBRARY[scaleId] || JAM_SCALE_LIBRARY.majorPent;
  const keyName = key.mode === "minor" ? key.name : `${key.name} major`;
  const rootPc = key.pc;
  const activeChord = activeStep
    ? {
        roman: activeStep.roman,
        name: chordNameForStep(key, activeStep),
        tones: chordToneNamesForStep(key, activeStep),
      }
    : null;

  return {
    keyName,
    root: keyRootName(key),
    rootPc,
    progression: progression.label,
    scaleId: scale.id,
    scaleName: scale.label,
    scaleFormula: scale.formula,
    scaleIntervals: scale.intervals,
    scaleTab: scale.tab,
    preferFlats: key.name.includes("b") || progression.steps.some((step) => preferFlatsForJamStep(key, step)),
    anchors: rootAnchorsForPc(rootPc),
    chordRows: chordRowsForProgression(key, progression),
    chordTonePcs: activeStep
      ? (CHORD_QUALITY_INTERVALS[activeStep.quality] || []).map((interval) => pitchClass(chordRootPc(key, activeStep) + interval))
      : progression.steps.flatMap((step) =>
          (CHORD_QUALITY_INTERVALS[step.quality] || []).map((interval) => pitchClass(chordRootPc(key, step) + interval))
        ),
    activeChord,
    target,
    theory: progression.note,
  };
}

function jamProgressionPool(settings) {
  const difficulty = Math.max(1, difficultyIndex(settings.difficulty));
  const mode = settings.mode;
  return JAM_PROGRESSIONS.filter((progression) => {
    if (mode === "function") {
      return progression.category === "function" && progression.difficulty <= difficulty;
    }
    if (mode === "modal") {
      return progression.category === "modal" && progression.difficulty <= difficulty + 1;
    }
    if (mode === "borrowed") {
      return progression.category === "borrowed" && progression.difficulty <= difficulty + 1;
    }
    if (mode === "targets") {
      return progression.difficulty <= difficulty + 1;
    }
    return progression.difficulty <= difficulty;
  });
}

function sampleJamOptions(pool, correct, totalChoices, labelSelector = (item) => item.label) {
  const options = [{ id: correct.id, label: labelSelector(correct) }];
  const working = shuffle(pool.filter((item) => item.id !== correct.id));
  while (options.length < totalChoices && working.length) {
    const item = working.shift();
    options.push({ id: item.id, label: labelSelector(item) });
  }
  return shuffle(options);
}

function progressionSequenceForJam(key, progression, activeStep = null) {
  const sequence = [];
  const chordStyle = randomItem(["block", "strum", progression.difficulty > 1 ? "arp" : "block"]);
  progression.steps.forEach((step, index) => {
    pushChordEvent(
      sequence,
      chordMidiForJamStep(key, step),
      index === progression.steps.length - 1 ? 0.92 : randomItem([0.58, 0.68, 0.78]),
      randomItem([0.06, 0.1, 0.14]),
      step.outside ? 0.18 : 0.16,
      chordStyle
    );
  });
  if (activeStep) {
    sequence.push({ notes: [], duration: 0.2, gap: 0.04, gain: 0 });
    pushChordEvent(sequence, chordMidiForJamStep(key, activeStep), 1.05, 0, 0.18, "block");
  }
  return sequence;
}

function targetCandidatesForStep(key, step) {
  const rootPc = chordRootPc(key, step);
  const candidatesByQuality = {
    maj: [
      { id: "3", label: "3rd", interval: 4, priority: true },
      { id: "5", label: "5th", interval: 7 },
      { id: "1", label: "root", interval: 0 },
      { id: "6", label: "6th", interval: 9 },
    ],
    min: [
      { id: "b3", label: "b3", interval: 3, priority: true },
      { id: "5", label: "5th", interval: 7 },
      { id: "1", label: "root", interval: 0 },
      { id: "b7", label: "b7", interval: 10 },
    ],
    dom7: [
      { id: "3", label: "3rd", interval: 4, priority: true },
      { id: "b7", label: "b7", interval: 10, priority: true },
      { id: "5", label: "5th", interval: 7 },
      { id: "9", label: "9th", interval: 14 },
    ],
    min7: [
      { id: "b3", label: "b3", interval: 3, priority: true },
      { id: "b7", label: "b7", interval: 10, priority: true },
      { id: "5", label: "5th", interval: 7 },
      { id: "11", label: "11th", interval: 17 },
    ],
    maj7: [
      { id: "3", label: "3rd", interval: 4, priority: true },
      { id: "7", label: "7th", interval: 11, priority: true },
      { id: "5", label: "5th", interval: 7 },
      { id: "9", label: "9th", interval: 14 },
    ],
  };
  const candidates = candidatesByQuality[step.quality] || candidatesByQuality.maj;
  const preferFlats = preferFlatsForJamStep(key, step);
  const dominantTones = step.quality === "dom7" ? dominantToneNamesForStep(key, step) : null;
  return candidates.map((candidate) => ({
    ...candidate,
    note:
      dominantTones && candidate.id === "3"
        ? dominantTones[1]
        : dominantTones && candidate.id === "5"
          ? dominantTones[2]
          : dominantTones && candidate.id === "b7"
            ? dominantTones[3]
            : noteNameForPc(rootPc + candidate.interval, preferFlats),
  })).map((candidate) => ({
    ...candidate,
    label: `${candidate.label} (${candidate.note})`,
  }));
}

function buildTargetQuestion(settings, forcedConceptId = null) {
  const pool = jamProgressionPool({ ...settings, mode: "targets" });
  const progression = forcedConceptId
    ? pool.find((item) => item.id === forcedConceptId) || pool[0]
    : selectWeightedItem(pool, "jam", settings);
  const key = selectJamKey(progression.keyMode);
  const activeStep = randomItem(
    progression.steps.filter((step) => ["maj", "min", "dom7", "min7", "maj7"].includes(step.quality))
  );
  const candidates = targetCandidatesForStep(key, activeStep);
  const priority = candidates.filter((candidate) => candidate.priority);
  const correct = randomItem(priority.length ? priority : candidates);
  const options = shuffle(candidates).slice(0, settings.choices);
  if (!options.some((option) => option.id === correct.id)) {
    options[0] = correct;
  }
  const guitarMap = buildJamGuitarMap(key, progression, progression.scale, activeStep, {
    chord: `${activeStep.roman} / ${chordNameForStep(key, activeStep)}`,
    note: correct.note,
    label: correct.label,
  });

  return {
    id: `jam-target:${progression.id}:${key.name}:${activeStep.roman}:${correct.id}`,
    conceptId: `target:${activeStep.roman}:${correct.id}`,
    prompt: `Target the ${activeStep.roman} chord.`,
    support: `The loop ends by holding ${chordNameForStep(key, activeStep)}. Which landing tone gives you the strongest guide-tone sound?`,
    correctId: correct.id,
    correctLabel: correct.label,
    options: shuffle(options.map((option) => ({ id: option.id, label: option.label }))),
    note: `${correct.label} is a strong landing tone over ${chordNameForStep(key, activeStep)}.`,
    aliases: [correct.label, correct.note, correct.id],
    explanation: `Cue: guide tones are usually the 3rd and 7th. For ${chordNameForStep(key, activeStep)}, aim for ${correct.label}.`,
    guitarMap,
    async play() {
      await playSequence(progressionSequenceForJam(key, progression, activeStep), settings.tone, settings.articulation);
    },
  };
}

function buildJamQuestion(settings, forcedConceptId = null) {
  if (settings.mode === "targets") {
    return buildTargetQuestion(settings, forcedConceptId);
  }

  const pool = jamProgressionPool(settings);
  const correct = forcedConceptId
    ? pool.find((item) => item.id === forcedConceptId) || pool[0]
    : selectWeightedItem(pool, "jam", settings);
  const key = selectJamKey(correct.keyMode);
  const scale = JAM_SCALE_LIBRARY[correct.scale] || JAM_SCALE_LIBRARY.majorPent;
  const guitarMap = buildJamGuitarMap(key, correct, scale.id);
  const baseQuestion = {
    id: `jam:${settings.mode}:${correct.id}:${key.name}`,
    conceptId: correct.id,
    note: correct.note,
    guitarMap,
    async play() {
      await playSequence(progressionSequenceForJam(key, correct), settings.tone, settings.articulation);
    },
  };

  if (settings.mode === "modal") {
    const correctScale = { id: scale.id, label: scale.label };
    const options = sampleOptions(JAM_MODE_CHOICES, correctScale, settings.choices);
    return {
      ...baseQuestion,
      conceptId: `mode:${scale.id}`,
      prompt: "Which scale owns this jam?",
      support: `Hear the vamp in ${key.name}. Pick the scale color before thinking about shapes.`,
      correctId: scale.id,
      correctLabel: scale.label,
      options,
      aliases: [scale.label, scale.id, scale.formula],
      explanation: `Cue: ${correct.note} The matching full-fretboard map is ${keyRootName(key)} ${scale.label}.`,
    };
  }

  if (settings.mode === "borrowed") {
    const outsideOptions = [
      { id: "Borrowed iv", label: "Borrowed iv" },
      { id: "Secondary dominant V/vi", label: "Secondary dominant V/vi" },
      { id: "Harmonic minor V7", label: "Harmonic minor V7" },
      { id: "Diatonic ii - V", label: "Diatonic ii - V" },
      { id: "Backdoor bVII", label: "Backdoor bVII" },
    ];
    const correctOption = {
      id: correct.outside || correct.id,
      label: correct.outside || correct.label,
    };
    return {
      ...baseQuestion,
      prompt: "Name the outside color.",
      support: `The loop is in ${key.name}. One chord steps outside the plain diatonic map.`,
      correctId: correctOption.id,
      correctLabel: correctOption.label,
      options: sampleOptions(outsideOptions, correctOption, settings.choices),
      aliases: [correctOption.label, correct.label, correct.id],
      explanation: `Cue: ${correct.note}`,
    };
  }

  return {
    ...baseQuestion,
    prompt: "Identify the jam progression.",
    support: `Key center: ${key.name}. Hear the loop as numbers, then map it to guitar.`,
    correctId: correct.id,
    correctLabel: correct.label,
    options: sampleJamOptions(
      optionPoolFor(JAM_PROGRESSIONS.filter((item) => item.category === "function"), Math.max(1, difficultyIndex(settings.difficulty)), settings.choices),
      correct,
      settings.choices
    ),
    aliases: [correct.label, correct.id],
    explanation: `Cue: ${correct.note} In ${key.name}, that is ${guitarMap.chordRows.map((row) => row.name).join(" - ")}.`,
  };
}

function buildComparisonQuestion(sectionId, settings) {
  const base = buildQuestion(sectionId, { ...settings, answerStyle: "tap" });
  let distractor = buildQuestion(sectionId, { ...settings, answerStyle: "tap" });
  let attempts = 0;
  while (distractor.conceptId === base.conceptId && attempts < 6) {
    distractor = buildQuestion(sectionId, { ...settings, answerStyle: "tap" });
    attempts += 1;
  }
  const correctSide = Math.random() > 0.5 ? "A" : "B";
  const clips = {
    A: correctSide === "A" ? base : distractor,
    B: correctSide === "B" ? base : distractor,
  };

  return {
    id: `compare:${sectionId}:${base.id}:${distractor.id}`,
    type: "compare",
    conceptId: base.conceptId,
    prompt: `Which clip is ${base.correctLabel}?`,
    support: "Play A and B. Compare the color before answering.",
    correctId: correctSide,
    correctLabel: base.correctLabel,
    options: [
      { id: "A", label: "Clip A" },
      { id: "B", label: "Clip B" },
    ],
    note: base.note,
    explanation: base.explanation,
    async play() {
      await clips.A.play();
      await wait(450);
      await clips.B.play();
    },
    async playSide(side) {
      await clips[side].play();
    },
  };
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, " ");
}

function answerMatches(question, value) {
  const candidate = normalizeAnswer(value);
  if (!candidate) {
    return false;
  }
  const aliases = new Set(
    [question.correctLabel, ...(question.aliases || [])]
      .map(normalizeAnswer)
      .filter(Boolean)
  );
  return aliases.has(candidate);
}

function resolveFreeResponseOptionId(question, value) {
  const candidate = normalizeAnswer(value);
  if (!candidate) {
    return null;
  }
  const exactOption = (question.options || []).find((option) => normalizeAnswer(option.label) === candidate);
  return exactOption?.id || null;
}

function createSession(sectionId, options = {}) {
  stopMetronome(false);
  const sessionSettings = {
    ...getCurrentSettings(sectionId),
    ...(options.settings || {}),
  };
  const questionCount = options.questionCount || SESSION_LENGTH;
  const forcedConceptIds = options.forcedConceptIds || [];
  const questions = Array.from({ length: questionCount }, (_, index) => {
    if (sessionSettings.answerStyle === "compare") {
      return buildComparisonQuestion(sectionId, sessionSettings);
    }
    return buildQuestion(sectionId, sessionSettings, forcedConceptIds[index] || null);
  });

  state.session = {
    kind: options.kind || "practice",
    challengeId: options.challengeId || null,
    title: options.title || SECTION_DEFS[sectionId].title,
    sectionId,
    settings: sessionSettings,
    questions,
    index: 0,
    correct: 0,
    answers: [],
    typedAnswer: "",
    choicesVisible: sessionSettings.answerStyle !== "delayed",
    feedback: null,
    questionStart: performance.now(),
  };
  state.selectedSection = sectionId;
  state.summary = null;
  state.tab = options.kind === "daily" ? "home" : "practice";
  state.screen = "session";
  clearAutoAdvance();
  render();
  startQuestionLoop();
}

function createDailySession() {
  const challenge = getDailyChallenge();
  createSession(challenge.sectionId, {
    kind: "daily",
    challengeId: challenge.id,
    title: challenge.title,
    settings: challenge.settings,
    questionCount: challenge.questionCount,
  });
}

function createReviewSession() {
  const focusSectionId = getRecommendedSection();
  const dueConceptIds = getDueConceptIds(focusSectionId);
  createSession(focusSectionId, {
    kind: "review",
    title: `${SECTION_DEFS[focusSectionId].title} Review`,
    forcedConceptIds: dueConceptIds.slice(0, SESSION_LENGTH),
    settings: {
      difficulty: "advanced",
      goal: "mastery",
    },
  });
}

function createPlaylistSession(playlistId) {
  const activePath = getActivePath();
  if (playlistId === "commute") {
    createSession(getRecommendedSection(), {
      kind: "playlist",
      title: "Commute 5",
      questionCount: 5,
      settings: {
        goal: "speed",
        answerStyle: "delayed",
      },
    });
    return;
  }
  if (playlistId === "compare") {
    createSession(activePath.sections[0], {
      kind: "playlist",
      title: "Compare Lab",
      settings: {
        answerStyle: "compare",
      },
    });
    return;
  }
  if (playlistId === "pathfocus") {
    createSession(activePath.sections[0], {
      kind: "playlist",
      title: `${activePath.title} Focus`,
      settings: {
        goal: "mastery",
      },
    });
    return;
  }
  createSession(getRecommendedSection(), {
    kind: "playlist",
    title: "Weak Spots",
    forcedConceptIds: getDueConceptIds(getRecommendedSection()).slice(0, SESSION_LENGTH),
    settings: {
      difficulty: "advanced",
      goal: "mastery",
    },
  });
}

function getCurrentQuestion() {
  return state.session?.questions[state.session.index] || null;
}

function clearAutoAdvance() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function clearQuestionRepeat() {
  if (questionRepeatTimer) {
    clearTimeout(questionRepeatTimer);
    questionRepeatTimer = null;
  }
  questionPlaybackToken += 1;
}

function startQuestionLoop() {
  clearQuestionRepeat();
  const token = questionPlaybackToken;
  playCurrentQuestion({ loop: true, token });
}

function scheduleAutoAdvance() {
  clearAutoAdvance();
  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null;
    goToNextQuestion();
  }, AUTO_ADVANCE_MS);
}

function nextDueAtForStats(stats, isCorrect) {
  if (!isCorrect) {
    return Date.now() + REVIEW_STEPS_MS[0];
  }
  const streakIndex = clamp((stats?.streak || 0) - 1, 0, REVIEW_STEPS_MS.length - 1);
  return Date.now() + REVIEW_STEPS_MS[streakIndex];
}

function updateProgressForAnswer(sectionId, conceptId, isCorrect, responseMs, toneId, selectedId) {
  const sectionProgress = getSectionProgress(sectionId);
  sectionProgress.attempts += 1;
  if (isCorrect) {
    sectionProgress.correct += 1;
  }
  if (!sectionProgress.itemStats[conceptId]) {
    sectionProgress.itemStats[conceptId] = normalizeItemStats({ [conceptId]: {} })[conceptId];
  }
  const stats = sectionProgress.itemStats[conceptId];
  stats.attempts += 1;
  if (isCorrect) {
    stats.correct += 1;
    stats.streak += 1;
  } else {
    stats.streak = 0;
    if (selectedId && !selectedId.startsWith("__")) {
      stats.confusedWith[selectedId] = (stats.confusedWith[selectedId] || 0) + 1;
    }
  }
  stats.averageMs = stats.averageMs
    ? Math.round(stats.averageMs * 0.65 + responseMs * 0.35)
    : responseMs;
  stats.lastSeenAt = Date.now();
  stats.nextDueAt = nextDueAtForStats(stats, isCorrect);
  if (!stats.toneStats[toneId]) {
    stats.toneStats[toneId] = { attempts: 0, correct: 0 };
  }
  stats.toneStats[toneId].attempts += 1;
  if (isCorrect) {
    stats.toneStats[toneId].correct += 1;
  }
  saveState();
}

function submitAnswer(answerId) {
  const session = state.session;
  const question = getCurrentQuestion();
  if (!session || !question || session.feedback) {
    return;
  }
  clearQuestionRepeat();
  stopActiveAudio();
  const isCorrect = answerId === question.correctId;
  const responseMs = Math.round(performance.now() - session.questionStart);
  session.answers.push({
    questionId: question.id,
    conceptId: question.conceptId,
    correctId: question.correctId,
    selectedId: answerId,
    isCorrect,
    responseMs,
  });
  if (isCorrect) {
    session.correct += 1;
  }
  updateProgressForAnswer(
    session.sectionId,
    question.conceptId,
    isCorrect,
    responseMs,
    session.settings.tone,
    answerId
  );
  session.feedback = {
    isCorrect,
    answerId,
    correctId: question.correctId,
    correctLabel: question.correctLabel,
    note: question.note,
    explanation: question.explanation,
  };
  if (state.preferences.haptics && "vibrate" in navigator) {
    navigator.vibrate(isCorrect ? [12, 20, 12] : [22, 50, 22]);
  }
  render();
  playFeedbackAudio(question).finally(() => {
    if (state.session === session && state.session.feedback?.correctId === question.correctId) {
      scheduleAutoAdvance();
    }
  });
}

async function playFeedbackAudio(question) {
  stopActiveAudio();
  await question.play();
}

function goToNextQuestion() {
  const session = state.session;
  if (!session) {
    return;
  }
  clearAutoAdvance();
  session.feedback = null;
  session.typedAnswer = "";
  session.index += 1;
  if (session.index >= session.questions.length) {
    finishSession();
    return;
  }
  session.choicesVisible = session.settings.answerStyle !== "delayed";
  session.questionStart = performance.now();
  render();
  startQuestionLoop();
}

function findWeakConcept(session) {
  const misses = session.answers.filter((answer) => !answer.isCorrect);
  if (!misses.length) {
    return null;
  }
  const concepts = {};
  misses.forEach((miss) => {
    concepts[miss.conceptId] = (concepts[miss.conceptId] || 0) + 1;
  });
  const topConceptId = Object.entries(concepts).sort((left, right) => right[1] - left[1])[0][0];
  return session.questions.find((question) => question.conceptId === topConceptId)?.correctLabel || null;
}

function finishSession() {
  const session = state.session;
  if (!session) {
    return;
  }
  clearQuestionRepeat();
  stopActiveAudio();
  const accuracy = Math.round((session.correct / session.questions.length) * 100);
  const averageTime = Math.round(
    session.answers.reduce((sum, answer) => sum + answer.responseMs, 0) / Math.max(session.answers.length, 1)
  );
  const weakest = findWeakConcept(session);

  updateStreak();
  getSectionProgress(session.sectionId).sessions += 1;
  if (session.kind === "daily") {
    markDailyAttempt(accuracy);
  }
  state.sessionLog.push({
    date: todayId(),
    weekId: getCurrentWeekId(),
    sectionId: session.sectionId,
    title: session.title,
    tone: session.settings.tone,
    goal: session.settings.goal,
    answerStyle: session.settings.answerStyle,
    accuracy,
    averageTime,
    kind: session.kind,
  });
  state.sessionLog = state.sessionLog.slice(-120);

  state.summary = {
    kind: session.kind,
    challengeId: session.challengeId,
    sectionId: session.sectionId,
    title: session.title,
    accuracy,
    averageTime,
    correct: session.correct,
    total: session.questions.length,
    weakest,
  };
  state.session = null;
  state.screen = "summary";
  saveState();
  render();
}

function switchTab(tabId) {
  clearQuestionRepeat();
  stopActiveAudio();
  if (tabId !== "fretboard") {
    stopMetronome(false);
  }
  state.tab = tabId;
  if (!state.onboarding.completed) {
    state.screen = "onboarding";
    render();
    return;
  }
  if (tabId === "home") {
    state.screen = "home";
  } else if (tabId === "practice") {
    state.screen = "practice";
  } else if (tabId === "fretboard") {
    state.screen = "fretboard";
  } else if (tabId === "chords") {
    state.screen = "chords";
  } else if (tabId === "progress") {
    state.screen = "progress";
  } else if (tabId === "profile") {
    state.screen = "profile";
  }
  clearAutoAdvance();
  render();
}

function openSection(sectionId, origin = "practice") {
  clearQuestionRepeat();
  stopActiveAudio();
  state.selectedSection = sectionId;
  state.tab = origin === "home" ? "home" : "practice";
  state.screen = "setup";
  ensureSectionMode(sectionId);
  saveState();
  render();
}

function ensureSectionMode(sectionId) {
  const settings = getCurrentSettings(sectionId);
  const validModes = SECTION_DEFS[sectionId].modes.map((mode) => mode.id);
  if (!validModes.includes(settings.mode)) {
    settings.mode = SECTION_DEFS[sectionId].defaultMode;
  }
}

function updateSectionSetting(key, value) {
  const settings = getCurrentSettings();
  settings[key] = value;
  saveState();
  render();
}

function updatePreference(key, value) {
  state.preferences[key] = value;
  saveState();
  render();
}

function updateOnboardingChoice(key, value) {
  state.onboarding[key] = value;
  render();
}

function applyOnboardingChoices(startDaily) {
  Object.values(SECTION_DEFS).forEach((section) => {
    state.sectionSettings[section.id].difficulty = state.onboarding.startingLevel;
    state.sectionSettings[section.id].tone = state.onboarding.preferredTone;
  });
  state.onboarding.completed = true;
  state.screen = "home";
  state.tab = "home";
  saveState();
  render();
  if (startDaily) {
    createDailySession();
  }
}

function totalSessions() {
  return Object.values(state.progress).reduce((sum, section) => sum + (section.sessions || 0), 0);
}

function overallAccuracy() {
  const all = Object.values(state.progress).reduce(
    (memo, section) => {
      memo.attempts += section.attempts || 0;
      memo.correct += section.correct || 0;
      return memo;
    },
    { attempts: 0, correct: 0 }
  );
  if (!all.attempts) {
    return 0;
  }
  return Math.round((all.correct / all.attempts) * 100);
}

function currentMainContent() {
  switch (state.screen) {
    case "onboarding":
      return renderOnboarding();
    case "home":
      return renderHome();
    case "practice":
      return renderPractice();
    case "fretboard":
      return renderFretboardLab();
    case "chords":
      return renderChordsEverywhere();
    case "progress":
      return renderProgress();
    case "profile":
      return renderProfile();
    case "setup":
      return renderSetup();
    case "session":
      return renderSession();
    case "summary":
      return renderSummary();
    default:
      return renderHome();
  }
}

function renderInstallCard() {
  if (state.isStandalone) {
    return `
      <article class="insight-card">
        <p class="eyebrow">Installed</p>
        <p class="section-copy">Signal Path is already running in standalone mode on this device.</p>
      </article>
    `;
  }

  return `
    <article class="insight-card">
      <p class="eyebrow">Install</p>
      <p class="section-copy">
        ${
          state.installAvailable
            ? "Install the app for faster launch, fullscreen practice, and offline access."
            : "This app is PWA-ready. If your browser does not show an install button, use Add to Home Screen from the browser menu."
        }
      </p>
      ${
        state.installAvailable
          ? `<div class="summary-actions"><button class="secondary-button" data-action="install-app">Install app</button></div>`
          : ""
      }
    </article>
  `;
}

function render() {
  const previousScreen = lastRenderedScreen;
  lastRenderedScreen = state.screen;
  document.documentElement.classList.toggle("reduced-motion", state.preferences.reducedMotion);
  appRoot.innerHTML = `
    <main class="app-shell ${state.preferences.largeButtons ? "large-buttons" : ""}">
      ${currentMainContent()}
    </main>
    ${renderBottomNav()}
  `;
  if (previousScreen !== state.screen) {
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }
}

function renderPathPicker() {
  return `
    <div class="toggle-group">
      ${Object.values(LEARNING_PATHS)
        .map(
          (path) => `
            <button
              class="toggle-pill ${state.onboarding.preferredPath === path.id ? "active" : ""}"
              data-action="set-onboarding"
              data-key="preferredPath"
              data-value="${path.id}"
            >
              <span>${path.title}</span>
              <span class="detail-copy">${path.detail}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPlaylists() {
  return `
    <section class="section-grid">
      ${PLAYLISTS.map(
        (playlist) => `
          <button class="feature-card" data-action="start-playlist" data-playlist="${playlist.id}" data-accent="gold">
            <div>
              <p class="feature-label">Preset</p>
              <h2 class="feature-title">${playlist.title}</h2>
              <p class="section-copy">${playlist.detail}</p>
            </div>
          </button>
        `
      ).join("")}
    </section>
  `;
}

function renderRoadmap() {
  const path = getActivePath();
  return `
    <article class="progress-panel">
      <p class="eyebrow">${path.title} Roadmap</p>
      <div class="progress-bar-list">
        ${path.roadmap
          .map((step) => {
            const mastery = getMastery(step.sectionId);
            const done = mastery >= step.threshold;
            return `
              <div class="progress-row">
                <div class="progress-head">
                  <strong>${step.label}</strong>
                  <span class="pill">${done ? "Done" : `${mastery}% / ${step.threshold}%`}</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width:${Math.min(100, Math.round((mastery / step.threshold) * 100))}%"></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </article>
  `;
}

function renderHeatmap() {
  const rows = getTopWeakConcepts();
  if (!rows.length) {
    return `
      <article class="insight-card">
        <p class="eyebrow">Weak Concepts</p>
        <p class="section-copy">Not enough data yet. Run a few sessions to expose the first heatmap.</p>
      </article>
    `;
  }
  return `
    <article class="progress-panel">
      <p class="eyebrow">Heatmap</p>
      <div class="progress-bar-list">
        ${rows
          .map(
            (row) => `
              <div class="progress-row">
                <div class="progress-head">
                  <strong>${row.section}</strong>
                  <span class="pill">${row.accuracy}%</span>
                </div>
                <p class="section-copy">${formatConceptLabel(row.sectionId, row.conceptId)}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderOnboarding() {
  return `
    <section class="setup-stack">
      <article class="rock-hero">
        <div class="hero-copy-block">
          <p class="amp-label">Signal Path</p>
          <h1 class="rock-title"><span>Jam ready.</span><span>Know the neck.</span></h1>
          <p class="rock-subtitle">
            Learn to hear the key, know the chord family, choose a scale, and land chord tones anywhere on the fretboard.
          </p>
        </div>
        <div class="stage-meter" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
      </article>

      <section class="section-grid">
        <article class="feature-card" data-accent="orange">
          <div>
            <p class="feature-label">1. Key</p>
            <h2 class="feature-title">Find home.</h2>
            <p class="section-copy">Train your ear to hear where the jam resolves before you think shapes.</p>
          </div>
        </article>
        <article class="feature-card" data-accent="teal">
          <div>
            <p class="feature-label">2. Chords</p>
            <h2 class="feature-title">Name the family.</h2>
            <p class="section-copy">Connect I-IV-V, ii-V-I, modal vamps, and borrowed colors to real chord names.</p>
          </div>
        </article>
        <article class="feature-card" data-accent="gold">
          <div>
            <p class="feature-label">3. Scale</p>
            <h2 class="feature-title">Pick the lane.</h2>
            <p class="section-copy">Choose pentatonic, blues, major, minor, Mixolydian, Dorian, or harmonic minor from the jam context.</p>
          </div>
        </article>
        <article class="feature-card" data-accent="blue">
          <div>
            <p class="feature-label">4. Neck</p>
            <h2 class="feature-title">Map it everywhere.</h2>
            <p class="section-copy">Use the full 0-12 fretboard for roots, intervals, scale tones, and movable chord tones.</p>
          </div>
        </article>
      </section>

      <article class="setup-panel">
        <div class="setup-block">
          <h2 class="block-title">Start at</h2>
          <div class="choice-grid">
            ${DIFFICULTIES.map(
              (difficulty) => `
                <button
                  class="choice-pill ${state.onboarding.startingLevel === difficulty.id ? "active" : ""}"
                  data-action="set-onboarding"
                  data-key="startingLevel"
                  data-value="${difficulty.id}"
                >
                  <span>${difficulty.label}</span>
                  <span class="detail-copy">${difficulty.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="setup-block">
          <h2 class="block-title">Default sound</h2>
          <div class="toggle-group">
            ${TONES.map(
              (tone) => `
                <button
                  class="toggle-pill ${state.onboarding.preferredTone === tone.id ? "active" : ""}"
                  data-action="set-onboarding"
                  data-key="preferredTone"
                  data-value="${tone.id}"
                >
                  <span>${tone.label}</span>
                  <span class="detail-copy">${tone.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="setup-block">
          <h2 class="block-title">Learning path</h2>
          ${renderPathPicker()}
        </div>

        <div class="summary-actions">
          <button class="primary-button" data-action="finish-onboarding">Enter app</button>
          <button class="secondary-button" data-action="finish-onboarding-daily">Enter and start daily</button>
        </div>
      </article>
    </section>
  `;
}

function renderHome() {
  const key = getPracticalKey();
  const recipe = getPracticalRecipe(key);
  const rows = diatonicRowsForKey(key);
  const safeScale = JAM_SCALE_LIBRARY[recipe.scale] || JAM_SCALE_LIBRARY.majorPent;
  const chordNames = chordNamesForRecipe(key, recipe);
  const tonicStep = findDiatonicStep(key, key.mode === "minor" ? "i" : "I");
  const tonicTones = chordToneNamesForStep(key, tonicStep);

  return `
    <section class="jam-ready-stack">
      <header class="rock-hero">
        <div class="hero-copy-block">
          <p class="amp-label">Jam Ready</p>
          <h1 class="rock-title"><span>Find the key.</span><span>Join the jam.</span></h1>
          <p class="rock-subtitle">Key → chords → scale → chord tones.</p>
        </div>
        <div class="stage-meter" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
      </header>

      <article class="stage-panel key-panel">
        <div class="panel-head">
          <div>
            <p class="amp-label">Set the jam key</p>
            <h2 class="section-title">${key.name}</h2>
          </div>
          <span class="hot-pill">${key.mode === "minor" ? "minor room" : "major room"}</span>
        </div>
        <div class="stage-chip-row">${renderKeyChips("set-jam-key", key.name)}</div>
      </article>

      <section class="jam-answer-grid">
        <article class="answer-card hot">
          <span class="answer-number">01</span>
          <p class="amp-label">What key?</p>
          <h2>${key.name}</h2>
          <p>Hear home. Find every ${getPracticalKeyRoot(key)} root first.</p>
        </article>
        <article class="answer-card">
          <span class="answer-number">02</span>
          <p class="amp-label">What chords?</p>
          <h2>${recipe.progression}</h2>
          <p>${chordNames.join(" - ")}</p>
        </article>
        <article class="answer-card">
          <span class="answer-number">03</span>
          <p class="amp-label">What can I play?</p>
          <h2>${safeScale.label}</h2>
          <p>${recipe.riff}</p>
        </article>
      </section>

      <article class="stage-panel play-panel">
        <div>
          <p class="amp-label">Practical trainer</p>
          <h2 class="section-title">Hear it. Name it. Map it.</h2>
          <p class="section-copy">No intro explanation in the exercise: press play, answer by ear, then use the map to understand the jam.</p>
        </div>
        <div class="jam-mode-grid">
          <button class="pick-button" data-action="start-jam-mode" data-mode="function">Find key + progression</button>
          <button class="pick-button" data-action="start-jam-mode" data-mode="modal">Choose scale/riff</button>
          <button class="pick-button" data-action="start-jam-mode" data-mode="targets">Land chord tones</button>
          <button class="pick-button ghost" data-action="open-jam-mode" data-mode="function">Customize</button>
        </div>
      </article>

      <article class="stage-panel">
        <div class="panel-head">
          <div>
            <p class="amp-label">Chords in ${key.name}</p>
            <h2 class="section-title">The band map</h2>
          </div>
          <button class="secondary-button" data-action="switch-tab" data-tab="chords">Use everywhere</button>
        </div>
        <div class="chord-strip">
          ${rows.map((row) => `
            <div class="degree-tile ${recipe.chords.includes(row.roman) ? "active" : ""}">
              <span>${row.roman}</span>
              <strong>${row.name}</strong>
              <small>${row.role}</small>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="stage-panel fretboard-preview-panel">
        <div class="panel-head">
          <div>
            <p class="amp-label">First thing to memorize</p>
            <h2 class="section-title">Roots, then chord tones</h2>
            <p class="section-copy">For ${key.name}, target ${tonicTones.join(" - ")} before running scales.</p>
          </div>
          <button class="secondary-button" data-action="switch-tab" data-tab="fretboard">Open fretboard</button>
        </div>
        <div class="fretboard-scroll">
          ${renderFullFretboard(buildLearningFretboardMap({ key, scaleId: recipe.scale, view: "scale", chordStep: tonicStep, progression: recipe.progression }))}
        </div>
      </article>
    </section>
  `;
}

function renderPractice() {
  const key = getPracticalKey();
  const recipe = getPracticalRecipe(key);
  return `
    <section class="trainer-stack">
      <header class="rock-hero compact">
        <div>
          <p class="amp-label">Jam Trainer</p>
          <h1 class="rock-title">Play the loop. Make the call.</h1>
          <p class="rock-subtitle">Exercises now start like a real jam: sound first, then the useful question.</p>
        </div>
      </header>

      <article class="stage-panel play-panel big-play-card">
        <div>
          <p class="amp-label">Recommended for ${key.name}</p>
          <h2 class="section-title">${recipe.title}</h2>
          <p class="section-copy">${recipe.clue}</p>
        </div>
        <button class="mega-play" data-action="start-jam-mode" data-mode="function">Play Jam</button>
      </article>

      <section class="trainer-mode-list">
        <button class="trainer-mode-card" data-action="start-jam-mode" data-mode="function">
          <span>01</span>
          <div><strong>Find the key</strong><p>Hear home, then name the Roman numerals.</p></div>
        </button>
        <button class="trainer-mode-card" data-action="start-jam-mode" data-mode="modal">
          <span>02</span>
          <div><strong>What can I play?</strong><p>Pick major pentatonic, minor pentatonic, blues, Dorian, or Mixolydian.</p></div>
        </button>
        <button class="trainer-mode-card" data-action="start-jam-mode" data-mode="targets">
          <span>03</span>
          <div><strong>Land the note</strong><p>Choose the guide tone that makes the chord change sound intentional.</p></div>
        </button>
        <button class="trainer-mode-card" data-action="start-jam-mode" data-mode="borrowed">
          <span>04</span>
          <div><strong>Spot the outside chord</strong><p>Secondary dominants, borrowed iv, and harmonic minor V7.</p></div>
        </button>
      </section>

      <article class="stage-panel">
        <div class="panel-head">
          <div>
            <p class="amp-label">Ear tools</p>
            <h2 class="section-title">Keep the old drills, but make them support jams.</h2>
          </div>
        </div>
        <section class="section-grid compact-tools">
          ${["intervals", "scales", "progressions", "melody"].map((sectionId) => {
            const section = SECTION_DEFS[sectionId];
            return `
              <button class="feature-card tool-card" data-action="open-section" data-section="${section.id}" data-origin="practice" data-accent="${section.accent}">
                <div>
                  <p class="feature-label">${section.label}</p>
                  <h2 class="feature-title">${section.title}</h2>
                  <p class="section-copy">${section.blurb}</p>
                </div>
              </button>
            `;
          }).join("")}
        </section>
      </article>
    </section>
  `;
}

function renderFretboardLab() {
  const map = buildFretboardLabMap();
  const scale = JAM_SCALE_LIBRARY[selectedLabScaleId()] || JAM_SCALE_LIBRARY.majorPent;

  return `
    <section class="fretboard-lab-stack">
      <header class="rock-hero compact">
        <div>
          <p class="amp-label">Fretboard Lab</p>
          <h1 class="rock-title"><span>Map the neck.</span><span>Then drill it.</span></h1>
          <p class="rock-subtitle">Choose a root, scale, label system, fingering view, fret count, then launch the exercise that burns it in.</p>
        </div>
      </header>

      <article class="stage-panel fretastic-control-panel">
        <div class="control-block wide">
          <p class="amp-label">Note</p>
          <div class="stage-chip-row compact-row">
            ${renderOptionButtons(FRETBOARD_ACCIDENTALS, "set-fretboard-option", state.fretboardAccidental, "option")}
            ${renderOptionButtons(FRETBOARD_ROOTS, "set-fretboard-root", state.fretboardRoot)}
          </div>
        </div>
        <div class="control-block">
          <p class="amp-label">Scale / mode</p>
          <div class="stage-chip-row compact-row">${renderScaleChips()}</div>
        </div>
        <div class="control-block">
          <p class="amp-label">Harmony</p>
          <div class="stage-chip-row compact-row">${renderOptionButtons(FRETBOARD_HARMONY_MODES, "set-fretboard-harmony", state.fretboardHarmony)}</div>
          ${
            state.fretboardHarmony === "chord"
              ? `<div class="stage-chip-row compact-row chord-color-row">${chordQualityChips()}</div>`
              : ""
          }
        </div>
        <div class="control-block">
          <p class="amp-label">Scale fingering system</p>
          <div class="stage-chip-row compact-row">${renderOptionButtons(FRETBOARD_FINGERINGS, "set-fretboard-fingering", state.fretboardFingering)}</div>
        </div>
        <div class="control-block">
          <p class="amp-label">Fret marker labels</p>
          <div class="stage-chip-row compact-row">${renderOptionButtons(FRETBOARD_MARKERS, "set-fretboard-marker", state.fretboardMarker)}</div>
          <div class="mini-toggle-row">
            <button class="mini-toggle ${state.fretboardShowTriads ? "active" : ""}" data-action="toggle-fretboard-flag" data-flag="fretboardShowTriads">Triads</button>
            <button class="mini-toggle ${state.fretboardShowAll ? "active" : ""}" data-action="toggle-fretboard-flag" data-flag="fretboardShowAll">All notes</button>
            <button class="mini-toggle ${state.fretboardShowRoot ? "active" : ""}" data-action="toggle-fretboard-flag" data-flag="fretboardShowRoot">Root</button>
          </div>
        </div>
        <div class="control-block">
          <p class="amp-label"># of frets</p>
          <input class="lab-range" type="range" min="5" max="24" value="${state.fretboardFrets}" data-role="fretboard-frets" />
          <strong class="range-readout">0-${state.fretboardFrets}</strong>
        </div>
      </article>

      ${renderFretboardUtilityPanel(map)}

      <article class="stage-panel neck-stage">
        <div class="panel-head">
          <div>
            <p class="amp-label">${map.root} · ${scale.label}</p>
            <h2 class="section-title">${state.fretboardMarker === "none" ? "Root map" : map.scaleFormula}</h2>
            <p class="section-copy">Marker labels: ${state.fretboardMarker}. Harmony: ${state.fretboardHarmony}. Scroll sideways for the full neck.</p>
          </div>
          <span class="hot-pill">0-${state.fretboardFrets} frets</span>
        </div>
        <div class="fretboard-scroll">${renderFullFretboard(map)}</div>
      </article>

      ${renderFretboardExerciseDeck()}
      ${renderFretboardTheoryStrip(map)}
    </section>
  `;
}

function renderChordsEverywhere() {
  const roots = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  const chordMap = selectedChordMap();
  const shapes = chordShapeCards();
  const key = getPracticalKey();
  const rows = diatonicRowsForKey(key);

  return `
    <section class="chords-stack">
      <header class="rock-hero compact">
        <div>
          <p class="amp-label">Chords Everywhere</p>
          <h1 class="rock-title"><span>One chord.</span><span>Whole neck.</span></h1>
          <p class="rock-subtitle">Stop thinking only in open chords. Move roots, CAGED families, shell voicings, and triads around the fretboard.</p>
        </div>
      </header>

      <article class="stage-panel">
        <p class="amp-label">Chord root</p>
        <div class="stage-chip-row root-chip-row">
          ${roots.map((root) => `<button class="stage-chip ${state.selectedChordRoot === root ? "active" : ""}" data-action="set-chord-root" data-value="${root}">${root}</button>`).join("")}
        </div>
        <p class="amp-label spacer-label">Chord color</p>
        <div class="stage-chip-row">${chordQualityChips()}</div>
      </article>

      <article class="stage-panel chord-focus-panel">
        <div class="panel-head">
          <div>
            <p class="amp-label">Selected chord</p>
            <h2 class="rock-title small">${selectedChordName()}</h2>
            <p class="section-copy">Chord tones: ${selectedChordToneNames().join(" · ")}</p>
          </div>
          <span class="hot-pill">move it</span>
        </div>
        <div class="fretboard-scroll">${renderFullFretboard(chordMap)}</div>
      </article>

      <section class="shape-grid">
        ${shapes.map((shape) => `
          <article class="shape-card">
            <span class="shape-anchor">${shape.anchor}</span>
            <h2>${shape.title}</h2>
            <p class="shape-formula">${shape.formula}</p>
            <p>${shape.use}</p>
          </article>
        `).join("")}
      </section>

      <article class="stage-panel">
        <div class="panel-head">
          <div>
            <p class="amp-label">Chords in ${key.name}</p>
            <h2 class="section-title">Use the family, then move the shape.</h2>
          </div>
          <button class="secondary-button" data-action="switch-tab" data-tab="fretboard">Map roots</button>
        </div>
        <div class="chord-strip">
          ${rows.map((row) => `
            <button class="degree-tile" data-action="set-chord-root" data-value="${row.root}">
              <span>${row.roman}</span>
              <strong>${row.name}</strong>
              <small>${row.qualityLabel}</small>
            </button>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderSetup() {
  const section = SECTION_DEFS[state.selectedSection];
  const settings = getCurrentSettings();
  return `
    <section class="setup-stack">
      <div class="setup-panel">
        <p class="eyebrow">Session Setup</p>
        <div class="section-actions">
          <button class="ghost-button" data-action="back-to-tab">Back</button>
        </div>
        <h1 class="hero-title">${section.title}</h1>
        <p class="section-copy">${section.blurb}</p>
      </div>

      <article class="setup-panel">
        <div class="setup-block">
          <h2 class="block-title">Difficulty</h2>
          <div class="choice-grid">
            ${DIFFICULTIES.map(
              (difficulty) => `
                <button
                  class="choice-pill ${settings.difficulty === difficulty.id ? "active" : ""}"
                  data-action="set-setting"
                  data-key="difficulty"
                  data-value="${difficulty.id}"
                >
                  <span>${difficulty.label}</span>
                  <span class="detail-copy">${difficulty.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>
      </article>

      <article class="setup-panel">
        <div class="setup-block">
          <h2 class="block-title">Mode</h2>
          <div class="toggle-group">
            ${section.modes
              .map(
                (mode) => `
                  <button
                    class="toggle-pill ${settings.mode === mode.id ? "active" : ""}"
                    data-action="set-setting"
                    data-key="mode"
                    data-value="${mode.id}"
                  >
                    <span>${mode.label}</span>
                    <span class="detail-copy">${mode.detail}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </article>

      <article class="setup-panel">
        <div class="setup-block">
          <h2 class="block-title">Goal</h2>
          <div class="toggle-group">
            ${GOALS.map(
              (goal) => `
                <button
                  class="toggle-pill ${settings.goal === goal.id ? "active" : ""}"
                  data-action="set-setting"
                  data-key="goal"
                  data-value="${goal.id}"
                >
                  <span>${goal.label}</span>
                  <span class="detail-copy">${goal.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="setup-block">
          <h2 class="block-title">Session shape</h2>
          <div class="toggle-group">
            ${CHOICE_COUNTS.map(
              (count) => `
                <button
                  class="toggle-pill ${settings.choices === count ? "active" : ""}"
                  data-action="set-setting"
                  data-key="choices"
                  data-value="${count}"
                >
                  <span>${count} answers</span>
                  <span class="detail-copy">${count === 4 ? "Fast thumb quiz" : "Higher pressure spread"}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="setup-block">
          <h2 class="block-title">Sound</h2>
          <div class="toggle-group">
            ${TONES.map(
              (tone) => `
                <button
                  class="toggle-pill ${settings.tone === tone.id ? "active" : ""}"
                  data-action="set-setting"
                  data-key="tone"
                  data-value="${tone.id}"
                >
                  <span>${tone.label}</span>
                  <span class="detail-copy">${tone.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="setup-block">
          <h2 class="block-title">Answer style</h2>
          <div class="toggle-group">
            ${ANSWER_STYLES.map(
              (style) => `
                <button
                  class="toggle-pill ${settings.answerStyle === style.id ? "active" : ""}"
                  data-action="set-setting"
                  data-key="answerStyle"
                  data-value="${style.id}"
                >
                  <span>${style.label}</span>
                  <span class="detail-copy">${style.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="setup-block">
          <h2 class="block-title">Articulation</h2>
          <div class="toggle-group">
            ${ARTICULATIONS.map(
              (articulation) => `
                <button
                  class="toggle-pill ${settings.articulation === articulation.id ? "active" : ""}"
                  data-action="set-setting"
                  data-key="articulation"
                  data-value="${articulation.id}"
                >
                  <span>${articulation.label}</span>
                  <span class="detail-copy">${articulation.detail}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>

        <div class="section-actions">
          <button class="primary-button" data-action="start-session">Start 7-question set</button>
        </div>
      </article>
    </section>
  `;
}

function renderSession() {
  const session = state.session;
  const question = getCurrentQuestion();
  const progressPercent = Math.round((session.index / session.questions.length) * 100);
  const answerStyle = session.settings.answerStyle;
  return `
    <section class="session-stack">
      <article class="session-panel">
        <p class="eyebrow">${session.kind === "daily" ? "Daily challenge" : session.title}</p>
        <div class="session-meta">
          <div>
            <h1 class="session-title">Question ${session.index + 1} of ${session.questions.length}</h1>
            <p class="support-copy">${session.correct} correct so far · ${session.settings.goal} goal · ${answerStyle}</p>
          </div>
          <button class="ghost-button" data-action="exit-session">Exit</button>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${progressPercent}%"></div>
        </div>
      </article>

      <article class="session-panel">
        <p class="question-prompt">${question.prompt}</p>
        <p class="question-support">${question.support}</p>
        ${renderQuestionVisual(question)}

        ${
          answerStyle === "compare"
            ? `
              <div class="loop-status">Auto-playing A then B until you answer.</div>
              <div class="transport-row compare-controls">
                <button class="play-button" data-action="play-question">Replay A+B</button>
                <button class="icon-button" data-action="play-compare" data-side="A">Play A</button>
                <button class="icon-button" data-action="play-compare" data-side="B">Play B</button>
                <button class="icon-button" data-action="skip-question">Skip</button>
              </div>
            `
            : `
              <div class="loop-status">Auto-playing until you answer.</div>
              <div class="transport-row compact">
                <button class="play-button" data-action="play-question">Replay now</button>
                <button class="icon-button" data-action="skip-question">Skip</button>
              </div>
            `
        }

        ${
          answerStyle === "free"
            ? `
              <div class="free-response-row">
                <input class="response-input" data-role="free-response" value="${escapeHtml(session.typedAnswer || "")}" placeholder="Type the answer you heard" ${session.feedback ? "disabled" : ""} />
                <button class="secondary-button" data-action="submit-free" ${session.feedback ? "disabled" : ""}>Submit</button>
              </div>
            `
            : answerStyle === "delayed" && !session.choicesVisible
              ? `
                <div class="feedback-panel">
                  <span class="feedback-pill">Blind listen</span>
                  <p>Play once or twice, then reveal the options only after you have an internal answer.</p>
                  <div class="summary-actions">
                    <button class="secondary-button" data-action="reveal-choices">Reveal choices</button>
                  </div>
                </div>
              `
              : `
                <div class="answer-grid" data-columns="${question.options.length}">
                  ${question.options
                    .map((option) => {
                      const feedback = session.feedback;
                      const buttonState = feedback
                        ? option.id === feedback.correctId
                          ? "correct"
                          : option.id === feedback.answerId && option.id !== feedback.correctId
                            ? "wrong"
                            : "disabled"
                        : "";
                      return `
                        <button
                          class="answer-button ${buttonState}"
                          data-action="answer"
                          data-answer="${option.id}"
                          ${feedback ? "disabled" : ""}
                        >
                          <span>${option.label}</span>
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              `
        }

        ${
          session.feedback
            ? `
              <div class="feedback-panel ${session.feedback.isCorrect ? "correct" : "wrong"}">
                <span class="feedback-pill">${session.feedback.isCorrect ? "Correct" : "Listen again"}</span>
                <p><strong>${session.feedback.correctLabel}</strong></p>
                <p>${session.feedback.note}</p>
                <p>${session.feedback.explanation}</p>
              </div>
              ${question.guitarMap ? renderGuitarMap(question.guitarMap) : ""}
            `
            : ""
        }
      </article>
    </section>
  `;
}

function renderFullFretboard(map) {
  const fretCount = clamp(Number(map.frets || 12), 5, 24);
  const fretLabels = Array.from({ length: fretCount + 1 }, (_, fret) => fret);
  const preferFlats = Boolean(map.preferFlats || map.root.includes("b"));
  const view = map.view || "scale";
  const marker = map.marker || (view === "intervals" ? "intervals" : view === "scale" ? "degrees" : "notes");
  return `
    <div class="fretboard-grid rail-fretboard" style="--fret-count: ${fretLabels.length}">
      <div class="fretboard-corner">String</div>
      ${fretLabels.map((fret) => `<div class="fret-label">${fret}</div>`).join("")}
      ${GUITAR_STRINGS.map((string) => {
        const cells = fretLabels
          .map((fret) => {
            const pc = pitchClass(string.open + fret);
            const midi = string.midi + fret;
            const interval = pitchClass(pc - map.rootPc);
            const isRoot = pc === map.rootPc;
            const isChordTone =
              view !== "roots" &&
              view !== "notes" &&
              map.showTriads !== false &&
              (map.chordTonePcs || []).includes(pc);
            const isScaleTone = view === "scale" && (map.scaleIntervals || []).includes(interval);
            const isVisible =
              marker !== "none" &&
              ((isRoot && map.showRoot !== false) ||
                isChordTone ||
                isScaleTone ||
                view === "notes" ||
                view === "intervals" ||
                map.showAll !== false);
            const cellClass = isRoot
              ? "root"
              : isChordTone
                ? "chord-tone"
                : isScaleTone
                  ? "scale-tone"
                  : view === "notes" || view === "intervals"
                    ? "plain"
                    : "ghost";
            const label =
              marker === "none"
                ? ""
                : marker === "intervals" || view === "intervals"
                  ? intervalLabelForPc(pc, map.rootPc)
                  : marker === "degrees" && (isRoot || isScaleTone || isChordTone)
                    ? intervalLabelForPc(pc, map.rootPc)
                    : noteNameForPc(pc, preferFlats);
            const noteName = noteNameForPc(pc, preferFlats);
            const accessibleLabel = `Play ${noteName} on ${string.label} string, fret ${fret}`;
            return `
              <button
                type="button"
                class="fret-note ${cellClass} ${isVisible ? "" : "silent"}"
                data-action="play-fret-note"
                data-midi="${midi}"
                data-note="${noteName}"
                data-string="${string.label}"
                data-fret="${fret}"
                aria-label="${accessibleLabel}"
              >${isVisible ? label : ""}</button>
            `;
          })
          .join("");
        return `<div class="string-label">${string.label}</div>${cells}`;
      }).join("")}
    </div>
  `;
}

function renderGuitarMap(map) {
  return `
    <section class="guitar-map">
      <div class="guitar-map-head">
        <div>
          <p class="eyebrow">Guitar Map</p>
          <h2 class="section-title">${map.keyName} · ${map.progression}</h2>
          <p class="section-copy">${map.theory}</p>
        </div>
        <span class="surface-pill"><strong>${map.scaleName}</strong></span>
      </div>

      <div class="map-grid">
        <div class="map-card">
          <p class="block-title">Root anchors</p>
          <div class="anchor-row">
            ${map.anchors
              .map(
                (anchor) => `
                  <span class="anchor-pill">
                    <strong>${anchor.label}</strong>
                    ${anchor.string}${anchor.fret}
                  </span>
                `
              )
              .join("")}
          </div>
          <p class="section-copy">Use these as the three movable reference points from the cheat sheet: root on strings 6, 5, and 4.</p>
        </div>

        <div class="map-card">
          <p class="block-title">Scale formula</p>
          <p class="scale-formula">${map.scaleFormula}</p>
          <p class="section-copy">Full neck below highlights the complete 0-12 fret map, not just a single box.</p>
        </div>
      </div>

      ${
        map.target
          ? `
            <div class="map-card target-card">
              <p class="block-title">Target tone</p>
              <p class="scale-formula">${map.target.chord}: ${map.target.label}</p>
              <p class="section-copy">When the chord arrives, make this note feel like a destination instead of running the whole scale.</p>
            </div>
          `
          : ""
      }

      <div class="chord-map-list">
        ${map.chordRows
          .map(
            (row) => `
              <div class="chord-map-row ${row.outside ? "outside" : ""}">
                <span class="roman-badge">${row.roman}</span>
                <div>
                  <strong>${row.name}</strong>
                  <p>${row.quality} · ${row.fingering}</p>
                  <p>Chord tones: ${row.tones.join(" · ")}</p>
                </div>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="fretboard-scroll">
        ${renderFullFretboard(map)}
      </div>

      <div class="tab-card">
        <p class="block-title">One movable pocket</p>
        <p class="section-copy">Shift this root-6 pocket so the low-E root lands on ${map.root} at fret ${map.anchors.find((anchor) => anchor.label === "Root 6")?.fret ?? "?"}.</p>
        <pre>${map.scaleTab.join("\n")}</pre>
      </div>
    </section>
  `;
}

function renderSummary() {
  const section = SECTION_DEFS[state.summary.sectionId];
  const dailyHistory = getDailyHistory();
  const summaryCopy =
    state.summary.kind === "daily"
      ? `Daily logged. Best score today is ${dailyHistory.bestAccuracy}%.`
      : state.summary.weakest
        ? `Re-run ${section.title.toLowerCase()} and keep an ear on ${state.summary.weakest}.`
        : "Clean round. Increase the difficulty or widen the answer spread next.";

  return `
    <section class="summary-stack">
      <article class="summary-panel">
        <p class="eyebrow">${state.summary.kind === "daily" ? "Daily Complete" : "Session Complete"}</p>
        <div class="summary-meta">
          <div>
            <h1 class="session-title">${state.summary.title}</h1>
            <p class="support-copy">${section.label}</p>
          </div>
          <span class="surface-pill"><strong>${state.streak.count}</strong> day streak</span>
        </div>
        <p class="summary-score">${state.summary.accuracy}%</p>
        <div class="summary-grid">
          <div class="mini-stat">
            <span class="feature-label">Correct</span>
            <strong>${state.summary.correct}/${state.summary.total}</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Avg time</span>
            <strong>${(state.summary.averageTime / 1000).toFixed(1)}s</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Weak spot</span>
            <strong>${state.summary.weakest || "None"}</strong>
          </div>
        </div>
      </article>

      <article class="summary-panel">
        <p class="section-copy">${summaryCopy}</p>
        <div class="summary-grid">
          ${getAchievements()
            .map(
              (achievement) => `
                <div class="mini-stat">
                  <span class="feature-label">${achievement.unlocked ? "Unlocked" : "Locked"}</span>
                  <strong>${achievement.title}</strong>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="summary-actions">
          <button class="primary-button" data-action="${state.summary.kind === "daily" ? "start-daily" : "restart-session"}">
            ${state.summary.kind === "daily" ? "Daily again" : "Run it again"}
          </button>
          <button class="secondary-button" data-action="open-progress">See progress</button>
        </div>
      </article>
    </section>
  `;
}

function renderProgress() {
  const dailyHistory = getDailyHistory();
  const tonePerformance = getTonePerformance();
  const confusionRows = getTopConfusions();
  return `
    <section class="progress-stack">
      <header class="masthead">
        <div>
          <p class="eyebrow">Progress</p>
          <h1 class="hero-title">Measure the ear, not the guesswork.</h1>
        </div>
        <div class="brand-mark" aria-hidden="true"></div>
      </header>

      <article class="progress-panel">
        <div class="stats-grid">
          <div class="mini-stat">
            <span class="feature-label">Daily streak</span>
            <strong>${state.streak.count}</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Sessions</span>
            <strong>${totalSessions()}</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Overall accuracy</span>
            <strong>${overallAccuracy()}%</strong>
          </div>
        </div>
      </article>

      <article class="progress-panel">
        <p class="eyebrow">Today</p>
        <div class="stats-grid">
          <div class="mini-stat">
            <span class="feature-label">Daily status</span>
            <strong>${dailyHistory.completed ? "Done" : "Open"}</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Daily attempts</span>
            <strong>${dailyHistory.attempts}</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Best daily</span>
            <strong>${dailyHistory.completed ? `${dailyHistory.bestAccuracy}%` : "-"}</strong>
          </div>
        </div>
      </article>

      ${renderRoadmap()}

      <article class="progress-panel">
        <p class="eyebrow">Mastery by section</p>
        <div class="progress-bar-list">
          ${Object.values(SECTION_DEFS)
            .map((section) => {
              const mastery = getMastery(section.id);
              return `
                <div class="progress-row">
                  <div class="progress-head">
                    <strong>${section.title}</strong>
                    <span class="pill">${mastery}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" style="width:${mastery}%"></div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>

      ${renderHeatmap()}

      <article class="progress-panel">
        <p class="eyebrow">Confusion pairs</p>
        <div class="progress-bar-list">
          ${
            confusionRows.length
              ? confusionRows
                  .map(
                    (row) => `
                      <div class="progress-row">
                        <div class="progress-head">
                          <strong>${row.section}</strong>
                          <span class="pill">${row.count} misses</span>
                        </div>
                        <p class="section-copy">${formatConceptLabel(row.sectionId, row.from)} vs ${formatConceptLabel(row.sectionId, row.to)}</p>
                      </div>
                    `
                  )
                  .join("")
              : `<p class="section-copy">No major confusion clusters yet.</p>`
          }
        </div>
      </article>

      <article class="progress-panel">
        <p class="eyebrow">Tone performance</p>
        <div class="stats-grid">
          ${Object.entries(tonePerformance)
            .map(([toneId, stats]) => {
              const accuracy = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;
              return `
                <div class="mini-stat">
                  <span class="feature-label">${TONES.find((tone) => tone.id === toneId)?.label || toneId}</span>
                  <strong>${accuracy}%</strong>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>
    </section>
  `;
}

function renderProfile() {
  const activePath = getActivePath();
  return `
    <section class="profile-stack">
      <header class="masthead">
        <div>
          <p class="eyebrow">Profile</p>
          <h1 class="hero-title">Tune the practice surface.</h1>
        </div>
        <div class="brand-mark" aria-hidden="true"></div>
      </header>

      <article class="settings-card">
        <p class="eyebrow">Learning path</p>
        <div class="setting-grid">
          <button class="toggle-pill" data-action="open-onboarding">
            <span>${activePath.title}</span>
            <span class="detail-copy">${activePath.detail}</span>
          </button>
          <button class="toggle-pill" disabled>
            <span>Weekly target</span>
            <span class="detail-copy">${getWeeklySessions()} of ${getWeeklyTarget()} sessions this week.</span>
          </button>
        </div>
      </article>

      <article class="settings-card">
        <p class="eyebrow">Accessibility</p>
        <div class="setting-grid">
          <button
            class="toggle-pill ${state.preferences.largeButtons ? "active" : ""}"
            data-action="toggle-preference"
            data-key="largeButtons"
          >
            <span>Large tap targets</span>
            <span class="detail-copy">Adds more reach room for one-handed play.</span>
          </button>
          <button
            class="toggle-pill ${state.preferences.reducedMotion ? "active" : ""}"
            data-action="toggle-preference"
            data-key="reducedMotion"
          >
            <span>Reduced motion</span>
            <span class="detail-copy">Tones down transitions and movement.</span>
          </button>
        </div>
      </article>

      <article class="settings-card">
        <p class="eyebrow">Feedback</p>
        <div class="setting-grid">
          <button
            class="toggle-pill ${state.preferences.haptics ? "active" : ""}"
            data-action="toggle-preference"
            data-key="haptics"
          >
            <span>Haptics</span>
            <span class="detail-copy">Use vibration for correct and incorrect taps.</span>
          </button>
          <button class="toggle-pill" data-action="open-onboarding">
            <span>Replay onboarding</span>
            <span class="detail-copy">Revisit the first-run choices and defaults.</span>
          </button>
        </div>
      </article>

      <article class="settings-card">
        <p class="eyebrow">Persistence</p>
        <div class="setting-grid">
          <button class="toggle-pill" disabled>
            <span>Local storage only</span>
            <span class="detail-copy">No backend. Progress stays on this device for simple Vercel deployment.</span>
          </button>
          <button class="toggle-pill" data-action="reset-progress">
            <span>Reset progress</span>
            <span class="detail-copy">Clear local mastery, streak, and daily challenge data.</span>
          </button>
        </div>
      </article>

      ${renderInstallCard()}
    </section>
  `;
}

function renderBottomNav() {
  if (state.screen === "onboarding") {
    return "";
  }
  const activeTab =
    state.screen === "setup" || state.screen === "session" || state.screen === "summary"
      ? state.session?.kind === "daily" || state.summary?.kind === "daily"
        ? "home"
        : "practice"
      : state.tab;
  const navItems = [
    { id: "home", icon: "Jam", label: "Ready" },
    { id: "practice", icon: "Play", label: "Trainer" },
    { id: "fretboard", icon: "Neck", label: "Fretboard" },
    { id: "chords", icon: "Grip", label: "Chords" },
  ];
  return `
    <nav class="bottom-nav" aria-label="Primary">
      <div class="bottom-nav-inner">
        ${navItems
          .map(
            (item) => `
              <button class="nav-button ${activeTab === item.id ? "active" : ""}" data-action="switch-tab" data-tab="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span>${item.label}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </nav>
  `;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function handleAction(event) {
  const target = event.target.closest("[data-action]");
  if (!target) {
    return;
  }
  const action = target.dataset.action;

  if (action === "play-fret-note") {
    playFretNote(target);
    return;
  }
  if (action === "switch-tab") {
    switchTab(target.dataset.tab);
    return;
  }
  if (action === "set-jam-key") {
    state.selectedJamKey = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-view") {
    state.selectedFretboardView = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-scale") {
    state.selectedFretboardScale = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-root") {
    state.fretboardRoot = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-option") {
    state.fretboardAccidental = target.dataset.option;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-harmony") {
    state.fretboardHarmony = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-fingering") {
    state.fretboardFingering = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-fretboard-marker") {
    state.fretboardMarker = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "toggle-fretboard-flag") {
    const flag = target.dataset.flag;
    if (flag && Object.prototype.hasOwnProperty.call(state, flag)) {
      state[flag] = !state[flag];
      saveState();
      render();
    }
    return;
  }
  if (action === "play-fretboard-scale") {
    playSelectedFretboardScale();
    return;
  }
  if (action === "toggle-metronome") {
    toggleMetronome();
    return;
  }
  if (action === "start-fretboard-exercise") {
    startFretboardExercise(target.dataset.exercise);
    return;
  }
  if (action === "set-chord-root") {
    state.selectedChordRoot = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "set-chord-quality") {
    state.selectedChordQuality = target.dataset.value;
    saveState();
    render();
    return;
  }
  if (action === "open-jam-mode") {
    state.sectionSettings.jam.mode = target.dataset.mode || "function";
    openSection("jam", "practice");
    return;
  }
  if (action === "start-jam-mode") {
    state.sectionSettings.jam.mode = target.dataset.mode || "function";
    state.sectionSettings.jam.difficulty = "intermediate";
    state.sectionSettings.jam.answerStyle = "tap";
    createSession("jam");
    return;
  }
  if (action === "open-section") {
    openSection(target.dataset.section, target.dataset.origin);
    return;
  }
  if (action === "back-to-tab") {
    switchTab(state.tab === "home" ? "home" : "practice");
    return;
  }
  if (action === "set-setting") {
    const value = target.dataset.value;
    updateSectionSetting(target.dataset.key, target.dataset.key === "choices" ? Number(value) : value);
    return;
  }
  if (action === "toggle-setting") {
    const key = target.dataset.key;
    updateSectionSetting(key, !getCurrentSettings()[key]);
    return;
  }
  if (action === "start-session") {
    createSession(state.selectedSection);
    return;
  }
  if (action === "start-daily") {
    createDailySession();
    return;
  }
  if (action === "start-review") {
    createReviewSession();
    return;
  }
  if (action === "start-playlist") {
    createPlaylistSession(target.dataset.playlist);
    return;
  }
  if (action === "play-question" || action === "repeat-question") {
    startQuestionLoop();
    return;
  }
  if (action === "play-compare") {
    playCompareSide(target.dataset.side);
    return;
  }
  if (action === "answer") {
    submitAnswer(target.dataset.answer);
    return;
  }
  if (action === "reveal-choices") {
    state.session.choicesVisible = true;
    render();
    return;
  }
  if (action === "submit-free") {
    submitFreeResponse();
    return;
  }
  if (action === "skip-question") {
    submitAnswer("__skip__");
    return;
  }
  if (action === "exit-session") {
    clearQuestionRepeat();
    stopActiveAudio();
    state.session = null;
    state.screen = state.tab === "home" ? "home" : "setup";
    clearAutoAdvance();
    render();
    return;
  }
  if (action === "restart-session") {
    createSession(state.summary.sectionId);
    return;
  }
  if (action === "open-progress") {
    switchTab("progress");
    return;
  }
  if (action === "toggle-preference") {
    const key = target.dataset.key;
    updatePreference(key, !state.preferences[key]);
    return;
  }
  if (action === "install-app") {
    promptInstall();
    return;
  }
  if (action === "set-onboarding") {
    updateOnboardingChoice(target.dataset.key, target.dataset.value);
    return;
  }
  if (action === "finish-onboarding") {
    applyOnboardingChoices(false);
    return;
  }
  if (action === "finish-onboarding-daily") {
    applyOnboardingChoices(true);
    return;
  }
  if (action === "open-onboarding") {
    state.screen = "onboarding";
    render();
    return;
  }
  if (action === "reset-progress") {
    if (window.confirm("Reset all saved practice data on this device?")) {
      state.progress = createDefaultProgress();
      state.streak = { count: 0, lastDate: null };
      state.dailyHistory = createDefaultDailyHistory();
      saveState();
      render();
    }
  }
}

async function playCurrentQuestion(options = {}) {
  const { loop = false, token = null } = options;
  const session = state.session;
  const question = getCurrentQuestion();
  if (!session || !question || session.feedback) {
    return;
  }

  if (!loop) {
    clearQuestionRepeat();
  }

  try {
    await question.play();
  } catch (error) {
    console.warn("Question playback failed", error);
  }

  if (state.session === session && state.session?.settings.answerStyle === "delayed" && !state.session.feedback) {
    state.session.choicesVisible = true;
    render();
  }

  if (loop && state.session === session && !state.session.feedback && token === questionPlaybackToken) {
    questionRepeatTimer = window.setTimeout(() => {
      questionRepeatTimer = null;
      playCurrentQuestion({ loop: true, token });
    }, QUESTION_REPEAT_DELAY_MS);
  }
}

async function playCompareSide(side) {
  const question = getCurrentQuestion();
  if (!question?.playSide) {
    return;
  }
  clearQuestionRepeat();
  stopActiveAudio();
  await question.playSide(side);
}

function submitFreeResponse() {
  const session = state.session;
  const question = getCurrentQuestion();
  if (!session || !question || session.feedback) {
    return;
  }
  const value = session.typedAnswer || "";
  const isCorrect = answerMatches(question, value);
  const matchedOptionId = resolveFreeResponseOptionId(question, value);
  submitAnswer(isCorrect ? question.correctId : matchedOptionId || "__free__");
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  if (target.dataset.role === "free-response" && state.session) {
    state.session.typedAnswer = target.value;
  }
  if (target.dataset.role === "fretboard-frets") {
    state.fretboardFrets = clamp(Number(target.value), 5, 24);
    saveState();
    render();
  }
  if (target.dataset.role === "metronome-bpm") {
    state.metronomeBpm = clamp(Number(target.value), 40, 220);
    saveState();
    if (state.metronomeOn) {
      stopMetronome();
      startMetronome();
    } else {
      render();
    }
  }
}

function handleKeydown(event) {
  if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.dataset.role === "free-response") {
    event.preventDefault();
    submitFreeResponse();
  }
}

function startFretboardExercise(exerciseId) {
  const exercise = FRETBOARD_EXERCISES.find((item) => item.id === exerciseId) || FRETBOARD_EXERCISES[0];
  const settings = {
    ...getCurrentSettings(exercise.sectionId),
    ...exercise.settings,
    tone: getCurrentSettings(exercise.sectionId).tone || "clean",
  };
  state.sectionSettings[exercise.sectionId] = {
    ...state.sectionSettings[exercise.sectionId],
    ...settings,
  };
  createSession(exercise.sectionId, {
    title: exercise.title,
    settings,
    questionCount: SESSION_LENGTH,
  });
}

async function playSelectedFretboardScale() {
  const key = selectedLabKey();
  const scale = JAM_SCALE_LIBRARY[selectedLabScaleId()] || JAM_SCALE_LIBRARY.majorPent;
  const rootMidi = 48 + key.pc;
  const notes = scale.intervals.concat([12]).map((interval) => rootMidi + interval);
  const sequence = notes.concat(notes.slice(0, -1).reverse()).map((note, index, list) => ({
    notes: [note],
    duration: 0.24,
    gap: index === list.length - 1 ? 0 : 0.035,
    gain: 0.18,
  }));
  stopActiveAudio();
  await playSequence(sequence, getCurrentSettings("scales").tone || "clean", "focused");
}

async function playFretNote(target) {
  const midi = Number(target.dataset.midi);
  if (!Number.isFinite(midi)) {
    return;
  }
  const toneId = getCurrentSettings("scales").tone || state.onboarding.preferredTone || "clean";
  const label = `${target.dataset.note || midiToNoteName(midi)} · ${target.dataset.string || "?"}${target.dataset.fret || "0"}`;

  appRoot.dataset.lastFretNote = label;
  target.classList.add("playing");
  target.setAttribute("aria-pressed", "true");
  window.setTimeout(() => {
    target.classList.remove("playing");
    target.removeAttribute("aria-pressed");
  }, 320);

  if (state.preferences.haptics && navigator.vibrate) {
    navigator.vibrate(8);
  }

  await playSequence([{ notes: [midi], duration: 0.72, gap: 0, gain: 0.2 }], toneId, "focused");
}

function scheduleMetronomeClick() {
  if (!state.metronomeOn || !audioContext) {
    return;
  }
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = metronomeBeat % 4 === 0 ? 1180 : 820;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(metronomeBeat % 4 === 0 ? 0.16 : 0.1, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  oscillator.start(now);
  oscillator.stop(now + 0.08);
  activeSources.push(oscillator);
  metronomeBeat += 1;
}

function startMetronome() {
  state.metronomeOn = true;
  metronomeBeat = 0;
  ensureAudio().then(() => {
    scheduleMetronomeClick();
    metronomeTimer = window.setInterval(scheduleMetronomeClick, (60 / state.metronomeBpm) * 1000);
    render();
  });
}

function stopMetronome(renderAfter = true) {
  state.metronomeOn = false;
  if (metronomeTimer) {
    clearInterval(metronomeTimer);
    metronomeTimer = null;
  }
  if (renderAfter) {
    render();
  }
}

function toggleMetronome() {
  if (state.metronomeOn) {
    stopMetronome();
    return;
  }
  startMetronome();
}

async function promptInstall() {
  if (!deferredInstallPrompt) {
    return;
  }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice?.outcome === "accepted") {
    state.installAvailable = false;
  }
  deferredInstallPrompt = null;
  render();
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function midiToNoteName(midi) {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const pitch = names[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${pitch}${octave}`;
}

const SAMPLE_NOTE_URLS = {
  C2: "C2.mp3",
  "D#2": "Eb2.mp3",
  "F#2": "Gb2.mp3",
  A2: "A2.mp3",
  C3: "C3.mp3",
  "D#3": "Eb3.mp3",
  "F#3": "Gb3.mp3",
  A3: "A3.mp3",
  C4: "C4.mp3",
  "D#4": "Eb4.mp3",
  "F#4": "Gb4.mp3",
  A4: "A4.mp3",
  C5: "C5.mp3",
  "D#5": "Eb5.mp3",
  "F#5": "Gb5.mp3",
  A5: "A5.mp3",
};

const SAMPLE_INSTRUMENTS = {
  clean: {
    baseUrl: `./samples/clean/`,
    gain: 0.88,
    cutoff: 3600,
    release: 0.72,
  },
  acoustic: {
    baseUrl: `./samples/acoustic/`,
    gain: 0.92,
    cutoff: 3300,
    release: 0.86,
  },
  piano: {
    baseUrl: `./samples/piano/`,
    gain: 0.76,
    cutoff: 4400,
    release: 1.15,
  },
};

function createNoiseBufferForContext(context, duration, tilt = 0.04) {
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let previous = 0;
  for (let index = 0; index < length; index += 1) {
    const white = Math.random() * 2 - 1;
    previous = previous * (1 - tilt) + white * tilt;
    data[index] = previous;
  }
  return buffer;
}

function createImpulseResponse(context, duration = 1.2, decay = 2.4) {
  const length = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const envelope = (1 - index / length) ** decay;
      data[index] = (Math.random() * 2 - 1) * envelope;
    }
  }
  return buffer;
}

function shapeEnvelope(param, points) {
  points.forEach((point, index) => {
    if (index === 0) {
      param.setValueAtTime(point.value, point.time);
      return;
    }
    const previous = points[index - 1];
    if (point.value <= 0.0001 || previous.value <= 0.0001) {
      param.linearRampToValueAtTime(point.value, point.time);
    } else {
      param.exponentialRampToValueAtTime(point.value, point.time);
    }
  });
}

function buildGuitarBufferContext(context, frequency, toneId) {
  const master = context.createGain();
  const compressor = context.createDynamicsCompressor();
  const tone = context.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = toneId === "acoustic" ? 2350 : 2500;
  compressor.threshold.value = -26;
  compressor.knee.value = 16;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.2;
  compressor.connect(tone);
  tone.connect(master);
  master.connect(context.destination);

  const stringDelay = context.createDelay(1);
  stringDelay.delayTime.value = 1 / frequency;

  const feedback = context.createGain();
  feedback.gain.value = toneId === "acoustic" ? 0.95 : 0.956;

  const damping = context.createBiquadFilter();
  damping.type = "lowpass";
  damping.frequency.value = toneId === "acoustic" ? 1750 : 2200;

  stringDelay.connect(damping);
  damping.connect(feedback);
  feedback.connect(stringDelay);

  const body = context.createBiquadFilter();
  body.type = "bandpass";
  body.frequency.value = toneId === "acoustic" ? 180 : 250;
  body.Q.value = 0.8;
  stringDelay.connect(body);
  body.connect(compressor);

  const shimmer = context.createOscillator();
  shimmer.type = "triangle";
  shimmer.frequency.value = frequency;
  const shimmerGain = context.createGain();
  shimmer.connect(shimmerGain);
  shimmerGain.connect(compressor);
  shapeEnvelope(shimmerGain.gain, [
    { time: 0, value: 0.0001 },
    { time: 0.012, value: toneId === "acoustic" ? 0.028 : 0.036 },
    { time: 0.48, value: 0.003 },
    { time: 1.7, value: 0.0001 },
  ]);
  shimmer.start(0);
  shimmer.stop(1.75);

  if (toneId === "clean") {
    const octave = context.createOscillator();
    octave.type = "triangle";
    octave.frequency.value = frequency * 2;
    const octaveGain = context.createGain();
    octave.connect(octaveGain);
    octaveGain.connect(compressor);
    shapeEnvelope(octaveGain.gain, [
      { time: 0, value: 0.0001 },
      { time: 0.012, value: 0.009 },
      { time: 0.28, value: 0.0018 },
      { time: 1.1, value: 0.0001 },
    ]);
    octave.start(0);
    octave.stop(1.15);
  }

  const pick = context.createBufferSource();
  pick.buffer = createNoiseBufferForContext(context, 0.045, toneId === "acoustic" ? 0.05 : 0.07);
  const pickFilter = context.createBiquadFilter();
  pickFilter.type = "bandpass";
  pickFilter.frequency.value = toneId === "acoustic" ? 1450 : 1750;
  pickFilter.Q.value = 0.7;
  const pickGain = context.createGain();
  pick.connect(pickFilter);
  pickFilter.connect(pickGain);
  pickGain.connect(stringDelay);
  pickGain.connect(compressor);
  shapeEnvelope(pickGain.gain, [
    { time: 0, value: 0.0001 },
    { time: 0.003, value: toneId === "acoustic" ? 0.4 : 0.34 },
    { time: 0.04, value: 0.0001 },
  ]);
  pick.start(0);
  pick.stop(0.04);
}

function buildPianoBufferContext(context, frequency) {
  const master = context.createGain();
  const lowpass = context.createBiquadFilter();
  const compressor = context.createDynamicsCompressor();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 3800;
  compressor.threshold.value = -22;
  compressor.knee.value = 18;
  compressor.ratio.value = 3.5;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.22;
  lowpass.connect(compressor);
  compressor.connect(master);
  master.connect(context.destination);

  const partials = [
    { ratio: 1, gain: 0.22, detune: -2, type: "triangle", decay: 2.2 },
    { ratio: 2.01, gain: 0.12, detune: 2, type: "sine", decay: 1.5 },
    { ratio: 3.98, gain: 0.06, detune: 6, type: "sine", decay: 1.1 },
  ];

  partials.forEach((partial) => {
    const oscillator = context.createOscillator();
    oscillator.type = partial.type;
    oscillator.frequency.value = frequency * partial.ratio;
    oscillator.detune.value = partial.detune;
    const gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(lowpass);
    shapeEnvelope(gain.gain, [
      { time: 0, value: 0.0001 },
      { time: 0.008, value: partial.gain },
      { time: partial.decay, value: 0.0001 },
    ]);
    oscillator.start(0);
    oscillator.stop(partial.decay + 0.1);
  });

  const hammer = context.createBufferSource();
  hammer.buffer = createNoiseBufferForContext(context, 0.03, 0.18);
  const hammerFilter = context.createBiquadFilter();
  hammerFilter.type = "bandpass";
  hammerFilter.frequency.value = 2400;
  const hammerGain = context.createGain();
  hammer.connect(hammerFilter);
  hammerFilter.connect(hammerGain);
  hammerGain.connect(lowpass);
  shapeEnvelope(hammerGain.gain, [
    { time: 0, value: 0.0001 },
    { time: 0.002, value: 0.22 },
    { time: 0.03, value: 0.0001 },
  ]);
  hammer.start(0);
  hammer.stop(0.03);
}

async function renderNoteBuffer(toneId, midi) {
  const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const duration = toneId === "piano" ? 2.8 : 2.15;
  const sampleRate = 44100;
  const context = new OfflineCtx(2, Math.ceil(duration * sampleRate), sampleRate);
  const frequency = midiToFrequency(midi);
  if (toneId === "piano") {
    buildPianoBufferContext(context, frequency);
  } else {
    buildGuitarBufferContext(context, frequency, toneId);
  }
  return context.startRendering();
}

async function getRenderedNoteBuffer(toneId, midi) {
  const key = `${toneId}:${midi}`;
  if (!renderedNoteCache.has(key)) {
    renderedNoteCache.set(key, renderNoteBuffer(toneId, midi));
  }
  return renderedNoteCache.get(key);
}

async function getIntervalSampleBuffer() {
  if (!intervalSampleBufferPromise) {
    intervalSampleBufferPromise = fetch(`./audio/interval-note.wav?v=${ASSET_VERSION}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load interval sample: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((buffer) => audioContext.decodeAudioData(buffer));
  }
  return intervalSampleBufferPromise;
}

async function ensureAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  state.audioReady = true;
  if (!roomImpulseBuffer) {
    roomImpulseBuffer = createImpulseResponse(audioContext);
  }
}

function stopActiveAudio() {
  activeSources.forEach((source) => {
    try {
      source.stop();
    } catch (error) {
      // Ignore sources that already ended.
    }
  });
  activeSources = [];
  activeToneNodes.forEach((node) => {
    try {
      node.releaseAll?.();
      node.dispose?.();
    } catch (error) {
      // Tone nodes may already be disposed after a completed playback.
    }
  });
  activeToneNodes = [];
  sampleInstrumentCache.forEach(({ sampler }) => {
    try {
      sampler.releaseAll?.();
    } catch (error) {
      // Cached samplers stay alive between questions, but their voices should stop.
    }
  });
}

function articulationProfile(articulation) {
  if (articulation === "muted") {
    return { length: 0.62, width: 0.22, reverb: 0.08, cutoff: 1850 };
  }
  if (articulation === "sustain") {
    return { length: 1.45, width: 0.55, reverb: 0.18, cutoff: 2600 };
  }
  return { length: 1, width: 0.35, reverb: 0.12, cutoff: 2200 };
}

function toneGainFor(toneId) {
  if (toneId === "acoustic") {
    return 0.15;
  }
  if (toneId === "piano") {
    return 0.17;
  }
  return 0.16;
}

function toneCutoffFor(toneId, articulation) {
  if (toneId === "piano") {
    return articulation === "sustain" ? 2800 : 2400;
  }
  if (toneId === "acoustic") {
    return articulation === "muted" ? 1750 : 2150;
  }
  return articulation === "muted" ? 1650 : 2050;
}

function toneVelocityFor(stepGain) {
  return clamp((stepGain || 0.18) * 4.2, 0.32, 0.82);
}

function toneSynthOptions(toneId, articulation) {
  if (toneId === "piano") {
    return {
      harmonicity: 1.5,
      modulationIndex: 1.2,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.012,
        decay: 0.28,
        sustain: articulation === "muted" ? 0.08 : 0.18,
        release: articulation === "sustain" ? 1.4 : 0.75,
      },
      modulation: { type: "triangle" },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.18,
        sustain: 0.02,
        release: 0.35,
      },
    };
  }
  return {
    harmonicity: toneId === "acoustic" ? 1.015 : 1.01,
    modulationIndex: toneId === "acoustic" ? 2.1 : 1.55,
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.006,
      decay: articulation === "muted" ? 0.18 : 0.34,
      sustain: articulation === "muted" ? 0.03 : 0.09,
      release: articulation === "sustain" ? 0.95 : 0.48,
    },
    modulation: { type: toneId === "acoustic" ? "triangle" : "sine" },
    modulationEnvelope: {
      attack: 0.002,
      decay: toneId === "acoustic" ? 0.09 : 0.06,
      sustain: 0,
      release: 0.08,
    },
  };
}

function createToneGraph(toneId, articulation) {
  const Tone = window.Tone;
  const output = new Tone.Gain(toneId === "piano" ? 0.75 : 0.9).toDestination();
  const limiter = new Tone.Limiter(-4).connect(output);
  const compressor = new Tone.Compressor({
    threshold: -20,
    ratio: 2.8,
    attack: 0.005,
    release: 0.18,
  }).connect(limiter);
  const filter = new Tone.Filter({
    type: "lowpass",
    frequency: toneCutoffFor(toneId, articulation),
    Q: 0.4,
  }).connect(compressor);
  const synth = new Tone.PolySynth(Tone.FMSynth, toneSynthOptions(toneId, articulation)).connect(filter);
  const nodes = [synth, filter, compressor, limiter, output];
  activeToneNodes.push(...nodes);
  return { synth, nodes };
}

function disposeToneGraph(nodes) {
  nodes.forEach((node) => {
    try {
      node.dispose?.();
    } catch (error) {
      // A stopped playback may already have disposed its Tone graph.
    }
  });
  activeToneNodes = activeToneNodes.filter((node) => !nodes.includes(node));
}

function getSampleInstrument(toneId, articulation) {
  const Tone = window.Tone;
  const config = SAMPLE_INSTRUMENTS[toneId] || SAMPLE_INSTRUMENTS.clean;
  const key = `${toneId}:${articulation}`;
  if (sampleInstrumentCache.has(key)) {
    return sampleInstrumentCache.get(key);
  }

  const output = new Tone.Gain(config.gain).toDestination();
  const limiter = new Tone.Limiter(-3).connect(output);
  const compressor = new Tone.Compressor({
    threshold: -22,
    ratio: 2.4,
    attack: 0.004,
    release: 0.16,
  }).connect(limiter);
  const filter = new Tone.Filter({
    type: "lowpass",
    frequency: articulation === "muted" ? Math.min(config.cutoff, 2600) : config.cutoff,
    Q: 0.35,
  }).connect(compressor);
  const sampler = new Tone.Sampler({
    urls: SAMPLE_NOTE_URLS,
    baseUrl: config.baseUrl,
    attack: articulation === "muted" ? 0.002 : 0.006,
    release: articulation === "sustain" ? config.release * 1.35 : config.release,
    onerror: (error) => {
      console.warn("Sample instrument failed to load", error);
    },
  }).connect(filter);

  const instrument = { sampler, nodes: [sampler, filter, compressor, limiter, output] };
  sampleInstrumentCache.set(key, instrument);
  return instrument;
}

async function playSampleSequence(sequence, toneId, articulation = "focused") {
  const Tone = window.Tone;
  if (!Tone?.Sampler || !Tone?.loaded || !Tone?.start) {
    return false;
  }

  await Tone.start();
  state.audioReady = true;
  const { sampler } = getSampleInstrument(toneId, articulation);
  await Tone.loaded();
  stopActiveAudio();

  const toneNow = Tone.now();
  let cursor = toneNow + 0.06;
  let endAt = cursor;

  sequence.forEach((step) => {
    const duration = step.duration || 0.45;
    const velocity = toneVelocityFor(step.gain);
    (step.notes || []).forEach((note) => {
      sampler.triggerAttackRelease(midiToNoteName(note), duration, cursor, velocity);
    });
    endAt = Math.max(endAt, cursor + duration + 0.3);
    cursor += duration + (step.gap || 0.04);
  });

  await wait(Math.max((endAt - Tone.now()) * 1000, 80));
  return true;
}

async function playToneSequence(sequence, toneId, articulation = "focused") {
  try {
    if (await playSampleSequence(sequence, toneId, articulation)) {
      return true;
    }
  } catch (error) {
    console.warn("Sample playback failed, falling back to synth", error);
  }

  const Tone = window.Tone;
  if (!Tone?.PolySynth || !Tone?.Gain || !Tone?.start) {
    return false;
  }

  await Tone.start();
  state.audioReady = true;
  stopActiveAudio();

  const { synth, nodes } = createToneGraph(toneId, articulation);
  const toneNow = Tone.now();
  let cursor = toneNow + 0.06;
  let endAt = cursor;

  sequence.forEach((step) => {
    const duration = step.duration || 0.45;
    const velocity = toneVelocityFor(step.gain);
    (step.notes || []).forEach((note) => {
      synth.triggerAttackRelease(midiToFrequency(note), duration, cursor, velocity);
    });
    endAt = Math.max(endAt, cursor + duration + 0.3);
    cursor += duration + (step.gap || 0.04);
  });

  await wait(Math.max((endAt - Tone.now()) * 1000, 80));
  disposeToneGraph(nodes);
  return true;
}

function scheduleIntervalSample(buffer, when, midi, gainValue = 0.22) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = Math.pow(2, (midi - 57) / 12);

  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = Math.max(950, 1650 - Math.max(0, midi - 57) * 45);
  filter.Q.value = 0.5;

  const gain = audioContext.createGain();
  const panner = audioContext.createStereoPanner();
  panner.pan.value = 0;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(panner);
  panner.connect(audioContext.destination);

  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(gainValue, when + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.82);

  source.start(when);
  source.stop(when + 0.88);
  activeSources.push(source);
}

function scheduleBufferedNote(buffer, when, duration, toneId, articulation, gainValue = 0.18, midi = null) {
  const profile = articulationProfile(articulation);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  const toneFilter = audioContext.createBiquadFilter();
  toneFilter.type = "lowpass";
  const baseCutoff = profile.cutoff + (toneId === "piano" ? 650 : toneId === "acoustic" ? -200 : -120);
  const highNoteReduction = typeof midi === "number" ? Math.max(0, midi - 58) * 70 : 0;
  toneFilter.frequency.value = Math.max(1150, baseCutoff - highNoteReduction);
  toneFilter.Q.value = 0.5;
  const gain = audioContext.createGain();
  const panner = audioContext.createStereoPanner();
  const dryGain = audioContext.createGain();
  const reverbSend = audioContext.createGain();
  const convolver = audioContext.createConvolver();
  convolver.buffer = roomImpulseBuffer;

  source.connect(toneFilter);
  toneFilter.connect(gain);
  gain.connect(panner);
  panner.connect(dryGain);
  dryGain.connect(audioContext.destination);
  panner.connect(reverbSend);
  reverbSend.connect(convolver);
  convolver.connect(audioContext.destination);

  panner.pan.setValueAtTime((Math.random() * 2 - 1) * profile.width, when);
  dryGain.gain.setValueAtTime(0.9, when);
  reverbSend.gain.setValueAtTime(profile.reverb, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(gainValue * toneGainFor(toneId), when + (toneId === "piano" ? 0.012 : 0.018));
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration * profile.length + 0.7);
  source.start(when);
  source.stop(when + Math.min(buffer.duration, duration * profile.length + 0.8));
  activeSources.push(source);
}

async function playSequence(sequence, toneId, articulation = "focused") {
  if (await playToneSequence(sequence, toneId, articulation)) {
    return;
  }

  await ensureAudio();
  stopActiveAudio();

  const noteList = [
    ...new Set(
      sequence
        .flatMap((step) => step.notes || [])
        .filter((note) => typeof note === "number")
    ),
  ];
  const buffers = {};
  await Promise.all(
    noteList.map(async (note) => {
      buffers[note] = await getRenderedNoteBuffer(toneId, note);
    })
  );

  let cursor = audioContext.currentTime + 0.04;
  sequence.forEach((step) => {
    (step.notes || []).forEach((note) => {
      scheduleBufferedNote(buffers[note], cursor, step.duration || 0.45, toneId, articulation, step.gain || 0.18, note);
    });
    cursor += (step.duration || 0.45) + (step.gap || 0.04);
  });

  await wait(Math.max((cursor - audioContext.currentTime) * 1000, 80));
}

async function playIntervalSampleSequence(notes, toneId = "clean", articulation = "focused") {
  const intervalSequence = notes.map((note, index) => ({
    notes: [note],
    duration: 0.68,
    gap: index === 0 ? 0.32 : 0,
    gain: 0.2,
  }));
  if (await playToneSequence(intervalSequence, toneId, articulation)) {
    return;
  }

  await ensureAudio();
  stopActiveAudio();
  try {
    const buffer = await getIntervalSampleBuffer();
    let cursor = audioContext.currentTime + 0.04;
    notes.forEach((note, index) => {
      scheduleIntervalSample(buffer, cursor, note, index === 0 ? 0.24 : 0.26);
      cursor += 1;
    });
    await wait(Math.max((cursor - audioContext.currentTime + 0.8) * 1000, 80));
  } catch (error) {
    console.warn("Interval sample playback failed, falling back to synthesized notes", error);
    await playSequence(
      notes.map((note, index) => ({ notes: [note], duration: 0.62, gap: index === 0 ? 0.38 : 0 })),
      toneId,
      articulation
    );
  }
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

appRoot.addEventListener("click", handleAction);
appRoot.addEventListener("input", handleInput);
appRoot.addEventListener("keydown", handleKeydown);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  state.installAvailable = true;
  render();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  state.installAvailable = false;
  state.isStandalone = true;
  render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    let hasReloadedForUpdate = false;
    navigator.serviceWorker
      .register(`./sw.js?v=${ASSET_VERSION}`)
      .then((registration) => registration.update().then(() => registration))
      .then(() => {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (hasReloadedForUpdate) {
            return;
          }
          hasReloadedForUpdate = true;
          window.location.reload();
        });
      })
      .catch((error) => {
        console.warn("Service worker registration failed", error);
      });
  });
}

window.render_game_to_text = () => {
  const question = getCurrentQuestion();
  const toneContext = window.Tone?.getContext?.();
  const toneRawContext = toneContext?.rawContext || toneContext?.context || null;
  const toneContextState = toneRawContext?.state || toneContext?.state || null;
  return JSON.stringify({
    coordinate_system: "UI app only. State is represented as screen names and quiz descriptors.",
    screen: state.screen,
    tab: state.tab,
    selectedSection: state.selectedSection,
    onboardingCompleted: state.onboarding.completed,
    activePath: getActivePath().id,
    daily: {
      challenge: getDailyChallenge(),
      history: getDailyHistory(),
    },
    audioReady: state.audioReady || toneContextState === "running",
    audioEngine: window.Tone?.Sampler ? "tone.js-sampler" : "web-audio-fallback",
    toneContextState,
    sampleCacheSize: sampleInstrumentCache.size,
    autoRepeating: Boolean(questionRepeatTimer),
    streak: state.streak.count,
    summary: state.summary,
    session: state.session
      ? {
          kind: state.session.kind,
          sectionId: state.session.sectionId,
          answerStyle: state.session.settings.answerStyle,
          goal: state.session.settings.goal,
          index: state.session.index,
          total: state.session.questions.length,
          correct: state.session.correct,
          feedback: state.session.feedback,
          prompt: question?.prompt,
          support: question?.support,
          choicesVisible: state.session.choicesVisible,
          options: question?.options.map((option) => option.label),
        }
      : null,
    mastery: Object.fromEntries(
      Object.keys(SECTION_DEFS).map((sectionId) => [sectionId, getMastery(sectionId)])
    ),
  });
};

window.advanceTime = (ms) => {
  if (state.session?.feedback && ms >= AUTO_ADVANCE_MS) {
    goToNextQuestion();
  }
  return window.render_game_to_text();
};

render();
