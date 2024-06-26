import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './auth/login'

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
