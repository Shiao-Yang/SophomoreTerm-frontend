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
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import clipboard from 'clipboard'

// import htmlToPdf from '../src/common/htmlToPdf';
// Vue.use(htmlToPdf)

Vue.prototype.$axios = axios
Vue.prototype.clipboard = clipboard;
Vue.use(VueAxios, axios) // 安装插件
Vue.use(ElementUI);
Vue.use(Viewer)

Viewer.setDefaults({
  title: false,
  toolbar: false,
})

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
