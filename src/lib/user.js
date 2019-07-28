import storage from './storage'
import request from './request'
import prompt from '@system.prompt'
import router from '@system.router'
const userKey = 'user'

export default class User {
  // 判断用户是否登录
  static async isLogined() {
    const storageUser = await storage.get(userKey)
    return !!storageUser && !!storageUser.phone
  }
  constructor() {
  }
  /**
   * 获取本地storage保存的用户信息
   */
  async getLocal() {
    const storageUser = await storage.get(userKey)
    if (!storageUser || storageUser === null) {
      // throw new Error('用户未登录')
      return router.push({
        uri: '/Login',
        params: {}
      })
    }
    return JSON.parse(storageUser)
  }
  /**
   * 注册并登录保存用户到获取本地storage保存的用户信息
   */
  async login(name, phone, code) {
    const res = await request.post('login', { name, phone, captcha: code })
    const userInfo = res.data.user || {}
    if (res.err && !res.code) { return prompt.showToast({ message: JSON.stringify(res.err)}) }
    if (res.data.user && typeof storage === 'object') { 
      await storage.set(userKey, JSON.stringify(userInfo))
    }
    console.log('登录成功，保存用户信息', res)
    return res
  }
  /**
   * 退出登录
   */
  logout() {
    storage.delete('user')
    router.push({
      uri: '/Login'
    })
  }
}

export {
  User,
}
