(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[153],{AW55:function(e,t,n){"use strict";var r=n("jpEE");const i="undefined"!=typeof window,StatsdClient=function(e={}){this.FLUSH_INTERVAL=1e3*(e.flushInterval||10),this.QUEUE_LIMIT=e.queueLimit||10,this.flushUrl=e.flushUrl,this._statsdQueue=[],this._beforeUnloadQueue={},this._flushTimeout=null,i&&(e.stopped||this._startIntervalFlush(),this._registerBeforeUnload())};(function(){this._preparedData=function(){return{data:this._statsdQueue}},this._flush=function(){Object(r.a)(this.flushUrl,Object(r.b)(this._preparedData())),this._statsdQueue=[]},this._flushIfNecessary=function(){this._statsdQueue.length>0&&this._flush()},this._flushBeforeOnload=function(){for(const e in this._beforeUnloadQueue)this._beforeUnloadQueue[e]&&this._beforeUnloadQueue[e]();this._flushIfNecessary()},this._record=function(e,t,n,r){const i={name:e,payload:{measurement:t,action:n}};null!==r&&(i.payload.value=r),this._statsdQueue.push(i),setTimeout(this._flushIfOverflow.bind(this),0)},this._flushIfOverflow=function(){if(this._statsdQueue.length>=this.QUEUE_LIMIT){let e=!1;null!==this._flushTimeout&&(this._stopIntervalFlush(),e=!0),this._flush(),e&&this._startIntervalFlush()}},this._stopIntervalFlush=function(){clearTimeout(this._flushTimeout),this._flushTimeout=null},this._startIntervalFlush=function(){"complete"===document.readyState&&this._flushIfNecessary(),this._flushTimeout=setTimeout(this._startIntervalFlush.bind(this),this.FLUSH_INTERVAL)},this._registerBeforeUnload=function(){"undefined"!=typeof window&&(e=>{"onpagehide"in self?(window.addEventListener("pagehide",e,{capture:!0}),document.addEventListener("visibilitychange",(t=>{"hidden"===document.visibilityState&&e(t)}),{capture:!0})):(window.addEventListener("unload",e,{capture:!0}),window.addEventListener("beforeunload",e,{capture:!0}))})(this._flushBeforeOnload.bind(this))},this.increment=function(e,t){this._record(e,t,"increment",null)},this.decrement=function(e,t){this._record(e,t,"decrement",null)},this.gauge=function(e,t,n){this._record(e,t,"gauge",n)},this.timing=function(e,t,n){this._record(e,t,"timing",n)},this.set=function(e,t,n){this._record(e,t,"set",n)},this.registerUnloadAction=function(e,t){this._beforeUnloadQueue[e]=t}}).call(StatsdClient.prototype);t.a=new StatsdClient({flushUrl:"/stats/v1/batch"})},GL5z:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n("rePB"),i=n("tYyt"),session_id=function(){let e=null;if(window.sessionStorage&&window.sessionStorage.getItem){const t=window.sessionStorage.getItem("logger_session_id");null!==t&&(e=t)}return null===e&&(e="xxxxxx".replace(/x/g,(()=>(16*Math.random()|0).toString(16)))),window.sessionStorage&&window.sessionStorage.setItem&&window.sessionStorage.setItem("logger_session_id",e),e},o=n("ODXe"),s=n("GoyQ"),a=n.n(s),c=n("MjPQ"),u=n.n(c);const errorOrMessage=e=>(e=>a()(e)&&"message"in e)(e)?"".concat(e.message):"".concat(e),captureErrorMessageStack=e=>{const t=e instanceof Error?[e,0]:[new Error(errorOrMessage(e)),1],n=Object(o.a)(t,2),r=n[0],i=n[1],s=u.a.parse(r),a=s[i];return{error:r,message:r.message,stack:{column:a.columnNumber,file:a.fileName,line:a.lineNumber,sources:s.map((e=>e.source)).join("\n")}}};function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function stringify(e,t){return t.map((t=>{let n=e[t];return void 0===n&&(n=""),"".concat(t,'="').concat(n,'"')})).join(" ")}function send(e,t,n=Object.keys(t).sort(),r){const i=stringify(t,n),o="//".concat(window.location.host,"/logs/v1/"),s=stringify({ua:window.navigator.userAgent,location:window.location.pathname,utype:CCDATA.current_user?"r":"a",uid:CCDATA.current_user?CCDATA.current_user._id:"null",backend:"container_api"},["ua","location","utype","uid","backend"]),a=document.createElement("img"),c={level:e,data:i,metadata:s,logfile:r,date:(new Date).valueOf(),session:session_id()};a.src="".concat(o,"?").concat(function paramaterize(e){let t="";for(const n in e)""!=t&&(t+="&"),t+="".concat(n,"=").concat(encodeURIComponent(e[n]));return t}(c))}const createBasicLoggerMethod=e=>(t,n,r)=>("string"==typeof t&&(t={message:t}),["development","test"].includes(i.a.get("env"))&&console[e]("".concat(n,".log"),t),send(e,t,r,n),!0),l=createBasicLoggerMethod("error"),d=createBasicLoggerMethod("warn"),h={info:createBasicLoggerMethod("info"),error:(e,t)=>{var n,r;const i=captureErrorMessageStack(e),o=i.error,s=i.message,a=i.stack;l(_objectSpread(_objectSpread({message:s},a),{extraInfo:t}),"javascript_errors"),null===(n=window.newrelic)||void 0===n||n.noticeError(o,{sameOriginError:null===(r=a.file)||void 0===r?void 0:r.includes(location.hostname),extra:t})},warn:e=>{var t;const n=captureErrorMessageStack(e),r=_objectSpread({message:n.message},n.stack);d(r,"javascript_warnings"),null===(t=window.newrelic)||void 0===t||t.addPageAction("JavaScriptWarning",r)}}},JqWL:function(e,t,n){"use strict";n.d(t,"a",(function(){return withEmotion}));var r=n("Ff2n"),i=n("K6C0"),o=n("630U"),s=n("cSFU"),a=n("q1tI"),c=n.n(a);const withEmotion=e=>t=>{let n=t.cache,u=Object(r.a)(t,["cache"]);const l=Object(a.useRef)(null!=n?n:Object(o.j)()).current;return c.a.createElement(s.a,{value:l},c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement(e,u))))}},YFq9:function(e,t,n){"use strict";var r=n("+qE3"),i=n("DzJC"),o=n.n(i);let s,a,c,u,l=!1,d=!1,h=!1,f=0,g=null,m=new Date,_=null;function setIdle(){clearTimeout(_),function stopClock(){d=!0,clearInterval(g)}()}function visibilityChange(){document.hidden&&setIdle()}function clock(){f+=1,f>0&&f%s==0&&a(f)}function trigger(){h||(l||function startRiveted(){const e=new Date;l=!0,u(e-m),g=setInterval(clock,1e3)}(),d&&function restartClock(){d=!1,clearInterval(g),g=setInterval(clock,1e3)}(),clearTimeout(_),_=setTimeout(setIdle,1e3*c+100))}const v={init:function init(e){c=e.idleTimeout,s=e.reportInterval,a=e.eventHandler,u=e.userTimingHandler,"undefined"!=typeof document&&(document.addEventListener("keydown",trigger),document.addEventListener("click",trigger),window.addEventListener("mousemove",o()(trigger,500)),window.addEventListener("scroll",o()(trigger,500)),document.addEventListener("visibilitychange",visibilityChange))},trigger:trigger,setIdle:setIdle,on:function turnOn(){h=!1},off:function turnOff(){setIdle(),h=!0},reset:function resetRiveted(){m=new Date,l=!1,d=!1,clearInterval(g),clearTimeout(_)}};class UserActivity_UserActivityEmitter extends r.EventEmitter{}const w=new UserActivity_UserActivityEmitter;v.init({idleTimeout:60,reportInterval:30,userTimingHandler:(...e)=>w.emit("timing",...e),eventHandler:()=>{w.emit("active")}}),w.riveted=v;t.a=w},cdx9:function(e,t,n){"use strict";var r=n("MKeS"),i=n("q1tI"),o=n.n(i),s=n("i8i4"),a=n.n(s),c=n("GL5z");const u="data-react-class";t.a=async(e,t={})=>{await Object(r.b)();const n=[...document.querySelectorAll("[".concat(u,"]"))];return Promise.all(n.map((async n=>{const r=n.getAttribute(u);let i=e[r];const s=t[r];if(s&&(i=await s()),i){const e=(()=>{try{var e,t;return JSON.parse((null===(e=document.getElementById("_INITIAL_REACT_PROPS_"))||void 0===e||null===(t=e.textContent)||void 0===t?void 0:t.trim())||"")}catch(e){return c.a.error(e),{}}})();n.innerHTML?a.a.hydrate(o.a.createElement(i,e),n):a.a.render(o.a.createElement(i,e),n)}})))}},eikI:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("tYyt");const i={isAdmin(){return this._hasRole("admin")},isAdvisor(){return this._hasRole("advisor")||this._hasRole("advisor_candidate")},isCustomerService(){return this._hasRole("customer_service")},isAuthor(){return this._hasRole("author")},_hasRole(e){return(this.get("roles")||[]).indexOf(e)>=0},isAnon:()=>!r.a.has("current_user"),isPro(){return this.get("pro",!1)},isAccountManager(){const e=this.getCurrentUser();return null==e?void 0:e.isAccountManager},id(){return this.get("_id","anon")},authenticationToken(){return this.get("authentication_token","")},getExperimentGroup(e){const t=this.isAnon()?r.a.get("anonymous_user"):r.a.get("current_user");if(t&&t.experiments)return t.experiments[e]},getCurrentUser:()=>r.a.get("current_user"),get(e,t){const n=(r.a.get("current_user")||{})[e];return void 0===n?t:n},hasGodMode:()=>i.isAdmin()||i.isAdvisor()||i.isAuthor(),payments:(e,t)=>r.a.get("payments",{})[e]||t}},hFGM:function(e,t,n){"use strict";n.d(t,"b",(function(){return csrf})),n.d(t,"d",(function(){return userAuth})),n.d(t,"a",(function(){return apiAuth})),n.d(t,"c",(function(){return jwtAuth}));var r=n("fw5G"),i=n.n(r),o=n("tYyt"),s=n("eikI");function csrf(e){const t=o.a.get("authenticity_token");t&&e.set("X-CSRF-Token",t)}function userAuth(e){const t=s.a.get("authentication_token");if(!s.a.isAnon()&&t){const n=new i.a(e.url).addQueryParam("authentication_token",t);e.url=n.toString()}window.CCDATA.current_user&&e.set("X-Auth-Token",window.CCDATA.current_user.authentication_token)}function apiAuth(e){const t=s.a.get("authentication_token");!s.a.isAnon()&&t&&(e.set("X-Auth-Token",t),e.set("X-User-Id",s.a.id()))}function jwtAuth(e){const t=s.a.get("jwt");t&&e.set("Authorization","Bearer ".concat(t))}},jpEE:function(e,t,n){"use strict";n.d(t,"b",(function(){return toBeaconJSON})),n.d(t,"a",(function(){return beacon}));var r=n("fw5G"),i=n.n(r),o=n("24Ii"),s=n.n(o),a=n("hFGM"),c=n("eikI");const toBeaconJSON=e=>new Blob([JSON.stringify(e)],{type:"application/json"}),beacon=(e,t,n=!1)=>{const r=!n&&window.navigator&&"function"==typeof window.navigator.sendBeacon,o=new i.a(e).addQueryParam("authentication_token",c.a.get("authentication_token")).toString();r&&((e,t)=>navigator.sendBeacon(e,t))(o,t)||((e,t)=>{const n=s.a.post(e).use(a.b).use(a.d);"string"==typeof t&&n.setHeader("Content-Type","text/plain;charset=UTF-8"),n.send(t).end()})(o,t)}},mRth:function(e,t,n){"use strict";n.r(t);n("lfCk"),n("t1M6");var r=n("ODXe"),i=n("24Ii"),o=n.n(i),s=n("GL5z"),a=n("AW55"),c=n("hFGM"),u=n("YFq9");var l={start(e){const t=window.ASSETS_VERSION;if(!t)return;let n=!0;u.a.on("active",(()=>{n=!0}));const tryRequestAssetsVersion=()=>{const r=e*(n?1:10);(async()=>{const e=(await o.a.get("/assets_version").use(c.b).set("Cache-Control","no-cache,no-store,must-revalidate,max-age=-1,private").use(c.d)).body.value;e.match("assets-v")&&(t!==e&&(a.a.increment("mandatory_assets_version.refresh","client_refresh"),window.location.assign(window.location.href)),n=!1)})().catch((e=>s.a.error(e))).finally((()=>setTimeout(tryRequestAssetsVersion,r)))};setTimeout(tryRequestAssetsVersion,e)}};const d=6e4,h=(()=>{const e=window.location.search.match(/pollFrequency=(\d+)/);if(e)try{return[0,e?parseInt(e[1],10):d]}catch(e){}return[d,d]})(),f=Object(r.a)(h,2),g=f[0],m=f[1];setTimeout((()=>{l.start(m)}),g);const _=["Script error","Script error."];class JSErrors_JSErrorLogger{constructor(){this.onError=e=>{if(!e)return;const t=e.message&&e.message.replace(/"/g,'\\"');_.some((e=>t===e))||(this.errors[t]?this.errors[t]=this.errors[t]+1:this.errors[t]=1,this.errors[t]>2||s.a.error(e))},this.errors={},this.uniqueErrorCount=0,window.addEventListener("error",this.onError),window.addEventListener("unhandledrejection",(e=>this.onError(e&&e.reason)))}}var v=n("w6Sm");const sendWebVitalsReport=e=>{var t;if(404===(null===(t=CCDATA)||void 0===t?void 0:t.response_status))return;let n=new URL(window.location.href).pathname.substring(1).replace(/\/.*/,"-x");/[A-Z0-9]/.test(n)&&(n="other"),a.a.timing("web_vitals.".concat(n||"-"),e.name,e.value)},w=Math.floor(100*Math.random())<=50;new JSErrors_JSErrorLogger,w&&(Object(v.a)(sendWebVitalsReport),Object(v.c)(sendWebVitalsReport),Object(v.d)(sendWebVitalsReport),Object(v.e)(sendWebVitalsReport),Object(v.b)(sendWebVitalsReport)),Promise.all([n.e(103),n.e(285)]).then(n.bind(null,"y7H3")).then((({default:e})=>{e.track()})),console.log("👋 Hi there!\nWhile you're here, how about popping over to https://codecademy.com/about/careers?\nWe're hiring for passionate, talented engineers, and would love to hear from you! ✨\n")},tYyt:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const getCCDATA=()=>"undefined"!=typeof window&&window.CCDATA||{},r={get:(e,t)=>getCCDATA()[e]||t,has:e=>e in getCCDATA()}}}]);
//# sourceMappingURL=153.fa4788690796e2f97e68.chunk.js.map