import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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

export default router
