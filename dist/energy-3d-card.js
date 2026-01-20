function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const h=window,c=h.trustedTypes,d=c?c.emptyScript:"",p=h.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:g},$="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty($))return!1;this[$]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;f[$]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:f}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.3");const _=window,m=_.trustedTypes,w=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",b=`lit$${(Math.random()+"").slice(9)}$`,x="?"+b,E=`<${x}>`,S=document,C=()=>S.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,O=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,N=/"/g,F=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),I=new WeakMap,j=S.createTreeWalker(S,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=k;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===k?"!--"===l[1]?r=T:void 0!==l[1]?r=H:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=O):void 0!==l[3]&&(r=O):r===O?">"===l[0]?(r=null!=o?o:k,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?O:'"'===l[3]?N:R):r===N||r===R?r=O:r===T||r===H?r=k:(r=O,o=void 0);const d=r===O&&t[e+1].startsWith("/>")?" ":"";n+=r===k?i+E:h>=0?(s.push(a),i.slice(0,h)+A+i.slice(h)+b+d):i+b+(-2===h?(s.push(void 0),e):d)}return[B(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,h]=V(t,e);if(this.el=W.createElement(l,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=j.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(b)){const i=h[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(b),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:K})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(F.test(s.tagName)){const t=s.textContent.split(b),e=t.length-1;if(e>0){s.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),j.nextNode(),a.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(b,t+1));)a.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var o,n,r,a;if(e===z)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const h=P(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);j.currentNode=o;let n=j.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new tt(n,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=j.nextNode(),r++)}return j.currentNode=S,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var o;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),P(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>M(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&P(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=W.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new G(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new W(t)),e}T(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,s,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=q(this,t,e,0),n=!P(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=q(this,s[i+r],e,r),a===z&&(a=this._$AH[r]),n||(n=!P(a)||a!==this._$AH[r]),a===D?t=D:t!==D&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const Q=m?m.emptyScript:"";class X extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends K{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:D)===z)return;const s=this._$AH,o=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==D&&(s===D||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=_.litHtmlPolyfillSupport;null==et||et(W,J),(null!==(y=_.litHtmlVersions)&&void 0!==y?y:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class ot extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:ot}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):rt(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return at({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht;null===(ht=window.HTMLSlotElement)||void 0===ht||ht.prototype.assignedElements;let ct=class extends ot{constructor(){super(...arguments),this.energyFlows=[],this.flowStates=new Map,this.colorThresholds=[{max:500,color:{r:0,g:204,b:102},glow:{r:0,g:200,b:100},core:{r:200,g:255,b:220}},{max:1e3,color:{r:255,g:180,b:0},glow:{r:255,g:160,b:0},core:{r:255,g:230,b:150}},{max:1500,color:{r:255,g:120,b:0},glow:{r:255,g:100,b:0},core:{r:255,g:200,b:150}},{max:2e3,color:{r:255,g:60,b:0},glow:{r:255,g:50,b:0},core:{r:255,g:180,b:150}},{max:1/0,color:{r:255,g:0,b:0},glow:{r:230,g:0,b:0},core:{r:255,g:150,b:150}}],this.defaultPaths={grid:[{x:36.1,y:89.1},{x:77.7,y:79},{x:68.5,y:74.5},{x:68.2,y:73.2},{x:68.2,y:66.2}],solar:[{x:50,y:10},{x:50,y:30},{x:60,y:45},{x:68.2,y:66.2}],battery:[{x:90,y:70},{x:80,y:68},{x:68.2,y:66.2}]}}static getConfigElement(){return document.createElement("energy-3d-card-editor")}static getStubConfig(){return{grid_name:"Grid",grid_entities:[],show_details:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t,this.buildEnergyFlows(),this.initializeFlowStates()}buildEnergyFlows(){const t=[],e=this.collectEntities("grid");e.length>0&&t.push({id:"grid",entities:e,name:this.config.grid_name||"Grid",path:this.config.grid_path||this.defaultPaths.grid,valuePosition:this.config.grid_value_position||{x:5,y:94}});const i=this.collectEntities("solar");i.length>0&&t.push({id:"solar",entities:i,name:this.config.solar_name||"Solar",path:this.config.solar_path||this.defaultPaths.solar,valuePosition:this.config.solar_value_position||{x:40,y:5}});const s=this.collectEntities("battery");s.length>0&&t.push({id:"battery",entities:s,name:this.config.battery_name||"Battery",path:this.config.battery_path||this.defaultPaths.battery,valuePosition:this.config.battery_value_position||{x:85,y:65}}),this.config.flows&&t.push(...this.config.flows),this.energyFlows=t}collectEntities(t){const e=[],i=`${t}_entity`,s=`${t}_entities`,o=this.config[i],n=this.config[s];return o&&e.push(o),n&&e.push(...n),e}initializeFlowStates(){this.flowStates.clear(),this.energyFlows.forEach(t=>{const e=this.calculateSegmentDistances(t.path),i=e.reduce((t,e)=>t+e,0);this.flowStates.set(t.id,{progress:Math.random(),segmentDistances:e,totalPathLength:i})})}calculateSegmentDistances(t){const e=[];for(let i=0;i<t.length-1;i++){const s=t[i+1].x-t[i].x,o=t[i+1].y-t[i].y;e.push(Math.sqrt(s*s+o*o))}return e}firstUpdated(){this.setupCanvas(),this.startAnimation()}setupCanvas(){this.canvas=this.shadowRoot?.querySelector(".layer-canvas"),this.canvas&&(this.ctx=this.canvas.getContext("2d"))}handleImageLoad(){const t=this.shadowRoot?.querySelector(".layer-img");t&&this.canvas&&(this.canvas.width=t.naturalWidth,this.canvas.height=t.naturalHeight)}startAnimation(){const t=()=>{this.updateAnimation(),this.drawFlows(),this.animationId=requestAnimationFrame(t)};t()}updateAnimation(){const t="fast"===this.config.animation_speed?.015:"slow"===this.config.animation_speed?.003:.007;this.energyFlows.forEach(e=>{const i=this.flowStates.get(e.id);if(i){const s=Math.abs(this.getPowerForFlow(e)),o=Math.max(.5,Math.min(2,s/1e3));i.progress+=t*o,i.progress>1&&(i.progress=0)}})}drawFlows(){this.ctx&&this.canvas&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.energyFlows.forEach(t=>{const e=this.getPowerForFlow(t);Math.abs(e)>10&&this.drawEnergyFlow(t,e)}))}drawEnergyFlow(t,e){if(!this.ctx||!this.canvas)return;const i=this.flowStates.get(t.id);if(!i)return;const s=this.getColorsForPower(Math.abs(e)),o=t.path.map(t=>({x:t.x/100*this.canvas.width,y:t.y/100*this.canvas.height}));this.ctx.beginPath(),this.ctx.moveTo(o[0].x,o[0].y);for(let t=1;t<o.length;t++)this.ctx.lineTo(o[t].x,o[t].y);this.ctx.strokeStyle=`rgba(${s.glow.r}, ${s.glow.g}, ${s.glow.b}, 0.3)`,this.ctx.lineWidth=8,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.stroke();const n=Math.min(8,Math.max(3,Math.floor(e/300)));for(let t=0;t<n;t++){const e=(i.progress+t/n)%1,r=this.getPositionOnPath(o,e,i),a=this.ctx.createRadialGradient(r.x,r.y,0,r.x,r.y,12);a.addColorStop(0,`rgba(${s.core.r}, ${s.core.g}, ${s.core.b}, 1)`),a.addColorStop(.3,`rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, 0.8)`),a.addColorStop(1,`rgba(${s.glow.r}, ${s.glow.g}, ${s.glow.b}, 0)`),this.ctx.beginPath(),this.ctx.arc(r.x,r.y,12,0,2*Math.PI),this.ctx.fillStyle=a,this.ctx.fill()}}getPositionOnPath(t,e,i){const s=e*i.totalPathLength;let o=0;for(let e=0;e<i.segmentDistances.length;e++){if(o+i.segmentDistances[e]>=s){const n=(s-o)/i.segmentDistances[e];return{x:t[e].x+(t[e+1].x-t[e].x)*n,y:t[e].y+(t[e+1].y-t[e].y)*n}}o+=i.segmentDistances[e]}return t[t.length-1]}getPowerForFlow(t){let e=0;return t.entities.forEach(t=>{const i=this.hass?.states[t];if(i){const t=parseFloat(i.state);isNaN(t)||(e+=t)}}),e}getEntityPowers(t){return t.entities.map(t=>{const e=this.hass?.states[t];return{entity:t,name:e?.attributes.friendly_name||t.split(".").pop()||t,power:e&&parseFloat(e.state)||0}})}getColorsForPower(t){const e=this.colorThresholds.find(e=>t<=e.max)||this.colorThresholds[this.colorThresholds.length-1];return e}getTextColorForPower(t){const e=this.getColorsForPower(Math.abs(t));return`rgb(${e.color.r}, ${e.color.g}, ${e.color.b})`}disconnectedCallback(){super.disconnectedCallback(),this.animationId&&cancelAnimationFrame(this.animationId)}render(){if(!this.hass||!this.config)return L`<div class="loading">Loading...</div>`;const t=this.config.image||"/local/energy-3d-card/house.webp",e=this.config.show_details??!0;return L`
      <ha-card .header=${this.config.title||""}>
        <div class="card-content">
          <div class="layers-container">
            <img 
              src="${t}" 
              class="layer-img" 
              alt="House" 
              @load=${this.handleImageLoad}
            />
            <canvas class="layer-canvas"></canvas>
  
            ${this.energyFlows.map(t=>{const i=this.getPowerForFlow(t),s=this.getEntityPowers(t),o=this.getTextColorForPower(i);return Math.abs(i)>10?L`
                <div 
                  class="power-value" 
                  style="
                    left: ${t.valuePosition.x}%;
                    top: ${t.valuePosition.y}%;
                    color: ${o};
                    text-shadow: 0 0 10px ${o}66;
                  "
                >
                  <div class="total-power">
                    ${t.name}: ${Math.abs(Math.round(i))} W
                  </div>
                  ${e&&s.length>1?L`
                    <div class="power-details">
                      ${s.map(t=>L`
                        <div class="power-detail-item">
                          ${t.name}: ${Math.abs(Math.round(t.power))} W
                        </div>
                      `)}
                    </div>
                  `:""}
                </div>
              `:""})}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return r`
      :host {
        display: block;
        width: 100%;
      }
  
      ha-card {
        background: var(--ha-card-background, var(--card-background-color, white));
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
  
      .layer-img {
        width: 90%;
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
      }
  
      .layer-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
  
      .power-value {
        position: absolute;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: color 0.3s ease, text-shadow 0.3s ease;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        transform: translate(-50%, -50%);
      }
  
      .total-power {
        font-size: clamp(12px, 2.5vw, 20px);
        font-weight: 700;
        letter-spacing: 0.5px;
        background: rgba(0, 0, 0, 0.5);
        padding: 4px 8px;
        border-radius: 4px;
      }
  
      .power-details {
        margin-top: 4px;
        padding: 4px 8px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        opacity: 0.9;
      }
  
      .power-detail-item {
        font-size: clamp(9px, 1.8vw, 12px);
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
    `}};t([at({attribute:!1})],ct.prototype,"hass",void 0),t([lt()],ct.prototype,"config",void 0),t([lt()],ct.prototype,"energyFlows",void 0),ct=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("energy-3d-card")],ct);export{ct as Energy3dCard};
