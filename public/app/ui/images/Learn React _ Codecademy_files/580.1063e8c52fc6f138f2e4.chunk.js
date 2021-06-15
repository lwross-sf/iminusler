/*! For license information please see 580.1063e8c52fc6f138f2e4.chunk.js.LICENSE.txt */
(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[580],{"2zs7":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.canUseDOM=void 0;var n=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(o("2rMq")).default,r=n.canUseDOM?window.HTMLElement:{};t.canUseDOM=n.canUseDOM;t.default=r},"9rZX":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(o("qFS3"));t.default=n.default,e.exports=t.default},NPsS:function(e,t,o){"use strict";var warning=function(){};e.exports=warning},QEso:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}(),a=o("q1tI"),s=_interopRequireDefault(a),i=_interopRequireDefault(o("17x9")),u=_interopRequireWildcard(o("VKEO")),c=_interopRequireDefault(o("S1to")),d=_interopRequireWildcard(o("Ye7m")),f=_interopRequireWildcard(o("fbhf")),p=_interopRequireDefault(o("2zs7")),h=_interopRequireDefault(o("UIKY"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}o("WkvU");var m={overlay:"ReactModal__Overlay",content:"ReactModal__Content"},v=0,b=function(e){function ModalPortal(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ModalPortal);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(ModalPortal.__proto__||Object.getPrototypeOf(ModalPortal)).call(this,e));return t.setOverlayRef=function(e){t.overlay=e,t.props.overlayRef&&t.props.overlayRef(e)},t.setContentRef=function(e){t.content=e,t.props.contentRef&&t.props.contentRef(e)},t.afterClose=function(){var e=t.props,o=e.appElement,n=e.ariaHideApp,r=e.htmlOpenClassName,l=e.bodyOpenClassName;l&&f.remove(document.body,l),r&&f.remove(document.getElementsByTagName("html")[0],r),n&&v>0&&0===(v-=1)&&d.show(o),t.props.shouldFocusAfterRender&&(t.props.shouldReturnFocusAfterClose?(u.returnFocus(),u.teardownScopedFocus()):u.popWithoutFocus()),t.props.onAfterClose&&t.props.onAfterClose(),h.default.deregister(t)},t.open=function(){t.beforeOpen(),t.state.afterOpen&&t.state.beforeClose?(clearTimeout(t.closeTimer),t.setState({beforeClose:!1})):(t.props.shouldFocusAfterRender&&(u.setupScopedFocus(t.node),u.markForFocusLater()),t.setState({isOpen:!0},(function(){t.setState({afterOpen:!0}),t.props.isOpen&&t.props.onAfterOpen&&t.props.onAfterOpen({overlayEl:t.overlay,contentEl:t.content})})))},t.close=function(){t.props.closeTimeoutMS>0?t.closeWithTimeout():t.closeWithoutTimeout()},t.focusContent=function(){return t.content&&!t.contentHasFocus()&&t.content.focus()},t.closeWithTimeout=function(){var e=Date.now()+t.props.closeTimeoutMS;t.setState({beforeClose:!0,closesAt:e},(function(){t.closeTimer=setTimeout(t.closeWithoutTimeout,t.state.closesAt-Date.now())}))},t.closeWithoutTimeout=function(){t.setState({beforeClose:!1,isOpen:!1,afterOpen:!1,closesAt:null},t.afterClose)},t.handleKeyDown=function(e){9===e.keyCode&&(0,c.default)(t.content,e),t.props.shouldCloseOnEsc&&27===e.keyCode&&(e.stopPropagation(),t.requestClose(e))},t.handleOverlayOnClick=function(e){null===t.shouldClose&&(t.shouldClose=!0),t.shouldClose&&t.props.shouldCloseOnOverlayClick&&(t.ownerHandlesClose()?t.requestClose(e):t.focusContent()),t.shouldClose=null},t.handleContentOnMouseUp=function(){t.shouldClose=!1},t.handleOverlayOnMouseDown=function(e){t.props.shouldCloseOnOverlayClick||e.target!=t.overlay||e.preventDefault()},t.handleContentOnClick=function(){t.shouldClose=!1},t.handleContentOnMouseDown=function(){t.shouldClose=!1},t.requestClose=function(e){return t.ownerHandlesClose()&&t.props.onRequestClose(e)},t.ownerHandlesClose=function(){return t.props.onRequestClose},t.shouldBeClosed=function(){return!t.state.isOpen&&!t.state.beforeClose},t.contentHasFocus=function(){return document.activeElement===t.content||t.content.contains(document.activeElement)},t.buildClassName=function(e,o){var n="object"===(void 0===o?"undefined":r(o))?o:{base:m[e],afterOpen:m[e]+"--after-open",beforeClose:m[e]+"--before-close"},l=n.base;return t.state.afterOpen&&(l=l+" "+n.afterOpen),t.state.beforeClose&&(l=l+" "+n.beforeClose),"string"==typeof o&&o?l+" "+o:l},t.attributesFromObject=function(e,t){return Object.keys(t).reduce((function(o,n){return o[e+"-"+n]=t[n],o}),{})},t.state={afterOpen:!1,beforeClose:!1},t.shouldClose=null,t.moveFromContentToOverlay=null,t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ModalPortal,e),l(ModalPortal,[{key:"componentDidMount",value:function componentDidMount(){this.props.isOpen&&this.open()}},{key:"componentDidUpdate",value:function componentDidUpdate(e,t){this.props.isOpen&&!e.isOpen?this.open():!this.props.isOpen&&e.isOpen&&this.close(),this.props.shouldFocusAfterRender&&this.state.isOpen&&!t.isOpen&&this.focusContent()}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.state.isOpen&&this.afterClose(),clearTimeout(this.closeTimer)}},{key:"beforeOpen",value:function beforeOpen(){var e=this.props,t=e.appElement,o=e.ariaHideApp,n=e.htmlOpenClassName,r=e.bodyOpenClassName;r&&f.add(document.body,r),n&&f.add(document.getElementsByTagName("html")[0],n),o&&(v+=1,d.hide(t)),h.default.register(this)}},{key:"render",value:function render(){var e=this.props,t=e.id,o=e.className,r=e.overlayClassName,l=e.defaultStyles,a=o?{}:l.content,i=r?{}:l.overlay;return this.shouldBeClosed()?null:s.default.createElement("div",{ref:this.setOverlayRef,className:this.buildClassName("overlay",r),style:n({},i,this.props.style.overlay),onClick:this.handleOverlayOnClick,onMouseDown:this.handleOverlayOnMouseDown},s.default.createElement("div",n({id:t,ref:this.setContentRef,style:n({},a,this.props.style.content),className:this.buildClassName("content",o),tabIndex:"-1",onKeyDown:this.handleKeyDown,onMouseDown:this.handleContentOnMouseDown,onMouseUp:this.handleContentOnMouseUp,onClick:this.handleContentOnClick,role:this.props.role,"aria-label":this.props.contentLabel},this.attributesFromObject("aria",this.props.aria||{}),this.attributesFromObject("data",this.props.data||{}),{"data-testid":this.props.testId}),this.props.children))}}]),ModalPortal}(a.Component);b.defaultProps={style:{overlay:{},content:{}},defaultStyles:{}},b.propTypes={isOpen:i.default.bool.isRequired,defaultStyles:i.default.shape({content:i.default.object,overlay:i.default.object}),style:i.default.shape({content:i.default.object,overlay:i.default.object}),className:i.default.oneOfType([i.default.string,i.default.object]),overlayClassName:i.default.oneOfType([i.default.string,i.default.object]),bodyOpenClassName:i.default.string,htmlOpenClassName:i.default.string,ariaHideApp:i.default.bool,appElement:i.default.instanceOf(p.default),onAfterOpen:i.default.func,onAfterClose:i.default.func,onRequestClose:i.default.func,closeTimeoutMS:i.default.number,shouldFocusAfterRender:i.default.bool,shouldCloseOnOverlayClick:i.default.bool,shouldReturnFocusAfterClose:i.default.bool,role:i.default.string,contentLabel:i.default.string,aria:i.default.object,data:i.default.object,children:i.default.node,shouldCloseOnEsc:i.default.bool,overlayRef:i.default.func,contentRef:i.default.func,id:i.default.string,testId:i.default.string},t.default=b,e.exports=t.default},S1to:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function scopeTab(e,t){var o=(0,n.default)(e);if(!o.length)return void t.preventDefault();var r=void 0,l=t.shiftKey,a=o[0],s=o[o.length-1];if(e===document.activeElement){if(!l)return;r=s}s!==document.activeElement||l||(r=a);a===document.activeElement&&l&&(r=s);if(r)return t.preventDefault(),void r.focus();var i=/(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);if(null==i||"Chrome"==i[1]||null!=/\biPod\b|\biPad\b/g.exec(navigator.userAgent))return;var u=o.indexOf(document.activeElement);u>-1&&(u+=l?-1:1);if(void 0===(r=o[u]))return t.preventDefault(),void(r=l?s:a).focus();t.preventDefault(),r.focus()};var n=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(o("ZDLa"));e.exports=t.default},UIKY:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=new function PortalOpenInstances(){var e=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PortalOpenInstances),this.register=function(t){-1===e.openInstances.indexOf(t)&&(e.openInstances.push(t),e.emit("register"))},this.deregister=function(t){var o=e.openInstances.indexOf(t);-1!==o&&(e.openInstances.splice(o,1),e.emit("deregister"))},this.subscribe=function(t){e.subscribers.push(t)},this.emit=function(t){e.subscribers.forEach((function(o){return o(t,e.openInstances.slice())}))},this.openInstances=[],this.subscribers=[]};t.default=n,e.exports=t.default},VCL8:function(e,t,o){"use strict";function componentWillMount(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);null!=e&&this.setState(e)}function componentWillReceiveProps(e){this.setState(function updater(t){var o=this.constructor.getDerivedStateFromProps(e,t);return null!=o?o:null}.bind(this))}function componentWillUpdate(e,t){try{var o=this.props,n=this.state;this.props=e,this.state=t,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(o,n)}finally{this.props=o,this.state=n}}function polyfill(e){var t=e.prototype;if(!t||!t.isReactComponent)throw new Error("Can only polyfill class components");if("function"!=typeof e.getDerivedStateFromProps&&"function"!=typeof t.getSnapshotBeforeUpdate)return e;var o=null,n=null,r=null;if("function"==typeof t.componentWillMount?o="componentWillMount":"function"==typeof t.UNSAFE_componentWillMount&&(o="UNSAFE_componentWillMount"),"function"==typeof t.componentWillReceiveProps?n="componentWillReceiveProps":"function"==typeof t.UNSAFE_componentWillReceiveProps&&(n="UNSAFE_componentWillReceiveProps"),"function"==typeof t.componentWillUpdate?r="componentWillUpdate":"function"==typeof t.UNSAFE_componentWillUpdate&&(r="UNSAFE_componentWillUpdate"),null!==o||null!==n||null!==r){var l=e.displayName||e.name,a="function"==typeof e.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+l+" uses "+a+" but also contains the following legacy lifecycles:"+(null!==o?"\n  "+o:"")+(null!==n?"\n  "+n:"")+(null!==r?"\n  "+r:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"==typeof e.getDerivedStateFromProps&&(t.componentWillMount=componentWillMount,t.componentWillReceiveProps=componentWillReceiveProps),"function"==typeof t.getSnapshotBeforeUpdate){if("function"!=typeof t.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");t.componentWillUpdate=componentWillUpdate;var s=t.componentDidUpdate;t.componentDidUpdate=function componentDidUpdatePolyfill(e,t,o){var n=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:o;s.call(this,e,t,n)}}return e}o.r(t),o.d(t,"polyfill",(function(){return polyfill})),componentWillMount.__suppressDeprecationWarning=!0,componentWillReceiveProps.__suppressDeprecationWarning=!0,componentWillUpdate.__suppressDeprecationWarning=!0},VKEO:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.handleBlur=handleBlur,t.handleFocus=handleFocus,t.markForFocusLater=function markForFocusLater(){r.push(document.activeElement)},t.returnFocus=function returnFocus(){var e=null;try{return void(0!==r.length&&(e=r.pop()).focus())}catch(t){console.warn(["You tried to return focus to",e,"but it is not in the DOM anymore"].join(" "))}},t.popWithoutFocus=function popWithoutFocus(){r.length>0&&r.pop()},t.setupScopedFocus=function setupScopedFocus(e){l=e,window.addEventListener?(window.addEventListener("blur",handleBlur,!1),document.addEventListener("focus",handleFocus,!0)):(window.attachEvent("onBlur",handleBlur),document.attachEvent("onFocus",handleFocus))},t.teardownScopedFocus=function teardownScopedFocus(){l=null,window.addEventListener?(window.removeEventListener("blur",handleBlur),document.removeEventListener("focus",handleFocus)):(window.detachEvent("onBlur",handleBlur),document.detachEvent("onFocus",handleFocus))};var n=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(o("ZDLa"));var r=[],l=null,a=!1;function handleBlur(){a=!0}function handleFocus(){if(a){if(a=!1,!l)return;setTimeout((function(){l.contains(document.activeElement)||((0,n.default)(l)[0]||l).focus()}),0)}}},WkvU:function(e,t,o){"use strict";var n=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(o("UIKY"));var r=void 0,l=void 0,a=[];function focusContent(){0!==a.length&&a[a.length-1].focusContent()}n.default.subscribe((function bodyTrap(e,t){r&&l||((r=document.createElement("div")).setAttribute("data-react-modal-body-trap",""),r.style.position="absolute",r.style.opacity="0",r.setAttribute("tabindex","0"),r.addEventListener("focus",focusContent),(l=r.cloneNode()).addEventListener("focus",focusContent)),(a=t).length>0?(document.body.firstChild!==r&&document.body.insertBefore(r,document.body.firstChild),document.body.lastChild!==l&&document.body.appendChild(l)):(r.parentElement&&r.parentElement.removeChild(r),l.parentElement&&l.parentElement.removeChild(l))}))},Ye7m:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.assertNodeList=assertNodeList,t.setElement=function setElement(e){var t=e;if("string"==typeof t&&r.canUseDOM){var o=document.querySelectorAll(t);assertNodeList(o,t),t="length"in o?o[0]:o}return l=t||l},t.validateElement=validateElement,t.hide=function hide(e){validateElement(e)&&(e||l).setAttribute("aria-hidden","true")},t.show=function show(e){validateElement(e)&&(e||l).removeAttribute("aria-hidden")},t.documentNotReadyOrSSRTesting=function documentNotReadyOrSSRTesting(){l=null},t.resetForTesting=function resetForTesting(){l=null};var n=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(o("NPsS")),r=o("2zs7");var l=null;function assertNodeList(e,t){if(!e||!e.length)throw new Error("react-modal: No elements were found for selector "+t+".")}function validateElement(e){return!(!e&&!l)||((0,n.default)(!1,["react-modal: App element is not defined.","Please use `Modal.setAppElement(el)` or set `appElement={el}`.","This is needed so screen readers don't see main content","when modal is opened. It is not recommended, but you can opt-out","by setting `ariaHideApp={false}`."].join(" ")),!1)}},ZDLa:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function findTabbableDescendants(e){return[].slice.call(e.querySelectorAll("*"),0).filter(tabbable)};var n=/input|select|textarea|button|object/;function hidesContents(e){var t=e.offsetWidth<=0&&e.offsetHeight<=0;if(t&&!e.innerHTML)return!0;var o=window.getComputedStyle(e);return t?"visible"!==o.getPropertyValue("overflow")||e.scrollWidth<=0&&e.scrollHeight<=0:"none"==o.getPropertyValue("display")}function focusable(e,t){var o=e.nodeName.toLowerCase();return(n.test(o)&&!e.disabled||"a"===o&&e.href||t)&&function visible(e){for(var t=e;t&&t!==document.body;){if(hidesContents(t))return!1;t=t.parentNode}return!0}(e)}function tabbable(e){var t=e.getAttribute("tabindex");null===t&&(t=void 0);var o=isNaN(t);return(o||t>=0)&&focusable(e,!o)}e.exports=t.default},fbhf:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dumpClassLists=function dumpClassLists(){0};var n={},r={};t.add=function add(e,t){return function trackClass(e,t,o){o.forEach((function(o){!function incrementReference(e,t){e[t]||(e[t]=0),e[t]+=1}(t,o),e.add(o)}))}(e.classList,"html"==e.nodeName.toLowerCase()?n:r,t.split(" "))},t.remove=function remove(e,t){return function untrackClass(e,t,o){o.forEach((function(o){!function decrementReference(e,t){e[t]&&(e[t]-=1)}(t,o),0===t[o]&&e.remove(o)}))}(e.classList,"html"==e.nodeName.toLowerCase()?n:r,t.split(" "))}},qFS3:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.bodyOpenClassName=t.portalClassName=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},r=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}(),l=o("q1tI"),a=_interopRequireDefault(l),s=_interopRequireDefault(o("i8i4")),i=_interopRequireDefault(o("17x9")),u=_interopRequireDefault(o("QEso")),c=function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}(o("Ye7m")),d=o("2zs7"),f=_interopRequireDefault(d),p=o("VCL8");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var h=t.portalClassName="ReactModalPortal",m=t.bodyOpenClassName="ReactModal__Body--open",v=void 0!==s.default.createPortal,b=function getCreatePortal(){return v?s.default.createPortal:s.default.unstable_renderSubtreeIntoContainer};function getParentElement(e){return e()}var y=function(e){function Modal(){var e,t,o;_classCallCheck(this,Modal);for(var r=arguments.length,l=Array(r),i=0;i<r;i++)l[i]=arguments[i];return t=o=_possibleConstructorReturn(this,(e=Modal.__proto__||Object.getPrototypeOf(Modal)).call.apply(e,[this].concat(l))),o.removePortal=function(){!v&&s.default.unmountComponentAtNode(o.node);var e=getParentElement(o.props.parentSelector);e?e.removeChild(o.node):console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.')},o.portalRef=function(e){o.portal=e},o.renderPortal=function(e){var t=b()(o,a.default.createElement(u.default,n({defaultStyles:Modal.defaultStyles},e)),o.node);o.portalRef(t)},_possibleConstructorReturn(o,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Modal,e),r(Modal,[{key:"componentDidMount",value:function componentDidMount(){d.canUseDOM&&(v||(this.node=document.createElement("div")),this.node.className=this.props.portalClassName,getParentElement(this.props.parentSelector).appendChild(this.node),!v&&this.renderPortal(this.props))}},{key:"getSnapshotBeforeUpdate",value:function getSnapshotBeforeUpdate(e){return{prevParent:getParentElement(e.parentSelector),nextParent:getParentElement(this.props.parentSelector)}}},{key:"componentDidUpdate",value:function componentDidUpdate(e,t,o){if(d.canUseDOM){var n=this.props,r=n.isOpen,l=n.portalClassName;e.portalClassName!==l&&(this.node.className=l);var a=o.prevParent,s=o.nextParent;s!==a&&(a.removeChild(this.node),s.appendChild(this.node)),(e.isOpen||r)&&!v&&this.renderPortal(this.props)}}},{key:"componentWillUnmount",value:function componentWillUnmount(){if(d.canUseDOM&&this.node&&this.portal){var e=this.portal.state,t=Date.now(),o=e.isOpen&&this.props.closeTimeoutMS&&(e.closesAt||t+this.props.closeTimeoutMS);o?(e.beforeClose||this.portal.closeWithTimeout(),setTimeout(this.removePortal,o-t)):this.removePortal()}}},{key:"render",value:function render(){return d.canUseDOM&&v?(!this.node&&v&&(this.node=document.createElement("div")),b()(a.default.createElement(u.default,n({ref:this.portalRef,defaultStyles:Modal.defaultStyles},this.props)),this.node)):null}}],[{key:"setAppElement",value:function setAppElement(e){c.setElement(e)}}]),Modal}(l.Component);y.propTypes={isOpen:i.default.bool.isRequired,style:i.default.shape({content:i.default.object,overlay:i.default.object}),portalClassName:i.default.string,bodyOpenClassName:i.default.string,htmlOpenClassName:i.default.string,className:i.default.oneOfType([i.default.string,i.default.shape({base:i.default.string.isRequired,afterOpen:i.default.string.isRequired,beforeClose:i.default.string.isRequired})]),overlayClassName:i.default.oneOfType([i.default.string,i.default.shape({base:i.default.string.isRequired,afterOpen:i.default.string.isRequired,beforeClose:i.default.string.isRequired})]),appElement:i.default.instanceOf(f.default),onAfterOpen:i.default.func,onRequestClose:i.default.func,closeTimeoutMS:i.default.number,ariaHideApp:i.default.bool,shouldFocusAfterRender:i.default.bool,shouldCloseOnOverlayClick:i.default.bool,shouldReturnFocusAfterClose:i.default.bool,parentSelector:i.default.func,aria:i.default.object,data:i.default.object,role:i.default.string,contentLabel:i.default.string,shouldCloseOnEsc:i.default.bool,overlayRef:i.default.func,contentRef:i.default.func},y.defaultProps={isOpen:!1,portalClassName:h,bodyOpenClassName:m,role:"dialog",ariaHideApp:!0,closeTimeoutMS:0,shouldFocusAfterRender:!0,shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,shouldReturnFocusAfterClose:!0,parentSelector:function parentSelector(){return document.body}},y.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}},(0,p.polyfill)(y),t.default=y}}]);
//# sourceMappingURL=580.1063e8c52fc6f138f2e4.chunk.js.map