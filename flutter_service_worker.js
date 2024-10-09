'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "fef100fc6e614a4c03c47d8dc9b6fa9e",
"version.json": "129ef0fb5c7b8201611c316f80cf8d49",
"index.html": "82787e6fedd5a061cbc5a86d70205e73",
"/": "82787e6fedd5a061cbc5a86d70205e73",
"main.dart.js": "93e0eb272025baf8e717fd33cce31d25",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "b752b2040427d9e16e8fa09ee96d54fe",
"icons/Icon-192.png": "f63876a97d1f89900e3d20ec82023f35",
"icons/Icon-maskable-192.png": "f63876a97d1f89900e3d20ec82023f35",
"icons/Icon-maskable-512.png": "685982e5b0e30d001ce7c3d97d170477",
"icons/Icon-512.png": "685982e5b0e30d001ce7c3d97d170477",
"manifest.json": "302382d5fd9f3eab13e77c4a8022ea4b",
"assets/AssetManifest.json": "d21090550054c53281b6003812073fce",
"assets/NOTICES": "4f0a25b8cd66d6f04b4c07ea1fbfdc92",
"assets/FontManifest.json": "d21af8d5dc63d2e8cb6016c06ca42b16",
"assets/AssetManifest.bin.json": "b3ff1fdecab588f4cd434b42b2745e9f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "54f832df0dee78782496393133142c2e",
"assets/fonts/MaterialIcons-Regular.otf": "ee8f0d937813e8f60b35128a3ae87306",
"assets/assets/images/beer.svg": "dc552a8ea31710b7cb2afd95c0162b7b",
"assets/assets/images/bubble.svg": "1c8173461db71f86ebade6a6da22958e",
"assets/assets/images/instagram.svg": "9e0ffd033011ea9da6a557e733169c63",
"assets/assets/images/lime.svg": "0238700a693e5d47be6c1781b455bf75",
"assets/assets/images/cube.svg": "1cac6ff52085d03624bbdc471f8e3b5f",
"assets/assets/images/panel_green.svg": "e2f1c7686e65cc699617ae7a0b598b9c",
"assets/assets/images/panel_red.svg": "f79b33d0de3a72068c688770c166fc05",
"assets/assets/images/star.svg": "454f720721c1fe7818d2b280926ace25",
"assets/assets/images/panel_blue.svg": "7bc5807a4ef59140ec33fb3c42c9f0af",
"assets/assets/images/panel_pink.svg": "de75e8a440d3ac016e823a896547254d",
"assets/assets/images/all_icons.svg": "0af6a003fecdc33d1f50d5337ae1164b",
"assets/assets/images/share.svg": "355bd9cd722bc54b0fe860805d20ea31",
"assets/assets/images/logo.svg": "283bd3f54fc84d53ade03698fec6b97a",
"assets/assets/json/gamerules_en_censored.json": "af76c1d4636f1ccb32ea7d1c1c38860f",
"assets/assets/json/gamerules_gender_neutral_censored.json": "1f8fd8a3368df02f6c5e7e73844ebbdd",
"assets/assets/json/gamerules_gender_neutral.json": "4cfcd3ede77d2376fbbb042910456313",
"assets/assets/json/gamerules_de_censored.json": "d3d0f10ea018d178c3121cd8a807f3c1",
"assets/assets/json/gamerules_de.json": "3c53c3d8694bea78feebdc6ca1f363cd",
"assets/assets/json/gamerules_en.json": "ba76cdbf77d83bc512c28faa4bfef31f",
"assets/assets/fonts/OpenSans-Bold.ttf": "f6f9a437c7611aba2c8fcf59da852df3",
"assets/assets/fonts/Grandstander-ExtraBold.ttf": "4d392fd786681c0cd1c77dd07e8467d1",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
