(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[8],{"96qd":function(t,e,n){"use strict";n.d(e,"a",(function(){return NotificationsList}));var a=n("ODXe"),i=n("yrBZ"),o=n("QqFe"),c=n("e1kA"),l=n("gnaW"),r=n("630U"),s=n("7xvl"),u=n("q1tI"),d=n.n(u),m=n("z9go");const f={"location/DASHBOARD":"dashboard_v2","location/CATALOG":"catalog","location/COURSE":"course_landing_page","location/PATH":"path_landing_page","location/COURSE_CONTENT_ITEM":"le_course_content_item","location/PATH_CONTENT_ITEM":"le_path_content_item"},byDate=(t,e)=>new Date(e.time).getTime()-new Date(t.time).getTime(),getSortedNotifications=(t,e)=>t.length?t.sort(byDate).slice(0,e).map((t=>{var e;return{date:Object(s.a)(new Date(t.time)),id:t.id,iconSettings:{color:r.h["blue-900"]},link:t.href,text:t.description,unread:1===t.status,campaign:t.campaign_name,imageUrl:null===(e=t.img)||void 0===e?void 0:e.slug,type:t.type}})):[],getTrackNotificationClick=t=>e=>{Object(m.b)("notification","clicked",{target:"notification_bell_cta",page_name:t&&f[t]||null,event_id:e.id,context:e.campaign,type:e.type}),Object(m.c)({target:"notification_bell_cta",page_name:t&&f[t],context:"topnav_bell",slug:e.campaign,type:e.type})},NotificationsList=({locationType:t,clearNotifications:e,notifications:n})=>{const r=Object(u.useState)(!1),s=Object(a.a)(r,2),_=s[0],p=s[1],g=_?[n.length,"Less"]:[3,"More"],b=Object(a.a)(g,2),h=b[0],O=b[1],E=n.length>0&&n.length<=h;return d.a.createElement(i.b,{backgroundColor:"white",flexDirection:"column",paddingTop:32,paddingBottom:24,tabIndex:-1},d.a.createElement(i.b,{alignItems:"center",flexDirection:"row",height:"40",justifyContent:"space-between",paddingX:32},d.a.createElement(l.a,{as:"h1",fontSize:22,fontWeight:"title",textColor:"navy"},"My Notifications"),E&&d.a.createElement(o.e,{onClick:()=>{e(n.map((t=>t.id))),Object(m.c)({target:"notification_clear_all",page_name:t&&f[t],context:"topnav_bell"})}},"Clear All")),d.a.createElement(i.a,{maxHeight:"520",overflow:"auto"},d.a.createElement(i.a,{paddingY:16},d.a.createElement(c.a,{notifications:getSortedNotifications(n,h),onNotificationClick:getTrackNotificationClick(t),onDismiss:n=>(n=>{e([n.id]),Object(m.c)({target:"notification_clear",page_name:t&&f[t],slug:n.campaign,type:n.type,context:"topnav_bell"})})(n)})),n.length>3&&d.a.createElement(i.a,{paddingX:32},d.a.createElement(o.e,{onClick:()=>{_&&Object(m.c)({target:"notification_show_more",page_name:t&&f[t],context:"topnav_bell"}),p(!_)},"data-testid":"Show ".concat(O)},"Show ",O))))}},AKvC:function(t,e,n){"use strict";n.d(e,"a",(function(){return NotificationsListV1}));var a=n("udU5"),i=n("630U"),o=n("7xvl"),c=n("q1tI"),l=n.n(c),r=n("z9go"),s=n("g3jP"),u=n.n(s);const d={"location/DASHBOARD":"dashboard_v2","location/CATALOG":"catalog","location/COURSE":"course_landing_page","location/PATH":"path_landing_page","location/COURSE_CONTENT_ITEM":"le_course_content_item","location/PATH_CONTENT_ITEM":"le_path_content_item"},byDate=(t,e)=>new Date(e.time).getTime()-new Date(t.time).getTime();class NotificationsListV1 extends c.Component{constructor(...t){super(...t),this.trackNotificationClick=t=>{const e=this.props.locationType;Object(r.b)("notification","clicked",{target:"notification_bell_cta",page_name:e&&d[e]||null,event_id:t.id,context:t.campaign}),Object(r.c)({target:"notification_bell_cta",page_name:e&&d[e],event_id:t.id,context:t.campaign})},this.componentWillUnmount=()=>{this.props.notificationsDeleted(this.props.notifications.map((({id:t})=>t)))},this.getImageType=({img:t,campaign_name:e})=>{if("achievements"===e)return{icon:"trophy",url:void 0};if("streaks"===e)return{icon:void 0,url:u.a};const n=null==t?void 0:t.type,a=null==t?void 0:t.slug;let i;return"url"===n&&(i=a||"https://static-assets.codecademy.com/hz8pz5npugtfcushztkyvgvmedpj/codecademy_logo_for_notification.png"),{icon:"icon"===n?a:void 0,url:i}}}render(){const t=this.props.notifications.sort(byDate).map((t=>{const e=this.getImageType(t),n=e.icon,a=e.url;return{date:Object(o.a)(new Date(t.time)),id:t.id,iconSettings:{color:i.h["blue-900"]},iconSlug:n,imageUrl:a,link:t.href,text:t.description,unread:1===t.status,campaign:t.campaign_name}}));return l.a.createElement(a.a,{className:this.props.className,notifications:t,onNotificationClick:this.trackNotificationClick})}}},QJz3:function(t,e,n){"use strict";n.d(e,"b",(function(){return useNotificationArea})),n.d(e,"c",(function(){return useNotificationInteractions})),n.d(e,"a",(function(){return useNotifications}));var a=n("q1tI"),i=n("/MKj"),o=n("G4qV"),c=n("GsXu"),l=n("tQXl");function useNotificationArea(t){const e=t.id,n=Object(a.useMemo)((()=>Object(l.a)(e)),[e]),c=Object(l.b)(n),r=Object(o.b)({notifications:n,unreadCount:c});return Object(i.useSelector)(r)}function useNotificationInteractions(){const t=Object(i.useDispatch)();return Object(a.useMemo)((()=>({notificationsDeleted:e=>t(Object(c.d)(e))})),[t])}function useNotifications(t){!function useNotificationSubscribe(t){const e=Object(i.useDispatch)();return Object(a.useEffect)((()=>(e(Object(c.c)(t)),()=>{e(Object(c.b)(t.id))})),[e,t])}(t);return{data:useNotificationArea(t),actions:useNotificationInteractions()}}},g3jP:function(t,e,n){t.exports=n.p+"2e7770af3a38c3442e7802f2f6a91a6f.svg"},gnd6:function(t,e,n){"use strict";n.d(e,"a",(function(){return NotificationsDropdown}));var a=n("ODXe"),i=n("/VKx"),o=n("7Wyp"),c=n("q1tI"),l=n.n(c),r=n("tFdb"),s=n("96qd"),u=n("AKvC"),d=n("Xxlx"),m=n("6lXR"),f=n("QJz3"),_=n("ixXQ"),p="dropdown__1F_fcRWv-pe25RtHTZdeFh",g="notifications__dQ5YhPElQyuN4YvV60puJ",b="menuBell__3g4iBnjXjfVM0Q6IKDdIdT",h="topDropdown__1HUStgseh56noHmJ3KzVoN";const NotificationsDropdown=t=>{const e=Object(m.a)("persistent_notifications"),n=Object(f.a)(_.a.HEADER_AREA),O=n.data,E=n.actions,v=O.notifications,j=O.unreadCount,N=E.notificationsDeleted,T=t.locationType,A=Object(c.useRef)(null),C=Object(c.useState)(!1),D=Object(a.a)(C,2),y=D[0],k=D[1],x=l.a.createElement("div",{ref:A},l.a.createElement(i.a,{center:!0,className:b},l.a.createElement(d.a,{data:{context:"global_nav",target:"notification_bell"},disableTracking:!!y,"aria-label":"notifications","data-testid":"notification_bell"},l.a.createElement(r.a,{theme:t.theme,key:"notification-bell",unreadCount:j,onClick:()=>{k(!y)}}))));return l.a.createElement(l.a.Fragment,null,x,l.a.createElement(o.a,{className:h,align:"right",verticalOffset:1,outline:!0,isOpen:y,onRequestClose:()=>{k(!1)},targetRef:A},l.a.createElement(i.a,{column:!0,className:p},e?l.a.createElement(s.a,{locationType:T,notifications:v,clearNotifications:N}):l.a.createElement(u.a,{className:g,notifications:v,notificationsDeleted:N,locationType:T}))))}},ixXQ:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));const a={HEADER_AREA:{id:"bell",types:[],showRead:!0},TOAST_AREA:{id:"toast",types:["achievement","target_not_met","target_met","target_exceeded","streak_extended","streak_started"],showRead:!1,limit:3,timeframe:1800}}},svkj:function(t,e,n){"use strict";n.d(e,"a",(function(){return FeatureFlag}));var a=n("6lXR");const FeatureFlag=({flagName:t,children:e})=>e(Object(a.a)(t))},tFdb:function(t,e,n){"use strict";n.d(e,"a",(function(){return NotificationBell}));var a=n("ODXe"),i=n("FZcb"),o=n("Apmp"),c=n("TSYQ"),l=n.n(c),r=n("q1tI"),s=n.n(r),u={bell:"bell__AzBwO6vfXd1vBBNs_toEi",light:"light__2QkOxErjEG_gJjXx-P0vkr",unreadWrapper:"unreadWrapper__vRj5dfRgbpv3O9pAY9p9w",unread:"unread__CEzUq-gsL9aPdjh-k_4RR"};const NotificationBell=({as:t="button",className:e,theme:n="dark",unreadCount:c,onClick:d})=>{const m=Object(r.useState)(),f=Object(a.a)(m,2),_=f[0],p=f[1];Object(r.useEffect)((()=>{p(window.document.querySelector('link[rel="shortcut icon"]'))}),[]),Object(r.useEffect)((()=>{_&&(_.href="/favicon".concat(c?"-unread":"",".ico"))}),[c,_]);const g=l()(u.bell,u["".concat(n)],e);return s.a.createElement(i.a,{as:t,className:g,flat:!0,onClick:d,theme:"brand-dark-blue",type:"button","aria-label":c>0?"Toggle Notification Menu, ".concat(c," notifications"):"Toggle Notification Menu"},s.a.createElement(o.a,{size:20}),0!==c&&s.a.createElement("div",{id:"notification-count",className:u.unreadWrapper},s.a.createElement("p",{className:u.unread},c>99?99:c)))}}}]);
//# sourceMappingURL=8.3d80955b893df46a30b8.chunk.js.map