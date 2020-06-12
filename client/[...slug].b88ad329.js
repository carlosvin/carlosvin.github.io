import{I as t,S as e,i as s,s as n,v as a,f as r,q as l,r as i,d as o,J as h,m as c,o as u,p as d,u as m,e as f,c as p,a as g,b as $,K as y,n as w,z as v,A as j,y as x,j as k,t as L,F as E,k as b,g as S,h as A,l as D,L as M,M as N,H as I}from"./client.f8b163af.js";import{p as K,u as P}from"./url.cf2a19fc.js";import{t as H,a as T,D as Y}from"./Details.8fdf693d.js";const q=["date","title","slug","lang"];class O{constructor(e,s){const{title:n,doctitle:a,summary:r,description:l,slug:i,keywords:o,lang:h,date:c,updated:u,modified:d,previewimage:m,author:f,otherLangs:p}=e;this.title=n||a,this.lang=h,this.summary=r||l,this.slug=i||H(s.split(".")[0]),this.keywords=O.buildKeywords(o),this.filename=s,this.modified=u||d||c,this.date=c||u||d,this.author=f||t,this.previewimage=m||"icons/icon-192x192.png",this.otherLangs=p,this.validate()}static buildKeywords(t){return"string"==typeof t?t.split(",").map(t=>t.trim()):t}get path(){return K(this.slug,this.lang)}get url(){return P(this.slug,this.lang)}get jsonLd(){return`{\n            "@context": "https://schema.org",\n            "@type": "Article",\n            "mainEntityOfPage": {\n              "@type": "Webpage",\n              "@id": "https://google.com/article"\n            },\n            "headline": "${this.title}",\n            "alternativeHeadline": "${this.summary}",\n            "description": "${this.summary}",\n            "image": "${this.previewimage}",\n            "datePublished": "${this.date}",\n            "dateModified": "${this.modified}",\n            "keywords": "${this.keywords}",\n            "author": {\n              "@type": "Person",\n              "name": "${this.author}"\n            },\n            "publisher": "${this.author}"\n        }`}get jsonLdScript(){return`<script type="application/ld+json">${this.jsonLd}<\/script>`}validate(){q.forEach(t=>this._validate(t))}_validate(t){if(!this[t])throw`[${this.path}] Invalid post data: [${t}] field required`}}function R(t){return t.substring(0,10)}function U(t){let e,s;return e=new h({props:{href:`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}: ${t[1]}&hashtags=${t[3].join(",")}`,title:`Share "${t[0]}"`,icon:"twitter"}}),{c(){c(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,n){d(e,t,n),s=!0},p(t,s){const n={};15&s&&(n.href=`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}: ${t[1]}&hashtags=${t[3].join(",")}`),1&s&&(n.title=`Share "${t[0]}"`),e.$set(n)},i(t){s||(l(e.$$.fragment,t),s=!0)},o(t){i(e.$$.fragment,t),s=!1},d(t){m(e,t)}}}function _(t){let e,s,n;return{c(){e=f("button"),this.h()},l(t){e=p(t,"BUTTON",{title:!0,class:!0}),g(e).forEach(o),this.h()},h(){$(e,"title",t[0]),$(e,"class","svelte-1aekmf3")},m(a,l){r(a,e,l),s||(n=y(e,"click",t[5]),s=!0)},p(t,s){1&s&&$(e,"title",t[0])},i:w,o:w,d(t){t&&o(e),s=!1,n()}}}function z(t){let e,s,n,h;const c=[_,U],u=[];return e=function(t,e){return t[4]?0:1}(t),s=u[e]=c[e](t),{c(){s.c(),n=a()},l(t){s.l(t),n=a()},m(t,s){u[e].m(t,s),r(t,n,s),h=!0},p(t,[e]){s.p(t,e)},i(t){h||(l(s),h=!0)},o(t){i(s),h=!1},d(t){u[e].d(t),t&&o(n)}}}function B(t,e,s){let{title:n}=e,{text:a}=e,{url:r}=e,{keywords:l=[]}=e;const i="undefined"!=typeof navigator&&navigator.share;return t.$set=t=>{"title"in t&&s(0,n=t.title),"text"in t&&s(1,a=t.text),"url"in t&&s(2,r=t.url),"keywords"in t&&s(3,l=t.keywords)},[n,a,r,l,i,async function(){try{await navigator.share({title:n,text:a+T(l),url:r})}catch(t){console.error("Sharing",t)}}]}class F extends e{constructor(t){super(),s(this,t,B,z,n,{title:0,text:1,url:2,keywords:3})}}function J(t){let e,s;const n=t[1].default,a=v(n,t,t[0],null);return{c(){e=f("div"),a&&a.c(),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=g(e);a&&a.l(s),s.forEach(o),this.h()},h(){$(e,"class","content svelte-1gb6nlh")},m(t,n){r(t,e,n),a&&a.m(e,null),s=!0},p(t,[e]){a&&a.p&&1&e&&j(a,n,t,t[0],e,null,null)},i(t){s||(l(a,t),s=!0)},o(t){i(a,t),s=!1},d(t){t&&o(e),a&&a.d(t)}}}function V(t,e,s){let{$$slots:n={},$$scope:a}=e;return t.$set=t=>{"$$scope"in t&&s(0,a=t.$$scope)},[a,n]}class W extends e{constructor(t){super(),s(this,t,V,J,n,{})}}const{document:C}=N;function G(t,e,s){const n=t.slice();return n[3]=e[s],n}function Q(t){let e,s=t[0].otherLangs,n=[];for(let e=0;e<s.length;e+=1)n[e]=X(G(t,s,e));return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=a()},l(t){for(let e=0;e<n.length;e+=1)n[e].l(t);e=a()},m(t,s){for(let e=0;e<n.length;e+=1)n[e].m(t,s);r(t,e,s)},p(t,a){if(1&a){let r;for(s=t[0].otherLangs,r=0;r<s.length;r+=1){const l=G(t,s,r);n[r]?n[r].p(l,a):(n[r]=X(l),n[r].c(),n[r].m(e.parentNode,e))}for(;r<n.length;r+=1)n[r].d(1);n.length=s.length}},d(t){x(n,t),t&&o(e)}}}function X(t){let e,s,n;return{c(){e=f("link"),this.h()},l(t){e=p(t,"LINK",{rel:!0,hreflang:!0,href:!0}),this.h()},h(){$(e,"rel","alternate"),$(e,"hreflang",s=t[3]),$(e,"href",n=K(t[0].slug,t[3]))},m(t,s){r(t,e,s)},p(t,a){1&a&&s!==(s=t[3])&&$(e,"hreflang",s),1&a&&n!==(n=K(t[0].slug,t[3]))&&$(e,"href",n)},d(t){t&&o(e)}}}function Z(t){let e;return{c(){this.h()},l(t){this.h()},h(){e=new I(null)},m(s,n){e.m(t[1],s,n)},p(t,s){2&s&&e.p(t[1])},d(t){t&&e.d()}}}function tt(t){let e,s,n,h,y,w,v,j,x,M,N,K,H,T,q,O,U,_,z,B,J,V,G,X=t[0].title+"",tt=t[0].summary+"";C.title=e=t[0].title;let et=t[0].otherLangs&&t[0].otherLangs.length>0&&Q(t);return q=new F({props:{title:t[0].title,keywords:t[0].keywords,text:t[0].summary,url:P(t[0].slug,t[0].lang)}}),B=new Y({props:{post:t[0]}}),V=new W({props:{$$slots:{default:[Z]},$$scope:{ctx:t}}}),{c(){n=a(),h=f("meta"),w=f("meta"),et&&et.c(),j=f("link"),x=k(),M=f("header"),N=f("h1"),K=L(X),H=k(),T=f("span"),c(q.$$.fragment),O=k(),U=f("p"),_=L(tt),z=k(),c(B.$$.fragment),J=k(),c(V.$$.fragment),this.h()},l(t){const e=E('[data-svelte="svelte-1evxcub"]',C.head);n=a(),h=p(e,"META",{name:!0,content:!0,scheme:!0}),w=p(e,"META",{name:!0,content:!0}),et&&et.l(e),j=p(e,"LINK",{rel:!0,href:!0,as:!0,onload:!0}),e.forEach(o),x=b(t),M=p(t,"HEADER",{class:!0});var s=g(M);N=p(s,"H1",{class:!0});var r=g(N);K=S(r,X),H=b(r),T=p(r,"SPAN",{class:!0});var l=g(T);u(q.$$.fragment,l),l.forEach(o),r.forEach(o),O=b(s),U=p(s,"P",{class:!0});var i=g(U);_=S(i,tt),i.forEach(o),z=b(s),u(B.$$.fragment,s),s.forEach(o),J=b(t),u(V.$$.fragment,t),this.h()},h(){s=new I(null),$(h,"name","date"),$(h,"content",y=R(t[0].date)),$(h,"scheme","YYYY-MM-DD"),$(w,"name","description"),$(w,"content",v=t[0].summary),$(j,"rel","preload"),$(j,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css"),$(j,"as","style"),$(j,"onload","this.onload=null;this.rel='stylesheet'"),$(T,"class","share svelte-1svctju"),$(N,"class","svelte-1svctju"),$(U,"class","summary svelte-1svctju"),$(M,"class","svelte-1svctju")},m(e,a){s.m(t[2],C.head),A(C.head,n),A(C.head,h),A(C.head,w),et&&et.m(C.head,null),A(C.head,j),r(e,x,a),r(e,M,a),A(M,N),A(N,K),A(N,H),A(N,T),d(q,T,null),A(M,O),A(M,U),A(U,_),A(M,z),d(B,M,null),r(e,J,a),d(V,e,a),G=!0},p(t,[s]){(!G||1&s)&&e!==(e=t[0].title)&&(C.title=e),(!G||1&s&&y!==(y=R(t[0].date)))&&$(h,"content",y),(!G||1&s&&v!==(v=t[0].summary))&&$(w,"content",v),t[0].otherLangs&&t[0].otherLangs.length>0?et?et.p(t,s):(et=Q(t),et.c(),et.m(j.parentNode,j)):et&&(et.d(1),et=null),(!G||1&s)&&X!==(X=t[0].title+"")&&D(K,X);const n={};1&s&&(n.title=t[0].title),1&s&&(n.keywords=t[0].keywords),1&s&&(n.text=t[0].summary),1&s&&(n.url=P(t[0].slug,t[0].lang)),q.$set(n),(!G||1&s)&&tt!==(tt=t[0].summary+"")&&D(_,tt);const a={};1&s&&(a.post=t[0]),B.$set(a);const r={};66&s&&(r.$$scope={dirty:s,ctx:t}),V.$set(r)},i(t){G||(l(q.$$.fragment,t),l(B.$$.fragment,t),l(V.$$.fragment,t),G=!0)},o(t){i(q.$$.fragment,t),i(B.$$.fragment,t),i(V.$$.fragment,t),G=!1},d(t){o(n),t&&s.d(),o(h),o(w),et&&et.d(t),o(j),t&&o(x),t&&o(M),m(q),m(B),t&&o(J),m(V,t)}}}async function et({params:t}){const[e,s]=t.slug,n=await this.fetch(K(e,s)+".json"),a=await n.json(),{entry:r,html:l}=a;if(200===n.status){if(s)return{post:new O(r),html:l};this.redirect(302,K(e,r.lang))}else this.error(n.status,a.message);return!1}function st(t,e,s){M(async()=>{[...document.querySelectorAll('a[href^="#"]')].map(t=>t.href=document.location+new URL(t.href).hash)});let{post:n}=e,{html:a}=e,r=n.jsonLdScript;return t.$set=t=>{"post"in t&&s(0,n=t.post),"html"in t&&s(1,a=t.html)},[n,a,r]}export default class extends e{constructor(t){super(),s(this,t,st,tt,n,{post:0,html:1})}}export{et as preload};
