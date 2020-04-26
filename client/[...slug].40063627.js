import{S as t,i as e,s,e as a,a as n,b as l,d as r,f as i,g as o,I as c,r as h,n as u,A as d,w as m,m as f,F as p,C as g,x as v,o as x,y,p as $,z as E,t as j,k as b,q as k,J as w,K as C}from"./client.819ddbdc.js";import{p as M,u as T}from"./models.29a9b1c8.js";import{g as A}from"./dates.deba47a4.js";function L(t){let e,s=t[1]&&function(t){let e,s;return{c(){e=a("button"),this.h()},l(t){e=n(t,"BUTTON",{title:!0,class:!0}),l(e).forEach(r),this.h()},h(){i(e,"title",t[0]),i(e,"class","svelte-1aekmf3")},m(a,n,l){o(a,e,n),l&&s(),s=c(e,"click",t[2])},p(t,s){1&s&&i(e,"title",t[0])},d(t){t&&r(e),s()}}}(t);return{c(){s&&s.c(),e=h()},l(t){s&&s.l(t),e=h()},m(t,a){s&&s.m(t,a),o(t,e,a)},p(t,[e]){t[1]&&s.p(t,e)},i:u,o:u,d(t){s&&s.d(t),t&&r(e)}}}function D(t,e,s){let{title:a}=e,{text:n}=e,{url:l}=e;const r="undefined"!=typeof navigator&&navigator.share;return t.$set=(t=>{"title"in t&&s(0,a=t.title),"text"in t&&s(3,n=t.text),"url"in t&&s(4,l=t.url)}),[a,r,async function(){try{await navigator.share({title:a,text:n,url:l})}catch(t){console.error("Sharing",t)}},n,l]}class H extends t{constructor(t){super(),e(this,t,D,L,s,{title:0,text:3,url:4})}}const{document:I}=C;function N(t){let e,s;return{c(){e=a("link"),this.h()},l(t){e=n(t,"LINK",{rel:!0,href:!0}),this.h()},h(){i(e,"rel","canonical"),i(e,"href",s=M(t[0].slug,t[0].lang))},m(t,s){o(t,e,s)},p(t,a){1&a&&s!==(s=M(t[0].slug,t[0].lang))&&i(e,"href",s)},d(t){t&&r(e)}}}function Y(t){let e,s,c,h,u,w,C,M,L,D,Y,q,K,S,R=t[0].title+"",U=t[0].html+"";I.title=e=t[0].title;let z=t[1]&&N(t);const B=new H({props:{title:t[0].title,text:t[0].description,url:T(t[0].slug,t[0].lang)}});return{c(){s=a("meta"),h=a("meta"),z&&z.c(),w=a("link"),C=d(),M=a("header"),L=a("h1"),D=m(R),Y=d(),f(B.$$.fragment),q=d(),K=a("div"),this.h()},l(t){const e=p('[data-svelte="svelte-1mp2x6k"]',I.head);s=n(e,"META",{name:!0,content:!0,scheme:!0}),h=n(e,"META",{name:!0,content:!0}),z&&z.l(e),w=n(e,"LINK",{rel:!0,href:!0,as:!0,onload:!0}),e.forEach(r),C=g(t),M=n(t,"HEADER",{class:!0});var a=l(M);L=n(a,"H1",{class:!0});var i=l(L);D=v(i,R),i.forEach(r),Y=g(a),x(B.$$.fragment,a),a.forEach(r),q=g(t),K=n(t,"DIV",{class:!0}),l(K).forEach(r),this.h()},h(){i(s,"name","date"),i(s,"content",c=A(t[0].date)),i(s,"scheme","YYYY-MM-DD"),i(h,"name","description"),i(h,"content",u=t[0].summary),i(w,"rel","preload"),i(w,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css"),i(w,"as","style"),i(w,"onload","this.onload=null;this.rel='stylesheet'"),i(L,"class","svelte-15e36f2"),i(M,"class","svelte-15e36f2"),i(K,"class","content svelte-15e36f2")},m(t,e){y(I.head,s),y(I.head,h),z&&z.m(I.head,null),y(I.head,w),o(t,C,e),o(t,M,e),y(M,L),y(L,D),y(M,Y),$(B,M,null),o(t,q,e),o(t,K,e),K.innerHTML=U,S=!0},p(t,[a]){(!S||1&a)&&e!==(e=t[0].title)&&(I.title=e),(!S||1&a&&c!==(c=A(t[0].date)))&&i(s,"content",c),(!S||1&a&&u!==(u=t[0].summary))&&i(h,"content",u),t[1]?z?z.p(t,a):((z=N(t)).c(),z.m(w.parentNode,w)):z&&(z.d(1),z=null),(!S||1&a)&&R!==(R=t[0].title+"")&&E(D,R);const n={};1&a&&(n.title=t[0].title),1&a&&(n.text=t[0].description),1&a&&(n.url=T(t[0].slug,t[0].lang)),B.$set(n),(!S||1&a)&&U!==(U=t[0].html+"")&&(K.innerHTML=U)},i(t){S||(j(B.$$.fragment,t),S=!0)},o(t){b(B.$$.fragment,t),S=!1},d(t){r(s),r(h),z&&z.d(t),r(w),t&&r(C),t&&r(M),k(B),t&&r(q),t&&r(K)}}}async function q({params:t,query:e}){const[s,a]=t.slug,n=await this.fetch(M(s,a)+".json"),l=await n.json();return 200===n.status?{post:l}:301===n.status?{post:l,isCanonical:!0}:void this.error(n.status,l.message)}function K(t,e,s){w(async()=>{[...document.querySelectorAll('a[href^="#"]')].map(t=>t.href=document.location+new URL(t.href).hash)});let{post:a}=e,{isCanonical:n=!1}=e;return t.$set=(t=>{"post"in t&&s(0,a=t.post),"isCanonical"in t&&s(1,n=t.isCanonical)}),[a,n]}export default class extends t{constructor(t){super(),e(this,t,K,Y,s,{post:0,isCanonical:1})}}export{q as preload};
