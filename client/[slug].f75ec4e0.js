import{S as t,i as s,s as e,e as a,b as o,c as n,q as r,d as c,f as i,g as m,h as d,j as f,k as p,l,m as u,t as h,n as g,o as $}from"./client.4cdaedef.js";import"./Entry.cd4aff26.js";import{c as j}from"./url.18769091.js";import"./Details.5fdd70a1.js";import{I as y}from"./Index.fe6861bf.js";function w(t){let s,e,j,w,x;return document.title=s=t[1],w=new y({props:{posts:t[0],title:t[1]}}),{c(){e=a("meta"),j=o(),n(w.$$.fragment),this.h()},l(t){const s=r('[data-svelte="svelte-lkd76v"]',document.head);e=c(s,"META",{name:!0,content:!0}),s.forEach(i),j=m(t),d(w.$$.fragment,t),this.h()},h(){f(e,"name","description"),f(e,"content",t[1])},m(t,s){p(document.head,e),l(t,j,s),u(w,t,s),x=!0},p(t,[e]){(!x||2&e)&&s!==(s=t[1])&&(document.title=s);const a={};1&e&&(a.posts=t[0]),w.$set(a)},i(t){x||(h(w.$$.fragment,t),x=!0)},o(t){g(w.$$.fragment,t),x=!1},d(t){i(e),t&&i(j),$(w,t)}}}async function x({params:t}){const s=await this.fetch(j(t.slug)+".json"),e=await s.json();return 200===s.status?e:this.error(s.status,e.message)}function v(t,s,e){let{category:a}=s,{posts:o}=s,n="Posts related with "+a.name;return t.$set=t=>{"category"in t&&e(2,a=t.category),"posts"in t&&e(0,o=t.posts)},[o,n,a]}export default class extends t{constructor(t){super(),s(this,t,v,w,e,{category:2,posts:0})}}export{x as preload};
