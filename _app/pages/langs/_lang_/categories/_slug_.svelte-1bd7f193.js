var _=Object.defineProperty,g=Object.defineProperties;var p=Object.getOwnPropertyDescriptors;var u=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var f=(a,e,t)=>e in a?_(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,d=(a,e)=>{for(var t in e||(e={}))j.call(e,t)&&f(a,t,e[t]);if(u)for(var t of u(e))k.call(e,t)&&f(a,t,e[t]);return a},h=(a,e)=>g(a,p(e));import{S as w,i as b,s as v,e as x,j as E,v as I,P,c as q,d as r,l as y,w as A,b as m,H as D,f as S,x as z,p as B,n as C,A as H}from"../../../../chunks/vendor-59328230.js";import{I as M}from"../../../../chunks/Index-807fce5f.js";import"../../../../chunks/Entry-2ae2ecf7.js";import"../../../../chunks/Details-a2e04be0.js";import"../../../../chunks/url-bb89230a.js";import"../../../../chunks/lang-92ec2f88.js";function T(a){let e,t,o,i,l;return document.title=e=`Posts related with ${a[1]}`,i=new M({props:{posts:a[0],title:a[1],lang:a[3]}}),{c(){t=x("meta"),o=E(),I(i.$$.fragment),this.h()},l(n){const s=P('[data-svelte="svelte-1nk7vjz"]',document.head);t=q(s,"META",{name:!0,content:!0}),s.forEach(r),o=y(n),A(i.$$.fragment,n),this.h()},h(){m(t,"name","description"),m(t,"content",a[2])},m(n,s){D(document.head,t),S(n,o,s),z(i,n,s),l=!0},p(n,[s]){(!l||s&2)&&e!==(e=`Posts related with ${n[1]}`)&&(document.title=e),(!l||s&4)&&m(t,"content",n[2]);const c={};s&1&&(c.posts=n[0]),s&2&&(c.title=n[1]),s&8&&(c.lang=n[3]),i.$set(c)},i(n){l||(B(i.$$.fragment,n),l=!0)},o(n){C(i.$$.fragment,n),l=!1},d(n){r(t),n&&r(o),H(i,n)}}}async function Q({params:a,url:e,fetch:t}){const{lang:o}=a,i=await(await t(`${e.pathname}.json`)).json();return{props:h(d({},i),{lang:o})}}function U(a,e,t){let{index:o}=e,{title:i}=e,{description:l}=e,{lang:n}=e;return a.$$set=s=>{"index"in s&&t(0,o=s.index),"title"in s&&t(1,i=s.title),"description"in s&&t(2,l=s.description),"lang"in s&&t(3,n=s.lang)},[o,i,l,n]}class R extends w{constructor(e){super();b(this,e,U,T,v,{index:0,title:1,description:2,lang:3})}}export{R as default,Q as load};
