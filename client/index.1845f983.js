import{S as t,i as s,s as e,e as n,t as a,a as i,c as r,b as o,d as c,f as p,g as m,h as d,j as f,k as h,l,m as u,n as x,o as $,p as j,q as E,r as S,H as b}from"./client.3b4c5ee2.js";import"./Entry.ed45375c.js";import"./url.a4db7e2a.js";import"./Details.e13b4e55.js";import{I as g}from"./Index.8f431bff.js";function A(t){let s,e,A,I,T,v,w,D,H,P;return H=new g({props:{posts:t[0]}}),{c(){s=n("sapper:head"),e=n("title"),A=a(t[1]),I=i(),T=n("meta"),v=i(),D=i(),r(H.$$.fragment),this.h()},l(n){s=o(n,"SAPPER:HEAD",{});var a=c(s);e=o(a,"TITLE",{});var i=c(e);A=p(i,t[1]),i.forEach(m),I=d(a),T=o(a,"META",{name:!0,content:!0}),v=d(a),a.forEach(m),D=d(n),f(H.$$.fragment,n),this.h()},h(){h(T,"name","description"),h(T,"content",t[2]),w=new b(null)},m(n,a){l(n,s,a),u(s,e),u(e,A),u(s,I),u(s,T),u(s,v),w.m(t[3],s),l(n,D,a),x(H,n,a),P=!0},p(t,[s]){(!P||2&s)&&$(A,t[1]),(!P||4&s)&&h(T,"content",t[2]),(!P||8&s)&&w.p(t[3]);const e={};1&s&&(e.posts=t[0]),H.$set(e)},i(t){P||(j(H.$$.fragment,t),P=!0)},o(t){E(H.$$.fragment,t),P=!1},d(t){t&&m(s),t&&m(D),S(H,t)}}}function I(){return this.fetch("rss"),this.fetch("sitemap.xml"),this.fetch("index.json").then(t=>t.json()).then(t=>({...t}))}function T(t,s,e){let{index:n}=s,{name:a}=s,{description:i}=s,{ldScript:r}=s;return t.$set=t=>{"index"in t&&e(0,n=t.index),"name"in t&&e(1,a=t.name),"description"in t&&e(2,i=t.description),"ldScript"in t&&e(3,r=t.ldScript)},[n,a,i,r]}export default class extends t{constructor(t){super(),s(this,t,T,A,e,{index:0,name:1,description:2,ldScript:3})}}export{I as preload};
