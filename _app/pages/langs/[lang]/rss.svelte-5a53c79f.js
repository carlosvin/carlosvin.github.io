import{S as n,i as t,s as a,e as s,t as r,c as e,a as o,g as c,d as u,f as i,G as f,h as l,I as p}from"../../../chunks/vendor-aa34231d.js";function d(n){let t,a,d;return{c(){t=s("p"),a=r("RSS "),d=r(n[0])},l(s){t=e(s,"P",{});var r=o(t);a=c(r,"RSS "),d=c(r,n[0]),r.forEach(u)},m(n,s){i(n,t,s),f(t,a),f(t,d)},p(n,[t]){1&t&&l(d,n[0])},i:p,o:p,d(n){n&&u(t)}}}var h=function(n,t,a,s){return new(a||(a=Promise))((function(r,e){function o(n){try{u(s.next(n))}catch(t){e(t)}}function c(n){try{u(s.throw(n))}catch(t){e(t)}}function u(n){var t;n.done?r(n.value):(t=n.value,t instanceof a?t:new a((function(n){n(t)}))).then(o,c)}u((s=s.apply(n,t||[])).next())}))};function v({params:n}){return h(this,void 0,void 0,(function*(){return{props:n}}))}function g(n,t,a){let{lang:s}=t;return n.$$set=n=>{"lang"in n&&a(0,s=n.lang)},[s]}class m extends n{constructor(n){super(),t(this,n,g,d,a,{lang:0})}}export{m as default,v as load};
