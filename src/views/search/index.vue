<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索框 -->
    <van-search
      v-model.trim="searchText"
      placeholder="请输入搜索关键词"
      @search="onSearch(searchText)"
    />
    <!-- cell 单元格 联想记录 -->
    <van-cell-group v-if="suggestionList.length>0">
      <van-cell
        v-for="(item,k) in suggestionList"
        :key="k"
        icon="search"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="hightLightCell(item,searchText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史联想记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
          @click="isDeleteData=true"
          slot="right-icon"
          v-show="!isDeleteData"
          name="delete"
          style="line-height:inherit"
        ></van-icon>
        <div v-show="isDeleteData" slot="default">
          <span style="margin-right:10px" @click="delSuggestAll()">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <!-- 历史联想记录展示 -->
      <van-cell :title="item" v-for="(item,k) in suggestHistories" :key="k">
        <!-- 删除联想小按钮 -->
        <van-icon v-show="isDeleteData" slot="right-icon" style="line-height:inherit" name="close" @click="delsuggest(k)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 获取联想建议（自动补全）
import { apiSearchSuggestion } from '@/api/search.js'
// 设置 localStrage 里的key
const SH = 'suggest-histories'
export default {
  name: 'search-index',
  data () {
    return {
      searchText: '',
      suggestionList: [],
      // 联想历史记录是否进入删除状态
      isDeleteData: false,
      // 联想历史记录
      suggestHistories: JSON.parse(localStorage.getItem(SH) || '[]')
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
    // 全部删除联想记录
    delSuggestAll () {
      // 视图删除联想
      this.suggestHistories = []
      // localStorage 里删除联想
      localStorage.removeItem(SH)
    },
    // 单个删除联想小按钮
    delsuggest (index) {
      // 视图删除联想
      this.suggestHistories.splice(index, 1)
      // localStorage 里删除联想
      localStorage.setItem(SH, JSON.stringify(this.suggestHistories))
    },
    // 跳转到搜索页面
    onSearch (keywords) {
      // 如果没有关键字，禁止文章搜索
      if (!keywords) {
        return false
      }
      // 根据已有的历史记录创建set对象
      const st = new Set(this.suggestHistories)
      st.add(keywords) //  给set集合添加新元素
      this.suggestHistories = Array.from(st) // 吧set集合转为Array
      // 吧联想关键字存储到localStaoage
      localStorage.setItem(SH, JSON.stringify(this.suggestHistories))
      // 路由跳转
      this.$router.push('/search/result/' + keywords)
    },

    //  关键字高亮设置 // content 要高亮的目标内容 // keywords 被匹配的关键字
    hightLightCell (content, keywords) {
      // 验证输入内容的正则 i 忽略大小写
      const reg = new RegExp(keywords, 'i')
      // 正则与目标内容进行匹配
      const res = content.match(reg)
      // 判断没有匹配到关键字就停止以下操作
      if (res === null) {
        return content
      }
      // 对目标内容进行替换
      return content.replace(reg, `<span style="color:red">${res[0]}</span>`)
    }
  }
}
</script>

<style lang='less'>
</style>
