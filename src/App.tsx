import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/home/Home'
import ITokens from './pages/home/ITokens'
import USDT from './pages/home/USDT'
import UPI from './pages/home/UPI'
import BuySell from './pages/home/BuySell'
import Mine from './pages/home/Mine'
import HomeLayout from './components/HomeLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOTP from './pages/admin/AdminOTP'
import AdminUPI from './pages/admin/AdminUPI'
import { Toaster } from './components/ui/sonner'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="itokens" element={<ITokens />} />
          <Route path="usdt" element={<USDT />} />
          <Route path="upi" element={<UPI />} />
          <Route path="buysell" element={<BuySell />} />
          <Route path="mine" element={<Mine />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/otp" element={<AdminOTP />} />
        <Route path="/admin/upi" element={<AdminUPI />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
