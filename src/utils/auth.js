import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'vue_admin_template_token'

export function getToken(to) {
   
  //cookie token检查
  if(Cookies.get(TokenKey)){

    return Cookies.get(TokenKey);
   
  } else if (to&&to.query["token"]) {
    
    // URL 检查，适用于跳转登录
    //  http://localhost:9528/#/login?token=admin-token
    console.log("query token:"+to.query["token"])
    store.dispatch('user/autologin',to.query["token"])

   

  }

  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 跳转认证
 */
export function getDirectAuthServer(query){

   let callbackUrl = encodeURIComponent(window.location.href);
   let redirect=`${process.env.VUE_APP_AUTH_SERVER}?callback=${callbackUrl}&id=${process.env.VUE_APP_ID}`
  
   console.log(`no token redirect: ${redirect}`)

   return redirect;
 
}

