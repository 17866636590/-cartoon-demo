import Vue from 'vue'
import VueRouter from 'vue-router'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

// 引入所有的组件
// import Home from '../views/Home'
// import Classify from '../views/Classify'
// import Hello from '../views/Hello'
// import Favorite from '../views/Hello/Favorite'
// import History from '../views/Hello/History'
// import Register from '../views/Register'
// import Login from '../views/Login'
// import Search from '../views/Search'
// import SearchResult from '../views/SearchResult'
// import My from '../views/My'
// import Vip from '../views/Vip'
// import Ranking from '../views/Ranking'
// import City from '../views/City'
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
// import store from '../store'

// 实现路由懒加载,改成异步引入
const Home = () => import('../views/Home')
// const Classify = () => import('../views/Classify')
const Hello = () => import('../views/Hello')
const Favorite = () => import('../views/Hello/Favorite')
const History = () => import('../views/Hello/History')
const Register = () => import('../views/Register')
const Login = () => import('../views/Login')
const Search = () => import('../views/Search')
const SearchResult = () => import('../views/SearchResult')
const My = () => import('../views/My')
const Vip = () => import('../views/Vip')
const Ranking = () => import('../views/Ranking')
const City = () => import('../views/City')
nprogress.configure({ showSpinner: false }) // 取消小圆圈加载
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/classify',
    component: () => import(/* webpackChunkName:"classify" */'../views/Classify')
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
    path: '/city',
    component: City
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
  // 判断当前是否选择了城市
  // window.sessionStorage或者vuex store去判断
  if (!store.state.city.curCity && to.path !== '/city') {
    // 先去城市列表页
    next({
      path: '/city',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  nprogress.done()
})
export default router
