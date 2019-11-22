
// import Vue from 'vue'
import Router from 'vue-router'
import page1 from '../components/page1.vue'
import page2 from '../components/page2.vue'
import app from '../App.vue'

 // Vue.use(Router)
  

const routers = [
  {path: '/',name:'app',component:page1},
  {path: '/page1',name:'page1',component:page1},
  {path: '/page2',name:'page2',component:page2},
  {path: '/page3',name:'page2',component:page2},
  {path: '/page4',name:'page2',component:page2},
  {path: '/page5',name:'page2',component:page2},
  {path: '/page6',name:'page2',component:page2}
]


export default routers


