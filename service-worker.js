!function(){"use strict";const e=["client/index.b348df70.js","client/Entry.52e8077f.js","client/Index.070cf2f1.js","client/url.1f869321.js","client/Details.3989a3ab.js","client/html.14495991.js","client/index.2072f027.js","client/about.35200e33.js","client/index.4c0defef.js","client/[slug].05d9a54a.js","client/old.d1e90eda.js","client/index.dd94f3d0.js","client/[slug].8a119076.js","client/[...slug].2d6c494e.js","client/client.72a95ecd.js"].concat(["service-worker-index.html","favicon.ico","favicon.png","fonts/icomoon.eot","fonts/icomoon.svg","fonts/icomoon.ttf","fonts/icomoon.woff","fonts/style.css","global.css","icons/icon-128x128.png","icons/icon-144x144.png","icons/icon-152x152.png","icons/icon-192x192.png","icons/icon-384x384.png","icons/icon-512x512.png","icons/icon-72x72.png","icons/icon-96x96.png","images/c-mem-struct/5b.png","images/c-mem-struct/8b.png","images/docker-multidomain/a.screenshot.png","images/docker-multidomain/b.screenshot.png","images/docker-multidomain/domain.png","images/docker-multidomain/draw.odg","images/docker-multidomain/ip.png","images/docker-multidomain/proxy.png","images/lighthouse-results.webp","manifest.json","robots.txt"]),n=new Set(e);self.addEventListener("install",n=>{n.waitUntil(caches.open("cache1596485400980").then(n=>n.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const n of e)"cache1596485400980"!==n&&await caches.delete(n);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&n.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1596485400980").then(async n=>{try{const t=await fetch(e.request);return n.put(e.request,t.clone()),t}catch(t){const s=await n.match(e.request);if(s)return s;throw t}}))))})}();
