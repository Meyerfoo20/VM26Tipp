const CACHE_NAME = 'vm2026-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/feed.html',
  '/manifest.json'
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

// Nätverk i första hand (så att live-tips och bilder alltid är uppdaterade)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});