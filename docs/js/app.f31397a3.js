(function(t){function e(e){for(var n,s,a=e[0],c=e[1],l=e[2],u=0,h=[];u<a.length;u++)s=a[u],o[s]&&h.push(o[s][0]),o[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);m&&m(e);while(h.length)h.shift()();return r.push.apply(r,l||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],n=!0,s=1;s<i.length;s++){var a=i[s];0!==o[a]&&(n=!1)}n&&(r.splice(e--,1),t=c(c.s=i[0]))}return t}var n={},s={app:0},o={app:0},r=[];function a(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-76d394df":"56fd73c6"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,c),i.l=!0,i.exports}c.e=function(t){var e=[],i={"chunk-76d394df":1};s[t]?e.push(s[t]):0!==s[t]&&i[t]&&e.push(s[t]=new Promise(function(e,i){for(var n="css/"+({}[t]||t)+"."+{"chunk-76d394df":"71800ee0"}[t]+".css",o=c.p+n,r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var l=r[a],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===o))return e()}var h=document.getElementsByTagName("style");for(a=0;a<h.length;a++){l=h[a],u=l.getAttribute("data-href");if(u===n||u===o)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var n=e&&e.target&&e.target.src||o,r=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");r.request=n,delete s[t],m.parentNode.removeChild(m),i(r)},m.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(m)}).then(function(){s[t]=0}));var n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,i){n=o[t]=[e,i]});e.push(n[2]=r);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=a(t),l=function(e){u.onerror=u.onload=null,clearTimeout(h);var i=o[t];if(0!==i){if(i){var n=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+n+": "+s+")");r.type=n,r.request=s,i[1](r)}o[t]=void 0}};var h=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,i){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(c.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(i,n,function(e){return t[e]}.bind(null,n));return i},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var h=0;h<l.length;h++)e(l[h]);var m=u;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("64a9"),s=i.n(n);s.a},"05ca":function(t,e,i){},"12c2":function(t,e,i){t.exports=i.p+"media/beep.d76c787c.mp3"},"279f":function(t,e,i){"use strict";var n=i("9e1f"),s=i.n(n);s.a},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("097d");var n,s,o=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"version-info"},[t._v("v"+t._s(t.version))]),i("git-corner",{attrs:{href:"https://github.com/snirp/pomoclock",size:"10vmin"}}),i("div",{staticClass:"face"},[i("circle-counter",{attrs:{"stroke-width":1.2,"active-width":1.2,"dash-spacing":0,"dash-count":t.totalSeconds,"active-count":t.elapsedSeconds,"active-stroke":t.timers[t.activeTimer].color}}),i("router-view")],1)],1)},a=[],c=i("cebc"),l=i("9224"),u=i("bd86"),h="work",m="shortBreak",d="longBreak",f=(n={},Object(u["a"])(n,h,{color:"#008000"}),Object(u["a"])(n,m,{color:"#ffa500"}),Object(u["a"])(n,d,{color:"#ff0000"}),n),p=(s={sessionCount:{title:"Total number of sessions",min:1,max:20,step:1},batchSize:{title:"Sessions between long breaks",min:2,max:10,step:1},volume:{title:"Volume of notification sound",min:0,max:10,step:1}},Object(u["a"])(s,h,{title:"Work session in minutes",min:1,max:60,step:1}),Object(u["a"])(s,m,{title:"Short break in minutes",min:1,max:15,step:1}),Object(u["a"])(s,d,{title:"Long break in minutes",min:1,max:45,step:1}),s),v=function(t,e){var i=e._c;return i("a",{staticClass:"github-corner",attrs:{href:e.props.href,"aria-label":"View source on GitHub"}},[i("svg",{attrs:{viewBox:"0 0 250 250","aria-hidden":"true",height:e.props.size,width:e.props.size}},[i("path",{attrs:{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}}),i("path",{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor"}}),i("path",{staticClass:"octo-body",attrs:{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"}})])])},g=[],b={props:["href","size"]},C=b,S=(i("dbb6"),i("2877")),z=Object(S["a"])(C,v,g,!0,null,null,null);z.options.__file="GitCorner.vue";var y=z.exports,w=i("676d"),T=i.n(w),L=i("2f62"),M=i("fd7d"),k=i.n(M),$={created:function(){this.timers=f,this.audio=new Audio(i("12c2")),this.$store.state.autoRun&&this.start()},data:function(){return{version:l["a"]}},computed:Object(c["a"])({playSound:{get:function(){return this.$store.state.playSound},set:function(t){this.$store.commit("updateValue",{name:"playSound",value:t})}},totalSeconds:function(){return 60*this[this.activeTimer]},elapsedSeconds:function(){return this.totalSeconds-this.secondsLeft}},Object(L["b"])(["secondsLeft","activeTimer","sessionsCompleted","volume","sessionCount","batchSize",m,d,h])),methods:{countDown:function(){this.secondsLeft%60==0&&this.favicon.badge(this.secondsLeft/60),this.$store.commit("decrement"),this.secondsLeft<=0&&(this.notify(this.activeTimer),this.switchTimer())},notify:function(t){var e;e=t==h?this.sessionsCompleted+1==this.sessionCount?"Well done! You finished your schedule.":(this.sessionsCompleted+1)%this.batchSize==0?"Time for a long break: ".concat(this[d]," minutes"):"Take a short break: ".concat(this[m]," minutes"):"Time for a ".concat(this[h]," minute work session!"),this.notifyBrowser(e),this.playSound&&(this.audio.volume=this.volume/10,this.audio.play())},notifyBrowser:function(t){var e=this;"granted"===Notification.permission?new Notification(t):"denied"!==Notification.permission&&(this.pauze(),Notification.requestPermission().then(function(i){e.start(),"granted"===i&&new Notification(t)}))},switchTimer:function(){if(this.activeTimer!==h)this.$store.commit("setActive",h);else{if(this.$store.commit("incrementSessions"),this.sessionsCompleted==this.sessionCount)return this.reset(),null;this.sessionsCompleted%this.batchSize==0?this.$store.commit("setActive",d):this.$store.commit("setActive",m)}this.$store.commit("resetSeconds"),this.favicon.reset(),this.favicon=new k.a({type:"rectangle",animation:"slide",bgColor:this.timers[this.activeTimer].color})},start:function(){this.$store.dispatch("intervalAsync",this.countDown),this.favicon=new k.a({type:"rectangle",animation:"slide",bgColor:this.timers[this.activeTimer].color})},pauze:function(){this.$store.commit("stopTimer")},reset:function(){this.$store.commit("stopTimer"),this.$store.commit("initiateTimer"),this.$store.commit("resetSeconds"),this.favicon.reset()},toggleSound:function(){this.playSound=!this.playSound}},components:{GitCorner:y,CircleCounter:T.a}},O=$,_=(i("034f"),Object(S["a"])(O,r,a,!1,null,null,null));_.options.__file="App.vue";var x=_.exports,j=i("8c4f"),H=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"center-row"},[t.interval?[i("div",{staticClass:"button-container"},[i("div",{staticClass:"behind-button"},[i("arc-counter",{attrs:{size:"100%",start:-225,end:45,dashCount:10,activeCount:t.volume,strokeWidth:12,activeWidth:12,dashSpacing:0,activeStroke:t.getActiveStroke()}})],1),i("button",{staticClass:"icon-link",on:{click:t.$parent.toggleSound}},[t.playSound?i("icon",{attrs:{paths:t.icons["volume"],title:"turn off",fill:"currentColor",size:"100%"}}):i("icon",{attrs:{paths:t.icons["mute"],title:"turn on",fill:"currentColor",size:"100%"}})],1)])]:t._e(),t.interval?i("h1",[t._v(t._s(t.formatMinutesAndSeconds(t.secondsLeft)))]):i("button",{directives:[{name:"else",rawName:"v-else"}],staticClass:"button-play",on:{click:t.$parent.start}},[i("icon",{attrs:{paths:t.icons["play"],title:"start timer",fill:"currentColor",size:"100%"}})],1),t.interval?i("div",{staticClass:"button-container"},[i("div",{staticClass:"behind-button"},[i("arc-counter",{attrs:{size:"100%",start:225,end:-45,dashCount:t.sessionCount,activeCount:t.sessionsCompleted+1,strokeWidth:12,activeWidth:12,activeStroke:"dodgerblue"}})],1),i("button",{on:{click:t.$parent.reset}},[i("icon",{attrs:{paths:t.icons["reset"],title:"reset timer",fill:"currentColor",size:"100%"}})],1)]):t._e()],2),t._l(t.dials,function(e){return i("router-link",{key:e.position,attrs:{to:{name:"settings",params:{name:e.name}}}},[i("polar",{attrs:{height:"12%",width:"24%",offset:"145%",setstraight:!1,angle:e.position/8*360}},[i("div",{staticClass:"dial",style:"background-color: "+e.color+";"},[i("div",{style:"transform: rotate("+-e.position/8*360+"deg); width: 6vmin;"},[i("icon",{attrs:{paths:t.icons[e.icon],title:e.name,fill:"white",size:"100%"}})],1),i("div",{style:"transform: rotate("+-e.position/8*360+"deg);"},[t._v(t._s(e.value))])])])],1)}),i("polar",{attrs:{height:"3%",width:"3%",offset:"630%",angle:t.getAngle(),customstyles:{backgroundColor:t.TIMERS[t.activeTimer].color,borderRadius:"50%",transition:"all 0.5s"}}})],2)},A=[],I=i("06f2"),R=i.n(I),V=i("aabd"),E=i.n(V),N={volume:'<g><path d="M22.5 112.41h90.468L224.438 0v359.28l-111.47-112.41H22.5z"/><path d="M269.933 250.032c-3.285 5.274-10.224 6.885-15.497 3.6-5.274-3.286-6.885-10.225-3.6-15.498 10.84-17.396 16.671-37.27 16.671-57.969 0-21.054-5.998-41.222-17.132-58.774-3.328-5.246-1.773-12.198 3.474-15.526 5.246-3.328 12.198-1.773 15.526 3.474 13.394 21.114 20.632 45.452 20.632 70.826 0 24.96-7.038 48.946-20.074 69.867zM293.07 79.823c-3.699-4.992-2.651-12.037 2.34-15.737 4.993-3.699 12.038-2.651 15.738 2.34 24.22 32.684 37.515 72.226 37.515 113.739 0 41.133-13.065 80.327-36.905 112.846-3.674 5.01-10.714 6.095-15.725 2.421-5.01-3.674-6.095-10.714-2.421-15.725 21.036-28.693 32.551-63.237 32.551-99.542 0-36.645-11.72-71.5-33.093-100.342z"/></g>',reset:'<path d="M180 90v90L90 90l90-90v67.5c80.772 0 146.25 65.478 146.25 146.25S260.772 360 180 360c-76.718 0-139.64-59.071-145.762-134.212-.323-3.97 2.065-12.038 10.762-12.038 8.697 0 11.442 8.006 11.818 11.932C62.82 288.43 115.68 337.5 180 337.5c68.345 0 123.75-55.405 123.75-123.75S248.345 90 180 90z"/>',pauze:'<g><rect x="27" width="106.875" height="360" rx="53.438"/><rect x="226.125" width="106.875" height="360" rx="53.438"/></g>',mute:'<g><path d="M120.611 104.702L224.437 0v208.528l132.218 132.217c4.393 4.393 4.393 11.516 0 15.91-4.394 4.393-11.517 4.393-15.91 0L3.455 19.365c-4.393-4.394-4.393-11.517 0-15.91 4.393-4.393 11.516-4.393 15.91 0L120.61 104.702z"/><path d="M119.32 134.91l-22.5-22.5h16.148L224.438 0v240.028l-22.5-22.5V54.644l-79.595 80.265h-3.024zm-31.82 0H45v89.46h77.343l79.594 80.266v-55.289l22.5 22.5v87.433L112.969 246.87H22.5V112.41H65l22.5 22.5z"/></g>',computer:'<g><path d="M47.944 215h264.112L360 329H0l47.944-114zm84.415 68L125 318h110l-7.359-35H132.36zM58 34h244c5.523 0 10 4.477 10 10v163H48V44c0-5.523 4.477-10 10-10zm13 21v132h218V55H71zM0 329h360c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10z"/></g>',"volume-low":'<g><path d="M22.5 112.41h90.468L224.438 0v359.28l-111.47-112.41H22.5z"/><path d="M269.933 250.032c-3.285 5.274-10.224 6.885-15.497 3.6-5.274-3.286-6.885-10.225-3.6-15.498 10.84-17.396 16.671-37.27 16.671-57.969 0-21.054-5.998-41.222-17.132-58.774-3.328-5.246-1.773-12.198 3.474-15.526 5.246-3.328 12.198-1.773 15.526 3.474 13.394 21.114 20.632 45.452 20.632 70.826 0 24.96-7.038 48.946-20.074 69.867z"/></g>',settings:'<path d="M241.875 181.688c0-33.15-27.037-60.188-60.188-60.188-33.15 0-60.187 27.037-60.187 60.188 0 33.15 27.037 60.187 60.188 60.187 33.15 0 60.187-27.037 60.187-60.188zM360 154.452v52.031c0 3.516-2.813 7.735-6.563 8.438l-43.359 6.562c-2.578 7.5-5.39 14.532-9.14 21.328 7.968 11.485 16.406 21.797 25.078 32.344 1.406 1.64 2.343 3.75 2.343 5.86 0 2.109-.703 3.75-2.109 5.39-5.625 7.5-37.266 41.953-45.234 41.953-2.11 0-4.22-.937-6.094-2.109l-32.344-25.313c-6.797 3.516-14.062 6.563-21.328 8.907-1.64 14.297-3.047 29.531-6.797 43.594-.937 3.75-4.219 6.562-8.437 6.562h-52.032c-4.218 0-7.968-3.047-8.437-7.031l-6.563-43.125c-7.265-2.344-14.297-5.156-21.093-8.672L84.844 326.25c-1.64 1.406-3.75 2.11-5.86 2.11-2.109 0-4.218-.938-5.859-2.579-12.422-11.25-28.828-25.781-38.672-39.375-1.172-1.64-1.64-3.515-1.64-5.39 0-2.11.703-3.75 1.874-5.391 7.97-10.781 16.641-21.094 24.61-32.11-3.984-7.5-7.266-15.234-9.61-23.202l-42.89-6.329C2.813 213.281 0 209.531 0 205.547v-52.031c0-3.516 2.813-7.735 6.328-8.438l43.594-6.562c2.344-7.5 5.39-14.532 9.14-21.563-7.968-11.25-16.406-21.797-25.078-32.344-1.406-1.64-2.343-3.515-2.343-5.625 0-2.109.937-3.75 2.109-5.39 5.625-7.735 37.266-41.953 45.234-41.953 2.11 0 4.22.937 6.094 2.343l32.344 25.078c6.797-3.515 14.062-6.562 21.328-8.906 1.64-14.297 3.047-29.531 6.797-43.593.937-3.75 4.219-6.563 8.437-6.563h52.032c4.218 0 7.968 3.047 8.437 7.031l6.563 43.125c7.265 2.344 14.297 5.157 21.093 8.672l33.282-25.078c1.406-1.406 3.515-2.11 5.625-2.11 2.109 0 4.218.938 5.859 2.344C299.297 45.47 315.703 60 325.547 73.828c1.172 1.406 1.64 3.281 1.64 5.156 0 2.11-.703 3.75-1.875 5.391-7.968 10.781-16.64 21.094-24.609 32.11 3.985 7.5 7.266 15.234 9.61 22.968l42.89 6.563c3.985.703 6.797 4.453 6.797 8.437z"/>',"coffee-small":'<g><path d="M317 136.192c2.131-.031 4.324-.046 6.584-.046 17.978 0 30.093 14.057 34.27 34.298 3.61 17.5.888 37.806-7.51 52.352-14.906 25.818-44.96 37.393-71.813 29.392-15.345 19.383-34.493 34.25-55.977 42.812h-85.108C82.616 273.15 43 210.222 43 136h274v.192zm-.991 20.03c-2.863 28.985-11.8 55.688-25.213 78.156 16.283 1.997 33.217-5.976 42.228-21.582 5.845-10.125 7.898-25.439 5.242-38.31-2.472-11.98-7.953-18.34-14.682-18.34-2.601 0-5.127.025-7.575.075zM0 305h360c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20z"/></g>',pomodoro:'<path d="M99.768 38.567l52.746 15.29-35.102 39.514 63.15-29.164 63.15 29.164-35.1-39.514 52.069-15.094C319.58 64.648 360 117.991 360 179.594c0 86.985-80.589 157.5-180 157.5S0 266.58 0 179.594c0-61.76 40.625-115.216 99.768-141.027zm10.969-4.39c18.185-6.64 37.88-10.743 58.51-11.806l-6.02 14.74-52.49-2.934zm81.166-11.744c20.268 1.158 39.621 5.251 57.51 11.798l-51.515 2.88-5.995-14.678z"/>',pomany:'<g><path d="M58.147 182.494l31.036 9.07-20.42 23.175 36.737-17.105 36.737 17.105-20.42-23.174 30.435-8.895C186.508 197.821 210 228.932 210 264.85c0 50.81-47.01 92-105 92s-105-41.19-105-92c0-36.057 23.675-67.27 58.147-82.356zm6.217-2.5c10.74-3.954 22.388-6.387 34.594-6.994l-3.542 8.744-31.052-1.75zm47.7-6.939c11.885.692 23.228 3.116 33.705 6.987l-30.185 1.702-3.52-8.689z"/><path d="M208.147 182.494l31.036 9.07-20.42 23.175 36.737-17.105 36.737 17.105-20.42-23.174 30.435-8.895C336.508 197.821 360 228.932 360 264.85c0 50.81-47.01 92-105 92s-105-41.19-105-92c0-36.057 23.675-67.27 58.147-82.356zm6.217-2.5c10.74-3.954 22.388-6.387 34.594-6.994l-3.542 8.744-31.052-1.75zm47.7-6.939c11.885.692 23.228 3.116 33.705 6.987l-30.185 1.702-3.52-8.689z"/><path d="M208.147 13.494l31.036 9.07-20.42 23.175L255.5 28.634l36.737 17.105-20.42-23.174 30.435-8.895C336.508 28.821 360 59.932 360 95.85c0 50.81-47.01 92-105 92s-105-41.19-105-92c0-36.057 23.675-67.27 58.147-82.356zm6.217-2.5C225.104 7.04 236.752 4.606 248.958 4l-3.542 8.744-31.052-1.75zm47.7-6.939c11.885.692 23.228 3.116 33.705 6.987l-30.185 1.702-3.52-8.689z"/><path d="M58.147 13.494l31.036 9.07-20.42 23.175L105.5 28.634l36.737 17.105-20.42-23.174 30.435-8.895C186.508 28.821 210 59.932 210 95.85c0 50.81-47.01 92-105 92S0 146.66 0 95.85c0-36.057 23.675-67.27 58.147-82.356zm6.217-2.5C75.104 7.04 86.752 4.606 98.958 4l-3.542 8.744-31.052-1.75zm47.7-6.939c11.885.692 23.228 3.116 33.705 6.987l-30.185 1.702-3.52-8.689z"/></g>',play:'<path d="M336.403 189.601L74.488 349.55c-5.302 3.238-12.226 1.565-15.464-3.738a11.25 11.25 0 0 1-1.649-5.863V20.052c0-6.213 5.037-11.25 11.25-11.25 2.069 0 4.098.57 5.863 1.649l261.915 159.948c5.303 3.238 6.976 10.162 3.738 15.464a11.25 11.25 0 0 1-3.738 3.738z"/>',close:'<g><rect transform="rotate(45 179.908 179.908)" x="-69.592" y="167.908" width="499" height="24" rx="12"/><rect transform="rotate(-45 179.908 179.908)" x="-69.592" y="167.908" width="499" height="24" rx="12"/></g>',"coffee-large":'<g><path d="M59 64h241l-41.41 296H100.41L59 64zm62.5 154c20.158 0 36.5-20.147 36.5-45s-16.342-45-36.5-45S85 148.147 85 173s16.342 45 36.5 45z"/><path d="M288.779 238H72.22L54 108h253l-18.221 130zM121.5 218c20.158 0 36.5-20.147 36.5-45s-16.342-45-36.5-45S85 148.147 85 173s16.342 45 36.5 45z"/><path d="M283.52 232.781l16.737-119.562H59.743L76.48 232.781h207.04zM67.598 243L48 103h264l-19.598 140H67.598z"/><path d="M49.76 26h260.48L312 54H48z"/><path d="M94.599 0h169.802c8.536 0 15.57 6.701 15.981 15.227L281 28H78l.618-12.773C79.03 6.701 86.063 0 94.599 0z"/></g>'},P=function(t,e){var i=e._c;return i("svg",{attrs:{fill:e.props.fill,viewBox:"0 0 360 360",height:e.props.size,width:e.props.size},domProps:{innerHTML:e._s(e.props.paths+"<title>"+e.props.title+"</title>")}})},B=[],W={created:function(){this.icons=icons},title:{title:{type:String,default:"icon"},fill:{type:String,default:"black"},paths:{type:String},size:{type:String,default:"2rem"}}},G=W,q=Object(S["a"])(G,P,B,!0,null,null,null);q.options.__file="Icon.vue";var J=q.exports,D={created:function(){this.TIMERS=f,this.WORK=h,this.SHORT=m,this.LONG=d,this.icons=N,this.dials=[{position:-1,name:m,value:this.getShort(),color:this.TIMERS[m].color,icon:"coffee-small"},{position:-2,name:h,value:this.getWork(),color:this.TIMERS[h].color,icon:"computer"},{position:-3,name:d,value:this.getLong(),color:this.TIMERS[d].color,icon:"coffee-large"},{position:1,name:"sessionCount",value:this.sessionCount,color:"#666",icon:"pomodoro"},{position:2,name:"batchSize",value:this.batchSize,color:"#666",icon:"pomany"},{position:3,name:"volume",value:this.volume,color:"#666",icon:"volume"}]},computed:Object(c["a"])({},Object(L["b"])(["secondsLeft","activeTimer","sessionsCompleted","volume","interval","sessionCount","batchSize","interval","playSound",m,d,h])),methods:{formatMinutesAndSeconds:function(t){return Math.floor(t/60)+":"+("0"+t%60).slice(-2)},getWork:function(){return this[h]},getLong:function(){return this[d]},getShort:function(){return this[m]},getActiveStroke:function(){return this.playSound?"dodgerblue":"grey"},getAngle:function(){switch(this.activeTimer){case this.WORK:return-90;case this.SHORT:return-45;default:return-135}}},components:{Polar:R.a,Icon:J,ArcCounter:E.a}},K=D,Z=(i("279f"),Object(S["a"])(K,H,A,!1,null,null,null));Z.options.__file="Face.vue";var F=Z.exports,U=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"center-column"},[i("div",{staticClass:"value"},[t._v(t._s(t.model))]),i("div",[t._v(t._s(t.setting.title))]),i("div",{staticClass:"slider"},[i("vue-slider",{attrs:{min:t.setting.min,max:t.setting.max,interval:t.setting.step,tooltip:!1},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1),i("div",{staticClass:"icon"},[i("router-link",{attrs:{to:{name:"face"}}},[i("icon",{attrs:{paths:t.icons["close"],title:"close",fill:"currentColor",size:"100%"}})],1)],1)])},Y=[],Q=(i("7f7f"),i("6f79")),X=i.n(Q),tt={created:function(){this.name=this.$route.params.name,this.setting=p[this.name],this.icons=N},computed:{model:{get:function(){return this.$store.state[this.name]},set:function(t){switch(this.name){case"volume":this.$store.commit("updateValue",{name:this.name,value:t}),this.$parent.audio.volume=t/10,this.$parent.audio.play();case"sessionCount":t<=this.$store.state.sessionsCompleted&&this.$parent.reset(),this.$store.commit("updateValue",{name:this.name,value:t});case"batchSize":this.setBatchSize(t);default:this.setMinute(t)}}}},methods:{setMinute:function(t){if(this.name==this.$store.state.activeTimer){var e=this.$store.state.secondsLeft,i=60*this.$store.state[this.name];60*t<=i-e?this.$parent.switchTimer():this.$store.commit("updateValue",{name:"secondsLeft",value:e+60*t-i})}this.$store.commit("updateValue",{name:this.name,value:t})},setBatchSize:function(t){this.$store.state.activeTimer==d&&this.$store.state.sessionsCompleted%t!=0?this.$store.commit("updateValue",{name:"activeTimer",value:m}):this.$store.state.activeTimer==m&&this.$store.state.sessionsCompleted%t==0&&this.$store.commit("updateValue",{name:"activeTimer",value:d}),this.$store.commit("updateValue",{name:this.name,value:t})}},components:{vueSlider:X.a,Icon:J}},et=tt,it=(i("f638"),Object(S["a"])(et,U,Y,!1,null,"3e32db95",null));it.options.__file="Settings.vue";var nt=it.exports;o["a"].use(j["a"]);var st,ot=new j["a"]({routes:[{path:"/",name:"face",component:F},{path:"/settings/:name",name:"settings",component:nt}]}),rt=i("f499"),at=i.n(rt),ct=i("5176"),lt=i.n(ct);i("28a5");o["a"].use(L["a"]);var ut=new L["a"].Store({state:(st={version:l["a"],sessionCount:8,batchSize:4,activeTimer:h},Object(u["a"])(st,h,25),Object(u["a"])(st,m,5),Object(u["a"])(st,d,15),Object(u["a"])(st,"secondsLeft",void 0),Object(u["a"])(st,"sessionsCompleted",0),Object(u["a"])(st,"interval",null),Object(u["a"])(st,"playSound",!0),Object(u["a"])(st,"volume",8),Object(u["a"])(st,"autoRun",!1),st),actions:{intervalAsync:function(t,e){var i=t.commit;i("autoRun"),i("initInterval",setInterval(function(){e()},1e3))}},mutations:{initializeStore:function(t){if(t.secondsLeft=60*t.work,localStorage.getItem("store")){var e=JSON.parse(localStorage.getItem("store"));e.version.split(".")[0]==t.version.split(".")[0]&&this.replaceState(lt()(t,e))}},updateValue:function(t,e){t[e.name]=e.value},initInterval:function(t,e){t.interval=e},decrement:function(t){--t.secondsLeft},setActive:function(t,e){t.activeTimer=e},incrementSessions:function(t){++t.sessionsCompleted},pauzeTimer:function(t){clearInterval(t.interval),t.interval=null},stopTimer:function(t){clearInterval(t.interval),t.interval=null,t.autoRun=!1},autoRun:function(t){t.autoRun=!0},initiateTimer:function(t){t.activeTimer=h,t.sessionsCompleted=0},resetSeconds:function(t){t.secondsLeft=60*t[t.activeTimer]}}});ut.subscribe(function(t,e){localStorage.setItem("store",at()(e))});var ht=ut,mt=i("0284"),dt=i.n(mt);i.e("chunk-76d394df").then(i.t.bind(null,"4060",7)),o["a"].use(dt.a,{id:"UA-132656471-1",router:ot}),o["a"].config.productionTip=!1,new o["a"]({router:ot,store:ht,beforeCreate:function(){this.$store.commit("initializeStore")},render:function(t){return t(x)}}).$mount("#app")},"64a9":function(t,e,i){},9224:function(t){t.exports={a:"3.1.0"}},"9e1f":function(t,e,i){},b5c7:function(t,e,i){},dbb6:function(t,e,i){"use strict";var n=i("05ca"),s=i.n(n);s.a},f638:function(t,e,i){"use strict";var n=i("b5c7"),s=i.n(n);s.a}});
//# sourceMappingURL=app.f31397a3.js.map