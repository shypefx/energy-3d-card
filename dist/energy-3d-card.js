function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const h=window,c=h.trustedTypes,d=c?c.emptyScript:"",p=h.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:g},f="finalized";class $ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;$[f]=!0,$.elementProperties=new Map,$.elementStyles=[],$.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:$}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.3");const m=window,_=m.trustedTypes,w=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,b="?"+x,E=`<${b}>`,S=document,C=()=>S.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,T="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,H=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,F=/"/g,O=/^(?:script|style|textarea|title)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),j=new WeakMap,D=S.createTreeWalker(S,129,null,!1);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const B=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=M;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===M?"!--"===l[1]?n=U:void 0!==l[1]?n=H:void 0!==l[2]?(O.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=null!=o?o:M,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?R:'"'===l[3]?F:N):n===F||n===N?n=R:n===U||n===H?n=M:(n=R,o=void 0);const d=n===R&&t[e+1].startsWith("/>")?" ":"";r+=n===M?i+E:h>=0?(s.push(a),i.slice(0,h)+A+i.slice(h)+x+d):i+x+(-2===h?(s.push(void 0),e):d)}return[W(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,h]=B(t,e);if(this.el=q.createElement(l,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=D.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(x)){const i=h[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(x),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Y:Z})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),D.nextNode(),a.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===b)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function V(t,e,i=t,s){var o,r,n,a;if(e===I)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const h=P(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,s)),void 0!==s?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=V(t,l._$AS(t,e.values),l,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);D.currentNode=o;let r=D.nextNode(),n=0,a=0,l=s[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new K(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new tt(r,this,t)),this._$AV.push(e),l=s[++a]}n!==(null==l?void 0:l.index)&&(r=D.nextNode(),n++)}return D.currentNode=S,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,s){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),P(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>k(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==L&&P(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(W(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new J(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new q(t)),e}T(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,i,s,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=V(this,t,e,0),r=!P(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=V(this,s[i+n],e,n),a===I&&(a=this._$AH[n]),r||(r=!P(a)||a!==this._$AH[n]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const Q=_?_.emptyScript:"";class X extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends Z{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=V(this,t,e,0))&&void 0!==i?i:L)===I)return;const s=this._$AH,o=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==L&&(s===L||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const et=m.litHtmlPolyfillSupport;null==et||et(q,K),(null!==(y=m.litHtmlVersions)&&void 0!==y?y:m.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new K(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:ot}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):nt(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var lt;null===(lt=window.HTMLSlotElement)||void 0===lt||lt.prototype.assignedElements;let ht=class extends ot{constructor(){super(...arguments),this.flowStates=new Map,this.energyFlows=[{id:"grid",entities:[],name:"Grid",path:[{x:36.1,y:89.1},{x:77.7,y:79},{x:68.5,y:74.5},{x:68.2,y:73.2},{x:68.2,y:66.2}],valuePosition:{x:50,y:105}}],this.colorThresholds=[{max:500,color:{r:0,g:204,b:102},glow:{r:0,g:200,b:100},core:{r:200,g:255,b:220},name:"green"},{max:1e3,color:{r:255,g:180,b:0},glow:{r:255,g:160,b:0},core:{r:255,g:230,b:150},name:"orange-low"},{max:1500,color:{r:255,g:120,b:0},glow:{r:255,g:100,b:0},core:{r:255,g:200,b:150},name:"orange-red"},{max:2e3,color:{r:255,g:60,b:0},glow:{r:255,g:50,b:0},core:{r:255,g:180,b:150},name:"red-orange"},{max:1/0,color:{r:255,g:0,b:0},glow:{r:230,g:0,b:0},core:{r:255,g:150,b:150},name:"red"}],this.runAnimation=()=>{if(!this.ctx||!this.canvas||0===this.canvas.width)return void(this.animationId=requestAnimationFrame(this.runAnimation));const t=this.canvas.width,e=this.canvas.height;this.ctx.clearRect(0,0,t,e),this.energyFlows.forEach(i=>{const s=this.flowStates.get(i.id);s&&this.drawFlowPath(i,s,t,e)}),this.animationId=requestAnimationFrame(this.runAnimation)}}firstUpdated(){const t=this.shadowRoot?.querySelector(".layer-img");t&&t.complete&&this.handleImageLoad(),this.setupCanvas()}setConfig(t){if(!t)throw new Error("Configuration invalide");this.config=t;const e=[];t.grid_entity&&e.push(t.grid_entity),t.grid_entities&&Array.isArray(t.grid_entities)&&e.push(...t.grid_entities),this.energyFlows[0].entities=e,t.grid_name&&(this.energyFlows[0].name=t.grid_name),t.grid_path&&Array.isArray(t.grid_path)&&(this.energyFlows[0].path=t.grid_path),t.grid_value_position&&(this.energyFlows[0].valuePosition=t.grid_value_position),t.flows&&Array.isArray(t.flows)&&(this.energyFlows=t.flows),this.initializeFlowStates()}initializeFlowStates(){this.flowStates.clear(),this.energyFlows.forEach(t=>{const e=[];let i=0;for(let s=0;s<t.path.length-1;s++){const o=t.path[s],r=t.path[s+1],n=Math.sqrt(Math.pow(r.x-o.x,2)+Math.pow(r.y-o.y,2));e.push(n),i+=n}this.flowStates.set(t.id,{progress:-.5*Math.random(),segmentDistances:e,totalPathLength:i})})}getColorForPower(t){const e=Math.abs(t);for(const t of this.colorThresholds)if(e<=t.max)return t;return this.colorThresholds[this.colorThresholds.length-1]}getTextColorForPower(t){const e=this.getColorForPower(t);return`rgb(${e.color.r}, ${e.color.g}, ${e.color.b})`}getPowerForFlow(t){let e=0;return t.entities.forEach(t=>{if(this.hass?.states[t]){const i=parseFloat(this.hass.states[t].state);isNaN(i)||(e+=i)}}),e}getEntityPowers(t){return t.entities.map(t=>{const e=this.hass?.states[t],i=e&&parseFloat(e.state)||0,s=e?.attributes?.friendly_name||t.split(".").pop()||t;return{entity:t,name:s,power:i}})}isFlowActive(t){const e=this.getPowerForFlow(t);return Math.abs(e)>10}disconnectedCallback(){super.disconnectedCallback(),this.animationId&&cancelAnimationFrame(this.animationId)}updated(){this.canvas||this.setupCanvas()}setupCanvas(){if(this.canvas=this.shadowRoot?.querySelector(".layer-canvas"),this.canvas){this.ctx=this.canvas.getContext("2d");const t=this.shadowRoot?.querySelector(".layer-img");t&&t.complete&&t.naturalWidth>0?(this.resizeCanvas(),this.startAnimation()):t&&t.addEventListener("load",()=>{this.resizeCanvas(),this.startAnimation()})}}resizeCanvas(){const t=this.shadowRoot?.querySelector(".image-wrapper"),e=this.shadowRoot?.querySelector(".layer-img");this.canvas&&t&&e&&e.offsetWidth>0&&(this.canvas.width=t.offsetWidth,this.canvas.height=t.offsetHeight)}startAnimation(){this.animationId&&cancelAnimationFrame(this.animationId),this.runAnimation()}getPointAtProgress(t,e,i,s,o){if(t<0||t>1)return null;const r=t*o.totalPathLength;let n=0;for(let t=0;t<o.segmentDistances.length;t++){if(n+o.segmentDistances[t]>=r){const a=(r-n)/o.segmentDistances[t],l=s[t],h=s[t+1];return{x:(l.x+(h.x-l.x)*a)/100*e,y:(l.y+(h.y-l.y)*a)/100*i}}n+=o.segmentDistances[t]}const a=s[s.length-1];return{x:a.x/100*e,y:a.y/100*i}}drawFlowPath(t,e,i,s){if(!this.ctx)return;const o=this.getPowerForFlow(t),r=Math.abs(o)>10,n=o<0,a=this.getColorForPower(o),{color:l,glow:h,core:c}=a;if(this.ctx.beginPath(),this.ctx.strokeStyle=r?"rgba(100, 110, 120, 0.5)":"rgba(60, 65, 70, 0.3)",this.ctx.lineWidth=3,this.ctx.lineCap="round",this.ctx.lineJoin="round",t.path.forEach((t,e)=>{const o=t.x/100*i,r=t.y/100*s;0===e?this.ctx.moveTo(o,r):this.ctx.lineTo(o,r)}),this.ctx.stroke(),!r)return;const d=.005*(1+Math.abs(o)/2e3),p=25;e.progress+=d,e.progress>1.3&&(e.progress=-.3);let u=Math.max(0,e.progress-.3),g=Math.min(1,e.progress);if(n){const t=1-g;g=1-u,u=t}if(g>u)for(let o=0;o<p;o++){const r=u+o/p*(g-u),a=u+(o+1)/p*(g-u),d=n?(p-o)/p:o/p,v=1+3*d,f=.3+.7*d,$=this.getPointAtProgress(r,i,s,t.path,e),y=this.getPointAtProgress(a,i,s,t.path,e);if($&&y){const t=(n?o<=2:o>=22)?"butt":"round";this.ctx.beginPath(),this.ctx.strokeStyle=`rgba(${h.r}, ${h.g}, ${h.b}, ${.15*f})`,this.ctx.lineWidth=v+4,this.ctx.lineCap=t,this.ctx.moveTo($.x,$.y),this.ctx.lineTo(y.x,y.y),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.strokeStyle=`rgba(${l.r}, ${l.g}, ${l.b}, ${f})`,this.ctx.lineWidth=v,this.ctx.lineCap=t,this.ctx.moveTo($.x,$.y),this.ctx.lineTo(y.x,y.y),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.strokeStyle=`rgba(${c.r}, ${c.g}, ${c.b}, ${.5*f})`,this.ctx.lineWidth=Math.max(1,.3*v),this.ctx.lineCap=t,this.ctx.moveTo($.x,$.y),this.ctx.lineTo(y.x,y.y),this.ctx.stroke()}}}handleImageLoad(){this.resizeCanvas(),this.startAnimation()}render(){if(!this.hass||!this.config)return z`<div class="loading">Chargement...</div>`;const t=this.config.image||("localhost"===window.location.hostname?"./images/house.webp":"/local/energy-3d-card/house.webp"),e=!1!==this.config.show_details,i=this.config.image_size||90;return z`
      <ha-card>
        <div class="card-content">
          <div class="layers-container">
            <div class="image-wrapper" style="width: ${i}%;">
              <img 
                src="${t}" 
                class="layer-img" 
                alt="House" 
                @load=${this.handleImageLoad}
              />
              <canvas class="layer-canvas"></canvas>
            </div>
          </div>

          <div class="power-values-container">
            ${this.energyFlows.map(t=>{const i=this.getPowerForFlow(t),s=this.getTextColorForPower(i),o=Math.abs(i)>10,r=this.getEntityPowers(t);return o?z`
                <div 
                  class="power-value" 
                  style="color: ${s};"
                >
                  <span class="power-icon">⚡</span>
                  <span class="power-label">${t.name}:</span>
                  <span class="power-number">${Math.abs(Math.round(i))}</span>
                  <span class="power-unit">W</span>
                  ${e&&r.length>1?z`
                    <div class="power-details">
                      ${r.map(t=>z`
                        <span class="power-detail-item">
                          ${t.name}: ${Math.abs(Math.round(t.power))} W
                        </span>
                      `)}
                    </div>
                  `:""}
                </div>
              `:""})}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return n`
      :host {
        display: block;
        width: 100%;
      }

      ha-card {
        background: var(--ha-card-background, var(--card-background-color, transparent));
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }

      .card-content {
        padding: 16px;
      }

      .layers-container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .image-wrapper {
        position: relative;
        margin: 0 auto;
      }

      .layer-img {
        width: 100%;
        height: auto;
        display: block;
      }

      .layer-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .power-values-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      }

      .power-value {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        font-family: 'Segoe UI', Tahoma, sans-serif;
        transition: all 0.3s ease;
      }

      .power-icon {
        font-size: 14px;
      }

      .power-label {
        font-size: 12px;
        font-weight: 500;
        opacity: 0.9;
      }

      .power-number {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .power-unit {
        font-size: 11px;
        font-weight: 500;
        opacity: 0.8;
      }

      .power-details {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid currentColor;
        opacity: 0.75;
      }

      .power-detail-item {
        font-size: 10px;
        font-weight: 500;
      }

      .loading {
        padding: 40px;
        text-align: center;
        color: var(--secondary-text-color);
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}};t([at({attribute:!1})],ht.prototype,"hass",void 0),t([function(t){return at({...t,state:!0})}()],ht.prototype,"config",void 0),ht=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("energy-3d-card")],ht);export{ht as Energy3dCard};
