<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--  上拉刷新 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'com-article',
  data () {
    return {
      // 下拉状态
      isLoading: false,
      // 上拉状态
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.onLoad() // 获取数据
        this.isLoading = false
        this.$toast.success('刷新成功')
      }, 1000)
    },
    // 上拉刷新
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
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
