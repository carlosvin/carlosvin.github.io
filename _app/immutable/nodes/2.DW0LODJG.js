import{a as m,t as N,d as w,c as Q}from"../chunks/disclose-version.Dlm6FlXL.js";import{p as C,aq as R,ar as U,t as _,a as E,c as o,r as i,g as l,as as D,j as z,J as F,s as d,at as B,ae as k,f as G}from"../chunks/runtime.C7s_ApS_.js";import{e as V,s as y}from"../chunks/render.BNJuPkFv.js";import{s as J,d as L}from"../chunks/misc.DMUvATe6.js";import{i as H}from"../chunks/lifecycle.e61wV02q.js";import{p as b}from"../chunks/props.584LStUP.js";import{i as X}from"../chunks/3.DkIuOM8h.js";import{s as A}from"../chunks/attributes.DJKkhhPL.js";import{s as Y,I as Z}from"../chunks/IconLink.D34QTuXB.js";import{S as ee}from"../chunks/Social.DhO7_AGy.js";var te=N('<li class="svelte-2j41u7"><a rel="prefetch" class="svelte-2j41u7"><!></a></li>');function j(x,t){C(t,!1);const e=D();function u(g,p){return g===void 0&&p==="."||g!=null&&g.startsWith(p)?"page":void 0}let s=b(t,"segment",8),f=b(t,"href",8);R(()=>(z(s()),z(f())),()=>{F(e,u(s(),f()))}),U();var n=te(),r=o(n),v=o(r);J(v,L(t),{}),i(r),i(n),_(()=>{A(r,"aria-current",l(e)),A(r,"href",f())}),m(x,n),E()}var ae=N('<img class="logo svelte-pyuk6k" src="/favicon.25px.png">'),re=N('<span class="siteName"> </span>'),se=N('<nav class="svelte-pyuk6k"><ul class="svelte-pyuk6k"><!></ul> <ul><!> <!> <!></ul> <!> <button type="button" class="svelte-pyuk6k">≡</button></nav>');function ne(x,t){C(t,!1);let e=b(t,"segment",8),u=b(t,"lang",8),s=b(t,"translations",8);function f(){F(n,!l(n))}let n=D(!1);H();var r=se(),v=o(r),g=o(v),p=k(()=>`/langs/${u()}/posts`);j(g,{get href(){return l(p)},get segment(){return e()},children:(c,$)=>{var a=ae();_(()=>A(a,"alt",`${s().siteName??""} logo`)),m(c,a)},$$slots:{default:!0}}),i(v);var h=d(v,2),q=o(h),M=k(()=>`/langs/${u()}/posts`);j(q,{get href(){return l(M)},get segment(){return e()},children:(c,$)=>{var a=re(),O=o(a);i(a),_(()=>y(O,s().siteName)),m(c,a)},$$slots:{default:!0}});var P=d(q,2),T=k(()=>`/langs/${u()}/categories`);j(P,{get href(){return l(T)},get segment(){return e()},children:(c,$)=>{B();var a=w();_(()=>y(a,s().Categories)),m(c,a)},$$slots:{default:!0}});var S=d(P,2),I=k(()=>`/langs/${u()}/about`);j(S,{get href(){return l(I)},get segment(){return e()},children:(c,$)=>{B();var a=w();_(()=>y(a,s().AboutMe)),m(c,a)},$$slots:{default:!0}}),i(h);var W=d(h,2);X(W,()=>!l(n),c=>{var $=Q(),a=G($);J(a,L(t),{}),m(c,$)});var K=d(W,2);i(r),_(()=>Y(h,`${(l(n)?"open":"closed")??""} svelte-pyuk6k`)),V("click",K,f),m(x,r),E()}var le=N('<!> <main class="svelte-qhq9sm"><!></main> <footer class="svelte-qhq9sm"><span> </span> <code> </code></footer>',1);function _e(x,t){C(t,!1);let e=b(t,"data",8);H();var u=le(),s=G(u);ne(s,{get segment(){return e().path},get lang(){return e().lang},get translations(){return e().translations},children:(q,M)=>{ee(q,{children:(P,T)=>{var S=k(()=>`/langs/${e().lang}/feed.xml`),I=k(()=>`${e().translations.SubscribeTo} ${e().translations.siteName}`);Z(P,{icon:"rss",get href(){return l(S)},get title(){return l(I)}})},$$slots:{default:!0}})},$$slots:{default:!0}});var f=d(s,2),n=o(f);J(n,L(t),{}),i(f);var r=d(f,2),v=o(r),g=o(v);i(v);var p=d(v,2),h=o(p);i(p),i(r),_(()=>{y(g,e().translations.siteName),y(h,e().version)}),m(x,u),E()}export{_e as component};
