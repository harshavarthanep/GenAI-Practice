/* GenAI Mastery service worker: the app works offline after the first visit. */
const VERSION = 'gm-v1';
const CORE = ['./', 'index.html', 'app.js', 'course-a.js', 'course-b.js', 'course-c.js', 'practice.js', 'outputs.js',
  'manifest.webmanifest', 'fonts/Inter.woff2', 'fonts/JetBrainsMono.woff2', 'vendor/sql-wasm.js', 'vendor/sql-wasm.wasm',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== 'gm-cdn').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {            // app files: cache first, refresh in background
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      return hit || (await net) || (req.mode === 'navigate' ? c.match('index.html') : Response.error());
    }));
  } else if (url.hostname === 'cdn.jsdelivr.net') { // Python runtime and packages: cache once, reuse offline
    e.respondWith(caches.open('gm-cdn').then(async c => (await c.match(req)) || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; })));
  }
});
