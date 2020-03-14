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

// 获取用户自己信息
export function apiUserInfo () {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 获取用户个人资料
export function apiUserProfile () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}
// 编辑用户照片资料（ 头像、 身份证照片）
export function apiUserPhoto (FDobj) {
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: FDobj

  })
}
// 编辑用户个人资料（ 包含实名认证）
export function apiUserSeaverProfile ({
  name,
  gender,
  birthday
}) {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
}
