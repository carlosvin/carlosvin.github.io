import{S as t,i as e,s as n,e as s,a,b as i,c as o,q as r,d as c,f as d,g as m,h as p,j as l,k as f,l as h,m as u,t as $,n as x,o as j,H as g}from"./client.96f705b7.js";import"./Entry.a5504f35.js";import"./url.ee46893a.js";import"./Details.48506a7c.js";import{I as S}from"./Index.fc9c2566.js";function w(t){let e,n,w,E,b,v,I;return document.title=e=t[1],v=new S({props:{posts:t[0]}}),{c(){n=s("meta"),E=a(),b=i(),o(v.$$.fragment),this.h()},l(t){const e=r('[data-svelte="svelte-1p8md3w"]',document.head);n=c(e,"META",{name:!0,content:!0}),E=a(),e.forEach(d),b=m(t),p(v.$$.fragment,t),this.h()},h(){l(n,"name","description"),l(n,"content",t[2]),w=new g(E)},m(e,s){f(document.head,n),w.m(t[3],document.head),f(document.head,E),h(e,b,s),u(v,e,s),I=!0},p(t,[s]){(!I||2&s)&&e!==(e=t[1])&&(document.title=e),(!I||4&s)&&l(n,"content",t[2]),(!I||8&s)&&w.p(t[3]);const a={};1&s&&(a.posts=t[0]),v.$set(a)},i(t){I||($(v.$$.fragment,t),I=!0)},o(t){x(v.$$.fragment,t),I=!1},d(t){d(n),d(E),t&&w.d(),t&&d(b),j(v,t)}}}function E(){return this.fetch("index.json").then(t=>t.json()).then(t=>({...t}))}function b(t,e,n){let{index:s}=e,{name:a}=e,{description:i}=e,{ldScript:o}=e;return t.$set=t=>{"index"in t&&n(0,s=t.index),"name"in t&&n(1,a=t.name),"description"in t&&n(2,i=t.description),"ldScript"in t&&n(3,o=t.ldScript)},[s,a,i,o]}export default class extends t{constructor(t){super(),e(this,t,b,w,n,{index:0,name:1,description:2,ldScript:3})}}export{E as preload};
