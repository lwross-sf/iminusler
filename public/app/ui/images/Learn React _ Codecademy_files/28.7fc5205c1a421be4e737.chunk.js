(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[28],{lvaA:function(e,t,r){"use strict";r.d(t,"a",(function(){return SafeSvg}));var c=r("wx14"),n=r("ODXe"),o=r("rePB"),a=r("iOII"),s=r.n(a),i=r("1TcP"),O=r.n(i),u=r("q1tI"),p=r.n(u),b=r("W2rJ"),l=r.n(b);const getAttributeValue=(e,t)=>{const r=new RegExp("".concat(t,'="(.*?)"')),c=e.match(r);return c&&c[1]},transformViewBox=e=>{const t=getAttributeValue(e,"width"),r=getAttributeValue(e,"height");return r&&t?e.replace(/width=".*?" ?/,"").replace(/height=".*?" ?/,"").replace("<svg",'<svg viewBox="0 0 '.concat(parseInt(t,10)," ").concat(parseInt(r,10),'"')):e};function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function SafeSvg(e){const t=e.src,r=e.fallback,a=e.title,i=e.svgProps,b=e.viewBox,f=function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({cacheRequests:!1,title:a},i),w=Object(u.useState)(t),j=Object(n.a)(w,2),g=j[0],y=j[1],h=Object(u.useCallback)((()=>y(r)),[r]),v=Object(u.useMemo)((()=>{const e=[b&&transformViewBox,O.a].filter(s.a);return t=>e.reduce(((e,t)=>t(e)),t)}),[b]);return p.a.createElement(l.a,Object(c.a)({src:g,onError:h,preProcessor:v},f))}}}]);
//# sourceMappingURL=28.7fc5205c1a421be4e737.chunk.js.map