!function(){"use strict";const e=["client/index.1fa5283c.js","client/Index.e93bb5b9.js","client/Entry.11426fb7.js","client/url.9cc9231a.js","client/index.223943da.js","client/html.14495991.js","client/Details.149dee1f.js","client/[slug].ba6f35f9.js","client/index.b41954e5.js","client/about.3eabd1a7.js","client/old.2677d87a.js","client/[slug].d975801c.js","client/[...slug].d3457ea4.js","client/client.de85927b.js"].concat(["service-worker-index.html","favicon.ico","favicon.png","fonts/icomoon.eot","fonts/icomoon.svg","fonts/icomoon.ttf","fonts/icomoon.woff","fonts/style.css","global.css","icons/icon-128x128.png","icons/icon-144x144.png","icons/icon-152x152.png","icons/icon-192x192.png","icons/icon-384x384.png","icons/icon-512x512.png","icons/icon-72x72.png","icons/icon-96x96.png","images/c-mem-struct/5b.png","images/c-mem-struct/8b.png","images/docker-multidomain/a.screenshot.png","images/docker-multidomain/b.screenshot.png","images/docker-multidomain/domain.png","images/docker-multidomain/draw.odg","images/docker-multidomain/ip.png","images/docker-multidomain/proxy.png","images/lighthouse-results.webp","manifest.json","robots.txt"]),n=new Set(e);self.addEventListener("install",n=>{n.waitUntil(caches.open("cache1592153255270").then(n=>n.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const n of e)"cache1592153255270"!==n&&await caches.delete(n);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&n.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1592153255270").then(async n=>{try{const t=await fetch(e.request);return n.put(e.request,t.clone()),t}catch(t){const s=await n.match(e.request);if(s)return s;throw t}}))))})}();
