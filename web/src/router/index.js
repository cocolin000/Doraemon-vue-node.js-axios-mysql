// , createWebHistory 
import { createRouter,createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

function checkIfUserIsAuthenticated() {
  // const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
  const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));
  if (isAuthenticated == null)
    return false;
  return isAuthenticated.state == true
}

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: "欢迎大厅"
    },
    component: HomeView
  },
  {
    path: '/special',
    name: 'special',
    meta: {
      title: "精彩瞬间"
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
      title: "角色百科"
    },
    component: () => import('../views/RecommendView.vue')
  },
  {
    path: '/film',
    name: 'film',
    meta: {
      title: "剧场大片"
    },
    component: () => import('../views/FilmView.vue')
  },
  {
    path: '/play',
    name: 'play',
    meta: {
      title: "视频推荐"
    },
    component: () => import('../views/PlayView.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    meta: {
      title: "评论区"
    },
    component: () => import('../views/CommentView.vue')
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
  //检测是否登录
  if(to.name=="comments" && !checkIfUserIsAuthenticated()){
    console.log("没有登录，请先登录！")
    next(from.path)
  }
  if (to.name == "login" && checkIfUserIsAuthenticated()) {
    // 拦截路由跳转
    console.log('已经处于登录状态！')
    next(from.path)
  }
    next()
})
export default router


