import{S as t,i as e,s as n,e as s,a,b as i,c as o,q as d,d as r,f as c,g as m,h as p,j as l,k as h,l as u,m as f,t as $,n as x,o as j,H as b}from"./client.069bba74.js";import"./Entry.25ba4de6.js";import"./url.27107d4a.js";import"./Details.132791c9.js";import{I as g}from"./Index.06dc49bb.js";function S(t){let e,n,S,w,E,v,I;return document.title=e=t[1],v=new g({props:{posts:t[0]}}),{c(){n=s("meta"),w=a(),E=i(),o(v.$$.fragment),this.h()},l(t){const e=d('[data-svelte="svelte-1p8md3w"]',document.head);n=r(e,"META",{name:!0,content:!0}),w=a(),e.forEach(c),E=m(t),p(v.$$.fragment,t),this.h()},h(){l(n,"name","description"),l(n,"content",t[2]),S=new b(w)},m(e,s){h(document.head,n),S.m(t[3],document.head),h(document.head,w),u(e,E,s),f(v,e,s),I=!0},p(t,[s]){(!I||2&s)&&e!==(e=t[1])&&(document.title=e),(!I||4&s)&&l(n,"content",t[2]),(!I||8&s)&&S.p(t[3]);const a={};1&s&&(a.posts=t[0]),v.$set(a)},i(t){I||($(v.$$.fragment,t),I=!0)},o(t){x(v.$$.fragment,t),I=!1},d(t){c(n),c(w),t&&S.d(),t&&c(E),j(v,t)}}}function w(){return this.fetch("index.json").then(t=>t.json()).then(t=>({...t}))}function E(t,e,n){let{index:s}=e,{name:a}=e,{description:i}=e,{ldScript:o}=e;return t.$set=t=>{"index"in t&&n(0,s=t.index),"name"in t&&n(1,a=t.name),"description"in t&&n(2,i=t.description),"ldScript"in t&&n(3,o=t.ldScript)},[s,a,i,o]}export default class extends t{constructor(t){super(),e(this,t,E,S,n,{index:0,name:1,description:2,ldScript:3})}}export{w as preload};
