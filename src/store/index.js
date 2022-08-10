import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      uid: '1', //用户id
      username: '', //用户昵称
      password: 'aaabbb', //用户密码
      name: '', //用户真实姓名
      avatar: "src/assets/images/login", //用户头像
      email: '', //邮箱
      gnum: 0, //团队数
      profile: '', //简介
      controls: [],
    },
    gid: 1, // 当前团队id
    pid: '', // 当前项目id
    pname: '', //当前项目名称
    role: 2, // 当前用户身份
    isLogin: false,
    warning: false, // 非法跳转
    base: "http://43.138.26.134/api/",
    controls: [],
    his: [[]],
    hisPnt: 0,
    pic_id: 1,
    pic_name: '',
    doc_id: 0,
    design_url: "",
    doc: '',
    docs: '',
    index: -1,
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
