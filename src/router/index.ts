import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import App from '../App.vue'
import Base from '../components/base.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/question-bank',
    name: 'App',
    component: App
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
