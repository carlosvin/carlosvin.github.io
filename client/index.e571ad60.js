import{S as e,i as t,s as n,e as s,a,c as i,q as o,b as r,d as c,f as d,g as m,h as p,j as l,k as f,m as h,t as u,l as j,n as $}from"./client.3cc994e0.js";import"./Entry.059c5481.js";import"./url.9859ae3c.js";import"./Details.611fd9ef.js";import{I as x}from"./Index.97d019e0.js";function g(e){let t,n,g,y,w,E;return document.title=t=e[1],w=new x({props:{posts:e[0]}}),{c(){n=s("meta"),g=s("link"),y=a(),i(w.$$.fragment),this.h()},l(e){const t=o('[data-svelte="svelte-1jtsnhe"]',document.head);n=r(t,"META",{name:!0,content:!0}),g=r(t,"LINK",{rel:!0,href:!0,type:!0}),t.forEach(c),y=d(e),m(w.$$.fragment,e),this.h()},h(){p(n,"name","description"),p(n,"content",e[2]),p(g,"rel","alternate"),p(g,"href","index.jsonld"),p(g,"type","application/ld+json")},m(e,t){l(document.head,n),l(document.head,g),f(e,y,t),h(w,e,t),E=!0},p(e,[s]){(!E||2&s)&&t!==(t=e[1])&&(document.title=t),(!E||4&s)&&p(n,"content",e[2]);const a={};1&s&&(a.posts=e[0]),w.$set(a)},i(e){E||(u(w.$$.fragment,e),E=!0)},o(e){j(w.$$.fragment,e),E=!1},d(e){c(n),c(g),e&&c(y),$(w,e)}}}async function y(){return await(await this.fetch("index.json")).json()}function w(e,t,n){let{index:s}=t,{name:a}=t,{description:i}=t;return e.$$set=e=>{"index"in e&&n(0,s=e.index),"name"in e&&n(1,a=e.name),"description"in e&&n(2,i=e.description)},[s,a,i]}export default class extends e{constructor(e){super(),t(this,e,w,g,n,{index:0,name:1,description:2})}}export{y as preload};
