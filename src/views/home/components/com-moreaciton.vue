<template>
  <div class="com-moraection">
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :showConfirmButton="false"
      closeOnClickOverlay
      @closed="isOnelike=true"
    >
      <van-cell-group v-if="isOnelike">
        <van-cell title="不感兴趣" icon="location-o" @click="artilceDislike()" />
        <van-cell title="反馈内容" icon="location-o" is-link @click="isOnelike=false" />
        <van-cell title="拉黑作者" icon="location-o" />
      </van-cell-group>
      <van-cell-group v-else @click="isOnelike=true">
        <van-cell icon="arrow-left" />
        <van-cell
          v-for="item in reportlist"
          :title="item.title"
          :key="item.value"
          @click="articleReport(item.value)"
          icon="location-o"
        />
        <!-- <van-cell title="标题夸张" icon="location-o" />
        <van-cell title="低俗色情" icon="location-o" />
        <van-cell title="错别字多" icon="location-o" />
        <van-cell title="旧闻重复" icon="location-o" />
        <van-cell title="广告软文" icon="location-o" />
        <van-cell title="内容不实" icon="location-o" />
        <van-cell title="涉嫌违法犯罪" icon="location-o" />
        <van-cell title="侵权" icon="location-o" />-->
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入 对文章不喜欢 的接口  // 文章举报
import { apiArticleDislike, apiArticleReport } from '@/api/article.js'
export default {
  name: 'com-moraection',
  props: ['value', 'articleId'],
  data () {
    return {
      reportlist: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ],
      isOnelike: true
    }
  },
  methods: {
    // 举报文章
    async articleReport (type) {
      try {
        const obj = {
          articleID: this.articleId,
          type
        }
        await apiArticleReport(obj)
        this.$toast.success('举报成功')
      } catch (err) {
        if (err.response.status === 409) {
          return this.$toast.fail('已经举报过了')
        }
      }
      this.$emit('input', false)
    },
    // 文章不感兴趣的处理
    async artilceDislike () {
      // 调用 对文章不喜欢 的接口
      await apiArticleDislike(this.articleId)
      // 提示成功消息
      this.$toast.success('处理成功')
      // 关闭弹出框，修改父组件 showDialog 的值为false，进而影响子组件关闭弹框
      this.$emit('input', false)
      // 调用自己的事件，使得父组件文章清除
      this.$emit('dislikeSuccess')
    }
  }
}
</script>

<style lang='less' scoped>
</style>
