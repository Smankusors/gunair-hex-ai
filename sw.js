var masukCache = [
    "/proyek/ai/hex/2ai.png",
    "/proyek/ai/hex/aivsai.mp3",
    "/proyek/ai/hex/buat.png",
    "/proyek/ai/hex/easy.png",
    "/proyek/ai/hex/easyclick.mp3",
    "/proyek/ai/hex/game.js",
    "/proyek/ai/hex/gameTree.js",
    "/proyek/ai/hex/hard.png",
    "/proyek/ai/hex/hardclick.mp3",
    "/proyek/ai/hex/index.html",
    "/proyek/ai/hex/jquery.min.js",
    "/proyek/ai/hex/manifest.json",
    "/proyek/ai/hex/mediumclick.mp3",
    "/proyek/ai/hex/mm_music.mp3",
    "/proyek/ai/hex/normal.png",
    "/proyek/ai/hex/pathfinding.js",
    "/proyek/ai/hex/petak.js",
    "/proyek/ai/hex/playgame.mp3",
    "/proyek/ai/hex/prorityqueue.js",
    "/proyek/ai/hex/sw.js",
    "/proyek/ai/hex/wallpaper_mm.jpg",
    "/proyek/ai/hex/wallpaper_play.jpg"
];
var versi = "0.1";
var namaCache = "gunair-hex-pwa" + versi;
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(namaCache).then(function(cache) {
            return cache.addAll(masukCache);
        })
    );
});
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key.substr(0, namaCache.length) !== namaCache) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
    var url = event.request.url;
    if (url.includes("chrome-extension")) return;
    var masukKe = namaCache;
    event.respondWith(
        caches.open(masukKe).then(function(cache) {
            return fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response;
            }).catch(function() {
                return caches.match(event.request).then(function(response) {
                    if (response) return response;
                    return new Response(null, {status: 200, ok: false, statusText: "no inet"});
                });
            });
        })
    );
});