import Vue from 'vue'

import '@/styles/reset.less'
// 引入路由模块
import router from './router/heimapro.js'

// 引入vant 框架
import { Toast, Icon, Uploader, Dialog, Field, ActionSheet, Tab, Tabs, List, PullRefresh, Search } from 'vant'
import App from './App.vue'

Vue.use(Toast).use(Icon).use(Uploader).use(Dialog).use(Field).use(ActionSheet).use(Tabs).use(Tab).use(List).use(PullRefresh).use(Search)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
