import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoaderScreen from '../components/loader'
const Login = lazy(() => import('./auth/login'))
const Register = lazy(() => import('./auth/register'))

const useRoutes = () => [
  {
    path: '/',
    component: <Login />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/register',
    component: <Register />,
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
