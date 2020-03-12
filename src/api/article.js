// 导入 封装好的 axios
import request from '@/utils/request.js'

// 导入 频道新闻推荐_V1.1
export function apiArticeList ({ channel_id, timestamp }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp,
      with_top: 1
    }
  })
}
// 对不喜欢的文章做处理
export function apiArticleDislike (articleID) {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: articleID
    }
  })
}
// 文章举报
export function apiArticleReport ({ articleID, type }) {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target: articleID,
      type,
      remark: ''
    }

  })
}

// 获取搜索结果
export function apiSeacherList ({ q, page = 1, per_page = 10 }) {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: {
      q,
      page,
      per_page
    }
  })
}
// 获取新闻文章详情
export function apiArticleDetail (articleID) {
  return request({
    url: '/app/v1_0/articles/' + articleID,
    method: 'GET'
  })
}
