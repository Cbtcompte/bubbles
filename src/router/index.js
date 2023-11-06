import { createRouter, createWebHistory } from 'vue-router'
import App from '../views/layouts/App.vue'
import DashboardView from '../views/pages/DashboardView.vue'

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
        }
      ]
    },
  ]
})

export default router
