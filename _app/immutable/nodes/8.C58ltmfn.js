import{b as z,e as mt,c as M,a as h,t as w,f as lt}from"../chunks/disclose-version.CZIBVlYk.js";import{l as ct,m as B,Y as F,a4 as pt,ad as dt,w as G,o as vt,al as gt,ak as ft,v as ht,x as _t,p as Q,f as j,a as U,g as e,t as g,V as J,s as a,c as y,r as k,aq as ut,ar as yt,$ as kt,as as D,j as wt,D as x}from"../chunks/runtime.DZQVDJt7.js";import{e as bt,s as K}from"../chunks/render.BShDvVkt.js";import{i as W}from"../chunks/3.Bz2r5_DY.js";import{e as jt,i as St,p as Lt}from"../chunks/url.Cs1YaMUt.js";import{h as Dt}from"../chunks/svelte-head.7bbCFc0L.js";import{s as o}from"../chunks/attributes.BRSJc6o5.js";import{i as X}from"../chunks/lifecycle.DLjilUYM.js";import{p as _}from"../chunks/props.CVPOr25N.js";import{s as xt,a as It,p as Ct}from"../chunks/stores.RfXiJgf9.js";import{t as Ot,D as Rt}from"../chunks/Details.CHIba59D.js";import{I as qt}from"../chunks/IconLink.lxk2gNe2.js";function Z(c,s,p,d,m){var t=c,l="",v;ct(()=>{if(l===(l=s())){B&&F();return}v!==void 0&&(dt(v),v=void 0),l!==""&&(v=pt(()=>{if(B){G.data;for(var r=F(),f=r;r!==null&&(r.nodeType!==8||r.data!=="");)f=r,r=vt(r);if(r===null)throw gt(),ft;z(G,f),t=ht(r);return}var i=l+"",n=mt(i);z(_t(n),n.lastChild),t.before(n)}))})}var Ht=w('<button type="button" class="svelte-17kau57"></button>');function Tt(c,s){Q(s,!1);let p=_(s,"title",8),d=_(s,"text",8),m=_(s,"url",8),t=_(s,"keywords",24,()=>[]);const l=typeof navigator<"u"&&navigator.share;async function v(){try{await navigator.share({title:p(),text:d()+Ot(t()),url:m()})}catch(i){console.error("Sharing",i)}}X();var r=M(),f=j(r);W(f,()=>l,i=>{var n=Ht();g(()=>o(n,"title",p())),bt("click",n,v),h(i,n)},i=>{var n=J(()=>`https://twitter.com/intent/tweet?url=${m()}&text=${p()}:&nbsp;${d()}&hashtags=${t().join(",")}`),b=J(()=>`Share "${p()}"`);qt(i,{get href(){return e(n)},get title(){return e(b)},icon:"twitter"})}),h(c,r),U()}var Yt=lt(`<div class="comments"><script src="https://utteranc.es/client.js" repo="carlosvin/carlosvin.github.io" issue-term="title" label="comment" theme="github-light" crossorigin="anonymous" async>
	<\/script></div>`);function $t(c){var s=Yt();h(c,s)}var At=w('<div class="postContent"><!> <!></div>');function Et(c,s){let p=_(s,"content",8);var d=At(),m=y(d);Z(m,p);var t=a(m,2);$t(t),k(d),h(c,d)}var Nt=w('<link rel="alternate">'),Pt=w('<meta property="og:title"> <meta name="date.created"> <meta name="date.updated"> <meta name="description"> <meta property="og:description"> <meta property="og:type" content="article"> <meta property="og:url"> <meta property="og:locale"> <meta property="og:locale:alternate"> <meta property="og:image"> <meta property="og:article:tag"> <!> <!>',1),Vt=w('<header class="svelte-1ikjkmw"><h1 class="svelte-1ikjkmw"> <span class="share svelte-1ikjkmw"><!></span></h1> <p class="summary svelte-1ikjkmw"> </p> <!></header> <!>',1);function te(c,s){Q(s,!1);const p=xt(),d=()=>It(Ct,"$page",p),m=D(),t=D(),l=D();let v=_(s,"data",8);ut(()=>(e(m),e(t),e(l),wt(v())),()=>{(u=>(x(m,u.html),x(t,u.props),x(l,u.jsonLd)))(v())}),yt(),X();var r=Vt();Dt(u=>{var I=Pt(),C=j(I),O=a(C,2);g(()=>o(O,"content",new Date(e(t).created).toISOString()));var R=a(O,2);g(()=>o(R,"content",new Date(e(t).modified).toISOString()));var q=a(R,2),H=a(q,2),T=a(H,4);g(()=>o(T,"content",d().url.toString()));var Y=a(T,2),$=a(Y,2),A=a($,2),E=a(A,2);g(()=>o(E,"content",e(t).keywords.join(",")));var N=a(E,2);W(N,()=>e(t).otherLangs&&e(t).otherLangs.length>0,ot=>{var P=M(),nt=j(P);jt(nt,1,()=>e(t).otherLangs,St,(it,V)=>{var L=Nt();g(()=>o(L,"href",Lt(e(t).slug,e(V)))),g(()=>o(L,"hreflang",e(V))),h(it,L)}),h(ot,P)});var st=a(N,2);Z(st,()=>e(l),!1,!1),g(()=>{kt.title=e(t).title,o(C,"content",e(t).title),o(q,"content",e(t).summary),o(H,"content",e(t).summary),o(Y,"content",e(t).lang),o($,"content",e(t).otherLangs),o(A,"content",e(t).previewimage)}),h(u,I)});var f=j(r),i=y(f),n=y(i),b=a(n),tt=y(b);Tt(tt,{get title(){return e(t).title},get keywords(){return e(t).keywords},get text(){return e(t).summary},get url(){return e(t).path}}),k(b),k(i);var S=a(i,2),et=y(S);k(S);var at=a(S,2);Rt(at,{get post(){return e(t)}}),k(f);var rt=a(f,2);Et(rt,{get content(){return e(m)}}),g(()=>{K(n,`${e(t).title??""} `),K(et,e(t).summary)}),h(c,r),U()}export{te as component};
