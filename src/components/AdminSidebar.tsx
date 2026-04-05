import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  KeyRound, 
  QrCode, 
  Users,
  LogOut,
  Shield,
  ArrowUpRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: KeyRound, label: 'Manage OTPs', path: '/admin/otp' },
    { icon: QrCode, label: 'UPI & Banks', path: '/admin/upi' },
    { icon: Users, label: 'Manage Users', path: '/admin/dashboard' }, // Links back to dashboard for now
  ]

  const accentColor = "#FF6B35"

  return (
    <aside className="bg-white border-r border-slate-200 w-72 h-screen flex flex-col p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="bg-[#FF6B35]/10 p-3 rounded-2xl">
          <Shield className="w-8 h-8 text-[#FF6B35]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-slate-900 leading-tight">NovaPay</h1>
            <Badge className="bg-[#FF6B35] text-white border-none text-[8px] h-4">ADMIN</Badge>
          </div>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-1">Central Console</p>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200 group",
                isActive 
                  ? "bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-110", isActive ? "text-[#FF6B35]" : "text-slate-500 group-hover:text-slate-900")} />
                {item.label}
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-slate-50 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#ff9770] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#FF6B35]/20">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Admin Console</p>
              <p className="text-xs text-green-600 font-bold uppercase tracking-wider">System Active</p>
            </div>
          </div>
          <Button 
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 border-none h-11 rounded-xl text-xs font-bold transition-colors"
            onClick={() => navigate('/admin/login')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout System
          </Button>
        </div>
        
        <p className="text-xs text-slate-400 text-center font-bold tracking-widest uppercase">
          v2.4.0 Stable Build
        </p>
      </div>
    </aside>
  )
}
