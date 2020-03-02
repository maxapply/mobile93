import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const USER_KEY = 'hm-toutiao-mobile-user'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    updataUser: function (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
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
