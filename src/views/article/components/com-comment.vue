<template>
  <div class="comment">
    <!-- ---------------------------------------------评论内容-------------------------------------------------------------------------->
    <!-- 瀑布流 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
        <!-- 作者头像 -->
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" />
        </div>
        <!-- 作者名称 -->
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <!-- 点赞 -->
        <div slot="default">
          <van-button
            size="mini"
            icon="like-o"
            :type="item.is_liking?'danger':'default'"
            plain
          >&nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论时间和内容 -->
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate|formatTime}}</span>
            .
            <!--给回复按钮声明单击事件，传递评论id-->
            <span @click="openReply(item.com_id.toString())">{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>

    <!-- ------------------------------------------------回复内容----------------------------------------------------------------------->

    <!-- 圆角弹窗 -->
    <van-popup v-model="showReply" round position="bottom" :style="{ height: '80%' }">
      <!-- 瀑布流 -->
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <van-cell v-for="item in replyList" :key="item.aut_id.toString()" >
          <!-- 作者头像 -->
          <div slot="icon">
            <img class="avatar" :src="item.aut_photo" alt />
          </div>
          <!-- 作者名称 -->
          <div slot="title">
            <span>{{item.aut_name}}</span>
          </div>
          <!-- 回复内容和时间 -->
          <div slot="label">
            <p>{{item.content}}</p>
            <p>
              <span>{{item.pubdate|formatTime}}</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
    <!-- ------------------------------------------------添加评论或回复----------------------------------------------------------------------->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="contentCor" placeholder="请写评论或回复...">
        <van-button slot="button" size="small" :loading="submitting" @click="add()">提交</van-button>
      </van-field>
    </div>
  </div>
</template>

<script>
// 获取评论
import { apiCommentList } from '@/api/comment.js'
// 获取回复           // 添加评论或评论回复
import { apiReplyList, apiAddCorR } from '@/api/reply.js'
export default {
  name: 'com-comment',
  data () {
    return {
      // 提交加载动画
      submitting: false,
      // 输入框评论内容
      contentCor: '',
      // 瀑布流
      list: [],
      loading: false,
      finished: false,
      // 评论列表
      commentList: [],
      // 评论分页
      offset: null,
      // 圆角弹窗
      showReply: false,
      // 获取回复
      reply: {
        // 瀑布流
        list: [],
        loading: false,
        finished: false
      },
      // 回复分页
      offsetreplay: null,
      // 被单击激活的评论
      commentID: '',
      // 回复列表
      replyList: []
    }
  },
  methods: {
    // 添加 （评论 或 回复）
    async add () {
    //   输入框评论内容为空停止 代码执行
      if (!this.contentCor) { return false }
      //   加载动画
      this.submitting = true
      // 暂停0.8秒
      await this.$sleep(800)
      if (this.showReply) {
        //  回复
        const result = await apiAddCorR({
          target: this.commentID,
          content: this.contentCor,
          artID: this.$route.params.aid
        })
        this.replyList.unshift(result.new_obj)
        const index = this.commentList.findIndex(item => {
          return item.com_id.toString() === this.commentID
        })
        this.commentList[index].reply_count++
      } else {
        // 添加 评论
        const result = await apiAddCorR({
          target: this.$route.params.aid,
          content: this.contentCor
        })
        this.commentList.unshift(result.new_obj)
      }
      this.contentCor = ''
      //   加载动画结束
      this.submitting = false
    },

    openReply (commentID) {
      this.showReply = true // 展开弹出层
      this.commentID = commentID // 参数commentID：被激活的评论id
      this.replyList = [] // 旧的回复数据清除
      this.reply.finished = false // 激活瀑布
      this.offsetreplay = null // 恢复分页偏移量
    },
    // 获取回复
    async onLoadReply () {
      await this.$sleep(800)
      // 获得回复列表数据(回复列表数据 与 评论列表数据 结构完全一致)
      const replys = await apiReplyList({
        articleID: this.commentID,
        lastID: this.offsetreplay
      })
      // 瀑布动画消失
      this.reply.loading = false
      // 判断是否有数据
      if (!replys.results.length) {
        // 没有：瀑布停止
        this.reply.finished = true
        return false
      }
      // 有：追加 + offset
      this.replyList.push(...replys.results)
      // 维护分页偏移量
      this.offsetreplay = replys.last_id
    },

    // 获取评论
    async onLoad () {
      await this.$sleep(800)
      // 根据文章id获得评论列表
      const resule = await apiCommentList({
        articleID: this.$route.params.aid,
        offset: this.offset
      })
      // 瀑布动画消失
      this.loading = false
      // 判断是否有获得到评论列表
      if (!resule.results.length) {
        this.finished = true
        return false
      }
      // 有数据,给追加到 commentList成员里边
      this.commentList.push(...resule.results)
      // 对分页标志offset进行赋值
      this.offset = resule.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
  // 添加评论或回复构件 样式
  .reply-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 88px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
  }
}
</style>
