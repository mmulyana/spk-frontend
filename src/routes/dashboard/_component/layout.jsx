import Sidebar from "../../../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar/>
      <div className='ml-[280px] p-4'>{children}</div>
    </>
  )
}
