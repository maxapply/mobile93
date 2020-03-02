<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
export default {
  name: 'article'
}
</script>

<style lang='less'>
</style>
