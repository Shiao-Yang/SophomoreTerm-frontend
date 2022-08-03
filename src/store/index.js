import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '', // 当前用户id
    gid: 1, // 当前团队id
    pid: '', // 当前项目id
    role: 2, // 当前用户身份
    isLogin: '0',
    base: "http://127.0.0.1:8000/",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
