<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>{{item.add_time|dateFormat}}</span>
              <span>点击{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
   
<script>
export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(data => {
        if (data.body.status === 0) {
          this.newsList = data.body.message;
        } else {
          Toast("加载新闻列表失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-ellipsis {
  display: flex;
  justify-content: space-between;
}
</style>