// 导入 封装好的 axios
import request from '@/utils/request.js'

// 导出获取用户频道列表
export function apiChannelList () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
