<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--  上拉刷新 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title">
          <template slot="label">
            <van-grid v-if="item.cover.type>0" :column-num="item.cover.type" :border="false" :gutter="10">
              <van-grid-item  v-for="item2 in item.cover.type" :key="item2">
                <van-image width="85" height="85" :src="item.cover.images[item2-1]" />
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入 频道新闻推荐_V1.1
import { apiArticeList } from '@/api/article.js'
export default {
  name: 'com-article',
  props: {
    channelID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 时间戳
      ts: Date.now(),
      // 文章列表
      articleList: [],
      // 下拉状态
      isLoading: false,
      // 上拉状态
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getarticleList()
  },
  methods: {
    async getarticleList () {
      const result = await apiArticeList({
        channel_id: this.channelID,
        timestamp: this.ts
      })
      return result
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.onLoad() // 获取数据
        this.isLoading = false
        this.$toast.success('刷新成功')
      }, 1000)
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
