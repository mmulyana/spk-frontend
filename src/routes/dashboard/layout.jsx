import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='ml-[280px] p-4 pt-14'>{children}</div>
    </>
  )
}
