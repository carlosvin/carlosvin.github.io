import{S as s,i as t,s as e,e as n,a,b as r,d as o,f as c,g as h,n as i,p as l,q as u,r as m,u as p,v as f,w as d,H as $,z as g,x as v,A as E,I as x,D as j,t as P,k as b,E as T}from"./client.b911b13f.js";import"./Entry.62e58aa7.js";import"./url.edb332cb.js";import"./Details.4bd1cc64.js";import{I as A}from"./Index.8813ce5c.js";function H(s){let t,e;return{c(){t=n("h1"),e=l("There are no posts"),this.h()},l(s){t=a(s,"H1",{class:!0});var n=r(t);e=u(n,"There are no posts"),n.forEach(o),this.h()},h(){c(t,"class","svelte-8rfu51")},m(s,n){h(s,t,n),m(t,e)},p:i,d(s){s&&o(t)}}}function w(s){let t,e,i,$,g,v;return{c(){t=n("h1"),e=l("Recent posts"),i=p(),$=n("span"),g=l("Total "),v=l(s[0]),this.h()},l(n){t=a(n,"H1",{class:!0});var c=r(t);e=u(c,"Recent posts"),c.forEach(o),i=f(n),$=a(n,"SPAN",{});var h=r($);g=u(h,"Total "),v=u(h,s[0]),h.forEach(o),this.h()},h(){c(t,"class","svelte-8rfu51")},m(s,n){h(s,t,n),m(t,e),h(s,i,n),h(s,$,n),m($,g),m($,v)},p(s,t){1&t&&d(v,s[0])},d(s){s&&o(t),s&&o(i),s&&o($)}}}function y(s){let t;function e(s,t){return s[0]>0?w:H}let l=e(s),u=l(s);return{c(){t=n("header"),u.c(),this.h()},l(s){t=a(s,"HEADER",{class:!0});var e=r(t);u.l(e),e.forEach(o),this.h()},h(){c(t,"class","svelte-8rfu51")},m(s,e){h(s,t,e),u.m(t,null)},p(s,[n]){l===(l=e(s))&&u?u.p(s,n):(u.d(1),(u=l(s))&&(u.c(),u.m(t,null)))},i:i,o:i,d(s){s&&o(t),u.d()}}}function D(s,t,e){let{numPosts:n}=t;return s.$set=(s=>{"numPosts"in s&&e(0,n=s.numPosts)}),[n]}class I extends s{constructor(s){super(),t(this,s,D,y,e,{numPosts:0})}}function R(s){let t,e,r,i,l,u;document.title=t=$();const d=new I({props:{numPosts:s[1]}}),H=new A({props:{posts:s[0]}});return{c(){e=n("meta"),i=p(),g(d.$$.fragment),l=p(),g(H.$$.fragment),this.h()},l(s){const t=v('[data-svelte="svelte-ntl3a7"]',document.head);e=a(t,"META",{name:!0,content:!0}),t.forEach(o),i=f(s),E(d.$$.fragment,s),l=f(s),E(H.$$.fragment,s),this.h()},h(){c(e,"name","description"),c(e,"content",r=x())},m(s,t){m(document.head,e),h(s,i,t),j(d,s,t),h(s,l,t),j(H,s,t),u=!0},p(s,[e]){(!u||0&e)&&t!==(t=$())&&(document.title=t);const n={};2&e&&(n.numPosts=s[1]),d.$set(n);const a={};1&e&&(a.posts=s[0]),H.$set(a)},i(s){u||(P(d.$$.fragment,s),P(H.$$.fragment,s),u=!0)},o(s){b(d.$$.fragment,s),b(H.$$.fragment,s),u=!1},d(s){o(e),s&&o(i),T(d,s),s&&o(l),T(H,s)}}}function q({params:s,query:t}){return this.fetch("rss"),this.fetch("sitemap.xml"),this.fetch("index.json").then(s=>s.json()).then(s=>({posts:s}))}function S(s,t,e){let n,{posts:a}=t;return s.$set=(s=>{"posts"in s&&e(0,a=s.posts)}),s.$$.update=(()=>{1&s.$$.dirty&&e(1,n=a?a.length:0)}),[a,n]}export default class extends s{constructor(s){super(),t(this,s,S,R,e,{posts:0})}}export{q as preload};