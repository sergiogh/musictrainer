const CACHE_NAME = "signal-path-static-v14";
const SAMPLE_FOLDERS = ["piano", "clean", "acoustic"];
const SAMPLE_FILES = [
  "C2.mp3",
  "Eb2.mp3",
  "Gb2.mp3",
  "A2.mp3",
  "C3.mp3",
  "Eb3.mp3",
  "Gb3.mp3",
  "A3.mp3",
  "C4.mp3",
  "Eb4.mp3",
  "Gb4.mp3",
  "A4.mp3",
  "C5.mp3",
  "Eb5.mp3",
  "Gb5.mp3",
  "A5.mp3",
];
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css?v=20260628g",
  "/vendor/Tone.js?v=20260628g",
  "/app.js?v=20260628g",
  "/manifest.webmanifest?v=20260628g",
  "/audio/interval-note.wav?v=20260628g",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
].concat(SAMPLE_FOLDERS.flatMap((folder) => SAMPLE_FILES.map((file) => `/samples/${folder}/${file}`)));

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isNavigation =
    event.request.mode === "navigate" ||
    event.request.destination === "document" ||
    event.request.url === `${self.location.origin}/`;
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isRuntimeAsset = ["script", "style", "manifest", "worker", "image", "font", "audio"].includes(
    event.request.destination
  );

  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", responseClone));
          return response;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  if (isSameOrigin && isRuntimeAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
