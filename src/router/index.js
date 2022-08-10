import Vue from 'vue'
import VueRouter from 'vue-router'
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
import DesignList from "@/views/DesignList"
import Test from "@/views/test";

import Home from "@/views/Home";
import TeamList from "@/views/TeamList";
import designList from "@/views/DesignList";
import docCenter from "@/views/DocCenter";
import docList from "@/views/docList";
import userSet from "@/views/UserSet";
import MessageList from "@/views/MessageList"
import UmlView from "@/views/UmlView";
import UserView from "@/views/UserView";

import PreView from "@/views/PreView";
import preView from "@/views/PreView";

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
    path:'/teamList',//以后要改成包含uid信息的个人的团队列表路径
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
  },
  {
    path: '/designList',
    name: 'designList',
    component: designList
  },
  {
    path: '/docCenter',
    name: 'docCenter',
    component: docCenter
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/docList',
    name: 'docList',
    component: docList
  },
  {
    path: '/userSet',
    name: 'userSet',
    component: userSet,
  },
  {
    path: '/messageList',
    name: 'messageList',
    component: MessageList
  },
  {
    path: '/preView',
    name: 'preView',
    component: preView
  },
  {
    path: '/UmlView',
    name: 'UmlView',
    component: UmlView,
  },
  {
    path: '/UserView',
    name: 'UserView',
    component: UserView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
