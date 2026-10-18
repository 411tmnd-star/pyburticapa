"use strict";(()=>{var ZT=Object.create;var G_=Object.defineProperty;var JT=Object.getOwnPropertyDescriptor;var KT=Object.getOwnPropertyNames;var QT=Object.getPrototypeOf,jT=Object.prototype.hasOwnProperty;var es=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var $T=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of KT(t))!jT.call(e,s)&&s!==n&&G_(e,s,{get:()=>t[s],enumerable:!(i=JT(t,s))||i.enumerable});return e};var Nn=(e,t,n)=>(n=e!=null?ZT(QT(e)):{},$T(t||!e||!e.__esModule?G_(n,"default",{value:e,enumerable:!0}):n,e));var ey=es(Ut=>{"use strict";var Vp=Symbol.for("react.transitional.element"),tA=Symbol.for("react.portal"),eA=Symbol.for("react.fragment"),nA=Symbol.for("react.strict_mode"),iA=Symbol.for("react.profiler"),sA=Symbol.for("react.consumer"),aA=Symbol.for("react.context"),rA=Symbol.for("react.forward_ref"),oA=Symbol.for("react.suspense"),lA=Symbol.for("react.memo"),Y_=Symbol.for("react.lazy"),cA=Symbol.for("react.activity"),uA=Symbol.for("react.view_transition"),k_=Symbol.iterator;function hA(e){return e===null||typeof e!="object"?null:(e=k_&&e[k_]||e["@@iterator"],typeof e=="function"?e:null)}var Z_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},J_=Object.assign,K_={};function Yr(e,t,n){this.props=e,this.context=t,this.refs=K_,this.updater=n||Z_}Yr.prototype.isReactComponent={};Yr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Yr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Q_(){}Q_.prototype=Yr.prototype;function Gp(e,t,n){this.props=e,this.context=t,this.refs=K_,this.updater=n||Z_}var kp=Gp.prototype=new Q_;kp.constructor=Gp;J_(kp,Yr.prototype);kp.isPureReactComponent=!0;var X_=Array.isArray;function Hp(){}var Me={H:null,A:null,T:null,S:null},j_=Object.prototype.hasOwnProperty;function Xp(e,t,n){var i=n.ref;return{$$typeof:Vp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function fA(e,t){return Xp(e.type,t,e.props)}function Wp(e){return typeof e=="object"&&e!==null&&e.$$typeof===Vp}function dA(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var W_=/\/+/g;function zp(e,t){return typeof e=="object"&&e!==null&&e.key!=null?dA(""+e.key):t.toString(36)}function pA(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Hp,Hp):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function qr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Vp:case tA:r=!0;break;case Y_:return r=e._init,qr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+zp(e,0):i,X_(s)?(n="",r!=null&&(n=r.replace(W_,"$&/")+"/"),qr(s,t,n,"",function(c){return c})):s!=null&&(Wp(s)&&(s=fA(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(W_,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(X_(e))for(var l=0;l<e.length;l++)i=e[l],a=o+zp(i,l),r+=qr(i,t,n,a,s);else if(l=hA(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+zp(i,l++),r+=qr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return qr(pA(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Eu(e,t,n){if(e==null)return e;var i=[],s=0;return qr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function mA(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var q_=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function $_(e){var t=Me.T,n={};n.types=t!==null?t.types:null,Me.T=n;try{var i=e(),s=Me.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Hp,q_)}catch(a){q_(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),Me.T=t}}function ty(e){var t=Me.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else $_(ty.bind(null,e))}var gA={map:Eu,forEach:function(e,t,n){Eu(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Eu(e,function(){t++}),t},toArray:function(e){return Eu(e,function(t){return t})||[]},only:function(e){if(!Wp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ut.Activity=cA;Ut.Children=gA;Ut.Component=Yr;Ut.Fragment=eA;Ut.Profiler=iA;Ut.PureComponent=Gp;Ut.StrictMode=nA;Ut.Suspense=oA;Ut.ViewTransition=uA;Ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Me;Ut.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Me.H.useMemoCache(e)}};Ut.addTransitionType=ty;Ut.cache=function(e){return function(){return e.apply(null,arguments)}};Ut.cacheSignal=function(){return null};Ut.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=J_({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!j_.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return Xp(e.type,s,i)};Ut.createContext=function(e){return e={$$typeof:aA,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:sA,_context:e},e};Ut.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)j_.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return Xp(e,a,s)};Ut.createRef=function(){return{current:null}};Ut.forwardRef=function(e){return{$$typeof:rA,render:e}};Ut.isValidElement=Wp;Ut.lazy=function(e){return{$$typeof:Y_,_payload:{_status:-1,_result:e},_init:mA}};Ut.memo=function(e,t){return{$$typeof:lA,type:e,compare:t===void 0?null:t}};Ut.startTransition=$_;Ut.unstable_useCacheRefresh=function(){return Me.H.useCacheRefresh()};Ut.use=function(e){return Me.H.use(e)};Ut.useActionState=function(e,t,n){return Me.H.useActionState(e,t,n)};Ut.useCallback=function(e,t){return Me.H.useCallback(e,t)};Ut.useContext=function(e){return Me.H.useContext(e)};Ut.useDebugValue=function(){};Ut.useDeferredValue=function(e,t){return Me.H.useDeferredValue(e,t)};Ut.useEffect=function(e,t){return Me.H.useEffect(e,t)};Ut.useEffectEvent=function(e){return Me.H.useEffectEvent(e)};Ut.useId=function(){return Me.H.useId()};Ut.useImperativeHandle=function(e,t,n){return Me.H.useImperativeHandle(e,t,n)};Ut.useInsertionEffect=function(e,t){return Me.H.useInsertionEffect(e,t)};Ut.useLayoutEffect=function(e,t){return Me.H.useLayoutEffect(e,t)};Ut.useMemo=function(e,t){return Me.H.useMemo(e,t)};Ut.useOptimistic=function(e,t){return Me.H.useOptimistic(e,t)};Ut.useReducer=function(e,t,n){return Me.H.useReducer(e,t,n)};Ut.useRef=function(e){return Me.H.useRef(e)};Ut.useState=function(e){return Me.H.useState(e)};Ut.useSyncExternalStore=function(e,t,n){return Me.H.useSyncExternalStore(e,t,n)};Ut.useTransition=function(){return Me.H.useTransition()};Ut.version="19.3.0"});var ir=es((IL,ny)=>{"use strict";ny.exports=ey()});var fy=es(Ne=>{"use strict";function Jp(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<Tu(s,t))e[i]=t,e[n]=s,n=i;else break t}}function ns(e){return e.length===0?null:e[0]}function wu(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>Tu(o,n))l<s&&0>Tu(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>Tu(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function Tu(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ne.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(iy=performance,Ne.unstable_now=function(){return iy.now()}):(qp=Date,sy=qp.now(),Ne.unstable_now=function(){return qp.now()-sy});var iy,qp,sy,Cs=[],na=[],vA=1,Si=null,Sn=3,Kp=!1,Al=!1,wl=!1,Qp=!1,oy=typeof setTimeout=="function"?setTimeout:null,ly=typeof clearTimeout=="function"?clearTimeout:null,ay=typeof setImmediate<"u"?setImmediate:null;function Au(e){for(var t=ns(na);t!==null;){if(t.callback===null)wu(na);else if(t.startTime<=e)wu(na),t.sortIndex=t.expirationTime,Jp(Cs,t);else break;t=ns(na)}}function jp(e){if(wl=!1,Au(e),!Al)if(ns(Cs)!==null)Al=!0,Jr||(Jr=!0,Zr());else{var t=ns(na);t!==null&&$p(jp,t.startTime-e)}}var Jr=!1,Cl=-1,cy=5,uy=-1;function hy(){return Qp?!0:!(Ne.unstable_now()-uy<cy)}function Yp(){if(Qp=!1,Jr){var e=Ne.unstable_now();uy=e;var t=!0;try{t:{Al=!1,wl&&(wl=!1,ly(Cl),Cl=-1),Kp=!0;var n=Sn;try{e:{for(Au(e),Si=ns(Cs);Si!==null&&!(Si.expirationTime>e&&hy());){var i=Si.callback;if(typeof i=="function"){Si.callback=null,Sn=Si.priorityLevel;var s=i(Si.expirationTime<=e);if(e=Ne.unstable_now(),typeof s=="function"){Si.callback=s,Au(e),t=!0;break e}Si===ns(Cs)&&wu(Cs),Au(e)}else wu(Cs);Si=ns(Cs)}if(Si!==null)t=!0;else{var a=ns(na);a!==null&&$p(jp,a.startTime-e),t=!1}}break t}finally{Si=null,Sn=n,Kp=!1}t=void 0}}finally{t?Zr():Jr=!1}}}var Zr;typeof ay=="function"?Zr=function(){ay(Yp)}:typeof MessageChannel<"u"?(Zp=new MessageChannel,ry=Zp.port2,Zp.port1.onmessage=Yp,Zr=function(){ry.postMessage(null)}):Zr=function(){oy(Yp,0)};var Zp,ry;function $p(e,t){Cl=oy(function(){e(Ne.unstable_now())},t)}Ne.unstable_IdlePriority=5;Ne.unstable_ImmediatePriority=1;Ne.unstable_LowPriority=4;Ne.unstable_NormalPriority=3;Ne.unstable_Profiling=null;Ne.unstable_UserBlockingPriority=2;Ne.unstable_cancelCallback=function(e){e.callback=null};Ne.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):cy=0<e?Math.floor(1e3/e):5};Ne.unstable_getCurrentPriorityLevel=function(){return Sn};Ne.unstable_next=function(e){switch(Sn){case 1:case 2:case 3:var t=3;break;default:t=Sn}var n=Sn;Sn=t;try{return e()}finally{Sn=n}};Ne.unstable_requestPaint=function(){Qp=!0};Ne.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Sn;Sn=e;try{return t()}finally{Sn=n}};Ne.unstable_scheduleCallback=function(e,t,n){var i=Ne.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:vA++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,Jp(na,e),ns(Cs)===null&&e===ns(na)&&(wl?(ly(Cl),Cl=-1):wl=!0,$p(jp,n-i))):(e.sortIndex=s,Jp(Cs,e),Al||Kp||(Al=!0,Jr||(Jr=!0,Zr()))),e};Ne.unstable_shouldYield=hy;Ne.unstable_wrapCallback=function(e){var t=Sn;return function(){var n=Sn;Sn=t;try{return e.apply(this,arguments)}finally{Sn=n}}}});var py=es((BL,dy)=>{"use strict";dy.exports=fy()});var vy=es(bn=>{"use strict";var _A=ir();function gy(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ia(){}var Dn={d:{f:ia,r:function(){throw Error(gy(522))},D:ia,C:ia,L:ia,m:ia,X:ia,S:ia,M:ia},p:0,findDOMNode:null},yA=Symbol.for("react.portal"),xA=Symbol.for("react.recoverable"),my=Symbol.for("react.optimistic_key");function SA(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yA,key:i==null?null:i===my?my:""+i,children:e,containerInfo:t,implementation:n}}var Rl=_A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Cu(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Dn;bn.browser=function(e){return{$$typeof:xA,_reason:e}};bn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(gy(299));return SA(e,t,null,n)};bn.flushSync=function(e){var t=Rl.T,n=Dn.p;try{if(Rl.T=null,Dn.p=2,e)return e()}finally{Rl.T=t,Dn.p=n,Dn.d.f()}};bn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Dn.d.C(e,t))};bn.prefetchDNS=function(e){typeof e=="string"&&Dn.d.D(e)};bn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Cu(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Dn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&Dn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};bn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Cu(t.as,t.crossOrigin);Dn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&Dn.d.M(e)};bn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Cu(n,t.crossOrigin);Dn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};bn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Cu(t.as,t.crossOrigin);Dn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else Dn.d.m(e)};bn.requestFormReset=function(e){Dn.d.r(e)};bn.unstable_batchedUpdates=function(e,t){return e(t)};bn.useFormState=function(e,t,n){return Rl.H.useFormState(e,t,n)};bn.useFormStatus=function(){return Rl.H.useHostTransitionStatus()};bn.version="19.3.0"});var xy=es((zL,yy)=>{"use strict";function _y(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_y)}catch(e){console.error(e)}}_y(),yy.exports=vy()});var r1=es(uf=>{"use strict";var Qe=py(),aS=ir(),bA=xy();function Q(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function rS(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function gc(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function oS(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function lS(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Sy(e){if(gc(e)!==e)throw Error(Q(188))}function MA(e){var t=e.alternate;if(!t){if(t=gc(e),t===null)throw Error(Q(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return Sy(s),e;if(a===i)return Sy(s),t;a=a.sibling}throw Error(Q(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(Q(189))}}if(n.alternate!==i)throw Error(Q(190))}if(n.tag!==3)throw Error(Q(188));return n.stateNode.current===n?e:t}function cS(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=cS(e),t!==null)return t;e=e.sibling}return null}function qn(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&qn(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function Er(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function by(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function uS(e){var t=[null,null],n=Er(e);return n===null||hS(t,e,n.child,{foundSelf:!1}),t}function hS(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&hS(e,t,n.child,i))return!0;n=n.sibling}return!1}function Ke(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(Q(559))}}var no=null,Dm=null;function EA(e,t,n){return e===n?!0:e===t?(no=e,!0):!1}function TA(e,t,n){return e===n?(Dm=e,!1):e===t?(Dm!==null&&(no=e),!0):!1}function My(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Um(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var _e=Object.assign,AA=Symbol.for("react.element"),Ru=Symbol.for("react.transitional.element"),Pl=Symbol.for("react.portal"),io=Symbol.for("react.fragment"),fS=Symbol.for("react.strict_mode"),Lm=Symbol.for("react.profiler"),dS=Symbol.for("react.consumer"),ls=Symbol.for("react.context"),Gg=Symbol.for("react.forward_ref"),Om=Symbol.for("react.suspense"),Im=Symbol.for("react.suspense_list"),kg=Symbol.for("react.memo"),oa=Symbol.for("react.lazy"),Pm=Symbol.for("react.activity"),wA=Symbol.for("react.legacy_hidden"),CA=Symbol.for("react.memo_cache_sentinel"),Bm=Symbol.for("react.view_transition"),RA=Symbol.for("react.recoverable"),Ey=Symbol.iterator;function Nl(e){return e===null||typeof e!="object"?null:(e=Ey&&e[Ey]||e["@@iterator"],typeof e=="function"?e:null)}var NA=Symbol.for("react.client.reference");function Fm(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===NA?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case io:return"Fragment";case Lm:return"Profiler";case fS:return"StrictMode";case Om:return"Suspense";case Im:return"SuspenseList";case Pm:return"Activity";case Bm:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Pl:return"Portal";case ls:return e.displayName||"Context";case dS:return(e._context.displayName||"Context")+".Consumer";case Gg:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case kg:return t=e.displayName||null,t!==null?t:Fm(e.type)||"Memo";case oa:t=e._payload,e=e._init;try{return Fm(e(t))}catch{}}return null}var Bl=Array.isArray,Nt=aS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ie=bA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,hr={pending:!1,data:null,method:null,action:null},zm=[],so=-1;function ms(e){return{current:e}}function pn(e){0>so||(e.current=zm[so],zm[so]=null,so--)}function Ae(e,t){so++,zm[so]=e.current,e.current=t}var fs=ms(null),tc=ms(null),ga=ms(null),mh=ms(null);function gh(e,t){switch(Ae(ga,t),Ae(tc,e),Ae(fs,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Fx(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Fx(t),e=IM(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}pn(fs),Ae(fs,e)}function To(){pn(fs),pn(tc),pn(ga)}function Hm(e){var t=e.memoizedState;t!==null&&(Io._currentValue=t.memoizedState,Ae(mh,e)),t=fs.current;var n=IM(t,e.type);t!==n&&(Ae(tc,e),Ae(fs,n))}function vh(e){tc.current===e&&(pn(fs),pn(tc)),mh.current===e&&(pn(mh),Io._currentValue=hr)}var tm,Ty;function aa(e){if(tm===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);tm=t&&t[1]||"",Ty=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+tm+e+Ty}var em=!1;function nm(e,t){if(!e||em)return"";em=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(g){var u=g}Reflect.construct(e,[],p)}else{try{p.call()}catch(g){u=g}p=!1;try{var f=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),p=!0,new e}finally{p&&(f!==void 0?Object.defineProperty(e.prototype,"props",f):delete e.prototype.props)}}}else{try{throw Error()}catch(g){u=g}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(g){if(g&&u&&typeof g.stack=="string")return[g.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var h=`
`+l[i].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=i&&0<=s);break}}}finally{em=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?aa(n):""}function DA(e,t){switch(e.tag){case 26:case 27:case 5:return aa(e.type);case 16:return aa("Lazy");case 13:return e.child!==t&&t!==null?aa("Suspense Fallback"):aa("Suspense");case 19:return aa("SuspenseList");case 0:case 15:return nm(e.type,!1);case 11:return nm(e.type.render,!1);case 1:return nm(e.type,!0);case 31:return aa("Activity");case 30:return aa("ViewTransition");default:return""}}function Ay(e){try{var t="",n=null;do t+=DA(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Vm=Object.prototype.hasOwnProperty,Xg=Qe.unstable_scheduleCallback,im=Qe.unstable_cancelCallback,UA=Qe.unstable_shouldYield,LA=Qe.unstable_requestPaint,oi=Qe.unstable_now,OA=Qe.unstable_getCurrentPriorityLevel,pS=Qe.unstable_ImmediatePriority,mS=Qe.unstable_UserBlockingPriority,_h=Qe.unstable_NormalPriority,IA=Qe.unstable_LowPriority,gS=Qe.unstable_IdlePriority,PA=Qe.log,BA=Qe.unstable_setDisableYieldValue,vc=null,li=null;function ua(e){if(typeof PA=="function"&&BA(e),li&&typeof li.setStrictMode=="function")try{li.setStrictMode(vc,e)}catch{}}var ci=Math.clz32?Math.clz32:HA,FA=Math.log,zA=Math.LN2;function HA(e){return e>>>=0,e===0?32:31-(FA(e)/zA|0)|0}var Nu=256,Du=262144,Uu=4194304;function rr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Xh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=rr(i):(r&=o,r!==0?s=rr(r):n||(n=o&~e,n!==0&&(s=rr(n))))):(o=i&~a,o!==0?s=rr(o):r!==0?s=rr(r):n||(n=i&~e,n!==0&&(s=rr(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function _c(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function vS(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-ci(n),s=1<<i;t|=e[i],n&=~s}return t}function VA(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _S(){var e=Uu;return Uu<<=1,(Uu&62914560)===0&&(Uu=4194304),e}function sm(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yc(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function GA(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var h=31-ci(n),p=1<<h;o[h]=0,l[h]=-1;var u=c[h];if(u!==null)for(c[h]=null,h=0;h<u.length;h++){var f=u[h];f!==null&&(f.lane&=-536870913)}n&=~p}i!==0&&yS(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function yS(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-ci(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function xS(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-ci(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function SS(e,t){var n=t&-t;return n=(n&42)!==0?1:Wg(n),(n&(e.suspendedLanes|t))!==0?0:n}function Wg(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function qg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function bS(){var e=ie.p;return e!==0?e:(e=window.event,e===void 0?32:i1(e.type))}function wy(e,t){var n=ie.p;try{return ie.p=e,t()}finally{ie.p=n}}var Vs=Math.random().toString(36).slice(2),fn="__reactFiber$"+Vs,Yn="__reactProps$"+Vs,Fo="__reactContainer$"+Vs,Cy="__reactEvents$"+Vs,kA="__reactListeners$"+Vs,XA="__reactHandles$"+Vs,Ry="__reactResources$"+Vs,xc="__reactMarker$"+Vs,yh="__reactLoad$"+Vs;function Wh(e){delete e[fn],delete e[Yn],delete e[kA],delete e[XA]}function cr(e){var t;if(t=e[fn])return t;for(var n=e.parentNode;n;){if(t=n[Fo]||n[fn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=qx(e);e!==null;){if(n=e[fn])return n;e=qx(e)}return t}e=n,n=e.parentNode}return null}function zo(e){if(e=e[fn]||e[Fo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Fl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(Q(33))}function mo(e){var t=e[Ry];return t||(t=e[Ry]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function on(e){e[xc]=!0}function MS(e){e[yh]=void 0}var ES=new Set,TS={};function Tr(e,t){Ao(e,t),Ao(e+"Capture",t)}function Ao(e,t){for(TS[e]=t,e=0;e<t.length;e++)ES.add(t[e])}var WA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ny={},Dy={};function qA(e){return Vm.call(Dy,e)?!0:Vm.call(Ny,e)?!1:WA.test(e)?Dy[e]=!0:(Ny[e]=!0,!1)}var $t=!1;function Uy(){var e=$t;return $t=!1,e}function Ku(e,t,n){if(qA(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function Lu(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function Rs(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function ii(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function AS(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function YA(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Gm(e){if(!e._valueTracker){var t=AS(e)?"checked":"value";e._valueTracker=YA(e,t,""+e[t])}}function wS(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=AS(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var ZA=/[\n"\\]/g;function Ai(e){return e.replace(ZA,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function km(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ii(t)):e.value!==""+ii(t)&&(e.value=""+ii(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?am(e,ii(e.value)):am(e,ii(t)):n!=null?am(e,ii(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+ii(o):e.removeAttribute("name")}function CS(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Gm(e);return}n=n!=null?""+ii(n):"",t=t!=null?""+ii(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Gm(e)}function am(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function go(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+ii(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function RS(e,t,n){if(t!=null&&(t=""+ii(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+ii(n):""}function NS(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(Q(92));if(Bl(i)){if(1<i.length)throw Error(Q(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=ii(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Gm(e)}function wo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var JA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ly(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||JA.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function DS(e,t,n){if(t!=null&&typeof t!="object")throw Error(Q(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",$t=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(Ly(e,s,i),$t=!0)}else for(var a in t)t.hasOwnProperty(a)&&Ly(e,a,t[a])}function Yg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var KA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),QA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Qu(e){return QA.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function cs(){}var Xm=null;function Zg(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ao=null,vo=null;function Oy(e){var t=zo(e);if(t&&(e=t.stateNode)){var n=e[Yn]||null;t:switch(e=t.stateNode,t.type){case"input":if(km(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ai(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Yn]||null;if(!s)throw Error(Q(90));km(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&wS(i)}break t;case"textarea":RS(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&go(e,!!n.multiple,t,!1)}}}var rm=!1;function US(e,t,n){if(rm)return e(t,n);rm=!0;try{var i=e(t);return i}finally{if(rm=!1,(ao!==null||vo!==null)&&(rf(),ao&&(t=ao,e=vo,vo=ao=null,Oy(t),e)))for(t=0;t<e.length;t++)Oy(e[t])}}function ec(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Yn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Q(231,t,typeof n));return n}var Is=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Wm=!1;if(Is)try{Kr={},Object.defineProperty(Kr,"passive",{get:function(){Wm=!0}}),window.addEventListener("test",Kr,Kr),window.removeEventListener("test",Kr,Kr)}catch{Wm=!1}var Kr,ha=null,Jg=null,ju=null;function LS(){if(ju)return ju;var e,t=Jg,n=t.length,i,s="value"in ha?ha.value:ha.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return ju=s.slice(e,1<i?1-i:void 0)}function $u(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ou(){return!0}function Iy(){return!1}function In(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ou:Iy,this.isPropagationStopped=Iy,this}return _e(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ou)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ou)},persist:function(){},isPersistent:Ou}),t}var Da={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qh=In(Da),Sc=_e({},Da,{view:0,detail:0}),jA=In(Sc),om,lm,Dl,Yh=_e({},Sc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kg,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Dl&&(Dl&&e.type==="mousemove"?(om=e.screenX-Dl.screenX,lm=e.screenY-Dl.screenY):lm=om=0,Dl=e),om)},movementY:function(e){return"movementY"in e?e.movementY:lm}}),Py=In(Yh),$A=_e({},Yh,{dataTransfer:0}),tw=In($A),ew=_e({},Sc,{relatedTarget:0}),cm=In(ew),nw=_e({},Da,{animationName:0,elapsedTime:0,pseudoElement:0}),iw=In(nw),sw=_e({},Da,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),aw=In(sw),rw=_e({},Da,{data:0}),By=In(rw),ow={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function uw(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=cw[e])?!!t[e]:!1}function Kg(){return uw}var hw=_e({},Sc,{key:function(e){if(e.key){var t=ow[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=$u(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lw[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kg,charCode:function(e){return e.type==="keypress"?$u(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?$u(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),fw=In(hw),dw=_e({},Yh,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fy=In(dw),pw=_e({},Da,{submitter:0}),mw=In(pw),gw=_e({},Sc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kg}),vw=In(gw),_w=_e({},Da,{propertyName:0,elapsedTime:0,pseudoElement:0}),yw=In(_w),xw=_e({},Yh,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Sw=In(xw),bw=_e({},Da,{newState:0,oldState:0,source:0}),Mw=In(bw),Ew=[9,13,27,32],Qg=Is&&"CompositionEvent"in window,Vl=null;Is&&"documentMode"in document&&(Vl=document.documentMode);var Tw=Is&&"TextEvent"in window&&!Vl,OS=Is&&(!Qg||Vl&&8<Vl&&11>=Vl),zy=" ",Hy=!1;function IS(e,t){switch(e){case"keyup":return Ew.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function PS(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ro=!1;function Aw(e,t){switch(e){case"compositionend":return PS(t);case"keypress":return t.which!==32?null:(Hy=!0,zy);case"textInput":return e=t.data,e===zy&&Hy?null:e;default:return null}}function ww(e,t){if(ro)return e==="compositionend"||!Qg&&IS(e,t)?(e=LS(),ju=Jg=ha=null,ro=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return OS&&t.locale!=="ko"?null:t.data;default:return null}}var Cw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vy(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Cw[e.type]:t==="textarea"}function BS(e,t,n,i){ao?vo?vo.push(i):vo=[i]:ao=i,t=Vh(t,"onChange"),0<t.length&&(n=new qh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Gl=null,nc=null;function Rw(e){UM(e,0)}function Zh(e){var t=Fl(e);if(wS(t))return e}function Gy(e,t){if(e==="change")return t}var FS=!1;Is&&(Is?(Pu="oninput"in document,Pu||(um=document.createElement("div"),um.setAttribute("oninput","return;"),Pu=typeof um.oninput=="function"),Iu=Pu):Iu=!1,FS=Iu&&(!document.documentMode||9<document.documentMode));var Iu,Pu,um;function ky(){Gl&&(Gl.detachEvent("onpropertychange",zS),nc=Gl=null)}function zS(e){if(e.propertyName==="value"&&Zh(nc)){var t=[];BS(t,nc,e,Zg(e)),US(Rw,t)}}function Nw(e,t,n){e==="focusin"?(ky(),Gl=t,nc=n,Gl.attachEvent("onpropertychange",zS)):e==="focusout"&&ky()}function Dw(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zh(nc)}function Uw(e,t){if(e==="click")return Zh(t)}function Lw(e,t){if(e==="input"||e==="change")return Zh(t)}function Ow(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var hi=typeof Object.is=="function"?Object.is:Ow;function ic(e,t){if(hi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Vm.call(t,s)||!hi(e[s],t[s]))return!1}return!0}function qm(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Xy(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Wy(e,t){var n=Xy(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Xy(n)}}function HS(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?HS(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function VS(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=qm(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=qm(e.document)}return t}function jg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Iw=Is&&"documentMode"in document&&11>=document.documentMode,oo=null,Ym=null,kl=null,Zm=!1;function qy(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Zm||oo==null||oo!==qm(i)||(i=oo,"selectionStart"in i&&jg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),kl&&ic(kl,i)||(kl=i,i=Vh(Ym,"onSelect"),0<i.length&&(t=new qh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=oo)))}function sr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var lo={animationend:sr("Animation","AnimationEnd"),animationiteration:sr("Animation","AnimationIteration"),animationstart:sr("Animation","AnimationStart"),transitionrun:sr("Transition","TransitionRun"),transitionstart:sr("Transition","TransitionStart"),transitioncancel:sr("Transition","TransitionCancel"),transitionend:sr("Transition","TransitionEnd")},hm={},GS={};Is&&(GS=document.createElement("div").style,"AnimationEvent"in window||(delete lo.animationend.animation,delete lo.animationiteration.animation,delete lo.animationstart.animation),"TransitionEvent"in window||delete lo.transitionend.transition);function Ar(e){if(hm[e])return hm[e];if(!lo[e])return e;var t=lo[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in GS)return hm[e]=t[n];return e}var kS=Ar("animationend"),XS=Ar("animationiteration"),WS=Ar("animationstart"),Pw=Ar("transitionrun"),Bw=Ar("transitionstart"),Fw=Ar("transitioncancel"),qS=Ar("transitionend"),YS=new Map,Jm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Jm.push("scrollEnd");function Hi(e,t){YS.set(e,t),Tr(t,[e])}var zw=0;function Ps(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=zi.identifierPrefix;var n=zw++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function Yy(e){if(e==null||typeof e=="string")return e;var t=null,n=Eo;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function Gs(e,t){return e=Yy(e),t=Yy(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var xh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Mi=[],co=0,$g=0;function Jh(){for(var e=co,t=$g=co=0;t<e;){var n=Mi[t];Mi[t++]=null;var i=Mi[t];Mi[t++]=null;var s=Mi[t];Mi[t++]=null;var a=Mi[t];if(Mi[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&ZS(n,s,a)}}function Kh(e,t,n,i){Mi[co++]=e,Mi[co++]=t,Mi[co++]=n,Mi[co++]=i,$g|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function t0(e,t,n,i){return Kh(e,t,n,i),Sh(e)}function wr(e,t){return Kh(e,null,null,t),Sh(e)}function ZS(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-ci(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function Sh(e){if(50<$l)throw $l=0,ch=null,Error(Q(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var uo={};function Hw(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xn(e,t,n,i){return new Hw(e,t,n,i)}function e0(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ls(e,t){var n=e.alternate;return n===null?(n=Xn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function JS(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function th(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")e0(i)&&(r=1);else if(typeof i=="string")r=fR(e,n,fs.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case Pm:return e=Xn(31,n,t,s),e.elementType=Pm,e.lanes=a,e;case io:return fr(n.children,s,a,t);case fS:r=8,s|=24;break;case Lm:return e=Xn(12,n,t,s|2),e.elementType=Lm,e.lanes=a,e;case Om:return e=Xn(13,n,t,s),e.elementType=Om,e.lanes=a,e;case Im:return e=Xn(19,n,t,s),e.elementType=Im,e.lanes=a,e;case wA:case Bm:return e=s|32,e=Xn(30,n,t,e),e.elementType=Bm,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case ls:r=10;break t;case dS:r=9;break t;case Gg:r=11;break t;case kg:r=14;break t;case oa:r=16,i=null;break t}r=29,n=Error(Q(130,e===null?"null":typeof e,"")),i=null}return t=Xn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function fr(e,t,n,i){return e=Xn(7,e,i,t),e.lanes=n,e}function fm(e,t,n){return e=Xn(6,e,null,t),e.lanes=n,e}function KS(e){var t=Xn(18,null,null,0);return t.stateNode=e,t}function dm(e,t,n){return t=Xn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Zy=new WeakMap;function wi(e,t){if(typeof e=="object"&&e!==null){var n=Zy.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Ay(t)},Zy.set(e,t),t)}return{value:e,source:t,stack:Ay(t)}}var ho=[],fo=0,bh=null,sc=0,Ei=[],Ti=0,Aa=null,us=1,hs="";function Ds(e,t){ho[fo++]=sc,ho[fo++]=bh,bh=e,sc=t}function QS(e,t,n){Ei[Ti++]=us,Ei[Ti++]=hs,Ei[Ti++]=Aa,Aa=e;var i=us;e=hs;var s=32-ci(i)-1;i&=~(1<<s),n+=1;var a=32-ci(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,us=1<<32-ci(t)+s|n<<s|i,hs=a+e}else us=1<<a|n<<s|i,hs=e}function Qh(e){e.return!==null&&(Ds(e,1),QS(e,1,0))}function n0(e){for(;e===bh;)bh=ho[--fo],ho[fo]=null,sc=ho[--fo],ho[fo]=null;for(;e===Aa;)Aa=Ei[--Ti],Ei[Ti]=null,hs=Ei[--Ti],Ei[Ti]=null,us=Ei[--Ti],Ei[Ti]=null}function jS(e,t){Ei[Ti++]=us,Ei[Ti++]=hs,Ei[Ti++]=Aa,us=t.id,hs=t.overflow,Aa=e}var ln=null,Te=null,zt=!1,va=null,Ci=!1,Km=Error(Q(519));function wa(e){var t=Error(Q(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ac(wi(t,e)),Km}function Jy(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[fn]=e,t[Yn]=i,n){case"dialog":kt("cancel",t),kt("close",t);break;case"iframe":case"object":case"embed":kt("load",t);break;case"video":case"audio":for(n=0;n<cc.length;n++)kt(cc[n],t);break;case"source":kt("error",t);break;case"img":case"image":case"link":kt("error",t),kt("load",t);break;case"details":kt("toggle",t);break;case"input":kt("invalid",t),CS(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":kt("invalid",t);break;case"textarea":kt("invalid",t),NS(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||OM(t.textContent,n)?(i.popover!=null&&(kt("beforetoggle",t),kt("toggle",t)),i.onScroll!=null&&kt("scroll",t),i.onScrollEnd!=null&&kt("scrollend",t),i.onClick!=null&&(t.onclick=cs),t=!0):t=!1,t||wa(e,!0)}function Mh(e){for(ln=e.return;ln;)switch(ln.tag){case 5:case 31:case 13:Ci=!1;return;case 27:case 3:Ci=!0;return;default:ln=ln.return}}function Qr(e){if(e!==ln)return!1;if(!zt)return Mh(e),zt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Og(e.type,e.memoizedProps)),n=!n),n&&Te&&wa(e),Mh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(317));Te=Wx(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(317));Te=Wx(e)}else t===27?(t=Te,Ua(e.type)?(e=Fg,Fg=null,Te=e):Te=t):Te=ln?Ri(e.stateNode.nextSibling):null;return!0}function gr(){Te=ln=null,zt=!1}function pm(){var e=va;return e!==null&&(Gn===null?Gn=e:Gn.push.apply(Gn,e),va=null),e}function ac(e){va===null?va=[e]:va.push(e)}var Qm=ms(null),Cr=null,Us=null;function fa(e,t,n){Ae(Qm,t._currentValue),t._currentValue=n}function Os(e){e._currentValue=Qm.current,pn(Qm)}function eh(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function jm(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),eh(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(Q(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),eh(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),eh(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function vr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(Q(387));if(r=r.memoizedProps,r!==null){var o=s.type;hi(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===mh.current){if(r=s.alternate,r===null)throw Error(Q(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Io):e=[Io])}s=s.return}return e!==null&&jm(t,e,n,i),t.flags|=262144,e!==null}function Eh(e){for(e=e.firstContext;e!==null;){if(!hi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function _r(e){Cr=e,Us=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dn(e){return $S(Cr,e)}function Bu(e,t){return Cr===null&&_r(e),$S(e,t)}function $S(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Us===null){if(e===null)throw Error(Q(308));Us=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Us=Us.next=t;return n}var Vw=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Gw=Qe.unstable_scheduleCallback,kw=Qe.unstable_NormalPriority,We={$$typeof:ls,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function i0(){return{controller:new Vw,data:new Map,refCount:0}}function bc(e){e.refCount--,e.refCount===0&&Gw(kw,function(){e.controller.abort()})}function Ky(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var zl=null;function Xw(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Xl=null,$m=0,yr=0,_o=null;function Ww(e,t){if(Xl===null){var n=Xl=[];$m=0,yr=D0(),_o={status:"pending",value:void 0,then:function(i){n.push(i)}}}return $m++,t.then(Qy,Qy),t}function Qy(){if(--$m===0&&(zl=null,Xl!==null)){_o!==null&&(_o.status="fulfilled");var e=Xl;Xl=null,yr=0,_o=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function qw(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var jy=Nt.S;Nt.S=function(e,t){if(vM=oi(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Ww(e,t),zl!==null)for(var n=Uo;n!==null;)Ky(n,zl),n=n.next;if(n=e.types,n!==null){for(var i=Uo;i!==null;)Ky(i,n),i=i.next;if(yr!==0){i=zl,i===null&&(i=zl=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}jy!==null&&jy(e,t)};var dr=ms(null);function s0(){var e=dr.current;return e!==null?e:ve.pooledCache}function nh(e,t){t===null?Ae(dr,dr.current):Ae(dr,t.pool)}function tb(){var e=s0();return e===null?null:{parent:We._currentValue,pool:e}}var Ho=Error(Q(460)),a0=Error(Q(474)),jh=Error(Q(542)),Th={then:function(){}};function $y(e){return e=e.status,e==="fulfilled"||e==="rejected"}function eb(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(cs,cs),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,ex(e),e===void 0&&!("reason"in t)?Error(Q(600)):e;default:if(typeof t.status=="string")t.then(cs,cs);else{if(e=ve,e!==null&&100<e.shellSuspendCounter)throw Error(Q(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,ex(e),e}throw pr=t,Ho}}function or(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(pr=n,Ho):n}}var pr=null;function tx(){if(pr===null)throw Error(Q(459));var e=pr;return pr=null,e}function ex(e){if(e===Ho||e===jh)throw Error(Q(483))}var yo=null,rc=0;function Fu(e){var t=rc;return rc+=1,yo===null&&(yo=[]),eb(yo,e,t)}function sa(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function zu(e,t){throw t.$$typeof===AA?Error(Q(525)):(e=Object.prototype.toString.call(t),Error(Q(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function nb(e){function t(d,v){if(e){var b=d.deletions;b===null?(d.deletions=[v],d.flags|=16):b.push(v)}}function n(d,v){if(!e)return null;for(;v!==null;)t(d,v),v=v.sibling;return null}function i(d){for(var v=new Map;d!==null;)d.key===null?v.set(d.index,d):v.set(d.key,d),d=d.sibling;return v}function s(d,v){return d=Ls(d,v),d.index=0,d.sibling=null,d}function a(d,v,b){return d.index=b,e?(b=d.alternate,b!==null?(b=b.index,b<v?(d.flags|=2,v):b):(d.flags|=134217730,v)):(d.flags|=1048576,v)}function r(d){return e&&d.alternate===null&&(d.flags|=134217730),d}function o(d,v,b,y){return v===null||v.tag!==6?(v=fm(b,d.mode,y),v.return=d,v):(v=s(v,b),v.return=d,v)}function l(d,v,b,y){var E=b.type;return E===io?(d=h(d,v,b.props.children,y,b.key),sa(d,b),d):v!==null&&(v.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===oa&&or(E)===v.type)?(v=s(v,b.props),sa(v,b),v.return=d,v):(v=th(b.type,b.key,b.props,null,d.mode,y),sa(v,b),v.return=d,v)}function c(d,v,b,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==b.containerInfo||v.stateNode.implementation!==b.implementation?(v=dm(b,d.mode,y),v.return=d,v):(v=s(v,b.children||[]),v.return=d,v)}function h(d,v,b,y,E){return v===null||v.tag!==7?(v=fr(b,d.mode,y,E),v.return=d,v):(v=s(v,b),v.return=d,v)}function p(d,v,b){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=fm(""+v,d.mode,b),v.return=d,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ru:return b=th(v.type,v.key,v.props,null,d.mode,b),sa(b,v),b.return=d,b;case Pl:return v=dm(v,d.mode,b),v.return=d,v;case oa:return v=or(v),p(d,v,b)}if(Bl(v)||Nl(v))return v=fr(v,d.mode,b,null),v.return=d,v;if(typeof v.then=="function")return p(d,Fu(v),b);if(v.$$typeof===ls)return p(d,Bu(d,v),b);zu(d,v)}return null}function u(d,v,b,y){var E=v!==null?v.key:null;if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return E!==null?null:o(d,v,""+b,y);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ru:return b.key===E?l(d,v,b,y):null;case Pl:return b.key===E?c(d,v,b,y):null;case oa:return b=or(b),u(d,v,b,y)}if(Bl(b)||Nl(b))return E!==null?null:h(d,v,b,y,null);if(typeof b.then=="function")return u(d,v,Fu(b),y);if(b.$$typeof===ls)return u(d,v,Bu(d,b),y);zu(d,b)}return null}function f(d,v,b,y,E){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return d=d.get(b)||null,o(v,d,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ru:return d=d.get(y.key===null?b:y.key)||null,l(v,d,y,E);case Pl:return d=d.get(y.key===null?b:y.key)||null,c(v,d,y,E);case oa:return y=or(y),f(d,v,b,y,E)}if(Bl(y)||Nl(y))return d=d.get(b)||null,h(v,d,y,E,null);if(typeof y.then=="function")return f(d,v,b,Fu(y),E);if(y.$$typeof===ls)return f(d,v,b,Bu(v,y),E);zu(v,y)}return null}function g(d,v,b,y){for(var E=null,T=null,C=v,S=v=0,A=null;C!==null&&S<b.length;S++){C.index>S?(A=C,C=null):A=C.sibling;var R=u(d,C,b[S],y);if(R===null){C===null&&(C=A);break}e&&C&&R.alternate===null&&t(d,C),v=a(R,v,S),T===null?E=R:T.sibling=R,T=R,C=A}if(S===b.length)return n(d,C),zt&&Ds(d,S),E;if(C===null){for(;S<b.length;S++)C=p(d,b[S],y),C!==null&&(v=a(C,v,S),T===null?E=C:T.sibling=C,T=C);return zt&&Ds(d,S),E}for(C=i(C);S<b.length;S++)A=f(C,d,S,b[S],y),A!==null&&(e&&(R=A.alternate,R!==null&&C.delete(R.key===null?S:R.key)),v=a(A,v,S),T===null?E=A:T.sibling=A,T=A);return e&&C.forEach(function(L){return t(d,L)}),zt&&Ds(d,S),E}function x(d,v,b,y){if(b==null)throw Error(Q(151));for(var E=null,T=null,C=v,S=v=0,A=null,R=b.next();C!==null&&!R.done;S++,R=b.next()){C.index>S?(A=C,C=null):A=C.sibling;var L=u(d,C,R.value,y);if(L===null){C===null&&(C=A);break}e&&C&&L.alternate===null&&t(d,C),v=a(L,v,S),T===null?E=L:T.sibling=L,T=L,C=A}if(R.done)return n(d,C),zt&&Ds(d,S),E;if(C===null){for(;!R.done;S++,R=b.next())R=p(d,R.value,y),R!==null&&(v=a(R,v,S),T===null?E=R:T.sibling=R,T=R);return zt&&Ds(d,S),E}for(C=i(C);!R.done;S++,R=b.next())R=f(C,d,S,R.value,y),R!==null&&(e&&(A=R.alternate,A!==null&&C.delete(A.key===null?S:A.key)),v=a(R,v,S),T===null?E=R:T.sibling=R,T=R);return e&&C.forEach(function(z){return t(d,z)}),zt&&Ds(d,S),E}function m(d,v,b,y){if(typeof b=="object"&&b!==null&&b.type===io&&b.key===null&&b.props.ref===void 0&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case Ru:t:{for(var E=b.key;v!==null;){if(v.key===E){if(E=b.type,E===io){if(v.tag===7){n(d,v.sibling),y=s(v,b.props.children),sa(y,b),y.return=d,d=y;break t}}else if(v.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===oa&&or(E)===v.type){n(d,v.sibling),y=s(v,b.props),sa(y,b),y.return=d,d=y;break t}n(d,v);break}else t(d,v);v=v.sibling}b.type===io?(y=fr(b.props.children,d.mode,y,b.key),sa(y,b),y.return=d,d=y):(y=th(b.type,b.key,b.props,null,d.mode,y),sa(y,b),y.return=d,d=y)}return r(d);case Pl:t:{for(E=b.key;v!==null;){if(v.key===E)if(v.tag===4&&v.stateNode.containerInfo===b.containerInfo&&v.stateNode.implementation===b.implementation){n(d,v.sibling),y=s(v,b.children||[]),y.return=d,d=y;break t}else{n(d,v);break}else t(d,v);v=v.sibling}y=dm(b,d.mode,y),y.return=d,d=y}return r(d);case oa:return b=or(b),m(d,v,b,y)}if(Bl(b))return g(d,v,b,y);if(Nl(b)){if(E=Nl(b),typeof E!="function")throw Error(Q(150));return b=E.call(b),x(d,v,b,y)}if(typeof b.then=="function")return m(d,v,Fu(b),y);if(b.$$typeof===ls)return m(d,v,Bu(d,b),y);zu(d,b)}return typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint"?(b=""+b,v!==null&&v.tag===6?(n(d,v.sibling),y=s(v,b),y.return=d,d=y):(n(d,v),y=fm(b,d.mode,y),y.return=d,d=y),r(d)):n(d,v)}return function(d,v,b,y){try{rc=0;var E=m(d,v,b,y);return yo=null,E}catch(C){if(C===Ho||C===jh)throw C;var T=Xn(29,C,null,d.mode);return T.lanes=y,T.return=d,T}}}var xr=nb(!0),ib=nb(!1),la=!1;function r0(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function tg(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function _a(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ya(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ne&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=Sh(e),ZS(e,null,n),t}return Kh(e,i,t,n),Sh(e)}function Wl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,xS(e,n)}}function mm(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var eg=!1;function ql(){if(eg){var e=_o;if(e!==null)throw e}}function Yl(e,t,n,i){eg=!1;var s=e.updateQueue;la=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==r&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(a!==null){var p=s.baseState;r=0,h=c=l=null,o=a;do{var u=o.lane&-536870913,f=u!==o.lane;if(f?(qt&u)===u:(i&u)===u){u!==0&&u===yr&&(eg=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,x=o;u=t;var m=n;switch(x.tag){case 1:if(g=x.payload,typeof g=="function"){p=g.call(m,p,u);break t}p=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,u=typeof g=="function"?g.call(m,p,u):g,u==null)break t;p=_e({},p,u);break t;case 2:la=!0}}u=o.callback,u!==null&&(e.flags|=64,f&&(e.flags|=8192),f=s.callbacks,f===null?s.callbacks=[u]:f.push(u))}else f={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=f,l=p):h=h.next=f,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;f=o,o=f.next,f.next=null,s.lastBaseUpdate=f,s.shared.pending=null}}while(!0);h===null&&(l=p),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=h,a===null&&(s.shared.lanes=0),Na|=r,e.lanes=r,e.memoizedState=p}}function sb(e,t){if(typeof e!="function")throw Error(Q(191,e));e.call(t)}function ab(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)sb(n[e],t)}var Ca=ms(null),Ah=ms(0);function nx(e,t){e=Hs,Ae(Ah,e),Ae(Ca,t),Hs=e|t.baseLanes}function ng(){Ae(Ah,Hs),Ae(Ca,Ca.current)}function o0(){Hs=Ah.current,pn(Ca),pn(Ah)}var vn=ms(null),Mn=null;function xa(e){var t=e.alternate;Ae(mn,mn.current&1),Ae(vn,e),Mn===null&&(t===null||Ca.current!==null||t.memoizedState!==null)&&(Mn=e)}function ig(e){Ae(mn,mn.current),Ae(vn,e),Mn===null&&(Mn=e)}function rb(e){e.tag===22?(Ae(mn,mn.current),Ae(vn,e),Mn===null&&(Mn=e)):Sa()}function Sa(){Ae(mn,mn.current),Ae(vn,vn.current)}function si(e){pn(vn),Mn===e&&(Mn=null),pn(mn)}var mn=ms(0);function oc(e,t){Ae(vn,vn.current),Ae(mn,t)}function l0(e){pn(mn),pn(vn),Mn===e&&(Mn=null)}function wh(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Bg(n)||I0(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bs=0,Pt=null,me=null,Xe=null,Ch=!1,xo=!1,Sr=!1,Rh=0,lc=0,So=null,Yw=0;function Be(){throw Error(Q(321))}function c0(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!hi(e[n],t[n]))return!1;return!0}function u0(e,t,n,i,s,a){return Bs=a,Pt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Nt.H=e===null||e.memoizedState===null?Bb:Fb,Sr=!1,a=n(i,s),Sr=!1,xo&&(a=lb(t,n,i,s)),ob(e),a}function ob(e){Nt.H=Nh;var t=me!==null&&me.next!==null;if(Bs=0,Xe=me=Pt=null,Ch=!1,lc=0,So=null,t)throw Error(Q(300));e===null||qe||(e=e.dependencies,e!==null&&Eh(e)&&(qe=!0))}function lb(e,t,n,i){Pt=e;var s=0;do{if(xo&&(So=null),lc=0,xo=!1,25<=s)throw Error(Q(301));if(s+=1,Xe=me=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Nt.H=eC,a=t(n,i)}while(xo);return a}function Zw(){var e=Nt.H,t=e.useState()[0];return t=typeof t.then=="function"?Mc(t):t,e=e.useState()[0],(me!==null?me.memoizedState:null)!==e&&(Pt.flags|=1024),t}function h0(){var e=Rh!==0;return Rh=0,e}function f0(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function d0(e){if(Ch){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ch=!1}Bs=0,Xe=me=Pt=null,xo=!1,lc=Rh=0,So=null}function On(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xe===null?Pt.memoizedState=Xe=e:Xe=Xe.next=e,Xe}function Ve(){if(me===null){var e=Pt.alternate;e=e!==null?e.memoizedState:null}else e=me.next;var t=Xe===null?Pt.memoizedState:Xe.next;if(t!==null)Xe=t,me=e;else{if(e===null)throw Pt.alternate===null?Error(Q(467)):Error(Q(310));me=e,e={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},Xe===null?Pt.memoizedState=Xe=e:Xe=Xe.next=e}return Xe}function $h(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Mc(e){var t=lc;return lc+=1,So===null&&(So=[]),e=eb(So,e,t),t=Pt,(Xe===null?t.memoizedState:Xe.next)===null&&(t=t.alternate,Nt.H=t===null||t.memoizedState===null?Bb:Fb),e}function tf(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Mc(e);if(e.$$typeof===RA)return;if(e.$$typeof===ls)return dn(e)}throw Error(Q(438,String(e)))}function p0(e){var t=null,n=Pt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Pt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=$h(),Pt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=CA;return t.index++,n}function Fs(e,t){return typeof t=="function"?t(e):t}function ih(e){var t=Ve();return m0(t,me,e)}function m0(e,t,n){var i=e.queue;if(i===null)throw Error(Q(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,h=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(qt&p)===p:(Bs&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===yr&&(h=!0);else if((Bs&u)===u){c=c.next,u===yr&&(h=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=a):l=l.next=p,Pt.lanes|=u,Na|=u;p=c.action,Sr&&n(a,p),a=c.hasEagerState?c.eagerState:n(a,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,Pt.lanes|=p,Na|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!hi(a,e.memoizedState)&&(qe=!0,h&&(n=_o,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function gm(e){var t=Ve(),n=t.queue;if(n===null)throw Error(Q(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);hi(a,t.memoizedState)||(qe=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function cb(e,t,n){var i=Pt,s=Ve(),a=zt;if(a){if(n===void 0)throw Error(Q(407));n=n()}else n=t();var r=!hi((me||s).memoizedState,n);if(r&&(s.memoizedState=n,qe=!0),s=s.queue,g0(fb.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||Xe!==null&&(Xe.memoizedState.tag&1)!==0,Co(e?9:8,{destroy:void 0},hb.bind(null,i,s,n,t),null),e){if(i.flags|=2048,ve===null)throw Error(Q(349));a||(Bs&127)!==0||ub(i,t,n)}return n}function ub(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Pt.updateQueue,t===null?(t=$h(),Pt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hb(e,t,n,i){t.value=n,t.getSnapshot=i,db(t)&&pb(e)}function fb(e,t,n){return n(function(){db(t)&&pb(e)})}function db(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!hi(e,n)}catch{return!0}}function pb(e){var t=wr(e,2);t!==null&&Wn(t,e,2)}function sg(e){var t=On();if(typeof e=="function"){var n=e;if(e=n(),Sr){ua(!0);try{n()}finally{ua(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fs,lastRenderedState:e},t}function mb(e,t,n,i){return e.baseState=n,m0(e,me,typeof i=="function"?i:Fs)}function Jw(e,t,n,i,s){if(nf(e))throw Error(Q(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Nt.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,gb(t,a)):(a.next=n.next,t.pending=n.next=a)}}function gb(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Nt.T,r={};r.types=a!==null?a.types:null,Nt.T=r;try{var o=n(s,i),l=Nt.S;l!==null&&l(r,o),ix(e,t,o)}catch(c){ag(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Nt.T=a}}else try{a=n(s,i),ix(e,t,a)}catch(c){ag(e,t,c)}}function ix(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){sx(e,t,i)},function(i){return ag(e,t,i)}):sx(e,t,n)}function sx(e,t,n){t.status="fulfilled",t.value=n,vb(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,gb(e,n)))}function ag(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,vb(t),t=t.next;while(t!==i)}e.action=null}function vb(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function _b(e,t){return t}function ax(e,t){if(zt){var n=ve.formState;if(n!==null){t:{var i=Pt;if(zt){if(Te){e:{for(var s=Te,a=Ci;s.nodeType!==8;){if(!a){s=null;break e}if(s=Ri(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Te=Ri(s.nextSibling),i=s.data==="F!";break t}}wa(i)}i=!1}i&&(t=n[0])}}return n=On(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_b,lastRenderedState:t},n.queue=i,n=Ob.bind(null,Pt,i),i.dispatch=n,i=sg(!1),a=x0.bind(null,Pt,!1,i.queue),i=On(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=Jw.bind(null,Pt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function rx(e){var t=Ve();return yb(t,me,e)}function yb(e,t,n){if(t=m0(e,t,_b)[0],e=ih(Fs)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Mc(t)}catch(r){throw r===Ho?jh:r}else i=t;t=Ve();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Pt.flags|=2048,Co(9,{destroy:void 0},Kw.bind(null,s,n),null)),[i,a,e]}function Kw(e,t){e.action=t}function ox(e){var t=Ve(),n=me;if(n!==null)return yb(t,n,e);Ve(),t=t.memoizedState,n=Ve();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Co(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Pt.updateQueue,t===null&&(t=$h(),Pt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function xb(){return Ve().memoizedState}function sh(e,t,n,i){var s=On();Pt.flags|=e,s.memoizedState=Co(1|t,{destroy:void 0},n,i===void 0?null:i)}function ef(e,t,n,i){var s=Ve();i=i===void 0?null:i;var a=s.memoizedState.inst;me!==null&&i!==null&&c0(i,me.memoizedState.deps)?s.memoizedState=Co(t,a,n,i):(Pt.flags|=e,s.memoizedState=Co(1|t,a,n,i))}function lx(e,t){sh(8390656,8,e,t)}function g0(e,t){ef(2048,8,e,t)}function Qw(e){Pt.flags|=4;var t=Pt.updateQueue;if(t===null)t=$h(),Pt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Sb(e){var t=Ve().memoizedState;return Qw({ref:t,nextImpl:e}),function(){if((ne&2)!==0)throw Error(Q(440));return t.impl.apply(void 0,arguments)}}function bb(e,t){return ef(4,2,e,t)}function Mb(e,t){return ef(4,4,e,t)}function Eb(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Tb(e,t,n){n=n!=null?n.concat([e]):null,ef(4,4,Eb.bind(null,t,e),n)}function v0(){}function Ab(e,t){var n=Ve();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&c0(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function wb(e,t){var n=Ve();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&c0(t,i[1]))return i[0];if(i=e(),Sr){ua(!0);try{e()}finally{ua(!1)}}return n.memoizedState=[i,t],i}function _0(e,t,n){return n===void 0||(Bs&1073741824)!==0&&(qt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=yM(),Pt.lanes|=e,Na|=e,n)}function Cb(e,t,n,i){return hi(n,t)?n:Ca.current!==null?(e=_0(e,n,i),hi(e,t)||(qe=!0),e):(Bs&106)===0||(Bs&1073741824)!==0&&(qt&261930)===0?(qe=!0,e.memoizedState=n):(e=yM(),Pt.lanes|=e,Na|=e,t)}function Rb(e,t,n,i,s){var a=ie.p;ie.p=a!==0&&8>a?a:8;var r=Nt.T,o={};o.types=r!==null?r.types:null,Nt.T=o,x0(e,!1,t,n);try{var l=s(),c=Nt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var h=qw(l,i);Zl(e,t,h,ui(e))}else Zl(e,t,i,ui(e))}catch(p){Zl(e,t,{then:function(){},status:"rejected",reason:p},ui())}finally{ie.p=a,r!==null&&o.types!==null&&(r.types=o.types),Nt.T=r}}function jw(){}function rg(e,t,n,i){if(e.tag!==5)throw Error(Q(476));var s=Nb(e).queue;Rb(e,s,t,hr,n===null?jw:function(){return Db(e),n(i)})}function Nb(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:hr,baseState:hr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fs,lastRenderedState:hr},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Db(e){var t=Nb(e);t.next===null&&(t=e.alternate.memoizedState),Zl(e,t.next.queue,{},ui())}function y0(){return dn(Io)}function Ub(){return Ve().memoizedState}function Lb(){return Ve().memoizedState}function $w(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ui();e=_a(n);var i=ya(t,e,n);i!==null&&(Wn(i,t,n),Wl(i,t,n)),t={cache:i0()},e.payload=t;return}t=t.return}}function tC(e,t,n){var i=ui();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},nf(e)?Ib(t,n):(n=t0(e,t,n,i),n!==null&&(Wn(n,e,i),Pb(n,t,i)))}function Ob(e,t,n){var i=ui();Zl(e,t,n,i)}function Zl(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(nf(e))Ib(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,hi(o,r))return Kh(e,t,s,0),ve===null&&Jh(),!1}catch{}if(n=t0(e,t,s,i),n!==null)return Wn(n,e,i),Pb(n,t,i),!0}return!1}function x0(e,t,n,i){if(i={lane:2,revertLane:D0(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},nf(e)){if(t)throw Error(Q(479))}else t=t0(e,n,i,2),t!==null&&Wn(t,e,2)}function nf(e){var t=e.alternate;return e===Pt||t!==null&&t===Pt}function Ib(e,t){xo=Ch=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Pb(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,xS(e,n)}}var Nh={readContext:dn,use:tf,useCallback:Be,useContext:Be,useEffect:Be,useImperativeHandle:Be,useLayoutEffect:Be,useInsertionEffect:Be,useMemo:Be,useReducer:Be,useRef:Be,useState:Be,useDebugValue:Be,useDeferredValue:Be,useTransition:Be,useSyncExternalStore:Be,useId:Be,useHostTransitionStatus:Be,useFormState:Be,useActionState:Be,useOptimistic:Be,useMemoCache:Be,useCacheRefresh:Be,useEffectEvent:Be},Bb={readContext:dn,use:tf,useCallback:function(e,t){return On().memoizedState=[e,t===void 0?null:t],e},useContext:dn,useEffect:lx,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,sh(4194308,4,Eb.bind(null,t,e),n)},useLayoutEffect:function(e,t){return sh(4194308,4,e,t)},useInsertionEffect:function(e,t){sh(4,2,e,t)},useMemo:function(e,t){var n=On();t=t===void 0?null:t;var i=e();if(Sr){ua(!0);try{e()}finally{ua(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=On();if(n!==void 0){var s=n(t);if(Sr){ua(!0);try{n(t)}finally{ua(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=tC.bind(null,Pt,e),[i.memoizedState,e]},useRef:function(e){var t=On();return e={current:e},t.memoizedState=e},useState:function(e){e=sg(e);var t=e.queue,n=Ob.bind(null,Pt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:v0,useDeferredValue:function(e,t){var n=On();return _0(n,e,t)},useTransition:function(){var e=sg(!1);return e=Rb.bind(null,Pt,e.queue,!0,!1),On().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Pt,s=On();if(zt){if(n===void 0)throw Error(Q(407));n=n()}else{if(n=t(),ve===null)throw Error(Q(349));(qt&127)!==0||ub(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,lx(fb.bind(null,i,a,e),[e]),i.flags|=2048,Co(9,{destroy:void 0},hb.bind(null,i,a,n,t),null),n},useId:function(){var e=On(),t=ve.identifierPrefix;if(zt){var n=hs,i=us;n=(i&~(1<<32-ci(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Rh++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Yw++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:y0,useFormState:ax,useActionState:ax,useOptimistic:function(e){var t=On();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=x0.bind(null,Pt,!0,n),n.dispatch=t,[e,t]},useMemoCache:p0,useCacheRefresh:function(){return On().memoizedState=$w.bind(null,Pt)},useEffectEvent:function(e){var t=On(),n={impl:e};return t.memoizedState=n,function(){if((ne&2)!==0)throw Error(Q(440));return n.impl.apply(void 0,arguments)}}},Fb={readContext:dn,use:tf,useCallback:Ab,useContext:dn,useEffect:g0,useImperativeHandle:Tb,useInsertionEffect:bb,useLayoutEffect:Mb,useMemo:wb,useReducer:ih,useRef:xb,useState:function(){return ih(Fs)},useDebugValue:v0,useDeferredValue:function(e,t){var n=Ve();return Cb(n,me.memoizedState,e,t)},useTransition:function(){var e=ih(Fs)[0],t=Ve().memoizedState;return[typeof e=="boolean"?e:Mc(e),t]},useSyncExternalStore:cb,useId:Ub,useHostTransitionStatus:y0,useFormState:rx,useActionState:rx,useOptimistic:function(e,t){var n=Ve();return mb(n,me,e,t)},useMemoCache:p0,useCacheRefresh:Lb,useEffectEvent:Sb},eC={readContext:dn,use:tf,useCallback:Ab,useContext:dn,useEffect:g0,useImperativeHandle:Tb,useInsertionEffect:bb,useLayoutEffect:Mb,useMemo:wb,useReducer:gm,useRef:xb,useState:function(){return gm(Fs)},useDebugValue:v0,useDeferredValue:function(e,t){var n=Ve();return me===null?_0(n,e,t):Cb(n,me.memoizedState,e,t)},useTransition:function(){var e=gm(Fs)[0],t=Ve().memoizedState;return[typeof e=="boolean"?e:Mc(e),t]},useSyncExternalStore:cb,useId:Ub,useHostTransitionStatus:y0,useFormState:ox,useActionState:ox,useOptimistic:function(e,t){var n=Ve();return me!==null?mb(n,me,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:p0,useCacheRefresh:Lb,useEffectEvent:Sb};function vm(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:_e({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var og={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=ui(),s=_a(i);s.payload=t,n!=null&&(s.callback=n),t=ya(e,s,i),t!==null&&(Wn(t,e,i),Wl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=ui(),s=_a(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=ya(e,s,i),t!==null&&(Wn(t,e,i),Wl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ui(),i=_a(n);i.tag=2,t!=null&&(i.callback=t),t=ya(e,i,n),t!==null&&(Wn(t,e,n),Wl(t,e,n))}};function cx(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!ic(n,i)||!ic(s,a):!0}function ux(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&og.enqueueReplaceState(t,t.state,null)}function br(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=_e({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function zb(e){xh(e)}function Hb(e){console.error(e)}function Vb(e){xh(e)}function Dh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function hx(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function lg(e,t,n){return n=_a(n),n.tag=3,n.payload={element:null},n.callback=function(){Dh(e,t)},n}function Gb(e){return e=_a(e),e.tag=3,e}function kb(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){hx(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){hx(t,n,i),typeof s!="function"&&(ba===null?ba=new Set([this]):ba.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function nC(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&vr(t,n,s,!0),n=vn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Mn===null?zh():n.alternate===null&&Fe===0&&(Fe=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===Th?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Em(e,i,s)),!1;case 22:return n.flags|=65536,i===Th?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Em(e,i,s)),!1}throw Error(Q(435,n.tag))}return Em(e,i,s),zh(),!1}if(zt)return t=vn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==Km&&(e=Error(Q(422),{cause:i}),ac(wi(e,n)))):(i!==Km&&(t=Error(Q(423),{cause:i}),ac(wi(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=wi(i,n),s=lg(e.stateNode,i,s),mm(e,s),Fe!==4&&(Fe=2)),!1;var a=Error(Q(520),{cause:i});if(a=wi(a,n),jl===null?jl=[a]:jl.push(a),Fe!==4&&(Fe=2),t===null)return!0;i=wi(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=lg(n.stateNode,i,e),mm(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(ba===null||!ba.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=Gb(s),kb(s,e,n,i),mm(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var S0=Error(Q(461)),qe=!1;function Je(e,t,n,i){t.child=e===null?ib(t,null,n,i):xr(t,e.child,n,i)}function fx(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return _r(t),i=u0(e,t,n,r,a,s),o=h0(),e!==null&&!qe?(f0(e,t,s),zs(e,t,s)):(zt&&o&&Qh(t),t.flags|=1,Je(e,t,i,s),t.child)}function dx(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!e0(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Xb(e,t,a,i,s)):(e=th(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!M0(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:ic,n(r,i)&&e.ref===t.ref)return zs(e,t,s)}return t.flags|=1,e=Ls(a,i),e.ref=t.ref,e.return=t,t.child=e}function Xb(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(ic(a,i)&&e.ref===t.ref)if(qe=!1,t.pendingProps=i=a,M0(e,s))(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,zs(e,t,s)}return cg(e,t,n,i,s)}function Wb(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return px(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&nh(t,a!==null?a.cachePool:null),a!==null?nx(t,a):ng(),rb(t);else return i=t.lanes=536870912,px(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(nh(t,a.cachePool),nx(t,a),Sa(),t.memoizedState=null):(e!==null&&nh(t,null),ng(),Sa());return Je(e,t,s,n),t.child}function Jl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function px(e,t,n,i,s){var a=s0();return a=a===null?null:{parent:We._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&nh(t,null),ng(),rb(t),e!==null&&vr(e,t,i,!0),t.childLanes=s,null}function ah(e,t){return t=sf({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function mx(e,t,n){return xr(t,e.child,null,n),e=ah(t,t.pendingProps),e.flags|=2,si(t),t.memoizedState=null,e}function iC(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(zt){if(i.mode==="hidden")return e=ah(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Jl(null,e);if(ig(t),(e=Te)?(e=WM(e,Ci),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:us,overflow:hs}:null,retryLane:536870912,hydrationErrors:null},n=KS(e),n.return=t,t.child=n,ln=t,Te=null)):e=null,e===null)throw wa(t);return t.lanes=536870912,null}return ah(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(ig(t),s)if(t.flags&256)t.flags&=-257,t=mx(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(Q(558));else if(qe||vr(e,t,n,!1),s=(n&e.childLanes)!==0,qe||s){if(Ca.current===null){if(i=ve,i!==null&&(r=SS(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,wr(e,r),Wn(i,e,r),S0;zh()}t=mx(e,t,n)}else e=a.treeContext,Te=Ri(r.nextSibling),ln=t,zt=!0,va=null,Ci=!1,e!==null&&jS(t,e),t=ah(t,i),t.flags|=134221824;return t}return e=Ls(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function $r(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(Q(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function cg(e,t,n,i,s){return _r(t),n=u0(e,t,n,i,void 0,s),i=h0(),e!==null&&!qe?(f0(e,t,s),zs(e,t,s)):(zt&&i&&Qh(t),t.flags|=1,Je(e,t,n,s),t.child)}function gx(e,t,n,i,s,a){return _r(t),t.updateQueue=null,n=lb(t,i,n,s),ob(e),i=h0(),e!==null&&!qe?(f0(e,t,a),zs(e,t,a)):(zt&&i&&Qh(t),t.flags|=1,Je(e,t,n,a),t.child)}function vx(e,t,n,i,s){if(_r(t),t.stateNode===null){var a=uo,r=n.contextType;typeof r=="object"&&r!==null&&(a=dn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=og,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},r0(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?dn(r):uo,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(vm(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&og.enqueueReplaceState(a,a.state,null),Yl(t,i,a,s),ql(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=br(n,o);a.props=l;var c=a.context,h=n.contextType;r=uo,typeof h=="object"&&h!==null&&(r=dn(h));var p=n.getDerivedStateFromProps;h=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&ux(t,a,i,r),la=!1;var u=t.memoizedState;a.state=u,Yl(t,i,a,s),ql(),c=t.memoizedState,o||u!==c||la?(typeof p=="function"&&(vm(t,n,p,i),c=t.memoizedState),(l=la||cx(t,n,l,i,u,c,r))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,tg(e,t),r=t.memoizedProps,h=br(n,r),a.props=h,p=t.pendingProps,u=a.context,c=n.contextType,l=uo,typeof c=="object"&&c!==null&&(l=dn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||u!==l)&&ux(t,a,i,l),la=!1,u=t.memoizedState,a.state=u,Yl(t,i,a,s),ql();var f=t.memoizedState;r!==p||u!==f||la||e!==null&&e.dependencies!==null&&Eh(e.dependencies)?(typeof o=="function"&&(vm(t,n,o,i),f=t.memoizedState),(h=la||cx(t,n,h,i,u,f,l)||e!==null&&e.dependencies!==null&&Eh(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,f,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,f,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=f),a.props=i,a.state=f,a.context=l,i=h):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,$r(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=xr(t,e.child,null,s),t.child=xr(t,null,n,s)):Je(e,t,n,s),t.memoizedState=a.state,e=t.child):e=zs(e,t,s),e}function _x(e,t,n,i){return gr(),t.flags|=256,Je(e,t,n,i),t.child}var ug={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function hg(e){return{baseLanes:e,cachePool:tb()}}function fg(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=ri),e}function qb(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(mn.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(zt){if(s?xa(t):Sa(),(e=Te)?(e=WM(e,Ci),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:us,overflow:hs}:null,retryLane:536870912,hydrationErrors:null},n=KS(e),n.return=t,t.child=n,ln=t,Te=null)):e=null,e===null)throw wa(t);return I0(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?(Sa(),s=t.mode,a=sf({mode:"hidden",children:a},s),i=fr(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=hg(n),i.childLanes=fg(e,r,n),t.memoizedState=ug,Jl(null,i)):(xa(t),b0(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return sC(e,t,a,r,i,l,o,n)}return s?(Sa(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=Ls(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=Ls(l,s):(s=fr(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,Jl(null,i),i=t.child,s=e.child.memoizedState,s===null?s=hg(n):(a=s.cachePool,a!==null?(o=We._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=tb(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=fg(e,r,n),t.memoizedState=ug,Jl(e.child,i)):(xa(t),n=e.child,e=n.sibling,n=Ls(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function b0(e,t){return t=sf({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function sf(e,t){return e=Xn(22,e,null,t),e.lanes=0,e}function Hu(e,t,n){return xr(t,e.child,null,n),e=b0(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function sC(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(xa(t),t.flags&=-257,Hu(e,t,o)):t.memoizedState!==null?(Sa(),t.child=e.child,t.flags|=128,null):(Sa(),a=s.fallback,r=t.mode,s=sf({mode:"visible",children:s.children},r),a=fr(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,xr(t,e.child,null,o),s=t.child,s.memoizedState=hg(o),s.childLanes=fg(e,i,o),t.memoizedState=ug,Jl(null,s));if(xa(t),I0(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(Q(419)),s.stack="",s.digest=i,ac({value:s,source:null,stack:null})),Hu(e,t,o)}if(qe||vr(e,t,o,!1),i=(o&e.childLanes)!==0,qe||i){if(Ca.current!==null)return Hu(e,t,o);if(i=ve,i!==null&&(s=SS(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,wr(e,s),Wn(i,e,s),S0;return Bg(a)||zh(),Hu(e,t,o)}return Bg(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Te=Ri(a.nextSibling),ln=t,zt=!0,va=null,Ci=!1,e!==null&&jS(t,e),t=b0(t,s.children),t.flags|=134221824,t)}function yx(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),eh(e.return,t,n)}function xx(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&wh(n)===null&&(t=e),e=e.sibling}return t}function Vu(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function _m(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function dg(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=mn.current;if(t.flags&128)return oc(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,oc(t,r),s==="backwards"&&e!==null?(_m(e),Je(e,t,i,n),_m(e)):Je(e,t,i,n),i=zt?sc:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&yx(e,n,t);else if(e.tag===19)yx(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=xx(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,_m(t)),Vu(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&wh(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Vu(t,!0,n,null,a,i);break;case"together":Vu(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=xx(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Vu(t,!1,s,n,a,i)}return t.child}function Sx(e,t,n){var i=t.pendingProps;return fa(t,t.type,i.value),Je(e,t,i.children,n),t.child}function zs(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Na|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(vr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(Q(153));if(t.child!==null){for(e=t.child,n=Ls(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ls(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function M0(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Eh(e)))}function aC(e,t,n){switch(t.tag){case 3:gh(t,t.stateNode.containerInfo),fa(t,We,e.memoizedState.cache),gr();break;case 27:case 5:Hm(t);break;case 4:gh(t,t.stateNode.containerInfo);break;case 10:fa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,ig(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return xa(t),t.flags|=128,null;i=vr(e,t,n,!1);var s=t.child.childLanes;return i||(n&s)!==0?qb(e,t,n):(xa(t),e=zs(e,t,n),e!==null?e.sibling:null)}xa(t);break;case 19:if(t.flags&128)return dg(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(vr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return dg(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),oc(t,mn.current),i)break;return null;case 22:return t.lanes=0,Wb(e,t,n,t.pendingProps);case 24:fa(t,We,e.memoizedState.cache)}return zs(e,t,n)}function Yb(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)qe=!0;else{if(!M0(e,n)&&(t.flags&128)===0)return qe=!1,aC(e,t,n);qe=(e.flags&131072)!==0}else qe=!1,zt&&(t.flags&1048576)!==0&&QS(t,sc,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=or(t.elementType),t.type=e,typeof e=="function")e0(e)?(i=br(e,i),t.tag=1,t=vx(null,t,e,i,n)):(t.tag=0,t=cg(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Gg){t.tag=11,t=fx(null,t,e,i,n);break t}else if(s===kg){t.tag=14,t=dx(null,t,e,i,n);break t}else if(s===ls){t.tag=10,t.type=e,t=Sx(null,t,n);break t}}throw t=Fm(e)||e,Error(Q(306,t,""))}}return t;case 0:return cg(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=br(i,t.pendingProps),vx(e,t,i,s,n);case 3:t:{if(gh(t,t.stateNode.containerInfo),e===null)throw Error(Q(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,tg(e,t),Yl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,fa(t,We,i),i!==a.cache&&jm(t,[We],n,!0),ql(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=_x(e,t,i,n);break t}else if(i!==s){s=wi(Error(Q(424)),t),ac(s),t=_x(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Te=Ri(e.firstChild),ln=t,zt=!0,va=null,Ci=!0,n=ib(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(gr(),i===s){t=zs(e,t,n);break t}Je(e,t,i,n)}t=t.child}return t;case 26:return $r(e,t),e===null?(n=Zx(t.type,null,t.pendingProps,null))?t.memoizedState=n:zt||(t.stateNode=PM(t.type,t.pendingProps,ga.current,t)):t.memoizedState=Zx(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Hm(t),e===null&&zt&&(i=t.stateNode=qM(t.type,t.pendingProps,ga.current),ln=t,Ci=!0,s=Te,Ua(t.type)?(Fg=s,Te=Ri(i.firstChild)):Te=s),Je(e,t,t.pendingProps.children,n),$r(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&zt&&((s=i=Te)&&(i=QC(i,t.type,t.pendingProps,Ci),i!==null?(t.stateNode=i,ln=t,Te=Ri(i.firstChild),Ci=!1,s=!0):s=!1),s||wa(t)),Hm(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Og(s,a)?i=null:r!==null&&Og(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=u0(e,t,Zw,null,null,n),Io._currentValue=s),$r(e,t),Je(e,t,i,n),t.child;case 6:return e===null&&zt&&((e=n=Te)&&(n=jC(n,t.pendingProps,Ci),n!==null?(t.stateNode=n,ln=t,Te=null,e=!0):e=!1),e||wa(t)),null;case 13:return qb(e,t,n);case 4:return gh(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=xr(t,null,i,n):Je(e,t,i,n),t.child;case 11:return fx(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,$r(e,t),Je(e,t,i,n),t.child;case 8:return Je(e,t,t.pendingProps.children,n),t.child;case 12:return Je(e,t,t.pendingProps.children,n),t.child;case 10:return Sx(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,_r(t),s=dn(s),i=i(s),t.flags|=1,Je(e,t,i,n),t.child;case 14:return dx(e,t,t.type,t.pendingProps,n);case 15:return Xb(e,t,t.type,t.pendingProps,n);case 19:return dg(e,t,n);case 31:return iC(e,t,n);case 22:return Wb(e,t,n,t.pendingProps);case 24:return _r(t),i=dn(We),e===null?(s=s0(),s===null&&(s=ve,a=i0(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},r0(t),fa(t,We,s)):((e.lanes&n)!==0&&(tg(e,t),Yl(t,null,null,n),ql()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),fa(t,We,i)):(i=a.cache,fa(t,We,i),i!==s.cache&&jm(t,[We],n,!0))),Je(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:zt&&Qh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:$r(e,t),Je(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(Q(156,t.tag))}function Ns(e){e.flags|=4}function ym(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?Qx(t,i):Qx(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(bM())e.flags|=8192;else throw pr=Th,a0}else e.flags&=-16777217}function bx(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!KM(t))if(bM())e.flags|=8192;else throw pr=Th,a0}function Gu(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?_S():536870912,e.lanes|=t,Ro|=t)}function Ul(e,t){if(!zt)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function rC(e,t,n){var i=t.pendingProps;switch(n0(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Ee(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Os(We),To(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Qr(t)?Ns(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,pm())),Ee(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(Ns(t),a!==null?(Ee(t),bx(t,a)):(Ee(t),ym(t,s,null,i,n))):a?a!==e.memoizedState?(Ns(t),Ee(t),bx(t,a)):(Ee(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Ns(t),Ee(t),ym(t,s,e,i,n)),null;case 27:if(vh(t),n=ga.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Ns(t);else{if(!i){if(t.stateNode===null)throw Error(Q(166));return Ee(t),t.subtreeFlags&=-33554433,null}e=fs.current,Qr(t)?Jy(t,e):(e=qM(s,i,n),t.stateNode=e,Ns(t))}return Ee(t),t.subtreeFlags&=-33554433,null;case 5:if(vh(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Ns(t);else{if(!i){if(t.stateNode===null)throw Error(Q(166));return Ee(t),t.subtreeFlags&=-33554433,null}if(a=fs.current,Qr(t))Jy(t,a);else{var r=hc(ga.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[fn]=t,a[Yn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(gn(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Ns(t)}}return Ee(t),t.subtreeFlags&=-33554433,ym(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Ns(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(Q(166));if(e=ga.current,Qr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=ln,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[fn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||OM(e.nodeValue,n)),e||wa(t,!0)}else e=hc(e).createTextNode(i),e[fn]=t,t.stateNode=e}return Ee(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Qr(t),n!==null){if(e===null){if(!i)throw Error(Q(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(557));e[fn]=t}else gr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),e=!1}else n=pm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(si(t),t):(si(t),null);if((t.flags&128)!==0)throw Error(Q(558))}return Ee(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=Qr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(Q(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(Q(317));s[fn]=t}else gr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),s=!1}else s=pm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(si(t),t):(si(t),null)}return si(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Gu(t,t.updateQueue),Ee(t),null);case 4:return To(),e===null&&U0(t.stateNode.containerInfo),t.flags|=67108864,Ee(t),null;case 10:return Os(t.type),Ee(t),null;case 19:if(l0(t),i=t.memoizedState,i===null)return Ee(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Ul(i,!1);else{if(Fe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=wh(e),a!==null){for(t.flags|=128,Ul(i,!1),e=a.updateQueue,t.updateQueue=e,Gu(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)JS(n,e),n=n.sibling;return oc(t,mn.current&1|2),zt&&Ds(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&oi()>Bh&&(t.flags|=128,s=!0,Ul(i,!1),t.lanes=4194304)}else{if(!s)if(e=wh(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Gu(t,e),Ul(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!zt)return Ee(t),null}else 2*oi()-i.renderingStartTime>Bh&&n!==536870912&&(t.flags|=128,s=!0,Ul(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=oi(),e.sibling=null,a=mn.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||zt?oc(t,a):(n=a,Ae(vn,t),Ae(mn,n),Mn===null&&(Mn=t)),zt&&Ds(t,i.treeForkCount),e}return Ee(t),null;case 22:case 23:return si(t),o0(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),n=t.updateQueue,n!==null&&Gu(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&pn(dr),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Os(We),Ee(t),null;case 25:return null;case 30:return t.flags|=33554432,Ee(t),null}throw Error(Q(156,t.tag))}function oC(e,t){switch(n0(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Os(We),To(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return vh(t),null;case 31:if(t.memoizedState!==null){if(si(t),t.alternate===null)throw Error(Q(340));gr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(si(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Q(340));gr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return l0(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return To(),null;case 10:return Os(t.type),null;case 22:case 23:return si(t),o0(),e!==null&&pn(dr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Os(We),null;case 25:return null;default:return null}}function Zb(e,t){switch(n0(t),t.tag){case 3:Os(We),To();break;case 26:case 27:case 5:vh(t);break;case 4:To();break;case 31:t.memoizedState!==null&&si(t);break;case 13:si(t);break;case 19:l0(t);break;case 10:Os(t.type);break;case 22:case 23:si(t),o0(),e!==null&&pn(dr);break;case 24:Os(We)}}function Ec(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){de(t,t.return,o)}}function Ra(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(h){de(s,l,h)}}}i=i.next}while(i!==a)}}catch(h){de(t,t.return,h)}}function Jb(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{ab(t,n)}catch(i){de(e,e.return,i)}}}function Kb(e,t,n){n.props=br(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){de(e,t,i)}}function rs(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=Ps(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=HM(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new fi(e);qn(e.child,!1,JC,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){de(e,t,o)}}function hn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){de(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){de(e,t,s)}else n.current=null}function Uh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)XM(e.stateNode,t[n])}function Mx(e){for(var t=e.return;t!==null&&(T0(t)&&XM(e.stateNode,t.stateNode),!E0(t));)t=t.return}function Kl(e){for(var t=e.return;t!==null&&(T0(t)&&KC(e.stateNode,t.stateNode),!E0(t));)t=t.return}function E0(e){return e.tag===5||e.tag===3||e.tag===27}function T0(e){return e&&e.tag===7&&e.stateNode!==null}function pg(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){de(e,e.return,s)}}function xm(e,t,n){try{var i=e.stateNode;DC(i,e.type,n,t),i[Yn]=t}catch(s){de(e,e.return,s)}}function Qb(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ua(e.type)||e.tag===4}function Sm(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Qb(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ua(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function mg(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=cs)),Uh(e,i),$t=!0;else if(s!==4&&(s===27&&(Uh(e,i),i=null,Ua(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(mg(e,t,n,i),e=e.sibling;e!==null;)mg(e,t,n,i),e=e.sibling}function Lh(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),Uh(e,i),$t=!0;else if(s!==4&&(s===27&&(Uh(e,i),i=null,Ua(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Lh(e,t,n,i),e=e.sibling;e!==null;)Lh(e,t,n,i),e=e.sibling}function jb(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);gn(t,i,n),t[fn]=e,t[Yn]=n}catch(a){de(e,e.return,a)}}var Oh=!1,ai=null;function Ex(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Oh=!0)}var os=null;function Tx(){var e=os;return os=null,e}var kn=0;function Vo(e,t,n,i,s){return kn=0,$b(e.child,t,n,i,s)}function $b(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Ig(r);i.push(o),o.view&&(a=!0)}else a||Ig(r).view&&(a=!0);Oh=!0,BM(r,kn===0?t:t+"_"+kn,n),kn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||$b(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function ps(e,t){for(;e!==null;)e.tag===5?FM(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||ps(e.child,t)),e=e.sibling}function rh(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(rh(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(Q(544));var n=t.name;t=Gs(t.default,t.share),t!=="none"&&(Vo(e,n,t,null,!1)||ps(e.child,!1))}e=e.sibling}}function gg(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=Ps(i,n),a=Gs(i.default,n.paired?i.share:i.enter);a!=="none"?Vo(e,s,a,null,!1)?(rh(e),n.paired||t||No(e,i.onEnter)):ps(e.child,!1):rh(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)gg(e,t),e=e.sibling;else rh(e)}function vg(e){if(ai!==null&&ai.size!==0){var t=ai;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=Gs(n.default,n.share);if(a!=="none"&&(Vo(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,No(e,n.onShare)):ps(e.child,!1)),t.delete(i),t.size===0)break}}}vg(e)}e=e.sibling}}}function _g(e){if(e.tag===30){var t=e.memoizedProps,n=Ps(t,e.stateNode),i=ai!==null?ai.get(n):void 0,s=Gs(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(Vo(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,ai.delete(n),No(e,t.onShare)):No(e,t.onExit):ps(e.child,!1)),ai!==null&&vg(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)_g(e),e=e.sibling;else ai!==null&&vg(e)}function tM(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Ps(t,e.stateNode);t=Gs(t.default,t.update),e.flags&=-5,t!=="none"&&Vo(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&tM(e);e=e.sibling}}function yg(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,ps(e.child,!1))}yg(e)}e=e.sibling}}function oh(e){if(e.tag===30)e.stateNode.paired=null,ps(e.child,!1),yg(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)oh(e),e=e.sibling;else yg(e)}function eM(e){for(e=e.child;e!==null;)e.tag===30?ps(e.child,!1):(e.subtreeFlags&33554432)!==0&&eM(e),e=e.sibling}function A0(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&kn<a.length){var c=a[kn],h=Ig(l);(c.view||h.view)&&(o=!0);var p;if(p=(e.flags&4)===0)if(h.clip)p=!0;else{p=c.rect;var u=h.rect;p=p.y!==u.y||p.x!==u.x||p.height!==u.height||p.width!==u.width}p&&(e.flags|=4),h.abs?h=!c.abs:(c=c.rect,h=h.rect,h=c.height!==h.height||c.width!==h.width),h&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&BM(l,kn===0?n:n+"_"+kn,s),o&&(e.flags&4)!==0||(os===null&&(os=[]),os.push(l,kn===0?i:i+"_"+kn,t.memoizedProps)),kn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:A0(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function nM(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=Ps(n,i),a=Gs(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(BC)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;kn=0,s=A0(i,o,s,s,a,r,!1),(e.flags&4)!==0&&s&&(t||No(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&nM(e,t);e=e.sibling}}var an=!1,oe=!1,is=!1,bm=!1,Ax=typeof WeakSet=="function"?WeakSet:Set,rn=null,ss=!1,Hl=!1,Ih=!1,xg=!1;function lC(e,t,n){if(e=e.containerInfo,Ug=Po,e=VS(e),jg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,h=0,p=0,u=e,f=null;e:for(;;){for(var g;u!==i||a!==0&&u.nodeType!==3||(l=o+a),u!==r||s!==0&&u.nodeType!==3||(c=o+s),u.nodeType===3&&(o+=u.nodeValue.length),(g=u.firstChild)!==null;)f=u,u=g;for(;;){if(u===e)break e;if(f===i&&++h===a&&(l=o),f===r&&++p===s&&(c=o),(g=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=g}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(Lg={focusedElem:e,selectionRange:i},Po=!1,n=(n&335544064)===n,rn=t,t=n?9270:1024;rn!==null;){if(e=rn,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&_g(i[a]);if(e.alternate===null&&(e.flags&2)!==0)n&&Ex(e),ku(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&_g(i),ku(n);continue}else if(i!==null&&i.memoizedState!==null){n&&Ex(e),ku(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,rn=i):(n&&tM(e),ku(n))}}ai=null}function ku(e){for(;rn!==null;){var t=rn,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((s&1024)!==0&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=br(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){de(t,t.return,o)}}break;case 3:if((s&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)Pg(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":Pg(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=Ps(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=Gs(s.default,s.update),s!=="none"&&Vo(i,n,s,i.memoizedState=[],!0));break;default:if((s&1024)!==0)throw Error(Q(163))}if(i=t.sibling,i!==null){i.return=t.return,rn=i;break}rn=t.return}}function iM(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:as(e,n),i&4&&Ec(5,n);break;case 1:if(as(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){de(n,n.return,r)}else{var s=br(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){de(n,n.return,r)}}i&64&&Jb(n),i&512&&rs(n,n.return);break;case 3:if(as(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{ab(e,t)}catch(r){de(n,n.return,r)}}break;case 27:t===null&&i&4&&jb(n);case 26:case 5:as(e,n),t===null&&i&4&&pg(n),i&512&&rs(n,n.return);break;case 12:as(e,n);break;case 31:as(e,n),i&4&&oM(e,n);break;case 13:as(e,n),i&4&&lM(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=xC.bind(null,n),$C(e,n))));break;case 22:if(i=n.memoizedState!==null||an,!i){var a=t!==null&&t.memoizedState!==null||oe;t=an,s=oe,an=i,(oe=a)&&!s?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),Pi(e,n,i)):as(e,n),an=t,oe=s}break;case 30:as(e,n),i&512&&rs(n,n.return);break;case 7:i&512&&rs(n,n.return);default:as(e,n)}}function Sg(e,t){for(e=e.child;e!==null;)sM(e,t),e=e.sibling}function sM(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){de(e,e.return,l)}bg(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,$t=!0}catch(l){de(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?Gx(o,!0):Gx(e.stateNode,!1)}catch(l){de(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&Sg(e,t);break;default:Sg(e,t)}}function bg(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:sM(n,i);break t;case 22:n.memoizedState===null&&bg(n,i);break t;default:bg(n,i)}}e=e.sibling}}function aM(e){var t=e.alternate;t!==null&&(e.alternate=null,aM(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Wh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var De=null,Vn=!1;function Ii(e,t,n){for(n=n.child;n!==null;)rM(e,t,n),n=n.sibling}function rM(e,t,n){if(li&&typeof li.onCommitFiberUnmount=="function")try{li.onCommitFiberUnmount(vc,n)}catch{}switch(n.tag){case 26:oe||hn(n,t),Ii(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!oe&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:oe||hn(n,t),Kl(n);var i=De,s=Vn;Ua(n.type)&&(De=n.stateNode,Vn=!1),Ii(e,t,n),YM(n.stateNode,n.type,n.memoizedProps),De=i,Vn=s;break;case 5:oe||hn(n,t),Kl(n);case 6:if(n.tag===6&&Kl(n),i=De,s=Vn,De=null,Ii(e,t,n),De=i,Vn=s,De!==null)if(Vn)try{(De.nodeType===9?De.body:De.nodeName==="HTML"?De.ownerDocument.body:De).removeChild(n.stateNode),$t=!0}catch(a){de(n,t,a)}else try{De.removeChild(n.stateNode),$t=!0}catch(a){de(n,t,a)}break;case 18:De!==null&&(Vn?(e=De,Vx(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Bo(e)):Vx(De,n.stateNode));break;case 4:i=De,s=Vn,De=n.stateNode.containerInfo,Vn=!0,Ii(e,t,n),De=i,Vn=s;break;case 0:case 11:case 14:case 15:Ra(2,n,t),oe||Ra(4,n,t),Ii(e,t,n);break;case 1:oe||(hn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Kb(n,t,i)),Ii(e,t,n);break;case 21:Ii(e,t,n);break;case 22:oe=(i=oe)||n.memoizedState!==null,Ii(e,t,n),oe=i;break;case 30:hn(n,t),Ii(e,t,n);break;case 7:oe||hn(n,t),Ii(e,t,n);break;default:Ii(e,t,n)}}function oM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Bo(e)}catch(n){de(t,t.return,n)}}}function lM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Bo(e)}catch(n){de(t,t.return,n)}}function cC(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Ax),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Ax),t;default:throw Error(Q(435,e.tag))}}function Xu(e,t){var n=cC(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=SC.bind(null,e,i);i.then(s,s)}})}function Un(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(Ua(l.type)){De=l.stateNode,Vn=!1;break t}break;case 5:De=l.stateNode,Vn=!1;break t;case 3:case 4:De=l.stateNode.containerInfo,Vn=!0;break t}l=l.return}if(De===null)throw Error(Q(160));rM(r,o,a),De=null,Vn=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)cM(t,e,n),t=t.sibling}var Bi=null;function cM(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}Un(t,e,n),Ln(e),s&4&&(Ra(3,e,e.return),Ec(3,e),Ra(5,e,e.return));break;case 1:Un(t,e,n),Ln(e),s&512&&(oe||i===null||hn(i,i.return)),s&64&&an&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=Bi,Un(t,e,n),Ln(e),s&512&&(oe||i===null||hn(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(an)e.stateNode=PM(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[xc]||i[fn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),gn(i,t,n),i[fn]=e,on(i),t=i;break t;case"link":if(a=Kx("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),gn(i,t,n),s.head.appendChild(i);break;case"meta":if(a=Kx("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),gn(i,t,n),s.head.appendChild(i);break;default:throw Error(Q(468,t))}i[fn]=e,on(i),t=i}e.stateNode=t}else an||zg(a,e.type,e.stateNode);else e.stateNode=Jx(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||oe||t.parentNode.removeChild(t)):s.count--,n===null?an||zg(a,e.type,e.stateNode):Jx(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&xm(e,e.memoizedProps,i.memoizedProps);break;case 27:Un(t,e,n),Ln(e),s&512&&(oe||i===null||hn(i,i.return)),i!==null&&s&4&&xm(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=is,is=!1,Un(t,e,n),is=a,Ln(e),s&512&&(oe||i===null||hn(i,i.return)),e.flags&32){t=e.stateNode;try{wo(t,""),$t=!0}catch(h){de(e,e.return,h)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,xm(e,t,i!==null?i.memoizedProps:t)),s&1024&&(bm=!0);break;case 6:if(Un(t,e,n),Ln(e),s&4){if(e.stateNode===null)throw Error(Q(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,$t=!0}catch(h){de(e,e.return,h)}}break;case 3:if($t=!1,hh=null,a=Bi,Bi=fc(t.containerInfo),Un(t,e,n),Bi=a,Ln(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{Bo(t.containerInfo)}catch(h){de(e,e.return,h)}bm&&(bm=!1,uM(e)),$t=!1;break;case 4:s=is,is=an,i=Uy(),a=Bi,Bi=fc(e.stateNode.containerInfo),Un(t,e,n),Ln(e),Bi=a,$t&&Hl&&(Ih=!0),$t=i,is=s;break;case 12:Un(t,e,n),Ln(e);break;case 31:Un(t,e,n),Ln(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Xu(e,t)));break;case 13:Un(t,e,n),Ln(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(af=oi()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Xu(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=an,l=oe,c=is;an=o||a,is=c||a,oe=l||r,Un(t,e,n),oe=l,is=c,an=o,Ln(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||an||oe||(t=r||oe,n=an,i=oe,an=a||an,oe=t,ra(e,2),an=n,oe=i),!a&&is||Sg(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Xu(e,n))));break;case 19:Un(t,e,n),Ln(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Xu(e,t)));break;case 30:s&512&&(oe||i===null||hn(i,i.return)),s=Uy(),a=Hl,r=(n&335544064)===n,o=e.memoizedProps,Hl=r&&Gs(o.default,o.update)!=="none",Un(t,e,n),Ln(e),r&&i!==null&&$t&&(e.flags|=4),Hl=a,$t=s;break;case 21:break;case 7:s&512&&(oe||i===null||hn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:Un(t,e,n),Ln(e)}}function Ln(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(Qb(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(T0(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(E0(s))break;s=s.return}var r=i;if(n==null)throw Error(Q(160));switch(n.tag){case 27:var o=n.stateNode,l=Sm(e);Lh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(wo(c,""),n.flags&=-33);var h=Sm(e);Lh(e,h,c,r);break;case 3:case 4:var p=n.stateNode.containerInfo,u=Sm(e);mg(e,u,p,r);break;default:throw Error(Q(161))}}catch(f){de(e,e.return,f)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function uM(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;uM(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,Po=!0,t.reset(),Po=!1),e=e.sibling}}function jr(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)hM(t,e),t=t.sibling;else nM(t,!1)}function hM(e,t){var n=e.alternate;if(n===null)gg(e,!1);else switch(e.tag){case 3:if(xg=ss=!1,Tx(),jr(t,e),!ss&&!Ih){if(e=os,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];FM(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),xg=!0}os=null;break;case 5:jr(t,e);break;case 4:i=ss,ss=!1,jr(t,e),ss&&(Ih=!0),ss=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?gg(e,!1):jr(t,e));break;case 30:i=ss,s=Tx(),ss=!1,jr(t,e),ss&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=Ps(a,r),r=Ps(n.memoizedProps,r);var o=Gs(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,kn=0,t=A0(e,n,t,r,o,a,!0),kn!==(a===null?0:a.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(No(e,e.memoizedProps.onUpdate),os=s):s!==null&&(s.push.apply(s,os),os=s),ss=(e.flags&32)!==0?!0:i;break;default:jr(t,e)}}function as(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)iM(e,t.alternate,t),t=t.sibling}function ra(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:Ra(4,n,n.return),ra(n,i);break;case 1:hn(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&Kb(n,n.return,s),ra(n,i);break;case 27:(i&2)!==0&&YM(n.stateNode,n.type,n.memoizedProps);case 5:hn(n,n.return),n.tag!==5&&n.tag!==27||Kl(n),ra(n,i);break;case 6:Kl(n);break;case 26:hn(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||oe||s.parentNode.removeChild(s),ra(n,i);break;case 22:n.memoizedState===null&&ra(n,i);break;case 30:hn(n,n.return),ra(n,i);break;case 7:hn(n,n.return);default:ra(n,i)}e=e.sibling}}function Pi(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:Pi(s,a,n),Ec(4,a);break;case 1:if(Pi(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(h){de(i,i.return,h)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)sb(c[s],l)}catch(h){de(i,i.return,h)}}o&&r&64&&Jb(a),rs(a,a.return);break;case 27:(n&2)!==0&&jb(a);case 5:a.tag!==5&&a.tag!==27||Mx(a),Pi(s,a,n),o&&i===null&&r&4&&pg(a),rs(a,a.return);break;case 6:Mx(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||an||zg(fc(l.ownerDocument),a.type,l),Pi(s,a,n),o&&i===null&&r&4&&pg(a),rs(a,a.return);break;case 12:Pi(s,a,n);break;case 31:Pi(s,a,n),o&&r&4&&oM(s,a);break;case 13:Pi(s,a,n),o&&r&4&&lM(s,a);break;case 22:a.memoizedState===null&&Pi(s,a,n),rs(a,a.return);break;case 30:Pi(s,a,n),rs(a,a.return);break;case 7:rs(a,a.return);default:Pi(s,a,n)}t=t.sibling}}function w0(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&bc(n))}function C0(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&bc(e))}function bi(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)fM(e,t,n,i),t=t.sibling;else s&&eM(t)}function fM(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&oh(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:bi(e,t,n,i),a&2048&&Ec(9,t);break;case 1:bi(e,t,n,i);break;case 3:bi(e,t,n,i),s&&xg&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&bc(a)));break;case 12:if(a&2048){bi(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){de(t,t.return,c)}}else bi(e,t,n,i);break;case 31:bi(e,t,n,i);break;case 13:bi(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&oh(o),r._visibility&2?bi(e,t,n,i):Ql(e,t)):(s&&o!==null&&o.memoizedState!==null&&oh(t),r._visibility&2?bi(e,t,n,i):(r._visibility|=2,to(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&w0(o,t);break;case 24:bi(e,t,n,i),a&2048&&C0(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(ps(a.child,!0),ps(t.child,!0))),bi(e,t,n,i);break;default:bi(e,t,n,i)}}function to(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:to(a,r,o,l,s),Ec(8,r);break;case 23:break;case 22:var h=r.stateNode;r.memoizedState!==null?h._visibility&2?to(a,r,o,l,s):Ql(a,r):(h._visibility|=2,to(a,r,o,l,s)),s&&c&2048&&w0(r.alternate,r);break;case 24:to(a,r,o,l,s),s&&c&2048&&C0(r.alternate,r);break;default:to(a,r,o,l,s)}t=t.sibling}}function Ql(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:Ql(n,i),s&2048&&w0(i.alternate,i);break;case 24:Ql(n,i),s&2048&&C0(i.alternate,i);break;default:Ql(n,i)}t=t.sibling}}var lr=8192;function ar(e,t,n){if(e.subtreeFlags&lr)for(e=e.child;e!==null;)dM(e,t,n),e=e.sibling}function dM(e,t,n){switch(e.tag){case 26:ar(e,t,n),e.flags&lr&&(e.memoizedState!==null?dR(n,Bi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&jx(n,e)));break;case 5:ar(e,t,n),e.flags&lr&&(e=e.stateNode,(t&335544128)===t&&jx(n,e));break;case 3:case 4:var i=Bi;Bi=fc(e.stateNode.containerInfo),ar(e,t,n),Bi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=lr,lr=16777216,ar(e,t,n),lr=i):ar(e,t,n));break;case 30:if((e.flags&lr)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,ai===null&&(ai=new Map),ai.set(i,s)}ar(e,t,n);break;default:ar(e,t,n)}}function pM(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ll(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];rn=i,gM(i,e)}pM(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)mM(e),e=e.sibling}function mM(e){switch(e.tag){case 0:case 11:case 15:Ll(e),e.flags&2048&&Ra(9,e,e.return);break;case 3:Ll(e);break;case 12:Ll(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,lh(e)):Ll(e);break;default:Ll(e)}}function lh(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];rn=i,gM(i,e)}pM(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ra(8,t,t.return),lh(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,lh(t));break;default:lh(t)}e=e.sibling}}function gM(e,t){for(;rn!==null;){var n=rn;switch(n.tag){case 0:case 11:case 15:Ra(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:bc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,rn=i;else t:for(n=e;rn!==null;){i=rn;var s=i.sibling,a=i.return;if(aM(i),i===n){rn=null;break t}if(s!==null){s.return=a,rn=s;break t}rn=a}}}var uC={getCacheForType:function(e){var t=dn(We),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return dn(We).controller.signal}},hC=typeof WeakMap=="function"?WeakMap:Map,ne=0,ve=null,Xt=null,qt=0,he=0,ni=null,da=!1,Go=!1,R0=!1,Hs=0,Fe=0,Na=0,mr=0,Ph=0,ri=0,Ro=0,jl=null,Gn=null,Mg=!1,af=0,vM=0,Bh=1/0,Fh=null,ba=null,Oe=0,zi=null,Mr=null,ds=0,Eg=0,Tg=null,_M=null,bo=null,Mo=null,Eo=null,$l=0,ch=null;function ui(){return(ne&2)!==0&&qt!==0?qt&-qt:Nt.T!==null?D0():bS()}function yM(){if(ri===0)if((qt&536870912)===0||zt){var e=Du;Du<<=1,(Du&3932160)===0&&(Du=262144),ri=e}else ri=536870912;return e=vn.current,e!==null&&(e.flags|=32),ri}function No(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=HM(Ps(e.memoizedProps,n))),Mo===null&&(Mo=[]),Mo.push(t.bind(null,i))}}function Wn(e,t,n){(e===ve&&(he===2||he===9)||e.cancelPendingCommit!==null)&&(Do(e,0),pa(e,qt,ri,!1)),yc(e,n),((ne&2)===0||e!==ve)&&(e===ve&&((ne&2)===0&&(mr|=n),Fe===4&&pa(e,qt,ri,!1)),gs(e))}function xM(e,t,n){if((ne&6)!==0)throw Error(Q(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||_c(e,t),s=i?pC(e,t):Mm(e,t,!0),a=i;do{if(s===0){Go&&!i&&pa(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!fC(n)){s=Mm(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=jl;var l=o.current.memoizedState.isDehydrated;if(l&&(Do(o,r).flags|=256),r=Mm(o,r,!1),r!==2&&r!==6){if(R0&&!l){o.errorRecoveryDisabledLanes|=a,mr|=a,s=4;break t}a=Gn,Gn=s,a!==null&&(Gn===null?Gn=a:Gn.push.apply(Gn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Do(e,0),pa(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(Q(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:pa(i,t,ri,!da);break t;case 2:Gn=null;break;case 3:case 5:break;default:throw Error(Q(329))}if((t&62914560)===t&&(s=af+300-oi(),10<s)){if(pa(i,t,ri,!da),Xh(i,0,!0)!==0)break t;ds=t,i.timeoutHandle=L0(wx.bind(null,i,n,Gn,Fh,Mg,t,ri,mr,Ro,da,a,"Throttled",-0,0),s);break t}wx(i,n,Gn,Fh,Mg,t,ri,mr,Ro,da,a,null,-0,0)}}break}while(!0);gs(e)}function wx(e,t,n,i,s,a,r,o,l,c,h,p,u,f){e.timeoutHandle=-1;var g=t.subtreeFlags,x=(a&335544064)===a;if(p=null,(x||g&8192||(g&16785408)===16785408)&&(p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:cs},ai=null,dM(t,a,p),x&&(g=p,x=e.containerInfo,x=(x.nodeType===9?x:x.ownerDocument).__reactViewTransition,x!=null&&(g.count++,g.waitingForViewTransition=!0,g=dc.bind(g),x.finished.then(g,g))),g=(a&62914560)===a?af-oi():(a&4194048)===a?vM-oi():0,g=pR(p,g),g!==null)){ds=a,e.cancelPendingCommit=g(Rx.bind(null,e,t,a,n,i,s,r,o,l,c,h,p,null,u,f)),pa(e,a,r,!c);return}Rx(e,t,a,n,i,s,r,o,l,c,h,p)}function fC(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!hi(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function pa(e,t,n,i){t=vS(e,t),t&=~Ph,t&=~mr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-ci(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&yS(e,n,t)}function rf(){return(ne&6)===0?(Tc(0,!1),!1):!0}function N0(){if(Xt!==null){if(he===0)var e=Xt.return;else e=Xt,Us=Cr=null,d0(e),yo=null,rc=0,e=Xt;for(;e!==null;)Zb(e.alternate,e),e=e.return;Xt=null}}function Do(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,OC(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ds=0,N0(),ve=e,Xt=n=Ls(e.current,null),qt=t,he=0,ni=null,da=!1,Go=_c(e,t),R0=!1,Ro=ri=Ph=mr=Na=Fe=0,Gn=jl=null,Mg=!1,Hs=vS(e,t),Jh(),n}function SM(e,t){Pt=null,Nt.H=Nh,t===Ho||t===jh?(t=tx(),he=3):t===a0?(t=tx(),he=4):he=t===S0?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ni=t,Xt===null&&(Fe=1,Dh(e,wi(t,e.current)))}function bM(){var e=vn.current;return e===null?!0:(qt&4194048)===qt?Mn===null:(qt&62914560)===qt||(qt&536870912)!==0?e===Mn:!1}function MM(){var e=Nt.H;return Nt.H=Nh,e===null?Nh:e}function EM(){var e=Nt.A;return Nt.A=uC,e}function zh(){Fe=4,da||(qt&4194048)!==qt&&vn.current!==null||(Go=!0),(Na&134217727)===0&&(mr&134217727)===0||ve===null||pa(ve,qt,ri,!1)}function Mm(e,t,n){var i=ne;ne|=2;var s=MM(),a=EM();(ve!==e||qt!==t)&&(Fh=null,Do(e,t)),t=!1;var r=Fe;t:do try{if(he!==0&&Xt!==null){var o=Xt,l=ni;switch(he){case 8:N0(),r=6;break t;case 3:case 2:case 9:case 6:vn.current===null&&(t=!0);var c=he;if(he=0,ni=null,po(e,o,l,c),n&&Go){r=0;break t}break;default:c=he,he=0,ni=null,po(e,o,l,c)}}dC(),r=Fe;break}catch(h){SM(e,h)}while(!0);return t&&e.shellSuspendCounter++,Us=Cr=null,ne=i,Nt.H=s,Nt.A=a,Xt===null&&(ve=null,qt=0,Jh()),r}function dC(){for(;Xt!==null;)TM(Xt)}function pC(e,t){var n=ne;ne|=2;var i=MM(),s=EM();ve!==e||qt!==t?(Fh=null,Bh=oi()+500,Do(e,t)):Go=_c(e,t);t:do try{if(he!==0&&Xt!==null){t=Xt;var a=ni;e:switch(he){case 1:he=0,ni=null,po(e,t,a,1);break;case 2:case 9:if($y(a)){he=0,ni=null,Cx(t);break}t=function(){he!==2&&he!==9||ve!==e||(he=7),gs(e)},a.then(t,t);break t;case 3:he=7;break t;case 4:he=5;break t;case 7:$y(a)?(he=0,ni=null,Cx(t)):(he=0,ni=null,po(e,t,a,7));break;case 5:var r=null;switch(Xt.tag){case 26:r=Xt.memoizedState;case 5:case 27:var o=Xt;if(r?KM(r):o.stateNode.complete){he=0,ni=null;var l=o.sibling;if(l!==null)Xt=l;else{var c=o.return;c!==null?(Xt=c,of(c)):Xt=null}break e}}he=0,ni=null,po(e,t,a,5);break;case 6:he=0,ni=null,po(e,t,a,6);break;case 8:N0(),Fe=6;break t;default:throw Error(Q(462))}}mC();break}catch(h){SM(e,h)}while(!0);return Us=Cr=null,Nt.H=i,Nt.A=s,ne=n,Xt!==null?0:(ve=null,qt=0,Jh(),Fe)}function mC(){for(;Xt!==null&&!UA();)TM(Xt)}function TM(e){var t=Yb(e.alternate,e,Hs);e.memoizedProps=e.pendingProps,t===null?of(e):Xt=t}function Cx(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=gx(n,t,t.pendingProps,t.type,void 0,qt);break;case 11:t=gx(n,t,t.pendingProps,t.type.render,t.ref,qt);break;case 5:d0(t);var i=t;i===ln&&(zt?(Mh(i),i.tag===5&&i.stateNode!=null&&(Te=i.stateNode)):(Mh(i),zt=!0));default:Zb(n,t),t=Xt=JS(t,Hs),t=Yb(n,t,Hs)}e.memoizedProps=e.pendingProps,t===null?of(e):Xt=t}function po(e,t,n,i){Us=Cr=null,d0(t),yo=null,rc=0;var s=t.return;try{if(nC(e,s,t,n,qt)){Fe=1,Dh(e,wi(n,e.current)),Xt=null;return}}catch(a){if(s!==null)throw Xt=s,a;Fe=1,Dh(e,wi(n,e.current)),Xt=null;return}t.flags&32768?(zt||i===1?e=!0:Go||(qt&536870912)!==0?e=!1:(da=e=!0,(i===2||i===9||i===3||i===6)&&(i=vn.current,i!==null&&i.tag===13&&(i.flags|=16384))),AM(t,e)):of(t)}function of(e){var t=e;do{if((t.flags&32768)!==0){AM(t,da);return}e=t.return;var n=rC(t.alternate,t,Hs);if(n!==null){Xt=n;return}if(t=t.sibling,t!==null){Xt=t;return}Xt=t=e}while(t!==null);Fe===0&&(Fe=5)}function AM(e,t){do{var n=oC(e.alternate,e);if(n!==null){n.flags&=32767,Xt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Xt=e;return}Xt=e=n}while(e!==null);Fe=6,Xt=null}function Rx(e,t,n,i,s,a,r,o,l,c,h,p){e.cancelPendingCommit=null;do lf();while(Oe!==0);if((ne&6)!==0)throw Error(Q(327));if(t!==null){if(t===e.current)throw Error(Q(177));e===ve&&(Xt=ve=null,qt=0),Mr=t,zi=e,ds=n,Tg=s,_M=i,gC(e,t,n,r,o,l,p)}}function gC(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(Eg=o,o|=$g,GA(e,n,o,i,s,a),Mo=null,(n&335544064)===n?(Eo=Xw(e),i=10262):(Eo=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,bC(_h,function(){return Rg(),null})):(e.callbackNode=null,e.callbackPriority=0),Oh=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Nt.T,Nt.T=null,s=ie.p,ie.p=2,a=ne,ne|=4;try{lC(e,t,n)}finally{ne=a,ie.p=s,Nt.T=i}}Oe=1,Oh?bo=HC(r,e.containerInfo,Eo,Ag,wg,_C,Cg,Rg,vC,null,null):(Ag(),wg(),Cg())}function vC(e){if(Oe!==0){var t=zi.onRecoverableError;t(e,{componentStack:null})}}function _C(){Oe===3&&(Oe=0,hM(Mr,zi),Oe=4)}function Ag(){if(Oe===1){Oe=0;var e=zi,t=Mr,n=ds,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=Nt.T,Nt.T=null;var s=ie.p;ie.p=2;var a=ne;ne|=4;try{Hl=Ih=!1,cM(t,e,n),n=Lg;var r=VS(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&HS(o.ownerDocument.documentElement,o)){if(l!==null&&jg(o)){var c=l.start,h=l.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var f=u.getSelection(),g=o.textContent.length,x=Math.min(l.start,g),m=l.end===void 0?x:Math.min(l.end,g);!f.extend&&x>m&&(r=m,m=x,x=r);var d=Wy(o,x),v=Wy(o,m);if(d&&v&&(f.rangeCount!==1||f.anchorNode!==d.node||f.anchorOffset!==d.offset||f.focusNode!==v.node||f.focusOffset!==v.offset)){var b=p.createRange();b.setStart(d.node,d.offset),f.removeAllRanges(),x>m?(f.addRange(b),f.extend(v.node,v.offset)):(b.setEnd(v.node,v.offset),f.addRange(b))}}}}for(p=[],f=o;f=f.parentNode;)f.nodeType===1&&p.push({element:f,left:f.scrollLeft,top:f.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var y=p[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}Po=!!Ug,Lg=Ug=null}finally{ne=a,ie.p=s,Nt.T=i}}e.current=t,Oe=2}}function wg(){if(Oe===2){Oe=0;var e=zi,t=Mr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Nt.T,Nt.T=null;var i=ie.p;ie.p=2;var s=ne;ne|=4;try{iM(e,t.alternate,t)}finally{ne=s,ie.p=i,Nt.T=n}}Oe=3}}function Cg(){if(Oe===4||Oe===3){Oe=0;var e=bo;bo=null,LA();var t=zi,n=Mr,i=ds,s=_M,a=(i&335544064)===i?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Oe=5:(Oe=0,Mr=zi=null,wM(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(ba=null),qg(i),n=n.stateNode,li&&typeof li.onCommitFiberRoot=="function")try{li.onCommitFiberRoot(vc,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=Nt.T,a=ie.p,ie.p=2,Nt.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{Nt.T=n,ie.p=a}}if(s=Mo,r=Eo,Eo=null,s!==null&&(Mo=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);(ds&3)!==0&&lf(),gs(t),a=t.pendingLanes,(i&261930)!==0&&(a&42)!==0?t===ch?$l++:($l=0,ch=t):($l=0,ch=null),Tc(0,!1)}}function wM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,bc(t)))}function lf(){return bo!==null&&(bo.skipTransition(),bo=null),Ag(),wg(),Cg(),Rg()}function Rg(){if(Oe!==5)return!1;var e=zi,t=Eg;Eg=0;var n=qg(ds),i=Nt.T,s=ie.p;try{ie.p=32>n?32:n,Nt.T=null,n=Tg,Tg=null;var a=zi,r=ds;if(Oe=0,Mr=zi=null,ds=0,(ne&6)!==0)throw Error(Q(331));var o=ne;if(ne|=4,mM(a.current),fM(a,a.current,r,n),ne=o,Tc(0,!1),li&&typeof li.onPostCommitFiberRoot=="function")try{li.onPostCommitFiberRoot(vc,a)}catch{}return!0}finally{ie.p=s,Nt.T=i,wM(e,t)}}function Nx(e,t,n){t=wi(n,t),t=lg(e.stateNode,t,2),e=ya(e,t,2),e!==null&&(yc(e,2),gs(e))}function de(e,t,n){if(e.tag===3)Nx(e,e,n);else for(;t!==null;){if(t.tag===3){Nx(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ba===null||!ba.has(i))){e=wi(n,e),n=Gb(2),i=ya(t,n,2),i!==null&&(kb(n,i,t,e),yc(i,2),gs(i));break}}t=t.return}}function Em(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new hC;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(R0=!0,s.add(n),e=yC.bind(null,e,t,n),t.then(e,e))}function yC(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ve===e&&(qt&n)===n&&((Fe===4||Fe===3&&(qt&62914560)===qt&&300>oi()-af)&&(ne&2)===0?Do(e,0):Ph|=n,Ro===qt&&(Ro=0)),gs(e)}function CM(e,t){t===0&&(t=_S()),e=wr(e,t),e!==null&&(yc(e,t),gs(e))}function xC(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),CM(e,n)}function SC(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(Q(314))}i!==null&&i.delete(t),CM(e,n)}function bC(e,t){return Xg(e,t)}var Uo=null,eo=null,Ng=!1,Hh=!1,Tm=!1,ma=0;function gs(e){e!==eo&&e.next===null&&(eo===null?Uo=eo=e:eo=eo.next=e),Hh=!0,Ng||(Ng=!0,EC())}function Tc(e,t){if(!Tm&&Hh){Tm=!0;do for(var n=!1,i=Uo;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-ci(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Dx(i,a))}else a=qt,a=Xh(i,i===ve?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||_c(i,a)||(n=!0,Dx(i,a));i=i.next}while(n);Tm=!1}}function MC(){RM()}function RM(){Hh=Ng=!1;var e=0;ma!==0&&LC()&&(e=ma);for(var t=oi(),n=null,i=Uo;i!==null;){var s=i.next,a=NM(i,t);a===0?(i.next=null,n===null?Uo=s:n.next=s,s===null&&(eo=n)):(n=i,(e!==0||(a&3)!==0)&&(Hh=!0)),i=s}Oe!==0&&Oe!==5||Tc(e,!1),ma!==0&&(ma=0)}function NM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-ci(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=VA(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=ve,n=qt,n=Xh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(he===2||he===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&im(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||_c(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&im(i),qg(n)){case 2:case 8:n=mS;break;case 32:n=_h;break;case 268435456:n=gS;break;default:n=_h}return i=DM.bind(null,e),n=Xg(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&im(i),e.callbackPriority=2,e.callbackNode=null,2}function DM(e,t){if(Oe!==0&&Oe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(lf()&&e.callbackNode!==n)return null;var i=qt;return i=Xh(e,e===ve?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(xM(e,i,t),NM(e,oi()),e.callbackNode!=null&&e.callbackNode===n?DM.bind(null,e):null)}function Dx(e,t){if(lf())return null;xM(e,t,!0)}function EC(){IC(function(){(ne&6)!==0?Xg(pS,MC):RM()})}function D0(){if(ma===0){var e=yr;e===0&&(e=Nu,Nu<<=1,(Nu&261888)===0&&(Nu=256)),ma=e}return ma}function Ux(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Qu(e)}function TC(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=Ux((s[Yn]||null).action),r=i.submitter;r&&(t=(t=r[Yn]||null)?Ux(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new qh("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ma!==0){var l=new FormData(s,r);rg(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),rg(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Wu=0;Wu<Jm.length;Wu++)qu=Jm[Wu],Lx=qu.toLowerCase(),Ox=qu[0].toUpperCase()+qu.slice(1),Hi(Lx,"on"+Ox);var qu,Lx,Ox,Wu;Hi(kS,"onAnimationEnd");Hi(XS,"onAnimationIteration");Hi(WS,"onAnimationStart");Hi("dblclick","onDoubleClick");Hi("focusin","onFocus");Hi("focusout","onBlur");Hi(Pw,"onTransitionRun");Hi(Bw,"onTransitionStart");Hi(Fw,"onTransitionCancel");Hi(qS,"onTransitionEnd");Ao("onMouseEnter",["mouseout","mouseover"]);Ao("onMouseLeave",["mouseout","mouseover"]);Ao("onPointerEnter",["pointerout","pointerover"]);Ao("onPointerLeave",["pointerout","pointerover"]);Tr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Tr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Tr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Tr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Tr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Tr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),AC=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cc));function UM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(h){xh(h)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(h){xh(h)}s.currentTarget=null,a=l}}}}function kt(e,t){var n=t[Cy];n===void 0&&(n=t[Cy]=new Set);var i=e+"__bubble";n.has(i)||(LM(t,e,2,!1),n.add(i))}function Am(e,t,n){var i=0;t&&(i|=4),LM(n,e,i,t)}var Yu="_reactListening"+Math.random().toString(36).slice(2);function U0(e){if(!e[Yu]){e[Yu]=!0,ES.forEach(function(n){n!=="selectionchange"&&(AC.has(n)||Am(n,!1,e),Am(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Yu]||(t[Yu]=!0,Am("selectionchange",!1,t))}}function LM(e,t,n,i){switch(i1(t)){case 2:var s=_R;break;case 8:s=yR;break;default:s=z0}n=s.bind(null,t,n,e),s=void 0,!Wm||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function wm(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=cr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}US(function(){var c=a,h=Zg(n),p=[];t:{var u=YS.get(e);if(u!==void 0){var f=qh,g=e;switch(e){case"keypress":if($u(n)===0)break t;case"keydown":case"keyup":f=fw;break;case"focusin":g="focus",f=cm;break;case"focusout":g="blur",f=cm;break;case"beforeblur":case"afterblur":f=cm;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=Py;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=tw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=vw;break;case kS:case XS:case WS:f=iw;break;case qS:f=yw;break;case"scroll":case"scrollend":f=jA;break;case"wheel":f=Sw;break;case"copy":case"cut":case"paste":f=aw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=Fy;break;case"submit":f=mw;break;case"toggle":case"beforetoggle":f=Mw}var x=(t&4)!==0,m=!x&&(e==="scroll"||e==="scrollend"),d=x?u!==null?u+"Capture":null:u;x=[];for(var v=c,b;v!==null;){var y=v;if(b=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||b===null||d===null||(y=ec(v,d),y!=null&&x.push(uc(v,y,b))),m)break;v=v.return}0<x.length&&(u=new f(u,g,null,n,h),p.push({event:u,listeners:x}))}}if((t&7)===0){t:{if(f=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",f&&n!==Xm&&(g=n.relatedTarget||n.fromElement)&&(cr(g)||g[Fo]))break t;(u||f)&&(g=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,u?(f=n.relatedTarget||n.toElement,u=c,f=f?cr(f):null,f!==null&&(m=gc(f),x=f.tag,f!==m||x!==5&&x!==27&&x!==6)&&(f=null)):(u=null,f=c),u!==f&&(x=Py,y="onMouseLeave",d="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(x=Fy,y="onPointerLeave",d="onPointerEnter",v="pointer"),m=u==null?g:Fl(u),b=f==null?g:Fl(f),g=new x(y,v+"leave",u,n,h),g.target=m,g.relatedTarget=b,y=null,cr(h)===c&&(x=new x(d,v+"enter",f,n,h),x.target=b,x.relatedTarget=m,y=x),m=y,x=u&&f?Um(u,f,wC):null,u!==null&&Ix(p,g,u,x,!1),f!==null&&m!==null&&Ix(p,m,f,x,!0)))}t:{if(u=c?Fl(c):window,f=u.nodeName&&u.nodeName.toLowerCase(),f==="select"||f==="input"&&u.type==="file")var E=Gy;else if(Vy(u))if(FS)E=Lw;else{E=Dw;var T=Nw}else f=u.nodeName,!f||f.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Yg(c.elementType)&&(E=Gy):E=Uw;if(E&&(E=E(e,c))){BS(p,E,n,h);break t}T&&T(e,u,c)}switch(T=c?Fl(c):window,e){case"focusin":(Vy(T)||T.contentEditable==="true")&&(oo=T,Ym=c,kl=null);break;case"focusout":kl=Ym=oo=null;break;case"mousedown":Zm=!0;break;case"contextmenu":case"mouseup":case"dragend":Zm=!1,qy(p,n,h);break;case"selectionchange":if(Iw)break;case"keydown":case"keyup":qy(p,n,h)}var C;if(Qg)t:{switch(e){case"compositionstart":var S="onCompositionStart";break t;case"compositionend":S="onCompositionEnd";break t;case"compositionupdate":S="onCompositionUpdate";break t}S=void 0}else ro?IS(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(OS&&n.locale!=="ko"&&(ro||S!=="onCompositionStart"?S==="onCompositionEnd"&&ro&&(C=LS()):(ha=h,Jg="value"in ha?ha.value:ha.textContent,ro=!0)),T=Vh(c,S),0<T.length&&(S=new By(S,e,null,n,h),p.push({event:S,listeners:T}),C?S.data=C:(C=PS(n),C!==null&&(S.data=C)))),(C=Tw?Aw(e,n):ww(e,n))&&(S=Vh(c,"onBeforeInput"),0<S.length&&(T=new By("onBeforeInput","beforeinput",null,n,h),p.push({event:T,listeners:S}),T.data=C)),TC(p,e,c,n,h)}UM(p,t)})}function uc(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Vh(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=ec(e,n),s!=null&&i.unshift(uc(e,s,a)),s=ec(e,t),s!=null&&i.push(uc(e,s,a))),e.tag===3)return i;e=e.return}return[]}function wC(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Ix(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=ec(n,a),c!=null&&r.unshift(uc(n,c,l))):s||(c=ec(n,a),c!=null&&r.push(uc(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var CC=/\r\n?/g,RC=/\u0000|\uFFFD/g;function Px(e){return(typeof e=="string"?e:""+e).replace(CC,`
`).replace(RC,"")}function OM(e,t){return t=Px(t),Px(e)===t}function fe(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||wo(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&wo(e,""+i);else return;break;case"className":Lu(e,"class",i);break;case"tabIndex":Lu(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Lu(e,n,i);break;case"style":DS(e,i,a);return;case"data":if(t!=="object"){Lu(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Qu(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&fe(e,t,"name",s.name,s,null),fe(e,t,"formEncType",s.formEncType,s,null),fe(e,t,"formMethod",s.formMethod,s,null),fe(e,t,"formTarget",s.formTarget,s,null)):(fe(e,t,"encType",s.encType,s,null),fe(e,t,"method",s.method,s,null),fe(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Qu(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=cs);return;case"onScroll":i!=null&&kt("scroll",e);return;case"onScrollEnd":i!=null&&kt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Q(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(Q(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Qu(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":kt("beforetoggle",e),kt("toggle",e),Ku(e,"popover",i);break;case"xlinkActuate":Rs(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Rs(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Rs(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Rs(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Rs(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Rs(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Rs(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Rs(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Rs(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Ku(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=KA.get(n)||n,Ku(e,n,i);else return}$t=!0}function Dg(e,t,n,i,s,a){switch(n){case"style":DS(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Q(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(Q(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")wo(e,i);else if(typeof i=="number"||typeof i=="bigint")wo(e,""+i);else return;break;case"onScroll":i!=null&&kt("scroll",e);return;case"onScrollEnd":i!=null&&kt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=cs);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!TS.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[Yn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}$t=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Ku(e,n,i)}return}$t=!0}function gn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":kt("error",e),kt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Q(137,t));default:fe(e,t,a,r,n,null)}}s&&fe(e,t,"srcSet",n.srcSet,n,null),i&&fe(e,t,"src",n.src,n,null);return;case"input":kt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":s=h;break;case"type":r=h;break;case"checked":l=h;break;case"defaultChecked":c=h;break;case"value":a=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(Q(137,t));break;default:fe(e,t,i,h,n,null)}}CS(e,a,o,l,c,r,s,!1);return;case"select":kt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:fe(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?go(e,!!i,t,!1):n!=null&&go(e,!!i,n,!0);return;case"textarea":kt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(Q(91));break;default:fe(e,t,r,o,n,null)}NS(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":fe(e,t,l,i,n,null));return;case"dialog":kt("beforetoggle",e),kt("toggle",e),kt("cancel",e),kt("close",e);break;case"iframe":case"object":kt("load",e);break;case"video":case"audio":for(i=0;i<cc.length;i++)kt(cc[i],e);break;case"image":kt("error",e),kt("load",e);break;case"details":kt("toggle",e);break;case"embed":case"source":case"link":kt("error",e),kt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(Q(137,t));default:fe(e,t,c,i,n,null)}return;default:if(Yg(t)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&Dg(e,t,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&fe(e,t,o,i,n,null))}var NC={};function DC(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,h=null;for(f in n){var p=n[f];if(n.hasOwnProperty(f)&&p!=null)switch(f){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(f)||fe(e,t,f,null,i,p)}}for(var u in i){var f=i[u];if(p=n[u],i.hasOwnProperty(u)&&(f!=null||p!=null))switch(u){case"type":f!==p&&($t=!0),a=f;break;case"name":f!==p&&($t=!0),s=f;break;case"checked":f!==p&&($t=!0),c=f;break;case"defaultChecked":f!==p&&($t=!0),h=f;break;case"value":f!==p&&($t=!0),r=f;break;case"defaultValue":f!==p&&($t=!0),o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(Q(137,t));break;default:f!==p&&fe(e,t,u,f,i,p)}}km(e,r,o,l,c,h,a,s);return;case"select":f=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":f=l;default:i.hasOwnProperty(a)||fe(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&($t=!0),u=a;break;case"defaultValue":a!==l&&($t=!0),o=a;break;case"multiple":a!==l&&($t=!0),r=a;default:a!==l&&fe(e,t,s,a,i,l)}t=o,n=r,i=f,u!=null?go(e,!!n,u,!1):!!i!=!!n&&(t!=null?go(e,!!n,t,!0):go(e,!!n,n?[]:"",!1));return;case"textarea":f=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:fe(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&($t=!0),u=s;break;case"defaultValue":s!==a&&($t=!0),f=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(Q(91));break;default:s!==a&&fe(e,t,r,s,i,a)}RS(e,u,f);return;case"option":for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g)&&(g==="selected"?e.selected=!1:fe(e,t,g,null,i,u));for(l in i)u=i[l],f=n[l],i.hasOwnProperty(l)&&u!==f&&(u!=null||f!=null)&&(l==="selected"?(u!==f&&($t=!0),e.selected=u&&typeof u!="function"&&typeof u!="symbol"):fe(e,t,l,u,i,f));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in n)u=n[x],n.hasOwnProperty(x)&&u!=null&&!i.hasOwnProperty(x)&&fe(e,t,x,null,i,u);for(c in i)if(u=i[c],f=n[c],i.hasOwnProperty(c)&&u!==f&&(u!=null||f!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(Q(137,t));break;default:fe(e,t,c,u,i,f)}return;default:if(Yg(t)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Dg(e,t,m,void 0,i,u);for(h in i)u=i[h],f=n[h],!i.hasOwnProperty(h)||u===f||u===void 0&&f===void 0||Dg(e,t,h,u,i,f);return}}for(var d in n)u=n[d],n.hasOwnProperty(d)&&u!=null&&!i.hasOwnProperty(d)&&fe(e,t,d,null,i,u);for(p in i)u=i[p],f=n[p],!i.hasOwnProperty(p)||u===f||u==null&&f==null||fe(e,t,p,u,i,f)}function Bx(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function UC(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&Bx(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var h=l.transferSize,p=l.initiatorType;h&&Bx(p)&&(l=l.responseEnd,r+=h*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Ug=null,Lg=null;function hc(e){return e.nodeType===9?e:e.ownerDocument}function Fx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function IM(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function PM(e,t,n,i){return n=hc(n).createElement(e),n[fn]=i,n[Yn]=t,gn(n,e,t),on(n),n}function Og(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cm=null;function LC(){var e=window.event;return e&&e.type==="popstate"?e===Cm?!1:(Cm=e,!0):(Cm=null,!1)}var L0=typeof setTimeout=="function"?setTimeout:void 0,OC=typeof clearTimeout=="function"?clearTimeout:void 0,zx=typeof Promise=="function"?Promise:void 0,Hx=typeof requestAnimationFrame=="function"?requestAnimationFrame:L0,IC=typeof queueMicrotask=="function"?queueMicrotask:typeof zx<"u"?function(e){return zx.resolve(null).then(e).catch(PC)}:L0;function PC(e){setTimeout(function(){throw e})}function Ua(e){return e==="head"}function Vx(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),Bo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Nm(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Nm(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[xc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&Nm(e.ownerDocument.body);n=s}while(n);Bo(t)}function Gx(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function BM(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function FM(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function zM(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Ig(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return zM(t,n,e)}function BC(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return zM(t,n,e)}function FC(e){return e.documentElement.clientHeight}function zC(e){this.addEventListener("load",e),this.addEventListener("error",e)}function HC(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var h=c.startViewTransition({update:function(){var u=c.defaultView,f=u.navigation&&u.navigation.transition,g=c.fonts.status;i();var x=[];if(g==="loaded"&&(FC(c),c.fonts.status==="loading"&&x.push(c.fonts.ready)),g=x.length,e!==null)for(var m=e.suspenseyImages,d=0,v=0;v<m.length;v++){var b=m[v];if(!b.complete){var y=b.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<u.innerHeight&&y.left<u.innerWidth){if(d+=QM(b),d>fh){x.length=g;break}b=new Promise(zC.bind(b)),x.push(b)}}}if(0<x.length)return u=Promise.race([Promise.all(x),new Promise(function(E){return setTimeout(E,500)})]).then(s,s),(f?Promise.allSettled([f.finished,u]):u).then(a,a);if(s(),f)return f.finished.then(a,a);a()},types:n});c.__reactViewTransition=h;var p=[];return h.ready.then(function(){for(var u=c.documentElement.getAnimations({subtree:!0}),f=0;f<u.length;f++){var g=u[f],x=g.effect,m=x.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){p.push(g),g=x.getKeyframes();for(var d=m=void 0,v=!0,b=0;b<g.length;b++){var y=g[b],E=y.width;if(m===void 0)m=E;else if(m!==E){v=!1;break}if(E=y.height,d===void 0)d=E;else if(d!==E){v=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}v&&m!==void 0&&d!==void 0&&(x.setKeyframes(g),v=getComputedStyle(x.target,x.pseudoElement),v.width!==m||v.height!==d)&&(v=g[0],v.width=m,v.height=d,v=g[g.length-1],v.width=m,v.height=d,x.setKeyframes(g))}}r()},function(u){c.__reactViewTransition===h&&(c.__reactViewTransition=null);try{typeof u=="object"&&u!==null&&u.name==="InvalidStateError"&&(u.message==="View transition was skipped because document visibility state is hidden."||u.message==="Skipping view transition because document visibility state has become hidden."||u.message==="Skipping view transition because viewport size changed."||u.message==="Transition was aborted because of invalid state")&&(u=null),u!==null&&l(u)}finally{i(),s(),r()}}),h.finished.finally(function(){for(var u=0;u<p.length;u++)p[u].cancel();c.__reactViewTransition===h&&(c.__reactViewTransition=null),o()}),h}catch{return i(),s(),r(),null}}function ur(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}ur.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:_e({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};ur.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};ur.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function HM(e){return{name:e,group:new ur("group",e),imagePair:new ur("image-pair",e),old:new ur("old",e),new:new ur("new",e)}}function fi(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}fi.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(VM(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=Lo(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),qn(this._fragmentFiber.child,!1,VC,e,o,i)}this._eventListeners=a}};function VC(e,t,n,i){return Ke(e).addEventListener(t,n,i),!1}fi.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=VM(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=Lo(s.optionsOrUseCapture),qn(this._fragmentFiber.child,!1,GC,e,n,s),i.splice(t,1),a!==null&&a()}};function GC(e,t,n,i){return Ke(e).removeEventListener(t,n,i),!1}function Lo(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function kx(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function VM(e,t,n,i){if(e.length===0)return-1;i=kx(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&kx(a.optionsOrUseCapture)===i)return s}return-1}fi.prototype.dispatchEvent=function(e){var t=Er(this._fragmentFiber);if(t===null)return!0;t=Ke(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,Lo(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,Lo(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};fi.prototype.focus=function(e){qn(this._fragmentFiber.child,!0,GM,e,void 0,void 0)};function GM(e,t){return e.tag===6?!1:(e=Ke(e),tR(e,t))}fi.prototype.focusLast=function(e){var t=[];qn(this._fragmentFiber.child,!0,O0,t,void 0,void 0);for(var n=t.length-1;0<=n&&!GM(t[n],e);n--);};function O0(e,t){return t.push(e),!1}fi.prototype.blur=function(){var e=Er(this._fragmentFiber);e!==null&&(e=Ke(e),e=hc(e).activeElement,e!==null&&qn(this._fragmentFiber.child,!1,kC,e,void 0,void 0))};function kC(e,t){return e.tag===6?!1:(e=Ke(e),e===t||e.contains(t)?(t.blur(),!0):!1)}fi.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),qn(this._fragmentFiber.child,!1,XC,e,void 0,void 0)};function XC(e,t){return e.tag===6||(e=Ke(e),t.observe(e)),!1}fi.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),qn(this._fragmentFiber.child,!1,WC,e,void 0,void 0);for(var n=t=0;n<Fi.length;n++){var i=Fi[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Fi[t++]=i}Fi.length=t}};function WC(e,t){return e.tag===6||(e=Ke(e),t.unobserve(e)),!1}var Fi=[],Rm=!1;function qC(e,t,n){Fi.push({fragmentInstance:e,observer:t,instance:n}),Rm||(Rm=!0,eR(function(){Rm=!1;var i=Fi;Fi=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}fi.prototype.getClientRects=function(){var e=[];return qn(this._fragmentFiber.child,!1,YC,e,void 0,void 0),e};function YC(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=Ke(e),t.push.apply(t,e.getClientRects());return!1}fi.prototype.getRootNode=function(e){var t=Er(this._fragmentFiber);return t===null?this:Ke(t).getRootNode(e)};fi.prototype.compareDocumentPosition=function(e){var t=Er(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];qn(this._fragmentFiber.child,!1,O0,n,void 0,void 0);var i=Ke(t);if(n.length===0){if(n=i,by(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=uS(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=Ke(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=Ke(n[0]),s=Ke(n[n.length-1]);var a=by(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||ZC(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function ZC(e,t,n,i,s){var a=cr(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=Er(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=Um(n,a,My),t===null?t=!1:(qn(t,!0,EA,a,n),a=no,no=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=Um(i,a,My),t===null?t=!1:(qn(t,!0,TA,a,i),a=no,Dm=no=null,t=a!==null)),t):!1}function Xx(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}fi.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(Q(566));var t=[];qn(this._fragmentFiber.child,!1,O0,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=uS(this._fragmentFiber);if(i=n?i[1]||i[0]||Er(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=Ke(i),Xx(e,n);return}if(i=Ke(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=Ke(s),Xx(s,n)):Ke(s).scrollIntoView(e),i+=n?-1:1}};function JC(e,t){return e=Ke(e),kM(e,t),!1}function kM(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function XM(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,Lo(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<Fi.length;o++){var l=Fi[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(Fi[r++]=l)}Fi.length=r,a.observe(e)}),kM(e,t))}function KC(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,Lo(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?qC(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Pg(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Pg(n),Wh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function QC(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[xc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=Ri(e.nextSibling),e===null)break}return null}function jC(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ri(e.nextSibling),e===null))return null;return e}function WM(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ri(e.nextSibling),e===null))return null;return e}function Bg(e){return e.data==="$?"||e.data==="$~"}function I0(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function $C(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Ri(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Fg=null;function Wx(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ri(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function qx(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function tR(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function eR(e){Hx(function(){Hx(function(t){return e(t)})})}function qM(e,t,n){switch(t=hc(n),e){case"html":if(e=t.documentElement,!e)throw Error(Q(452));return e;case"head":if(e=t.head,!e)throw Error(Q(453));return e;case"body":if(e=t.body,!e)throw Error(Q(454));return e;default:throw Error(Q(451))}}function YM(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&fe(e,t,i,null,NC,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===cs&&(e.onclick=null),Wh(e)}function Nm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Wh(e)}var Ni=new Map,Yx=new Set;function fc(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var ks=ie.d;ie.d={f:nR,r:iR,D:sR,C:aR,L:rR,m:oR,X:cR,S:lR,M:uR};function nR(){var e=ks.f(),t=rf();return e||t}function iR(e){var t=zo(e);t!==null&&t.tag===5&&t.type==="form"?Db(t):ks.r(e)}var ko=typeof document>"u"?null:document;function ZM(e,t,n){var i=ko;if(i&&typeof t=="string"&&t){var s=Ai(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),Yx.has(s)||(Yx.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),gn(t,"link",e),on(t),i.head.appendChild(t)))}}function sR(e){ks.D(e),ZM("dns-prefetch",e,null)}function aR(e,t){ks.C(e,t),ZM("preconnect",e,t)}function rR(e,t,n){ks.L(e,t,n);var i=ko;if(i&&e&&t){var s='link[rel="preload"][as="'+Ai(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+Ai(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+Ai(n.imageSizes)+'"]')):s+='[href="'+Ai(e)+'"]';var a=s;switch(t){case"style":a=Oo(e);break;case"script":a=Xo(e)}if(!(Ni.has(a)||(e=_e({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Ni.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Ac(a))||t==="script"&&i.querySelector(wc(a))))){var r=i.createElement("link");gn(r,"link",e),t==="style"&&(r[yh]=!0,r.onload=r.onerror=function(){MS(r)}),on(r),i.head.appendChild(r)}}}function oR(e,t){ks.m(e,t);var n=ko;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+Ai(i)+'"][href="'+Ai(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Xo(e)}if(!Ni.has(a)&&(e=_e({rel:"modulepreload",href:e},t),Ni.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(wc(a)))return}i=n.createElement("link"),gn(i,"link",e),on(i),n.head.appendChild(i)}}}function lR(e,t,n){ks.S(e,t,n);var i=ko;if(i&&e){var s=mo(i).hoistableStyles,a=Oo(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ac(a)))o.loading=5;else{e=_e({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Ni.get(a))&&P0(e,n);var l=r=i.createElement("link");on(l),gn(l,"link",e),l._p=new Promise(function(c,h){l.onload=c,l.onerror=h}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,uh(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function cR(e,t){ks.X(e,t);var n=ko;if(n&&e){var i=mo(n).hoistableScripts,s=Xo(e),a=i.get(s);a||(a=n.querySelector(wc(s)),a||(e=_e({src:e,async:!0},t),(t=Ni.get(s))&&B0(e,t),a=n.createElement("script"),on(a),gn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function uR(e,t){ks.M(e,t);var n=ko;if(n&&e){var i=mo(n).hoistableScripts,s=Xo(e),a=i.get(s);a||(a=n.querySelector(wc(s)),a||(e=_e({src:e,async:!0,type:"module"},t),(t=Ni.get(s))&&B0(e,t),a=n.createElement("script"),on(a),gn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function Zx(e,t,n,i){var s=(s=ga.current)?fc(s):null;if(!s)throw Error(Q(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=Oo(n.href),t=mo(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Oo(n.href);var a=mo(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Ac(e)))?a._p||(r.instance=a,r.state.loading=5):(a=Ni.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ni.set(e,a)),hR(s,e,a,r.state))),t&&i===null)throw Error(Q(528,""));return r}if(t&&i!==null)throw Error(Q(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Xo(n),t=mo(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(Q(444,e))}}function Oo(e){return'href="'+Ai(e)+'"'}function Ac(e){return'link[rel="stylesheet"]['+e+"]"}function JM(e){return _e({},e,{"data-precedence":e.precedence,precedence:null})}function hR(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[yh]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[yh]=!0,t.onload=t.onerror=MS.bind(null,t),gn(t,"link",n),on(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Xo(e){return'[src="'+Ai(e)+'"]'}function wc(e){return"script[async]"+e}function Jx(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Ai(n.href)+'"]');if(i)return t.instance=i,on(i),i;var s=_e({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),on(i),gn(i,"style",s),uh(i,n.precedence,e),t.instance=i;case"stylesheet":s=Oo(n.href);var a=e.querySelector(Ac(s));if(a)return t.state.loading|=4,t.instance=a,on(a),a;i=JM(n),(s=Ni.get(s))&&P0(i,s),a=(e.ownerDocument||e).createElement("link"),on(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),gn(a,"link",i),t.state.loading|=4,uh(a,n.precedence,e),t.instance=a;case"script":return a=Xo(n.src),(s=e.querySelector(wc(a)))?(t.instance=s,on(s),s):(i=n,(s=Ni.get(a))&&(i=_e({},n),B0(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),on(s),gn(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(Q(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,uh(i,n.precedence,e));return t.instance}function uh(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function P0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function B0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var hh=null;function Kx(e,t,n){if(hh===null){var i=new Map,s=hh=new Map;s.set(n,i)}else s=hh,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[xc]||a[fn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function zg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function fR(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Qx(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function KM(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function QM(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function jx(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=QM(t),e.suspenseyImages.push(t)),e=mR.bind(e),t.decode().then(e,e))}function dR(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=Oo(i.href),a=t.querySelector(Ac(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=dc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,on(a);return}a=t.ownerDocument||t,i=JM(i),(s=Ni.get(s))&&P0(i,s),a=a.createElement("link"),on(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),gn(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=dc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var fh=0;function pR(e,t){return e.stylesheets&&e.count===0&&dh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&dh(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&fh===0&&(fh=62500*UC());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&dh(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>fh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function jM(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)dh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function dc(){this.count--,jM(this)}function mR(){this.imgCount--,jM(this)}var Gh=null;function dh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Gh=new Map,t.forEach(gR,e),Gh=null,dc.call(e))}function gR(e,t){if(!(t.state.loading&4)){var n=Gh.get(e);if(n)var i=n.get(null);else{n=new Map,Gh.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=dc.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Io={$$typeof:ls,Provider:null,Consumer:null,_currentValue:hr,_currentValue2:hr,_threadCount:0};function vR(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=sm(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=sm(0),this.hiddenUpdates=sm(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function $M(e,t,n,i,s,a,r,o,l,c,h,p){return e=new vR(e,t,n,r,l,c,h,p,o),t=1,a===!0&&(t|=24),a=Xn(3,null,null,t),e.current=a,a.stateNode=e,t=i0(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},r0(a),e}function t1(e){return e?(e=uo,e):uo}function e1(e,t,n,i,s,a){s=t1(s),i.context===null?i.context=s:i.pendingContext=s,i=_a(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=ya(e,i,t),n!==null&&(Wn(n,e,t),Wl(n,e,t))}function $x(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function F0(e,t){$x(e,t),(e=e.alternate)&&$x(e,t)}function n1(e){if(e.tag===13||e.tag===31){var t=wr(e,67108864);t!==null&&Wn(t,e,67108864),F0(e,67108864)}}function tS(e){if(e.tag===13||e.tag===31){var t=ui();t=Wg(t);var n=wr(e,t);n!==null&&Wn(n,e,t),F0(e,t)}}var Po=!0;function _R(e,t,n,i){var s=Nt.T;Nt.T=null;var a=ie.p;try{ie.p=2,z0(e,t,n,i)}finally{ie.p=a,Nt.T=s}}function yR(e,t,n,i){var s=Nt.T;Nt.T=null;var a=ie.p;try{ie.p=8,z0(e,t,n,i)}finally{ie.p=a,Nt.T=s}}function z0(e,t,n,i){if(Po){var s=Hg(i);if(s===null)wm(e,t,i,kh,n),eS(e,i);else if(SR(s,e,t,n,i))i.stopPropagation();else if(eS(e,i),t&4&&-1<xR.indexOf(e)){for(;s!==null;){var a=zo(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=rr(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-ci(r);o.entanglements[1]|=l,r&=~l}gs(a),(ne&6)===0&&(Bh=oi()+500,Tc(0,!1))}}break;case 31:case 13:o=wr(a,2),o!==null&&Wn(o,a,2),rf(),F0(a,2)}if(a=Hg(i),a===null&&wm(e,t,i,kh,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else wm(e,t,i,null,n)}}function Hg(e){return e=Zg(e),H0(e)}var kh=null;function H0(e){if(kh=null,e=cr(e),e!==null){var t=gc(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=oS(t),e!==null)return e;e=null}else if(n===31){if(e=lS(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return kh=e,null}function i1(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(OA()){case pS:return 2;case mS:return 8;case _h:case IA:return 32;case gS:return 268435456;default:return 32}default:return 32}}var Vg=!1,Ma=null,Ea=null,Ta=null,pc=new Map,mc=new Map,ca=[],xR="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function eS(e,t){switch(e){case"focusin":case"focusout":Ma=null;break;case"dragenter":case"dragleave":Ea=null;break;case"mouseover":case"mouseout":Ta=null;break;case"pointerover":case"pointerout":pc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mc.delete(t.pointerId)}}function Ol(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=zo(t),t!==null&&n1(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function SR(e,t,n,i,s){switch(t){case"focusin":return Ma=Ol(Ma,e,t,n,i,s),!0;case"dragenter":return Ea=Ol(Ea,e,t,n,i,s),!0;case"mouseover":return Ta=Ol(Ta,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return pc.set(a,Ol(pc.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,mc.set(a,Ol(mc.get(a)||null,e,t,n,i,s)),!0}return!1}function s1(e){var t=cr(e.target);if(t!==null){var n=gc(t);if(n!==null){if(t=n.tag,t===13){if(t=oS(n),t!==null){e.blockedOn=t,wy(e.priority,function(){tS(n)});return}}else if(t===31){if(t=lS(n),t!==null){e.blockedOn=t,wy(e.priority,function(){tS(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ph(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Hg(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Xm=i,n.target.dispatchEvent(i),Xm=null}else return t=zo(n),t!==null&&n1(t),e.blockedOn=n,!1;t.shift()}return!0}function nS(e,t,n){ph(e)&&n.delete(t)}function bR(){Vg=!1,Ma!==null&&ph(Ma)&&(Ma=null),Ea!==null&&ph(Ea)&&(Ea=null),Ta!==null&&ph(Ta)&&(Ta=null),pc.forEach(nS),mc.forEach(nS)}function Zu(e,t){e.blockedOn===t&&(e.blockedOn=null,Vg||(Vg=!0,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,bR)))}var Ju=null;function iS(e){Ju!==e&&(Ju=e,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,function(){Ju===e&&(Ju=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(H0(i||n)===null)continue;break}var a=zo(n);a!==null&&(e.splice(t,3),t-=3,rg(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function Bo(e){function t(l){return Zu(l,e)}Ma!==null&&Zu(Ma,e),Ea!==null&&Zu(Ea,e),Ta!==null&&Zu(Ta,e),pc.forEach(t),mc.forEach(t);for(var n=0;n<ca.length;n++){var i=ca[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ca.length&&(n=ca[0],n.blockedOn===null);)s1(n),n.blockedOn===null&&ca.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Yn]||null;if(typeof a=="function")r||iS(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Yn]||null)o=r.formAction;else if(H0(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),iS(n)}}}function a1(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function V0(e){this._internalRoot=e}cf.prototype.render=V0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Q(409));var n=t.current,i=ui();e1(n,i,e,t,null,null)};cf.prototype.unmount=V0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;e1(e.current,2,null,e,null,null),rf(),t[Fo]=null}};function cf(e){this._internalRoot=e}cf.prototype.unstable_scheduleHydration=function(e){if(e){var t=bS();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ca.length&&t!==0&&t<ca[n].priority;n++);ca.splice(n,0,e),n===0&&s1(e)}};var sS=aS.version;if(sS!=="19.3.0")throw Error(Q(527,sS,"19.3.0"));ie.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Q(188)):(e=Object.keys(e).join(","),Error(Q(268,e)));return e=MA(t),e=e!==null?cS(e):null,e=e===null?null:e.stateNode,e};var MR={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:Nt,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Il=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Il.isDisabled&&Il.supportsFiber))try{vc=Il.inject(MR),li=Il}catch{}var Il;uf.createRoot=function(e,t){if(!rS(e))throw Error(Q(299));var n=!1,i="",s=zb,a=Hb,r=Vb;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=$M(e,1,!1,null,null,n,i,null,s,a,r,a1),e[Fo]=t.current,U0(e),new V0(t)};uf.hydrateRoot=function(e,t,n){if(!rS(e))throw Error(Q(299));var i=!1,s="",a=zb,r=Hb,o=Vb,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=$M(e,1,!0,t,n??null,i,s,l,a,r,o,a1),t.context=t1(null),n=t.current,i=ui(),i=Wg(i),s=_a(i),s.callback=null,ya(n,s,i),n=i,t.current.lanes=n,yc(t,n),gs(t),e[Fo]=t.current,U0(e),new cf(t)};uf.version="19.3.0"});var c1=es((VL,l1)=>{"use strict";function o1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o1)}catch(e){console.error(e)}}o1(),l1.exports=r1()});var mT=es(xp=>{"use strict";var pL=Symbol.for("react.transitional.element"),mL=Symbol.for("react.fragment");function pT(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:pL,type:e,key:i,ref:t!==void 0?t:null,props:n}}xp.Fragment=mL;xp.jsx=pT;xp.jsxs=pT});var Qi=es((qB,gT)=>{"use strict";gT.exports=mT()});var Pp=Nn(ir(),1),zT=Nn(c1(),1);var L1=0,vv=1,O1=2;var $c=1,I1=2,ul=3,qa=0,Fn=1,Ui=2,bs=0,Ya=1,tu=2,_v=3,yv=4,P1=5;var Pr=100,B1=101,F1=102,z1=103,H1=104,V1=200,G1=201,k1=202,X1=203,xv=204,Sv=205,W1=206,q1=207,Y1=208,Z1=209,J1=210,K1=211,Q1=212,j1=213,$1=214,Of=0,If=1,Pf=2,al=3,Bf=4,Ff=5,zf=6,Hf=7,bv=0,tE=1,eE=2,qi=0,Mv=1,Ev=2,Tv=3,Av=4,wv=5,Cv=6,Rv=7;var Nv=300,Za=301,Br=302,md=303,gd=304,eu=306,Vf=1e3,_s=1001,Gf=1002,un=1003,nE=1004;var nu=1005;var _n=1006,vd=1007;var Ja=1008;var yi=1009,Dv=1010,Uv=1011,hl=1012,_d=1013,Yi=1014,Zi=1015,Ji=1016,yd=1017,xd=1018,fl=1020,Lv=35902,Ov=35899,Iv=1021,Pv=1022,Li=1023,ys=1026,Ka=1027,Bv=1028,Sd=1029,Qa=1030,bd=1031;var Md=1033,iu=33776,su=33777,au=33778,ru=33779,Ed=35840,Td=35841,Ad=35842,wd=35843,Cd=36196,Rd=37492,Nd=37496,Dd=37488,Ud=37489,ou=37490,Ld=37491,Od=37808,Id=37809,Pd=37810,Bd=37811,Fd=37812,zd=37813,Hd=37814,Vd=37815,Gd=37816,kd=37817,Xd=37818,Wd=37819,qd=37820,Yd=37821,Zd=36492,Jd=36494,Kd=36495,Qd=36283,jd=36284,lu=36285,$d=36286;var Oc=2300,kf=2301,Uf=2302,hv=2303,fv=2400,dv=2401,pv=2402;var iE=3200;var Fv=0,sE=1,Qs="",mi="srgb",Ic="srgb-linear",Pc="linear",le="srgb";var Lf=7680;var aE=519,rE=512,oE=513,lE=514,tp=515,cE=516,uE=517,ep=518,hE=519,fE=35044,np=35048;var zv="300 es",Wi=2e3,Bc=2001;function ER(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function TR(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Fc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function dE(){let e=Fc("canvas");return e.style.display="block",e}var u1={},rl=null;function Hv(...e){let t="THREE."+e.shift();rl?rl("log",t,...e):console.log(t,...e)}function pE(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Rt(...e){e=pE(e);let t="THREE."+e.shift();if(rl)rl("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Dt(...e){e=pE(e);let t="THREE."+e.shift();if(rl)rl("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Lr(...e){let t=e.join(" ");t in u1||(u1[t]=!0,Rt(...e))}function mE(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var gE={[Of]:If,[Pf]:zf,[Bf]:Hf,[al]:Ff,[If]:Of,[zf]:Pf,[Hf]:Bf,[Ff]:al},xs=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var G0=Math.PI/180,Xf=180/Math.PI;function cu(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(En[e&255]+En[e>>8&255]+En[e>>16&255]+En[e>>24&255]+"-"+En[t&255]+En[t>>8&255]+"-"+En[t>>16&15|64]+En[t>>24&255]+"-"+En[n&63|128]+En[n>>8&255]+"-"+En[n>>16&255]+En[n>>24&255]+En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]).toLowerCase()}function Zt(e,t,n){return Math.max(t,Math.min(n,e))}function AR(e,t){return(e%t+t)%t}function k0(e,t,n){return(1-n)*e+n*t}function Cc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Zn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var te=class e{static{e.prototype.isVector2=!0}constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Zt(this.x,t.x,n.x),this.y=Zt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Zt(this.x,t,n),this.y=Zt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ss=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],h=i[s+2],p=i[s+3],u=a[r+0],f=a[r+1],g=a[r+2],x=a[r+3];if(p!==x||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+p*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let d=1-o;if(m<.9995){let v=Math.acos(m),b=Math.sin(v);d=Math.sin(d*v)/b,o=Math.sin(o*v)/b,l=l*d+u*o,c=c*d+f*o,h=h*d+g*o,p=p*d+x*o}else{l=l*d+u*o,c=c*d+f*o,h=h*d+g*o,p=p*d+x*o;let v=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=v,c*=v,h*=v,p*=v}}t[n]=l,t[n+1]=c,t[n+2]=h,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],p=a[r],u=a[r+1],f=a[r+2],g=a[r+3];return t[n]=o*g+h*p+l*f-c*u,t[n+1]=l*g+h*u+c*p-o*f,t[n+2]=c*g+h*f+o*u-l*p,t[n+3]=h*g-o*p-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),p=o(a/2),u=l(i/2),f=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=u*h*p+c*f*g,this._y=c*f*p-u*h*g,this._z=c*h*g+u*f*p,this._w=c*h*p-u*f*g;break;case"YXZ":this._x=u*h*p+c*f*g,this._y=c*f*p-u*h*g,this._z=c*h*g-u*f*p,this._w=c*h*p+u*f*g;break;case"ZXY":this._x=u*h*p-c*f*g,this._y=c*f*p+u*h*g,this._z=c*h*g+u*f*p,this._w=c*h*p-u*f*g;break;case"ZYX":this._x=u*h*p-c*f*g,this._y=c*f*p+u*h*g,this._z=c*h*g-u*f*p,this._w=c*h*p+u*f*g;break;case"YZX":this._x=u*h*p+c*f*g,this._y=c*f*p+u*h*g,this._z=c*h*g-u*f*p,this._w=c*h*p-u*f*g;break;case"XZY":this._x=u*h*p-c*f*g,this._y=c*f*p-u*h*g,this._z=c*h*g+u*f*p,this._w=c*h*p+u*f*g;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],h=n[6],p=n[10],u=i+o+p;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>p){let f=2*Math.sqrt(1+i-o-p);this._w=(h-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>p){let f=2*Math.sqrt(1+o-i-p);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+p-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+r*o+s*c-a*l,this._y=s*h+r*l+a*o-i*c,this._z=a*h+r*c+i*l-s*o,this._w=r*h-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class e{static{e.prototype.isVector3=!0}constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(h1.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(h1.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),h=2*(o*n-a*s),p=2*(a*i-r*n);return this.x=n+l*c+r*p-o*h,this.y=i+l*h+o*c-a*p,this.z=s+l*p+a*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Zt(this.x,t.x,n.x),this.y=Zt(this.y,t.y,n.y),this.z=Zt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Zt(this.x,t,n),this.y=Zt(this.y,t,n),this.z=Zt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return X0.copy(this).projectOnVector(t),this.sub(X0)}reflect(t){return this.sub(X0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},X0=new F,h1=new Ss,Lt=class e{static{e.prototype.isMatrix3=!0}constructor(t,n,i,s,a,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=n,h[4]=a,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],p=i[7],u=i[2],f=i[5],g=i[8],x=s[0],m=s[3],d=s[6],v=s[1],b=s[4],y=s[7],E=s[2],T=s[5],C=s[8];return a[0]=r*x+o*v+l*E,a[3]=r*m+o*b+l*T,a[6]=r*d+o*y+l*C,a[1]=c*x+h*v+p*E,a[4]=c*m+h*b+p*T,a[7]=c*d+h*y+p*C,a[2]=u*x+f*v+g*E,a[5]=u*m+f*b+g*T,a[8]=u*d+f*y+g*C,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return n*r*h-n*o*c-i*a*h+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*r-o*c,u=o*l-h*a,f=c*a-r*l,g=n*p+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=p*x,t[1]=(s*c-h*i)*x,t[2]=(o*i-s*r)*x,t[3]=u*x,t[4]=(h*n-s*l)*x,t[5]=(s*a-o*n)*x,t[6]=f*x,t[7]=(i*l-c*n)*x,t[8]=(r*n-i*a)*x,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return Lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(W0.makeScale(t,n)),this}rotate(t){return Lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(W0.makeRotation(-t)),this}translate(t,n){return Lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(W0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},W0=new Lt,f1=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),d1=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wR(){let e={enabled:!0,workingColorSpace:Ic,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===le&&(s.r=Ks(s.r),s.g=Ks(s.g),s.b=Ks(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===le&&(s.r=sl(s.r),s.g=sl(s.g),s.b=sl(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Qs?Pc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Lr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Lr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Ic]:{primaries:t,whitePoint:i,transfer:Pc,toXYZ:f1,fromXYZ:d1,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:t,whitePoint:i,transfer:le,toXYZ:f1,fromXYZ:d1,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),e}var Yt=wR();function Ks(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function sl(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Wo,Wf=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Wo===void 0&&(Wo=Fc("canvas")),Wo.width=t.width,Wo.height=t.height;let s=Wo.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Wo}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Fc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Ks(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ks(n[i]/255)*255):n[i]=Ks(n[i]);return{data:n,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},CR=0,ol=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:CR++}),this.uuid=cu(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(q0(s[r].image)):a.push(q0(s[r]))}else a=q0(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function q0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Wf.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var RR=0,Y0=new F,Kn=class e extends xs{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=_s,s=_s,a=_n,r=Ja,o=Li,l=yi,c=e.DEFAULT_ANISOTROPY,h=Qs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:RR++}),this.uuid=cu(),this.name="",this.source=new ol(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new te(0,0),this.repeat=new te(1,1),this.center=new te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Y0).x}get height(){return this.source.getSize(Y0).y}get depth(){return this.source.getSize(Y0).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Rt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Rt(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Vf:t.x=t.x-Math.floor(t.x);break;case _s:t.x=t.x<0?0:1;break;case Gf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Vf:t.y=t.y-Math.floor(t.y);break;case _s:t.y=t.y<0?0:1;break;case Gf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Kn.DEFAULT_IMAGE=null;Kn.DEFAULT_MAPPING=Nv;Kn.DEFAULT_ANISOTROPY=1;var Ie=class e{static{e.prototype.isVector4=!0}constructor(t=0,n=0,i=0,s=1){this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let b=(c+1)/2,y=(f+1)/2,E=(d+1)/2,T=(h+u)/4,C=(p+x)/4,S=(g+m)/4;return b>y&&b>E?b<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(b),s=T/i,a=C/i):y>E?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=T/s,a=S/s):E<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(E),i=C/a,s=S/a),this.set(i,s,a,n),this}let v=Math.sqrt((m-g)*(m-g)+(p-x)*(p-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(p-x)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Zt(this.x,t.x,n.x),this.y=Zt(this.y,t.y,n.y),this.z=Zt(this.z,t.z,n.z),this.w=Zt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Zt(this.x,t,n),this.y=Zt(this.y,t,n),this.z=Zt(this.z,t,n),this.w=Zt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qf=class extends xs{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ie(0,0,t,n),this.scissorTest=!1,this.viewport=new Ie(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new Kn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let n={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new ol(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qn=class extends qf{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},zc=class extends Kn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=_s,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yf=class extends Kn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=_s,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ze=class e{static{e.prototype.isMatrix4=!0}constructor(t,n,i,s,a,r,o,l,c,h,p,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,h,p,u,f,g,x,m)}set(t,n,i,s,a,r,o,l,c,h,p,u,f,g,x,m){let d=this.elements;return d[0]=t,d[4]=n,d[8]=i,d[12]=s,d[1]=a,d[5]=r,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=p,d[14]=u,d[3]=f,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let n=this.elements,i=t.elements,s=1/qo.setFromMatrixColumn(t,0).length(),a=1/qo.setFromMatrixColumn(t,1).length(),r=1/qo.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let u=r*h,f=r*p,g=o*h,x=o*p;n[0]=l*h,n[4]=-l*p,n[8]=c,n[1]=f+g*c,n[5]=u-x*c,n[9]=-o*l,n[2]=x-u*c,n[6]=g+f*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*h,f=l*p,g=c*h,x=c*p;n[0]=u+x*o,n[4]=g*o-f,n[8]=r*c,n[1]=r*p,n[5]=r*h,n[9]=-o,n[2]=f*o-g,n[6]=x+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*h,f=l*p,g=c*h,x=c*p;n[0]=u-x*o,n[4]=-r*p,n[8]=g+f*o,n[1]=f+g*o,n[5]=r*h,n[9]=x-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*h,f=r*p,g=o*h,x=o*p;n[0]=l*h,n[4]=g*c-f,n[8]=u*c+x,n[1]=l*p,n[5]=x*c+u,n[9]=f*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,f=r*c,g=o*l,x=o*c;n[0]=l*h,n[4]=x-u*p,n[8]=g*p+f,n[1]=p,n[5]=r*h,n[9]=-o*h,n[2]=-c*h,n[6]=f*p+g,n[10]=u-x*p}else if(t.order==="XZY"){let u=r*l,f=r*c,g=o*l,x=o*c;n[0]=l*h,n[4]=-p,n[8]=c*h,n[1]=u*p+x,n[5]=r*h,n[9]=f*p-g,n[2]=g*p-f,n[6]=o*h,n[10]=x*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(NR,t,DR)}lookAt(t,n,i){let s=this.elements;return di.subVectors(t,n),di.lengthSq()===0&&(di.z=1),di.normalize(),La.crossVectors(i,di),La.lengthSq()===0&&(Math.abs(i.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),La.crossVectors(i,di)),La.normalize(),hf.crossVectors(di,La),s[0]=La.x,s[4]=hf.x,s[8]=di.x,s[1]=La.y,s[5]=hf.y,s[9]=di.y,s[2]=La.z,s[6]=hf.z,s[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],p=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],d=i[14],v=i[3],b=i[7],y=i[11],E=i[15],T=s[0],C=s[4],S=s[8],A=s[12],R=s[1],L=s[5],z=s[9],k=s[13],O=s[2],V=s[6],J=s[10],Z=s[14],it=s[3],W=s[7],tt=s[11],nt=s[15];return a[0]=r*T+o*R+l*O+c*it,a[4]=r*C+o*L+l*V+c*W,a[8]=r*S+o*z+l*J+c*tt,a[12]=r*A+o*k+l*Z+c*nt,a[1]=h*T+p*R+u*O+f*it,a[5]=h*C+p*L+u*V+f*W,a[9]=h*S+p*z+u*J+f*tt,a[13]=h*A+p*k+u*Z+f*nt,a[2]=g*T+x*R+m*O+d*it,a[6]=g*C+x*L+m*V+d*W,a[10]=g*S+x*z+m*J+d*tt,a[14]=g*A+x*k+m*Z+d*nt,a[3]=v*T+b*R+y*O+E*it,a[7]=v*C+b*L+y*V+E*W,a[11]=v*S+b*z+y*J+E*tt,a[15]=v*A+b*k+y*Z+E*nt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],d=t[15],v=l*f-c*u,b=o*f-c*p,y=o*u-l*p,E=r*f-c*h,T=r*u-l*h,C=r*p-o*h;return n*(x*v-m*b+d*y)-i*(g*v-m*E+d*T)+s*(g*b-x*E+d*C)-a*(g*y-x*T+m*C)}determinantAffine(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[1],r=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return n*(r*h-o*c)-i*(a*h-o*l)+s*(a*c-r*l)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],d=t[15],v=n*o-i*r,b=n*l-s*r,y=n*c-a*r,E=i*l-s*o,T=i*c-a*o,C=s*c-a*l,S=h*x-p*g,A=h*m-u*g,R=h*d-f*g,L=p*m-u*x,z=p*d-f*x,k=u*d-f*m,O=v*k-b*z+y*L+E*R-T*A+C*S;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/O;return t[0]=(o*k-l*z+c*L)*V,t[1]=(s*z-i*k-a*L)*V,t[2]=(x*C-m*T+d*E)*V,t[3]=(u*T-p*C-f*E)*V,t[4]=(l*R-r*k-c*A)*V,t[5]=(n*k-s*R+a*A)*V,t[6]=(m*y-g*C-d*b)*V,t[7]=(h*C-u*y+f*b)*V,t[8]=(r*z-o*R+c*S)*V,t[9]=(i*R-n*z-a*S)*V,t[10]=(g*T-x*y+d*v)*V,t[11]=(p*y-h*T-f*v)*V,t[12]=(o*A-r*L-l*S)*V,t[13]=(n*L-i*A+s*S)*V,t[14]=(x*b-g*E-m*v)*V,t[15]=(h*E-p*b+u*v)*V,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,h=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*r,0,c*l-s*o,h*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,h=r+r,p=o+o,u=a*c,f=a*h,g=a*p,x=r*h,m=r*p,d=o*p,v=l*c,b=l*h,y=l*p,E=i.x,T=i.y,C=i.z;return s[0]=(1-(x+d))*E,s[1]=(f+y)*E,s[2]=(g-b)*E,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(u+d))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+b)*C,s[9]=(m-v)*C,s[10]=(1-(u+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),n.identity(),this;let r=qo.set(s[0],s[1],s[2]).length(),o=qo.set(s[4],s[5],s[6]).length(),l=qo.set(s[8],s[9],s[10]).length();a<0&&(r=-r),Vi.copy(this);let c=1/r,h=1/o,p=1/l;return Vi.elements[0]*=c,Vi.elements[1]*=c,Vi.elements[2]*=c,Vi.elements[4]*=h,Vi.elements[5]*=h,Vi.elements[6]*=h,Vi.elements[8]*=p,Vi.elements[9]*=p,Vi.elements[10]*=p,n.setFromRotationMatrix(Vi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=Wi,l=!1){let c=this.elements,h=2*a/(n-t),p=2*a/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s),g,x;if(l)g=a/(r-a),x=r*a/(r-a);else if(o===Wi)g=-(r+a)/(r-a),x=-2*r*a/(r-a);else if(o===Bc)g=-r/(r-a),x=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Wi,l=!1){let c=this.elements,h=2/(n-t),p=2/(i-s),u=-(n+t)/(n-t),f=-(i+s)/(i-s),g,x;if(l)g=1/(r-a),x=r/(r-a);else if(o===Wi)g=-2/(r-a),x=-(r+a)/(r-a);else if(o===Bc)g=-1/(r-a),x=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},qo=new F,Vi=new ze,NR=new F(0,0,0),DR=new F(1,1,1),La=new F,hf=new F,di=new F,p1=new ze,m1=new Ss,za=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],h=s[9],p=s[2],u=s[6],f=s[10];switch(n){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Zt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Zt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return p1.makeRotationFromQuaternion(t),this.setFromRotationMatrix(p1,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return m1.setFromEuler(this),this.setFromQuaternion(m1,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};za.DEFAULT_ORDER="XYZ";var Hc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},UR=0,g1=new F,Yo=new Ss,Xs=new ze,ff=new F,Rc=new F,LR=new F,OR=new Ss,v1=new F(1,0,0),_1=new F(0,1,0),y1=new F(0,0,1),x1={type:"added"},IR={type:"removed"},Zo={type:"childadded",child:null},Z0={type:"childremoved",child:null},gi=class e extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:UR++}),this.uuid=cu(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new F,n=new za,i=new Ss,s=new F(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ze},normalMatrix:{value:new Lt}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Yo.setFromAxisAngle(t,n),this.quaternion.multiply(Yo),this}rotateOnWorldAxis(t,n){return Yo.setFromAxisAngle(t,n),this.quaternion.premultiply(Yo),this}rotateX(t){return this.rotateOnAxis(v1,t)}rotateY(t){return this.rotateOnAxis(_1,t)}rotateZ(t){return this.rotateOnAxis(y1,t)}translateOnAxis(t,n){return g1.copy(t).applyQuaternion(this.quaternion),this.position.add(g1.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(v1,t)}translateY(t){return this.translateOnAxis(_1,t)}translateZ(t){return this.translateOnAxis(y1,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xs.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?ff.copy(t):ff.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Rc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xs.lookAt(Rc,ff,this.up):Xs.lookAt(ff,Rc,this.up),this.quaternion.setFromRotationMatrix(Xs),s&&(Xs.extractRotation(s.matrixWorld),Yo.setFromRotationMatrix(Xs),this.quaternion.premultiply(Yo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(x1),Zo.child=t,this.dispatchEvent(Zo),Zo.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(IR),Z0.child=t,this.dispatchEvent(Z0),Z0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xs.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xs.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xs),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(x1),Zo.child=t,this.dispatchEvent(Zo),Zo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rc,t,LR),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rc,OR,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){let a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];a(t.shapes,p)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),p=r(t.shapes),u=r(t.skeletons),f=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};gi.DEFAULT_UP=new F(0,1,0);gi.DEFAULT_MATRIX_AUTO_UPDATE=!0;gi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Js=class extends gi{constructor(){super(),this.isGroup=!0,this.type="Group"}},PR={type:"move"},ll=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let x of t.hand.values()){let m=n.getJointPose(x,i),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(PR)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Js;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},vE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oa={h:0,s:0,l:0},df={h:0,s:0,l:0};function J0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Kt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=mi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Yt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Yt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Yt.workingColorSpace){if(t=AR(t,1),n=Zt(n,0,1),i=Zt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=J0(r,a,t+1/3),this.g=J0(r,a,t),this.b=J0(r,a,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,n=mi){function i(a){a!==void 0&&parseFloat(a)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=mi){let i=vE[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ks(t.r),this.g=Ks(t.g),this.b=Ks(t.b),this}copyLinearToSRGB(t){return this.r=sl(t.r),this.g=sl(t.g),this.b=sl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mi){return Yt.workingToColorSpace(Tn.copy(this),t),Math.round(Zt(Tn.r*255,0,255))*65536+Math.round(Zt(Tn.g*255,0,255))*256+Math.round(Zt(Tn.b*255,0,255))}getHexString(t=mi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Yt.workingColorSpace){Yt.workingToColorSpace(Tn.copy(this),n);let i=Tn.r,s=Tn.g,a=Tn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,h=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=h<=.5?p/(r+o):p/(2-r-o),r){case i:l=(s-a)/p+(s<a?6:0);break;case s:l=(a-i)/p+2;break;case a:l=(i-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,n=Yt.workingColorSpace){return Yt.workingToColorSpace(Tn.copy(this),n),t.r=Tn.r,t.g=Tn.g,t.b=Tn.b,t}getStyle(t=mi){Yt.workingToColorSpace(Tn.copy(this),t);let n=Tn.r,i=Tn.g,s=Tn.b;return t!==mi?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Oa),this.setHSL(Oa.h+t,Oa.s+n,Oa.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Oa),t.getHSL(df);let i=k0(Oa.h,df.h,n),s=k0(Oa.s,df.s,n),a=k0(Oa.l,df.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tn=new Kt;Kt.NAMES=vE;var Vc=class extends gi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new za,this.environmentIntensity=1,this.environmentRotation=new za,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}},Gi=new F,Ws=new F,K0=new F,qs=new F,Jo=new F,Ko=new F,S1=new F,Q0=new F,j0=new F,$0=new F,tv=new Ie,ev=new Ie,nv=new Ie,Fa=class e{constructor(t=new F,n=new F,i=new F){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Gi.subVectors(t,n),s.cross(Gi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){Gi.subVectors(s,n),Ws.subVectors(i,n),K0.subVectors(t,n);let r=Gi.dot(Gi),o=Gi.dot(Ws),l=Gi.dot(K0),c=Ws.dot(Ws),h=Ws.dot(K0),p=r*c-o*o;if(p===0)return a.set(0,0,0),null;let u=1/p,f=(c*l-o*h)*u,g=(r*h-o*l)*u;return a.set(1-f-g,g,f)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,qs)===null?!1:qs.x>=0&&qs.y>=0&&qs.x+qs.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,qs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,qs.x),l.addScaledVector(r,qs.y),l.addScaledVector(o,qs.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return tv.setScalar(0),ev.setScalar(0),nv.setScalar(0),tv.fromBufferAttribute(t,n),ev.fromBufferAttribute(t,i),nv.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(tv,a.x),r.addScaledVector(ev,a.y),r.addScaledVector(nv,a.z),r}static isFrontFacing(t,n,i,s){return Gi.subVectors(i,n),Ws.subVectors(t,n),Gi.cross(Ws).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gi.subVectors(this.c,this.b),Ws.subVectors(this.a,this.b),Gi.cross(Ws).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;Jo.subVectors(s,i),Ko.subVectors(a,i),Q0.subVectors(t,i);let l=Jo.dot(Q0),c=Ko.dot(Q0);if(l<=0&&c<=0)return n.copy(i);j0.subVectors(t,s);let h=Jo.dot(j0),p=Ko.dot(j0);if(h>=0&&p<=h)return n.copy(s);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),n.copy(i).addScaledVector(Jo,r);$0.subVectors(t,a);let f=Jo.dot($0),g=Ko.dot($0);if(g>=0&&f<=g)return n.copy(a);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Ko,o);let m=h*g-f*p;if(m<=0&&p-h>=0&&f-g>=0)return S1.subVectors(a,s),o=(p-h)/(p-h+(f-g)),n.copy(s).addScaledVector(S1,o);let d=1/(m+x+u);return r=x*d,o=u*d,n.copy(i).addScaledVector(Jo,r).addScaledVector(Ko,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ha=class{constructor(t=new F(1/0,1/0,1/0),n=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ki.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ki.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=ki.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ki):ki.fromBufferAttribute(a,r),ki.applyMatrix4(t.matrixWorld),this.expandByPoint(ki);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pf.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pf.copy(i.boundingBox)),pf.applyMatrix4(t.matrixWorld),this.union(pf)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ki),ki.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Nc),mf.subVectors(this.max,Nc),Qo.subVectors(t.a,Nc),jo.subVectors(t.b,Nc),$o.subVectors(t.c,Nc),Ia.subVectors(jo,Qo),Pa.subVectors($o,jo),Rr.subVectors(Qo,$o);let n=[0,-Ia.z,Ia.y,0,-Pa.z,Pa.y,0,-Rr.z,Rr.y,Ia.z,0,-Ia.x,Pa.z,0,-Pa.x,Rr.z,0,-Rr.x,-Ia.y,Ia.x,0,-Pa.y,Pa.x,0,-Rr.y,Rr.x,0];return!iv(n,Qo,jo,$o,mf)||(n=[1,0,0,0,1,0,0,0,1],!iv(n,Qo,jo,$o,mf))?!1:(gf.crossVectors(Ia,Pa),n=[gf.x,gf.y,gf.z],iv(n,Qo,jo,$o,mf))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ki).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ki).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ys[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ys[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ys[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ys[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ys[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ys[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ys[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ys[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ys),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ys=[new F,new F,new F,new F,new F,new F,new F,new F],ki=new F,pf=new Ha,Qo=new F,jo=new F,$o=new F,Ia=new F,Pa=new F,Rr=new F,Nc=new F,mf=new F,gf=new F,Nr=new F;function iv(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){Nr.fromArray(e,a);let o=s.x*Math.abs(Nr.x)+s.y*Math.abs(Nr.y)+s.z*Math.abs(Nr.z),l=t.dot(Nr),c=n.dot(Nr),h=i.dot(Nr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ye=new F,vf=new te,BR=0,wn=class extends xs{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:BR++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=fE,this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)vf.fromBufferAttribute(this,n),vf.applyMatrix3(t),this.setXY(n,vf.x,vf.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.applyMatrix3(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.applyMatrix4(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.applyNormalMatrix(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ye.fromBufferAttribute(this,n),Ye.transformDirection(t),this.setXYZ(n,Ye.x,Ye.y,Ye.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Cc(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Zn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Cc(n,this.array)),n}setX(t,n){return this.normalized&&(n=Zn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Cc(n,this.array)),n}setY(t,n){return this.normalized&&(n=Zn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Cc(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Zn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Cc(n,this.array)),n}setW(t,n){return this.normalized&&(n=Zn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Zn(n,this.array),i=Zn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Zn(n,this.array),i=Zn(i,this.array),s=Zn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Zn(n,this.array),i=Zn(i,this.array),s=Zn(s,this.array),a=Zn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Gc=class extends wn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var kc=class extends wn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var Jn=class extends wn{constructor(t,n,i){super(new Float32Array(t),n,i)}},FR=new Ha,Dc=new F,sv=new F,Or=class{constructor(t=new F,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):FR.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Dc.subVectors(t,this.center);let n=Dc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Dc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sv.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Dc.copy(t.center).add(sv)),this.expandByPoint(Dc.copy(t.center).sub(sv))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},zR=0,Di=new ze,av=new gi,tl=new F,pi=new Ha,Uc=new Ha,cn=new F,vi=class e extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zR++}),this.uuid=cu(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ER(t)?kc:Gc)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Lt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Di.makeRotationFromQuaternion(t),this.applyMatrix4(Di),this}rotateX(t){return Di.makeRotationX(t),this.applyMatrix4(Di),this}rotateY(t){return Di.makeRotationY(t),this.applyMatrix4(Di),this}rotateZ(t){return Di.makeRotationZ(t),this.applyMatrix4(Di),this}translate(t,n,i){return Di.makeTranslation(t,n,i),this.applyMatrix4(Di),this}scale(t,n,i){return Di.makeScale(t,n,i),this.applyMatrix4(Di),this}lookAt(t){return av.lookAt(t),av.updateMatrix(),this.applyMatrix4(av.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tl).negate(),this.translate(tl.x,tl.y,tl.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Jn(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ha);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];pi.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let i=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Uc.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(pi.min,Uc.min),pi.expandByPoint(cn),cn.addVectors(pi.max,Uc.max),pi.expandByPoint(cn)):(pi.expandByPoint(Uc.min),pi.expandByPoint(Uc.max))}pi.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)cn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(cn));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)cn.fromBufferAttribute(o,c),l&&(tl.fromBufferAttribute(t,c),cn.add(tl)),s=Math.max(s,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));let o=[],l=[];for(let S=0;S<i.count;S++)o[S]=new F,l[S]=new F;let c=new F,h=new F,p=new F,u=new te,f=new te,g=new te,x=new F,m=new F;function d(S,A,R){c.fromBufferAttribute(i,S),h.fromBufferAttribute(i,A),p.fromBufferAttribute(i,R),u.fromBufferAttribute(a,S),f.fromBufferAttribute(a,A),g.fromBufferAttribute(a,R),h.sub(c),p.sub(c),f.sub(u),g.sub(u);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(p,-f.y).multiplyScalar(L),m.copy(p).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),o[S].add(x),o[A].add(x),o[R].add(x),l[S].add(m),l[A].add(m),l[R].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let S=0,A=v.length;S<A;++S){let R=v[S],L=R.start,z=R.count;for(let k=L,O=L+z;k<O;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let b=new F,y=new F,E=new F,T=new F;function C(S){E.fromBufferAttribute(s,S),T.copy(E);let A=o[S];b.copy(A),b.sub(E.multiplyScalar(E.dot(A))).normalize(),y.crossVectors(T,A);let L=y.dot(l[S])<0?-1:1;r.setXYZW(S,b.x,b.y,b.z,L)}for(let S=0,A=v.length;S<A;++S){let R=v[S],L=R.start,z=R.count;for(let k=L,O=L+z;k<O;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new wn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new F,a=new F,r=new F,o=new F,l=new F,c=new F,h=new F,p=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(n,g),a.fromBufferAttribute(n,x),r.fromBufferAttribute(n,m),h.subVectors(r,a),p.subVectors(s,a),h.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=n.count;u<f;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),h.subVectors(r,a),p.subVectors(s,a),h.cross(p),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)cn.fromBufferAttribute(t,n),cn.normalize(),t.setXYZ(n,cn.x,cn.y,cn.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let d=0;d<h;d++)u[g++]=c[f++]}return new wn(u,h,p)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let h=0,p=c.length;h<p;h++){let u=c[h],f=t(u,i);l.push(f)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let f=c[p];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(n))}let a=t.morphAttributes;for(let c in a){let h=[],p=a[c];for(let u=0,f=p.length;u<f;u++)h.push(p[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,h=r.length;c<h;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var rv=new F,HR=new F,VR=new Lt,Xi=class{constructor(t=new F(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=rv.subVectors(i,n).cross(HR.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){let s=t.delta(rv),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/a;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(s,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||VR.getNormalMatrix(t),s=this.coplanarPoint(rv).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},GR=0,Va=class extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:GR++}),this.uuid=cu(),this.name="",this.type="Material",this.blending=Ya,this.side=qa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xv,this.blendDst=Sv,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=al,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=aE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lf,this.stencilZFail=Lf,this.stencilZPass=Lf,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Rt(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Rt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Xi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new te().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new te().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Zs=new F,ov=new F,_f=new F,yf=new F,Xc=class{constructor(t=new F,n=new F(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zs)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Zs.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Zs.copy(this.origin).addScaledVector(this.direction,n),Zs.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){ov.copy(t).add(n).multiplyScalar(.5),_f.copy(n).sub(t).normalize(),yf.copy(this.origin).sub(ov);let a=t.distanceTo(n)*.5,r=-this.direction.dot(_f),o=yf.dot(this.direction),l=-yf.dot(_f),c=yf.lengthSq(),h=Math.abs(1-r*r),p,u,f,g;if(h>0)if(p=r*l-o,u=r*o-l,g=a*h,p>=0)if(u>=-g)if(u<=g){let x=1/h;p*=x,u*=x,f=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;else u=-a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-r*a+o)),u=p>0?-a:Math.min(Math.max(-a,-l),a),f=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-a,-l),a),f=u*(u+2*l)+c):(p=Math.max(0,-(r*a+o)),u=p>0?a:Math.min(Math.max(-a,-l),a),f=-p*p+u*(u+2*l)+c);else u=r>0?-a:a,p=Math.max(0,-(r*u+o)),f=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(ov).addScaledVector(_f,u),f}intersectSphere(t,n){if(t.radius<0)return null;Zs.subVectors(t.center,this.origin);let i=Zs.dot(this.direction),s=Zs.dot(Zs)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(a=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(a=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Zs)!==null}intersectTriangle(t,n,i,s,a){let r=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=t.x-r.x,u=t.y-r.y,f=t.z-r.z,g=n.x-r.x,x=n.y-r.y,m=n.z-r.z,d=i.x-r.x,v=i.y-r.y,b=i.z-r.z,y=Math.abs(l),E=Math.abs(c),T=Math.abs(h),C,S,A,R,L,z,k,O,V,J,Z,it;if(y>=E&&y>=T?(A=l,z=p,V=g,it=d,l>=0?(C=c,S=h,R=u,L=f,k=x,O=m,J=v,Z=b):(C=h,S=c,R=f,L=u,k=m,O=x,J=b,Z=v)):E>=T?(A=c,z=u,V=x,it=v,c>=0?(C=h,S=l,R=f,L=p,k=m,O=g,J=b,Z=d):(C=l,S=h,R=p,L=f,k=g,O=m,J=d,Z=b)):(A=h,z=f,V=m,it=b,h>=0?(C=l,S=c,R=p,L=u,k=g,O=x,J=d,Z=v):(C=c,S=l,R=u,L=p,k=x,O=g,J=v,Z=d)),A===0)return null;let W=C/A,tt=S/A,nt=1/A,wt=R-W*z,Tt=L-tt*z,ye=k-W*V,Jt=O-tt*V,ee=J-W*it,q=Z-tt*it,$=ee*Jt-q*ye,_t=wt*q-Tt*ee,Ot=ye*Tt-Jt*wt;if(s){if($<0||_t<0||Ot<0)return null}else if(($<0||_t<0||Ot<0)&&($>0||_t>0||Ot>0))return null;let gt=$+_t+Ot;if(gt===0)return null;let Ht=nt*($*z+_t*V+Ot*it);return(gt>0?Ht<0:Ht>0)?null:this.at(Ht/gt,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Wc=class extends Va{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new za,this.combine=bv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},b1=new ze,Dr=new Xc,xf=new Or,M1=new F,Sf=new F,bf=new F,Mf=new F,lv=new F,Ef=new F,E1=new F,Tf=new F,Pn=class extends gi{constructor(t=new vi,n=new Wc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){Ef.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let h=o[l],p=a[l];h!==0&&(lv.fromBufferAttribute(p,t),r?Ef.addScaledVector(lv,h):Ef.addScaledVector(lv.sub(n),h))}n.add(Ef)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xf.copy(i.boundingSphere),xf.applyMatrix4(a),Dr.copy(t.ray).recast(t.near),!(xf.containsPoint(Dr.origin)===!1&&(Dr.intersectSphere(xf,M1)===null||Dr.origin.distanceToSquared(M1)>(t.far-t.near)**2))&&(b1.copy(a).invert(),Dr.copy(t.ray).applyMatrix4(b1),!(i.boundingBox!==null&&Dr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Dr)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,p=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,x=u.length;g<x;g++){let m=u[g],d=r[m.materialIndex],v=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,E=b;y<E;y+=3){let T=o.getX(y),C=o.getX(y+1),S=o.getX(y+2);s=Af(this,d,t,i,c,h,p,T,C,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,d=x;m<d;m+=3){let v=o.getX(m),b=o.getX(m+1),y=o.getX(m+2);s=Af(this,r,t,i,c,h,p,v,b,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,x=u.length;g<x;g++){let m=u[g],d=r[m.materialIndex],v=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,E=b;y<E;y+=3){let T=y,C=y+1,S=y+2;s=Af(this,d,t,i,c,h,p,T,C,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,d=x;m<d;m+=3){let v=m,b=m+1,y=m+2;s=Af(this,r,t,i,c,h,p,v,b,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function kR(e,t,n,i,s,a,r,o){let l;if(t.side===Fn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===qa,o),l===null)return null;Tf.copy(o),Tf.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Tf);return c<n.near||c>n.far?null:{distance:c,point:Tf.clone(),object:e}}function Af(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,Sf),e.getVertexPosition(l,bf),e.getVertexPosition(c,Mf);let h=kR(e,t,n,i,Sf,bf,Mf,E1);if(h){let p=new F;Fa.getBarycoord(E1,Sf,bf,Mf,p),s&&(h.uv=Fa.getInterpolatedAttribute(s,o,l,c,p,new te)),a&&(h.uv1=Fa.getInterpolatedAttribute(a,o,l,c,p,new te)),r&&(h.normal=Fa.getInterpolatedAttribute(r,o,l,c,p,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new F,materialIndex:0};Fa.getNormal(Sf,bf,Mf,u.normal),h.face=u,h.barycoord=p}return h}var Zf=class extends Kn{constructor(t=null,n=1,i=1,s,a,r,o,l,c=un,h=un,p,u){super(null,r,o,l,c,h,s,a,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ur=new Or,XR=new te(.5,.5),wf=new F,qc=class{constructor(t=new Xi,n=new Xi,i=new Xi,s=new Xi,a=new Xi,r=new Xi){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Wi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],h=a[4],p=a[5],u=a[6],f=a[7],g=a[8],x=a[9],m=a[10],d=a[11],v=a[12],b=a[13],y=a[14],E=a[15];if(s[0].setComponents(c-r,f-h,d-g,E-v).normalize(),s[1].setComponents(c+r,f+h,d+g,E+v).normalize(),s[2].setComponents(c+o,f+p,d+x,E+b).normalize(),s[3].setComponents(c-o,f-p,d-x,E-b).normalize(),i)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,f-u,d-m,E-y).normalize();else if(s[4].setComponents(c-l,f-u,d-m,E-y).normalize(),n===Wi)s[5].setComponents(c+l,f+u,d+m,E+y).normalize();else if(n===Bc)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ur.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ur)}intersectsSprite(t){Ur.center.set(0,0,0);let n=XR.distanceTo(t.center);return Ur.radius=.7071067811865476+n,Ur.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ur)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(wf.x=s.normal.x>0?t.max.x:t.min.x,wf.y=s.normal.y>0?t.max.y:t.min.y,wf.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(wf)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Jf=class extends Va{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Kf=new F,Qf=new F,T1=new ze,Lc=new Xc,Cf=new Or,cv=new F,A1=new F,jf=class extends gi{constructor(t=new vi,n=new Jf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[0];for(let s=1,a=n.count;s<a;s++)Kf.fromBufferAttribute(n,s-1),Qf.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=Kf.distanceTo(Qf);t.setAttribute("lineDistance",new Jn(i,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cf.copy(i.boundingSphere),Cf.applyMatrix4(s),Cf.radius+=a,t.ray.intersectsSphere(Cf)===!1)return;T1.copy(s).invert(),Lc.copy(t.ray).applyMatrix4(T1);let o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let x=f,m=g-1;x<m;x+=c){let d=h.getX(x),v=h.getX(x+1),b=Rf(this,t,Lc,l,d,v,x);b&&n.push(b)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),d=Rf(this,t,Lc,l,x,m,g-1);d&&n.push(d)}}else{let f=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let x=f,m=g-1;x<m;x+=c){let d=Rf(this,t,Lc,l,x,x+1,x);d&&n.push(d)}if(this.isLineLoop){let x=Rf(this,t,Lc,l,g-1,f,g-1);x&&n.push(x)}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}};function Rf(e,t,n,i,s,a,r){let o=e.geometry.attributes.position;if(Kf.fromBufferAttribute(o,s),Qf.fromBufferAttribute(o,a),n.distanceSqToSegment(Kf,Qf,cv,A1)>i)return;cv.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(cv);if(!(c<t.near||c>t.far))return{distance:c,point:A1.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}var w1=new F,C1=new F,Yc=class extends jf{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[];for(let s=0,a=n.count;s<a;s+=2)w1.fromBufferAttribute(n,s),C1.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+w1.distanceTo(C1);t.setAttribute("lineDistance",new Jn(i,1))}else Rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Zc=class extends Kn{constructor(t=[],n=Za,i,s,a,r,o,l,c,h){super(t,n,i,s,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Ga=class extends Kn{constructor(t,n,i=Yi,s,a,r,o=un,l=un,c,h=ys,p=1){if(h!==ys&&h!==Ka)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,s,a,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ol(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}},$f=class extends Ga{constructor(t,n=Yi,i=Za,s,a,r=un,o=un,l,c=ys){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,n,i,s,a,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Jc=class extends Kn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},cl=class e extends vi{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],h=[],p=[],u=0,f=0;g("z","y","x",-1,-1,i,n,t,r,a,0),g("z","y","x",1,-1,i,n,-t,r,a,1),g("x","z","y",1,1,t,i,n,s,r,2),g("x","z","y",1,-1,t,i,-n,s,r,3),g("x","y","z",1,-1,t,n,i,s,a,4),g("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new Jn(c,3)),this.setAttribute("normal",new Jn(h,3)),this.setAttribute("uv",new Jn(p,2));function g(x,m,d,v,b,y,E,T,C,S,A){let R=y/C,L=E/S,z=y/2,k=E/2,O=T/2,V=C+1,J=S+1,Z=0,it=0,W=new F;for(let tt=0;tt<J;tt++){let nt=tt*L-k;for(let wt=0;wt<V;wt++){let Tt=wt*R-z;W[x]=Tt*v,W[m]=nt*b,W[d]=O,c.push(W.x,W.y,W.z),W[x]=0,W[m]=0,W[d]=T>0?1:-1,h.push(W.x,W.y,W.z),p.push(wt/C),p.push(1-tt/S),Z+=1}}for(let tt=0;tt<S;tt++)for(let nt=0;nt<C;nt++){let wt=u+nt+V*tt,Tt=u+nt+V*(tt+1),ye=u+(nt+1)+V*(tt+1),Jt=u+(nt+1)+V*tt;l.push(wt,Tt,Jt),l.push(Tt,ye,Jt),it+=6}o.addGroup(f,it,A),f+=it,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ir=class e extends vi{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,p=t/o,u=n/l,f=[],g=[],x=[],m=[];for(let d=0;d<h;d++){let v=d*u-r;for(let b=0;b<c;b++){let y=b*p-a;g.push(y,-v,0),x.push(0,0,1),m.push(b/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<o;v++){let b=v+c*d,y=v+c*(d+1),E=v+1+c*(d+1),T=v+1+c*d;f.push(b,y,T),f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new Jn(g,3)),this.setAttribute("normal",new Jn(x,3)),this.setAttribute("uv",new Jn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Fr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];if(R1(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone();else if(Array.isArray(s))if(R1(s[0])){let a=[];for(let r=0,o=s.length;r<o;r++)a[r]=s[r].clone();t[n][i]=a}else t[n][i]=s.slice();else t[n][i]=s}}return t}function Cn(e){let t={};for(let n=0;n<e.length;n++){let i=Fr(e[n]);for(let s in i)t[s]=i[s]}return t}function R1(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function WR(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Vv(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var _E={clone:Fr,merge:Cn},qR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,YR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Bn=class extends Va{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qR,this.fragmentShader=YR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Fr(t.uniforms),this.uniformsGroups=WR(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=n[s.value]||null;break;case"c":this.uniforms[i].value=new Kt().setHex(s.value);break;case"v2":this.uniforms[i].value=new te().fromArray(s.value);break;case"v3":this.uniforms[i].value=new F().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Lt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ze().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},td=class extends Bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ed=class extends Va{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},nd=class extends Va{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function el(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function uv(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ka=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},id=class extends ka{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fv,endingEnd:fv}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case dv:a=t,o=2*n-i;break;case pv:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case dv:r=t,l=2*i-n;break;case pv:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,h=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*h,this._offsetNext=r*h}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-n)/(s-n),x=g*g,m=x*g,d=-u*m+2*u*x-u*g,v=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,b=(-1-f)*m+(1.5+f)*x+.5*g,y=f*m-f*x;for(let E=0;E!==o;++E)a[E]=d*r[h+E]+v*r[c+E]+b*r[l+E]+y*r[p+E];return a}},sd=class extends ka{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-n)/(s-n),p=1-h;for(let u=0;u!==o;++u)a[u]=r[c+u]*p+r[l+u]*h;return a}},ad=class extends ka{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},rd=class extends ka{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let g=(i-n)/(s-n),x=1-g;for(let m=0;m!==o;++m)a[m]=r[c+m]*x+r[l+m]*g;return a}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let x=r[c+g],m=r[l+g],d=f*u+g*2,v=p[d],b=p[d+1],y=t*u+g*2,E=h[y],T=h[y+1],C=JR(i,n,v,E,s);a[g]=yE(C,x,b,T,m)}return a}};function yE(e,t,n,i,s){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*i+e*e*e*s}function ZR(e,t,n,i,s){let a=1-e;return 3*a*a*(n-t)+6*a*e*(i-n)+3*e*e*(s-i)}function JR(e,t,n,i,s){let a=(e-t)/(s-t);for(let r=0;r<8;r++){let o=yE(a,t,n,i,s)-e;if(Math.abs(o)<1e-10)break;let l=ZR(a,t,n,i,s);if(Math.abs(l)<1e-10)break;a=Math.max(0,Math.min(1,a-o/l))}return a}var _i=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=el(n,this.TimeBufferType),this.values=el(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:el(t.times,Array),values:el(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),uv(t.settings)&&(i.settings={inTangents:el(t.settings.inTangents,Array),outTangents:el(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ad(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new sd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new id(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new rd(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.inTangents=this.settings.inTangents,n.outTangents=this.settings.outTangents),n}setInterpolation(t){let n;switch(t){case Oc:n=this.InterpolantFactoryMethodDiscrete;break;case kf:n=this.InterpolantFactoryMethodLinear;break;case Uf:n=this.InterpolantFactoryMethodSmooth;break;case hv:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Rt("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Oc;case this.InterpolantFactoryMethodLinear:return kf;case this.InterpolantFactoryMethodSmooth:return Uf;case this.InterpolantFactoryMethodBezier:return hv}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t;uv(this.settings)&&(N1(this.settings.inTangents,t),N1(this.settings.outTangents,t))}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&TR(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Uf,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*i,u=p-i,f=p+i;for(let g=0;g!==i;++g){let x=n[p+g];if(x!==n[u+g]||x!==n[f+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let f=0;f!==i;++f)n[u+f]=n[p+f]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,uv(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function N1(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]*=t}_i.prototype.ValueTypeName="";_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=kf;var Xa=class extends _i{constructor(t,n,i){super(t,n,i)}};Xa.prototype.ValueTypeName="bool";Xa.prototype.ValueBufferType=Array;Xa.prototype.DefaultInterpolation=Oc;Xa.prototype.InterpolantFactoryMethodLinear=void 0;Xa.prototype.InterpolantFactoryMethodSmooth=void 0;var od=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}};od.prototype.ValueTypeName="color";var ld=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}};ld.prototype.ValueTypeName="number";var cd=class extends ka{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let h=c+o;c!==h;c+=4)Ss.slerpFlat(a,0,r,c-o,r,c,l);return a}},Kc=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new cd(this.times,this.values,this.getValueSize(),t)}};Kc.prototype.ValueTypeName="quaternion";Kc.prototype.InterpolantFactoryMethodSmooth=void 0;var Wa=class extends _i{constructor(t,n,i){super(t,n,i)}};Wa.prototype.ValueTypeName="string";Wa.prototype.ValueBufferType=Array;Wa.prototype.DefaultInterpolation=Oc;Wa.prototype.InterpolantFactoryMethodLinear=void 0;Wa.prototype.InterpolantFactoryMethodSmooth=void 0;var ud=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}};ud.prototype.ValueTypeName="vector";var hd=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,a===!1&&s.onStart!==void 0&&s.onStart(h,r,o),a=!0},this.itemEnd=function(h){r++,s.onProgress!==void 0&&s.onProgress(h,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=c.length;p<u;p+=2){let f=c[p],g=c[p+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xE=new hd,fd=class{constructor(t){this.manager=t!==void 0?t:xE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};fd.DEFAULT_MATERIAL_NAME="__DEFAULT";var Nf=new F,Df=new Ss,vs=new F,Qc=class extends gi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=Wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Nf,Df,vs),vs.x===1&&vs.y===1&&vs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nf,Df,vs.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(Nf,Df,vs),vs.x===1&&vs.y===1&&vs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nf,Df,vs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ba=new F,D1=new te,U1=new te,An=class extends Qc{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Xf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(G0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xf*2*Math.atan(Math.tan(G0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ba.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ba.x,Ba.y).multiplyScalar(-t/Ba.z),Ba.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ba.x,Ba.y).multiplyScalar(-t/Ba.z)}getViewSize(t,n){return this.getViewBounds(t,D1,U1),n.subVectors(U1,D1)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(G0*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var jc=class extends Qc{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var nl=-90,il=1,dd=class extends gi{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new An(nl,il,t,n);s.layers=this.layers,this.add(s);let a=new An(nl,il,t,n);a.layers=this.layers,this.add(a);let r=new An(nl,il,t,n);r.layers=this.layers,this.add(r);let o=new An(nl,il,t,n);o.layers=this.layers,this.add(o);let l=new An(nl,il,t,n);l.layers=this.layers,this.add(l);let c=new An(nl,il,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===Wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Bc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(p,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},pd=class extends An{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Gv="\\[\\]\\.:\\/",KR=new RegExp("["+Gv+"]","g"),kv="[^"+Gv+"]",QR="[^"+Gv.replace("\\.","")+"]",jR=/((?:WC+[\/:])*)/.source.replace("WC",kv),$R=/(WCOD+)?/.source.replace("WCOD",QR),t3=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kv),e3=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kv),n3=new RegExp("^"+jR+$R+t3+e3+"$"),i3=["material","materials","bones","map"],mv=class{constructor(t,n,i){let s=i||Ce.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Ce=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(KR,"")}static parseTrackName(t){let n=n3.exec(t);if(n===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);i3.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ce.Composite=mv;Ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ce.prototype.GetterByBindingType=[Ce.prototype._getValue_direct,Ce.prototype._getValue_array,Ce.prototype._getValue_arrayElement,Ce.prototype._getValue_toArray];Ce.prototype.SetterByBindingTypeAndVersioning=[[Ce.prototype._setValue_direct,Ce.prototype._setValue_direct_setNeedsUpdate,Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_array,Ce.prototype._setValue_array_setNeedsUpdate,Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_arrayElement,Ce.prototype._setValue_arrayElement_setNeedsUpdate,Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_fromArray,Ce.prototype._setValue_fromArray_setNeedsUpdate,Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var GL=new Float32Array(1);var gv=class e{static{e.prototype.isMatrix2=!0}constructor(t,n,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,s){let a=this.elements;return a[0]=t,a[2]=n,a[1]=i,a[3]=s,this}};function Xv(e,t,n,i){let s=s3(i);switch(n){case Iv:return e*t;case Bv:return e*t/s.components*s.byteLength;case Sd:return e*t/s.components*s.byteLength;case Qa:return e*t*2/s.components*s.byteLength;case bd:return e*t*2/s.components*s.byteLength;case Pv:return e*t*3/s.components*s.byteLength;case Li:return e*t*4/s.components*s.byteLength;case Md:return e*t*4/s.components*s.byteLength;case iu:case su:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case au:case ru:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Td:case wd:return Math.max(e,16)*Math.max(t,8)/4;case Ed:case Ad:return Math.max(e,8)*Math.max(t,8)/2;case Cd:case Rd:case Dd:case Ud:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Nd:case ou:case Ld:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Od:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Id:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Pd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Fd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case zd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Vd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Gd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case kd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Xd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Wd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case qd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Yd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Zd:case Jd:case Kd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Qd:case jd:return Math.ceil(e/4)*Math.ceil(t/4)*8;case lu:case $d:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function s3(e){switch(e){case yi:case Dv:return{byteLength:1,components:1};case hl:case Uv:case Ji:return{byteLength:2,components:1};case yd:case xd:return{byteLength:2,components:4};case Yi:case _d:case Zi:return{byteLength:4,components:1};case Lv:case Ov:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function GE(){let e=null,t=!1,n=null,i=null;function s(a,r){i=e.requestAnimationFrame(s),n(a,r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function r3(e){let t=new WeakMap;function n(o,l){let c=o.array,h=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=e.HALF_FLOAT:f=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=e.SHORT;else if(c instanceof Uint32Array)f=e.UNSIGNED_INT;else if(c instanceof Int32Array)f=e.INT;else if(c instanceof Int8Array)f=e.BYTE;else if(c instanceof Uint8Array)f=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let h=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,h);else{p.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<p.length;f++){let g=p[u],x=p[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,p[u]=x)}p.length=u+1;for(let f=0,g=p.length;f<g;f++){let x=p[f];e.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var o3=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,l3=`#ifdef USE_ALPHAHASH
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
#endif`,c3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,u3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,h3=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,f3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d3=`#ifdef USE_AOMAP
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
#endif`,p3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,m3=`#ifdef USE_BATCHING
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
#endif`,g3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,v3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,y3=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,x3=`#ifdef USE_IRIDESCENCE
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
#endif`,S3=`#ifdef USE_BUMPMAP
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
#endif`,b3=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,M3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,E3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,T3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,A3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,w3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,C3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,R3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,N3=`#define PI 3.141592653589793
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
} // validated`,D3=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,U3=`vec3 transformedNormal = objectNormal;
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
#endif`,L3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,O3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,I3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,P3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,B3="gl_FragColor = linearToOutputTexel( gl_FragColor );",F3=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,z3=`#ifdef USE_ENVMAP
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
#endif`,H3=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,V3=`#ifdef USE_ENVMAP
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
#endif`,G3=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k3=`#ifdef USE_ENVMAP
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
#endif`,X3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,W3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Z3=`#ifdef USE_GRADIENTMAP
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
}`,J3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,K3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Q3=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,j3=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,$3=`#ifdef USE_ENVMAP
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
#endif`,t2=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,n2=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,i2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,s2=`PhysicalMaterial material;
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
#endif`,a2=`uniform sampler2D dfgLUT;
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
}`,r2=`
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
#endif`,o2=`#if defined( RE_IndirectDiffuse )
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
#endif`,l2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,c2=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,u2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,h2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,v2=`#if defined( USE_POINTS_UV )
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
#endif`,_2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,x2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,S2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,b2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M2=`#ifdef USE_MORPHTARGETS
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
#endif`,E2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,A2=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,w2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,N2=`#ifdef USE_NORMALMAP
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
#endif`,D2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,U2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,L2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,O2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,I2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,P2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,B2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,z2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,H2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,q2=`float getShadowMask() {
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
}`,Y2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Z2=`#ifdef USE_SKINNING
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
#endif`,J2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K2=`#ifdef USE_SKINNING
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
#endif`,Q2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tN=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,eN=`#ifdef USE_TRANSMISSION
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
#endif`,nN=`#ifdef USE_TRANSMISSION
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
#endif`,iN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rN=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,oN=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lN=`uniform sampler2D t2D;
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
}`,cN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uN=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dN=`#include <common>
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
}`,pN=`#if DEPTH_PACKING == 3200
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
}`,mN=`#define DISTANCE
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
}`,gN=`#define DISTANCE
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
}`,vN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_N=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yN=`uniform float scale;
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
}`,xN=`uniform vec3 diffuse;
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
}`,SN=`#include <common>
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
}`,bN=`uniform vec3 diffuse;
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
}`,MN=`#define LAMBERT
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
}`,EN=`#define LAMBERT
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
}`,TN=`#define MATCAP
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
}`,AN=`#define MATCAP
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
}`,wN=`#define NORMAL
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
}`,CN=`#define NORMAL
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
}`,RN=`#define PHONG
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
}`,NN=`#define PHONG
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
}`,DN=`#define STANDARD
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
}`,UN=`#define STANDARD
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
}`,LN=`#define TOON
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
}`,ON=`#define TOON
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
}`,IN=`uniform float size;
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
}`,PN=`uniform vec3 diffuse;
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
}`,BN=`#include <common>
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
}`,FN=`uniform vec3 color;
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
}`,zN=`uniform float rotation;
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
}`,HN=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:o3,alphahash_pars_fragment:l3,alphamap_fragment:c3,alphamap_pars_fragment:u3,alphatest_fragment:h3,alphatest_pars_fragment:f3,aomap_fragment:d3,aomap_pars_fragment:p3,batching_pars_vertex:m3,batching_vertex:g3,begin_vertex:v3,beginnormal_vertex:_3,bsdfs:y3,iridescence_fragment:x3,bumpmap_pars_fragment:S3,clipping_planes_fragment:b3,clipping_planes_pars_fragment:M3,clipping_planes_pars_vertex:E3,clipping_planes_vertex:T3,color_fragment:A3,color_pars_fragment:w3,color_pars_vertex:C3,color_vertex:R3,common:N3,cube_uv_reflection_fragment:D3,defaultnormal_vertex:U3,displacementmap_pars_vertex:L3,displacementmap_vertex:O3,emissivemap_fragment:I3,emissivemap_pars_fragment:P3,colorspace_fragment:B3,colorspace_pars_fragment:F3,envmap_fragment:z3,envmap_common_pars_fragment:H3,envmap_pars_fragment:V3,envmap_pars_vertex:G3,envmap_physical_pars_fragment:$3,envmap_vertex:k3,fog_vertex:X3,fog_pars_vertex:W3,fog_fragment:q3,fog_pars_fragment:Y3,gradientmap_pars_fragment:Z3,lightmap_pars_fragment:J3,lights_lambert_fragment:K3,lights_lambert_pars_fragment:Q3,lights_pars_begin:j3,lights_toon_fragment:t2,lights_toon_pars_fragment:e2,lights_phong_fragment:n2,lights_phong_pars_fragment:i2,lights_physical_fragment:s2,lights_physical_pars_fragment:a2,lights_fragment_begin:r2,lights_fragment_maps:o2,lights_fragment_end:l2,lightprobes_pars_fragment:c2,logdepthbuf_fragment:u2,logdepthbuf_pars_fragment:h2,logdepthbuf_pars_vertex:f2,logdepthbuf_vertex:d2,map_fragment:p2,map_pars_fragment:m2,map_particle_fragment:g2,map_particle_pars_fragment:v2,metalnessmap_fragment:_2,metalnessmap_pars_fragment:y2,morphinstance_vertex:x2,morphcolor_vertex:S2,morphnormal_vertex:b2,morphtarget_pars_vertex:M2,morphtarget_vertex:E2,normal_fragment_begin:T2,normal_fragment_maps:A2,normal_pars_fragment:w2,normal_pars_vertex:C2,normal_vertex:R2,normalmap_pars_fragment:N2,clearcoat_normal_fragment_begin:D2,clearcoat_normal_fragment_maps:U2,clearcoat_pars_fragment:L2,iridescence_pars_fragment:O2,opaque_fragment:I2,packing:P2,premultiplied_alpha_fragment:B2,project_vertex:F2,dithering_fragment:z2,dithering_pars_fragment:H2,roughnessmap_fragment:V2,roughnessmap_pars_fragment:G2,shadowmap_pars_fragment:k2,shadowmap_pars_vertex:X2,shadowmap_vertex:W2,shadowmask_pars_fragment:q2,skinbase_vertex:Y2,skinning_pars_vertex:Z2,skinning_vertex:J2,skinnormal_vertex:K2,specularmap_fragment:Q2,specularmap_pars_fragment:j2,tonemapping_fragment:$2,tonemapping_pars_fragment:tN,transmission_fragment:eN,transmission_pars_fragment:nN,uv_pars_fragment:iN,uv_pars_vertex:sN,uv_vertex:aN,worldpos_vertex:rN,background_vert:oN,background_frag:lN,backgroundCube_vert:cN,backgroundCube_frag:uN,cube_vert:hN,cube_frag:fN,depth_vert:dN,depth_frag:pN,distance_vert:mN,distance_frag:gN,equirect_vert:vN,equirect_frag:_N,linedashed_vert:yN,linedashed_frag:xN,meshbasic_vert:SN,meshbasic_frag:bN,meshlambert_vert:MN,meshlambert_frag:EN,meshmatcap_vert:TN,meshmatcap_frag:AN,meshnormal_vert:wN,meshnormal_frag:CN,meshphong_vert:RN,meshphong_frag:NN,meshphysical_vert:DN,meshphysical_frag:UN,meshtoon_vert:LN,meshtoon_frag:ON,points_vert:IN,points_frag:PN,shadow_vert:BN,shadow_frag:FN,sprite_vert:zN,sprite_frag:HN},ht={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Es={basic:{uniforms:Cn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Cn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Cn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Cn([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Cn([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Cn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Cn([ht.points,ht.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Cn([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Cn([ht.common,ht.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Cn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Cn([ht.sprite,ht.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distance:{uniforms:Cn([ht.common,ht.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distance_vert,fragmentShader:Ft.distance_frag},shadow:{uniforms:Cn([ht.lights,ht.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Es.physical={uniforms:Cn([Es.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};var ip={r:0,b:0,g:0},VN=new ze,kE=new Lt;kE.set(-1,0,0,0,1,0,0,0,1);function GN(e,t,n,i,s,a){let r=new Kt(0),o=s===!0?0:1,l,c,h=null,p=0,u=null;function f(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){let y=v.backgroundBlurriness>0;b=t.get(b,y)}return b}function g(v){let b=!1,y=f(v);y===null?m(r,o):y&&y.isColor&&(m(y,1),b=!0);let E=e.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function x(v,b){let y=f(b);y&&(y.isCubeTexture||y.mapping===eu)?(c===void 0&&(c=new Pn(new cl(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:Fr(Es.backgroundCube.uniforms),vertexShader:Es.backgroundCube.vertexShader,fragmentShader:Es.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(VN.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(kE),c.material.toneMapped=Yt.getTransfer(y.colorSpace)!==le,(h!==y||p!==y.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=y,p=y.version,u=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Pn(new Ir(2,2),new Bn({name:"BackgroundMaterial",uniforms:Fr(Es.background.uniforms),vertexShader:Es.background.vertexShader,fragmentShader:Es.background.fragmentShader,side:qa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(y.colorSpace)!==le,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||p!==y.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=y,p=y.version,u=e.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,b){v.getRGB(ip,Vv(e)),n.buffers.color.setClear(ip.r,ip.g,ip.b,b,a)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,b=1){r.set(v),o=b,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:g,addToRenderList:x,dispose:d}}function kN(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(L,z,k,O,V){let J=!1,Z=p(L,O,k,z);a!==Z&&(a=Z,c(a.object)),J=f(L,O,k,V),J&&g(L,O,k,V),V!==null&&t.update(V,e.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,y(L,z,k,O),V!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return e.createVertexArray()}function c(L){return e.bindVertexArray(L)}function h(L){return e.deleteVertexArray(L)}function p(L,z,k,O){let V=O.wireframe===!0,J=i[z.id];J===void 0&&(J={},i[z.id]=J);let Z=L.isInstancedMesh===!0?L.id:0,it=J[Z];it===void 0&&(it={},J[Z]=it);let W=it[k.id];W===void 0&&(W={},it[k.id]=W);let tt=W[V];return tt===void 0&&(tt=u(l()),W[V]=tt),tt}function u(L){let z=[],k=[],O=[];for(let V=0;V<n;V++)z[V]=0,k[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:k,attributeDivisors:O,object:L,attributes:{},index:null}}function f(L,z,k,O){let V=a.attributes,J=z.attributes,Z=0,it=k.getAttributes();for(let W in it)if(it[W].location>=0){let nt=V[W],wt=J[W];if(wt===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(wt=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(wt=L.instanceColor)),nt===void 0||nt.attribute!==wt||wt&&nt.data!==wt.data)return!0;Z++}return a.attributesNum!==Z||a.index!==O}function g(L,z,k,O){let V={},J=z.attributes,Z=0,it=k.getAttributes();for(let W in it)if(it[W].location>=0){let nt=J[W];nt===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(nt=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(nt=L.instanceColor));let wt={};wt.attribute=nt,nt&&nt.data&&(wt.data=nt.data),V[W]=wt,Z++}a.attributes=V,a.attributesNum=Z,a.index=O}function x(){let L=a.newAttributes;for(let z=0,k=L.length;z<k;z++)L[z]=0}function m(L){d(L,0)}function d(L,z){let k=a.newAttributes,O=a.enabledAttributes,V=a.attributeDivisors;k[L]=1,O[L]===0&&(e.enableVertexAttribArray(L),O[L]=1),V[L]!==z&&(e.vertexAttribDivisor(L,z),V[L]=z)}function v(){let L=a.newAttributes,z=a.enabledAttributes;for(let k=0,O=z.length;k<O;k++)z[k]!==L[k]&&(e.disableVertexAttribArray(k),z[k]=0)}function b(L,z,k,O,V,J,Z){Z===!0?e.vertexAttribIPointer(L,z,k,V,J):e.vertexAttribPointer(L,z,k,O,V,J)}function y(L,z,k,O){x();let V=O.attributes,J=k.getAttributes(),Z=z.defaultAttributeValues;for(let it in J){let W=J[it];if(W.location>=0){let tt=V[it];if(tt===void 0&&(it==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),it==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor)),tt!==void 0){let nt=tt.normalized,wt=tt.itemSize,Tt=t.get(tt);if(Tt===void 0)continue;let ye=Tt.buffer,Jt=Tt.type,ee=Tt.bytesPerElement,q=Jt===e.INT||Jt===e.UNSIGNED_INT||tt.gpuType===_d;if(tt.isInterleavedBufferAttribute){let $=tt.data,_t=$.stride,Ot=tt.offset;if($.isInstancedInterleavedBuffer){for(let gt=0;gt<W.locationSize;gt++)d(W.location+gt,$.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let gt=0;gt<W.locationSize;gt++)m(W.location+gt);e.bindBuffer(e.ARRAY_BUFFER,ye);for(let gt=0;gt<W.locationSize;gt++)b(W.location+gt,wt/W.locationSize,Jt,nt,_t*ee,(Ot+wt/W.locationSize*gt)*ee,q)}else{if(tt.isInstancedBufferAttribute){for(let $=0;$<W.locationSize;$++)d(W.location+$,tt.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let $=0;$<W.locationSize;$++)m(W.location+$);e.bindBuffer(e.ARRAY_BUFFER,ye);for(let $=0;$<W.locationSize;$++)b(W.location+$,wt/W.locationSize,Jt,nt,wt*ee,wt/W.locationSize*$*ee,q)}}else if(Z!==void 0){let nt=Z[it];if(nt!==void 0)switch(nt.length){case 2:e.vertexAttrib2fv(W.location,nt);break;case 3:e.vertexAttrib3fv(W.location,nt);break;case 4:e.vertexAttrib4fv(W.location,nt);break;default:e.vertexAttrib1fv(W.location,nt)}}}}v()}function E(){A();for(let L in i){let z=i[L];for(let k in z){let O=z[k];for(let V in O){let J=O[V];for(let Z in J)h(J[Z].object),delete J[Z];delete O[V]}}delete i[L]}}function T(L){if(i[L.id]===void 0)return;let z=i[L.id];for(let k in z){let O=z[k];for(let V in O){let J=O[V];for(let Z in J)h(J[Z].object),delete J[Z];delete O[V]}}delete i[L.id]}function C(L){for(let z in i){let k=i[z];for(let O in k){let V=k[O];if(V[L.id]===void 0)continue;let J=V[L.id];for(let Z in J)h(J[Z].object),delete J[Z];delete V[L.id]}}}function S(L){for(let z in i){let k=i[z],O=L.isInstancedMesh===!0?L.id:0,V=k[O];if(V!==void 0){for(let J in V){let Z=V[J];for(let it in Z)h(Z[it].object),delete Z[it];delete V[J]}delete k[O],Object.keys(k).length===0&&delete i[z]}}}function A(){R(),r=!0,a!==s&&(a=s,c(a.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function XN(e,t,n){let i;function s(l){i=l}function a(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,h){h!==0&&(e.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];n.update(u,i,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function WN(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(C){return!(C!==Li&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let S=C===Ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==yi&&C!==Zi&&!S&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),d=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=e.getParameter(e.MAX_SAMPLES),T=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:y,maxSamples:E,samples:T}}function qN(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Xi,o=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let f=p.length!==0||u||i!==0||s;return s=u,i=p.length,f},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,u){n=h(p,u,0)},this.setState=function(p,u,f){let g=p.clippingPlanes,x=p.clipIntersection,m=p.clipShadows,d=e.get(p);if(!s||g===null||g.length===0||a&&!m)a?h(null):c();else{let v=a?0:i,b=v*4,y=d.clippingState||null;l.value=y,y=h(g,u,b,f);for(let E=0;E!==b;++E)y[E]=n[E];d.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(p,u,f,g){let x=p!==null?p.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let d=f+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,y=f;b!==x;++b,y+=4)r.copy(p[b]).applyMatrix4(v,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var pl=4,YN=6,ZN=20,JN=256,uu=new jc,SE=new Kt,Wv=null,qv=0,Yv=0,Zv=!1,KN=new F,zr=new F,ap=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=KN}=a;Wv=this._renderer.getRenderTarget(),qv=this._renderer.getActiveCubeFace(),Yv=this._renderer.getActiveMipmapLevel(),Zv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=EE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ME(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Wv,qv,Yv),this._renderer.xr.enabled=Zv,t.scissorTest=!1,dl(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Za||t.mapping===Br?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wv=this._renderer.getRenderTarget(),qv=this._renderer.getActiveCubeFace(),Yv=this._renderer.getActiveMipmapLevel(),Zv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Ji,format:Li,colorSpace:Ic,depthBuffer:!1},s=bE(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bE(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=QN(a)),this._blurMaterial=$N(a,t,n),this._ggxMaterial=jN(a,t,n)}return s}_compileMaterial(t){let n=new Pn(new vi,t);this._renderer.compile(n,uu)}_sceneToCubeUV(t,n,i,s,a){let l=new An(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,f=p.toneMapping;p.getClearColor(SE),p.toneMapping=qi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pn(new cl,new Wc({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,d=!1,v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,d=!0):(m.color.copy(SE),d=!0);for(let b=0;b<6;b++){let y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+h[b],a.y,a.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+h[b],a.z)):(l.up.set(0,c[b],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+h[b]));let E=this._cubeSize;dl(s,y*E,b>2?E:0,E,E),p.setRenderTarget(s),d&&p.render(x,l),p.render(t,l)}p.toneMapping=f,p.autoClear=u,t.background=v}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Za||t.mapping===Br;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=EE()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ME());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;dl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,uu)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),u=c*1.25,f=p*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-pl?i-g+pl:0),d=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-n,dl(a,m,d,3*x,2*x),s.setRenderTarget(a),s.render(o,uu),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=g-i,dl(t,m,d,3*x,2*x),s.setRenderTarget(t),s.render(o,uu)}_blur(t,n,i,s){let a=this._pingPongRenderTarget,r=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,a,n,i,r),this._blurPass(a,t,i,i,r)}_blurPass(t,n,i,s,a){let r=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],p=3*h*(s>this._lodMax-pl?s-this._lodMax+pl:0),u=4*(this._cubeSize-h);dl(n,p,u,3*h,2*h),r.setRenderTarget(n),r.render(l,uu)}};function QN(e){let t=[],n=[],i=e,s=e-pl+1+YN;for(let a=0;a<s;a++){let r=Math.pow(2,i);t.push(r);let o=1/(r-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,u=6,f=3,g=new Float32Array(f*u*p),x=new Float32Array(f*u*p);for(let d=0;d<p;d++){let v=d%3*2/3-1,b=d>2?0:-1,y=[v,b,0,v+2/3,b,0,v+2/3,b+1,0,v,b,0,v+2/3,b+1,0,v,b+1,0];g.set(y,f*u*d);for(let E=0;E<u;E++){let T=h[E*2]*2-1,C=h[E*2+1]*2-1;d===0?zr.set(1,C,T):d===1?zr.set(-T,1,-C):d===2?zr.set(-T,C,1):d===3?zr.set(-1,C,-T):d===4?zr.set(-T,-1,C):zr.set(T,C,-1),zr.toArray(x,(d*u+E)*f)}}let m=new vi;m.setAttribute("position",new wn(g,f)),m.setAttribute("outputDirection",new wn(x,f)),n.push(new Pn(m,null)),i>pl&&i--}return{lodMeshes:n,sizeLods:t}}function bE(e,t,n){let i=new Qn(e,t,n);return i.texture.mapping=eu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function dl(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function jN(e,t,n){return new Bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:JN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lp(),fragmentShader:`

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
		`,blending:bs,depthTest:!1,depthWrite:!1})}function $N(e,t,n){return new Bn({name:"SphericalGaussianBlur",defines:{SAMPLES:ZN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:lp(),fragmentShader:`

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
		`,blending:bs,depthTest:!1,depthWrite:!1})}function ME(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lp(),fragmentShader:`

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
		`,blending:bs,depthTest:!1,depthWrite:!1})}function EE(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bs,depthTest:!1,depthWrite:!1})}function lp(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var rp=class extends Qn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Zc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new cl(5,5,5),a=new Bn({name:"CubemapFromEquirect",uniforms:Fr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Fn,blending:bs});a.uniforms.tEquirect.value=n;let r=new Pn(s,a),o=n.minFilter;return n.minFilter===Ja&&(n.minFilter=_n),new dd(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};function tD(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?r(u):a(u)}function a(u){if(u&&u.isTexture){let f=u.mapping;if(f===md||f===gd)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new rp(g.height);return x.fromEquirectangularTexture(e,u),t.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let f=u.mapping,g=f===md||f===gd,x=f===Za||f===Br;if(g||x){let m=n.get(u),d=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new ap(e)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{let v=u.image;return g&&v&&v.height>0||x&&v&&l(v)?(i===null&&(i=new ap(e)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===md?u.mapping=Za:f===gd&&(u.mapping=Br),u}function l(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=n.get(f);g!==void 0&&(n.delete(f),g.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function eD(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&Lr("WebGLRenderer: "+i+" extension not supported."),s}}}function nD(e,t,n,i){let s={},a=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete s[u.id];let f=a.get(u);f&&(t.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let f in u)t.update(u[f],e.ARRAY_BUFFER)}function c(p){let u=[],f=p.index,g=p.attributes.position,x=0;if(g===void 0)return;if(f!==null){let v=f.array;x=f.version;for(let b=0,y=v.length;b<y;b+=3){let E=v[b+0],T=v[b+1],C=v[b+2];u.push(E,T,T,C,C,E)}}else{let v=g.array;x=g.version;for(let b=0,y=v.length/3-1;b<y;b+=3){let E=b+0,T=b+1,C=b+2;u.push(E,T,T,C,C,E)}}let m=new(g.count>=65535?kc:Gc)(u,1);m.version=x;let d=a.get(p);d&&t.remove(d),a.set(p,m)}function h(p){let u=a.get(p);if(u){let f=p.index;f!==null&&u.version<f.version&&c(p)}else c(p);return a.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function iD(e,t,n){let i;function s(p){i=p}let a,r;function o(p){a=p.type,r=p.bytesPerElement}function l(p,u){e.drawElements(i,u,a,p*r),n.update(u,i,1)}function c(p,u,f){f!==0&&(e.drawElementsInstanced(i,u,a,p*r,f),n.update(u,i,f))}function h(p,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,p,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];n.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function sD(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:Dt("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function aD(e,t,n){let i=new WeakMap,s=new Ie;function a(r,o,l){let c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==p){let A=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],b=0;f===!0&&(b=1),g===!0&&(b=2),x===!0&&(b=3);let y=o.attributes.position.count*b,E=1;y>t.maxTextureSize&&(E=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*E*4*p),C=new zc(T,y,E,p);C.type=Zi,C.needsUpdate=!0;let S=b*4;for(let R=0;R<p;R++){let L=m[R],z=d[R],k=v[R],O=y*E*4*R;for(let V=0;V<L.count;V++){let J=V*S;f===!0&&(s.fromBufferAttribute(L,V),T[O+J+0]=s.x,T[O+J+1]=s.y,T[O+J+2]=s.z,T[O+J+3]=0),g===!0&&(s.fromBufferAttribute(z,V),T[O+J+4]=s.x,T[O+J+5]=s.y,T[O+J+6]=s.z,T[O+J+7]=0),x===!0&&(s.fromBufferAttribute(k,V),T[O+J+8]=s.x,T[O+J+9]=s.y,T[O+J+10]=s.z,T[O+J+11]=k.itemSize===4?s.w:1)}}u={count:p,texture:C,size:new te(y,E)},i.set(o,u),o.addEventListener("dispose",A)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function rD(e,t,n,i,s){let a=new WeakMap;function r(c){let h=s.render.frame,p=c.geometry,u=t.get(c,p);if(a.get(u)!==h&&(t.update(u),a.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==h&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;a.get(f)!==h&&(f.update(),a.set(f,h))}return u}function o(){a=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:r,dispose:o}}var oD={[Mv]:"LINEAR_TONE_MAPPING",[Ev]:"REINHARD_TONE_MAPPING",[Tv]:"CINEON_TONE_MAPPING",[Av]:"ACES_FILMIC_TONE_MAPPING",[Cv]:"AGX_TONE_MAPPING",[Rv]:"NEUTRAL_TONE_MAPPING",[wv]:"CUSTOM_TONE_MAPPING"};function lD(e,t,n,i,s,a){let r=new Qn(t,n,{type:e,depthBuffer:s,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new vi;c.setAttribute("position",new Jn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Jn([0,2,0,0,2,0],2));let h=new td({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Pn(c,h),u=new jc(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,d=null,v=[],b=!1;this.setSize=function(y,E){r.setSize(y,E),o!==null&&o.setSize(y,E),l!==null&&l.setSize(y,E);for(let T=0;T<v.length;T++){let C=v[T];C.setSize&&C.setSize(y,E)}},this.setEffects=function(y){v=y,b=v.length>0&&v[0].isRenderPass===!0;let E=r.width,T=r.height;v.length>0&&o===null&&(o=new Qn(E,T,{type:Ji,depthBuffer:!1,stencilBuffer:!1}),l=new Qn(E,T,{type:Ji,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<v.length;C++){let S=v[C];S.setSize&&S.setSize(E,T)}},this.begin=function(y,E){if(x||y.toneMapping===qi&&v.length===0)return!1;if(d=E,E!==null){let T=E.width,C=E.height;(r.width!==T||r.height!==C)&&this.setSize(T,C)}return b===!1&&y.setRenderTarget(r),m=y.toneMapping,y.toneMapping=qi,!0},this.hasRenderPass=function(){return b},this.end=function(y,E){y.toneMapping=m,x=!0;let T=r,C=o;for(let S=0;S<v.length;S++){let A=v[S];A.enabled!==!1&&(A.render(y,C,T,E),A.needsSwap!==!1&&(T=C,C=C===o?l:o))}if(f!==y.outputColorSpace||g!==y.toneMapping){f=y.outputColorSpace,g=y.toneMapping,h.defines={},Yt.getTransfer(f)===le&&(h.defines.SRGB_TRANSFER="");let S=oD[g];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,y.setRenderTarget(d),y.render(p,u),d=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var XE=new Kn,Qv=new Ga(1,1),WE=new zc,qE=new Yf,YE=new Zc,TE=[],AE=[],wE=new Float32Array(16),CE=new Float32Array(9),RE=new Float32Array(4);function gl(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=TE[s];if(a===void 0&&(a=new Float32Array(s),TE[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function je(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function $e(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function cp(e,t){let n=AE[t];n===void 0&&(n=new Int32Array(t),AE[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function cD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function uD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(je(n,t))return;e.uniform2fv(this.addr,t),$e(n,t)}}function hD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(je(n,t))return;e.uniform3fv(this.addr,t),$e(n,t)}}function fD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(je(n,t))return;e.uniform4fv(this.addr,t),$e(n,t)}}function dD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(je(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$e(n,t)}else{if(je(n,i))return;RE.set(i),e.uniformMatrix2fv(this.addr,!1,RE),$e(n,i)}}function pD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(je(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$e(n,t)}else{if(je(n,i))return;CE.set(i),e.uniformMatrix3fv(this.addr,!1,CE),$e(n,i)}}function mD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(je(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$e(n,t)}else{if(je(n,i))return;wE.set(i),e.uniformMatrix4fv(this.addr,!1,wE),$e(n,i)}}function gD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function vD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(je(n,t))return;e.uniform2iv(this.addr,t),$e(n,t)}}function _D(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(je(n,t))return;e.uniform3iv(this.addr,t),$e(n,t)}}function yD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(je(n,t))return;e.uniform4iv(this.addr,t),$e(n,t)}}function xD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function SD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(je(n,t))return;e.uniform2uiv(this.addr,t),$e(n,t)}}function bD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(je(n,t))return;e.uniform3uiv(this.addr,t),$e(n,t)}}function MD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(je(n,t))return;e.uniform4uiv(this.addr,t),$e(n,t)}}function ED(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(Qv.compareFunction=n.isReversedDepthBuffer()?ep:tp,a=Qv):a=XE,n.setTexture2D(t||a,s)}function TD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||qE,s)}function AD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||YE,s)}function wD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||WE,s)}function CD(e){switch(e){case 5126:return cD;case 35664:return uD;case 35665:return hD;case 35666:return fD;case 35674:return dD;case 35675:return pD;case 35676:return mD;case 5124:case 35670:return gD;case 35667:case 35671:return vD;case 35668:case 35672:return _D;case 35669:case 35673:return yD;case 5125:return xD;case 36294:return SD;case 36295:return bD;case 36296:return MD;case 35678:case 36198:case 36298:case 36306:case 35682:return ED;case 35679:case 36299:case 36307:return TD;case 35680:case 36300:case 36308:case 36293:return AD;case 36289:case 36303:case 36311:case 36292:return wD}}function RD(e,t){e.uniform1fv(this.addr,t)}function ND(e,t){let n=gl(t,this.size,2);e.uniform2fv(this.addr,n)}function DD(e,t){let n=gl(t,this.size,3);e.uniform3fv(this.addr,n)}function UD(e,t){let n=gl(t,this.size,4);e.uniform4fv(this.addr,n)}function LD(e,t){let n=gl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function OD(e,t){let n=gl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ID(e,t){let n=gl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function PD(e,t){e.uniform1iv(this.addr,t)}function BD(e,t){e.uniform2iv(this.addr,t)}function FD(e,t){e.uniform3iv(this.addr,t)}function zD(e,t){e.uniform4iv(this.addr,t)}function HD(e,t){e.uniform1uiv(this.addr,t)}function VD(e,t){e.uniform2uiv(this.addr,t)}function GD(e,t){e.uniform3uiv(this.addr,t)}function kD(e,t){e.uniform4uiv(this.addr,t)}function XD(e,t,n){let i=this.cache,s=t.length,a=cp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=Qv:r=XE;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function WD(e,t,n){let i=this.cache,s=t.length,a=cp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||qE,a[r])}function qD(e,t,n){let i=this.cache,s=t.length,a=cp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||YE,a[r])}function YD(e,t,n){let i=this.cache,s=t.length,a=cp(n,s);je(i,a)||(e.uniform1iv(this.addr,a),$e(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||WE,a[r])}function ZD(e){switch(e){case 5126:return RD;case 35664:return ND;case 35665:return DD;case 35666:return UD;case 35674:return LD;case 35675:return OD;case 35676:return ID;case 5124:case 35670:return PD;case 35667:case 35671:return BD;case 35668:case 35672:return FD;case 35669:case 35673:return zD;case 5125:return HD;case 36294:return VD;case 36295:return GD;case 36296:return kD;case 35678:case 36198:case 36298:case 36306:case 35682:return XD;case 35679:case 36299:case 36307:return WD;case 35680:case 36300:case 36308:case 36293:return qD;case 36289:case 36303:case 36311:case 36292:return YD}}var jv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=CD(n.type)}},$v=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ZD(n.type)}},t_=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},Jv=/(\w+)(\])?(\[|\.)?/g;function NE(e,t){e.seq.push(t),e.map[t.id]=t}function JD(e,t,n){let i=e.name,s=i.length;for(Jv.lastIndex=0;;){let a=Jv.exec(i),r=Jv.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){NE(n,c===void 0?new jv(o,e,t):new $v(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new t_(o),NE(n,p)),n=p}}}var ml=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);JD(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function DE(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var KD=37297,QD=0;function jD(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var UE=new Lt;function $D(e){Yt._getMatrix(UE,Yt.workingColorSpace,e);let t=`mat3( ${UE.elements.map(n=>n.toFixed(4))} )`;switch(Yt.getTransfer(e)){case Pc:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function LE(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+jD(e.getShaderSource(t),o)}else return a}function tU(e,t){let n=$D(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var eU={[Mv]:"Linear",[Ev]:"Reinhard",[Tv]:"Cineon",[Av]:"ACESFilmic",[Cv]:"AgX",[Rv]:"Neutral",[wv]:"Custom"};function nU(e,t){let n=eU[t];return n===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var sp=new F;function iU(){Yt.getLuminanceCoefficients(sp);let e=sp.x.toFixed(4),t=sp.y.toFixed(4),n=sp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sU(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fu).join(`
`)}function aU(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function rU(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function fu(e){return e!==""}function OE(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function IE(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var oU=/^[ \t]*#include +<([\w\d./]+)>/gm;function e_(e){return e.replace(oU,cU)}var lU=new Map;function cU(e,t){let n=Ft[t];if(n===void 0){let i=lU.get(t);if(i!==void 0)n=Ft[i],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return e_(n)}var uU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function PE(e){return e.replace(uU,hU)}function hU(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function BE(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var fU={[$c]:"SHADOWMAP_TYPE_PCF",[ul]:"SHADOWMAP_TYPE_VSM"};function dU(e){return fU[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var pU={[Za]:"ENVMAP_TYPE_CUBE",[Br]:"ENVMAP_TYPE_CUBE",[eu]:"ENVMAP_TYPE_CUBE_UV"};function mU(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":pU[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var gU={[Br]:"ENVMAP_MODE_REFRACTION"};function vU(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":gU[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var _U={[bv]:"ENVMAP_BLENDING_MULTIPLY",[tE]:"ENVMAP_BLENDING_MIX",[eE]:"ENVMAP_BLENDING_ADD"};function yU(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":_U[e.combine]||"ENVMAP_BLENDING_NONE"}function xU(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function SU(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=dU(n),c=mU(n),h=vU(n),p=yU(n),u=xU(n),f=sU(n),g=aU(a),x=s.createProgram(),m,d,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(fu).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(fu).join(`
`),d.length>0&&(d+=`
`)):(m=[BE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fu).join(`
`),d=[BE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==qi?"#define TONE_MAPPING":"",n.toneMapping!==qi?Ft.tonemapping_pars_fragment:"",n.toneMapping!==qi?nU("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,tU("linearToOutputTexel",n.outputColorSpace),iU(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fu).join(`
`)),r=e_(r),r=OE(r,n),r=IE(r,n),o=e_(o),o=OE(o,n),o=IE(o,n),r=PE(r),o=PE(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",n.glslVersion===zv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===zv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let b=v+m+r,y=v+d+o,E=DE(s,s.VERTEX_SHADER,b),T=DE(s,s.FRAGMENT_SHADER,y);s.attachShader(x,E),s.attachShader(x,T),n.index0AttributeName!==void 0?s.bindAttribLocation(x,0,n.index0AttributeName):n.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(L){if(e.debug.checkShaderErrors){let z=s.getProgramInfoLog(x)||"",k=s.getShaderInfoLog(E)||"",O=s.getShaderInfoLog(T)||"",V=z.trim(),J=k.trim(),Z=O.trim(),it=!0,W=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(it=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,x,E,T);else{let tt=LE(s,E,"vertex"),nt=LE(s,T,"fragment");Dt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+tt+`
`+nt)}else V!==""?Rt("WebGLProgram: Program Info Log:",V):(J===""||Z==="")&&(W=!1);W&&(L.diagnostics={runnable:it,programLog:V,vertexShader:{log:J,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(E),s.deleteShader(T),S=new ml(s,x),A=rU(s,x)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(x,KD)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=QD++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=T,this}var bU=0,n_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){let s=this._getShaderCacheForMaterial(t);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new i_(t),n.set(t,i)),i}},i_=class{constructor(t){this.id=bU++,this.code=t,this.usedTimes=0}};function MU(e){return e===Qa||e===ou||e===lu}function EU(e,t,n,i,s,a){let r=new Hc,o=new n_,l=new Set,c=[],h=new Map,p=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function x(S,A,R,L,z,k){let O=L.fog,V=z.geometry,J=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,Z=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,it=t.get(S.envMap||J,Z),W=it&&it.mapping===eu?it.image.height:null,tt=f[S.type];S.precision!==null&&(u=i.getMaxPrecision(S.precision),u!==S.precision&&Rt("WebGLProgram.getParameters:",S.precision,"not supported, using",u,"instead."));let nt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,wt=nt!==void 0?nt.length:0,Tt=0;V.morphAttributes.position!==void 0&&(Tt=1),V.morphAttributes.normal!==void 0&&(Tt=2),V.morphAttributes.color!==void 0&&(Tt=3);let ye,Jt,ee,q;if(tt){let Se=Es[tt];ye=Se.vertexShader,Jt=Se.fragmentShader}else{ye=S.vertexShader,Jt=S.fragmentShader;let Se=o.getVertexShaderStage(S),ae=o.getFragmentShaderStage(S);o.update(S,Se,ae),ee=Se.id,q=ae.id}let $=e.getRenderTarget(),_t=e.state.buffers.depth.getReversed(),Ot=z.isInstancedMesh===!0,gt=z.isBatchedMesh===!0,Ht=!!S.map,Ze=!!S.matcap,Vt=!!it,jt=!!S.aoMap,xe=!!S.lightMap,Wt=!!S.bumpMap&&S.wireframe===!1,Re=!!S.normalMap,sn=!!S.displacementMap,Hn=!!S.emissiveMap,Le=!!S.metalnessMap,Ge=!!S.roughnessMap,U=S.anisotropy>0,yn=S.clearcoat>0,ue=S.dispersion>0,w=S.retroreflectivity>0,_=S.iridescence>0,I=S.sheen>0,H=S.transmission>0,X=U&&!!S.anisotropyMap,st=yn&&!!S.clearcoatMap,at=yn&&!!S.clearcoatNormalMap,Y=yn&&!!S.clearcoatRoughnessMap,j=_&&!!S.iridescenceMap,rt=_&&!!S.iridescenceThicknessMap,Mt=I&&!!S.sheenColorMap,ut=I&&!!S.sheenRoughnessMap,ot=!!S.specularMap,Et=!!S.specularColorMap,Ct=!!S.specularIntensityMap,It=H&&!!S.transmissionMap,D=H&&!!S.thicknessMap,lt=!!S.gradientMap,K=!!S.alphaMap,ct=S.alphaTest>0,pt=!!S.alphaHash,et=!!S.extensions,At=qi;S.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(At=e.toneMapping);let St={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:ye,fragmentShader:Jt,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:u,batching:gt,batchingColor:gt&&z._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&z.instanceColor!==null,instancingMorph:Ot&&z.morphTexture!==null,outputColorSpace:$===null?e.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Yt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Ht,matcap:Ze,envMap:Vt,envMapMode:Vt&&it.mapping,envMapCubeUVHeight:W,aoMap:jt,lightMap:xe,bumpMap:Wt,normalMap:Re,displacementMap:sn,emissiveMap:Hn,normalMapObjectSpace:Re&&S.normalMapType===sE,normalMapTangentSpace:Re&&S.normalMapType===Fv,packedNormalMap:Re&&S.normalMapType===Fv&&MU(S.normalMap.format),metalnessMap:Le,roughnessMap:Ge,anisotropy:U,anisotropyMap:X,clearcoat:yn,clearcoatMap:st,clearcoatNormalMap:at,clearcoatRoughnessMap:Y,dispersion:ue,retroreflection:w,iridescence:_,iridescenceMap:j,iridescenceThicknessMap:rt,sheen:I,sheenColorMap:Mt,sheenRoughnessMap:ut,specularMap:ot,specularColorMap:Et,specularIntensityMap:Ct,transmission:H,transmissionMap:It,thicknessMap:D,gradientMap:lt,opaque:S.transparent===!1&&S.blending===Ya&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:ct,alphaHash:pt,combine:S.combine,mapUv:Ht&&g(S.map.channel),aoMapUv:jt&&g(S.aoMap.channel),lightMapUv:xe&&g(S.lightMap.channel),bumpMapUv:Wt&&g(S.bumpMap.channel),normalMapUv:Re&&g(S.normalMap.channel),displacementMapUv:sn&&g(S.displacementMap.channel),emissiveMapUv:Hn&&g(S.emissiveMap.channel),metalnessMapUv:Le&&g(S.metalnessMap.channel),roughnessMapUv:Ge&&g(S.roughnessMap.channel),anisotropyMapUv:X&&g(S.anisotropyMap.channel),clearcoatMapUv:st&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:at&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:ut&&g(S.sheenRoughnessMap.channel),specularMapUv:ot&&g(S.specularMap.channel),specularColorMapUv:Et&&g(S.specularColorMap.channel),specularIntensityMapUv:Ct&&g(S.specularIntensityMap.channel),transmissionMapUv:It&&g(S.transmissionMap.channel),thicknessMapUv:D&&g(S.thicknessMap.channel),alphaMapUv:K&&g(S.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Re||U),vertexNormals:!!V.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!V.attributes.uv&&(Ht||K),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||V.attributes.normal===void 0&&Re===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:_t,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Tt,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:At,decodeVideoTexture:Ht&&S.map.isVideoTexture===!0&&Yt.getTransfer(S.map.colorSpace)===le,decodeVideoTextureEmissive:Hn&&S.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(S.emissiveMap.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ui,flipSided:S.side===Fn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:et&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&S.extensions.multiDraw===!0||gt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function m(S){let A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(let R in S.defines)A.push(R),A.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(d(A,S),v(A,S),A.push(e.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function d(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numSunLights),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numSunLightShadows),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function v(S,A){r.disableAll(),A.instancing&&r.enable(0),A.instancingColor&&r.enable(1),A.instancingMorph&&r.enable(2),A.matcap&&r.enable(3),A.envMap&&r.enable(4),A.normalMapObjectSpace&&r.enable(5),A.normalMapTangentSpace&&r.enable(6),A.clearcoat&&r.enable(7),A.iridescence&&r.enable(8),A.alphaTest&&r.enable(9),A.vertexColors&&r.enable(10),A.vertexAlphas&&r.enable(11),A.vertexUv1s&&r.enable(12),A.vertexUv2s&&r.enable(13),A.vertexUv3s&&r.enable(14),A.vertexTangents&&r.enable(15),A.anisotropy&&r.enable(16),A.alphaHash&&r.enable(17),A.batching&&r.enable(18),A.dispersion&&r.enable(19),A.retroreflection&&r.enable(24),A.batchingColor&&r.enable(20),A.gradientMap&&r.enable(21),A.packedNormalMap&&r.enable(22),A.vertexNormals&&r.enable(23),S.push(r.mask),r.disableAll(),A.fog&&r.enable(0),A.useFog&&r.enable(1),A.flatShading&&r.enable(2),A.logarithmicDepthBuffer&&r.enable(3),A.reversedDepthBuffer&&r.enable(4),A.skinning&&r.enable(5),A.morphTargets&&r.enable(6),A.morphNormals&&r.enable(7),A.morphColors&&r.enable(8),A.premultipliedAlpha&&r.enable(9),A.shadowMapEnabled&&r.enable(10),A.doubleSided&&r.enable(11),A.flipSided&&r.enable(12),A.useDepthPacking&&r.enable(13),A.dithering&&r.enable(14),A.transmission&&r.enable(15),A.sheen&&r.enable(16),A.opaque&&r.enable(17),A.pointsUvs&&r.enable(18),A.decodeVideoTexture&&r.enable(19),A.decodeVideoTextureEmissive&&r.enable(20),A.alphaToCoverage&&r.enable(21),A.numLightProbeGrids>0&&r.enable(22),A.hasPositionAttribute&&r.enable(23),S.push(r.mask)}function b(S){let A=f[S.type],R;if(A){let L=Es[A];R=_E.clone(L.uniforms)}else R=S.uniforms;return R}function y(S,A){let R=h.get(A);return R!==void 0?++R.usedTimes:(R=new SU(e,A,S,s),c.push(R),h.set(A,R)),R}function E(S){if(--S.usedTimes===0){let A=c.indexOf(S);c[A]=c[c.length-1],c.pop(),h.delete(S.cacheKey),S.destroy()}}function T(S){o.remove(S)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:b,acquireProgram:y,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:C}}function TU(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function AU(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function FE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function zE(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,d){let v=e[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:g,materialVariant:r(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:d},e[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=g,v.materialVariant=r(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=m,v.group=d),t++,v}function l(u,f,g,x,m,d,v){v.reversedDepth===!0&&(m=-m);let b=o(u,f,g,x,m,d);g.transmission>0?i.push(b):g.transparent===!0?s.push(b):n.push(b)}function c(u,f,g,x,m,d){let v=o(u,f,g,x,m,d);g.transmission>0?i.unshift(v):g.transparent===!0?s.unshift(v):n.unshift(v)}function h(u,f){n.length>1&&n.sort(u||AU),i.length>1&&i.sort(f||FE),s.length>1&&s.sort(f||FE)}function p(){for(let u=t,f=e.length;u<f;u++){let g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:p,sort:h}}function wU(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new zE,e.set(i,[r])):s>=a.length?(r=new zE,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function CU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new F,color:new Kt};break;case"SpotLight":n={position:new F,direction:new F,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new F,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new F,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":n={color:new Kt,position:new F,halfWidth:new F,halfHeight:new F};break}return e[t.id]=n,n}}}function RU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var NU=0;function DU(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function UU(e){let t=new CU,n=RU(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);let s=new F,a=new ze,r=new ze;function o(c){let h=0,p=0,u=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let f=0,g=0,x=0,m=0,d=0,v=0,b=0,y=0,E=0,T=0,C=0,S=0,A=0,R=0;c.sort(DU);for(let z=0,k=c.length;z<k;z++){let O=c[z],V=O.color,J=O.intensity,Z=O.distance,it=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===Qa?it=O.shadow.map.texture:it=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)h+=V.r*J,p+=V.g*J,u+=V.b*J;else if(O.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(O.sh.coefficients[W],J);R++}else if(O.isSunLight){let W=t.get(O);if(W.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let tt=O.shadow,nt=n.get(O);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),i.sunShadow[g]=nt,i.sunShadowMap[g]=it;let wt=tt.getViewportCount();for(let Tt=0;Tt<wt;Tt++)i.sunShadowMatrix[x+Tt]=tt.getMatrix(Tt),i.sunShadowCascade[x+Tt]=tt._cascadeData[Tt];x+=wt,g++}i.sun[f]=W,f++}else if(O.isDirectionalLight){let W=t.get(O);if(W.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let tt=O.shadow,nt=n.get(O);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,i.directionalShadow[m]=nt,i.directionalShadowMap[m]=it,i.directionalShadowMatrix[m]=O.shadow.matrix,E++}i.directional[m]=W,m++}else if(O.isSpotLight){let W=t.get(O);W.position.setFromMatrixPosition(O.matrixWorld),W.color.copy(V).multiplyScalar(J),W.distance=Z,W.coneCos=Math.cos(O.angle),W.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),W.decay=O.decay,i.spot[v]=W;let tt=O.shadow;if(O.map&&(i.spotLightMap[S]=O.map,S++,tt.updateMatrices(O),O.castShadow&&A++),i.spotLightMatrix[v]=tt.matrix,O.castShadow){let nt=n.get(O);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,i.spotShadow[v]=nt,i.spotShadowMap[v]=it,C++}v++}else if(O.isRectAreaLight){let W=t.get(O);W.color.copy(V).multiplyScalar(J),W.halfWidth.set(O.width*.5,0,0),W.halfHeight.set(0,O.height*.5,0),i.rectArea[b]=W,b++}else if(O.isPointLight){let W=t.get(O);if(W.color.copy(O.color).multiplyScalar(O.intensity),W.distance=O.distance,W.decay=O.decay,O.castShadow){let tt=O.shadow,nt=n.get(O);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,nt.shadowCameraNear=tt.camera.near,nt.shadowCameraFar=tt.camera.far,i.pointShadow[d]=nt,i.pointShadowMap[d]=it,i.pointShadowMatrix[d]=O.shadow.matrix,T++}i.point[d]=W,d++}else if(O.isHemisphereLight){let W=t.get(O);W.skyColor.copy(O.color).multiplyScalar(J),W.groundColor.copy(O.groundColor).multiplyScalar(J),i.hemi[y]=W,y++}}b>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=u;let L=i.hash;(L.sunLength!==f||L.directionalLength!==m||L.pointLength!==d||L.spotLength!==v||L.rectAreaLength!==b||L.hemiLength!==y||L.numSunShadows!==g||L.numDirectionalShadows!==E||L.numPointShadows!==T||L.numSpotShadows!==C||L.numSpotMaps!==S||L.numLightProbes!==R)&&(i.sun.length=f,i.directional.length=m,i.spot.length=v,i.rectArea.length=b,i.point.length=d,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+S-A,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,L.sunLength=f,L.directionalLength=m,L.pointLength=d,L.spotLength=v,L.rectAreaLength=b,L.hemiLength=y,L.numSunShadows=g,L.numDirectionalShadows=E,L.numPointShadows=T,L.numSpotShadows=C,L.numSpotMaps=S,L.numLightProbes=R,i.version=NU++)}function l(c,h){let p=0,u=0,f=0,g=0,x=0,m=0,d=h.matrixWorldInverse;for(let v=0,b=c.length;v<b;v++){let y=c[v];if(y.isSunLight){let E=i.sun[p];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(d),p++}else if(y.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(d),u++}else if(y.isSpotLight){let E=i.spot[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(d),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(d),g++}else if(y.isRectAreaLight){let E=i.rectArea[x];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(d),r.identity(),a.copy(y.matrixWorld),a.premultiply(d),r.extractRotation(a),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),x++}else if(y.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(d),f++}else if(y.isHemisphereLight){let E=i.hemi[m];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:i}}function HE(e){let t=new UU(e),n=[],i=[],s=[];function a(u){p.camera=u,n.length=0,i.length=0,s.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(n)}function h(u){t.setupView(n,u)}let p={lightsArray:n,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:p,setupLights:c,setupLightsView:h,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function LU(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new HE(e),t.set(s,[o])):a>=r.length?(o=new HE(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var OU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,IU=`uniform sampler2D shadow_pass;
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
}`,PU=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],BU=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],VE=new ze,hu=new F,Kv=new F;function FU(e,t,n){let i=new qc,s=new te,a=new te,r=new Ie,o=new ed,l=new nd,c={},h=n.maxTextureSize,p={[qa]:Fn,[Fn]:qa,[Ui]:Ui},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new te},radius:{value:4}},vertexShader:OU,fragmentShader:IU}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new vi;g.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Pn(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$c;let d=this.type;this.render=function(T,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===I1&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=$c);let A=e.getRenderTarget(),R=e.getActiveCubeFace(),L=e.getActiveMipmapLevel(),z=e.state;z.setBlending(bs),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let k=d!==this.type;k&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(V=>V.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,V=T.length;O<V;O++){let J=T[O],Z=J.shadow;if(Z===void 0){Rt("WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let it=Z.getFrameExtents();s.multiply(it),a.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/it.x),s.x=a.x*it.x,Z.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/it.y),s.y=a.y*it.y,Z.mapSize.y=a.y));let W=e.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=W,Z.map===null||k===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===ul){if(J.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Qn(s.x,s.y,{format:Qa,type:Ji,minFilter:_n,magFilter:_n,generateMipmaps:!1}),Z.map.texture.name=J.name+".shadowMap",Z.map.depthTexture=new Ga(s.x,s.y,Zi),Z.map.depthTexture.name=J.name+".shadowMapDepth",Z.map.depthTexture.format=ys,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=un,Z.map.depthTexture.magFilter=un}else J.isPointLight?(Z.map=new rp(s.x),Z.map.depthTexture=new $f(s.x,Yi)):(Z.map=new Qn(s.x,s.y),Z.map.depthTexture=new Ga(s.x,s.y,Yi)),Z.map.depthTexture.name=J.name+".shadowMap",Z.map.depthTexture.format=ys,this.type===$c?(Z.map.depthTexture.compareFunction=W?ep:tp,Z.map.depthTexture.minFilter=_n,Z.map.depthTexture.magFilter=_n):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=un,Z.map.depthTexture.magFilter=un);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==s.x||Z.map.height!==s.y)&&Z.map.setSize(s.x,s.y);let tt=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();J.isPointLight!==!0&&Z.updateMatrices(J,S);for(let nt=0;nt<tt;nt++){let wt=Z.getCamera(nt);if(J.isPointLight){let Tt=Z.camera,ye=Z.matrix,Jt=J.distance||Tt.far;Jt!==Tt.far&&(Tt.far=Jt,Tt.updateProjectionMatrix()),hu.setFromMatrixPosition(J.matrixWorld),Tt.position.copy(hu),Kv.copy(Tt.position),Kv.add(PU[nt]),Tt.up.copy(BU[nt]),Tt.lookAt(Kv),Tt.updateMatrixWorld(),ye.makeTranslation(-hu.x,-hu.y,-hu.z),VE.multiplyMatrices(Tt.projectionMatrix,Tt.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(VE,Tt.coordinateSystem,Tt.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)e.setRenderTarget(Z.map,nt),e.clear();else{nt===0&&(e.setRenderTarget(Z.map),e.clear());let Tt=Z.getViewport(nt);r.set(a.x*Tt.x,a.y*Tt.y,a.x*Tt.z,a.y*Tt.w),z.viewport(r)}i=Z.getFrustum(nt),y(C,S,wt,J,this.type)}Z.isPointLightShadow!==!0&&this.type===ul&&v(Z,S),Z.needsUpdate=!1}d=this.type,m.needsUpdate=!1,e.setRenderTarget(A,R,L)};function v(T,C){let S=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new Qn(s.x,s.y,{format:Qa,type:Ji}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(C,null,S,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(C,null,S,f,x,null)}function b(T,C,S,A){let R=null,L=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)R=L;else if(R=S.isPointLight===!0?l:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let z=R.uuid,k=C.uuid,O=c[z];O===void 0&&(O={},c[z]=O);let V=O[k];V===void 0&&(V=R.clone(),O[k]=V,C.addEventListener("dispose",E)),R=V}if(R.visible=C.visible,R.wireframe=C.wireframe,A===ul?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:p[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let z=e.properties.get(R);z.light=S}return R}function y(T,C,S,A,R){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&R===ul)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let k=t.update(T),O=T.material;if(Array.isArray(O)){let V=k.groups;for(let J=0,Z=V.length;J<Z;J++){let it=V[J],W=O[it.materialIndex];if(W&&W.visible){let tt=b(T,W,A,R);T.onBeforeShadow(e,T,C,S,k,tt,it),e.renderBufferDirect(S,null,k,tt,T,it),T.onAfterShadow(e,T,C,S,k,tt,it)}}}else if(O.visible){let V=b(T,O,A,R);T.onBeforeShadow(e,T,C,S,k,V,null),e.renderBufferDirect(S,null,k,V,T,null),T.onAfterShadow(e,T,C,S,k,V,null)}}let z=T.children;for(let k=0,O=z.length;k<O;k++)y(z[k],C,S,A,R)}function E(T){T.target.removeEventListener("dispose",E);for(let S in c){let A=c[S],R=T.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function zU(e,t){function n(){let D=!1,lt=new Ie,K=null,ct=new Ie(0,0,0,0);return{setMask:function(pt){K!==pt&&!D&&(e.colorMask(pt,pt,pt,pt),K=pt)},setLocked:function(pt){D=pt},setClear:function(pt,et,At,St,Se){Se===!0&&(pt*=St,et*=St,At*=St),lt.set(pt,et,At,St),ct.equals(lt)===!1&&(e.clearColor(pt,et,At,St),ct.copy(lt))},reset:function(){D=!1,K=null,ct.set(-1,0,0,0)}}}function i(){let D=!1,lt=!1,K=null,ct=null,pt=null;return{setReversed:function(et){if(lt!==et){let At=t.get("EXT_clip_control");et?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),lt=et;let St=pt;pt=null,this.setClear(St)}},getReversed:function(){return lt},setTest:function(et){et?$(e.DEPTH_TEST):_t(e.DEPTH_TEST)},setMask:function(et){K!==et&&!D&&(e.depthMask(et),K=et)},setFunc:function(et){if(lt&&(et=gE[et]),ct!==et){switch(et){case Of:e.depthFunc(e.NEVER);break;case If:e.depthFunc(e.ALWAYS);break;case Pf:e.depthFunc(e.LESS);break;case al:e.depthFunc(e.LEQUAL);break;case Bf:e.depthFunc(e.EQUAL);break;case Ff:e.depthFunc(e.GEQUAL);break;case zf:e.depthFunc(e.GREATER);break;case Hf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ct=et}},setLocked:function(et){D=et},setClear:function(et){pt!==et&&(pt=et,lt&&(et=1-et),e.clearDepth(et))},reset:function(){D=!1,K=null,ct=null,pt=null,lt=!1}}}function s(){let D=!1,lt=null,K=null,ct=null,pt=null,et=null,At=null,St=null,Se=null;return{setTest:function(ae){D||(ae?$(e.STENCIL_TEST):_t(e.STENCIL_TEST))},setMask:function(ae){lt!==ae&&!D&&(e.stencilMask(ae),lt=ae)},setFunc:function(ae,Oi,$i){(K!==ae||ct!==Oi||pt!==$i)&&(e.stencilFunc(ae,Oi,$i),K=ae,ct=Oi,pt=$i)},setOp:function(ae,Oi,$i){(et!==ae||At!==Oi||St!==$i)&&(e.stencilOp(ae,Oi,$i),et=ae,At=Oi,St=$i)},setLocked:function(ae){D=ae},setClear:function(ae){Se!==ae&&(e.clearStencil(ae),Se=ae)},reset:function(){D=!1,lt=null,K=null,ct=null,pt=null,et=null,At=null,St=null,Se=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},p={},u={},f=new WeakMap,g=[],x=null,m=!1,d=null,v=null,b=null,y=null,E=null,T=null,C=null,S=new Kt(0,0,0),A=0,R=!1,L=null,z=null,k=null,O=null,V=null,J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,it=0,W=e.getParameter(e.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=it>=2);let tt=null,nt={},wt=e.getParameter(e.SCISSOR_BOX),Tt=e.getParameter(e.VIEWPORT),ye=new Ie().fromArray(wt),Jt=new Ie().fromArray(Tt);function ee(D,lt,K,ct){let pt=new Uint8Array(4),et=e.createTexture();e.bindTexture(D,et),e.texParameteri(D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(D,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let At=0;At<K;At++)D===e.TEXTURE_3D||D===e.TEXTURE_2D_ARRAY?e.texImage3D(lt,0,e.RGBA,1,1,ct,0,e.RGBA,e.UNSIGNED_BYTE,pt):e.texImage2D(lt+At,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,pt);return et}let q={};q[e.TEXTURE_2D]=ee(e.TEXTURE_2D,e.TEXTURE_2D,1),q[e.TEXTURE_CUBE_MAP]=ee(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[e.TEXTURE_2D_ARRAY]=ee(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),q[e.TEXTURE_3D]=ee(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),$(e.DEPTH_TEST),r.setFunc(al),Wt(!1),Re(vv),$(e.CULL_FACE),jt(bs);function $(D){h[D]!==!0&&(e.enable(D),h[D]=!0)}function _t(D){h[D]!==!1&&(e.disable(D),h[D]=!1)}function Ot(D,lt){return u[D]!==lt?(e.bindFramebuffer(D,lt),u[D]=lt,D===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=lt),D===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=lt),!0):!1}function gt(D,lt){let K=g,ct=!1;if(D){K=f.get(lt),K===void 0&&(K=[],f.set(lt,K));let pt=D.textures;if(K.length!==pt.length||K[0]!==e.COLOR_ATTACHMENT0){for(let et=0,At=pt.length;et<At;et++)K[et]=e.COLOR_ATTACHMENT0+et;K.length=pt.length,ct=!0}}else K[0]!==e.BACK&&(K[0]=e.BACK,ct=!0);ct&&e.drawBuffers(K)}function Ht(D){return x!==D?(e.useProgram(D),x=D,!0):!1}let Ze={[Pr]:e.FUNC_ADD,[B1]:e.FUNC_SUBTRACT,[F1]:e.FUNC_REVERSE_SUBTRACT};Ze[z1]=e.MIN,Ze[H1]=e.MAX;let Vt={[V1]:e.ZERO,[G1]:e.ONE,[k1]:e.SRC_COLOR,[xv]:e.SRC_ALPHA,[J1]:e.SRC_ALPHA_SATURATE,[Y1]:e.DST_COLOR,[W1]:e.DST_ALPHA,[X1]:e.ONE_MINUS_SRC_COLOR,[Sv]:e.ONE_MINUS_SRC_ALPHA,[Z1]:e.ONE_MINUS_DST_COLOR,[q1]:e.ONE_MINUS_DST_ALPHA,[K1]:e.CONSTANT_COLOR,[Q1]:e.ONE_MINUS_CONSTANT_COLOR,[j1]:e.CONSTANT_ALPHA,[$1]:e.ONE_MINUS_CONSTANT_ALPHA};function jt(D,lt,K,ct,pt,et,At,St,Se,ae){if(D===bs){m===!0&&(_t(e.BLEND),m=!1);return}if(m===!1&&($(e.BLEND),m=!0),D!==P1){if(D!==d||ae!==R){if((v!==Pr||E!==Pr)&&(e.blendEquation(e.FUNC_ADD),v=Pr,E=Pr),ae)switch(D){case Ya:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case tu:e.blendFunc(e.ONE,e.ONE);break;case _v:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case yv:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Dt("WebGLState: Invalid blending: ",D);break}else switch(D){case Ya:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case tu:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case _v:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yv:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",D);break}b=null,y=null,T=null,C=null,S.set(0,0,0),A=0,d=D,R=ae}return}pt=pt||lt,et=et||K,At=At||ct,(lt!==v||pt!==E)&&(e.blendEquationSeparate(Ze[lt],Ze[pt]),v=lt,E=pt),(K!==b||ct!==y||et!==T||At!==C)&&(e.blendFuncSeparate(Vt[K],Vt[ct],Vt[et],Vt[At]),b=K,y=ct,T=et,C=At),(St.equals(S)===!1||Se!==A)&&(e.blendColor(St.r,St.g,St.b,Se),S.copy(St),A=Se),d=D,R=!1}function xe(D,lt){D.side===Ui?_t(e.CULL_FACE):$(e.CULL_FACE);let K=D.side===Fn;lt&&(K=!K),Wt(K),D.blending===Ya&&D.transparent===!1?jt(bs):jt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),a.setMask(D.colorWrite);let ct=D.stencilWrite;o.setTest(ct),ct&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Hn(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(e.SAMPLE_ALPHA_TO_COVERAGE):_t(e.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(D){L!==D&&(D?e.frontFace(e.CW):e.frontFace(e.CCW),L=D)}function Re(D){D!==L1?($(e.CULL_FACE),D!==z&&(D===vv?e.cullFace(e.BACK):D===O1?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):_t(e.CULL_FACE),z=D}function sn(D){D!==k&&(Z&&e.lineWidth(D),k=D)}function Hn(D,lt,K){D?($(e.POLYGON_OFFSET_FILL),(O!==lt||V!==K)&&(O=lt,V=K,r.getReversed()&&(lt=-lt),e.polygonOffset(lt,K))):_t(e.POLYGON_OFFSET_FILL)}function Le(D){D?$(e.SCISSOR_TEST):_t(e.SCISSOR_TEST)}function Ge(D){D===void 0&&(D=e.TEXTURE0+J-1),tt!==D&&(e.activeTexture(D),tt=D)}function U(D,lt,K){K===void 0&&(tt===null?K=e.TEXTURE0+J-1:K=tt);let ct=nt[K];ct===void 0&&(ct={type:void 0,texture:void 0},nt[K]=ct),(ct.type!==D||ct.texture!==lt)&&(tt!==K&&(e.activeTexture(K),tt=K),e.bindTexture(D,lt||q[D]),ct.type=D,ct.texture=lt)}function yn(){let D=nt[tt];D!==void 0&&D.type!==void 0&&(e.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ue(){try{e.compressedTexImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function w(){try{e.compressedTexImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function _(){try{e.texSubImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function I(){try{e.texSubImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function H(){try{e.compressedTexSubImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function X(){try{e.compressedTexSubImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function st(){try{e.texStorage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function at(){try{e.texStorage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function Y(){try{e.texImage2D(...arguments)}catch(D){Dt("WebGLState:",D)}}function j(){try{e.texImage3D(...arguments)}catch(D){Dt("WebGLState:",D)}}function rt(D){return p[D]!==void 0?p[D]:e.getParameter(D)}function Mt(D,lt){p[D]!==lt&&(e.pixelStorei(D,lt),p[D]=lt)}function ut(D){ye.equals(D)===!1&&(e.scissor(D.x,D.y,D.z,D.w),ye.copy(D))}function ot(D){Jt.equals(D)===!1&&(e.viewport(D.x,D.y,D.z,D.w),Jt.copy(D))}function Et(D,lt){let K=c.get(lt);K===void 0&&(K=new WeakMap,c.set(lt,K));let ct=K.get(D);ct===void 0&&(ct=e.getUniformBlockIndex(lt,D.name),K.set(D,ct))}function Ct(D,lt){let ct=c.get(lt).get(D);l.get(lt)!==ct&&(e.uniformBlockBinding(lt,ct,D.__bindingPointIndex),l.set(lt,ct))}function It(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),h={},p={},tt=null,nt={},u={},f=new WeakMap,g=[],x=null,m=!1,d=null,v=null,b=null,y=null,E=null,T=null,C=null,S=new Kt(0,0,0),A=0,R=!1,L=null,z=null,k=null,O=null,V=null,ye.set(0,0,e.canvas.width,e.canvas.height),Jt.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:$,disable:_t,bindFramebuffer:Ot,drawBuffers:gt,useProgram:Ht,setBlending:jt,setMaterial:xe,setFlipSided:Wt,setCullFace:Re,setLineWidth:sn,setPolygonOffset:Hn,setScissorTest:Le,activeTexture:Ge,bindTexture:U,unbindTexture:yn,compressedTexImage2D:ue,compressedTexImage3D:w,texImage2D:Y,texImage3D:j,pixelStorei:Mt,getParameter:rt,updateUBOMapping:Et,uniformBlockBinding:Ct,texStorage2D:st,texStorage3D:at,texSubImage2D:_,texSubImage3D:I,compressedTexSubImage2D:H,compressedTexSubImage3D:X,scissor:ut,viewport:ot,reset:It}}function HU(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new te,h=new WeakMap,p=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,_){return g?new OffscreenCanvas(w,_):Fc("canvas")}function m(w,_,I){let H=1,X=ue(w);if((X.width>I||X.height>I)&&(H=I/Math.max(X.width,X.height)),H<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let st=Math.floor(H*X.width),at=Math.floor(H*X.height);u===void 0&&(u=x(st,at));let Y=_?x(st,at):u;return Y.width=st,Y.height=at,Y.getContext("2d").drawImage(w,0,0,st,at),Rt("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+st+"x"+at+")."),Y}else return"data"in w&&Rt("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),w;return w}function d(w){return w.generateMipmaps}function v(w){e.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?e.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(w,_,I,H,X,st=!1){if(w!==null){if(e[w]!==void 0)return e[w];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let at;H&&(at=t.get("EXT_texture_norm16"),at||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===e.RED&&(I===e.FLOAT&&(Y=e.R32F),I===e.HALF_FLOAT&&(Y=e.R16F),I===e.UNSIGNED_BYTE&&(Y=e.R8),I===e.UNSIGNED_SHORT&&at&&(Y=at.R16_EXT),I===e.SHORT&&at&&(Y=at.R16_SNORM_EXT)),_===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.R8UI),I===e.UNSIGNED_SHORT&&(Y=e.R16UI),I===e.UNSIGNED_INT&&(Y=e.R32UI),I===e.BYTE&&(Y=e.R8I),I===e.SHORT&&(Y=e.R16I),I===e.INT&&(Y=e.R32I)),_===e.RG&&(I===e.FLOAT&&(Y=e.RG32F),I===e.HALF_FLOAT&&(Y=e.RG16F),I===e.UNSIGNED_BYTE&&(Y=e.RG8),I===e.UNSIGNED_SHORT&&at&&(Y=at.RG16_EXT),I===e.SHORT&&at&&(Y=at.RG16_SNORM_EXT)),_===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RG8UI),I===e.UNSIGNED_SHORT&&(Y=e.RG16UI),I===e.UNSIGNED_INT&&(Y=e.RG32UI),I===e.BYTE&&(Y=e.RG8I),I===e.SHORT&&(Y=e.RG16I),I===e.INT&&(Y=e.RG32I)),_===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RGB8UI),I===e.UNSIGNED_SHORT&&(Y=e.RGB16UI),I===e.UNSIGNED_INT&&(Y=e.RGB32UI),I===e.BYTE&&(Y=e.RGB8I),I===e.SHORT&&(Y=e.RGB16I),I===e.INT&&(Y=e.RGB32I)),_===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(Y=e.RGBA16UI),I===e.UNSIGNED_INT&&(Y=e.RGBA32UI),I===e.BYTE&&(Y=e.RGBA8I),I===e.SHORT&&(Y=e.RGBA16I),I===e.INT&&(Y=e.RGBA32I)),_===e.RGB&&(I===e.UNSIGNED_SHORT&&at&&(Y=at.RGB16_EXT),I===e.SHORT&&at&&(Y=at.RGB16_SNORM_EXT),I===e.UNSIGNED_INT_5_9_9_9_REV&&(Y=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(Y=e.R11F_G11F_B10F)),_===e.RGBA){let j=st?Pc:Yt.getTransfer(X);I===e.FLOAT&&(Y=e.RGBA32F),I===e.HALF_FLOAT&&(Y=e.RGBA16F),I===e.UNSIGNED_BYTE&&(Y=j===le?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT&&at&&(Y=at.RGBA16_EXT),I===e.SHORT&&at&&(Y=at.RGBA16_SNORM_EXT),I===e.UNSIGNED_SHORT_4_4_4_4&&(Y=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(Y=e.RGB5_A1)}return(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function E(w,_){let I;return w?_===null||_===Yi||_===fl?I=e.DEPTH24_STENCIL8:_===Zi?I=e.DEPTH32F_STENCIL8:_===hl&&(I=e.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Yi||_===fl?I=e.DEPTH_COMPONENT24:_===Zi?I=e.DEPTH_COMPONENT32F:_===hl&&(I=e.DEPTH_COMPONENT16),I}function T(w,_){return d(w)===!0||w.isFramebufferTexture&&w.minFilter!==un&&w.minFilter!==_n?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function C(w){let _=w.target;_.removeEventListener("dispose",C),A(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&p.delete(_)}function S(w){let _=w.target;_.removeEventListener("dispose",S),L(_)}function A(w){let _=i.get(w);if(_.__webglInit===void 0)return;let I=w.source,H=f.get(I);if(H){let X=H[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&R(w),Object.keys(H).length===0&&f.delete(I)}i.remove(w)}function R(w){let _=i.get(w);e.deleteTexture(_.__webglTexture);let I=w.source,H=f.get(I);delete H[_.__cacheKey],r.memory.textures--}function L(w){let _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let X=0;X<_.__webglFramebuffer[H].length;X++)e.deleteFramebuffer(_.__webglFramebuffer[H][X]);else e.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)e.deleteFramebuffer(_.__webglFramebuffer[H]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let I=w.textures;for(let H=0,X=I.length;H<X;H++){let st=i.get(I[H]);st.__webglTexture&&(e.deleteTexture(st.__webglTexture),r.memory.textures--),i.remove(I[H])}i.remove(w)}let z=0;function k(){z=0}function O(){return z}function V(w){z=w}function J(){let w=z;return w>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),z+=1,w}function Z(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function it(w,_){let I=i.get(w);if(w.isVideoTexture&&U(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&I.__version!==w.version){let H=w.image;if(H===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{_t(I,w,_);return}}else w.isExternalTexture&&(I.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+_)}function W(w,_){let I=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&I.__version!==w.version){_t(I,w,_);return}else w.isExternalTexture&&(I.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+_)}function tt(w,_){let I=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&I.__version!==w.version){_t(I,w,_);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+_)}function nt(w,_){let I=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&I.__version!==w.version){Ot(I,w,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+_)}let wt={[Vf]:e.REPEAT,[_s]:e.CLAMP_TO_EDGE,[Gf]:e.MIRRORED_REPEAT},Tt={[un]:e.NEAREST,[nE]:e.NEAREST_MIPMAP_NEAREST,[nu]:e.NEAREST_MIPMAP_LINEAR,[_n]:e.LINEAR,[vd]:e.LINEAR_MIPMAP_NEAREST,[Ja]:e.LINEAR_MIPMAP_LINEAR},ye={[rE]:e.NEVER,[hE]:e.ALWAYS,[oE]:e.LESS,[tp]:e.LEQUAL,[lE]:e.EQUAL,[ep]:e.GEQUAL,[cE]:e.GREATER,[uE]:e.NOTEQUAL};function Jt(w,_){if(_.type===Zi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===_n||_.magFilter===vd||_.magFilter===nu||_.magFilter===Ja||_.minFilter===_n||_.minFilter===vd||_.minFilter===nu||_.minFilter===Ja)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(w,e.TEXTURE_WRAP_S,wt[_.wrapS]),e.texParameteri(w,e.TEXTURE_WRAP_T,wt[_.wrapT]),(w===e.TEXTURE_3D||w===e.TEXTURE_2D_ARRAY)&&e.texParameteri(w,e.TEXTURE_WRAP_R,wt[_.wrapR]),e.texParameteri(w,e.TEXTURE_MAG_FILTER,Tt[_.magFilter]),e.texParameteri(w,e.TEXTURE_MIN_FILTER,Tt[_.minFilter]),_.compareFunction&&(e.texParameteri(w,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(w,e.TEXTURE_COMPARE_FUNC,ye[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===un||_.minFilter!==nu&&_.minFilter!==Ja||_.type===Zi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(w,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function ee(w,_){let I=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",C));let H=_.source,X=f.get(H);X===void 0&&(X={},f.set(H,X));let st=Z(_);if(st!==w.__cacheKey){X[st]===void 0&&(X[st]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,I=!0),X[st].usedTimes++;let at=X[w.__cacheKey];at!==void 0&&(X[w.__cacheKey].usedTimes--,at.usedTimes===0&&R(_)),w.__cacheKey=st,w.__webglTexture=X[st].texture}return I}function q(w,_,I){return Math.floor(Math.floor(w/I)/_)}function $(w,_,I,H){let st=w.updateRanges;if(st.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,I,H,_.data);else{st.sort((Mt,ut)=>Mt.start-ut.start);let at=0;for(let Mt=1;Mt<st.length;Mt++){let ut=st[at],ot=st[Mt],Et=ut.start+ut.count,Ct=q(ot.start,_.width,4),It=q(ut.start,_.width,4);ot.start<=Et+1&&Ct===It&&q(ot.start+ot.count-1,_.width,4)===Ct?ut.count=Math.max(ut.count,ot.start+ot.count-ut.start):(++at,st[at]=ot)}st.length=at+1;let Y=n.getParameter(e.UNPACK_ROW_LENGTH),j=n.getParameter(e.UNPACK_SKIP_PIXELS),rt=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Mt=0,ut=st.length;Mt<ut;Mt++){let ot=st[Mt],Et=Math.floor(ot.start/4),Ct=Math.ceil(ot.count/4),It=Et%_.width,D=Math.floor(Et/_.width),lt=Ct,K=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,It),n.pixelStorei(e.UNPACK_SKIP_ROWS,D),n.texSubImage2D(e.TEXTURE_2D,0,It,D,lt,K,I,H,_.data)}w.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,Y),n.pixelStorei(e.UNPACK_SKIP_PIXELS,j),n.pixelStorei(e.UNPACK_SKIP_ROWS,rt)}}function _t(w,_,I){let H=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=e.TEXTURE_3D);let X=ee(w,_),st=_.source;n.bindTexture(H,w.__webglTexture,e.TEXTURE0+I);let at=i.get(st);if(st.version!==at.__version||X===!0){if(n.activeTexture(e.TEXTURE0+I),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let K=Yt.getPrimaries(Yt.workingColorSpace),ct=_.colorSpace===Qs?null:Yt.getPrimaries(_.colorSpace),pt=_.colorSpace===Qs||K===ct?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment);let j=m(_.image,!1,s.maxTextureSize);j=yn(_,j);let rt=a.convert(_.format,_.colorSpace),Mt=a.convert(_.type),ut=y(_.internalFormat,rt,Mt,_.normalized,_.colorSpace,_.isVideoTexture);Jt(H,_);let ot,Et=_.mipmaps,Ct=_.isVideoTexture!==!0,It=at.__version===void 0||X===!0,D=st.dataReady,lt=T(_,j);if(_.isDepthTexture)ut=E(_.format===Ka,_.type),It&&(Ct?n.texStorage2D(e.TEXTURE_2D,1,ut,j.width,j.height):n.texImage2D(e.TEXTURE_2D,0,ut,j.width,j.height,0,rt,Mt,null));else if(_.isDataTexture)if(Et.length>0){Ct&&It&&n.texStorage2D(e.TEXTURE_2D,lt,ut,Et[0].width,Et[0].height);for(let K=0,ct=Et.length;K<ct;K++)ot=Et[K],Ct?D&&n.texSubImage2D(e.TEXTURE_2D,K,0,0,ot.width,ot.height,rt,Mt,ot.data):n.texImage2D(e.TEXTURE_2D,K,ut,ot.width,ot.height,0,rt,Mt,ot.data);_.generateMipmaps=!1}else Ct?(It&&n.texStorage2D(e.TEXTURE_2D,lt,ut,j.width,j.height),D&&$(_,j,rt,Mt)):n.texImage2D(e.TEXTURE_2D,0,ut,j.width,j.height,0,rt,Mt,j.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ct&&It&&n.texStorage3D(e.TEXTURE_2D_ARRAY,lt,ut,Et[0].width,Et[0].height,j.depth);for(let K=0,ct=Et.length;K<ct;K++)if(ot=Et[K],_.format!==Li)if(rt!==null)if(Ct){if(D)if(_.layerUpdates.size>0){let pt=Xv(ot.width,ot.height,_.format,_.type);for(let et of _.layerUpdates){let At=ot.data.subarray(et*pt/ot.data.BYTES_PER_ELEMENT,(et+1)*pt/ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,et,ot.width,ot.height,1,rt,At)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,ot.width,ot.height,j.depth,rt,ot.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,K,ut,ot.width,ot.height,j.depth,0,ot.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ct?D&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,ot.width,ot.height,j.depth,rt,Mt,ot.data):n.texImage3D(e.TEXTURE_2D_ARRAY,K,ut,ot.width,ot.height,j.depth,0,rt,Mt,ot.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ct&&It&&n.texStorage2D(e.TEXTURE_2D,lt,ut,Et[0].width,Et[0].height);for(let K=0,ct=Et.length;K<ct;K++)ot=Et[K],_.format!==Li?rt!==null?Ct?D&&n.compressedTexSubImage2D(e.TEXTURE_2D,K,0,0,ot.width,ot.height,rt,ot.data):n.compressedTexImage2D(e.TEXTURE_2D,K,ut,ot.width,ot.height,0,ot.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?D&&n.texSubImage2D(e.TEXTURE_2D,K,0,0,ot.width,ot.height,rt,Mt,ot.data):n.texImage2D(e.TEXTURE_2D,K,ut,ot.width,ot.height,0,rt,Mt,ot.data)}else if(_.isDataArrayTexture)if(Ct){if(It&&n.texStorage3D(e.TEXTURE_2D_ARRAY,lt,ut,j.width,j.height,j.depth),D)if(_.layerUpdates.size>0){let K=Xv(j.width,j.height,_.format,_.type);for(let ct of _.layerUpdates){let pt=j.data.subarray(ct*K/j.data.BYTES_PER_ELEMENT,(ct+1)*K/j.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ct,j.width,j.height,1,rt,Mt,pt)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,rt,Mt,j.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,ut,j.width,j.height,j.depth,0,rt,Mt,j.data);else if(_.isData3DTexture)Ct?(It&&n.texStorage3D(e.TEXTURE_3D,lt,ut,j.width,j.height,j.depth),D&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,rt,Mt,j.data)):n.texImage3D(e.TEXTURE_3D,0,ut,j.width,j.height,j.depth,0,rt,Mt,j.data);else if(_.isFramebufferTexture){if(It)if(Ct)n.texStorage2D(e.TEXTURE_2D,lt,ut,j.width,j.height);else{let K=j.width,ct=j.height;for(let pt=0;pt<lt;pt++)n.texImage2D(e.TEXTURE_2D,pt,ut,K,ct,0,rt,Mt,null),K>>=1,ct>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in e){let K=e.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),j.parentNode!==K){K.appendChild(j),p.add(_),K.onpaint=ct=>{let pt=ct.changedElements;for(let et of p)pt.includes(et.image)&&(et.needsUpdate=!0)},K.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,j);else{let pt=e.RGBA,et=e.RGBA,At=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,pt,et,At,j)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Et.length>0){if(Ct&&It){let K=ue(Et[0]);n.texStorage2D(e.TEXTURE_2D,lt,ut,K.width,K.height)}for(let K=0,ct=Et.length;K<ct;K++)ot=Et[K],Ct?D&&n.texSubImage2D(e.TEXTURE_2D,K,0,0,rt,Mt,ot):n.texImage2D(e.TEXTURE_2D,K,ut,rt,Mt,ot);_.generateMipmaps=!1}else if(Ct){if(It){let K=ue(j);n.texStorage2D(e.TEXTURE_2D,lt,ut,K.width,K.height)}D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,rt,Mt,j)}else n.texImage2D(e.TEXTURE_2D,0,ut,rt,Mt,j);d(_)&&v(H),at.__version=st.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Ot(w,_,I){if(_.image.length!==6)return;let H=ee(w,_),X=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+I);let st=i.get(X);if(X.version!==st.__version||H===!0){n.activeTexture(e.TEXTURE0+I);let at=Yt.getPrimaries(Yt.workingColorSpace),Y=_.colorSpace===Qs?null:Yt.getPrimaries(_.colorSpace),j=_.colorSpace===Qs||at===Y?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let rt=_.isCompressedTexture||_.image[0].isCompressedTexture,Mt=_.image[0]&&_.image[0].isDataTexture,ut=[];for(let et=0;et<6;et++)!rt&&!Mt?ut[et]=m(_.image[et],!0,s.maxCubemapSize):ut[et]=Mt?_.image[et].image:_.image[et],ut[et]=yn(_,ut[et]);let ot=ut[0],Et=a.convert(_.format,_.colorSpace),Ct=a.convert(_.type),It=y(_.internalFormat,Et,Ct,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,lt=st.__version===void 0||H===!0,K=X.dataReady,ct=T(_,ot);Jt(e.TEXTURE_CUBE_MAP,_);let pt;if(rt){D&&lt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,ct,It,ot.width,ot.height);for(let et=0;et<6;et++){pt=ut[et].mipmaps;for(let At=0;At<pt.length;At++){let St=pt[At];_.format!==Li?Et!==null?D?K&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At,0,0,St.width,St.height,Et,St.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At,It,St.width,St.height,0,St.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At,0,0,St.width,St.height,Et,Ct,St.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At,It,St.width,St.height,0,Et,Ct,St.data)}}}else{if(pt=_.mipmaps,D&&lt){pt.length>0&&ct++;let et=ue(ut[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,ct,It,et.width,et.height)}for(let et=0;et<6;et++)if(Mt){D?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,ut[et].width,ut[et].height,Et,Ct,ut[et].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,It,ut[et].width,ut[et].height,0,Et,Ct,ut[et].data);for(let At=0;At<pt.length;At++){let Se=pt[At].image[et].image;D?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At+1,0,0,Se.width,Se.height,Et,Ct,Se.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At+1,It,Se.width,Se.height,0,Et,Ct,Se.data)}}else{D?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Et,Ct,ut[et]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,It,Et,Ct,ut[et]);for(let At=0;At<pt.length;At++){let St=pt[At];D?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At+1,0,0,Et,Ct,St.image[et]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+et,At+1,It,Et,Ct,St.image[et])}}}d(_)&&v(e.TEXTURE_CUBE_MAP),st.__version=X.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function gt(w,_,I,H,X,st){let at=a.convert(I.format,I.colorSpace),Y=a.convert(I.type),j=y(I.internalFormat,at,Y,I.normalized,I.colorSpace),rt=i.get(_),Mt=i.get(I);if(Mt.__renderTarget=_,!rt.__hasExternalTextures){let ut=Math.max(1,_.width>>st),ot=Math.max(1,_.height>>st);X===e.TEXTURE_3D||X===e.TEXTURE_2D_ARRAY?n.texImage3D(X,st,j,ut,ot,_.depth,0,at,Y,null):n.texImage2D(X,st,j,ut,ot,0,at,Y,null)}n.bindFramebuffer(e.FRAMEBUFFER,w),Ge(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,H,X,Mt.__webglTexture,0,Le(_)):(X===e.TEXTURE_2D||X>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,H,X,Mt.__webglTexture,st),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ht(w,_,I){if(e.bindRenderbuffer(e.RENDERBUFFER,w),_.depthBuffer){let H=_.depthTexture,X=H&&H.isDepthTexture?H.type:null,st=E(_.stencilBuffer,X),at=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ge(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(_),st,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(_),st,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,st,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,at,e.RENDERBUFFER,w)}else{let H=_.textures;for(let X=0;X<H.length;X++){let st=H[X],at=a.convert(st.format,st.colorSpace),Y=a.convert(st.type),j=y(st.internalFormat,at,Y,st.normalized,st.colorSpace);Ge(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(_),j,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(_),j,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,j,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ze(w,_,I){let H=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let X=i.get(_.depthTexture);if(X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H){if(X.__webglInit===void 0&&(X.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),X.__webglTexture===void 0){X.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),Jt(e.TEXTURE_CUBE_MAP,_.depthTexture);let rt=a.convert(_.depthTexture.format),Mt=a.convert(_.depthTexture.type),ut;_.depthTexture.format===ys?ut=e.DEPTH_COMPONENT24:_.depthTexture.format===Ka&&(ut=e.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ut,_.width,_.height,0,rt,Mt,null)}}else it(_.depthTexture,0);let st=X.__webglTexture,at=Le(_),Y=H?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,j=_.depthTexture.format===Ka?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===ys)Ge(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,Y,st,0,at):e.framebufferTexture2D(e.FRAMEBUFFER,j,Y,st,0);else if(_.depthTexture.format===Ka)Ge(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,Y,st,0,at):e.framebufferTexture2D(e.FRAMEBUFFER,j,Y,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Vt(w){let _=i.get(w),I=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let H=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){let X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",X)};H.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=H}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let H=0;H<6;H++)Ze(_.__webglFramebuffer[H],w,H);else{let H=w.texture.mipmaps;H&&H.length>0?Ze(_.__webglFramebuffer[0],w,0):Ze(_.__webglFramebuffer,w,0)}else if(I){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=e.createRenderbuffer(),Ht(_.__webglDepthbuffer[H],w,!1);else{let X=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer[H];e.bindRenderbuffer(e.RENDERBUFFER,st),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,st)}}else{let H=w.texture.mipmaps;if(H&&H.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),Ht(_.__webglDepthbuffer,w,!1);else{let X=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,st),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,st)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function jt(w,_,I){let H=i.get(w);_!==void 0&&gt(H.__webglFramebuffer,w,w.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Vt(w)}function xe(w){let _=w.texture,I=i.get(w),H=i.get(_);w.addEventListener("dispose",S);let X=w.textures,st=w.isWebGLCubeRenderTarget===!0,at=X.length>1;if(at||(H.__webglTexture===void 0&&(H.__webglTexture=e.createTexture()),H.__version=_.version,r.memory.textures++),st){I.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[Y]=[];for(let j=0;j<_.mipmaps.length;j++)I.__webglFramebuffer[Y][j]=e.createFramebuffer()}else I.__webglFramebuffer[Y]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)I.__webglFramebuffer[Y]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(at)for(let Y=0,j=X.length;Y<j;Y++){let rt=i.get(X[Y]);rt.__webglTexture===void 0&&(rt.__webglTexture=e.createTexture(),r.memory.textures++)}if(w.samples>0&&Ge(w)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let Y=0;Y<X.length;Y++){let j=X[Y];I.__webglColorRenderbuffer[Y]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[Y]);let rt=a.convert(j.format,j.colorSpace),Mt=a.convert(j.type),ut=y(j.internalFormat,rt,Mt,j.normalized,j.colorSpace,w.isXRRenderTarget===!0),ot=Le(w);e.renderbufferStorageMultisample(e.RENDERBUFFER,ot,ut,w.width,w.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Y,e.RENDERBUFFER,I.__webglColorRenderbuffer[Y])}e.bindRenderbuffer(e.RENDERBUFFER,null),w.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Ht(I.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(st){n.bindTexture(e.TEXTURE_CUBE_MAP,H.__webglTexture),Jt(e.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)gt(I.__webglFramebuffer[Y][j],w,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,j);else gt(I.__webglFramebuffer[Y],w,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);d(_)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(at){for(let Y=0,j=X.length;Y<j;Y++){let rt=X[Y],Mt=i.get(rt),ut=e.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ut=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ut,Mt.__webglTexture),Jt(ut,rt),gt(I.__webglFramebuffer,w,rt,e.COLOR_ATTACHMENT0+Y,ut,0),d(rt)&&v(ut)}n.unbindTexture()}else{let Y=e.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Y=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(Y,H.__webglTexture),Jt(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)gt(I.__webglFramebuffer[j],w,_,e.COLOR_ATTACHMENT0,Y,j);else gt(I.__webglFramebuffer,w,_,e.COLOR_ATTACHMENT0,Y,0);d(_)&&v(Y),n.unbindTexture()}w.depthBuffer&&Vt(w)}function Wt(w){let _=w.textures;for(let I=0,H=_.length;I<H;I++){let X=_[I];if(d(X)){let st=b(w),at=i.get(X).__webglTexture;n.bindTexture(st,at),v(st),n.unbindTexture()}}}let Re=[],sn=[];function Hn(w){if(w.samples>0){if(Ge(w)===!1){let _=w.textures,I=w.width,H=w.height,X=e.COLOR_BUFFER_BIT,st=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,at=i.get(w),Y=_.length>1;if(Y)for(let rt=0;rt<_.length;rt++)n.bindFramebuffer(e.FRAMEBUFFER,at.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,at.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer);let j=w.texture.mipmaps;j&&j.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let rt=0;rt<_.length;rt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(X|=e.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(X|=e.STENCIL_BUFFER_BIT)),Y){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,at.__webglColorRenderbuffer[rt]);let Mt=i.get(_[rt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Mt,0)}e.blitFramebuffer(0,0,I,H,0,0,I,H,X,e.NEAREST),l===!0&&(Re.length=0,sn.length=0,Re.push(e.COLOR_ATTACHMENT0+rt),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(Re.push(st),sn.push(st),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,sn)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Re))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Y)for(let rt=0;rt<_.length;rt++){n.bindFramebuffer(e.FRAMEBUFFER,at.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,at.__webglColorRenderbuffer[rt]);let Mt=i.get(_[rt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,at.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.TEXTURE_2D,Mt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let _=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function Le(w){return Math.min(s.maxSamples,w.samples)}function Ge(w){let _=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(w){let _=r.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function yn(w,_){let I=w.colorSpace,H=w.format,X=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||I!==Ic&&I!==Qs&&(Yt.getTransfer(I)===le?(H!==Li||X!==yi)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",I)),_}function ue(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=k,this.getTextureUnits=O,this.setTextureUnits=V,this.setTexture2D=it,this.setTexture2DArray=W,this.setTexture3D=tt,this.setTextureCube=nt,this.rebindTextures=jt,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Hn,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function VU(e,t){function n(i,s=Qs){let a,r=Yt.getTransfer(s);if(i===yi)return e.UNSIGNED_BYTE;if(i===yd)return e.UNSIGNED_SHORT_4_4_4_4;if(i===xd)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Lv)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ov)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Dv)return e.BYTE;if(i===Uv)return e.SHORT;if(i===hl)return e.UNSIGNED_SHORT;if(i===_d)return e.INT;if(i===Yi)return e.UNSIGNED_INT;if(i===Zi)return e.FLOAT;if(i===Ji)return e.HALF_FLOAT;if(i===Iv)return e.ALPHA;if(i===Pv)return e.RGB;if(i===Li)return e.RGBA;if(i===ys)return e.DEPTH_COMPONENT;if(i===Ka)return e.DEPTH_STENCIL;if(i===Bv)return e.RED;if(i===Sd)return e.RED_INTEGER;if(i===Qa)return e.RG;if(i===bd)return e.RG_INTEGER;if(i===Md)return e.RGBA_INTEGER;if(i===iu||i===su||i===au||i===ru)if(r===le)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===iu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===su)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===au)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ru)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===iu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===su)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===au)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ru)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ed||i===Td||i===Ad||i===wd)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ed)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Td)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ad)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Cd||i===Rd||i===Nd||i===Dd||i===Ud||i===ou||i===Ld)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Cd||i===Rd)return r===le?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Nd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Dd)return a.COMPRESSED_R11_EAC;if(i===Ud)return a.COMPRESSED_SIGNED_R11_EAC;if(i===ou)return a.COMPRESSED_RG11_EAC;if(i===Ld)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Od||i===Id||i===Pd||i===Bd||i===Fd||i===zd||i===Hd||i===Vd||i===Gd||i===kd||i===Xd||i===Wd||i===qd||i===Yd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Od)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Id)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===kd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yd)return r===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zd||i===Jd||i===Kd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Zd)return r===le?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Jd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qd||i===jd||i===lu||i===$d)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Qd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===jd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===$d)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fl?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var GU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kU=`
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

}`,s_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Jc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Bn({vertexShader:GU,fragmentShader:kU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Pn(new Ir(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},a_=class extends xs{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new s_,d={},v=n.getContextAttributes(),b=null,y=null,E=[],T=[],C=new te,S=null,A=null,R=new An;R.viewport=new Ie;let L=new An;L.viewport=new Ie;let z=[R,L],k=new pd,O=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let $=E[q];return $===void 0&&($=new ll,E[q]=$),$.getTargetRaySpace()},this.getControllerGrip=function(q){let $=E[q];return $===void 0&&($=new ll,E[q]=$),$.getGripSpace()},this.getHand=function(q){let $=E[q];return $===void 0&&($=new ll,E[q]=$),$.getHandSpace()};function J(q){let $=T.indexOf(q.inputSource);if($===-1)return;let _t=E[$];_t!==void 0&&(_t.update(q.inputSource,q.frame,c||r),_t.dispatchEvent({type:q.type,data:q.inputSource}))}function Z(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",it);for(let q=0;q<E.length;q++){let $=T[q];$!==null&&(T[q]=null,E[q].disconnect($))}O=null,V=null,m.reset();for(let q in d)delete d[q];if(t.setRenderTarget(b),f=null,u=null,p=null,s=null,y=null,ee.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(C.width,C.height,!1),A!==null){let q=A.camera;q.fov=A.fov,q.zoom=A.zoom,q.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return p===null&&x&&(p=new XRWebGLBinding(s,n)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",it),v.xrCompatible!==!0&&await n.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Ot=null,gt=null;v.depth&&(gt=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,_t=v.stencil?Ka:ys,Ot=v.stencil?fl:Yi);let Ht={colorFormat:n.RGBA8,depthFormat:gt,scaleFactor:a};p=this.getBinding(),u=p.createProjectionLayer(Ht),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Qn(u.textureWidth,u.textureHeight,{format:Li,type:yi,depthTexture:new Ga(u.textureWidth,u.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let _t={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,n,_t),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Qn(f.framebufferWidth,f.framebufferHeight,{format:Li,type:yi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),ee.setContext(s),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(q){for(let $=0;$<q.removed.length;$++){let _t=q.removed[$],Ot=T.indexOf(_t);Ot>=0&&(T[Ot]=null,E[Ot].disconnect(_t))}for(let $=0;$<q.added.length;$++){let _t=q.added[$],Ot=T.indexOf(_t);if(Ot===-1){for(let Ht=0;Ht<E.length;Ht++)if(Ht>=T.length){T.push(_t),Ot=Ht;break}else if(T[Ht]===null){T[Ht]=_t,Ot=Ht;break}if(Ot===-1)break}let gt=E[Ot];gt&&gt.connect(_t)}}let W=new F,tt=new F;function nt(q,$,_t){W.setFromMatrixPosition($.matrixWorld),tt.setFromMatrixPosition(_t.matrixWorld);let Ot=W.distanceTo(tt),gt=$.projectionMatrix.elements,Ht=_t.projectionMatrix.elements,Ze=gt[14]/(gt[10]-1),Vt=gt[14]/(gt[10]+1),jt=(gt[9]+1)/gt[5],xe=(gt[9]-1)/gt[5],Wt=(gt[8]-1)/gt[0],Re=(Ht[8]+1)/Ht[0],sn=Ze*Wt,Hn=Ze*Re,Le=Ot/(-Wt+Re),Ge=Le*-Wt;if($.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ge),q.translateZ(Le),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),gt[10]===-1)q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let U=Ze+Le,yn=Vt+Le,ue=sn-Ge,w=Hn+(Ot-Ge),_=jt*Vt/yn*U,I=xe*Vt/yn*U;q.projectionMatrix.makePerspective(ue,w,_,I,U,yn),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function wt(q,$){$===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices($.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let $=q.near,_t=q.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(_t=m.depthFar)),k.near=L.near=R.near=$,k.far=L.far=R.far=_t,(O!==k.near||V!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),O=k.near,V=k.far),k.layers.mask=q.layers.mask|6,R.layers.mask=k.layers.mask&-5,L.layers.mask=k.layers.mask&-3;let Ot=q.parent,gt=k.cameras;wt(k,Ot);for(let Ht=0;Ht<gt.length;Ht++)wt(gt[Ht],Ot);gt.length===2?nt(k,R,L):k.projectionMatrix.copy(R.projectionMatrix),A===null&&q.isPerspectiveCamera&&(A={camera:q,fov:q.fov,zoom:q.zoom}),Tt(q,k,Ot)};function Tt(q,$,_t){_t===null?q.matrix.copy($.matrixWorld):(q.matrix.copy(_t.matrixWorld),q.matrix.invert(),q.matrix.multiply($.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Xf*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(q){return d[q]};let ye=null;function Jt(q,$){if(h=$.getViewerPose(c||r),g=$,h!==null){let _t=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Ot=!1;_t.length!==k.cameras.length&&(k.cameras.length=0,Ot=!0);for(let Vt=0;Vt<_t.length;Vt++){let jt=_t[Vt],xe=null;if(f!==null)xe=f.getViewport(jt);else{let Re=p.getViewSubImage(u,jt);xe=Re.viewport,Vt===0&&(t.setRenderTargetTextures(y,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(y))}let Wt=z[Vt];Wt===void 0&&(Wt=new An,Wt.layers.enable(Vt),Wt.viewport=new Ie,z[Vt]=Wt),Wt.matrix.fromArray(jt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(jt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(xe.x,xe.y,xe.width,xe.height),Vt===0&&(k.matrix.copy(Wt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ot===!0&&k.cameras.push(Wt)}let gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){p=i.getBinding();let Vt=p.getDepthInformation(_t[0]);Vt&&Vt.isValid&&Vt.texture&&m.init(Vt,s.renderState)}if(gt&&gt.includes("camera-access")&&x){t.state.unbindTexture(),p=i.getBinding();for(let Vt=0;Vt<_t.length;Vt++){let jt=_t[Vt].camera;if(jt){let xe=d[jt];xe||(xe=new Jc,d[jt]=xe);let Wt=p.getCameraImage(jt);xe.sourceTexture=Wt}}}}for(let _t=0;_t<E.length;_t++){let Ot=T[_t],gt=E[_t];Ot!==null&&gt!==void 0&&gt.update(Ot,$,c||r)}ye&&ye(q,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}let ee=new GE;ee.setAnimationLoop(Jt),this.setAnimationLoop=function(q){ye=q},this.dispose=function(){}}},XU=new ze,ZE=new Lt;ZE.set(-1,0,0,0,1,0,0,0,1);function WU(e,t){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Vv(e)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,v,b,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?a(m,d):d.isMeshLambertMaterial?(a(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(a(m,d),p(m,d)):d.isMeshPhongMaterial?(a(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(a(m,d),u(m,d),d.isMeshPhysicalMaterial&&f(m,d,y)):d.isMeshMatcapMaterial?(a(m,d),g(m,d)):d.isMeshDepthMaterial?a(m,d):d.isMeshDistanceMaterial?(a(m,d),x(m,d)):d.isMeshNormalMaterial?a(m,d):d.isLineBasicMaterial?(r(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,v,b):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function a(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Fn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Fn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=t.get(d),b=v.envMap,y=v.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(XU.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ZE),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function r(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,v,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=b*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function p(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Fn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let v=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function qU(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){let T=E.program;i.uniformBlockBinding(y,T)}function c(y,E){let T=s[y.id];T===void 0&&(m(y),T=h(y),s[y.id]=T,y.addEventListener("dispose",v));let C=E.program;i.updateUBOMapping(y,C);let S=t.render.frame;a[y.id]!==S&&(u(y),a[y.id]=S)}function h(y){let E=p();y.__bindingPointIndex=E;let T=e.createBuffer(),C=y.__size,S=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,T),e.bufferData(e.UNIFORM_BUFFER,C,S),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,E,T),T}function p(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let E=s[y.id],T=y.uniforms,C=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,E);for(let S=0,A=T.length;S<A;S++){let R=T[S];if(Array.isArray(R))for(let L=0,z=R.length;L<z;L++)f(R[L],S,L,C);else f(R,S,0,C)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function f(y,E,T,C){if(x(y,E,T,C)===!0){let S=y.__offset,A=y.value;if(Array.isArray(A)){let R=0;for(let L=0;L<A.length;L++){let z=A[L],k=d(z);g(z,y.__data,R),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(R+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,y.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,S,y.__data)}}function g(y,E,T){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,T)}function x(y,E,T,C){let S=y.value,A=E+"_"+T;if(C[A]===void 0)return typeof S=="number"||typeof S=="boolean"?C[A]=S:ArrayBuffer.isView(S)?C[A]=S.slice():C[A]=S.clone(),!0;{let R=C[A];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return C[A]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(R.equals(S)===!1)return R.copy(S),!0}}return!1}function m(y){let E=y.uniforms,T=0,C=16;for(let A=0,R=E.length;A<R;A++){let L=Array.isArray(E[A])?E[A]:[E[A]];for(let z=0,k=L.length;z<k;z++){let O=L[z],V=Array.isArray(O.value)?O.value:[O.value];for(let J=0,Z=V.length;J<Z;J++){let it=V[J],W=d(it),tt=T%C,nt=tt%W.boundary,wt=tt+nt;T+=nt,wt!==0&&C-wt<W.storage&&(T+=C-wt),O.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=W.storage}}}let S=T%C;return S>0&&(T+=C-S),y.__size=T,y.__cache={},this}function d(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",y),E}function v(y){let E=y.target;E.removeEventListener("dispose",v);let T=r.indexOf(E.__bindingPointIndex);r.splice(T,1),e.deleteBuffer(s[E.id]),delete s[E.id],delete a[E.id]}function b(){for(let y in s)e.deleteBuffer(s[y]);r=[],s={},a={}}return{bind:l,update:c,dispose:b}}var YU=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ms=null;function ZU(){return Ms===null&&(Ms=new Zf(YU,16,16,Qa,Ji),Ms.name="DFG_LUT",Ms.minFilter=_n,Ms.magFilter=_n,Ms.wrapS=_s,Ms.wrapT=_s,Ms.generateMipmaps=!1,Ms.needsUpdate=!0),Ms}var op=class{constructor(t={}){let{canvas:n=dE(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:f=yi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;let x=f,m=new Set([Md,bd,Sd]),d=new Set([yi,Yi,hl,fl,yd,xd]),v=new Uint32Array(4),b=new Int32Array(4),y=new F,E=null,T=null,C=[],S=[],A=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,z=null,k=null,O=null,V=null;this._outputColorSpace=mi;let J=0,Z=0,it=null,W=-1,tt=null,nt=new Ie,wt=new Ie,Tt=null,ye=new Kt(0),Jt=0,ee=n.width,q=n.height,$=1,_t=null,Ot=null,gt=new Ie(0,0,ee,q),Ht=new Ie(0,0,ee,q),Ze=!1,Vt=new qc,jt=!1,xe=!1,Wt=new ze,Re=new F,sn=new Ie,Hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Le=!1;function Ge(){return it===null?$:1}let U=i;function yn(M,N){return n.getContext(M,N)}let ue,w,_,I,H,X,st,at,Y,j,rt,Mt,ut,ot,Et,Ct,It,D,lt,K,ct,pt,et;try{let M={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"186"}`),n.addEventListener("webglcontextlost",Se,!1),n.addEventListener("webglcontextrestored",ae,!1),n.addEventListener("webglcontextcreationerror",Oi,!1),U===null){let N="webgl2";if(U=yn(N,M),U===null)throw yn(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}At()}catch(M){throw n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",ae,!1),n.removeEventListener("webglcontextcreationerror",Oi,!1),Dt("WebGLRenderer: "+M.message),M}function At(){ue=new eD(U),ue.init(),ct=new VU(U,ue),w=new WN(U,ue,t,ct),_=new zU(U,ue),w.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),k=U.createFramebuffer(),O=U.createFramebuffer(),V=U.createFramebuffer(),I=new sD(U),H=new TU,X=new HU(U,ue,_,H,w,ct,I),st=new tD(R),at=new r3(U),pt=new kN(U,at),Y=new nD(U,at,I,pt),j=new rD(U,Y,at,pt,I),D=new aD(U,w,X),Et=new qN(H),rt=new EU(R,st,ue,w,pt,Et),Mt=new WU(R,H),ut=new wU,ot=new LU(ue),It=new GN(R,st,_,j,g,l),Ct=new FU(R,j,w),et=new qU(U,I,w,_),lt=new XN(U,ue,I),K=new iD(U,ue,I),I.programs=rt.programs,R.capabilities=w,R.extensions=ue,R.properties=H,R.renderLists=ut,R.shadowMap=Ct,R.state=_,R.info=I}x!==yi&&(A=new lD(x,n.width,n.height,o,s,a));let St=new a_(R,U);this.xr=St,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=ue.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ue.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(M){M!==void 0&&($=M,this.setSize(ee,q,!1))},this.getSize=function(M){return M.set(ee,q)},this.setSize=function(M,N,G=!0){if(St.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=M,q=N,n.width=Math.floor(M*$),n.height=Math.floor(N*$),G===!0&&(n.style.width=M+"px",n.style.height=N+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(ee*$,q*$).floor()},this.setDrawingBufferSize=function(M,N,G){ee=M,q=N,$=G,n.width=Math.floor(M*G),n.height=Math.floor(N*G),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(x===yi){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(nt)},this.getViewport=function(M){return M.copy(gt)},this.setViewport=function(M,N,G,P){M.isVector4?gt.set(M.x,M.y,M.z,M.w):gt.set(M,N,G,P),_.viewport(nt.copy(gt).multiplyScalar($).round())},this.getScissor=function(M){return M.copy(Ht)},this.setScissor=function(M,N,G,P){M.isVector4?Ht.set(M.x,M.y,M.z,M.w):Ht.set(M,N,G,P),_.scissor(wt.copy(Ht).multiplyScalar($).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(M){_.setScissorTest(Ze=M)},this.setOpaqueSort=function(M){_t=M},this.setTransparentSort=function(M){Ot=M},this.getClearColor=function(M){return M.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,G=!0){let P=0;if(M){let B=!1;if(it!==null){let dt=it.texture.format;B=m.has(dt)}if(B){let dt=it.texture.type,vt=d.has(dt),ft=It.getClearColor(),yt=It.getClearAlpha(),bt=ft.r,Bt=ft.g,Gt=ft.b;vt?(v[0]=bt,v[1]=Bt,v[2]=Gt,v[3]=yt,U.clearBufferuiv(U.COLOR,0,v)):(b[0]=bt,b[1]=Bt,b[2]=Gt,b[3]=yt,U.clearBufferiv(U.COLOR,0,b))}else P|=U.COLOR_BUFFER_BIT}N&&(P|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(P|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P!==0&&U.clear(P)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),z=M},this.dispose=function(){n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",ae,!1),n.removeEventListener("webglcontextcreationerror",Oi,!1),It.dispose(),ut.dispose(),ot.dispose(),H.dispose(),st.dispose(),j.dispose(),pt.dispose(),et.dispose(),rt.dispose(),St.dispose(),St.removeEventListener("sessionstart",L_),St.removeEventListener("sessionend",O_),nr.stop()};function Se(M){M.preventDefault(),Hv("WebGLRenderer: Context Lost."),L=!0}function ae(){Hv("WebGLRenderer: Context Restored."),L=!1;let M=I.autoReset,N=Ct.enabled,G=Ct.autoUpdate,P=Ct.needsUpdate,B=Ct.type;At(),I.autoReset=M,Ct.enabled=N,Ct.autoUpdate=G,Ct.needsUpdate=P,Ct.type=B}function Oi(M){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function $i(M){let N=M.target;N.removeEventListener("dispose",$i),VT(N)}function VT(M){GT(M),H.remove(M)}function GT(M){let N=H.get(M).programs;N!==void 0&&(N.forEach(function(G){rt.releaseProgram(G)}),M.isShaderMaterial&&rt.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,G,P,B,dt){N===null&&(N=Hn);let vt=B.isMesh&&B.matrixWorld.determinantAffine()<0,ft=WT(M,N,G,P,B);_.setMaterial(P,vt);let yt=G.index,bt=1;if(P.wireframe===!0){if(yt=Y.getWireframeAttribute(G),yt===void 0)return;bt=2}let Bt=G.drawRange,Gt=G.attributes.position,xt=Bt.start*bt,re=(Bt.start+Bt.count)*bt;dt!==null&&(xt=Math.max(xt,dt.start*bt),re=Math.min(re,(dt.start+dt.count)*bt)),yt!==null?(xt=Math.max(xt,0),re=Math.min(re,yt.count)):Gt!=null&&(xt=Math.max(xt,0),re=Math.min(re,Gt.count));let ke=re-xt;if(ke<0||ke===1/0)return;pt.setup(B,P,ft,G,yt);let we,ge=lt;if(yt!==null&&(we=at.get(yt),ge=K,ge.setIndex(we)),B.isMesh)P.wireframe===!0?(_.setLineWidth(P.wireframeLinewidth*Ge()),ge.setMode(U.LINES)):ge.setMode(U.TRIANGLES);else if(B.isLine){let xn=P.linewidth;xn===void 0&&(xn=1),_.setLineWidth(xn*Ge()),B.isLineSegments?ge.setMode(U.LINES):B.isLineLoop?ge.setMode(U.LINE_LOOP):ge.setMode(U.LINE_STRIP)}else B.isPoints?ge.setMode(U.POINTS):B.isSprite&&ge.setMode(U.TRIANGLES);if(B.isBatchedMesh)if(ue.get("WEBGL_multi_draw"))ge.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let xn=B._multiDrawStarts,mt=B._multiDrawCounts,Rn=B._multiDrawCount,Qt=yt?at.get(yt).bytesPerElement:1,xi=H.get(P).currentProgram.getUniforms();for(let ts=0;ts<Rn;ts++)xi.setValue(U,"_gl_DrawID",ts),ge.render(xn[ts]/Qt,mt[ts])}else if(B.isInstancedMesh)ge.renderInstances(xt,ke,B.count);else if(G.isInstancedBufferGeometry){let xn=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,mt=Math.min(G.instanceCount,xn);ge.renderInstances(xt,ke,mt)}else ge.render(xt,ke)};function U_(M,N,G,P){z!==null&&M.isNodeMaterial&&z.setObject(P,M),jt===!0&&Et.setState(M,G,!1),M.transparent===!0&&M.side===Ui&&M.forceSinglePass===!1?(M.side=Fn,M.needsUpdate=!0,Mu(M,N,P),M.side=qa,M.needsUpdate=!0,Mu(M,N,P),M.side=Ui):Mu(M,N,P)}this.compile=function(M,N,G=null){G===null&&(G=M),z!==null&&z.renderStart(M,N,G),T=ot.get(G),T.init(N),S.push(T),G.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),M!==G&&M.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),T.setupLights(),z!==null&&z.updateLights(T.state.lightsArray),xe=this.localClippingEnabled,jt=Et.init(this.clippingPlanes,xe),jt===!0&&Et.setGlobalState(this.clippingPlanes,N),z!==null&&Ct.render(T.state.shadowsArray,G,N);let P=new Set;return M.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let dt=B.material;if(dt)if(Array.isArray(dt))for(let vt=0;vt<dt.length;vt++){let ft=dt[vt];U_(ft,G,N,B),P.add(ft)}else U_(dt,G,N,B),P.add(dt)}),T=S.pop(),z!==null&&z.renderEnd(),P},this.compileAsync=function(M,N,G=null){let P=this.compile(M,N,G);return new Promise(B=>{function dt(){if(P.forEach(function(vt){let yt=H.get(vt).currentProgram;(yt===void 0||yt.isReady())&&P.delete(vt)}),P.size===0){B(M);return}setTimeout(dt,10)}ue.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Bp=null;function kT(M){Bp&&Bp(M)}function L_(){nr.stop()}function O_(){nr.start()}let nr=new GE;nr.setAnimationLoop(kT),typeof self<"u"&&nr.setContext(self),this.setAnimationLoop=function(M){Bp=M,St.setAnimationLoop(M),M===null?nr.stop():nr.start()},St.addEventListener("sessionstart",L_),St.addEventListener("sessionend",O_),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;z!==null&&z.renderStart(M,N);let G=St.enabled===!0&&St.isPresenting===!0,P=A!==null&&(it===null||G)&&A.begin(R,it);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(St.cameraAutoUpdate===!0&&St.updateCamera(N),N=St.getCamera()),M.isScene===!0&&M.onBeforeRender(R,M,N,it),T=ot.get(M,S.length),T.init(N),T.state.textureUnits=X.getTextureUnits(),S.push(T),Wt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Vt.setFromProjectionMatrix(Wt,Wi,N.reversedDepth),xe=this.localClippingEnabled,jt=Et.init(this.clippingPlanes,xe),E=ut.get(M,C.length),E.init(),C.push(E),St.enabled===!0&&St.isPresenting===!0){let vt=R.xr.getDepthSensingMesh();vt!==null&&Fp(vt,N,-1/0,R.sortObjects)}Fp(M,N,0,R.sortObjects),E.finish(),z!==null&&z.updateLights(T.state.lightsArray),R.sortObjects===!0&&E.sort(_t,Ot),Le=St.enabled===!1||St.isPresenting===!1||St.hasDepthSensing()===!1,Le&&It.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),jt===!0&&Et.beginShadows();let B=T.state.shadowsArray;if(Ct.render(B,M,N),jt===!0&&Et.endShadows(),(P&&A.hasRenderPass())===!1){let vt=E.opaque,ft=E.transmissive;if(T.setupLights(),N.isArrayCamera){let yt=N.cameras;if(ft.length>0)for(let bt=0,Bt=yt.length;bt<Bt;bt++){let Gt=yt[bt];P_(vt,ft,M,Gt)}Le&&It.render(M);for(let bt=0,Bt=yt.length;bt<Bt;bt++){let Gt=yt[bt];I_(E,M,Gt,Gt.viewport)}}else ft.length>0&&P_(vt,ft,M,N),Le&&It.render(M),I_(E,M,N)}it!==null&&Z===0&&(X.updateMultisampleRenderTarget(it),X.updateRenderTargetMipmap(it)),P&&A.end(R),M.isScene===!0&&M.onAfterRender(R,M,N),pt.resetDefaultState(),W=-1,tt=null,S.pop(),S.length>0?(T=S[S.length-1],X.setTextureUnits(T.state.textureUnits),jt===!0&&Et.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,z!==null&&z.renderEnd()};function Fp(M,N,G,P){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Vt)){P&&sn.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Wt);let vt=j.update(M),ft=M.material;ft.visible&&E.push(M,vt,ft,G,sn.z,null,N)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Vt))){let vt=j.update(M),ft=M.material;if(P&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),sn.copy(M.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),sn.copy(vt.boundingSphere.center)),sn.applyMatrix4(M.matrixWorld).applyMatrix4(Wt)),Array.isArray(ft)){let yt=vt.groups;for(let bt=0,Bt=yt.length;bt<Bt;bt++){let Gt=yt[bt],xt=ft[Gt.materialIndex];xt&&xt.visible&&E.push(M,vt,xt,G,sn.z,Gt,N)}}else ft.visible&&E.push(M,vt,ft,G,sn.z,null,N)}}let dt=M.children;for(let vt=0,ft=dt.length;vt<ft;vt++)Fp(dt[vt],N,G,P)}function I_(M,N,G,P){let{opaque:B,transmissive:dt,transparent:vt}=M;T.setupLightsView(G),jt===!0&&Et.setGlobalState(R.clippingPlanes,G),P&&_.viewport(nt.copy(P)),B.length>0&&bu(B,N,G),dt.length>0&&bu(dt,N,G),vt.length>0&&bu(vt,N,G),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function P_(M,N,G,P){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[P.id]===void 0){let xt=ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[P.id]=new Qn(1,1,{generateMipmaps:!0,type:xt?Ji:yi,minFilter:Ja,samples:Math.max(4,w.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}let dt=T.state.transmissionRenderTarget[P.id],vt=P.viewport||nt;dt.setSize(vt.z*R.transmissionResolutionScale,vt.w*R.transmissionResolutionScale);let ft=R.getRenderTarget(),yt=R.getActiveCubeFace(),bt=R.getActiveMipmapLevel();R.setRenderTarget(dt),R.getClearColor(ye),Jt=R.getClearAlpha(),Jt<1&&R.setClearColor(16777215,.5),R.clear(),Le&&It.render(G);let Bt=R.toneMapping;R.toneMapping=qi;let Gt=P.viewport;if(P.viewport!==void 0&&(P.viewport=void 0),T.setupLightsView(P),jt===!0&&Et.setGlobalState(R.clippingPlanes,P),bu(M,G,P),X.updateMultisampleRenderTarget(dt),X.updateRenderTargetMipmap(dt),ue.has("WEBGL_multisampled_render_to_texture")===!1){let xt=!1;for(let re=0,ke=N.length;re<ke;re++){let we=N[re],{object:ge,geometry:xn,material:mt,group:Rn}=we;if(mt.side===Ui&&ge.layers.test(P.layers)){let Qt=mt.side;mt.side=Fn,mt.needsUpdate=!0,B_(ge,G,P,xn,mt,Rn),mt.side=Qt,mt.needsUpdate=!0,xt=!0}}xt===!0&&(X.updateMultisampleRenderTarget(dt),X.updateRenderTargetMipmap(dt))}R.setRenderTarget(ft,yt,bt),R.setClearColor(ye,Jt),Gt!==void 0&&(P.viewport=Gt),R.toneMapping=Bt}function bu(M,N,G){let P=N.isScene===!0?N.overrideMaterial:null;for(let B=0,dt=M.length;B<dt;B++){let vt=M[B],{object:ft,geometry:yt,group:bt}=vt,Bt=vt.material;Bt.allowOverride===!0&&P!==null&&(Bt=P),ft.layers.test(G.layers)&&B_(ft,N,G,yt,Bt,bt)}}function B_(M,N,G,P,B,dt){z!==null&&B.isNodeMaterial&&z.setObject(M,B),M.onBeforeRender(R,N,G,P,B,dt),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),B.onBeforeRender(R,N,G,P,M,dt),B.transparent===!0&&B.side===Ui&&B.forceSinglePass===!1?(B.side=Fn,B.needsUpdate=!0,R.renderBufferDirect(G,N,P,B,M,dt),B.side=qa,B.needsUpdate=!0,R.renderBufferDirect(G,N,P,B,M,dt),B.side=Ui):R.renderBufferDirect(G,N,P,B,M,dt),M.onAfterRender(R,N,G,P,B,dt)}function Mu(M,N,G){N.isScene!==!0&&(N=Hn);let P=H.get(M),B=T.state.lights,dt=T.state.shadowsArray,vt=B.state.version,ft=rt.getParameters(M,B.state,dt,N,G,T.state.lightProbeGridArray),yt=rt.getProgramCacheKey(ft),bt=P.programs;P.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,P.fog=N.fog;let Bt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;P.envMap=st.get(M.envMap||P.environment,Bt),P.envMapRotation=P.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,bt===void 0&&(M.addEventListener("dispose",$i),bt=new Map,P.programs=bt);let Gt=bt.get(yt);if(Gt!==void 0){if(P.currentProgram===Gt&&P.lightsStateVersion===vt)return z_(M,ft),Gt}else ft.uniforms=rt.getUniforms(M),z!==null&&M.isNodeMaterial&&z.build(M,G,ft),M.onBeforeCompile(ft,R),Gt=rt.acquireProgram(ft,yt),bt.set(yt,Gt),P.uniforms=ft.uniforms;let xt=P.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(xt.clippingPlanes=Et.uniform),z_(M,ft),P.needsLights=YT(M),P.lightsStateVersion=vt,P.needsLights&&(xt.ambientLightColor.value=B.state.ambient,xt.lightProbe.value=B.state.probe,xt.sunLights.value=B.state.sun,xt.sunLightShadows.value=B.state.sunShadow,xt.directionalLights.value=B.state.directional,xt.directionalLightShadows.value=B.state.directionalShadow,xt.spotLights.value=B.state.spot,xt.spotLightShadows.value=B.state.spotShadow,xt.rectAreaLights.value=B.state.rectArea,xt.ltc_1.value=B.state.rectAreaLTC1,xt.ltc_2.value=B.state.rectAreaLTC2,xt.pointLights.value=B.state.point,xt.pointLightShadows.value=B.state.pointShadow,xt.hemisphereLights.value=B.state.hemi,xt.sunShadowMatrix.value=B.state.sunShadowMatrix,xt.sunShadowCascade.value=B.state.sunShadowCascade,xt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,xt.spotLightMatrix.value=B.state.spotLightMatrix,xt.spotLightMap.value=B.state.spotLightMap,xt.pointShadowMatrix.value=B.state.pointShadowMatrix),P.lightProbeGrid=T.state.lightProbeGridArray.length>0,P.currentProgram=Gt,P.uniformsList=null,Gt}function F_(M){if(M.uniformsList===null){let N=M.currentProgram.getUniforms();M.uniformsList=ml.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function z_(M,N){let G=H.get(M);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function XT(M,N){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(N.matrixWorld);for(let G=0,P=M.length;G<P;G++){let B=M[G];if(B.texture!==null&&B.boundingBox.containsPoint(y))return B}return null}function WT(M,N,G,P,B){N.isScene!==!0&&(N=Hn),X.resetTextureUnits();let dt=N.fog,vt=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?N.environment:null,ft=it===null?R.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Yt.workingColorSpace,yt=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap,bt=st.get(P.envMap||vt,yt),Bt=P.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Gt=!!G.attributes.tangent&&(!!P.normalMap||P.anisotropy>0),xt=!!G.morphAttributes.position,re=!!G.morphAttributes.normal,ke=!!G.morphAttributes.color,we=qi;P.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(we=R.toneMapping);let ge=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,xn=ge!==void 0?ge.length:0,mt=H.get(P),Rn=T.state.lights;if(jt===!0&&(xe===!0||M!==tt)){let be=M===tt&&P.id===W;Et.setState(P,M,be)}let Qt=!1;P.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Rn.state.version||mt.outputColorSpace!==ft||B.isBatchedMesh&&mt.batching===!1||!B.isBatchedMesh&&mt.batching===!0||B.isBatchedMesh&&mt.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&mt.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&mt.instancing===!1||!B.isInstancedMesh&&mt.instancing===!0||B.isSkinnedMesh&&mt.skinning===!1||!B.isSkinnedMesh&&mt.skinning===!0||B.isInstancedMesh&&mt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&mt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&mt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&mt.instancingMorph===!1&&B.morphTexture!==null||mt.envMap!==bt||P.fog===!0&&mt.fog!==dt||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==Et.numPlanes||mt.numIntersection!==Et.numIntersection)||mt.vertexAlphas!==Bt||mt.vertexTangents!==Gt||mt.morphTargets!==xt||mt.morphNormals!==re||mt.morphColors!==ke||mt.toneMapping!==we||mt.morphTargetsCount!==xn||!!mt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Qt=!0):(Qt=!0,mt.__version=P.version);let xi=mt.currentProgram;Qt===!0&&(xi=Mu(P,N,B),z&&P.isNodeMaterial&&z.onUpdateProgram(P,xi,mt));let ts=!1,$s=!1,Xr=!1,pe=xi.getUniforms(),He=mt.uniforms;if(_.useProgram(xi.program)&&(ts=!0,$s=!0,Xr=!0),P.id!==W&&(W=P.id,$s=!0),mt.needsLights){let be=XT(T.state.lightProbeGridArray,B);mt.lightProbeGrid!==be&&(mt.lightProbeGrid=be,$s=!0)}if(ts||tt!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),pe.setValue(U,"projectionMatrix",M.projectionMatrix),pe.setValue(U,"viewMatrix",M.matrixWorldInverse);let ea=pe.map.cameraPosition;ea!==void 0&&ea.setValue(U,Re.setFromMatrixPosition(M.matrixWorld)),w.logarithmicDepthBuffer&&pe.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial)&&pe.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),tt!==M&&(tt=M,$s=!0,Xr=!0)}if(mt.needsLights&&(Rn.state.sunShadowMap.length>0&&pe.setValue(U,"sunShadowMap",Rn.state.sunShadowMap,X),Rn.state.directionalShadowMap.length>0&&pe.setValue(U,"directionalShadowMap",Rn.state.directionalShadowMap,X),Rn.state.spotShadowMap.length>0&&pe.setValue(U,"spotShadowMap",Rn.state.spotShadowMap,X),Rn.state.pointShadowMap.length>0&&pe.setValue(U,"pointShadowMap",Rn.state.pointShadowMap,X)),B.isSkinnedMesh){pe.setOptional(U,B,"bindMatrix"),pe.setOptional(U,B,"bindMatrixInverse");let be=B.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),pe.setValue(U,"boneTexture",be.boneTexture,X))}B.isBatchedMesh&&(pe.setOptional(U,B,"batchingTexture"),pe.setValue(U,"batchingTexture",B._matricesTexture,X),pe.setOptional(U,B,"batchingIdTexture"),pe.setValue(U,"batchingIdTexture",B._indirectTexture,X),pe.setOptional(U,B,"batchingColorTexture"),B._colorsTexture!==null&&pe.setValue(U,"batchingColorTexture",B._colorsTexture,X));let ta=G.morphAttributes;if((ta.position!==void 0||ta.normal!==void 0||ta.color!==void 0)&&D.update(B,G,xi),($s||mt.receiveShadow!==B.receiveShadow)&&(mt.receiveShadow=B.receiveShadow,pe.setValue(U,"receiveShadow",B.receiveShadow)),(P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial)&&P.envMap===null&&N.environment!==null&&(He.envMapIntensity.value=N.environmentIntensity),He.dfgLUT!==void 0&&(He.dfgLUT.value=ZU()),$s){if(pe.setValue(U,"toneMappingExposure",R.toneMappingExposure),mt.needsLights&&qT(He,Xr),dt&&P.fog===!0&&Mt.refreshFogUniforms(He,dt),Mt.refreshMaterialUniforms(He,P,$,q,T.state.transmissionRenderTarget[M.id]),mt.needsLights&&mt.lightProbeGrid){let be=mt.lightProbeGrid;He.probesSH.value=be.texture,He.probesMin.value.copy(be.boundingBox.min),He.probesMax.value.copy(be.boundingBox.max),He.probesResolution.value.copy(be.resolution)}ml.upload(U,F_(mt),He,X)}if(P.isShaderMaterial&&P.uniformsNeedUpdate===!0&&(ml.upload(U,F_(mt),He,X),P.uniformsNeedUpdate=!1),P.isSpriteMaterial&&pe.setValue(U,"center",B.center),pe.setValue(U,"modelViewMatrix",B.modelViewMatrix),pe.setValue(U,"normalMatrix",B.normalMatrix),pe.setValue(U,"modelMatrix",B.matrixWorld),P.uniformsGroups!==void 0){let be=P.uniformsGroups;for(let ea=0,Wr=be.length;ea<Wr;ea++){let V_=be[ea];et.update(V_,xi),et.bind(V_,xi)}}return xi}function qT(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.sunLights.needsUpdate=N,M.sunLightShadows.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function YT(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(M,N,G){let P=H.get(M);P.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,P.__autoAllocateDepthBuffer===!1&&(P.__useRenderToTexture=!1),H.get(M.texture).__webglTexture=N,H.get(M.depthTexture).__webglTexture=P.__autoAllocateDepthBuffer?void 0:G,P.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){let G=H.get(M);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,G=0){it=M,J=N,Z=G;let P=null,B=!1,dt=!1;if(M){let ft=H.get(M);if(ft.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,ft.__webglFramebuffer),nt.copy(M.viewport),wt.copy(M.scissor),Tt=M.scissorTest,_.viewport(nt),_.scissor(wt),_.setScissorTest(Tt),W=-1;return}else if(ft.__webglFramebuffer===void 0)X.setupRenderTarget(M);else if(ft.__hasExternalTextures)X.rebindTextures(M,H.get(M.texture).__webglTexture,H.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Bt=M.depthTexture;if(ft.__boundDepthTexture!==Bt){if(Bt!==null&&H.has(Bt)&&(M.width!==Bt.image.width||M.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(M)}}let yt=M.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(dt=!0);let bt=H.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(bt[N])?P=bt[N][G]:P=bt[N],B=!0):M.samples>0&&X.useMultisampledRTT(M)===!1?P=H.get(M).__webglMultisampledFramebuffer:Array.isArray(bt)?P=bt[G]:P=bt,nt.copy(M.viewport),wt.copy(M.scissor),Tt=M.scissorTest}else nt.copy(gt).multiplyScalar($).floor(),wt.copy(Ht).multiplyScalar($).floor(),Tt=Ze;if(G!==0&&(P=k),_.bindFramebuffer(U.FRAMEBUFFER,P)&&_.drawBuffers(M,P),_.viewport(nt),_.scissor(wt),_.setScissorTest(Tt),B){let ft=H.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,ft.__webglTexture,G)}else if(dt){let ft=N;for(let yt=0;yt<M.textures.length;yt++){let bt=H.get(M.textures[yt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+yt,bt.__webglTexture,G,ft)}}else if(M!==null&&G!==0){let ft=H.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ft.__webglTexture,G)}W=-1};function H_(M){let N=H.get(M);return(N.__readFormat!==M.format||N.__readType!==M.type)&&(N.__readFormat=M.format,N.__readType=M.type,N.__formatReadable=w.textureFormatReadable(M.format),N.__typeReadable=w.textureTypeReadable(M.type)),N}this.readRenderTargetPixels=function(M,N,G,P,B,dt,vt,ft=0){if(!(M&&M.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){_.bindFramebuffer(U.FRAMEBUFFER,yt);try{let bt=M.textures[ft],Bt=bt.format,Gt=bt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let xt=H_(bt);if(xt.__formatReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(xt.__typeReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-P&&G>=0&&G<=M.height-B&&U.readPixels(N,G,P,B,ct.convert(Bt),ct.convert(Gt),dt)}finally{let bt=it!==null?H.get(it).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(M,N,G,P,B,dt,vt,ft=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt)if(N>=0&&N<=M.width-P&&G>=0&&G<=M.height-B){_.bindFramebuffer(U.FRAMEBUFFER,yt);let bt=M.textures[ft],Bt=bt.format,Gt=bt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let xt=H_(bt);if(xt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(xt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,re),U.bufferData(U.PIXEL_PACK_BUFFER,dt.byteLength,U.STREAM_READ),U.readPixels(N,G,P,B,ct.convert(Bt),ct.convert(Gt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let ke=it!==null?H.get(it).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,ke);let we=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await mE(U,we,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,dt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(re),U.deleteSync(we),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,G=0){let P=Math.pow(2,-G),B=Math.floor(M.image.width*P),dt=Math.floor(M.image.height*P),vt=N!==null?N.x:0,ft=N!==null?N.y:0;X.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,vt,ft,B,dt),_.unbindTexture()},this.copyTextureToTexture=function(M,N,G=null,P=null,B=0,dt=0){let vt,ft,yt,bt,Bt,Gt,xt,re,ke,we=M.isCompressedTexture?M.mipmaps[dt]:M.image;if(G!==null)vt=G.max.x-G.min.x,ft=G.max.y-G.min.y,yt=G.isBox3?G.max.z-G.min.z:1,bt=G.min.x,Bt=G.min.y,Gt=G.isBox3?G.min.z:0;else{let He=Math.pow(2,-B);vt=Math.floor(we.width*He),ft=Math.floor(we.height*He),M.isDataArrayTexture?yt=we.depth:M.isData3DTexture?yt=Math.floor(we.depth*He):yt=1,bt=0,Bt=0,Gt=0}P!==null?(xt=P.x,re=P.y,ke=P.z):(xt=0,re=0,ke=0);let ge=ct.convert(N.format),xn=ct.convert(N.type),mt;N.isData3DTexture?(X.setTexture3D(N,0),mt=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(X.setTexture2DArray(N,0),mt=U.TEXTURE_2D_ARRAY):(X.setTexture2D(N,0),mt=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);let Rn=_.getParameter(U.UNPACK_ROW_LENGTH),Qt=_.getParameter(U.UNPACK_IMAGE_HEIGHT),xi=_.getParameter(U.UNPACK_SKIP_PIXELS),ts=_.getParameter(U.UNPACK_SKIP_ROWS),$s=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,we.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,we.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,bt),_.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Gt);let Xr=M.isDataArrayTexture||M.isData3DTexture,pe=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){let He=H.get(M),ta=H.get(N),be=H.get(He.__renderTarget),ea=H.get(ta.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,be.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,ea.__webglFramebuffer);for(let Wr=0;Wr<yt;Wr++)Xr&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(M).__webglTexture,B,Gt+Wr),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(N).__webglTexture,dt,ke+Wr)),U.blitFramebuffer(bt,Bt,vt,ft,xt,re,vt,ft,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(B!==0||M.isRenderTargetTexture||H.has(M)){let He=H.get(M),ta=H.get(N);_.bindFramebuffer(U.READ_FRAMEBUFFER,O),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let be=0;be<yt;be++)Xr?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,He.__webglTexture,B,Gt+be):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,He.__webglTexture,B),pe?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ta.__webglTexture,dt,ke+be):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ta.__webglTexture,dt),B!==0?U.blitFramebuffer(bt,Bt,vt,ft,xt,re,vt,ft,U.COLOR_BUFFER_BIT,U.NEAREST):pe?U.copyTexSubImage3D(mt,dt,xt,re,ke+be,bt,Bt,vt,ft):U.copyTexSubImage2D(mt,dt,xt,re,bt,Bt,vt,ft);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else pe?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(mt,dt,xt,re,ke,vt,ft,yt,ge,xn,we.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(mt,dt,xt,re,ke,vt,ft,yt,ge,we.data):U.texSubImage3D(mt,dt,xt,re,ke,vt,ft,yt,ge,xn,we):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,dt,xt,re,vt,ft,ge,xn,we.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,dt,xt,re,we.width,we.height,ge,we.data):U.texSubImage2D(U.TEXTURE_2D,dt,xt,re,vt,ft,ge,xn,we);_.pixelStorei(U.UNPACK_ROW_LENGTH,Rn),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qt),_.pixelStorei(U.UNPACK_SKIP_PIXELS,xi),_.pixelStorei(U.UNPACK_SKIP_ROWS,ts),_.pixelStorei(U.UNPACK_SKIP_IMAGES,$s),dt===0&&N.generateMipmaps&&U.generateMipmap(mt),_.unbindTexture()},this.initRenderTarget=function(M){H.get(M).__webglFramebuffer===void 0&&X.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?X.setTextureCube(M,0):M.isData3DTexture?X.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?X.setTexture2DArray(M,0):X.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){J=0,Z=0,it=null,_.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Yt._getUnpackColorSpace()}};var jn=Nn(ir(),1);var vl=["rest","build","active","settle"];function tn(e){return e>=1?1:e>0?e:0}var JU=e=>Number.isFinite(e)?e:0;function _l(e){return Object.freeze({time:Math.max(0,JU(e.time)),progress:tn(e.progress),isPlaying:e.isPlaying,bass:tn(e.bass),mid:tn(e.mid),high:tn(e.high),rmsEnergy:tn(e.rmsEnergy),onsetStrength:tn(e.onsetStrength),beatDetected:e.beatDetected,currentSceneState:vl.includes(e.currentSceneState)?e.currentSceneState:"rest",bassHit:tn(e.bassHit)})}var yl=_l({time:0,progress:0,isPlaying:!1,bass:0,mid:0,high:0,rmsEnergy:0,onsetStrength:0,beatDetected:!1,currentSceneState:"rest",bassHit:0});var Ki={lowHz:[20,150],punchHz:[60,150],midHz:[150,2e3],highHz:[2e3,1e4]};function Hr(e,t,n,i){let s=n/i,a=Math.max(1,Math.floor(e/s)),r=Math.max(a+1,Math.ceil(t/s));return[a,r]}function xl(e,t,n){let i=Math.min(n,e.length),s=0;for(let r=t;r<i;r++)s+=10**(e[r]/10);let a=Math.max(1,i-t);return 10*Math.log10(s/a+1e-12)}function pu(e,t,n){return tn((e-t)/(n-t))}function en(e,t,n,i,s){let a=t>e?i:s,r=1-Math.exp(-n/Math.max(a,1e-4));return e+(t-e)*r}var du=class{prev=null;history=[];lastOnsetAt=-1/0;historyLen;k;refractoryS;constructor(t=43,n=1.6,i=.12){this.historyLen=t,this.k=n,this.refractoryS=i}strength=0;push(t,n,i=1,s=t.length){if(!this.prev||this.prev.length!==t.length)return this.prev=t.slice(),!1;let a=0,r=Math.min(s,t.length);for(let o=i;o<r;o++){let l=t[o]-this.prev[o];l>0&&(a+=l)}return this.prev.set(t),this.pushFlux(a,n)}pushFlux(t,n){this.history.push(t),this.history.length>this.historyLen&&this.history.shift();let i=this.history.length,s=this.history.reduce((o,l)=>o+l,0)/i,a=this.history.reduce((o,l)=>o+(l-s)**2,0)/i,r=s+this.k*Math.sqrt(a);return this.strength=r>1e-9?tn(t/(2*r)):0,i>=8&&t>r&&t>1e-6&&n-this.lastOnsetAt>=this.refractoryS?(this.lastOnsetAt=n,!0):!1}};var Pe=72,nn=56,KU=14,o_=3,QU=.08,jU=.4,$U=.35,tL=.3,eL=.05,nL=.85,iL=.07,sL=.95,$a=[{centre:-.55,width:.3},{centre:0,width:.34},{centre:.55,width:.26}];function JE(){let e={time:0,bass:0,mid:0,high:0,colour:0,exposure:0,glow:0,sceneLevel:0,motion:.25,scroll:0,frac:0,ridge:0,serial:0,head:nn-1,rows:new Float32Array(nn*Pe)};for(let t=0;t<nn;t++)KE(e.rows,t*Pe,e,-(nn-1-t));return e}var c_=e=>Number.isFinite(e)?Math.min(1,Math.max(0,e)):0,ja=(e,t,n,i)=>c_(en(e,c_(t),n,i,jU));function up(e,t){let n=Math.imul(e|0,374761393)+Math.imul(t|0,668265263)|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function hp(e,t){let n=Math.floor(e),i=Math.floor(t),s=e-n,a=t-i,r=s*s*(3-2*s),o=a*a*(3-2*a),l=up(n,i),c=up(n+1,i),h=up(n,i+1),p=up(n+1,i+1);return l+(c-l)*r+(h-l)*o+(l-c-h+p)*r*o}var l_=(e,t,n)=>Math.exp(-(((e-t)/n)**2));function KE(e,t,n,i){let s=i*.23,a=.55+.45*n.exposure;for(let r=0;r<Pe;r++){let o=r/(Pe-1)*2-1,l=.3+.7*hp(r*.45,s),c=.6+.4*hp(r*.9+17.3,s*1.7+5.1),h=n.bass*l_(o,$a[0].centre,$a[0].width)+n.mid*l_(o,$a[1].centre,$a[1].width)+n.high*c*l_(o,$a[2].centre,$a[2].width),p=iL*(.5+.5*hp(r*.3+3.7,s*.6)),u=n.ridge*nL*(.8+.2*hp(r*.6+9.1,s)),f=p+sL*a*h*l+u;e[t+r]=f>=1?1:f>0?f:0}}function fp(e,t){return(e.head-t+nn*4)%nn*Pe}function QE(e,t,n,i){let s=Number.isFinite(n)&&n>0?Math.min(n,eL):0;if(s===0)return e;e.time+=s;let a=i?$U:QU;e.bass=ja(e.bass,t.bass,s,a),e.mid=ja(e.mid,t.mid,s,a),e.high=ja(e.high,t.high,s,a),e.colour=ja(e.colour,t.colour,s,a),e.exposure=ja(e.exposure,t.exposure,s,a),e.glow=ja(e.glow,t.glow,s,a),e.sceneLevel=ja(e.sceneLevel,t.sceneLevel,s,a),e.motion=ja(e.motion,t.motion,s,a),e.ridge=Math.max(e.ridge*Math.exp(-s/tL),c_(t.ridge)),e.scroll+=s*KU*e.motion;let r=Math.floor(e.scroll)-e.serial;r>o_&&(e.serial=Math.floor(e.scroll)-o_,r=o_);for(let o=0;o<r;o++)e.serial++,e.head=(e.head+1)%nn,KE(e.rows,e.head*Pe,e,e.serial);return e.frac=e.scroll-Math.floor(e.scroll),e}var aL=Object.freeze({rest:0,build:.6,active:1,settle:.35}),jE=.2,$E=.25,rL=.25,tT=.35,oL=.04,tr=e=>tn(e);function eT(e,t){let n=e.isPlaying===!0,i=tr(e.bass),s=tr(e.mid),a=tr(e.high),r=tr(e.rmsEnergy),o=!n||r<oL,l=(o?rL:1)*(t?tT:1),c=!o&&!t,h=vl.includes(e.currentSceneState)?e.currentSceneState:"rest";return{bass:i,mid:s,high:tr(a*(t?tT+.4:1)),colour:s,exposure:tr(jE+(1-jE)*r),glow:tr($E+(1-$E)*i),ridge:c?tr(e.bassHit):0,sceneLevel:aL[h],motion:l,calm:o}}var lL=`
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
`,u_=`
vec3 matrixRamp(float s) {
  return mix(vec3(0.25, 0.78, 1.00), vec3(0.62, 0.50, 1.00), s);
}
`,h_=`
attribute float aH;
attribute float aRow;
uniform float uFrac;
uniform float uRowsM1;
uniform float uHalfW;
varying float vH;
varying float vD;
void main() {
  vH = aH;
  // Depth fade at the far end and a lateral fade at the sides, so neither the far rows nor the terrain edges ever show.
  vD = (aRow + uFrac) / uRowsM1 * (1.0 - smoothstep(0.70, 1.0, abs(position.x) / uHalfW));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,nT=`
precision highp float;
uniform float uExposure;
uniform float uColour;
uniform float uGain;
varying float vH;
varying float vD;
${u_}
void main() {
  float far = smoothstep(0.02, 0.38, vD);
  // Brightness follows height strongly, so peaks carry the information and a loud signal does not wash the whole grid evenly.
  float lum = (0.14 + 1.80 * vH) * (0.45 + 0.90 * uExposure) * far;
  vec3 base = matrixRamp(0.6 * uColour);
  vec3 col = mix(base, vec3(0.90, 0.97, 1.00), smoothstep(0.55, 1.0, vH));
  gl_FragColor = vec4(col * lum * uGain, 1.0);
}
`,iT=`
precision highp float;
uniform float uExposure;
uniform float uColour;
varying float vH;
varying float vD;
${u_}
void main() {
  float far = smoothstep(0.02, 0.38, vD);
  vec3 col = vec3(0.004, 0.010, 0.030) + matrixRamp(0.6 * uColour) * vH * 0.04 * (0.4 + uExposure);
  gl_FragColor = vec4(col, far);
}
`,sT=`
varying vec2 vP;
void main() {
  vP = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,aT=`
precision highp float;
uniform float uGlow;
uniform float uExposure;
uniform float uColour;
uniform float uY0;
varying vec2 vP;
${lL}
${u_}
void main() {
  float y = vP.y - uY0;
  float up = exp(-pow(max(y, 0.0) / 1.6, 2.0)) * 0.8;
  float down = exp(-pow(min(y, 0.0) / 3.0, 2.0)) * 0.35;
  float mask = (1.0 - smoothstep(45.0, 65.0, abs(vP.x))) * (1.0 - smoothstep(24.0, 33.0, abs(vP.y)));
  vec3 col = matrixRamp(0.6 * uColour) * (up + down) * mask * (0.05 + 0.22 * uGlow) * (0.5 + 0.5 * uExposure);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;var mp={created:0,disposed:0},dp=26,mu=.5,gp=-22,cL=2.4,rT=36,oT=17,uL=.34,pp=new F(0,.6,-6),hL=1.2,fL=9.5,lT=.7,vp=class{scene=new Vc;camera=new An(rT,16/9,.1,400);geometries=[];materials=[];terrain=new Js;pos;heightAttr;lineUniforms;surfaceUniforms;hazeUniforms;lastSerial=-1;fitDistance=oT;disposed=!1;constructor(){let t=nn*Pe,n=new Float32Array(t*3),i=new Float32Array(t),s=new Float32Array(t);for(let f=0;f<nn;f++)for(let g=0;g<Pe;g++){let x=f*Pe+g;n[x*3]=(g/(Pe-1)-.5)*dp,n[x*3+1]=0,n[x*3+2]=gp+f*mu,s[x]=f}this.pos=new wn(n,3),this.pos.setUsage(np),this.heightAttr=new wn(i,1),this.heightAttr.setUsage(np);let a=new wn(s,1),r=[],o=[];for(let f=0;f<nn;f++)for(let g=0;g<Pe;g++){let x=f*Pe+g;g<Pe-1&&o.push(x,x+1),f<nn-1&&o.push(x,x+Pe),f<nn-1&&g<Pe-1&&r.push(x,x+Pe,x+1,x+1,x+Pe,x+Pe+1)}let l=f=>{let g=this.own(new vi);return g.setAttribute("position",this.pos),g.setAttribute("aH",this.heightAttr),g.setAttribute("aRow",a),g.setIndex(f),g};this.hazeUniforms={uGlow:{value:0},uExposure:{value:0},uColour:{value:0},uY0:{value:-.8}};let c=new Pn(this.own(new Ir(140,70)),this.ownMat(this.make(sT,aT,this.hazeUniforms,"additive",!1,!1)));c.position.set(0,0,-32),c.renderOrder=-2,c.frustumCulled=!1,this.scene.add(c),this.surfaceUniforms={uFrac:{value:0},uRowsM1:{value:nn-1},uHalfW:{value:dp/2},uExposure:{value:0},uColour:{value:0}};let h=this.ownMat(this.make(h_,iT,this.surfaceUniforms,"normal",!0,!0));h.polygonOffset=!0,h.polygonOffsetFactor=1,h.polygonOffsetUnits=1;let p=new Pn(l(r),h);p.renderOrder=-1,p.frustumCulled=!1,this.lineUniforms={uFrac:{value:0},uRowsM1:{value:nn-1},uHalfW:{value:dp/2},uExposure:{value:0},uColour:{value:0},uGain:{value:.8}};let u=new Yc(l(o),this.ownMat(this.make(h_,nT,this.lineUniforms,"additive",!0,!1)));u.renderOrder=1,u.frustumCulled=!1,this.terrain.add(p,u),this.scene.add(this.terrain),mp.created++}get resourceCounts(){return{geometries:this.geometries.length,materials:this.materials.length}}get distance(){return this.fitDistance}rowZ(t,n){return gp+(t+n)*mu}setViewport(t,n,i){if(t<1||n<1)return;let s=t/n;this.camera.aspect=s,this.camera.updateProjectionMatrix();let a=Math.tan(rT*Math.PI/360);this.fitDistance=Math.max(oT,fL/(a*s))}update(t,n){if(this.disposed)return;if(t.serial!==this.lastSerial){let h=this.pos.array,p=this.heightAttr.array;for(let u=0;u<nn;u++){let f=fp(t,u),g=u*Pe;for(let x=0;x<Pe;x++){let m=t.rows[f+x];p[g+x]=m,h[(g+x)*3+1]=m*cL}}this.pos.needsUpdate=!0,this.heightAttr.needsUpdate=!0,this.lastSerial=t.serial}this.terrain.position.z=t.frac*mu;let i=Math.max(-lT,Math.min(lT,.06*Math.sin(t.scroll*.02)+n.azimuth)),s=Math.min(.9,Math.max(.05,uL+n.elevation)),a=this.fitDistance-hL*t.sceneLevel,r=Math.cos(s);this.camera.position.set(pp.x+a*r*Math.sin(i),pp.y+a*Math.sin(s),pp.z+a*r*Math.cos(i)),this.camera.lookAt(pp);let o=this.lineUniforms;o.uFrac.value=t.frac,o.uExposure.value=t.exposure,o.uColour.value=t.colour;let l=this.surfaceUniforms;l.uFrac.value=t.frac,l.uExposure.value=t.exposure,l.uColour.value=t.colour;let c=this.hazeUniforms;c.uGlow.value=t.glow,c.uExposure.value=t.exposure,c.uColour.value=t.colour}lobeCentresX(){return $a.map(t=>t.centre*(dp/2))}releaseGpu(){if(!this.disposed){for(let t of this.geometries)t.dispose();for(let t of this.materials)t.dispose();this.pos.needsUpdate=!0,this.heightAttr.needsUpdate=!0}}dispose(){if(!this.disposed){this.disposed=!0;for(let t of this.geometries)t.dispose();for(let t of this.materials)t.dispose();this.scene.clear(),this.terrain.clear(),mp.disposed++}}own(t){return this.geometries.push(t),t}ownMat(t){return this.materials.push(t),t}make(t,n,i,s,a,r){return new Bn({vertexShader:t,fragmentShader:n,uniforms:i,transparent:!0,blending:s==="additive"?tu:Ya,depthTest:a,depthWrite:r,side:Ui})}};var cT=Object.freeze({disposed:!1,unsupported:!1,lost:!1,hidden:!1,inactive:!1});function f_(e,t){if(e.disposed)return e;switch(t.type){case"disposed":return Object.freeze({...e,disposed:!0});case"unsupported":return Object.freeze({...e,unsupported:!0});case"lost":return Object.freeze({...e,lost:!0});case"restored":return e.lost?Object.freeze({...e,lost:!1}):e;case"hidden":return e.hidden===t.value?e:Object.freeze({...e,hidden:t.value});case"active":return e.inactive===!t.value?e:Object.freeze({...e,inactive:!t.value})}}function uT(e){return!e.disposed&&!e.unsupported&&!e.lost&&!e.hidden&&!e.inactive}function gu(e){return e.disposed?"disposed":e.unsupported?"unsupported":e.lost?"lost":e.hidden?"hidden":e.inactive?"inactive":"ready"}function hT(e,t=1.5){return!Number.isFinite(e)||e<=0?1:Math.min(t,Math.max(.5,e))}var _p={created:0,disposed:0},yp=class{renderer=null;state=cT;reduced=!1;frames=0;cssWidth=0;cssHeight=0;pixelRatio=1;dprSeen=0;canvas;opts;resizeObserver=null;motionQuery=null;onWindowResize=()=>this.fit();onVisibility=()=>this.dispatch({type:"hidden",value:document.hidden});onMotionChange=t=>{this.reduced=t.matches};onContextLost=t=>{t.preventDefault(),this.dispatch({type:"lost"})};onContextRestored=()=>{this.dispatch({type:"restored"}),this.fit(),this.opts.onRestored?.()};constructor(t){this.opts=t,this.canvas=t.canvas,this.canvas.style.width="100%",this.canvas.style.height="100%",this.motionQuery=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,this.reduced=this.motionQuery?.matches??!1;try{this.renderer=new op({canvas:this.canvas,antialias:!1,alpha:!1,powerPreference:"high-performance"})}catch{this.renderer=null,this.state=f_(this.state,{type:"unsupported"}),this.opts.onStatus?.(gu(this.state));return}_p.created++,this.canvas.addEventListener("webglcontextlost",this.onContextLost),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored),document.addEventListener("visibilitychange",this.onVisibility),window.addEventListener("resize",this.onWindowResize),this.motionQuery?.addEventListener("change",this.onMotionChange),this.resizeObserver=typeof ResizeObserver=="function"?new ResizeObserver(()=>this.fit()):null,this.resizeObserver?.observe(this.canvas),document.hidden&&this.dispatch({type:"hidden",value:!0}),this.fit()}get status(){return gu(this.state)}get reducedMotion(){return this.reduced}get frameCount(){return this.frames}get three(){return this.renderer}get pixelRatioInUse(){return this.pixelRatio}setActive(t){this.dispatch({type:"active",value:t})}render(t,n){return!this.renderer||!uT(this.state)?!1:((window.devicePixelRatio||1)!==this.dprSeen&&this.fit(),this.renderer.render(t,n),this.frames++,!0)}dispose(){this.state.disposed||(this.dispatch({type:"disposed"}),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.canvas.removeEventListener("webglcontextlost",this.onContextLost),this.canvas.removeEventListener("webglcontextrestored",this.onContextRestored),document.removeEventListener("visibilitychange",this.onVisibility),window.removeEventListener("resize",this.onWindowResize),this.motionQuery?.removeEventListener("change",this.onMotionChange),this.motionQuery=null,this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null,_p.disposed++))}dispatch(t){let n=gu(this.state);this.state=f_(this.state,t);let i=gu(this.state);i!==n&&this.opts.onStatus?.(i)}fit(){if(!this.renderer||this.state.disposed)return;let t=this.canvas.getBoundingClientRect();if(t.width<1||t.height<1)return;this.dprSeen=window.devicePixelRatio||1;let n=hT(this.dprSeen,this.opts.maxPixelRatio??1.5);t.width===this.cssWidth&&t.height===this.cssHeight&&n===this.pixelRatio||(this.cssWidth=t.width,this.cssHeight=t.height,this.pixelRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(t.width,t.height,!1))}};var zn=Nn(ir(),1);var dT={request:e=>requestAnimationFrame(e),cancel:e=>cancelAnimationFrame(e)},fT=Object.freeze({source:null,isPlaying:!1,duration:null,scene:"rest",latencyMs:0,error:null}),Vr=class{constructor(t=dT){this.scheduler=t}scheduler;src=null;unsubStatus=null;current=yl;state=fT;frameCbs=new Set;stateCbs=new Set;handle=null;nudgeMs=0;get frame(){return this.current}get source(){return this.src}setSource(t){t!==this.src&&(this.unsubStatus?.(),this.unsubStatus=null,this.src?.dispose(),this.src=t,this.current=yl,t&&(t.setSyncNudge?.(this.nudgeMs),this.unsubStatus=t.onStatus(()=>this.refreshStatus())),this.setState(this.derive(yl)))}async play(){let t=this.src;if(t){try{await t.play()}catch{t===this.src&&this.setState({...this.state,error:t.status().error??"Playback could not start. Press play again."});return}t===this.src&&this.refreshStatus()}}pause(){this.src?.pause()}async toggle(){this.src?.status().playing?this.pause():await this.play()}seek(t){this.src?.seek(t)}setSyncNudge(t){this.nudgeMs=t,this.src?.setSyncNudge?.(t)}onFrame(t){return this.frameCbs.add(t),()=>this.frameCbs.delete(t)}start(){if(this.handle!==null)return;let t=n=>{this.tick(n),this.handle=this.scheduler.request(t)};this.handle=this.scheduler.request(t)}stop(){this.handle!==null&&this.scheduler.cancel(this.handle),this.handle=null}tick(t){let n=yl;if(this.src)try{n=this.src.sample(t/1e3)}catch(s){this.setState({...this.state,error:s instanceof Error?s.message:"The audio source failed."}),n=yl}this.current=n;let i=this.derive(n);(i.isPlaying!==this.state.isPlaying||i.scene!==this.state.scene||i.latencyMs!==this.state.latencyMs)&&this.setState({...this.state,isPlaying:i.isPlaying,scene:i.scene,latencyMs:i.latencyMs});for(let s of[...this.frameCbs])s(n)}getState=()=>this.state;subscribe=t=>(this.stateCbs.add(t),()=>this.stateCbs.delete(t));refreshStatus(){let t=this.src;if(!t)return;let n=t.status();(n.playing!==this.state.isPlaying||n.duration!==this.state.duration||n.error!==this.state.error)&&this.setState({...this.state,isPlaying:n.playing,duration:n.duration,error:n.error})}derive(t){let n=this.src;if(!n)return fT;let i=n.status();return Object.freeze({source:Object.freeze({id:n.id,kind:n.kind,label:n.label,canSeek:n.canSeek}),isPlaying:t.isPlaying,duration:i.duration,scene:t.currentSceneState,latencyMs:n.latencyMs,error:i.error})}setState(t){this.state=Object.freeze({...t});for(let n of[...this.stateCbs])n()}};var xT=Nn(Qi(),1),vT=(0,zn.createContext)(null);function _T({children:e,pipeline:t}){let[n]=(0,zn.useState)(()=>t??new Vr);return(0,zn.useEffect)(()=>(n.start(),()=>{n.stop(),n.setSource(null)}),[n]),(0,xT.jsx)(vT.Provider,{value:n,children:e})}function Sl(){let e=(0,zn.useContext)(vT);if(!e)throw new Error("useAudioPipeline must be used inside <AudioPipelineProvider>");return e}function Sp(e,t=[]){let n=Sl(),i=(0,zn.useRef)(e);i.current=e,(0,zn.useEffect)(()=>(i.current(n.frame),n.onFrame(s=>i.current(s))),[n,...t])}function d_(){let e=Sl();return(0,zn.useSyncExternalStore)(e.subscribe,e.getState,e.getState)}function yT(){let e=Sl();return(0,zn.useSyncExternalStore)(e.subscribe,()=>e.getState().scene,()=>e.getState().scene)}var bl=Nn(Qi(),1),bp=1200,ST=131850;function p_({className:e="",debugRef:t}){let n=(0,jn.useRef)(null),i=(0,jn.useRef)(null),s=(0,jn.useRef)(null),[a]=(0,jn.useState)(JE),r=(0,jn.useRef)({azimuth:0,elevation:0}),o=(0,jn.useRef)(null),l=(0,jn.useRef)({w:0,h:0,pr:0}),[c]=(0,jn.useState)(()=>({last:0,intervals:new Float64Array(bp),cpu:new Float64Array(bp),frames:0})),h=(0,jn.useRef)(null),[p,u]=(0,jn.useState)("ready");(0,jn.useEffect)(()=>{let m=n.current;if(!m)return;let d=new yp({canvas:m,onStatus:b=>{u(b),b==="lost"&&s.current?.releaseGpu()},onRestored:()=>i.current?.three?.setClearColor(ST,1)});d.three?.setClearColor(ST,1);let v=new vp;return i.current=d,s.current=v,l.current={w:0,h:0,pr:0},c.last=0,u(d.status),h.current={host:d,scene:v,anim:a,lastParams:null,intervals:c.intervals,cpu:c.cpu,frames:0},t&&(t.current=h.current),()=>{i.current=null,s.current=null,h.current=null,t&&(t.current=null),v.dispose(),d.dispose()}},[a,t,c]),Sp(m=>{let d=i.current,v=s.current,b=n.current;if(!d||!v||!b)return;let y=performance.now(),E=c.last?(y-c.last)/1e3:1/60;c.last&&(c.intervals[c.frames%bp]=y-c.last),c.last=y;let T=d.reducedMotion,C=eT(m,T);QE(a,C,E,T);let S=b.clientWidth,A=b.clientHeight,R=d.pixelRatioInUse,L=l.current;(S!==L.w||A!==L.h||R!==L.pr)&&(v.setViewport(S,A,R),L.w=S,L.h=A,L.pr=R),v.update(a,r.current),d.render(v.scene,v.camera),c.cpu[c.frames%bp]=performance.now()-y,c.frames++;let z=h.current;z&&(z.lastParams=C,z.frames=c.frames)});let f=m=>{m.currentTarget.setPointerCapture(m.pointerId),o.current={x:m.clientX,y:m.clientY,az:r.current.azimuth,el:r.current.elevation}},g=m=>{let d=o.current;d&&(r.current.azimuth=Math.min(.7,Math.max(-.7,d.az-(m.clientX-d.x)*.003)),r.current.elevation=Math.min(.6,Math.max(-.2,d.el+(m.clientY-d.y)*.004)))},x=m=>{o.current=null,m.currentTarget.hasPointerCapture(m.pointerId)&&m.currentTarget.releasePointerCapture(m.pointerId)};return(0,bl.jsxs)("div",{"data-gl-status":p,className:e,style:{position:"relative",width:"100%",height:"100%"},children:[(0,bl.jsx)("canvas",{ref:n,role:"img","aria-label":"Spectrum Matrix: a glowing wireframe terrain scrolling toward the viewer, shaped by the audio. Bass raises the left, mids the centre and highs the right of the terrain (three bands, not a full spectrum), and bass hits raise a ridge across it. Drag to orbit.",style:{position:"absolute",inset:0,touchAction:"none",cursor:"grab"},onPointerDown:f,onPointerMove:g,onPointerUp:x,onPointerCancel:x}),p==="lost"&&(0,bl.jsx)("p",{role:"status",className:"pointer-events-none absolute inset-x-0 bottom-0 p-4 text-center text-xs text-slate-400",children:"The graphics context was lost. The scene resumes when the browser restores it."}),p==="unsupported"&&(0,bl.jsx)("p",{role:"alert",className:"relative p-6 text-sm text-slate-300",children:"WebGL is not available in this browser, so Spectrum Matrix cannot be drawn. The other Motion Lab visuals do not need it."})]})}var ti=Nn(ir(),1);var Mp=class{cbs=new Set;on(t){return this.cbs.add(t),()=>this.cbs.delete(t)}emit(){for(let t of[...this.cbs])t()}},Ml=class{constructor(t,n){this.duration=t;this.now=n;this.canSeek=t!==null}duration;now;canSeek;error=null;em=new Mp;base=0;startedMs=0;isPlaying=!1;position(){let t=this.isPlaying?this.base+(this.now()-this.startedMs)/1e3:this.base;return this.duration===null?t:Math.min(t,this.duration)}settle(){this.isPlaying&&this.duration!==null&&this.position()>=this.duration&&(this.base=this.duration,this.isPlaying=!1,this.em.emit())}get time(){return this.settle(),this.position()}get playing(){return this.settle(),this.isPlaying}async play(){this.isPlaying||(this.duration!==null&&this.base>=this.duration&&(this.base=0),this.startedMs=this.now(),this.isPlaying=!0,this.em.emit())}pause(){this.isPlaying&&(this.base=this.position(),this.isPlaying=!1,this.em.emit())}seek(t){this.canSeek&&(this.base=Math.min(Math.max(t,0),this.duration??t),this.startedMs=this.now(),this.em.emit())}onChange(t){return this.em.on(t)}dispose(){this.isPlaying=!1}},El=class{element;canSeek=!0;error=null;em=new Mp;detach=[];constructor(t){this.element=new Audio,this.element.preload="auto",this.element.src=t;let n=(i,s)=>{this.element.addEventListener(i,s),this.detach.push(()=>this.element.removeEventListener(i,s))};n("loadedmetadata",()=>this.em.emit()),n("play",()=>this.em.emit()),n("pause",()=>this.em.emit()),n("ended",()=>this.em.emit()),n("error",()=>{this.error="This audio could not be loaded or decoded. Try an MP3, M4A, WAV or OGG.",this.em.emit()})}get time(){return this.element.currentTime}get duration(){return Number.isFinite(this.element.duration)?this.element.duration:null}get playing(){return!this.element.paused&&!this.element.ended}async play(){await this.element.play()}pause(){this.element.pause()}seek(t){let n=this.duration;this.element.currentTime=Math.min(Math.max(t,0),n??t)}onChange(t){return this.em.on(t)}dispose(){this.element.pause();for(let t of this.detach)t();this.element.removeAttribute("src"),this.element.load()}};var Ep=class{maxS;times=[];values=[];constructor(t){this.maxS=t}push(t,n){for(this.times.push(t),this.values.push(n);this.times.length>1&&t-this.times[0]>this.maxS;)this.times.shift(),this.values.shift()}at(t){let n=this.times.length;if(n===0)return;if(t<=this.times[0])return this.values[0];let i=0,s=n-1;for(;i<s;){let a=i+s+1>>1;this.times[a]<=t?i=a:s=a-1}return this.values[i]}};var gL={springHz:4,damping:.6,kickSpan:.15,sustainWeight:.2,sustainRelease:.5,kickTau:.15,floorAttack:3,combine:"max"},bT=15,vL=.5,_L=1/240,vu=class{opts;hi=-40;lo=-70;sustain=0;x=0;v=0;kickEnv=0;elapsed=0;constructor(t={}){this.opts={...gL,...t}}push(t,n,i){let s=Math.min(.1,Math.max(.001,i));this.elapsed+=s,this.hi=en(this.hi,t,s,.05,12),this.lo=en(this.lo,t,s,this.opts.floorAttack,.3),this.lo>this.hi-bT&&(this.lo=this.hi-bT);let a=this.hi-this.lo,r=tn((t-this.lo)/a);this.sustain=en(this.sustain,r,s,.12,this.opts.sustainRelease);let o=Math.max(0,r-this.sustain),l=this.elapsed<vL?0:tn(o/this.opts.kickSpan);this.kickEnv=Math.max(l,this.kickEnv*Math.exp(-s/this.opts.kickTau));let c=2*Math.PI*this.opts.springHz,h=2*this.opts.damping*c,p=Math.max(1,Math.ceil(s/_L)),u=s/p;for(let m=0;m<p;m++){let d=c*c*(this.sustain-this.x)-h*this.v;this.v+=d*u,this.x+=this.v*u}let f=this.opts.sustainWeight,g=f*this.x;return{pull:tn(this.opts.combine==="max"?Math.max(g,this.kickEnv):g+(1-f)*this.kickEnv),kick:this.kickEnv,sustain:this.sustain,level:r}}relax(t){let n=Math.min(.1,Math.max(.001,t));return this.kickEnv*=Math.exp(-n/this.opts.kickTau),this.sustain=en(this.sustain,0,n,.12,this.opts.sustainRelease),this.x=en(this.x,0,n,.05,.3),this.v=0,{pull:tn(Math.max(this.opts.sustainWeight*this.x,this.kickEnv)),kick:this.kickEnv,sustain:this.sustain,level:0}}};var Tl=class{bass=0;mid=0;high=0;level=0;onsets=new du;shaper=new vu;hit=0;reset(){this.bass=this.mid=this.high=this.level=this.hit=0,this.onsets=new du,this.shaper=new vu}push(t,n,i){let s=this.shaper.push(t.punchDb,n,i);this.hit=s.kick,this.bass=en(this.bass,pu(t.lowDb,-85,-25),i,.02,.18),this.mid=en(this.mid,pu(t.midDb,-85,-25),i,.03,.22),this.high=en(this.high,pu(t.highDb,-85,-25),i,.01,.12),this.level=en(this.level,pu(t.allDb,-85,-25),i,.03,.25);let a=this.onsets.pushFlux(t.flux,n);return this.out(a,this.onsets.strength)}decay(t){return this.bass=en(this.bass,0,t,.02,.4),this.mid=en(this.mid,0,t,.02,.4),this.high=en(this.high,0,t,.02,.4),this.level=en(this.level,0,t,.02,.4),this.hit=this.shaper.relax(t).kick,this.out(!1,0)}out(t,n){return{bass:this.bass,mid:this.mid,high:this.high,rmsEnergy:this.level,onsetStrength:tn(n),beatDetected:t,bassHit:this.hit}}};var yL={restEnter:.1,restExit:.16,activeEnter:.42,activeExit:.3,minDwellS:1.5,slopeWindowS:1.5,settleSlope:-.08},wp=class{state="rest";o;energy=0;dwell=0;hist=[];clock=0;constructor(t={}){this.o={...yL,...t}}reset(){this.state="rest",this.energy=0,this.dwell=0,this.hist=[],this.clock=0}push(t,n){for(this.clock+=n,this.dwell+=n,this.energy=en(this.energy,t,n,.8,1.5),this.hist.push([this.clock,this.energy]);this.hist.length>1&&this.clock-this.hist[0][0]>this.o.slopeWindowS*1.5;)this.hist.shift();let i=this.slope(),s=this.energy,a=this.o,r=this.state;if(this.dwell>=a.minDwellS)switch(this.state){case"rest":s>a.restExit&&(r="build");break;case"build":s<a.restEnter?r="rest":s>a.activeEnter&&(r="active");break;case"active":(s<a.activeExit||i<a.settleSlope)&&(r="settle");break;case"settle":s<a.restEnter?r="rest":s>a.activeEnter&&i>=0?r="active":i>.04&&s>a.restExit&&(r="build");break}return r!==this.state&&(this.state=r,this.dwell=0),this.state}slope(){let t=this.clock-this.o.slopeWindowS;if(this.hist[0][0]>t)return 0;let n=this.hist[0];for(let i of this.hist)if(i[0]<=t)n=i;else break;return(this.energy-n[1])/Math.max(.001,this.clock-n[0])}};var MT=.6,Gr=class{constructor(t,n){this.backend=n;this.id=t.id,this.kind=t.kind,this.label=t.label}backend;id;kind;label;computer=new Tl;tracker=new wp;delay=new Ep(MT+.4);lastNow=-1;nudgeMs=0;get canSeek(){return this.backend.playhead.canSeek}get latencyMs(){return Math.round(this.backend.latencyS*1e3)}sample(t){let n=this.backend.playhead,i=this.lastNow<0?1/60:Math.min(.1,Math.max(.001,t-this.lastNow));this.lastNow=t;let s=n.playing,a=n.time,r=n.duration,o=s?this.computer.push(this.backend.read(),t,i):this.computer.decay(i);s&&this.tracker.push(o.rmsEnergy,i);let l=_l({time:a,progress:r?a/r:0,isPlaying:s,...o,currentSceneState:this.tracker.state});this.delay.push(t,l);let c=Math.min(MT,Math.max(0,this.backend.latencyS+this.nudgeMs/1e3)),h=c>0?this.delay.at(t-c):l;return!h||h===l?l:_l({...h,time:a,progress:l.progress,isPlaying:s})}async play(){await this.backend.playhead.play()}pause(){this.backend.playhead.pause()}seek(t){this.backend.playhead.seek(t)}status(){let t=this.backend.playhead;return{playing:t.playing,duration:t.duration,error:t.error}}onStatus(t){return this.backend.playhead.onChange(t)}setSyncNudge(t){this.nudgeMs=Math.max(-200,Math.min(400,t))}dispose(){this.backend.dispose()}};function xL(e,t){let n=e*t/60,i=n-Math.floor(n),s=Math.exp(-i*9),a=i>.5?Math.exp(-(i-.5)*22):0,r=-75+40*s,o=-72+38*s,l=-52+5*Math.sin(2*Math.PI*e/8),c=-68+25*a,h=f=>10**(f/10),p=10*Math.log10(h(o)+h(l)+h(c)),u=.002+.05*Math.exp(-i*30);return{lowDb:o,punchDb:r,midDb:l,highDb:c,allDb:p,flux:u}}var m_=class{constructor(t,n){this.playhead=t;this.bpm=n}playhead;bpm;latencyS=0;read(){return xL(this.playhead.time,this.bpm)}dispose(){this.playhead.dispose()}};function _u(e,t=120){let n=new m_(new Ml(null,e),t);return new Gr({id:"demo",kind:"synthetic",label:`Demo, ${t} BPM synthetic`},n)}var Cp="motion-web/1";var ET=["reactive","anticipatory","continuous"];var Su=class extends Error{path;constructor(t,n){super(`${t}: ${n}`),this.name="ParseError",this.path=t}},se=(e,t)=>{throw new Su(e,t)},$n=(e,t)=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:se(t,"expected an object"),kr=(e,t)=>Array.isArray(e)?e:se(t,"expected an array"),Ue=(e,t)=>typeof e=="string"&&e.length>0?e:se(t,"expected a non-empty string"),As=(e,t)=>typeof e=="number"&&Number.isFinite(e)?e:se(t,"expected a finite number"),xu=(e,t)=>{let n=As(e,t);return n>0?n:se(t,"expected a positive number")},v_=(e,t)=>{let n=As(e,t);return Number.isInteger(n)&&n>=0?n:se(t,"expected a non-negative integer")},g_=(e,t)=>e===null?null:As(e,t),yu=(e,t,n)=>{let i=Ue(e,n);return t.includes(i)?i:se(n,`expected one of ${t.join(", ")}`)},TT=(e,t)=>e===Cp?Cp:se(t,`unsupported format ${JSON.stringify(e)}; this UI reads ${Cp}`),Ts=1e-6,Rp={fail:se,rec:$n,arr:kr,str:Ue,num:As,posNum:xu,nonNegInt:v_,oneOf:yu};function AT(e){let t=$n(e,"manifest"),n=kr(t.songs,"manifest.songs").map((s,a)=>{let r=`manifest.songs[${a}]`,o=$n(s,r),l=o.audio===null?null:$n(o.audio,`${r}.audio`),c=o.features===void 0||o.features===null?null:$n(o.features,`${r}.features`),h=kr(o.profiles,`${r}.profiles`).map((p,u)=>{let f=`${r}.profiles[${u}]`,g=$n(p,f);return{id:Ue(g.id,`${f}.id`),label:Ue(g.label,`${f}.label`),timeline:Ue(g.timeline,`${f}.timeline`),curves:Ue(g.curves,`${f}.curves`)}});return h.length===0&&se(`${r}.profiles`,"a song needs at least one profile"),{id:Ue(o.id,`${r}.id`),title:Ue(o.title,`${r}.title`),durationS:xu(o.durationS,`${r}.durationS`),audio:l&&{src:Ue(l.src,`${r}.audio.src`),rights:typeof l.rights=="string"?l.rights:""},features:c&&{meta:Ue(c.meta,`${r}.features.meta`),bin:Ue(c.bin,`${r}.features.bin`)},profiles:h}});n.length===0&&se("manifest.songs","no songs");let i=n.map(s=>s.id);return new Set(i).size!==i.length&&se("manifest.songs","song ids must be unique"),{format:TT(t.format,"manifest.format"),songs:n}}function wT(e){let t=$n(e,"timeline"),n=xu(t.durationS,"timeline.durationS"),i=xu(t.rateHz,"timeline.rateHz"),s=v_(t.nSamples,"timeline.nSamples");s<2&&se("timeline.nSamples","need at least 2 samples");let a=kr(t.tracks,"timeline.tracks").map((p,u)=>{let f=`timeline.tracks[${u}]`,g=$n(p,f),x=kr(g.properties,`${f}.properties`).map((m,d)=>{let v=`${f}.properties[${d}]`,b=$n(m,v);return{name:Ue(b.name,`${v}.name`),combine:yu(b.combine,["add","max","priority","exclusive"],`${v}.combine`),max:xu(b.max,`${v}.max`)}});return x.length===0&&se(`${f}.properties`,"a track needs at least one property"),{name:Ue(g.name,`${f}.name`),properties:x}});a.length===0&&se("timeline.tracks","no tracks");let r=new Set(a.flatMap(p=>p.properties.map(u=>`${p.name}.${u.name}`)));r.size!==a.reduce((p,u)=>p+u.properties.length,0)&&se("timeline.tracks","track.property names must be unique");let o=kr(t.states,"timeline.states").map((p,u)=>{let f=`timeline.states[${u}]`,g=$n(p,f),x={id:Ue(g.id,`${f}.id`),state:yu(g.state,vl,`${f}.state`),start:As(g.start,`${f}.start`),end:As(g.end,`${f}.end`)};return x.end<x.start&&se(f,"ends before it starts"),x});o.length===0&&se("timeline.states","no scene states"),Math.abs(o[0].start)>Ts&&se("timeline.states[0].start","the first state must start at 0"),o.forEach((p,u)=>{u>0&&Math.abs(p.start-o[u-1].end)>Ts&&se(`timeline.states[${u}].start`,"states must be contiguous")}),Math.abs(o[o.length-1].end-n)>2/i&&se("timeline.states","states must end at the end of the audio");let l=new Set,c=kr(t.actions,"timeline.actions").map((p,u)=>{let f=`timeline.actions[${u}]`,g=$n(p,f),x=yu(g.kind,["event","continuous"],`${f}.kind`),m={id:Ue(g.id,`${f}.id`),rule:Ue(g.rule,`${f}.rule`),track:Ue(g.track,`${f}.track`),property:Ue(g.property,`${f}.property`),primitive:Ue(g.primitive,`${f}.primitive`),kind:x,policy:yu(g.policy,ET,`${f}.policy`),source:g_(g.source,`${f}.source`),start:As(g.start,`${f}.start`),peak:g_(g.peak,`${f}.peak`),settle:g_(g.settle,`${f}.settle`),end:As(g.end,`${f}.end`),amplitude:As(g.amplitude,`${f}.amplitude`),lookahead:As(g.lookahead,`${f}.lookahead`)};if(l.has(m.id)&&se(`${f}.id`,`duplicate action id ${m.id}`),l.add(m.id),r.has(`${m.track}.${m.property}`)||se(f,`unknown property ${m.track}.${m.property}`),m.end<m.start-Ts&&se(f,"ends before it starts"),(m.amplitude<0||m.amplitude>1+Ts)&&se(`${f}.amplitude`,"must be within [0, 1]"),x==="event"){let{source:d,peak:v,settle:b}=m;d===null||v===null||b===null?se(f,"an event action needs source, peak and settle"):m.start-Ts<=v&&v<=b+Ts&&b<=m.end+Ts?m.policy==="reactive"&&m.start<d-Ts?se(f,"a reactive action cannot start before its source"):m.policy==="anticipatory"&&m.start>d+Ts&&se(f,"an anticipatory action must start at or before its source"):se(f,"times must satisfy start <= peak <= settle <= end")}else m.policy!=="continuous"&&se(`${f}.policy`,"a continuous action must use the continuous policy");return m});for(let p=1;p<c.length;p++)c[p].start<c[p-1].start-Ts&&se(`timeline.actions[${p}]`,"actions must be sorted by start time");let h=$n(t.provenance,"timeline.provenance");return{format:TT(t.format,"timeline.format"),profile:{name:Ue($n(t.profile,"timeline.profile").name,"timeline.profile.name"),version:Ue($n(t.profile,"timeline.profile").version,"timeline.profile.version")},durationS:n,rateHz:i,nSamples:s,tracks:a,states:o,actions:c,provenance:{schemaVersion:Ue(h.schemaVersion,"timeline.provenance.schemaVersion"),timelineSha256:Ue(h.timelineSha256,"timeline.provenance.timelineSha256"),audioSha256:Ue(h.audioSha256,"timeline.provenance.audioSha256"),suppressedActions:v_(h.suppressedActions,"timeline.provenance.suppressedActions")}}}function CT(e,t){let n=t.tracks.flatMap(a=>a.properties.map(r=>`${a.name}.${r.name}`)),i=n.length*t.nSamples*4;if(e.byteLength!==i)throw new Su("curves",`expected ${i} bytes (${n.length} curves x ${t.nSamples} samples), got ${e.byteLength}`);let s=new Float32Array(e);for(let a=0;a<s.length;a++)if(!Number.isFinite(s[a]))throw new Su("curves",`non-finite value at index ${a}`);return{rateHz:t.rateHz,nSamples:t.nSamples,keys:n,data:s}}function SL(e,t){let n=0,i=e.length-1;if(t<=e[0].start)return 0;for(;n<i;){let s=n+i+1>>1;e[s].start<=t?n=s:i=s-1}return n}function RT(e,t){return e.states[SL(e.states,t)]}var __="audio-features/1",Np=["lowDb","punchDb","midDb","highDb","allDb","flux"];function NT(e){let{rec:t,arr:n,str:i,num:s,posNum:a,nonNegInt:r,fail:o,oneOf:l}=Rp,c=t(e,"features");c.format!==__&&o("features.format",`unsupported format ${JSON.stringify(c.format)}; this UI reads ${__}`);let h=n(c.channels,"features.channels").map((g,x)=>l(g,Np,`features.channels[${x}]`));(h.length!==Np.length||Np.some((g,x)=>h[x]!==g))&&o("features.channels",`expected exactly ${Np.join(", ")} in that order`);let p=r(c.nFrames,"features.nFrames");p<2&&o("features.nFrames","need at least 2 frames");let u=n(c.beats,"features.beats").map((g,x)=>s(g,`features.beats[${x}]`));for(let g=1;g<u.length;g++)u[g]<u[g-1]&&o(`features.beats[${g}]`,"beat times must be sorted");let f=t(c.provenance,"features.provenance");return{format:__,rateHz:a(c.rateHz,"features.rateHz"),nFrames:p,durationS:a(c.durationS,"features.durationS"),channels:h,beats:u,provenance:{audioSha256:i(f.audioSha256,"features.provenance.audioSha256")}}}function DT(e,t){let n=t.channels.length*t.nFrames*4;e.byteLength!==n&&Rp.fail("features.bin",`expected ${n} bytes (${t.channels.length} channels x ${t.nFrames} frames), got ${e.byteLength}`);let i=new DataView(e),s={};return t.channels.forEach((a,r)=>{let o=new Float32Array(t.nFrames);for(let l=0;l<t.nFrames;l++){let c=i.getFloat32((r*t.nFrames+l)*4,!0);Number.isFinite(c)||Rp.fail(`features.bin.${a}[${l}]`,"not a finite number"),o[l]=c}s[a]=o}),s}var bL=.25,Dp=class{kind="offline";id;label;canSeek=!0;latencyMs=0;motion;beats;head;rate;n;timeline;cols;beatFlag;lastIdx=-1;nudgeS=0;constructor(t,n){this.id=t.id,this.label=t.label,this.timeline=t.timeline,this.motion={timeline:t.timeline,curves:t.curves},this.beats=t.meta.beats,this.rate=t.meta.rateHz,this.n=t.meta.nFrames,this.head=t.audioUrl?new El(t.audioUrl):new Ml(t.timeline.durationS,n);let i=this.n;this.cols={bass:new Float32Array(i),mid:new Float32Array(i),high:new Float32Array(i),rms:new Float32Array(i),onset:new Float32Array(i),hit:new Float32Array(i)},this.beatFlag=new Uint8Array(i);let s=new Tl,a=1/this.rate,r=t.readings;for(let o=0;o<i;o++){let l=s.push({lowDb:r.lowDb[o],punchDb:r.punchDb[o],midDb:r.midDb[o],highDb:r.highDb[o],allDb:r.allDb[o],flux:r.flux[o]},o*a,a);this.cols.bass[o]=l.bass,this.cols.mid[o]=l.mid,this.cols.high[o]=l.high,this.cols.rms[o]=l.rmsEnergy,this.cols.onset[o]=l.onsetStrength,this.cols.hit[o]=l.bassHit,this.beatFlag[o]=l.beatDetected?1:0}}sample(t){let n=this.head.time,i=this.head.playing,s=Math.max(0,n-this.nudgeS)*this.rate,a=Math.min(this.n-1,Math.floor(s)),r=Math.min(this.n-1,a+1),o=Math.min(1,s-a),l=p=>p[a]+(p[r]-p[a])*o,c=!1;if(i&&this.lastIdx>=0&&a>this.lastIdx&&a-this.lastIdx<bL*this.rate)for(let p=this.lastIdx+1;p<=a;p++)this.beatFlag[p]&&(c=!0);this.lastIdx=a;let h=this.timeline.durationS;return _l({time:n,progress:h>0?n/h:0,isPlaying:i,bass:l(this.cols.bass),mid:l(this.cols.mid),high:l(this.cols.high),rmsEnergy:l(this.cols.rms),onsetStrength:this.cols.onset[a],beatDetected:c,currentSceneState:RT(this.timeline,n).state,bassHit:l(this.cols.hit)})}async play(){await this.head.play()}pause(){this.head.pause()}seek(t){this.head.seek(t),this.lastIdx=-1}status(){return{playing:this.head.playing,duration:this.timeline.durationS,error:this.head.error}}onStatus(t){return this.head.onChange(t)}setSyncNudge(t){this.nudgeS=Math.max(-.2,Math.min(.4,t/1e3))}dispose(){this.head.dispose()}};async function y_(e,t){let n=await fetch(e,{signal:t});if(!n.ok)throw new Error(`${e}: HTTP ${n.status}`);return n.json()}async function UT(e,t){let n=await fetch(e,{signal:t});if(!n.ok)throw new Error(`${e}: HTTP ${n.status}`);return n.arrayBuffer()}async function Up(e,t){return AT(await y_(e,t))}function x_(e){return e.songs.filter(t=>t.features!==null)}async function S_(e){let n=(await Up(e.manifestUrl,e.signal)).songs.find(f=>f.id===e.songId);if(!n)throw new Error(`song "${e.songId}" is not in the manifest`);if(!n.features)throw new Error(`song "${e.songId}" has no features bundle; re-run export_web.py with a "source" audio file`);let i=n.profiles.find(f=>f.id===(e.profileId??n.profiles[0].id));if(!i)throw new Error(`song "${e.songId}" has no profile "${e.profileId}"`);let[s,a,r,o]=await Promise.all([y_(i.timeline,e.signal),UT(i.curves,e.signal),y_(n.features.meta,e.signal),UT(n.features.bin,e.signal)]),l=wT(s),c=CT(a,l),h=NT(r),p=DT(o,h);if(Math.abs(h.durationS-l.durationS)>.25)throw new Error(`features (${h.durationS.toFixed(2)} s) and timeline (${l.durationS.toFixed(2)} s) are for different audio`);let u=e.now??(()=>performance.now());return new Dp({id:`offline:${n.id}`,label:n.title,timeline:l,curves:c,meta:h,readings:p,audioUrl:n.audio?.src??null},u)}var er=2048,Lp=4096,ML=4e3,Op=class{main;low;mainDb=new Float32Array(er/2);lowDb=new Float32Array(Lp/2);mag=new Float32Array(er/2);prevMag=new Float32Array(er/2);primed=!1;r;constructor(t){this.main=t.createAnalyser(),this.main.fftSize=er,this.main.smoothingTimeConstant=.5,this.low=t.createAnalyser(),this.low.fftSize=Lp,this.low.smoothingTimeConstant=0;let n=t.sampleRate;this.r={low:Hr(Ki.lowHz[0],Ki.lowHz[1],n,Lp),punch:Hr(Ki.punchHz[0],Ki.punchHz[1],n,Lp),mid:Hr(Ki.midHz[0],Ki.midHz[1],n,er),high:Hr(Ki.highHz[0],Ki.highHz[1],n,er),all:Hr(Ki.lowHz[0],Ki.highHz[1],n,er),onsetTop:Hr(0,ML,n,er)}}tap(t){t.connect(this.main),t.connect(this.low)}untap(t){try{t.disconnect(this.main),t.disconnect(this.low)}catch{}this.primed=!1}read(){this.main.getFloatFrequencyData(this.mainDb),this.low.getFloatFrequencyData(this.lowDb);let t=0,n=this.r.onsetTop[1];for(let i=0;i<this.mag.length;i++)this.mag[i]=10**(this.mainDb[i]/20);if(this.primed)for(let i=1;i<n;i++){let s=this.mag[i]-this.prevMag[i];s>0&&(t+=s)}return this.prevMag.set(this.mag),this.primed=!0,{lowDb:xl(this.lowDb,...this.r.low),punchDb:xl(this.lowDb,...this.r.punch),midDb:xl(this.mainDb,...this.r.mid),highDb:xl(this.mainDb,...this.r.high),allDb:xl(this.mainDb,...this.r.all),flux:t}}},b_=class{constructor(t,n){this.inner=t;this.prepare=n}inner;prepare;get time(){return this.inner.time}get duration(){return this.inner.duration}get playing(){return this.inner.playing}get canSeek(){return this.inner.canSeek}get error(){return this.inner.error}async play(){await this.prepare(),await this.inner.play()}pause(){this.inner.pause()}seek(t){this.inner.seek(t)}onChange(t){return this.inner.onChange(t)}dispose(){this.inner.dispose()}},M_=class{constructor(t){this.inner=t;this.playhead=new b_(t,()=>this.ensureGraph())}inner;playhead;ctx=null;taps=null;async ensureGraph(){if(!this.ctx){let t=new AudioContext,n=new Op(t),i=t.createMediaElementSource(this.inner.element);n.tap(i),i.connect(t.destination),this.ctx=t,this.taps=n}this.ctx.state==="suspended"&&await this.ctx.resume()}read(){return this.taps?this.taps.read():EL}get latencyS(){let t=this.ctx;if(!t)return 0;let n=(t.baseLatency??0)+(t.outputLatency??0);return Number.isFinite(n)?n:0}dispose(){this.playhead.dispose(),this.ctx?.close()}},E_=class{constructor(t,n,i){this.getCtx=t;this.taps=n;this.constraints=i}getCtx;taps;constraints;canSeek=!1;duration=null;error=null;isPlaying=!1;startedAt=0;cbs=new Set;stream=null;node=null;get time(){return this.isPlaying?this.getCtx().currentTime-this.startedAt:0}get playing(){return this.isPlaying}async play(){if(!this.isPlaying){try{this.error=null;let t=this.getCtx();t.state==="suspended"&&await t.resume(),this.stream=await navigator.mediaDevices.getUserMedia(this.constraints),this.node=t.createMediaStreamSource(this.stream),this.taps().tap(this.node),this.startedAt=t.currentTime,this.isPlaying=!0}catch(t){throw this.error="The microphone is unavailable or access was denied.",this.emit(),t}this.emit()}}pause(){this.isPlaying&&(this.release(),this.isPlaying=!1,this.emit())}seek(){}onChange(t){return this.cbs.add(t),()=>this.cbs.delete(t)}dispose(){this.release(),this.isPlaying=!1}release(){this.node&&this.taps().untap(this.node),this.stream?.getTracks().forEach(t=>t.stop()),this.node=null,this.stream=null}emit(){for(let t of[...this.cbs])t()}},T_=class{latencyS=0;playhead;ctx=new AudioContext;taps=new Op(this.ctx);constructor(t){this.playhead=new E_(()=>this.ctx,()=>this.taps,t)}read(){return this.taps.read()}dispose(){this.playhead.dispose(),this.ctx.close()}},EL={lowDb:-120,punchDb:-120,midDb:-120,highDb:-120,allDb:-120,flux:0};function LT(e,t,n=`live:${t}`){return new Gr({id:n,kind:"live",label:t},new M_(new El(e)))}function A_(e){let t=URL.createObjectURL(e);return{source:LT(t,e.name,`file:${e.name}`),revoke:()=>URL.revokeObjectURL(t)}}function w_(){let e={audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}};return new Gr({id:"mic",kind:"live",label:"Microphone"},new T_(e))}var ce=Nn(Qi(),1),OT="/motion/manifest.json",TL=120,IT=e=>`${Math.floor(e/60)}:${(e%60).toFixed(1).padStart(4,"0")}`,AL={none:"Pick a source to begin",paused:"Paused",silent:"Silent: resting",quiet:"Quiet: low energy",playing:"Playing"};function PT(){let e=Sl(),t=d_(),[n,i]=(0,ti.useState)([]),[s,a]=(0,ti.useState)(null),[r,o]=(0,ti.useState)(null),l=(0,ti.useRef)(null);(0,ti.useEffect)(()=>{let f=new AbortController;return Up(OT,f.signal).then(g=>i(x_(g))).catch(()=>i([])),()=>f.abort()},[]),(0,ti.useEffect)(()=>()=>l.current?.(),[]);let c=(f,g,x)=>{let m=l.current;e.setSource(f),m?.(),l.current=g,o(null),x&&e.play()},h=async f=>{a(f.id),o(null);try{c(await S_({manifestUrl:OT,songId:f.id}),null,!0)}catch(g){o(g instanceof Error?g.message:"Could not load this track.")}finally{a(null)}},p=t.source?.id??null,u="rounded-full px-3 py-1 text-sm text-slate-300 transition aria-pressed:bg-white aria-pressed:text-slate-900 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none disabled:opacity-50";return(0,ce.jsxs)("div",{role:"group","aria-label":"Audio source",className:"flex flex-wrap items-center gap-2",children:[(0,ce.jsxs)("div",{className:"inline-flex flex-wrap gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10",children:[(0,ce.jsx)("button",{type:"button","data-source":"demo","aria-pressed":p==="demo",className:u,onClick:()=>c(_u(()=>performance.now(),TL),null,!0),children:"Demo"}),n.map(f=>(0,ce.jsx)("button",{type:"button","data-source":`song:${f.id}`,"aria-pressed":p===`offline:${f.id}`,className:u,disabled:s!==null,title:"Pre-computed track",onClick:()=>{h(f)},children:s===f.id?"Loading\u2026":f.title.split(" - ")[0]},f.id)),(0,ce.jsx)("button",{type:"button","data-source":"mic","aria-pressed":p==="mic",className:u,onClick:()=>c(w_(),null,!0),children:"Microphone"})]}),(0,ce.jsxs)("label",{className:"inline-flex cursor-pointer items-center rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 transition hover:bg-white/15 focus-within:ring-2 focus-within:ring-cyan-300",children:["Load a track",(0,ce.jsx)("input",{type:"file",accept:"audio/*",className:"sr-only",onChange:f=>{let g=f.target.files?.[0];if(!g)return;let{source:x,revoke:m}=A_(g);c(x,m,!1)}})]}),(r||t.error)&&(0,ce.jsx)("p",{role:"alert",className:"w-full text-xs text-rose-300",children:r??t.error})]})}function BT(){let e=Sl(),t=d_(),n=(0,ti.useRef)(null),i=(0,ti.useRef)(null),s=(0,ti.useRef)(!1),[a,r]=(0,ti.useState)("none"),[o,l]=(0,ti.useState)(0),c=t.source!==null;return Sp(h=>{let p=c?h.isPlaying?h.rmsEnergy<.04?"silent":h.rmsEnergy<.3?"quiet":"playing":"paused":"none";r(u=>u===p?u:p),!s.current&&n.current&&(n.current.value=String(h.time)),i.current&&(i.current.textContent=IT(h.time))},[c]),(0,ce.jsxs)("div",{className:"space-y-3",children:[(0,ce.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,ce.jsx)("button",{type:"button","data-play":!0,disabled:!c,onClick:()=>{e.toggle()},"aria-label":t.isPlaying?"Pause":"Play","aria-pressed":t.isPlaying,className:"grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:scale-100",children:t.isPlaying?(0,ce.jsxs)("svg",{viewBox:"0 0 24 24",className:"h-5 w-5",fill:"currentColor","aria-hidden":!0,children:[(0,ce.jsx)("rect",{x:"6",y:"5",width:"4",height:"14",rx:"1"}),(0,ce.jsx)("rect",{x:"14",y:"5",width:"4",height:"14",rx:"1"})]}):(0,ce.jsx)("svg",{viewBox:"0 0 24 24",className:"h-5 w-5",fill:"currentColor","aria-hidden":!0,children:(0,ce.jsx)("path",{d:"M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z"})})}),(0,ce.jsxs)("div",{role:"status","aria-live":"polite",className:"flex flex-col",children:[(0,ce.jsx)("span",{className:"text-xs font-medium",children:AL[a]}),(0,ce.jsxs)("span",{className:"max-w-[18rem] truncate text-[11px] text-slate-400",children:[t.source?`${t.source.label} \xB7 ${t.source.kind}`:"No source",t.source&&` \xB7 scene: ${t.scene}`]})]})]}),(0,ce.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,ce.jsx)("span",{ref:i,className:"w-14 text-xs tabular-nums text-slate-300",children:"0:00.0"}),(0,ce.jsx)("input",{ref:n,type:"range","aria-label":"Timeline position",min:0,max:t.duration??0,step:.01,defaultValue:0,disabled:!t.source?.canSeek,onPointerDown:()=>s.current=!0,onPointerUp:()=>s.current=!1,onChange:h=>e.seek(Number(h.target.value)),className:"h-1.5 min-w-[12rem] flex-1 cursor-pointer accent-white disabled:cursor-not-allowed disabled:opacity-40"}),(0,ce.jsx)("span",{className:"w-14 text-right text-xs tabular-nums text-slate-400",children:t.duration?IT(t.duration):"--:--"})]}),(0,ce.jsxs)("div",{className:"flex flex-wrap items-center gap-3 text-xs text-slate-300",children:[(0,ce.jsx)("label",{htmlFor:"sync-nudge",children:"Sync nudge"}),(0,ce.jsx)("input",{id:"sync-nudge",type:"range",min:-200,max:200,step:10,value:o,onChange:h=>{l(Number(h.target.value)),e.setSyncNudge(Number(h.target.value))},className:"w-40 accent-white"}),(0,ce.jsxs)("span",{className:"w-16 tabular-nums",children:[o>0?"+":"",o," ms"]}),(0,ce.jsxs)("span",{className:"text-slate-400",children:["device latency ",t.latencyMs," ms, compensated automatically"]})]})]})}var ei=Nn(Qi(),1);function C_({pipeline:e,debugRef:t}){return(0,ei.jsx)(_T,{pipeline:e,children:(0,ei.jsx)(wL,{debugRef:t})})}function wL({debugRef:e}){let t=yT();return(0,ei.jsxs)("section",{"aria-labelledby":"spectrum-matrix-title","data-scene":t,className:"relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-3xl bg-[#02030a] text-slate-100 ring-1 ring-white/10",children:[(0,ei.jsxs)("div",{className:"relative min-h-[22rem] flex-1",children:[(0,ei.jsx)("div",{className:"absolute inset-0",children:(0,ei.jsx)(p_,{debugRef:e})}),(0,ei.jsxs)("header",{className:"pointer-events-none relative p-5 sm:p-6",children:[(0,ei.jsx)("h2",{id:"spectrum-matrix-title",className:"text-lg font-semibold tracking-tight",children:"Spectrum Matrix"}),(0,ei.jsx)("p",{className:"max-w-md text-sm text-slate-300/90",children:"A terrain shaped by bass (left), mids (centre) and highs (right): three bands, not a full spectrum. Bass hits raise a ridge. Silence lets it settle. Drag to orbit."})]})]}),(0,ei.jsxs)("div",{className:"relative m-3 space-y-3 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:m-5 sm:mt-0",children:[(0,ei.jsx)(PT,{}),(0,ei.jsx)(BT,{})]})]})}var Ip=Nn(Qi(),1),ws=new Vr,js={current:null},R_=0,N_=null;function CL(){let[e,t]=(0,Pp.useState)(!0);return(0,Pp.useEffect)(()=>(N_=t,()=>{N_=null}),[]),(0,Ip.jsx)("div",{className:"mx-auto max-w-7xl px-4 py-4",children:e&&(0,Ip.jsx)(C_,{pipeline:ws,debugRef:js})})}var D_=e=>{let t=e.filter(i=>Number.isFinite(i)&&i>0).sort((i,s)=>i-s);if(!t.length)return null;let n=i=>t[Math.min(t.length-1,Math.floor(i*t.length))];return{n:t.length,median:n(.5),p95:n(.95),p99:n(.99),max:t[t.length-1],over33:t.filter(i=>i>33.4).length/t.length}},ji={bass:0,mid:0,high:0,rms:0,onset:0,scene:"rest",hitAt:-1e9,hitLevel:0},FT={id:"matrix-script",kind:"synthetic",label:"Scripted input (synthetic)",canSeek:!1,latencyMs:0,sample(e){let t=ji.hitLevel*Math.exp(-Math.max(0,e-ji.hitAt)/.15);return Object.freeze({time:e,progress:0,isPlaying:!0,bass:Math.min(1,ji.bass+.5*t),mid:ji.mid,high:ji.high,rmsEnergy:ji.rms,onsetStrength:ji.onset,beatDetected:!1,currentSceneState:ji.scene,bassHit:t})},play:()=>Promise.resolve(),pause(){},seek(){},status:()=>({playing:!0,duration:null,error:null}),onStatus:()=>()=>{},dispose(){}};function HT(e,t,n,i){let s=t.clone().project(e);return{x:(s.x*.5+.5)*n,y:(s.y*.5+.5)*i,ndcX:s.x,ndcY:s.y}}function RL(){let e=js.current,t=e?.host.three;if(!e||!t)return null;e.host.render(e.scene.scene,e.scene.camera);let n=t.getContext(),i=n.drawingBufferWidth,s=n.drawingBufferHeight,a=new Uint8Array(i*s*4);n.readPixels(0,0,i,s,n.RGBA,n.UNSIGNED_BYTE,a);let r=e.scene.camera;r.updateMatrixWorld();let o=e.scene.rowZ(nn/2,e.anim.frac),l=e.scene.lobeCentresX(),c=x=>(.2126*a[x]+.7152*a[x+1]+.0722*a[x+2])/255,h=x=>{let m=Math.max(4,i*.06),d=0,v=0,b=0;for(let y=Math.floor(s*.12);y<Math.floor(s*.82);y++)for(let E=Math.max(0,Math.floor(x-m));E<Math.min(i,Math.ceil(x+m));E++){let T=c((y*i+E)*4);d+=T,v++,T>b&&(b=T)}return{mean:v?d/v:NaN,max:b}},p=l.map(x=>h(HT(r,new F(x,.5,o),i,s).x)),u=0,f=0;for(let x=0;x<20;x++)for(let m=0;m<6;m++)u+=c(((s-1-m*Math.floor(s*.004))*i+x*Math.floor(i*.004))*4)+c(((s-1-m*Math.floor(s*.004))*i+(i-1-x*Math.floor(i*.004)))*4),f+=2;let g=0;for(let x=0;x<a.length;x+=16)g+=c(x);return{w:i,h:s,left:p[0].mean,centre:p[1].mean,right:p[2].mean,leftMax:p[0].max,centreMax:p[1].max,rightMax:p[2].max,background:u/f,frameMean:g/(a.length/16),anim:{...e.anim,rows:void 0},params:e.lastParams}}function NL(e=60){let t=js.current,n=t?.host.three;if(!t||!n)return null;let i=n.getContext(),s=new Uint8Array(4),a=[];for(let r=0;r<e+5;r++){let o=performance.now();t.host.render(t.scene.scene,t.scene.camera),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,s),r>=5&&a.push(performance.now()-o)}return{...D_(a),buffer:[i.drawingBufferWidth,i.drawingBufferHeight],pixelRatio:t.host.pixelRatioInUse}}function DL(){let e=js.current;if(!e)return null;let t=e.scene.camera;e.scene.update(e.anim,{azimuth:0,elevation:0}),t.updateMatrixWorld();let n=e.scene.rowZ(nn/2,e.anim.frac),i=e.scene.lobeCentresX().map(s=>HT(t,new F(s,.5,n),1,1));return{maxAbsX:Math.max(...i.map(s=>Math.abs(s.ndcX))),ndcX:i.map(s=>s.ndcX),distance:e.scene.distance,aspect:t.aspect,zFar:gp,spacing:mu}}function UL(){let e=js.current;if(!e)return null;let t=e.anim,n=fp(t,0),i=0,s=1,a=0;for(let r=0;r<Pe;r++)i=Math.max(i,t.rows[n+r]),s=Math.min(s,t.rows[n+r]);for(let r=0;r<t.rows.length;r++)a=Math.max(a,t.rows[r]);return{newest:i,newestMin:s,all:a,serial:t.serial}}window.__matrix={pipeline:ws,debug:()=>js.current,set:e=>N_?.(e),demo:async()=>(ws.setSource(_u(()=>performance.now())),await ws.play(),ws.getState().source?.kind),silence:()=>ws.setSource(null),script:async e=>(Object.assign(ji,e),ws.source!==FT&&ws.setSource(FT),await ws.play(),ws.getState().source?.kind),hit:(e=1)=>(ji.hitLevel=e,ji.hitAt=performance.now()/1e3,performance.now()),sample:RL,gpuTime:NL,fits:DL,heights:UL,mark:()=>(R_=js.current?.frames??0,R_),timing:()=>{let e=js.current;if(!e)return null;let t=e.intervals.length,n=Math.min(e.frames-R_,t),i=s=>{let a=[];for(let r=e.frames-n;r<e.frames;r++)a.push(s[r%t]);return a};return{frames:n,intervals:D_(i(e.intervals)),cpu:D_(i(e.cpu))}},memory:()=>{let e=js.current?.host.three;return e?{geometries:e.info.memory.geometries,textures:e.info.memory.textures,programs:e.info.programs?.length??null}:null},sceneStats:mp,hostStats:_p};(0,zT.createRoot)(document.getElementById("root")).render((0,Ip.jsx)(CL,{}));new URLSearchParams(location.search).get("source")==="demo"&&window.__matrix.demo();})();
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
