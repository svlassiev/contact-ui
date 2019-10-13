import Vue from 'vue'
import Router from 'vue-router'
import Timeline from '../components/HikingTimeline'
import Login from '../components/Login'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/hiking',
  routes: [
    {
      path: '/',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: { name: 'timeline' }
    }
  ]
});

export default router
