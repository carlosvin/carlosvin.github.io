!function(){"use strict";const e=["client/about.a108065a.js","client/[...slug].065b0b63.js","client/client.b8762d97.js","client/index.723ef8e1.js","client/client.c143d51a.js"].concat(["service-worker-index.html","favicon.png","fonts/icomoon.eot","fonts/icomoon.svg","fonts/icomoon.ttf","fonts/icomoon.woff","global.css","icons/icon-128x128.png","icons/icon-144x144.png","icons/icon-152x152.png","icons/icon-192x192.png","icons/icon-384x384.png","icons/icon-512x512.png","icons/icon-72x72.png","icons/icon-96x96.png","images/c-mem-struct/5b.png","images/c-mem-struct/8b.png","images/docker-multidomain/a.screenshot.png","images/docker-multidomain/b.screenshot.png","images/docker-multidomain/domain.png","images/docker-multidomain/draw.odg","images/docker-multidomain/ip.png","images/docker-multidomain/proxy.png","manifest.json"]),n=new Set(e);self.addEventListener("install",n=>{n.waitUntil(caches.open("cache1587307120637").then(n=>n.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const n of e)"cache1587307120637"!==n&&await caches.delete(n);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&n.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1587307120637").then(async n=>{try{const t=await fetch(e.request);return n.put(e.request,t.clone()),t}catch(t){const o=await n.match(e.request);if(o)return o;throw t}}))))})}();
