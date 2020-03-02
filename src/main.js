import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vant 导入
import Vant from 'vant'
// vant css
import 'vant/lib/index.css'

// vant rem基准值
import 'amfe-flexible/index.min.js'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
