<template>
  <div class="container">
    <div class="user-profile">
      <div class="info">
        <van-image round :src="UserInfo.photo" />
        <h3 class="name">
        {{UserInfo.name}}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <!-- Layout 布局组件 -->
      <van-row>
        <van-col span="6">
          <p>{{UserInfo.art_count}}</p>
          <p>动态</p>
        </van-col>
        <van-col span="6">
          <p>{{UserInfo.follow_count}}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{UserInfo.fans_count}}</p>
          <p>粉丝</p>
        </van-col>
        <van-col span="6">
          <p>{{UserInfo.like_count}}</p>
          <p>被赞</p>
        </van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>
    <!-- Cell 单元格 -->
    <van-cell-group class="user-group">
      <van-cell icon="edit" to="/user/profile" title="编辑资料" is-link />
      <van-cell icon="chat-o" to="/user/chat" title="小智同学" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell icon="warning-o" @click="logout()" title="退出登陆" is-link />
    </van-cell-group>
  </div>
</template>

<script>
// 获取用户自己信息
import { apiUserInfo } from '@/api/user.js'
export default {
  name: 'user-index',
  data () {
    return {
      UserInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      this.UserInfo = await apiUserInfo()
    },
    logout () {
      // Dialog 弹出框
      this.$dialog.confirm({
        title: '退出',
        message: '确定要退出系统吗？'
      }).then(() => {
      // 退出登陆跳转到登陆页面
        this.$router.push('/login')
        this.$store.commit('clearUser')
      }).catch(() => {
        // on cancel
      })
    }

  }
}
</script>

<style lang='less'>
.user {
  &-profile {
    width: 100%;
    height: 300px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 40px;
      align-items: center;
      .van-image {
        width: 128px;
        height: 128px;
      }
      .name {
        font-size: 32px;
        font-weight: normal;
        margin-left: 20px;
      }
      .van-tag{
        background: #fff;
        color: #3296fa;
      }
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
  &-group{
    margin-bottom: 30px;
  }
  &-links{
    padding: 30px 0;
    font-size: 24px;
    text-align: center;
    background-color: #fff;
    .van-icon{
      display: block;
      font-size: 48px;
      padding-bottom: 10px;
    }
  }
}
</style>
