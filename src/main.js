import Vue from 'vue'

import '@/styles/reset.less'
// 引入路由模块
import router from './router/heimapro.js'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
