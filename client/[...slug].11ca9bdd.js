import{S as t,i as e,s,o as n,k as a,t as r,l,d as o,O as c,c as i,g as h,m as u,n as f,e as m,b as p,v as $,h as d,z as g,A as y,B as w,C as v,G as x,a as k,u as E,q as j,f as D,w as L,j as P,x as S,P as b,Q as z,M as A}from"./client.45215d68.js";import{p as N,u as T}from"./url.840225ae.js";import{t as I,D as M}from"./Details.bb2650e6.js";function q(t=new Date){return t.toISOString().substring(0,10)}function O(t){let e,s;return e=new c({props:{href:`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}:&nbsp;${t[1]}&hashtags=${t[3].join(",")}`,title:`Share "${t[0]}"`,icon:"twitter"}}),{c(){i(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,n){u(e,t,n),s=!0},p(t,s){const n={};15&s&&(n.href=`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}:&nbsp;${t[1]}&hashtags=${t[3].join(",")}`),1&s&&(n.title=`Share "${t[0]}"`),e.$set(n)},i(t){s||(r(e.$$.fragment,t),s=!0)},o(t){l(e.$$.fragment,t),s=!1},d(t){f(e,t)}}}function B(t){let e,s,n;return{c(){e=m("button"),this.h()},l(t){e=p(t,"BUTTON",{title:!0,class:!0}),$(e).forEach(o),this.h()},h(){d(e,"title",t[0]),d(e,"class","svelte-1aekmf3")},m(r,l){a(r,e,l),s||(n=g(e,"click",t[5]),s=!0)},p(t,s){1&s&&d(e,"title",t[0])},i:y,o:y,d(t){t&&o(e),s=!1,n()}}}function H(t){let e,s,c,i;const h=[B,O],u=[];return e=function(t,e){return t[4]?0:1}(t),s=u[e]=h[e](t),{c(){s.c(),c=n()},l(t){s.l(t),c=n()},m(t,s){u[e].m(t,s),a(t,c,s),i=!0},p(t,[e]){s.p(t,e)},i(t){i||(r(s),i=!0)},o(t){l(s),i=!1},d(t){u[e].d(t),t&&o(c)}}}function K(t,e,s){let{title:n}=e,{text:a}=e,{url:r}=e,{keywords:l=[]}=e;const o="undefined"!=typeof navigator&&navigator.share;return t.$$set=t=>{"title"in t&&s(0,n=t.title),"text"in t&&s(1,a=t.text),"url"in t&&s(2,r=t.url),"keywords"in t&&s(3,l=t.keywords)},[n,a,r,l,o,async function(){try{await navigator.share({title:n,text:a+I(l),url:r})}catch(t){console.error("Sharing",t)}}]}class R extends t{constructor(t){super(),e(this,t,K,H,s,{title:0,text:1,url:2,keywords:3})}}function U(t){let e,s;const n=t[1].default,c=w(n,t,t[0],null);return{c(){e=m("div"),c&&c.c(),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=$(e);c&&c.l(s),s.forEach(o),this.h()},h(){d(e,"class","content svelte-1yzd9zi")},m(t,n){a(t,e,n),c&&c.m(e,null),s=!0},p(t,[e]){c&&c.p&&1&e&&v(c,n,t,t[0],e,null,null)},i(t){s||(r(c,t),s=!0)},o(t){l(c,t),s=!1},d(t){t&&o(e),c&&c.d(t)}}}function C(t,e,s){let{$$slots:n={},$$scope:a}=e;return t.$$set=t=>{"$$scope"in t&&s(0,a=t.$$scope)},[a,n]}class G extends t{constructor(t){super(),e(this,t,C,U,s,{})}}const{document:Q}=z;function V(t,e,s){const n=t.slice();return n[3]=e[s],n}function F(t){let e,s=t[0].otherLangs,r=[];for(let e=0;e<s.length;e+=1)r[e]=J(V(t,s,e));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=n()},l(t){for(let e=0;e<r.length;e+=1)r[e].l(t);e=n()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);a(t,e,s)},p(t,n){if(1&n){let a;for(s=t[0].otherLangs,a=0;a<s.length;a+=1){const l=V(t,s,a);r[a]?r[a].p(l,n):(r[a]=J(l),r[a].c(),r[a].m(e.parentNode,e))}for(;a<r.length;a+=1)r[a].d(1);r.length=s.length}},d(t){x(r,t),t&&o(e)}}}function J(t){let e,s,n;return{c(){e=m("link"),this.h()},l(t){e=p(t,"LINK",{rel:!0,hreflang:!0,href:!0}),this.h()},h(){d(e,"rel","alternate"),d(e,"hreflang",s=t[3]),d(e,"href",n=N(t[0].slug,t[3]))},m(t,s){a(t,e,s)},p(t,a){1&a&&s!==(s=t[3])&&d(e,"hreflang",s),1&a&&n!==(n=N(t[0].slug,t[3]))&&d(e,"href",n)},d(t){t&&o(e)}}}function W(t){let e,s;return{c(){s=n(),this.h()},l(t){s=n(),this.h()},h(){e=new A(s)},m(n,r){e.m(t[1],n,r),a(n,s,r)},p(t,s){2&s&&e.p(t[1])},d(t){t&&o(s),t&&e.d()}}}function X(t){let e,s,n,c,g,y,w,v,x,b,z,A,N,I,O,B,H,K,U,C,V,J,X,Y,Z=t[0].title+"",_=t[0].summary+"";Q.title=e=t[0].title;let tt=t[0].otherLangs&&t[0].otherLangs.length>0&&F(t);return B=new R({props:{title:t[0].title,keywords:t[0].keywords,text:t[0].summary,url:T(t[0].slug,t[0].lang)}}),V=new M({props:{post:t[0]}}),X=new G({props:{$$slots:{default:[W]},$$scope:{ctx:t}}}),{c(){s=m("meta"),c=m("meta"),y=m("meta"),tt&&tt.c(),v=m("link"),b=k(),z=m("header"),A=m("h1"),N=E(Z),I=k(),O=m("span"),i(B.$$.fragment),H=k(),K=m("p"),U=E(_),C=k(),i(V.$$.fragment),J=k(),i(X.$$.fragment),this.h()},l(t){const e=j('[data-svelte="svelte-185qacl"]',Q.head);s=p(e,"META",{name:!0,content:!0}),c=p(e,"META",{name:!0,content:!0}),y=p(e,"META",{name:!0,content:!0}),tt&&tt.l(e),v=p(e,"LINK",{rel:!0,href:!0,type:!0}),e.forEach(o),b=D(t),z=p(t,"HEADER",{class:!0});var n=$(z);A=p(n,"H1",{class:!0});var a=$(A);N=L(a,Z),I=D(a),O=p(a,"SPAN",{class:!0});var r=$(O);h(B.$$.fragment,r),r.forEach(o),a.forEach(o),H=D(n),K=p(n,"P",{class:!0});var l=$(K);U=L(l,_),l.forEach(o),C=D(n),h(V.$$.fragment,n),n.forEach(o),J=D(t),h(X.$$.fragment,t),this.h()},h(){d(s,"name","date.created"),d(s,"content",n=q(new Date(t[0].created))),d(c,"name","date.updated"),d(c,"content",g=q(new Date(t[0].modified))),d(y,"name","description"),d(y,"content",w=t[0].summary),d(v,"rel","alternate"),d(v,"href",x=t[2]+".jsonld"),d(v,"type","application/ld+json"),d(O,"class","share svelte-5fppzy"),d(A,"class","svelte-5fppzy"),d(K,"class","summary svelte-5fppzy"),d(z,"class","svelte-5fppzy")},m(t,e){P(Q.head,s),P(Q.head,c),P(Q.head,y),tt&&tt.m(Q.head,null),P(Q.head,v),a(t,b,e),a(t,z,e),P(z,A),P(A,N),P(A,I),P(A,O),u(B,O,null),P(z,H),P(z,K),P(K,U),P(z,C),u(V,z,null),a(t,J,e),u(X,t,e),Y=!0},p(t,[a]){(!Y||1&a)&&e!==(e=t[0].title)&&(Q.title=e),(!Y||1&a&&n!==(n=q(new Date(t[0].created))))&&d(s,"content",n),(!Y||1&a&&g!==(g=q(new Date(t[0].modified))))&&d(c,"content",g),(!Y||1&a&&w!==(w=t[0].summary))&&d(y,"content",w),t[0].otherLangs&&t[0].otherLangs.length>0?tt?tt.p(t,a):(tt=F(t),tt.c(),tt.m(v.parentNode,v)):tt&&(tt.d(1),tt=null),(!Y||4&a&&x!==(x=t[2]+".jsonld"))&&d(v,"href",x),(!Y||1&a)&&Z!==(Z=t[0].title+"")&&S(N,Z);const r={};1&a&&(r.title=t[0].title),1&a&&(r.keywords=t[0].keywords),1&a&&(r.text=t[0].summary),1&a&&(r.url=T(t[0].slug,t[0].lang)),B.$set(r),(!Y||1&a)&&_!==(_=t[0].summary+"")&&S(U,_);const l={};1&a&&(l.post=t[0]),V.$set(l);const o={};66&a&&(o.$$scope={dirty:a,ctx:t}),X.$set(o)},i(t){Y||(r(B.$$.fragment,t),r(V.$$.fragment,t),r(X.$$.fragment,t),Y=!0)},o(t){l(B.$$.fragment,t),l(V.$$.fragment,t),l(X.$$.fragment,t),Y=!1},d(t){o(s),o(c),o(y),tt&&tt.d(t),o(v),t&&o(b),t&&o(z),f(B),f(V),t&&o(J),f(X,t)}}}async function Y({params:t}){const[e,s]=t.slug,n=N(e,s),a=await this.fetch(n+".json"),r=await a.json(),{entry:l,html:o}=r;return 200===a.status?s?{html:o,post:l,postPath:n}:this.redirect(301,N(e,l.lang)):this.error(a.status,r.message)}function Z(t,e,s){b(async()=>{document.querySelectorAll('a[href^="#"]').forEach(t=>t.href=document.location+new URL(t.href).hash)});let{post:n}=e,{html:a}=e,{postPath:r}=e;return t.$$set=t=>{"post"in t&&s(0,n=t.post),"html"in t&&s(1,a=t.html),"postPath"in t&&s(2,r=t.postPath)},[n,a,r]}export default class extends t{constructor(t){super(),e(this,t,Z,X,s,{post:0,html:1,postPath:2})}}export{Y as preload};