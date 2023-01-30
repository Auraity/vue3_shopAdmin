// 处理权限验证
import { router, addRouter } from '~/router'
import store from './store'
import { getToken } from '~/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '~/composables/utils'


// 全局前置守卫
let hasGetinfo = false
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading()
  const token = getToken()
  // 没有登录强制跳回登录页
  if (!token && to.path != '/login') {
    toast("请先登录", "error")
    return next({
      path: "/login"
    })
  }

  // 防止重复登录
  if (token && to.path == "/login") {
    toast("请勿重复登录", "error")
    return next({ path: from.path ? from.path : "/" })
  }
  // 是否有新的路由
  let hasNewRoutes = false
  // 如果用户登录了，则自动获取信息，存储在vuex中
  if (token && !hasGetinfo) {
    let { menus } = await store.dispatch("getinfo")
    hasGetinfo = true
    hasNewRoutes = addRouter(menus)
  }
  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "-商城后台"
  document.title = title
  hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())