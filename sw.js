var masukCache = [
    "https://www.smankusors.com/proyek/ai/hex/2ai.png",
    "https://www.smankusors.com/proyek/ai/hex/aivsai.mp3",
    "https://www.smankusors.com/proyek/ai/hex/buat.png",
    "https://www.smankusors.com/proyek/ai/hex/easy.png",
    "https://www.smankusors.com/proyek/ai/hex/easyclick.mp3",
    "https://www.smankusors.com/proyek/ai/hex/game.js",
    "https://www.smankusors.com/proyek/ai/hex/gameTree.js",
    "https://www.smankusors.com/proyek/ai/hex/hard.png",
    "https://www.smankusors.com/proyek/ai/hex/hardclick.mp3",
    "https://www.smankusors.com/proyek/ai/hex/index.html",
    "https://www.smankusors.com/proyek/ai/hex/jquery.min.js",
    "https://www.smankusors.com/proyek/ai/hex/manifest.json",
    "https://www.smankusors.com/proyek/ai/hex/mediumclick.mp3",
    "https://www.smankusors.com/proyek/ai/hex/mm_music.mp3",
    "https://www.smankusors.com/proyek/ai/hex/normal.png",
    "https://www.smankusors.com/proyek/ai/hex/pathfinding.js",
    "https://www.smankusors.com/proyek/ai/hex/petak.js",
    "https://www.smankusors.com/proyek/ai/hex/playgame.mp3",
    "https://www.smankusors.com/proyek/ai/hex/prorityqueue.js",
    "https://www.smankusors.com/proyek/ai/hex/sw.js",
    "https://www.smankusors.com/proyek/ai/hex/wallpaper_mm.jpg",
    "https://www.smankusors.com/proyek/ai/hex/wallpaper_play.jpg"
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
                    return new Response(null, {status: 408, ok: false, statusText: "no inet"});
                });
            });
        })
    );
});