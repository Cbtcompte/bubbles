import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
// import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/pages/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/LoginView',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/RegisterView',
      name: 'RegisterView',
      component: RegisterView
    },

  ]
})

export default router
