import{S as t,i as s,s as e,z as r,A as n,D as a,t as o,k as l,E as c,m as f,g as $,F as m,G as p,d as i,e as u,p as h,a as g,b as d,q as v,f as y,r as E,w as x,u as D,v as k,o as w}from"./client.1ef91e2b.js";import{E as I,I as j}from"./Entry.0cfcc330.js";import{p as b}from"./url.a911ef63.js";import{D as A}from"./Details.8bd8ff36.js";function N(t){let s;const e=new I({props:{$$slots:{default:[S]},$$scope:{ctx:t}}});return{c(){r(e.$$.fragment)},l(t){n(e.$$.fragment,t)},m(t,r){a(e,t,r),s=!0},p(t,s){const r={};3&s&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){s||(o(e.$$.fragment,t),s=!0)},o(t){l(e.$$.fragment,t),s=!1},d(t){c(e,t)}}}function V(t){let s,e,r,n,a,o=t[0].summary+"";return{c(){s=u("div"),e=u("div"),r=u("span"),n=h(o),a=h("."),this.h()},l(t){s=g(t,"DIV",{class:!0});var l=d(s);e=g(l,"DIV",{class:!0});var c=d(e);r=g(c,"SPAN",{class:!0});var f=d(r);n=v(f,o),a=v(f,"."),f.forEach(i),c.forEach(i),l.forEach(i),this.h()},h(){y(r,"class","summary svelte-k49v0t"),y(e,"class","content svelte-k49v0t"),y(s,"class","description svelte-k49v0t")},m(t,o){$(t,s,o),E(s,e),E(e,r),E(r,n),E(r,a)},p(t,s){1&s&&o!==(o=t[0].summary+"")&&x(n,o)},d(t){t&&i(s)}}}function S(t){let s,e,f,m,p,w,I,j=t[0].title+"",N=t[0].summary&&V(t);const S=new A({props:{post:t[0]}});return{c(){s=u("div"),e=u("a"),f=h(j),p=D(),N&&N.c(),w=D(),r(S.$$.fragment),this.h()},l(t){s=g(t,"DIV",{class:!0});var r=d(s);e=g(r,"A",{rel:!0,href:!0,class:!0});var a=d(e);f=v(a,j),a.forEach(i),p=k(r),N&&N.l(r),w=k(r),n(S.$$.fragment,r),r.forEach(i),this.h()},h(){y(e,"rel","prefetch"),y(e,"href",m=b(t[0].slug)),y(e,"class","title svelte-k49v0t"),y(s,"class","container")},m(t,r){$(t,s,r),E(s,e),E(e,f),E(s,p),N&&N.m(s,null),E(s,w),a(S,s,null),I=!0},p(t,r){(!I||1&r)&&j!==(j=t[0].title+"")&&x(f,j),(!I||1&r&&m!==(m=b(t[0].slug)))&&y(e,"href",m),t[0].summary?N?N.p(t,r):((N=V(t)).c(),N.m(s,w)):N&&(N.d(1),N=null);const n={};1&r&&(n.post=t[0]),S.$set(n)},i(t){I||(o(S.$$.fragment,t),I=!0)},o(t){l(S.$$.fragment,t),I=!1},d(t){t&&i(s),N&&N.d(),c(S)}}}function q(t){let s,e,r=t[0]&&N(t);return{c(){r&&r.c(),s=f()},l(t){r&&r.l(t),s=f()},m(t,n){r&&r.m(t,n),$(t,s,n),e=!0},p(t,[e]){t[0]?r?(r.p(t,e),o(r,1)):((r=N(t)).c(),o(r,1),r.m(s.parentNode,s)):r&&(m(),l(r,1,1,()=>{r=null}),p())},i(t){e||(o(r),e=!0)},o(t){l(r),e=!1},d(t){r&&r.d(t),t&&i(s)}}}function z(t,s,e){let{post:r}=s;return t.$set=(t=>{"post"in t&&e(0,r=t.post)}),[r]}class B extends t{constructor(t){super(),s(this,t,z,q,e,{post:0})}}function F(t,s,e){const r=t.slice();return r[1]=s[e],r}function G(t){let s;const e=new B({props:{post:t[1]}});return{c(){r(e.$$.fragment)},l(t){n(e.$$.fragment,t)},m(t,r){a(e,t,r),s=!0},p(t,s){const r={};1&s&&(r.post=t[1]),e.$set(r)},i(t){s||(o(e.$$.fragment,t),s=!0)},o(t){l(e.$$.fragment,t),s=!1},d(t){c(e,t)}}}function P(t){let s,e,r=t[0],n=[];for(let s=0;s<r.length;s+=1)n[s]=G(F(t,r,s));const a=t=>l(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();s=f()},l(t){for(let s=0;s<n.length;s+=1)n[s].l(t);s=f()},m(t,r){for(let s=0;s<n.length;s+=1)n[s].m(t,r);$(t,s,r),e=!0},p(t,e){if(1&e){let l;for(r=t[0],l=0;l<r.length;l+=1){const a=F(t,r,l);n[l]?(n[l].p(a,e),o(n[l],1)):(n[l]=G(a),n[l].c(),o(n[l],1),n[l].m(s.parentNode,s))}for(m(),l=r.length;l<n.length;l+=1)a(l);p()}},i(t){if(!e){for(let t=0;t<r.length;t+=1)o(n[t]);e=!0}},o(t){n=n.filter(Boolean);for(let t=0;t<n.length;t+=1)l(n[t]);e=!1},d(t){w(n,t),t&&i(s)}}}function C(t){let s;const e=new j({props:{$$slots:{default:[P]},$$scope:{ctx:t}}});return{c(){r(e.$$.fragment)},l(t){n(e.$$.fragment,t)},m(t,r){a(e,t,r),s=!0},p(t,[s]){const r={};17&s&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){s||(o(e.$$.fragment,t),s=!0)},o(t){l(e.$$.fragment,t),s=!1},d(t){c(e,t)}}}function H(t,s,e){let{posts:r}=s;return t.$set=(t=>{"posts"in t&&e(0,r=t.posts)}),[r]}class J extends t{constructor(t){super(),s(this,t,H,C,e,{posts:0})}}export{J as I};
