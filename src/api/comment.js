// 导入 封装好的 axios
import request from '@/utils/request.js'

// 获取评论
export function apiCommentList ({ articleID, offset }) {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: articleID,
      offset,
      limit: 10
    }
  })
}
