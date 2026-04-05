import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    setTimeout(() => {
      if (email === 'admin@novapay.com' && password === 'admin123') {
        setLoading(false)
        toast.success('Admin access granted')
        navigate('/admin/dashboard')
      } else {
        setLoading(false)
        setError(true)
        toast.error('Invalid credentials')
        setTimeout(() => setError(false), 500)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className={cn(
        "bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-xl transition-all duration-300",
        error && "animate-shake border-red-500"
      )}>
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#FF6B35]/10 p-5 rounded-3xl mb-4">
            <Shield className="w-10 h-10 text-[#FF6B35]" />
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Admin Portal</h1>
          <p className="text-slate-600 text-sm mt-2 font-medium">Verify your authority</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 px-1 block">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF6B35] transition-colors" />
              <Input
                type="email"
                placeholder="admin@novapay.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full min-h-14 pl-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-14 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:border-[#FF6B35]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 px-1 block">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF6B35] transition-colors" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-14 pl-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-14 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:border-[#FF6B35]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#ff8558] text-white font-bold h-14 rounded-2xl transition-all shadow-xl shadow-[#FF6B35]/20 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Authorize Access
                <Shield className="w-4 h-4 opacity-50" />
              </span>
            )}
          </Button>

          <div className="text-center pt-4">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to User Login
            </Link>
          </div>
        </form>
      </div>
      
      {/* Visual noise for premium feel */}
      <div className="fixed inset-0 pointer-events-none opacity-20 transition-opacity">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>
    </div>
  )
}
