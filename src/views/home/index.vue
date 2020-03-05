<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="推荐">
        <!-- 使用下拉 上拉 组件 -->
        <com-article></com-article>
      </van-tab>
      <van-tab title="数据库">
        <com-article></com-article>
      </van-tab>
      <van-tab title="后端">
        <com-article></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ComArticle from './components/com-article'
export default {
  name: 'home-index',
  components: { ComArticle },
  data () {
    return {
      activeChannelIndex: 0
    }
  }
}
</script>

<style scoped lang='less'>
.van-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
  }
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
