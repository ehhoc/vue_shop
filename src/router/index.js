import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login = () => import('../components/Login.vue')
const Home = () => import('../components/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})


// 利用router.beforeEach挂载导航守卫 当用户没有登录直接用url访问特定页面，需要重新导航到登录页面

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行     next('./login') 强制跳转
  // 如果用户访问的是登陆页，直接返回一个放行信号
  if (to.path === '/login') return next()
  // window.sessionStorage.getItem获取token,通过'token'这个键获取指针的值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) { return next('/login') }
  next()
})

export default router
