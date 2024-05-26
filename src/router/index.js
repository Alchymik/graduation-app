import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "@/views/AuthView.vue"
import ProjectsView from "@/views/ProjectsView.vue"
import ProjectIDView from "@/views/ProjectIDView.vue"
import ProjectIDSprintView from '@/views/ProjectIDSprintView.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/projects/:id',
    component: ProjectIDView
  },
  {
    path: '/projects/:id/sprint_:sprint_id',
    component: ProjectIDSprintView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
