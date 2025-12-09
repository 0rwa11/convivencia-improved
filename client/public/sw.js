const CACHE_NAME = 'convivencia-cache-v2'; // Increment version to force update
const urlsToCache = [
  '/convivencia-improved/',
  '/convivencia-improved/index.html',
  '/convivencia-improved/manifest.json',
  // Add other critical assets here if known, but Vite handles most of the build assets
];

// Install event: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

	// Fetch event: serve from cache first, then network
	self.addEventListener('fetch', event => {
	  // Bypass Service Worker for print-related requests (e.g., if the browser uses a specific URL for print)
	  // More importantly, bypass for non-GET requests (POST, PUT, DELETE) which should always go to the network
	  if (event.request.method !== 'GET') {
	    return;
	  }
	
	  // Only handle requests for the app's origin
	  if (event.request.url.startsWith(self.location.origin)) {
	    event.respondWith(
	      caches.match(event.request)
	        .then(response => {
	          // Cache hit - return response
	          if (response) {
	            return response;
	          }
	          
	          // Fallback to network and cache new assets
	          return fetch(event.request).then(
	            response => {
	              // Check if we received a valid response
	              if(!response || response.status !== 200 || response.type !== 'basic') {
	                return response;
	              }
	
	              // IMPORTANT: Clone the response. A response is a stream
	              // and can only be consumed once.
	              const responseToCache = response.clone();
	
	              // Only cache if the URL is not a dynamic resource that changes often
	              // For this static site, we cache everything that is a GET request
	              caches.open(CACHE_NAME)
	                .then(cache => {
	                  cache.put(event.request, responseToCache);
	                });
	
	              return response;
	            }
	          ).catch(() => {
	            // If network fails, try to return a fallback page
	            return caches.match('/convivencia-improved/index.html');
	          });
	        })
	    );
	  }
	});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
