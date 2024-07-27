import { useAtom } from 'jotai'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import { userAtom } from '../../atom/user'
import { useEffect } from 'react'
import { CookieKeys, CookieStorage } from '../../utils/cookie'
import { jwtDecode } from 'jwt-decode'
import { PATH } from '../../utils/constant/_path'
import { useNavigate } from 'react-router-dom'

export default function DashboardLayout({ children }) {
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) return

    const token = CookieStorage.get(CookieKeys.AuthToken)

    if (!token) {
      navigate(PATH.LOGIN)
      return
    }

    const decoded = jwtDecode(token)
    setUser({ nama: decoded.nama, email: decoded.email, role: decoded.role })
  }, [user])

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='ml-[280px] p-4 pt-14'>{children}</div>
    </>
  )
}
