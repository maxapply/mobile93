// 导入 封装好的 axios
import request from '@/utils/request.js'

// 导入 vuex 判断用户是否登录
import store from '@/store/index.js'

// 本地存储key 游客 和 登录用户
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客登录
const CHANNEL_KEY_VIP = 'hm-channel-vip' // 用户登录

// 添加频道并持久化
export async function apiChannelAdd (channel) {
  // 判断用户是否登录
  const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL
  // 从localStorage里获取出来
  const cacheChannels = JSON.parse(localStorage.getItem(key))
  // 对获取出来的频道进行添加
  cacheChannels.push(channel)
  // 添加后的频道 保存到localStorage里
  localStorage.setItem(key, JSON.stringify(cacheChannels))
  // 返回 promise 对象 添加async和return
  return null
}

// 删除频道并持久化
export async function apiChanneldel (channel) {
  // 判断用户是否登录
  const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL
  // 从localStorage里获取出来
  const cacheChannels = JSON.parse(localStorage.getItem(key))
  // 对 拥有的频道 做过滤，遍历 吧 channel 给过滤掉
  const tmpChannel = cacheChannels.filter(item => {
    // item ：代表遍历出来的每个数组单元
    // 判断当前项目不是 channel return出去
    return channel.id !== item.id
  })
  // 删除后的频道，保存到本地 localSorage 里
  localStorage.setItem(key, JSON.stringify(tmpChannel))
  // 返回 promise 对象 添加async和return
  return null
}

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
