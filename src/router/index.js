import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import UserInfo from "@/views/UserInfo";
import AccountInfo from "@/views/AccountInfo";
import AddedTeam from "@/views/AddedTeam";
import temp from "@/views/temp";
import Design from "@/views/Design";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login&register',
    name: 'login&register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginAndRegister
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfo
  },
  {
    path: '/accountInfo',
    name: 'accountInfo',
    component: AccountInfo
  },
  {
    path: '/addedTeam',
    name: 'addedTeam',
    component: AddedTeam
  },
  {
    path: '/temp',
    name: 'temp',
    component: temp
  },
  {
    path: '/design',
    name: 'design',
    component: Design
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
