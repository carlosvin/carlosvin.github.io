import{r as t,B as s,S as e,i as a,s as n,e as l,c as o,j as c,k as i,h as r,a as h,t as u,q as d,f as m,b as f,d as p,l as y,m as v,p as j,u as b,v as g}from"./client.1af1dfbc.js";function x({slug:s,lang:e}){return`${t}/${s}/${e}`}function M(t){return t.substring(0,10)}const{document:$}=g;function C(t){let s,e;return{c(){s=l("link"),this.h()},l(t){s=o(t,"LINK",{rel:!0,href:!0}),this.h()},h(){c(s,"rel","canonical"),c(s,"href",e=x(t[0]))},m(t,e){i(t,s,e)},p(t,a){1&a&&e!==(e=x(t[0]))&&c(s,"href",e)},d(t){t&&r(s)}}}function E(t){let s,e,a,n,b,g,x,E,L,q,T,Y=t[0].title+"",k=t[0].html+"";$.title=s=t[0].title;let w=t[1]&&C(t);return{c(){e=l("meta"),n=l("meta"),w&&w.c(),g=l("link"),x=h(),E=l("h1"),L=u(Y),q=h(),T=l("div"),this.h()},l(t){const s=d('[data-svelte="svelte-1cqooyb"]',$.head);e=o(s,"META",{name:!0,content:!0,scheme:!0}),n=o(s,"META",{name:!0,content:!0}),w&&w.l(s),g=o(s,"LINK",{rel:!0,href:!0,as:!0,onload:!0}),s.forEach(r),x=m(t),E=o(t,"H1",{class:!0});var a=f(E);L=p(a,Y),a.forEach(r),q=m(t),T=o(t,"DIV",{class:!0}),f(T).forEach(r),this.h()},h(){c(e,"name","date"),c(e,"content",a=M(t[0].date)),c(e,"scheme","YYYY-MM-DD"),c(n,"name","description"),c(n,"content",b=t[0].summary),c(g,"rel","preload"),c(g,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css"),c(g,"as","style"),c(g,"onload","this.onload=null;this.rel='stylesheet'"),c(E,"class","svelte-16bc3x4"),c(T,"class","content svelte-16bc3x4")},m(t,s){y($.head,e),y($.head,n),w&&w.m($.head,null),y($.head,g),i(t,x,s),i(t,E,s),y(E,L),i(t,q,s),i(t,T,s),T.innerHTML=k},p(t,[l]){1&l&&s!==(s=t[0].title)&&($.title=s),1&l&&a!==(a=M(t[0].date))&&c(e,"content",a),1&l&&b!==(b=t[0].summary)&&c(n,"content",b),t[1]?w?w.p(t,l):((w=C(t)).c(),w.m(g.parentNode,g)):w&&(w.d(1),w=null),1&l&&Y!==(Y=t[0].title+"")&&v(L,Y),1&l&&k!==(k=t[0].html+"")&&(T.innerHTML=k)},i:j,o:j,d(t){r(e),r(n),w&&w.d(t),r(g),t&&r(x),t&&r(E),t&&r(q),t&&r(T)}}}async function L({params:t,query:e}){const a=await this.fetch(`${s}/${t.slug.join("/")}.json`),n=await a.json();return 200===a.status?{post:n}:301===a.status?{post:n,isCanonical:!0}:void this.error(a.status,n.message)}function q(t,s,e){b(async()=>{[...document.querySelectorAll('a[href^="#"]')].map(t=>t.href=document.location+new URL(t.href).hash)});let{post:a}=s,{isCanonical:n=!1}=s;return t.$set=(t=>{"post"in t&&e(0,a=t.post),"isCanonical"in t&&e(1,n=t.isCanonical)}),[a,n]}export default class extends e{constructor(t){super(),a(this,t,q,E,n,{post:0,isCanonical:1})}}export{L as preload};
