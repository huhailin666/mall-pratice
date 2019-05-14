<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            href="#item2mobile"
            data-wid="tab-top-subpage-2.html"
            v-for="item in cates"
            :key="item.id"
            @click="getListByCate(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getListByCate(0);
  },
  mounted() {
    // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: "0" });
          this.cates = result.body.message;
        }
      });
    },
    getListByCate(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }else{
          Toast("列表获取失败")
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: none;
}

.photo-list {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
    text-align: center;
    vertical-align: center;
    margin: 5px;
    background: #ccc;
    box-shadow: 0 0 6px #999;
    position: relative;
    img {
      width: 100%;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: 0 auto;
    }
    .info {
      color: #fff;
      text-align: left;
      position: absolute;
      bottom:0;
      background: rgba(0,0,0,0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 12px;
      }
    }
  }
}
</style>