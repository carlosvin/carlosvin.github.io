import{S as s,i as t,s as a,e,j as o,t as r,m as n,F as c,c as i,d as m,k as p,a as u,g as f,o as d,b as h,h as l,f as g,p as $,q as j,r as y,u as w}from"./client.726867d4.js";import"./Entry.cea3d78e.js";import{c as x}from"./url.99ffeaee.js";import"./Details.b1b35769.js";import{I as E}from"./Index.a74726c4.js";function b(s){let t,a,x,b,v,I,k,q;return document.title=t=s[1],k=new E({props:{posts:s[0]}}),{c(){a=e("meta"),x=o(),b=e("h1"),v=r(s[1]),I=o(),n(k.$$.fragment),this.h()},l(t){const e=c('[data-svelte="svelte-3s8cwj"]',document.head);a=i(e,"META",{name:!0,content:!0}),e.forEach(m),x=p(t),b=i(t,"H1",{});var o=u(b);v=f(o,s[1]),o.forEach(m),I=p(t),d(k.$$.fragment,t),this.h()},h(){h(a,"name","description"),h(a,"content",s[1])},m(s,t){l(document.head,a),g(s,x,t),g(s,b,t),l(b,v),g(s,I,t),$(k,s,t),q=!0},p(s,[a]){(!q||2&a)&&t!==(t=s[1])&&(document.title=t);const e={};1&a&&(e.posts=s[0]),k.$set(e)},i(s){q||(j(k.$$.fragment,s),q=!0)},o(s){y(k.$$.fragment,s),q=!1},d(s){m(a),s&&m(x),s&&m(b),s&&m(I),w(k,s)}}}async function v({params:s}){const t=await this.fetch(x(s.slug)+".json"),a=await t.json();return 200===t.status?a:this.error(t.status,a.message)}function I(s,t,a){let{category:e}=t,{posts:o}=t,r="Posts related with "+e.name;return s.$set=s=>{"category"in s&&a(2,e=s.category),"posts"in s&&a(0,o=s.posts)},[o,r,e]}export default class extends s{constructor(s){super(),t(this,s,I,b,a,{category:2,posts:0})}}export{v as preload};
