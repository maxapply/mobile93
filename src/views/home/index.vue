<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <!-- 使用下拉 上拉 组件 -->
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入瀑布流
import ComArticle from './components/com-article'
// 导入获取用户频道列表
import { apiChannelList } from '@/api/channel.js'
export default {
  name: 'home-index',
  components: { ComArticle },
  data () {
    return {
      channelList: [],
      activeChannelIndex: 0
    }
  },
  created () {
    this.getchannelList()
  },
  methods: {
    async getchannelList () {
      const restle = await apiChannelList()
      this.channelList = restle.channels
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
