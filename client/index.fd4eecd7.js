import{M as t,S as e,i as n,s,e as o,a as r,b as a,u as c,q as i,d as l,f,g as d,v as $,w as h,j as m,k as p,l as u,n as g,r as j,t as x,H as v,p as E,A as w,c as L,h as A,m as S,o as y,G as b,x as C}from"./client.c0a5f227.js";import{I,E as q}from"./Entry.31862f44.js";import{c as H}from"./url.04dc219a.js";import{j as M}from"./jsonld.840ff0a6.js";function N(t,e,n){const s=t.slice();return s[4]=e[n],s}function k(t){let e,n;return{c(){e=o("p"),n=c("Loading...")},l(t){e=l(t,"P",{});var s=$(e);n=h(s,"Loading..."),s.forEach(f)},m(t,s){u(t,e,s),p(e,n)},p:w,i:w,o:w,d(t){t&&f(e)}}}function B(t){let e,n;return e=new I({props:{$$slots:{default:[z]},$$scope:{ctx:t}}}),{c(){L(e.$$.fragment)},l(t){A(e.$$.fragment,t)},m(t,s){S(e,t,s),n=!0},p(t,n){const s={};129&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(x(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){y(e,t)}}}function G(t){let e,n,s,r=t[4].name+"";return{c(){e=o("a"),n=c(r),this.h()},l(t){e=l(t,"A",{rel:!0,href:!0});var s=$(e);n=h(s,r),s.forEach(f),this.h()},h(){m(e,"rel","prefetch"),m(e,"href",s=H(t[4].slug))},m(t,s){u(t,e,s),p(e,n)},p(t,o){1&o&&r!==(r=t[4].name+"")&&C(n,r),1&o&&s!==(s=H(t[4].slug))&&m(e,"href",s)},d(t){t&&f(e)}}}function P(t){let e,n;return e=new q({props:{$$slots:{default:[G]},$$scope:{ctx:t}}}),{c(){L(e.$$.fragment)},l(t){A(e.$$.fragment,t)},m(t,s){S(e,t,s),n=!0},p(t,n){const s={};129&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(x(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){y(e,t)}}}function T(t){let e,n;return{c(){e=o("a"),n=c("All posts"),this.h()},l(t){e=l(t,"A",{href:!0});var s=$(e);n=h(s,"All posts"),s.forEach(f),this.h()},h(){m(e,"href","/posts")},m(t,s){u(t,e,s),p(e,n)},d(t){t&&f(e)}}}function z(t){let e,n,s,o=t[0],r=[];for(let e=0;e<o.length;e+=1)r[e]=P(N(t,o,e));const c=t=>g(r[t],1,1,()=>{r[t]=null});return n=new q({props:{$$slots:{default:[T]},$$scope:{ctx:t}}}),{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=a(),L(n.$$.fragment)},l(t){for(let e=0;e<r.length;e+=1)r[e].l(t);e=d(t),A(n.$$.fragment,t)},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);u(t,e,o),S(n,t,o),s=!0},p(t,s){if(1&s){let n;for(o=t[0],n=0;n<o.length;n+=1){const a=N(t,o,n);r[n]?(r[n].p(a,s),x(r[n],1)):(r[n]=P(a),r[n].c(),x(r[n],1),r[n].m(e.parentNode,e))}for(E(),n=o.length;n<r.length;n+=1)c(n);j()}const a={};128&s&&(a.$$scope={dirty:s,ctx:t}),n.$set(a)},i(t){if(!s){for(let t=0;t<o.length;t+=1)x(r[t]);x(n.$$.fragment,t),s=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)g(r[t]);g(n.$$.fragment,t),s=!1},d(t){b(r,t),t&&f(e),y(n,t)}}}function D(t){let e,n,s,w,L,A,S,y,b,C,I,q;document.title=e=t[1];const H=[B,k],M=[];function N(t,e){return t[0]?0:1}return b=N(t),C=M[b]=H[b](t),{c(){n=o("meta"),w=r(),L=a(),A=o("h1"),S=c("Categories"),y=a(),C.c(),I=r(),this.h()},l(t){const e=i('[data-svelte="svelte-1qlc2v7"]',document.head);n=l(e,"META",{name:!0,content:!0}),w=r(),e.forEach(f),L=d(t),A=l(t,"H1",{});var s=$(A);S=h(s,"Categories"),s.forEach(f),y=d(t),C.l(t),I=r(),this.h()},h(){m(n,"name","description"),m(n,"content",t[2]),s=new v(w)},m(e,o){p(document.head,n),s.m(t[3],document.head),p(document.head,w),u(e,L,o),u(e,A,o),p(A,S),u(e,y,o),M[b].m(e,o),u(e,I,o),q=!0},p(t,[o]){(!q||2&o)&&e!==(e=t[1])&&(document.title=e),(!q||4&o)&&m(n,"content",t[2]),(!q||8&o)&&s.p(t[3]);let r=b;b=N(t),b===r?M[b].p(t,o):(E(),g(M[r],1,1,()=>{M[r]=null}),j(),C=M[b],C||(C=M[b]=H[b](t),C.c()),x(C,1),C.m(I.parentNode,I))},i(t){q||(x(C),q=!0)},o(t){g(C),q=!1},d(t){f(n),f(w),t&&s.d(),t&&f(L),t&&f(A),t&&f(y),M[b].d(t),t&&f(I)}}}async function F(e){const n=await this.fetch("categories.json"),s=await n.json(),o=t()+" - Categories";return{categories:s,jsonLdStr:M(s,o,"Index of blog categories",e.path),title:o,description:"Index of blog categories"}}function J(t,e,n){let{categories:s}=e,{title:o}=e,{description:r}=e,{jsonLdStr:a}=e;return t.$$set=t=>{"categories"in t&&n(0,s=t.categories),"title"in t&&n(1,o=t.title),"description"in t&&n(2,r=t.description),"jsonLdStr"in t&&n(3,a=t.jsonLdStr)},[s,o,r,a]}export default class extends e{constructor(t){super(),n(this,t,J,D,s,{categories:0,title:1,description:2,jsonLdStr:3})}}export{F as preload};