import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/orders'
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/modules/orders/pages/OrdersListPage.vue')
  },
  {
    path: '/orders/:id',
    name: 'order-details',
    component: () => import('@/modules/orders/pages/OrderDetailsPage.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/shared/components/NotFound.vue')
  }
]

export default routes