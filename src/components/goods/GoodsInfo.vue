<template>
  <div class="goodsinfo-container">
    <transition 
    @before-enter="beforeEnter" 
    @enter="enter" 
    @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button @click="addToShopCar" type="primary" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况:{{goodsInfo.stock_quantity}}</p>
          <p>上架时间:{{goodsInfo.add_time|dateFormat}}</p>
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/GoodsInfoNumber.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsInfo: {},
      ballFlag:false,//控制小球隐藏和显示的
      selectedCount:1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getSelectedCount(count){
      this.selectedCount=count;
    },
    beforeEnter(el){
      el.style.transform="translate(0,0)"
    },
    enter(el,done){
      const ballPosition = this.$refs.ball.getBoundingClientRect()

      const badgePosition =document.getElementById('badge').getBoundingClientRect();
      const xDist = badgePosition.left -ballPosition.left;
      const yDist = badgePosition.top -ballPosition.top;
      el.offsetWidth;
      el.style.transform=`translate(${xDist}px,${yDist}px)`
      el.style.transition="all .5s cubic-bezier(.67,-0.43,.77,.68)";
      done()
    },
    afterEnter(el){
      this.ballFlag=!this.ballFlag
    },
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(xxx => {
            xxx.img = xxx.src;
          });
          this.lunbotuList = result.body.message;
        } else {
          Toast("轮播图加载失败");
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        } else {
          Toast("轮播图加载失败");
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar(){
      //添加到购物车
      this.ballFlag=!this.ballFlag
      var goodsinfo = {//拼接出一个商品对象
        id:this.id,count:this.selectedCount,price:this.goodsInfo.sell_price,selected:true
      };
      //调用store中的mutation来将商品加入购物车
      this.$store.commit('addToCar',goodsinfo)
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="scss">
.goodsinfo-container {
  background: #ccc;
  .now_price {
    color: red;
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    z-index: 33;
    position: absolute;
    top: 407px;
    left: 143px;
  }
}
</style>