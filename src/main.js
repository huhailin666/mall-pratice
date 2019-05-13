import Vue from 'vue'
import app from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)
//导入顶部
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.http.options.root = 'http://www.liulongbin.top:3005';

import router from './router.js'

//导入格式化时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD hh:mm:ss"){
  return moment(dataStr).format(pattern)
})


import {Header,Toast,Swipe, SwipeItem,Button} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Toast.name,Toast);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//导入bar

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


var vm =new Vue({
  el: '#app',
  render: c => c(app),
  router
})