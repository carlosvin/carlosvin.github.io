import{J as t,S as e,i as s,s as n,w as a,g as r,t as l,k as i,d as o,K as h,y as c,z as u,A as d,D as m,e as f,a as p,b as g,f as $,L as y,n as w,c as v,h as j,j as x,v as k,q as L,m as E,I as b,r as I,o as S,H as A,p as D,u as N,M,N as K}from"./client.2dc090e6.js";import{p as P,u as H}from"./url.dd36d5b3.js";import{t as T,a as Y,D as q}from"./Details.63a79d41.js";const O=["date","title","slug","lang"];class R{constructor(e,s){const{title:n,doctitle:a,summary:r,description:l,slug:i,keywords:o,lang:h,date:c,updated:u,modified:d,previewImage:m,author:f,otherLangs:p}=e;this.title=n||a,this.lang=h,this.summary=r||l,this.slug=i||T(s.split(".")[0]),this.keywords=R.buildKeywords(o),this.filename=s,this.modified=u||d||c,this.date=c||u||d,this.author=f||t,this.previewImage=m||"icons/icon-192x192.png",this.otherLangs=p,this.validate()}static buildKeywords(t){return"string"==typeof t?t.split(",").map(t=>t.trim()):t}get path(){return P(this.slug,this.lang)}get url(){return H(this.slug,this.lang)}get jsonLd(){return`{\n            "@context": "https://schema.org",\n            "@type": "Article",\n            "mainEntityOfPage": {\n              "@type": "Webpage",\n              "@id": "https://google.com/article"\n            },\n            "headline": "${this.title}",\n            "alternativeHeadline": "${this.summary}",\n            "description": "${this.summary}",\n            "image": "${this.previewImage}",\n            "datePublished": "${this.date}",\n            "dateModified": "${this.modified}",\n            "keywords": "${this.keywords}",\n            "author": {\n              "@type": "Person",\n              "name": "${this.author}"\n            },\n            "publisher": "${this.author}"\n        }`}get jsonLdScript(){return`<script type="application/ld+json">${this.jsonLd}<\/script>`}validate(){O.forEach(t=>this._validate(t))}_validate(t){if(!this[t])throw`[${this.path}] Invalid post data: [${t}] field required`}}function U(t){return t.substring(0,10)}function _(t){let e;const s=new h({props:{href:`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}: ${t[1]}&hashtags=${t[3].join(",")}`,title:`Share "${t[0]}"`,icon:"twitter"}});return{c(){c(s.$$.fragment)},l(t){u(s.$$.fragment,t)},m(t,n){d(s,t,n),e=!0},p(t,e){const n={};15&e&&(n.href=`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}: ${t[1]}&hashtags=${t[3].join(",")}`),1&e&&(n.title=`Share "${t[0]}"`),s.$set(n)},i(t){e||(l(s.$$.fragment,t),e=!0)},o(t){i(s.$$.fragment,t),e=!1},d(t){m(s,t)}}}function z(t){let e,s;return{c(){e=f("button"),this.h()},l(t){e=p(t,"BUTTON",{title:!0,class:!0}),g(e).forEach(o),this.h()},h(){$(e,"title",t[0]),$(e,"class","svelte-1aekmf3")},m(n,a,l){r(n,e,a),l&&s(),s=y(e,"click",t[5])},p(t,s){1&s&&$(e,"title",t[0])},i:w,o:w,d(t){t&&o(e),s()}}}function B(t){let e,s,n,h;const c=[z,_],u=[];return e=function(t,e){return t[4]?0:1}(t),s=u[e]=c[e](t),{c(){s.c(),n=a()},l(t){s.l(t),n=a()},m(t,s){u[e].m(t,s),r(t,n,s),h=!0},p(t,[e]){s.p(t,e)},i(t){h||(l(s),h=!0)},o(t){i(s),h=!1},d(t){u[e].d(t),t&&o(n)}}}function J(t,e,s){let{title:n}=e,{text:a}=e,{url:r}=e,{keywords:l=[]}=e;const i="undefined"!=typeof navigator&&navigator.share;return t.$set=(t=>{"title"in t&&s(0,n=t.title),"text"in t&&s(1,a=t.text),"url"in t&&s(2,r=t.url),"keywords"in t&&s(3,l=t.keywords)}),[n,a,r,l,i,async function(){try{await navigator.share({title:n,text:a+Y(l),url:r})}catch(t){console.error("Sharing",t)}}]}class V extends e{constructor(t){super(),s(this,t,J,B,n,{title:0,text:1,url:2,keywords:3})}}function W(t){let e,s;const n=t[1].default,a=v(n,t,t[0],null),h=a||{c:w,l:w,m:w,d:w};return{c(){e=f("div"),h&&h.c(),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=g(e);h&&h.l(s),s.forEach(o),this.h()},h(){$(e,"class","content svelte-1gb6nlh")},m(t,n){r(t,e,n),h&&h.m(e,null),s=!0},p(t,[e]){a&&a.p&&1&e&&a.p(j(n,t,t[0],null),x(n,t[0],e,null))},i(t){s||(l(h,t),s=!0)},o(t){i(h,t),s=!1},d(t){t&&o(e),h&&h.d(t)}}}function C(t,e,s){let{$$slots:n={},$$scope:a}=e;return t.$set=(t=>{"$$scope"in t&&s(0,a=t.$$scope)}),[a,n]}class F extends e{constructor(t){super(),s(this,t,C,W,n,{})}}const{document:G}=K;function Q(t,e,s){const n=t.slice();return n[3]=e[s],n}function X(t){let e,s=t[0].otherLangs,n=[];for(let e=0;e<s.length;e+=1)n[e]=Z(Q(t,s,e));return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=a()},l(t){for(let e=0;e<n.length;e+=1)n[e].l(t);e=a()},m(t,s){for(let e=0;e<n.length;e+=1)n[e].m(t,s);r(t,e,s)},p(t,a){if(1&a){let r;for(s=t[0].otherLangs,r=0;r<s.length;r+=1){const l=Q(t,s,r);n[r]?n[r].p(l,a):(n[r]=Z(l),n[r].c(),n[r].m(e.parentNode,e))}for(;r<n.length;r+=1)n[r].d(1);n.length=s.length}},d(t){k(n,t),t&&o(e)}}}function Z(t){let e,s,n;return{c(){e=f("link"),this.h()},l(t){e=p(t,"LINK",{rel:!0,hreflang:!0,href:!0}),this.h()},h(){$(e,"rel","alternate"),$(e,"hreflang",s=t[3]),$(e,"href",n=P(t[0].slug,t[3]))},m(t,s){r(t,e,s)},p(t,a){1&a&&s!==(s=t[3])&&$(e,"hreflang",s),1&a&&n!==(n=P(t[0].slug,t[3]))&&$(e,"href",n)},d(t){t&&o(e)}}}function tt(t){let e;return{c(){this.h()},l(t){this.h()},h(){e=new A(t[1],null)},m(t,s){e.m(t,s)},p(t,s){2&s&&e.p(t[1])},d(t){t&&e.d()}}}function et(t){let e,s,n,h,y,w,v,j,x,k,M,K,P,T,Y,O,R,_,z,B,J=t[0].title+"",W=t[0].summary+"";G.title=e=t[0].title;let C=t[0].otherLangs&&t[0].otherLangs.length>0&&X(t);const Q=new V({props:{title:t[0].title,keywords:t[0].keywords,text:t[0].summary,url:H(t[0].slug,t[0].lang)}}),Z=new q({props:{post:t[0]}}),et=new F({props:{$$slots:{default:[tt]},$$scope:{ctx:t}}});return{c(){n=a(),h=f("meta"),w=f("meta"),C&&C.c(),j=f("link"),x=L(),k=f("header"),M=f("h1"),K=E(J),P=L(),T=f("span"),c(Q.$$.fragment),Y=L(),O=f("p"),R=E(W),_=L(),c(Z.$$.fragment),z=L(),c(et.$$.fragment),this.h()},l(t){const e=b('[data-svelte="svelte-1evxcub"]',G.head);n=a(),h=p(e,"META",{name:!0,content:!0,scheme:!0}),w=p(e,"META",{name:!0,content:!0}),C&&C.l(e),j=p(e,"LINK",{rel:!0,href:!0,as:!0,onload:!0}),e.forEach(o),x=I(t),k=p(t,"HEADER",{class:!0});var s=g(k);M=p(s,"H1",{class:!0});var r=g(M);K=S(r,J),P=I(r),T=p(r,"SPAN",{class:!0});var l=g(T);u(Q.$$.fragment,l),l.forEach(o),r.forEach(o),Y=I(s),O=p(s,"P",{class:!0});var i=g(O);R=S(i,W),i.forEach(o),_=I(s),u(Z.$$.fragment,s),s.forEach(o),z=I(t),u(et.$$.fragment,t),this.h()},h(){s=new A(t[2],null),$(h,"name","date"),$(h,"content",y=U(t[0].date)),$(h,"scheme","YYYY-MM-DD"),$(w,"name","description"),$(w,"content",v=t[0].summary),$(j,"rel","preload"),$(j,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css"),$(j,"as","style"),$(j,"onload","this.onload=null;this.rel='stylesheet'"),$(T,"class","share svelte-1svctju"),$(M,"class","svelte-1svctju"),$(O,"class","summary svelte-1svctju"),$(k,"class","svelte-1svctju")},m(t,e){s.m(G.head),D(G.head,n),D(G.head,h),D(G.head,w),C&&C.m(G.head,null),D(G.head,j),r(t,x,e),r(t,k,e),D(k,M),D(M,K),D(M,P),D(M,T),d(Q,T,null),D(k,Y),D(k,O),D(O,R),D(k,_),d(Z,k,null),r(t,z,e),d(et,t,e),B=!0},p(t,[s]){(!B||1&s)&&e!==(e=t[0].title)&&(G.title=e),(!B||1&s&&y!==(y=U(t[0].date)))&&$(h,"content",y),(!B||1&s&&v!==(v=t[0].summary))&&$(w,"content",v),t[0].otherLangs&&t[0].otherLangs.length>0?C?C.p(t,s):((C=X(t)).c(),C.m(j.parentNode,j)):C&&(C.d(1),C=null),(!B||1&s)&&J!==(J=t[0].title+"")&&N(K,J);const n={};1&s&&(n.title=t[0].title),1&s&&(n.keywords=t[0].keywords),1&s&&(n.text=t[0].summary),1&s&&(n.url=H(t[0].slug,t[0].lang)),Q.$set(n),(!B||1&s)&&W!==(W=t[0].summary+"")&&N(R,W);const a={};1&s&&(a.post=t[0]),Z.$set(a);const r={};66&s&&(r.$$scope={dirty:s,ctx:t}),et.$set(r)},i(t){B||(l(Q.$$.fragment,t),l(Z.$$.fragment,t),l(et.$$.fragment,t),B=!0)},o(t){i(Q.$$.fragment,t),i(Z.$$.fragment,t),i(et.$$.fragment,t),B=!1},d(t){o(n),t&&s.d(),o(h),o(w),C&&C.d(t),o(j),t&&o(x),t&&o(k),m(Q),m(Z),t&&o(z),m(et,t)}}}async function st({params:t}){const[e,s]=t.slug,n=await this.fetch(`${P(e,s)}.json`),a=await n.json(),{entry:r,html:l}=a;if(200===n.status){if(s)return{post:new R(r),html:l};this.redirect(302,P(e,r.lang))}else this.error(n.status,a.message);return!1}function nt(t,e,s){M(async()=>{[...document.querySelectorAll('a[href^="#"]')].map(t=>t.href=document.location+new URL(t.href).hash)});let{post:n}=e,{html:a}=e,r=n.jsonLdScript;return t.$set=(t=>{"post"in t&&s(0,n=t.post),"html"in t&&s(1,a=t.html)}),[n,a,r]}export default class extends e{constructor(t){super(),s(this,t,nt,et,n,{post:0,html:1})}}export{st as preload};
