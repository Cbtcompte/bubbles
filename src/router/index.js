import { createRouter, createWebHistory } from 'vue-router'
import App from '../views/layouts/App.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import GraphView from '../views/pages/GraphView.vue'
// import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/pages/DashboardView.vue'
//import { accountService } from '../_services/account.service'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
      children : [
        {
          path: '/',
          name: 'home',
          component: DashboardView,
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
        {
          path: '/graph',
          name: 'graph',
          component: GraphView,
        }
      ]
    },

  ]
})

export default router
//export * from '../_services/account.service'
