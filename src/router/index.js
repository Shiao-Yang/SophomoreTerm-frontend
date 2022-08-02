import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import TeamList from "@/views/TeamList";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/tempTeamList',//以后要改成包含uid信息的个人的团队列表路径
    name: 'teamList',
    component: TeamList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

export default router
