const staticCacheName = 'site-static';
const dynamicCacheName = 'site-dynamic-version1'
const assets = [
'/',
'/index.html',
'/js/app.js',
'/js/ui.js',
'/js/materialize.min.js',
'/css/styles.css',
'/css/materialize.min.css',
'/img/dish.png',
'https://fonts.googleapis.com/icon?family=Material+Icons',
'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
'pages/fallback.html'
]



//install service worker
self.addEventListener('install',evt =>
{
    //console.log('service worker installed');
evt.waitUntil(
    caches.open(staticCacheName).then(cache =>
    {
        console.log('caching shell assets');
        cache.addAll(assets);
    })
    );
 


});

//activate service worker
self.addEventListener('activate',evt =>
{
   // console.log('service has been activated');
evt.waitUntil(
    caches.keys().then(keys =>
        {
            //console.log(keys); ///
        return Promise.all(
            keys
            .filter(key => key !==staticCacheName  &&  key !== dynamicCacheName)
            .map(key=> caches.delete(key))   
        )
        
        })
)

});

//fetch event

self.addEventListener('fetch',evt =>
{
//  console.log('fetch event',evt);
evt.respondWith(     
      caches.match(evt.request).then(cacheRes => 
        {
            return cacheRes || fetch(evt.request).then(fetchRes =>
                {
                    return caches.open(dynamicCacheName).then(cache=>
                        {
                            cache.put(evt.request.url, fetchRes.clone());
                            return fetchRes;
                        })
                });
        }).catch(() => caches.match('pages/fallback.html'))
)

});