/* global workbox */
importScripts('/packages/workbox-precaching/test/static/test-data.js');
importScripts('/__test/bundle/workbox-precaching');
importScripts('/packages/workbox-precaching/test/static/skip-and-claim.js');

const precacheManager = new workbox.precaching.UnrevisionedCacheManager();
precacheManager.addToCacheList({
  unrevisionedFiles: workbox.__TEST_DATA['redirect'],
});

self.addEventListener('install', (event) => {
  event.waitUntil(precacheManager.install());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(precacheManager.cleanup());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});
