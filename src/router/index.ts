import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/quotes/page/:page(\\d+)?',
      name: 'quotes',
      component: () => import('../views/SourceView.vue'),
    },
    {
      path: '/todos/page/:page(\\d+)?',
      name: 'todos',
      component: () => import('../views/SourceView.vue'),
    },
  ],
})

export default router
