// 导入 封装好的 axios
import request from '@/utils/request.js'

// 获取联想建议（自动补全）
export function apiSearchSuggestion (q) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
