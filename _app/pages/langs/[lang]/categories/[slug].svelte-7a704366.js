import{S as t,i as n,s as e,e as s,k as a,j as i,N as o,c,d as r,n as l,m as u,b as d,E as p,f as h,o as f,x as m,u as g,v as $}from"../../../../chunks/vendor-2fc700c3.js";import{I as j}from"../../../../chunks/Index-f4049a41.js";import"../../../../chunks/Entry-21bc1112.js";import"../../../../chunks/Details-b0197738.js";import"../../../../chunks/url-28a36952.js";import"../../../../chunks/conf-318ca8e3.js";import"../../../../chunks/lang-705e888d.js";function v(t){let n,e,v,x,k;return document.title=n=`Posts related with ${t[1]}`,x=new j({props:{posts:t[0],title:t[1],lang:t[3]}}),{c(){e=s("meta"),v=a(),i(x.$$.fragment),this.h()},l(t){const n=o('[data-svelte="svelte-1nk7vjz"]',document.head);e=c(n,"META",{name:!0,content:!0}),n.forEach(r),v=l(t),u(x.$$.fragment,t),this.h()},h(){d(e,"name","description"),d(e,"content",t[2])},m(t,n){p(document.head,e),h(t,v,n),f(x,t,n),k=!0},p(t,[s]){(!k||2&s)&&n!==(n=`Posts related with ${t[1]}`)&&(document.title=n),(!k||4&s)&&d(e,"content",t[2]);const a={};1&s&&(a.posts=t[0]),2&s&&(a.title=t[1]),8&s&&(a.lang=t[3]),x.$set(a)},i(t){k||(m(x.$$.fragment,t),k=!0)},o(t){g(x.$$.fragment,t),k=!1},d(t){r(e),t&&r(v),$(x,t)}}}var x=function(t,n,e,s){return new(e||(e=Promise))((function(a,i){function o(t){try{r(s.next(t))}catch(n){i(n)}}function c(t){try{r(s.throw(t))}catch(n){i(n)}}function r(t){var n;t.done?a(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(o,c)}r((s=s.apply(t,n||[])).next())}))};function k({page:t,fetch:n}){return x(this,void 0,void 0,(function*(){const{lang:e}=t.params,s=yield(yield n(`${t.path}.json`)).json();return{props:Object.assign(Object.assign({},s),{lang:e})}}))}function w(t,n,e){let{index:s}=n,{title:a}=n,{description:i}=n,{lang:o}=n;return t.$$set=t=>{"index"in t&&e(0,s=t.index),"title"in t&&e(1,a=t.title),"description"in t&&e(2,i=t.description),"lang"in t&&e(3,o=t.lang)},[s,a,i,o]}class y extends t{constructor(t){super(),n(this,t,w,v,e,{index:0,title:1,description:2,lang:3})}}export{y as default,k as load};
