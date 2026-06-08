const CACHE_NAME = 'vm2026-v3'; // Ändrat till v3 för att tvinga fram en uppdatering
const ASSETS = [
  '/VM26Tipp/',
  '/VM26Tipp/index.html',
  '/VM26Tipp/feed.html',
  '/VM26Tipp/manifest.json',
  '/VM26Tipp/logo.png'
];

// Installera service worker och cacha bas-filer
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivera och rensa gamla cachar
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Nätverk i första hand (Network-first)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});