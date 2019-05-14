<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item ,i) in comments" :key="i">
        <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}</div>
        <div class="cmt-body">{{item.content==='undefined'?'此用户很懒，嘛都没说':item.content}}</div>
      </div>
    </div>
    <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return {
            comments:[],
            pageIndex:1,
            msg:''
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
            .then(result=>{
                if(result.body.status===0){
                    //获取新数据时，不要把老数据覆盖，而是在老数据后面拼接新数据
                    this.comments=this.comments.concat(result.body.message)
                    console.log(this.comments)
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments()
        },
        postComment(){
            if(this.msg.trim().length===0){
               return Toast('评论内容不能为空！')
            }
            this.$http.post("api/postcomment/"+this.id,{
                content:this.msg.trim()
            }).then(result=>{
                if(result.body.status===0){
                    var cmt = {
                        user_name:"匿名用户",
                        add_name:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg=""
                }
            })
        }
    },
    props:["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 16px;
  }
  textarea {
    font-size: 16px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    .cmt-item {
      font-size: 15px;
    margin:5px;
      .cmt-title {
        line-height: 30px;
        background: #ccc;
        font-size: 12px;

      }
      .cmt-body {
        line-height: 35px;
        margin-left: 20px;
      }
    }
  }
}
</style>