import Vue from 'vue'

import '@/styles/reset.less'
// 引入路由模块
import router from './router/heimapro.js'

// 引入vant 框架
import { Toast } from 'vant'
import App from './App.vue'

Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
