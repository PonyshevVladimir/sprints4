import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/book/:bookId',
    name: 'book-details',
    component: () => import(`@/views/BookView.vue`),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
