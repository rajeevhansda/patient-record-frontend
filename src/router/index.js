import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import(/* webpackChunkName: "update" */ '../views/UpdateUser.vue')
  },

  // ---------------------------------------------------------------------
  {
    path: '/allPatients',
    name: 'allPatients',
    component: () => import(/* webpackChunkName: "allPatients" */ '../views/patient/PatientAll.vue')
  },
  {
    path: '/singlePatients',
    name: 'singlePatients',
    component: () => import(/* webpackChunkName: "allPatients" */ '../views/patient/SinglePatient.vue'),
    props: route => ({ myObject: JSON.parse(route.params.myObject) })

  },
  {
    path: '/registerPatients',
    name: 'registerPatients',
    component: () => import(/* webpackChunkName: "registerPatients" */ '../views/patient/PatientRegister.vue'),

  },
  
  
  {
    path: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */
      "../views/NotFound")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = localStorage.getItem('userData')
    if (user === null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
    next() 
  
})

export default router
