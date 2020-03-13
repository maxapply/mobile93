// 导入 封装好的 axios
import request from '@/utils/request.js'
// 获取回复
export function apiReplyList ({
  articleID,
  lastID
}) {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: articleID,
      offset: lastID,
      limit: 10
    }
  })
}
// 添加评论或评论回复
export function apiAddCorR ({
  target, content, artID = null
}) {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artID
    }
  })
}
