import{S as e,i as t,s,D as n,e as a,c as l,a as r,d as $,b as c,f as o,E as f,F as i,G as u,H as g,x as m,u as p,j as h,k as d,t as x,m as v,n as b,g as y,I as N,o as E,J as k,r as w,w as I,v as j,K as z,h as A,L as S}from"../chunks/vendor-2fc700c3.js";import{I as L,l as T}from"../chunks/lang-705e888d.js";import{S as U}from"../chunks/Social-621e8076.js";import{I as C}from"../chunks/IconLink-a7fb99ba.js";import"../chunks/conf-318ca8e3.js";function G(e){let t,s,h;const d=e[4].default,x=n(d,e,e[3],null);return{c(){t=a("li"),s=a("a"),x&&x.c(),this.h()},l(e){t=l(e,"LI",{class:!0});var n=r(t);s=l(n,"A",{"aria-current":!0,href:!0,rel:!0,class:!0});var a=r(s);x&&x.l(a),a.forEach($),n.forEach($),this.h()},h(){c(s,"aria-current",e[1]),c(s,"href",e[0]),c(s,"rel","prefetch"),c(s,"class","svelte-1ttgpb1"),c(t,"class","svelte-1ttgpb1")},m(e,n){o(e,t,n),f(t,s),x&&x.m(s,null),h=!0},p(e,[t]){x&&x.p&&(!h||8&t)&&i(x,d,e,e[3],h?g(d,e[3],t,null):u(e[3]),null),(!h||2&t)&&c(s,"aria-current",e[1]),(!h||1&t)&&c(s,"href",e[0])},i(e){h||(m(x,e),h=!0)},o(e){p(x,e),h=!1},d(e){e&&$(t),x&&x.d(e)}}}function M(e,t,s){let n,{$$slots:a={},$$scope:l}=t,{segment:r}=t,{href:$}=t;return e.$$set=e=>{"segment"in e&&s(2,r=e.segment),"href"in e&&s(0,$=e.href),"$$scope"in e&&s(3,l=e.$$scope)},e.$$.update=()=>{5&e.$$.dirty&&s(1,n=function(e,t){return void 0===e&&"."===t||e&&t.endsWith(e)?"page":void 0}(r,$))},[$,n,r,l,a]}class B extends e{constructor(e){super(),t(this,e,M,G,s,{segment:2,href:0})}}function D(e){let t,s,n;return{c(){t=a("img"),this.h()},l(e){t=l(e,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){c(t,"class","logo svelte-2zxh9l"),z(t.src,s="/favicon.png")||c(t,"src","/favicon.png"),c(t,"alt",n=e[1]+" logo")},m(e,s){o(e,t,s)},p(e,s){2&s&&n!==(n=e[1]+" logo")&&c(t,"alt",n)},d(e){e&&$(t)}}}function F(e){let t,s;return{c(){t=a("span"),s=x(e[1]),this.h()},l(n){t=l(n,"SPAN",{class:!0});var a=r(t);s=y(a,e[1]),a.forEach($),this.h()},h(){c(t,"class","siteName")},m(e,n){o(e,t,n),f(t,s)},p(e,t){2&t&&A(s,e[1])},d(e){e&&$(t)}}}function H(e){let t,s=L.get(e[2],"Categories")+"";return{c(){t=x(s)},l(e){t=y(e,s)},m(e,s){o(e,t,s)},p(e,n){4&n&&s!==(s=L.get(e[2],"Categories")+"")&&A(t,s)},d(e){e&&$(t)}}}function J(e){let t;return{c(){t=x("About")},l(e){t=y(e,"About")},m(e,s){o(e,t,s)},d(e){e&&$(t)}}}function K(e){let t;const s=e[5].default,a=n(s,e,e[6],null);return{c(){a&&a.c()},l(e){a&&a.l(e)},m(e,s){a&&a.m(e,s),t=!0},p(e,n){a&&a.p&&(!t||64&n)&&i(a,s,e,e[6],t?g(s,e[6],n,null):u(e[6]),null)},i(e){t||(m(a,e),t=!0)},o(e){p(a,e),t=!1},d(e){a&&a.d(e)}}}function O(e){let t,s,n,i,u,g,z,A,S,L,T,U,C,G,M,O,P,V;n=new B({props:{href:`/langs/${e[2]}`,segment:e[0],$$slots:{default:[D]},$$scope:{ctx:e}}}),g=new B({props:{href:`/langs/${e[2]}`,segment:e[0],$$slots:{default:[F]},$$scope:{ctx:e}}}),A=new B({props:{href:`/langs/${e[2]}/categories`,segment:e[0],$$slots:{default:[H]},$$scope:{ctx:e}}}),L=new B({props:{href:`/langs/${e[2]}/about`,segment:e[0],$$slots:{default:[J]},$$scope:{ctx:e}}});let W=!e[3]&&K(e);return{c(){t=a("nav"),s=a("ul"),h(n.$$.fragment),i=d(),u=a("ul"),h(g.$$.fragment),z=d(),h(A.$$.fragment),S=d(),h(L.$$.fragment),U=d(),W&&W.c(),C=d(),G=a("button"),M=x("≡"),this.h()},l(e){t=l(e,"NAV",{class:!0});var a=r(t);s=l(a,"UL",{class:!0});var c=r(s);v(n.$$.fragment,c),c.forEach($),i=b(a),u=l(a,"UL",{class:!0});var o=r(u);v(g.$$.fragment,o),z=b(o),v(A.$$.fragment,o),S=b(o),v(L.$$.fragment,o),o.forEach($),U=b(a),W&&W.l(a),C=b(a),G=l(a,"BUTTON",{type:!0,class:!0});var f=r(G);M=y(f,"≡"),f.forEach($),a.forEach($),this.h()},h(){c(s,"class","svelte-2zxh9l"),c(u,"class",T=N(e[3]?"open":"closed")+" svelte-2zxh9l"),c(G,"type","button"),c(G,"class","svelte-2zxh9l"),c(t,"class","svelte-2zxh9l")},m(a,l){o(a,t,l),f(t,s),E(n,s,null),f(t,i),f(t,u),E(g,u,null),f(u,z),E(A,u,null),f(u,S),E(L,u,null),f(t,U),W&&W.m(t,null),f(t,C),f(t,G),f(G,M),O=!0,P||(V=k(G,"click",e[4]),P=!0)},p(e,[s]){const a={};4&s&&(a.href=`/langs/${e[2]}`),1&s&&(a.segment=e[0]),66&s&&(a.$$scope={dirty:s,ctx:e}),n.$set(a);const l={};4&s&&(l.href=`/langs/${e[2]}`),1&s&&(l.segment=e[0]),66&s&&(l.$$scope={dirty:s,ctx:e}),g.$set(l);const r={};4&s&&(r.href=`/langs/${e[2]}/categories`),1&s&&(r.segment=e[0]),68&s&&(r.$$scope={dirty:s,ctx:e}),A.$set(r);const $={};4&s&&($.href=`/langs/${e[2]}/about`),1&s&&($.segment=e[0]),64&s&&($.$$scope={dirty:s,ctx:e}),L.$set($),(!O||8&s&&T!==(T=N(e[3]?"open":"closed")+" svelte-2zxh9l"))&&c(u,"class",T),e[3]?W&&(w(),p(W,1,1,(()=>{W=null})),I()):W?(W.p(e,s),8&s&&m(W,1)):(W=K(e),W.c(),m(W,1),W.m(t,C))},i(e){O||(m(n.$$.fragment,e),m(g.$$.fragment,e),m(A.$$.fragment,e),m(L.$$.fragment,e),m(W),O=!0)},o(e){p(n.$$.fragment,e),p(g.$$.fragment,e),p(A.$$.fragment,e),p(L.$$.fragment,e),p(W),O=!1},d(e){e&&$(t),j(n),j(g),j(A),j(L),W&&W.d(),P=!1,V()}}}function P(e,t,s){let{$$slots:n={},$$scope:a}=t,{segment:l}=t,{siteName:r}=t,{lang:$}=t;let c=!1;return e.$$set=e=>{"segment"in e&&s(0,l=e.segment),"siteName"in e&&s(1,r=e.siteName),"lang"in e&&s(2,$=e.lang),"$$scope"in e&&s(6,a=e.$$scope)},[l,r,$,c,function(){s(3,c=!c)},n,a]}class V extends e{constructor(e){super(),t(this,e,P,O,s,{segment:0,siteName:1,lang:2})}}function W(e){let t,s;return t=new C({props:{icon:"rss",href:`/langs/${e[1]}/feed.xml`,title:`${L.get(e[1],"SubscribeTo")} ${e[2]}`}}),{c(){h(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){E(t,e,n),s=!0},p(e,s){const n={};2&s&&(n.href=`/langs/${e[1]}/feed.xml`),2&s&&(n.title=`${L.get(e[1],"SubscribeTo")} ${e[2]}`),t.$set(n)},i(e){s||(m(t.$$.fragment,e),s=!0)},o(e){p(t.$$.fragment,e),s=!1},d(e){j(t,e)}}}function q(e){let t,s;return t=new U({props:{$$slots:{default:[W]},$$scope:{ctx:e}}}),{c(){h(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){E(t,e,n),s=!0},p(e,s){const n={};18&s&&(n.$$scope={dirty:s,ctx:e}),t.$set(n)},i(e){s||(m(t.$$.fragment,e),s=!0)},o(e){p(t.$$.fragment,e),s=!1},d(e){j(t,e)}}}function Q(e){let t,s,f,x;t=new V({props:{segment:e[0],siteName:e[2],lang:e[1],$$slots:{default:[q]},$$scope:{ctx:e}}});const y=e[3].default,N=n(y,e,e[4],null);return{c(){h(t.$$.fragment),s=d(),f=a("main"),N&&N.c(),this.h()},l(e){v(t.$$.fragment,e),s=b(e),f=l(e,"MAIN",{class:!0});var n=r(f);N&&N.l(n),n.forEach($),this.h()},h(){c(f,"class","svelte-gf73lg")},m(e,n){E(t,e,n),o(e,s,n),o(e,f,n),N&&N.m(f,null),x=!0},p(e,[s]){const n={};1&s&&(n.segment=e[0]),2&s&&(n.lang=e[1]),18&s&&(n.$$scope={dirty:s,ctx:e}),t.$set(n),N&&N.p&&(!x||16&s)&&i(N,y,e,e[4],x?g(y,e[4],s,null):u(e[4]),null)},i(e){x||(m(t.$$.fragment,e),m(N,e),x=!0)},o(e){p(t.$$.fragment,e),p(N,e),x=!1},d(e){j(t,e),e&&$(s),e&&$(f),N&&N.d(e)}}}async function R({page:e}){const t=e.params.lang;return t&&(T.set(t),"undefined"!=typeof document&&(document.documentElement.lang=t)),{props:{path:e.path}}}function X(e,t,s){let n;S(e,T,(e=>s(1,n=e)));let{$$slots:a={},$$scope:l}=t,{path:r="/"}=t;const $=L.get(n,"siteName");return e.$$set=e=>{"path"in e&&s(0,r=e.path),"$$scope"in e&&s(4,l=e.$$scope)},[r,n,$,a,l]}class Y extends e{constructor(e){super(),t(this,e,X,Q,s,{path:0})}}export{Y as default,R as load};
