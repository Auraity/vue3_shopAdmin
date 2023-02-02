import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Goodslist from '~/pages/goods/list.vue'
import Categorylist from '~/pages/category/list.vue'
import User from '~/pages/user/list.vue'
import Order from '~/pages/order/list.vue'
import Comment from '~/pages/comment/list.vue'
import Image from '~/pages/image/list.vue'
import Notice from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import Coupon from '~/pages/coupon/list.vue'
// const routes = [{
//   path: '/',
//   component: Admin,
//   // 子路由
//   children: [{
//     path: '/',
//     component: Index,
//     meta: {
//       title: '后台首页',
//     }
//   }, {
//     path: '/goods/list',
//     component: Goodslist,
//     meta: {
//       title: '商品管理',
//     }
//   }, {
//     path: '/category/list',
//     component: Categorylist,
//     meta: {
//       title: '分类管理',
//     }
//   }]
// }, {
//   path: '/login',
//   component: Login,
//   meta: {
//     title: '登录页',
//   }
// }, {
//   path: '/:pathMatch(.*)*',
//   name: 'NotFound',
//   component: NotFound
// },]

// 默认路由
const routes = [{
  path: '/',
  name: 'admin',
  component: Admin,
}, {
  path: '/login',
  component: Login,
  meta: {
    title: '登录页',
  }
}, {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound
},]

// 动态路由，用于匹配菜单动态添加路由
const asyncRouter = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '后台首页',
    }
  }, {
    path: '/goods/list',
    name: '/goods/list',
    component: Goodslist,
    meta: {
      title: '商品管理',
    }
  }, {
    path: '/category/list',
    name: '/category/list',
    component: Categorylist,
    meta: {
      title: '分类管理',
    }
  }, {
    path: '/user/list',
    name: '/user/list',
    component: User,
    meta: {
      title: '用户管理',
    }
  }, {
    path: '/order/list',
    name: '/order/list',
    component: Order,
    meta: {
      title: '订单管理',
    }
  }, {
    path: '/comment/list',
    name: '/comment/list',
    component: Comment,
    meta: {
      title: '评价管理',
    }
  }, {
    path: '/category/list',
    name: '/category/list',
    component: Categorylist,
    meta: {
      title: '分类管理',
    }
  }, {
    path: '/category/list',
    name: '/category/list',
    component: Categorylist,
    meta: {
      title: '分类管理',
    }
  }, {
    path: '/notice/list',
    name: '/notice/list',
    component: Notice,
    meta: {
      title: '公告管理',
    }
  }, {
    path: '/image/list',
    name: '/image/list',
    component: Image,
    meta: {
      title: '图库管理',
    }
  }, {
    path: '/setting/base',
    name: '/setting/base',
    component: SettingBase,
    meta: {
      title: '配置管理',
    }
  }, {
    path: '/coupon/list',
    name: '/coupon/list',
    component: Coupon,
    meta: {
      title: '优惠券管理',
    }
  },
]

// 添加动态路由的方法
export function addRouter(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutes = (arr) => {
    arr.forEach(e => {
      let item = asyncRouter.find(o => o.path == e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutes(e.child)
      }
    })
  }
  findAndAddRoutes(menus)
  return hasNewRoutes
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

