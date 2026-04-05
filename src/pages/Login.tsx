import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, Phone, ShieldCheck, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const otpInputs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus()
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }
    if (otp.some(digit => !digit)) {
      toast.error('Please enter the full 6-digit OTP')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Successfully logged in!')
      navigate('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-brand-gold/10 p-4 rounded-full mb-4">
            <Building2 className="w-10 h-10 text-brand-gold" />
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900">NovaPay</h1>
          <p className="text-slate-600 text-sm mt-1">Secure Digital Banking</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 px-1 block">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="tel"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
                className="w-full min-h-12 pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-xl focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:border-brand-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 px-1 block">
              Enter OTP
            </label>
            <div className="grid grid-cols-6 gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpInputs.current[index] = el }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full min-w-0 aspect-square max-w-14 h-12 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all"
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-12 rounded-xl transition-all shadow-lg shadow-brand-gold/10"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>

          <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            OTP provided by your administrator
          </p>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <Link 
            to="/admin/login" 
            className="text-slate-600 hover:text-brand-gold text-sm transition-colors"
          >
            Admin? Login here
          </Link>
        </div>
      </div>
    </div>
  )
}
