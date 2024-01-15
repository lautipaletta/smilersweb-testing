'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e1da325b0707356a7ba0b47ce6d38ccc",
"assets/AssetManifest.bin.json": "1849dce1920c051cc6b69b134af41ffe",
"assets/AssetManifest.json": "7fb17fdda5fc786a896e60a59f52a879",
"assets/assets/png/code_verification.png": "7016d467f3f972caa18c212be101e76f",
"assets/assets/png/smilers-white.png": "34be530e31bf3baec882883a15e0c9d2",
"assets/assets/png/smilers.png": "c4b49c3a00ab1c8f869d9acd9aa7ed63",
"assets/assets/png/test_banner.png": "a9cd1a3d331db64564eab68ce4da8357",
"assets/assets/svg/code_verification.svg": "14cf1ac4d2761f5387dba94fef323bf9",
"assets/assets/svg/hero.svg": "11857bf7f8df5da22d4f57e2d547c052",
"assets/assets/svg/login.svg": "1d736f73c7b835b28071b42179c51676",
"assets/assets/svg/verification.svg": "4fbe5327381eae9d0d4b4b3854a31216",
"assets/assets/svg/warning.svg": "efb3d436b7c888ee57f5df53056d7c44",
"assets/FontManifest.json": "126e34788f64450ead57db4330571d6b",
"assets/fonts/Agrandir/Agrandir-Bold.otf": "3935ef7cd2459725f06e0ba4a1a105a2",
"assets/fonts/Agrandir/Agrandir-Light.otf": "c45752d7e548055b3cad68f1064b1cbe",
"assets/fonts/Agrandir/Agrandir-Regular.otf": "c6916a923e67d5aa80989430382d75bf",
"assets/fonts/MaterialIcons-Regular.otf": "105ee002351d837821b44801aa5c5b47",
"assets/NOTICES": "8b0763ffdab7f9f4e44022d004996ed1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d0ac55f4f803e05d41c3871baef49a6a",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "22d5faf7059e1fd6fa179dab972c1e7d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "035ce6fa0fa99566df837036a31a1e7d",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsOutlined%255BFILL,GRAD,opsz,wght%255D.ttf": "c9c46a8d36e065d48cfd07acc17f61c5",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded%255BFILL,GRAD,opsz,wght%255D.ttf": "18f073663d6d3fd2375d4f918fd5f5e9",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsSharp%255BFILL,GRAD,opsz,wght%255D.ttf": "e726972c9750ee1108e1ae135b183ce8",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "77cdc19fcc63a442fb89bc32e8a6c886",
"canvaskit/canvaskit.wasm": "2db534eaad9e980f5028f0bcb8c54756",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "0b594584ac3722580082cd02b6da9033",
"canvaskit/chromium/canvaskit.wasm": "d44c5e0a275d8cb84acff28ef31fa06a",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "c37c57bf1a5a958e3144da7df44254b0",
"canvaskit/skwasm.wasm": "883abde2920007bba715d8ff470ccf8c",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "6a9c622d0df8c90cbc3ca90c448c3484",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-192.png.png": "67e4f1ddc77ab1626783833d4b0a87d5",
"icons/Icon-512.png": "7f7d2be3afec87b409403b33bc800505",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "6908a01ebf0db884b70c20c554a18c2d",
"/": "6908a01ebf0db884b70c20c554a18c2d",
"main.dart.js": "ba2dd1fdcecf1894977248bcfaf073e4",
"manifest.json": "9bd901577c8f17941128dd4cd638347b",
"version.json": "43812052b4cc9c281f4f68cb6af844c1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
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
