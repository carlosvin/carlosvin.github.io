import{b as T,e as $,c as V,a as f,t as b,f as tt}from"../chunks/disclose-version.CC-duLav.js";import{l as et,m as Y,Y as A,a2 as at,ab as rt,w as E,o as st,ak as nt,aj as ot,v as it,x as lt,p as z,f as j,a as B,g as e,t as _,V as N,s as v,c as k,r as w,aq as mt,ar as ct,$ as dt,as as D,j as vt,D as L}from"../chunks/runtime.B6RPaHn-.js";import{e as ft,s as P}from"../chunks/render.D3Fqu4WM.js";import{i as F}from"../chunks/3.BSPqVS-c.js";import{e as ht,i as _t,p as pt}from"../chunks/url.BRZsJGrD.js";import{h as ut}from"../chunks/svelte-head.DIKBRFqu.js";import{s as p}from"../chunks/attributes.BBFwatIg.js";import{i as G}from"../chunks/lifecycle.DkULVVTe.js";import{p as u}from"../chunks/props.PCEjw1P-.js";import{t as gt,D as yt}from"../chunks/Details.BxKKAt3G.js";import{I as kt}from"../chunks/IconLink.BzKk1u2O.js";function J(c,r,s,t,o){var i=c,d="",l;et(()=>{if(d===(d=r())){Y&&A();return}l!==void 0&&(rt(l),l=void 0),d!==""&&(l=at(()=>{if(Y){E.data;for(var a=A(),h=a;a!==null&&(a.nodeType!==8||a.data!=="");)h=a,a=st(a);if(a===null)throw nt(),ot;T(E,h),i=it(a);return}var m=d+"",n=$(m);T(lt(n),n.lastChild),i.before(n)}))})}var wt=b('<button type="button" class="svelte-17kau57"></button>');function bt(c,r){z(r,!1);let s=u(r,"title",8),t=u(r,"text",8),o=u(r,"url",8),i=u(r,"keywords",24,()=>[]);const d=typeof navigator<"u"&&navigator.share;async function l(){try{await navigator.share({title:s(),text:t()+gt(i()),url:o()})}catch(m){console.error("Sharing",m)}}G();var a=V(),h=j(a);F(h,()=>d,m=>{var n=wt();_(()=>p(n,"title",s())),ft("click",n,l),f(m,n)},m=>{var n=N(()=>`https://twitter.com/intent/tweet?url=${o()}&text=${s()}:&nbsp;${t()}&hashtags=${i().join(",")}`),g=N(()=>`Share "${s()}"`);kt(m,{get href(){return e(n)},get title(){return e(g)},icon:"twitter"})}),f(c,a),B()}var jt=tt(`<div class="comments"><script src="https://utteranc.es/client.js" repo="carlosvin/carlosvin.github.io" issue-term="title" label="comment" theme="github-light" crossorigin="anonymous" async>
	<\/script></div>`);function St(c){var r=jt();f(c,r)}var Dt=b('<div class="postContent"><!> <!></div>');function Lt(c,r){let s=u(r,"content",8);var t=Dt(),o=k(t);J(o,s);var i=v(o,2);St(i),w(t),f(c,t)}var xt=b('<link rel="alternate">'),It=b('<meta name="date.created"> <meta name="date.updated"> <meta name="description"> <!> <!>',1),Ct=b('<header class="svelte-1ikjkmw"><h1 class="svelte-1ikjkmw"> <span class="share svelte-1ikjkmw"><!></span></h1> <p class="summary svelte-1ikjkmw"> </p> <!></header> <!>',1);function zt(c,r){z(r,!1);const s=D(),t=D(),o=D();let i=u(r,"data",8);mt(()=>(e(s),e(t),e(o),vt(i())),()=>{(y=>(L(s,y.html),L(t,y.props),L(o,y.jsonLd)))(i())}),ct(),G();var d=Ct();ut(y=>{var x=It(),I=j(x);_(()=>p(I,"content",new Date(e(t).created).toISOString()));var C=v(I,2);_(()=>p(C,"content",new Date(e(t).modified).toISOString()));var O=v(C,2),R=v(O,2);F(R,()=>e(t).otherLangs&&e(t).otherLangs.length>0,W=>{var q=V(),X=j(q);ht(X,1,()=>e(t).otherLangs,_t,(Z,H)=>{var S=xt();_(()=>p(S,"href",pt(e(t).slug,e(H)))),_(()=>p(S,"hreflang",e(H))),f(Z,S)}),f(W,q)});var U=v(R,2);J(U,()=>e(o),!1,!1),_(()=>{dt.title=e(t).title,p(O,"content",e(t).summary)}),f(y,x)});var l=j(d),a=k(l),h=k(a),m=v(h),n=k(m);bt(n,{get title(){return e(t).title},get keywords(){return e(t).keywords},get text(){return e(t).summary},get url(){return e(t).path}}),w(m),w(a);var g=v(a,2),K=k(g);w(g);var M=v(g,2);yt(M,{get post(){return e(t)}}),w(l);var Q=v(l,2);Lt(Q,{get content(){return e(s)}}),_(()=>{P(h,`${e(t).title??""} `),P(K,e(t).summary)}),f(c,d),B()}export{zt as component};
