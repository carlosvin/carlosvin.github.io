import{S as t,i as e,s,e as n,a,b as r,u as o,c,q as l,d as f,f as h,g as i,v as $,w as m,h as p,j as d,k as g,l as u,m as x,t as j,n as w,o as E,M as y,p as v,r as A,G as S,H as L,x as b}from"./client.a42bd92f.js";import{I as C,E as I}from"./Entry.2f69c5a8.js";import{j as O}from"./html.14495991.js";function H(t,e,s){const n=t.slice();return n[5]=e[s],n}function M(t){let e,s,a,r=t[5].name+"";return{c(){e=n("a"),s=o(r),this.h()},l(t){e=f(t,"A",{rel:!0,href:!0});var n=$(e);s=m(n,r),n.forEach(h),this.h()},h(){d(e,"rel","prefetch"),d(e,"href",a=t[5].path)},m(t,n){u(t,e,n),g(e,s)},p(t,n){1&n&&r!==(r=t[5].name+"")&&b(s,r),1&n&&a!==(a=t[5].path)&&d(e,"href",a)},d(t){t&&h(e)}}}function N(t){let e,s;return e=new I({props:{$$slots:{default:[M]},$$scope:{ctx:t}}}),{c(){c(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,n){x(e,t,n),s=!0},p(t,s){const n={};257&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(j(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){E(e,t)}}}function k(t){let e,s;return{c(){e=n("a"),s=o("All posts"),this.h()},l(t){e=f(t,"A",{href:!0});var n=$(e);s=m(n,"All posts"),n.forEach(h),this.h()},h(){d(e,"href","/posts")},m(t,n){u(t,e,n),g(e,s)},d(t){t&&h(e)}}}function q(t){let e,s;return{c(){e=n("a"),s=o("Old urls"),this.h()},l(t){e=f(t,"A",{href:!0});var n=$(e);s=m(n,"Old urls"),n.forEach(h),this.h()},h(){d(e,"href","/old")},m(t,n){u(t,e,n),g(e,s)},d(t){t&&h(e)}}}function z(t){let e,s,n,a,o,l=t[0],f=[];for(let e=0;e<l.length;e+=1)f[e]=N(H(t,l,e));const $=t=>w(f[t],1,1,()=>{f[t]=null});return s=new I({props:{$$slots:{default:[k]},$$scope:{ctx:t}}}),a=new I({props:{$$slots:{default:[q]},$$scope:{ctx:t}}}),{c(){for(let t=0;t<f.length;t+=1)f[t].c();e=r(),c(s.$$.fragment),n=r(),c(a.$$.fragment)},l(t){for(let e=0;e<f.length;e+=1)f[e].l(t);e=i(t),p(s.$$.fragment,t),n=i(t),p(a.$$.fragment,t)},m(t,r){for(let e=0;e<f.length;e+=1)f[e].m(t,r);u(t,e,r),x(s,t,r),u(t,n,r),x(a,t,r),o=!0},p(t,n){if(1&n){let s;for(l=t[0],s=0;s<l.length;s+=1){const a=H(t,l,s);f[s]?(f[s].p(a,n),j(f[s],1)):(f[s]=N(a),f[s].c(),j(f[s],1),f[s].m(e.parentNode,e))}for(v(),s=l.length;s<f.length;s+=1)$(s);A()}const r={};256&n&&(r.$$scope={dirty:n,ctx:t}),s.$set(r);const o={};256&n&&(o.$$scope={dirty:n,ctx:t}),a.$set(o)},i(t){if(!o){for(let t=0;t<l.length;t+=1)j(f[t]);j(s.$$.fragment,t),j(a.$$.fragment,t),o=!0}},o(t){f=f.filter(Boolean);for(let t=0;t<f.length;t+=1)w(f[t]);w(s.$$.fragment,t),w(a.$$.fragment,t),o=!1},d(t){S(f,t),t&&h(e),E(s,t),t&&h(n),E(a,t)}}}function B(t){let e,s,y,v,A,S,b,I,O,H;return document.title=e=t[2],O=new C({props:{$$slots:{default:[z]},$$scope:{ctx:t}}}),{c(){s=n("meta"),v=a(),A=r(),S=n("h1"),b=o("Categories"),I=r(),c(O.$$.fragment),this.h()},l(t){const e=l('[data-svelte="svelte-80p12z"]',document.head);s=f(e,"META",{name:!0,content:!0}),v=a(),e.forEach(h),A=i(t),S=f(t,"H1",{});var n=$(S);b=m(n,"Categories"),n.forEach(h),I=i(t),p(O.$$.fragment,t),this.h()},h(){d(s,"name","description"),d(s,"content",J),y=new L(v)},m(e,n){g(document.head,s),y.m(t[1],document.head),g(document.head,v),u(e,A,n),u(e,S,n),g(S,b),u(e,I,n),x(O,e,n),H=!0},p(t,[s]){(!H||4&s)&&e!==(e=t[2])&&(document.title=e),(!H||2&s)&&y.p(t[1]);const n={};257&s&&(n.$$scope={dirty:s,ctx:t}),O.$set(n)},i(t){H||(j(O.$$.fragment,t),H=!0)},o(t){w(O.$$.fragment,t),H=!1},d(t){h(s),h(v),t&&y.d(),t&&h(A),t&&h(S),t&&h(I),E(O,t)}}}async function G(t){const e=await this.fetch("categories.json");return{categories:await e.json(),path:t.path}}const J="Index of blog posts categories";function T(t,e,s){function n(t,e,s,n){return O(JSON.stringify({"@context":"https://www.schema.org",type:"Itemlist",name:e,description:s,url:n,itemlistElement:t.map(t=>t.jsonLd)}))}const a=y()+" - Categories";let{categories:r}=e,{path:o}=e,{jsonLdStr:c=n(r,a,J,o)}=e;return t.$set=t=>{"categories"in t&&s(0,r=t.categories),"path"in t&&s(3,o=t.path),"jsonLdStr"in t&&s(1,c=t.jsonLdStr)},[r,c,a,o]}export default class extends t{constructor(t){super(),e(this,t,T,B,s,{categories:0,path:3,jsonLdStr:1})}}export{G as preload};
