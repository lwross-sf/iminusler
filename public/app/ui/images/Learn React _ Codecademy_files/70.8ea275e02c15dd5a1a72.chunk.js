(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[70],{Qcta:function(e,o,r){"use strict";r.d(o,"a",(function(){return CodeBlock}));var d=r("wx14"),n=r("MKeS"),t=r("q1tI"),a=r.n(t),i=r("hHSK");const u=Object(n.a)({resolved:{},chunkName:()=>"components-CodeBlock-Base",isReady(e){const o=this.resolve(e);return!0===this.resolved[o]&&!!r.m[o]},importAsync:()=>Promise.all([r.e(84),r.e(90),r.e(193),r.e(266),r.e(651),r.e(306)]).then(r.bind(null,"qUKc")),requireAsync(e){const o=this.resolve(e);return this.resolved[o]=!1,this.importAsync(e).then((e=>(this.resolved[o]=!0,e)))},requireSync(e){const o=this.resolve(e);return r(o)},resolve(){return"qUKc"}},{ssr:!1}),CodeBlock=e=>a.a.createElement(u,Object(d.a)({},e,{fallback:a.a.createElement("pre",null,a.a.createElement("code",null,a.a.createElement(i.a,null,e.children)))}))},hHSK:function(e,o,r){"use strict";r.d(o,"a",(function(){return a}));var d=r("DZdY"),n=r("630U"),t=r("t6W/");const a=Object(d.a)("div",{target:"e1hgti5c0",label:"ColorizedContainer"})("display:block;text-align:left;font-weight:normal;background-color:",t.a.colors["editor.background"],";color:",n.l.gray,";font-family:",n.o.monospace,";font-size:",n.p[14],";padding:1rem;overflow-wrap:break-word;white-space:pre-wrap;",Object(n.q)(),";")},rnUt:function(e,o,r){"use strict";r.d(o,"a",(function(){return n}));var d=r("MKeS");const n=Object(d.a)({resolved:{},chunkName:()=>"components-MathBlock",isReady(e){const o=this.resolve(e);return!0===this.resolved[o]&&!!r.m[o]},importAsync:()=>Promise.all([r.e(506),r.e(391)]).then(r.bind(null,"sSO/")),requireAsync(e){const o=this.resolve(e);return this.resolved[o]=!1,this.importAsync(e).then((e=>(this.resolved[o]=!0,e)))},requireSync(e){const o=this.resolve(e);return r(o)},resolve(){return"sSO/"}})},"t6W/":function(e,o,r){"use strict";r.d(o,"a",(function(){return u}));var d={};r.r(d),r.d(d,"syntax",(function(){return a})),r.d(d,"ui",(function(){return i}));var n=r("630U");const t={blue:n.l.blue,deepPurple:n.l.deepPurple,gray:n.l.gray,green:n.l.green,orange:n.l.orange,purple:n.l.purple,red:n.l.red,white:n.h.white,yellow:n.l.yellow},a={attribute:t.green,annotation:t.red,atom:t.deepPurple,basic:t.white,comment:t.gray,constant:t.orange,decoration:t.red,invalid:t.red,key:t.blue,keyword:t.purple,number:t.red,operator:t.red,predefined:t.white,property:t.red,regexp:t.green,string:t.yellow,tag:t.red,text:t.orange,value:t.yellow,variable:t.green},i={background:"#211E2F",text:t.white,indent:{active:"#393b41",inactive:"#494b51"}},c=e=>e.substr(1),u=(({ui:e,syntax:o})=>({base:"vs-dark",inherit:!0,rules:[{token:"",foreground:c(o.basic)},{token:"regexp",foreground:c(o.regexp)},{token:"annotation",foreground:c(o.annotation)},{token:"type",foreground:c(o.annotation)},{token:"doctype",foreground:c(o.comment)},{token:"delimiter",foreground:c(o.decoration)},{token:"invalid",foreground:c(o.invalid)},{token:"emphasis",fontStyle:"italic"},{token:"strong",fontStyle:"bold"},{token:"variable",foreground:c(o.variable)},{token:"variable.predefined",foreground:c(o.variable)},{token:"constant",foreground:c(o.constant)},{token:"comment",foreground:c(o.comment)},{token:"number",foreground:c(o.number)},{token:"number.hex",foreground:c(o.number)},{token:"keyword.directive",foreground:c(o.comment)},{token:"include",foreground:c(o.comment)},{token:"key",foreground:c(o.property)},{token:"attribute.name",foreground:c(o.attribute)},{token:"attribute.name-numeric",foreground:c(o.string)},{token:"attribute.value",foreground:c(o.property)},{token:"attribute.value.number",foreground:c(o.number)},{token:"string",foreground:c(o.string)},{token:"string.yaml",foreground:c(o.string)},{token:"tag",foreground:c(o.tag)},{token:"tag.id.jade",foreground:c(o.tag)},{token:"tag.class.jade",foreground:c(o.tag)},{token:"metatag",foreground:c(o.comment)},{token:"attribute.value.unit",foreground:c(o.string)},{token:"keyword",foreground:c(o.keyword)},{token:"keyword.flow",foreground:c(o.keyword)},{token:"attribute.value.xml",foreground:c(o.string)},{token:"delimiter.xml",foreground:c(o.decoration)},{token:"metatag.xml",foreground:c(o.comment)},{token:"string.key.json",foreground:c(o.property)},{token:"string.value.json",foreground:c(o.string)},{token:"keyword.json",foreground:c(o.keyword)},{token:"cpp",foreground:c(o.constant)},{token:"number.cpp",foreground:c(o.text)},{token:"number.float.cpp",foreground:c(o.text)},{token:"delimiter.cpp",foreground:c(o.predefined)},{token:"delimiter.angle.cpp",foreground:c(o.predefined)},{token:"delimiter.curly.cpp",foreground:c(o.predefined)},{token:"delimiter.parenthesis.cpp",foreground:c(o.predefined)},{token:"delimiter.square.cpp",foreground:c(o.predefined)},{token:"keyword.cpp",foreground:c(o.comment)},{token:"string.include.identifier.cpp",foreground:c(o.comment)},{token:"number.cs",foreground:c(o.text)},{token:"number.float.cs",foreground:c(o.text)},{token:"delimiter.cs",foreground:c(o.predefined)},{token:"delimiter.angle.cs",foreground:c(o.predefined)},{token:"delimiter.curly.cs",foreground:c(o.predefined)},{token:"delimiter.parenthesis.cs",foreground:c(o.predefined)},{token:"delimiter.square.cs",foreground:c(o.predefined)},{token:"default.codecademy-java",foreground:c(o.text)},{token:"identifier.codecademy-java",foreground:c(o.text)},{token:"number.codecademy-java",foreground:c(o.text)},{token:"number.float.codecademy-java",foreground:c(o.text)},{token:"delimiter.codecademy-java",foreground:c(o.predefined)},{token:"delimiter.angle.codecademy-java",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-java",foreground:c(o.predefined)},{token:"delimiter.parenthesis.codecademy-java",foreground:c(o.predefined)},{token:"delimiter.square.codecademy-java",foreground:c(o.predefined)},{token:"keyword.codecademy-java",foreground:c(o.keyword)},{token:"bool.codecademy-java",foreground:c(o.atom)},{token:"class.codecademy-java",foreground:c(o.keyword)},{token:"classname.codecademy-java",foreground:c(o.keyword)},{token:"subkeyword.codecademy-java",foreground:c(o.text)},{token:"number.codecademy-kt",foreground:c(o.text)},{token:"number.float.codecademy-kt",foreground:c(o.text)},{token:"bool.codecademy-kt",foreground:c(o.atom)},{token:"identifier.classname.codecademy-kt",foreground:c(o.keyword)},{token:"identifier.varname.codecademy-kt",foreground:c(o.keyword)},{token:"identifier.valname.codecademy-kt",foreground:c(o.keyword)},{token:"identifier.functionName.codecademy-kt",foreground:c(o.keyword)},{token:"keyword.class.codecademy-kt",foreground:c(o.keyword)},{token:"label.codecademy-kt",foreground:c(o.annotation)},{token:"identifier.codecademy-kt",foreground:c(o.text)},{token:"delimiter.parenthesis.codecademy-kt",foreground:c(o.predefined)},{token:"delimiter.square.codecademy-kt",foreground:c(o.predefined)},{token:"delimiter.codecademy-kt",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-kt",foreground:c(o.predefined)},{token:"delimiter.angle.codecademy-kt",foreground:c(o.predefined)},{token:"default.codecademy-go",foreground:c(o.basic)},{token:"identifier.codecademy-go",foreground:c(o.text)},{token:"primitive.codecademy-go",foreground:c(o.atom)},{token:"delimiter.codecademy-go",foreground:c(o.predefined)},{token:"delimiter.parenthesis.codecademy-go",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-go",foreground:c(o.predefined)},{token:"delimiter.angle.codecademy-go",foreground:c(o.predefined)},{token:"delimiter.square.codecademy-go",foreground:c(o.predefined)},{token:"number.codecademy-go",foreground:c(o.text)},{token:"number.float.codecademy-go",foreground:c(o.text)},{token:"default.codecademy-html",foreground:c(o.basic)},{token:"delimiter.codecademy-html",foreground:c(o.decoration)},{token:"equals.codecademy-html",foreground:c(o.predefined)},{token:"metatag.content.codecademy-html",foreground:c(o.comment)},{token:"metatag.codecademy-html",foreground:c(o.comment)},{token:"attribute.value.codecademy-html",foreground:c(o.string)},{token:"string.codecademy-html",foreground:c(o.string)},{token:"default.codecademy-css",foreground:c(o.constant)},{token:"number.codecademy-css",foreground:c(o.text)},{token:"delimiter.codecademy-css",foreground:c(o.predefined)},{token:"delimiter.bracket.codecademy-css",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-css",foreground:c(o.predefined)},{token:"delimiter.parenthesis.codecademy-css",foreground:c(o.predefined)},{token:"delimiter.square.codecademy-css",foreground:c(o.predefined)},{token:"delimiter.codecademy-css",foreground:c(o.predefined)},{token:"keyword.media.type.value.codecademy-css",foreground:c(o.attribute)},{token:"keyword.media.value.value.codecademy-css",foreground:c(o.keyword)},{token:"keyword.property.value.codecademy-css",foreground:c(o.key)},{token:"keyword.name.codecademy-css",foreground:c(o.key)},{token:"selector-class.codecademy-css",foreground:c(o.attribute)},{token:"selector-colon.codecademy-css",foreground:c(o.predefined)},{token:"selector-id.codecademy-css",foreground:c(o.predefined)},{token:"meta.codecademy-css",foreground:c(o.tag)},{token:"meta-parens.codecademy-css",foreground:c(o.predefined)},{token:"meta-url.codecademy-css",foreground:c(o.text)},{token:"attribute.name.codecademy-css",foreground:c(o.predefined)},{token:"attribute.value.codecademy-css",foreground:c(o.constant)},{token:"attribute.value.number.codecademy-css",foreground:c(o.text)},{token:"attribute.value.unit.codecademy-css",foreground:c(o.text)},{token:"keyword.flow.codecademy-css",foreground:c(o.keyword)},{token:"keyword.value.codecademy-css",foreground:c(o.atom)},{token:"operator.codecademy-css",foreground:c(o.predefined)},{token:"operator-word.codecademy-css",foreground:c(o.keyword)},{token:"delimiter.codecademy-scss",foreground:c(o.predefined)},{token:"delimiter.bracket.codecademy-scss",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-scss",foreground:c(o.predefined)},{token:"delimiter.parenthesis.codecademy-scss",foreground:c(o.predefined)},{token:"delimiter.square.codecademy-scss",foreground:c(o.predefined)},{token:"number.codecademy-scss",foreground:c(o.text)},{token:"operator.codecademy-scss",foreground:c(o.predefined)},{token:"operator-word.codecademy-scss",foreground:c(o.keyword)},{token:"selector-class.codecademy-scss",foreground:c(o.attribute)},{token:"selector-id.codecademy-scss",foreground:c(o.predefined)},{token:"selector-colon.codecademy-scss",foreground:c(o.predefined)},{token:"variable.decl.codecademy-scss",foreground:c(o.constant)},{token:"variable.ref.codecademy-scss",foreground:c(o.constant)},{token:"keyword.name.codecademy-scss",foreground:c(o.key)},{token:"keyword.flow.codecademy-scss",foreground:c(o.keyword)},{token:"keyword.value.codecademy-scss",foreground:c(o.atom)},{token:"keyword.control.codecademy-scss",foreground:c(o.operator)},{token:"keyword.media.type.value.codecademy-scss",foreground:c(o.attribute)},{token:"keyword.media.value.value.codecademy-scss",foreground:c(o.keyword)},{token:"keyword.property.value.codecademy-scss",foreground:c(o.atom)},{token:"meta.codecademy-scss",foreground:c(o.predefined)},{token:"meta-parens.codecademy-scss",foreground:c(o.predefined)},{token:"meta-url.codecademy-scss",foreground:c(o.text)},{token:"attribute.name.codecademy-scss",foreground:c(o.key)},{token:"attribute.value.codecademy-scss",foreground:c(o.keyword)},{token:"function.invoke.codecademy-scss",foreground:c(o.constant)},{token:"class.codecademy-swift",foreground:c(o.keyword)},{token:"delimiter.codecademy-swift",foreground:c(o.basic)},{token:"delimiter.curly.codecademy-swift",foreground:c(o.basic)},{token:"delimiter.parenthesis.codecademy-swift",foreground:c(o.basic)},{token:"delimiter.square.codecademy-swift",foreground:c(o.basic)},{token:"forVariable.codecademy-swift",foreground:c(o.keyword)},{token:"functionDeclaration.codecademy-swift",foreground:c(o.keyword)},{token:"loopDeclaration.codecademy-swift",foreground:c(o.keyword)},{token:"identifier.codecademy-swift",foreground:c(o.constant)},{token:"identifier.unused.codecademy-swift",foreground:c(o.atom)},{token:"init.codecademy-swift",foreground:c(o.keyword)},{token:"invokedFunction.codecademy-swift",foreground:c(o.constant)},{token:"keyword.self.codecademy-swift",foreground:c(o.atom)},{token:"member.codecademy-swift",foreground:c(o.key)},{token:"number.codecademy-swift",foreground:c(o.constant)},{token:"operator.codecademy-swift",foreground:c(o.basic)},{token:"operator.parenthesis.codecademy-swift",foreground:c(o.string)},{token:"structDeclaration.codecademy-swift",foreground:c(o.keyword)},{token:"type.identifier.codecademy-swift",foreground:c(o.constant)},{token:"variableDeclaration.codecademy-swift",foreground:c(o.keyword)},{token:"default.codecademy-sql",foreground:c(o.constant)},{token:"string.codecademy-sql",foreground:c(o.string)},{token:"operator.codecademy-sql",foreground:c(o.basic)},{token:"null.codecademy-sql",foreground:c(o.atom)},{token:"predefined.codecademy-sql",foreground:c(o.keyword)},{token:"identifier.codecademy-sql",foreground:c(o.basic)},{token:"delimiter.codecademy-sql",foreground:c(o.basic)},{token:"number.codecademy-sql",foreground:c(o.constant)},{token:"default.codecademy-js",foreground:c(o.invalid)},{token:"identifier.codecademy-js",foreground:c(o.text)},{token:"type.codecademy-js",foreground:c(o.keyword)},{token:"definition.codecademy-js",foreground:c(o.keyword)},{token:"keyword.codecademy-js",foreground:c(o.keyword)},{token:"primitive.codecademy-js",foreground:c(o.atom)},{token:"number.codecademy-js",foreground:c(o.text)},{token:"property.codecademy-js",foreground:c(o.key)},{token:"delimiter.codecademy-js",foreground:c(o.basic)},{token:"delimiter.parenthesis.codecademy-js",foreground:c(o.basic)},{token:"delimiter.square.codecademy-js",foreground:c(o.basic)},{token:"delimiter.bracket.codecademy-js",foreground:c(o.basic)},{token:"delimiter.curly.codecademy-js",foreground:c(o.basic)},{token:"delimiter.angle.codecademy-js",foreground:c(o.basic)},{token:"delimiter.tag.codecademy-js",foreground:c(o.tag)},{token:"text.codecademy-js",foreground:c(o.basic)},{token:"regexp.codecademy-js",foreground:c(o.basic)},{token:"tag.definition.codecademy-js",foreground:c(o.tag)},{token:"regexp.escape.control.codecademy-js",foreground:c(o.basic)},{token:"regexp.escape.codecademy-js",foreground:c(o.basic)},{token:"prop.definition.codecademy-js",foreground:c(o.attribute)},{token:"keyword.other.codecademy-js",foreground:c(o.basic)},{token:"attribute.name.codecademy-php",foreground:c(o.constant)},{token:"attribute.value.codecademy-php",foreground:c(o.value)},{token:"boolean.codecademy-php",foreground:c(o.atom)},{token:"delimiter.codecademy-php",foreground:c(o.predefined)},{token:"constant.compiled.codecademy-php",foreground:c(o.atom)},{token:"delimiter.bracket.codecademy-php",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-php",foreground:c(o.predefined)},{token:"delimiter.parenthesis.codecademy-php",foreground:c(o.predefined)},{token:"delimiter.square.codecademy-php",foreground:c(o.predefined)},{token:"delimiter.html.codecademy-php",foreground:c(o.predefined)},{token:"html.codecademy-php",foreground:c(o.constant)},{token:"identifier.codecademy-php",foreground:c(o.keyword)},{token:"member.codecademy-php",foreground:c(o.text)},{token:"metatag.codecademy-php",foreground:c(o.keyword)},{token:"phptag.codecademy-php",foreground:c(o.constant)},{token:"tag.html.codecademy-php",foreground:c(o.constant)},{token:"variable.codecademy-php",foreground:c(o.text)},{token:"variable.predefined.codecademy-php",foreground:c(o.text)},{token:"default.codecademy-python",foreground:c(o.constant)},{token:"subkeyword.codecademy-python",foreground:c(o.basic)},{token:"delimiter.parenthesis.codecademy-python",foreground:c(o.basic)},{token:"delimiter.bracket.codecademy-python",foreground:c(o.basic)},{token:"delimiter.curly.codecademy-python",foreground:c(o.basic)},{token:"delimiter.codecademy-python",foreground:c(o.basic)},{token:"number.codecademy-python",foreground:c(o.constant)},{token:"operator.codecademy-python",foreground:c(o.basic)},{token:"definition.codecademy-python",foreground:c(o.keyword)},{token:"classMember.codecademy-python",foreground:c(o.key)},{token:"identifier.codecademy-python",foreground:c(o.text)},{token:"atom.codecademy-r",foreground:c(o.atom)},{token:"comment-markdown.codecademy-r",foreground:c(o.key)},{token:"constant.codecademy-r",foreground:c(o.atom)},{token:"delimiter.codecademy-r",foreground:c(o.predefined)},{token:"delimiter.comma.codecademy-r",foreground:c(o.predefined)},{token:"delimiter.curly.codecademy-r",foreground:c(o.predefined)},{token:"delimiter.parenthesis.codecademy-r",foreground:c(o.predefined)},{token:"identifier.codecademy-r",foreground:c(o.constant)},{token:"newline.codecademy-r",foreground:c(o.constant)},{token:"number.codecademy-r",foreground:c(o.constant)},{token:"keyword.codecademy-ruby",foreground:c(o.text)},{token:"keywordop.codecademy-ruby",foreground:c(o.basic)},{token:"subkeyword.codecademy-ruby",foreground:c(o.keyword)},{token:"builtin.codecademy-ruby",foreground:c(o.keyword)},{token:"methodname.codecademy-ruby",foreground:c(o.keyword)},{token:"identifier.codecademy-ruby",foreground:c(o.text)},{token:"invocation.codecademy-ruby",foreground:c(o.key)},{token:"enumelement.codecademy-ruby",foreground:c(o.keyword)},{token:"constructor.identifier.codecademy-ruby",foreground:c(o.operator)},{token:"namespace.instance.identifier.codecademy-ruby",foreground:c(o.text)},{token:"namespace.class.identifier.codecademy-ruby",foreground:c(o.text)},{token:"delimiter.parenthesis.codecademy-ruby",foreground:c(o.basic)},{token:"string.s.codecademy-ruby",foreground:c(o.atom)},{token:"delimiter.curly.codecademy-ruby",foreground:c(o.basic)},{token:"delimiter.square.codecademy-ruby",foreground:c(o.basic)},{token:"number.codecademy-ruby",foreground:c(o.text)},{token:"regexp.codecademy-ruby",foreground:c(o.basic)},{token:"regexp.delim.codecademy-ruby",foreground:c(o.basic)},{token:"regexp.escape.codecademy-ruby",foreground:c(o.basic)},{token:"regexp.escape.control.codecademy-ruby",foreground:c(o.basic)},{token:"default.codecademy-cs",foreground:c(o.text)},{token:"namespace.codecademy-cs",foreground:c(o.keyword)},{token:"className.codecademy-cs",foreground:c(o.keyword)},{token:"inheritsDelimiter.codecademy-cs",foreground:c(o.keyword)},{token:"identifier.codecademy-cs",foreground:c(o.text)},{token:"delimiter.codecademy-cs",foreground:c(o.basic)},{token:"delimiter.curly.codecademy-cs",foreground:c(o.basic)},{token:"delimiter.square.codecademy-cs",foreground:c(o.basic)},{token:"delimiter.parenthesis.codecademy-cs",foreground:c(o.basic)},{token:"delimiter.angle.codecademy-cs",foreground:c(o.basic)},{token:"number.codecademy-cs",foreground:c(o.text)},{token:"booleanKeyword.codecademy-cs",foreground:c(o.atom)},{token:"typeKeyword.codecademy-cs",foreground:c(o.text)},{token:"default.codecademy-razor",foreground:c(o.text)},{token:"namespace.codecademy-razor",foreground:c(o.keyword)},{token:"className.codecademy-razor",foreground:c(o.keyword)},{token:"inheritsDelimiter.codecademy-razor",foreground:c(o.keyword)},{token:"metatag.codecademy-razor",foreground:c(o.text)},{token:"metaKeyword.codecademy-razor",foreground:c(o.text)},{token:"controlMetaKeyword.codecademy-razor",foreground:c(o.text)},{token:"identifier.codecademy-razor",foreground:c(o.text)},{token:"delimiter.codecademy-razor",foreground:c(o.basic)},{token:"delimiter.curly.codecademy-razor",foreground:c(o.basic)},{token:"delimiter.square.codecademy-razor",foreground:c(o.basic)},{token:"delimiter.parenthesis.codecademy-razor",foreground:c(o.basic)},{token:"delimiter.angle.codecademy-razor",foreground:c(o.basic)},{token:"number.codecademy-razor",foreground:c(o.text)},{token:"booleanKeyword.codecademy-razor",foreground:c(o.atom)},{token:"typeKeyword.codecademy-razor",foreground:c(o.keyword)},{token:"default.codecademy-cpp",foreground:c(o.text)},{token:"identifier.codecademy-cpp",foreground:c(o.text)},{token:"string.include.identifier.codecademy-cpp",foreground:c(o.comment)},{token:"number.codecademy-cpp",foreground:c(o.text)},{token:"identifierKeyword.codecademy-cpp",foreground:c(o.text)},{token:"unrecognizedKeyword.codecademy-cpp",foreground:c(o.basic)},{token:"specialKeyword.codecademy-cpp",foreground:c(o.atom)},{token:"className.codecademy-cpp",foreground:c(o.keyword)},{token:"functionName.codecademy-cpp",foreground:c(o.keyword)},{token:"inlineSetter.codecademy-cpp",foreground:c(o.text)},{token:"functionName.classDefinition.codecademy-cpp",foreground:c(o.text)},{token:"delimiter.codecademy-cpp",foreground:c(o.basic)},{token:"delimiter.curly.codecademy-cpp",foreground:c(o.basic)},{token:"delimiter.square.codecademy-cpp",foreground:c(o.basic)},{token:"delimiter.parenthesis.codecademy-cpp",foreground:c(o.basic)}],colors:{"editor.background":e.background,"editor.foreground":e.text,"editorIndentGuide.background":e.indent.inactive,"editorIndentGuide.activeBackground":e.indent.active,"editorWhitespace.foreground":o.comment}}))(d)},veT5:function(e,o,r){"use strict";r.d(o,"a",(function(){return Markdown_Markdown}));var d=r("wx14"),n=r("rePB"),t=r("Ff2n"),a=r("5sab"),i=r("TSYQ"),u=r.n(i),s=r("q1tI"),m=r.n(s),f=r("Qcta"),y=r("rnUt"),k="errorBlock__2oVHQQnsjhJzzFnkMpHhy3";const ErrorBlock=({children:e,className:o})=>m.a.createElement("code",{className:u()(k,o)},e);var g="pseudoBlock__11mCWHdsYX0aJx2RW_D_DD";const PseudoBlock=({children:e,className:o})=>m.a.createElement("code",{className:u()(g,o)},e);var l="markdown__1eeYJ4WPKUcvX_LDDGJR12",p="darkTheme__2i0sjr_RjoITRh35Ld2GzM";function ownKeys(e,o){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);o&&(d=d.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),r.push.apply(r,d)}return r}function _objectSpread(e){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?ownKeys(Object(r),!0).forEach((function(o){Object(n.a)(e,o,r[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))}))}return e}const b={CodeBlock:{component:e=>{let o=e.language,r=void 0===o?"txt":o,n=Object(t.a)(e,["language"]);return"pseudo"===r?m.a.createElement(PseudoBlock,n):"error"===r?m.a.createElement(ErrorBlock,n):"tex"===r?m.a.createElement(y.a,Object(d.a)({},n,{language:r})):m.a.createElement(f.a,Object(d.a)({},n,{language:r}))}}},Markdown_Markdown=e=>{const o=e.darkTheme,r=e.overrides,n=Object(t.a)(e,["darkTheme","overrides"]);return m.a.createElement(a.a,Object(d.a)({"data-testid":"markdown"},n,{className:u()(l,{["".concat(p)]:o},e.className),overrides:_objectSpread(_objectSpread({},b),r)}))}}}]);
//# sourceMappingURL=70.8ea275e02c15dd5a1a72.chunk.js.map