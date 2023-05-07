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


router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  console.log(authStore)
  console.log(localStorage.getItem('user_connect') )
  if(localStorage.getItem('user_connect')  != null){
    const  user_connect =  JSON.parse(localStorage.getItem('user_connect') ?? '') || []
    console.log(user_connect)

  }
  if (authRequired && !authStore.user) {
    return {
      path: '/login',
      //@ts-ignore
     // query: { returnUrl: to.href }
    };
  }
});

export default router
