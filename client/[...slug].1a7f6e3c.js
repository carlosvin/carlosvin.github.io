import{S as t,i as e,s,m as a,g as n,t as r,k as o,d as l,I as i,y as c,z as h,A as u,C as m,e as d,a as f,b as p,f as $,J as g,n as w,u as y,p as v,x as k,v as j,q as x,r as E,w as b,K as A,L}from"./client.b8593d81.js";import{p as M,u as S,O as T}from"./OtherLangs.188e3ba0.js";import{g as D}from"./dates.deba47a4.js";function H(t,e=" "){return[...t.map(t=>`#${t}`)].join(e)}function Y(t){let e;const s=new i({props:{href:`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}: ${t[1]}&hashtags=${t[3].join(",")}`,title:`Share "${t[0]}"`,icon:"twitter"}});return{c(){c(s.$$.fragment)},l(t){h(s.$$.fragment,t)},m(t,a){u(s,t,a),e=!0},p(t,e){const a={};15&e&&(a.href=`https://twitter.com/intent/tweet?url=${t[2]}&text=${t[0]}: ${t[1]}&hashtags=${t[3].join(",")}`),1&e&&(a.title=`Share "${t[0]}"`),s.$set(a)},i(t){e||(r(s.$$.fragment,t),e=!0)},o(t){o(s.$$.fragment,t),e=!1},d(t){m(s,t)}}}function q(t){let e,s;return{c(){e=d("button"),this.h()},l(t){e=f(t,"BUTTON",{title:!0,class:!0}),p(e).forEach(l),this.h()},h(){$(e,"title",t[0]),$(e,"class","svelte-1aekmf3")},m(a,r,o){n(a,e,r),o&&s(),s=g(e,"click",t[5])},p(t,s){1&s&&$(e,"title",t[0])},i:w,o:w,d(t){t&&l(e),s()}}}function I(t){let e,s,i,c;const h=[q,Y],u=[];return e=function(t,e){return t[4]?0:1}(t),s=u[e]=h[e](t),{c(){s.c(),i=a()},l(t){s.l(t),i=a()},m(t,s){u[e].m(t,s),n(t,i,s),c=!0},p(t,[e]){s.p(t,e)},i(t){c||(r(s),c=!0)},o(t){o(s),c=!1},d(t){u[e].d(t),t&&l(i)}}}function N(t,e,s){let{title:a}=e,{text:n}=e,{url:r}=e,{keywords:o=[]}=e;const l="undefined"!=typeof navigator&&navigator.share;return t.$set=(t=>{"title"in t&&s(0,a=t.title),"text"in t&&s(1,n=t.text),"url"in t&&s(2,r=t.url),"keywords"in t&&s(3,o=t.keywords)}),[a,n,r,o,l,async function(){try{await navigator.share({title:a,text:n+H(o),url:r})}catch(t){console.error("Sharing",t)}}]}class O extends t{constructor(t){super(),e(this,t,N,I,s,{title:0,text:1,url:2,keywords:3})}}const{document:z}=L;function K(t){let e,s,a,i,g,w,A,L,M,H,Y,q,I,N,K,P,R,U,B=t[0].title+"",C=t[0].description+"",J=t[0].html+"";z.title=e=t[0].title;const V=new O({props:{title:t[0].title,keywords:t[0].keywords,text:t[0].description,url:S(t[0].slug,t[0].lang)}}),F=new T({props:{post:t[0]}});return{c(){s=d("meta"),i=d("meta"),w=d("link"),A=y(),L=d("header"),M=d("h1"),H=v(B),Y=y(),q=d("span"),c(V.$$.fragment),I=y(),N=d("p"),K=v(C),c(F.$$.fragment),P=y(),R=d("div"),this.h()},l(t){const e=k('[data-svelte="svelte-sbarz4"]',z.head);s=f(e,"META",{name:!0,content:!0,scheme:!0}),i=f(e,"META",{name:!0,content:!0}),w=f(e,"LINK",{rel:!0,href:!0,as:!0,onload:!0}),e.forEach(l),A=j(t),L=f(t,"HEADER",{class:!0});var a=p(L);M=f(a,"H1",{class:!0});var n=p(M);H=x(n,B),Y=j(n),q=f(n,"SPAN",{class:!0});var r=p(q);h(V.$$.fragment,r),r.forEach(l),n.forEach(l),I=j(a),N=f(a,"P",{class:!0});var o=p(N);K=x(o,C),h(F.$$.fragment,o),o.forEach(l),a.forEach(l),P=j(t),R=f(t,"DIV",{class:!0}),p(R).forEach(l),this.h()},h(){$(s,"name","date"),$(s,"content",a=D(t[0].date)),$(s,"scheme","YYYY-MM-DD"),$(i,"name","description"),$(i,"content",g=t[0].summary),$(w,"rel","preload"),$(w,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css"),$(w,"as","style"),$(w,"onload","this.onload=null;this.rel='stylesheet'"),$(q,"class","share svelte-1knthhj"),$(M,"class","svelte-1knthhj"),$(N,"class","description svelte-1knthhj"),$(L,"class","svelte-1knthhj"),$(R,"class","content svelte-1knthhj")},m(t,e){E(z.head,s),E(z.head,i),E(z.head,w),n(t,A,e),n(t,L,e),E(L,M),E(M,H),E(M,Y),E(M,q),u(V,q,null),E(L,I),E(L,N),E(N,K),u(F,N,null),n(t,P,e),n(t,R,e),R.innerHTML=J,U=!0},p(t,[n]){(!U||1&n)&&e!==(e=t[0].title)&&(z.title=e),(!U||1&n&&a!==(a=D(t[0].date)))&&$(s,"content",a),(!U||1&n&&g!==(g=t[0].summary))&&$(i,"content",g),(!U||1&n)&&B!==(B=t[0].title+"")&&b(H,B);const r={};1&n&&(r.title=t[0].title),1&n&&(r.keywords=t[0].keywords),1&n&&(r.text=t[0].description),1&n&&(r.url=S(t[0].slug,t[0].lang)),V.$set(r),(!U||1&n)&&C!==(C=t[0].description+"")&&b(K,C);const o={};1&n&&(o.post=t[0]),F.$set(o),(!U||1&n)&&J!==(J=t[0].html+"")&&(R.innerHTML=J)},i(t){U||(r(V.$$.fragment,t),r(F.$$.fragment,t),U=!0)},o(t){o(V.$$.fragment,t),o(F.$$.fragment,t),U=!1},d(t){l(s),l(i),l(w),t&&l(A),t&&l(L),m(V),m(F),t&&l(P),t&&l(R)}}}async function P({params:t,query:e}){const[s,a]=t.slug,n=await this.fetch(M(s,a)+".json"),r=await n.json();if(200===n.status){if(a)return{post:r};this.redirect(302,M(s,r.lang))}else this.error(n.status,r.message)}function R(t,e,s){A(async()=>{[...document.querySelectorAll('a[href^="#"]')].map(t=>t.href=document.location+new URL(t.href).hash)});let{post:a}=e;return t.$set=(t=>{"post"in t&&s(0,a=t.post)}),[a]}export default class extends t{constructor(t){super(),e(this,t,R,K,s,{post:0})}}export{P as preload};
