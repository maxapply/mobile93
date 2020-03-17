<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="article.aut_photo"
        />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|formatTime}}</p>
        </div>
        <van-button round size="small" :type="article.is_followed?'default':'info'" :loading="followLoadding" @click="followMe()">{{article.is_followed?'取消关注':'+关注'}}</van-button>
      </div>
      <!-- <button @click="$store.commit('clearToken')">模拟token失效</button> -->
      <div class="content">
        <p v-html="article.content"></p>
      </div>
      <div class="zan">
        <van-button
          round
          size="small"
          :class="{active:article.attitude===1}"
          plain
          icon="like-o"
          style="margin-right:8px"
        >点赞</van-button>
        <van-button round size="small" :class="{active:article.attitude===0}" plain icon="delete">不喜欢</van-button>
      </div>
      <!-- 评论列表 -->
      <com-comment></com-comment>
    </div>
  </div>
</template>

<script>
// 评论列表
import ComComment from './components/com-comment'
// 获取新闻文章详情
import { apiArticleDetail } from '@/api/article.js'
// 关注用户   // 取消关注用户
import { apiUserFollow, apiUserUnfollow } from '@/api/user.js'
export default {
  name: 'article-index',
  components: { ComComment },
  data () {
    return {
      article: {},
      followLoadding: false // 关注加载
    }
  },
  created () {
    // vue初始化调用方法
    this.getArticleDetail()
  },
  methods: {
    // 获取文章详情
    async getArticleDetail () {
      // 调用api获取文章详情
      const result = await apiArticleDetail(this.$route.params.aid)
      this.article = result
    },
    // 关注用户   // 取消关注用户
    async followMe () {
      // 开启加载动画
      this.followLoadding = true
      // 延时器
      await this.$sleep(1000)
      // 取消关注
      if (this.article.is_followed) {
        await apiUserUnfollow(this.article.aut_id.toString())
        // 更新页面 按钮
        this.article.is_followed = false
        // 关闭加载动画
        this.followLoadding = false
      } else {
        try {
          // 关注
          await apiUserFollow(this.article.aut_id.toString())
          // 更新页面 按钮
          this.article.is_followed = true
        } catch (err) {
          // 判断错误请求 提示消息
          if (err.response.status === 400) {
            this.$toast.fail('自己不能关注自己！')
          } else {
            this.$toast.fail('关注失败 请联系管理员')
          }
        }
        // 关闭加载动画
        this.followLoadding = false
      }
    }
  }

}
</script>

<style lang='less'>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 0px 20px 88px;
  margin-top: 92px;
  .title {
    font-size: 36px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 20px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 20px 0;
    display: flex;
    position: static;
    background-color: #fff;
    top: 92px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 20px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 40px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    p {
      font-size: 28px;
    }
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
