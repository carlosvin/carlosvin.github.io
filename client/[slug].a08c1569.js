import{S as s,i as t,s as a,e,j as o,t as r,m as n,F as c,c as i,d as m,k as p,a as d,g as u,o as f,b as h,h as l,f as g,p as $,q as j,r as y,u as w}from"./client.858979d0.js";import"./Entry.9dbc160d.js";import{c as x}from"./url.5ca38a13.js";import"./Details.8902a539.js";import{I as E}from"./Index.d7f3c105.js";function v(s){let t,a,x,v,b,I,k,q;return document.title=t=s[1],k=new E({props:{posts:s[0]}}),{c(){a=e("meta"),x=o(),v=e("h1"),b=r(s[1]),I=o(),n(k.$$.fragment),this.h()},l(t){const e=c('[data-svelte="svelte-3s8cwj"]',document.head);a=i(e,"META",{name:!0,content:!0}),e.forEach(m),x=p(t),v=i(t,"H1",{});var o=d(v);b=u(o,s[1]),o.forEach(m),I=p(t),f(k.$$.fragment,t),this.h()},h(){h(a,"name","description"),h(a,"content",s[1])},m(s,t){l(document.head,a),g(s,x,t),g(s,v,t),l(v,b),g(s,I,t),$(k,s,t),q=!0},p(s,[a]){(!q||2&a)&&t!==(t=s[1])&&(document.title=t);const e={};1&a&&(e.posts=s[0]),k.$set(e)},i(s){q||(j(k.$$.fragment,s),q=!0)},o(s){y(k.$$.fragment,s),q=!1},d(s){m(a),s&&m(x),s&&m(v),s&&m(I),w(k,s)}}}async function b({params:s}){const t=await this.fetch(x(s.slug)+".json"),a=await t.json();return 200===t.status?a:this.error(t.status,a.message)}function I(s,t,a){let{category:e}=t,{posts:o}=t,r="Posts related with "+e.name;return s.$set=s=>{"category"in s&&a(2,e=s.category),"posts"in s&&a(0,o=s.posts)},[o,r,e]}export default class extends s{constructor(s){super(),t(this,s,I,v,a,{category:2,posts:0})}}export{b as preload};
