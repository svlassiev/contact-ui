import Vue from 'vue'
import Router from 'vue-router'
import Timeline from '../components/HikingTimeline'
import SimpleTimeline from '../components/SimpleTimeline'
import Login from '../components/Login'
import Edit from '../components/Edit'
import firebase from "firebase"

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
      path: '/simple',
      name: 'simple',
      component: SimpleTimeline
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: { name: 'timeline' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !firebase.auth().currentUser) {
    next('login')
  } else {
    next()
  }
})

export default router
