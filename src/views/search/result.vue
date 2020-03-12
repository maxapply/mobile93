<template>
  <div class="container">
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 瀑布流 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in searchList" :key="item.art_id.toString()" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 获取搜索结果
import { apiSeacherList } from '@/api/article.js'
export default {
  name: 'search-result',
  data () {
    return {
      searchList: [], // List 列表
      // 瀑布流
      list: [],
      loading: false,
      finished: false,
      // 页码
      page: 1
    }
  },
  methods: {
    // 瀑布流加载
    async onLoad () {
      this.$sleep(1000)
      // 获取文章数据
      const args = { q: this.$route.params.keywords, page: this.page }
      const result = await apiSeacherList(args)
      // 关闭瀑布流效果
      this.loading = false
      // 如果没有获取到数据
      if (!result.results.length) {
        // 停止瀑布流
        this.finished = true
        // 停止后续代码执行
        return false
      }
      // 获取到数据 往date里追加
      this.searchList.push(...result.results)
      // 分页++
      this.page++
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }

      //     // 加载状态结束
      //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    }
  }
}
</script>

<style lang='less'>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  .van-list {
    flex: 1;
    margin-top: 92px;
  }
}
</style>
