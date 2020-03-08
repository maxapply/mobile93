import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 时间过滤器
import * as filters from '@/utils/filters.js'

// vant 导入 --懒加载
import Vant, { Lazyload } from 'vant'
// vant css
import 'vant/lib/index.css'

// vant rem基准值
import 'amfe-flexible/index.min.js'

// 全局样式导入
import '@/assets/css/global.less'

// 导入 vee-validate 验证
import '@/utils/validate.js'

Vue.use(Vant)
// 注册懒加载
Vue.use(Lazyload)
// 注册时间过滤器
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Vue.config.productionTip = false

// 延时加载
Vue.prototype.$sleep = item => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, item)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
