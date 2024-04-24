// , createWebHistory 
import { createRouter,createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

function checkIfUserIsAuthenticated() {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
  // const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  if (isAuthenticated == null)
    return false;
  return isAuthenticated.state == true
}

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: "首页"
    },
    component: HomeView
  },
  {
    path: '/special',
    name: 'special',
    meta: {
      title: "专题"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SpecialView.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    meta: {
      title: "推荐"
    },
    component: () => import('../views/RecommendView.vue')
  },
  {
    path: '/film',
    name: 'film',
    meta: {
      title: "剧场版"
    },
    component: () => import('../views/FilmView.vue')
  },
  {
    path: '/play',
    name: 'play',
    meta: {
      title: "视频"
    },
    component: () => import('../views/PlayView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "注册/登录",
      state: checkIfUserIsAuthenticated(),
    },
    component: () => import('../views/LoginView.vue')
  },
]

const router = createRouter({
  history:
    createWebHashHistory(), 
    // createWebHistory(process.env.BASE_URL),
  routes
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 在此处添加条件判断
  document.title = to.meta.title;
  if (to.name == "login" && checkIfUserIsAuthenticated()) {
    // 拦截路由跳转
    console.log('124')
    next(from.path)
  }
  else {
    next()
  }
})
export default router


