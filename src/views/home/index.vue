<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <div slot="nav-right" class="channel-more" @click="showChannel=true">
        <van-icon name="wap-nav" />
      </div>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <!-- 使用下拉 上拉 组件 -->
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>
    <com-channel v-model="showChannel" :channelList="channelList" :activeChannelIndex.sync="activeChannelIndex"></com-channel>
  </div>
</template>

<script>
// 弹出层组件
import ComChannel from './components/com-channel.vue'
// 导入瀑布流
import ComArticle from './components/com-article'
// 导入获取用户频道列表
import { apiChannelList } from '@/api/channel.js'
export default {
  name: 'home-index',
  components: { ComArticle, ComChannel },
  data () {
    return {
      // 弹出层 开关
      showChannel: false,
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
  .channel-more {
    position: fixed;
    right: 0;
    background-color: white;
    line-height: 88px;
    height: 88px;
    width: 90px;
    text-align: center;
    font-size: 40px;
  }
  /deep/ .van-tabs__wrap{
    width: 90%;
  }
}
</style>
