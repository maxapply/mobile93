// 导入 封装好的 axios
import request from '@/utils/request.js'

// 导入 vuex 判断用户是否登录
import store from '@/store/index.js'

// 本地存储key 游客 和 登录用户
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客登录
const CHANNEL_KEY_VIP = 'hm-channel-vip' // 用户登录

// 所有频道
export async function apiChannelList () {
  // 根据用户是否登录从 localStorage 获得对应key
  const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL
  // console.log(key)
  // 获取 localStorage 的key
  const cacheChannels = localStorage.getItem(key)
  // console.log(cacheChannels)
  // 判断是否有缓存信息
  if (cacheChannels) {
    // 有数据直接返回
    return { channels: JSON.parse(cacheChannels) }
  } else {
    // 没有数据 发送axios
    const res = await request({
      url: '/app/v1_0/user/channels',
      method: 'GET'
    })
    // 把获得好的 localStorage 数据，存储起来
    localStorage.setItem(key, JSON.stringify(res.channels))
    // 数据对外输出进行使用
    return res
  }
}

// 导出获取用户频道列表
export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
