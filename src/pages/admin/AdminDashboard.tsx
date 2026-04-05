import AdminSidebar from '@/components/AdminSidebar'
import { 
  Users, 
  Activity, 
  QrCode, 
  Building2, 
  ArrowUpRight, 
  KeyRound, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const stats = [
    { label: 'Total Users', value: '5', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Sessions', value: '3', icon: Activity, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'UPI Entries', value: '3', icon: QrCode, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Bank Accounts', value: '3', icon: Building2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ]

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF6B35]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="mb-12 relative z-10">
          <div className="flex items-center gap-2 mb-2 text-[#FF6B35]">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">System Overview</span>
          </div>
          <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-brand-card border-white/[0.08] p-8 rounded-3xl group hover:border-[#FF6B35]/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-brand-muted" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">{stat.label}</p>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <Card className="bg-brand-card border-white/[0.08] p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <KeyRound className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="bg-blue-500/10 w-fit p-4 rounded-3xl mb-8">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Access Control</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-10 max-w-sm">
                Manage user access, update login OTPs, and monitor user security status.
              </p>
              <Button 
                onClick={() => navigate('/admin/otp')}
                className="bg-[#FF6B35] hover:bg-[#ff8558] text-white font-bold h-14 px-8 rounded-2xl shadow-xl shadow-[#FF6B35]/20"
              >
                Manage OTPs
              </Button>
            </div>
          </Card>

          <Card className="bg-brand-card border-white/[0.08] p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <QrCode className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="bg-orange-500/10 w-fit p-4 rounded-3xl mb-8">
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Financial Settings</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-10 max-w-sm">
                Configure UPI IDs and Bank account details that are displayed to users during payment.
              </p>
              <Button 
                onClick={() => navigate('/admin/upi')}
                className="bg-white text-black hover:bg-white/90 font-bold h-14 px-8 rounded-2xl shadow-xl shadow-white/5"
              >
                Manage UPI & Banks
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
