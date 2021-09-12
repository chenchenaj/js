// 在 utils 的 auth.js 文件中封装下方的内容，使用的时候直接引入调用即可
const TOKEN_KEY = 'token'
const storage = window.localStorage

export const getToken = () => {
  return storage.getItem(TOKEN_KEY)
}

export const setToken = token => {
  return storage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  return storage.removeItem(TOKEN_KEY)
}