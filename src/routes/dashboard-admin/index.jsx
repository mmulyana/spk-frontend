import { useTitle } from '../../utils/useTitle'
import DashboardAdminLayout from './layout'

export default function MainDashboard() {
  useTitle('Dashboard Admin')

  return <DashboardAdminLayout></DashboardAdminLayout>
}
