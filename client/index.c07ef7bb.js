import{S as t,i as s,s as e,e as n,c as a,a as r,d as o,b as c,f as i,n as h,t as l,g as p,h as m,j as u,k as f,l as d,m as $,o as E,p as x,q as g,r as v,u as P,H as j}from"./client.34f5c22a.js";import"./Entry.010acc2c.js";import"./url.abc0ad7b.js";import"./Details.41279139.js";import{I as S}from"./Index.022efedf.js";function T(t){let s,e;return{c(){s=n("h1"),e=l("There are no posts"),this.h()},l(t){s=a(t,"H1",{class:!0});var n=r(s);e=p(n,"There are no posts"),n.forEach(o),this.h()},h(){c(s,"class","svelte-8rfu51")},m(t,n){i(t,s,n),m(s,e)},p:h,d(t){t&&o(s)}}}function A(t){let s,e,h,$,E,x;return{c(){s=n("h1"),e=l("Recent posts"),h=u(),$=n("span"),E=l("Total "),x=l(t[0]),this.h()},l(n){s=a(n,"H1",{class:!0});var c=r(s);e=p(c,"Recent posts"),c.forEach(o),h=f(n),$=a(n,"SPAN",{});var i=r($);E=p(i,"Total "),x=p(i,t[0]),i.forEach(o),this.h()},h(){c(s,"class","svelte-8rfu51")},m(t,n){i(t,s,n),m(s,e),i(t,h,n),i(t,$,n),m($,E),m($,x)},p(t,s){1&s&&d(x,t[0])},d(t){t&&o(s),t&&o(h),t&&o($)}}}function H(t){let s;function e(t,s){return t[0]>0?A:T}let l=e(t),p=l(t);return{c(){s=n("header"),p.c(),this.h()},l(t){s=a(t,"HEADER",{class:!0});var e=r(s);p.l(e),e.forEach(o),this.h()},h(){c(s,"class","svelte-8rfu51")},m(t,e){i(t,s,e),p.m(s,null)},p(t,[n]){l===(l=e(t))&&p?p.p(t,n):(p.d(1),p=l(t),p&&(p.c(),p.m(s,null)))},i:h,o:h,d(t){t&&o(s),p.d()}}}function R(t,s,e){let{numPosts:n}=s;return t.$set=t=>{"numPosts"in t&&e(0,n=t.numPosts)},[n]}class b extends t{constructor(t){super(),s(this,t,R,H,e,{numPosts:0})}}function w(t){let s,e,h,T,A,H,R,w,D,I,y,k;return D=new b({props:{numPosts:t[4]}}),y=new S({props:{posts:t[0]}}),{c(){s=n("sapper:head"),e=n("title"),h=l(t[1]),T=u(),A=n("meta"),H=u(),w=u(),$(D.$$.fragment),I=u(),$(y.$$.fragment),this.h()},l(n){s=a(n,"SAPPER:HEAD",{});var c=r(s);e=a(c,"TITLE",{});var i=r(e);h=p(i,t[1]),i.forEach(o),T=f(c),A=a(c,"META",{name:!0,content:!0}),H=f(c),c.forEach(o),w=f(n),E(D.$$.fragment,n),I=f(n),E(y.$$.fragment,n),this.h()},h(){c(A,"name","description"),c(A,"content",t[2]),R=new j(null)},m(n,a){i(n,s,a),m(s,e),m(e,h),m(s,T),m(s,A),m(s,H),R.m(t[3],s),i(n,w,a),x(D,n,a),i(n,I,a),x(y,n,a),k=!0},p(t,[s]){(!k||2&s)&&d(h,t[1]),(!k||4&s)&&c(A,"content",t[2]),(!k||8&s)&&R.p(t[3]);const e={};16&s&&(e.numPosts=t[4]),D.$set(e);const n={};1&s&&(n.posts=t[0]),y.$set(n)},i(t){k||(g(D.$$.fragment,t),g(y.$$.fragment,t),k=!0)},o(t){v(D.$$.fragment,t),v(y.$$.fragment,t),k=!1},d(t){t&&o(s),t&&o(w),P(D,t),t&&o(I),P(y,t)}}}function D(){return this.fetch("rss"),this.fetch("sitemap.xml"),this.fetch("index.json").then(t=>t.json()).then(t=>({...t}))}function I(t,s,e){let n,{index:a}=s,{name:r}=s,{description:o}=s,{ldScript:c}=s;return t.$set=t=>{"index"in t&&e(0,a=t.index),"name"in t&&e(1,r=t.name),"description"in t&&e(2,o=t.description),"ldScript"in t&&e(3,c=t.ldScript)},t.$$.update=()=>{1&t.$$.dirty&&e(4,n=a?a.length:0)},[a,r,o,c,n]}export default class extends t{constructor(t){super(),s(this,t,I,w,e,{index:0,name:1,description:2,ldScript:3})}}export{D as preload};
