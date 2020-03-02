<template>
  <div class="container">
    <h2>app组件</h2>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div id="orgin"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='less'>
#orgin{
  width: 375px;
  height: 500px;
  background-color: pink;
}
</style>
