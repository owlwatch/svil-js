parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QKPX":[function(require,module,exports) {
"use strict";function e(e){if("undefined"==typeof document)throw new Error("document-ready only runs in the browser");var t=document.readyState;if("complete"===t||"interactive"===t)return setTimeout(e,0);document.addEventListener("DOMContentLoaded",function(){e()})}module.exports=e;
},{}],"zW8g":[function(require,module,exports) {
"use strict";var r=function(r){return e(r)&&!t(r)};function e(r){return!!r&&"object"==typeof r}function t(r){var e=Object.prototype.toString.call(r);return"[object RegExp]"===e||"[object Date]"===e||c(r)}var n="function"==typeof Symbol&&Symbol.for,o=n?Symbol.for("react.element"):60103;function c(r){return r.$$typeof===o}function u(r){return Array.isArray(r)?[]:{}}function a(r,e){return!1!==e.clone&&e.isMergeableObject(r)?g(u(r),r,e):r}function i(r,e,t){return r.concat(e).map(function(r){return a(r,t)})}function f(r,e){if(!e.customMerge)return g;var t=e.customMerge(r);return"function"==typeof t?t:g}function y(r){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(r).filter(function(e){return r.propertyIsEnumerable(e)}):[]}function b(r){return Object.keys(r).concat(y(r))}function l(r,e){try{return e in r}catch(t){return!1}}function s(r,e){return l(r,e)&&!(Object.hasOwnProperty.call(r,e)&&Object.propertyIsEnumerable.call(r,e))}function p(r,e,t){var n={};return t.isMergeableObject(r)&&b(r).forEach(function(e){n[e]=a(r[e],t)}),b(e).forEach(function(o){s(r,o)||(l(r,o)&&t.isMergeableObject(e[o])?n[o]=f(o,t)(r[o],e[o],t):n[o]=a(e[o],t))}),n}function g(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||i,n.isMergeableObject=n.isMergeableObject||r,n.cloneUnlessOtherwiseSpecified=a;var o=Array.isArray(t);return o===Array.isArray(e)?o?n.arrayMerge(e,t,n):p(e,t,n):a(t,n)}g.all=function(r,e){if(!Array.isArray(r))throw new Error("first argument should be an array");return r.reduce(function(r,t){return g(r,t,e)},{})};var O=g;module.exports=O;
},{}],"CpHm":[function(require,module,exports) {
"use strict";function e(e,o,t,n){var r,i=!1,u=0;function c(){r&&clearTimeout(r)}function a(){for(var a=arguments.length,f=new Array(a),v=0;v<a;v++)f[v]=arguments[v];var d=this,l=Date.now()-u;function s(){u=Date.now(),t.apply(d,f)}i||(n&&!r&&s(),c(),void 0===n&&l>e?s():!0!==o&&(r=setTimeout(n?function(){r=void 0}:s,void 0===n?e-l:e)))}return"boolean"!=typeof o&&(n=t,t=o,o=void 0),a.cancel=function(){c(),i=!0},a}function o(o,t,n){return void 0===n?e(o,t,!1):e(o,n,!1!==t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.debounce=o,exports.throttle=e;
},{}],"Bh1I":[function(require,module,exports) {
var t=null;function e(){return t||(t=n()),t}function n(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return r(t[0])}return"/"}function r(t){return(""+t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/,"$1")+"/"}exports.getBundleURL=e,exports.getBaseURL=r;
},{}],"z1Am":[function(require,module,exports) {
var r=require("./bundle-url").getBundleURL;function e(r){Array.isArray(r)||(r=[r]);var e=r[r.length-1];try{return Promise.resolve(require(e))}catch(n){if("MODULE_NOT_FOUND"===n.code)return new s(function(n,i){t(r.slice(0,-1)).then(function(){return require(e)}).then(n,i)});throw n}}function t(r){return Promise.all(r.map(u))}var n={};function i(r,e){n[r]=e}module.exports=exports=e,exports.load=t,exports.register=i;var o={};function u(e){var t;if(Array.isArray(e)&&(t=e[1],e=e[0]),o[e])return o[e];var i=(e.substring(e.lastIndexOf(".")+1,e.length)||e).toLowerCase(),u=n[i];return u?o[e]=u(r()+e).then(function(r){return r&&module.bundle.register(t,r),r}).catch(function(r){throw delete o[e],r}):void 0}function s(r){this.executor=r,this.promise=null}s.prototype.then=function(r,e){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.then(r,e)},s.prototype.catch=function(r){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.catch(r)};
},{"./bundle-url":"Bh1I"}],"vBHa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("document-ready")),t=r(require("deepmerge")),n=require("throttle-debounce");function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,i,u,o){try{var a=e[u](o),s=a.value}catch(c){return void n(c)}a.done?t(s):Promise.resolve(s).then(r,i)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(r,u){var o=e.apply(t,n);function a(e){i(o,r,u,a,s,"next",e)}function s(e){i(o,r,u,a,s,"throw",e)}a(void 0)})}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}var c={componentAttribute:"vue-component",propsAttribute:"vue-props",enableConfig:!1,enableApp:!1,components:[]},p=function(){function r(i){var u=this;o(this,r),this.config=(0,t.default)(c,i);var a=(0,n.throttle)(50,function(){return u.parseDocument()});window.MutationObserver&&new MutationObserver(a).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-".concat(this.config.propsAttribute)]});(0,e.default)(a)}return s(r,[{key:"parseDocument",value:function(){var e=this,t=this.config.componentAttribute;document.querySelectorAll("[data-".concat(t,"]")).forEach(function(t){e.parse(t)})}},{key:"parse",value:function(){var e=u(regeneratorRuntime.mark(function e(n){var r,i,u,o,a,s,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=this.config.componentAttribute.replace(/-./g,function(e){return e.toUpperCase()[1]}),i=this.config.propsAttribute.replace(/-./g,function(e){return e.toUpperCase()[1]}),u=n.dataset[r],"function"==typeof this.config.components[u]){e.next=5;break}return e.abrupt("return");case 5:return o=n.dataset[i]?JSON.parse(n.dataset[i]):{},n.removeAttribute("data-".concat(this.config.componentAttribute)),e.next=9,this.getVue();case 9:return a=e.sent,e.next=12,this.config.components[u]();case 12:if(s=e.sent,this.config.enableConfig&&(o.config=(0,t.default)({},o)),this.config.createApp&&!this.app&&(this.app=this.config.createApp()),!this.app){e.next=19;break}return e.next=18,this.app;case 18:o.app=e.sent;case 19:c=new a({el:n,render:function(e){return e(s.default,{props:o})}}),window.jQuery&&window.jQuery(c.$el).data("vue",c.$children[0]);case 21:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getVue",value:function(){var e=u(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.Vue){e.next=2;break}return e.abrupt("return",this.Vue);case 2:if(!this.config.Vue){e.next=6;break}this.Vue=this.config.Vue,e.next=15;break;case 6:if(!this.config.vuePromise){e.next=12;break}return e.next=9,this.config.vuePromise();case 9:this.Vue=e.sent,e.next=15;break;case 12:return e.next=14,require("_bundle_loader")(require.resolve("vue"));case 14:this.Vue=e.sent.default;case 15:return this.config.useEventBus&&this.Vue.prototype&&(this.Vue.prototype.$eventBus=new this.Vue),e.abrupt("return",this.Vue);case 17:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),r}(),f=p;exports.default=f;
},{"document-ready":"QKPX","deepmerge":"zW8g","throttle-debounce":"CpHm","_bundle_loader":"z1Am","vue":[["vue.runtime.esm.f66d4a1b.js","NtAQ"],"vue.runtime.esm.f66d4a1b.js.map","NtAQ"]}],"jOQz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("document-ready")),t=require("throttle-debounce");function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t,r,n,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void r(s)}i.done?t(c):Promise.resolve(c).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise(function(o,a){var u=e.apply(t,r);function i(e){n(u,o,a,i,c,"next",e)}function c(e){n(u,o,a,i,c,"throw",e)}i(void 0)})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,r){return t&&u(e.prototype,t),r&&u(e,r),e}var c=function(){function r(n){var o=this;a(this,r),this.layouts=n;var u=(0,t.throttle)(50,function(){return o.parseDocument()});window.MutationObserver&&new MutationObserver(u).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0});(0,e.default)(u)}return i(r,[{key:"parseDocument",value:function(){this.layouts.forEach(function(){var e=o(regeneratorRuntime.mark(function e(t){var r,n,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=[],t.selector?(n=t.selector.split(",").map(function(e){return e.trim()+':not([data-layout-rendered~="'.concat(t.name,'"])')}).join(","),r=document.querySelectorAll(n)):t.test&&(r=t.test()),!r.length||!t.import){e.next=8;break}return Array.prototype.forEach.call(r,function(e){var r=e.getAttribute("data-layout-rendered");r||(r="");var n=r.split(" ");n.push(t.name),e.setAttribute("data-layout-rendered",n.join(" "))}),e.next=6,t.import();case 6:o=e.sent,Array.prototype.forEach.call(r,function(e){var r={};if(t.config){var n=e.getAttribute(t.config);n&&(r=JSON.parse(n))}var a=o.default||o;a.init&&a.init(e,r),a.render&&a.render(e,r)});case 8:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}}]),r}(),s=c;exports.default=s;
},{"document-ready":"QKPX","throttle-debounce":"CpHm"}],"lb1L":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("document-ready"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e,t,n,r,o,u,i){try{var a=e[u](i),c=a.value}catch(s){return void n(s)}a.done?t(c):Promise.resolve(c).then(r,o)}function r(e){return function(){var t=this,r=arguments;return new Promise(function(o,u){var i=e.apply(t,r);function a(e){n(i,o,u,a,c,"next",e)}function c(e){n(i,o,u,a,c,"throw",e)}a(void 0)})}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e}var a=function(){function t(n){var r=this;o(this,t),this.environments=n,(0,e.default)(function(){return r.parse()})}return i(t,[{key:"parse",value:function(){this.environments.forEach(function(){var e=r(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=!1,t.selector?document.querySelector(t.selector)&&(n=!0):t.test&&t.test()&&(n=!0),!n||!t.import){e.next=7;break}return e.next=5,t.import();case 5:((r=e.sent).default||r).init();case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}}]),t}(),c=a;exports.default=c;
},{"document-ready":"QKPX"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"VueLoader",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"LayoutLoader",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"EnvironmentLoader",{enumerable:!0,get:function(){return t.default}});var e=u(require("./loader/vue")),r=u(require("./loader/layout")),t=u(require("./loader/environment"));function u(e){return e&&e.__esModule?e:{default:e}}
},{"./loader/vue":"vBHa","./loader/layout":"jOQz","./loader/environment":"lb1L"}],"Ijyk":[function(require,module,exports) {
module.exports=function(n){return new Promise(function(e,o){var r=document.createElement("script");r.async=!0,r.type="text/javascript",r.charset="utf-8",r.src=n,r.onerror=function(n){r.onerror=r.onload=null,o(n)},r.onload=function(){r.onerror=r.onload=null,e()},document.getElementsByTagName("head")[0].appendChild(r)})};
},{}],0:[function(require,module,exports) {
var b=require("z1Am");b.register("js",require("Ijyk"));
},{}]},{},[0,"Focm"], null)
//# sourceMappingURL=/index.js.map