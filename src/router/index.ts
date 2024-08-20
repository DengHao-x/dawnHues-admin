import {
  type Router,
  createRouter,
  type RouteRecordRaw,
  type RouteComponent,
  createWebHashHistory
} from 'vue-router'
import NProgress from '@/utils/nprogress'
import baseRoutes from './modules/baseRouter'
import { getToken } from '@/utils/authentication'
import { getAsyncRouter } from '@/api/asyncRouter'
/** 路由白名单 */
const whiteList = ['/login']

/** 创建路由实例 */
export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes,
  strict: true
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    getAsyncRouter().then(res => {
      const asyncRouter: RouteRecordRaw[] = res.data.map((item: any) => {
        const component: RouteComponent = (() =>
          import(`@/views/${item.component}.vue`)) as unknown as RouteComponent
        return {
          path: item.path,
          name: item.name,
          component,
          meta: {
            title: item.title,
            icon: item.icon
          }
        }
      })
      console.log(asyncRouter)
    })
    next()
  } else {
    if (to.path !== '/login') {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
