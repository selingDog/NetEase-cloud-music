import Vue from 'vue'
import VueRouter from 'vue-router'

import recommend from '../views/recommend.vue'

import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: recommend,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/hotRank',
    name: 'hotRank',
    // 懒加载
    component: () => import('../views/hotRank.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/search',
    name: 'search',
    // 懒加载
    component: () => import('../views/search.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/playListDetail',
    name: 'playListDetail',
    // 懒加载
    component: () => import('../views/playListDetail.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/infoUser',
    name: 'infoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.token || sessionStorage.getItem('token')) {
        next();
      } else {
        next('/login');
      }
    },
    // 懒加载
    component: () => import('../views/infoUser.vue'),
    meta: {
      keepAlive: true
    },
  }, {
    path: '/login',
    name: 'login',
    // 懒加载
    component: () => import('../views/login.vue'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/userItem',
    name: 'userItem',
    // 懒加载
    component: () => import('../components/userItem.vue'),
    meta: {
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.path == '/login') {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
  next()
})

export default router
