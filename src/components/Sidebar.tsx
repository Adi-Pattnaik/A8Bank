import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Coins, 
  DollarSign, 
  QrCode, 
  TrendingUp, 
  Pickaxe, 
  LogOut,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Coins, label: 'iTokens', path: '/home/itokens' },
    { icon: DollarSign, label: 'USDT', path: '/home/usdt' },
    { icon: QrCode, label: 'UPI', path: '/home/upi' },
    { icon: TrendingUp, label: 'Buy / Sell', path: '/home/buysell' },
    { icon: Pickaxe, label: 'Mine', path: '/home/mine' },
  ]

  return (
    <aside className="bg-brand-card/95 backdrop-blur-sm border-r border-slate-200/80 w-64 h-screen flex flex-col p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 p-2.5 rounded-xl transition-all duration-300 hover:from-brand-gold/30 hover:to-brand-gold/10 group/logo">
          <Building2 className="w-6 h-6 text-brand-gold group-hover/logo:scale-110 transition-transform" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-slate-900 leading-tight">
            NovaPay
          </h1>
          <p className="text-brand-muted text-xs">Digital Banking</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden pr-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/home' && location.pathname === '/home/')
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                "border border-transparent",
                isActive
                  ? "bg-slate-900 text-white shadow-sm border-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-100"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-gold rounded-r-full" />
              )}
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-all duration-200",
                isActive ? "bg-white/10" : "bg-transparent group-hover:bg-slate-200/60"
              )}>
                <item.icon
                  className={cn(
                    "w-[18px] h-[18px] shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-800"
                  )}
                />
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Separator className="bg-slate-200 mb-6" />
        <div className="flex items-center justify-between px-2 py-1 rounded-xl hover:bg-slate-50/80 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white/50">
              AS
            </div>
            <div>
              <p className="text-sm font-semibold">Aryan Sharma</p>
              <p className="text-xs text-brand-muted">Verified User</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/login')}
            className="text-brand-muted hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:shadow-sm"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
