import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式
import axios from 'axios'
import $ from 'jquery'
import VueAxios from 'vue-axios'

Vue.prototype.$axios = axios
Vue.use(VueAxios, axios) // 安装插件
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.eventbus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
