import{S as t,i as e,s,F as r,e as o,u as n,p as a,y as c,x as l,a as $,d as f,v as h,b as i,q as g,z as m,f as p,r as u,g as d,A as x,t as E,k as v,C as y,D as A,E as w,o as C,H as j,w as q}from"./client.d4adae69.js";import{I as b,E as z}from"./Entry.533803c4.js";function H(t,e,s){const r=t.slice();return r[1]=e[s][0],r[2]=e[s][1],r}function I(t){let e,s,r,n=t[2]+"";return{c(){e=o("a"),s=a(n),this.h()},l(t){e=$(t,"A",{rel:!0,href:!0});var r=i(e);s=g(r,n),r.forEach(f),this.h()},h(){p(e,"rel","prefetch"),p(e,"href",r=j+"/"+t[1])},m(t,r){d(t,e,r),u(e,s)},p(t,o){1&o&&n!==(n=t[2]+"")&&q(s,n),1&o&&r!==(r=j+"/"+t[1])&&p(e,"href",r)},d(t){t&&f(e)}}}function O(t){let e;const s=new z({props:{$$slots:{default:[I]},$$scope:{ctx:t}}});return{c(){c(s.$$.fragment)},l(t){m(s.$$.fragment,t)},m(t,r){x(s,t,r),e=!0},p(t,e){const r={};33&e&&(r.$$scope={dirty:e,ctx:t}),s.$set(r)},i(t){e||(E(s.$$.fragment,t),e=!0)},o(t){v(s.$$.fragment,t),e=!1},d(t){y(s,t)}}}function k(t){let e,s;return{c(){e=o("a"),s=a("All posts"),this.h()},l(t){e=$(t,"A",{href:!0});var r=i(e);s=g(r,"All posts"),r.forEach(f),this.h()},h(){p(e,"href","/posts")},m(t,r){d(t,e,r),u(e,s)},d(t){t&&f(e)}}}function B(t){let e,s;return{c(){e=o("a"),s=a("Old urls"),this.h()},l(t){e=$(t,"A",{href:!0});var r=i(e);s=g(r,"Old urls"),r.forEach(f),this.h()},h(){p(e,"href","/old")},m(t,r){d(t,e,r),u(e,s)},d(t){t&&f(e)}}}function D(t){let e,s,r,o=t[0],a=[];for(let e=0;e<o.length;e+=1)a[e]=O(H(t,o,e));const l=t=>v(a[t],1,1,()=>{a[t]=null}),$=new z({props:{$$slots:{default:[k]},$$scope:{ctx:t}}}),i=new z({props:{$$slots:{default:[B]},$$scope:{ctx:t}}});return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=n(),c($.$$.fragment),s=n(),c(i.$$.fragment)},l(t){for(let e=0;e<a.length;e+=1)a[e].l(t);e=h(t),m($.$$.fragment,t),s=h(t),m(i.$$.fragment,t)},m(t,o){for(let e=0;e<a.length;e+=1)a[e].m(t,o);d(t,e,o),x($,t,o),d(t,s,o),x(i,t,o),r=!0},p(t,s){if(1&s){let r;for(o=t[0],r=0;r<o.length;r+=1){const n=H(t,o,r);a[r]?(a[r].p(n,s),E(a[r],1)):(a[r]=O(n),a[r].c(),E(a[r],1),a[r].m(e.parentNode,e))}for(A(),r=o.length;r<a.length;r+=1)l(r);w()}const r={};32&s&&(r.$$scope={dirty:s,ctx:t}),$.$set(r);const n={};32&s&&(n.$$scope={dirty:s,ctx:t}),i.$set(n)},i(t){if(!r){for(let t=0;t<o.length;t+=1)E(a[t]);E($.$$.fragment,t),E(i.$$.fragment,t),r=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)v(a[t]);v($.$$.fragment,t),v(i.$$.fragment,t),r=!1},d(t){C(a,t),t&&f(e),y($,t),t&&f(s),y(i,t)}}}function F(t){let e,s,A,w,C,j,q;document.title=e=r()+" - Categories";const z=new b({props:{$$slots:{default:[D]},$$scope:{ctx:t}}});return{c(){s=o("meta"),A=n(),w=o("h1"),C=a("Categories"),j=n(),c(z.$$.fragment),this.h()},l(t){const e=l('[data-svelte="svelte-1ttqz9f"]',document.head);s=$(e,"META",{name:!0,content:!0}),e.forEach(f),A=h(t),w=$(t,"H1",{});var r=i(w);C=g(r,"Categories"),r.forEach(f),j=h(t),m(z.$$.fragment,t),this.h()},h(){p(s,"name","description"),p(s,"content","Index of blog posts categories")},m(t,e){u(document.head,s),d(t,A,e),d(t,w,e),u(w,C),d(t,j,e),x(z,t,e),q=!0},p(t,[s]){(!q||0&s)&&e!==(e=r()+" - Categories")&&(document.title=e);const o={};33&s&&(o.$$scope={dirty:s,ctx:t}),z.$set(o)},i(t){q||(E(z.$$.fragment,t),q=!0)},o(t){v(z.$$.fragment,t),q=!1},d(t){f(s),t&&f(A),t&&f(w),t&&f(j),y(z,t)}}}function M({params:t,query:e}){return this.fetch("categories.json").then(t=>t.json()).then(t=>({categories:t})).catch(t=>console.error(t))}function N(t,e,s){let{categories:r}=e;return t.$set=(t=>{"categories"in t&&s(0,r=t.categories)}),[r]}export default class extends t{constructor(t){super(),e(this,t,N,F,s,{categories:0})}}export{M as preload};
