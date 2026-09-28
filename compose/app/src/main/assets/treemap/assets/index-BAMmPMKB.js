(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:ee}=Object,m=globalThis,te=m.trustedTypes,ne=te?te.emptyScript:``,re=m.reactiveElementPolyfillSupport,h=(e,t)=>e,g={toAttribute(e,t){switch(t){case Boolean:e=e?ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},_=(e,t)=>!l(e,t),ie={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol(`metadata`),m.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(h(`elementProperties`)))return;let e=ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(h(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(h(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?g:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?g:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??_)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[h(`elementProperties`)]=new Map,v[h(`finalized`)]=new Map,re?.({ReactiveElement:v}),(m.reactiveElementVersions??=[]).push(`2.1.2`);var y=globalThis,b=e=>e,x=y.trustedTypes,ae=x?x.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,S=`$lit$`,C=`lit$${Math.random().toFixed(9).slice(2)}$`,w=`?`+C,oe=`<${w}>`,T=document,E=()=>T.createComment(``),D=e=>e===null||typeof e!=`object`&&typeof e!=`function`,O=Array.isArray,se=e=>O(e)||typeof e?.[Symbol.iterator]==`function`,k=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,le=/>/g,j=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ue=/'/g,de=/"/g,fe=/^(?:script|style|textarea|title)$/i,pe=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),M=pe(1),N=pe(2),P=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),me=new WeakMap,I=T.createTreeWalker(T,129);function L(e,t){if(!O(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ae===void 0?t:ae.createHTML(t)}var he=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=A;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===A?c[1]===`!--`?o=ce:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(fe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=le:o===j?c[0]===`>`?(o=i??A,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?de:ue):o===de||o===ue?o=j:o===ce||o===le?o=A:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===A?n+oe:l>=0?(r.push(s),n.slice(0,l)+S+n.slice(l)+C+d):n+C+(l===-2?t:d)}return[L(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},R=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=he(t,n);if(this.el=e.createElement(l,r),I.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=I.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(S)){let t=u[o++],n=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?_e:r[1]===`?`?ve:r[1]===`@`?ye:V}),i.removeAttribute(e)}else e.startsWith(C)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(fe.test(i.tagName)){let e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=x?x.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],E()),I.nextNode(),c.push({type:2,index:++a});i.append(e[t],E())}}}else if(i.nodeType===8){if(i.data===w)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(C,e+1))!==-1;)c.push({type:7,index:a}),e+=C.length-1}}a++}}static createElement(e,t){let n=T.createElement(`template`);return n.innerHTML=e,n}};function z(e,t,n=e,r){if(t===P)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=D(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=z(e,i._$AS(e,t.values),i,r)),t}var ge=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);I.currentNode=r;let i=I.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new B(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new be(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=I.nextNode(),a++)}return I.currentNode=T,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},B=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),D(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==P&&this._(e):e._$litType$===void 0?e.nodeType===void 0?se(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=R.createElement(L(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ge(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new R(e)),t}k(t){O(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(E()),this.O(E()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=b(e).nextSibling;b(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=z(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=z(this,r[n+o],t,o),s===P&&(s=this._$AH[o]),a||=!D(s)||s!==this._$AH[o],s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},_e=class extends V{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},ve=class extends V{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},ye=class extends V{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=z(this,e,t,0)??F)===P)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},be=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}},xe=y.litHtmlPolyfillSupport;xe?.(R,B),(y.litHtmlVersions??=[]).push(`3.3.3`);var Se=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new B(t.insertBefore(E(),e),e,void 0,n??{})}return i._$AI(e),i},H=globalThis,U=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};U._$litElement$=!0,U.finalized=!0,H.litElementHydrateSupport?.({LitElement:U});var Ce=H.litElementPolyfillSupport;Ce?.({LitElement:U}),(H.litElementVersions??=[]).push(`4.2.2`);var W=1e6,we=/^[!-~]+$/,Te=class extends Error{constructor(e){super(e),this.name=`TreemapError`}};function G(e){return e.children===void 0}function K(e){throw new Te(e)}function Ee(e){(typeof e!=`object`||!e||Array.isArray(e))&&K(`权重树必须是一个对象节点`);let t=new Set,n=0,r=(e,i,a)=>{(typeof e!=`object`||!e||Array.isArray(e))&&K(`${i}：节点必须是对象`);let o=e;a>4&&K(`${i}：树深度（层数）超过 4`),(typeof o.id!=`string`||o.id.length===0)&&K(`${i}：id 不能为空`),o.id.length>32&&K(`${i}：id「${o.id}」超过 32 个字符`),we.test(o.id)||K(`${i}：id「${o.id}」含非法字符，仅允许可打印 ASCII（不含空白）`),t.has(o.id)&&K(`${i}：id「${o.id}」重复，id 必须全局唯一`),t.add(o.id);let s=o.children!==void 0,c=o.weight!==void 0;if(s&&c&&K(`${i}：节点「${o.id}」不能同时携带 children 与 weight`),s){(!Array.isArray(o.children)||o.children.length===0)&&K(`${i}：内部节点「${o.id}」至少包含 1 个子节点`),o.children.forEach((e,t)=>r(e,`${i}.children[${t}]`,a+1));return}c||K(`${i}：叶子「${o.id}」缺少 weight`),(typeof o.weight!=`number`||!Number.isInteger(o.weight))&&K(`${i}：叶子「${o.id}」的权重必须是整数`),(o.weight<1||o.weight>1e6)&&K(`${i}：叶子「${o.id}」的权重须为 1～${W} 的正整数`),n+=1,n>60&&K(`${i}：叶子数量超过 60`)};return r(e,`root`,1),e}function De(e,t){for(let[n,r]of[[`宽度`,e],[`高度`,t]])(typeof r!=`number`||!Number.isInteger(r))&&K(`画布${n}必须是整数像素`),(r<300||r>900)&&K(`画布${n}须在 300～900 像素之间`);return{width:e,height:t}}function Oe(e,t){return e.weight===t.weight?e.id<t.id?-1:+(e.id>t.id):t.weight-e.weight}function ke(e,t,n){let r=e.length,i=Array(r).fill(0);if(r===0||t<=0)return i;let a=e.reduce((e,t)=>e+t,0);if(a<=0)return i;let o=Array(r),s=0;for(let n=0;n<r;n++){let r=e[n]*t,c=Math.floor(r/a);i[n]=c,o[n]=r-c*a,s+=c}let c=t-s,l=e.map((e,t)=>t).sort((e,t)=>o[t]-o[e]||Ae(n[e],n[t]));for(let e=0;e<l.length&&c>0;e++,c--)i[l[e]]+=1;return i}function Ae(e,t){return e<t?-1:+(e>t)}function q(e,t){if(e.length===0||t<=0)return 1/0;let n=0,r=1/0,i=-1/0;for(let t of e)n+=t,t<r&&(r=t),t>i&&(i=t);let a=t*t;return Math.max(a*i/(n*n),n*n/(a*r))}function je(e,t){let n=[],r=[],i=1/0;for(let a=0;a<e.length;a++){if(r.length===0){r=[a],i=q([e[a]],t);continue}let o=q([...r.map(t=>e[t]),e[a]],t);o<=i?(r.push(a),i=o):(n.push(r),r=[a],i=q([e[a]],t))}return r.length>0&&n.push(r),n}function Me(e,t){let n=G(e)?e.weight:e.children.reduce((e,n)=>e+Me(n,t),0);return t.set(e.id,n),n}function Ne(e,t,n){let r=Ee(e),i=De(t,n),a=new Map;Me(r,a);let o=[],s=J(r,{x:0,y:0,w:i.width,h:i.height},[],1,a,o);return{width:i.width,height:i.height,root:s,leaves:o,hidden:o.filter(e=>e.hidden).map(e=>e.id)}}function J(e,t,n,r,i,a){let o=i.get(e.id),s=[...n,e.id];if(G(e)){let n=t.w===0||t.h===0;return a.push({id:e.id,path:s,weight:e.weight,rect:t,hidden:n,depth:r}),{id:e.id,rect:t,weight:o,depth:r,children:[]}}let c=e.children.map(e=>({node:e,id:e.id,weight:i.get(e.id)})).sort(Oe),l=[];if(t.w===0||t.h===0){let n={x:t.x,y:t.y,w:0,h:0};for(let e of c)l.push(J(e.node,n,s,r+1,i,a));return{id:e.id,rect:t,weight:o,depth:r,children:l}}let u=t.w>=t.h,d=u?t.h:t.w,f=u?t.w:t.h,p=je(c.map(e=>e.weight),d),ee=ke(p.map(e=>e.reduce((e,t)=>e+c[t].weight,0)),f,p.map(e=>c[e[0]].node.id)),m=u?t.x:t.y;return p.forEach((e,n)=>{let o=ee[n],f=ke(e.map(e=>c[e].weight),d,e.map(e=>c[e].node.id)),p=u?t.y:t.x;e.forEach((e,t)=>{let n=c[e],d=u?{x:m,y:p,w:o,h:f[t]}:{x:p,y:m,w:f[t],h:o};l.push(J(n.node,d,s,r+1,i,a)),p+=f[t]}),m+=o}),{id:e.id,rect:t,weight:o,depth:r,children:l}}var Y=[{name:`示例·均衡分组`,tree:{id:`root`,children:[{id:`alpha`,children:[{id:`a1`,weight:8},{id:`a2`,weight:5},{id:`a3`,weight:3},{id:`a4`,weight:2}]},{id:`beta`,children:[{id:`b1`,weight:6},{id:`b2`,weight:6},{id:`b3`,weight:4}]},{id:`gamma`,children:[{id:`g1`,weight:10},{id:`g2`,weight:1},{id:`g3`,weight:1}]}]}},{name:`示例·权重倾斜`,tree:{id:`root`,children:[{id:`big`,weight:500},{id:`mid`,children:[{id:`m1`,weight:30},{id:`m2`,weight:12}]},{id:`s1`,weight:1},{id:`s2`,weight:1},{id:`s3`,weight:1},{id:`s4`,weight:1},{id:`s5`,weight:1},{id:`s6`,weight:1}]}},{name:`示例·四层嵌套`,tree:{id:`root`,children:[{id:`core`,children:[{id:`c1`,children:[{id:`x`,weight:4},{id:`y`,weight:4}]},{id:`c2`,children:[{id:`z`,weight:8},{id:`w`,weight:2}]}]},{id:`misc`,children:[{id:`m1`,weight:2},{id:`m2`,weight:3}]},{id:`tail`,weight:5}]}},{name:`示例·并列权重`,tree:{id:`root`,children:[{id:`p`,children:[{id:`p1`,weight:5},{id:`p2`,weight:5}]},{id:`q`,children:[{id:`q1`,weight:10}]},{id:`r1`,weight:5},{id:`r2`,weight:5},{id:`r3`,weight:5},{id:`r4`,weight:5}]}}];function Pe(e,t,n){return G(e)?e.id===t?{...e,weight:n}:e:{...e,children:e.children.map(e=>Pe(e,t,n))}}function Fe(e){return G(e)?1:e.children.reduce((e,t)=>e+Fe(t),0)}function Ie(e){return G(e)?1:1+Math.max(...e.children.map(Ie))}function Le(e){return JSON.parse(JSON.stringify(e))}function X(e){"@babel/helpers - typeof";return X=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},X(e)}function Re(e,t){if(X(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(X(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function ze(e){var t=Re(e,`string`);return X(t)==`symbol`?t:t+``}function Z(e,t,n){return(t=ze(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Q=e=>Math.min(900,Math.max(300,Math.round(e))),$=class extends U{constructor(){super(),Z(this,`_resizeObserver`,void 0),this._preset=0,this._tree=Le(Y[0].tree),this._canvasW=640,this._canvasH=480,this._autoFit=!1,this._hover=null,this._tipX=0,this._tipY=0,this._jsonText=JSON.stringify(this._tree,null,2),this._errors=[]}firstUpdated(){if(typeof ResizeObserver<`u`){this._resizeObserver=new ResizeObserver(()=>this._fitToContainer());let e=this.renderRoot.querySelector(`.stage`);e&&this._resizeObserver.observe(e)}}disconnectedCallback(){this._resizeObserver?.disconnect(),super.disconnectedCallback()}_fitToContainer(){if(!this._autoFit)return;let e=this.renderRoot.querySelector(`.stage`);if(!e)return;let t=Q(e.clientWidth-4||300),n=Q(Math.round((e.clientWidth-4||300)*.66));(t!==this._canvasW||n!==this._canvasH)&&(this._canvasW=t,this._canvasH=n)}_onWeightInput(e,t){let n=t.target.value,r=Number(n);if(!Number.isInteger(r)||r<1||r>1e6){this._errors=[`叶子「${e}」的权重须为 1～${W} 的整数`];return}this._errors=[],this._tree=Pe(this._tree,e,r)}_onCanvasInput(e,t){let n=Number(t.target.value);if(!Number.isFinite(n))return;let r=Q(n);e===`w`?this._canvasW=r:this._canvasH=r}_onAutoFit(e){this._autoFit=e.target.checked,this._autoFit&&this._fitToContainer()}_onPreset(e){let t=Number(e.target.value);this._preset=t,this._tree=Le(Y[t].tree),this._jsonText=JSON.stringify(this._tree,null,2),this._errors=[]}_applyJson(){try{let e=JSON.parse(this._jsonText);this._tree=Ee(e),this._errors=[]}catch(e){this._errors=[e instanceof Te||e instanceof SyntaxError?e.message:String(e)]}}_dumpJson(){this._jsonText=JSON.stringify(this._tree,null,2)}_showTip(e,t){let n=this.renderRoot.querySelector(`.canvas-wrap`)?.getBoundingClientRect();this._hover=e,this._tipX=t.clientX-(n?.left??0)+12,this._tipY=t.clientY-(n?.top??0)+12}_hideTip(){this._hover=null}render(){let e;try{e=Ne(this._tree,this._canvasW,this._canvasH)}catch(e){return M`<main>
        <div class="card"><h2>布局失败</h2>
        <div class="errors" style="display:block">${String(e)}</div></div>
      </main>`}let t=e.leaves.reduce((e,t)=>e+t.rect.w*t.rect.h,0),n=t===e.width*e.height;return M`
      <header>
        <h1>离线权重树图编辑器</h1>
        <p>整数像素 squarify：行厚与行内跨度按最大余数法分配，兄弟矩形恰好覆盖父矩形，零面积项列入隐藏清单。</p>
      </header>
      <main>
        <aside>
          <div class="card">
            <h2>权重树</h2>
            <label class="row">
              示例
              <select @change=${this._onPreset}>
                ${Y.map((e,t)=>M`<option value=${t} ?selected=${t===this._preset}>${e.name}</option>`)}
              </select>
            </label>
            <div class="tree-editor">${this._renderEditorNode(e.root,e)}</div>
          </div>
          <div class="card">
            <h2>画布（${300}～${900} px）</h2>
            <label class="row">
              宽
              <input
                id="canvas-w"
                type="number"
                min=${300}
                max=${900}
                step="1"
                .value=${String(this._canvasW)}
                ?disabled=${this._autoFit}
                @input=${e=>this._onCanvasInput(`w`,e)}
              />
              高
              <input
                id="canvas-h"
                type="number"
                min=${300}
                max=${900}
                step="1"
                .value=${String(this._canvasH)}
                ?disabled=${this._autoFit}
                @input=${e=>this._onCanvasInput(`h`,e)}
              />
            </label>
            <label class="row">
              <input type="checkbox" .checked=${this._autoFit} @change=${this._onAutoFit} />
              适应窗口（窗口尺寸变化时自动重算）
            </label>
          </div>
          <div class="card">
            <h2>导入 / 导出 JSON</h2>
            <textarea
              id="json-input"
              .value=${this._jsonText}
              @input=${e=>{this._jsonText=e.target.value}}
            ></textarea>
            <div class="btn-row">
              <button id="apply-json" @click=${this._applyJson}>应用 JSON</button>
              <button id="dump-json" @click=${this._dumpJson}>从当前树生成 JSON</button>
            </div>
            ${this._errors.length>0?M`<div class="errors">${this._errors.join(`
`)}</div>`:F}
          </div>
        </aside>
        <section class="stage">
          <div class="canvas-wrap">
            ${this._renderSvg(e)} ${this._renderTooltip()}
          </div>
          <div class="statusbar">
            ${this._hover?M`祖先路径：<span class="path">${this._hover.path.join(` / `)}</span>
                  ｜权重 ${this._hover.weight}｜矩形 ${this._hover.rect.w}×${this._hover.rect.h}
                  = ${this._hover.rect.w*this._hover.rect.h} px²`:M`悬浮叶矩形查看祖先路径。`}
          </div>
          ${e.hidden.length>0?M`<div class="hidden-list">
                隐藏项（零面积，共 ${e.hidden.length} 个）：${e.hidden.join(`、`)}
              </div>`:F}
          <div class="stats">
            画布 ${e.width}×${e.height} = ${e.width*e.height} px² ｜ 叶子
            ${Fe(this._tree)}（可见 ${e.leaves.length-e.hidden.length}）｜ 深度
            ${Ie(this._tree)} 层 ｜ 可见叶面积和 ${t} px²
            <span class="ok">${n?`✓ 面积守恒`:`✗ 不守恒`}</span>
          </div>
        </section>
      </main>
    `}_renderEditorNode(e,t){if(e.children.length===0){let n=t.leaves.find(t=>t.id===e.id),r=n?.hidden??!1;return M`
        <div class="leaf-row ${r?`hidden-leaf`:``}">
          <span class="id">${e.id}</span>
          <input
            type="number"
            data-leaf=${e.id}
            min="1"
            max=${W}
            step="1"
            .value=${String(n?.weight??1)}
            @input=${t=>this._onWeightInput(e.id,t)}
          />
          <span class="px">${e.rect.w}×${e.rect.h}${r?`（隐藏）`:``}</span>
        </div>
      `}return M`
      <div class="grp-row" style="padding-left:${(e.depth-1)*10}px">
        ${e.id} <span class="w">子树权重 ${e.weight}</span>
      </div>
      <div style="padding-left:10px">
        ${e.children.map(e=>this._renderEditorNode(e,t))}
      </div>
    `}_renderSvg(e){let t=[],n=e=>{e.children.length>0&&(t.push(e),e.children.forEach(n))};n(e.root),t.sort((e,t)=>e.depth-t.depth);let r=Math.max(e.root.children.length,1),i=t=>{let n=t.path.length>1?t.path[1]:t.id,i=Math.max(0,e.root.children.findIndex(e=>e.id===n)),a=0;for(let e of t.id)a=a*31+e.charCodeAt(0)>>>0;return`hsl(${Math.round(i*360/r+a%24-12+360)%360} 62% ${40+a%22}%)`},a=[`#4a5568`,`#5b6b82`,`#7186a3`,`#8aa2c4`];return M`
      <svg
        width=${e.width}
        height=${e.height}
        viewBox="0 0 ${e.width} ${e.height}"
        role="img"
        aria-label="权重树图"
      >
        ${e.leaves.filter(e=>!e.hidden).map(e=>N`
            <rect
              class="leaf"
              data-id=${e.id}
              x=${e.rect.x}
              y=${e.rect.y}
              width=${e.rect.w}
              height=${e.rect.h}
              fill=${i(e)}
              @mouseover=${t=>this._showTip(e,t)}
              @mousemove=${t=>this._showTip(e,t)}
              @mouseleave=${this._hideTip}
            ></rect>
            ${e.rect.w>=26&&e.rect.h>=13?N`<text
                    class="leaf-label"
                    x=${e.rect.x+3}
                    y=${e.rect.y+12}
                  >${e.id}</text>`:F}
            ${e.rect.w>=40&&e.rect.h>=27?N`<text
                    class="leaf-label"
                    x=${e.rect.x+3}
                    y=${e.rect.y+25}
                    opacity="0.75"
                  >${e.weight}</text>`:F}`)}
        ${t.map(e=>N`
          <rect
            class="grp"
            data-grp=${e.id}
            x=${e.rect.x+.5}
            y=${e.rect.y+.5}
            width=${Math.max(e.rect.w-1,0)}
            height=${Math.max(e.rect.h-1,0)}
            stroke=${a[Math.min(e.depth-1,a.length-1)]}
            stroke-width=${Math.max(3-e.depth,1)}
          ></rect>
          ${e.depth>1&&e.rect.w>=44&&e.rect.h>=15?N`<text class="grp-label" x=${e.rect.x+3} y=${e.rect.y+11}>${e.id}</text>`:F}`)}
      </svg>
    `}_renderTooltip(){let e=this._hover;return e?M`
      <div class="tooltip" style="left:${this._tipX}px; top:${this._tipY}px">
        <div class="tip-path">${e.path.join(` / `)}</div>
        <div>权重 ${e.weight} ｜ ${e.rect.w}×${e.rect.h} = ${e.rect.w*e.rect.h} px²</div>
      </div>
    `:F}};Z($,`properties`,{_tree:{state:!0},_canvasW:{state:!0},_canvasH:{state:!0},_autoFit:{state:!0},_hover:{state:!0},_tipX:{state:!0},_tipY:{state:!0},_jsonText:{state:!0},_errors:{state:!0},_preset:{state:!0}}),Z($,`styles`,o`
    :host {
      display: block;
      font-family: system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif;
      background: #14171c;
      color: #dfe4ea;
      min-height: 100vh;
    }
    header {
      padding: 12px 20px;
      border-bottom: 1px solid #2a2f38;
    }
    header h1 {
      margin: 0;
      font-size: 17px;
      font-weight: 600;
    }
    header p {
      margin: 4px 0 0;
      font-size: 12px;
      color: #8b94a1;
    }
    main {
      display: flex;
      gap: 18px;
      padding: 16px 20px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    aside {
      width: 330px;
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .card {
      background: #1b1f26;
      border: 1px solid #2a2f38;
      border-radius: 8px;
      padding: 12px;
    }
    .card h2 {
      margin: 0 0 8px;
      font-size: 13px;
      color: #9fb2c8;
      font-weight: 600;
    }
    .stage {
      flex: 1;
      min-width: 340px;
    }
    .canvas-wrap {
      position: relative;
      display: inline-block;
      max-width: 100%;
      line-height: 0;
    }
    svg {
      background: #0d1015;
      border: 1px solid #2a2f38;
      border-radius: 4px;
      max-width: 100%;
      height: auto;
    }
    .leaf {
      cursor: pointer;
      stroke: rgba(0, 0, 0, 0.45);
      stroke-width: 1;
    }
    .leaf:hover {
      filter: brightness(1.25);
      stroke: #ffffff;
      stroke-width: 1.5;
    }
    .leaf-label {
      font-size: 11px;
      fill: #fff;
      pointer-events: none;
      paint-order: stroke;
      stroke: rgba(0, 0, 0, 0.55);
      stroke-width: 2px;
    }
    .grp {
      fill: none;
      pointer-events: none;
      shape-rendering: crispEdges;
    }
    .grp-label {
      font-size: 10px;
      fill: rgba(255, 255, 255, 0.75);
      pointer-events: none;
      paint-order: stroke;
      stroke: rgba(0, 0, 0, 0.6);
      stroke-width: 2px;
    }
    .tooltip {
      position: absolute;
      z-index: 10;
      pointer-events: none;
      background: rgba(12, 14, 18, 0.94);
      border: 1px solid #3d4654;
      border-radius: 6px;
      padding: 6px 9px;
      font-size: 12px;
      line-height: 1.5;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
    }
    .tooltip .tip-path {
      color: #7fd0ff;
      font-weight: 600;
    }
    .statusbar {
      margin-top: 8px;
      font-size: 12px;
      color: #9fb2c8;
      min-height: 18px;
      line-height: 1.5;
    }
    .statusbar .path {
      color: #7fd0ff;
    }
    .hidden-list {
      margin-top: 6px;
      font-size: 12px;
      color: #e8b45a;
      line-height: 1.5;
    }
    .stats {
      margin-top: 6px;
      font-size: 12px;
      color: #8b94a1;
      line-height: 1.6;
    }
    .stats .ok {
      color: #6fd08c;
    }
    label.row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      margin: 4px 0;
    }
    input[type='number'] {
      width: 72px;
      background: #10141a;
      color: #dfe4ea;
      border: 1px solid #3d4654;
      border-radius: 4px;
      padding: 3px 6px;
      font-size: 12px;
    }
    input[type='number']:disabled {
      opacity: 0.45;
    }
    select,
    button {
      background: #232a34;
      color: #dfe4ea;
      border: 1px solid #3d4654;
      border-radius: 4px;
      padding: 4px 10px;
      font-size: 12px;
      cursor: pointer;
    }
    button:hover {
      background: #2c3542;
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
      height: 150px;
      background: #10141a;
      color: #cfe3cf;
      border: 1px solid #3d4654;
      border-radius: 4px;
      font-family: ui-monospace, Consolas, monospace;
      font-size: 11px;
      padding: 6px;
      resize: vertical;
    }
    .btn-row {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .errors {
      margin-top: 8px;
      color: #ff8a8a;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    .tree-editor {
      max-height: 300px;
      overflow: auto;
      font-size: 12px;
    }
    .grp-row {
      color: #9fb2c8;
      margin: 6px 0 2px;
      font-weight: 600;
    }
    .grp-row .w {
      color: #6b7482;
      font-weight: 400;
    }
    .leaf-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 2px 0;
    }
    .leaf-row .id {
      color: #cfe3cf;
      min-width: 56px;
      font-family: ui-monospace, Consolas, monospace;
    }
    .leaf-row .px {
      color: #6b7482;
    }
    .leaf-row.hidden-leaf .id {
      color: #e8b45a;
    }
  `),customElements.define(`treemap-app`,$);