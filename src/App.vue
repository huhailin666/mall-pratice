<template>
  <div id="container">
    <mt-header fixed title="黑马程序员Vue项目">
      <span @click="goBack" slot="left" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-change" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-change" to="/member">
        <span class="mui-icon mui-icon-contact"></span>

        <span class="mui-tab-label">消息</span>
      </router-link>
      <router-link class="mui-tab-item-change" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span id="badge" class="mui-badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-change" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">设置</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
			active: 1,
			flag:false
    };
	},
	created(){
		this.flag=this.$route.path==="/home"?false:true
	},
	methods:{
		goBack(){//点击后退
			this.$router.go()
		}
	},
	watch:{
		'$route.path':function(newVal){
			if(newVal==="/home"){
				this.flag=false
			}else{
								this.flag=true

			}
		}
	}
};
</script>
<style lang="scss" scoped>
.mint-header {
  z-index: 30;
}
#container {
  padding-top: 40px;
  padding-bottom: 60px;

  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-change {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-change .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-change .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>