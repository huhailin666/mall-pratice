<template>
  <div clas="photoinfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoInfo.add_time|dateFormat}}</span>
      <span>点击：{{photoInfo.click}}次</span>
    </p>
    <hr>
    <vue-preview :slides="slide1"></vue-preview>

    <div class="content" v-html="photoInfo.content"></div>
    <hr>
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      slide1: [] //缩略图数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoInfo = result.body.message[0];
        } else {
          Toast("图片详情获取失败");
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
            item.alt = "picture2";
            item.title = "Image Caption 2";
          });
          this.slide1 = result.body.message;
        } else {
          Toast("图片详情获取失败");
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>
<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: conter;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .my-gallery {
    figure {
      margin: 0 5px;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>