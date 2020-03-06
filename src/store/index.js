import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 变量保存 localStorage 的 key信息
const USER_KEY = 'hm-toutiao-mobile-user'

export default new Vuex.Store({
  state: {
    // 获取 token 信息
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    // 添加 token 信息
    updataUser: function (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    // 移除 token 信息
    clearUser: function (state) {
      state.user = {}
      JSON.parse(localStorage.removeItem(USER_KEY))
    }
  },
  actions: {
  },
  modules: {
  }
})
