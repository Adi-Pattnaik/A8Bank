import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Coins, 
  DollarSign, 
  QrCode, 
  TrendingUp, 
  Pickaxe 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BottomNav() {
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Coins, label: 'Coins', path: '/home/itokens' },
    { icon: DollarSign, label: 'USDT', path: '/home/usdt' },
    { icon: QrCode, label: 'UPI', path: '/home/upi' },
    { icon: TrendingUp, label: 'Trade', path: '/home/buysell' },
    { icon: Pickaxe, label: 'Mine', path: '/home/mine' },
  ]

  return (
    <nav className="bg-brand-card/95 backdrop-blur-md border-t border-slate-200/80 flex justify-around items-center px-2 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/home' && location.pathname === '/home/')
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "group flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 min-w-[56px]",
              "hover:bg-slate-100/80 active:scale-95",
              isActive && "bg-slate-100"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300",
              isActive ? "bg-brand-gold/20 text-brand-gold" : "text-brand-muted group-hover:bg-slate-100"
            )}>
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "text-brand-gold" : "text-brand-muted group-hover:text-slate-700 group-hover:scale-110"
                )} 
              />
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-colors",
              isActive ? "text-slate-900" : "text-brand-muted"
            )}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
