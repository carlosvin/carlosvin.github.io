!function(){"use strict";const e=["client/models.e2bea35f.js","client/Entry.354c58c7.js","client/index.d27b598c.js","client/index.fadaf6d8.js","client/dates.deba47a4.js","client/Index.84f93fbb.js","client/about.c222fe32.js","client/[slug].9232358c.js","client/client.8e71e3fb.js","client/[...slug].b1a06972.js","client/client.549adeaf.js"].concat(["service-worker-index.html","favicon.png","fonts/icomoon.eot","fonts/icomoon.svg","fonts/icomoon.ttf","fonts/icomoon.woff","fonts/style.css","global.css","icons/icon-128x128.png","icons/icon-144x144.png","icons/icon-152x152.png","icons/icon-192x192.png","icons/icon-384x384.png","icons/icon-512x512.png","icons/icon-72x72.png","icons/icon-96x96.png","images/c-mem-struct/5b.png","images/c-mem-struct/8b.png","images/docker-multidomain/a.screenshot.png","images/docker-multidomain/b.screenshot.png","images/docker-multidomain/domain.png","images/docker-multidomain/draw.odg","images/docker-multidomain/ip.png","images/docker-multidomain/proxy.png","images/lighthouse-results.webp","manifest.json","robots.txt"]),n=new Set(e);self.addEventListener("install",n=>{n.waitUntil(caches.open("cache1587940578328").then(n=>n.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const n of e)"cache1587940578328"!==n&&await caches.delete(n);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&n.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1587940578328").then(async n=>{try{const t=await fetch(e.request);return n.put(e.request,t.clone()),t}catch(t){const s=await n.match(e.request);if(s)return s;throw t}}))))})}();
