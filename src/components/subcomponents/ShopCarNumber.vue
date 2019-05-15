<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initCount" readonly @change="countChanged" ref="numbox">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
	mounted(){
		//初始化数字选择框组件
    mui('.mui-numbox').numbox()
  },
  methods:{
    countChanged(){
      this.$store.commit('updateGoodsCount',{id:this.id,count:parseInt(this.$refs.numbox.value)})
    }
  },
  props:["initCount","id"]
};
</script>
<style lang="scss" scoped>
.mui-numbox {
  height:28px;
}
</style>
