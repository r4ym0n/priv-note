(function(t){function e(e){for(var r,s,i=e[0],l=e[1],c=e[2],u=0,f=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&f.push(o[s][0]),o[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);p&&p(e);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},a=[];function s(t){return i.p+"js/"+({about:"about"}[t]||t)+"."+{about:"4d92cc92"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=r);var a,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(t);var c=new Error;a=function(e){l.onerror=l.onload=null,clearTimeout(u);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",c.name="ChunkLoadError",c.type=r,c.request=a,n[1](c)}o[t]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:l})}),12e4);l.onerror=l.onload=a,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var p=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},15:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},4805:function(t,e,n){"use strict";var r=n("8ce0"),o=n.n(r);o.a},5:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("5c96"),a=n.n(o),s=(n("0fae"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Pnote")],1)}),i=[],l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pnote",attrs:{center:!0}},[n("el-container",{staticClass:"pnote-container"},[n("el-header",{staticClass:"site-header"},[n("i",{staticClass:"el-icon-edit",staticStyle:{float:"left"}},[t._v("Write something secret")]),n("i",{staticClass:"el-icon-edit",staticStyle:{float:"right"}},[t._v("Write something secret")])]),n("el-main",{staticClass:"site-body"},[n("div",{staticClass:"site-content"},[t.sentStatus==t.Status.EDIT?n("div",[n("el-input",{attrs:{type:"textarea",autosize:{minRows:18,maxRows:18},placeholder:"write your Message HERE~",maxlength:"500","show-word-limit":"",resize:"none"},model:{value:t.textareaMsgFrom,callback:function(e){t.textareaMsgFrom=e},expression:"textareaMsgFrom"}})],1):t.sentStatus==t.Status.SENT?n("div",[n("p",[t._v("Get your secret message from URL above")]),n("p",[t._v("Copy it, remember it can be only Access ONCE!")]),n("el-card",{attrs:{shadow:"never"}},[n("p",{staticStyle:{"overflow-wrap":"break-word"}},[t._v(t._s(t.host))])])],1):t.sentStatus==t.Status.MSG?n("div",[n("el-input",{attrs:{type:"textarea",autosize:{minRows:18,maxRows:18},placeholder:"Message not found, maybe deleted?",maxlength:"500",readonly:!0,"show-word-limit":"",resize:"none"},model:{value:t.textareaMsgTo,callback:function(e){t.textareaMsgTo=e},expression:"textareaMsgTo"}})],1):t._e()]),n("el-row",[n("div",{staticStyle:{margin:"20px 0"}}),t.sentStatus==t.Status.EDIT?n("div",[n("el-button",{staticStyle:{width:"100%",height:"70px"},attrs:{type:"primary"},on:{click:t.postData}},[t._v("Submit it")])],1):t.sentStatus==t.Status.MSG?n("div",[n("el-button",{staticStyle:{width:"100%",height:"70px"},attrs:{type:"primary"},on:{click:t.goHome}},[t._v("Delete it")])],1):n("div",[n("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:success",value:t.copy2board,expression:"copy2board",arg:"success"},{name:"clipboard",rawName:"v-clipboard:copy",value:t.host,expression:"host",arg:"copy"}],staticStyle:{width:"100%",height:"70px"},attrs:{type:"primary"}},[t._v("Copy it")])],1)])],1),n("el-footer",{staticClass:"site-footer"},[n("el-row",[n("el-col",{attrs:{span:8}},[n("div",[n("h3",[t._v("安全")])])]),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"grid-content bg-purple-light"}),n("h3",[t._v("安全")]),n("p",[t._v("您的加密信息的秘钥并不会存储在数据库中，您拥有链接即可打开。")])]),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"grid-content bg-purple"}),n("h3",[t._v("开源")]),n("p",[t._v(" Vuash 是个开源项目，任何人都可以体验并改进这个项目。 "),n("br"),n("a",{attrs:{href:"https://gitlab.com/broworkers/vuash",target:"_blank"}},[t._v("查看代码 →")])])])],1)],1)],1)],1)},c=[],u=n("d536"),p=u["a"],f=(n("e69d"),n("2877")),v=Object(f["a"])(p,l,c,!1,null,"2400a388",null),h=v.exports,d={name:"app",components:{Pnote:h}},g=d,m=(n("034f"),Object(f["a"])(g,s,i,!1,null,null,null)),b=m.exports,y=(n("d3b7"),n("8c4f")),_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},w=[],S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._m(0),n("h3",[t._v("Installed CLI Plugins")]),t._m(1),n("h3",[t._v("Essential Links")]),t._m(2),n("h3",[t._v("Ecosystem")]),t._m(3)])},x=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v(" For a guide and recipes on how to configure / customize this project,"),n("br"),t._v(" check out the "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vue-cli documentation")]),t._v(". ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[t._v("babel")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[t._v("eslint")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[t._v("Twitter")])]),n("li",[n("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("News")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vue-router")])]),n("li",[n("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vuex")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[t._v("vue-devtools")])]),n("li",[n("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[t._v("awesome-vue")])])])}],k={name:"HelloWorld",props:{msg:String}},j=k,P=(n("4805"),Object(f["a"])(j,S,x,!1,null,"b9167eee",null)),M=P.exports,C={name:"Home",components:{HelloWorld:M}},E=C,T=Object(f["a"])(E,_,w,!1,null,null,null),O=T.exports;r["default"].use(y["a"]);var K=[{path:"/",name:"Home",component:O},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/pnote",name:"Pnote",component:h}],$=new y["a"]({routes:K}),G=$,B=n("4eb5"),F=n.n(B);r["default"].config.productionTip=!1,r["default"].use(F.a),r["default"].use(a.a),new r["default"]({router:G,render:function(t){return t(b)}}).$mount("#app")},6:function(t,e){},7:function(t,e){},"705f":function(t,e,n){},8:function(t,e){},"85ec":function(t,e,n){},"8ce0":function(t,e,n){},9:function(t,e){},cf05:function(t,e,n){t.exports=n.p+"img/logo.82b9c7a5.png"},d536:function(t,e,n){"use strict";(function(t){n("d3b7"),n("ac1f"),n("25f0"),n("5319");var r=n("bc3a"),o=n.n(r),a=n("5928"),s=n.n(a);e["a"]={name:"Pnote",components:{},data:function(){return{textareaMsgTo:"",textareaMsgFrom:"",sentStatus:0,privateKeyB64:"",Status:{EDIT:0,SENT:1,MSG:2},firstPlayFlag:!0,get origin(){return location.origin},get host(){return location.origin+"/#/"+this.privateKeyB64}}},mounted:function(){this.firstPlayFlag&&(this.showMsg(),this.firstPlayFlag=!1)},methods:{showMsg:function(){var t=this;if(!(location.hash.length<5)){this.sentStatus=this.Status.MSG;var e=this,n=location.hash.replace("#/",""),r=this.rsa();o.a.get(this.origin+"/msg/de/"+n).then((function(o){t.info=o;var a=o.data;if(""!==n){r.importPrivateKeyB64(n);var s=r.RSAdecrypt(a,"utf-8");e.textareaMsgTo=s}else e.textareaMsgTo="Message not found, maybe deleted?"})).catch((function(t){console.log(t)}))}},goHome:function(){window.location="/"},copy2board:function(){this.$notify.info({title:"info",message:"Copied"})},postData:function(){var t=this,e=this.rsa(),n=e.RSAencrypt(t.textareaMsgFrom),r=e.GetPrivateKeyB64();this.privateKeyB64=r,o.a.post(this.origin+"/msg/en/"+r,n).then((function(e){console.log(e),t.sentStatus=t.Status.SENT,t.$notify({type:"success",title:"success",message:"Submit Successfully"})})).catch((function(e){t.$notify.error({title:"error",message:"Submit failed"}),console.log(e.message)}))},rsa:function(){var e=new s.a({b:512}),n=e.exportKey("pkcs1-public-pem"),r=e.exportKey("pkcs1-private-pem");return{RSAencrypt:function(t){return console.log("encrypt user data"),console.log(this.GetPrivateKeyB64()),e.encrypt(t,"base64")},importPrivateKeyB64:function(n){var r=new t(n,"base64").toString("ascii");e.importKey(r,"pkcs1-private-pem")},RSAdecrypt:function(t){return e.decrypt(t,"utf-8")},GetPrivateKey:function(){return r},GetPubilcKey:function(){return r},GetPubilcKeyB64:function(){var e=new t(n).toString("base64");return e},GetPrivateKeyB64:function(){var e=new t(r).toString("base64");return e}}}}}}).call(this,n("b639").Buffer)},e69d:function(t,e,n){"use strict";var r=n("705f"),o=n.n(r);o.a}});
//# sourceMappingURL=app.731b672a.js.map