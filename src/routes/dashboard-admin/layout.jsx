import { useAtom } from 'jotai'
import { CookieKeys, CookieStorage } from '../../utils/cookie'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import { userAtom } from '../../atom/user'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { PATH } from '../../utils/constant/_path'

export default function DashboardAdminLayout({ children }) {
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

    if (decoded.role !== 'ADMIN') {
      navigate(PATH.DASHBOARD)
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
