import Vue from 'vue'
import app from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)
//导入顶部
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import router from './router.js'

import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入bar

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


var vm =new Vue({
  el: '#app',
  render: c => c(app),
  router
})