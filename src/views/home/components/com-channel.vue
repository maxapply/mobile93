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
          <van-button type="danger" size="mini" plain round @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="(item,k) in channelList" :key="item.id" @click="clkchannel(item,k)">
          <span class="text" :style="{color:k===activeChannelIndex?'red':''}">{{item.name}}</span>
           <!-- × 号小按钮 -->
          <van-icon name="close" v-show="k>0&&isEdit"  class="close-icon" @click="uerToRest(item,k)"/>
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
        <!-- <div>
          <van-button type="danger" size="mini" plain>编辑</van-button>
        </div> -->
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="item in resChannel" :key="item.id" @click="restToUser(item)">
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
// 获取所有频道接口       // 添加频道并持久化  // 删除频道并持久化
import { apiChannelAll, apiChannelAdd, apiChanneldel } from '@/api/channel.js'
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
      // 显示与隐藏叉号小按钮
      isEdit: false,
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
    // 我的频道，点击激活
    clkchannel (channel, index) {
      // 判断进入编辑状态
      if (this.isEdit && index > 0) {
        // 进行删除当前，点击宫格
        return this.uerToRest(channel, index)
      }
      // 关闭弹出层
      this.$emit('input', false)
      // 修改父组件传递过来的变量
      this.$emit('update:activeChannelIndex', index)
    },

    // 添加频道
    restToUser (channel) {
      // 页面添加频道
      this.channelList.push(channel)
      // 调用 apiChannelAdd 方法，对localStorage 本地添加
      apiChannelAdd(channel)
    },

    // 删除频道
    uerToRest (channel, index) {
      // 页面删除频道
      this.channelList.splice(index, 1)
      // 调用 apiChannelAdd 方法，对localStorage 本地删除
      apiChanneldel(channel)
      if (this.channelList.length === index && this.activeChannelIndex === index) {
        this.$emit('update:activeChannelIndex', index - 1)
      }
    },

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
