import Vue from 'vue'
import Router from 'vue-router'
import Timeline from '../components/HikingTimeline'
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
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next ('login')
  else next()
})

export default router
