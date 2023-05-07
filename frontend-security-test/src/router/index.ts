// Composables
import { useAuthStore } from '@/store/auth.store';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/login/loginView.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/register/registerView.vue')
      },
      {
        path: '/profil',
        name: 'Profil',
        component: () => import('@/views/Profile/Profile.vue')
      }
    ],
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next)=>{
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if ( !authStore.user && authRequired && localStorage.getItem('user_connect') == null){
    next({
      path: 'login',
      replace: true
    })
  } else {
    next();
  }
})



export default router
