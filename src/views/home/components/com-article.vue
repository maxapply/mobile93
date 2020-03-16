<template>
  <div class="scroll-wrapper" ref="myarticel" @scroll="remmber()">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="downSuccessText" success-duration="1500">
      <!--  上拉刷新 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title" @click="$router.push({name:'article',params:{aid:item.art_id.toString()}})">
          <template slot="label">
            <van-grid v-if="item.cover.type>0" :column-num="item.cover.type" :border="false" :gutter="10">
              <van-grid-item  v-for="item2 in item.cover.type" :key="item2">
                <van-image lazy-load width="85" height="85" :src="item.cover.images[item2-1]" />
              </van-grid-item>
            </van-grid>
            <p>
              <van-icon name="close" @click.stop="displayDialog(item.art_id.toString())" style="float:right" />
              <span>作者：{{item.aut_name}}</span>&nbsp;
              <span>评论：{{item.comm_count}}</span>&nbsp;
              <span>时间：{{item.pubdate|formatTime}}</span>
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <come-aaction v-model="showDialog" :articleId="nowArticleID" @dislikeSuccess="handleDislikeSuccess" ></come-aaction>
  </div>
</template>

<script>
// 不感兴趣组件
import ComeAaction from './com-moreaciton.vue'
// 导入 频道新闻推荐_V1.1
import { apiArticeList } from '@/api/article.js'
export default {
  name: 'com-article',
  components: {
    ComeAaction
  },
  props: {
    channelID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 记录滚动条位置
      nowTop: 0,
      // z下拉刷新提示
      downSuccessText: '',
      // 控制不感兴趣的显示与隐藏
      showDialog: false,
      // 时间戳
      ts: Date.now(),
      // 文章列表
      articleList: [],
      // 下拉状态
      isLoading: false,
      // 上拉状态
      list: [],
      loading: false,
      finished: false,
      // 不敢兴趣的文章id
      nowArticleID: ''
    }
  },
  created () {
    this.getarticleList()
  },
  // keep-alive 组件激活后就调用的方法
  activated () {
    this.$refs.myarticel.scrollTop = this.nowTop
  },
  methods: {
    remmber () {
      // 记录滚动条位置
      this.nowTop = this.$refs.myarticel.scrollTop
    },
    // 对不感兴趣的处理，清除
    handleDislikeSuccess () {
      const index = this.articleList.findIndex((item) => {
        return item.art_id.toString() === this.nowArticleID
      })
      this.articleList.splice(index, 1)
    },
    displayDialog (artid) {
      this.showDialog = true
      this.nowArticleID = artid
    },
    async getarticleList () {
      const result = await apiArticeList({
        channel_id: this.channelID,
        timestamp: this.ts
      })
      return result
    },
    // 下拉刷新
    async onRefresh () {
      await this.$sleep(800)
      const res = await this.getarticleList()
      if (res.results.length > 0) {
        this.articleList.unshift(...res.results)
        this.ts = res.pre_timestamp
        this.downSuccessText = '文章更新成功'
      } else {
        this.downSuccessText = '已经是最新了'
      }
      this.isLoading = false
      // setTimeout(() => {
      //   this.onLoad() // 获取数据
      //   this.isLoading = false
      //   this.$toast.success('刷新成功')
      // }, 1000)
    },
    // 上拉刷新
    async onLoad () {
      await this.$sleep(800)
      const res = await this.getarticleList()
      if (res.results.length > 0) {
        this.articleList.push(...res.results)
        this.ts = res.pre_timestamp
      } else {
        this.finished = true
      }
      this.loading = false

      // console.log(res)

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style lang='less'>
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>
