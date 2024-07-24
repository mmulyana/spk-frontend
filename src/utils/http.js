import axios from 'axios'
import { CookieKeys, CookieStorage } from './cookie'

const http = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    }

    if (config.data && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
