import{S as t,i as s,s as a,e,b as o,c as n,q as r,d as c,f as i,g as m,h as d,j as p,k as l,l as u,m as f,t as h,n as g,o as $}from"./client.9bf16b4a.js";import"./Entry.ae58d837.js";import{c as j}from"./url.744d05f0.js";import"./Details.739264d7.js";import{I as y}from"./Index.dac2aa31.js";function w(t){let s,a,j,w,x;return document.title=s=t[1],w=new y({props:{posts:t[0],title:t[1]}}),{c(){a=e("meta"),j=o(),n(w.$$.fragment),this.h()},l(t){const s=r('[data-svelte="svelte-lkd76v"]',document.head);a=c(s,"META",{name:!0,content:!0}),s.forEach(i),j=m(t),d(w.$$.fragment,t),this.h()},h(){p(a,"name","description"),p(a,"content",t[1])},m(t,s){l(document.head,a),u(t,j,s),f(w,t,s),x=!0},p(t,[a]){(!x||2&a)&&s!==(s=t[1])&&(document.title=s);const e={};1&a&&(e.posts=t[0]),w.$set(e)},i(t){x||(h(w.$$.fragment,t),x=!0)},o(t){g(w.$$.fragment,t),x=!1},d(t){i(a),t&&i(j),$(w,t)}}}async function x({params:t}){const s=await this.fetch(j(t.slug)+".json"),a=await s.json();return 200===s.status?a:this.error(s.status,a.message)}function b(t,s,a){let{category:e}=s,{posts:o}=s,n="Posts related with "+e.name;return t.$set=t=>{"category"in t&&a(2,e=t.category),"posts"in t&&a(0,o=t.posts)},[o,n,e]}export default class extends t{constructor(t){super(),s(this,t,b,w,a,{category:2,posts:0})}}export{x as preload};
