import{S as t,i as e,s as n,l as s,f as r,x as a,u as o,d as c,j as l,m as i,o as h,v as u,e as m,c as f,a as p,b as d,J as $,M as g,D as v,F as w,G as y,H as k,U as x,k as j,t as E,N as S,n as I,g as b,E as D,h as L,V as N,W as T,K as A}from"../../../../chunks/vendor-2fc700c3.js";import{p as O}from"../../../../chunks/url-28a36952.js";import{t as P,D as M}from"../../../../chunks/Details-b0197738.js";import{I as H}from"../../../../chunks/IconLink-a7fb99ba.js";import"../../../../chunks/conf-318ca8e3.js";function K(t){let e,n;return e=new H({props:{href:`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}:&nbsp;${t[1]}&hashtags=${t[3].join(",")}`,title:`Share "${t[0]}"`,icon:"twitter"}}),{c(){l(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){h(e,t,s),n=!0},p(t,n){const s={};15&n&&(s.href=`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}:&nbsp;${t[1]}&hashtags=${t[3].join(",")}`),1&n&&(s.title=`Share "${t[0]}"`),e.$set(s)},i(t){n||(a(e.$$.fragment,t),n=!0)},o(t){o(e.$$.fragment,t),n=!1},d(t){u(e,t)}}}function V(t){let e,n,s;return{c(){e=m("button"),this.h()},l(t){e=f(t,"BUTTON",{title:!0,type:!0,class:!0}),p(e).forEach(c),this.h()},h(){d(e,"title",t[0]),d(e,"type","button"),d(e,"class","svelte-1aekmf3")},m(a,o){r(a,e,o),n||(s=$(e,"click",t[5]),n=!0)},p(t,n){1&n&&d(e,"title",t[0])},i:g,o:g,d(t){t&&c(e),n=!1,s()}}}function C(t){let e,n,l,i;const h=[V,K],u=[];return e=t[4]?0:1,n=u[e]=h[e](t),{c(){n.c(),l=s()},l(t){n.l(t),l=s()},m(t,n){u[e].m(t,n),r(t,l,n),i=!0},p(t,[e]){n.p(t,e)},i(t){i||(a(n),i=!0)},o(t){o(n),i=!1},d(t){u[e].d(t),t&&c(l)}}}function R(t,e,n){var s=this&&this.__awaiter||function(t,e,n,s){return new(n||(n=Promise))((function(r,a){function o(t){try{l(s.next(t))}catch(e){a(e)}}function c(t){try{l(s.throw(t))}catch(e){a(e)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,c)}l((s=s.apply(t,e||[])).next())}))};let{title:r}=e,{text:a}=e,{url:o}=e,{keywords:c=[]}=e;const l="undefined"!=typeof navigator&&navigator.share;return t.$$set=t=>{"title"in t&&n(0,r=t.title),"text"in t&&n(1,a=t.text),"url"in t&&n(2,o=t.url),"keywords"in t&&n(3,c=t.keywords)},[r,a,o,c,l,function(){return s(this,void 0,void 0,(function*(){try{yield navigator.share({title:r,text:a+P(c),url:o})}catch(t){console.error("Sharing",t)}}))}]}class U extends t{constructor(t){super(),e(this,t,R,C,n,{title:0,text:1,url:2,keywords:3})}}function _(t){let e,n;const s=t[1].default,l=v(s,t,t[0],null);return{c(){e=m("div"),l&&l.c(),this.h()},l(t){e=f(t,"DIV",{class:!0});var n=p(e);l&&l.l(n),n.forEach(c),this.h()},h(){d(e,"class","postContent")},m(t,s){r(t,e,s),l&&l.m(e,null),n=!0},p(t,[e]){l&&l.p&&(!n||1&e)&&w(l,s,t,t[0],n?k(s,t[0],e,null):y(t[0]),null)},i(t){n||(a(l,t),n=!0)},o(t){o(l,t),n=!1},d(t){t&&c(e),l&&l.d(t)}}}function B(t,e,n){let{$$slots:s={},$$scope:r}=e;return t.$$set=t=>{"$$scope"in t&&n(0,r=t.$$scope)},[r,s]}class F extends t{constructor(t){super(),e(this,t,B,_,n,{})}}function G(t,e,n){const s=t.slice();return s[2]=e[n],s}function J(t){let e,n=t[0].otherLangs,a=[];for(let s=0;s<n.length;s+=1)a[s]=W(G(t,n,s));return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=s()},l(t){for(let e=0;e<a.length;e+=1)a[e].l(t);e=s()},m(t,n){for(let e=0;e<a.length;e+=1)a[e].m(t,n);r(t,e,n)},p(t,s){if(1&s){let r;for(n=t[0].otherLangs,r=0;r<n.length;r+=1){const o=G(t,n,r);a[r]?a[r].p(o,s):(a[r]=W(o),a[r].c(),a[r].m(e.parentNode,e))}for(;r<a.length;r+=1)a[r].d(1);a.length=n.length}},d(t){x(a,t),t&&c(e)}}}function W(t){let e,n,s;return{c(){e=m("link"),this.h()},l(t){e=f(t,"LINK",{rel:!0,hreflang:!0,href:!0}),this.h()},h(){d(e,"rel","alternate"),d(e,"hreflang",n=t[2]),d(e,"href",s=O(t[0].slug,t[2]))},m(t,n){r(t,e,n)},p(t,r){1&r&&n!==(n=t[2])&&d(e,"hreflang",n),1&r&&s!==(s=O(t[0].slug,t[2]))&&d(e,"href",s)},d(t){t&&c(e)}}}function q(t){let e,n,s,a,o;return{c(){e=new N,n=j(),s=m("div"),a=m("script"),this.h()},l(t){e=T(t),n=I(t),s=f(t,"DIV",{class:!0});var r=p(s);a=f(r,"SCRIPT",{src:!0,repo:!0,"issue-term":!0,theme:!0,crossorigin:!0}),p(a).forEach(c),r.forEach(c),this.h()},h(){e.a=n,A(a.src,o="https://utteranc.es/client.js")||d(a,"src","https://utteranc.es/client.js"),d(a,"repo","carlosvin/carlosvin.github.io"),d(a,"issue-term","pathname"),d(a,"theme","github-light"),d(a,"crossorigin","anonymous"),a.async=!0,d(s,"class","comments")},m(o,c){e.m(t[1],o,c),r(o,n,c),r(o,s,c),D(s,a)},p(t,n){2&n&&e.p(t[1])},d(t){t&&e.d(),t&&c(n),t&&c(s)}}}function z(t){let e,n,s,$,g,v,w,y,k,x,N,T,A,O,P,H,K,V,C,R,_,B,G,W,z=t[0].title+"",Q=t[0].summary+"";document.title=e=t[0].title;let X=t[0].otherLangs&&t[0].otherLangs.length>0&&J(t);return H=new U({props:{title:t[0].title,keywords:t[0].keywords,text:t[0].summary,url:t[0].path}}),_=new M({props:{post:t[0]}}),G=new F({props:{$$slots:{default:[q]},$$scope:{ctx:t}}}),{c(){n=m("meta"),$=m("meta"),v=m("meta"),X&&X.c(),y=m("link"),x=j(),N=m("header"),T=m("h1"),A=E(z),O=j(),P=m("span"),l(H.$$.fragment),K=j(),V=m("p"),C=E(Q),R=j(),l(_.$$.fragment),B=j(),l(G.$$.fragment),this.h()},l(t){const e=S('[data-svelte="svelte-1lps7vh"]',document.head);n=f(e,"META",{name:!0,content:!0}),$=f(e,"META",{name:!0,content:!0}),v=f(e,"META",{name:!0,content:!0}),X&&X.l(e),y=f(e,"LINK",{rel:!0,href:!0,type:!0}),e.forEach(c),x=I(t),N=f(t,"HEADER",{class:!0});var s=p(N);T=f(s,"H1",{class:!0});var r=p(T);A=b(r,z),O=I(r),P=f(r,"SPAN",{class:!0});var a=p(P);i(H.$$.fragment,a),a.forEach(c),r.forEach(c),K=I(s),V=f(s,"P",{class:!0});var o=p(V);C=b(o,Q),o.forEach(c),R=I(s),i(_.$$.fragment,s),s.forEach(c),B=I(t),i(G.$$.fragment,t),this.h()},h(){d(n,"name","date.created"),d(n,"content",s=new Date(t[0].created).toISOString()),d($,"name","date.updated"),d($,"content",g=new Date(t[0].modified).toISOString()),d(v,"name","description"),d(v,"content",w=t[0].summary),d(y,"rel","alternate"),d(y,"href",k=t[0].path+".ld.json"),d(y,"type","application/ld+json"),d(P,"class","share svelte-1ikjkmw"),d(T,"class","svelte-1ikjkmw"),d(V,"class","summary svelte-1ikjkmw"),d(N,"class","svelte-1ikjkmw")},m(t,e){D(document.head,n),D(document.head,$),D(document.head,v),X&&X.m(document.head,null),D(document.head,y),r(t,x,e),r(t,N,e),D(N,T),D(T,A),D(T,O),D(T,P),h(H,P,null),D(N,K),D(N,V),D(V,C),D(N,R),h(_,N,null),r(t,B,e),h(G,t,e),W=!0},p(t,[r]){(!W||1&r)&&e!==(e=t[0].title)&&(document.title=e),(!W||1&r&&s!==(s=new Date(t[0].created).toISOString()))&&d(n,"content",s),(!W||1&r&&g!==(g=new Date(t[0].modified).toISOString()))&&d($,"content",g),(!W||1&r&&w!==(w=t[0].summary))&&d(v,"content",w),t[0].otherLangs&&t[0].otherLangs.length>0?X?X.p(t,r):(X=J(t),X.c(),X.m(y.parentNode,y)):X&&(X.d(1),X=null),(!W||1&r&&k!==(k=t[0].path+".ld.json"))&&d(y,"href",k),(!W||1&r)&&z!==(z=t[0].title+"")&&L(A,z);const a={};1&r&&(a.title=t[0].title),1&r&&(a.keywords=t[0].keywords),1&r&&(a.text=t[0].summary),1&r&&(a.url=t[0].path),H.$set(a),(!W||1&r)&&Q!==(Q=t[0].summary+"")&&L(C,Q);const o={};1&r&&(o.post=t[0]),_.$set(o);const c={};34&r&&(c.$$scope={dirty:r,ctx:t}),G.$set(c)},i(t){W||(a(H.$$.fragment,t),a(_.$$.fragment,t),a(G.$$.fragment,t),W=!0)},o(t){o(H.$$.fragment,t),o(_.$$.fragment,t),o(G.$$.fragment,t),W=!1},d(t){c(n),c($),c(v),X&&X.d(t),c(y),t&&c(x),t&&c(N),u(H),u(_),t&&c(B),u(G,t)}}}var Q=function(t,e,n,s){return new(n||(n=Promise))((function(r,a){function o(t){try{l(s.next(t))}catch(e){a(e)}}function c(t){try{l(s.throw(t))}catch(e){a(e)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,c)}l((s=s.apply(t,e||[])).next())}))};function X({page:t,fetch:e}){return Q(this,void 0,void 0,(function*(){const{props:n,html:s}=yield(yield e(`${t.path}.json`)).json();return{props:{props:n,html:s}}}))}function Y(t,e,n){let{props:s}=e,{html:r}=e;return t.$$set=t=>{"props"in t&&n(0,s=t.props),"html"in t&&n(1,r=t.html)},[s,r]}class Z extends t{constructor(t){super(),e(this,t,Y,z,n,{props:0,html:1})}}export{Z as default,X as load};
