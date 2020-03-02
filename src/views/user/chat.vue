<template>
   <div class='container'>
     <van-nav-bar
        title="小智同学"
        fixed
        left-arrow
        @click-left="$router.back()"
      />
   </div>
</template>

<script>
export default {
  name: 'user-chat'
}
</script>

<style lang='less'>
</style>
