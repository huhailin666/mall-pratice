<template>
  <div class="shopCarContainer">
    <div class="goods-list">
      <!-- 商品列表区 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="(item,i) in goodsList" :key="item.id">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                <span class="delete" @click="remove(item.id,i)">删除</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区  -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p class="total">总计（不含运费）</p>
              <p>
                已勾选商品
                <span>{{$store.getters.getSelectedCount.count}}</span>件，总价：￥
                <span>{{$store.getters.getSelectedCount.total}}</span>元
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/ShopCarNumber.vue";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  methods: {
    selectedChanged(id, val) {
      //点击开关，把状态同步到store中。
      this.$store.commit('updateGoodsSelected',{id:id,selected:val})
    },
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodsList = result.body.message;
          }
        });
    },
    remove(id, index) {
      //同时删除store中对应id的商品和goodsList中索引为index的商品
      this.goodsList.splice(index, 1);
      this.$store.commit("removeCar", id);
    }
  },
  created() {
    this.getGoodsList();
  },
  components: {
    numbox
  }
};
</script>
<style lang="scss" scoped>
.shopCarContainer {
  background: #ccc;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h1 {
        font-size: 13px;
      }
      .price {
        color: red;
        font-weight: blod;
      }
      .delete {
        font-size: 12px;
        color: blue;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: red;
      font-size: 16px;
      font-weight: blod;
    }
  }
}
</style>