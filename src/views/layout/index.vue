<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar v-if="$route.path!=='/user'"  fixed title="黑马头条" right-text="搜索" @click-right="$router.push('/search')" />
    <!-- 路由占位符， 显示home/question/video/user 二级路由 -->
    <div id="my_warapper" :class="{noTop:$route.path==='/user'}">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
    <!-- Tabber标签栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item :to="$store.state.user.token?'/user':'/login'" icon="user-o">{{$store.state.user.token?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped lang='less'>
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
