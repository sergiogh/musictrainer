const STORAGE_KEY = "signal-path-v2";
const ASSET_VERSION = "20260628g";
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
    sections: ["scales", "melody", "progressions"],
    roadmap: [
      { label: "Minor pentatonic confidence", sectionId: "scales", threshold: 75 },
      { label: "Cadence and turnaround hearing", sectionId: "progressions", threshold: 65 },
      { label: "Phrase endings by ear", sectionId: "melody", threshold: 70 },
    ],
  },
  jazz: {
    id: "jazz",
    title: "Jazz Harmony",
    detail: "ii-V-I hearing, chord color, and tension recognition.",
    sections: ["progressions", "theory", "scales"],
    roadmap: [
      { label: "Progression function", sectionId: "progressions", threshold: 75 },
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

function createDefaultSectionSettings() {
  return Object.fromEntries(
    Object.values(SECTION_DEFS).map((section) => [
      section.id,
      {
        difficulty: section.id === "theory" ? "intermediate" : "beginner",
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
    startingLevel: "beginner",
    preferredTone: "clean",
    preferredPath: "foundation",
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

function saveState() {
  const snapshot = {
    selectedSection: state.selectedSection,
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

function degreeLabelForIndex(scaleName, degreeIndex) {
  if (scaleName === "minor") {
    const labels = ["1", "2", "b3", "4", "5", "b6", "b7"];
    return labels[degreeIndex] || DEGREE_LABELS[degreeIndex];
  }
  return DEGREE_LABELS[degreeIndex] || `${degreeIndex + 1}`;
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
      <article class="hero-panel">
        <p class="eyebrow">Signal Path</p>
        <h1 class="hero-title">Headphones on. The ear leads first.</h1>
        <p class="hero-subtitle">
          No guitar input, no account, no backend. Just fast listening drills saved locally in your browser so the app stays easy to deploy on Vercel.
        </p>
      </article>

      <section class="section-grid">
        <article class="feature-card" data-accent="orange">
          <div>
            <p class="feature-label">1. Listen</p>
            <h2 class="feature-title">Press play.</h2>
            <p class="section-copy">Every drill starts with audio only. No fretboard crutches up front.</p>
          </div>
        </article>
        <article class="feature-card" data-accent="teal">
          <div>
            <p class="feature-label">2. Decide</p>
            <h2 class="feature-title">Trust the first read.</h2>
            <p class="section-copy">Use quick multiple choice now. Add pressure later with wider answer spreads.</p>
          </div>
        </article>
        <article class="feature-card" data-accent="gold">
          <div>
            <p class="feature-label">3. Correct</p>
            <h2 class="feature-title">Replay the answer.</h2>
            <p class="section-copy">Wrong answers echo the right sound immediately so your ear calibrates fast.</p>
          </div>
        </article>
        <article class="feature-card" data-accent="blue">
          <div>
            <p class="feature-label">Persistence</p>
            <h2 class="feature-title">Browser-only state.</h2>
            <p class="section-copy">Progress, streaks, onboarding, and daily challenge history all stay in local storage.</p>
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
  const recommendedSectionId = getRecommendedSection();
  const recommended = SECTION_DEFS[recommendedSectionId];
  const challenge = getDailyChallenge();
  const challengeHistory = getDailyHistory();
  const activePath = getActivePath();
  const weeklySessions = getWeeklySessions();
  const dueConcepts = countDueConcepts();
  const todayMinutes = Math.max(
    5,
    Object.values(state.progress).reduce((sum, section) => sum + section.sessions * 2, 0)
  );

  return `
    <section class="home-stack">
      <header class="masthead">
        <div>
          <p class="eyebrow">Signal Path</p>
          <h1 class="hero-title">Train the ear before the fingers.</h1>
        </div>
        <div class="brand-mark" aria-hidden="true"></div>
      </header>

      <article class="hero-panel">
        <p class="hero-subtitle">
          Mobile-first listening drills with local persistence only. Safe to deploy as a static app on Vercel.
        </p>
        <div class="meter-row">
          <div class="mini-stat">
            <span class="feature-label">Streak</span>
            <strong>${state.streak.count || 0} days</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Best focus</span>
            <strong>${SECTION_DEFS[getStrongestSection()].title}</strong>
          </div>
          <div class="mini-stat">
            <span class="feature-label">Time built</span>
            <strong>${todayMinutes} min</strong>
          </div>
        </div>
      </article>

      ${renderInstallCard()}

      <article class="continue-card">
        <p class="eyebrow">Learning path</p>
        <div class="continue-footer">
          <div>
            <h2 class="section-title">${activePath.title}</h2>
            <p class="section-copy">${activePath.detail}</p>
          </div>
          <button class="secondary-button" data-action="open-onboarding">Change</button>
        </div>
        <div class="section-actions">
          <span class="surface-pill"><strong>${weeklySessions}/${getWeeklyTarget()}</strong> weekly target</span>
          <span class="pill">${dueConcepts} due for review</span>
        </div>
      </article>

      <article class="continue-card">
        <p class="eyebrow">Spaced review</p>
        <div class="continue-footer">
          <div>
            <h2 class="section-title">${dueConcepts ? "Due concepts are waiting" : "Review queue is clear"}</h2>
            <p class="section-copy">
              ${dueConcepts ? "Run the due queue before new material so weak sounds stay alive." : "New material can take the lead for now."}
            </p>
          </div>
          <button class="secondary-button" data-action="start-review" ${dueConcepts ? "" : "disabled"}>Review now</button>
        </div>
      </article>

      <article class="continue-card">
        <p class="eyebrow">Daily challenge</p>
        <div class="continue-footer">
          <div>
            <h2 class="section-title">${challenge.title}</h2>
            <p class="section-copy">${challenge.blurb}</p>
          </div>
          <button class="primary-button" data-action="start-daily">
            ${challengeHistory.completed ? "Run again" : "Start daily"}
          </button>
        </div>
        <div class="section-actions">
          <span class="surface-pill"><strong>${SECTION_DEFS[challenge.sectionId].title}</strong></span>
          <span class="pill">${DIFFICULTIES[difficultyIndex(challenge.settings.difficulty)].label}</span>
          <span class="pill">${TONES.find((tone) => tone.id === challenge.settings.tone)?.label}</span>
          <span class="pill">${challengeHistory.completed ? `${challengeHistory.bestAccuracy}% best` : "5 questions"}</span>
        </div>
      </article>

      <article class="continue-card">
        <p class="eyebrow">Recommended next drill</p>
        <div class="continue-footer">
          <div>
            <h2 class="section-title">${recommended.title}</h2>
            <p class="section-copy">${recommended.blurb}</p>
          </div>
          <button class="primary-button" data-action="open-section" data-section="${recommendedSectionId}" data-origin="home">
            Continue
          </button>
        </div>
      </article>

      <section class="section-grid">
        ${Object.values(SECTION_DEFS)
          .map(
            (section) => `
              <button class="feature-card" data-action="open-section" data-section="${section.id}" data-origin="home" data-accent="${section.accent}">
                <div>
                  <p class="feature-label">${section.label}</p>
                  <h2 class="feature-title">${section.title}</h2>
                  <p class="section-copy">${section.blurb}</p>
                </div>
                <div class="card-footer">
                  <span class="surface-pill"><strong>${getMastery(section.id)}%</strong> mastery</span>
                  <span class="pill">${getSectionProgress(section.id).sessions} sessions</span>
                </div>
              </button>
            `
          )
          .join("")}
      </section>

      ${renderRoadmap()}
    </section>
  `;
}

function renderPractice() {
  const challenge = getDailyChallenge();
  const challengeHistory = getDailyHistory();
  return `
    <section class="practice-stack">
      <header class="masthead">
        <div>
          <p class="eyebrow">Practice Builder</p>
          <h1 class="hero-title">Pick the ear you want to sharpen.</h1>
        </div>
        <div class="brand-mark" aria-hidden="true"></div>
      </header>

      <article class="continue-card">
        <p class="eyebrow">Quick route</p>
        <div class="continue-footer">
          <div>
            <h2 class="section-title">${challenge.title}</h2>
            <p class="section-copy">${challengeHistory.completed ? `Best today: ${challengeHistory.bestAccuracy}%` : challenge.blurb}</p>
          </div>
          <button class="secondary-button" data-action="start-daily">Daily</button>
        </div>
      </article>

      ${renderPlaylists()}

      <section class="section-grid">
        ${Object.values(SECTION_DEFS)
          .map(
            (section) => `
              <button class="feature-card" data-action="open-section" data-section="${section.id}" data-origin="practice" data-accent="${section.accent}">
                <div>
                  <p class="feature-label">${section.label}</p>
                  <h2 class="feature-title">${section.title}</h2>
                  <p class="section-copy">${section.blurb}</p>
                </div>
                <div class="card-footer">
                  <span class="surface-pill"><strong>${getMastery(section.id)}%</strong> mastery</span>
                  <span class="pill">${getSectionProgress(section.id).sessions} sessions</span>
                </div>
              </button>
            `
          )
          .join("")}
      </section>
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
            `
            : ""
        }
      </article>
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
    { id: "home", icon: "Home" },
    { id: "practice", icon: "Drill" },
    { id: "progress", icon: "Stats" },
    { id: "profile", icon: "Tune" },
  ];
  return `
    <nav class="bottom-nav" aria-label="Primary">
      <div class="bottom-nav-inner">
        ${navItems
          .map(
            (item) => `
              <button class="nav-button ${activeTab === item.id ? "active" : ""}" data-action="switch-tab" data-tab="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span>${capitalize(item.id)}</span>
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

  if (action === "switch-tab") {
    switchTab(target.dataset.tab);
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
}

function handleKeydown(event) {
  if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.dataset.role === "free-response") {
    event.preventDefault();
    submitFreeResponse();
  }
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
