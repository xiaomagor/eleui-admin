import request from '@/utils/request'

 

export function getInfo(token) {
  return request({
    url: 'mcs-service/user/userinfo',
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: 'uaa-service/rest/tokenlogout',
    method: 'post'
   
  })


}
