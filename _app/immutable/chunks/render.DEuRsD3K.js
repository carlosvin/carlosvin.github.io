import{a8 as N,am as O,ao as D,X as H,G as I,ap as b,o as V,J as q,k as M,H as E,v as m,m as S,d as W,j as y,ak as Y,l as B,aq as P,ai as $,ac as j,ar as C,e as G,p as J,h as T,T as X,a as z,A as F}from"./runtime.Dmq9lEfb.js";import{r as K}from"./svelte-head.gMhgFLgJ.js";import{b as Q}from"./disclose-version.DZGYuMPK.js";const U=new Set,k=new Set;function Z(r,t,n,o){function e(a){if(o.capture||g.call(t,a),!a.cancelBubble)return n.call(this,a)}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?O(()=>{t.addEventListener(r,e,o)}):t.addEventListener(r,e,o),e}function sr(r,t,n,o,e){var a={capture:o,passive:e},u=Z(r,t,n,a);(t===document.body||t===window||t===document)&&N(()=>{t.removeEventListener(r,u,a)})}function g(r){var R;var t=this,n=t.ownerDocument,o=r.type,e=((R=r.composedPath)==null?void 0:R.call(r))||[],a=e[0]||r.target,u=0,l=r.__root;if(l){var d=e.indexOf(l);if(d!==-1&&(t===document||t===window)){r.__root=t;return}var c=e.indexOf(t);if(c===-1)return;d<=c&&(u=d)}if(a=e[u]||r.target,a!==t){D(r,"currentTarget",{configurable:!0,get(){return a||n}});try{for(var _,s=[];a!==null;){var f=a.parentNode||a.host||null;try{var i=a["__"+o];if(i!==void 0&&!a.disabled)if(H(i)){var[p,...w]=i;p.apply(a,[r,...w])}else i.call(a,r)}catch(v){_?s.push(v):_=v}if(r.cancelBubble||f===t||f===null)break;a=f}if(_){for(let v of s)queueMicrotask(()=>{throw v});throw _}}finally{r.__root=t,delete r.currentTarget}}}const x=["wheel","mousewheel","touchstart","touchmove"];function rr(r){return x.includes(r)}function ir(r,t){t!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=t,r.nodeValue=t==null?"":t+"")}function tr(r,t){const n=t.anchor??t.target.appendChild(I());return A(r,{...t,anchor:n})}function or(r,t){b(),t.intro=t.intro??!1;const n=t.target,o=T,e=y;try{for(var a=V(n);a&&(a.nodeType!==8||a.data!==q);)a=M(a);if(!a)throw E;m(!0),S(a),W();const u=A(r,{...t,anchor:a});if(y===null||y.nodeType!==8||y.data!==Y)throw B(),E;return m(!1),u}catch(u){if(u===E)return t.recover===!1&&P(),b(),$(n),m(!1),tr(r,t);throw u}finally{m(o),S(e),K()}}const h=new Map;function A(r,{target:t,anchor:n,props:o={},events:e,context:a,intro:u=!0}){b();var l=new Set,d=s=>{for(var f=0;f<s.length;f++){var i=s[f];if(!l.has(i)){l.add(i);var p=rr(i);t.addEventListener(i,g,{passive:p});var w=h.get(i);w===void 0?(document.addEventListener(i,g,{passive:p}),h.set(i,1)):h.set(i,w+1)}}};d(j(U)),k.add(d);var c=void 0,_=C(()=>(G(()=>{if(a){J({});var s=F;s.c=a}e&&(o.$$events=e),T&&Q(n,null),c=r(n,o)||{},T&&(X.nodes_end=y),a&&z()}),()=>{for(var s of l){t.removeEventListener(s,g);var f=h.get(s);--f===0?(document.removeEventListener(s,g),h.delete(s)):h.set(s,f)}k.delete(d),L.delete(c)}));return L.set(c,_),c}let L=new WeakMap;function ur(r){const t=L.get(r);t&&t()}export{sr as e,or as h,tr as m,ir as s,ur as u};
