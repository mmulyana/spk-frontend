import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoaderScreen from '../components/loader'
import { PATH } from '../utils/constant/_path'
const Login = lazy(() => import('./auth/login'))
const Register = lazy(() => import('./auth/register'))
const Dashboard = lazy(() => import('./dashboard/index'))
const Employee = lazy(() => import('./dashboard/employee/index'))
const Criteria = lazy(() => import('./dashboard/criteria/index'))
const Setting = lazy(() => import('./dashboard/settings/index'))
const Account = lazy(() => import('./dashboard/settings/account/index'))

const useRoutes = () => [
  {
    path: PATH.LOGIN || '/',
    component: <Login />,
  },
  {
    path: PATH.REGISTER,
    component: <Register />,
  },
  {
    path: PATH.DASHBOARD,
    component: <Dashboard />,
  },
  {
    path: PATH.DASHBOARD_EMPLOYEE,
    component: <Employee />,
  },
  {
    path: PATH.DASHBOARD_CRITERIA,
    component: <Criteria />,
  },
  {
    path: PATH.DASHBOARD_ADMIN_SETTINGS,
    component: <Setting />,
  },
  {
    path: PATH.DASHBOARD_ADMIN_ACCOUNT,
    component: <Account />,
  },
]

export default function Routers() {
  const data = useRoutes()
  return (
    <BrowserRouter>
      <Routes>
        {data.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Suspense fallback={<LoaderScreen />}>{route.component}</Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
