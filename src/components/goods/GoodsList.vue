<template>
  <div class="goods-container">
    <ul class="goods-list">
      <router-link :to="'/home/goodsinfo/'+item.id" class="goods-item" v-for="item in goodsList" :key="item.id">
        <img :src="item.img_url" alt>
        <div class="goods-title">{{item.title}}</div>
        <div class="goods-info">
          <p class="goods-price">
            <span class="now">{{item.sell_price}}</span>
            <span class="old">{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>{{item.stock_quantity}}</span>
          </p>
        </div>
      </router-link>
    </ul>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList:[],
      pageIndex:1
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result => {
        if(result.body.status===0){
         this.goodsList= this.goodsList.concat(result.body.message);
        }else{
          console.log('获取商品数据失败')
        }
      });
    },
    getMore(){
      this.pageIndex++;
          this.getGoodsList();

    }
  }
};
</script>
<style lang="scss">
.goods-container {
  padding: 5px;
  background: #fff;
  .goods-list {
    padding: 3px;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 250px;
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #bbb;
      margin: 5px 0;
      padding: 1px;
      img {
        width: 100%;
      }
      .goods-title {
        font-size: 14px;
        font-weight: blod;
      }
      .goods-info {
        background: #ddd;
        p {
          margin: 0;
        }
        .goods-price {
          .now {
            color: red;
            font-weight: blod;
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .sell {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>