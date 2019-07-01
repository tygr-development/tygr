const CACHE_NAME = 'tygr-cache-v5';

// Always try to fetch latest html files
const fetchFirst = [
  '/',
  '/home',
  '/home/cross-platform',
  '/home/single-page-application',
  '/home/progressive-web-app',
  '/home/full-stack',
  '/home/best-practices',
  '/home/testimonials',
  '/index.html'
]

const urlsToCache = fetchFirst.concat([
  '/assets/logo_1x.png',
  '/assets/logo_2x.png',
  '/assets/logo_4x.png',
  '/assets/logo.png',
  '/assets/splash.png',
  '/manifest.json',
  '/assets/icon.png',
  '/assets/unit.mp4',
  '/assets/e2e.mp4',
  '/assets/lighthouse-audit.png',
  '/assets/desktop-tygr.png',
  '/assets/mobile-tygr.png',
  '/assets/full-stack.svg'
]);

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {

        // fetch latest filenames
        return getServerFiles().then(function(files) {

          return cache.addAll(files);
          
        }).then(function() {

          console.log('Service Worker succesfully installed');

          return self.skipWaiting();
        })
      })
  );
});

self.addEventListener('fetch', function(event) {

  const requestPath = pathFromUrl(event.request.clone().url);

  if(fetchFirst.includes(requestPath)) {
    // Try fetch first

    event.respondWith(
      
      // Clone request; streams can only be consumed once
      fromNetwork(event.request.clone())

        // Fetch succesful, add latest to cache
        .then(function(response) {

          // Clone response; streams can only be consumed once
          const cacheResponse = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, cacheResponse)
          })

          return response;
        })

        // Fetch failed, return from cache
        .catch(function() {
          return fromCache(event.request);
        })
    )

  } else {
    // Try cache first

    event.respondWith(

      // Clone request, streams can only be consumed once
      fromCache(event.request.clone())

        // Cache succesfull, try update from server in background
        .then(function(cacheResponse) {

          fromNetwork(event.request.clone())

            // Fetch succesful
            .then(function(serverResponse) {

              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, serverResponse);
              })
            })

          return cacheResponse;
        })

        // File not in cache, return fetch
        .catch(function() {
          return fromNetwork(event.request.clone())
            .then(function(response) {

              // If request in urlsToCache, add to cache
              if(urlsToCache.includes(pathFromUrl(event.request.url))) {

                // Clone response; streams can only be consumed once
                const cacheResponse = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                  cache.put(event.request, cacheResponse)
                })
              }

              return response;
            })
        })
    )
  }
})

self.addEventListener('activate', function(event) {

  // Check validity of all files in cache
  event.waitUntil(

    // Delete old caches if they exist
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            // If this cache name isn't the current cache, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(function()  {
        // Open cache
        caches.open(CACHE_NAME).then(function(cache) {

          // Try get latest files
          getServerFiles().then(function(curFiles){

            // Get current cached file pahts
            getCachedPaths().then(function(cachedPaths) {

              // Collect all operations in array to do Promise.all
              const promises = [];

              // If cached file is not in latest file list, delete it
              const toDelete = cachedPaths.filter(function(cachedPath) { return !curFiles.includes(cachedPath) })
              
              if(toDelete.length > 0) {
                promises.concat(toDelete.map(function(cachedRequest) {
                  return cache.delete(cachedRequest);
                }))
              }

              // If latest file is not in the cache, add it
              const toAdd = curFiles.filter(function(curFile) { return !cachedPaths.includes(curFile) })     

              if(toAdd.length > 0) {
                promises.push(cache.addAll(toAdd));
              }

              Promise.all(promises).then(function() {
                // All done, claim clients
                return self.clients.claim();
              })
            })
          })
        })
      })
    })
  )
})

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification;
  const primaryKey = notification.data.primaryKey;
  const action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://tygr.info');
    notification.close();
  }
});

self.addEventListener('push', function(e) {
  console.log(e.data.text());
  const message = JSON.parse(e.data.text());
  var options = {
    body: message.text,
    icon: 'assets/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    tag: 'tygr'
  };
  e.waitUntil(
    self.registration.showNotification('New message', options)
  );
});

function getServerFiles() {
  return fetch('/files.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(filesObject) {
      return Object.values(filesObject);
    })
}

function getCachedPaths() {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.keys().then(function(keys) {
      return keys.map(function(request) {
        return pathFromUrl(request.url)
      })
    })
  })
}

function pathFromUrl(url) {
  const tokens = url.split('/');
  const host = tokens[0] + "//" + tokens[2] + "/";
  return url.replace(host, '/');
}

function fromNetwork(request) {
  return new Promise(function(resolve, reject) {
    fetch(request).then(function(response) {
      resolve(response);
    }, reject)
  })
}

function fromCache(request) {
  return new Promise(function(resolve, reject) {
    return caches.match(request).then(function(response) {
      if(!response) {
        reject('no-match')
      } else {
        resolve(response);
      }
    })
  })
}
