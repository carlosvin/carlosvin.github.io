!function(){"use strict";const e=["client/url.258cd363.js","client/Entry.e8533dc2.js","client/Index.61c82067.js","client/Details.4759ee4c.js","client/index.ec33ca8b.js","client/dates.deba47a4.js","client/[slug].0d9cd46f.js","client/about.b047f512.js","client/index.9df49689.js","client/index.d838dc29.js","client/old.d8463035.js","client/[slug].68829aa9.js","client/client.def18665.js","client/[...slug].135ba9b6.js","client/client.ba46c122.js"].concat(["service-worker-index.html","favicon.ico","favicon.png","fonts/icomoon.eot","fonts/icomoon.svg","fonts/icomoon.ttf","fonts/icomoon.woff","fonts/style.css","global.css","icons/icon-128x128.png","icons/icon-144x144.png","icons/icon-152x152.png","icons/icon-192x192.png","icons/icon-384x384.png","icons/icon-512x512.png","icons/icon-72x72.png","icons/icon-96x96.png","images/c-mem-struct/5b.png","images/c-mem-struct/8b.png","images/docker-multidomain/a.screenshot.png","images/docker-multidomain/b.screenshot.png","images/docker-multidomain/domain.png","images/docker-multidomain/draw.odg","images/docker-multidomain/ip.png","images/docker-multidomain/proxy.png","images/lighthouse-results.webp","manifest.json","robots.txt"]),n=new Set(e);self.addEventListener("install",n=>{n.waitUntil(caches.open("cache1590531302241").then(n=>n.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const n of e)"cache1590531302241"!==n&&await caches.delete(n);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&n.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1590531302241").then(async n=>{try{const t=await fetch(e.request);return n.put(e.request,t.clone()),t}catch(t){const s=await n.match(e.request);if(s)return s;throw t}}))))})}();
