import{S as t,i as e,s as n,F as s,y as l,z as r,A as o,t as a,k as c,C as f,e as i,u as h,m as $,x as p,a as u,d as g,v as m,f as d,G as x,r as y,g as E,E as v,D as b,o as j,p as w,b as A,q as L,w as N}from"./client.6897ae6b.js";import{I as O,E as q}from"./Entry.56552b9b.js";function B(t,e,n){const s=t.slice();return s[4]=e[n],s}function k(t,e,n){const s=t.slice();return s[1]=e[n],s}function z(t){let e;const n=new O({props:{$$slots:{default:[M]},$$scope:{ctx:t}}});return{c(){l(n.$$.fragment)},l(t){r(n.$$.fragment,t)},m(t,s){o(n,t,s),e=!0},p(t,e){const s={};129&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){e||(a(n.$$.fragment,t),e=!0)},o(t){c(n.$$.fragment,t),e=!1},d(t){f(n,t)}}}function C(t){let e,n,s,l,r,o=t[1].title+"",a=t[1].lang+"";return{c(){e=i("a"),n=w(o),s=w(" - "),l=w(a),this.h()},l(t){e=u(t,"A",{rel:!0,href:!0,class:!0});var r=A(e);n=L(r,o),s=L(r," - "),l=L(r,a),r.forEach(g),this.h()},h(){d(e,"rel","prefetch"),d(e,"href",r=H(t[1])),d(e,"class","title")},m(t,r){E(t,e,r),y(e,n),y(e,s),y(e,l)},p(t,s){1&s&&o!==(o=t[1].title+"")&&N(n,o),1&s&&a!==(a=t[1].lang+"")&&N(l,a),1&s&&r!==(r=H(t[1]))&&d(e,"href",r)},d(t){t&&g(e)}}}function D(t){let e,n,s=t[1].otherLangs,l=[];for(let e=0;e<s.length;e+=1)l[e]=G(B(t,s,e));const r=t=>c(l[t],1,1,()=>{l[t]=null});return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=$()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=$()},m(t,s){for(let e=0;e<l.length;e+=1)l[e].m(t,s);E(t,e,s),n=!0},p(t,n){if(1&n){let o;for(s=t[1].otherLangs,o=0;o<s.length;o+=1){const r=B(t,s,o);l[o]?(l[o].p(r,n),a(l[o],1)):(l[o]=G(r),l[o].c(),a(l[o],1),l[o].m(e.parentNode,e))}for(b(),o=s.length;o<l.length;o+=1)r(o);v()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)a(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)c(l[t]);n=!1},d(t){j(l,t),t&&g(e)}}}function F(t){let e,n,s,l,r,o=t[1].title+"",a=t[4]+"";return{c(){e=i("a"),n=w(o),s=w(" - "),l=w(a),this.h()},l(t){e=u(t,"A",{rel:!0,href:!0,class:!0});var r=A(e);n=L(r,o),s=L(r," - "),l=L(r,a),r.forEach(g),this.h()},h(){d(e,"rel","prefetch"),d(e,"href",r=H({...t[1],lang:t[4]})),d(e,"class","title")},m(t,r){E(t,e,r),y(e,n),y(e,s),y(e,l)},p(t,s){1&s&&o!==(o=t[1].title+"")&&N(n,o),1&s&&a!==(a=t[4]+"")&&N(l,a),1&s&&r!==(r=H({...t[1],lang:t[4]}))&&d(e,"href",r)},d(t){t&&g(e)}}}function G(t){let e;const n=new q({props:{$$slots:{default:[F]},$$scope:{ctx:t}}});return{c(){l(n.$$.fragment)},l(t){r(n.$$.fragment,t)},m(t,s){o(n,t,s),e=!0},p(t,e){const s={};129&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){e||(a(n.$$.fragment,t),e=!0)},o(t){c(n.$$.fragment,t),e=!1},d(t){f(n,t)}}}function I(t){let e,n,s;const i=new q({props:{$$slots:{default:[C]},$$scope:{ctx:t}}});let p=t[1].otherLangs&&D(t);return{c(){l(i.$$.fragment),e=h(),p&&p.c(),n=$()},l(t){r(i.$$.fragment,t),e=m(t),p&&p.l(t),n=$()},m(t,l){o(i,t,l),E(t,e,l),p&&p.m(t,l),E(t,n,l),s=!0},p(t,e){const s={};129&e&&(s.$$scope={dirty:e,ctx:t}),i.$set(s),t[1].otherLangs?p?(p.p(t,e),a(p,1)):((p=D(t)).c(),a(p,1),p.m(n.parentNode,n)):p&&(b(),c(p,1,1,()=>{p=null}),v())},i(t){s||(a(i.$$.fragment,t),a(p),s=!0)},o(t){c(i.$$.fragment,t),c(p),s=!1},d(t){f(i,t),t&&g(e),p&&p.d(t),t&&g(n)}}}function M(t){let e,n,s=t[0],l=[];for(let e=0;e<s.length;e+=1)l[e]=I(k(t,s,e));const r=t=>c(l[t],1,1,()=>{l[t]=null});return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=$()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=$()},m(t,s){for(let e=0;e<l.length;e+=1)l[e].m(t,s);E(t,e,s),n=!0},p(t,n){if(1&n){let o;for(s=t[0],o=0;o<s.length;o+=1){const r=k(t,s,o);l[o]?(l[o].p(r,n),a(l[o],1)):(l[o]=I(r),l[o].c(),a(l[o],1),l[o].m(e.parentNode,e))}for(b(),o=s.length;o<l.length;o+=1)r(o);v()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)a(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)c(l[t]);n=!1},d(t){j(l,t),t&&g(e)}}}function S(t){let e,n,l,r,o,f;document.title=e=s()+" - Old index";let j=t[0]&&z(t);return{c(){n=i("meta"),r=h(),j&&j.c(),o=$(),this.h()},l(t){const e=p('[data-svelte="svelte-1ibyuv3"]',document.head);n=u(e,"META",{name:!0,content:!0}),e.forEach(g),r=m(t),j&&j.l(t),o=$(),this.h()},h(){d(n,"name","description"),d(n,"content",l=`Old index - ${x()}`)},m(t,e){y(document.head,n),E(t,r,e),j&&j.m(t,e),E(t,o,e),f=!0},p(t,[n]){(!f||0&n)&&e!==(e=s()+" - Old index")&&(document.title=e),t[0]?j?(j.p(t,n),a(j,1)):((j=z(t)).c(),a(j,1),j.m(o.parentNode,o)):j&&(b(),c(j,1,1,()=>{j=null}),v())},i(t){f||(a(j),f=!0)},o(t){c(j),f=!1},d(t){g(n),t&&g(r),j&&j.d(t),t&&g(o)}}}function T({params:t,query:e}){return this.fetch("index.json").then(t=>t.json()).then(t=>({posts:t}))}function H({slug:t,lang:e}){return`${e}/posts/${t}`}function J(t,e,n){let{posts:s}=e;return t.$set=(t=>{"posts"in t&&n(0,s=t.posts)}),[s]}export default class extends t{constructor(t){super(),e(this,t,J,S,n,{posts:0})}}export{T as preload};
