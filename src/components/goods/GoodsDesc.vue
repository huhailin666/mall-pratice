<template>
  <div>
    <h4>{{info.title}}</h4>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info:{}
    };
  },
  created(){
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get("api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          if (result.body.status === 0) {
            this.info = result.body.message[0];
          } else {
            Toast("图文详情加载失败");
          }
        });
    }
  }
};
</script>
<style lang="scss">
h4 {
  font-size: 14px;
}
img {
  width: 100%;
}
</style>