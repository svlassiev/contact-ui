import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/hiking',
  routes: [
    {
      path: '/',
      name: 'app',
      component: App
    },
    {
      path: '*',
      redirect: { name: 'app' }
    }
  ]
})

export default router
