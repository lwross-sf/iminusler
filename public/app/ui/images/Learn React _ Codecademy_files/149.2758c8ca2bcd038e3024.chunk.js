(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[149],{"1aMd":function(e,t,a){"use strict";a.d(t,"a",(function(){return RegistrationForm_RegistrationForm}));var i=a("wx14"),r=a("rePB"),s=a("DzJC"),n=a.n(s),o=a("E+oP"),c=a.n(o),l=a("Z0cm"),d=a.n(l),p=a("G8Hi"),m=a("FZcb"),u=a("TSYQ"),h=a.n(u),b=a("q1tI"),v=a.n(b),f=a("24Ii"),_=a.n(f),g=a("xk4V"),S=a.n(g),y=a("f8p9"),E=a("DAui"),O=a("tYyt"),C=a("z9go"),j=a("OLDM"),k=a("ev9x"),F=a("hFGM"),N=a("gtj7"),w=a("b0K7"),I=a("NWss"),V=a("vOOB"),P={registrationContainer:"registrationContainer__1DWVArjxkRSHEqpISv3YfU",registrationContainerCompact:"registrationContainerCompact__3f5fD0mXckkhzC_gkXDQaJ",screenReaderOnly:"screenReaderOnly__2S7ruRxpd1VhnuyeMz0di2",submitButton:"submitButton__1syIjVGtZiGfg2aBWCcvkZ",visuallyDisabled:"visuallyDisabled__2u_A2g3lZCdCvnedehaKKN",submitButtonCompact:"submitButtonCompact__DTD3_nPUjcDW2juBilPyk",tos:"tos__2S7BNNliayxJrYfZEqHGOH",fieldset:"fieldset__2IcsxborktqVvm5FdfygAO",formCompact:"formCompact__Q6nQtda86q7aKdsfLQSvz",formGroupsCompact:"formGroupsCompact__1e0cWED9TSZNrITxnH3MoV",formGroupCompact:"formGroupCompact__225iYntNRtxkKn05IYqtJ1",inputCompact:"inputCompact__2Shf6uPLKjgQGwlRGM6u4D",validCheckmark:"validCheckmark__FINN8PBxaKyExgp8BuWaN",inputWrapper:"inputWrapper__1WcSn7pm4PiUUt2d3hgszk",hidden:"hidden__IE7yAQczIi7NG5Xaf2XMv",recaptchaError:"recaptchaError__2PRVQPBckCquoqnpNkolaI",formGroup:"formGroup__26lWN6IoN44keRivjjZbD7",padBottomIfNotEmpty:"padBottomIfNotEmpty__SRLk-qQ59lLzCQRc26yql","grecaptcha-badge":"grecaptcha-badge"},R=a("yrBZ");const SweetContainerInput=()=>v.a.createElement(R.a,{height:"0",left:"100vw",overflow:"hidden",position:"absolute",top:"100vh",width:"0"},v.a.createElement("label",{htmlFor:"sweet_container"},"Check this input if you are an automated machine, and not a human"),v.a.createElement("input",{id:"sweet_container",name:"sweet_container",type:"checkbox"}));var x=a("DZdY"),B=a("oHca"),D=a("5sab"),A=a("05V4"),G=a("630U"),T=a("ANOs"),U="validationText__2V8IomQ7py3ImJSkR74lUL",z="tooltipValidationError__1uEAgOW6IuqUqWblAq8-ak",L="tooltipTarget__2QEgWo1UnUfrI64N8g5a7R",q="infoIcon__1g_zfaxGIRIbEh291YxmGv",K="tooltipContents__2bqd9NtbRxq1kYIR2tCLhZ";const W={password:T.a},H=Object(x.a)(B.a,{target:"efygfau0",label:"StyledToolTip"})("margin-left:0.25rem;left:0;",G.I.breakpoints.sm,"{left:4rem;}"),ValidationError=e=>{if(!e.validationError)return null;const t=W[e.fieldName];return t?v.a.createElement("div",{className:z},v.a.createElement(H,{focusable:!0,id:"".concat(e.fieldName,"-tooltip"),target:v.a.createElement("div",{className:L},v.a.createElement("span",{"aria-live":"assertive",className:U},e.validationError),v.a.createElement(A.a,{size:12,className:q})),position:"bottom-right"},v.a.createElement(D.a,{text:t,spacing:"tight",className:K}))):v.a.createElement("span",{"aria-live":"assertive",className:U},e.validationError)};function ownKeys(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(a),!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}const M=[{name:"email",label:I.emailLabel,type:"email",invalidMessage:"Please use a valid email address",pattern:void 0},{name:"password",label:I.passwordLabel,type:"password",invalidMessage:"is not long enough",pattern:".{6,128}"}],Q="/register/validate",extractValidationErrors=e=>{const t=e.body.errors;return t&&Object.values(t).filter((e=>e))?Object.entries(t).reduce(((e,[t,a])=>_objectSpread(_objectSpread({},e),{},{[t]:d()(a)?V[a[0]]:V[a]||a})),{}):null},getElementValue=e=>"checkbox"===e.type?e.checked:e.value;class RegistrationForm_RegistrationForm extends b.Component{constructor(...e){super(...e),this.idPrefix="sign_up_form_",this.state={disabled:!1,recaptchaInstanceId:S()(),validationErrors:{},validatedFields:new Set([])},this.onRecapChange=e=>{this.submitForm(e)},this.onRecapExpire=()=>{this.resetRecaptcha()},this.onSuccessfulValidation=e=>{this.setValidationErrorState({[e]:void 0}),this.setState((t=>({validatedFields:t.validatedFields.add(e)})))},this.onFailedValidation=(e,t)=>{this.setValidationErrorState({[e]:t}),this.setState((t=>(t.validatedFields.delete(e),{validatedFields:t.validatedFields})))},this.onSubmissionFailedValidation=e=>{this.setValidationErrorState(e),this.setState((t=>{Object.keys(e).forEach((e=>{t.validatedFields.delete(e)})),this.setState({validatedFields:t.validatedFields})}))},this.submitForm=e=>{_.a.post("/register").send(_objectSpread(_objectSpread({},this.serialize()),{},{"g-recaptcha-response":e})).use(F.b).accept("json").then((({body:e})=>{Object(C.a)("user_sign_up"),Object(j.b)("user_sign_up"),this.setState({disabled:!1}),this.props.onSuccess(e)})).catch((e=>{const t=extractValidationErrors(e.response);this.setState({disabled:!1}),t&&this.onSubmissionFailedValidation(t),this.resetRecaptcha()}))},this.onSubmitInitialize=e=>(e.preventDefault(),this.isValid()?(this.setState({disabled:!0}),_.a.post(Q).send(this.serialize()).use(F.b).accept("json").then((()=>{this.captcha.execute()})).catch((e=>{const t=extractValidationErrors(e.response);t&&this.onSubmissionFailedValidation(t),this.setState({disabled:!1})}))):null),this.genericClientSideValidityHandler=(e,t)=>{const a=t.target.validity.valueMissing,i=t.target.validity.valid;let r;a?r="can't be blank":i||(r=M.find((t=>t.name===e)).invalidMessage),r?this.onFailedValidation(e,r):this.onSuccessfulValidation(e)},this.genericServerSideValidityHandler=n()(((e,t)=>{t.target.value?_.a.post(Q).send({user:{[e]:t.target.value}}).use(F.b).accept("json").then((()=>{this.onSuccessfulValidation(e)})).catch((t=>{const a=extractValidationErrors(t.response);(null==a?void 0:a[e])?this.onFailedValidation(e,a[e]):this.onSuccessfulValidation(e)})):this.onFailedValidation(e,"can't be blank")}),250),this.validateField=(e,t)=>{"password"===e?this.genericClientSideValidityHandler(e,t):this.genericServerSideValidityHandler(e,t)},this.onFieldBlur=e=>{e.persist();const t=this.serialize().user||{},a=t.email,i=void 0===a?"":a,r=t.password,s=void 0===r?"":r;c()(i)&&c()(s)||this.validateField(e.target.name,e)},this.onFieldKeyUp=e=>{e.persist();const t=e.target.name;this.state.validationErrors[t]&&this.validateField(t,e),this.state.initiallySubmittable||this.setState({initiallySubmittable:"pending"},(()=>{setTimeout((()=>{this.setState({initiallySubmittable:"complete"})}),500)}))},this.onSubmitClick=()=>{Object(C.c)({target:"create_account"})},this.setFormRef=e=>{this.form=e},this.setCaptchaRef=e=>{this.captcha=e}}setValidationErrorState(e,t={}){this.setState((a=>_objectSpread({validationErrors:_objectSpread(_objectSpread({},a.validationErrors),e)},t)))}isValid(){return!Object.values(this.state.validationErrors).filter((e=>e)).length}serialize(){return[...this.form.elements].filter((e=>e.name)).reduce(((e,t)=>{const a=t.dataset.resource;return _objectSpread(_objectSpread({},e),{},a?{[a]:_objectSpread(_objectSpread({},e[a]),{},{[t.name]:getElementValue(t)})}:{[t.name]:getElementValue(t)})}),{})}resetRecaptcha(){this.setState({recaptchaInstanceId:S()(),disabled:!1})}render(){const e=O.a.get("authenticity_token"),t=this.props,a=t.ctaText,r=t.currentPage,s=t.defaultValues,n=void 0===s?{email:"",password:""}:s,o=t.disableFieldset,c=t.hideOauth,l=t.hideRecaptchaInfo,d=t.hideSubmitButton,u=t.locationType,b=t.markValidatedFields,f=t.redirectUrl,_=t.submitButtonProps,g=t.compact,S=t.classNames,C=void 0===S?{}:S,j=t.isStudent,k="location/EXERCISE"===u,F=this.state.disabled,w=f&&Object(N.d)(f),V=h()("recaptcha-wrapper",{[P.padBottomIfNotEmpty]:g});return v.a.createElement("div",{className:h()(P.registrationContainer,C.container,{[P.registrationContainerCompact]:g})},v.a.createElement("form",{onSubmit:this.onSubmitInitialize,noValidate:!0,ref:this.setFormRef,method:"POST"},v.a.createElement("fieldset",{className:P.fieldset,disabled:o},v.a.createElement(SweetContainerInput,null),v.a.createElement("input",{name:"authenticity_token",type:"hidden",value:e}),v.a.createElement("input",{name:"coding_reminders_comms_timezone","data-resource":"user",type:"hidden",value:Intl.DateTimeFormat().resolvedOptions().timeZone}),v.a.createElement("input",{name:"signing_up_from_exercise",type:"hidden",value:"".concat(k)}),j&&v.a.createElement("input",{name:"student_access",type:"hidden",value:1}),v.a.createElement("input",{name:"referring_page",type:"hidden",value:r}),v.a.createElement("input",{name:"redirect",type:"hidden",value:w}),v.a.createElement("div",{className:h()(P.formGroups,{[P.formGroupsCompact]:g},C.formGroups)},M.map((e=>v.a.createElement(p.d,{key:"".concat(this.idPrefix).concat(e.name),htmlFor:"".concat(this.idPrefix).concat(e.name),label:e.label,className:h()(P.formGroup,{[P.formGroupCompact]:g})},v.a.createElement(ValidationError,{fieldName:e.name,validationError:this.state.validationErrors[e.name]}),v.a.createElement("div",{className:P.inputWrapper},v.a.createElement(p.g,{"aria-invalid":this.state.validationErrors[e.name]?"true":void 0,className:h()(P.input,{[P.inputCompact]:g},C.input),"data-testid":"".concat(e.name,"-field"),htmlFor:"".concat(this.idPrefix).concat(e.name),name:e.name,type:e.type,onBlur:this.onFieldBlur,onKeyUp:this.onFieldKeyUp,required:!0,error:!!this.state.validationErrors[e.name],pattern:e.pattern,"data-resource":"user",defaultValue:n[e.name],valid:b&&this.state.validatedFields.has(e.name)})))))),v.a.createElement("div",{className:V},this.state.validationErrors.recaptcha&&v.a.createElement("div",{className:P.recaptchaError,"data-testid":"recaptcha-error"},this.state.validationErrors.recaptcha),v.a.createElement(E.a,{key:this.state.recaptchaInstanceId,publicKey:O.a.get("recaptcha_key"),size:"invisible",ref:this.setCaptchaRef,onChange:this.onRecapChange,onExpired:this.onRecapExpire})),v.a.createElement("div",{className:C.footer},v.a.createElement(m.a,Object(i.a)({},_,{onClick:this.onSubmitClick,type:"submit",className:h()(P.submitButton,{[P.submitButtonCompact]:g,[P.hidden]:d},C.submitButton,F&&P.visuallyDisabled),disabled:F||"complete"!==this.state.initiallySubmittable,id:"".concat(this.idPrefix,"submit"),"data-testid":"registration-form-submit"}),a),!l&&v.a.createElement("p",{className:h()(P.tos,C.tos),dangerouslySetInnerHTML:{__html:I.recaptchaTOS}})))),!c&&v.a.createElement(y.a,{signUp:!0,urlParams:{redirect:w}}))}}RegistrationForm_RegistrationForm.defaultProps={onSuccess:({redirectTo:e,workerSupportApplicant:t})=>{Object(k.g)(e)?window.location.assign(Object(N.d)(e||Object(w.lb)())):window.location.assign(Object(N.d)((({redirectUrl:e,workerSupportApplicant:t})=>t?w.kc:Object(w.Fb)({redirectUrl:e,fromSignUpPage:!0}))({redirectUrl:e,workerSupportApplicant:t})))},submitButtonProps:{size:"large",theme:"brand-purple"},ctaText:I.createAccountCTA,isStudent:!1}},NWss:function(e){e.exports=JSON.parse('{"createAccountCTA":"Sign Up","createAccountComplete":"Account created. You\'re almost there!","emailLabel":"Email","passwordLabel":"Password","recaptchaTOS":"By signing up for Codecademy, you agree to Codecademy\'s <a href=\\"/terms\\">Terms of Service</a> & <a href=\\"/policy\\">Privacy Policy</a>."}')},vOOB:function(e){e.exports=JSON.parse('{"weak":"too weak","breach":"We\'ve detected that the password you\'ve entered may not be secure. Please create a new one.","length":"is not long enough"}')}}]);
//# sourceMappingURL=149.2758c8ca2bcd038e3024.chunk.js.map