(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[616],{KgJJ:function(e,t,r){"use strict";r.r(t),r.d(t,"ProjectPage",(function(){return ProjectPage}));var n=r("MKeS"),o=r("q1tI"),s=r.n(o),c=r("/MKj"),i=r("svkj"),l=r("Tqhk"),a=r("wE9P"),u=r("yy36");const m=Object(n.a)({resolved:{},chunkName:()=>"platform-scenes-project-project",isReady(e){const t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>Promise.all([r.e(179),r.e(27),r.e(278),r.e(147),r.e(640),r.e(467),r.e(127),r.e(264),r.e(513),r.e(4),r.e(20),r.e(3),r.e(91),r.e(119),r.e(154),r.e(34),r.e(219),r.e(0),r.e(136),r.e(155),r.e(409)]).then(r.bind(null,"pW1L")),requireAsync(e){const t=this.resolve(e);return this.resolved[t]=!1,this.importAsync(e).then((e=>(this.resolved[t]=!0,e)))},requireSync(e){const t=this.resolve(e);return r(t)},resolve(){return"pW1L"}}),h=Object(n.a)({resolved:{},chunkName:()=>"platform-scenes-project-legacy-projects",isReady(e){const t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>Promise.all([r.e(179),r.e(27),r.e(278),r.e(147),r.e(640),r.e(467),r.e(165),r.e(293),r.e(513),r.e(4),r.e(20),r.e(24),r.e(51),r.e(34),r.e(219),r.e(78),r.e(0),r.e(144),r.e(155),r.e(48)]).then(r.bind(null,"yZ2X")),requireAsync(e){const t=this.resolve(e);return this.resolved[t]=!1,this.importAsync(e).then((e=>(this.resolved[t]=!0,e)))},requireSync(e){const t=this.resolve(e);return r(t)},resolve(){return"yZ2X"}}),mapStateToProps=(e,{currentContentItem:t})=>({currentContentItemProgress:Object(a.a)(e,t),isPro:Object(u.x)(e)});class ProjectPage extends o.Component{constructor(...e){super(...e),this.onProjectComplete=()=>{const e=this.props,t=e.showNextContentInterstitial,r=e.next;t?t():r&&r()}}track(e={}){const t=this.props,r=t.currentContentItem,n=t.trackVisit;e.currentContentItem!==r&&n&&n()}componentDidMount(){this.track()}componentDidUpdate(e){this.track(e)}render(){const e=this.props,t=e.currentContentItem,r=e.currentContentItemProgress,n=e.exitPaths,o=e.prerender,a=e.currentCourse,u=e.redirectToContainerCourse,p=e.program,d=e.disabled;return r?s.a.createElement(l.a,null,s.a.createElement(i.a,{flagName:"le_next"},(e=>e?s.a.createElement(m,{exitPaths:n,currentContentItem:t,currentProjectProgress:r,course:a,onProjectComplete:this.onProjectComplete}):s.a.createElement("div",null,s.a.createElement(c.ReactReduxContext.Consumer,null,(({store:e})=>s.a.createElement(h,{store:e,currentProject:t,currentProjectProgress:r,disabled:d,exitPaths:n,prerender:o,redirectToContainerCourse:u,isLintingDisabled:!1,course:a,programSlug:p&&p.slug,onProjectComplete:this.onProjectComplete}))))))):null}}t.default=Object(c.connect)(mapStateToProps)(ProjectPage)}}]);
//# sourceMappingURL=platform-scenes-project.8a74d64ebb2fb21865e6.chunk.js.map