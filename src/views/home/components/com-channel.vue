<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    round
    position="bottom"
    closeable
    close-icon-position="top-left"
    :style="{ height: '95%' }"
  >
    <!----------- 上部分------------- -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进去频道</span>
        </div>
        <div>
          <van-button type="danger" size="mini" plain>编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="(item,k) in channelList" :key="item.id">
          <span class="text" :style="{color:k===activeChannelIndex?'red':''}">{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- --------下部分---------- -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
        <div>
          <van-button type="danger" size="mini" plain>编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="item in resChannel" :key="item.id">
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
// 获取所有频道接口
import { apiChannelAll } from '@/api/channel.js'
export default {
  name: 'com-channel',
  // 当前激活的下标  // 当前用户的频道信息传递过来
  props: {
    // 接收父组件的v-model组件
    value: {
      type: Boolean,
      default: false
    },
    // 父组件传递过来“ 我的频道 ”
    channelList: {
      type: Array,
      default: () => []
    },
    // 当前激活的下标
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      channelALL: []
    }
  },
  created () {
    // 初始化的时候获取所有频道
    this.getchannelALLlist()
  },
  computed: {
    // 剩余频道
    resChannel () {
      // 我的频道 map 遍历 返回数组
      const userChannelIds = this.channelList.map(item => {
        return item.id
      })
      // 对所有频道进去过滤
      const rest = this.channelALL.filter(item => {
        // 判断是否存在
        return !userChannelIds.includes(item.id)
      })
      //   console.log(rest)

      return rest
    }
  },
  methods: {
    // 获取所有频道
    async getchannelALLlist () {
      const result = await apiChannelAll()
      this.channelALL = result.channels
    }
  }
}
</script>

<style lang='less' scoped>
.channel {
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color: gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
