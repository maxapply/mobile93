// 导入axios模块
import request from '@/utils/request.js'
// 创建api方法
export function apiUserLogin ({ mobile, code }) {
  return request({
    // 请求地址
    url: '/app/v1_0/authorizations',
    // 请求方式
    method: 'POST',
    // 请求传参
    data: {
      mobile,
      code
    }
  })
}

// 关注用户
export function apiUserFollow (target) {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注用户
export function apiUserUnfollow (target) {
  return request({
    url: '/app/v1_0/user/followings/' + target,
    method: 'delete'
  })
}
