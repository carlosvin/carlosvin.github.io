import{S as t,i as s,s as e,e as a,b as o,c as n,q as r,d as c,f as i,g as m,h as p,j as l,k as u,l as f,m as d,t as h,n as g,o as $}from"./client.712b909c.js";import"./Entry.8838f42c.js";import{c as j}from"./url.370495c4.js";import"./Details.0ab68eb4.js";import{I as y}from"./Index.eb33f549.js";function b(t){let s,e,j,b,w;return document.title=s=t[1],b=new y({props:{posts:t[0],title:t[1]}}),{c(){e=a("meta"),j=o(),n(b.$$.fragment),this.h()},l(t){const s=r('[data-svelte="svelte-lkd76v"]',document.head);e=c(s,"META",{name:!0,content:!0}),s.forEach(i),j=m(t),p(b.$$.fragment,t),this.h()},h(){l(e,"name","description"),l(e,"content",t[1])},m(t,s){u(document.head,e),f(t,j,s),d(b,t,s),w=!0},p(t,[e]){(!w||2&e)&&s!==(s=t[1])&&(document.title=s);const a={};1&e&&(a.posts=t[0]),b.$set(a)},i(t){w||(h(b.$$.fragment,t),w=!0)},o(t){g(b.$$.fragment,t),w=!1},d(t){i(e),t&&i(j),$(b,t)}}}async function w({params:t}){const s=await this.fetch(j(t.slug)+".json"),e=await s.json();return 200===s.status?e:this.error(s.status,e.message)}function x(t,s,e){let{category:a}=s,{posts:o}=s,n="Posts related with "+a.name;return t.$set=t=>{"category"in t&&e(2,a=t.category),"posts"in t&&e(0,o=t.posts)},[o,n,a]}export default class extends t{constructor(t){super(),s(this,t,x,b,e,{category:2,posts:0})}}export{w as preload};
