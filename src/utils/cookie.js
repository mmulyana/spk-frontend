import Cookies from 'universal-cookie'

export const CookieKeys = {
  AuthToken: 'authToken',
}

const cookies = new Cookies()

const CookieOptions = {
  path: '/',
  secure: true,
}

export const CookieStorage = {
  set: (key, data, options) => {
    return cookies.set(key, data, { ...CookieOptions, ...options })
  },
  get: (key, options) => {
    return cookies.get(key, { ...CookieOptions, ...options })
  },
  remove: (key, options) => {
    return cookies.remove(key, { ...CookieOptions, ...options })
  },
}
