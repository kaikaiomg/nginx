import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Router from 'vue-router'
import VueRouter from 'vue-router'




// import routers from './router/index.js'
import App from './App.vue'
// import page1 from './components/page1.vue'
// import page2 from './components/page2.vue'
import http_servers from './views/http_servers.vue'
import http_upstream from './views/http_upstream.vue'
import loctions from './views/loctions.vue'
import xianliupeizhi from './views/xianliupeizhi'
import huiducelue from './views/huiducelue'
import http_quanju from './views/http_quanju.vue'
import menu from './views/menu.vue'


Vue.use(ElementUI)
Vue.use(VueRouter)


// import Api from './api/index.js';
// Vue.prototype.$api = Api;


import axios from 'axios';
Vue.prototype.$axios = axios;


Vue.prototype.winHeight =window.innerHeight;
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios,axios);













const routers = [
  {path: '/',component:menu},
  {path: '/app',component:App},
   {path: '/page0',component:menu},
  {path: '/page1',component:http_servers},
  {path: '/page2',component:http_upstream},
  {path: '/page3',component:loctions},
  {path: '/page4',component:xianliupeizhi},
  {path: '/page5',component:huiducelue},
  {path: '/page6',component:http_quanju}
]


const router = new VueRouter({
  mode: 'history',
  routes: routers
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

