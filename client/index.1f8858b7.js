import{S as s,i as t,s as e,e as n,c as a,a as r,d as o,b as i,f as c,n as h,t as l,g as f,h as m,j as p,k as u,l as d,m as $,o as E,p as x,q as g,r as v,u as P,H as j}from"./client.f8b163af.js";import"./Entry.d7a41238.js";import"./url.cf2a19fc.js";import"./Details.8fdf693d.js";import{I as T}from"./Index.066c01e8.js";function A(s){let t,e;return{c(){t=n("h1"),e=l("There are no posts"),this.h()},l(s){t=a(s,"H1",{class:!0});var n=r(t);e=f(n,"There are no posts"),n.forEach(o),this.h()},h(){i(t,"class","svelte-8rfu51")},m(s,n){c(s,t,n),m(t,e)},p:h,d(s){s&&o(t)}}}function H(s){let t,e,h,$,E,x;return{c(){t=n("h1"),e=l("Recent posts"),h=p(),$=n("span"),E=l("Total "),x=l(s[0]),this.h()},l(n){t=a(n,"H1",{class:!0});var i=r(t);e=f(i,"Recent posts"),i.forEach(o),h=u(n),$=a(n,"SPAN",{});var c=r($);E=f(c,"Total "),x=f(c,s[0]),c.forEach(o),this.h()},h(){i(t,"class","svelte-8rfu51")},m(s,n){c(s,t,n),m(t,e),c(s,h,n),c(s,$,n),m($,E),m($,x)},p(s,t){1&t&&d(x,s[0])},d(s){s&&o(t),s&&o(h),s&&o($)}}}function R(s){let t;function e(s,t){return s[0]>0?H:A}let l=e(s),f=l(s);return{c(){t=n("header"),f.c(),this.h()},l(s){t=a(s,"HEADER",{class:!0});var e=r(t);f.l(e),e.forEach(o),this.h()},h(){i(t,"class","svelte-8rfu51")},m(s,e){c(s,t,e),f.m(t,null)},p(s,[n]){l===(l=e(s))&&f?f.p(s,n):(f.d(1),f=l(s),f&&(f.c(),f.m(t,null)))},i:h,o:h,d(s){s&&o(t),f.d()}}}function w(s,t,e){let{numPosts:n}=t;return s.$set=s=>{"numPosts"in s&&e(0,n=s.numPosts)},[n]}class D extends s{constructor(s){super(),t(this,s,w,R,e,{numPosts:0})}}function I(s){let t,e,h,A,H,R,w,I,S,b,y,k;return S=new D({props:{numPosts:s[4]}}),y=new T({props:{posts:s[0]}}),{c(){t=n("sapper:head"),e=n("title"),h=l(s[1]),A=p(),H=n("meta"),R=p(),I=p(),$(S.$$.fragment),b=p(),$(y.$$.fragment),this.h()},l(n){t=a(n,"SAPPER:HEAD",{});var i=r(t);e=a(i,"TITLE",{});var c=r(e);h=f(c,s[1]),c.forEach(o),A=u(i),H=a(i,"META",{name:!0,content:!0}),R=u(i),i.forEach(o),I=u(n),E(S.$$.fragment,n),b=u(n),E(y.$$.fragment,n),this.h()},h(){i(H,"name","description"),i(H,"content",s[2]),w=new j(null)},m(n,a){c(n,t,a),m(t,e),m(e,h),m(t,A),m(t,H),m(t,R),w.m(s[3],t),c(n,I,a),x(S,n,a),c(n,b,a),x(y,n,a),k=!0},p(s,[t]){(!k||2&t)&&d(h,s[1]),(!k||4&t)&&i(H,"content",s[2]),(!k||8&t)&&w.p(s[3]);const e={};16&t&&(e.numPosts=s[4]),S.$set(e);const n={};1&t&&(n.posts=s[0]),y.$set(n)},i(s){k||(g(S.$$.fragment,s),g(y.$$.fragment,s),k=!0)},o(s){v(S.$$.fragment,s),v(y.$$.fragment,s),k=!1},d(s){s&&o(t),s&&o(I),P(S,s),s&&o(b),P(y,s)}}}function S(){return this.fetch("rss"),this.fetch("sitemap.xml"),this.fetch("index.json").then(s=>s.json()).then(s=>({...s}))}function b(s,t,e){let n,{index:a}=t,{name:r}=t,{description:o}=t,{ld:i}=t;return s.$set=s=>{"index"in s&&e(0,a=s.index),"name"in s&&e(1,r=s.name),"description"in s&&e(2,o=s.description),"ld"in s&&e(3,i=s.ld)},s.$$.update=()=>{1&s.$$.dirty&&e(4,n=a?a.length:0)},[a,r,o,i,n]}export default class extends s{constructor(s){super(),t(this,s,b,I,e,{index:0,name:1,description:2,ld:3})}}export{S as preload};
