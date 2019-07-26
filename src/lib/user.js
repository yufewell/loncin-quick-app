import storage from './storage'
import request from './request'
import prompt from '@system.prompt'
const userKey = 'user'

export default class User {
  // 判断用户是否登录
  static isLogined() {
    const storageUser = storage.get(userKey)
    return !!storageUser
  }
  constructor() {
  }
  /**
   * 获取本地storage保存的用户信息
   */
  getLocal() {
    const storageUser = storage.get(userKey);
    if (storageUser === null) { throw new Error('用户未登录') }
    return JSON.parse(storageUser)
  }
  /**
   * 注册并登录保存用户到获取本地storage保存的用户信息
   */
  async login(name, phone, code) {
    const res = await request.post('login', { name, phone, captcha: code })
    console.log('login', res)
    if (res.err && !res.code) { return prompt.showToast({ message: JSON.stringify(res.err)}) }
    if (typeof storage === 'object') { await storage.set('user', JSON.stringify(res.data)) }
    console.log('登录成功，保存用户信息', res)
    return res
  }
  /**
   * 退出登录
   */
  logout() {
    storage.delete('user')
  }
}

export {
  User,
}
