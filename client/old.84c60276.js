import{N as t,S as e,i as n,s,M as l,e as r,b as o,c as a,q as c,d as f,f as i,g as h,h as $,j as g,R as u,k as p,l as d,m,t as x,n as E,o as v,a as w,p as y,r as j,G as L,u as N,v as A,w as O,x as b}from"./client.115c5129.js";import{I as B,E as M}from"./Entry.d315f6c4.js";function k(t,e,n){const s=t.slice();return s[4]=e[n],s}function q(t,e,n){const s=t.slice();return s[1]=e[n],s}function G(t){let e,n,s,l,o,a=t[1].title+"",c=t[1].lang+"";return{c(){e=r("a"),n=N(a),s=N(" - "),l=N(c),this.h()},l(t){e=f(t,"A",{rel:!0,href:!0,class:!0});var r=A(e);n=O(r,a),s=O(r," - "),l=O(r,c),r.forEach(i),this.h()},h(){g(e,"rel","prefetch"),g(e,"href",o=F(t[1])),g(e,"class","title")},m(t,r){d(t,e,r),p(e,n),p(e,s),p(e,l)},p(t,s){1&s&&a!==(a=t[1].title+"")&&b(n,a),1&s&&c!==(c=t[1].lang+"")&&b(l,c),1&s&&o!==(o=F(t[1]))&&g(e,"href",o)},d(t){t&&i(e)}}}function I(t){let e,n,s=t[1].otherLangs,l=[];for(let e=0;e<s.length;e+=1)l[e]=S(k(t,s,e));const r=t=>E(l[t],1,1,()=>{l[t]=null});return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=w()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=w()},m(t,s){for(let e=0;e<l.length;e+=1)l[e].m(t,s);d(t,e,s),n=!0},p(t,n){if(1&n){let o;for(s=t[1].otherLangs,o=0;o<s.length;o+=1){const r=k(t,s,o);l[o]?(l[o].p(r,n),x(l[o],1)):(l[o]=S(r),l[o].c(),x(l[o],1),l[o].m(e.parentNode,e))}for(y(),o=s.length;o<l.length;o+=1)r(o);j()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)x(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)E(l[t]);n=!1},d(t){L(l,t),t&&i(e)}}}function R(t){let e,n,s,l,a,c,$,u=t[1].title+"",m=t[4]+"";return{c(){e=r("a"),n=N(u),s=N(" - "),l=N(m),$=o(),this.h()},l(t){e=f(t,"A",{rel:!0,hreflang:!0,href:!0,class:!0});var r=A(e);n=O(r,u),s=O(r," - "),l=O(r,m),r.forEach(i),$=h(t),this.h()},h(){g(e,"rel","alternate"),g(e,"hreflang",a=t[4]),g(e,"href",c=F({...t[1],lang:t[4]})),g(e,"class","title")},m(t,r){d(t,e,r),p(e,n),p(e,s),p(e,l),d(t,$,r)},p(t,s){1&s&&u!==(u=t[1].title+"")&&b(n,u),1&s&&m!==(m=t[4]+"")&&b(l,m),1&s&&a!==(a=t[4])&&g(e,"hreflang",a),1&s&&c!==(c=F({...t[1],lang:t[4]}))&&g(e,"href",c)},d(t){t&&i(e),t&&i($)}}}function S(t){let e,n;return e=new M({props:{$$slots:{default:[R]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){$(e.$$.fragment,t)},m(t,s){m(e,t,s),n=!0},p(t,n){const s={};129&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(x(e.$$.fragment,t),n=!0)},o(t){E(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function T(t){let e,n,s,l;e=new M({props:{$$slots:{default:[G]},$$scope:{ctx:t}}});let r=t[1].otherLangs&&I(t);return{c(){a(e.$$.fragment),n=o(),r&&r.c(),s=w()},l(t){$(e.$$.fragment,t),n=h(t),r&&r.l(t),s=w()},m(t,o){m(e,t,o),d(t,n,o),r&&r.m(t,o),d(t,s,o),l=!0},p(t,n){const l={};129&n&&(l.$$scope={dirty:n,ctx:t}),e.$set(l),t[1].otherLangs?r?(r.p(t,n),1&n&&x(r,1)):(r=I(t),r.c(),x(r,1),r.m(s.parentNode,s)):r&&(y(),E(r,1,1,()=>{r=null}),j())},i(t){l||(x(e.$$.fragment,t),x(r),l=!0)},o(t){E(e.$$.fragment,t),E(r),l=!1},d(t){v(e,t),t&&i(n),r&&r.d(t),t&&i(s)}}}function z(t){let e,n,s=t[0],l=[];for(let e=0;e<s.length;e+=1)l[e]=T(q(t,s,e));const r=t=>E(l[t],1,1,()=>{l[t]=null});return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=w()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=w()},m(t,s){for(let e=0;e<l.length;e+=1)l[e].m(t,s);d(t,e,s),n=!0},p(t,n){if(1&n){let o;for(s=t[0],o=0;o<s.length;o+=1){const r=q(t,s,o);l[o]?(l[o].p(r,n),x(l[o],1)):(l[o]=T(r),l[o].c(),x(l[o],1),l[o].m(e.parentNode,e))}for(y(),o=s.length;o<l.length;o+=1)r(o);j()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)x(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)E(l[t]);n=!1},d(t){L(l,t),t&&i(e)}}}function C(t){let e,n,s,w,y,j;return document.title=e=l()+" - Old index",y=new B({props:{$$slots:{default:[z]},$$scope:{ctx:t}}}),{c(){n=r("meta"),w=o(),a(y.$$.fragment),this.h()},l(t){const e=c('[data-svelte="svelte-1ibyuv3"]',document.head);n=f(e,"META",{name:!0,content:!0}),e.forEach(i),w=h(t),$(y.$$.fragment,t),this.h()},h(){g(n,"name","description"),g(n,"content",s="Old index - "+u())},m(t,e){p(document.head,n),d(t,w,e),m(y,t,e),j=!0},p(t,[n]){(!j||0&n)&&e!==(e=l()+" - Old index")&&(document.title=e);const s={};129&n&&(s.$$scope={dirty:n,ctx:t}),y.$set(s)},i(t){j||(x(y.$$.fragment,t),j=!0)},o(t){E(y.$$.fragment,t),j=!1},d(t){i(n),t&&i(w),v(y,t)}}}async function D(){const e=await(await this.fetch("index.json")).json();return e.langs.forEach(e=>this.fetch(t(e))),{posts:e.index}}function F({lang:t,slug:e}){return`${t}/posts/${e}`}function H(t,e,n){let{posts:s}=e;return t.$$set=t=>{"posts"in t&&n(0,s=t.posts)},[s]}export default class extends e{constructor(t){super(),n(this,t,H,C,s,{posts:0})}}export{D as preload};
