import{S as t,i as e,s,e as n,u as r,a,t as o,c,L as l,b as f,g as i,h,d as $,f as m,j as p,k as d,m as g,l as u,n as x,p as j,q as w,r as E,M as y,v,w as A,F as L,H as S,o as C}from"./client.80af3338.js";import{I,E as O}from"./Entry.5fc041da.js";import{j as b}from"./html.14495991.js";function k(t,e,s){const n=t.slice();return n[5]=e[s],n}function H(t){let e,s,r,a=t[5].name+"";return{c(){e=n("a"),s=o(a),this.h()},l(t){e=f(t,"A",{rel:!0,href:!0});var n=$(e);s=m(n,a),n.forEach(i),this.h()},h(){d(e,"rel","prefetch"),d(e,"href",r=t[5].path)},m(t,n){u(t,e,n),g(e,s)},p(t,n){1&n&&a!==(a=t[5].name+"")&&C(s,a),1&n&&r!==(r=t[5].path)&&d(e,"href",r)},d(t){t&&i(e)}}}function M(t){let e,s;return e=new O({props:{$$slots:{default:[H]},$$scope:{ctx:t}}}),{c(){c(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,n){x(e,t,n),s=!0},p(t,s){const n={};257&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(j(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){E(e,t)}}}function N(t){let e,s;return{c(){e=n("a"),s=o("All posts"),this.h()},l(t){e=f(t,"A",{href:!0});var n=$(e);s=m(n,"All posts"),n.forEach(i),this.h()},h(){d(e,"href","/posts")},m(t,n){u(t,e,n),g(e,s)},d(t){t&&i(e)}}}function q(t){let e,s;return{c(){e=n("a"),s=o("Old urls"),this.h()},l(t){e=f(t,"A",{href:!0});var n=$(e);s=m(n,"Old urls"),n.forEach(i),this.h()},h(){d(e,"href","/old")},m(t,n){u(t,e,n),g(e,s)},d(t){t&&i(e)}}}function B(t){let e,s,n,r,o,l=t[0],f=[];for(let e=0;e<l.length;e+=1)f[e]=M(k(t,l,e));const $=t=>w(f[t],1,1,()=>{f[t]=null});return s=new O({props:{$$slots:{default:[N]},$$scope:{ctx:t}}}),r=new O({props:{$$slots:{default:[q]},$$scope:{ctx:t}}}),{c(){for(let t=0;t<f.length;t+=1)f[t].c();e=a(),c(s.$$.fragment),n=a(),c(r.$$.fragment)},l(t){for(let e=0;e<f.length;e+=1)f[e].l(t);e=h(t),p(s.$$.fragment,t),n=h(t),p(r.$$.fragment,t)},m(t,a){for(let e=0;e<f.length;e+=1)f[e].m(t,a);u(t,e,a),x(s,t,a),u(t,n,a),x(r,t,a),o=!0},p(t,n){if(1&n){let s;for(l=t[0],s=0;s<l.length;s+=1){const r=k(t,l,s);f[s]?(f[s].p(r,n),j(f[s],1)):(f[s]=M(r),f[s].c(),j(f[s],1),f[s].m(e.parentNode,e))}for(v(),s=l.length;s<f.length;s+=1)$(s);A()}const a={};256&n&&(a.$$scope={dirty:n,ctx:t}),s.$set(a);const o={};256&n&&(o.$$scope={dirty:n,ctx:t}),r.$set(o)},i(t){if(!o){for(let t=0;t<l.length;t+=1)j(f[t]);j(s.$$.fragment,t),j(r.$$.fragment,t),o=!0}},o(t){f=f.filter(Boolean);for(let t=0;t<f.length;t+=1)w(f[t]);w(s.$$.fragment,t),w(r.$$.fragment,t),o=!1},d(t){L(f,t),t&&i(e),E(s,t),t&&i(n),E(r,t)}}}function F(t){let e,s,y,v,A,L,C,O,b,k;return document.title=e=t[2],b=new I({props:{$$slots:{default:[B]},$$scope:{ctx:t}}}),{c(){s=n("meta"),v=r(),A=a(),L=n("h1"),C=o("Categories"),O=a(),c(b.$$.fragment),this.h()},l(t){const e=l('[data-svelte="svelte-9dkmir"]',document.head);s=f(e,"META",{name:!0,content:!0}),v=r(),e.forEach(i),A=h(t),L=f(t,"H1",{});var n=$(L);C=m(n,"Categories"),n.forEach(i),O=h(t),p(b.$$.fragment,t),this.h()},h(){d(s,"name","description"),d(s,"content",T),y=new S(null)},m(e,n){g(document.head,s),y.m(t[1],document.head),g(document.head,v),u(e,A,n),u(e,L,n),g(L,C),u(e,O,n),x(b,e,n),k=!0},p(t,[s]){(!k||4&s)&&e!==(e=t[2])&&(document.title=e),(!k||2&s)&&y.p(t[1]);const n={};257&s&&(n.$$scope={dirty:s,ctx:t}),b.$set(n)},i(t){k||(j(b.$$.fragment,t),k=!0)},o(t){w(b.$$.fragment,t),k=!1},d(t){i(s),i(v),t&&y.d(),t&&i(A),t&&i(L),t&&i(O),E(b,t)}}}async function J(t){const e=await this.fetch("categories.json");return{categories:await e.json(),path:t.path}}const T="Index of blog posts categories";function z(t,e,s){function n(t,e,s,n){return b(JSON.stringify({"@context":"https://www.schema.org",type:"Itemlist",name:e,description:s,url:n,itemlistElement:t.map(t=>t.jsonLd)}))}const r=y()+" - Categories";let{categories:a}=e,{path:o}=e,{jsonLdStr:c=n(a,r,T,o)}=e;return t.$set=t=>{"categories"in t&&s(0,a=t.categories),"path"in t&&s(3,o=t.path),"jsonLdStr"in t&&s(1,c=t.jsonLdStr)},[a,c,r,o]}export default class extends t{constructor(t){super(),e(this,t,z,F,s,{categories:0,path:3,jsonLdStr:1})}}export{J as preload};