import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import adminTeam from "@/views/AdminTeam";
import invite from "@/views/Invite";
import project from "@/views/Project";
import editor from "@/views/Editor";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
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
