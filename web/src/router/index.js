"use strict";
import { createRouter, createWebHashHistory } from 'vue-router'
//检测是否登录
function checkIfUserIsAuthenticated() {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
  if (isAuthenticated == null) {
    return false
  }
  return isAuthenticated.state == true;
}
const routes = [
  {
    path: '/', name: 'home', meta: { title: "欢迎大厅" },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/special', name: 'special', meta: { title: "精彩瞬间", },
    component: () => import('../views/SpecialView.vue'),
  },
  {
    path: '/recommend', name: 'recommend', meta: { title: "角色百科", },
    component: () => import('../views/RecommendView.vue'),
  },
  {
    path: '/film', name: 'film', meta: { title: "剧场大片" },
    component: () => import('../views/FilmView.vue'),
  },
  {
    path: '/play', name: 'play', meta: { title: "视频推荐" },
    component: () => import('../views/PlayView.vue'),
  },
  {
    path: '/login', name: 'login', meta: { title: "注册/登录", state: checkIfUserIsAuthenticated(), },
    component: () => import('../views/LoginView.vue'),
  },
];
const router = createRouter({
  //路由方式
  history:
    createWebHashHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.name == "login" && checkIfUserIsAuthenticated()) {
    next(from.path);
  }
  else {
    next();
  }
})
export default router;

