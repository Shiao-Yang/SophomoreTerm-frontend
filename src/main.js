import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式
import axios from 'axios'
import $ from 'jquery'
import VueAxios from 'vue-axios'
import {saveAs} from 'file-saver'
import {next} from "lodash/seq";

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

// 防止首页外联的js未加载
router.afterEach((to,from,next) => {
  if(to.path === "/" || to.path === "") {
    location.reload();
  }
})
