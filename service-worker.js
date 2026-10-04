const CACHE_NAME = "may-tinh-loi-nhuan-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-512.png"
];


// Cài đặt Service Worker
self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});


// Kích hoạt Service Worker
self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(function(cacheNames) {

            return Promise.all(

                cacheNames
                    .filter(function(cacheName) {

                        return cacheName !== CACHE_NAME;

                    })
                    .map(function(cacheName) {

                        return caches.delete(cacheName);

                    })

            );

        })

    );

});


// Xử lý các yêu cầu của ứng dụng
self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)
            .then(function(response) {

                // Nếu đã có trong bộ nhớ đệm
                // thì sử dụng bản đã lưu

                if (response) {

                    return response;

                }

                // Nếu chưa có thì tải từ Internet

                return fetch(event.request);

            })

    );

});