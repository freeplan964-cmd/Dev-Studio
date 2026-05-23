/**
 * Dev Studio Service Worker
 * Strategy: Cache-first for static assets, Network-first for API calls.
 */

const CACHE_NAME = "dev-studio-v1";
const STATIC_ASSETS = ["/", "/favicon.svg", "/manifest.json"];

// Install — pre-cache critical shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first for static, network-first for API
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never intercept API calls — always go to network
  if (url.pathname.startsWith("/api/")) return;

  // For navigation requests serve the app shell
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/").then((r) => r || fetch(request)))
    );
    return;
  }

  // Cache-first for JS/CSS/fonts/images
  event.respondWith(
    caches.match(request).then(
      (cached) => cached || fetch(request).then((response) => {
        if (response.ok && request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
    )
  );
});
