(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[0],{cFwM:function(e,t,s){"use strict";s.d(t,"a",(function(){return Q})),s.d(t,"b",(function(){return l.b}));var a=s("TSYQ"),r=s.n(a),o=s("fhzG"),n=s.n(o),i=s("q1tI"),c=s.n(i),l=s("wXPd"),p=s("FZcb"),u=s("A+v3"),h=s("/MKj"),m=s("pruR"),d=s("2oex"),v=s("jm0D"),_=s("CWAm"),g="courseNavButtonContainer__2Hwmek15R0ChO4zMDSUiNe",E="courseNavButton__1TaTVvi920_GfVQLe4MNbm",N="leftArrowIcon__19auy-XWZ0yJtHVnNhsKbj";const CoursePageButton_CoursePageButton=({courseTitle:e,url:t})=>{const s=Object(h.useDispatch)(),a={data:{target:"le_nav_sidebar_syllabus_link",href:t}};return c.a.createElement("div",{className:g},e&&t?c.a.createElement("a",{href:t,className:E,onClick:()=>s(Object(_.f)(a))},c.a.createElement(v.a,{className:N}),e):null)};var C=s("veT5"),k="lessonAuthors__3b8ArvmppYIi4bb6ciYI9s",b="lessonAuthorLink__1noj4u7xBF5-Qeygq_hL1G";const Authors_Authors=({authors:e=[]})=>e.length>0?c.a.createElement("div",{className:k},c.a.createElement("span",null,"By "),e.map(((t,s)=>c.a.createElement("span",{key:t},c.a.createElement("a",{className:b,target:"_blank",href:"/".concat(t),rel:"noopener noreferrer"},t),s<e.length-1?", ":"")))):null;var x=s("Rab/"),L="groupHeading__8vd9L8QPuPHJbdyPLbrMs",f="navButton__1LnCf0Nz-p8fUiWXJ8j6ID",A="activeListItem__3cqHsodqd_DwQVPzRDp2UY",j="completedListItem__dprwOnLLcMeA7xjpg2Lpw",O="navButtonIcon__1fTQiWP1OucamdARpFSCY4",I="lockedListItem__gtnOckHHSbFi0qwtm0EvU",R="listItemTitle__1ULs9TSLKsTAuzOvAGV_pN",y="exerciseSection__YkgNw3d5haz7SBRKhUNgj";function isCompleted({progress:e},t){const s=e.completed,a=e.exercises_completed>=t+1;return s||a}function isInProgressExercise({progress:e},t){return e.exercises_completed===t}const T={trackClick:_.f};var w=Object(h.connect)((e=>({locationQuery:Object(x.j)(e)})),T)((e=>{const t=e.currentExercise;return c.a.createElement("section",{className:y},c.a.createElement("div",{className:L},"Exercises"),e.exercises.map(((s,a)=>{const o=isCompleted(e,a),n=t.id===s.id,i=isInProgressExercise(e,a),l=function isLockedExercise(e,t){return!e.unlockAll&&!isInProgressExercise(e,t)&&!isCompleted(e,t)}(e,a),p=r()(f,{[j]:o||e.unlockAll,[A]:n,[I]:l}),u=r()(O,"fcn-icon",{"fcn-icon-checkmark":o||e.unlockAll,"fcn-icon-inProgress":i&&!e.unlockAll,"fcn-icon-lock":l});return c.a.createElement("button",{onClick:()=>{e.trackClick({data:{target:"le_nav_sidebar_exercise",context:"exercise_".concat(a+1)}}),l||(e.navigate({exerciseIndex:a}),e.onRequestClose())},className:p,key:"".concat(e.currentLesson.id,"-").concat(s.id)},c.a.createElement("div",{className:R},"".concat(a+1,".")," ",s.title),c.a.createElement("i",{className:u}))})))})),P="heading__37r3mjk_uVho7bFZrrjHJ",S="subheading__1gomEUlRHmsbpF5rmlv1wD",B="description__qoKffaAVmUOcQIPER-ZiC";const Lesson=({authors:e,currentLesson:t,exercises:s,progress:a,currentExercise:r,onRequestClose:o,unlockAll:n,navigate:i})=>c.a.createElement("div",null,c.a.createElement("h1",{className:P},t.title),c.a.createElement("h3",{className:S},"LESSON"),c.a.createElement(Authors_Authors,{authors:e}),c.a.createElement(C.a,{className:B,text:t.description||""}),c.a.createElement(w,{navigate:i,currentLesson:t,exercises:s,progress:a,currentExercise:r,onRequestClose:o,unlockAll:n})),Project=({project:e})=>c.a.createElement("div",null,c.a.createElement("h1",{className:P},e.title),c.a.createElement("h3",{className:S},"PROJECT"),c.a.createElement(C.a,{className:B,text:e.description}));var D={modalOverlay:"modalOverlay__hh4pyyLjakjv1qSsTMDU4",modal:"modal__E4iY_K3NyCDx57euE7d5",slideInLeft:"slideInLeft__ymWocB4dX3uDjGE_5_B0M",modalIsClosing:"modalIsClosing__2yDcA2j_TFC7WqapdYKW-W",slideOutLeft:"slideOutLeft__3nW8i81Y38brSdvPeMXVF5",closeButton:"closeButton__2cv-8g3r_7FYZ_i4gzyFei"};class CourseNavigator_CourseNavigator extends i.Component{constructor(...e){super(...e),this.state={isClosing:!1},this.handleRequestClose=()=>{this.setState({isClosing:!0}),setTimeout((()=>{this.setState({isClosing:!1}),this.props.onRequestClose()}),300)}}renderNavigationContent(){switch(this.props.currentType){case"lesson":return c.a.createElement(Lesson,{navigate:this.props.navigate,currentLesson:this.props.currentLesson,authors:this.props.authors,progress:this.props.contentItemProgresses[this.props.currentLesson.id],exercises:this.props.exercises,currentExercise:this.props.currentExercise,onRequestClose:this.props.onRequestClose,unlockAll:this.props.unlockAll});case"project":return c.a.createElement(Project,{project:this.props.project});default:return null}}render(){return c.a.createElement(m.a,{zIndex:13,isOpen:this.props.isOpen,onRequestClose:this.handleRequestClose},c.a.createElement("div",{className:"".concat(D.modal," ").concat(this.state.isClosing?D.modalIsClosing:"")},c.a.createElement("div",{className:D.modalContent},c.a.createElement(CoursePageButton_CoursePageButton,{url:this.props.titleRoute,courseTitle:this.props.containerTitle}),this.renderNavigationContent()),c.a.createElement(p.a,{"data-testid":"le-sidebar-close-icon",className:D.closeButton,onClick:this.handleRequestClose,"aria-label":"Close ".concat(this.props.currentType," menu"),link:!0},c.a.createElement(u.a,{size:16,color:"white"}))))}}var q=Object(h.connect)((e=>({containerTitle:Object(d.g)(e)})))(CourseNavigator_CourseNavigator),M=s("TP7S"),F=s.n(M),Y=s("6vz9"),H=s.n(Y),U=s("oaYs");const z={trackClick:_.f};class NavMenuButton_NavMenuButton extends c.a.Component{constructor(...e){super(...e),this.state={active:this.props.active,close:this.props.active},this.active=e=>{this.setState({active:F()(e)?this.props.active:e})},this.close=e=>{this.setState({close:F()(e)?this.props.active:e})},this.handleClick=e=>{e.preventDefault(),this.props.onClick&&this.props.onClick(e),this.props.trackClick({data:{target:"le_nav_sidebar"}})}}UNSAFE_componentWillReceiveProps(e){e.active&&!this.props.active?(this.active(e.active),H()(this.close,150)):e.active!==this.props.active&&(this.close(e.active),H()(this.active,150))}render(){const e=this.props.className,t=r()({[U.a.active]:this.state.active,[U.a.close]:this.state.close},U.a.button,e);return c.a.createElement("button",{type:"button",onClick:this.handleClick,className:t},c.a.createElement("span",{className:U.a.burger}),c.a.createElement("span",{"data-testid":"course-navigator",className:U.a.exerciseTitle},this.props.title))}}NavMenuButton_NavMenuButton.defaultProps={active:!1};var W=Object(h.connect)(null,z)(NavMenuButton_NavMenuButton),K="disabled__1rpcEMmxdzLYJhY71WOLM1",V="footer__25PvK9FVvEnZemeDogAy1H";const Q=n()({displayName:"Footer",getDefaultProps:()=>({disabled:!1}),getInitialState:()=>({showNavigation:!1}),getCourseNavigatorToggle(){return c.a.createElement(l.b,{position:"left"},c.a.createElement(l.c,null,c.a.createElement(W,{title:this.props.title,onClick:this.toggleCourseNavigator,active:this.state.showNavigation})))},getCourseNavigator(){return c.a.createElement(q,{onRequestClose:this.toggleCourseNavigator,currentType:this.props.currentType,currentLesson:this.props.currentLesson,currentExercise:this.props.currentExercise,exercises:this.props.exercises,params:this.props.params,isOpen:this.state.showNavigation,navigate:this.props.navigate,titleRoute:this.props.titleRoute,contentItemProgresses:this.props.contentItemProgresses,unlockAll:this.props.unlockAll,authors:this.props.authors,project:this.props.project})},toggleCourseNavigator(){this.setState((e=>({showNavigation:!e.showNavigation})))},render(){const e=r()({[V]:!0,[K]:this.props.disabled},this.props.className);return c.a.createElement(l.a,{className:e},this.props.title&&this.getCourseNavigatorToggle(),this.props.titleRoute&&this.getCourseNavigator(),this.props.children)}})}}]);
//# sourceMappingURL=0.caf710568036302d545c.chunk.js.map