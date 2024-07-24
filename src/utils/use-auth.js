import { useNavigate } from 'react-router-dom'
import { URL } from './constant/_urls'
import http from './http'
import { useMutation } from 'react-query'
import { PATH } from './constant/_path'
import { useSetAtom } from 'jotai'
import { userAtom } from '../atom/user'
import { toast } from 'sonner'
import { CookieKeys, CookieStorage } from './cookie'

const fetcherLogin = async (payload) => {
  return http.post(URL.LOGIN, payload)
}
const fetcherRegister = async (payload) => {
  return http.post(URL.REGISTER, payload)
}

export const useAuth = () => {
  const navigate = useNavigate()
  const setUser = useSetAtom(userAtom)

  const { mutate: login } = useMutation({
    mutationFn: fetcherLogin,
    onError: (error) => {
      toast.error('Login gagal silahkan ulangi')
    },
    onSuccess: (data) => {
      const payload = {
        email: data.data.email,
        role: data.data.role,
      }
      setUser(payload)
      CookieStorage.set(CookieKeys.AuthToken, data.data.data.token)
      navigate(PATH.DASHBOARD)
      toast.success('Login berhasil')
    },
  })

  const { mutate: register } = useMutation({
    mutationFn: fetcherRegister,
    onError: (error) => {
      toast.error('Register gagal silahkan ulangi')
    },
    onSuccess: (data) => {
      navigate(PATH.LOGIN)
      toast.success('Register berhasil')
    },
  })

  return { login, register }
}
