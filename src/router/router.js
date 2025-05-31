import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/content/:id',
      props: true,
      name: 'content',
      component: () => import('../views/ContentView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
    },
    {
      path: '/account/:property',
      props: true,
      component: () => import('../views/EditInfoView.vue'),
    },
    {
      path: '/collections',
      component: () => import('../views/CollectionsView.vue'),
    },
    {
      path: '/collections/personal',
      component: () => import('../views/CollectionsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/collections/personal/:id',
      component: () => import('../views/CollectionContentView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/collections/:id',
      props: true,
      component: () => import('../views/CollectionContentView.vue'),
    },
    {
      path: '/collections/genre/:id',
      props: true,
      component: () => import('../views/CollectionContentView.vue'),
      meta: { genre: true },
    },
    {
      path: '/person/:id',
      props: true,
      component: () => import('../views/PersonView.vue'),
    },
    {
      path: '/news',
      component: () => import('../views/NewsView.vue'),
    },
    {
      path: '/news/:id',
      props: true,
      component: () => import('../views/NewsBodyView.vue'),
    },
    {
      path: '/news/add',
      component: () => import('../views/NewsAddView.vue'),
      meta: { requiresAuth: true, role: 'moderator' },
    },
    {
      path: '/reviews',
      component: () => import('../views/ReviewListView.vue'),
    },
    {
      path: '/reviews/:id',
      component: () => import('../views/ReviewBodyView.vue'),
    },
    {
      path: '/reviews/add',
      component: () => import('../views/ReviewAddView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }

  if (to.meta.role && !auth.hasRole(to.meta.role)) {
    return { path: '/' };
  }
})

export default router
