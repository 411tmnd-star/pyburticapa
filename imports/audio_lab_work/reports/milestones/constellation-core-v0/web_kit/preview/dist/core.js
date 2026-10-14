"use strict";(()=>{var XT=Object.create;var L_=Object.defineProperty;var WT=Object.getOwnPropertyDescriptor;var qT=Object.getOwnPropertyNames;var YT=Object.getPrototypeOf,ZT=Object.prototype.hasOwnProperty;var ts=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var JT=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of qT(t))!ZT.call(e,s)&&s!==n&&L_(e,s,{get:()=>t[s],enumerable:!(i=WT(t,s))||i.enumerable});return e};var Ln=(e,t,n)=>(n=e!=null?XT(YT(e)):{},JT(t||!e||!e.__esModule?L_(n,"default",{value:e,enumerable:!0}):n,e));var q_=ts(Lt=>{"use strict";var Pp=Symbol.for("react.transitional.element"),KT=Symbol.for("react.portal"),QT=Symbol.for("react.fragment"),jT=Symbol.for("react.strict_mode"),$T=Symbol.for("react.profiler"),tA=Symbol.for("react.consumer"),eA=Symbol.for("react.context"),nA=Symbol.for("react.forward_ref"),iA=Symbol.for("react.suspense"),sA=Symbol.for("react.memo"),F_=Symbol.for("react.lazy"),aA=Symbol.for("react.activity"),rA=Symbol.for("react.view_transition"),O_=Symbol.iterator;function oA(e){return e===null||typeof e!="object"?null:(e=O_&&e[O_]||e["@@iterator"],typeof e=="function"?e:null)}var z_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},H_=Object.assign,V_={};function kr(e,t,n){this.props=e,this.context=t,this.refs=V_,this.updater=n||z_}kr.prototype.isReactComponent={};kr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};kr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function G_(){}G_.prototype=kr.prototype;function Bp(e,t,n){this.props=e,this.context=t,this.refs=V_,this.updater=n||z_}var Fp=Bp.prototype=new G_;Fp.constructor=Bp;H_(Fp,kr.prototype);Fp.isPureReactComponent=!0;var I_=Array.isArray;function Ip(){}var Me={H:null,A:null,T:null,S:null},k_=Object.prototype.hasOwnProperty;function zp(e,t,n){var i=n.ref;return{$$typeof:Pp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function lA(e,t){return zp(e.type,t,e.props)}function Hp(e){return typeof e=="object"&&e!==null&&e.$$typeof===Pp}function cA(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var P_=/\/+/g;function Op(e,t){return typeof e=="object"&&e!==null&&e.key!=null?cA(""+e.key):t.toString(36)}function uA(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Ip,Ip):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Gr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Pp:case KT:r=!0;break;case F_:return r=e._init,Gr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Op(e,0):i,I_(s)?(n="",r!=null&&(n=r.replace(P_,"$&/")+"/"),Gr(s,t,n,"",function(c){return c})):s!=null&&(Hp(s)&&(s=lA(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(P_,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(I_(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Op(i,l),r+=Gr(i,t,n,a,s);else if(l=oA(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Op(i,l++),r+=Gr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return Gr(uA(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Mu(e,t,n){if(e==null)return e;var i=[],s=0;return Gr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function hA(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var B_=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function X_(e){var t=Me.T,n={};n.types=t!==null?t.types:null,Me.T=n;try{var i=e(),s=Me.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Ip,B_)}catch(a){B_(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),Me.T=t}}function W_(e){var t=Me.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else X_(W_.bind(null,e))}var fA={map:Mu,forEach:function(e,t,n){Mu(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Mu(e,function(){t++}),t},toArray:function(e){return Mu(e,function(t){return t})||[]},only:function(e){if(!Hp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Lt.Activity=aA;Lt.Children=fA;Lt.Component=kr;Lt.Fragment=QT;Lt.Profiler=$T;Lt.PureComponent=Bp;Lt.StrictMode=jT;Lt.Suspense=iA;Lt.ViewTransition=rA;Lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Me;Lt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Me.H.useMemoCache(e)}};Lt.addTransitionType=W_;Lt.cache=function(e){return function(){return e.apply(null,arguments)}};Lt.cacheSignal=function(){return null};Lt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=H_({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!k_.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return zp(e.type,s,i)};Lt.createContext=function(e){return e={$$typeof:eA,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:tA,_context:e},e};Lt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)k_.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return zp(e,a,s)};Lt.createRef=function(){return{current:null}};Lt.forwardRef=function(e){return{$$typeof:nA,render:e}};Lt.isValidElement=Hp;Lt.lazy=function(e){return{$$typeof:F_,_payload:{_status:-1,_result:e},_init:hA}};Lt.memo=function(e,t){return{$$typeof:sA,type:e,compare:t===void 0?null:t}};Lt.startTransition=X_;Lt.unstable_useCacheRefresh=function(){return Me.H.useCacheRefresh()};Lt.use=function(e){return Me.H.use(e)};Lt.useActionState=function(e,t,n){return Me.H.useActionState(e,t,n)};Lt.useCallback=function(e,t){return Me.H.useCallback(e,t)};Lt.useContext=function(e){return Me.H.useContext(e)};Lt.useDebugValue=function(){};Lt.useDeferredValue=function(e,t){return Me.H.useDeferredValue(e,t)};Lt.useEffect=function(e,t){return Me.H.useEffect(e,t)};Lt.useEffectEvent=function(e){return Me.H.useEffectEvent(e)};Lt.useId=function(){return Me.H.useId()};Lt.useImperativeHandle=function(e,t,n){return Me.H.useImperativeHandle(e,t,n)};Lt.useInsertionEffect=function(e,t){return Me.H.useInsertionEffect(e,t)};Lt.useLayoutEffect=function(e,t){return Me.H.useLayoutEffect(e,t)};Lt.useMemo=function(e,t){return Me.H.useMemo(e,t)};Lt.useOptimistic=function(e,t){return Me.H.useOptimistic(e,t)};Lt.useReducer=function(e,t,n){return Me.H.useReducer(e,t,n)};Lt.useRef=function(e){return Me.H.useRef(e)};Lt.useState=function(e){return Me.H.useState(e)};Lt.useSyncExternalStore=function(e,t,n){return Me.H.useSyncExternalStore(e,t,n)};Lt.useTransition=function(){return Me.H.useTransition()};Lt.version="19.3.0"});var tr=ts((UL,Y_)=>{"use strict";Y_.exports=q_()});var iy=ts(Ne=>{"use strict";function Xp(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<Eu(s,t))e[i]=t,e[n]=s,n=i;else break t}}function es(e){return e.length===0?null:e[0]}function Au(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>Eu(o,n))l<s&&0>Eu(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>Eu(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function Eu(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ne.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Z_=performance,Ne.unstable_now=function(){return Z_.now()}):(Vp=Date,J_=Vp.now(),Ne.unstable_now=function(){return Vp.now()-J_});var Z_,Vp,J_,ws=[],ea=[],dA=1,xi=null,Mn=3,Wp=!1,Al=!1,wl=!1,qp=!1,j_=typeof setTimeout=="function"?setTimeout:null,$_=typeof clearTimeout=="function"?clearTimeout:null,K_=typeof setImmediate<"u"?setImmediate:null;function Tu(e){for(var t=es(ea);t!==null;){if(t.callback===null)Au(ea);else if(t.startTime<=e)Au(ea),t.sortIndex=t.expirationTime,Xp(ws,t);else break;t=es(ea)}}function Yp(e){if(wl=!1,Tu(e),!Al)if(es(ws)!==null)Al=!0,Wr||(Wr=!0,Xr());else{var t=es(ea);t!==null&&Zp(Yp,t.startTime-e)}}var Wr=!1,Cl=-1,ty=5,ey=-1;function ny(){return qp?!0:!(Ne.unstable_now()-ey<ty)}function Gp(){if(qp=!1,Wr){var e=Ne.unstable_now();ey=e;var t=!0;try{t:{Al=!1,wl&&(wl=!1,$_(Cl),Cl=-1),Wp=!0;var n=Mn;try{e:{for(Tu(e),xi=es(ws);xi!==null&&!(xi.expirationTime>e&&ny());){var i=xi.callback;if(typeof i=="function"){xi.callback=null,Mn=xi.priorityLevel;var s=i(xi.expirationTime<=e);if(e=Ne.unstable_now(),typeof s=="function"){xi.callback=s,Tu(e),t=!0;break e}xi===es(ws)&&Au(ws),Tu(e)}else Au(ws);xi=es(ws)}if(xi!==null)t=!0;else{var a=es(ea);a!==null&&Zp(Yp,a.startTime-e),t=!1}}break t}finally{xi=null,Mn=n,Wp=!1}t=void 0}}finally{t?Xr():Wr=!1}}}var Xr;typeof K_=="function"?Xr=function(){K_(Gp)}:typeof MessageChannel<"u"?(kp=new MessageChannel,Q_=kp.port2,kp.port1.onmessage=Gp,Xr=function(){Q_.postMessage(null)}):Xr=function(){j_(Gp,0)};var kp,Q_;function Zp(e,t){Cl=j_(function(){e(Ne.unstable_now())},t)}Ne.unstable_IdlePriority=5;Ne.unstable_ImmediatePriority=1;Ne.unstable_LowPriority=4;Ne.unstable_NormalPriority=3;Ne.unstable_Profiling=null;Ne.unstable_UserBlockingPriority=2;Ne.unstable_cancelCallback=function(e){e.callback=null};Ne.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ty=0<e?Math.floor(1e3/e):5};Ne.unstable_getCurrentPriorityLevel=function(){return Mn};Ne.unstable_next=function(e){switch(Mn){case 1:case 2:case 3:var t=3;break;default:t=Mn}var n=Mn;Mn=t;try{return e()}finally{Mn=n}};Ne.unstable_requestPaint=function(){qp=!0};Ne.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Mn;Mn=e;try{return t()}finally{Mn=n}};Ne.unstable_scheduleCallback=function(e,t,n){var i=Ne.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:dA++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,Xp(ea,e),es(ws)===null&&e===es(ea)&&(wl?($_(Cl),Cl=-1):wl=!0,Zp(Yp,n-i))):(e.sortIndex=s,Xp(ws,e),Al||Wp||(Al=!0,Wr||(Wr=!0,Xr()))),e};Ne.unstable_shouldYield=ny;Ne.unstable_wrapCallback=function(e){var t=Mn;return function(){var n=Mn;Mn=t;try{return e.apply(this,arguments)}finally{Mn=n}}}});var ay=ts((OL,sy)=>{"use strict";sy.exports=iy()});var ly=ts(En=>{"use strict";var pA=tr();function oy(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function na(){}var On={d:{f:na,r:function(){throw Error(oy(522))},D:na,C:na,L:na,m:na,X:na,S:na,M:na},p:0,findDOMNode:null},mA=Symbol.for("react.portal"),gA=Symbol.for("react.recoverable"),ry=Symbol.for("react.optimistic_key");function vA(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:mA,key:i==null?null:i===ry?ry:""+i,children:e,containerInfo:t,implementation:n}}var Rl=pA.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function wu(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}En.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=On;En.browser=function(e){return{$$typeof:gA,_reason:e}};En.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(oy(299));return vA(e,t,null,n)};En.flushSync=function(e){var t=Rl.T,n=On.p;try{if(Rl.T=null,On.p=2,e)return e()}finally{Rl.T=t,On.p=n,On.d.f()}};En.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,On.d.C(e,t))};En.prefetchDNS=function(e){typeof e=="string"&&On.d.D(e)};En.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=wu(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?On.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&On.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};En.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=wu(t.as,t.crossOrigin);On.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&On.d.M(e)};En.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=wu(n,t.crossOrigin);On.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};En.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=wu(t.as,t.crossOrigin);On.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else On.d.m(e)};En.requestFormReset=function(e){On.d.r(e)};En.unstable_batchedUpdates=function(e,t){return e(t)};En.useFormState=function(e,t,n){return Rl.H.useFormState(e,t,n)};En.useFormStatus=function(){return Rl.H.useHostTransitionStatus()};En.version="19.3.0"});var hy=ts((PL,uy)=>{"use strict";function cy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cy)}catch(e){console.error(e)}}cy(),uy.exports=ly()});var QM=ts(cf=>{"use strict";var Qe=ay(),Kx=tr(),_A=hy();function j(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Qx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function gc(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function jx(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function $x(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function fy(e){if(gc(e)!==e)throw Error(j(188))}function yA(e){var t=e.alternate;if(!t){if(t=gc(e),t===null)throw Error(j(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return fy(s),e;if(a===i)return fy(s),t;a=a.sibling}throw Error(j(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(j(189))}}if(n.alternate!==i)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?e:t}function tS(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=tS(e),t!==null)return t;e=e.sibling}return null}function Yn(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&Yn(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function Sr(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function dy(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function eS(e){var t=[null,null],n=Sr(e);return n===null||nS(t,e,n.child,{foundSelf:!1}),t}function nS(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&nS(e,t,n.child,i))return!0;n=n.sibling}return!1}function Ke(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(j(559))}}var jr=null,Am=null;function xA(e,t,n){return e===n?!0:e===t?(jr=e,!0):!1}function SA(e,t,n){return e===n?(Am=e,!1):e===t?(Am!==null&&(jr=e),!0):!1}function py(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function wm(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var ye=Object.assign,bA=Symbol.for("react.element"),Cu=Symbol.for("react.transitional.element"),Pl=Symbol.for("react.portal"),$r=Symbol.for("react.fragment"),iS=Symbol.for("react.strict_mode"),Cm=Symbol.for("react.profiler"),sS=Symbol.for("react.consumer"),os=Symbol.for("react.context"),Bg=Symbol.for("react.forward_ref"),Rm=Symbol.for("react.suspense"),Nm=Symbol.for("react.suspense_list"),Fg=Symbol.for("react.memo"),ra=Symbol.for("react.lazy"),Dm=Symbol.for("react.activity"),MA=Symbol.for("react.legacy_hidden"),EA=Symbol.for("react.memo_cache_sentinel"),Um=Symbol.for("react.view_transition"),TA=Symbol.for("react.recoverable"),my=Symbol.iterator;function Nl(e){return e===null||typeof e!="object"?null:(e=my&&e[my]||e["@@iterator"],typeof e=="function"?e:null)}var AA=Symbol.for("react.client.reference");function Lm(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===AA?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case $r:return"Fragment";case Cm:return"Profiler";case iS:return"StrictMode";case Rm:return"Suspense";case Nm:return"SuspenseList";case Dm:return"Activity";case Um:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Pl:return"Portal";case os:return e.displayName||"Context";case sS:return(e._context.displayName||"Context")+".Consumer";case Bg:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Fg:return t=e.displayName||null,t!==null?t:Lm(e.type)||"Memo";case ra:t=e._payload,e=e._init;try{return Lm(e(t))}catch{}}return null}var Bl=Array.isArray,Nt=Kx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ie=_A.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lr={pending:!1,data:null,method:null,action:null},Om=[],to=-1;function ps(e){return{current:e}}function gn(e){0>to||(e.current=Om[to],Om[to]=null,to--)}function Ae(e,t){to++,Om[to]=e.current,e.current=t}var hs=ps(null),tc=ps(null),ma=ps(null),ph=ps(null);function mh(e,t){switch(Ae(ma,t),Ae(tc,e),Ae(hs,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Rx(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Rx(t),e=AM(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}gn(hs),Ae(hs,e)}function So(){gn(hs),gn(tc),gn(ma)}function Im(e){var t=e.memoizedState;t!==null&&(Do._currentValue=t.memoizedState,Ae(ph,e)),t=hs.current;var n=AM(t,e.type);t!==n&&(Ae(tc,e),Ae(hs,n))}function gh(e){tc.current===e&&(gn(hs),gn(tc)),ph.current===e&&(gn(ph),Do._currentValue=lr)}var Jp,gy;function sa(e){if(Jp===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Jp=t&&t[1]||"",gy=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Jp+e+gy}var Kp=!1;function Qp(e,t){if(!e||Kp)return"";Kp=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(g){var u=g}Reflect.construct(e,[],p)}else{try{p.call()}catch(g){u=g}p=!1;try{var d=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),p=!0,new e}finally{p&&(d!==void 0?Object.defineProperty(e.prototype,"props",d):delete e.prototype.props)}}}else{try{throw Error()}catch(g){u=g}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(g){if(g&&u&&typeof g.stack=="string")return[g.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var f=`
`+l[i].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=i&&0<=s);break}}}finally{Kp=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?sa(n):""}function wA(e,t){switch(e.tag){case 26:case 27:case 5:return sa(e.type);case 16:return sa("Lazy");case 13:return e.child!==t&&t!==null?sa("Suspense Fallback"):sa("Suspense");case 19:return sa("SuspenseList");case 0:case 15:return Qp(e.type,!1);case 11:return Qp(e.type.render,!1);case 1:return Qp(e.type,!0);case 31:return sa("Activity");case 30:return sa("ViewTransition");default:return""}}function vy(e){try{var t="",n=null;do t+=wA(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Pm=Object.prototype.hasOwnProperty,zg=Qe.unstable_scheduleCallback,jp=Qe.unstable_cancelCallback,CA=Qe.unstable_shouldYield,RA=Qe.unstable_requestPaint,oi=Qe.unstable_now,NA=Qe.unstable_getCurrentPriorityLevel,aS=Qe.unstable_ImmediatePriority,rS=Qe.unstable_UserBlockingPriority,vh=Qe.unstable_NormalPriority,DA=Qe.unstable_LowPriority,oS=Qe.unstable_IdlePriority,UA=Qe.log,LA=Qe.unstable_setDisableYieldValue,vc=null,li=null;function ca(e){if(typeof UA=="function"&&LA(e),li&&typeof li.setStrictMode=="function")try{li.setStrictMode(vc,e)}catch{}}var ci=Math.clz32?Math.clz32:PA,OA=Math.log,IA=Math.LN2;function PA(e){return e>>>=0,e===0?32:31-(OA(e)/IA|0)|0}var Ru=256,Nu=262144,Du=4194304;function ir(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function kh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=ir(i):(r&=o,r!==0?s=ir(r):n||(n=o&~e,n!==0&&(s=ir(n))))):(o=i&~a,o!==0?s=ir(o):r!==0?s=ir(r):n||(n=i&~e,n!==0&&(s=ir(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function _c(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lS(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-ci(n),s=1<<i;t|=e[i],n&=~s}return t}function BA(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cS(){var e=Du;return Du<<=1,(Du&62914560)===0&&(Du=4194304),e}function $p(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yc(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function FA(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var f=31-ci(n),p=1<<f;o[f]=0,l[f]=-1;var u=c[f];if(u!==null)for(c[f]=null,f=0;f<u.length;f++){var d=u[f];d!==null&&(d.lane&=-536870913)}n&=~p}i!==0&&uS(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function uS(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-ci(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function hS(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-ci(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function fS(e,t){var n=t&-t;return n=(n&42)!==0?1:Hg(n),(n&(e.suspendedLanes|t))!==0?0:n}function Hg(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Vg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function dS(){var e=ie.p;return e!==0?e:(e=window.event,e===void 0?32:ZM(e.type))}function _y(e,t){var n=ie.p;try{return ie.p=e,t()}finally{ie.p=n}}var Hs=Math.random().toString(36).slice(2),pn="__reactFiber$"+Hs,Zn="__reactProps$"+Hs,Oo="__reactContainer$"+Hs,yy="__reactEvents$"+Hs,zA="__reactListeners$"+Hs,HA="__reactHandles$"+Hs,xy="__reactResources$"+Hs,xc="__reactMarker$"+Hs,_h="__reactLoad$"+Hs;function Xh(e){delete e[pn],delete e[Zn],delete e[zA],delete e[HA]}function rr(e){var t;if(t=e[pn])return t;for(var n=e.parentNode;n;){if(t=n[Oo]||n[pn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Bx(e);e!==null;){if(n=e[pn])return n;e=Bx(e)}return t}e=n,n=e.parentNode}return null}function Io(e){if(e=e[pn]||e[Oo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Fl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(j(33))}function uo(e){var t=e[xy];return t||(t=e[xy]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function rn(e){e[xc]=!0}function pS(e){e[_h]=void 0}var mS=new Set,gS={};function br(e,t){bo(e,t),bo(e+"Capture",t)}function bo(e,t){for(gS[e]=t,e=0;e<t.length;e++)mS.add(t[e])}var VA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Sy={},by={};function GA(e){return Pm.call(by,e)?!0:Pm.call(Sy,e)?!1:VA.test(e)?by[e]=!0:(Sy[e]=!0,!1)}var ee=!1;function My(){var e=ee;return ee=!1,e}function Ju(e,t,n){if(GA(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function Uu(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function Cs(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function ii(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function vS(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function kA(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Bm(e){if(!e._valueTracker){var t=vS(e)?"checked":"value";e._valueTracker=kA(e,t,""+e[t])}}function _S(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=vS(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var XA=/[\n"\\]/g;function Ti(e){return e.replace(XA,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Fm(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ii(t)):e.value!==""+ii(t)&&(e.value=""+ii(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?tm(e,ii(e.value)):tm(e,ii(t)):n!=null?tm(e,ii(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+ii(o):e.removeAttribute("name")}function yS(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Bm(e);return}n=n!=null?""+ii(n):"",t=t!=null?""+ii(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Bm(e)}function tm(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function ho(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+ii(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function xS(e,t,n){if(t!=null&&(t=""+ii(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+ii(n):""}function SS(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(j(92));if(Bl(i)){if(1<i.length)throw Error(j(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=ii(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Bm(e)}function Mo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var WA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ey(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||WA.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function bS(e,t,n){if(t!=null&&typeof t!="object")throw Error(j(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",ee=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(Ey(e,s,i),ee=!0)}else for(var a in t)t.hasOwnProperty(a)&&Ey(e,a,t[a])}function Gg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),YA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ku(e){return YA.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ls(){}var zm=null;function kg(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var eo=null,fo=null;function Ty(e){var t=Io(e);if(t&&(e=t.stateNode)){var n=e[Zn]||null;t:switch(e=t.stateNode,t.type){case"input":if(Fm(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ti(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Zn]||null;if(!s)throw Error(j(90));Fm(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&_S(i)}break t;case"textarea":xS(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&ho(e,!!n.multiple,t,!1)}}}var em=!1;function MS(e,t,n){if(em)return e(t,n);em=!0;try{var i=e(t);return i}finally{if(em=!1,(eo!==null||fo!==null)&&(af(),eo&&(t=eo,e=fo,fo=eo=null,Ty(t),e)))for(t=0;t<e.length;t++)Ty(e[t])}}function ec(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Zn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(j(231,t,typeof n));return n}var Os=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hm=!1;if(Os)try{qr={},Object.defineProperty(qr,"passive",{get:function(){Hm=!0}}),window.addEventListener("test",qr,qr),window.removeEventListener("test",qr,qr)}catch{Hm=!1}var qr,ua=null,Xg=null,Qu=null;function ES(){if(Qu)return Qu;var e,t=Xg,n=t.length,i,s="value"in ua?ua.value:ua.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Qu=s.slice(e,1<i?1-i:void 0)}function ju(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Lu(){return!0}function Ay(){return!1}function Fn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Lu:Ay,this.isPropagationStopped=Ay,this}return ye(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Lu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Lu)},persist:function(){},isPersistent:Lu}),t}var Na={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wh=Fn(Na),Sc=ye({},Na,{view:0,detail:0}),ZA=Fn(Sc),nm,im,Dl,qh=ye({},Sc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wg,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Dl&&(Dl&&e.type==="mousemove"?(nm=e.screenX-Dl.screenX,im=e.screenY-Dl.screenY):im=nm=0,Dl=e),nm)},movementY:function(e){return"movementY"in e?e.movementY:im}}),wy=Fn(qh),JA=ye({},qh,{dataTransfer:0}),KA=Fn(JA),QA=ye({},Sc,{relatedTarget:0}),sm=Fn(QA),jA=ye({},Na,{animationName:0,elapsedTime:0,pseudoElement:0}),$A=Fn(jA),tw=ye({},Na,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ew=Fn(tw),nw=ye({},Na,{data:0}),Cy=Fn(nw),iw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},aw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rw(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=aw[e])?!!t[e]:!1}function Wg(){return rw}var ow=ye({},Sc,{key:function(e){if(e.key){var t=iw[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ju(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sw[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wg,charCode:function(e){return e.type==="keypress"?ju(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ju(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lw=Fn(ow),cw=ye({},qh,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ry=Fn(cw),uw=ye({},Na,{submitter:0}),hw=Fn(uw),fw=ye({},Sc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wg}),dw=Fn(fw),pw=ye({},Na,{propertyName:0,elapsedTime:0,pseudoElement:0}),mw=Fn(pw),gw=ye({},qh,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),vw=Fn(gw),_w=ye({},Na,{newState:0,oldState:0,source:0}),yw=Fn(_w),xw=[9,13,27,32],qg=Os&&"CompositionEvent"in window,Vl=null;Os&&"documentMode"in document&&(Vl=document.documentMode);var Sw=Os&&"TextEvent"in window&&!Vl,TS=Os&&(!qg||Vl&&8<Vl&&11>=Vl),Ny=" ",Dy=!1;function AS(e,t){switch(e){case"keyup":return xw.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wS(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var no=!1;function bw(e,t){switch(e){case"compositionend":return wS(t);case"keypress":return t.which!==32?null:(Dy=!0,Ny);case"textInput":return e=t.data,e===Ny&&Dy?null:e;default:return null}}function Mw(e,t){if(no)return e==="compositionend"||!qg&&AS(e,t)?(e=ES(),Qu=Xg=ua=null,no=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return TS&&t.locale!=="ko"?null:t.data;default:return null}}var Ew={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Uy(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ew[e.type]:t==="textarea"}function CS(e,t,n,i){eo?fo?fo.push(i):fo=[i]:eo=i,t=Hh(t,"onChange"),0<t.length&&(n=new Wh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Gl=null,nc=null;function Tw(e){MM(e,0)}function Yh(e){var t=Fl(e);if(_S(t))return e}function Ly(e,t){if(e==="change")return t}var RS=!1;Os&&(Os?(Iu="oninput"in document,Iu||(am=document.createElement("div"),am.setAttribute("oninput","return;"),Iu=typeof am.oninput=="function"),Ou=Iu):Ou=!1,RS=Ou&&(!document.documentMode||9<document.documentMode));var Ou,Iu,am;function Oy(){Gl&&(Gl.detachEvent("onpropertychange",NS),nc=Gl=null)}function NS(e){if(e.propertyName==="value"&&Yh(nc)){var t=[];CS(t,nc,e,kg(e)),MS(Tw,t)}}function Aw(e,t,n){e==="focusin"?(Oy(),Gl=t,nc=n,Gl.attachEvent("onpropertychange",NS)):e==="focusout"&&Oy()}function ww(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yh(nc)}function Cw(e,t){if(e==="click")return Yh(t)}function Rw(e,t){if(e==="input"||e==="change")return Yh(t)}function Nw(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var hi=typeof Object.is=="function"?Object.is:Nw;function ic(e,t){if(hi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Pm.call(t,s)||!hi(e[s],t[s]))return!1}return!0}function Vm(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Iy(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Py(e,t){var n=Iy(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Iy(n)}}function DS(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?DS(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function US(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Vm(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Vm(e.document)}return t}function Yg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Dw=Os&&"documentMode"in document&&11>=document.documentMode,io=null,Gm=null,kl=null,km=!1;function By(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;km||io==null||io!==Vm(i)||(i=io,"selectionStart"in i&&Yg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),kl&&ic(kl,i)||(kl=i,i=Hh(Gm,"onSelect"),0<i.length&&(t=new Wh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=io)))}function er(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var so={animationend:er("Animation","AnimationEnd"),animationiteration:er("Animation","AnimationIteration"),animationstart:er("Animation","AnimationStart"),transitionrun:er("Transition","TransitionRun"),transitionstart:er("Transition","TransitionStart"),transitioncancel:er("Transition","TransitionCancel"),transitionend:er("Transition","TransitionEnd")},rm={},LS={};Os&&(LS=document.createElement("div").style,"AnimationEvent"in window||(delete so.animationend.animation,delete so.animationiteration.animation,delete so.animationstart.animation),"TransitionEvent"in window||delete so.transitionend.transition);function Mr(e){if(rm[e])return rm[e];if(!so[e])return e;var t=so[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in LS)return rm[e]=t[n];return e}var OS=Mr("animationend"),IS=Mr("animationiteration"),PS=Mr("animationstart"),Uw=Mr("transitionrun"),Lw=Mr("transitionstart"),Ow=Mr("transitioncancel"),BS=Mr("transitionend"),FS=new Map,Xm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Xm.push("scrollEnd");function Hi(e,t){FS.set(e,t),br(t,[e])}var Iw=0;function Is(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=zi.identifierPrefix;var n=Iw++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function Fy(e){if(e==null||typeof e=="string")return e;var t=null,n=xo;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function Vs(e,t){return e=Fy(e),t=Fy(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var yh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},bi=[],ao=0,Zg=0;function Zh(){for(var e=ao,t=Zg=ao=0;t<e;){var n=bi[t];bi[t++]=null;var i=bi[t];bi[t++]=null;var s=bi[t];bi[t++]=null;var a=bi[t];if(bi[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&zS(n,s,a)}}function Jh(e,t,n,i){bi[ao++]=e,bi[ao++]=t,bi[ao++]=n,bi[ao++]=i,Zg|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Jg(e,t,n,i){return Jh(e,t,n,i),xh(e)}function Er(e,t){return Jh(e,null,null,t),xh(e)}function zS(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-ci(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function xh(e){if(50<$l)throw $l=0,lh=null,Error(j(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ro={};function Pw(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wn(e,t,n,i){return new Pw(e,t,n,i)}function Kg(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Us(e,t){var n=e.alternate;return n===null?(n=Wn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function HS(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function $u(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")Kg(i)&&(r=1);else if(typeof i=="string")r=lR(e,n,hs.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case Dm:return e=Wn(31,n,t,s),e.elementType=Dm,e.lanes=a,e;case $r:return cr(n.children,s,a,t);case iS:r=8,s|=24;break;case Cm:return e=Wn(12,n,t,s|2),e.elementType=Cm,e.lanes=a,e;case Rm:return e=Wn(13,n,t,s),e.elementType=Rm,e.lanes=a,e;case Nm:return e=Wn(19,n,t,s),e.elementType=Nm,e.lanes=a,e;case MA:case Um:return e=s|32,e=Wn(30,n,t,e),e.elementType=Um,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case os:r=10;break t;case sS:r=9;break t;case Bg:r=11;break t;case Fg:r=14;break t;case ra:r=16,i=null;break t}r=29,n=Error(j(130,e===null?"null":typeof e,"")),i=null}return t=Wn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function cr(e,t,n,i){return e=Wn(7,e,i,t),e.lanes=n,e}function om(e,t,n){return e=Wn(6,e,null,t),e.lanes=n,e}function VS(e){var t=Wn(18,null,null,0);return t.stateNode=e,t}function lm(e,t,n){return t=Wn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zy=new WeakMap;function Ai(e,t){if(typeof e=="object"&&e!==null){var n=zy.get(e);return n!==void 0?n:(t={value:e,source:t,stack:vy(t)},zy.set(e,t),t)}return{value:e,source:t,stack:vy(t)}}var oo=[],lo=0,Sh=null,sc=0,Mi=[],Ei=0,Ta=null,cs=1,us="";function Ns(e,t){oo[lo++]=sc,oo[lo++]=Sh,Sh=e,sc=t}function GS(e,t,n){Mi[Ei++]=cs,Mi[Ei++]=us,Mi[Ei++]=Ta,Ta=e;var i=cs;e=us;var s=32-ci(i)-1;i&=~(1<<s),n+=1;var a=32-ci(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,cs=1<<32-ci(t)+s|n<<s|i,us=a+e}else cs=1<<a|n<<s|i,us=e}function Kh(e){e.return!==null&&(Ns(e,1),GS(e,1,0))}function Qg(e){for(;e===Sh;)Sh=oo[--lo],oo[lo]=null,sc=oo[--lo],oo[lo]=null;for(;e===Ta;)Ta=Mi[--Ei],Mi[Ei]=null,us=Mi[--Ei],Mi[Ei]=null,cs=Mi[--Ei],Mi[Ei]=null}function kS(e,t){Mi[Ei++]=cs,Mi[Ei++]=us,Mi[Ei++]=Ta,cs=t.id,us=t.overflow,Ta=e}var on=null,Te=null,zt=!1,ga=null,wi=!1,Wm=Error(j(519));function Aa(e){var t=Error(j(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ac(Ai(t,e)),Wm}function Hy(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[pn]=e,t[Zn]=i,n){case"dialog":kt("cancel",t),kt("close",t);break;case"iframe":case"object":case"embed":kt("load",t);break;case"video":case"audio":for(n=0;n<cc.length;n++)kt(cc[n],t);break;case"source":kt("error",t);break;case"img":case"image":case"link":kt("error",t),kt("load",t);break;case"details":kt("toggle",t);break;case"input":kt("invalid",t),yS(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":kt("invalid",t);break;case"textarea":kt("invalid",t),SS(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||TM(t.textContent,n)?(i.popover!=null&&(kt("beforetoggle",t),kt("toggle",t)),i.onScroll!=null&&kt("scroll",t),i.onScrollEnd!=null&&kt("scrollend",t),i.onClick!=null&&(t.onclick=ls),t=!0):t=!1,t||Aa(e,!0)}function bh(e){for(on=e.return;on;)switch(on.tag){case 5:case 31:case 13:wi=!1;return;case 27:case 3:wi=!0;return;default:on=on.return}}function Yr(e){if(e!==on)return!1;if(!zt)return bh(e),zt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Rg(e.type,e.memoizedProps)),n=!n),n&&Te&&Aa(e),bh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));Te=Px(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));Te=Px(e)}else t===27?(t=Te,Da(e.type)?(e=Lg,Lg=null,Te=e):Te=t):Te=on?Ci(e.stateNode.nextSibling):null;return!0}function dr(){Te=on=null,zt=!1}function cm(){var e=ga;return e!==null&&(kn===null?kn=e:kn.push.apply(kn,e),ga=null),e}function ac(e){ga===null?ga=[e]:ga.push(e)}var qm=ps(null),Tr=null,Ds=null;function ha(e,t,n){Ae(qm,t._currentValue),t._currentValue=n}function Ls(e){e._currentValue=qm.current,gn(qm)}function th(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Ym(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),th(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(j(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),th(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),th(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function pr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(j(387));if(r=r.memoizedProps,r!==null){var o=s.type;hi(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===ph.current){if(r=s.alternate,r===null)throw Error(j(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Do):e=[Do])}s=s.return}return e!==null&&Ym(t,e,n,i),t.flags|=262144,e!==null}function Mh(e){for(e=e.firstContext;e!==null;){if(!hi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function mr(e){Tr=e,Ds=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function mn(e){return XS(Tr,e)}function Pu(e,t){return Tr===null&&mr(e),XS(e,t)}function XS(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ds===null){if(e===null)throw Error(j(308));Ds=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ds=Ds.next=t;return n}var Bw=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Fw=Qe.unstable_scheduleCallback,zw=Qe.unstable_NormalPriority,Xe={$$typeof:os,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function jg(){return{controller:new Bw,data:new Map,refCount:0}}function bc(e){e.refCount--,e.refCount===0&&Fw(zw,function(){e.controller.abort()})}function Vy(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var zl=null;function Hw(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Xl=null,Zm=0,gr=0,po=null;function Vw(e,t){if(Xl===null){var n=Xl=[];Zm=0,gr=A0(),po={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Zm++,t.then(Gy,Gy),t}function Gy(){if(--Zm===0&&(zl=null,Xl!==null)){po!==null&&(po.status="fulfilled");var e=Xl;Xl=null,gr=0,po=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Gw(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var ky=Nt.S;Nt.S=function(e,t){if(lM=oi(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Vw(e,t),zl!==null)for(var n=Co;n!==null;)Vy(n,zl),n=n.next;if(n=e.types,n!==null){for(var i=Co;i!==null;)Vy(i,n),i=i.next;if(gr!==0){i=zl,i===null&&(i=zl=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}ky!==null&&ky(e,t)};var ur=ps(null);function $g(){var e=ur.current;return e!==null?e:_e.pooledCache}function eh(e,t){t===null?Ae(ur,ur.current):Ae(ur,t.pool)}function WS(){var e=$g();return e===null?null:{parent:Xe._currentValue,pool:e}}var Po=Error(j(460)),t0=Error(j(474)),Qh=Error(j(542)),Eh={then:function(){}};function Xy(e){return e=e.status,e==="fulfilled"||e==="rejected"}function qS(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ls,ls),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,qy(e),e===void 0&&!("reason"in t)?Error(j(600)):e;default:if(typeof t.status=="string")t.then(ls,ls);else{if(e=_e,e!==null&&100<e.shellSuspendCounter)throw Error(j(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,qy(e),e}throw hr=t,Po}}function sr(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(hr=n,Po):n}}var hr=null;function Wy(){if(hr===null)throw Error(j(459));var e=hr;return hr=null,e}function qy(e){if(e===Po||e===Qh)throw Error(j(483))}var mo=null,rc=0;function Bu(e){var t=rc;return rc+=1,mo===null&&(mo=[]),qS(mo,e,t)}function ia(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Fu(e,t){throw t.$$typeof===bA?Error(j(525)):(e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function YS(e){function t(h,v){if(e){var S=h.deletions;S===null?(h.deletions=[v],h.flags|=16):S.push(v)}}function n(h,v){if(!e)return null;for(;v!==null;)t(h,v),v=v.sibling;return null}function i(h){for(var v=new Map;h!==null;)h.key===null?v.set(h.index,h):v.set(h.key,h),h=h.sibling;return v}function s(h,v){return h=Us(h,v),h.index=0,h.sibling=null,h}function a(h,v,S){return h.index=S,e?(S=h.alternate,S!==null?(S=S.index,S<v?(h.flags|=2,v):S):(h.flags|=134217730,v)):(h.flags|=1048576,v)}function r(h){return e&&h.alternate===null&&(h.flags|=134217730),h}function o(h,v,S,_){return v===null||v.tag!==6?(v=om(S,h.mode,_),v.return=h,v):(v=s(v,S),v.return=h,v)}function l(h,v,S,_){var E=S.type;return E===$r?(h=f(h,v,S.props.children,_,S.key),ia(h,S),h):v!==null&&(v.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===ra&&sr(E)===v.type)?(v=s(v,S.props),ia(v,S),v.return=h,v):(v=$u(S.type,S.key,S.props,null,h.mode,_),ia(v,S),v.return=h,v)}function c(h,v,S,_){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=lm(S,h.mode,_),v.return=h,v):(v=s(v,S.children||[]),v.return=h,v)}function f(h,v,S,_,E){return v===null||v.tag!==7?(v=cr(S,h.mode,_,E),v.return=h,v):(v=s(v,S),v.return=h,v)}function p(h,v,S){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=om(""+v,h.mode,S),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Cu:return S=$u(v.type,v.key,v.props,null,h.mode,S),ia(S,v),S.return=h,S;case Pl:return v=lm(v,h.mode,S),v.return=h,v;case ra:return v=sr(v),p(h,v,S)}if(Bl(v)||Nl(v))return v=cr(v,h.mode,S,null),v.return=h,v;if(typeof v.then=="function")return p(h,Bu(v),S);if(v.$$typeof===os)return p(h,Pu(h,v),S);Fu(h,v)}return null}function u(h,v,S,_){var E=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return E!==null?null:o(h,v,""+S,_);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Cu:return S.key===E?l(h,v,S,_):null;case Pl:return S.key===E?c(h,v,S,_):null;case ra:return S=sr(S),u(h,v,S,_)}if(Bl(S)||Nl(S))return E!==null?null:f(h,v,S,_,null);if(typeof S.then=="function")return u(h,v,Bu(S),_);if(S.$$typeof===os)return u(h,v,Pu(h,S),_);Fu(h,S)}return null}function d(h,v,S,_,E){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return h=h.get(S)||null,o(v,h,""+_,E);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Cu:return h=h.get(_.key===null?S:_.key)||null,l(v,h,_,E);case Pl:return h=h.get(_.key===null?S:_.key)||null,c(v,h,_,E);case ra:return _=sr(_),d(h,v,S,_,E)}if(Bl(_)||Nl(_))return h=h.get(S)||null,f(v,h,_,E,null);if(typeof _.then=="function")return d(h,v,S,Bu(_),E);if(_.$$typeof===os)return d(h,v,S,Pu(v,_),E);Fu(v,_)}return null}function g(h,v,S,_){for(var E=null,T=null,w=v,x=v=0,A=null;w!==null&&x<S.length;x++){w.index>x?(A=w,w=null):A=w.sibling;var R=u(h,w,S[x],_);if(R===null){w===null&&(w=A);break}e&&w&&R.alternate===null&&t(h,w),v=a(R,v,x),T===null?E=R:T.sibling=R,T=R,w=A}if(x===S.length)return n(h,w),zt&&Ns(h,x),E;if(w===null){for(;x<S.length;x++)w=p(h,S[x],_),w!==null&&(v=a(w,v,x),T===null?E=w:T.sibling=w,T=w);return zt&&Ns(h,x),E}for(w=i(w);x<S.length;x++)A=d(w,h,x,S[x],_),A!==null&&(e&&(R=A.alternate,R!==null&&w.delete(R.key===null?x:R.key)),v=a(A,v,x),T===null?E=A:T.sibling=A,T=A);return e&&w.forEach(function(U){return t(h,U)}),zt&&Ns(h,x),E}function b(h,v,S,_){if(S==null)throw Error(j(151));for(var E=null,T=null,w=v,x=v=0,A=null,R=S.next();w!==null&&!R.done;x++,R=S.next()){w.index>x?(A=w,w=null):A=w.sibling;var U=u(h,w,R.value,_);if(U===null){w===null&&(w=A);break}e&&w&&U.alternate===null&&t(h,w),v=a(U,v,x),T===null?E=U:T.sibling=U,T=U,w=A}if(R.done)return n(h,w),zt&&Ns(h,x),E;if(w===null){for(;!R.done;x++,R=S.next())R=p(h,R.value,_),R!==null&&(v=a(R,v,x),T===null?E=R:T.sibling=R,T=R);return zt&&Ns(h,x),E}for(w=i(w);!R.done;x++,R=S.next())R=d(w,h,x,R.value,_),R!==null&&(e&&(A=R.alternate,A!==null&&w.delete(A.key===null?x:A.key)),v=a(R,v,x),T===null?E=R:T.sibling=R,T=R);return e&&w.forEach(function(B){return t(h,B)}),zt&&Ns(h,x),E}function m(h,v,S,_){if(typeof S=="object"&&S!==null&&S.type===$r&&S.key===null&&S.props.ref===void 0&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Cu:t:{for(var E=S.key;v!==null;){if(v.key===E){if(E=S.type,E===$r){if(v.tag===7){n(h,v.sibling),_=s(v,S.props.children),ia(_,S),_.return=h,h=_;break t}}else if(v.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===ra&&sr(E)===v.type){n(h,v.sibling),_=s(v,S.props),ia(_,S),_.return=h,h=_;break t}n(h,v);break}else t(h,v);v=v.sibling}S.type===$r?(_=cr(S.props.children,h.mode,_,S.key),ia(_,S),_.return=h,h=_):(_=$u(S.type,S.key,S.props,null,h.mode,_),ia(_,S),_.return=h,h=_)}return r(h);case Pl:t:{for(E=S.key;v!==null;){if(v.key===E)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){n(h,v.sibling),_=s(v,S.children||[]),_.return=h,h=_;break t}else{n(h,v);break}else t(h,v);v=v.sibling}_=lm(S,h.mode,_),_.return=h,h=_}return r(h);case ra:return S=sr(S),m(h,v,S,_)}if(Bl(S))return g(h,v,S,_);if(Nl(S)){if(E=Nl(S),typeof E!="function")throw Error(j(150));return S=E.call(S),b(h,v,S,_)}if(typeof S.then=="function")return m(h,v,Bu(S),_);if(S.$$typeof===os)return m(h,v,Pu(h,S),_);Fu(h,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,v!==null&&v.tag===6?(n(h,v.sibling),_=s(v,S),_.return=h,h=_):(n(h,v),_=om(S,h.mode,_),_.return=h,h=_),r(h)):n(h,v)}return function(h,v,S,_){try{rc=0;var E=m(h,v,S,_);return mo=null,E}catch(w){if(w===Po||w===Qh)throw w;var T=Wn(29,w,null,h.mode);return T.lanes=_,T.return=h,T}}}var vr=YS(!0),ZS=YS(!1),oa=!1;function e0(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Jm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function va(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _a(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ne&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=xh(e),zS(e,null,n),t}return Jh(e,i,t,n),xh(e)}function Wl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,hS(e,n)}}function um(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Km=!1;function ql(){if(Km){var e=po;if(e!==null)throw e}}function Yl(e,t,n,i){Km=!1;var s=e.updateQueue;oa=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(a!==null){var p=s.baseState;r=0,f=c=l=null,o=a;do{var u=o.lane&-536870913,d=u!==o.lane;if(d?(Yt&u)===u:(i&u)===u){u!==0&&u===gr&&(Km=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,b=o;u=t;var m=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){p=g.call(m,p,u);break t}p=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(m,p,u):g,u==null)break t;p=ye({},p,u);break t;case 2:oa=!0}}u=o.callback,u!==null&&(e.flags|=64,d&&(e.flags|=8192),d=s.callbacks,d===null?s.callbacks=[u]:d.push(u))}else d={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=d,l=p):f=f.next=d,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;d=o,o=d.next,d.next=null,s.lastBaseUpdate=d,s.shared.pending=null}}while(!0);f===null&&(l=p),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=f,a===null&&(s.shared.lanes=0),Ra|=r,e.lanes=r,e.memoizedState=p}}function JS(e,t){if(typeof e!="function")throw Error(j(191,e));e.call(t)}function KS(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)JS(n[e],t)}var wa=ps(null),Th=ps(0);function Yy(e,t){e=zs,Ae(Th,e),Ae(wa,t),zs=e|t.baseLanes}function Qm(){Ae(Th,zs),Ae(wa,wa.current)}function n0(){zs=Th.current,gn(wa),gn(Th)}var yn=ps(null),Tn=null;function ya(e){var t=e.alternate;Ae(vn,vn.current&1),Ae(yn,e),Tn===null&&(t===null||wa.current!==null||t.memoizedState!==null)&&(Tn=e)}function jm(e){Ae(vn,vn.current),Ae(yn,e),Tn===null&&(Tn=e)}function QS(e){e.tag===22?(Ae(vn,vn.current),Ae(yn,e),Tn===null&&(Tn=e)):xa()}function xa(){Ae(vn,vn.current),Ae(yn,yn.current)}function si(e){gn(yn),Tn===e&&(Tn=null),gn(vn)}var vn=ps(0);function oc(e,t){Ae(yn,yn.current),Ae(vn,t)}function i0(e){gn(vn),gn(yn),Tn===e&&(Tn=null)}function Ah(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Ug(n)||N0(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ps=0,Pt=null,ge=null,ke=null,wh=!1,go=!1,_r=!1,Ch=0,lc=0,vo=null,kw=0;function Pe(){throw Error(j(321))}function s0(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!hi(e[n],t[n]))return!1;return!0}function a0(e,t,n,i,s,a){return Ps=a,Pt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Nt.H=e===null||e.memoizedState===null?Cb:Rb,_r=!1,a=n(i,s),_r=!1,go&&(a=$S(t,n,i,s)),jS(e),a}function jS(e){Nt.H=Rh;var t=ge!==null&&ge.next!==null;if(Ps=0,ke=ge=Pt=null,wh=!1,lc=0,vo=null,t)throw Error(j(300));e===null||We||(e=e.dependencies,e!==null&&Mh(e)&&(We=!0))}function $S(e,t,n,i){Pt=e;var s=0;do{if(go&&(vo=null),lc=0,go=!1,25<=s)throw Error(j(301));if(s+=1,ke=ge=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Nt.H=Qw,a=t(n,i)}while(go);return a}function Xw(){var e=Nt.H,t=e.useState()[0];return t=typeof t.then=="function"?Mc(t):t,e=e.useState()[0],(ge!==null?ge.memoizedState:null)!==e&&(Pt.flags|=1024),t}function r0(){var e=Ch!==0;return Ch=0,e}function o0(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function l0(e){if(wh){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}wh=!1}Ps=0,ke=ge=Pt=null,go=!1,lc=Ch=0,vo=null}function Bn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ke===null?Pt.memoizedState=ke=e:ke=ke.next=e,ke}function He(){if(ge===null){var e=Pt.alternate;e=e!==null?e.memoizedState:null}else e=ge.next;var t=ke===null?Pt.memoizedState:ke.next;if(t!==null)ke=t,ge=e;else{if(e===null)throw Pt.alternate===null?Error(j(467)):Error(j(310));ge=e,e={memoizedState:ge.memoizedState,baseState:ge.baseState,baseQueue:ge.baseQueue,queue:ge.queue,next:null},ke===null?Pt.memoizedState=ke=e:ke=ke.next=e}return ke}function jh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Mc(e){var t=lc;return lc+=1,vo===null&&(vo=[]),e=qS(vo,e,t),t=Pt,(ke===null?t.memoizedState:ke.next)===null&&(t=t.alternate,Nt.H=t===null||t.memoizedState===null?Cb:Rb),e}function $h(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Mc(e);if(e.$$typeof===TA)return;if(e.$$typeof===os)return mn(e)}throw Error(j(438,String(e)))}function c0(e){var t=null,n=Pt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Pt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=jh(),Pt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=EA;return t.index++,n}function Bs(e,t){return typeof t=="function"?t(e):t}function nh(e){var t=He();return u0(t,ge,e)}function u0(e,t,n){var i=e.queue;if(i===null)throw Error(j(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,f=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(Yt&p)===p:(Ps&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===gr&&(f=!0);else if((Ps&u)===u){c=c.next,u===gr&&(f=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=a):l=l.next=p,Pt.lanes|=u,Ra|=u;p=c.action,_r&&n(a,p),a=c.hasEagerState?c.eagerState:n(a,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,Pt.lanes|=p,Ra|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!hi(a,e.memoizedState)&&(We=!0,f&&(n=po,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function hm(e){var t=He(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);hi(a,t.memoizedState)||(We=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function tb(e,t,n){var i=Pt,s=He(),a=zt;if(a){if(n===void 0)throw Error(j(407));n=n()}else n=t();var r=!hi((ge||s).memoizedState,n);if(r&&(s.memoizedState=n,We=!0),s=s.queue,h0(ib.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||ke!==null&&(ke.memoizedState.tag&1)!==0,Eo(e?9:8,{destroy:void 0},nb.bind(null,i,s,n,t),null),e){if(i.flags|=2048,_e===null)throw Error(j(349));a||(Ps&127)!==0||eb(i,t,n)}return n}function eb(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Pt.updateQueue,t===null?(t=jh(),Pt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function nb(e,t,n,i){t.value=n,t.getSnapshot=i,sb(t)&&ab(e)}function ib(e,t,n){return n(function(){sb(t)&&ab(e)})}function sb(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!hi(e,n)}catch{return!0}}function ab(e){var t=Er(e,2);t!==null&&qn(t,e,2)}function $m(e){var t=Bn();if(typeof e=="function"){var n=e;if(e=n(),_r){ca(!0);try{n()}finally{ca(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bs,lastRenderedState:e},t}function rb(e,t,n,i){return e.baseState=n,u0(e,ge,typeof i=="function"?i:Bs)}function Ww(e,t,n,i,s){if(ef(e))throw Error(j(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Nt.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,ob(t,a)):(a.next=n.next,t.pending=n.next=a)}}function ob(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Nt.T,r={};r.types=a!==null?a.types:null,Nt.T=r;try{var o=n(s,i),l=Nt.S;l!==null&&l(r,o),Zy(e,t,o)}catch(c){tg(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Nt.T=a}}else try{a=n(s,i),Zy(e,t,a)}catch(c){tg(e,t,c)}}function Zy(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Jy(e,t,i)},function(i){return tg(e,t,i)}):Jy(e,t,n)}function Jy(e,t,n){t.status="fulfilled",t.value=n,lb(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ob(e,n)))}function tg(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,lb(t),t=t.next;while(t!==i)}e.action=null}function lb(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function cb(e,t){return t}function Ky(e,t){if(zt){var n=_e.formState;if(n!==null){t:{var i=Pt;if(zt){if(Te){e:{for(var s=Te,a=wi;s.nodeType!==8;){if(!a){s=null;break e}if(s=Ci(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Te=Ci(s.nextSibling),i=s.data==="F!";break t}}Aa(i)}i=!1}i&&(t=n[0])}}return n=Bn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:cb,lastRenderedState:t},n.queue=i,n=Tb.bind(null,Pt,i),i.dispatch=n,i=$m(!1),a=m0.bind(null,Pt,!1,i.queue),i=Bn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=Ww.bind(null,Pt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function Qy(e){var t=He();return ub(t,ge,e)}function ub(e,t,n){if(t=u0(e,t,cb)[0],e=nh(Bs)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Mc(t)}catch(r){throw r===Po?Qh:r}else i=t;t=He();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Pt.flags|=2048,Eo(9,{destroy:void 0},qw.bind(null,s,n),null)),[i,a,e]}function qw(e,t){e.action=t}function jy(e){var t=He(),n=ge;if(n!==null)return ub(t,n,e);He(),t=t.memoizedState,n=He();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Eo(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Pt.updateQueue,t===null&&(t=jh(),Pt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function hb(){return He().memoizedState}function ih(e,t,n,i){var s=Bn();Pt.flags|=e,s.memoizedState=Eo(1|t,{destroy:void 0},n,i===void 0?null:i)}function tf(e,t,n,i){var s=He();i=i===void 0?null:i;var a=s.memoizedState.inst;ge!==null&&i!==null&&s0(i,ge.memoizedState.deps)?s.memoizedState=Eo(t,a,n,i):(Pt.flags|=e,s.memoizedState=Eo(1|t,a,n,i))}function $y(e,t){ih(8390656,8,e,t)}function h0(e,t){tf(2048,8,e,t)}function Yw(e){Pt.flags|=4;var t=Pt.updateQueue;if(t===null)t=jh(),Pt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function fb(e){var t=He().memoizedState;return Yw({ref:t,nextImpl:e}),function(){if((ne&2)!==0)throw Error(j(440));return t.impl.apply(void 0,arguments)}}function db(e,t){return tf(4,2,e,t)}function pb(e,t){return tf(4,4,e,t)}function mb(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function gb(e,t,n){n=n!=null?n.concat([e]):null,tf(4,4,mb.bind(null,t,e),n)}function f0(){}function vb(e,t){var n=He();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&s0(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function _b(e,t){var n=He();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&s0(t,i[1]))return i[0];if(i=e(),_r){ca(!0);try{e()}finally{ca(!1)}}return n.memoizedState=[i,t],i}function d0(e,t,n){return n===void 0||(Ps&1073741824)!==0&&(Yt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=uM(),Pt.lanes|=e,Ra|=e,n)}function yb(e,t,n,i){return hi(n,t)?n:wa.current!==null?(e=d0(e,n,i),hi(e,t)||(We=!0),e):(Ps&106)===0||(Ps&1073741824)!==0&&(Yt&261930)===0?(We=!0,e.memoizedState=n):(e=uM(),Pt.lanes|=e,Ra|=e,t)}function xb(e,t,n,i,s){var a=ie.p;ie.p=a!==0&&8>a?a:8;var r=Nt.T,o={};o.types=r!==null?r.types:null,Nt.T=o,m0(e,!1,t,n);try{var l=s(),c=Nt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=Gw(l,i);Zl(e,t,f,ui(e))}else Zl(e,t,i,ui(e))}catch(p){Zl(e,t,{then:function(){},status:"rejected",reason:p},ui())}finally{ie.p=a,r!==null&&o.types!==null&&(r.types=o.types),Nt.T=r}}function Zw(){}function eg(e,t,n,i){if(e.tag!==5)throw Error(j(476));var s=Sb(e).queue;xb(e,s,t,lr,n===null?Zw:function(){return bb(e),n(i)})}function Sb(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:lr,baseState:lr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bs,lastRenderedState:lr},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function bb(e){var t=Sb(e);t.next===null&&(t=e.alternate.memoizedState),Zl(e,t.next.queue,{},ui())}function p0(){return mn(Do)}function Mb(){return He().memoizedState}function Eb(){return He().memoizedState}function Jw(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ui();e=va(n);var i=_a(t,e,n);i!==null&&(qn(i,t,n),Wl(i,t,n)),t={cache:jg()},e.payload=t;return}t=t.return}}function Kw(e,t,n){var i=ui();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ef(e)?Ab(t,n):(n=Jg(e,t,n,i),n!==null&&(qn(n,e,i),wb(n,t,i)))}function Tb(e,t,n){var i=ui();Zl(e,t,n,i)}function Zl(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ef(e))Ab(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,hi(o,r))return Jh(e,t,s,0),_e===null&&Zh(),!1}catch{}if(n=Jg(e,t,s,i),n!==null)return qn(n,e,i),wb(n,t,i),!0}return!1}function m0(e,t,n,i){if(i={lane:2,revertLane:A0(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},ef(e)){if(t)throw Error(j(479))}else t=Jg(e,n,i,2),t!==null&&qn(t,e,2)}function ef(e){var t=e.alternate;return e===Pt||t!==null&&t===Pt}function Ab(e,t){go=wh=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function wb(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,hS(e,n)}}var Rh={readContext:mn,use:$h,useCallback:Pe,useContext:Pe,useEffect:Pe,useImperativeHandle:Pe,useLayoutEffect:Pe,useInsertionEffect:Pe,useMemo:Pe,useReducer:Pe,useRef:Pe,useState:Pe,useDebugValue:Pe,useDeferredValue:Pe,useTransition:Pe,useSyncExternalStore:Pe,useId:Pe,useHostTransitionStatus:Pe,useFormState:Pe,useActionState:Pe,useOptimistic:Pe,useMemoCache:Pe,useCacheRefresh:Pe,useEffectEvent:Pe},Cb={readContext:mn,use:$h,useCallback:function(e,t){return Bn().memoizedState=[e,t===void 0?null:t],e},useContext:mn,useEffect:$y,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,ih(4194308,4,mb.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ih(4194308,4,e,t)},useInsertionEffect:function(e,t){ih(4,2,e,t)},useMemo:function(e,t){var n=Bn();t=t===void 0?null:t;var i=e();if(_r){ca(!0);try{e()}finally{ca(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=Bn();if(n!==void 0){var s=n(t);if(_r){ca(!0);try{n(t)}finally{ca(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=Kw.bind(null,Pt,e),[i.memoizedState,e]},useRef:function(e){var t=Bn();return e={current:e},t.memoizedState=e},useState:function(e){e=$m(e);var t=e.queue,n=Tb.bind(null,Pt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:f0,useDeferredValue:function(e,t){var n=Bn();return d0(n,e,t)},useTransition:function(){var e=$m(!1);return e=xb.bind(null,Pt,e.queue,!0,!1),Bn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Pt,s=Bn();if(zt){if(n===void 0)throw Error(j(407));n=n()}else{if(n=t(),_e===null)throw Error(j(349));(Yt&127)!==0||eb(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,$y(ib.bind(null,i,a,e),[e]),i.flags|=2048,Eo(9,{destroy:void 0},nb.bind(null,i,a,n,t),null),n},useId:function(){var e=Bn(),t=_e.identifierPrefix;if(zt){var n=us,i=cs;n=(i&~(1<<32-ci(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Ch++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=kw++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:p0,useFormState:Ky,useActionState:Ky,useOptimistic:function(e){var t=Bn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=m0.bind(null,Pt,!0,n),n.dispatch=t,[e,t]},useMemoCache:c0,useCacheRefresh:function(){return Bn().memoizedState=Jw.bind(null,Pt)},useEffectEvent:function(e){var t=Bn(),n={impl:e};return t.memoizedState=n,function(){if((ne&2)!==0)throw Error(j(440));return n.impl.apply(void 0,arguments)}}},Rb={readContext:mn,use:$h,useCallback:vb,useContext:mn,useEffect:h0,useImperativeHandle:gb,useInsertionEffect:db,useLayoutEffect:pb,useMemo:_b,useReducer:nh,useRef:hb,useState:function(){return nh(Bs)},useDebugValue:f0,useDeferredValue:function(e,t){var n=He();return yb(n,ge.memoizedState,e,t)},useTransition:function(){var e=nh(Bs)[0],t=He().memoizedState;return[typeof e=="boolean"?e:Mc(e),t]},useSyncExternalStore:tb,useId:Mb,useHostTransitionStatus:p0,useFormState:Qy,useActionState:Qy,useOptimistic:function(e,t){var n=He();return rb(n,ge,e,t)},useMemoCache:c0,useCacheRefresh:Eb,useEffectEvent:fb},Qw={readContext:mn,use:$h,useCallback:vb,useContext:mn,useEffect:h0,useImperativeHandle:gb,useInsertionEffect:db,useLayoutEffect:pb,useMemo:_b,useReducer:hm,useRef:hb,useState:function(){return hm(Bs)},useDebugValue:f0,useDeferredValue:function(e,t){var n=He();return ge===null?d0(n,e,t):yb(n,ge.memoizedState,e,t)},useTransition:function(){var e=hm(Bs)[0],t=He().memoizedState;return[typeof e=="boolean"?e:Mc(e),t]},useSyncExternalStore:tb,useId:Mb,useHostTransitionStatus:p0,useFormState:jy,useActionState:jy,useOptimistic:function(e,t){var n=He();return ge!==null?rb(n,ge,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:c0,useCacheRefresh:Eb,useEffectEvent:fb};function fm(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:ye({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ng={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=ui(),s=va(i);s.payload=t,n!=null&&(s.callback=n),t=_a(e,s,i),t!==null&&(qn(t,e,i),Wl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=ui(),s=va(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=_a(e,s,i),t!==null&&(qn(t,e,i),Wl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ui(),i=va(n);i.tag=2,t!=null&&(i.callback=t),t=_a(e,i,n),t!==null&&(qn(t,e,n),Wl(t,e,n))}};function tx(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!ic(n,i)||!ic(s,a):!0}function ex(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&ng.enqueueReplaceState(t,t.state,null)}function yr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=ye({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function Nb(e){yh(e)}function Db(e){console.error(e)}function Ub(e){yh(e)}function Nh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function nx(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function ig(e,t,n){return n=va(n),n.tag=3,n.payload={element:null},n.callback=function(){Nh(e,t)},n}function Lb(e){return e=va(e),e.tag=3,e}function Ob(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){nx(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){nx(t,n,i),typeof s!="function"&&(Sa===null?Sa=new Set([this]):Sa.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function jw(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&pr(t,n,s,!0),n=yn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Tn===null?Fh():n.alternate===null&&Be===0&&(Be=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===Eh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),ym(e,i,s)),!1;case 22:return n.flags|=65536,i===Eh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),ym(e,i,s)),!1}throw Error(j(435,n.tag))}return ym(e,i,s),Fh(),!1}if(zt)return t=yn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==Wm&&(e=Error(j(422),{cause:i}),ac(Ai(e,n)))):(i!==Wm&&(t=Error(j(423),{cause:i}),ac(Ai(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=Ai(i,n),s=ig(e.stateNode,i,s),um(e,s),Be!==4&&(Be=2)),!1;var a=Error(j(520),{cause:i});if(a=Ai(a,n),jl===null?jl=[a]:jl.push(a),Be!==4&&(Be=2),t===null)return!0;i=Ai(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=ig(n.stateNode,i,e),um(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(Sa===null||!Sa.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=Lb(s),Ob(s,e,n,i),um(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var g0=Error(j(461)),We=!1;function Je(e,t,n,i){t.child=e===null?ZS(t,null,n,i):vr(t,e.child,n,i)}function ix(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return mr(t),i=a0(e,t,n,r,a,s),o=r0(),e!==null&&!We?(o0(e,t,s),Fs(e,t,s)):(zt&&o&&Kh(t),t.flags|=1,Je(e,t,i,s),t.child)}function sx(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!Kg(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Ib(e,t,a,i,s)):(e=$u(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!_0(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:ic,n(r,i)&&e.ref===t.ref)return Fs(e,t,s)}return t.flags|=1,e=Us(a,i),e.ref=t.ref,e.return=t,t.child=e}function Ib(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(ic(a,i)&&e.ref===t.ref)if(We=!1,t.pendingProps=i=a,_0(e,s))(e.flags&131072)!==0&&(We=!0);else return t.lanes=e.lanes,Fs(e,t,s)}return sg(e,t,n,i,s)}function Pb(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return ax(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&eh(t,a!==null?a.cachePool:null),a!==null?Yy(t,a):Qm(),QS(t);else return i=t.lanes=536870912,ax(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(eh(t,a.cachePool),Yy(t,a),xa(),t.memoizedState=null):(e!==null&&eh(t,null),Qm(),xa());return Je(e,t,s,n),t.child}function Jl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ax(e,t,n,i,s){var a=$g();return a=a===null?null:{parent:Xe._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&eh(t,null),Qm(),QS(t),e!==null&&pr(e,t,i,!0),t.childLanes=s,null}function sh(e,t){return t=nf({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function rx(e,t,n){return vr(t,e.child,null,n),e=sh(t,t.pendingProps),e.flags|=2,si(t),t.memoizedState=null,e}function $w(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(zt){if(i.mode==="hidden")return e=sh(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Jl(null,e);if(jm(t),(e=Te)?(e=PM(e,wi),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ta!==null?{id:cs,overflow:us}:null,retryLane:536870912,hydrationErrors:null},n=VS(e),n.return=t,t.child=n,on=t,Te=null)):e=null,e===null)throw Aa(t);return t.lanes=536870912,null}return sh(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(jm(t),s)if(t.flags&256)t.flags&=-257,t=rx(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(j(558));else if(We||pr(e,t,n,!1),s=(n&e.childLanes)!==0,We||s){if(wa.current===null){if(i=_e,i!==null&&(r=fS(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,Er(e,r),qn(i,e,r),g0;Fh()}t=rx(e,t,n)}else e=a.treeContext,Te=Ci(r.nextSibling),on=t,zt=!0,ga=null,wi=!1,e!==null&&kS(t,e),t=sh(t,i),t.flags|=134221824;return t}return e=Us(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Jr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(j(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function sg(e,t,n,i,s){return mr(t),n=a0(e,t,n,i,void 0,s),i=r0(),e!==null&&!We?(o0(e,t,s),Fs(e,t,s)):(zt&&i&&Kh(t),t.flags|=1,Je(e,t,n,s),t.child)}function ox(e,t,n,i,s,a){return mr(t),t.updateQueue=null,n=$S(t,i,n,s),jS(e),i=r0(),e!==null&&!We?(o0(e,t,a),Fs(e,t,a)):(zt&&i&&Kh(t),t.flags|=1,Je(e,t,n,a),t.child)}function lx(e,t,n,i,s){if(mr(t),t.stateNode===null){var a=ro,r=n.contextType;typeof r=="object"&&r!==null&&(a=mn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=ng,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},e0(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?mn(r):ro,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(fm(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&ng.enqueueReplaceState(a,a.state,null),Yl(t,i,a,s),ql(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=yr(n,o);a.props=l;var c=a.context,f=n.contextType;r=ro,typeof f=="object"&&f!==null&&(r=mn(f));var p=n.getDerivedStateFromProps;f=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&ex(t,a,i,r),oa=!1;var u=t.memoizedState;a.state=u,Yl(t,i,a,s),ql(),c=t.memoizedState,o||u!==c||oa?(typeof p=="function"&&(fm(t,n,p,i),c=t.memoizedState),(l=oa||tx(t,n,l,i,u,c,r))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,Jm(e,t),r=t.memoizedProps,f=yr(n,r),a.props=f,p=t.pendingProps,u=a.context,c=n.contextType,l=ro,typeof c=="object"&&c!==null&&(l=mn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||u!==l)&&ex(t,a,i,l),oa=!1,u=t.memoizedState,a.state=u,Yl(t,i,a,s),ql();var d=t.memoizedState;r!==p||u!==d||oa||e!==null&&e.dependencies!==null&&Mh(e.dependencies)?(typeof o=="function"&&(fm(t,n,o,i),d=t.memoizedState),(f=oa||tx(t,n,f,i,u,d,l)||e!==null&&e.dependencies!==null&&Mh(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,d,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,d,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=d),a.props=i,a.state=d,a.context=l,i=f):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Jr(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=vr(t,e.child,null,s),t.child=vr(t,null,n,s)):Je(e,t,n,s),t.memoizedState=a.state,e=t.child):e=Fs(e,t,s),e}function cx(e,t,n,i){return dr(),t.flags|=256,Je(e,t,n,i),t.child}var ag={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function rg(e){return{baseLanes:e,cachePool:WS()}}function og(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=ri),e}function Bb(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(vn.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(zt){if(s?ya(t):xa(),(e=Te)?(e=PM(e,wi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ta!==null?{id:cs,overflow:us}:null,retryLane:536870912,hydrationErrors:null},n=VS(e),n.return=t,t.child=n,on=t,Te=null)):e=null,e===null)throw Aa(t);return N0(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?(xa(),s=t.mode,a=nf({mode:"hidden",children:a},s),i=cr(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=rg(n),i.childLanes=og(e,r,n),t.memoizedState=ag,Jl(null,i)):(ya(t),v0(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return tC(e,t,a,r,i,l,o,n)}return s?(xa(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=Us(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=Us(l,s):(s=cr(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,Jl(null,i),i=t.child,s=e.child.memoizedState,s===null?s=rg(n):(a=s.cachePool,a!==null?(o=Xe._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=WS(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=og(e,r,n),t.memoizedState=ag,Jl(e.child,i)):(ya(t),n=e.child,e=n.sibling,n=Us(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function v0(e,t){return t=nf({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function nf(e,t){return e=Wn(22,e,null,t),e.lanes=0,e}function zu(e,t,n){return vr(t,e.child,null,n),e=v0(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tC(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(ya(t),t.flags&=-257,zu(e,t,o)):t.memoizedState!==null?(xa(),t.child=e.child,t.flags|=128,null):(xa(),a=s.fallback,r=t.mode,s=nf({mode:"visible",children:s.children},r),a=cr(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,vr(t,e.child,null,o),s=t.child,s.memoizedState=rg(o),s.childLanes=og(e,i,o),t.memoizedState=ag,Jl(null,s));if(ya(t),N0(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(j(419)),s.stack="",s.digest=i,ac({value:s,source:null,stack:null})),zu(e,t,o)}if(We||pr(e,t,o,!1),i=(o&e.childLanes)!==0,We||i){if(wa.current!==null)return zu(e,t,o);if(i=_e,i!==null&&(s=fS(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,Er(e,s),qn(i,e,s),g0;return Ug(a)||Fh(),zu(e,t,o)}return Ug(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Te=Ci(a.nextSibling),on=t,zt=!0,ga=null,wi=!1,e!==null&&kS(t,e),t=v0(t,s.children),t.flags|=134221824,t)}function ux(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),th(e.return,t,n)}function hx(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Ah(n)===null&&(t=e),e=e.sibling}return t}function Hu(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function dm(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function lg(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=vn.current;if(t.flags&128)return oc(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,oc(t,r),s==="backwards"&&e!==null?(dm(e),Je(e,t,i,n),dm(e)):Je(e,t,i,n),i=zt?sc:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ux(e,n,t);else if(e.tag===19)ux(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=hx(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,dm(t)),Hu(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Ah(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Hu(t,!0,n,null,a,i);break;case"together":Hu(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=hx(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Hu(t,!1,s,n,a,i)}return t.child}function fx(e,t,n){var i=t.pendingProps;return ha(t,t.type,i.value),Je(e,t,i.children,n),t.child}function Fs(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ra|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(pr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,n=Us(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Us(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function _0(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Mh(e)))}function eC(e,t,n){switch(t.tag){case 3:mh(t,t.stateNode.containerInfo),ha(t,Xe,e.memoizedState.cache),dr();break;case 27:case 5:Im(t);break;case 4:mh(t,t.stateNode.containerInfo);break;case 10:ha(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,jm(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return ya(t),t.flags|=128,null;i=pr(e,t,n,!1);var s=t.child.childLanes;return i||(n&s)!==0?Bb(e,t,n):(ya(t),e=Fs(e,t,n),e!==null?e.sibling:null)}ya(t);break;case 19:if(t.flags&128)return lg(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(pr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return lg(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),oc(t,vn.current),i)break;return null;case 22:return t.lanes=0,Pb(e,t,n,t.pendingProps);case 24:ha(t,Xe,e.memoizedState.cache)}return Fs(e,t,n)}function Fb(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)We=!0;else{if(!_0(e,n)&&(t.flags&128)===0)return We=!1,eC(e,t,n);We=(e.flags&131072)!==0}else We=!1,zt&&(t.flags&1048576)!==0&&GS(t,sc,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=sr(t.elementType),t.type=e,typeof e=="function")Kg(e)?(i=yr(e,i),t.tag=1,t=lx(null,t,e,i,n)):(t.tag=0,t=sg(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Bg){t.tag=11,t=ix(null,t,e,i,n);break t}else if(s===Fg){t.tag=14,t=sx(null,t,e,i,n);break t}else if(s===os){t.tag=10,t.type=e,t=fx(null,t,n);break t}}throw t=Lm(e)||e,Error(j(306,t,""))}}return t;case 0:return sg(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=yr(i,t.pendingProps),lx(e,t,i,s,n);case 3:t:{if(mh(t,t.stateNode.containerInfo),e===null)throw Error(j(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,Jm(e,t),Yl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,ha(t,Xe,i),i!==a.cache&&Ym(t,[Xe],n,!0),ql(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=cx(e,t,i,n);break t}else if(i!==s){s=Ai(Error(j(424)),t),ac(s),t=cx(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Te=Ci(e.firstChild),on=t,zt=!0,ga=null,wi=!0,n=ZS(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(dr(),i===s){t=Fs(e,t,n);break t}Je(e,t,i,n)}t=t.child}return t;case 26:return Jr(e,t),e===null?(n=zx(t.type,null,t.pendingProps,null))?t.memoizedState=n:zt||(t.stateNode=wM(t.type,t.pendingProps,ma.current,t)):t.memoizedState=zx(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Im(t),e===null&&zt&&(i=t.stateNode=BM(t.type,t.pendingProps,ma.current),on=t,wi=!0,s=Te,Da(t.type)?(Lg=s,Te=Ci(i.firstChild)):Te=s),Je(e,t,t.pendingProps.children,n),Jr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&zt&&((s=i=Te)&&(i=YC(i,t.type,t.pendingProps,wi),i!==null?(t.stateNode=i,on=t,Te=Ci(i.firstChild),wi=!1,s=!0):s=!1),s||Aa(t)),Im(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Rg(s,a)?i=null:r!==null&&Rg(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=a0(e,t,Xw,null,null,n),Do._currentValue=s),Jr(e,t),Je(e,t,i,n),t.child;case 6:return e===null&&zt&&((e=n=Te)&&(n=ZC(n,t.pendingProps,wi),n!==null?(t.stateNode=n,on=t,Te=null,e=!0):e=!1),e||Aa(t)),null;case 13:return Bb(e,t,n);case 4:return mh(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=vr(t,null,i,n):Je(e,t,i,n),t.child;case 11:return ix(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,Jr(e,t),Je(e,t,i,n),t.child;case 8:return Je(e,t,t.pendingProps.children,n),t.child;case 12:return Je(e,t,t.pendingProps.children,n),t.child;case 10:return fx(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,mr(t),s=mn(s),i=i(s),t.flags|=1,Je(e,t,i,n),t.child;case 14:return sx(e,t,t.type,t.pendingProps,n);case 15:return Ib(e,t,t.type,t.pendingProps,n);case 19:return lg(e,t,n);case 31:return $w(e,t,n);case 22:return Pb(e,t,n,t.pendingProps);case 24:return mr(t),i=mn(Xe),e===null?(s=$g(),s===null&&(s=_e,a=jg(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},e0(t),ha(t,Xe,s)):((e.lanes&n)!==0&&(Jm(e,t),Yl(t,null,null,n),ql()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),ha(t,Xe,i)):(i=a.cache,ha(t,Xe,i),i!==s.cache&&Ym(t,[Xe],n,!0))),Je(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:zt&&Kh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:Jr(e,t),Je(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(j(156,t.tag))}function Rs(e){e.flags|=4}function pm(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?Gx(t,i):Gx(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(dM())e.flags|=8192;else throw hr=Eh,t0}else e.flags&=-16777217}function dx(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!VM(t))if(dM())e.flags|=8192;else throw hr=Eh,t0}function Vu(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?cS():536870912,e.lanes|=t,To|=t)}function Ul(e,t){if(!zt)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function nC(e,t,n){var i=t.pendingProps;switch(Qg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Ee(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Ls(Xe),So(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Yr(t)?Rs(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,cm())),Ee(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(Rs(t),a!==null?(Ee(t),dx(t,a)):(Ee(t),pm(t,s,null,i,n))):a?a!==e.memoizedState?(Rs(t),Ee(t),dx(t,a)):(Ee(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Rs(t),Ee(t),pm(t,s,e,i,n)),null;case 27:if(gh(t),n=ma.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Rs(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return Ee(t),t.subtreeFlags&=-33554433,null}e=hs.current,Yr(t)?Hy(t,e):(e=BM(s,i,n),t.stateNode=e,Rs(t))}return Ee(t),t.subtreeFlags&=-33554433,null;case 5:if(gh(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Rs(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return Ee(t),t.subtreeFlags&=-33554433,null}if(a=hs.current,Yr(t))Hy(t,a);else{var r=hc(ma.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[pn]=t,a[Zn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(_n(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Rs(t)}}return Ee(t),t.subtreeFlags&=-33554433,pm(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Rs(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(j(166));if(e=ma.current,Yr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=on,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[pn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||TM(e.nodeValue,n)),e||Aa(t,!0)}else e=hc(e).createTextNode(i),e[pn]=t,t.stateNode=e}return Ee(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Yr(t),n!==null){if(e===null){if(!i)throw Error(j(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(557));e[pn]=t}else dr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),e=!1}else n=cm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(si(t),t):(si(t),null);if((t.flags&128)!==0)throw Error(j(558))}return Ee(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=Yr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(j(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(j(317));s[pn]=t}else dr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),s=!1}else s=cm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(si(t),t):(si(t),null)}return si(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Vu(t,t.updateQueue),Ee(t),null);case 4:return So(),e===null&&w0(t.stateNode.containerInfo),t.flags|=67108864,Ee(t),null;case 10:return Ls(t.type),Ee(t),null;case 19:if(i0(t),i=t.memoizedState,i===null)return Ee(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Ul(i,!1);else{if(Be!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=Ah(e),a!==null){for(t.flags|=128,Ul(i,!1),e=a.updateQueue,t.updateQueue=e,Vu(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)HS(n,e),n=n.sibling;return oc(t,vn.current&1|2),zt&&Ns(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&oi()>Ph&&(t.flags|=128,s=!0,Ul(i,!1),t.lanes=4194304)}else{if(!s)if(e=Ah(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Vu(t,e),Ul(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!zt)return Ee(t),null}else 2*oi()-i.renderingStartTime>Ph&&n!==536870912&&(t.flags|=128,s=!0,Ul(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=oi(),e.sibling=null,a=vn.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||zt?oc(t,a):(n=a,Ae(yn,t),Ae(vn,n),Tn===null&&(Tn=t)),zt&&Ns(t,i.treeForkCount),e}return Ee(t),null;case 22:case 23:return si(t),n0(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),n=t.updateQueue,n!==null&&Vu(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&gn(ur),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ls(Xe),Ee(t),null;case 25:return null;case 30:return t.flags|=33554432,Ee(t),null}throw Error(j(156,t.tag))}function iC(e,t){switch(Qg(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ls(Xe),So(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return gh(t),null;case 31:if(t.memoizedState!==null){if(si(t),t.alternate===null)throw Error(j(340));dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(si(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return i0(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return So(),null;case 10:return Ls(t.type),null;case 22:case 23:return si(t),n0(),e!==null&&gn(ur),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ls(Xe),null;case 25:return null;default:return null}}function zb(e,t){switch(Qg(t),t.tag){case 3:Ls(Xe),So();break;case 26:case 27:case 5:gh(t);break;case 4:So();break;case 31:t.memoizedState!==null&&si(t);break;case 13:si(t);break;case 19:i0(t);break;case 10:Ls(t.type);break;case 22:case 23:si(t),n0(),e!==null&&gn(ur);break;case 24:Ls(Xe)}}function Ec(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){de(t,t.return,o)}}function Ca(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(f){de(s,l,f)}}}i=i.next}while(i!==a)}}catch(f){de(t,t.return,f)}}function Hb(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{KS(t,n)}catch(i){de(e,e.return,i)}}}function Vb(e,t,n){n.props=yr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){de(e,t,i)}}function as(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=Is(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=DM(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new fi(e);Yn(e.child,!1,WC,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){de(e,t,o)}}function dn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){de(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){de(e,t,s)}else n.current=null}function Dh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)IM(e.stateNode,t[n])}function px(e){for(var t=e.return;t!==null&&(x0(t)&&IM(e.stateNode,t.stateNode),!y0(t));)t=t.return}function Kl(e){for(var t=e.return;t!==null&&(x0(t)&&qC(e.stateNode,t.stateNode),!y0(t));)t=t.return}function y0(e){return e.tag===5||e.tag===3||e.tag===27}function x0(e){return e&&e.tag===7&&e.stateNode!==null}function cg(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){de(e,e.return,s)}}function mm(e,t,n){try{var i=e.stateNode;wC(i,e.type,n,t),i[Zn]=t}catch(s){de(e,e.return,s)}}function Gb(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Da(e.type)||e.tag===4}function gm(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Gb(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Da(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ug(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ls)),Dh(e,i),ee=!0;else if(s!==4&&(s===27&&(Dh(e,i),i=null,Da(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(ug(e,t,n,i),e=e.sibling;e!==null;)ug(e,t,n,i),e=e.sibling}function Uh(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),Dh(e,i),ee=!0;else if(s!==4&&(s===27&&(Dh(e,i),i=null,Da(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Uh(e,t,n,i),e=e.sibling;e!==null;)Uh(e,t,n,i),e=e.sibling}function kb(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);_n(t,i,n),t[pn]=e,t[Zn]=n}catch(a){de(e,e.return,a)}}var Lh=!1,ai=null;function mx(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Lh=!0)}var rs=null;function gx(){var e=rs;return rs=null,e}var Xn=0;function Bo(e,t,n,i,s){return Xn=0,Xb(e.child,t,n,i,s)}function Xb(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Ng(r);i.push(o),o.view&&(a=!0)}else a||Ng(r).view&&(a=!0);Lh=!0,CM(r,Xn===0?t:t+"_"+Xn,n),Xn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||Xb(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function ds(e,t){for(;e!==null;)e.tag===5?RM(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||ds(e.child,t)),e=e.sibling}function ah(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ah(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(j(544));var n=t.name;t=Vs(t.default,t.share),t!=="none"&&(Bo(e,n,t,null,!1)||ds(e.child,!1))}e=e.sibling}}function hg(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=Is(i,n),a=Vs(i.default,n.paired?i.share:i.enter);a!=="none"?Bo(e,s,a,null,!1)?(ah(e),n.paired||t||Ao(e,i.onEnter)):ds(e.child,!1):ah(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)hg(e,t),e=e.sibling;else ah(e)}function fg(e){if(ai!==null&&ai.size!==0){var t=ai;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=Vs(n.default,n.share);if(a!=="none"&&(Bo(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,Ao(e,n.onShare)):ds(e.child,!1)),t.delete(i),t.size===0)break}}}fg(e)}e=e.sibling}}}function dg(e){if(e.tag===30){var t=e.memoizedProps,n=Is(t,e.stateNode),i=ai!==null?ai.get(n):void 0,s=Vs(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(Bo(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,ai.delete(n),Ao(e,t.onShare)):Ao(e,t.onExit):ds(e.child,!1)),ai!==null&&fg(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)dg(e),e=e.sibling;else ai!==null&&fg(e)}function Wb(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Is(t,e.stateNode);t=Vs(t.default,t.update),e.flags&=-5,t!=="none"&&Bo(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&Wb(e);e=e.sibling}}function pg(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,ds(e.child,!1))}pg(e)}e=e.sibling}}function rh(e){if(e.tag===30)e.stateNode.paired=null,ds(e.child,!1),pg(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)rh(e),e=e.sibling;else pg(e)}function qb(e){for(e=e.child;e!==null;)e.tag===30?ds(e.child,!1):(e.subtreeFlags&33554432)!==0&&qb(e),e=e.sibling}function S0(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&Xn<a.length){var c=a[Xn],f=Ng(l);(c.view||f.view)&&(o=!0);var p;if(p=(e.flags&4)===0)if(f.clip)p=!0;else{p=c.rect;var u=f.rect;p=p.y!==u.y||p.x!==u.x||p.height!==u.height||p.width!==u.width}p&&(e.flags|=4),f.abs?f=!c.abs:(c=c.rect,f=f.rect,f=c.height!==f.height||c.width!==f.width),f&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&CM(l,Xn===0?n:n+"_"+Xn,s),o&&(e.flags&4)!==0||(rs===null&&(rs=[]),rs.push(l,Xn===0?i:i+"_"+Xn,t.memoizedProps)),Xn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:S0(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function Yb(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=Is(n,i),a=Vs(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(LC)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;Xn=0,s=S0(i,o,s,s,a,r,!1),(e.flags&4)!==0&&s&&(t||Ao(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&Yb(e,t);e=e.sibling}}var sn=!1,oe=!1,ns=!1,vm=!1,vx=typeof WeakSet=="function"?WeakSet:Set,an=null,is=!1,Hl=!1,Oh=!1,mg=!1;function sC(e,t,n){if(e=e.containerInfo,wg=Uo,e=US(e),Yg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,f=0,p=0,u=e,d=null;e:for(;;){for(var g;u!==i||a!==0&&u.nodeType!==3||(l=o+a),u!==r||s!==0&&u.nodeType!==3||(c=o+s),u.nodeType===3&&(o+=u.nodeValue.length),(g=u.firstChild)!==null;)d=u,u=g;for(;;){if(u===e)break e;if(d===i&&++f===a&&(l=o),d===r&&++p===s&&(c=o),(g=u.nextSibling)!==null)break;u=d,d=u.parentNode}u=g}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(Cg={focusedElem:e,selectionRange:i},Uo=!1,n=(n&335544064)===n,an=t,t=n?9270:1024;an!==null;){if(e=an,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&dg(i[a]);if(e.alternate===null&&(e.flags&2)!==0)n&&mx(e),Gu(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&dg(i),Gu(n);continue}else if(i!==null&&i.memoizedState!==null){n&&mx(e),Gu(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,an=i):(n&&Wb(e),Gu(n))}}ai=null}function Gu(e){for(;an!==null;){var t=an,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((s&1024)!==0&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=yr(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){de(t,t.return,o)}}break;case 3:if((s&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)Dg(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":Dg(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=Is(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=Vs(s.default,s.update),s!=="none"&&Bo(i,n,s,i.memoizedState=[],!0));break;default:if((s&1024)!==0)throw Error(j(163))}if(i=t.sibling,i!==null){i.return=t.return,an=i;break}an=t.return}}function Zb(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:ss(e,n),i&4&&Ec(5,n);break;case 1:if(ss(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){de(n,n.return,r)}else{var s=yr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){de(n,n.return,r)}}i&64&&Hb(n),i&512&&as(n,n.return);break;case 3:if(ss(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{KS(e,t)}catch(r){de(n,n.return,r)}}break;case 27:t===null&&i&4&&kb(n);case 26:case 5:ss(e,n),t===null&&i&4&&cg(n),i&512&&as(n,n.return);break;case 12:ss(e,n);break;case 31:ss(e,n),i&4&&jb(e,n);break;case 13:ss(e,n),i&4&&$b(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=gC.bind(null,n),JC(e,n))));break;case 22:if(i=n.memoizedState!==null||sn,!i){var a=t!==null&&t.memoizedState!==null||oe;t=sn,s=oe,sn=i,(oe=a)&&!s?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),Pi(e,n,i)):ss(e,n),sn=t,oe=s}break;case 30:ss(e,n),i&512&&as(n,n.return);break;case 7:i&512&&as(n,n.return);default:ss(e,n)}}function gg(e,t){for(e=e.child;e!==null;)Jb(e,t),e=e.sibling}function Jb(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){de(e,e.return,l)}vg(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,ee=!0}catch(l){de(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?Lx(o,!0):Lx(e.stateNode,!1)}catch(l){de(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&gg(e,t);break;default:gg(e,t)}}function vg(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:Jb(n,i);break t;case 22:n.memoizedState===null&&vg(n,i);break t;default:vg(n,i)}}e=e.sibling}}function Kb(e){var t=e.alternate;t!==null&&(e.alternate=null,Kb(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Xh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var De=null,Gn=!1;function Ii(e,t,n){for(n=n.child;n!==null;)Qb(e,t,n),n=n.sibling}function Qb(e,t,n){if(li&&typeof li.onCommitFiberUnmount=="function")try{li.onCommitFiberUnmount(vc,n)}catch{}switch(n.tag){case 26:oe||dn(n,t),Ii(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!oe&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:oe||dn(n,t),Kl(n);var i=De,s=Gn;Da(n.type)&&(De=n.stateNode,Gn=!1),Ii(e,t,n),FM(n.stateNode,n.type,n.memoizedProps),De=i,Gn=s;break;case 5:oe||dn(n,t),Kl(n);case 6:if(n.tag===6&&Kl(n),i=De,s=Gn,De=null,Ii(e,t,n),De=i,Gn=s,De!==null)if(Gn)try{(De.nodeType===9?De.body:De.nodeName==="HTML"?De.ownerDocument.body:De).removeChild(n.stateNode),ee=!0}catch(a){de(n,t,a)}else try{De.removeChild(n.stateNode),ee=!0}catch(a){de(n,t,a)}break;case 18:De!==null&&(Gn?(e=De,Ux(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Lo(e)):Ux(De,n.stateNode));break;case 4:i=De,s=Gn,De=n.stateNode.containerInfo,Gn=!0,Ii(e,t,n),De=i,Gn=s;break;case 0:case 11:case 14:case 15:Ca(2,n,t),oe||Ca(4,n,t),Ii(e,t,n);break;case 1:oe||(dn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Vb(n,t,i)),Ii(e,t,n);break;case 21:Ii(e,t,n);break;case 22:oe=(i=oe)||n.memoizedState!==null,Ii(e,t,n),oe=i;break;case 30:dn(n,t),Ii(e,t,n);break;case 7:oe||dn(n,t),Ii(e,t,n);break;default:Ii(e,t,n)}}function jb(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Lo(e)}catch(n){de(t,t.return,n)}}}function $b(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Lo(e)}catch(n){de(t,t.return,n)}}function aC(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new vx),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new vx),t;default:throw Error(j(435,e.tag))}}function ku(e,t){var n=aC(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=vC.bind(null,e,i);i.then(s,s)}})}function In(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(Da(l.type)){De=l.stateNode,Gn=!1;break t}break;case 5:De=l.stateNode,Gn=!1;break t;case 3:case 4:De=l.stateNode.containerInfo,Gn=!0;break t}l=l.return}if(De===null)throw Error(j(160));Qb(r,o,a),De=null,Gn=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)tM(t,e,n),t=t.sibling}var Bi=null;function tM(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}In(t,e,n),Pn(e),s&4&&(Ca(3,e,e.return),Ec(3,e),Ca(5,e,e.return));break;case 1:In(t,e,n),Pn(e),s&512&&(oe||i===null||dn(i,i.return)),s&64&&sn&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=Bi,In(t,e,n),Pn(e),s&512&&(oe||i===null||dn(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(sn)e.stateNode=wM(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[xc]||i[pn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),_n(i,t,n),i[pn]=e,rn(i),t=i;break t;case"link":if(a=Vx("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),_n(i,t,n),s.head.appendChild(i);break;case"meta":if(a=Vx("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),_n(i,t,n),s.head.appendChild(i);break;default:throw Error(j(468,t))}i[pn]=e,rn(i),t=i}e.stateNode=t}else sn||Og(a,e.type,e.stateNode);else e.stateNode=Hx(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||oe||t.parentNode.removeChild(t)):s.count--,n===null?sn||Og(a,e.type,e.stateNode):Hx(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&mm(e,e.memoizedProps,i.memoizedProps);break;case 27:In(t,e,n),Pn(e),s&512&&(oe||i===null||dn(i,i.return)),i!==null&&s&4&&mm(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=ns,ns=!1,In(t,e,n),ns=a,Pn(e),s&512&&(oe||i===null||dn(i,i.return)),e.flags&32){t=e.stateNode;try{Mo(t,""),ee=!0}catch(f){de(e,e.return,f)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,mm(e,t,i!==null?i.memoizedProps:t)),s&1024&&(vm=!0);break;case 6:if(In(t,e,n),Pn(e),s&4){if(e.stateNode===null)throw Error(j(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,ee=!0}catch(f){de(e,e.return,f)}}break;case 3:if(ee=!1,uh=null,a=Bi,Bi=fc(t.containerInfo),In(t,e,n),Bi=a,Pn(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{Lo(t.containerInfo)}catch(f){de(e,e.return,f)}vm&&(vm=!1,eM(e)),ee=!1;break;case 4:s=ns,ns=sn,i=My(),a=Bi,Bi=fc(e.stateNode.containerInfo),In(t,e,n),Pn(e),Bi=a,ee&&Hl&&(Oh=!0),ee=i,ns=s;break;case 12:In(t,e,n),Pn(e);break;case 31:In(t,e,n),Pn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:In(t,e,n),Pn(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(sf=oi()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=sn,l=oe,c=ns;sn=o||a,ns=c||a,oe=l||r,In(t,e,n),oe=l,ns=c,sn=o,Pn(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||sn||oe||(t=r||oe,n=sn,i=oe,sn=a||sn,oe=t,aa(e,2),sn=n,oe=i),!a&&ns||gg(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:In(t,e,n),Pn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:s&512&&(oe||i===null||dn(i,i.return)),s=My(),a=Hl,r=(n&335544064)===n,o=e.memoizedProps,Hl=r&&Vs(o.default,o.update)!=="none",In(t,e,n),Pn(e),r&&i!==null&&ee&&(e.flags|=4),Hl=a,ee=s;break;case 21:break;case 7:s&512&&(oe||i===null||dn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:In(t,e,n),Pn(e)}}function Pn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(Gb(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(x0(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(y0(s))break;s=s.return}var r=i;if(n==null)throw Error(j(160));switch(n.tag){case 27:var o=n.stateNode,l=gm(e);Uh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(Mo(c,""),n.flags&=-33);var f=gm(e);Uh(e,f,c,r);break;case 3:case 4:var p=n.stateNode.containerInfo,u=gm(e);ug(e,u,p,r);break;default:throw Error(j(161))}}catch(d){de(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function eM(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;eM(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,Uo=!0,t.reset(),Uo=!1),e=e.sibling}}function Zr(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)nM(t,e),t=t.sibling;else Yb(t,!1)}function nM(e,t){var n=e.alternate;if(n===null)hg(e,!1);else switch(e.tag){case 3:if(mg=is=!1,gx(),Zr(t,e),!is&&!Oh){if(e=rs,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];RM(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),mg=!0}rs=null;break;case 5:Zr(t,e);break;case 4:i=is,is=!1,Zr(t,e),is&&(Oh=!0),is=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?hg(e,!1):Zr(t,e));break;case 30:i=is,s=gx(),is=!1,Zr(t,e),is&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=Is(a,r),r=Is(n.memoizedProps,r);var o=Vs(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Xn=0,t=S0(e,n,t,r,o,a,!0),Xn!==(a===null?0:a.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(Ao(e,e.memoizedProps.onUpdate),rs=s):s!==null&&(s.push.apply(s,rs),rs=s),is=(e.flags&32)!==0?!0:i;break;default:Zr(t,e)}}function ss(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Zb(e,t.alternate,t),t=t.sibling}function aa(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:Ca(4,n,n.return),aa(n,i);break;case 1:dn(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&Vb(n,n.return,s),aa(n,i);break;case 27:(i&2)!==0&&FM(n.stateNode,n.type,n.memoizedProps);case 5:dn(n,n.return),n.tag!==5&&n.tag!==27||Kl(n),aa(n,i);break;case 6:Kl(n);break;case 26:dn(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||oe||s.parentNode.removeChild(s),aa(n,i);break;case 22:n.memoizedState===null&&aa(n,i);break;case 30:dn(n,n.return),aa(n,i);break;case 7:dn(n,n.return);default:aa(n,i)}e=e.sibling}}function Pi(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:Pi(s,a,n),Ec(4,a);break;case 1:if(Pi(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(f){de(i,i.return,f)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)JS(c[s],l)}catch(f){de(i,i.return,f)}}o&&r&64&&Hb(a),as(a,a.return);break;case 27:(n&2)!==0&&kb(a);case 5:a.tag!==5&&a.tag!==27||px(a),Pi(s,a,n),o&&i===null&&r&4&&cg(a),as(a,a.return);break;case 6:px(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||sn||Og(fc(l.ownerDocument),a.type,l),Pi(s,a,n),o&&i===null&&r&4&&cg(a),as(a,a.return);break;case 12:Pi(s,a,n);break;case 31:Pi(s,a,n),o&&r&4&&jb(s,a);break;case 13:Pi(s,a,n),o&&r&4&&$b(s,a);break;case 22:a.memoizedState===null&&Pi(s,a,n),as(a,a.return);break;case 30:Pi(s,a,n),as(a,a.return);break;case 7:as(a,a.return);default:Pi(s,a,n)}t=t.sibling}}function b0(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&bc(n))}function M0(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&bc(e))}function Si(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)iM(e,t,n,i),t=t.sibling;else s&&qb(t)}function iM(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&rh(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Si(e,t,n,i),a&2048&&Ec(9,t);break;case 1:Si(e,t,n,i);break;case 3:Si(e,t,n,i),s&&mg&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&bc(a)));break;case 12:if(a&2048){Si(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){de(t,t.return,c)}}else Si(e,t,n,i);break;case 31:Si(e,t,n,i);break;case 13:Si(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&rh(o),r._visibility&2?Si(e,t,n,i):Ql(e,t)):(s&&o!==null&&o.memoizedState!==null&&rh(t),r._visibility&2?Si(e,t,n,i):(r._visibility|=2,Kr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&b0(o,t);break;case 24:Si(e,t,n,i),a&2048&&M0(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(ds(a.child,!0),ds(t.child,!0))),Si(e,t,n,i);break;default:Si(e,t,n,i)}}function Kr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Kr(a,r,o,l,s),Ec(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?Kr(a,r,o,l,s):Ql(a,r):(f._visibility|=2,Kr(a,r,o,l,s)),s&&c&2048&&b0(r.alternate,r);break;case 24:Kr(a,r,o,l,s),s&&c&2048&&M0(r.alternate,r);break;default:Kr(a,r,o,l,s)}t=t.sibling}}function Ql(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:Ql(n,i),s&2048&&b0(i.alternate,i);break;case 24:Ql(n,i),s&2048&&M0(i.alternate,i);break;default:Ql(n,i)}t=t.sibling}}var ar=8192;function nr(e,t,n){if(e.subtreeFlags&ar)for(e=e.child;e!==null;)sM(e,t,n),e=e.sibling}function sM(e,t,n){switch(e.tag){case 26:nr(e,t,n),e.flags&ar&&(e.memoizedState!==null?cR(n,Bi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&kx(n,e)));break;case 5:nr(e,t,n),e.flags&ar&&(e=e.stateNode,(t&335544128)===t&&kx(n,e));break;case 3:case 4:var i=Bi;Bi=fc(e.stateNode.containerInfo),nr(e,t,n),Bi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=ar,ar=16777216,nr(e,t,n),ar=i):nr(e,t,n));break;case 30:if((e.flags&ar)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,ai===null&&(ai=new Map),ai.set(i,s)}nr(e,t,n);break;default:nr(e,t,n)}}function aM(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ll(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];an=i,oM(i,e)}aM(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)rM(e),e=e.sibling}function rM(e){switch(e.tag){case 0:case 11:case 15:Ll(e),e.flags&2048&&Ca(9,e,e.return);break;case 3:Ll(e);break;case 12:Ll(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,oh(e)):Ll(e);break;default:Ll(e)}}function oh(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];an=i,oM(i,e)}aM(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ca(8,t,t.return),oh(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,oh(t));break;default:oh(t)}e=e.sibling}}function oM(e,t){for(;an!==null;){var n=an;switch(n.tag){case 0:case 11:case 15:Ca(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:bc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,an=i;else t:for(n=e;an!==null;){i=an;var s=i.sibling,a=i.return;if(Kb(i),i===n){an=null;break t}if(s!==null){s.return=a,an=s;break t}an=a}}}var rC={getCacheForType:function(e){var t=mn(Xe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return mn(Xe).controller.signal}},oC=typeof WeakMap=="function"?WeakMap:Map,ne=0,_e=null,Xt=null,Yt=0,he=0,ni=null,fa=!1,Fo=!1,E0=!1,zs=0,Be=0,Ra=0,fr=0,Ih=0,ri=0,To=0,jl=null,kn=null,_g=!1,sf=0,lM=0,Ph=1/0,Bh=null,Sa=null,Oe=0,zi=null,xr=null,fs=0,yg=0,xg=null,cM=null,_o=null,yo=null,xo=null,$l=0,lh=null;function ui(){return(ne&2)!==0&&Yt!==0?Yt&-Yt:Nt.T!==null?A0():dS()}function uM(){if(ri===0)if((Yt&536870912)===0||zt){var e=Nu;Nu<<=1,(Nu&3932160)===0&&(Nu=262144),ri=e}else ri=536870912;return e=yn.current,e!==null&&(e.flags|=32),ri}function Ao(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=DM(Is(e.memoizedProps,n))),yo===null&&(yo=[]),yo.push(t.bind(null,i))}}function qn(e,t,n){(e===_e&&(he===2||he===9)||e.cancelPendingCommit!==null)&&(wo(e,0),da(e,Yt,ri,!1)),yc(e,n),((ne&2)===0||e!==_e)&&(e===_e&&((ne&2)===0&&(fr|=n),Be===4&&da(e,Yt,ri,!1)),ms(e))}function hM(e,t,n){if((ne&6)!==0)throw Error(j(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||_c(e,t),s=i?uC(e,t):_m(e,t,!0),a=i;do{if(s===0){Fo&&!i&&da(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!lC(n)){s=_m(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=jl;var l=o.current.memoizedState.isDehydrated;if(l&&(wo(o,r).flags|=256),r=_m(o,r,!1),r!==2&&r!==6){if(E0&&!l){o.errorRecoveryDisabledLanes|=a,fr|=a,s=4;break t}a=kn,kn=s,a!==null&&(kn===null?kn=a:kn.push.apply(kn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){wo(e,0),da(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(j(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:da(i,t,ri,!fa);break t;case 2:kn=null;break;case 3:case 5:break;default:throw Error(j(329))}if((t&62914560)===t&&(s=sf+300-oi(),10<s)){if(da(i,t,ri,!fa),kh(i,0,!0)!==0)break t;fs=t,i.timeoutHandle=C0(_x.bind(null,i,n,kn,Bh,_g,t,ri,fr,To,fa,a,"Throttled",-0,0),s);break t}_x(i,n,kn,Bh,_g,t,ri,fr,To,fa,a,null,-0,0)}}break}while(!0);ms(e)}function _x(e,t,n,i,s,a,r,o,l,c,f,p,u,d){e.timeoutHandle=-1;var g=t.subtreeFlags,b=(a&335544064)===a;if(p=null,(b||g&8192||(g&16785408)===16785408)&&(p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ls},ai=null,sM(t,a,p),b&&(g=p,b=e.containerInfo,b=(b.nodeType===9?b:b.ownerDocument).__reactViewTransition,b!=null&&(g.count++,g.waitingForViewTransition=!0,g=dc.bind(g),b.finished.then(g,g))),g=(a&62914560)===a?sf-oi():(a&4194048)===a?lM-oi():0,g=uR(p,g),g!==null)){fs=a,e.cancelPendingCommit=g(xx.bind(null,e,t,a,n,i,s,r,o,l,c,f,p,null,u,d)),da(e,a,r,!c);return}xx(e,t,a,n,i,s,r,o,l,c,f,p)}function lC(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!hi(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function da(e,t,n,i){t=lS(e,t),t&=~Ih,t&=~fr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-ci(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&uS(e,n,t)}function af(){return(ne&6)===0?(Tc(0,!1),!1):!0}function T0(){if(Xt!==null){if(he===0)var e=Xt.return;else e=Xt,Ds=Tr=null,l0(e),mo=null,rc=0,e=Xt;for(;e!==null;)zb(e.alternate,e),e=e.return;Xt=null}}function wo(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,NC(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),fs=0,T0(),_e=e,Xt=n=Us(e.current,null),Yt=t,he=0,ni=null,fa=!1,Fo=_c(e,t),E0=!1,To=ri=Ih=fr=Ra=Be=0,kn=jl=null,_g=!1,zs=lS(e,t),Zh(),n}function fM(e,t){Pt=null,Nt.H=Rh,t===Po||t===Qh?(t=Wy(),he=3):t===t0?(t=Wy(),he=4):he=t===g0?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ni=t,Xt===null&&(Be=1,Nh(e,Ai(t,e.current)))}function dM(){var e=yn.current;return e===null?!0:(Yt&4194048)===Yt?Tn===null:(Yt&62914560)===Yt||(Yt&536870912)!==0?e===Tn:!1}function pM(){var e=Nt.H;return Nt.H=Rh,e===null?Rh:e}function mM(){var e=Nt.A;return Nt.A=rC,e}function Fh(){Be=4,fa||(Yt&4194048)!==Yt&&yn.current!==null||(Fo=!0),(Ra&134217727)===0&&(fr&134217727)===0||_e===null||da(_e,Yt,ri,!1)}function _m(e,t,n){var i=ne;ne|=2;var s=pM(),a=mM();(_e!==e||Yt!==t)&&(Bh=null,wo(e,t)),t=!1;var r=Be;t:do try{if(he!==0&&Xt!==null){var o=Xt,l=ni;switch(he){case 8:T0(),r=6;break t;case 3:case 2:case 9:case 6:yn.current===null&&(t=!0);var c=he;if(he=0,ni=null,co(e,o,l,c),n&&Fo){r=0;break t}break;default:c=he,he=0,ni=null,co(e,o,l,c)}}cC(),r=Be;break}catch(f){fM(e,f)}while(!0);return t&&e.shellSuspendCounter++,Ds=Tr=null,ne=i,Nt.H=s,Nt.A=a,Xt===null&&(_e=null,Yt=0,Zh()),r}function cC(){for(;Xt!==null;)gM(Xt)}function uC(e,t){var n=ne;ne|=2;var i=pM(),s=mM();_e!==e||Yt!==t?(Bh=null,Ph=oi()+500,wo(e,t)):Fo=_c(e,t);t:do try{if(he!==0&&Xt!==null){t=Xt;var a=ni;e:switch(he){case 1:he=0,ni=null,co(e,t,a,1);break;case 2:case 9:if(Xy(a)){he=0,ni=null,yx(t);break}t=function(){he!==2&&he!==9||_e!==e||(he=7),ms(e)},a.then(t,t);break t;case 3:he=7;break t;case 4:he=5;break t;case 7:Xy(a)?(he=0,ni=null,yx(t)):(he=0,ni=null,co(e,t,a,7));break;case 5:var r=null;switch(Xt.tag){case 26:r=Xt.memoizedState;case 5:case 27:var o=Xt;if(r?VM(r):o.stateNode.complete){he=0,ni=null;var l=o.sibling;if(l!==null)Xt=l;else{var c=o.return;c!==null?(Xt=c,rf(c)):Xt=null}break e}}he=0,ni=null,co(e,t,a,5);break;case 6:he=0,ni=null,co(e,t,a,6);break;case 8:T0(),Be=6;break t;default:throw Error(j(462))}}hC();break}catch(f){fM(e,f)}while(!0);return Ds=Tr=null,Nt.H=i,Nt.A=s,ne=n,Xt!==null?0:(_e=null,Yt=0,Zh(),Be)}function hC(){for(;Xt!==null&&!CA();)gM(Xt)}function gM(e){var t=Fb(e.alternate,e,zs);e.memoizedProps=e.pendingProps,t===null?rf(e):Xt=t}function yx(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=ox(n,t,t.pendingProps,t.type,void 0,Yt);break;case 11:t=ox(n,t,t.pendingProps,t.type.render,t.ref,Yt);break;case 5:l0(t);var i=t;i===on&&(zt?(bh(i),i.tag===5&&i.stateNode!=null&&(Te=i.stateNode)):(bh(i),zt=!0));default:zb(n,t),t=Xt=HS(t,zs),t=Fb(n,t,zs)}e.memoizedProps=e.pendingProps,t===null?rf(e):Xt=t}function co(e,t,n,i){Ds=Tr=null,l0(t),mo=null,rc=0;var s=t.return;try{if(jw(e,s,t,n,Yt)){Be=1,Nh(e,Ai(n,e.current)),Xt=null;return}}catch(a){if(s!==null)throw Xt=s,a;Be=1,Nh(e,Ai(n,e.current)),Xt=null;return}t.flags&32768?(zt||i===1?e=!0:Fo||(Yt&536870912)!==0?e=!1:(fa=e=!0,(i===2||i===9||i===3||i===6)&&(i=yn.current,i!==null&&i.tag===13&&(i.flags|=16384))),vM(t,e)):rf(t)}function rf(e){var t=e;do{if((t.flags&32768)!==0){vM(t,fa);return}e=t.return;var n=nC(t.alternate,t,zs);if(n!==null){Xt=n;return}if(t=t.sibling,t!==null){Xt=t;return}Xt=t=e}while(t!==null);Be===0&&(Be=5)}function vM(e,t){do{var n=iC(e.alternate,e);if(n!==null){n.flags&=32767,Xt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Xt=e;return}Xt=e=n}while(e!==null);Be=6,Xt=null}function xx(e,t,n,i,s,a,r,o,l,c,f,p){e.cancelPendingCommit=null;do of();while(Oe!==0);if((ne&6)!==0)throw Error(j(327));if(t!==null){if(t===e.current)throw Error(j(177));e===_e&&(Xt=_e=null,Yt=0),xr=t,zi=e,fs=n,xg=s,cM=i,fC(e,t,n,r,o,l,p)}}function fC(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(yg=o,o|=Zg,FA(e,n,o,i,s,a),yo=null,(n&335544064)===n?(xo=Hw(e),i=10262):(xo=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,_C(vh,function(){return Eg(),null})):(e.callbackNode=null,e.callbackPriority=0),Lh=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Nt.T,Nt.T=null,s=ie.p,ie.p=2,a=ne,ne|=4;try{sC(e,t,n)}finally{ne=a,ie.p=s,Nt.T=i}}Oe=1,Lh?_o=PC(r,e.containerInfo,xo,Sg,bg,pC,Mg,Eg,dC,null,null):(Sg(),bg(),Mg())}function dC(e){if(Oe!==0){var t=zi.onRecoverableError;t(e,{componentStack:null})}}function pC(){Oe===3&&(Oe=0,nM(xr,zi),Oe=4)}function Sg(){if(Oe===1){Oe=0;var e=zi,t=xr,n=fs,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=Nt.T,Nt.T=null;var s=ie.p;ie.p=2;var a=ne;ne|=4;try{Hl=Oh=!1,tM(t,e,n),n=Cg;var r=US(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&DS(o.ownerDocument.documentElement,o)){if(l!==null&&Yg(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var d=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),m=l.end===void 0?b:Math.min(l.end,g);!d.extend&&b>m&&(r=m,m=b,b=r);var h=Py(o,b),v=Py(o,m);if(h&&v&&(d.rangeCount!==1||d.anchorNode!==h.node||d.anchorOffset!==h.offset||d.focusNode!==v.node||d.focusOffset!==v.offset)){var S=p.createRange();S.setStart(h.node,h.offset),d.removeAllRanges(),b>m?(d.addRange(S),d.extend(v.node,v.offset)):(S.setEnd(v.node,v.offset),d.addRange(S))}}}}for(p=[],d=o;d=d.parentNode;)d.nodeType===1&&p.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var _=p[o];_.element.scrollLeft=_.left,_.element.scrollTop=_.top}}Uo=!!wg,Cg=wg=null}finally{ne=a,ie.p=s,Nt.T=i}}e.current=t,Oe=2}}function bg(){if(Oe===2){Oe=0;var e=zi,t=xr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Nt.T,Nt.T=null;var i=ie.p;ie.p=2;var s=ne;ne|=4;try{Zb(e,t.alternate,t)}finally{ne=s,ie.p=i,Nt.T=n}}Oe=3}}function Mg(){if(Oe===4||Oe===3){Oe=0;var e=_o;_o=null,RA();var t=zi,n=xr,i=fs,s=cM,a=(i&335544064)===i?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Oe=5:(Oe=0,xr=zi=null,_M(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(Sa=null),Vg(i),n=n.stateNode,li&&typeof li.onCommitFiberRoot=="function")try{li.onCommitFiberRoot(vc,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=Nt.T,a=ie.p,ie.p=2,Nt.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{Nt.T=n,ie.p=a}}if(s=yo,r=xo,xo=null,s!==null&&(yo=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);(fs&3)!==0&&of(),ms(t),a=t.pendingLanes,(i&261930)!==0&&(a&42)!==0?t===lh?$l++:($l=0,lh=t):($l=0,lh=null),Tc(0,!1)}}function _M(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,bc(t)))}function of(){return _o!==null&&(_o.skipTransition(),_o=null),Sg(),bg(),Mg(),Eg()}function Eg(){if(Oe!==5)return!1;var e=zi,t=yg;yg=0;var n=Vg(fs),i=Nt.T,s=ie.p;try{ie.p=32>n?32:n,Nt.T=null,n=xg,xg=null;var a=zi,r=fs;if(Oe=0,xr=zi=null,fs=0,(ne&6)!==0)throw Error(j(331));var o=ne;if(ne|=4,rM(a.current),iM(a,a.current,r,n),ne=o,Tc(0,!1),li&&typeof li.onPostCommitFiberRoot=="function")try{li.onPostCommitFiberRoot(vc,a)}catch{}return!0}finally{ie.p=s,Nt.T=i,_M(e,t)}}function Sx(e,t,n){t=Ai(n,t),t=ig(e.stateNode,t,2),e=_a(e,t,2),e!==null&&(yc(e,2),ms(e))}function de(e,t,n){if(e.tag===3)Sx(e,e,n);else for(;t!==null;){if(t.tag===3){Sx(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Sa===null||!Sa.has(i))){e=Ai(n,e),n=Lb(2),i=_a(t,n,2),i!==null&&(Ob(n,i,t,e),yc(i,2),ms(i));break}}t=t.return}}function ym(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new oC;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(E0=!0,s.add(n),e=mC.bind(null,e,t,n),t.then(e,e))}function mC(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,_e===e&&(Yt&n)===n&&((Be===4||Be===3&&(Yt&62914560)===Yt&&300>oi()-sf)&&(ne&2)===0?wo(e,0):Ih|=n,To===Yt&&(To=0)),ms(e)}function yM(e,t){t===0&&(t=cS()),e=Er(e,t),e!==null&&(yc(e,t),ms(e))}function gC(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),yM(e,n)}function vC(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(j(314))}i!==null&&i.delete(t),yM(e,n)}function _C(e,t){return zg(e,t)}var Co=null,Qr=null,Tg=!1,zh=!1,xm=!1,pa=0;function ms(e){e!==Qr&&e.next===null&&(Qr===null?Co=Qr=e:Qr=Qr.next=e),zh=!0,Tg||(Tg=!0,xC())}function Tc(e,t){if(!xm&&zh){xm=!0;do for(var n=!1,i=Co;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-ci(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,bx(i,a))}else a=Yt,a=kh(i,i===_e?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||_c(i,a)||(n=!0,bx(i,a));i=i.next}while(n);xm=!1}}function yC(){xM()}function xM(){zh=Tg=!1;var e=0;pa!==0&&RC()&&(e=pa);for(var t=oi(),n=null,i=Co;i!==null;){var s=i.next,a=SM(i,t);a===0?(i.next=null,n===null?Co=s:n.next=s,s===null&&(Qr=n)):(n=i,(e!==0||(a&3)!==0)&&(zh=!0)),i=s}Oe!==0&&Oe!==5||Tc(e,!1),pa!==0&&(pa=0)}function SM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-ci(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=BA(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=_e,n=Yt,n=kh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(he===2||he===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&jp(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||_c(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&jp(i),Vg(n)){case 2:case 8:n=rS;break;case 32:n=vh;break;case 268435456:n=oS;break;default:n=vh}return i=bM.bind(null,e),n=zg(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&jp(i),e.callbackPriority=2,e.callbackNode=null,2}function bM(e,t){if(Oe!==0&&Oe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(of()&&e.callbackNode!==n)return null;var i=Yt;return i=kh(e,e===_e?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(hM(e,i,t),SM(e,oi()),e.callbackNode!=null&&e.callbackNode===n?bM.bind(null,e):null)}function bx(e,t){if(of())return null;hM(e,t,!0)}function xC(){DC(function(){(ne&6)!==0?zg(aS,yC):xM()})}function A0(){if(pa===0){var e=gr;e===0&&(e=Ru,Ru<<=1,(Ru&261888)===0&&(Ru=256)),pa=e}return pa}function Mx(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ku(e)}function SC(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=Mx((s[Zn]||null).action),r=i.submitter;r&&(t=(t=r[Zn]||null)?Mx(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Wh("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(pa!==0){var l=new FormData(s,r);eg(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),eg(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Xu=0;Xu<Xm.length;Xu++)Wu=Xm[Xu],Ex=Wu.toLowerCase(),Tx=Wu[0].toUpperCase()+Wu.slice(1),Hi(Ex,"on"+Tx);var Wu,Ex,Tx,Xu;Hi(OS,"onAnimationEnd");Hi(IS,"onAnimationIteration");Hi(PS,"onAnimationStart");Hi("dblclick","onDoubleClick");Hi("focusin","onFocus");Hi("focusout","onBlur");Hi(Uw,"onTransitionRun");Hi(Lw,"onTransitionStart");Hi(Ow,"onTransitionCancel");Hi(BS,"onTransitionEnd");bo("onMouseEnter",["mouseout","mouseover"]);bo("onMouseLeave",["mouseout","mouseover"]);bo("onPointerEnter",["pointerout","pointerover"]);bo("onPointerLeave",["pointerout","pointerover"]);br("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));br("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));br("onBeforeInput",["compositionend","keypress","textInput","paste"]);br("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));br("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));br("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bC=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cc));function MM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){yh(f)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){yh(f)}s.currentTarget=null,a=l}}}}function kt(e,t){var n=t[yy];n===void 0&&(n=t[yy]=new Set);var i=e+"__bubble";n.has(i)||(EM(t,e,2,!1),n.add(i))}function Sm(e,t,n){var i=0;t&&(i|=4),EM(n,e,i,t)}var qu="_reactListening"+Math.random().toString(36).slice(2);function w0(e){if(!e[qu]){e[qu]=!0,mS.forEach(function(n){n!=="selectionchange"&&(bC.has(n)||Sm(n,!1,e),Sm(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[qu]||(t[qu]=!0,Sm("selectionchange",!1,t))}}function EM(e,t,n,i){switch(ZM(t)){case 2:var s=pR;break;case 8:s=mR;break;default:s=O0}n=s.bind(null,t,n,e),s=void 0,!Hm||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function bm(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=rr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}MS(function(){var c=a,f=kg(n),p=[];t:{var u=FS.get(e);if(u!==void 0){var d=Wh,g=e;switch(e){case"keypress":if(ju(n)===0)break t;case"keydown":case"keyup":d=lw;break;case"focusin":g="focus",d=sm;break;case"focusout":g="blur",d=sm;break;case"beforeblur":case"afterblur":d=sm;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=wy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=KA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=dw;break;case OS:case IS:case PS:d=$A;break;case BS:d=mw;break;case"scroll":case"scrollend":d=ZA;break;case"wheel":d=vw;break;case"copy":case"cut":case"paste":d=ew;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=Ry;break;case"submit":d=hw;break;case"toggle":case"beforetoggle":d=yw}var b=(t&4)!==0,m=!b&&(e==="scroll"||e==="scrollend"),h=b?u!==null?u+"Capture":null:u;b=[];for(var v=c,S;v!==null;){var _=v;if(S=_.stateNode,_=_.tag,_!==5&&_!==26&&_!==27||S===null||h===null||(_=ec(v,h),_!=null&&b.push(uc(v,_,S))),m)break;v=v.return}0<b.length&&(u=new d(u,g,null,n,f),p.push({event:u,listeners:b}))}}if((t&7)===0){t:{if(d=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",d&&n!==zm&&(g=n.relatedTarget||n.fromElement)&&(rr(g)||g[Oo]))break t;(u||d)&&(g=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,u?(d=n.relatedTarget||n.toElement,u=c,d=d?rr(d):null,d!==null&&(m=gc(d),b=d.tag,d!==m||b!==5&&b!==27&&b!==6)&&(d=null)):(u=null,d=c),u!==d&&(b=wy,_="onMouseLeave",h="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(b=Ry,_="onPointerLeave",h="onPointerEnter",v="pointer"),m=u==null?g:Fl(u),S=d==null?g:Fl(d),g=new b(_,v+"leave",u,n,f),g.target=m,g.relatedTarget=S,_=null,rr(f)===c&&(b=new b(h,v+"enter",d,n,f),b.target=S,b.relatedTarget=m,_=b),m=_,b=u&&d?wm(u,d,MC):null,u!==null&&Ax(p,g,u,b,!1),d!==null&&m!==null&&Ax(p,m,d,b,!0)))}t:{if(u=c?Fl(c):window,d=u.nodeName&&u.nodeName.toLowerCase(),d==="select"||d==="input"&&u.type==="file")var E=Ly;else if(Uy(u))if(RS)E=Rw;else{E=ww;var T=Aw}else d=u.nodeName,!d||d.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Gg(c.elementType)&&(E=Ly):E=Cw;if(E&&(E=E(e,c))){CS(p,E,n,f);break t}T&&T(e,u,c)}switch(T=c?Fl(c):window,e){case"focusin":(Uy(T)||T.contentEditable==="true")&&(io=T,Gm=c,kl=null);break;case"focusout":kl=Gm=io=null;break;case"mousedown":km=!0;break;case"contextmenu":case"mouseup":case"dragend":km=!1,By(p,n,f);break;case"selectionchange":if(Dw)break;case"keydown":case"keyup":By(p,n,f)}var w;if(qg)t:{switch(e){case"compositionstart":var x="onCompositionStart";break t;case"compositionend":x="onCompositionEnd";break t;case"compositionupdate":x="onCompositionUpdate";break t}x=void 0}else no?AS(e,n)&&(x="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(TS&&n.locale!=="ko"&&(no||x!=="onCompositionStart"?x==="onCompositionEnd"&&no&&(w=ES()):(ua=f,Xg="value"in ua?ua.value:ua.textContent,no=!0)),T=Hh(c,x),0<T.length&&(x=new Cy(x,e,null,n,f),p.push({event:x,listeners:T}),w?x.data=w:(w=wS(n),w!==null&&(x.data=w)))),(w=Sw?bw(e,n):Mw(e,n))&&(x=Hh(c,"onBeforeInput"),0<x.length&&(T=new Cy("onBeforeInput","beforeinput",null,n,f),p.push({event:T,listeners:x}),T.data=w)),SC(p,e,c,n,f)}MM(p,t)})}function uc(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Hh(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=ec(e,n),s!=null&&i.unshift(uc(e,s,a)),s=ec(e,t),s!=null&&i.push(uc(e,s,a))),e.tag===3)return i;e=e.return}return[]}function MC(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Ax(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=ec(n,a),c!=null&&r.unshift(uc(n,c,l))):s||(c=ec(n,a),c!=null&&r.push(uc(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var EC=/\r\n?/g,TC=/\u0000|\uFFFD/g;function wx(e){return(typeof e=="string"?e:""+e).replace(EC,`
`).replace(TC,"")}function TM(e,t){return t=wx(t),wx(e)===t}function fe(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||Mo(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&Mo(e,""+i);else return;break;case"className":Uu(e,"class",i);break;case"tabIndex":Uu(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Uu(e,n,i);break;case"style":bS(e,i,a);return;case"data":if(t!=="object"){Uu(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ku(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&fe(e,t,"name",s.name,s,null),fe(e,t,"formEncType",s.formEncType,s,null),fe(e,t,"formMethod",s.formMethod,s,null),fe(e,t,"formTarget",s.formTarget,s,null)):(fe(e,t,"encType",s.encType,s,null),fe(e,t,"method",s.method,s,null),fe(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ku(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=ls);return;case"onScroll":i!=null&&kt("scroll",e);return;case"onScrollEnd":i!=null&&kt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(j(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Ku(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":kt("beforetoggle",e),kt("toggle",e),Ju(e,"popover",i);break;case"xlinkActuate":Cs(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Cs(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Cs(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Cs(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Cs(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Cs(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Cs(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Cs(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Cs(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Ju(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=qA.get(n)||n,Ju(e,n,i);else return}ee=!0}function Ag(e,t,n,i,s,a){switch(n){case"style":bS(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(j(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")Mo(e,i);else if(typeof i=="number"||typeof i=="bigint")Mo(e,""+i);else return;break;case"onScroll":i!=null&&kt("scroll",e);return;case"onScrollEnd":i!=null&&kt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=ls);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!gS.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[Zn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}ee=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Ju(e,n,i)}return}ee=!0}function _n(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":kt("error",e),kt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:fe(e,t,a,r,n,null)}}s&&fe(e,t,"srcSet",n.srcSet,n,null),i&&fe(e,t,"src",n.src,n,null);return;case"input":kt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":s=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":a=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(j(137,t));break;default:fe(e,t,i,f,n,null)}}yS(e,a,o,l,c,r,s,!1);return;case"select":kt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:fe(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?ho(e,!!i,t,!1):n!=null&&ho(e,!!i,n,!0);return;case"textarea":kt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(j(91));break;default:fe(e,t,r,o,n,null)}SS(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":fe(e,t,l,i,n,null));return;case"dialog":kt("beforetoggle",e),kt("toggle",e),kt("cancel",e),kt("close",e);break;case"iframe":case"object":kt("load",e);break;case"video":case"audio":for(i=0;i<cc.length;i++)kt(cc[i],e);break;case"image":kt("error",e),kt("load",e);break;case"details":kt("toggle",e);break;case"embed":case"source":case"link":kt("error",e),kt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:fe(e,t,c,i,n,null)}return;default:if(Gg(t)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Ag(e,t,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&fe(e,t,o,i,n,null))}var AC={};function wC(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,f=null;for(d in n){var p=n[d];if(n.hasOwnProperty(d)&&p!=null)switch(d){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(d)||fe(e,t,d,null,i,p)}}for(var u in i){var d=i[u];if(p=n[u],i.hasOwnProperty(u)&&(d!=null||p!=null))switch(u){case"type":d!==p&&(ee=!0),a=d;break;case"name":d!==p&&(ee=!0),s=d;break;case"checked":d!==p&&(ee=!0),c=d;break;case"defaultChecked":d!==p&&(ee=!0),f=d;break;case"value":d!==p&&(ee=!0),r=d;break;case"defaultValue":d!==p&&(ee=!0),o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(j(137,t));break;default:d!==p&&fe(e,t,u,d,i,p)}}Fm(e,r,o,l,c,f,a,s);return;case"select":d=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":d=l;default:i.hasOwnProperty(a)||fe(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&(ee=!0),u=a;break;case"defaultValue":a!==l&&(ee=!0),o=a;break;case"multiple":a!==l&&(ee=!0),r=a;default:a!==l&&fe(e,t,s,a,i,l)}t=o,n=r,i=d,u!=null?ho(e,!!n,u,!1):!!i!=!!n&&(t!=null?ho(e,!!n,t,!0):ho(e,!!n,n?[]:"",!1));return;case"textarea":d=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:fe(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&(ee=!0),u=s;break;case"defaultValue":s!==a&&(ee=!0),d=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(j(91));break;default:s!==a&&fe(e,t,r,s,i,a)}xS(e,u,d);return;case"option":for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g)&&(g==="selected"?e.selected=!1:fe(e,t,g,null,i,u));for(l in i)u=i[l],d=n[l],i.hasOwnProperty(l)&&u!==d&&(u!=null||d!=null)&&(l==="selected"?(u!==d&&(ee=!0),e.selected=u&&typeof u!="function"&&typeof u!="symbol"):fe(e,t,l,u,i,d));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&fe(e,t,b,null,i,u);for(c in i)if(u=i[c],d=n[c],i.hasOwnProperty(c)&&u!==d&&(u!=null||d!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(j(137,t));break;default:fe(e,t,c,u,i,d)}return;default:if(Gg(t)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Ag(e,t,m,void 0,i,u);for(f in i)u=i[f],d=n[f],!i.hasOwnProperty(f)||u===d||u===void 0&&d===void 0||Ag(e,t,f,u,i,d);return}}for(var h in n)u=n[h],n.hasOwnProperty(h)&&u!=null&&!i.hasOwnProperty(h)&&fe(e,t,h,null,i,u);for(p in i)u=i[p],d=n[p],!i.hasOwnProperty(p)||u===d||u==null&&d==null||fe(e,t,p,u,i,d)}function Cx(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function CC(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&Cx(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,p=l.initiatorType;f&&Cx(p)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var wg=null,Cg=null;function hc(e){return e.nodeType===9?e:e.ownerDocument}function Rx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function AM(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function wM(e,t,n,i){return n=hc(n).createElement(e),n[pn]=i,n[Zn]=t,_n(n,e,t),rn(n),n}function Rg(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Mm=null;function RC(){var e=window.event;return e&&e.type==="popstate"?e===Mm?!1:(Mm=e,!0):(Mm=null,!1)}var C0=typeof setTimeout=="function"?setTimeout:void 0,NC=typeof clearTimeout=="function"?clearTimeout:void 0,Nx=typeof Promise=="function"?Promise:void 0,Dx=typeof requestAnimationFrame=="function"?requestAnimationFrame:C0,DC=typeof queueMicrotask=="function"?queueMicrotask:typeof Nx<"u"?function(e){return Nx.resolve(null).then(e).catch(UC)}:C0;function UC(e){setTimeout(function(){throw e})}function Da(e){return e==="head"}function Ux(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),Lo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Tm(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Tm(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[xc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&Tm(e.ownerDocument.body);n=s}while(n);Lo(t)}function Lx(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function CM(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function RM(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function NM(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Ng(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return NM(t,n,e)}function LC(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return NM(t,n,e)}function OC(e){return e.documentElement.clientHeight}function IC(e){this.addEventListener("load",e),this.addEventListener("error",e)}function PC(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var f=c.startViewTransition({update:function(){var u=c.defaultView,d=u.navigation&&u.navigation.transition,g=c.fonts.status;i();var b=[];if(g==="loaded"&&(OC(c),c.fonts.status==="loading"&&b.push(c.fonts.ready)),g=b.length,e!==null)for(var m=e.suspenseyImages,h=0,v=0;v<m.length;v++){var S=m[v];if(!S.complete){var _=S.getBoundingClientRect();if(0<_.bottom&&0<_.right&&_.top<u.innerHeight&&_.left<u.innerWidth){if(h+=GM(S),h>hh){b.length=g;break}S=new Promise(IC.bind(S)),b.push(S)}}}if(0<b.length)return u=Promise.race([Promise.all(b),new Promise(function(E){return setTimeout(E,500)})]).then(s,s),(d?Promise.allSettled([d.finished,u]):u).then(a,a);if(s(),d)return d.finished.then(a,a);a()},types:n});c.__reactViewTransition=f;var p=[];return f.ready.then(function(){for(var u=c.documentElement.getAnimations({subtree:!0}),d=0;d<u.length;d++){var g=u[d],b=g.effect,m=b.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){p.push(g),g=b.getKeyframes();for(var h=m=void 0,v=!0,S=0;S<g.length;S++){var _=g[S],E=_.width;if(m===void 0)m=E;else if(m!==E){v=!1;break}if(E=_.height,h===void 0)h=E;else if(h!==E){v=!1;break}delete _.width,delete _.height,_.transform==="none"&&delete _.transform}v&&m!==void 0&&h!==void 0&&(b.setKeyframes(g),v=getComputedStyle(b.target,b.pseudoElement),v.width!==m||v.height!==h)&&(v=g[0],v.width=m,v.height=h,v=g[g.length-1],v.width=m,v.height=h,b.setKeyframes(g))}}r()},function(u){c.__reactViewTransition===f&&(c.__reactViewTransition=null);try{typeof u=="object"&&u!==null&&u.name==="InvalidStateError"&&(u.message==="View transition was skipped because document visibility state is hidden."||u.message==="Skipping view transition because document visibility state has become hidden."||u.message==="Skipping view transition because viewport size changed."||u.message==="Transition was aborted because of invalid state")&&(u=null),u!==null&&l(u)}finally{i(),s(),r()}}),f.finished.finally(function(){for(var u=0;u<p.length;u++)p[u].cancel();c.__reactViewTransition===f&&(c.__reactViewTransition=null),o()}),f}catch{return i(),s(),r(),null}}function or(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}or.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:ye({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};or.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};or.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function DM(e){return{name:e,group:new or("group",e),imagePair:new or("image-pair",e),old:new or("old",e),new:new or("new",e)}}function fi(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}fi.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(UM(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=Ro(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),Yn(this._fragmentFiber.child,!1,BC,e,o,i)}this._eventListeners=a}};function BC(e,t,n,i){return Ke(e).addEventListener(t,n,i),!1}fi.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=UM(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=Ro(s.optionsOrUseCapture),Yn(this._fragmentFiber.child,!1,FC,e,n,s),i.splice(t,1),a!==null&&a()}};function FC(e,t,n,i){return Ke(e).removeEventListener(t,n,i),!1}function Ro(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Ox(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function UM(e,t,n,i){if(e.length===0)return-1;i=Ox(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&Ox(a.optionsOrUseCapture)===i)return s}return-1}fi.prototype.dispatchEvent=function(e){var t=Sr(this._fragmentFiber);if(t===null)return!0;t=Ke(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,Ro(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,Ro(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};fi.prototype.focus=function(e){Yn(this._fragmentFiber.child,!0,LM,e,void 0,void 0)};function LM(e,t){return e.tag===6?!1:(e=Ke(e),KC(e,t))}fi.prototype.focusLast=function(e){var t=[];Yn(this._fragmentFiber.child,!0,R0,t,void 0,void 0);for(var n=t.length-1;0<=n&&!LM(t[n],e);n--);};function R0(e,t){return t.push(e),!1}fi.prototype.blur=function(){var e=Sr(this._fragmentFiber);e!==null&&(e=Ke(e),e=hc(e).activeElement,e!==null&&Yn(this._fragmentFiber.child,!1,zC,e,void 0,void 0))};function zC(e,t){return e.tag===6?!1:(e=Ke(e),e===t||e.contains(t)?(t.blur(),!0):!1)}fi.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),Yn(this._fragmentFiber.child,!1,HC,e,void 0,void 0)};function HC(e,t){return e.tag===6||(e=Ke(e),t.observe(e)),!1}fi.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),Yn(this._fragmentFiber.child,!1,VC,e,void 0,void 0);for(var n=t=0;n<Fi.length;n++){var i=Fi[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Fi[t++]=i}Fi.length=t}};function VC(e,t){return e.tag===6||(e=Ke(e),t.unobserve(e)),!1}var Fi=[],Em=!1;function GC(e,t,n){Fi.push({fragmentInstance:e,observer:t,instance:n}),Em||(Em=!0,QC(function(){Em=!1;var i=Fi;Fi=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}fi.prototype.getClientRects=function(){var e=[];return Yn(this._fragmentFiber.child,!1,kC,e,void 0,void 0),e};function kC(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=Ke(e),t.push.apply(t,e.getClientRects());return!1}fi.prototype.getRootNode=function(e){var t=Sr(this._fragmentFiber);return t===null?this:Ke(t).getRootNode(e)};fi.prototype.compareDocumentPosition=function(e){var t=Sr(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Yn(this._fragmentFiber.child,!1,R0,n,void 0,void 0);var i=Ke(t);if(n.length===0){if(n=i,dy(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=eS(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=Ke(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=Ke(n[0]),s=Ke(n[n.length-1]);var a=dy(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||XC(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function XC(e,t,n,i,s){var a=rr(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=Sr(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=wm(n,a,py),t===null?t=!1:(Yn(t,!0,xA,a,n),a=jr,jr=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=wm(i,a,py),t===null?t=!1:(Yn(t,!0,SA,a,i),a=jr,Am=jr=null,t=a!==null)),t):!1}function Ix(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}fi.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(j(566));var t=[];Yn(this._fragmentFiber.child,!1,R0,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=eS(this._fragmentFiber);if(i=n?i[1]||i[0]||Sr(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=Ke(i),Ix(e,n);return}if(i=Ke(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=Ke(s),Ix(s,n)):Ke(s).scrollIntoView(e),i+=n?-1:1}};function WC(e,t){return e=Ke(e),OM(e,t),!1}function OM(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function IM(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,Ro(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<Fi.length;o++){var l=Fi[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(Fi[r++]=l)}Fi.length=r,a.observe(e)}),OM(e,t))}function qC(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,Ro(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?GC(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Dg(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Dg(n),Xh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function YC(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[xc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=Ci(e.nextSibling),e===null)break}return null}function ZC(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ci(e.nextSibling),e===null))return null;return e}function PM(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ci(e.nextSibling),e===null))return null;return e}function Ug(e){return e.data==="$?"||e.data==="$~"}function N0(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function JC(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Ci(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Lg=null;function Px(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ci(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Bx(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function KC(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function QC(e){Dx(function(){Dx(function(t){return e(t)})})}function BM(e,t,n){switch(t=hc(n),e){case"html":if(e=t.documentElement,!e)throw Error(j(452));return e;case"head":if(e=t.head,!e)throw Error(j(453));return e;case"body":if(e=t.body,!e)throw Error(j(454));return e;default:throw Error(j(451))}}function FM(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&fe(e,t,i,null,AC,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===ls&&(e.onclick=null),Xh(e)}function Tm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Xh(e)}var Ri=new Map,Fx=new Set;function fc(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Gs=ie.d;ie.d={f:jC,r:$C,D:tR,C:eR,L:nR,m:iR,X:aR,S:sR,M:rR};function jC(){var e=Gs.f(),t=af();return e||t}function $C(e){var t=Io(e);t!==null&&t.tag===5&&t.type==="form"?bb(t):Gs.r(e)}var zo=typeof document>"u"?null:document;function zM(e,t,n){var i=zo;if(i&&typeof t=="string"&&t){var s=Ti(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),Fx.has(s)||(Fx.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),_n(t,"link",e),rn(t),i.head.appendChild(t)))}}function tR(e){Gs.D(e),zM("dns-prefetch",e,null)}function eR(e,t){Gs.C(e,t),zM("preconnect",e,t)}function nR(e,t,n){Gs.L(e,t,n);var i=zo;if(i&&e&&t){var s='link[rel="preload"][as="'+Ti(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+Ti(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+Ti(n.imageSizes)+'"]')):s+='[href="'+Ti(e)+'"]';var a=s;switch(t){case"style":a=No(e);break;case"script":a=Ho(e)}if(!(Ri.has(a)||(e=ye({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Ri.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Ac(a))||t==="script"&&i.querySelector(wc(a))))){var r=i.createElement("link");_n(r,"link",e),t==="style"&&(r[_h]=!0,r.onload=r.onerror=function(){pS(r)}),rn(r),i.head.appendChild(r)}}}function iR(e,t){Gs.m(e,t);var n=zo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+Ti(i)+'"][href="'+Ti(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Ho(e)}if(!Ri.has(a)&&(e=ye({rel:"modulepreload",href:e},t),Ri.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(wc(a)))return}i=n.createElement("link"),_n(i,"link",e),rn(i),n.head.appendChild(i)}}}function sR(e,t,n){Gs.S(e,t,n);var i=zo;if(i&&e){var s=uo(i).hoistableStyles,a=No(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ac(a)))o.loading=5;else{e=ye({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Ri.get(a))&&D0(e,n);var l=r=i.createElement("link");rn(l),_n(l,"link",e),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,ch(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function aR(e,t){Gs.X(e,t);var n=zo;if(n&&e){var i=uo(n).hoistableScripts,s=Ho(e),a=i.get(s);a||(a=n.querySelector(wc(s)),a||(e=ye({src:e,async:!0},t),(t=Ri.get(s))&&U0(e,t),a=n.createElement("script"),rn(a),_n(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function rR(e,t){Gs.M(e,t);var n=zo;if(n&&e){var i=uo(n).hoistableScripts,s=Ho(e),a=i.get(s);a||(a=n.querySelector(wc(s)),a||(e=ye({src:e,async:!0,type:"module"},t),(t=Ri.get(s))&&U0(e,t),a=n.createElement("script"),rn(a),_n(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function zx(e,t,n,i){var s=(s=ma.current)?fc(s):null;if(!s)throw Error(j(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=No(n.href),t=uo(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=No(n.href);var a=uo(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Ac(e)))?a._p||(r.instance=a,r.state.loading=5):(a=Ri.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ri.set(e,a)),oR(s,e,a,r.state))),t&&i===null)throw Error(j(528,""));return r}if(t&&i!==null)throw Error(j(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Ho(n),t=uo(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(j(444,e))}}function No(e){return'href="'+Ti(e)+'"'}function Ac(e){return'link[rel="stylesheet"]['+e+"]"}function HM(e){return ye({},e,{"data-precedence":e.precedence,precedence:null})}function oR(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[_h]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[_h]=!0,t.onload=t.onerror=pS.bind(null,t),_n(t,"link",n),rn(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Ho(e){return'[src="'+Ti(e)+'"]'}function wc(e){return"script[async]"+e}function Hx(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Ti(n.href)+'"]');if(i)return t.instance=i,rn(i),i;var s=ye({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),rn(i),_n(i,"style",s),ch(i,n.precedence,e),t.instance=i;case"stylesheet":s=No(n.href);var a=e.querySelector(Ac(s));if(a)return t.state.loading|=4,t.instance=a,rn(a),a;i=HM(n),(s=Ri.get(s))&&D0(i,s),a=(e.ownerDocument||e).createElement("link"),rn(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),_n(a,"link",i),t.state.loading|=4,ch(a,n.precedence,e),t.instance=a;case"script":return a=Ho(n.src),(s=e.querySelector(wc(a)))?(t.instance=s,rn(s),s):(i=n,(s=Ri.get(a))&&(i=ye({},n),U0(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),rn(s),_n(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(j(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,ch(i,n.precedence,e));return t.instance}function ch(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function D0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function U0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var uh=null;function Vx(e,t,n){if(uh===null){var i=new Map,s=uh=new Map;s.set(n,i)}else s=uh,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[xc]||a[pn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function Og(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function lR(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Gx(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function VM(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function GM(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function kx(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=GM(t),e.suspenseyImages.push(t)),e=hR.bind(e),t.decode().then(e,e))}function cR(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=No(i.href),a=t.querySelector(Ac(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=dc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,rn(a);return}a=t.ownerDocument||t,i=HM(i),(s=Ri.get(s))&&D0(i,s),a=a.createElement("link"),rn(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),_n(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=dc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var hh=0;function uR(e,t){return e.stylesheets&&e.count===0&&fh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&fh(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&hh===0&&(hh=62500*CC());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&fh(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>hh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function kM(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)fh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function dc(){this.count--,kM(this)}function hR(){this.imgCount--,kM(this)}var Vh=null;function fh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Vh=new Map,t.forEach(fR,e),Vh=null,dc.call(e))}function fR(e,t){if(!(t.state.loading&4)){var n=Vh.get(e);if(n)var i=n.get(null);else{n=new Map,Vh.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=dc.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Do={$$typeof:os,Provider:null,Consumer:null,_currentValue:lr,_currentValue2:lr,_threadCount:0};function dR(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=$p(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$p(0),this.hiddenUpdates=$p(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function XM(e,t,n,i,s,a,r,o,l,c,f,p){return e=new dR(e,t,n,r,l,c,f,p,o),t=1,a===!0&&(t|=24),a=Wn(3,null,null,t),e.current=a,a.stateNode=e,t=jg(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},e0(a),e}function WM(e){return e?(e=ro,e):ro}function qM(e,t,n,i,s,a){s=WM(s),i.context===null?i.context=s:i.pendingContext=s,i=va(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=_a(e,i,t),n!==null&&(qn(n,e,t),Wl(n,e,t))}function Xx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function L0(e,t){Xx(e,t),(e=e.alternate)&&Xx(e,t)}function YM(e){if(e.tag===13||e.tag===31){var t=Er(e,67108864);t!==null&&qn(t,e,67108864),L0(e,67108864)}}function Wx(e){if(e.tag===13||e.tag===31){var t=ui();t=Hg(t);var n=Er(e,t);n!==null&&qn(n,e,t),L0(e,t)}}var Uo=!0;function pR(e,t,n,i){var s=Nt.T;Nt.T=null;var a=ie.p;try{ie.p=2,O0(e,t,n,i)}finally{ie.p=a,Nt.T=s}}function mR(e,t,n,i){var s=Nt.T;Nt.T=null;var a=ie.p;try{ie.p=8,O0(e,t,n,i)}finally{ie.p=a,Nt.T=s}}function O0(e,t,n,i){if(Uo){var s=Ig(i);if(s===null)bm(e,t,i,Gh,n),qx(e,i);else if(vR(s,e,t,n,i))i.stopPropagation();else if(qx(e,i),t&4&&-1<gR.indexOf(e)){for(;s!==null;){var a=Io(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=ir(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-ci(r);o.entanglements[1]|=l,r&=~l}ms(a),(ne&6)===0&&(Ph=oi()+500,Tc(0,!1))}}break;case 31:case 13:o=Er(a,2),o!==null&&qn(o,a,2),af(),L0(a,2)}if(a=Ig(i),a===null&&bm(e,t,i,Gh,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else bm(e,t,i,null,n)}}function Ig(e){return e=kg(e),I0(e)}var Gh=null;function I0(e){if(Gh=null,e=rr(e),e!==null){var t=gc(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=jx(t),e!==null)return e;e=null}else if(n===31){if(e=$x(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Gh=e,null}function ZM(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(NA()){case aS:return 2;case rS:return 8;case vh:case DA:return 32;case oS:return 268435456;default:return 32}default:return 32}}var Pg=!1,ba=null,Ma=null,Ea=null,pc=new Map,mc=new Map,la=[],gR="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function qx(e,t){switch(e){case"focusin":case"focusout":ba=null;break;case"dragenter":case"dragleave":Ma=null;break;case"mouseover":case"mouseout":Ea=null;break;case"pointerover":case"pointerout":pc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mc.delete(t.pointerId)}}function Ol(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Io(t),t!==null&&YM(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function vR(e,t,n,i,s){switch(t){case"focusin":return ba=Ol(ba,e,t,n,i,s),!0;case"dragenter":return Ma=Ol(Ma,e,t,n,i,s),!0;case"mouseover":return Ea=Ol(Ea,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return pc.set(a,Ol(pc.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,mc.set(a,Ol(mc.get(a)||null,e,t,n,i,s)),!0}return!1}function JM(e){var t=rr(e.target);if(t!==null){var n=gc(t);if(n!==null){if(t=n.tag,t===13){if(t=jx(n),t!==null){e.blockedOn=t,_y(e.priority,function(){Wx(n)});return}}else if(t===31){if(t=$x(n),t!==null){e.blockedOn=t,_y(e.priority,function(){Wx(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function dh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ig(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);zm=i,n.target.dispatchEvent(i),zm=null}else return t=Io(n),t!==null&&YM(t),e.blockedOn=n,!1;t.shift()}return!0}function Yx(e,t,n){dh(e)&&n.delete(t)}function _R(){Pg=!1,ba!==null&&dh(ba)&&(ba=null),Ma!==null&&dh(Ma)&&(Ma=null),Ea!==null&&dh(Ea)&&(Ea=null),pc.forEach(Yx),mc.forEach(Yx)}function Yu(e,t){e.blockedOn===t&&(e.blockedOn=null,Pg||(Pg=!0,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,_R)))}var Zu=null;function Zx(e){Zu!==e&&(Zu=e,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,function(){Zu===e&&(Zu=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(I0(i||n)===null)continue;break}var a=Io(n);a!==null&&(e.splice(t,3),t-=3,eg(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function Lo(e){function t(l){return Yu(l,e)}ba!==null&&Yu(ba,e),Ma!==null&&Yu(Ma,e),Ea!==null&&Yu(Ea,e),pc.forEach(t),mc.forEach(t);for(var n=0;n<la.length;n++){var i=la[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<la.length&&(n=la[0],n.blockedOn===null);)JM(n),n.blockedOn===null&&la.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Zn]||null;if(typeof a=="function")r||Zx(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Zn]||null)o=r.formAction;else if(I0(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Zx(n)}}}function KM(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function P0(e){this._internalRoot=e}lf.prototype.render=P0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));var n=t.current,i=ui();qM(n,i,e,t,null,null)};lf.prototype.unmount=P0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qM(e.current,2,null,e,null,null),af(),t[Oo]=null}};function lf(e){this._internalRoot=e}lf.prototype.unstable_scheduleHydration=function(e){if(e){var t=dS();e={blockedOn:null,target:e,priority:t};for(var n=0;n<la.length&&t!==0&&t<la[n].priority;n++);la.splice(n,0,e),n===0&&JM(e)}};var Jx=Kx.version;if(Jx!=="19.3.0")throw Error(j(527,Jx,"19.3.0"));ie.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=yA(t),e=e!==null?tS(e):null,e=e===null?null:e.stateNode,e};var yR={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:Nt,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Il=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Il.isDisabled&&Il.supportsFiber))try{vc=Il.inject(yR),li=Il}catch{}var Il;cf.createRoot=function(e,t){if(!Qx(e))throw Error(j(299));var n=!1,i="",s=Nb,a=Db,r=Ub;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=XM(e,1,!1,null,null,n,i,null,s,a,r,KM),e[Oo]=t.current,w0(e),new P0(t)};cf.hydrateRoot=function(e,t,n){if(!Qx(e))throw Error(j(299));var i=!1,s="",a=Nb,r=Db,o=Ub,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=XM(e,1,!0,t,n??null,i,s,l,a,r,o,KM),t.context=WM(null),n=t.current,i=ui(),i=Hg(i),s=va(i),s.callback=null,_a(n,s,i),n=i,t.current.lanes=n,yc(t,n),ms(t),e[Oo]=t.current,w0(e),new lf(t)};cf.version="19.3.0"});var t1=ts((FL,$M)=>{"use strict";function jM(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jM)}catch(e){console.error(e)}}jM(),$M.exports=QM()});var fT=ts(mp=>{"use strict";var hL=Symbol.for("react.transitional.element"),fL=Symbol.for("react.fragment");function hT(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:hL,type:e,key:i,ref:t!==void 0?t:null,props:n}}mp.Fragment=fL;mp.jsx=hT;mp.jsxs=hT});var Qi=ts((GB,dT)=>{"use strict";dT.exports=fT()});var Dp=Ln(tr(),1),PT=Ln(t1(),1);var b1=0,fv=1,M1=2;var jc=1,E1=2,ll=3,qa=0,zn=1,Di=2,Ss=0,cl=1,$c=2,dv=3,pv=4,T1=5;var Ur=100,A1=101,w1=102,C1=103,R1=104,N1=200,D1=201,U1=202,L1=203,mv=204,gv=205,O1=206,I1=207,P1=208,B1=209,F1=210,z1=211,H1=212,V1=213,G1=214,Lf=0,Of=1,If=2,el=3,Pf=4,Bf=5,Ff=6,zf=7,vv=0,k1=1,X1=2,qi=0,_v=1,yv=2,xv=3,Sv=4,bv=5,Mv=6,Ev=7;var Tv=300,Ya=301,Lr=302,hd=303,fd=304,tu=306,Hf=1e3,vs=1001,Vf=1002,un=1003,W1=1004;var eu=1005;var xn=1006,dd=1007;var Za=1008;var _i=1009,Av=1010,wv=1011,ul=1012,pd=1013,Yi=1014,Zi=1015,Ji=1016,md=1017,gd=1018,hl=1020,Cv=35902,Rv=35899,Nv=1021,Dv=1022,Ui=1023,_s=1026,Ja=1027,Uv=1028,vd=1029,Ka=1030,_d=1031;var yd=1033,nu=33776,iu=33777,su=33778,au=33779,xd=35840,Sd=35841,bd=35842,Md=35843,Ed=36196,Td=37492,Ad=37496,wd=37488,Cd=37489,ru=37490,Rd=37491,Nd=37808,Dd=37809,Ud=37810,Ld=37811,Od=37812,Id=37813,Pd=37814,Bd=37815,Fd=37816,zd=37817,Hd=37818,Vd=37819,Gd=37820,kd=37821,Xd=36492,Wd=36494,qd=36495,Yd=36283,Zd=36284,ou=36285,Jd=36286;var Lc=2300,Gf=2301,Df=2302,av=2303,rv=2400,ov=2401,lv=2402;var q1=3200;var Lv=0,Y1=1,Ks="",mi="srgb",Oc="srgb-linear",Ic="linear",le="srgb";var Uf=7680;var Z1=519,J1=512,K1=513,Q1=514,Kd=515,j1=516,$1=517,Qd=518,tE=519,eE=35044;var Ov="300 es",Wi=2e3,Pc=2001;function xR(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function SR(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Bc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function nE(){let e=Bc("canvas");return e.style.display="block",e}var e1={},nl=null;function Iv(...e){let t="THREE."+e.shift();nl?nl("log",t,...e):console.log(t,...e)}function iE(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Rt(...e){e=iE(e);let t="THREE."+e.shift();if(nl)nl("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Dt(...e){e=iE(e);let t="THREE."+e.shift();if(nl)nl("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Nr(...e){let t=e.join(" ");t in e1||(e1[t]=!0,Rt(...e))}function sE(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var aE={[Lf]:Of,[If]:Ff,[Pf]:zf,[el]:Bf,[Of]:Lf,[Ff]:If,[zf]:Pf,[Bf]:el},ys=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var B0=Math.PI/180,kf=180/Math.PI;function lu(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(An[e&255]+An[e>>8&255]+An[e>>16&255]+An[e>>24&255]+"-"+An[t&255]+An[t>>8&255]+"-"+An[t>>16&15|64]+An[t>>24&255]+"-"+An[n&63|128]+An[n>>8&255]+"-"+An[n>>16&255]+An[n>>24&255]+An[i&255]+An[i>>8&255]+An[i>>16&255]+An[i>>24&255]).toLowerCase()}function Jt(e,t,n){return Math.max(t,Math.min(n,e))}function bR(e,t){return(e%t+t)%t}function F0(e,t,n){return(1-n)*e+n*t}function Cc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Jn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var $t=class e{static{e.prototype.isVector2=!0}constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xs=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],f=i[s+2],p=i[s+3],u=a[r+0],d=a[r+1],g=a[r+2],b=a[r+3];if(p!==b||l!==u||c!==d||f!==g){let m=l*u+c*d+f*g+p*b;m<0&&(u=-u,d=-d,g=-g,b=-b,m=-m);let h=1-o;if(m<.9995){let v=Math.acos(m),S=Math.sin(v);h=Math.sin(h*v)/S,o=Math.sin(o*v)/S,l=l*h+u*o,c=c*h+d*o,f=f*h+g*o,p=p*h+b*o}else{l=l*h+u*o,c=c*h+d*o,f=f*h+g*o,p=p*h+b*o;let v=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=v,c*=v,f*=v,p*=v}}t[n]=l,t[n+1]=c,t[n+2]=f,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],f=i[s+3],p=a[r],u=a[r+1],d=a[r+2],g=a[r+3];return t[n]=o*g+f*p+l*d-c*u,t[n+1]=l*g+f*u+c*p-o*d,t[n+2]=c*g+f*d+o*u-l*p,t[n+3]=f*g-o*p-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(s/2),p=o(a/2),u=l(i/2),d=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=u*f*p+c*d*g,this._y=c*d*p-u*f*g,this._z=c*f*g+u*d*p,this._w=c*f*p-u*d*g;break;case"YXZ":this._x=u*f*p+c*d*g,this._y=c*d*p-u*f*g,this._z=c*f*g-u*d*p,this._w=c*f*p+u*d*g;break;case"ZXY":this._x=u*f*p-c*d*g,this._y=c*d*p+u*f*g,this._z=c*f*g+u*d*p,this._w=c*f*p-u*d*g;break;case"ZYX":this._x=u*f*p-c*d*g,this._y=c*d*p+u*f*g,this._z=c*f*g-u*d*p,this._w=c*f*p+u*d*g;break;case"YZX":this._x=u*f*p+c*d*g,this._y=c*d*p+u*f*g,this._z=c*f*g-u*d*p,this._w=c*f*p-u*d*g;break;case"XZY":this._x=u*f*p-c*d*g,this._y=c*d*p-u*f*g,this._z=c*f*g+u*d*p,this._w=c*f*p+u*d*g;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],p=n[10],u=i+o+p;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(f-l)*d,this._y=(a-c)*d,this._z=(r-s)*d}else if(i>o&&i>p){let d=2*Math.sqrt(1+i-o-p);this._w=(f-l)/d,this._x=.25*d,this._y=(s+r)/d,this._z=(a+c)/d}else if(o>p){let d=2*Math.sqrt(1+o-i-p);this._w=(a-c)/d,this._x=(s+r)/d,this._y=.25*d,this._z=(l+f)/d}else{let d=2*Math.sqrt(1+p-i-o);this._w=(r-s)/d,this._x=(a+c)/d,this._y=(l+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+s*c-a*l,this._y=s*f+r*l+a*o-i*c,this._z=a*f+r*c+i*l-s*o,this._w=r*f-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class e{static{e.prototype.isVector3=!0}constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(n1.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(n1.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),f=2*(o*n-a*s),p=2*(a*i-r*n);return this.x=n+l*c+r*p-o*f,this.y=i+l*f+o*c-a*p,this.z=s+l*p+a*f-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this.z=Jt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this.z=Jt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return z0.copy(this).projectOnVector(t),this.sub(z0)}reflect(t){return this.sub(z0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},z0=new P,n1=new xs,Ot=class e{static{e.prototype.isMatrix3=!0}constructor(t,n,i,s,a,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let f=this.elements;return f[0]=t,f[1]=s,f[2]=o,f[3]=n,f[4]=a,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],p=i[7],u=i[2],d=i[5],g=i[8],b=s[0],m=s[3],h=s[6],v=s[1],S=s[4],_=s[7],E=s[2],T=s[5],w=s[8];return a[0]=r*b+o*v+l*E,a[3]=r*m+o*S+l*T,a[6]=r*h+o*_+l*w,a[1]=c*b+f*v+p*E,a[4]=c*m+f*S+p*T,a[7]=c*h+f*_+p*w,a[2]=u*b+d*v+g*E,a[5]=u*m+d*S+g*T,a[8]=u*h+d*_+g*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8];return n*r*f-n*o*c-i*a*f+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],p=f*r-o*c,u=o*l-f*a,d=c*a-r*l,g=n*p+i*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/g;return t[0]=p*b,t[1]=(s*c-f*i)*b,t[2]=(o*i-s*r)*b,t[3]=u*b,t[4]=(f*n-s*l)*b,t[5]=(s*a-o*n)*b,t[6]=d*b,t[7]=(i*l-c*n)*b,t[8]=(r*n-i*a)*b,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return Nr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(H0.makeScale(t,n)),this}rotate(t){return Nr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(H0.makeRotation(-t)),this}translate(t,n){return Nr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(H0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},H0=new Ot,i1=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),s1=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function MR(){let e={enabled:!0,workingColorSpace:Oc,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===le&&(s.r=Js(s.r),s.g=Js(s.g),s.b=Js(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===le&&(s.r=tl(s.r),s.g=tl(s.g),s.b=tl(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ks?Ic:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Nr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Nr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Oc]:{primaries:t,whitePoint:i,transfer:Ic,toXYZ:i1,fromXYZ:s1,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:t,whitePoint:i,transfer:le,toXYZ:i1,fromXYZ:s1,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),e}var Zt=MR();function Js(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function tl(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Vo,Xf=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Vo===void 0&&(Vo=Bc("canvas")),Vo.width=t.width,Vo.height=t.height;let s=Vo.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Vo}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Bc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Js(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Js(n[i]/255)*255):n[i]=Js(n[i]);return{data:n,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ER=0,il=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ER++}),this.uuid=lu(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(V0(s[r].image)):a.push(V0(s[r]))}else a=V0(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function V0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Xf.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var TR=0,G0=new P,Kn=class e extends ys{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=vs,s=vs,a=xn,r=Za,o=Ui,l=_i,c=e.DEFAULT_ANISOTROPY,f=Ks){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:TR++}),this.uuid=lu(),this.name="",this.source=new il(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(G0).x}get height(){return this.source.getSize(G0).y}get depth(){return this.source.getSize(G0).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Rt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Rt(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hf:t.x=t.x-Math.floor(t.x);break;case vs:t.x=t.x<0?0:1;break;case Vf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hf:t.y=t.y-Math.floor(t.y);break;case vs:t.y=t.y<0?0:1;break;case Vf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Kn.DEFAULT_IMAGE=null;Kn.DEFAULT_MAPPING=Tv;Kn.DEFAULT_ANISOTROPY=1;var Ie=class e{static{e.prototype.isVector4=!0}constructor(t=0,n=0,i=0,s=1){this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],f=l[4],p=l[8],u=l[1],d=l[5],g=l[9],b=l[2],m=l[6],h=l[10];if(Math.abs(f-u)<.01&&Math.abs(p-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(f+u)<.1&&Math.abs(p+b)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let S=(c+1)/2,_=(d+1)/2,E=(h+1)/2,T=(f+u)/4,w=(p+b)/4,x=(g+m)/4;return S>_&&S>E?S<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(S),s=T/i,a=w/i):_>E?_<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(_),i=T/s,a=x/s):E<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(E),i=w/a,s=x/a),this.set(i,s,a,n),this}let v=Math.sqrt((m-g)*(m-g)+(p-b)*(p-b)+(u-f)*(u-f));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(p-b)/v,this.z=(u-f)/v,this.w=Math.acos((c+d+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this.z=Jt(this.z,t.z,n.z),this.w=Jt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this.z=Jt(this.z,t,n),this.w=Jt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wf=class extends ys{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ie(0,0,t,n),this.scissorTest=!1,this.viewport=new Ie(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new Kn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let n={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new il(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qn=class extends Wf{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Fc=class extends Kn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=vs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var qf=class extends Kn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=vs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Fe=class e{static{e.prototype.isMatrix4=!0}constructor(t,n,i,s,a,r,o,l,c,f,p,u,d,g,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,f,p,u,d,g,b,m)}set(t,n,i,s,a,r,o,l,c,f,p,u,d,g,b,m){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=s,h[1]=a,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=f,h[10]=p,h[14]=u,h[3]=d,h[7]=g,h[11]=b,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let n=this.elements,i=t.elements,s=1/Go.setFromMatrixColumn(t,0).length(),a=1/Go.setFromMatrixColumn(t,1).length(),r=1/Go.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),f=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let u=r*f,d=r*p,g=o*f,b=o*p;n[0]=l*f,n[4]=-l*p,n[8]=c,n[1]=d+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+d*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*f,d=l*p,g=c*f,b=c*p;n[0]=u+b*o,n[4]=g*o-d,n[8]=r*c,n[1]=r*p,n[5]=r*f,n[9]=-o,n[2]=d*o-g,n[6]=b+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*f,d=l*p,g=c*f,b=c*p;n[0]=u-b*o,n[4]=-r*p,n[8]=g+d*o,n[1]=d+g*o,n[5]=r*f,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*f,d=r*p,g=o*f,b=o*p;n[0]=l*f,n[4]=g*c-d,n[8]=u*c+b,n[1]=l*p,n[5]=b*c+u,n[9]=d*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,d=r*c,g=o*l,b=o*c;n[0]=l*f,n[4]=b-u*p,n[8]=g*p+d,n[1]=p,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=d*p+g,n[10]=u-b*p}else if(t.order==="XZY"){let u=r*l,d=r*c,g=o*l,b=o*c;n[0]=l*f,n[4]=-p,n[8]=c*f,n[1]=u*p+b,n[5]=r*f,n[9]=d*p-g,n[2]=g*p-d,n[6]=o*f,n[10]=b*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(AR,t,wR)}lookAt(t,n,i){let s=this.elements;return di.subVectors(t,n),di.lengthSq()===0&&(di.z=1),di.normalize(),Ua.crossVectors(i,di),Ua.lengthSq()===0&&(Math.abs(i.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),Ua.crossVectors(i,di)),Ua.normalize(),uf.crossVectors(di,Ua),s[0]=Ua.x,s[4]=uf.x,s[8]=di.x,s[1]=Ua.y,s[5]=uf.y,s[9]=di.y,s[2]=Ua.z,s[6]=uf.z,s[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],p=i[5],u=i[9],d=i[13],g=i[2],b=i[6],m=i[10],h=i[14],v=i[3],S=i[7],_=i[11],E=i[15],T=s[0],w=s[4],x=s[8],A=s[12],R=s[1],U=s[5],B=s[9],k=s[13],O=s[2],G=s[6],K=s[10],W=s[14],et=s[3],V=s[7],J=s[11],nt=s[15];return a[0]=r*T+o*R+l*O+c*et,a[4]=r*w+o*U+l*G+c*V,a[8]=r*x+o*B+l*K+c*J,a[12]=r*A+o*k+l*W+c*nt,a[1]=f*T+p*R+u*O+d*et,a[5]=f*w+p*U+u*G+d*V,a[9]=f*x+p*B+u*K+d*J,a[13]=f*A+p*k+u*W+d*nt,a[2]=g*T+b*R+m*O+h*et,a[6]=g*w+b*U+m*G+h*V,a[10]=g*x+b*B+m*K+h*J,a[14]=g*A+b*k+m*W+h*nt,a[3]=v*T+S*R+_*O+E*et,a[7]=v*w+S*U+_*G+E*V,a[11]=v*x+S*B+_*K+E*J,a[15]=v*A+S*k+_*W+E*nt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],f=t[2],p=t[6],u=t[10],d=t[14],g=t[3],b=t[7],m=t[11],h=t[15],v=l*d-c*u,S=o*d-c*p,_=o*u-l*p,E=r*d-c*f,T=r*u-l*f,w=r*p-o*f;return n*(b*v-m*S+h*_)-i*(g*v-m*E+h*T)+s*(g*S-b*E+h*w)-a*(g*_-b*T+m*w)}determinantAffine(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[1],r=t[5],o=t[9],l=t[2],c=t[6],f=t[10];return n*(r*f-o*c)-i*(a*f-o*l)+s*(a*c-r*l)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],p=t[9],u=t[10],d=t[11],g=t[12],b=t[13],m=t[14],h=t[15],v=n*o-i*r,S=n*l-s*r,_=n*c-a*r,E=i*l-s*o,T=i*c-a*o,w=s*c-a*l,x=f*b-p*g,A=f*m-u*g,R=f*h-d*g,U=p*m-u*b,B=p*h-d*b,k=u*h-d*m,O=v*k-S*B+_*U+E*R-T*A+w*x;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/O;return t[0]=(o*k-l*B+c*U)*G,t[1]=(s*B-i*k-a*U)*G,t[2]=(b*w-m*T+h*E)*G,t[3]=(u*T-p*w-d*E)*G,t[4]=(l*R-r*k-c*A)*G,t[5]=(n*k-s*R+a*A)*G,t[6]=(m*_-g*w-h*S)*G,t[7]=(f*w-u*_+d*S)*G,t[8]=(r*B-o*R+c*x)*G,t[9]=(i*R-n*B-a*x)*G,t[10]=(g*T-b*_+h*v)*G,t[11]=(p*_-f*T-d*v)*G,t[12]=(o*A-r*U-l*x)*G,t[13]=(n*U-i*A+s*x)*G,t[14]=(b*S-g*E-m*v)*G,t[15]=(f*E-p*S+u*v)*G,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,f=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,f*o+i,f*l-s*r,0,c*l-s*o,f*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,f=r+r,p=o+o,u=a*c,d=a*f,g=a*p,b=r*f,m=r*p,h=o*p,v=l*c,S=l*f,_=l*p,E=i.x,T=i.y,w=i.z;return s[0]=(1-(b+h))*E,s[1]=(d+_)*E,s[2]=(g-S)*E,s[3]=0,s[4]=(d-_)*T,s[5]=(1-(u+h))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+S)*w,s[9]=(m-v)*w,s[10]=(1-(u+b))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),n.identity(),this;let r=Go.set(s[0],s[1],s[2]).length(),o=Go.set(s[4],s[5],s[6]).length(),l=Go.set(s[8],s[9],s[10]).length();a<0&&(r=-r),Vi.copy(this);let c=1/r,f=1/o,p=1/l;return Vi.elements[0]*=c,Vi.elements[1]*=c,Vi.elements[2]*=c,Vi.elements[4]*=f,Vi.elements[5]*=f,Vi.elements[6]*=f,Vi.elements[8]*=p,Vi.elements[9]*=p,Vi.elements[10]*=p,n.setFromRotationMatrix(Vi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=Wi,l=!1){let c=this.elements,f=2*a/(n-t),p=2*a/(i-s),u=(n+t)/(n-t),d=(i+s)/(i-s),g,b;if(l)g=a/(r-a),b=r*a/(r-a);else if(o===Wi)g=-(r+a)/(r-a),b=-2*r*a/(r-a);else if(o===Pc)g=-r/(r-a),b=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Wi,l=!1){let c=this.elements,f=2/(n-t),p=2/(i-s),u=-(n+t)/(n-t),d=-(i+s)/(i-s),g,b;if(l)g=1/(r-a),b=r/(r-a);else if(o===Wi)g=-2/(r-a),b=-(r+a)/(r-a);else if(o===Pc)g=-1/(r-a),b=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Go=new P,Vi=new Fe,AR=new P(0,0,0),wR=new P(1,1,1),Ua=new P,uf=new P,di=new P,a1=new Fe,r1=new xs,Fa=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],f=s[9],p=s[2],u=s[6],d=s[10];switch(n){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Jt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Jt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-f,d),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return a1.makeRotationFromQuaternion(t),this.setFromRotationMatrix(a1,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return r1.setFromEuler(this),this.setFromQuaternion(r1,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fa.DEFAULT_ORDER="XYZ";var zc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},CR=0,o1=new P,ko=new xs,ks=new Fe,hf=new P,Rc=new P,RR=new P,NR=new xs,l1=new P(1,0,0),c1=new P(0,1,0),u1=new P(0,0,1),h1={type:"added"},DR={type:"removed"},Xo={type:"childadded",child:null},k0={type:"childremoved",child:null},gi=class e extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:CR++}),this.uuid=lu(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new P,n=new Fa,i=new xs,s=new P(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ot}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return ko.setFromAxisAngle(t,n),this.quaternion.multiply(ko),this}rotateOnWorldAxis(t,n){return ko.setFromAxisAngle(t,n),this.quaternion.premultiply(ko),this}rotateX(t){return this.rotateOnAxis(l1,t)}rotateY(t){return this.rotateOnAxis(c1,t)}rotateZ(t){return this.rotateOnAxis(u1,t)}translateOnAxis(t,n){return o1.copy(t).applyQuaternion(this.quaternion),this.position.add(o1.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(l1,t)}translateY(t){return this.translateOnAxis(c1,t)}translateZ(t){return this.translateOnAxis(u1,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ks.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?hf.copy(t):hf.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Rc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ks.lookAt(Rc,hf,this.up):ks.lookAt(hf,Rc,this.up),this.quaternion.setFromRotationMatrix(ks),s&&(ks.extractRotation(s.matrixWorld),ko.setFromRotationMatrix(ks),this.quaternion.premultiply(ko.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(h1),Xo.child=t,this.dispatchEvent(Xo),Xo.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(DR),k0.child=t,this.dispatchEvent(k0),k0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ks.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ks.multiply(t.parent.matrixWorld)),t.applyMatrix4(ks),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(h1),Xo.child=t,this.dispatchEvent(Xo),Xo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rc,t,RR),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rc,NR,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){let a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let p=l[c];a(t.shapes,p)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),f=r(t.images),p=r(t.shapes),u=r(t.skeletons),d=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){let l=[];for(let c in o){let f=o[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};gi.DEFAULT_UP=new P(0,1,0);gi.DEFAULT_MATRIX_AUTO_UPDATE=!0;gi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zs=class extends gi{constructor(){super(),this.isGroup=!0,this.type="Group"}},UR={type:"move"},sl=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let b of t.hand.values()){let m=n.getJointPose(b,i),h=this._getHandJoint(c,b);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}let f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=f.position.distanceTo(p.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(UR)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Zs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},rE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},La={h:0,s:0,l:0},ff={h:0,s:0,l:0};function X0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Qt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=mi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Zt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Zt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Zt.workingColorSpace){if(t=bR(t,1),n=Jt(n,0,1),i=Jt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=X0(r,a,t+1/3),this.g=X0(r,a,t),this.b=X0(r,a,t-1/3)}return Zt.colorSpaceToWorking(this,s),this}setStyle(t,n=mi){function i(a){a!==void 0&&parseFloat(a)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=mi){let i=rE[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Js(t.r),this.g=Js(t.g),this.b=Js(t.b),this}copyLinearToSRGB(t){return this.r=tl(t.r),this.g=tl(t.g),this.b=tl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mi){return Zt.workingToColorSpace(wn.copy(this),t),Math.round(Jt(wn.r*255,0,255))*65536+Math.round(Jt(wn.g*255,0,255))*256+Math.round(Jt(wn.b*255,0,255))}getHexString(t=mi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Zt.workingColorSpace){Zt.workingToColorSpace(wn.copy(this),n);let i=wn.r,s=wn.g,a=wn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,f=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=f<=.5?p/(r+o):p/(2-r-o),r){case i:l=(s-a)/p+(s<a?6:0);break;case s:l=(a-i)/p+2;break;case a:l=(i-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,n=Zt.workingColorSpace){return Zt.workingToColorSpace(wn.copy(this),n),t.r=wn.r,t.g=wn.g,t.b=wn.b,t}getStyle(t=mi){Zt.workingToColorSpace(wn.copy(this),t);let n=wn.r,i=wn.g,s=wn.b;return t!==mi?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(La),this.setHSL(La.h+t,La.s+n,La.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(La),t.getHSL(ff);let i=F0(La.h,ff.h,n),s=F0(La.s,ff.s,n),a=F0(La.l,ff.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wn=new Qt;Qt.NAMES=rE;var Hc=class extends gi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fa,this.environmentIntensity=1,this.environmentRotation=new Fa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}},Gi=new P,Xs=new P,W0=new P,Ws=new P,Wo=new P,qo=new P,f1=new P,q0=new P,Y0=new P,Z0=new P,J0=new Ie,K0=new Ie,Q0=new Ie,Ba=class e{constructor(t=new P,n=new P,i=new P){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Gi.subVectors(t,n),s.cross(Gi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){Gi.subVectors(s,n),Xs.subVectors(i,n),W0.subVectors(t,n);let r=Gi.dot(Gi),o=Gi.dot(Xs),l=Gi.dot(W0),c=Xs.dot(Xs),f=Xs.dot(W0),p=r*c-o*o;if(p===0)return a.set(0,0,0),null;let u=1/p,d=(c*l-o*f)*u,g=(r*f-o*l)*u;return a.set(1-d-g,g,d)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Ws)===null?!1:Ws.x>=0&&Ws.y>=0&&Ws.x+Ws.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,Ws)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Ws.x),l.addScaledVector(r,Ws.y),l.addScaledVector(o,Ws.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return J0.setScalar(0),K0.setScalar(0),Q0.setScalar(0),J0.fromBufferAttribute(t,n),K0.fromBufferAttribute(t,i),Q0.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(J0,a.x),r.addScaledVector(K0,a.y),r.addScaledVector(Q0,a.z),r}static isFrontFacing(t,n,i,s){return Gi.subVectors(i,n),Xs.subVectors(t,n),Gi.cross(Xs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gi.subVectors(this.c,this.b),Xs.subVectors(this.a,this.b),Gi.cross(Xs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;Wo.subVectors(s,i),qo.subVectors(a,i),q0.subVectors(t,i);let l=Wo.dot(q0),c=qo.dot(q0);if(l<=0&&c<=0)return n.copy(i);Y0.subVectors(t,s);let f=Wo.dot(Y0),p=qo.dot(Y0);if(f>=0&&p<=f)return n.copy(s);let u=l*p-f*c;if(u<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector(Wo,r);Z0.subVectors(t,a);let d=Wo.dot(Z0),g=qo.dot(Z0);if(g>=0&&d<=g)return n.copy(a);let b=d*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(qo,o);let m=f*g-d*p;if(m<=0&&p-f>=0&&d-g>=0)return f1.subVectors(a,s),o=(p-f)/(p-f+(d-g)),n.copy(s).addScaledVector(f1,o);let h=1/(m+b+u);return r=b*h,o=u*h,n.copy(i).addScaledVector(Wo,r).addScaledVector(qo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},za=class{constructor(t=new P(1/0,1/0,1/0),n=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ki.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ki.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=ki.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ki):ki.fromBufferAttribute(a,r),ki.applyMatrix4(t.matrixWorld),this.expandByPoint(ki);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),df.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),df.copy(i.boundingBox)),df.applyMatrix4(t.matrixWorld),this.union(df)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ki),ki.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Nc),pf.subVectors(this.max,Nc),Yo.subVectors(t.a,Nc),Zo.subVectors(t.b,Nc),Jo.subVectors(t.c,Nc),Oa.subVectors(Zo,Yo),Ia.subVectors(Jo,Zo),Ar.subVectors(Yo,Jo);let n=[0,-Oa.z,Oa.y,0,-Ia.z,Ia.y,0,-Ar.z,Ar.y,Oa.z,0,-Oa.x,Ia.z,0,-Ia.x,Ar.z,0,-Ar.x,-Oa.y,Oa.x,0,-Ia.y,Ia.x,0,-Ar.y,Ar.x,0];return!j0(n,Yo,Zo,Jo,pf)||(n=[1,0,0,0,1,0,0,0,1],!j0(n,Yo,Zo,Jo,pf))?!1:(mf.crossVectors(Oa,Ia),n=[mf.x,mf.y,mf.z],j0(n,Yo,Zo,Jo,pf))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ki).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ki).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},qs=[new P,new P,new P,new P,new P,new P,new P,new P],ki=new P,df=new za,Yo=new P,Zo=new P,Jo=new P,Oa=new P,Ia=new P,Ar=new P,Nc=new P,pf=new P,mf=new P,wr=new P;function j0(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){wr.fromArray(e,a);let o=s.x*Math.abs(wr.x)+s.y*Math.abs(wr.y)+s.z*Math.abs(wr.z),l=t.dot(wr),c=n.dot(wr),f=i.dot(wr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}var qe=new P,gf=new $t,LR=0,Ye=class extends ys{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:LR++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=eE,this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)gf.fromBufferAttribute(this,n),gf.applyMatrix3(t),this.setXY(n,gf.x,gf.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.applyMatrix3(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.applyMatrix4(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.applyNormalMatrix(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)qe.fromBufferAttribute(this,n),qe.transformDirection(t),this.setXYZ(n,qe.x,qe.y,qe.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Cc(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Jn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Cc(n,this.array)),n}setX(t,n){return this.normalized&&(n=Jn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Cc(n,this.array)),n}setY(t,n){return this.normalized&&(n=Jn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Cc(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Jn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Cc(n,this.array)),n}setW(t,n){return this.normalized&&(n=Jn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Jn(n,this.array),i=Jn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Jn(n,this.array),i=Jn(i,this.array),s=Jn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Jn(n,this.array),i=Jn(i,this.array),s=Jn(s,this.array),a=Jn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Vc=class extends Ye{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Gc=class extends Ye{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var cn=class extends Ye{constructor(t,n,i){super(new Float32Array(t),n,i)}},OR=new za,Dc=new P,$0=new P,Dr=class{constructor(t=new P,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):OR.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Dc.subVectors(t,this.center);let n=Dc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Dc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Dc.copy(t.center).add($0)),this.expandByPoint(Dc.copy(t.center).sub($0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},IR=0,Ni=new Fe,tv=new gi,Ko=new P,pi=new za,Uc=new za,ln=new P,Rn=class e extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:IR++}),this.uuid=lu(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xR(t)?Gc:Vc)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Ot().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ni.makeRotationFromQuaternion(t),this.applyMatrix4(Ni),this}rotateX(t){return Ni.makeRotationX(t),this.applyMatrix4(Ni),this}rotateY(t){return Ni.makeRotationY(t),this.applyMatrix4(Ni),this}rotateZ(t){return Ni.makeRotationZ(t),this.applyMatrix4(Ni),this}translate(t,n,i){return Ni.makeTranslation(t,n,i),this.applyMatrix4(Ni),this}scale(t,n,i){return Ni.makeScale(t,n,i),this.applyMatrix4(Ni),this}lookAt(t){return tv.lookAt(t),tv.updateMatrix(),this.applyMatrix4(tv.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ko).negate(),this.translate(Ko.x,Ko.y,Ko.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new cn(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new za);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];pi.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dr);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Uc.setFromBufferAttribute(o),this.morphTargetsRelative?(ln.addVectors(pi.min,Uc.min),pi.expandByPoint(ln),ln.addVectors(pi.max,Uc.max),pi.expandByPoint(ln)):(pi.expandByPoint(Uc.min),pi.expandByPoint(Uc.max))}pi.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)ln.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(ln));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)ln.fromBufferAttribute(o,c),l&&(Ko.fromBufferAttribute(t,c),ln.add(Ko)),s=Math.max(s,i.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Ye(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new P,l[x]=new P;let c=new P,f=new P,p=new P,u=new $t,d=new $t,g=new $t,b=new P,m=new P;function h(x,A,R){c.fromBufferAttribute(i,x),f.fromBufferAttribute(i,A),p.fromBufferAttribute(i,R),u.fromBufferAttribute(a,x),d.fromBufferAttribute(a,A),g.fromBufferAttribute(a,R),f.sub(c),p.sub(c),d.sub(u),g.sub(u);let U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(b.copy(f).multiplyScalar(g.y).addScaledVector(p,-d.y).multiplyScalar(U),m.copy(p).multiplyScalar(d.x).addScaledVector(f,-g.x).multiplyScalar(U),o[x].add(b),o[A].add(b),o[R].add(b),l[x].add(m),l[A].add(m),l[R].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,A=v.length;x<A;++x){let R=v[x],U=R.start,B=R.count;for(let k=U,O=U+B;k<O;k+=3)h(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let S=new P,_=new P,E=new P,T=new P;function w(x){E.fromBufferAttribute(s,x),T.copy(E);let A=o[x];S.copy(A),S.sub(E.multiplyScalar(E.dot(A))).normalize(),_.crossVectors(T,A);let U=_.dot(l[x])<0?-1:1;r.setXYZW(x,S.x,S.y,S.z,U)}for(let x=0,A=v.length;x<A;++x){let R=v[x],U=R.start,B=R.count;for(let k=U,O=U+B;k<O;k+=3)w(t.getX(k+0)),w(t.getX(k+1)),w(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Ye(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let s=new P,a=new P,r=new P,o=new P,l=new P,c=new P,f=new P,p=new P;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),b=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(n,g),a.fromBufferAttribute(n,b),r.fromBufferAttribute(n,m),f.subVectors(r,a),p.subVectors(s,a),f.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=n.count;u<d;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),f.subVectors(r,a),p.subVectors(s,a),f.cross(p),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)ln.fromBufferAttribute(t,n),ln.normalize(),t.setXYZ(n,ln.x,ln.y,ln.z)}toNonIndexed(){function t(o,l){let c=o.array,f=o.itemSize,p=o.normalized,u=new c.constructor(l.length*f),d=0,g=0;for(let b=0,m=l.length;b<m;b++){o.isInterleavedBufferAttribute?d=l[b]*o.data.stride+o.offset:d=l[b]*f;for(let h=0;h<f;h++)u[g++]=c[d++]}return new Ye(u,f,p)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let f=0,p=c.length;f<p;f++){let u=c[f],d=t(u,i);l.push(d)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let p=0,u=c.length;p<u;p++){let d=c[p];f.push(d.toJSON(t.data))}f.length>0&&(s[l]=f,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let f=s[c];this.setAttribute(c,f.clone(n))}let a=t.morphAttributes;for(let c in a){let f=[],p=a[c];for(let u=0,d=p.length;u<d;u++)f.push(p[u].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,f=r.length;c<f;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ev=new P,PR=new P,BR=new Ot,Xi=class{constructor(t=new P(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=ev.subVectors(i,n).cross(PR.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){let s=t.delta(ev),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/a;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(s,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||BR.getNormalMatrix(t),s=this.coplanarPoint(ev).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},FR=0,Ha=class extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:FR++}),this.uuid=lu(),this.name="",this.type="Material",this.blending=cl,this.side=qa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mv,this.blendDst=gv,this.blendEquation=Ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=el,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Z1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Uf,this.stencilZFail=Uf,this.stencilZPass=Uf,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Rt(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Rt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Xi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $t().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $t().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Ys=new P,nv=new P,vf=new P,_f=new P,kc=class{constructor(t=new P,n=new P(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ys)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Ys.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ys.copy(this.origin).addScaledVector(this.direction,n),Ys.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){nv.copy(t).add(n).multiplyScalar(.5),vf.copy(n).sub(t).normalize(),_f.copy(this.origin).sub(nv);let a=t.distanceTo(n)*.5,r=-this.direction.dot(vf),o=_f.dot(this.direction),l=-_f.dot(vf),c=_f.lengthSq(),f=Math.abs(1-r*r),p,u,d,g;if(f>0)if(p=r*l-o,u=r*o-l,g=a*f,p>=0)if(u>=-g)if(u<=g){let b=1/f;p*=b,u*=b,d=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u=-a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-r*a+o)),u=p>0?-a:Math.min(Math.max(-a,-l),a),d=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-a,-l),a),d=u*(u+2*l)+c):(p=Math.max(0,-(r*a+o)),u=p>0?a:Math.min(Math.max(-a,-l),a),d=-p*p+u*(u+2*l)+c);else u=r>0?-a:a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(nv).addScaledVector(vf,u),d}intersectSphere(t,n){if(t.radius<0)return null;Ys.subVectors(t.center,this.origin);let i=Ys.dot(this.direction),s=Ys.dot(Ys)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),f>=0?(a=(t.min.y-u.y)*f,r=(t.max.y-u.y)*f):(a=(t.max.y-u.y)*f,r=(t.min.y-u.y)*f),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Ys)!==null}intersectTriangle(t,n,i,s,a){let r=this.origin,o=this.direction,l=o.x,c=o.y,f=o.z,p=t.x-r.x,u=t.y-r.y,d=t.z-r.z,g=n.x-r.x,b=n.y-r.y,m=n.z-r.z,h=i.x-r.x,v=i.y-r.y,S=i.z-r.z,_=Math.abs(l),E=Math.abs(c),T=Math.abs(f),w,x,A,R,U,B,k,O,G,K,W,et;if(_>=E&&_>=T?(A=l,B=p,G=g,et=h,l>=0?(w=c,x=f,R=u,U=d,k=b,O=m,K=v,W=S):(w=f,x=c,R=d,U=u,k=m,O=b,K=S,W=v)):E>=T?(A=c,B=u,G=b,et=v,c>=0?(w=f,x=l,R=d,U=p,k=m,O=g,K=S,W=h):(w=l,x=f,R=p,U=d,k=g,O=m,K=h,W=S)):(A=f,B=d,G=m,et=S,f>=0?(w=l,x=c,R=p,U=u,k=g,O=b,K=h,W=v):(w=c,x=l,R=u,U=p,k=b,O=g,K=v,W=h)),A===0)return null;let V=w/A,J=x/A,nt=1/A,At=R-V*B,St=U-J*B,pe=k-V*G,Wt=O-J*G,Kt=K-V*et,q=W-J*et,tt=Kt*Wt-q*pe,gt=At*q-St*Kt,Ut=pe*St-Wt*At;if(s){if(tt<0||gt<0||Ut<0)return null}else if((tt<0||gt<0||Ut<0)&&(tt>0||gt>0||Ut>0))return null;let vt=tt+gt+Ut;if(vt===0)return null;let Ht=nt*(tt*B+gt*G+Ut*et);return(vt>0?Ht<0:Ht>0)?null:this.at(Ht/vt,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xc=class extends Ha{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fa,this.combine=vv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},d1=new Fe,Cr=new kc,yf=new Dr,p1=new P,xf=new P,Sf=new P,bf=new P,iv=new P,Mf=new P,m1=new P,Ef=new P,hn=class extends gi{constructor(t=new Rn,n=new Xc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){Mf.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let f=o[l],p=a[l];f!==0&&(iv.fromBufferAttribute(p,t),r?Mf.addScaledVector(iv,f):Mf.addScaledVector(iv.sub(n),f))}n.add(Mf)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yf.copy(i.boundingSphere),yf.applyMatrix4(a),Cr.copy(t.ray).recast(t.near),!(yf.containsPoint(Cr.origin)===!1&&(Cr.intersectSphere(yf,p1)===null||Cr.origin.distanceToSquared(p1)>(t.far-t.near)**2))&&(d1.copy(a).invert(),Cr.copy(t.ray).applyMatrix4(d1),!(i.boundingBox!==null&&Cr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Cr)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,f=a.attributes.uv1,p=a.attributes.normal,u=a.groups,d=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){let m=u[g],h=r[m.materialIndex],v=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,E=S;_<E;_+=3){let T=o.getX(_),w=o.getX(_+1),x=o.getX(_+2);s=Tf(this,h,t,i,c,f,p,T,w,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let m=g,h=b;m<h;m+=3){let v=o.getX(m),S=o.getX(m+1),_=o.getX(m+2);s=Tf(this,r,t,i,c,f,p,v,S,_),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){let m=u[g],h=r[m.materialIndex],v=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,E=S;_<E;_+=3){let T=_,w=_+1,x=_+2;s=Tf(this,h,t,i,c,f,p,T,w,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,d.start),b=Math.min(l.count,d.start+d.count);for(let m=g,h=b;m<h;m+=3){let v=m,S=m+1,_=m+2;s=Tf(this,r,t,i,c,f,p,v,S,_),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function zR(e,t,n,i,s,a,r,o){let l;if(t.side===zn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===qa,o),l===null)return null;Ef.copy(o),Ef.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Ef);return c<n.near||c>n.far?null:{distance:c,point:Ef.clone(),object:e}}function Tf(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,xf),e.getVertexPosition(l,Sf),e.getVertexPosition(c,bf);let f=zR(e,t,n,i,xf,Sf,bf,m1);if(f){let p=new P;Ba.getBarycoord(m1,xf,Sf,bf,p),s&&(f.uv=Ba.getInterpolatedAttribute(s,o,l,c,p,new $t)),a&&(f.uv1=Ba.getInterpolatedAttribute(a,o,l,c,p,new $t)),r&&(f.normal=Ba.getInterpolatedAttribute(r,o,l,c,p,new P),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};Ba.getNormal(xf,Sf,bf,u.normal),f.face=u,f.barycoord=p}return f}var Yf=class extends Kn{constructor(t=null,n=1,i=1,s,a,r,o,l,c=un,f=un,p,u){super(null,r,o,l,c,f,s,a,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rr=new Dr,HR=new $t(.5,.5),Af=new P,Wc=class{constructor(t=new Xi,n=new Xi,i=new Xi,s=new Xi,a=new Xi,r=new Xi){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Wi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],f=a[4],p=a[5],u=a[6],d=a[7],g=a[8],b=a[9],m=a[10],h=a[11],v=a[12],S=a[13],_=a[14],E=a[15];if(s[0].setComponents(c-r,d-f,h-g,E-v).normalize(),s[1].setComponents(c+r,d+f,h+g,E+v).normalize(),s[2].setComponents(c+o,d+p,h+b,E+S).normalize(),s[3].setComponents(c-o,d-p,h-b,E-S).normalize(),i)s[4].setComponents(l,u,m,_).normalize(),s[5].setComponents(c-l,d-u,h-m,E-_).normalize();else if(s[4].setComponents(c-l,d-u,h-m,E-_).normalize(),n===Wi)s[5].setComponents(c+l,d+u,h+m,E+_).normalize();else if(n===Pc)s[5].setComponents(l,u,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Rr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Rr)}intersectsSprite(t){Rr.center.set(0,0,0);let n=HR.distanceTo(t.center);return Rr.radius=.7071067811865476+n,Rr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Rr)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(Af.x=s.normal.x>0?t.max.x:t.min.x,Af.y=s.normal.y>0?t.max.y:t.min.y,Af.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Af)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Zf=class extends Ha{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},g1=new Fe,cv=new kc,wf=new Dr,Cf=new P,al=class extends gi{constructor(t=new Rn,n=new Zf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.matrixWorld,a=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wf.copy(i.boundingSphere),wf.applyMatrix4(s),wf.radius+=a,t.ray.intersectsSphere(wf)===!1)return;g1.copy(s).invert(),cv.copy(t.ray).applyMatrix4(g1);let o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,p=i.attributes.position;if(c!==null){let u=Math.max(0,r.start),d=Math.min(c.count,r.start+r.count);for(let g=u,b=d;g<b;g++){let m=c.getX(g);Cf.fromBufferAttribute(p,m),v1(Cf,m,l,s,t,n,this)}}else{let u=Math.max(0,r.start),d=Math.min(p.count,r.start+r.count);for(let g=u,b=d;g<b;g++)Cf.fromBufferAttribute(p,g),v1(Cf,g,l,s,t,n,this)}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}};function v1(e,t,n,i,s,a,r){let o=cv.distanceSqToPoint(e);if(o<n){let l=new P;cv.closestPointToPoint(e,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}var qc=class extends Kn{constructor(t=[],n=Ya,i,s,a,r,o,l,c,f){super(t,n,i,s,a,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Va=class extends Kn{constructor(t,n,i=Yi,s,a,r,o=un,l=un,c,f=_s,p=1){if(f!==_s&&f!==Ja)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,s,a,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new il(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}},Jf=class extends Va{constructor(t,n=Yi,i=Ya,s,a,r=un,o=un,l,c=_s){let f={width:t,height:t,depth:1},p=[f,f,f,f,f,f];super(t,t,n,i,s,a,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Yc=class extends Kn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},rl=class e extends Rn{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],f=[],p=[],u=0,d=0;g("z","y","x",-1,-1,i,n,t,r,a,0),g("z","y","x",1,-1,i,n,-t,r,a,1),g("x","z","y",1,1,t,i,n,s,r,2),g("x","z","y",1,-1,t,i,-n,s,r,3),g("x","y","z",1,-1,t,n,i,s,a,4),g("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new cn(c,3)),this.setAttribute("normal",new cn(f,3)),this.setAttribute("uv",new cn(p,2));function g(b,m,h,v,S,_,E,T,w,x,A){let R=_/w,U=E/x,B=_/2,k=E/2,O=T/2,G=w+1,K=x+1,W=0,et=0,V=new P;for(let J=0;J<K;J++){let nt=J*U-k;for(let At=0;At<G;At++){let St=At*R-B;V[b]=St*v,V[m]=nt*S,V[h]=O,c.push(V.x,V.y,V.z),V[b]=0,V[m]=0,V[h]=T>0?1:-1,f.push(V.x,V.y,V.z),p.push(At/w),p.push(1-J/x),W+=1}}for(let J=0;J<x;J++)for(let nt=0;nt<w;nt++){let At=u+nt+G*J,St=u+nt+G*(J+1),pe=u+(nt+1)+G*(J+1),Wt=u+(nt+1)+G*J;l.push(At,St,Wt),l.push(St,pe,Wt),et+=6}o.addGroup(d,et,A),d+=et,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ga=class e extends Rn{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,f=l+1,p=t/o,u=n/l,d=[],g=[],b=[],m=[];for(let h=0;h<f;h++){let v=h*u-r;for(let S=0;S<c;S++){let _=S*p-a;g.push(_,-v,0),b.push(0,0,1),m.push(S/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<o;v++){let S=v+c*h,_=v+c*(h+1),E=v+1+c*(h+1),T=v+1+c*h;d.push(S,_,T),d.push(_,E,T)}this.setIndex(d),this.setAttribute("position",new cn(g,3)),this.setAttribute("normal",new cn(b,3)),this.setAttribute("uv",new cn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Zc=class e extends Rn{constructor(t=.5,n=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],f=[],p=t,u=(n-t)/s,d=new P,g=new $t;for(let b=0;b<=s;b++){for(let m=0;m<=i;m++){let h=a+m/i*r;d.x=p*Math.cos(h),d.y=p*Math.sin(h),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/n+1)/2,g.y=(d.y/n+1)/2,f.push(g.x,g.y)}p+=u}for(let b=0;b<s;b++){let m=b*(i+1);for(let h=0;h<i;h++){let v=h+m,S=v,_=v+i+1,E=v+i+2,T=v+1;o.push(S,_,T),o.push(_,E,T)}}this.setIndex(o),this.setAttribute("position",new cn(l,3)),this.setAttribute("normal",new cn(c,3)),this.setAttribute("uv",new cn(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ol=class e extends Rn{constructor(t=1,n=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let l=Math.min(r+o,Math.PI),c=0,f=[],p=new P,u=new P,d=[],g=[],b=[],m=[];for(let h=0;h<=i;h++){let v=[],S=h/i,_=r+S*o,E=t*Math.cos(_),T=Math.sqrt(t*t-E*E),w=0;h===0&&r===0?w=.5/n:h===i&&l===Math.PI&&(w=-.5/n);for(let x=0;x<=n;x++){let A=x/n,R=s+A*a;p.x=-T*Math.cos(R),p.y=E,p.z=T*Math.sin(R),g.push(p.x,p.y,p.z),u.copy(p).normalize(),b.push(u.x,u.y,u.z),m.push(A+w,1-S),v.push(c++)}f.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){let S=f[h][v+1],_=f[h][v],E=f[h+1][v],T=f[h+1][v+1];(h!==0||r>0)&&d.push(S,_,T),(h!==i-1||l<Math.PI)&&d.push(_,E,T)}this.setIndex(d),this.setAttribute("position",new cn(g,3)),this.setAttribute("normal",new cn(b,3)),this.setAttribute("uv",new cn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Or(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];if(_1(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone();else if(Array.isArray(s))if(_1(s[0])){let a=[];for(let r=0,o=s.length;r<o;r++)a[r]=s[r].clone();t[n][i]=a}else t[n][i]=s.slice();else t[n][i]=s}}return t}function Dn(e){let t={};for(let n=0;n<e.length;n++){let i=Or(e[n]);for(let s in i)t[s]=i[s]}return t}function _1(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function VR(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Pv(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}var oE={clone:Or,merge:Dn},GR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nn=class extends Ha{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=GR,this.fragmentShader=kR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Or(t.uniforms),this.uniformsGroups=VR(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=n[s.value]||null;break;case"c":this.uniforms[i].value=new Qt().setHex(s.value);break;case"v2":this.uniforms[i].value=new $t().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Fe().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Kf=class extends Nn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Qf=class extends Ha{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=q1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},jf=class extends Ha{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Qo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function sv(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ka=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},$f=class extends ka{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rv,endingEnd:rv}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case ov:a=t,o=2*n-i;break;case lv:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ov:r=t,l=2*i-n;break;case lv:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,f=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*f,this._offsetNext=r*f}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-n)/(s-n),b=g*g,m=b*g,h=-u*m+2*u*b-u*g,v=(1+u)*m+(-1.5-2*u)*b+(-.5+u)*g+1,S=(-1-d)*m+(1.5+d)*b+.5*g,_=d*m-d*b;for(let E=0;E!==o;++E)a[E]=h*r[f+E]+v*r[c+E]+S*r[l+E]+_*r[p+E];return a}},td=class extends ka{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=(i-n)/(s-n),p=1-f;for(let u=0;u!==o;++u)a[u]=r[c+u]*p+r[l+u]*f;return a}},ed=class extends ka{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},nd=class extends ka{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this.inTangents,p=this.outTangents;if(!f||!p){let g=(i-n)/(s-n),b=1-g;for(let m=0;m!==o;++m)a[m]=r[c+m]*b+r[l+m]*g;return a}let u=o*2,d=t-1;for(let g=0;g!==o;++g){let b=r[c+g],m=r[l+g],h=d*u+g*2,v=p[h],S=p[h+1],_=t*u+g*2,E=f[_],T=f[_+1],w=WR(i,n,v,E,s);a[g]=lE(w,b,S,T,m)}return a}};function lE(e,t,n,i,s){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*i+e*e*e*s}function XR(e,t,n,i,s){let a=1-e;return 3*a*a*(n-t)+6*a*e*(i-n)+3*e*e*(s-i)}function WR(e,t,n,i,s){let a=(e-t)/(s-t);for(let r=0;r<8;r++){let o=lE(a,t,n,i,s)-e;if(Math.abs(o)<1e-10)break;let l=XR(a,t,n,i,s);if(Math.abs(l)<1e-10)break;a=Math.max(0,Math.min(1,a-o/l))}return a}var vi=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qo(n,this.TimeBufferType),this.values=Qo(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:Qo(t.times,Array),values:Qo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),sv(t.settings)&&(i.settings={inTangents:Qo(t.settings.inTangents,Array),outTangents:Qo(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ed(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new td(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new $f(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new nd(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.inTangents=this.settings.inTangents,n.outTangents=this.settings.outTangents),n}setInterpolation(t){let n;switch(t){case Lc:n=this.InterpolantFactoryMethodDiscrete;break;case Gf:n=this.InterpolantFactoryMethodLinear;break;case Df:n=this.InterpolantFactoryMethodSmooth;break;case av:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Rt("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Lc;case this.InterpolantFactoryMethodLinear:return Gf;case this.InterpolantFactoryMethodSmooth:return Df;case this.InterpolantFactoryMethodBezier:return av}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t;sv(this.settings)&&(y1(this.settings.inTangents,t),y1(this.settings.outTangents,t))}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&SR(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Df,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],f=t[o+1];if(c!==f&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*i,u=p-i,d=p+i;for(let g=0;g!==i;++g){let b=n[p+g];if(b!==n[u+g]||b!==n[d+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let d=0;d!==i;++d)n[u+d]=n[p+d]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,sv(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function y1(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]*=t}vi.prototype.ValueTypeName="";vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=Gf;var Xa=class extends vi{constructor(t,n,i){super(t,n,i)}};Xa.prototype.ValueTypeName="bool";Xa.prototype.ValueBufferType=Array;Xa.prototype.DefaultInterpolation=Lc;Xa.prototype.InterpolantFactoryMethodLinear=void 0;Xa.prototype.InterpolantFactoryMethodSmooth=void 0;var id=class extends vi{constructor(t,n,i,s){super(t,n,i,s)}};id.prototype.ValueTypeName="color";var sd=class extends vi{constructor(t,n,i,s){super(t,n,i,s)}};sd.prototype.ValueTypeName="number";var ad=class extends ka{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let f=c+o;c!==f;c+=4)xs.slerpFlat(a,0,r,c-o,r,c,l);return a}},Jc=class extends vi{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new ad(this.times,this.values,this.getValueSize(),t)}};Jc.prototype.ValueTypeName="quaternion";Jc.prototype.InterpolantFactoryMethodSmooth=void 0;var Wa=class extends vi{constructor(t,n,i){super(t,n,i)}};Wa.prototype.ValueTypeName="string";Wa.prototype.ValueBufferType=Array;Wa.prototype.DefaultInterpolation=Lc;Wa.prototype.InterpolantFactoryMethodLinear=void 0;Wa.prototype.InterpolantFactoryMethodSmooth=void 0;var rd=class extends vi{constructor(t,n,i,s){super(t,n,i,s)}};rd.prototype.ValueTypeName="vector";var od=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(f){o++,a===!1&&s.onStart!==void 0&&s.onStart(f,r,o),a=!0},this.itemEnd=function(f){r++,s.onProgress!==void 0&&s.onProgress(f,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(f){s.onError!==void 0&&s.onError(f)},this.resolveURL=function(f){return f=f.normalize("NFC"),l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,p){return c.push(f,p),this},this.removeHandler=function(f){let p=c.indexOf(f);return p!==-1&&c.splice(p,2),this},this.getHandler=function(f){for(let p=0,u=c.length;p<u;p+=2){let d=c[p],g=c[p+1];if(d.global&&(d.lastIndex=0),d.test(f))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},cE=new od,ld=class{constructor(t){this.manager=t!==void 0?t:cE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ld.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rf=new P,Nf=new xs,gs=new P,Kc=class extends gi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=Wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Rf,Nf,gs),gs.x===1&&gs.y===1&&gs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rf,Nf,gs.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(Rf,Nf,gs),gs.x===1&&gs.y===1&&gs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rf,Nf,gs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Pa=new P,x1=new $t,S1=new $t,Cn=class extends Kc{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=kf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(B0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return kf*2*Math.atan(Math.tan(B0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Pa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pa.x,Pa.y).multiplyScalar(-t/Pa.z),Pa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pa.x,Pa.y).multiplyScalar(-t/Pa.z)}getViewSize(t,n){return this.getViewBounds(t,x1,S1),n.subVectors(S1,x1)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(B0*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var Qc=class extends Kc{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var jo=-90,$o=1,cd=class extends gi{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Cn(jo,$o,t,n);s.layers=this.layers,this.add(s);let a=new Cn(jo,$o,t,n);a.layers=this.layers,this.add(a);let r=new Cn(jo,$o,t,n);r.layers=this.layers,this.add(r);let o=new Cn(jo,$o,t,n);o.layers=this.layers,this.add(o);let l=new Cn(jo,$o,t,n);l.layers=this.layers,this.add(l);let c=new Cn(jo,$o,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===Wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Pc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,f]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,f),t.setRenderTarget(p,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ud=class extends Cn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Bv="\\[\\]\\.:\\/",qR=new RegExp("["+Bv+"]","g"),Fv="[^"+Bv+"]",YR="[^"+Bv.replace("\\.","")+"]",ZR=/((?:WC+[\/:])*)/.source.replace("WC",Fv),JR=/(WCOD+)?/.source.replace("WCOD",YR),KR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fv),QR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fv),jR=new RegExp("^"+ZR+JR+KR+QR+"$"),$R=["material","materials","bones","map"],uv=class{constructor(t,n,i){let s=i||Ce.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Ce=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(qR,"")}static parseTrackName(t){let n=jR.exec(t);if(n===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);$R.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===c){c=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ce.Composite=uv;Ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ce.prototype.GetterByBindingType=[Ce.prototype._getValue_direct,Ce.prototype._getValue_array,Ce.prototype._getValue_arrayElement,Ce.prototype._getValue_toArray];Ce.prototype.SetterByBindingTypeAndVersioning=[[Ce.prototype._setValue_direct,Ce.prototype._setValue_direct_setNeedsUpdate,Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_array,Ce.prototype._setValue_array_setNeedsUpdate,Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_arrayElement,Ce.prototype._setValue_arrayElement_setNeedsUpdate,Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_fromArray,Ce.prototype._setValue_fromArray_setNeedsUpdate,Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zL=new Float32Array(1);var hv=class e{static{e.prototype.isMatrix2=!0}constructor(t,n,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,s){let a=this.elements;return a[0]=t,a[2]=n,a[1]=i,a[3]=s,this}};function zv(e,t,n,i){let s=t3(i);switch(n){case Nv:return e*t;case Uv:return e*t/s.components*s.byteLength;case vd:return e*t/s.components*s.byteLength;case Ka:return e*t*2/s.components*s.byteLength;case _d:return e*t*2/s.components*s.byteLength;case Dv:return e*t*3/s.components*s.byteLength;case Ui:return e*t*4/s.components*s.byteLength;case yd:return e*t*4/s.components*s.byteLength;case nu:case iu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case su:case au:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Sd:case Md:return Math.max(e,16)*Math.max(t,8)/4;case xd:case bd:return Math.max(e,8)*Math.max(t,8)/2;case Ed:case Td:case wd:case Cd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ad:case ru:case Rd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Nd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Dd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ld:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Od:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Id:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Pd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Bd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Fd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case zd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Hd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Vd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Gd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case kd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Xd:case Wd:case qd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Yd:case Zd:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ou:case Jd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function t3(e){switch(e){case _i:case Av:return{byteLength:1,components:1};case ul:case wv:case Ji:return{byteLength:2,components:1};case md:case gd:return{byteLength:2,components:4};case Yi:case pd:case Zi:return{byteLength:4,components:1};case Cv:case Rv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function DE(){let e=null,t=!1,n=null,i=null;function s(a,r){i=e.requestAnimationFrame(s),n(a,r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function n3(e){let t=new WeakMap;function n(o,l){let c=o.array,f=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,f),o.onUploadCallback();let d;if(c instanceof Float32Array)d=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=e.SHORT;else if(c instanceof Uint32Array)d=e.UNSIGNED_INT;else if(c instanceof Int32Array)d=e.INT;else if(c instanceof Int8Array)d=e.BYTE;else if(c instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let f=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,f);else{p.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<p.length;d++){let g=p[u],b=p[d];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,p[u]=b)}p.length=u+1;for(let d=0,g=p.length;d<g;d++){let b=p[d];e.bufferSubData(c,b.start*f.BYTES_PER_ELEMENT,f,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var i3=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s3=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,a3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,r3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o3=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c3=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,u3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,h3=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,f3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,d3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,g3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,v3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,y3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,x3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,b3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,M3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,E3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,T3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,A3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,w3=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,C3=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,R3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,N3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,U3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,L3="gl_FragColor = linearToOutputTexel( gl_FragColor );",O3=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,I3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,P3=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,B3=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,F3=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,H3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,V3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,k3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,W3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,q3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Y3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Z3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,J3=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,K3=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Q3=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,j3=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,t2=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,e2=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,n2=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,i2=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,a2=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,r2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,h2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,d2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,v2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y2=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,x2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,b2=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,M2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,A2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,w2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,R2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,D2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,U2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,L2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,I2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,P2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,B2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,F2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,z2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,H2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,G2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,k2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,X2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,W2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Q2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,j2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nN=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,iN=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sN=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rN=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uN=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hN=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fN=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,dN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pN=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mN=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gN=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_N=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yN=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xN=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SN=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bN=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MN=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,EN=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,TN=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AN=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wN=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,CN=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RN=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NN=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DN=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,UN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LN=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ON=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IN=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:i3,alphahash_pars_fragment:s3,alphamap_fragment:a3,alphamap_pars_fragment:r3,alphatest_fragment:o3,alphatest_pars_fragment:l3,aomap_fragment:c3,aomap_pars_fragment:u3,batching_pars_vertex:h3,batching_vertex:f3,begin_vertex:d3,beginnormal_vertex:p3,bsdfs:m3,iridescence_fragment:g3,bumpmap_pars_fragment:v3,clipping_planes_fragment:_3,clipping_planes_pars_fragment:y3,clipping_planes_pars_vertex:x3,clipping_planes_vertex:S3,color_fragment:b3,color_pars_fragment:M3,color_pars_vertex:E3,color_vertex:T3,common:A3,cube_uv_reflection_fragment:w3,defaultnormal_vertex:C3,displacementmap_pars_vertex:R3,displacementmap_vertex:N3,emissivemap_fragment:D3,emissivemap_pars_fragment:U3,colorspace_fragment:L3,colorspace_pars_fragment:O3,envmap_fragment:I3,envmap_common_pars_fragment:P3,envmap_pars_fragment:B3,envmap_pars_vertex:F3,envmap_physical_pars_fragment:J3,envmap_vertex:z3,fog_vertex:H3,fog_pars_vertex:V3,fog_fragment:G3,fog_pars_fragment:k3,gradientmap_pars_fragment:X3,lightmap_pars_fragment:W3,lights_lambert_fragment:q3,lights_lambert_pars_fragment:Y3,lights_pars_begin:Z3,lights_toon_fragment:K3,lights_toon_pars_fragment:Q3,lights_phong_fragment:j3,lights_phong_pars_fragment:$3,lights_physical_fragment:t2,lights_physical_pars_fragment:e2,lights_fragment_begin:n2,lights_fragment_maps:i2,lights_fragment_end:s2,lightprobes_pars_fragment:a2,logdepthbuf_fragment:r2,logdepthbuf_pars_fragment:o2,logdepthbuf_pars_vertex:l2,logdepthbuf_vertex:c2,map_fragment:u2,map_pars_fragment:h2,map_particle_fragment:f2,map_particle_pars_fragment:d2,metalnessmap_fragment:p2,metalnessmap_pars_fragment:m2,morphinstance_vertex:g2,morphcolor_vertex:v2,morphnormal_vertex:_2,morphtarget_pars_vertex:y2,morphtarget_vertex:x2,normal_fragment_begin:S2,normal_fragment_maps:b2,normal_pars_fragment:M2,normal_pars_vertex:E2,normal_vertex:T2,normalmap_pars_fragment:A2,clearcoat_normal_fragment_begin:w2,clearcoat_normal_fragment_maps:C2,clearcoat_pars_fragment:R2,iridescence_pars_fragment:N2,opaque_fragment:D2,packing:U2,premultiplied_alpha_fragment:L2,project_vertex:O2,dithering_fragment:I2,dithering_pars_fragment:P2,roughnessmap_fragment:B2,roughnessmap_pars_fragment:F2,shadowmap_pars_fragment:z2,shadowmap_pars_vertex:H2,shadowmap_vertex:V2,shadowmask_pars_fragment:G2,skinbase_vertex:k2,skinning_pars_vertex:X2,skinning_vertex:W2,skinnormal_vertex:q2,specularmap_fragment:Y2,specularmap_pars_fragment:Z2,tonemapping_fragment:J2,tonemapping_pars_fragment:K2,transmission_fragment:Q2,transmission_pars_fragment:j2,uv_pars_fragment:$2,uv_pars_vertex:tN,uv_vertex:eN,worldpos_vertex:nN,background_vert:iN,background_frag:sN,backgroundCube_vert:aN,backgroundCube_frag:rN,cube_vert:oN,cube_frag:lN,depth_vert:cN,depth_frag:uN,distance_vert:hN,distance_frag:fN,equirect_vert:dN,equirect_frag:pN,linedashed_vert:mN,linedashed_frag:gN,meshbasic_vert:vN,meshbasic_frag:_N,meshlambert_vert:yN,meshlambert_frag:xN,meshmatcap_vert:SN,meshmatcap_frag:bN,meshnormal_vert:MN,meshnormal_frag:EN,meshphong_vert:TN,meshphong_frag:AN,meshphysical_vert:wN,meshphysical_frag:CN,meshtoon_vert:RN,meshtoon_frag:NN,points_vert:DN,points_frag:UN,shadow_vert:LN,shadow_frag:ON,sprite_vert:IN,sprite_frag:PN},ht={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Ms={basic:{uniforms:Dn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Dn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Qt(0)},envMapIntensity:{value:1}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Dn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Dn([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Dn([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Qt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Dn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Dn([ht.points,ht.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Dn([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Dn([ht.common,ht.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Dn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Dn([ht.sprite,ht.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distance:{uniforms:Dn([ht.common,ht.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distance_vert,fragmentShader:Ft.distance_frag},shadow:{uniforms:Dn([ht.lights,ht.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Ms.physical={uniforms:Dn([Ms.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};var jd={r:0,b:0,g:0},BN=new Fe,UE=new Ot;UE.set(-1,0,0,0,1,0,0,0,1);function FN(e,t,n,i,s,a){let r=new Qt(0),o=s===!0?0:1,l,c,f=null,p=0,u=null;function d(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){let _=v.backgroundBlurriness>0;S=t.get(S,_)}return S}function g(v){let S=!1,_=d(v);_===null?m(r,o):_&&_.isColor&&(m(_,1),S=!0);let E=e.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function b(v,S){let _=d(S);_&&(_.isCubeTexture||_.mapping===tu)?(c===void 0&&(c=new hn(new rl(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Or(Ms.backgroundCube.uniforms),vertexShader:Ms.backgroundCube.vertexShader,fragmentShader:Ms.backgroundCube.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(BN.makeRotationFromEuler(S.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(UE),c.material.toneMapped=Zt.getTransfer(_.colorSpace)!==le,(f!==_||p!==_.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,f=_,p=_.version,u=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new hn(new Ga(2,2),new Nn({name:"BackgroundMaterial",uniforms:Or(Ms.background.uniforms),vertexShader:Ms.background.vertexShader,fragmentShader:Ms.background.fragmentShader,side:qa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(_.colorSpace)!==le,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(f!==_||p!==_.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,f=_,p=_.version,u=e.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,S){v.getRGB(jd,Pv(e)),n.buffers.color.setClear(jd.r,jd.g,jd.b,S,a)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,S=1){r.set(v),o=S,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:g,addToRenderList:b,dispose:h}}function zN(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(U,B,k,O,G){let K=!1,W=p(U,O,k,B);a!==W&&(a=W,c(a.object)),K=d(U,O,k,G),K&&g(U,O,k,G),G!==null&&t.update(G,e.ELEMENT_ARRAY_BUFFER),(K||r)&&(r=!1,_(U,B,k,O),G!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return e.createVertexArray()}function c(U){return e.bindVertexArray(U)}function f(U){return e.deleteVertexArray(U)}function p(U,B,k,O){let G=O.wireframe===!0,K=i[B.id];K===void 0&&(K={},i[B.id]=K);let W=U.isInstancedMesh===!0?U.id:0,et=K[W];et===void 0&&(et={},K[W]=et);let V=et[k.id];V===void 0&&(V={},et[k.id]=V);let J=V[G];return J===void 0&&(J=u(l()),V[G]=J),J}function u(U){let B=[],k=[],O=[];for(let G=0;G<n;G++)B[G]=0,k[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:k,attributeDivisors:O,object:U,attributes:{},index:null}}function d(U,B,k,O){let G=a.attributes,K=B.attributes,W=0,et=k.getAttributes();for(let V in et)if(et[V].location>=0){let nt=G[V],At=K[V];if(At===void 0&&(V==="instanceMatrix"&&U.instanceMatrix&&(At=U.instanceMatrix),V==="instanceColor"&&U.instanceColor&&(At=U.instanceColor)),nt===void 0||nt.attribute!==At||At&&nt.data!==At.data)return!0;W++}return a.attributesNum!==W||a.index!==O}function g(U,B,k,O){let G={},K=B.attributes,W=0,et=k.getAttributes();for(let V in et)if(et[V].location>=0){let nt=K[V];nt===void 0&&(V==="instanceMatrix"&&U.instanceMatrix&&(nt=U.instanceMatrix),V==="instanceColor"&&U.instanceColor&&(nt=U.instanceColor));let At={};At.attribute=nt,nt&&nt.data&&(At.data=nt.data),G[V]=At,W++}a.attributes=G,a.attributesNum=W,a.index=O}function b(){let U=a.newAttributes;for(let B=0,k=U.length;B<k;B++)U[B]=0}function m(U){h(U,0)}function h(U,B){let k=a.newAttributes,O=a.enabledAttributes,G=a.attributeDivisors;k[U]=1,O[U]===0&&(e.enableVertexAttribArray(U),O[U]=1),G[U]!==B&&(e.vertexAttribDivisor(U,B),G[U]=B)}function v(){let U=a.newAttributes,B=a.enabledAttributes;for(let k=0,O=B.length;k<O;k++)B[k]!==U[k]&&(e.disableVertexAttribArray(k),B[k]=0)}function S(U,B,k,O,G,K,W){W===!0?e.vertexAttribIPointer(U,B,k,G,K):e.vertexAttribPointer(U,B,k,O,G,K)}function _(U,B,k,O){b();let G=O.attributes,K=k.getAttributes(),W=B.defaultAttributeValues;for(let et in K){let V=K[et];if(V.location>=0){let J=G[et];if(J===void 0&&(et==="instanceMatrix"&&U.instanceMatrix&&(J=U.instanceMatrix),et==="instanceColor"&&U.instanceColor&&(J=U.instanceColor)),J!==void 0){let nt=J.normalized,At=J.itemSize,St=t.get(J);if(St===void 0)continue;let pe=St.buffer,Wt=St.type,Kt=St.bytesPerElement,q=Wt===e.INT||Wt===e.UNSIGNED_INT||J.gpuType===pd;if(J.isInterleavedBufferAttribute){let tt=J.data,gt=tt.stride,Ut=J.offset;if(tt.isInstancedInterleavedBuffer){for(let vt=0;vt<V.locationSize;vt++)h(V.location+vt,tt.meshPerAttribute);U.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let vt=0;vt<V.locationSize;vt++)m(V.location+vt);e.bindBuffer(e.ARRAY_BUFFER,pe);for(let vt=0;vt<V.locationSize;vt++)S(V.location+vt,At/V.locationSize,Wt,nt,gt*Kt,(Ut+At/V.locationSize*vt)*Kt,q)}else{if(J.isInstancedBufferAttribute){for(let tt=0;tt<V.locationSize;tt++)h(V.location+tt,J.meshPerAttribute);U.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let tt=0;tt<V.locationSize;tt++)m(V.location+tt);e.bindBuffer(e.ARRAY_BUFFER,pe);for(let tt=0;tt<V.locationSize;tt++)S(V.location+tt,At/V.locationSize,Wt,nt,At*Kt,At/V.locationSize*tt*Kt,q)}}else if(W!==void 0){let nt=W[et];if(nt!==void 0)switch(nt.length){case 2:e.vertexAttrib2fv(V.location,nt);break;case 3:e.vertexAttrib3fv(V.location,nt);break;case 4:e.vertexAttrib4fv(V.location,nt);break;default:e.vertexAttrib1fv(V.location,nt)}}}}v()}function E(){A();for(let U in i){let B=i[U];for(let k in B){let O=B[k];for(let G in O){let K=O[G];for(let W in K)f(K[W].object),delete K[W];delete O[G]}}delete i[U]}}function T(U){if(i[U.id]===void 0)return;let B=i[U.id];for(let k in B){let O=B[k];for(let G in O){let K=O[G];for(let W in K)f(K[W].object),delete K[W];delete O[G]}}delete i[U.id]}function w(U){for(let B in i){let k=i[B];for(let O in k){let G=k[O];if(G[U.id]===void 0)continue;let K=G[U.id];for(let W in K)f(K[W].object),delete K[W];delete G[U.id]}}}function x(U){for(let B in i){let k=i[B],O=U.isInstancedMesh===!0?U.id:0,G=k[O];if(G!==void 0){for(let K in G){let W=G[K];for(let et in W)f(W[et].object),delete W[et];delete G[K]}delete k[O],Object.keys(k).length===0&&delete i[B]}}}function A(){R(),r=!0,a!==s&&(a=s,c(a.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:b,enableAttribute:m,disableUnusedAttributes:v}}function HN(e,t,n){let i;function s(l){i=l}function a(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,f){f!==0&&(e.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let u=0;for(let d=0;d<f;d++)u+=c[d];n.update(u,i,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function VN(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==Ui&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let x=w===Ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==_i&&w!==Zi&&!x&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",f=l(c);f!==c&&(Rt("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),S=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=e.getParameter(e.MAX_SAMPLES),T=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:_,maxSamples:E,samples:T}}function GN(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Xi,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let d=p.length!==0||u||i!==0||s;return s=u,i=p.length,d},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,u){n=f(p,u,0)},this.setState=function(p,u,d){let g=p.clippingPlanes,b=p.clipIntersection,m=p.clipShadows,h=e.get(p);if(!s||g===null||g.length===0||a&&!m)a?f(null):c();else{let v=a?0:i,S=v*4,_=h.clippingState||null;l.value=_,_=f(g,u,S,d);for(let E=0;E!==S;++E)_[E]=n[E];h.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(p,u,d,g){let b=p!==null?p.length:0,m=null;if(b!==0){if(m=l.value,g!==!0||m===null){let h=d+b*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let S=0,_=d;S!==b;++S,_+=4)r.copy(p[S]).applyMatrix4(v,o),r.normal.toArray(m,_),m[_+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,m}}var dl=4,kN=6,XN=20,WN=256,cu=new Qc,uE=new Qt,Hv=null,Vv=0,Gv=0,kv=!1,qN=new P,Ir=new P,tp=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=qN}=a;Hv=this._renderer.getRenderTarget(),Vv=this._renderer.getActiveCubeFace(),Gv=this._renderer.getActiveMipmapLevel(),kv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Hv,Vv,Gv),this._renderer.xr.enabled=kv,t.scissorTest=!1,fl(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Ya||t.mapping===Lr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Hv=this._renderer.getRenderTarget(),Vv=this._renderer.getActiveCubeFace(),Gv=this._renderer.getActiveMipmapLevel(),kv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Ji,format:Ui,colorSpace:Oc,depthBuffer:!1},s=hE(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hE(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=YN(a)),this._blurMaterial=JN(a,t,n),this._ggxMaterial=ZN(a,t,n)}return s}_compileMaterial(t){let n=new hn(new Rn,t);this._renderer.compile(n,cu)}_sceneToCubeUV(t,n,i,s,a){let l=new Cn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,d=p.toneMapping;p.getClearColor(uE),p.toneMapping=qi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new hn(new rl,new Xc({name:"PMREM.Background",side:zn,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,m=b.material,h=!1,v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,h=!0):(m.color.copy(uE),h=!0);for(let S=0;S<6;S++){let _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+f[S],a.y,a.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+f[S],a.z)):(l.up.set(0,c[S],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+f[S]));let E=this._cubeSize;fl(s,_*E,S>2?E:0,E,E),p.setRenderTarget(s),h&&p.render(b,l),p.render(t,l)}p.toneMapping=d,p.autoClear=u,t.background=v}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Ya||t.mapping===Lr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=dE()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fE());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;fl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,cu)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-f*f),u=c*1.25,d=p*u,{_lodMax:g}=this,b=this._sizeLods[i],m=3*b*(i>g-dl?i-g+dl:0),h=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-n,fl(a,m,h,3*b,2*b),s.setRenderTarget(a),s.render(o,cu),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=g-i,fl(t,m,h,3*b,2*b),s.setRenderTarget(t),s.render(o,cu)}_blur(t,n,i,s){let a=this._pingPongRenderTarget,r=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,a,n,i,r),this._blurPass(a,t,i,i,r)}_blurPass(t,n,i,s,a){let r=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-i;let f=this._sizeLods[s],p=3*f*(s>this._lodMax-dl?s-this._lodMax+dl:0),u=4*(this._cubeSize-f);fl(n,p,u,3*f,2*f),r.setRenderTarget(n),r.render(l,cu)}};function YN(e){let t=[],n=[],i=e,s=e-dl+1+kN;for(let a=0;a<s;a++){let r=Math.pow(2,i);t.push(r);let o=1/(r-2),l=-o,c=1+o,f=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,u=6,d=3,g=new Float32Array(d*u*p),b=new Float32Array(d*u*p);for(let h=0;h<p;h++){let v=h%3*2/3-1,S=h>2?0:-1,_=[v,S,0,v+2/3,S,0,v+2/3,S+1,0,v,S,0,v+2/3,S+1,0,v,S+1,0];g.set(_,d*u*h);for(let E=0;E<u;E++){let T=f[E*2]*2-1,w=f[E*2+1]*2-1;h===0?Ir.set(1,w,T):h===1?Ir.set(-T,1,-w):h===2?Ir.set(-T,w,1):h===3?Ir.set(-1,w,-T):h===4?Ir.set(-T,-1,w):Ir.set(T,w,-1),Ir.toArray(b,(h*u+E)*d)}}let m=new Rn;m.setAttribute("position",new Ye(g,d)),m.setAttribute("outputDirection",new Ye(b,d)),n.push(new hn(m,null)),i>dl&&i--}return{lodMeshes:n,sizeLods:t}}function hE(e,t,n){let i=new Qn(e,t,n);return i.texture.mapping=tu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fl(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function ZN(e,t,n){return new Nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:WN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ip(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function JN(e,t,n){return new Nn({name:"SphericalGaussianBlur",defines:{SAMPLES:XN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ip(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function fE(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ip(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function dE(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ip(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function ip(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ep=class extends Qn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new qc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new rl(5,5,5),a=new Nn({name:"CubemapFromEquirect",uniforms:Or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zn,blending:Ss});a.uniforms.tEquirect.value=n;let r=new hn(s,a),o=n.minFilter;return n.minFilter===Za&&(n.minFilter=xn),new cd(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};function KN(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,d=!1){return u==null?null:d?r(u):a(u)}function a(u){if(u&&u.isTexture){let d=u.mapping;if(d===hd||d===fd)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let b=new ep(g.height);return b.fromEquirectangularTexture(e,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let d=u.mapping,g=d===hd||d===fd,b=d===Ya||d===Lr;if(g||b){let m=n.get(u),h=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new tp(e)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{let v=u.image;return g&&v&&v.height>0||b&&v&&l(v)?(i===null&&(i=new tp(e)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",f),m.texture):null}}}return u}function o(u,d){return d===hd?u.mapping=Ya:d===fd&&(u.mapping=Lr),u}function l(u){let d=0,g=6;for(let b=0;b<g;b++)u[b]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(u){let d=u.target;d.removeEventListener("dispose",f);let g=n.get(d);g!==void 0&&(n.delete(d),g.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function QN(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&Nr("WebGLRenderer: "+i+" extension not supported."),s}}}function jN(e,t,n,i){let s={},a=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete s[u.id];let d=a.get(u);d&&(t.remove(d),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let d in u)t.update(u[d],e.ARRAY_BUFFER)}function c(p){let u=[],d=p.index,g=p.attributes.position,b=0;if(g===void 0)return;if(d!==null){let v=d.array;b=d.version;for(let S=0,_=v.length;S<_;S+=3){let E=v[S+0],T=v[S+1],w=v[S+2];u.push(E,T,T,w,w,E)}}else{let v=g.array;b=g.version;for(let S=0,_=v.length/3-1;S<_;S+=3){let E=S+0,T=S+1,w=S+2;u.push(E,T,T,w,w,E)}}let m=new(g.count>=65535?Gc:Vc)(u,1);m.version=b;let h=a.get(p);h&&t.remove(h),a.set(p,m)}function f(p){let u=a.get(p);if(u){let d=p.index;d!==null&&u.version<d.version&&c(p)}else c(p);return a.get(p)}return{get:o,update:l,getWireframeAttribute:f}}function $N(e,t,n){let i;function s(p){i=p}let a,r;function o(p){a=p.type,r=p.bytesPerElement}function l(p,u){e.drawElements(i,u,a,p*r),n.update(u,i,1)}function c(p,u,d){d!==0&&(e.drawElementsInstanced(i,u,a,p*r,d),n.update(u,i,d))}function f(p,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,p,0,d);let b=0;for(let m=0;m<d;m++)b+=u[m];n.update(b,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function tD(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:Dt("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function eD(e,t,n){let i=new WeakMap,s=new Ie;function a(r,o,l){let c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0,u=i.get(o);if(u===void 0||u.count!==p){let A=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],S=0;d===!0&&(S=1),g===!0&&(S=2),b===!0&&(S=3);let _=o.attributes.position.count*S,E=1;_>t.maxTextureSize&&(E=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let T=new Float32Array(_*E*4*p),w=new Fc(T,_,E,p);w.type=Zi,w.needsUpdate=!0;let x=S*4;for(let R=0;R<p;R++){let U=m[R],B=h[R],k=v[R],O=_*E*4*R;for(let G=0;G<U.count;G++){let K=G*x;d===!0&&(s.fromBufferAttribute(U,G),T[O+K+0]=s.x,T[O+K+1]=s.y,T[O+K+2]=s.z,T[O+K+3]=0),g===!0&&(s.fromBufferAttribute(B,G),T[O+K+4]=s.x,T[O+K+5]=s.y,T[O+K+6]=s.z,T[O+K+7]=0),b===!0&&(s.fromBufferAttribute(k,G),T[O+K+8]=s.x,T[O+K+9]=s.y,T[O+K+10]=s.z,T[O+K+11]=k.itemSize===4?s.w:1)}}u={count:p,texture:w,size:new $t(_,E)},i.set(o,u),o.addEventListener("dispose",A)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let d=0;for(let b=0;b<c.length;b++)d+=c[b];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function nD(e,t,n,i,s){let a=new WeakMap;function r(c){let f=s.render.frame,p=c.geometry,u=t.get(c,p);if(a.get(u)!==f&&(t.update(u),a.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==f&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,f))),c.isSkinnedMesh){let d=c.skeleton;a.get(d)!==f&&(d.update(),a.set(d,f))}return u}function o(){a=new WeakMap}function l(c){let f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:r,dispose:o}}var iD={[_v]:"LINEAR_TONE_MAPPING",[yv]:"REINHARD_TONE_MAPPING",[xv]:"CINEON_TONE_MAPPING",[Sv]:"ACES_FILMIC_TONE_MAPPING",[Mv]:"AGX_TONE_MAPPING",[Ev]:"NEUTRAL_TONE_MAPPING",[bv]:"CUSTOM_TONE_MAPPING"};function sD(e,t,n,i,s,a){let r=new Qn(t,n,{type:e,depthBuffer:s,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Rn;c.setAttribute("position",new cn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new cn([0,2,0,0,2,0],2));let f=new Kf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new hn(c,f),u=new Qc(-1,1,1,-1,0,1),d=null,g=null,b=!1,m,h=null,v=[],S=!1;this.setSize=function(_,E){r.setSize(_,E),o!==null&&o.setSize(_,E),l!==null&&l.setSize(_,E);for(let T=0;T<v.length;T++){let w=v[T];w.setSize&&w.setSize(_,E)}},this.setEffects=function(_){v=_,S=v.length>0&&v[0].isRenderPass===!0;let E=r.width,T=r.height;v.length>0&&o===null&&(o=new Qn(E,T,{type:Ji,depthBuffer:!1,stencilBuffer:!1}),l=new Qn(E,T,{type:Ji,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<v.length;w++){let x=v[w];x.setSize&&x.setSize(E,T)}},this.begin=function(_,E){if(b||_.toneMapping===qi&&v.length===0)return!1;if(h=E,E!==null){let T=E.width,w=E.height;(r.width!==T||r.height!==w)&&this.setSize(T,w)}return S===!1&&_.setRenderTarget(r),m=_.toneMapping,_.toneMapping=qi,!0},this.hasRenderPass=function(){return S},this.end=function(_,E){_.toneMapping=m,b=!0;let T=r,w=o;for(let x=0;x<v.length;x++){let A=v[x];A.enabled!==!1&&(A.render(_,w,T,E),A.needsSwap!==!1&&(T=w,w=w===o?l:o))}if(d!==_.outputColorSpace||g!==_.toneMapping){d=_.outputColorSpace,g=_.toneMapping,f.defines={},Zt.getTransfer(d)===le&&(f.defines.SRGB_TRANSFER="");let x=iD[g];x&&(f.defines[x]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=T.texture,_.setRenderTarget(h),_.render(p,u),h=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),f.dispose()}}var LE=new Kn,qv=new Va(1,1),OE=new Fc,IE=new qf,PE=new qc,pE=[],mE=[],gE=new Float32Array(16),vE=new Float32Array(9),_E=new Float32Array(4);function ml(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=pE[s];if(a===void 0&&(a=new Float32Array(s),pE[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function je(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function $e(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function sp(e,t){let n=mE[t];n===void 0&&(n=new Int32Array(t),mE[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function aD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function rD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(je(n,t))return;e.uniform2fv(this.addr,t),$e(n,t)}}function oD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(je(n,t))return;e.uniform3fv(this.addr,t),$e(n,t)}}function lD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(je(n,t))return;e.uniform4fv(this.addr,t),$e(n,t)}}function cD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(je(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$e(n,t)}else{if(je(n,i))return;_E.set(i),e.uniformMatrix2fv(this.addr,!1,_E),$e(n,i)}}function uD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(je(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$e(n,t)}else{if(je(n,i))return;vE.set(i),e.uniformMatrix3fv(this.addr,!1,vE),$e(n,i)}}function hD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(je(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$e(n,t)}else{if(je(n,i))return;gE.set(i),e.uniformMatrix4fv(this.addr,!1,gE),$e(n,i)}}function fD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function dD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(je(n,t))return;e.uniform2iv(this.addr,t),$e(n,t)}}function pD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(je(n,t))return;e.uniform3iv(this.addr,t),$e(n,t)}}function mD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(je(n,t))return;e.uniform4iv(this.addr,t),$e(n,t)}}function gD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function vD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(je(n,t))return;e.uniform2uiv(this.addr,t),$e(n,t)}}function _D(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(je(n,t))return;e.uniform3uiv(this.addr,t),$e(n,t)}}function yD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(je(n,t))return;e.uniform4uiv(this.addr,t),$e(n,t)}}function xD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(qv.compareFunction=n.isReversedDepthBuffer()?Qd:Kd,a=qv):a=LE,n.setTexture2D(t||a,s)}function SD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||IE,s)}function bD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||PE,s)}function MD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||OE,s)}function ED(e){switch(e){case 5126:return aD;case 35664:return rD;case 35665:return oD;case 35666:return lD;case 35674:return cD;case 35675:return uD;case 35676:return hD;case 5124:case 35670:return fD;case 35667:case 35671:return dD;case 35668:case 35672:return pD;case 35669:case 35673:return mD;case 5125:return gD;case 36294:return vD;case 36295:return _D;case 36296:return yD;case 35678:case 36198:case 36298:case 36306:case 35682:return xD;case 35679:case 36299:case 36307:return SD;case 35680:case 36300:case 36308:case 36293:return bD;case 36289:case 36303:case 36311:case 36292:return MD}}function TD(e,t){e.uniform1fv(this.addr,t)}function AD(e,t){let n=ml(t,this.size,2);e.uniform2fv(this.addr,n)}function wD(e,t){let n=ml(t,this.size,3);e.uniform3fv(this.addr,n)}function CD(e,t){let n=ml(t,this.size,4);e.uniform4fv(this.addr,n)}function RD(e,t){let n=ml(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ND(e,t){let n=ml(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function DD(e,t){let n=ml(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function UD(e,t){e.uniform1iv(this.addr,t)}function LD(e,t){e.uniform2iv(this.addr,t)}function OD(e,t){e.uniform3iv(this.addr,t)}function ID(e,t){e.uniform4iv(this.addr,t)}function PD(e,t){e.uniform1uiv(this.addr,t)}function BD(e,t){e.uniform2uiv(this.addr,t)}function FD(e,t){e.uniform3uiv(this.addr,t)}function zD(e,t){e.uniform4uiv(this.addr,t)}function HD(e,t,n){let i=this.cache,s=t.length,a=sp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=qv:r=LE;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function VD(e,t,n){let i=this.cache,s=t.length,a=sp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||IE,a[r])}function GD(e,t,n){let i=this.cache,s=t.length,a=sp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||PE,a[r])}function kD(e,t,n){let i=this.cache,s=t.length,a=sp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||OE,a[r])}function XD(e){switch(e){case 5126:return TD;case 35664:return AD;case 35665:return wD;case 35666:return CD;case 35674:return RD;case 35675:return ND;case 35676:return DD;case 5124:case 35670:return UD;case 35667:case 35671:return LD;case 35668:case 35672:return OD;case 35669:case 35673:return ID;case 5125:return PD;case 36294:return BD;case 36295:return FD;case 36296:return zD;case 35678:case 36198:case 36298:case 36306:case 35682:return HD;case 35679:case 36299:case 36307:return VD;case 35680:case 36300:case 36308:case 36293:return GD;case 36289:case 36303:case 36311:case 36292:return kD}}var Yv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=ED(n.type)}},Zv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=XD(n.type)}},Jv=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},Xv=/(\w+)(\])?(\[|\.)?/g;function yE(e,t){e.seq.push(t),e.map[t.id]=t}function WD(e,t,n){let i=e.name,s=i.length;for(Xv.lastIndex=0;;){let a=Xv.exec(i),r=Xv.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){yE(n,c===void 0?new Yv(o,e,t):new Zv(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new Jv(o),yE(n,p)),n=p}}}var pl=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);WD(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function xE(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var qD=37297,YD=0;function ZD(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var SE=new Ot;function JD(e){Zt._getMatrix(SE,Zt.workingColorSpace,e);let t=`mat3( ${SE.elements.map(n=>n.toFixed(4))} )`;switch(Zt.getTransfer(e)){case Ic:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function bE(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+ZD(e.getShaderSource(t),o)}else return a}function KD(e,t){let n=JD(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var QD={[_v]:"Linear",[yv]:"Reinhard",[xv]:"Cineon",[Sv]:"ACESFilmic",[Mv]:"AgX",[Ev]:"Neutral",[bv]:"Custom"};function jD(e,t){let n=QD[t];return n===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var $d=new P;function $D(){Zt.getLuminanceCoefficients($d);let e=$d.x.toFixed(4),t=$d.y.toFixed(4),n=$d.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tU(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hu).join(`
`)}function eU(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function nU(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function hu(e){return e!==""}function ME(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function EE(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var iU=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kv(e){return e.replace(iU,aU)}var sU=new Map;function aU(e,t){let n=Ft[t];if(n===void 0){let i=sU.get(t);if(i!==void 0)n=Ft[i],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Kv(n)}var rU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function TE(e){return e.replace(rU,oU)}function oU(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function AE(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var lU={[jc]:"SHADOWMAP_TYPE_PCF",[ll]:"SHADOWMAP_TYPE_VSM"};function cU(e){return lU[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var uU={[Ya]:"ENVMAP_TYPE_CUBE",[Lr]:"ENVMAP_TYPE_CUBE",[tu]:"ENVMAP_TYPE_CUBE_UV"};function hU(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":uU[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var fU={[Lr]:"ENVMAP_MODE_REFRACTION"};function dU(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":fU[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var pU={[vv]:"ENVMAP_BLENDING_MULTIPLY",[k1]:"ENVMAP_BLENDING_MIX",[X1]:"ENVMAP_BLENDING_ADD"};function mU(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":pU[e.combine]||"ENVMAP_BLENDING_NONE"}function gU(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function vU(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=cU(n),c=hU(n),f=dU(n),p=mU(n),u=gU(n),d=tU(n),g=eU(a),b=s.createProgram(),m,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(hu).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(hu).join(`
`),h.length>0&&(h+=`
`)):(m=[AE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hu).join(`
`),h=[AE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==qi?"#define TONE_MAPPING":"",n.toneMapping!==qi?Ft.tonemapping_pars_fragment:"",n.toneMapping!==qi?jD("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,KD("linearToOutputTexel",n.outputColorSpace),$D(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(hu).join(`
`)),r=Kv(r),r=ME(r,n),r=EE(r,n),o=Kv(o),o=ME(o,n),o=EE(o,n),r=TE(r),o=TE(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===Ov?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ov?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let S=v+m+r,_=v+h+o,E=xE(s,s.VERTEX_SHADER,S),T=xE(s,s.FRAGMENT_SHADER,_);s.attachShader(b,E),s.attachShader(b,T),n.index0AttributeName!==void 0?s.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function w(U){if(e.debug.checkShaderErrors){let B=s.getProgramInfoLog(b)||"",k=s.getShaderInfoLog(E)||"",O=s.getShaderInfoLog(T)||"",G=B.trim(),K=k.trim(),W=O.trim(),et=!0,V=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(et=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,b,E,T);else{let J=bE(s,E,"vertex"),nt=bE(s,T,"fragment");Dt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+G+`
`+J+`
`+nt)}else G!==""?Rt("WebGLProgram: Program Info Log:",G):(K===""||W==="")&&(V=!1);V&&(U.diagnostics={runnable:et,programLog:G,vertexShader:{log:K,prefix:m},fragmentShader:{log:W,prefix:h}})}s.deleteShader(E),s.deleteShader(T),x=new pl(s,b),A=nU(s,b)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(b,qD)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=YD++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=T,this}var _U=0,Qv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){let s=this._getShaderCacheForMaterial(t);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new jv(t),n.set(t,i)),i}},jv=class{constructor(t){this.id=_U++,this.code=t,this.usedTimes=0}};function yU(e){return e===Ka||e===ru||e===ou}function xU(e,t,n,i,s,a){let r=new zc,o=new Qv,l=new Set,c=[],f=new Map,p=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function b(x,A,R,U,B,k){let O=U.fog,G=B.geometry,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,et=t.get(x.envMap||K,W),V=et&&et.mapping===tu?et.image.height:null,J=d[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Rt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let nt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,At=nt!==void 0?nt.length:0,St=0;G.morphAttributes.position!==void 0&&(St=1),G.morphAttributes.normal!==void 0&&(St=2),G.morphAttributes.color!==void 0&&(St=3);let pe,Wt,Kt,q;if(J){let Se=Ms[J];pe=Se.vertexShader,Wt=Se.fragmentShader}else{pe=x.vertexShader,Wt=x.fragmentShader;let Se=o.getVertexShaderStage(x),ae=o.getFragmentShaderStage(x);o.update(x,Se,ae),Kt=Se.id,q=ae.id}let tt=e.getRenderTarget(),gt=e.state.buffers.depth.getReversed(),Ut=B.isInstancedMesh===!0,vt=B.isBatchedMesh===!0,Ht=!!x.map,Ze=!!x.matcap,Vt=!!et,te=!!x.aoMap,xe=!!x.lightMap,qt=!!x.bumpMap&&x.wireframe===!1,Re=!!x.normalMap,nn=!!x.displacementMap,Vn=!!x.emissiveMap,Le=!!x.metalnessMap,Ve=!!x.roughnessMap,L=x.anisotropy>0,Sn=x.clearcoat>0,ue=x.dispersion>0,C=x.retroreflectivity>0,y=x.iridescence>0,I=x.sheen>0,H=x.transmission>0,Y=L&&!!x.anisotropyMap,st=Sn&&!!x.clearcoatMap,at=Sn&&!!x.clearcoatNormalMap,Z=Sn&&!!x.clearcoatRoughnessMap,$=y&&!!x.iridescenceMap,rt=y&&!!x.iridescenceThicknessMap,Et=I&&!!x.sheenColorMap,ut=I&&!!x.sheenRoughnessMap,ot=!!x.specularMap,Tt=!!x.specularColorMap,Ct=!!x.specularIntensityMap,It=H&&!!x.transmissionMap,D=H&&!!x.thicknessMap,lt=!!x.gradientMap,Q=!!x.alphaMap,ct=x.alphaTest>0,pt=!!x.alphaHash,it=!!x.extensions,wt=qi;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(wt=e.toneMapping);let bt={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:pe,fragmentShader:Wt,defines:x.defines,customVertexShaderID:Kt,customFragmentShaderID:q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:vt,batchingColor:vt&&B._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&B.instanceColor!==null,instancingMorph:Ut&&B.morphTexture!==null,outputColorSpace:tt===null?e.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Zt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ht,matcap:Ze,envMap:Vt,envMapMode:Vt&&et.mapping,envMapCubeUVHeight:V,aoMap:te,lightMap:xe,bumpMap:qt,normalMap:Re,displacementMap:nn,emissiveMap:Vn,normalMapObjectSpace:Re&&x.normalMapType===Y1,normalMapTangentSpace:Re&&x.normalMapType===Lv,packedNormalMap:Re&&x.normalMapType===Lv&&yU(x.normalMap.format),metalnessMap:Le,roughnessMap:Ve,anisotropy:L,anisotropyMap:Y,clearcoat:Sn,clearcoatMap:st,clearcoatNormalMap:at,clearcoatRoughnessMap:Z,dispersion:ue,retroreflection:C,iridescence:y,iridescenceMap:$,iridescenceThicknessMap:rt,sheen:I,sheenColorMap:Et,sheenRoughnessMap:ut,specularMap:ot,specularColorMap:Tt,specularIntensityMap:Ct,transmission:H,transmissionMap:It,thicknessMap:D,gradientMap:lt,opaque:x.transparent===!1&&x.blending===cl&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:ct,alphaHash:pt,combine:x.combine,mapUv:Ht&&g(x.map.channel),aoMapUv:te&&g(x.aoMap.channel),lightMapUv:xe&&g(x.lightMap.channel),bumpMapUv:qt&&g(x.bumpMap.channel),normalMapUv:Re&&g(x.normalMap.channel),displacementMapUv:nn&&g(x.displacementMap.channel),emissiveMapUv:Vn&&g(x.emissiveMap.channel),metalnessMapUv:Le&&g(x.metalnessMap.channel),roughnessMapUv:Ve&&g(x.roughnessMap.channel),anisotropyMapUv:Y&&g(x.anisotropyMap.channel),clearcoatMapUv:st&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:at&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ut&&g(x.sheenRoughnessMap.channel),specularMapUv:ot&&g(x.specularMap.channel),specularColorMapUv:Tt&&g(x.specularColorMap.channel),specularIntensityMapUv:Ct&&g(x.specularIntensityMap.channel),transmissionMapUv:It&&g(x.transmissionMap.channel),thicknessMapUv:D&&g(x.thicknessMap.channel),alphaMapUv:Q&&g(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Re||L),vertexNormals:!!G.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!G.attributes.uv&&(Ht||Q),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||G.attributes.normal===void 0&&Re===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:gt,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:St,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:wt,decodeVideoTexture:Ht&&x.map.isVideoTexture===!0&&Zt.getTransfer(x.map.colorSpace)===le,decodeVideoTextureEmissive:Vn&&x.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(x.emissiveMap.colorSpace)===le,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Di,flipSided:x.side===zn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:it&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&x.extensions.multiDraw===!0||vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function m(x){let A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)A.push(R),A.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(h(A,x),v(A,x),A.push(e.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function h(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numSunLights),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numSunLightShadows),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function v(x,A){r.disableAll(),A.instancing&&r.enable(0),A.instancingColor&&r.enable(1),A.instancingMorph&&r.enable(2),A.matcap&&r.enable(3),A.envMap&&r.enable(4),A.normalMapObjectSpace&&r.enable(5),A.normalMapTangentSpace&&r.enable(6),A.clearcoat&&r.enable(7),A.iridescence&&r.enable(8),A.alphaTest&&r.enable(9),A.vertexColors&&r.enable(10),A.vertexAlphas&&r.enable(11),A.vertexUv1s&&r.enable(12),A.vertexUv2s&&r.enable(13),A.vertexUv3s&&r.enable(14),A.vertexTangents&&r.enable(15),A.anisotropy&&r.enable(16),A.alphaHash&&r.enable(17),A.batching&&r.enable(18),A.dispersion&&r.enable(19),A.retroreflection&&r.enable(24),A.batchingColor&&r.enable(20),A.gradientMap&&r.enable(21),A.packedNormalMap&&r.enable(22),A.vertexNormals&&r.enable(23),x.push(r.mask),r.disableAll(),A.fog&&r.enable(0),A.useFog&&r.enable(1),A.flatShading&&r.enable(2),A.logarithmicDepthBuffer&&r.enable(3),A.reversedDepthBuffer&&r.enable(4),A.skinning&&r.enable(5),A.morphTargets&&r.enable(6),A.morphNormals&&r.enable(7),A.morphColors&&r.enable(8),A.premultipliedAlpha&&r.enable(9),A.shadowMapEnabled&&r.enable(10),A.doubleSided&&r.enable(11),A.flipSided&&r.enable(12),A.useDepthPacking&&r.enable(13),A.dithering&&r.enable(14),A.transmission&&r.enable(15),A.sheen&&r.enable(16),A.opaque&&r.enable(17),A.pointsUvs&&r.enable(18),A.decodeVideoTexture&&r.enable(19),A.decodeVideoTextureEmissive&&r.enable(20),A.alphaToCoverage&&r.enable(21),A.numLightProbeGrids>0&&r.enable(22),A.hasPositionAttribute&&r.enable(23),x.push(r.mask)}function S(x){let A=d[x.type],R;if(A){let U=Ms[A];R=oE.clone(U.uniforms)}else R=x.uniforms;return R}function _(x,A){let R=f.get(A);return R!==void 0?++R.usedTimes:(R=new vU(e,A,x,s),c.push(R),f.set(A,R)),R}function E(x){if(--x.usedTimes===0){let A=c.indexOf(x);c[A]=c[c.length-1],c.pop(),f.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function w(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:S,acquireProgram:_,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:w}}function SU(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function bU(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function wE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function CE(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,b,m,h){let v=e[t];return v===void 0?(v={id:u.id,object:u,geometry:d,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:m,group:h},e[t]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=g,v.materialVariant=r(u),v.groupOrder=b,v.renderOrder=u.renderOrder,v.z=m,v.group=h),t++,v}function l(u,d,g,b,m,h,v){v.reversedDepth===!0&&(m=-m);let S=o(u,d,g,b,m,h);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):n.push(S)}function c(u,d,g,b,m,h){let v=o(u,d,g,b,m,h);g.transmission>0?i.unshift(v):g.transparent===!0?s.unshift(v):n.unshift(v)}function f(u,d){n.length>1&&n.sort(u||bU),i.length>1&&i.sort(d||wE),s.length>1&&s.sort(d||wE)}function p(){for(let u=t,d=e.length;u<d;u++){let g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:p,sort:f}}function MU(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new CE,e.set(i,[r])):s>=a.length?(r=new CE,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function EU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new P,color:new Qt};break;case"SpotLight":n={position:new P,direction:new P,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new P,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new P,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":n={color:new Qt,position:new P,halfWidth:new P,halfHeight:new P};break}return e[t.id]=n,n}}}function TU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var AU=0;function wU(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function CU(e){let t=new EU,n=TU(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let s=new P,a=new Fe,r=new Fe;function o(c){let f=0,p=0,u=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let d=0,g=0,b=0,m=0,h=0,v=0,S=0,_=0,E=0,T=0,w=0,x=0,A=0,R=0;c.sort(wU);for(let B=0,k=c.length;B<k;B++){let O=c[B],G=O.color,K=O.intensity,W=O.distance,et=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===Ka?et=O.shadow.map.texture:et=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)f+=G.r*K,p+=G.g*K,u+=G.b*K;else if(O.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(O.sh.coefficients[V],K);R++}else if(O.isSunLight){let V=t.get(O);if(V.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let J=O.shadow,nt=n.get(O);nt.shadowIntensity=J.intensity,nt.shadowBias=J.bias,nt.shadowNormalBias=J.normalBias,nt.shadowRadius=J.radius,nt.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),i.sunShadow[g]=nt,i.sunShadowMap[g]=et;let At=J.getViewportCount();for(let St=0;St<At;St++)i.sunShadowMatrix[b+St]=J.getMatrix(St),i.sunShadowCascade[b+St]=J._cascadeData[St];b+=At,g++}i.sun[d]=V,d++}else if(O.isDirectionalLight){let V=t.get(O);if(V.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let J=O.shadow,nt=n.get(O);nt.shadowIntensity=J.intensity,nt.shadowBias=J.bias,nt.shadowNormalBias=J.normalBias,nt.shadowRadius=J.radius,nt.shadowMapSize=J.mapSize,i.directionalShadow[m]=nt,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=O.shadow.matrix,E++}i.directional[m]=V,m++}else if(O.isSpotLight){let V=t.get(O);V.position.setFromMatrixPosition(O.matrixWorld),V.color.copy(G).multiplyScalar(K),V.distance=W,V.coneCos=Math.cos(O.angle),V.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),V.decay=O.decay,i.spot[v]=V;let J=O.shadow;if(O.map&&(i.spotLightMap[x]=O.map,x++,J.updateMatrices(O),O.castShadow&&A++),i.spotLightMatrix[v]=J.matrix,O.castShadow){let nt=n.get(O);nt.shadowIntensity=J.intensity,nt.shadowBias=J.bias,nt.shadowNormalBias=J.normalBias,nt.shadowRadius=J.radius,nt.shadowMapSize=J.mapSize,i.spotShadow[v]=nt,i.spotShadowMap[v]=et,w++}v++}else if(O.isRectAreaLight){let V=t.get(O);V.color.copy(G).multiplyScalar(K),V.halfWidth.set(O.width*.5,0,0),V.halfHeight.set(0,O.height*.5,0),i.rectArea[S]=V,S++}else if(O.isPointLight){let V=t.get(O);if(V.color.copy(O.color).multiplyScalar(O.intensity),V.distance=O.distance,V.decay=O.decay,O.castShadow){let J=O.shadow,nt=n.get(O);nt.shadowIntensity=J.intensity,nt.shadowBias=J.bias,nt.shadowNormalBias=J.normalBias,nt.shadowRadius=J.radius,nt.shadowMapSize=J.mapSize,nt.shadowCameraNear=J.camera.near,nt.shadowCameraFar=J.camera.far,i.pointShadow[h]=nt,i.pointShadowMap[h]=et,i.pointShadowMatrix[h]=O.shadow.matrix,T++}i.point[h]=V,h++}else if(O.isHemisphereLight){let V=t.get(O);V.skyColor.copy(O.color).multiplyScalar(K),V.groundColor.copy(O.groundColor).multiplyScalar(K),i.hemi[_]=V,_++}}S>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=u;let U=i.hash;(U.sunLength!==d||U.directionalLength!==m||U.pointLength!==h||U.spotLength!==v||U.rectAreaLength!==S||U.hemiLength!==_||U.numSunShadows!==g||U.numDirectionalShadows!==E||U.numPointShadows!==T||U.numSpotShadows!==w||U.numSpotMaps!==x||U.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=m,i.spot.length=v,i.rectArea.length=S,i.point.length=h,i.hemi.length=_,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+x-A,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,U.sunLength=d,U.directionalLength=m,U.pointLength=h,U.spotLength=v,U.rectAreaLength=S,U.hemiLength=_,U.numSunShadows=g,U.numDirectionalShadows=E,U.numPointShadows=T,U.numSpotShadows=w,U.numSpotMaps=x,U.numLightProbes=R,i.version=AU++)}function l(c,f){let p=0,u=0,d=0,g=0,b=0,m=0,h=f.matrixWorldInverse;for(let v=0,S=c.length;v<S;v++){let _=c[v];if(_.isSunLight){let E=i.sun[p];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(h),p++}else if(_.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(h),u++}else if(_.isSpotLight){let E=i.spot[g];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(h),E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(h),g++}else if(_.isRectAreaLight){let E=i.rectArea[b];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(h),r.identity(),a.copy(_.matrixWorld),a.premultiply(h),r.extractRotation(a),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),b++}else if(_.isPointLight){let E=i.point[d];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(h),d++}else if(_.isHemisphereLight){let E=i.hemi[m];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(h),m++}}}return{setup:o,setupView:l,state:i}}function RE(e){let t=new CU(e),n=[],i=[],s=[];function a(u){p.camera=u,n.length=0,i.length=0,s.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(n)}function f(u){t.setupView(n,u)}let p={lightsArray:n,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:p,setupLights:c,setupLightsView:f,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function RU(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new RE(e),t.set(s,[o])):a>=r.length?(o=new RE(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var NU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,UU=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],LU=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],NE=new Fe,uu=new P,Wv=new P;function OU(e,t,n){let i=new Wc,s=new $t,a=new $t,r=new Ie,o=new Qf,l=new jf,c={},f=n.maxTextureSize,p={[qa]:zn,[zn]:qa,[Di]:Di},u=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:NU,fragmentShader:DU}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new Rn;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new hn(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jc;let h=this.type;this.render=function(T,w,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===E1&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=jc);let A=e.getRenderTarget(),R=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Ss),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let k=h!==this.type;k&&w.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(G=>G.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,G=T.length;O<G;O++){let K=T[O],W=K.shadow;if(W===void 0){Rt("WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let et=W.getFrameExtents();s.multiply(et),a.copy(W.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(a.x=Math.floor(f/et.x),s.x=a.x*et.x,W.mapSize.x=a.x),s.y>f&&(a.y=Math.floor(f/et.y),s.y=a.y*et.y,W.mapSize.y=a.y));let V=e.state.buffers.depth.getReversed();if(W.camera._reversedDepth=V,W.map===null||k===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===ll){if(K.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Qn(s.x,s.y,{format:Ka,type:Ji,minFilter:xn,magFilter:xn,generateMipmaps:!1}),W.map.texture.name=K.name+".shadowMap",W.map.depthTexture=new Va(s.x,s.y,Zi),W.map.depthTexture.name=K.name+".shadowMapDepth",W.map.depthTexture.format=_s,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=un,W.map.depthTexture.magFilter=un}else K.isPointLight?(W.map=new ep(s.x),W.map.depthTexture=new Jf(s.x,Yi)):(W.map=new Qn(s.x,s.y),W.map.depthTexture=new Va(s.x,s.y,Yi)),W.map.depthTexture.name=K.name+".shadowMap",W.map.depthTexture.format=_s,this.type===jc?(W.map.depthTexture.compareFunction=V?Qd:Kd,W.map.depthTexture.minFilter=xn,W.map.depthTexture.magFilter=xn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=un,W.map.depthTexture.magFilter=un);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let J=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();K.isPointLight!==!0&&W.updateMatrices(K,x);for(let nt=0;nt<J;nt++){let At=W.getCamera(nt);if(K.isPointLight){let St=W.camera,pe=W.matrix,Wt=K.distance||St.far;Wt!==St.far&&(St.far=Wt,St.updateProjectionMatrix()),uu.setFromMatrixPosition(K.matrixWorld),St.position.copy(uu),Wv.copy(St.position),Wv.add(UU[nt]),St.up.copy(LU[nt]),St.lookAt(Wv),St.updateMatrixWorld(),pe.makeTranslation(-uu.x,-uu.y,-uu.z),NE.multiplyMatrices(St.projectionMatrix,St.matrixWorldInverse),W._frustum.setFromProjectionMatrix(NE,St.coordinateSystem,St.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)e.setRenderTarget(W.map,nt),e.clear();else{nt===0&&(e.setRenderTarget(W.map),e.clear());let St=W.getViewport(nt);r.set(a.x*St.x,a.y*St.y,a.x*St.z,a.y*St.w),B.viewport(r)}i=W.getFrustum(nt),_(w,x,At,K,this.type)}W.isPointLightShadow!==!0&&this.type===ll&&v(W,x),W.needsUpdate=!1}h=this.type,m.needsUpdate=!1,e.setRenderTarget(A,R,U)};function v(T,w){let x=t.update(b);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new Qn(s.x,s.y,{format:Ka,type:Ji}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(w,null,x,u,b,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(w,null,x,d,b,null)}function S(T,w,x,A){let R=null,U=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)R=U;else if(R=x.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let B=R.uuid,k=w.uuid,O=c[B];O===void 0&&(O={},c[B]=O);let G=O[k];G===void 0&&(G=R.clone(),O[k]=G,w.addEventListener("dispose",E)),R=G}if(R.visible=w.visible,R.wireframe=w.wireframe,A===ll?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:p[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let B=e.properties.get(R);B.light=x}return R}function _(T,w,x,A,R){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&R===ll)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);let k=t.update(T),O=T.material;if(Array.isArray(O)){let G=k.groups;for(let K=0,W=G.length;K<W;K++){let et=G[K],V=O[et.materialIndex];if(V&&V.visible){let J=S(T,V,A,R);T.onBeforeShadow(e,T,w,x,k,J,et),e.renderBufferDirect(x,null,k,J,T,et),T.onAfterShadow(e,T,w,x,k,J,et)}}}else if(O.visible){let G=S(T,O,A,R);T.onBeforeShadow(e,T,w,x,k,G,null),e.renderBufferDirect(x,null,k,G,T,null),T.onAfterShadow(e,T,w,x,k,G,null)}}let B=T.children;for(let k=0,O=B.length;k<O;k++)_(B[k],w,x,A,R)}function E(T){T.target.removeEventListener("dispose",E);for(let x in c){let A=c[x],R=T.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function IU(e,t){function n(){let D=!1,lt=new Ie,Q=null,ct=new Ie(0,0,0,0);return{setMask:function(pt){Q!==pt&&!D&&(e.colorMask(pt,pt,pt,pt),Q=pt)},setLocked:function(pt){D=pt},setClear:function(pt,it,wt,bt,Se){Se===!0&&(pt*=bt,it*=bt,wt*=bt),lt.set(pt,it,wt,bt),ct.equals(lt)===!1&&(e.clearColor(pt,it,wt,bt),ct.copy(lt))},reset:function(){D=!1,Q=null,ct.set(-1,0,0,0)}}}function i(){let D=!1,lt=!1,Q=null,ct=null,pt=null;return{setReversed:function(it){if(lt!==it){let wt=t.get("EXT_clip_control");it?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),lt=it;let bt=pt;pt=null,this.setClear(bt)}},getReversed:function(){return lt},setTest:function(it){it?tt(e.DEPTH_TEST):gt(e.DEPTH_TEST)},setMask:function(it){Q!==it&&!D&&(e.depthMask(it),Q=it)},setFunc:function(it){if(lt&&(it=aE[it]),ct!==it){switch(it){case Lf:e.depthFunc(e.NEVER);break;case Of:e.depthFunc(e.ALWAYS);break;case If:e.depthFunc(e.LESS);break;case el:e.depthFunc(e.LEQUAL);break;case Pf:e.depthFunc(e.EQUAL);break;case Bf:e.depthFunc(e.GEQUAL);break;case Ff:e.depthFunc(e.GREATER);break;case zf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ct=it}},setLocked:function(it){D=it},setClear:function(it){pt!==it&&(pt=it,lt&&(it=1-it),e.clearDepth(it))},reset:function(){D=!1,Q=null,ct=null,pt=null,lt=!1}}}function s(){let D=!1,lt=null,Q=null,ct=null,pt=null,it=null,wt=null,bt=null,Se=null;return{setTest:function(ae){D||(ae?tt(e.STENCIL_TEST):gt(e.STENCIL_TEST))},setMask:function(ae){lt!==ae&&!D&&(e.stencilMask(ae),lt=ae)},setFunc:function(ae,Oi,ji){(Q!==ae||ct!==Oi||pt!==ji)&&(e.stencilFunc(ae,Oi,ji),Q=ae,ct=Oi,pt=ji)},setOp:function(ae,Oi,ji){(it!==ae||wt!==Oi||bt!==ji)&&(e.stencilOp(ae,Oi,ji),it=ae,wt=Oi,bt=ji)},setLocked:function(ae){D=ae},setClear:function(ae){Se!==ae&&(e.clearStencil(ae),Se=ae)},reset:function(){D=!1,lt=null,Q=null,ct=null,pt=null,it=null,wt=null,bt=null,Se=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,f={},p={},u={},d=new WeakMap,g=[],b=null,m=!1,h=null,v=null,S=null,_=null,E=null,T=null,w=null,x=new Qt(0,0,0),A=0,R=!1,U=null,B=null,k=null,O=null,G=null,K=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,et=0,V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=et>=1):V.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=et>=2);let J=null,nt={},At=e.getParameter(e.SCISSOR_BOX),St=e.getParameter(e.VIEWPORT),pe=new Ie().fromArray(At),Wt=new Ie().fromArray(St);function Kt(D,lt,Q,ct){let pt=new Uint8Array(4),it=e.createTexture();e.bindTexture(D,it),e.texParameteri(D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(D,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let wt=0;wt<Q;wt++)D===e.TEXTURE_3D||D===e.TEXTURE_2D_ARRAY?e.texImage3D(lt,0,e.RGBA,1,1,ct,0,e.RGBA,e.UNSIGNED_BYTE,pt):e.texImage2D(lt+wt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,pt);return it}let q={};q[e.TEXTURE_2D]=Kt(e.TEXTURE_2D,e.TEXTURE_2D,1),q[e.TEXTURE_CUBE_MAP]=Kt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[e.TEXTURE_2D_ARRAY]=Kt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),q[e.TEXTURE_3D]=Kt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),tt(e.DEPTH_TEST),r.setFunc(el),qt(!1),Re(fv),tt(e.CULL_FACE),te(Ss);function tt(D){f[D]!==!0&&(e.enable(D),f[D]=!0)}function gt(D){f[D]!==!1&&(e.disable(D),f[D]=!1)}function Ut(D,lt){return u[D]!==lt?(e.bindFramebuffer(D,lt),u[D]=lt,D===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=lt),D===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=lt),!0):!1}function vt(D,lt){let Q=g,ct=!1;if(D){Q=d.get(lt),Q===void 0&&(Q=[],d.set(lt,Q));let pt=D.textures;if(Q.length!==pt.length||Q[0]!==e.COLOR_ATTACHMENT0){for(let it=0,wt=pt.length;it<wt;it++)Q[it]=e.COLOR_ATTACHMENT0+it;Q.length=pt.length,ct=!0}}else Q[0]!==e.BACK&&(Q[0]=e.BACK,ct=!0);ct&&e.drawBuffers(Q)}function Ht(D){return b!==D?(e.useProgram(D),b=D,!0):!1}let Ze={[Ur]:e.FUNC_ADD,[A1]:e.FUNC_SUBTRACT,[w1]:e.FUNC_REVERSE_SUBTRACT};Ze[C1]=e.MIN,Ze[R1]=e.MAX;let Vt={[N1]:e.ZERO,[D1]:e.ONE,[U1]:e.SRC_COLOR,[mv]:e.SRC_ALPHA,[F1]:e.SRC_ALPHA_SATURATE,[P1]:e.DST_COLOR,[O1]:e.DST_ALPHA,[L1]:e.ONE_MINUS_SRC_COLOR,[gv]:e.ONE_MINUS_SRC_ALPHA,[B1]:e.ONE_MINUS_DST_COLOR,[I1]:e.ONE_MINUS_DST_ALPHA,[z1]:e.CONSTANT_COLOR,[H1]:e.ONE_MINUS_CONSTANT_COLOR,[V1]:e.CONSTANT_ALPHA,[G1]:e.ONE_MINUS_CONSTANT_ALPHA};function te(D,lt,Q,ct,pt,it,wt,bt,Se,ae){if(D===Ss){m===!0&&(gt(e.BLEND),m=!1);return}if(m===!1&&(tt(e.BLEND),m=!0),D!==T1){if(D!==h||ae!==R){if((v!==Ur||E!==Ur)&&(e.blendEquation(e.FUNC_ADD),v=Ur,E=Ur),ae)switch(D){case cl:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case $c:e.blendFunc(e.ONE,e.ONE);break;case dv:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case pv:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Dt("WebGLState: Invalid blending: ",D);break}else switch(D){case cl:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case $c:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case dv:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pv:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",D);break}S=null,_=null,T=null,w=null,x.set(0,0,0),A=0,h=D,R=ae}return}pt=pt||lt,it=it||Q,wt=wt||ct,(lt!==v||pt!==E)&&(e.blendEquationSeparate(Ze[lt],Ze[pt]),v=lt,E=pt),(Q!==S||ct!==_||it!==T||wt!==w)&&(e.blendFuncSeparate(Vt[Q],Vt[ct],Vt[it],Vt[wt]),S=Q,_=ct,T=it,w=wt),(bt.equals(x)===!1||Se!==A)&&(e.blendColor(bt.r,bt.g,bt.b,Se),x.copy(bt),A=Se),h=D,R=!1}function xe(D,lt){D.side===Di?gt(e.CULL_FACE):tt(e.CULL_FACE);let Q=D.side===zn;lt&&(Q=!Q),qt(Q),D.blending===cl&&D.transparent===!1?te(Ss):te(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),a.setMask(D.colorWrite);let ct=D.stencilWrite;o.setTest(ct),ct&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Vn(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?tt(e.SAMPLE_ALPHA_TO_COVERAGE):gt(e.SAMPLE_ALPHA_TO_COVERAGE)}function qt(D){U!==D&&(D?e.frontFace(e.CW):e.frontFace(e.CCW),U=D)}function Re(D){D!==b1?(tt(e.CULL_FACE),D!==B&&(D===fv?e.cullFace(e.BACK):D===M1?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):gt(e.CULL_FACE),B=D}function nn(D){D!==k&&(W&&e.lineWidth(D),k=D)}function Vn(D,lt,Q){D?(tt(e.POLYGON_OFFSET_FILL),(O!==lt||G!==Q)&&(O=lt,G=Q,r.getReversed()&&(lt=-lt),e.polygonOffset(lt,Q))):gt(e.POLYGON_OFFSET_FILL)}function Le(D){D?tt(e.SCISSOR_TEST):gt(e.SCISSOR_TEST)}function Ve(D){D===void 0&&(D=e.TEXTURE0+K-1),J!==D&&(e.activeTexture(D),J=D)}function L(D,lt,Q){Q===void 0&&(J===null?Q=e.TEXTURE0+K-1:Q=J);let ct=nt[Q];ct===void 0&&(ct={type:void 0,texture:void 0},nt[Q]=ct),(ct.type!==D||ct.texture!==lt)&&(J!==Q&&(e.activeTexture(Q),J=Q),e.bindTexture(D,lt||q[D]),ct.type=D,ct.texture=lt)}function Sn(){let D=nt[J];D!==void 0&&D.type!==void 0&&(e.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ue(){try{e.compressedTexImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function C(){try{e.compressedTexImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function y(){try{e.texSubImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function I(){try{e.texSubImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function H(){try{e.compressedTexSubImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function Y(){try{e.compressedTexSubImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function st(){try{e.texStorage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function at(){try{e.texStorage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function Z(){try{e.texImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function $(){try{e.texImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function rt(D){return p[D]!==void 0?p[D]:e.getParameter(D)}function Et(D,lt){p[D]!==lt&&(e.pixelStorei(D,lt),p[D]=lt)}function ut(D){pe.equals(D)===!1&&(e.scissor(D.x,D.y,D.z,D.w),pe.copy(D))}function ot(D){Wt.equals(D)===!1&&(e.viewport(D.x,D.y,D.z,D.w),Wt.copy(D))}function Tt(D,lt){let Q=c.get(lt);Q===void 0&&(Q=new WeakMap,c.set(lt,Q));let ct=Q.get(D);ct===void 0&&(ct=e.getUniformBlockIndex(lt,D.name),Q.set(D,ct))}function Ct(D,lt){let ct=c.get(lt).get(D);l.get(lt)!==ct&&(e.uniformBlockBinding(lt,ct,D.__bindingPointIndex),l.set(lt,ct))}function It(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),f={},p={},J=null,nt={},u={},d=new WeakMap,g=[],b=null,m=!1,h=null,v=null,S=null,_=null,E=null,T=null,w=null,x=new Qt(0,0,0),A=0,R=!1,U=null,B=null,k=null,O=null,G=null,pe.set(0,0,e.canvas.width,e.canvas.height),Wt.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:tt,disable:gt,bindFramebuffer:Ut,drawBuffers:vt,useProgram:Ht,setBlending:te,setMaterial:xe,setFlipSided:qt,setCullFace:Re,setLineWidth:nn,setPolygonOffset:Vn,setScissorTest:Le,activeTexture:Ve,bindTexture:L,unbindTexture:Sn,compressedTexImage2D:ue,compressedTexImage3D:C,texImage2D:Z,texImage3D:$,pixelStorei:Et,getParameter:rt,updateUBOMapping:Tt,uniformBlockBinding:Ct,texStorage2D:st,texStorage3D:at,texSubImage2D:y,texSubImage3D:I,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:ut,viewport:ot,reset:It}}function PU(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $t,f=new WeakMap,p=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(C,y){return g?new OffscreenCanvas(C,y):Bc("canvas")}function m(C,y,I){let H=1,Y=ue(C);if((Y.width>I||Y.height>I)&&(H=I/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let st=Math.floor(H*Y.width),at=Math.floor(H*Y.height);u===void 0&&(u=b(st,at));let Z=y?b(st,at):u;return Z.width=st,Z.height=at,Z.getContext("2d").drawImage(C,0,0,st,at),Rt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+st+"x"+at+")."),Z}else return"data"in C&&Rt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function h(C){return C.generateMipmaps}function v(C){e.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?e.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(C,y,I,H,Y,st=!1){if(C!==null){if(e[C]!==void 0)return e[C];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let at;H&&(at=t.get("EXT_texture_norm16"),at||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=y;if(y===e.RED&&(I===e.FLOAT&&(Z=e.R32F),I===e.HALF_FLOAT&&(Z=e.R16F),I===e.UNSIGNED_BYTE&&(Z=e.R8),I===e.UNSIGNED_SHORT&&at&&(Z=at.R16_EXT),I===e.SHORT&&at&&(Z=at.R16_SNORM_EXT)),y===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(Z=e.R8UI),I===e.UNSIGNED_SHORT&&(Z=e.R16UI),I===e.UNSIGNED_INT&&(Z=e.R32UI),I===e.BYTE&&(Z=e.R8I),I===e.SHORT&&(Z=e.R16I),I===e.INT&&(Z=e.R32I)),y===e.RG&&(I===e.FLOAT&&(Z=e.RG32F),I===e.HALF_FLOAT&&(Z=e.RG16F),I===e.UNSIGNED_BYTE&&(Z=e.RG8),I===e.UNSIGNED_SHORT&&at&&(Z=at.RG16_EXT),I===e.SHORT&&at&&(Z=at.RG16_SNORM_EXT)),y===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(Z=e.RG8UI),I===e.UNSIGNED_SHORT&&(Z=e.RG16UI),I===e.UNSIGNED_INT&&(Z=e.RG32UI),I===e.BYTE&&(Z=e.RG8I),I===e.SHORT&&(Z=e.RG16I),I===e.INT&&(Z=e.RG32I)),y===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(Z=e.RGB8UI),I===e.UNSIGNED_SHORT&&(Z=e.RGB16UI),I===e.UNSIGNED_INT&&(Z=e.RGB32UI),I===e.BYTE&&(Z=e.RGB8I),I===e.SHORT&&(Z=e.RGB16I),I===e.INT&&(Z=e.RGB32I)),y===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(Z=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(Z=e.RGBA16UI),I===e.UNSIGNED_INT&&(Z=e.RGBA32UI),I===e.BYTE&&(Z=e.RGBA8I),I===e.SHORT&&(Z=e.RGBA16I),I===e.INT&&(Z=e.RGBA32I)),y===e.RGB&&(I===e.UNSIGNED_SHORT&&at&&(Z=at.RGB16_EXT),I===e.SHORT&&at&&(Z=at.RGB16_SNORM_EXT),I===e.UNSIGNED_INT_5_9_9_9_REV&&(Z=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(Z=e.R11F_G11F_B10F)),y===e.RGBA){let $=st?Ic:Zt.getTransfer(Y);I===e.FLOAT&&(Z=e.RGBA32F),I===e.HALF_FLOAT&&(Z=e.RGBA16F),I===e.UNSIGNED_BYTE&&(Z=$===le?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT&&at&&(Z=at.RGBA16_EXT),I===e.SHORT&&at&&(Z=at.RGBA16_SNORM_EXT),I===e.UNSIGNED_SHORT_4_4_4_4&&(Z=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(Z=e.RGB5_A1)}return(Z===e.R16F||Z===e.R32F||Z===e.RG16F||Z===e.RG32F||Z===e.RGBA16F||Z===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function E(C,y){let I;return C?y===null||y===Yi||y===hl?I=e.DEPTH24_STENCIL8:y===Zi?I=e.DEPTH32F_STENCIL8:y===ul&&(I=e.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Yi||y===hl?I=e.DEPTH_COMPONENT24:y===Zi?I=e.DEPTH_COMPONENT32F:y===ul&&(I=e.DEPTH_COMPONENT16),I}function T(C,y){return h(C)===!0||C.isFramebufferTexture&&C.minFilter!==un&&C.minFilter!==xn?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function w(C){let y=C.target;y.removeEventListener("dispose",w),A(y),y.isVideoTexture&&f.delete(y),y.isHTMLTexture&&p.delete(y)}function x(C){let y=C.target;y.removeEventListener("dispose",x),U(y)}function A(C){let y=i.get(C);if(y.__webglInit===void 0)return;let I=C.source,H=d.get(I);if(H){let Y=H[y.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&R(C),Object.keys(H).length===0&&d.delete(I)}i.remove(C)}function R(C){let y=i.get(C);e.deleteTexture(y.__webglTexture);let I=C.source,H=d.get(I);delete H[y.__cacheKey],r.memory.textures--}function U(C){let y=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(y.__webglFramebuffer[H]))for(let Y=0;Y<y.__webglFramebuffer[H].length;Y++)e.deleteFramebuffer(y.__webglFramebuffer[H][Y]);else e.deleteFramebuffer(y.__webglFramebuffer[H]);y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer[H])}else{if(Array.isArray(y.__webglFramebuffer))for(let H=0;H<y.__webglFramebuffer.length;H++)e.deleteFramebuffer(y.__webglFramebuffer[H]);else e.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&e.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let H=0;H<y.__webglColorRenderbuffer.length;H++)y.__webglColorRenderbuffer[H]&&e.deleteRenderbuffer(y.__webglColorRenderbuffer[H]);y.__webglDepthRenderbuffer&&e.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let I=C.textures;for(let H=0,Y=I.length;H<Y;H++){let st=i.get(I[H]);st.__webglTexture&&(e.deleteTexture(st.__webglTexture),r.memory.textures--),i.remove(I[H])}i.remove(C)}let B=0;function k(){B=0}function O(){return B}function G(C){B=C}function K(){let C=B;return C>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,C}function W(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function et(C,y){let I=i.get(C);if(C.isVideoTexture&&L(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&I.__version!==C.version){let H=C.image;if(H===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{gt(I,C,y);return}}else C.isExternalTexture&&(I.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+y)}function V(C,y){let I=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&I.__version!==C.version){gt(I,C,y);return}else C.isExternalTexture&&(I.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+y)}function J(C,y){let I=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&I.__version!==C.version){gt(I,C,y);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+y)}function nt(C,y){let I=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&I.__version!==C.version){Ut(I,C,y);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+y)}let At={[Hf]:e.REPEAT,[vs]:e.CLAMP_TO_EDGE,[Vf]:e.MIRRORED_REPEAT},St={[un]:e.NEAREST,[W1]:e.NEAREST_MIPMAP_NEAREST,[eu]:e.NEAREST_MIPMAP_LINEAR,[xn]:e.LINEAR,[dd]:e.LINEAR_MIPMAP_NEAREST,[Za]:e.LINEAR_MIPMAP_LINEAR},pe={[J1]:e.NEVER,[tE]:e.ALWAYS,[K1]:e.LESS,[Kd]:e.LEQUAL,[Q1]:e.EQUAL,[Qd]:e.GEQUAL,[j1]:e.GREATER,[$1]:e.NOTEQUAL};function Wt(C,y){if(y.type===Zi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===xn||y.magFilter===dd||y.magFilter===eu||y.magFilter===Za||y.minFilter===xn||y.minFilter===dd||y.minFilter===eu||y.minFilter===Za)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(C,e.TEXTURE_WRAP_S,At[y.wrapS]),e.texParameteri(C,e.TEXTURE_WRAP_T,At[y.wrapT]),(C===e.TEXTURE_3D||C===e.TEXTURE_2D_ARRAY)&&e.texParameteri(C,e.TEXTURE_WRAP_R,At[y.wrapR]),e.texParameteri(C,e.TEXTURE_MAG_FILTER,St[y.magFilter]),e.texParameteri(C,e.TEXTURE_MIN_FILTER,St[y.minFilter]),y.compareFunction&&(e.texParameteri(C,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(C,e.TEXTURE_COMPARE_FUNC,pe[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===un||y.minFilter!==eu&&y.minFilter!==Za||y.type===Zi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(C,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Kt(C,y){let I=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",w));let H=y.source,Y=d.get(H);Y===void 0&&(Y={},d.set(H,Y));let st=W(y);if(st!==C.__cacheKey){Y[st]===void 0&&(Y[st]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,I=!0),Y[st].usedTimes++;let at=Y[C.__cacheKey];at!==void 0&&(Y[C.__cacheKey].usedTimes--,at.usedTimes===0&&R(y)),C.__cacheKey=st,C.__webglTexture=Y[st].texture}return I}function q(C,y,I){return Math.floor(Math.floor(C/I)/y)}function tt(C,y,I,H){let st=C.updateRanges;if(st.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,y.width,y.height,I,H,y.data);else{st.sort((Et,ut)=>Et.start-ut.start);let at=0;for(let Et=1;Et<st.length;Et++){let ut=st[at],ot=st[Et],Tt=ut.start+ut.count,Ct=q(ot.start,y.width,4),It=q(ut.start,y.width,4);ot.start<=Tt+1&&Ct===It&&q(ot.start+ot.count-1,y.width,4)===Ct?ut.count=Math.max(ut.count,ot.start+ot.count-ut.start):(++at,st[at]=ot)}st.length=at+1;let Z=n.getParameter(e.UNPACK_ROW_LENGTH),$=n.getParameter(e.UNPACK_SKIP_PIXELS),rt=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,y.width);for(let Et=0,ut=st.length;Et<ut;Et++){let ot=st[Et],Tt=Math.floor(ot.start/4),Ct=Math.ceil(ot.count/4),It=Tt%y.width,D=Math.floor(Tt/y.width),lt=Ct,Q=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,It),n.pixelStorei(e.UNPACK_SKIP_ROWS,D),n.texSubImage2D(e.TEXTURE_2D,0,It,D,lt,Q,I,H,y.data)}C.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,Z),n.pixelStorei(e.UNPACK_SKIP_PIXELS,$),n.pixelStorei(e.UNPACK_SKIP_ROWS,rt)}}function gt(C,y,I){let H=e.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(H=e.TEXTURE_2D_ARRAY),y.isData3DTexture&&(H=e.TEXTURE_3D);let Y=Kt(C,y),st=y.source;n.bindTexture(H,C.__webglTexture,e.TEXTURE0+I);let at=i.get(st);if(st.version!==at.__version||Y===!0){if(n.activeTexture(e.TEXTURE0+I),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let Q=Zt.getPrimaries(Zt.workingColorSpace),ct=y.colorSpace===Ks?null:Zt.getPrimaries(y.colorSpace),pt=y.colorSpace===Ks||Q===ct?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}n.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment);let $=m(y.image,!1,s.maxTextureSize);$=Sn(y,$);let rt=a.convert(y.format,y.colorSpace),Et=a.convert(y.type),ut=_(y.internalFormat,rt,Et,y.normalized,y.colorSpace,y.isVideoTexture);Wt(H,y);let ot,Tt=y.mipmaps,Ct=y.isVideoTexture!==!0,It=at.__version===void 0||Y===!0,D=st.dataReady,lt=T(y,$);if(y.isDepthTexture)ut=E(y.format===Ja,y.type),It&&(Ct?n.texStorage2D(e.TEXTURE_2D,1,ut,$.width,$.height):n.texImage2D(e.TEXTURE_2D,0,ut,$.width,$.height,0,rt,Et,null));else if(y.isDataTexture)if(Tt.length>0){Ct&&It&&n.texStorage2D(e.TEXTURE_2D,lt,ut,Tt[0].width,Tt[0].height);for(let Q=0,ct=Tt.length;Q<ct;Q++)ot=Tt[Q],Ct?D&&n.texSubImage2D(e.TEXTURE_2D,Q,0,0,ot.width,ot.height,rt,Et,ot.data):n.texImage2D(e.TEXTURE_2D,Q,ut,ot.width,ot.height,0,rt,Et,ot.data);y.generateMipmaps=!1}else Ct?(It&&n.texStorage2D(e.TEXTURE_2D,lt,ut,$.width,$.height),D&&tt(y,$,rt,Et)):n.texImage2D(e.TEXTURE_2D,0,ut,$.width,$.height,0,rt,Et,$.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ct&&It&&n.texStorage3D(e.TEXTURE_2D_ARRAY,lt,ut,Tt[0].width,Tt[0].height,$.depth);for(let Q=0,ct=Tt.length;Q<ct;Q++)if(ot=Tt[Q],y.format!==Ui)if(rt!==null)if(Ct){if(D)if(y.layerUpdates.size>0){let pt=zv(ot.width,ot.height,y.format,y.type);for(let it of y.layerUpdates){let wt=ot.data.subarray(it*pt/ot.data.BYTES_PER_ELEMENT,(it+1)*pt/ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,it,ot.width,ot.height,1,rt,wt)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,ot.width,ot.height,$.depth,rt,ot.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Q,ut,ot.width,ot.height,$.depth,0,ot.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ct?D&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,ot.width,ot.height,$.depth,rt,Et,ot.data):n.texImage3D(e.TEXTURE_2D_ARRAY,Q,ut,ot.width,ot.height,$.depth,0,rt,Et,ot.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Ct&&It&&n.texStorage2D(e.TEXTURE_2D,lt,ut,Tt[0].width,Tt[0].height);for(let Q=0,ct=Tt.length;Q<ct;Q++)ot=Tt[Q],y.format!==Ui?rt!==null?Ct?D&&n.compressedTexSubImage2D(e.TEXTURE_2D,Q,0,0,ot.width,ot.height,rt,ot.data):n.compressedTexImage2D(e.TEXTURE_2D,Q,ut,ot.width,ot.height,0,ot.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?D&&n.texSubImage2D(e.TEXTURE_2D,Q,0,0,ot.width,ot.height,rt,Et,ot.data):n.texImage2D(e.TEXTURE_2D,Q,ut,ot.width,ot.height,0,rt,Et,ot.data)}else if(y.isDataArrayTexture)if(Ct){if(It&&n.texStorage3D(e.TEXTURE_2D_ARRAY,lt,ut,$.width,$.height,$.depth),D)if(y.layerUpdates.size>0){let Q=zv($.width,$.height,y.format,y.type);for(let ct of y.layerUpdates){let pt=$.data.subarray(ct*Q/$.data.BYTES_PER_ELEMENT,(ct+1)*Q/$.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ct,$.width,$.height,1,rt,Et,pt)}y.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,rt,Et,$.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,ut,$.width,$.height,$.depth,0,rt,Et,$.data);else if(y.isData3DTexture)Ct?(It&&n.texStorage3D(e.TEXTURE_3D,lt,ut,$.width,$.height,$.depth),D&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,rt,Et,$.data)):n.texImage3D(e.TEXTURE_3D,0,ut,$.width,$.height,$.depth,0,rt,Et,$.data);else if(y.isFramebufferTexture){if(It)if(Ct)n.texStorage2D(e.TEXTURE_2D,lt,ut,$.width,$.height);else{let Q=$.width,ct=$.height;for(let pt=0;pt<lt;pt++)n.texImage2D(e.TEXTURE_2D,pt,ut,Q,ct,0,rt,Et,null),Q>>=1,ct>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in e){let Q=e.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),$.parentNode!==Q){Q.appendChild($),p.add(y),Q.onpaint=ct=>{let pt=ct.changedElements;for(let it of p)pt.includes(it.image)&&(it.needsUpdate=!0)},Q.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,$);else{let pt=e.RGBA,it=e.RGBA,wt=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,pt,it,wt,$)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(Ct&&It){let Q=ue(Tt[0]);n.texStorage2D(e.TEXTURE_2D,lt,ut,Q.width,Q.height)}for(let Q=0,ct=Tt.length;Q<ct;Q++)ot=Tt[Q],Ct?D&&n.texSubImage2D(e.TEXTURE_2D,Q,0,0,rt,Et,ot):n.texImage2D(e.TEXTURE_2D,Q,ut,rt,Et,ot);y.generateMipmaps=!1}else if(Ct){if(It){let Q=ue($);n.texStorage2D(e.TEXTURE_2D,lt,ut,Q.width,Q.height)}D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,rt,Et,$)}else n.texImage2D(e.TEXTURE_2D,0,ut,rt,Et,$);h(y)&&v(H),at.__version=st.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Ut(C,y,I){if(y.image.length!==6)return;let H=Kt(C,y),Y=y.source;n.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+I);let st=i.get(Y);if(Y.version!==st.__version||H===!0){n.activeTexture(e.TEXTURE0+I);let at=Zt.getPrimaries(Zt.workingColorSpace),Z=y.colorSpace===Ks?null:Zt.getPrimaries(y.colorSpace),$=y.colorSpace===Ks||at===Z?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let rt=y.isCompressedTexture||y.image[0].isCompressedTexture,Et=y.image[0]&&y.image[0].isDataTexture,ut=[];for(let it=0;it<6;it++)!rt&&!Et?ut[it]=m(y.image[it],!0,s.maxCubemapSize):ut[it]=Et?y.image[it].image:y.image[it],ut[it]=Sn(y,ut[it]);let ot=ut[0],Tt=a.convert(y.format,y.colorSpace),Ct=a.convert(y.type),It=_(y.internalFormat,Tt,Ct,y.normalized,y.colorSpace),D=y.isVideoTexture!==!0,lt=st.__version===void 0||H===!0,Q=Y.dataReady,ct=T(y,ot);Wt(e.TEXTURE_CUBE_MAP,y);let pt;if(rt){D&&lt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,ct,It,ot.width,ot.height);for(let it=0;it<6;it++){pt=ut[it].mipmaps;for(let wt=0;wt<pt.length;wt++){let bt=pt[wt];y.format!==Ui?Tt!==null?D?Q&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,0,0,bt.width,bt.height,Tt,bt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,It,bt.width,bt.height,0,bt.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Q&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,0,0,bt.width,bt.height,Tt,Ct,bt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,It,bt.width,bt.height,0,Tt,Ct,bt.data)}}}else{if(pt=y.mipmaps,D&&lt){pt.length>0&&ct++;let it=ue(ut[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,ct,It,it.width,it.height)}for(let it=0;it<6;it++)if(Et){D?Q&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,ut[it].width,ut[it].height,Tt,Ct,ut[it].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,It,ut[it].width,ut[it].height,0,Tt,Ct,ut[it].data);for(let wt=0;wt<pt.length;wt++){let Se=pt[wt].image[it].image;D?Q&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,0,0,Se.width,Se.height,Tt,Ct,Se.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,It,Se.width,Se.height,0,Tt,Ct,Se.data)}}else{D?Q&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Tt,Ct,ut[it]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,It,Tt,Ct,ut[it]);for(let wt=0;wt<pt.length;wt++){let bt=pt[wt];D?Q&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,0,0,Tt,Ct,bt.image[it]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,It,Tt,Ct,bt.image[it])}}}h(y)&&v(e.TEXTURE_CUBE_MAP),st.__version=Y.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function vt(C,y,I,H,Y,st){let at=a.convert(I.format,I.colorSpace),Z=a.convert(I.type),$=_(I.internalFormat,at,Z,I.normalized,I.colorSpace),rt=i.get(y),Et=i.get(I);if(Et.__renderTarget=y,!rt.__hasExternalTextures){let ut=Math.max(1,y.width>>st),ot=Math.max(1,y.height>>st);Y===e.TEXTURE_3D||Y===e.TEXTURE_2D_ARRAY?n.texImage3D(Y,st,$,ut,ot,y.depth,0,at,Z,null):n.texImage2D(Y,st,$,ut,ot,0,at,Z,null)}n.bindFramebuffer(e.FRAMEBUFFER,C),Ve(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,H,Y,Et.__webglTexture,0,Le(y)):(Y===e.TEXTURE_2D||Y>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,H,Y,Et.__webglTexture,st),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ht(C,y,I){if(e.bindRenderbuffer(e.RENDERBUFFER,C),y.depthBuffer){let H=y.depthTexture,Y=H&&H.isDepthTexture?H.type:null,st=E(y.stencilBuffer,Y),at=y.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ve(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(y),st,y.width,y.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(y),st,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,st,y.width,y.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,at,e.RENDERBUFFER,C)}else{let H=y.textures;for(let Y=0;Y<H.length;Y++){let st=H[Y],at=a.convert(st.format,st.colorSpace),Z=a.convert(st.type),$=_(st.internalFormat,at,Z,st.normalized,st.colorSpace);Ve(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(y),$,y.width,y.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(y),$,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,$,y.width,y.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ze(C,y,I){let H=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(y.depthTexture);if(Y.__renderTarget=y,(!Y.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,y.depthTexture.addEventListener("dispose",w)),Y.__webglTexture===void 0){Y.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),Wt(e.TEXTURE_CUBE_MAP,y.depthTexture);let rt=a.convert(y.depthTexture.format),Et=a.convert(y.depthTexture.type),ut;y.depthTexture.format===_s?ut=e.DEPTH_COMPONENT24:y.depthTexture.format===Ja&&(ut=e.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ut,y.width,y.height,0,rt,Et,null)}}else et(y.depthTexture,0);let st=Y.__webglTexture,at=Le(y),Z=H?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,$=y.depthTexture.format===Ja?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(y.depthTexture.format===_s)Ve(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,$,Z,st,0,at):e.framebufferTexture2D(e.FRAMEBUFFER,$,Z,st,0);else if(y.depthTexture.format===Ja)Ve(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,$,Z,st,0,at):e.framebufferTexture2D(e.FRAMEBUFFER,$,Z,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Vt(C){let y=i.get(C),I=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let H=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),H){let Y=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),y.__depthDisposeCallback=Y}y.__boundDepthTexture=H}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(I)for(let H=0;H<6;H++)Ze(y.__webglFramebuffer[H],C,H);else{let H=C.texture.mipmaps;H&&H.length>0?Ze(y.__webglFramebuffer[0],C,0):Ze(y.__webglFramebuffer,C,0)}else if(I){y.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[H]),y.__webglDepthbuffer[H]===void 0)y.__webglDepthbuffer[H]=e.createRenderbuffer(),Ht(y.__webglDepthbuffer[H],C,!1);else{let Y=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer[H];e.bindRenderbuffer(e.RENDERBUFFER,st),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,st)}}else{let H=C.texture.mipmaps;if(H&&H.length>0?n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=e.createRenderbuffer(),Ht(y.__webglDepthbuffer,C,!1);else{let Y=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,st),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,st)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function te(C,y,I){let H=i.get(C);y!==void 0&&vt(H.__webglFramebuffer,C,C.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Vt(C)}function xe(C){let y=C.texture,I=i.get(C),H=i.get(y);C.addEventListener("dispose",x);let Y=C.textures,st=C.isWebGLCubeRenderTarget===!0,at=Y.length>1;if(at||(H.__webglTexture===void 0&&(H.__webglTexture=e.createTexture()),H.__version=y.version,r.memory.textures++),st){I.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer[Z]=[];for(let $=0;$<y.mipmaps.length;$++)I.__webglFramebuffer[Z][$]=e.createFramebuffer()}else I.__webglFramebuffer[Z]=e.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer=[];for(let Z=0;Z<y.mipmaps.length;Z++)I.__webglFramebuffer[Z]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(at)for(let Z=0,$=Y.length;Z<$;Z++){let rt=i.get(Y[Z]);rt.__webglTexture===void 0&&(rt.__webglTexture=e.createTexture(),r.memory.textures++)}if(C.samples>0&&Ve(C)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){let $=Y[Z];I.__webglColorRenderbuffer[Z]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[Z]);let rt=a.convert($.format,$.colorSpace),Et=a.convert($.type),ut=_($.internalFormat,rt,Et,$.normalized,$.colorSpace,C.isXRRenderTarget===!0),ot=Le(C);e.renderbufferStorageMultisample(e.RENDERBUFFER,ot,ut,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Z,e.RENDERBUFFER,I.__webglColorRenderbuffer[Z])}e.bindRenderbuffer(e.RENDERBUFFER,null),C.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Ht(I.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(st){n.bindTexture(e.TEXTURE_CUBE_MAP,H.__webglTexture),Wt(e.TEXTURE_CUBE_MAP,y);for(let Z=0;Z<6;Z++)if(y.mipmaps&&y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)vt(I.__webglFramebuffer[Z][$],C,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,$);else vt(I.__webglFramebuffer[Z],C,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);h(y)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(at){for(let Z=0,$=Y.length;Z<$;Z++){let rt=Y[Z],Et=i.get(rt),ut=e.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ut,Et.__webglTexture),Wt(ut,rt),vt(I.__webglFramebuffer,C,rt,e.COLOR_ATTACHMENT0+Z,ut,0),h(rt)&&v(ut)}n.unbindTexture()}else{let Z=e.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Z=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(Z,H.__webglTexture),Wt(Z,y),y.mipmaps&&y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)vt(I.__webglFramebuffer[$],C,y,e.COLOR_ATTACHMENT0,Z,$);else vt(I.__webglFramebuffer,C,y,e.COLOR_ATTACHMENT0,Z,0);h(y)&&v(Z),n.unbindTexture()}C.depthBuffer&&Vt(C)}function qt(C){let y=C.textures;for(let I=0,H=y.length;I<H;I++){let Y=y[I];if(h(Y)){let st=S(C),at=i.get(Y).__webglTexture;n.bindTexture(st,at),v(st),n.unbindTexture()}}}let Re=[],nn=[];function Vn(C){if(C.samples>0){if(Ve(C)===!1){let y=C.textures,I=C.width,H=C.height,Y=e.COLOR_BUFFER_BIT,st=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,at=i.get(C),Z=y.length>1;if(Z)for(let rt=0;rt<y.length;rt++)n.bindFramebuffer(e.FRAMEBUFFER,at.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,at.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer);let $=C.texture.mipmaps;$&&$.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let rt=0;rt<y.length;rt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=e.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=e.STENCIL_BUFFER_BIT)),Z){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,at.__webglColorRenderbuffer[rt]);let Et=i.get(y[rt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Et,0)}e.blitFramebuffer(0,0,I,H,0,0,I,H,Y,e.NEAREST),l===!0&&(Re.length=0,nn.length=0,Re.push(e.COLOR_ATTACHMENT0+rt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Re.push(st),nn.push(st),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,nn)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Re))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Z)for(let rt=0;rt<y.length;rt++){n.bindFramebuffer(e.FRAMEBUFFER,at.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,at.__webglColorRenderbuffer[rt]);let Et=i.get(y[rt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,at.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.TEXTURE_2D,Et,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let y=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[y])}}}function Le(C){return Math.min(s.maxSamples,C.samples)}function Ve(C){let y=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function L(C){let y=r.render.frame;f.get(C)!==y&&(f.set(C,y),C.update())}function Sn(C,y){let I=C.colorSpace,H=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||I!==Oc&&I!==Ks&&(Zt.getTransfer(I)===le?(H!==Ui||Y!==_i)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",I)),y}function ue(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=k,this.getTextureUnits=O,this.setTextureUnits=G,this.setTexture2D=et,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=nt,this.rebindTextures=te,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=Vn,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function BU(e,t){function n(i,s=Ks){let a,r=Zt.getTransfer(s);if(i===_i)return e.UNSIGNED_BYTE;if(i===md)return e.UNSIGNED_SHORT_4_4_4_4;if(i===gd)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Cv)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Rv)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Av)return e.BYTE;if(i===wv)return e.SHORT;if(i===ul)return e.UNSIGNED_SHORT;if(i===pd)return e.INT;if(i===Yi)return e.UNSIGNED_INT;if(i===Zi)return e.FLOAT;if(i===Ji)return e.HALF_FLOAT;if(i===Nv)return e.ALPHA;if(i===Dv)return e.RGB;if(i===Ui)return e.RGBA;if(i===_s)return e.DEPTH_COMPONENT;if(i===Ja)return e.DEPTH_STENCIL;if(i===Uv)return e.RED;if(i===vd)return e.RED_INTEGER;if(i===Ka)return e.RG;if(i===_d)return e.RG_INTEGER;if(i===yd)return e.RGBA_INTEGER;if(i===nu||i===iu||i===su||i===au)if(r===le)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===nu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===iu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===su)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===au)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===nu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===iu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===su)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===au)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xd||i===Sd||i===bd||i===Md)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===xd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===bd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Md)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ed||i===Td||i===Ad||i===wd||i===Cd||i===ru||i===Rd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ed||i===Td)return r===le?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Ad)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===wd)return a.COMPRESSED_R11_EAC;if(i===Cd)return a.COMPRESSED_SIGNED_R11_EAC;if(i===ru)return a.COMPRESSED_RG11_EAC;if(i===Rd)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Nd||i===Dd||i===Ud||i===Ld||i===Od||i===Id||i===Pd||i===Bd||i===Fd||i===zd||i===Hd||i===Vd||i===Gd||i===kd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Nd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ud)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ld)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Od)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Id)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===zd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Vd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Gd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Xd||i===Wd||i===qd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Xd)return r===le?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Yd||i===Zd||i===ou||i===Jd)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Yd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Zd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ou)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Jd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hl?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var FU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,$v=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Yc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Nn({vertexShader:FU,fragmentShader:zU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new hn(new Ga(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},t_=class extends ys{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,f=null,p=null,u=null,d=null,g=null,b=typeof XRWebGLBinding<"u",m=new $v,h={},v=n.getContextAttributes(),S=null,_=null,E=[],T=[],w=new $t,x=null,A=null,R=new Cn;R.viewport=new Ie;let U=new Cn;U.viewport=new Ie;let B=[R,U],k=new ud,O=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=E[q];return tt===void 0&&(tt=new sl,E[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=E[q];return tt===void 0&&(tt=new sl,E[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=E[q];return tt===void 0&&(tt=new sl,E[q]=tt),tt.getHandSpace()};function K(q){let tt=T.indexOf(q.inputSource);if(tt===-1)return;let gt=E[tt];gt!==void 0&&(gt.update(q.inputSource,q.frame,c||r),gt.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",et);for(let q=0;q<E.length;q++){let tt=T[q];tt!==null&&(T[q]=null,E[q].disconnect(tt))}O=null,G=null,m.reset();for(let q in h)delete h[q];if(t.setRenderTarget(S),d=null,u=null,p=null,s=null,_=null,Kt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(w.width,w.height,!1),A!==null){let q=A.camera;q.fov=A.fov,q.zoom=A.zoom,q.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,n)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",W),s.addEventListener("inputsourceschange",et),v.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(w),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,Ut=null,vt=null;v.depth&&(vt=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,gt=v.stencil?Ja:_s,Ut=v.stencil?hl:Yi);let Ht={colorFormat:n.RGBA8,depthFormat:vt,scaleFactor:a};p=this.getBinding(),u=p.createProjectionLayer(Ht),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new Qn(u.textureWidth,u.textureHeight,{format:Ui,type:_i,depthTexture:new Va(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let gt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(s,n,gt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Qn(d.framebufferWidth,d.framebufferHeight,{format:Ui,type:_i,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(q){for(let tt=0;tt<q.removed.length;tt++){let gt=q.removed[tt],Ut=T.indexOf(gt);Ut>=0&&(T[Ut]=null,E[Ut].disconnect(gt))}for(let tt=0;tt<q.added.length;tt++){let gt=q.added[tt],Ut=T.indexOf(gt);if(Ut===-1){for(let Ht=0;Ht<E.length;Ht++)if(Ht>=T.length){T.push(gt),Ut=Ht;break}else if(T[Ht]===null){T[Ht]=gt,Ut=Ht;break}if(Ut===-1)break}let vt=E[Ut];vt&&vt.connect(gt)}}let V=new P,J=new P;function nt(q,tt,gt){V.setFromMatrixPosition(tt.matrixWorld),J.setFromMatrixPosition(gt.matrixWorld);let Ut=V.distanceTo(J),vt=tt.projectionMatrix.elements,Ht=gt.projectionMatrix.elements,Ze=vt[14]/(vt[10]-1),Vt=vt[14]/(vt[10]+1),te=(vt[9]+1)/vt[5],xe=(vt[9]-1)/vt[5],qt=(vt[8]-1)/vt[0],Re=(Ht[8]+1)/Ht[0],nn=Ze*qt,Vn=Ze*Re,Le=Ut/(-qt+Re),Ve=Le*-qt;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ve),q.translateZ(Le),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),vt[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let L=Ze+Le,Sn=Vt+Le,ue=nn-Ve,C=Vn+(Ut-Ve),y=te*Vt/Sn*L,I=xe*Vt/Sn*L;q.projectionMatrix.makePerspective(ue,C,y,I,L,Sn),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function At(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let tt=q.near,gt=q.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(gt=m.depthFar)),k.near=U.near=R.near=tt,k.far=U.far=R.far=gt,(O!==k.near||G!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),O=k.near,G=k.far),k.layers.mask=q.layers.mask|6,R.layers.mask=k.layers.mask&-5,U.layers.mask=k.layers.mask&-3;let Ut=q.parent,vt=k.cameras;At(k,Ut);for(let Ht=0;Ht<vt.length;Ht++)At(vt[Ht],Ut);vt.length===2?nt(k,R,U):k.projectionMatrix.copy(R.projectionMatrix),A===null&&q.isPerspectiveCamera&&(A={camera:q,fov:q.fov,zoom:q.zoom}),St(q,k,Ut)};function St(q,tt,gt){gt===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(gt.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=kf*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(q){return h[q]};let pe=null;function Wt(q,tt){if(f=tt.getViewerPose(c||r),g=tt,f!==null){let gt=f.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Ut=!1;gt.length!==k.cameras.length&&(k.cameras.length=0,Ut=!0);for(let Vt=0;Vt<gt.length;Vt++){let te=gt[Vt],xe=null;if(d!==null)xe=d.getViewport(te);else{let Re=p.getViewSubImage(u,te);xe=Re.viewport,Vt===0&&(t.setRenderTargetTextures(_,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(_))}let qt=B[Vt];qt===void 0&&(qt=new Cn,qt.layers.enable(Vt),qt.viewport=new Ie,B[Vt]=qt),qt.matrix.fromArray(te.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(te.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(xe.x,xe.y,xe.width,xe.height),Vt===0&&(k.matrix.copy(qt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ut===!0&&k.cameras.push(qt)}let vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=i.getBinding();let Vt=p.getDepthInformation(gt[0]);Vt&&Vt.isValid&&Vt.texture&&m.init(Vt,s.renderState)}if(vt&&vt.includes("camera-access")&&b){t.state.unbindTexture(),p=i.getBinding();for(let Vt=0;Vt<gt.length;Vt++){let te=gt[Vt].camera;if(te){let xe=h[te];xe||(xe=new Yc,h[te]=xe);let qt=p.getCameraImage(te);xe.sourceTexture=qt}}}}for(let gt=0;gt<E.length;gt++){let Ut=T[gt],vt=E[gt];Ut!==null&&vt!==void 0&&vt.update(Ut,tt,c||r)}pe&&pe(q,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}let Kt=new DE;Kt.setAnimationLoop(Wt),this.setAnimationLoop=function(q){pe=q},this.dispose=function(){}}},HU=new Fe,BE=new Ot;BE.set(-1,0,0,0,1,0,0,0,1);function VU(e,t){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Pv(e)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,v,S,_){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?a(m,h):h.isMeshLambertMaterial?(a(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(a(m,h),p(m,h)):h.isMeshPhongMaterial?(a(m,h),f(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(a(m,h),u(m,h),h.isMeshPhysicalMaterial&&d(m,h,_)):h.isMeshMatcapMaterial?(a(m,h),g(m,h)):h.isMeshDepthMaterial?a(m,h):h.isMeshDistanceMaterial?(a(m,h),b(m,h)):h.isMeshNormalMaterial?a(m,h):h.isLineBasicMaterial?(r(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,v,S):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===zn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===zn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);let v=t.get(h),S=v.envMap,_=v.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(HU.makeRotationFromEuler(_)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(BE),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function r(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,S){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=S*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function f(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function p(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function u(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function d(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===zn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.retroreflectivity>0&&(m.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function b(m,h){let v=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function GU(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,E){let T=E.program;i.uniformBlockBinding(_,T)}function c(_,E){let T=s[_.id];T===void 0&&(m(_),T=f(_),s[_.id]=T,_.addEventListener("dispose",v));let w=E.program;i.updateUBOMapping(_,w);let x=t.render.frame;a[_.id]!==x&&(u(_),a[_.id]=x)}function f(_){let E=p();_.__bindingPointIndex=E;let T=e.createBuffer(),w=_.__size,x=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,T),e.bufferData(e.UNIFORM_BUFFER,w,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,E,T),T}function p(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let E=s[_.id],T=_.uniforms,w=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,E);for(let x=0,A=T.length;x<A;x++){let R=T[x];if(Array.isArray(R))for(let U=0,B=R.length;U<B;U++)d(R[U],x,U,w);else d(R,x,0,w)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(_,E,T,w){if(b(_,E,T,w)===!0){let x=_.__offset,A=_.value;if(Array.isArray(A)){let R=0;for(let U=0;U<A.length;U++){let B=A[U],k=h(B);g(B,_.__data,R),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(R+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,_.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,x,_.__data)}}function g(_,E,T){typeof _=="number"||typeof _=="boolean"?E[0]=_:_.isMatrix3?(E[0]=_.elements[0],E[1]=_.elements[1],E[2]=_.elements[2],E[3]=0,E[4]=_.elements[3],E[5]=_.elements[4],E[6]=_.elements[5],E[7]=0,E[8]=_.elements[6],E[9]=_.elements[7],E[10]=_.elements[8],E[11]=0):ArrayBuffer.isView(_)?E.set(new _.constructor(_.buffer,_.byteOffset,E.length)):_.toArray(E,T)}function b(_,E,T,w){let x=_.value,A=E+"_"+T;if(w[A]===void 0)return typeof x=="number"||typeof x=="boolean"?w[A]=x:ArrayBuffer.isView(x)?w[A]=x.slice():w[A]=x.clone(),!0;{let R=w[A];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return w[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(_){let E=_.uniforms,T=0,w=16;for(let A=0,R=E.length;A<R;A++){let U=Array.isArray(E[A])?E[A]:[E[A]];for(let B=0,k=U.length;B<k;B++){let O=U[B],G=Array.isArray(O.value)?O.value:[O.value];for(let K=0,W=G.length;K<W;K++){let et=G[K],V=h(et),J=T%w,nt=J%V.boundary,At=J+nt;T+=nt,At!==0&&w-At<V.storage&&(T+=w-At),O.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=V.storage}}}let x=T%w;return x>0&&(T+=w-x),_.__size=T,_.__cache={},this}function h(_){let E={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(E.boundary=4,E.storage=4):_.isVector2?(E.boundary=8,E.storage=8):_.isVector3||_.isColor?(E.boundary=16,E.storage=12):_.isVector4?(E.boundary=16,E.storage=16):_.isMatrix3?(E.boundary=48,E.storage=48):_.isMatrix4?(E.boundary=64,E.storage=64):_.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(E.boundary=16,E.storage=_.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",_),E}function v(_){let E=_.target;E.removeEventListener("dispose",v);let T=r.indexOf(E.__bindingPointIndex);r.splice(T,1),e.deleteBuffer(s[E.id]),delete s[E.id],delete a[E.id]}function S(){for(let _ in s)e.deleteBuffer(s[_]);r=[],s={},a={}}return{bind:l,update:c,dispose:S}}var kU=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),bs=null;function XU(){return bs===null&&(bs=new Yf(kU,16,16,Ka,Ji),bs.name="DFG_LUT",bs.minFilter=xn,bs.magFilter=xn,bs.wrapS=vs,bs.wrapT=vs,bs.generateMipmaps=!1,bs.needsUpdate=!0),bs}var np=class{constructor(t={}){let{canvas:n=nE(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:d=_i}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;let b=d,m=new Set([yd,_d,vd]),h=new Set([_i,Yi,ul,hl,md,gd]),v=new Uint32Array(4),S=new Int32Array(4),_=new P,E=null,T=null,w=[],x=[],A=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,U=!1,B=null,k=null,O=null,G=null;this._outputColorSpace=mi;let K=0,W=0,et=null,V=-1,J=null,nt=new Ie,At=new Ie,St=null,pe=new Qt(0),Wt=0,Kt=n.width,q=n.height,tt=1,gt=null,Ut=null,vt=new Ie(0,0,Kt,q),Ht=new Ie(0,0,Kt,q),Ze=!1,Vt=new Wc,te=!1,xe=!1,qt=new Fe,Re=new P,nn=new Ie,Vn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Le=!1;function Ve(){return et===null?tt:1}let L=i;function Sn(M,N){return n.getContext(M,N)}let ue,C,y,I,H,Y,st,at,Z,$,rt,Et,ut,ot,Tt,Ct,It,D,lt,Q,ct,pt,it;try{let M={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"186"}`),n.addEventListener("webglcontextlost",Se,!1),n.addEventListener("webglcontextrestored",ae,!1),n.addEventListener("webglcontextcreationerror",Oi,!1),L===null){let N="webgl2";if(L=Sn(N,M),L===null)throw Sn(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}wt()}catch(M){throw n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",ae,!1),n.removeEventListener("webglcontextcreationerror",Oi,!1),Dt("WebGLRenderer: "+M.message),M}function wt(){ue=new QN(L),ue.init(),ct=new BU(L,ue),C=new VN(L,ue,t,ct),y=new IU(L,ue),C.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),k=L.createFramebuffer(),O=L.createFramebuffer(),G=L.createFramebuffer(),I=new tD(L),H=new SU,Y=new PU(L,ue,y,H,C,ct,I),st=new KN(R),at=new n3(L),pt=new zN(L,at),Z=new jN(L,at,I,pt),$=new nD(L,Z,at,pt,I),D=new eD(L,C,Y),Tt=new GN(H),rt=new xU(R,st,ue,C,pt,Tt),Et=new VU(R,H),ut=new MU,ot=new RU(ue),It=new FN(R,st,y,$,g,l),Ct=new OU(R,$,C),it=new GU(L,I,C,y),lt=new HN(L,ue,I),Q=new $N(L,ue,I),I.programs=rt.programs,R.capabilities=C,R.extensions=ue,R.properties=H,R.renderLists=ut,R.shadowMap=Ct,R.state=y,R.info=I}b!==_i&&(A=new sD(b,n.width,n.height,o,s,a));let bt=new t_(R,L);this.xr=bt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let M=ue.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ue.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(M){M!==void 0&&(tt=M,this.setSize(Kt,q,!1))},this.getSize=function(M){return M.set(Kt,q)},this.setSize=function(M,N,X=!0){if(bt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=M,q=N,n.width=Math.floor(M*tt),n.height=Math.floor(N*tt),X===!0&&(n.style.width=M+"px",n.style.height=N+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(Kt*tt,q*tt).floor()},this.setDrawingBufferSize=function(M,N,X){Kt=M,q=N,tt=X,n.width=Math.floor(M*X),n.height=Math.floor(N*X),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(b===_i){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(nt)},this.getViewport=function(M){return M.copy(vt)},this.setViewport=function(M,N,X,F){M.isVector4?vt.set(M.x,M.y,M.z,M.w):vt.set(M,N,X,F),y.viewport(nt.copy(vt).multiplyScalar(tt).round())},this.getScissor=function(M){return M.copy(Ht)},this.setScissor=function(M,N,X,F){M.isVector4?Ht.set(M.x,M.y,M.z,M.w):Ht.set(M,N,X,F),y.scissor(At.copy(Ht).multiplyScalar(tt).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(M){y.setScissorTest(Ze=M)},this.setOpaqueSort=function(M){gt=M},this.setTransparentSort=function(M){Ut=M},this.getClearColor=function(M){return M.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,X=!0){let F=0;if(M){let z=!1;if(et!==null){let dt=et.texture.format;z=m.has(dt)}if(z){let dt=et.texture.type,_t=h.has(dt),ft=It.getClearColor(),yt=It.getClearAlpha(),Mt=ft.r,Bt=ft.g,Gt=ft.b;_t?(v[0]=Mt,v[1]=Bt,v[2]=Gt,v[3]=yt,L.clearBufferuiv(L.COLOR,0,v)):(S[0]=Mt,S[1]=Bt,S[2]=Gt,S[3]=yt,L.clearBufferiv(L.COLOR,0,S))}else F|=L.COLOR_BUFFER_BIT}N&&(F|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(F|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&L.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),B=M},this.dispose=function(){n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",ae,!1),n.removeEventListener("webglcontextcreationerror",Oi,!1),It.dispose(),ut.dispose(),ot.dispose(),H.dispose(),st.dispose(),$.dispose(),pt.dispose(),it.dispose(),rt.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",E_),bt.removeEventListener("sessionend",T_),$a.stop()};function Se(M){M.preventDefault(),Iv("WebGLRenderer: Context Lost."),U=!0}function ae(){Iv("WebGLRenderer: Context Restored."),U=!1;let M=I.autoReset,N=Ct.enabled,X=Ct.autoUpdate,F=Ct.needsUpdate,z=Ct.type;wt(),I.autoReset=M,Ct.enabled=N,Ct.autoUpdate=X,Ct.needsUpdate=F,Ct.type=z}function Oi(M){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ji(M){let N=M.target;N.removeEventListener("dispose",ji),BT(N)}function BT(M){FT(M),H.remove(M)}function FT(M){let N=H.get(M).programs;N!==void 0&&(N.forEach(function(X){rt.releaseProgram(X)}),M.isShaderMaterial&&rt.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,X,F,z,dt){N===null&&(N=Vn);let _t=z.isMesh&&z.matrixWorld.determinantAffine()<0,ft=VT(M,N,X,F,z);y.setMaterial(F,_t);let yt=X.index,Mt=1;if(F.wireframe===!0){if(yt=Z.getWireframeAttribute(X),yt===void 0)return;Mt=2}let Bt=X.drawRange,Gt=X.attributes.position,xt=Bt.start*Mt,re=(Bt.start+Bt.count)*Mt;dt!==null&&(xt=Math.max(xt,dt.start*Mt),re=Math.min(re,(dt.start+dt.count)*Mt)),yt!==null?(xt=Math.max(xt,0),re=Math.min(re,yt.count)):Gt!=null&&(xt=Math.max(xt,0),re=Math.min(re,Gt.count));let Ge=re-xt;if(Ge<0||Ge===1/0)return;pt.setup(z,F,ft,X,yt);let we,ve=lt;if(yt!==null&&(we=at.get(yt),ve=Q,ve.setIndex(we)),z.isMesh)F.wireframe===!0?(y.setLineWidth(F.wireframeLinewidth*Ve()),ve.setMode(L.LINES)):ve.setMode(L.TRIANGLES);else if(z.isLine){let bn=F.linewidth;bn===void 0&&(bn=1),y.setLineWidth(bn*Ve()),z.isLineSegments?ve.setMode(L.LINES):z.isLineLoop?ve.setMode(L.LINE_LOOP):ve.setMode(L.LINE_STRIP)}else z.isPoints?ve.setMode(L.POINTS):z.isSprite&&ve.setMode(L.TRIANGLES);if(z.isBatchedMesh)if(ue.get("WEBGL_multi_draw"))ve.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let bn=z._multiDrawStarts,mt=z._multiDrawCounts,Un=z._multiDrawCount,jt=yt?at.get(yt).bytesPerElement:1,yi=H.get(F).currentProgram.getUniforms();for(let $i=0;$i<Un;$i++)yi.setValue(L,"_gl_DrawID",$i),ve.render(bn[$i]/jt,mt[$i])}else if(z.isInstancedMesh)ve.renderInstances(xt,Ge,z.count);else if(X.isInstancedBufferGeometry){let bn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,mt=Math.min(X.instanceCount,bn);ve.renderInstances(xt,Ge,mt)}else ve.render(xt,Ge)};function M_(M,N,X,F){B!==null&&M.isNodeMaterial&&B.setObject(F,M),te===!0&&Tt.setState(M,X,!1),M.transparent===!0&&M.side===Di&&M.forceSinglePass===!1?(M.side=zn,M.needsUpdate=!0,bu(M,N,F),M.side=qa,M.needsUpdate=!0,bu(M,N,F),M.side=Di):bu(M,N,F)}this.compile=function(M,N,X=null){X===null&&(X=M),B!==null&&B.renderStart(M,N,X),T=ot.get(X),T.init(N),x.push(T),X.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),M!==X&&M.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),T.setupLights(),B!==null&&B.updateLights(T.state.lightsArray),xe=this.localClippingEnabled,te=Tt.init(this.clippingPlanes,xe),te===!0&&Tt.setGlobalState(this.clippingPlanes,N),B!==null&&Ct.render(T.state.shadowsArray,X,N);let F=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let dt=z.material;if(dt)if(Array.isArray(dt))for(let _t=0;_t<dt.length;_t++){let ft=dt[_t];M_(ft,X,N,z),F.add(ft)}else M_(dt,X,N,z),F.add(dt)}),T=x.pop(),B!==null&&B.renderEnd(),F},this.compileAsync=function(M,N,X=null){let F=this.compile(M,N,X);return new Promise(z=>{function dt(){if(F.forEach(function(_t){let yt=H.get(_t).currentProgram;(yt===void 0||yt.isReady())&&F.delete(_t)}),F.size===0){z(M);return}setTimeout(dt,10)}ue.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Up=null;function zT(M){Up&&Up(M)}function E_(){$a.stop()}function T_(){$a.start()}let $a=new DE;$a.setAnimationLoop(zT),typeof self<"u"&&$a.setContext(self),this.setAnimationLoop=function(M){Up=M,bt.setAnimationLoop(M),M===null?$a.stop():$a.start()},bt.addEventListener("sessionstart",E_),bt.addEventListener("sessionend",T_),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;B!==null&&B.renderStart(M,N);let X=bt.enabled===!0&&bt.isPresenting===!0,F=A!==null&&(et===null||X)&&A.begin(R,et);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(N),N=bt.getCamera()),M.isScene===!0&&M.onBeforeRender(R,M,N,et),T=ot.get(M,x.length),T.init(N),T.state.textureUnits=Y.getTextureUnits(),x.push(T),qt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Vt.setFromProjectionMatrix(qt,Wi,N.reversedDepth),xe=this.localClippingEnabled,te=Tt.init(this.clippingPlanes,xe),E=ut.get(M,w.length),E.init(),w.push(E),bt.enabled===!0&&bt.isPresenting===!0){let _t=R.xr.getDepthSensingMesh();_t!==null&&Lp(_t,N,-1/0,R.sortObjects)}Lp(M,N,0,R.sortObjects),E.finish(),B!==null&&B.updateLights(T.state.lightsArray),R.sortObjects===!0&&E.sort(gt,Ut),Le=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Le&&It.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),te===!0&&Tt.beginShadows();let z=T.state.shadowsArray;if(Ct.render(z,M,N),te===!0&&Tt.endShadows(),(F&&A.hasRenderPass())===!1){let _t=E.opaque,ft=E.transmissive;if(T.setupLights(),N.isArrayCamera){let yt=N.cameras;if(ft.length>0)for(let Mt=0,Bt=yt.length;Mt<Bt;Mt++){let Gt=yt[Mt];w_(_t,ft,M,Gt)}Le&&It.render(M);for(let Mt=0,Bt=yt.length;Mt<Bt;Mt++){let Gt=yt[Mt];A_(E,M,Gt,Gt.viewport)}}else ft.length>0&&w_(_t,ft,M,N),Le&&It.render(M),A_(E,M,N)}et!==null&&W===0&&(Y.updateMultisampleRenderTarget(et),Y.updateRenderTargetMipmap(et)),F&&A.end(R),M.isScene===!0&&M.onAfterRender(R,M,N),pt.resetDefaultState(),V=-1,J=null,x.pop(),x.length>0?(T=x[x.length-1],Y.setTextureUnits(T.state.textureUnits),te===!0&&Tt.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,w.pop(),w.length>0?E=w[w.length-1]:E=null,B!==null&&B.renderEnd()};function Lp(M,N,X,F){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Vt)){F&&nn.setFromMatrixPosition(M.matrixWorld).applyMatrix4(qt);let _t=$.update(M),ft=M.material;ft.visible&&E.push(M,_t,ft,X,nn.z,null,N)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Vt))){let _t=$.update(M),ft=M.material;if(F&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),nn.copy(M.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),nn.copy(_t.boundingSphere.center)),nn.applyMatrix4(M.matrixWorld).applyMatrix4(qt)),Array.isArray(ft)){let yt=_t.groups;for(let Mt=0,Bt=yt.length;Mt<Bt;Mt++){let Gt=yt[Mt],xt=ft[Gt.materialIndex];xt&&xt.visible&&E.push(M,_t,xt,X,nn.z,Gt,N)}}else ft.visible&&E.push(M,_t,ft,X,nn.z,null,N)}}let dt=M.children;for(let _t=0,ft=dt.length;_t<ft;_t++)Lp(dt[_t],N,X,F)}function A_(M,N,X,F){let{opaque:z,transmissive:dt,transparent:_t}=M;T.setupLightsView(X),te===!0&&Tt.setGlobalState(R.clippingPlanes,X),F&&y.viewport(nt.copy(F)),z.length>0&&Su(z,N,X),dt.length>0&&Su(dt,N,X),_t.length>0&&Su(_t,N,X),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function w_(M,N,X,F){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[F.id]===void 0){let xt=ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[F.id]=new Qn(1,1,{generateMipmaps:!0,type:xt?Ji:_i,minFilter:Za,samples:Math.max(4,C.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}let dt=T.state.transmissionRenderTarget[F.id],_t=F.viewport||nt;dt.setSize(_t.z*R.transmissionResolutionScale,_t.w*R.transmissionResolutionScale);let ft=R.getRenderTarget(),yt=R.getActiveCubeFace(),Mt=R.getActiveMipmapLevel();R.setRenderTarget(dt),R.getClearColor(pe),Wt=R.getClearAlpha(),Wt<1&&R.setClearColor(16777215,.5),R.clear(),Le&&It.render(X);let Bt=R.toneMapping;R.toneMapping=qi;let Gt=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),T.setupLightsView(F),te===!0&&Tt.setGlobalState(R.clippingPlanes,F),Su(M,X,F),Y.updateMultisampleRenderTarget(dt),Y.updateRenderTargetMipmap(dt),ue.has("WEBGL_multisampled_render_to_texture")===!1){let xt=!1;for(let re=0,Ge=N.length;re<Ge;re++){let we=N[re],{object:ve,geometry:bn,material:mt,group:Un}=we;if(mt.side===Di&&ve.layers.test(F.layers)){let jt=mt.side;mt.side=zn,mt.needsUpdate=!0,C_(ve,X,F,bn,mt,Un),mt.side=jt,mt.needsUpdate=!0,xt=!0}}xt===!0&&(Y.updateMultisampleRenderTarget(dt),Y.updateRenderTargetMipmap(dt))}R.setRenderTarget(ft,yt,Mt),R.setClearColor(pe,Wt),Gt!==void 0&&(F.viewport=Gt),R.toneMapping=Bt}function Su(M,N,X){let F=N.isScene===!0?N.overrideMaterial:null;for(let z=0,dt=M.length;z<dt;z++){let _t=M[z],{object:ft,geometry:yt,group:Mt}=_t,Bt=_t.material;Bt.allowOverride===!0&&F!==null&&(Bt=F),ft.layers.test(X.layers)&&C_(ft,N,X,yt,Bt,Mt)}}function C_(M,N,X,F,z,dt){B!==null&&z.isNodeMaterial&&B.setObject(M,z),M.onBeforeRender(R,N,X,F,z,dt),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(R,N,X,F,M,dt),z.transparent===!0&&z.side===Di&&z.forceSinglePass===!1?(z.side=zn,z.needsUpdate=!0,R.renderBufferDirect(X,N,F,z,M,dt),z.side=qa,z.needsUpdate=!0,R.renderBufferDirect(X,N,F,z,M,dt),z.side=Di):R.renderBufferDirect(X,N,F,z,M,dt),M.onAfterRender(R,N,X,F,z,dt)}function bu(M,N,X){N.isScene!==!0&&(N=Vn);let F=H.get(M),z=T.state.lights,dt=T.state.shadowsArray,_t=z.state.version,ft=rt.getParameters(M,z.state,dt,N,X,T.state.lightProbeGridArray),yt=rt.getProgramCacheKey(ft),Mt=F.programs;F.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,F.fog=N.fog;let Bt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;F.envMap=st.get(M.envMap||F.environment,Bt),F.envMapRotation=F.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Mt===void 0&&(M.addEventListener("dispose",ji),Mt=new Map,F.programs=Mt);let Gt=Mt.get(yt);if(Gt!==void 0){if(F.currentProgram===Gt&&F.lightsStateVersion===_t)return N_(M,ft),Gt}else ft.uniforms=rt.getUniforms(M),B!==null&&M.isNodeMaterial&&B.build(M,X,ft),M.onBeforeCompile(ft,R),Gt=rt.acquireProgram(ft,yt),Mt.set(yt,Gt),F.uniforms=ft.uniforms;let xt=F.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(xt.clippingPlanes=Tt.uniform),N_(M,ft),F.needsLights=kT(M),F.lightsStateVersion=_t,F.needsLights&&(xt.ambientLightColor.value=z.state.ambient,xt.lightProbe.value=z.state.probe,xt.sunLights.value=z.state.sun,xt.sunLightShadows.value=z.state.sunShadow,xt.directionalLights.value=z.state.directional,xt.directionalLightShadows.value=z.state.directionalShadow,xt.spotLights.value=z.state.spot,xt.spotLightShadows.value=z.state.spotShadow,xt.rectAreaLights.value=z.state.rectArea,xt.ltc_1.value=z.state.rectAreaLTC1,xt.ltc_2.value=z.state.rectAreaLTC2,xt.pointLights.value=z.state.point,xt.pointLightShadows.value=z.state.pointShadow,xt.hemisphereLights.value=z.state.hemi,xt.sunShadowMatrix.value=z.state.sunShadowMatrix,xt.sunShadowCascade.value=z.state.sunShadowCascade,xt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,xt.spotLightMatrix.value=z.state.spotLightMatrix,xt.spotLightMap.value=z.state.spotLightMap,xt.pointShadowMatrix.value=z.state.pointShadowMatrix),F.lightProbeGrid=T.state.lightProbeGridArray.length>0,F.currentProgram=Gt,F.uniformsList=null,Gt}function R_(M){if(M.uniformsList===null){let N=M.currentProgram.getUniforms();M.uniformsList=pl.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function N_(M,N){let X=H.get(M);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function HT(M,N){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;_.setFromMatrixPosition(N.matrixWorld);for(let X=0,F=M.length;X<F;X++){let z=M[X];if(z.texture!==null&&z.boundingBox.containsPoint(_))return z}return null}function VT(M,N,X,F,z){N.isScene!==!0&&(N=Vn),Y.resetTextureUnits();let dt=N.fog,_t=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?N.environment:null,ft=et===null?R.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Zt.workingColorSpace,yt=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,Mt=st.get(F.envMap||_t,yt),Bt=F.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Gt=!!X.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),xt=!!X.morphAttributes.position,re=!!X.morphAttributes.normal,Ge=!!X.morphAttributes.color,we=qi;F.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(we=R.toneMapping);let ve=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,bn=ve!==void 0?ve.length:0,mt=H.get(F),Un=T.state.lights;if(te===!0&&(xe===!0||M!==J)){let be=M===J&&F.id===V;Tt.setState(F,M,be)}let jt=!1;F.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Un.state.version||mt.outputColorSpace!==ft||z.isBatchedMesh&&mt.batching===!1||!z.isBatchedMesh&&mt.batching===!0||z.isBatchedMesh&&mt.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&mt.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&mt.instancing===!1||!z.isInstancedMesh&&mt.instancing===!0||z.isSkinnedMesh&&mt.skinning===!1||!z.isSkinnedMesh&&mt.skinning===!0||z.isInstancedMesh&&mt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&mt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&mt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&mt.instancingMorph===!1&&z.morphTexture!==null||mt.envMap!==Mt||F.fog===!0&&mt.fog!==dt||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==Tt.numPlanes||mt.numIntersection!==Tt.numIntersection)||mt.vertexAlphas!==Bt||mt.vertexTangents!==Gt||mt.morphTargets!==xt||mt.morphNormals!==re||mt.morphColors!==Ge||mt.toneMapping!==we||mt.morphTargetsCount!==bn||!!mt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(jt=!0):(jt=!0,mt.__version=F.version);let yi=mt.currentProgram;jt===!0&&(yi=bu(F,N,z),B&&F.isNodeMaterial&&B.onUpdateProgram(F,yi,mt));let $i=!1,js=!1,Hr=!1,me=yi.getUniforms(),ze=mt.uniforms;if(y.useProgram(yi.program)&&($i=!0,js=!0,Hr=!0),F.id!==V&&(V=F.id,js=!0),mt.needsLights){let be=HT(T.state.lightProbeGridArray,z);mt.lightProbeGrid!==be&&(mt.lightProbeGrid=be,js=!0)}if($i||J!==M){y.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),me.setValue(L,"projectionMatrix",M.projectionMatrix),me.setValue(L,"viewMatrix",M.matrixWorldInverse);let ta=me.map.cameraPosition;ta!==void 0&&ta.setValue(L,Re.setFromMatrixPosition(M.matrixWorld)),C.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&me.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),J!==M&&(J=M,js=!0,Hr=!0)}if(mt.needsLights&&(Un.state.sunShadowMap.length>0&&me.setValue(L,"sunShadowMap",Un.state.sunShadowMap,Y),Un.state.directionalShadowMap.length>0&&me.setValue(L,"directionalShadowMap",Un.state.directionalShadowMap,Y),Un.state.spotShadowMap.length>0&&me.setValue(L,"spotShadowMap",Un.state.spotShadowMap,Y),Un.state.pointShadowMap.length>0&&me.setValue(L,"pointShadowMap",Un.state.pointShadowMap,Y)),z.isSkinnedMesh){me.setOptional(L,z,"bindMatrix"),me.setOptional(L,z,"bindMatrixInverse");let be=z.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),me.setValue(L,"boneTexture",be.boneTexture,Y))}z.isBatchedMesh&&(me.setOptional(L,z,"batchingTexture"),me.setValue(L,"batchingTexture",z._matricesTexture,Y),me.setOptional(L,z,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",z._indirectTexture,Y),me.setOptional(L,z,"batchingColorTexture"),z._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",z._colorsTexture,Y));let $s=X.morphAttributes;if(($s.position!==void 0||$s.normal!==void 0||$s.color!==void 0)&&D.update(z,X,yi),(js||mt.receiveShadow!==z.receiveShadow)&&(mt.receiveShadow=z.receiveShadow,me.setValue(L,"receiveShadow",z.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&N.environment!==null&&(ze.envMapIntensity.value=N.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=XU()),js){if(me.setValue(L,"toneMappingExposure",R.toneMappingExposure),mt.needsLights&&GT(ze,Hr),dt&&F.fog===!0&&Et.refreshFogUniforms(ze,dt),Et.refreshMaterialUniforms(ze,F,tt,q,T.state.transmissionRenderTarget[M.id]),mt.needsLights&&mt.lightProbeGrid){let be=mt.lightProbeGrid;ze.probesSH.value=be.texture,ze.probesMin.value.copy(be.boundingBox.min),ze.probesMax.value.copy(be.boundingBox.max),ze.probesResolution.value.copy(be.resolution)}pl.upload(L,R_(mt),ze,Y)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(pl.upload(L,R_(mt),ze,Y),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&me.setValue(L,"center",z.center),me.setValue(L,"modelViewMatrix",z.modelViewMatrix),me.setValue(L,"normalMatrix",z.normalMatrix),me.setValue(L,"modelMatrix",z.matrixWorld),F.uniformsGroups!==void 0){let be=F.uniformsGroups;for(let ta=0,Vr=be.length;ta<Vr;ta++){let U_=be[ta];it.update(U_,yi),it.bind(U_,yi)}}return yi}function GT(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.sunLights.needsUpdate=N,M.sunLightShadows.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function kT(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(M,N,X){let F=H.get(M);F.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),H.get(M.texture).__webglTexture=N,H.get(M.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:X,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){let X=H.get(M);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,X=0){et=M,K=N,W=X;let F=null,z=!1,dt=!1;if(M){let ft=H.get(M);if(ft.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(L.FRAMEBUFFER,ft.__webglFramebuffer),nt.copy(M.viewport),At.copy(M.scissor),St=M.scissorTest,y.viewport(nt),y.scissor(At),y.setScissorTest(St),V=-1;return}else if(ft.__webglFramebuffer===void 0)Y.setupRenderTarget(M);else if(ft.__hasExternalTextures)Y.rebindTextures(M,H.get(M.texture).__webglTexture,H.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Bt=M.depthTexture;if(ft.__boundDepthTexture!==Bt){if(Bt!==null&&H.has(Bt)&&(M.width!==Bt.image.width||M.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(M)}}let yt=M.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(dt=!0);let Mt=H.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Mt[N])?F=Mt[N][X]:F=Mt[N],z=!0):M.samples>0&&Y.useMultisampledRTT(M)===!1?F=H.get(M).__webglMultisampledFramebuffer:Array.isArray(Mt)?F=Mt[X]:F=Mt,nt.copy(M.viewport),At.copy(M.scissor),St=M.scissorTest}else nt.copy(vt).multiplyScalar(tt).floor(),At.copy(Ht).multiplyScalar(tt).floor(),St=Ze;if(X!==0&&(F=k),y.bindFramebuffer(L.FRAMEBUFFER,F)&&y.drawBuffers(M,F),y.viewport(nt),y.scissor(At),y.setScissorTest(St),z){let ft=H.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,ft.__webglTexture,X)}else if(dt){let ft=N;for(let yt=0;yt<M.textures.length;yt++){let Mt=H.get(M.textures[yt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+yt,Mt.__webglTexture,X,ft)}}else if(M!==null&&X!==0){let ft=H.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ft.__webglTexture,X)}V=-1};function D_(M){let N=H.get(M);return(N.__readFormat!==M.format||N.__readType!==M.type)&&(N.__readFormat=M.format,N.__readType=M.type,N.__formatReadable=C.textureFormatReadable(M.format),N.__typeReadable=C.textureTypeReadable(M.type)),N}this.readRenderTargetPixels=function(M,N,X,F,z,dt,_t,ft=0){if(!(M&&M.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt){y.bindFramebuffer(L.FRAMEBUFFER,yt);try{let Mt=M.textures[ft],Bt=Mt.format,Gt=Mt.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ft);let xt=D_(Mt);if(xt.__formatReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(xt.__typeReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-F&&X>=0&&X<=M.height-z&&L.readPixels(N,X,F,z,ct.convert(Bt),ct.convert(Gt),dt)}finally{let Mt=et!==null?H.get(et).__webglFramebuffer:null;y.bindFramebuffer(L.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(M,N,X,F,z,dt,_t,ft=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt)if(N>=0&&N<=M.width-F&&X>=0&&X<=M.height-z){y.bindFramebuffer(L.FRAMEBUFFER,yt);let Mt=M.textures[ft],Bt=Mt.format,Gt=Mt.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ft);let xt=D_(Mt);if(xt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(xt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,re),L.bufferData(L.PIXEL_PACK_BUFFER,dt.byteLength,L.STREAM_READ),L.readPixels(N,X,F,z,ct.convert(Bt),ct.convert(Gt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let Ge=et!==null?H.get(et).__webglFramebuffer:null;y.bindFramebuffer(L.FRAMEBUFFER,Ge);let we=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await sE(L,we,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,re),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,dt),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(re),L.deleteSync(we),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,X=0){let F=Math.pow(2,-X),z=Math.floor(M.image.width*F),dt=Math.floor(M.image.height*F),_t=N!==null?N.x:0,ft=N!==null?N.y:0;Y.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,_t,ft,z,dt),y.unbindTexture()},this.copyTextureToTexture=function(M,N,X=null,F=null,z=0,dt=0){let _t,ft,yt,Mt,Bt,Gt,xt,re,Ge,we=M.isCompressedTexture?M.mipmaps[dt]:M.image;if(X!==null)_t=X.max.x-X.min.x,ft=X.max.y-X.min.y,yt=X.isBox3?X.max.z-X.min.z:1,Mt=X.min.x,Bt=X.min.y,Gt=X.isBox3?X.min.z:0;else{let ze=Math.pow(2,-z);_t=Math.floor(we.width*ze),ft=Math.floor(we.height*ze),M.isDataArrayTexture?yt=we.depth:M.isData3DTexture?yt=Math.floor(we.depth*ze):yt=1,Mt=0,Bt=0,Gt=0}F!==null?(xt=F.x,re=F.y,Ge=F.z):(xt=0,re=0,Ge=0);let ve=ct.convert(N.format),bn=ct.convert(N.type),mt;N.isData3DTexture?(Y.setTexture3D(N,0),mt=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Y.setTexture2DArray(N,0),mt=L.TEXTURE_2D_ARRAY):(Y.setTexture2D(N,0),mt=L.TEXTURE_2D),y.activeTexture(L.TEXTURE0),y.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),y.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),y.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);let Un=y.getParameter(L.UNPACK_ROW_LENGTH),jt=y.getParameter(L.UNPACK_IMAGE_HEIGHT),yi=y.getParameter(L.UNPACK_SKIP_PIXELS),$i=y.getParameter(L.UNPACK_SKIP_ROWS),js=y.getParameter(L.UNPACK_SKIP_IMAGES);y.pixelStorei(L.UNPACK_ROW_LENGTH,we.width),y.pixelStorei(L.UNPACK_IMAGE_HEIGHT,we.height),y.pixelStorei(L.UNPACK_SKIP_PIXELS,Mt),y.pixelStorei(L.UNPACK_SKIP_ROWS,Bt),y.pixelStorei(L.UNPACK_SKIP_IMAGES,Gt);let Hr=M.isDataArrayTexture||M.isData3DTexture,me=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){let ze=H.get(M),$s=H.get(N),be=H.get(ze.__renderTarget),ta=H.get($s.__renderTarget);y.bindFramebuffer(L.READ_FRAMEBUFFER,be.__webglFramebuffer),y.bindFramebuffer(L.DRAW_FRAMEBUFFER,ta.__webglFramebuffer);for(let Vr=0;Vr<yt;Vr++)Hr&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,H.get(M).__webglTexture,z,Gt+Vr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,H.get(N).__webglTexture,dt,Ge+Vr)),L.blitFramebuffer(Mt,Bt,_t,ft,xt,re,_t,ft,L.DEPTH_BUFFER_BIT,L.NEAREST);y.bindFramebuffer(L.READ_FRAMEBUFFER,null),y.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||H.has(M)){let ze=H.get(M),$s=H.get(N);y.bindFramebuffer(L.READ_FRAMEBUFFER,O),y.bindFramebuffer(L.DRAW_FRAMEBUFFER,G);for(let be=0;be<yt;be++)Hr?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ze.__webglTexture,z,Gt+be):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ze.__webglTexture,z),me?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,$s.__webglTexture,dt,Ge+be):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,$s.__webglTexture,dt),z!==0?L.blitFramebuffer(Mt,Bt,_t,ft,xt,re,_t,ft,L.COLOR_BUFFER_BIT,L.NEAREST):me?L.copyTexSubImage3D(mt,dt,xt,re,Ge+be,Mt,Bt,_t,ft):L.copyTexSubImage2D(mt,dt,xt,re,Mt,Bt,_t,ft);y.bindFramebuffer(L.READ_FRAMEBUFFER,null),y.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else me?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(mt,dt,xt,re,Ge,_t,ft,yt,ve,bn,we.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(mt,dt,xt,re,Ge,_t,ft,yt,ve,we.data):L.texSubImage3D(mt,dt,xt,re,Ge,_t,ft,yt,ve,bn,we):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,dt,xt,re,_t,ft,ve,bn,we.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,dt,xt,re,we.width,we.height,ve,we.data):L.texSubImage2D(L.TEXTURE_2D,dt,xt,re,_t,ft,ve,bn,we);y.pixelStorei(L.UNPACK_ROW_LENGTH,Un),y.pixelStorei(L.UNPACK_IMAGE_HEIGHT,jt),y.pixelStorei(L.UNPACK_SKIP_PIXELS,yi),y.pixelStorei(L.UNPACK_SKIP_ROWS,$i),y.pixelStorei(L.UNPACK_SKIP_IMAGES,js),dt===0&&N.generateMipmaps&&L.generateMipmap(mt),y.unbindTexture()},this.initRenderTarget=function(M){H.get(M).__webglFramebuffer===void 0&&Y.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Y.setTextureCube(M,0):M.isData3DTexture?Y.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Y.setTexture2DArray(M,0):Y.setTexture2D(M,0),y.unbindTexture()},this.resetState=function(){K=0,W=0,et=null,y.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Zt._getUnpackColorSpace()}};var jn=Ln(tr(),1);var gl=["rest","build","active","settle"];function tn(e){return e>=1?1:e>0?e:0}var WU=e=>Number.isFinite(e)?e:0;function vl(e){return Object.freeze({time:Math.max(0,WU(e.time)),progress:tn(e.progress),isPlaying:e.isPlaying,bass:tn(e.bass),mid:tn(e.mid),high:tn(e.high),rmsEnergy:tn(e.rmsEnergy),onsetStrength:tn(e.onsetStrength),beatDetected:e.beatDetected,currentSceneState:gl.includes(e.currentSceneState)?e.currentSceneState:"rest",bassHit:tn(e.bassHit)})}var _l=vl({time:0,progress:0,isPlaying:!1,bass:0,mid:0,high:0,rmsEnergy:0,onsetStrength:0,beatDetected:!1,currentSceneState:"rest",bassHit:0});var Ki={lowHz:[20,150],punchHz:[60,150],midHz:[150,2e3],highHz:[2e3,1e4]};function Pr(e,t,n,i){let s=n/i,a=Math.max(1,Math.floor(e/s)),r=Math.max(a+1,Math.ceil(t/s));return[a,r]}function yl(e,t,n){let i=Math.min(n,e.length),s=0;for(let r=t;r<i;r++)s+=10**(e[r]/10);let a=Math.max(1,i-t);return 10*Math.log10(s/a+1e-12)}function du(e,t,n){return tn((e-t)/(n-t))}function en(e,t,n,i,s){let a=t>e?i:s,r=1-Math.exp(-n/Math.max(a,1e-4));return e+(t-e)*r}var fu=class{prev=null;history=[];lastOnsetAt=-1/0;historyLen;k;refractoryS;constructor(t=43,n=1.6,i=.12){this.historyLen=t,this.k=n,this.refractoryS=i}strength=0;push(t,n,i=1,s=t.length){if(!this.prev||this.prev.length!==t.length)return this.prev=t.slice(),!1;let a=0,r=Math.min(s,t.length);for(let o=i;o<r;o++){let l=t[o]-this.prev[o];l>0&&(a+=l)}return this.prev.set(t),this.pushFlux(a,n)}pushFlux(t,n){this.history.push(t),this.history.length>this.historyLen&&this.history.shift();let i=this.history.length,s=this.history.reduce((o,l)=>o+l,0)/i,a=this.history.reduce((o,l)=>o+(l-s)**2,0)/i,r=s+this.k*Math.sqrt(a);return this.strength=r>1e-9?tn(t/(2*r)):0,i>=8&&t>r&&t>1e-6&&n-this.lastOnsetAt>=this.refractoryS?(this.lastOnsetAt=n,!0):!1}};var qU=.08,YU=.4,ZU=.35,JU=.3,KU=.3,QU=.35,jU=.05,$U=.55,tL=.03,eL=3;function FE(){return{time:0,swell:0,glow:0,orbitSpeed:0,colour:0,shimmer:0,exposure:0,sceneLevel:0,motion:.25,phase:0,drift:0,flow:0,beam:0,pulse:0,pulseRing:0,lastPulseAt:-1/0,pulsesAccepted:0,pulsesRejected:0}}var ap=e=>Number.isFinite(e)?Math.min(1,Math.max(0,e)):0,Qa=(e,t,n,i)=>ap(en(e,ap(t),n,i,YU));function zE(e,t,n,i){let s=Number.isFinite(n)&&n>0?Math.min(n,jU):0;if(s===0)return e;e.time+=s;let a=i?ZU:qU;e.swell=Qa(e.swell,t.swell,s,a),e.glow=Qa(e.glow,t.glow,s,a),e.orbitSpeed=Qa(e.orbitSpeed,t.orbitSpeed,s,a),e.colour=Qa(e.colour,t.colour,s,a),e.shimmer=Qa(e.shimmer,t.shimmer,s,a),e.exposure=Qa(e.exposure,t.exposure,s,a),e.sceneLevel=Qa(e.sceneLevel,t.sceneLevel,s,a),e.motion=Qa(e.motion,t.motion,s,a),e.phase+=s*$U*e.orbitSpeed,e.drift+=s*tL*e.motion,e.flow+=s*e.motion,e.beam=Math.max(e.beam*Math.exp(-s/JU),ap(t.beam));let r=e.pulse*Math.exp(-s/KU),o=ap(t.pulse);return o>0&&e.time-e.lastPulseAt>=QU?(e.pulse=Math.max(r,o),e.lastPulseAt=e.time,e.pulsesAccepted++,e.pulseRing=e.pulsesAccepted%eL):(o>0&&e.pulsesRejected++,e.pulse=r),e}var nL=Object.freeze({rest:0,build:.6,active:1,settle:.35}),HE=.25,VE=.2,GE=.15,iL=.25,sL=.35,aL=.04,Es=e=>tn(e);function kE(e,t){let n=e.isPlaying===!0,i=Es(e.bass),s=Es(e.mid),a=Es(e.high),r=Es(e.rmsEnergy),o=!n||r<aL,l=(o?iL:1)*(t?sL:1),c=!o&&!t,f=gl.includes(e.currentSceneState)?e.currentSceneState:"rest";return{swell:i,glow:Es(HE+(1-HE)*i),orbitSpeed:Es((GE+(1-GE)*s)*l),colour:s,shimmer:Es(a*l),exposure:Es(VE+(1-VE)*r),beam:c?Es(e.bassHit):0,pulse:c&&e.beatDetected===!0?Es(e.onsetStrength):0,sceneLevel:nL[f],motion:l,calm:o}}var rp=`
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
`,op=`
vec3 coreRamp(float s) {
  return mix(vec3(0.34, 0.76, 1.00), vec3(0.64, 0.52, 1.00), s);
}
`,lp=`
varying vec2 vP;
void main() {
  vP = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,n_=`
varying vec3 vN;
varying vec3 vV;
varying vec3 vObj;
void main() {
  vObj = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,XE=`
precision highp float;
uniform float uGlow;
uniform float uExposure;
uniform float uColour;
uniform float uFlow;
varying vec3 vN;
varying vec3 vV;
varying vec3 vObj;
${rp}
${op}
void main() {
  float f = 1.0 - max(dot(normalize(vN), normalize(vV)), 0.0);
  float rim = pow(f, 2.6);
  vec2 q = vObj.xy * 2.2 + vec2(uFlow * 0.02, 0.0);
  float n = 0.6 * vnoise(q * 2.0) + 0.4 * vnoise(q * 5.0 + 3.1);
  float cloud = smoothstep(0.25, 1.0, n) * (1.0 - f);
  vec3 neb = mix(vec3(0.60, 0.22, 0.48), vec3(0.28, 0.36, 0.92), 0.5 * uColour);
  vec3 col = vec3(0.012, 0.030, 0.080)
           + neb * cloud * (0.10 + 0.45 * uExposure)
           + coreRamp(0.6 * uColour) * rim * (0.25 + 0.90 * uGlow) * (0.5 + 0.5 * uExposure);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`,WE=`
precision highp float;
uniform float uShimmer;
uniform float uExposure;
uniform float uColour;
uniform float uFlow;
varying vec3 vN;
varying vec3 vV;
varying vec3 vObj;
${rp}
${op}
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(vV);
  vec3 L = normalize(vec3(-0.45, 0.65, 0.60));
  float f = 1.0 - max(dot(n, v), 0.0);
  float rim = pow(f, 1.6);
  float key = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), v), 0.0), 28.0);
  float tw = 0.5 + 0.5 * sin(uFlow * 1.7 + vObj.x * 6.0 + vObj.y * 4.0);
  vec3 tint = coreRamp(0.6 * uColour);
  vec3 col = vec3(0.016, 0.034, 0.090)
           + tint * key * 0.20 * (0.6 + 0.4 * uExposure)
           + tint * rim * (0.40 + 0.30 * uShimmer * tw) * (0.55 + 0.60 * uExposure)
           + vec3(0.80, 0.90, 1.00) * spec * 0.35 * (0.5 + 0.5 * uExposure);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`,qE=`
precision highp float;
uniform float uRadius;
uniform float uGlow;
uniform float uExposure;
uniform float uColour;
uniform float uFlow;
varying vec2 vP;
${rp}
${op}
void main() {
  float d = length(vP);
  float R = uRadius;
  float ang = atan(vP.y, vP.x);
  float m = 0.55 + 0.45 * vnoise(vec2(cos(ang), sin(ang)) * 1.7 + vec2(uFlow * 0.1, 0.0));
  float bx = (d - R * 1.045) / (0.02 * R);
  float band = exp(-bx * bx) * m;
  float glow = exp(-max(d - R, 0.0) / (0.45 * R)) * 0.35;
  float atmos = exp(-d / 4.5) * 0.05 * (1.0 - smoothstep(5.0, 7.5, d));
  vec3 col = coreRamp(0.6 * uColour) * (band * (0.30 + 0.70 * uGlow) + glow * uGlow) * (0.5 + 0.5 * uExposure)
           + vec3(0.08, 0.14, 0.35) * atmos * (0.5 + uExposure);
  col *= smoothstep(R * 0.985, R, d);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`,YE=`
precision highp float;
uniform float uInner;
uniform float uOuter;
uniform float uHead;
uniform float uPulse;
uniform float uExposure;
uniform float uColour;
varying vec2 vP;
${op}
void main() {
  float r = length(vP);
  float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
  float prof = exp(-pow((t - 0.5) * 3.0, 2.0));
  float ang = atan(vP.y, vP.x);
  float head = pow(0.5 + 0.5 * cos(ang - uHead), 6.0);
  float tail = 0.35 * pow(0.5 + 0.5 * cos(ang - uHead - 3.14159), 3.0);
  float I = prof * (0.20 + 0.80 * head + tail) * (0.35 + 0.90 * uExposure) + prof * uPulse * 0.9;
  gl_FragColor = vec4(coreRamp(0.6 * uColour) * I, 1.0);
}
`,ZE=`
precision highp float;
uniform float uBeam;
uniform float uColour;
uniform float uFlow;
uniform float uCoreR;
varying vec2 vP;
${rp}
void main() {
  float ay = abs(vP.y);
  float x = vP.x;
  float streak = 0.7 + 0.3 * vnoise(vec2(x * 30.0, vP.y * 0.6 - uFlow * 0.4));
  float narrow = exp(-pow(x / 0.07, 2.0));
  float wide = exp(-pow(x / 0.22, 2.0)) * 0.25;
  float along = smoothstep(uCoreR * 0.9, uCoreR * 0.9 + 1.2, ay) * (1.0 - smoothstep(4.0, 9.5, ay));
  float I = (narrow * streak + wide) * along * uBeam;
  gl_FragColor = vec4(mix(vec3(0.60, 0.85, 1.00), vec3(0.80, 0.70, 1.00), 0.5 * uColour) * I, 1.0);
}
`,JE=`
attribute float aSeed;
attribute float aSide;
attribute vec3 aJit;
uniform float uFlow;
uniform float uBeam;
uniform float uSpeed;
uniform float uLength;
uniform float uCoreR;
uniform float uScale;
varying float vA;
void main() {
  float s = fract(aSeed + uFlow * uSpeed * (0.7 + 0.3 * aJit.z));
  vec3 pos = vec3(aJit.x * 0.08, aSide * (uCoreR + s * uLength), aJit.y * 0.08);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  vA = 0.35 * uBeam * (1.0 - s) * (1.0 - s) * smoothstep(0.0, 0.12, s) * (0.4 + 0.6 * (1.0 - length(aJit.xy)));
  gl_PointSize = (0.8 + 1.2 * (1.0 - s)) * uScale / -mv.z;
}
`,KE=`
precision highp float;
varying float vA;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - 4.0 * dot(c, c);
  if (a <= 0.0) discard;
  gl_FragColor = vec4(vec3(0.70, 0.88, 1.0) * a * vA, 1.0);
}
`,QE=`
attribute float aMag;
attribute float aTint;
uniform float uFlow;
uniform float uTwinkle;
uniform float uScale;
uniform float uExposure;
varying float vB;
varying float vTint;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 1.0 + uTwinkle * 0.25 * sin(uFlow * (0.6 + 1.7 * aMag) + aMag * 40.0);
  vB = (0.25 + 0.75 * aMag) * tw * (0.7 + 0.3 * uExposure);
  vTint = aTint;
  gl_PointSize = (0.8 + 1.6 * aMag) * uScale;
}
`,jE=`
precision highp float;
varying float vB;
varying float vTint;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - 4.0 * dot(c, c);
  if (a <= 0.0) discard;
  vec3 col = mix(vec3(0.70, 0.82, 1.0), vec3(1.0, 0.95, 0.88), 0.5 * vTint);
  gl_FragColor = vec4(col * vB * a * 0.6, 1.0);
}
`;var hp={created:0,disposed:0},pu=1.5,xl=[3.4,4.7,6],$E=[[.35,.25],[-.5,-.4],[.9,.1]],tT=[1,.7,.5],eT=[2,3,3],nT=[.26,.34,.22,.4,.28,.3,.36,.24],cp=.09,iT=1e3,up=1500,sT=36,aT=14,rL=1.5,oL=.35,lL=7.4;function cL(e){let t=e>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}var fp=class{scene=new Hc;camera=new Cn(sT,16/9,.1,400);rings=[];geometries=[];materials=[];core;halo;strip;orbs=[];ringUniforms=[];coreUniforms;orbUniforms;haloUniforms;stripUniforms;beamUniforms;starUniforms;fitDistance=aT;disposed=!1;constructor(){let t=cL(20261014),n=this.own(new Rn),i=new Float32Array(up*3),s=new Float32Array(up),a=new Float32Array(up);for(let m=0;m<up;m++){let h=t()*2-1,v=t()*Math.PI*2,S=80+t()*40,_=Math.sqrt(1-h*h);i[m*3]=S*_*Math.cos(v),i[m*3+1]=S*h,i[m*3+2]=S*_*Math.sin(v),s[m]=Math.pow(t(),3),a[m]=t()}n.setAttribute("position",new Ye(i,3)),n.setAttribute("aMag",new Ye(s,1)),n.setAttribute("aTint",new Ye(a,1)),this.starUniforms={uFlow:{value:0},uTwinkle:{value:0},uScale:{value:1},uExposure:{value:0}};let r=new al(n,this.ownMat(this.additive(QE,jE,this.starUniforms,!0)));r.renderOrder=-1,r.frustumCulled=!1,this.scene.add(r),this.coreUniforms={uGlow:{value:0},uExposure:{value:0},uColour:{value:0},uFlow:{value:0}},this.core=new hn(this.own(new ol(pu,64,32)),this.ownMat(this.opaque(n_,XE,this.coreUniforms))),this.core.renderOrder=0,this.scene.add(this.core),this.orbUniforms={uShimmer:{value:0},uExposure:{value:0},uColour:{value:0},uFlow:{value:0}};let o=this.own(new ol(1,24,16)),l=this.ownMat(this.opaque(n_,WE,this.orbUniforms)),c=0;for(let m=0;m<xl.length;m++){let h=xl[m],v=new Zs;v.rotation.set($E[m][0],0,$E[m][1]);let S={uInner:{value:h-cp/2},uOuter:{value:h+cp/2},uHead:{value:0},uPulse:{value:0},uExposure:{value:0},uColour:{value:0}};this.ringUniforms.push(S);let _=new hn(this.own(new Zc(h-cp/2,h+cp/2,192,1)),this.ownMat(this.additive(lp,YE,S,!0)));_.rotation.x=-Math.PI/2,_.renderOrder=1,v.add(_);for(let E=0;E<eT[m];E++){let T=new hn(o,l);T.scale.setScalar(nT[c%nT.length]),T.renderOrder=1,v.add(T),this.orbs.push({mesh:T,ring:m,base:E/eT[m]*Math.PI*2+m*1.3}),c++}this.rings.push(v),this.scene.add(v)}this.stripUniforms={uBeam:{value:0},uColour:{value:0},uFlow:{value:0},uCoreR:{value:pu}},this.strip=new hn(this.own(new Ga(1,20)),this.ownMat(this.additive(lp,ZE,this.stripUniforms,!0))),this.strip.renderOrder=2,this.strip.frustumCulled=!1,this.scene.add(this.strip);let f=iT*2,p=this.own(new Rn),u=new Float32Array(f),d=new Float32Array(f),g=new Float32Array(f*3);for(let m=0;m<f;m++){u[m]=t(),d[m]=m<iT?1:-1;let h=t()*Math.PI*2,v=Math.sqrt(t());g[m*3]=Math.cos(h)*v,g[m*3+1]=Math.sin(h)*v,g[m*3+2]=t()}p.setAttribute("position",new Ye(new Float32Array(f*3),3)),p.setAttribute("aSeed",new Ye(u,1)),p.setAttribute("aSide",new Ye(d,1)),p.setAttribute("aJit",new Ye(g,3)),this.beamUniforms={uFlow:{value:0},uBeam:{value:0},uSpeed:{value:.16},uLength:{value:8},uCoreR:{value:pu},uScale:{value:1}};let b=new al(p,this.ownMat(this.additive(JE,KE,this.beamUniforms,!0)));b.renderOrder=2,b.frustumCulled=!1,this.scene.add(b),this.haloUniforms={uRadius:{value:pu},uGlow:{value:0},uExposure:{value:0},uColour:{value:0},uFlow:{value:0}},this.halo=new hn(this.own(new Ga(16,16)),this.ownMat(this.additive(lp,qE,this.haloUniforms,!1))),this.halo.renderOrder=3,this.scene.add(this.halo),hp.created++}get resourceCounts(){return{geometries:this.geometries.length,materials:this.materials.length}}get distance(){return this.fitDistance}setViewport(t,n,i){if(t<1||n<1)return;let s=t/n;this.camera.aspect=s,this.camera.updateProjectionMatrix();let a=Math.tan(sT*Math.PI/360);this.fitDistance=Math.max(aT,lL/(a*s)),this.beamUniforms.uScale.value=n*i*.06,this.starUniforms.uScale.value=i}update(t,n){if(this.disposed)return;let i=t.drift+n.azimuth,s=Math.min(1.2,Math.max(0,oL+n.elevation)),a=this.fitDistance-rL*t.sceneLevel,r=Math.cos(s);this.camera.position.set(a*r*Math.sin(i),a*Math.sin(s),a*r*Math.cos(i)),this.camera.lookAt(0,0,0);let o=1+.04*t.swell;this.core.scale.setScalar(o),this.halo.quaternion.copy(this.camera.quaternion),this.strip.rotation.y=Math.atan2(this.camera.position.x,this.camera.position.z);for(let b=0;b<this.ringUniforms.length;b++){let m=this.ringUniforms[b];m.uHead.value=t.phase*tT[b],m.uPulse.value=b===t.pulseRing?t.pulse:0,m.uExposure.value=t.exposure,m.uColour.value=t.colour}for(let b=0;b<this.orbs.length;b++){let m=this.orbs[b],h=m.base+t.phase*tT[m.ring],v=xl[m.ring];m.mesh.position.set(v*Math.cos(h),0,-v*Math.sin(h))}let l=this.coreUniforms;l.uGlow.value=t.glow,l.uExposure.value=t.exposure,l.uColour.value=t.colour,l.uFlow.value=t.flow;let c=this.orbUniforms;c.uShimmer.value=t.shimmer,c.uExposure.value=t.exposure,c.uColour.value=t.colour,c.uFlow.value=t.flow;let f=this.haloUniforms;f.uRadius.value=pu*o,f.uGlow.value=t.glow,f.uExposure.value=t.exposure,f.uColour.value=t.colour,f.uFlow.value=t.flow;let p=Math.min(1,.7*t.beam+.08*t.exposure),u=this.stripUniforms;u.uBeam.value=p,u.uColour.value=t.colour,u.uFlow.value=t.flow;let d=this.beamUniforms;d.uBeam.value=p,d.uFlow.value=t.flow;let g=this.starUniforms;g.uFlow.value=t.flow,g.uTwinkle.value=t.shimmer,g.uExposure.value=t.exposure}releaseGpu(){if(!this.disposed){for(let t of this.geometries)t.dispose();for(let t of this.materials)t.dispose()}}dispose(){if(!this.disposed){this.disposed=!0;for(let t of this.geometries)t.dispose();for(let t of this.materials)t.dispose();this.scene.clear(),this.rings.length=0,hp.disposed++}}own(t){return this.geometries.push(t),t}ownMat(t){return this.materials.push(t),t}additive(t,n,i,s){return new Nn({vertexShader:t,fragmentShader:n,uniforms:i,transparent:!0,blending:$c,depthWrite:!1,depthTest:s,side:Di})}opaque(t,n,i){return new Nn({vertexShader:t,fragmentShader:n,uniforms:i})}};var rT=Object.freeze({disposed:!1,unsupported:!1,lost:!1,hidden:!1,inactive:!1});function i_(e,t){if(e.disposed)return e;switch(t.type){case"disposed":return Object.freeze({...e,disposed:!0});case"unsupported":return Object.freeze({...e,unsupported:!0});case"lost":return Object.freeze({...e,lost:!0});case"restored":return e.lost?Object.freeze({...e,lost:!1}):e;case"hidden":return e.hidden===t.value?e:Object.freeze({...e,hidden:t.value});case"active":return e.inactive===!t.value?e:Object.freeze({...e,inactive:!t.value})}}function oT(e){return!e.disposed&&!e.unsupported&&!e.lost&&!e.hidden&&!e.inactive}function mu(e){return e.disposed?"disposed":e.unsupported?"unsupported":e.lost?"lost":e.hidden?"hidden":e.inactive?"inactive":"ready"}function lT(e,t=1.5){return!Number.isFinite(e)||e<=0?1:Math.min(t,Math.max(.5,e))}var dp={created:0,disposed:0},pp=class{renderer=null;state=rT;reduced=!1;frames=0;cssWidth=0;cssHeight=0;pixelRatio=1;dprSeen=0;canvas;opts;resizeObserver=null;motionQuery=null;onWindowResize=()=>this.fit();onVisibility=()=>this.dispatch({type:"hidden",value:document.hidden});onMotionChange=t=>{this.reduced=t.matches};onContextLost=t=>{t.preventDefault(),this.dispatch({type:"lost"})};onContextRestored=()=>{this.dispatch({type:"restored"}),this.fit(),this.opts.onRestored?.()};constructor(t){this.opts=t,this.canvas=t.canvas,this.canvas.style.width="100%",this.canvas.style.height="100%",this.motionQuery=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,this.reduced=this.motionQuery?.matches??!1;try{this.renderer=new np({canvas:this.canvas,antialias:!1,alpha:!1,powerPreference:"high-performance"})}catch{this.renderer=null,this.state=i_(this.state,{type:"unsupported"}),this.opts.onStatus?.(mu(this.state));return}dp.created++,this.canvas.addEventListener("webglcontextlost",this.onContextLost),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored),document.addEventListener("visibilitychange",this.onVisibility),window.addEventListener("resize",this.onWindowResize),this.motionQuery?.addEventListener("change",this.onMotionChange),this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.fit()):null,this.resizeObserver?.observe(this.canvas),document.hidden&&this.dispatch({type:"hidden",value:!0}),this.fit()}get status(){return mu(this.state)}get reducedMotion(){return this.reduced}get frameCount(){return this.frames}get three(){return this.renderer}get pixelRatioInUse(){return this.pixelRatio}setActive(t){this.dispatch({type:"active",value:t})}render(t,n){return!this.renderer||!oT(this.state)?!1:((window.devicePixelRatio||1)!==this.dprSeen&&this.fit(),this.renderer.render(t,n),this.frames++,!0)}dispose(){this.state.disposed||(this.dispatch({type:"disposed"}),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.canvas.removeEventListener("webglcontextlost",this.onContextLost),this.canvas.removeEventListener("webglcontextrestored",this.onContextRestored),document.removeEventListener("visibilitychange",this.onVisibility),window.removeEventListener("resize",this.onWindowResize),this.motionQuery?.removeEventListener("change",this.onMotionChange),this.motionQuery=null,this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null,dp.disposed++))}dispatch(t){let n=mu(this.state);this.state=i_(this.state,t);let i=mu(this.state);i!==n&&this.opts.onStatus?.(i)}fit(){if(!this.renderer||this.state.disposed)return;let t=this.canvas.getBoundingClientRect();if(t.width<1||t.height<1)return;this.dprSeen=window.devicePixelRatio||1;let n=lT(this.dprSeen,this.opts.maxPixelRatio??1.5);t.width===this.cssWidth&&t.height===this.cssHeight&&n===this.pixelRatio||(this.cssWidth=t.width,this.cssHeight=t.height,this.pixelRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(t.width,t.height,!1))}};var Hn=Ln(tr(),1);var uT={request:e=>requestAnimationFrame(e),cancel:e=>cancelAnimationFrame(e)},cT=Object.freeze({source:null,isPlaying:!1,duration:null,scene:"rest",latencyMs:0,error:null}),Br=class{constructor(t=uT){this.scheduler=t}scheduler;src=null;unsubStatus=null;current=_l;state=cT;frameCbs=new Set;stateCbs=new Set;handle=null;nudgeMs=0;get frame(){return this.current}get source(){return this.src}setSource(t){t!==this.src&&(this.unsubStatus?.(),this.unsubStatus=null,this.src?.dispose(),this.src=t,this.current=_l,t&&(t.setSyncNudge?.(this.nudgeMs),this.unsubStatus=t.onStatus(()=>this.refreshStatus())),this.setState(this.derive(_l)))}async play(){let t=this.src;if(t){try{await t.play()}catch{t===this.src&&this.setState({...this.state,error:t.status().error??"Playback could not start. Press play again."});return}t===this.src&&this.refreshStatus()}}pause(){this.src?.pause()}async toggle(){this.src?.status().playing?this.pause():await this.play()}seek(t){this.src?.seek(t)}setSyncNudge(t){this.nudgeMs=t,this.src?.setSyncNudge?.(t)}onFrame(t){return this.frameCbs.add(t),()=>this.frameCbs.delete(t)}start(){if(this.handle!==null)return;let t=n=>{this.tick(n),this.handle=this.scheduler.request(t)};this.handle=this.scheduler.request(t)}stop(){this.handle!==null&&this.scheduler.cancel(this.handle),this.handle=null}tick(t){let n=_l;if(this.src)try{n=this.src.sample(t/1e3)}catch(s){this.setState({...this.state,error:s instanceof Error?s.message:"The audio source failed."}),n=_l}this.current=n;let i=this.derive(n);(i.isPlaying!==this.state.isPlaying||i.scene!==this.state.scene||i.latencyMs!==this.state.latencyMs)&&this.setState({...this.state,isPlaying:i.isPlaying,scene:i.scene,latencyMs:i.latencyMs});for(let s of[...this.frameCbs])s(n)}getState=()=>this.state;subscribe=t=>(this.stateCbs.add(t),()=>this.stateCbs.delete(t));refreshStatus(){let t=this.src;if(!t)return;let n=t.status();(n.playing!==this.state.isPlaying||n.duration!==this.state.duration||n.error!==this.state.error)&&this.setState({...this.state,isPlaying:n.playing,duration:n.duration,error:n.error})}derive(t){let n=this.src;if(!n)return cT;let i=n.status();return Object.freeze({source:Object.freeze({id:n.id,kind:n.kind,label:n.label,canSeek:n.canSeek}),isPlaying:t.isPlaying,duration:i.duration,scene:t.currentSceneState,latencyMs:n.latencyMs,error:i.error})}setState(t){this.state=Object.freeze({...t});for(let n of[...this.stateCbs])n()}};var vT=Ln(Qi(),1),pT=(0,Hn.createContext)(null);function mT({children:e,pipeline:t}){let[n]=(0,Hn.useState)(()=>t??new Br);return(0,Hn.useEffect)(()=>(n.start(),()=>{n.stop(),n.setSource(null)}),[n]),(0,vT.jsx)(pT.Provider,{value:n,children:e})}function Sl(){let e=(0,Hn.useContext)(pT);if(!e)throw new Error("useAudioPipeline must be used inside <AudioPipelineProvider>");return e}function gp(e,t=[]){let n=Sl(),i=(0,Hn.useRef)(e);i.current=e,(0,Hn.useEffect)(()=>(i.current(n.frame),n.onFrame(s=>i.current(s))),[n,...t])}function s_(){let e=Sl();return(0,Hn.useSyncExternalStore)(e.subscribe,e.getState,e.getState)}function gT(){let e=Sl();return(0,Hn.useSyncExternalStore)(e.subscribe,()=>e.getState().scene,()=>e.getState().scene)}var bl=Ln(Qi(),1),vp=1200,_T=132108;function a_({className:e="",debugRef:t}){let n=(0,jn.useRef)(null),i=(0,jn.useRef)(null),s=(0,jn.useRef)(null),[a]=(0,jn.useState)(FE),r=(0,jn.useRef)({azimuth:0,elevation:0}),o=(0,jn.useRef)(null),l=(0,jn.useRef)({w:0,h:0,pr:0}),[c]=(0,jn.useState)(()=>({last:0,intervals:new Float64Array(vp),cpu:new Float64Array(vp),frames:0})),f=(0,jn.useRef)(null),[p,u]=(0,jn.useState)("ready");(0,jn.useEffect)(()=>{let m=n.current;if(!m)return;let h=new pp({canvas:m,onStatus:S=>{u(S),S==="lost"&&s.current?.releaseGpu()},onRestored:()=>i.current?.three?.setClearColor(_T,1)});h.three?.setClearColor(_T,1);let v=new fp;return i.current=h,s.current=v,l.current={w:0,h:0,pr:0},c.last=0,u(h.status),f.current={host:h,scene:v,anim:a,lastParams:null,intervals:c.intervals,cpu:c.cpu,frames:0},t&&(t.current=f.current),()=>{i.current=null,s.current=null,f.current=null,t&&(t.current=null),v.dispose(),h.dispose()}},[a,t,c]),gp(m=>{let h=i.current,v=s.current,S=n.current;if(!h||!v||!S)return;let _=performance.now(),E=c.last?(_-c.last)/1e3:1/60;c.last&&(c.intervals[c.frames%vp]=_-c.last),c.last=_;let T=h.reducedMotion,w=kE(m,T);zE(a,w,E,T);let x=S.clientWidth,A=S.clientHeight,R=h.pixelRatioInUse,U=l.current;(x!==U.w||A!==U.h||R!==U.pr)&&(v.setViewport(x,A,R),U.w=x,U.h=A,U.pr=R),v.update(a,r.current),h.render(v.scene,v.camera),c.cpu[c.frames%vp]=performance.now()-_,c.frames++;let B=f.current;B&&(B.lastParams=w,B.frames=c.frames)});let d=m=>{m.currentTarget.setPointerCapture(m.pointerId),o.current={x:m.clientX,y:m.clientY,az:r.current.azimuth,el:r.current.elevation}},g=m=>{let h=o.current;h&&(r.current.azimuth=h.az-(m.clientX-h.x)*.006,r.current.elevation=Math.min(.85,Math.max(-.35,h.el+(m.clientY-h.y)*.004)))},b=m=>{o.current=null,m.currentTarget.hasPointerCapture(m.pointerId)&&m.currentTarget.releasePointerCapture(m.pointerId)};return(0,bl.jsxs)("div",{"data-gl-status":p,className:e,style:{position:"relative",width:"100%",height:"100%"},children:[(0,bl.jsx)("canvas",{ref:n,role:"img","aria-label":"Constellation Core: a glowing core with orbit rings and orbs, driven by the audio. Bass swells and brightens the core, mids speed the orbits, bass hits surge the vertical beam and detected onsets light the rings in turn. Drag to orbit.",style:{position:"absolute",inset:0,touchAction:"none",cursor:"grab"},onPointerDown:d,onPointerMove:g,onPointerUp:b,onPointerCancel:b}),p==="lost"&&(0,bl.jsx)("p",{role:"status",className:"pointer-events-none absolute inset-x-0 bottom-0 p-4 text-center text-xs text-slate-400",children:"The graphics context was lost. The scene resumes when the browser restores it."}),p==="unsupported"&&(0,bl.jsx)("p",{role:"alert",className:"relative p-6 text-sm text-slate-300",children:"WebGL is not available in this browser, so Constellation Core cannot be drawn. The other Motion Lab visuals do not need it."})]})}var ti=Ln(tr(),1);var _p=class{cbs=new Set;on(t){return this.cbs.add(t),()=>this.cbs.delete(t)}emit(){for(let t of[...this.cbs])t()}},Ml=class{constructor(t,n){this.duration=t;this.now=n;this.canSeek=t!==null}duration;now;canSeek;error=null;em=new _p;base=0;startedMs=0;isPlaying=!1;position(){let t=this.isPlaying?this.base+(this.now()-this.startedMs)/1e3:this.base;return this.duration===null?t:Math.min(t,this.duration)}settle(){this.isPlaying&&this.duration!==null&&this.position()>=this.duration&&(this.base=this.duration,this.isPlaying=!1,this.em.emit())}get time(){return this.settle(),this.position()}get playing(){return this.settle(),this.isPlaying}async play(){this.isPlaying||(this.duration!==null&&this.base>=this.duration&&(this.base=0),this.startedMs=this.now(),this.isPlaying=!0,this.em.emit())}pause(){this.isPlaying&&(this.base=this.position(),this.isPlaying=!1,this.em.emit())}seek(t){this.canSeek&&(this.base=Math.min(Math.max(t,0),this.duration??t),this.startedMs=this.now(),this.em.emit())}onChange(t){return this.em.on(t)}dispose(){this.isPlaying=!1}},El=class{element;canSeek=!0;error=null;em=new _p;detach=[];constructor(t){this.element=new Audio,this.element.preload="auto",this.element.src=t;let n=(i,s)=>{this.element.addEventListener(i,s),this.detach.push(()=>this.element.removeEventListener(i,s))};n("loadedmetadata",()=>this.em.emit()),n("play",()=>this.em.emit()),n("pause",()=>this.em.emit()),n("ended",()=>this.em.emit()),n("error",()=>{this.error="This audio could not be loaded or decoded. Try an MP3, M4A, WAV or OGG.",this.em.emit()})}get time(){return this.element.currentTime}get duration(){return Number.isFinite(this.element.duration)?this.element.duration:null}get playing(){return!this.element.paused&&!this.element.ended}async play(){await this.element.play()}pause(){this.element.pause()}seek(t){let n=this.duration;this.element.currentTime=Math.min(Math.max(t,0),n??t)}onChange(t){return this.em.on(t)}dispose(){this.element.pause();for(let t of this.detach)t();this.element.removeAttribute("src"),this.element.load()}};var yp=class{maxS;times=[];values=[];constructor(t){this.maxS=t}push(t,n){for(this.times.push(t),this.values.push(n);this.times.length>1&&t-this.times[0]>this.maxS;)this.times.shift(),this.values.shift()}at(t){let n=this.times.length;if(n===0)return;if(t<=this.times[0])return this.values[0];let i=0,s=n-1;for(;i<s;){let a=i+s+1>>1;this.times[a]<=t?i=a:s=a-1}return this.values[i]}};var dL={springHz:4,damping:.6,kickSpan:.15,sustainWeight:.2,sustainRelease:.5,kickTau:.15,floorAttack:3,combine:"max"},yT=15,pL=.5,mL=1/240,gu=class{opts;hi=-40;lo=-70;sustain=0;x=0;v=0;kickEnv=0;elapsed=0;constructor(t={}){this.opts={...dL,...t}}push(t,n,i){let s=Math.min(.1,Math.max(.001,i));this.elapsed+=s,this.hi=en(this.hi,t,s,.05,12),this.lo=en(this.lo,t,s,this.opts.floorAttack,.3),this.lo>this.hi-yT&&(this.lo=this.hi-yT);let a=this.hi-this.lo,r=tn((t-this.lo)/a);this.sustain=en(this.sustain,r,s,.12,this.opts.sustainRelease);let o=Math.max(0,r-this.sustain),l=this.elapsed<pL?0:tn(o/this.opts.kickSpan);this.kickEnv=Math.max(l,this.kickEnv*Math.exp(-s/this.opts.kickTau));let c=2*Math.PI*this.opts.springHz,f=2*this.opts.damping*c,p=Math.max(1,Math.ceil(s/mL)),u=s/p;for(let m=0;m<p;m++){let h=c*c*(this.sustain-this.x)-f*this.v;this.v+=h*u,this.x+=this.v*u}let d=this.opts.sustainWeight,g=d*this.x;return{pull:tn(this.opts.combine==="max"?Math.max(g,this.kickEnv):g+(1-d)*this.kickEnv),kick:this.kickEnv,sustain:this.sustain,level:r}}relax(t){let n=Math.min(.1,Math.max(.001,t));return this.kickEnv*=Math.exp(-n/this.opts.kickTau),this.sustain=en(this.sustain,0,n,.12,this.opts.sustainRelease),this.x=en(this.x,0,n,.05,.3),this.v=0,{pull:tn(Math.max(this.opts.sustainWeight*this.x,this.kickEnv)),kick:this.kickEnv,sustain:this.sustain,level:0}}};var Tl=class{bass=0;mid=0;high=0;level=0;onsets=new fu;shaper=new gu;hit=0;reset(){this.bass=this.mid=this.high=this.level=this.hit=0,this.onsets=new fu,this.shaper=new gu}push(t,n,i){let s=this.shaper.push(t.punchDb,n,i);this.hit=s.kick,this.bass=en(this.bass,du(t.lowDb,-85,-25),i,.02,.18),this.mid=en(this.mid,du(t.midDb,-85,-25),i,.03,.22),this.high=en(this.high,du(t.highDb,-85,-25),i,.01,.12),this.level=en(this.level,du(t.allDb,-85,-25),i,.03,.25);let a=this.onsets.pushFlux(t.flux,n);return this.out(a,this.onsets.strength)}decay(t){return this.bass=en(this.bass,0,t,.02,.4),this.mid=en(this.mid,0,t,.02,.4),this.high=en(this.high,0,t,.02,.4),this.level=en(this.level,0,t,.02,.4),this.hit=this.shaper.relax(t).kick,this.out(!1,0)}out(t,n){return{bass:this.bass,mid:this.mid,high:this.high,rmsEnergy:this.level,onsetStrength:tn(n),beatDetected:t,bassHit:this.hit}}};var gL={restEnter:.1,restExit:.16,activeEnter:.42,activeExit:.3,minDwellS:1.5,slopeWindowS:1.5,settleSlope:-.08},bp=class{state="rest";o;energy=0;dwell=0;hist=[];clock=0;constructor(t={}){this.o={...gL,...t}}reset(){this.state="rest",this.energy=0,this.dwell=0,this.hist=[],this.clock=0}push(t,n){for(this.clock+=n,this.dwell+=n,this.energy=en(this.energy,t,n,.8,1.5),this.hist.push([this.clock,this.energy]);this.hist.length>1&&this.clock-this.hist[0][0]>this.o.slopeWindowS*1.5;)this.hist.shift();let i=this.slope(),s=this.energy,a=this.o,r=this.state;if(this.dwell>=a.minDwellS)switch(this.state){case"rest":s>a.restExit&&(r="build");break;case"build":s<a.restEnter?r="rest":s>a.activeEnter&&(r="active");break;case"active":(s<a.activeExit||i<a.settleSlope)&&(r="settle");break;case"settle":s<a.restEnter?r="rest":s>a.activeEnter&&i>=0?r="active":i>.04&&s>a.restExit&&(r="build");break}return r!==this.state&&(this.state=r,this.dwell=0),this.state}slope(){let t=this.clock-this.o.slopeWindowS;if(this.hist[0][0]>t)return 0;let n=this.hist[0];for(let i of this.hist)if(i[0]<=t)n=i;else break;return(this.energy-n[1])/Math.max(.001,this.clock-n[0])}};var xT=.6,Fr=class{constructor(t,n){this.backend=n;this.id=t.id,this.kind=t.kind,this.label=t.label}backend;id;kind;label;computer=new Tl;tracker=new bp;delay=new yp(xT+.4);lastNow=-1;nudgeMs=0;get canSeek(){return this.backend.playhead.canSeek}get latencyMs(){return Math.round(this.backend.latencyS*1e3)}sample(t){let n=this.backend.playhead,i=this.lastNow<0?1/60:Math.min(.1,Math.max(.001,t-this.lastNow));this.lastNow=t;let s=n.playing,a=n.time,r=n.duration,o=s?this.computer.push(this.backend.read(),t,i):this.computer.decay(i);s&&this.tracker.push(o.rmsEnergy,i);let l=vl({time:a,progress:r?a/r:0,isPlaying:s,...o,currentSceneState:this.tracker.state});this.delay.push(t,l);let c=Math.min(xT,Math.max(0,this.backend.latencyS+this.nudgeMs/1e3)),f=c>0?this.delay.at(t-c):l;return!f||f===l?l:vl({...f,time:a,progress:l.progress,isPlaying:s})}async play(){await this.backend.playhead.play()}pause(){this.backend.playhead.pause()}seek(t){this.backend.playhead.seek(t)}status(){let t=this.backend.playhead;return{playing:t.playing,duration:t.duration,error:t.error}}onStatus(t){return this.backend.playhead.onChange(t)}setSyncNudge(t){this.nudgeMs=Math.max(-200,Math.min(400,t))}dispose(){this.backend.dispose()}};function vL(e,t){let n=e*t/60,i=n-Math.floor(n),s=Math.exp(-i*9),a=i>.5?Math.exp(-(i-.5)*22):0,r=-75+40*s,o=-72+38*s,l=-52+5*Math.sin(2*Math.PI*e/8),c=-68+25*a,f=d=>10**(d/10),p=10*Math.log10(f(o)+f(l)+f(c)),u=.002+.05*Math.exp(-i*30);return{lowDb:o,punchDb:r,midDb:l,highDb:c,allDb:p,flux:u}}var r_=class{constructor(t,n){this.playhead=t;this.bpm=n}playhead;bpm;latencyS=0;read(){return vL(this.playhead.time,this.bpm)}dispose(){this.playhead.dispose()}};function vu(e,t=120){let n=new r_(new Ml(null,e),t);return new Fr({id:"demo",kind:"synthetic",label:`Demo, ${t} BPM synthetic`},n)}var Mp="motion-web/1";var ST=["reactive","anticipatory","continuous"];var xu=class extends Error{path;constructor(t,n){super(`${t}: ${n}`),this.name="ParseError",this.path=t}},se=(e,t)=>{throw new xu(e,t)},$n=(e,t)=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:se(t,"expected an object"),zr=(e,t)=>Array.isArray(e)?e:se(t,"expected an array"),Ue=(e,t)=>typeof e=="string"&&e.length>0?e:se(t,"expected a non-empty string"),As=(e,t)=>typeof e=="number"&&Number.isFinite(e)?e:se(t,"expected a finite number"),yu=(e,t)=>{let n=As(e,t);return n>0?n:se(t,"expected a positive number")},l_=(e,t)=>{let n=As(e,t);return Number.isInteger(n)&&n>=0?n:se(t,"expected a non-negative integer")},o_=(e,t)=>e===null?null:As(e,t),_u=(e,t,n)=>{let i=Ue(e,n);return t.includes(i)?i:se(n,`expected one of ${t.join(", ")}`)},bT=(e,t)=>e===Mp?Mp:se(t,`unsupported format ${JSON.stringify(e)}; this UI reads ${Mp}`),Ts=1e-6,Ep={fail:se,rec:$n,arr:zr,str:Ue,num:As,posNum:yu,nonNegInt:l_,oneOf:_u};function MT(e){let t=$n(e,"manifest"),n=zr(t.songs,"manifest.songs").map((s,a)=>{let r=`manifest.songs[${a}]`,o=$n(s,r),l=o.audio===null?null:$n(o.audio,`${r}.audio`),c=o.features===void 0||o.features===null?null:$n(o.features,`${r}.features`),f=zr(o.profiles,`${r}.profiles`).map((p,u)=>{let d=`${r}.profiles[${u}]`,g=$n(p,d);return{id:Ue(g.id,`${d}.id`),label:Ue(g.label,`${d}.label`),timeline:Ue(g.timeline,`${d}.timeline`),curves:Ue(g.curves,`${d}.curves`)}});return f.length===0&&se(`${r}.profiles`,"a song needs at least one profile"),{id:Ue(o.id,`${r}.id`),title:Ue(o.title,`${r}.title`),durationS:yu(o.durationS,`${r}.durationS`),audio:l&&{src:Ue(l.src,`${r}.audio.src`),rights:typeof l.rights=="string"?l.rights:""},features:c&&{meta:Ue(c.meta,`${r}.features.meta`),bin:Ue(c.bin,`${r}.features.bin`)},profiles:f}});n.length===0&&se("manifest.songs","no songs");let i=n.map(s=>s.id);return new Set(i).size!==i.length&&se("manifest.songs","song ids must be unique"),{format:bT(t.format,"manifest.format"),songs:n}}function ET(e){let t=$n(e,"timeline"),n=yu(t.durationS,"timeline.durationS"),i=yu(t.rateHz,"timeline.rateHz"),s=l_(t.nSamples,"timeline.nSamples");s<2&&se("timeline.nSamples","need at least 2 samples");let a=zr(t.tracks,"timeline.tracks").map((p,u)=>{let d=`timeline.tracks[${u}]`,g=$n(p,d),b=zr(g.properties,`${d}.properties`).map((m,h)=>{let v=`${d}.properties[${h}]`,S=$n(m,v);return{name:Ue(S.name,`${v}.name`),combine:_u(S.combine,["add","max","priority","exclusive"],`${v}.combine`),max:yu(S.max,`${v}.max`)}});return b.length===0&&se(`${d}.properties`,"a track needs at least one property"),{name:Ue(g.name,`${d}.name`),properties:b}});a.length===0&&se("timeline.tracks","no tracks");let r=new Set(a.flatMap(p=>p.properties.map(u=>`${p.name}.${u.name}`)));r.size!==a.reduce((p,u)=>p+u.properties.length,0)&&se("timeline.tracks","track.property names must be unique");let o=zr(t.states,"timeline.states").map((p,u)=>{let d=`timeline.states[${u}]`,g=$n(p,d),b={id:Ue(g.id,`${d}.id`),state:_u(g.state,gl,`${d}.state`),start:As(g.start,`${d}.start`),end:As(g.end,`${d}.end`)};return b.end<b.start&&se(d,"ends before it starts"),b});o.length===0&&se("timeline.states","no scene states"),Math.abs(o[0].start)>Ts&&se("timeline.states[0].start","the first state must start at 0"),o.forEach((p,u)=>{u>0&&Math.abs(p.start-o[u-1].end)>Ts&&se(`timeline.states[${u}].start`,"states must be contiguous")}),Math.abs(o[o.length-1].end-n)>2/i&&se("timeline.states","states must end at the end of the audio");let l=new Set,c=zr(t.actions,"timeline.actions").map((p,u)=>{let d=`timeline.actions[${u}]`,g=$n(p,d),b=_u(g.kind,["event","continuous"],`${d}.kind`),m={id:Ue(g.id,`${d}.id`),rule:Ue(g.rule,`${d}.rule`),track:Ue(g.track,`${d}.track`),property:Ue(g.property,`${d}.property`),primitive:Ue(g.primitive,`${d}.primitive`),kind:b,policy:_u(g.policy,ST,`${d}.policy`),source:o_(g.source,`${d}.source`),start:As(g.start,`${d}.start`),peak:o_(g.peak,`${d}.peak`),settle:o_(g.settle,`${d}.settle`),end:As(g.end,`${d}.end`),amplitude:As(g.amplitude,`${d}.amplitude`),lookahead:As(g.lookahead,`${d}.lookahead`)};if(l.has(m.id)&&se(`${d}.id`,`duplicate action id ${m.id}`),l.add(m.id),r.has(`${m.track}.${m.property}`)||se(d,`unknown property ${m.track}.${m.property}`),m.end<m.start-Ts&&se(d,"ends before it starts"),(m.amplitude<0||m.amplitude>1+Ts)&&se(`${d}.amplitude`,"must be within [0, 1]"),b==="event"){let{source:h,peak:v,settle:S}=m;h===null||v===null||S===null?se(d,"an event action needs source, peak and settle"):m.start-Ts<=v&&v<=S+Ts&&S<=m.end+Ts?m.policy==="reactive"&&m.start<h-Ts?se(d,"a reactive action cannot start before its source"):m.policy==="anticipatory"&&m.start>h+Ts&&se(d,"an anticipatory action must start at or before its source"):se(d,"times must satisfy start <= peak <= settle <= end")}else m.policy!=="continuous"&&se(`${d}.policy`,"a continuous action must use the continuous policy");return m});for(let p=1;p<c.length;p++)c[p].start<c[p-1].start-Ts&&se(`timeline.actions[${p}]`,"actions must be sorted by start time");let f=$n(t.provenance,"timeline.provenance");return{format:bT(t.format,"timeline.format"),profile:{name:Ue($n(t.profile,"timeline.profile").name,"timeline.profile.name"),version:Ue($n(t.profile,"timeline.profile").version,"timeline.profile.version")},durationS:n,rateHz:i,nSamples:s,tracks:a,states:o,actions:c,provenance:{schemaVersion:Ue(f.schemaVersion,"timeline.provenance.schemaVersion"),timelineSha256:Ue(f.timelineSha256,"timeline.provenance.timelineSha256"),audioSha256:Ue(f.audioSha256,"timeline.provenance.audioSha256"),suppressedActions:l_(f.suppressedActions,"timeline.provenance.suppressedActions")}}}function TT(e,t){let n=t.tracks.flatMap(a=>a.properties.map(r=>`${a.name}.${r.name}`)),i=n.length*t.nSamples*4;if(e.byteLength!==i)throw new xu("curves",`expected ${i} bytes (${n.length} curves x ${t.nSamples} samples), got ${e.byteLength}`);let s=new Float32Array(e);for(let a=0;a<s.length;a++)if(!Number.isFinite(s[a]))throw new xu("curves",`non-finite value at index ${a}`);return{rateHz:t.rateHz,nSamples:t.nSamples,keys:n,data:s}}function _L(e,t){let n=0,i=e.length-1;if(t<=e[0].start)return 0;for(;n<i;){let s=n+i+1>>1;e[s].start<=t?n=s:i=s-1}return n}function AT(e,t){return e.states[_L(e.states,t)]}var c_="audio-features/1",Tp=["lowDb","punchDb","midDb","highDb","allDb","flux"];function wT(e){let{rec:t,arr:n,str:i,num:s,posNum:a,nonNegInt:r,fail:o,oneOf:l}=Ep,c=t(e,"features");c.format!==c_&&o("features.format",`unsupported format ${JSON.stringify(c.format)}; this UI reads ${c_}`);let f=n(c.channels,"features.channels").map((g,b)=>l(g,Tp,`features.channels[${b}]`));(f.length!==Tp.length||Tp.some((g,b)=>f[b]!==g))&&o("features.channels",`expected exactly ${Tp.join(", ")} in that order`);let p=r(c.nFrames,"features.nFrames");p<2&&o("features.nFrames","need at least 2 frames");let u=n(c.beats,"features.beats").map((g,b)=>s(g,`features.beats[${b}]`));for(let g=1;g<u.length;g++)u[g]<u[g-1]&&o(`features.beats[${g}]`,"beat times must be sorted");let d=t(c.provenance,"features.provenance");return{format:c_,rateHz:a(c.rateHz,"features.rateHz"),nFrames:p,durationS:a(c.durationS,"features.durationS"),channels:f,beats:u,provenance:{audioSha256:i(d.audioSha256,"features.provenance.audioSha256")}}}function CT(e,t){let n=t.channels.length*t.nFrames*4;e.byteLength!==n&&Ep.fail("features.bin",`expected ${n} bytes (${t.channels.length} channels x ${t.nFrames} frames), got ${e.byteLength}`);let i=new DataView(e),s={};return t.channels.forEach((a,r)=>{let o=new Float32Array(t.nFrames);for(let l=0;l<t.nFrames;l++){let c=i.getFloat32((r*t.nFrames+l)*4,!0);Number.isFinite(c)||Ep.fail(`features.bin.${a}[${l}]`,"not a finite number"),o[l]=c}s[a]=o}),s}var yL=.25,Ap=class{kind="offline";id;label;canSeek=!0;latencyMs=0;motion;beats;head;rate;n;timeline;cols;beatFlag;lastIdx=-1;nudgeS=0;constructor(t,n){this.id=t.id,this.label=t.label,this.timeline=t.timeline,this.motion={timeline:t.timeline,curves:t.curves},this.beats=t.meta.beats,this.rate=t.meta.rateHz,this.n=t.meta.nFrames,this.head=t.audioUrl?new El(t.audioUrl):new Ml(t.timeline.durationS,n);let i=this.n;this.cols={bass:new Float32Array(i),mid:new Float32Array(i),high:new Float32Array(i),rms:new Float32Array(i),onset:new Float32Array(i),hit:new Float32Array(i)},this.beatFlag=new Uint8Array(i);let s=new Tl,a=1/this.rate,r=t.readings;for(let o=0;o<i;o++){let l=s.push({lowDb:r.lowDb[o],punchDb:r.punchDb[o],midDb:r.midDb[o],highDb:r.highDb[o],allDb:r.allDb[o],flux:r.flux[o]},o*a,a);this.cols.bass[o]=l.bass,this.cols.mid[o]=l.mid,this.cols.high[o]=l.high,this.cols.rms[o]=l.rmsEnergy,this.cols.onset[o]=l.onsetStrength,this.cols.hit[o]=l.bassHit,this.beatFlag[o]=l.beatDetected?1:0}}sample(t){let n=this.head.time,i=this.head.playing,s=Math.max(0,n-this.nudgeS)*this.rate,a=Math.min(this.n-1,Math.floor(s)),r=Math.min(this.n-1,a+1),o=Math.min(1,s-a),l=p=>p[a]+(p[r]-p[a])*o,c=!1;if(i&&this.lastIdx>=0&&a>this.lastIdx&&a-this.lastIdx<yL*this.rate)for(let p=this.lastIdx+1;p<=a;p++)this.beatFlag[p]&&(c=!0);this.lastIdx=a;let f=this.timeline.durationS;return vl({time:n,progress:f>0?n/f:0,isPlaying:i,bass:l(this.cols.bass),mid:l(this.cols.mid),high:l(this.cols.high),rmsEnergy:l(this.cols.rms),onsetStrength:this.cols.onset[a],beatDetected:c,currentSceneState:AT(this.timeline,n).state,bassHit:l(this.cols.hit)})}async play(){await this.head.play()}pause(){this.head.pause()}seek(t){this.head.seek(t),this.lastIdx=-1}status(){return{playing:this.head.playing,duration:this.timeline.durationS,error:this.head.error}}onStatus(t){return this.head.onChange(t)}setSyncNudge(t){this.nudgeS=Math.max(-.2,Math.min(.4,t/1e3))}dispose(){this.head.dispose()}};async function u_(e,t){let n=await fetch(e,{signal:t});if(!n.ok)throw new Error(`${e}: HTTP ${n.status}`);return n.json()}async function RT(e,t){let n=await fetch(e,{signal:t});if(!n.ok)throw new Error(`${e}: HTTP ${n.status}`);return n.arrayBuffer()}async function wp(e,t){return MT(await u_(e,t))}function h_(e){return e.songs.filter(t=>t.features!==null)}async function f_(e){let n=(await wp(e.manifestUrl,e.signal)).songs.find(d=>d.id===e.songId);if(!n)throw new Error(`song "${e.songId}" is not in the manifest`);if(!n.features)throw new Error(`song "${e.songId}" has no features bundle; re-run export_web.py with a "source" audio file`);let i=n.profiles.find(d=>d.id===(e.profileId??n.profiles[0].id));if(!i)throw new Error(`song "${e.songId}" has no profile "${e.profileId}"`);let[s,a,r,o]=await Promise.all([u_(i.timeline,e.signal),RT(i.curves,e.signal),u_(n.features.meta,e.signal),RT(n.features.bin,e.signal)]),l=ET(s),c=TT(a,l),f=wT(r),p=CT(o,f);if(Math.abs(f.durationS-l.durationS)>.25)throw new Error(`features (${f.durationS.toFixed(2)} s) and timeline (${l.durationS.toFixed(2)} s) are for different audio`);let u=e.now??(()=>performance.now());return new Ap({id:`offline:${n.id}`,label:n.title,timeline:l,curves:c,meta:f,readings:p,audioUrl:n.audio?.src??null},u)}var ja=2048,Cp=4096,xL=4e3,Rp=class{main;low;mainDb=new Float32Array(ja/2);lowDb=new Float32Array(Cp/2);mag=new Float32Array(ja/2);prevMag=new Float32Array(ja/2);primed=!1;r;constructor(t){this.main=t.createAnalyser(),this.main.fftSize=ja,this.main.smoothingTimeConstant=.5,this.low=t.createAnalyser(),this.low.fftSize=Cp,this.low.smoothingTimeConstant=0;let n=t.sampleRate;this.r={low:Pr(Ki.lowHz[0],Ki.lowHz[1],n,Cp),punch:Pr(Ki.punchHz[0],Ki.punchHz[1],n,Cp),mid:Pr(Ki.midHz[0],Ki.midHz[1],n,ja),high:Pr(Ki.highHz[0],Ki.highHz[1],n,ja),all:Pr(Ki.lowHz[0],Ki.highHz[1],n,ja),onsetTop:Pr(0,xL,n,ja)}}tap(t){t.connect(this.main),t.connect(this.low)}untap(t){try{t.disconnect(this.main),t.disconnect(this.low)}catch{}this.primed=!1}read(){this.main.getFloatFrequencyData(this.mainDb),this.low.getFloatFrequencyData(this.lowDb);let t=0,n=this.r.onsetTop[1];for(let i=0;i<this.mag.length;i++)this.mag[i]=10**(this.mainDb[i]/20);if(this.primed)for(let i=1;i<n;i++){let s=this.mag[i]-this.prevMag[i];s>0&&(t+=s)}return this.prevMag.set(this.mag),this.primed=!0,{lowDb:yl(this.lowDb,...this.r.low),punchDb:yl(this.lowDb,...this.r.punch),midDb:yl(this.mainDb,...this.r.mid),highDb:yl(this.mainDb,...this.r.high),allDb:yl(this.mainDb,...this.r.all),flux:t}}},d_=class{constructor(t,n){this.inner=t;this.prepare=n}inner;prepare;get time(){return this.inner.time}get duration(){return this.inner.duration}get playing(){return this.inner.playing}get canSeek(){return this.inner.canSeek}get error(){return this.inner.error}async play(){await this.prepare(),await this.inner.play()}pause(){this.inner.pause()}seek(t){this.inner.seek(t)}onChange(t){return this.inner.onChange(t)}dispose(){this.inner.dispose()}},p_=class{constructor(t){this.inner=t;this.playhead=new d_(t,()=>this.ensureGraph())}inner;playhead;ctx=null;taps=null;async ensureGraph(){if(!this.ctx){let t=new AudioContext,n=new Rp(t),i=t.createMediaElementSource(this.inner.element);n.tap(i),i.connect(t.destination),this.ctx=t,this.taps=n}this.ctx.state==="suspended"&&await this.ctx.resume()}read(){return this.taps?this.taps.read():SL}get latencyS(){let t=this.ctx;if(!t)return 0;let n=(t.baseLatency??0)+(t.outputLatency??0);return Number.isFinite(n)?n:0}dispose(){this.playhead.dispose(),this.ctx?.close()}},m_=class{constructor(t,n,i){this.getCtx=t;this.taps=n;this.constraints=i}getCtx;taps;constraints;canSeek=!1;duration=null;error=null;isPlaying=!1;startedAt=0;cbs=new Set;stream=null;node=null;get time(){return this.isPlaying?this.getCtx().currentTime-this.startedAt:0}get playing(){return this.isPlaying}async play(){if(!this.isPlaying){try{this.error=null;let t=this.getCtx();t.state==="suspended"&&await t.resume(),this.stream=await navigator.mediaDevices.getUserMedia(this.constraints),this.node=t.createMediaStreamSource(this.stream),this.taps().tap(this.node),this.startedAt=t.currentTime,this.isPlaying=!0}catch(t){throw this.error="The microphone is unavailable or access was denied.",this.emit(),t}this.emit()}}pause(){this.isPlaying&&(this.release(),this.isPlaying=!1,this.emit())}seek(){}onChange(t){return this.cbs.add(t),()=>this.cbs.delete(t)}dispose(){this.release(),this.isPlaying=!1}release(){this.node&&this.taps().untap(this.node),this.stream?.getTracks().forEach(t=>t.stop()),this.node=null,this.stream=null}emit(){for(let t of[...this.cbs])t()}},g_=class{latencyS=0;playhead;ctx=new AudioContext;taps=new Rp(this.ctx);constructor(t){this.playhead=new m_(()=>this.ctx,()=>this.taps,t)}read(){return this.taps.read()}dispose(){this.playhead.dispose(),this.ctx.close()}},SL={lowDb:-120,punchDb:-120,midDb:-120,highDb:-120,allDb:-120,flux:0};function NT(e,t,n=`live:${t}`){return new Fr({id:n,kind:"live",label:t},new p_(new El(e)))}function v_(e){let t=URL.createObjectURL(e);return{source:NT(t,e.name,`file:${e.name}`),revoke:()=>URL.revokeObjectURL(t)}}function __(){let e={audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}};return new Fr({id:"mic",kind:"live",label:"Microphone"},new g_(e))}var ce=Ln(Qi(),1),DT="/motion/manifest.json",bL=120,UT=e=>`${Math.floor(e/60)}:${(e%60).toFixed(1).padStart(4,"0")}`,ML={none:"Pick a source to begin",paused:"Paused",silent:"Silent: resting",quiet:"Quiet: low energy",playing:"Playing"};function LT(){let e=Sl(),t=s_(),[n,i]=(0,ti.useState)([]),[s,a]=(0,ti.useState)(null),[r,o]=(0,ti.useState)(null),l=(0,ti.useRef)(null);(0,ti.useEffect)(()=>{let d=new AbortController;return wp(DT,d.signal).then(g=>i(h_(g))).catch(()=>i([])),()=>d.abort()},[]),(0,ti.useEffect)(()=>()=>l.current?.(),[]);let c=(d,g,b)=>{let m=l.current;e.setSource(d),m?.(),l.current=g,o(null),b&&e.play()},f=async d=>{a(d.id),o(null);try{c(await f_({manifestUrl:DT,songId:d.id}),null,!0)}catch(g){o(g instanceof Error?g.message:"Could not load this track.")}finally{a(null)}},p=t.source?.id??null,u="rounded-full px-3 py-1 text-sm text-slate-300 transition aria-pressed:bg-white aria-pressed:text-slate-900 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none disabled:opacity-50";return(0,ce.jsxs)("div",{role:"group","aria-label":"Audio source",className:"flex flex-wrap items-center gap-2",children:[(0,ce.jsxs)("div",{className:"inline-flex flex-wrap gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10",children:[(0,ce.jsx)("button",{type:"button","data-source":"demo","aria-pressed":p==="demo",className:u,onClick:()=>c(vu(()=>performance.now(),bL),null,!0),children:"Demo"}),n.map(d=>(0,ce.jsx)("button",{type:"button","data-source":`song:${d.id}`,"aria-pressed":p===`offline:${d.id}`,className:u,disabled:s!==null,title:"Pre-computed track",onClick:()=>{f(d)},children:s===d.id?"Loading\u2026":d.title.split(" - ")[0]},d.id)),(0,ce.jsx)("button",{type:"button","data-source":"mic","aria-pressed":p==="mic",className:u,onClick:()=>c(__(),null,!0),children:"Microphone"})]}),(0,ce.jsxs)("label",{className:"inline-flex cursor-pointer items-center rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 transition hover:bg-white/15 focus-within:ring-2 focus-within:ring-cyan-300",children:["Load a track",(0,ce.jsx)("input",{type:"file",accept:"audio/*",className:"sr-only",onChange:d=>{let g=d.target.files?.[0];if(!g)return;let{source:b,revoke:m}=v_(g);c(b,m,!1)}})]}),(r||t.error)&&(0,ce.jsx)("p",{role:"alert",className:"w-full text-xs text-rose-300",children:r??t.error})]})}function OT(){let e=Sl(),t=s_(),n=(0,ti.useRef)(null),i=(0,ti.useRef)(null),s=(0,ti.useRef)(!1),[a,r]=(0,ti.useState)("none"),[o,l]=(0,ti.useState)(0),c=t.source!==null;return gp(f=>{let p=c?f.isPlaying?f.rmsEnergy<.04?"silent":f.rmsEnergy<.3?"quiet":"playing":"paused":"none";r(u=>u===p?u:p),!s.current&&n.current&&(n.current.value=String(f.time)),i.current&&(i.current.textContent=UT(f.time))},[c]),(0,ce.jsxs)("div",{className:"space-y-3",children:[(0,ce.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,ce.jsx)("button",{type:"button","data-play":!0,disabled:!c,onClick:()=>{e.toggle()},"aria-label":t.isPlaying?"Pause":"Play","aria-pressed":t.isPlaying,className:"grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:scale-100",children:t.isPlaying?(0,ce.jsxs)("svg",{viewBox:"0 0 24 24",className:"h-5 w-5",fill:"currentColor","aria-hidden":!0,children:[(0,ce.jsx)("rect",{x:"6",y:"5",width:"4",height:"14",rx:"1"}),(0,ce.jsx)("rect",{x:"14",y:"5",width:"4",height:"14",rx:"1"})]}):(0,ce.jsx)("svg",{viewBox:"0 0 24 24",className:"h-5 w-5",fill:"currentColor","aria-hidden":!0,children:(0,ce.jsx)("path",{d:"M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z"})})}),(0,ce.jsxs)("div",{role:"status","aria-live":"polite",className:"flex flex-col",children:[(0,ce.jsx)("span",{className:"text-xs font-medium",children:ML[a]}),(0,ce.jsxs)("span",{className:"max-w-[18rem] truncate text-[11px] text-slate-400",children:[t.source?`${t.source.label} \xB7 ${t.source.kind}`:"No source",t.source&&` \xB7 scene: ${t.scene}`]})]})]}),(0,ce.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,ce.jsx)("span",{ref:i,className:"w-14 text-xs tabular-nums text-slate-300",children:"0:00.0"}),(0,ce.jsx)("input",{ref:n,type:"range","aria-label":"Timeline position",min:0,max:t.duration??0,step:.01,defaultValue:0,disabled:!t.source?.canSeek,onPointerDown:()=>s.current=!0,onPointerUp:()=>s.current=!1,onChange:f=>e.seek(Number(f.target.value)),className:"h-1.5 min-w-[12rem] flex-1 cursor-pointer accent-white disabled:cursor-not-allowed disabled:opacity-40"}),(0,ce.jsx)("span",{className:"w-14 text-right text-xs tabular-nums text-slate-400",children:t.duration?UT(t.duration):"--:--"})]}),(0,ce.jsxs)("div",{className:"flex flex-wrap items-center gap-3 text-xs text-slate-300",children:[(0,ce.jsx)("label",{htmlFor:"sync-nudge",children:"Sync nudge"}),(0,ce.jsx)("input",{id:"sync-nudge",type:"range",min:-200,max:200,step:10,value:o,onChange:f=>{l(Number(f.target.value)),e.setSyncNudge(Number(f.target.value))},className:"w-40 accent-white"}),(0,ce.jsxs)("span",{className:"w-16 tabular-nums",children:[o>0?"+":"",o," ms"]}),(0,ce.jsxs)("span",{className:"text-slate-400",children:["device latency ",t.latencyMs," ms, compensated automatically"]})]})]})}var ei=Ln(Qi(),1);function y_({pipeline:e,debugRef:t}){return(0,ei.jsx)(mT,{pipeline:e,children:(0,ei.jsx)(EL,{debugRef:t})})}function EL({debugRef:e}){let t=gT();return(0,ei.jsxs)("section",{"aria-labelledby":"constellation-core-title","data-scene":t,className:"relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-3xl bg-[#02040c] text-slate-100 ring-1 ring-white/10",children:[(0,ei.jsxs)("div",{className:"relative min-h-[22rem] flex-1",children:[(0,ei.jsx)("div",{className:"absolute inset-0",children:(0,ei.jsx)(a_,{debugRef:e})}),(0,ei.jsxs)("header",{className:"pointer-events-none relative p-5 sm:p-6",children:[(0,ei.jsx)("h2",{id:"constellation-core-title",className:"text-lg font-semibold tracking-tight",children:"Constellation Core"}),(0,ei.jsx)("p",{className:"max-w-md text-sm text-slate-300/90",children:"Bass swells the core, mids speed the orbits, bass hits surge the beam, detected onsets light the rings in turn. Silence lets it settle. Drag to orbit."})]})]}),(0,ei.jsxs)("div",{className:"relative m-3 space-y-3 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:m-5 sm:mt-0",children:[(0,ei.jsx)(LT,{}),(0,ei.jsx)(OT,{})]})]})}var Np=Ln(Qi(),1),Li=new Br,Qs={current:null},x_=0,S_=null;function TL(){let[e,t]=(0,Dp.useState)(!0);return(0,Dp.useEffect)(()=>(S_=t,()=>{S_=null}),[]),(0,Np.jsx)("div",{className:"mx-auto max-w-7xl px-4 py-4",children:e&&(0,Np.jsx)(y_,{pipeline:Li,debugRef:Qs})})}var b_=e=>{let t=e.filter(i=>Number.isFinite(i)&&i>0).sort((i,s)=>i-s);if(!t.length)return null;let n=i=>t[Math.min(t.length-1,Math.floor(i*t.length))];return{n:t.length,median:n(.5),p95:n(.95),p99:n(.99),max:t[t.length-1],over33:t.filter(i=>i>33.4).length/t.length}},fn={bass:0,mid:0,high:0,rms:0,onset:0,onsetPeak:0,scene:"rest",beatQ:0,hitAt:-1e9,hitLevel:0},IT={id:"core-script",kind:"synthetic",label:"Scripted input (synthetic)",canSeek:!1,latencyMs:0,sample(e){let t=fn.hitLevel*Math.exp(-Math.max(0,e-fn.hitAt)/.15),n=fn.beatQ>0;return n&&fn.beatQ--,Object.freeze({time:e,progress:0,isPlaying:!0,bass:Math.min(1,fn.bass+.5*t),mid:fn.mid,high:fn.high,rmsEnergy:fn.rms,onsetStrength:n?fn.onsetPeak:fn.onset,beatDetected:n,currentSceneState:fn.scene,bassHit:t})},play:()=>Promise.resolve(),pause(){},seek(){},status:()=>({playing:!0,duration:null,error:null}),onStatus:()=>()=>{},dispose(){}};function AL(){let e=Qs.current,t=e?.host.three;if(!e||!t)return null;e.host.render(e.scene.scene,e.scene.camera);let n=t.getContext(),i=n.drawingBufferWidth,s=n.drawingBufferHeight,a=new Uint8Array(i*s*4);n.readPixels(0,0,i,s,n.RGBA,n.UNSIGNED_BYTE,a);let r=e.scene.camera;r.updateMatrixWorld();let o=new P(0,0,0).project(r),l=(o.x*.5+.5)*i,c=(o.y*.5+.5)*s,f=1.5*(1+.04*e.anim.swell),p=new P().setFromMatrixColumn(r.matrixWorld,0).multiplyScalar(f).project(r),u=Math.abs(p.x-o.x)*.5*i,d=(_,E)=>{let T=Math.round(_),w=Math.round(E);if(T<0||w<0||T>=i||w>=s)return NaN;let x=(w*i+T)*4;return(.2126*a[x]+.7152*a[x+1]+.0722*a[x+2])/255},g=_=>{let E=0,T=0;for(let[w,x]of _){let A=d(w,x);Number.isFinite(A)&&(E+=A,T++)}return T?E/T:NaN},b=[],m=[];for(let _=0;_<64;_++){let E=Math.PI*2*_/64;for(let T of[.1,.3,.5])b.push([l+Math.cos(E)*T*u,c+Math.sin(E)*T*u]);for(let T of[.92,.96,1,1.04,1.08])m.push([l+Math.cos(E)*T*u,c+Math.sin(E)*T*u])}let h=[];for(let _=0;_<=40;_++){let E=1.6+_/40*3.4;h.push([l,c+E*u],[l+.03*u,c+E*u],[l,c-E*u])}let v=[];for(let _=0;_<20;_++)for(let E=0;E<20;E++)v.push([_*i*.004,E*s*.004],[i-1-_*i*.004,s-1-E*s*.004]);let S=0;for(let _=0;_<a.length;_+=16)S+=(.2126*a[_]+.7152*a[_+1]+.0722*a[_+2])/255;return{w:i,h:s,cx:l,cy:c,R:u,centre:g(b),edge:g(m),beam:g(h),background:g(v),frameMean:S/(a.length/16),anim:{...e.anim},params:e.lastParams}}function wL(e=!1){let t=Qs.current,n=t?.host.three;if(!t||!n)return null;let i=n.getContext(),s=i.drawingBufferWidth,a=i.drawingBufferHeight,r=t.scene.camera,o=[];t.scene.rings.forEach(W=>W.children.forEach(et=>{let V=et;V.geometry.type==="SphereGeometry"&&o.push(V)}));let l=t.anim.phase,c=t.anim.drift;t.anim.drift=.3;let f={azimuth:0,elevation:0},p=new P,u=new P,d=new P,g=new P(0,0,0),b=W=>{t.anim.phase=W,t.scene.update(t.anim,f),r.updateMatrixWorld(!0);let et=r.position.length(),V=g.clone().project(r),J=1.5*(1+.04*t.anim.swell);d.setFromMatrixColumn(r.matrixWorld,0);let nt=Math.abs(g.clone().addScaledVector(d,J).project(r).x-V.x)*.5*s,At=[];return o.forEach((St,pe)=>{St.updateWorldMatrix(!0,!1),p.setFromMatrixPosition(St.matrixWorld);let Wt=p.distanceTo(r.position);u.copy(p).project(r);let Kt=(u.x*.5+.5)*s,q=(u.y*.5+.5)*a,tt=Math.abs(p.clone().addScaledVector(d,St.scale.x).project(r).x-u.x)*.5*s,gt=Kt-(V.x*.5+.5)*s,Ut=q-(V.y*.5+.5)*a;At.push({k:pe,sx:Kt,sy:q,rPx:tt,front:Wt<et,inside:Math.hypot(gt,Ut)+tt*.5<nt*.9})}),At},m=null;for(let W=0;W<60&&!m;W+=.02){let et=b(W).filter(V=>V.front&&V.inside).sort((V,J)=>J.rPx-V.rPx)[0];et&&(m={ph:W,o:et})}if(!m)return t.anim.phase=l,t.anim.drift=c,{found:!1};b(m.ph),t.host.render(t.scene.scene,r);let h=new Uint8Array(s*a*4);i.readPixels(0,0,s,a,i.RGBA,i.UNSIGNED_BYTE,h);let v=(W,et)=>{let V=(Math.round(et)*s+Math.round(W))*4;return(.2126*h[V]+.7152*h[V+1]+.0722*h[V+2])/255},{sx:S,sy:_,rPx:E}=m.o,T=0,w=0,x=0,A=0,R=1,U=0,B=1,k=0;for(let W=0;W<48;W++){let et=W/48*Math.PI*2;for(let V of[.1,.25,.4]){let J=v(S+Math.cos(et)*V*E,_+Math.sin(et)*V*E);T+=J,w++,R=Math.min(R,J),U=Math.max(U,J),B=Math.min(B,J),k=Math.max(k,J)}for(let V of[.8,.88,.95]){let J=v(S+Math.cos(et)*V*E,_+Math.sin(et)*V*E);x+=J,A++,R=Math.min(R,J),U=Math.max(U,J)}}let O=T/w,G=x/A,K={found:!0,phase:m.ph,orb:m.o.k,rPx:E,cssX:S/s*i.canvas.clientWidth,cssY:(1-_/a)*i.canvas.clientHeight,centre:O,rim:G,interiorSpread:k-B,min:R,max:U,spread:U-R,rimToCentre:G/Math.max(O,.001)};return e?Li.stop():(t.anim.phase=l,t.anim.drift=c),K}function CL(e=60){let t=Qs.current,n=t?.host.three;if(!t||!n)return null;let i=n.getContext(),s=new Uint8Array(4),a=[];for(let r=0;r<e+5;r++){let o=performance.now();t.host.render(t.scene.scene,t.scene.camera),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,s),r>=5&&a.push(performance.now()-o)}return{...b_(a),buffer:[i.drawingBufferWidth,i.drawingBufferHeight],pixelRatio:t.host.pixelRatioInUse}}function RL(){let e=Qs.current;if(!e)return null;let t=e.scene.camera;e.scene.update(e.anim,{azimuth:0,elevation:0}),t.updateMatrixWorld();let n=new P,i=0,s=0,a=0,r=0;return e.scene.rings.forEach((o,l)=>{o.updateMatrixWorld(!0);for(let c=0;c<128;c++){let f=c/128*Math.PI*2;n.set(xl[l]*Math.cos(f),0,-xl[l]*Math.sin(f)),o.localToWorld(n),n.project(t),i=Math.max(i,Math.abs(n.x)),s=Math.max(s,Math.abs(n.y)),(Math.abs(n.x)>1||Math.abs(n.y)>1)&&a++,r++}}),{maxAbsX:i,maxAbsY:s,outside:a,n:r,distance:e.scene.distance,aspect:t.aspect}}window.__core={pipeline:Li,debug:()=>Qs.current,set:e=>S_?.(e),demo:async()=>(Li.setSource(vu(()=>performance.now())),await Li.play(),Li.getState().source?.kind),silence:()=>Li.setSource(null),script:async e=>(Object.assign(fn,e),Li.source!==IT&&Li.setSource(IT),await Li.play(),Li.getState().source?.kind),hit:(e=1)=>(fn.hitLevel=e,fn.hitAt=performance.now()/1e3,performance.now()),beat:(e=.9)=>(fn.onsetPeak=e,fn.beatQ=1,performance.now()),train:(e,t,n=.9)=>{let i=0,s=setInterval(()=>{fn.onsetPeak=n,fn.beatQ=1,++i>=e&&clearInterval(s)},t);return performance.now()},sample:AL,gpuTime:CL,fits:RL,orbProbe:wL,resume:()=>Li.start(),mark:()=>(x_=Qs.current?.frames??0,x_),timing:()=>{let e=Qs.current;if(!e)return null;let t=e.intervals.length,n=Math.min(e.frames-x_,t),i=s=>{let a=[];for(let r=e.frames-n;r<e.frames;r++)a.push(s[r%t]);return a};return{frames:n,intervals:b_(i(e.intervals)),cpu:b_(i(e.cpu))}},memory:()=>{let e=Qs.current?.host.three;return e?{geometries:e.info.memory.geometries,textures:e.info.memory.textures,programs:e.info.programs?.length??null}:null},sceneStats:hp,hostStats:dp};(0,PT.createRoot)(document.getElementById("root")).render((0,Np.jsx)(TL,{}));new URLSearchParams(location.search).get("source")==="demo"&&window.__core.demo();})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
