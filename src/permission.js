import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken , getDirectAuthServer } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/**
 * 白名单，默认为空
 */
const whiteList = [] // no redirect whitelist

// const whiteList = ['/login'] // no redirect whitelist

// 路由导航守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  console.log("query:"+JSON.stringify(to.query))

  // set page title
  document.title = getPageTitle(to.meta.title)


  // determine whether the user has logged in
  const hasToken = getToken(to)

  if (hasToken) {
    // 存在token 为首次登录
    if (to&&to.query["token"]) {
      // 优先跳转上次退出地址
      if(to.path){
        next({ path: to.path })
      }else{
         // if is logged in, redirect to the home page
         next({ path: '/'})
      }
     
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
 
          // 原登出代码注销
          // next(`/login?redirect=${to.path}`)
          // NProgress.done()
          // 登出跳转认证服务
           next(false)

           window.top.location.href = getDirectAuthServer()
        }
      }
    }
  } else {
    /* has no token*/


     if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
     // console.log("wite list")
     } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next 设置为false 中断Vue路由，必须步骤
      next(false)
      // 跳转认证服务
      window.top.location.href = getDirectAuthServer()
    }

  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
