import Vue from 'vue'
import app from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)
//导入顶部
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

import router from './router.js'

//导入格式化时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD hh:mm:ss"){
  return moment(dataStr).format(pattern)
})


// import {Header,Toast,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header);
// Vue.component(Toast.name,Toast);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//引入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//导入bar

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


var vm =new Vue({
  el: '#app',
  render: c => c(app),
  router
})