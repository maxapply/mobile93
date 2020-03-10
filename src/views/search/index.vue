<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索框 -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" />
    <!-- cell 单元格 -->
    <van-cell-group>
      <van-cell  v-for="(item,k) in suggestionList" :key="k" icon="search" >
        <div slot="title" v-html="hightLightCell(item,searchText)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 获取联想建议（自动补全）
import { apiSearchSuggestion } from '@/api/search.js'
export default {
  name: 'search-index',
  data () {
    return {
      searchText: '',
      suggestionList: []
    }
  },
  // 监听 输入框 发生变化调用接口
  watch: {
    searchText: function (newV) {
      // 清空 延时定时器 输入时差小于1秒就清空
      clearTimeout(this.timer)
      // 如果关键字为空，就停止联想获取
      if (!newV) {
        this.suggestionList = [] // 输入框为空的时候，清空联想数据
        return false
      }
      // 防抖处理，减少客户端频繁发送请求
      this.timer = setTimeout(async () => {
        const result = await apiSearchSuggestion(newV)
        this.suggestionList = result.options
      }, 1000)
    }
  },
  methods: {
    //  关键字高亮设置 // content 要高亮的目标内容 // keywords 被匹配的关键字
    hightLightCell (content, keywords) {
      // 验证输入内容的正则 i 忽略大小写
      const reg = new RegExp(keywords, 'i')
      // 正则与目标内容进行匹配
      const res = content.match(reg)
      // 对目标内容进行替换
      return content.replace(reg, `<span style="color:red">${res[0]}</span>`)
    }
  }
}
</script>

<style lang='less'>
</style>
