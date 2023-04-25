(function(){"use strict";var e={320:function(e,t,n){var r=n(963),o=n(252);function i(e,t,n,r,i,a){const u=(0,o.up)("Header"),c=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(u),(0,o.Wm)(c)],64)}const a={class:"header text-center pt-4 mt-2"},u=["src"],c=(0,o._)("h2",{class:"fw-bold"},"FITNESS APP",-1);function s(e,t,n,i,s,l){const f=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",a,[(0,o.wy)((0,o.Wm)(f,{to:"/"},{default:(0,o.w5)((()=>[(0,o._)("img",{src:s.arrowImage,class:"arrow position-absolute mt-1 ms-5 start-0"},null,8,u)])),_:1},512),[[r.F8,e.$route.matched.some((({name:e})=>"PerformExercise"===e))]]),(0,o.Wm)(f,{to:"/"},{default:(0,o.w5)((()=>[c])),_:1})])}var l={name:"Header",data(){return{arrowImage:n(644)}}},f=n(744);const d=(0,f.Z)(l,[["render",s]]);var p=d,m={name:"App",components:{Header:p}};const v=(0,f.Z)(m,[["render",i]]);var g=v,b=n(201);function h(e,t,n,r,i,a){const u=(0,o.up)("Spacer"),c=(0,o.up)("Card");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(u),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.exercises,(e=>((0,o.wg)(),(0,o.j4)(c,{exercise:e},null,8,["exercise"])))),256))],64)}var w=n(577);const x={class:"exercise-card mt-4 position-relative start-50 translate-middle"},y=["src","alt"],O=(0,o._)("div",{class:"position-absolute w-100 h-100 top-0 start-0 card-gradient rounded"},null,-1),k={class:"position-absolute bottom-0 start-0 text-white ms-4 mb-2 pb-1 fs-4 fw-bold"};function j(e,t,n,r,i,a){const u=(0,o.up)("router-link");return(0,o.wg)(),(0,o.j4)(u,{to:"/exercise/"+n.exercise.name},{default:(0,o.w5)((()=>[(0,o._)("div",x,[(0,o._)("img",{src:n.exercise.image,class:"img-fluid rounded shadow",alt:n.exercise.name},null,8,y),O,(0,o._)("span",k,(0,w.zw)(n.exercise.name),1)])])),_:1},8,["to"])}var P={name:"Card",props:{exercise:{type:Object,required:!0}}};const E=(0,f.Z)(P,[["render",j]]);var S=E;const _={class:"spacer"};function C(e,t,n,r,i,a){return(0,o.wg)(),(0,o.iD)("div",_)}var T={name:"Spacer"};const A=(0,f.Z)(T,[["render",C]]);var D=A,H={name:"ListOfExercises",components:{Card:S,Spacer:D},data(){return{exercises:[{name:"Push up",image:n(404)},{name:"Deadlift",image:n(496)},{name:"Squat",image:n(285)}]}}};const N=(0,f.Z)(H,[["render",h]]);var W=N;const Z=[{path:"/",name:"ListOfExercises",component:W},{path:"/exercise/:exerciseName",name:"PerformExercise",component:function(){return n.e(39).then(n.bind(n,39))}}],q=(0,b.p7)({history:(0,b.PO)("/"),routes:Z});var F=q;(0,r.ri)(g).use(F).mount("#app")},644:function(e,t,n){e.exports=n.p+"img/arrow-left-solid.1ca2c7a0.svg"},496:function(e,t,n){e.exports=n.p+"img/deadlift.61217857.webp"},404:function(e,t,n){e.exports=n.p+"img/pushup.57625cb5.webp"},285:function(e,t,n){e.exports=n.p+"img/squat.98c6e595.webp"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],i=e[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(l--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,o,i]}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+".a08aaec3.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="diplomska:";n.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var u,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var f=s[l];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==t+i){u=f;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+i),u.src=r),e[r]=[o];var d=function(t,n){u.onerror=u.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var a=n.p+n.u(t),u=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};n.l(a,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],u=r[1],c=r[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(c)var l=c(n)}for(t&&t(r);s<a.length;s++)i=a[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},r=self["webpackChunkdiplomska"]=self["webpackChunkdiplomska"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(320)}));r=n.O(r)})();
//# sourceMappingURL=app.f83dcf02.js.map