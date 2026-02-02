const CACHE = "laudo-cache-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/static/css/style.css",
  "/static/js/script.js",
  "/static/json/estados-cidades.json",
  "/static/img/background_agro.jpg",
  "/static/img/background_creditner.png",
  "/static/img/logo_credinter.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(e.request).catch(() => caches.match("/index.html"))
      );
    })
  );
});