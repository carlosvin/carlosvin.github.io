import{S as t,i as s,s as a,e,b as o,c as n,q as r,d as c,f as i,g as m,h as p,j as f,k as l,l as u,m as d,t as h,n as g,o as $}from"./client.de120148.js";import"./Entry.a5f04816.js";import{c as j}from"./url.5bb2c1e9.js";import"./Details.f1b9337a.js";import{I as y}from"./Index.ab18a16f.js";function b(t){let s,a,j,b,w;return document.title=s=t[1],b=new y({props:{posts:t[0],title:t[1]}}),{c(){a=e("meta"),j=o(),n(b.$$.fragment),this.h()},l(t){const s=r('[data-svelte="svelte-lkd76v"]',document.head);a=c(s,"META",{name:!0,content:!0}),s.forEach(i),j=m(t),p(b.$$.fragment,t),this.h()},h(){f(a,"name","description"),f(a,"content",t[1])},m(t,s){l(document.head,a),u(t,j,s),d(b,t,s),w=!0},p(t,[a]){(!w||2&a)&&s!==(s=t[1])&&(document.title=s);const e={};1&a&&(e.posts=t[0]),b.$set(e)},i(t){w||(h(b.$$.fragment,t),w=!0)},o(t){g(b.$$.fragment,t),w=!1},d(t){i(a),t&&i(j),$(b,t)}}}async function w({params:t}){const s=await this.fetch(j(t.slug)+".json"),a=await s.json();return 200===s.status?a:this.error(s.status,a.message)}function x(t,s,a){let{category:e}=s,{posts:o}=s,n="Posts related with "+e.name;return t.$$set=t=>{"category"in t&&a(2,e=t.category),"posts"in t&&a(0,o=t.posts)},[o,n,e]}export default class extends t{constructor(t){super(),s(this,t,x,b,a,{category:2,posts:0})}}export{w as preload};