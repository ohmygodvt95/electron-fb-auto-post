import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/pages/LandingPage').default
    },
    {
      path: '/cookie',
      name: 'cookie',
      component: require('@/pages/Cookie').default
    },
    {
      path: '/home',
      component: require('@/layouts/Layout').default,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: require('@/pages/home/Dashboard').default
        },
        {
          path: 'cookie',
          name: 'cookie-2',
          component: require('@/pages/Cookie').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
