const CACHE = 'cache-only-v1';

const preCacheFiles = [
    "/",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "styles.css",
    "manifest.webmanifest",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
    "/db.js",
    "index.js",
]

// pre cache resources when service worker is installed
self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(preCacheFiles);
    });
};

// remove old caches when the service worker activates


// serve files from the cache when not online
self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || fetch (request);
        });
    });
}
