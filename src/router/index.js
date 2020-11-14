import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入所有的组件
import Home from '../views/Home'
import Classify from '../views/Classify'
import Hello from '../views/Hello'
import Favorite from '../views/Hello/Favorite'
import History from '../views/Hello/History'
import Register from '../views/Register'
import Login from '../views/Login'
import Search from '../views/Search'
import SearchResult from '../views/SearchResult'
import My from '../views/My'
import Vip from '../views/Vip'
import Ranking from '../views/Ranking'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false }) // 取消小圆圈加载
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/classify',
    component: Classify
  },
  {
    path: '/hello',
    component: Hello,
    children: [
      {
        path: 'history',
        component: History
      },
      {
        path: 'favorite',
        component: Favorite
      },
      {
        path: '',
        redirect: 'hello/favorite'
      }
    ]
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search-result',
    component: SearchResult
  },
  {
    path: '/vip',
    component: Vip
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/ranking',
    component: Ranking
  },
  {
    path: '/',
    redirect: 'home'
  }
]

const router = new VueRouter({
  routes
})

// 添加全局路由守卫   在这里我们去给每个页面,添加进度条
router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})
router.afterEach((to, from, next) => {
  nprogress.done()
})
export default router
