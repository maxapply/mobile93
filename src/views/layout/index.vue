<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条" right-text="搜索" @click-right="$router.push('/search')" />
    <!-- 路由占位符， 显示home/question/video/user 二级路由 -->
    <div id="my_warapper">
      <router-view></router-view>
    </div>
    <!-- Tabber标签栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  #my_warapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 93px;
    padding-bottom: 100px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0px;
    }
  }
}
</style>
