webpackJsonp([2,0],[function(e,t,s){e.exports=s(4)},,,,function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.bus=void 0;var r=s(95),a=n(r),o=s(28),i=n(o),u=s(76),c=n(u),d=s(94),l=n(d),f=s(30),p=n(f),v=s(26),_=n(v);a.default.use(i.default,{locales:["fr","en"]}),a.default.use(l.default),a.default.use(_.default),a.default.use(p.default,{api:"http://bddi-chat2017.herokuapp.com"});t.bus=new a.default;new a.default({render:function(e){return e(c.default)}}).$mount("#app")},,,,,,,,,,,,,,,,,function(e,t,s){var n,r;s(64),n=s(37);var a=s(92);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,e.exports=n},,,,function(e,t,s){"use strict";var n=s(74);n.styles.pop(),n.styles.push("display:none");var r=new n;document.body?r.elem=r.render(document.body):document.addEventListener("DOMContentLoaded",function(){r.elem=r.render(document.body)},!1),e.exports=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={install:function(e,t){var s={wizz:{selector:"#wizz"},send:{selector:"#send"},receive:{selector:"#receive"},login:{selector:"#login"},error:{selector:"#error"}};e.mixin({methods:{soundPlay:function(e){var t=document.querySelector(s[e].selector);t&&t.play()}}})}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={nbAvatar:20,countAvatar:[],users:[],initCountAvatar:function(){for(var e=0;e<this.nbAvatar;e++)this.countAvatar[e]=0},getNextAvatar:function(){for(var e=0,t=0;t<this.countAvatar.length;t++)this.countAvatar[t]<this.countAvatar[e]&&(e=t);return this.countAvatar[e]++,e+1},generateUser:function(e,t){return e.avatar=this.getNextAvatar(),e.typing=!1,this.users.push(e),e}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(77),a=n(r),o=s(29),i=n(o);t.default={install:function(e,t){e.use(i.default),e.component("icon",a.default)}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(93),a=n(r),o=s(31),i=n(o);t.default={router:null,install:function(e){var t=new a.default({routes:i.default,mode:"history"});e.mixin({beforeCreate:function(){this.$root===this&&(this.$options.router=t)}}),e.use(a.default)}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(70),a=n(r),o=s(4);t.default={install:function(e,t){var s=(0,a.default)(t.api),n=new e({data:{user:{},messages:[],users:[]}});e.prototype.$store=n,s.on("connect",function(){console.log("connect")}),s.on("getUsers",function(e){o.bus.$emit("createUsers",e)}),s.on("user joined",function(e){e.new.id!==n.user.id&&(o.bus.$emit("createUser",e.new),n.messages.push({body:e.new.username+" vient de se connecter",isBot:!0,createdAt:(new Date).getTime(),author:e.new}))}),s.on("wizz",function(e){n.messages.push({body:e.id===n.user.id?"Vous avez envoyé un wizz":e.username+" vous a envoyé un wizz",createdAt:(new Date).getTime(),author:e,isBot:!0}),o.bus.$emit("receiveWizz",e)}),s.on("typing",function(e){for(var t=0;t<n.users.length;t++)n.users[t].id===e.id&&(n.users[t].typing=!0)}),s.on("stop typing",function(e){for(var t=0;t<n.users.length;t++)n.users[t].id===e.id&&(n.users[t].typing=!1)}),s.on("new message",function(e){n.messages.push(e)}),s.on("user connected",function(e){o.bus.$emit("userConnected",e)}),e.mixin({methods:{sendMessage:function(e){s.emit("new message",e)},sendWizz:function(){s.emit("wizz"),console.log("wizz send")},connect:function(e){s.emit("user connected",{username:e,avatarUrl:null})},disconnect:function(){s.emit("disconnect")},typing:function(e){e===!0?s.emit("typing",n.user):s.emit("stop typing",n.user)}}})}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(82),a=n(r),o=s(83),i=n(o);t.default=[{path:"/",component:a.default},{path:"/login",component:i.default}]},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(27),a=n(r),o=s(4);t.default={data:function(){return a.default.initCountAvatar(),{userManager:a.default}},methods:{simulateUser:function(){this.userManager.generateUser({username:"test"},{})}},computed:{users:{get:function(){return this.$store.users}}},created:function(e,t){var s=this;a.default.initCountAvatar();var n=a.default.users;this.$store.users=n,o.bus.$on("userConnected",function(e){s.$store.user=s.userManager.generateUser(e,{distant:!1}),s.$router.push({path:"/"})}),o.bus.$on("createUsers",function(e){for(var t=0;t<e.length;t++)s.userManager.generateUser(e[t])}),o.bus.$on("createUser",function(e){s.userManager.generateUser(e)}),o.bus.$on("startTyping",function(e){s.userManager.startTyping(e)}),o.bus.$on("stopTyping",function(e){s.userManager.stopTyping(e)}),this.$store.user||this.$router.push({path:"/login"})}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["name"],computed:{xlink:function(){return s(97)("./"+this.name+".svg")}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{input:"",lastType:(new Date).getTime(),isTyping:!1}},watch:{input:function(){var e=this;this.lastType=(new Date).getTime(),this.isTyping===!1&&this.typing(!0),this.isTyping=!0,setTimeout(function(){var t=(new Date).getTime();t-e.lastType>2e3&&(e.typing(!1),e.isTyping=!1)},2e3)}},methods:{onSubmit:function(e){""!==this.input&&(this.$emit("send-message",this.input),this.input="")}}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(21),a=n(r);t.default={props:["message"],components:{User:a.default},computed:{side:{get:function(){return this.message.author.id===this.$store.user.id?(this.message.isBot!==!0&&this.soundPlay("send"),"message--right"):(this.message.isBot!==!0&&this.soundPlay("receive"),"message--left")}}}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(79),a=n(r);t.default={computed:{messageCount:{get:function(){return this.$store.messages.length}}},components:{Message:a.default},watch:{messageCount:function(e,t){var s=this;this.$nextTick(function(){s.scrollToEnd()})}},methods:{scrollToEnd:function(){this.$el.scrollTop=this.$el.scrollHeight}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["user","date"],computed:{avatarFormat:{get:function(){if(this.user.avatar)return"/static/avatars/avatar"+this.user.avatar+".svg"}},dateFormat:{get:function(){var e=new Date(this.date);return e.getHours()+":"+e.getMinutes()}}},created:function(){for(var e=0;e<this.$store.users.length;e++)this.$store.users[e].id===this.user.id&&(this.user.avatar=this.$store.users[e].avatar)}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(21),a=n(r);t.default={props:["users"],components:{User:a.default}}},function(e,t,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=s(78),a=n(r),o=s(80),i=n(o),u=s(81),c=n(u),d=s(4);t.default={props:["store"],components:{FormChat:a.default,MessagesList:i.default,UsersList:c.default},created:function(){var e=this;this.$store.user.id||this.$router.push({path:"/login"}),d.bus.$on("receiveWizz",function(t){e.createWizz(t)})},methods:{formMessage:function(e){this.sendMessage(e)},disconnectClick:function(){this.$router.push({path:"/login"}),this.disconnect()},wizzClick:function(){this.createWizz(this.$store.user);var e={body:"Vous avez envoyé un wizz",createdAt:(new Date).getTime(),author:this.$store.user,isBot:!0};this.$store.messages.push(e),this.sendWizz()},createWizz:function(e){var t=this;this.$el.className.match("wizz")||(this.$el.className+=" wizz",setTimeout(function(){t.$el.className=t.$el.className.replace("wizz","")},600),this.soundPlay("wizz"))}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{username:"",error:!1}},methods:{onSubmit:function(e){this.username.match(/^\w{1,15}$/)?(this.soundPlay("login"),this.connect(this.username)):(this.soundPlay("error"),this.error=!0)}}}},,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,,,,,,,function(e,t,s){var n=s(25),r='<symbol viewBox="126 75 246 350" id="logo_683b63348aa49310c18b6121b5ce7351" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs/> <g id="logo_683b63348aa49310c18b6121b5ce7351_logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(126.000000, 75.000000)"> <g id="logo_683b63348aa49310c18b6121b5ce7351_Group"> <path d="M182.4,68.6 C168.8,75.3 150.6,87.9 134.1,111.3 C127.3,106.6 122.6,104.3 121.9,103.9 C119.3,102.6 116.3,102.5 113.6,103.6 C112.9,103.9 108.4,105.7 101.8,109.6 C88.7,87.8 75.3,74.4 59.9,62.9 C76.2,28.7 107.3,7.2 119.1,0 C132,7.6 168.1,31.4 182.4,68.6 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#359168"/> <path d="M229.1,158.1 C227.6,158.7 226.1,159.3 224.6,159.9 C212.1,165.2 197.1,173.6 182.6,187.2 C173.4,148.7 151.6,123.6 133.3,108.5 C152,78.2 174,67.5 182.9,64.3 C194,72.9 226.4,102.6 229.1,158.1 L229.1,158.1 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#3AA572"/> <path d="M61.1,55.7 C63.9,56.5 67.2,56.7 74.1,60.5 C81,64.3 100.6,82.7 112.8,102.8 C95.3,117.3 74.7,141.4 65.9,178.7 C51.5,166.1 36.9,158.2 24.7,153.3 C21.8,152.1 19,151.1 16.3,150.2 C18.1,94.3 50.4,64.2 61.1,55.7 L61.1,55.7 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#3AA572"/> <path d="M85.2,214.2 C78.1,201 70.4,190.1 62.2,180.9 C62.3,180.2 62.3,179.6 62.3,179 C68.2,121.4 106.8,94.5 119.7,87.1 C133.3,94.3 184.2,126.1 184.2,177.8 C184.3,181 184.3,183.3 184.3,183.3 C176.9,192.8 171.3,202.3 165.3,215.5 C160.1,226.7 156.3,238.2 153.7,249.7 C140.5,241.6 130.5,237.3 129.5,236.9 C126.8,235.7 123.6,235.8 121,237.2 C120,237.6 111.1,242 99.3,250.1 C96.4,237.8 92.2,227.3 85.2,214.2 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#33996C"/> <path d="M113.1,303.1 C117.6,300.4 122,297.6 126.3,294.7 C131.1,297.8 135.9,300.7 140.9,303.4 C138.7,303.5 136.6,303.7 134.4,303.8 C134.8,314.9 133.6,329 128.2,344.7 C127.1,347.8 124.3,349.7 121.2,349.7 C120.4,349.7 119.6,349.6 118.8,349.3 C114.9,348 112.9,343.8 114.2,339.9 C119,325.8 120,313.3 119.6,303.6 C117.4,303.5 115.3,303.3 113.1,303.1 L113.1,303.1 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#35495E"/> <path d="M236.9,227.4 C220.8,229.1 194.8,233.7 168.6,245.7 C161.5,235.7 152.5,227.3 143.9,220.7 C145.4,211.1 148.3,201.8 152.6,192.3 C163.7,168.1 180.5,151 202.4,141.6 C214,136.6 224.1,135.2 229.2,134.7 C236.3,144.5 257.4,179.5 236.9,227.4 L236.9,227.4 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#41B883"/> <path d="M3.1,161.3 C6.1,149 11.1,140.1 13.8,135.8 C18.9,135.9 29,136.8 40.9,141 C63.4,149.1 81.2,165.1 93.7,188.6 C100.3,200.9 102.5,208.8 104.1,218.3 C95.6,225.6 86.7,234.7 79.9,245.6 C54.4,235.8 29.4,232.6 13.2,231.7 L13.2,231.7 C0.8,208.2 -2.7,184.5 3.1,161.3 L3.1,161.3 Z" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#41B883"/> <path d="M119.3,319.6 C78.2,318.7 47.5,302.4 28.1,271 C17.8,254.3 13.4,237.3 11.7,228.1 C23.9,228.3 50.4,230.1 76.4,241.3 C79.5,242.6 83,241.4 84.6,238.4 C95,218.4 116.8,204.8 124.3,200.5 C132.1,204.3 154.6,216.5 166.2,235.9 C167.9,238.8 171.6,239.8 174.5,238.3 C199.7,225.7 226,222.2 238.3,221.2 C237.1,230.6 233.6,248.5 223.9,266.2 C205.8,299.1 172.5,317.8 129.9,320.2" id="logo_683b63348aa49310c18b6121b5ce7351_Shape" fill="#35495E"/> </g> </g> </symbol>';e.exports=n.add(r,"logo_683b63348aa49310c18b6121b5ce7351")},,,function(e,t,s){var n,r;s(58),n=s(32);var a=s(86);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,e.exports=n},function(e,t,s){var n,r;s(59),n=s(33);var a=s(87);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,e.exports=n},function(e,t,s){var n,r;s(63),n=s(34);var a=s(91);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,r._scopeId="data-v-b4ca8122",e.exports=n},function(e,t,s){var n,r;s(57),n=s(35);var a=s(85);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,r._scopeId="data-v-1439df24",e.exports=n},function(e,t,s){var n,r;s(56),n=s(36);var a=s(84);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,r._scopeId="data-v-06ca1e86",e.exports=n},function(e,t,s){var n,r;s(62),n=s(38);var a=s(90);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,r._scopeId="data-v-756de923",e.exports=n},function(e,t,s){var n,r;s(60),n=s(39);var a=s(88);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,e.exports=n},function(e,t,s){var n,r;s(61),n=s(40);var a=s(89);r=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(r=n=n.default),"function"==typeof r&&(r=r.options),r.render=a.render,r.staticRenderFns=a.staticRenderFns,r._scopeId="data-v-578458a5",e.exports=n},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"messages"},e._l(e.$store.messages,function(e){return s("message",{attrs:{message:e}})}))},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"message",class:e.side},[e.message.isBot?e._e():s("user",{attrs:{user:e.message.author,date:e.message.createdAt}}),e._v(" "),s("p",{staticClass:"message__content"},[e._v(e._s(e.message.body))])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"container"},[s("router-view")],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("svg",{staticClass:"icon",class:"icon-"+e.name},[s("use",{attrs:{"xlink:href":e.xlink}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("main",{staticClass:"chat center"},[s("div",[s("users-list",{attrs:{users:e.$store.users}}),e._v(" "),s("a",{staticClass:"action__disconnect",on:{click:function(t){t.preventDefault(),e.disconnectClick(t)}}},[e._v("Disconnect")])],1),e._v(" "),s("div",{staticClass:"chat__body"},[s("h2",{staticClass:"chat__title"},[e._v("Chat")]),e._v(" "),s("messages-list",{attrs:{messages:e.$store.messages}}),e._v(" "),s("form-chat",{on:{"send-message":e.formMessage}})],1),e._v(" "),s("div",{staticClass:"chat__actions"},[s("a",{staticClass:"chat__action chat__action-wizz",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.wizzClick(t)}}})]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2)])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("audio",{attrs:{src:"/static/wizz.wav",autostart:"0",preload:"auto",id:"wizz"}},[s("p",[e._v("Your browser does not support the "),s("code",[e._v("audio")]),e._v(" element.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("audio",{attrs:{src:"/static/send.wav",autostart:"0",preload:"auto",id:"send"}},[s("p",[e._v("Your browser does not support the "),s("code",[e._v("audio")]),e._v(" element.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("audio",{attrs:{src:"/static/receive.wav",autostart:"0",preload:"auto",id:"receive"}},[s("p",[e._v("Your browser does not support the "),s("code",[e._v("audio")]),e._v(" element.")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("main",{staticClass:"login center vertical-center"},[s("h2",{staticClass:"login__title"},[e._v("Connexion")]),e._v(" "),s("form",{staticClass:"login__form",on:{submit:function(t){t.preventDefault(),e.onSubmit(t)}}},[e.error?s("p",{staticClass:"error"},[e._v("Le username est invalide")]):e._e(),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"login__username",attrs:{id:"username",type:"text"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),s("input",{staticClass:"login__submit",attrs:{id:"submit",type:"submit",value:"connexion"}})]),e._v(" "),e._m(0),e._v(" "),e._m(1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("audio",{attrs:{src:"/static/login.aiff",autostart:"0",preload:"auto",id:"login"}},[s("p",[e._v("Your browser does not support the "),s("code",[e._v("audio")]),e._v(" element.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("audio",{attrs:{src:"/static/error.wav",autostart:"0",preload:"auto",id:"error"}},[s("p",[e._v("Your browser does not support the "),s("code",[e._v("audio")]),e._v(" element.")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"users-list"},[s("h2",{staticClass:"users-list__title"},[e._v("Utilisateurs")]),e._v(" "),s("div",{staticClass:"users-list__container"},e._l(e.users,function(e){return s("user",{attrs:{user:e}})}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"chat-form"},[s("form",{staticClass:"chat-form__form",on:{submit:function(t){t.preventDefault(),e.onSubmit(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],staticClass:"chat-form__input",attrs:{type:"text",placeholder:"Votre message..."},domProps:{value:e.input},on:{input:function(t){t.target.composing||(e.input=t.target.value)}}}),e._v(" "),s("input",{staticClass:"chat-form__submit",attrs:{type:"submit",value:"Ok !"}})])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user"},[s("img",{staticClass:"user__profil",attrs:{src:e.avatarFormat}}),e._v(" "),s("p",{staticClass:"user__name"},[e._v(e._s(e.user.username)),e.date?s("span",[e._v(" // "+e._s(e.dateFormat))]):e._e(),e.user.typing?s("span",{staticClass:"user__typing"}):e._e()])])},staticRenderFns:[]}},,,,,function(e,t,s){function n(e){return s(r(e))}function r(e){return a[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var a={"./logo.svg":73};n.keys=function(){return Object.keys(a)},n.resolve=r,e.exports=n,n.id=97},function(e,t){}]);
//# sourceMappingURL=app.9865f225fb5d08a74315.js.map