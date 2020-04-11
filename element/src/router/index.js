import Vue from 'vue'
import Router from 'vue-router'

import configJson from '../../static/config.json'

Vue.use(Router)

export default new Router({
  mode:'history',

base:configJson.publishFolder,

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("@/pages/index.vue"),
      children: [
        {
          path: '/',
          name: 'index1',
          component: () => import("@/pages/index-children/index.vue"),
        },
        {
          path: '/total',
          name: 'total',
          component: () => import("@/pages/index-children/total.vue"),
        },
        { 
          path: '/personal',
          name: 'personal',
          component: () => import("@/pages/index-children/personal.vue"),
        },
        {
          path: '/amend',
          name: 'amend',
          component: () => import("@/pages/index-children/amend.vue"),
        },
        {
          path: '/cheacked',
          name: 'cheacked',
          component: () => import("@/pages/index-children/cheacked.vue"),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/pages/login.vue")
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/pages/register.vue")
    }
  ]
})
