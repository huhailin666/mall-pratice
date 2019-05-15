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

import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
  state:{ //this.$store.state.***
    car:car//将购物车商品数据，用数组存储起来，在car数组中。可以这样设计商品对象
    //{id:商品的id，count:要购买的数量，price:商品单价，selected:false}
  },
  mutations:{ //this.$store.commit.('方法名称','按需传入唯一参数')
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品保存到store的car上
      var flag = false
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count +=parseInt(goodsinfo.count)
          flag=true
          return true
        }
      })
      if(!flag){
        state.car.unshift(goodsinfo)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsCount(state,goodsInfo){
      //修改购物车商品数量值
      state.car.some(item=>{
        if(item.id==goodsInfo.id){
          item.count=goodsInfo.count;
          return true;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeCar(state,id){
      state.car.some((item,i)=>{
        if(item.id == id){
          state.car.splice(i,1);
          return true;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
          return true;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{ //this.$store.getters.
      //相当于计算属性
      getAllCount(state){
        var c= 0;
        state.car.forEach(item=>{
          c+=item.count
        })
        return c
      },
      getGoodsCount(state){
        var o = {};
        state.car.forEach(item=>{
          o[item.id]=item.count;
        })
        return o;
      },
      getGoodsSelected(state){
        var o={}
        state.car.forEach(item=>{
          o[item.id] = item.selected;
        })
        return o
      },
      getSelectedCount(state){
        var o={count:0,total:0};
        state.car.forEach(xxx=>{
          console.log(xxx.selected,xxx.count,xxx.price)
          if(xxx.selected){
            o.count+=parseInt(xxx.count)
            o.total+=xxx.count*xxx.price
          }
        })
        console.log(o)
        return o
      },
  }
})
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
  router,store
})