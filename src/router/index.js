import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import UserInfo from "@/views/UserInfo";
import AccountInfo from "@/views/AccountInfo";
import AddedTeam from "@/views/AddedTeam";
import temp from "@/views/temp";
import Design from "@/views/Design";
import SideNavigation from "@/components/SideNavigation";
import ProjectView from "@/views/ProjectView";
import adminTeam from "@/views/AdminTeam";
import invite from "@/views/Invite";
import project from "@/views/Project";
import editor from "@/views/Editor";

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
  {
    path:'/projectList',
    name: 'ProjectList',
    component: ProjectView
  },
  {
    path: '/prototype',
    component: ()=> import('@/examples/vseditor'),
  },
  {
    path:'/tempTeamList',//以后要改成包含uid信息的个人的团队列表路径
    name: 'teamList',
    component: TeamList
  },
  
  // {
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },*/
  {
    path: '/adminTeam',
    name: 'adminTeam',
    component: adminTeam
  },
  {
    path: '/invite',
    name: 'invite',
    component: invite
  },
  {
    path: '/project',
    name: 'project',
    component: project
  },
  {
    path: '/editor',
    name: 'editor',
    component: editor
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

export default router
