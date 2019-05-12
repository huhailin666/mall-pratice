import Vue from 'vue'
import app from './App.vue'
//导入顶部
import {Header,TabContainer, TabContainerItem } from 'mint-ui'
Vue.component(Header.name,Header)
//导入bar


import './lib/mui/css/mui.min.css'

var vm =new Vue({
  el: '#app',
  render: c => c(app)
})