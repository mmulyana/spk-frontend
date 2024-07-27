import { useEffect } from 'react'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import { useAtom } from 'jotai'
import { userAtom } from '../../atom/user'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../utils/constant/_path'
import { CookieKeys, CookieStorage } from '../../utils/cookie'

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
    if (decoded?.role !== 'MANAGER') {
      navigate(PATH.DASHBOARD_ADMIN_ACCOUNT)
      return
    }

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
