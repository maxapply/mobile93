<template>
  <div class="container">
    <van-nav-bar title="小智同学" fixed left-arrow @click-left="$router.back()" />
    <div class="chat-list" ref="talkArea">
      <!-- <div class="chat-item left">
        <van-image round fit="cover" :src="Xz" />
          <div class="chat-pao">干啥呢，河蟹</div>
       </div>
       <div class="chat-item right">
          <div class="chat-pao">没看正忙，挖沙呢</div>
         <van-image round fit="cover" :src="userPhoto.photo" />
      </div>-->
      <div class="chat-item" v-for="(item,k) in talks" :key="k" :class="item.name==='xz'?'left':'right'">
        <van-image round fit="cover" :src="Xz" v-if="item.name==='xz'" />
        <div class="chat-pao">{{item.msg}}</div>
        <van-image round fit="cover" :src="userPhoto.photo" v-if="item.name==='vip'" />
      </div>

      <div class="reply-container van-hair line--top">
        <van-field v-model.trim="content" placeholder="说点什么..." @keyup.enter="send()">
          <van-button size="mini" :loading="isloading" slot="button" @click="send()">提交</van-button>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
// 导入socket.io-client
import io from 'socket.io-client'
// 导入小智头像
import Xz from '@/assets/image/xz.png'
// 获取用户自己头像
import { apiUserInfo } from '@/api/user.js'
export default {
  name: 'user-chat',
  data () {
    return {
      talks: [], // 聊天内容
      socket: null, // 储存socket对象
      userPhoto: {}, // 获取用户自己头像
      Xz, // 小智头像
      content: '', // 聊天内容
      isloading: false // 加载动态
    }
  },
  created () {
    this.getuserPhoto() // 获取用户自己头像
    this.setSocket() // 与后台建立连接
  },
  // 销毁连接 钩子函数
  beforeDestroy () {
    // 销毁连接
    this.socket.close()
  },
  methods: {
    // 聊天区域滚动条
    scrollBottom () {
      // 保证data数据变化并页面更新的响应式动作后，执行滚动逻辑
      this.$nextTick(() => {
        this.$refs.talkArea.scrollTop = this.$refs.talkArea.scrollHeight
      })
    },
    // 浏览器与服务器发送消息
    async send () {
      // 判断输入框内容为空停止代码
      if (!this.content) {
        return false
      }
      // 打开加载状态
      this.isloading = true
      // 把聊天记录存储到 talks
      const args = {
        msg: this.content,
        timestamp: Date.now(),
        name: 'vip'
      }
      this.talks.push(args)
      // 设置滚动效果
      this.scrollBottom()
      // 发送完输入框置空
      this.content = ''
      // 延时5秒
      await this.$sleep(500)
      // 把聊天记录发送给服务器
      this.socket.emit('message', args)

      // 关闭加载状态
      this.isloading = false
    },
    // 获取用户自己头像
    async getuserPhoto () {
      this.userPhoto = await apiUserInfo()
    },
    // 与后台建立连接
    setSocket () {
      // 客服端 与 服务器 发送请求，建立连接
      this.socket = io('http://ttapi.research.itcast.cn', {
        query: {
          token: this.$store.state.user.token
        }
      })
      // 创建事件感知连接状态
      this.socket.on('connect', () => {
        console.log('连接成功')
        // 让小智同学主动发送消息
        this.talks.push({
          name: 'xz',
          msg: 'outman,最近干啥呢？',
          timestamp: Date.now()
        })
      })

      // 服务器 向 客服端 发送消息
      this.socket.on('message', back => {
        console.log(123)

        this.talks.push({ ...back, name: 'xz' })
        // 设置滚动效果
        this.scrollBottom()
      })
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 92px 0 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 20px;
      .van-image {
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 140%;
        min-height: 80px;
        line-height: 76px;
        border: 1px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before {
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 24px;
          border-top: 1px solid #c2d9ea;
          border-right: 1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 30px;
    &::before {
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 30px;
    margin-right: 0;
    &::before {
      left: -10px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
