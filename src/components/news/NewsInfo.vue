<template>
    <div class="container">
        <h4>{{newsInfo.title}}</h4>
        <p >
            <span>发表时间:{{newsInfo.add_time|dateFormat}}</span> <span>点击:{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div v-html="newsInfo.content"></div>
    <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'

export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.gitNewsInfo()
    },
    methods: {
        gitNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsInfo=result.body.message[0]
                }else{
                    Toast('获取资讯失败')
                }
            })
        }
    },
    components: {
        'comment-box':comment
    }
}
</script>
<style lang="scss" scoped>
    .container {
        padding: 0px 5px;
        h4 {
            color: red;
        }
        p {
            img {
                width: 100%;
                height: 40px;
            }
        }

    }
</style>