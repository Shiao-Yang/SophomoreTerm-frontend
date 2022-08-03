import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SideNavigation from "@/components/SideNavigation";
import ProjectView from "@/views/ProjectView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/projectList',
    name: 'ProjectList',
    component: ProjectView
  },
  {
    path: '/prototype',
    component: ()=> import('@/examples/vseditor'),
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
