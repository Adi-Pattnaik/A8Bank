import { useState, useMemo } from 'react'
import { QrCode, Copy, Upload, ShieldCheck, CheckCircle2, Building2, User, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { upiList, bankAccounts } from '@/lib/dummyData'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function UPI() {
  const [selectedQR] = useState(() => upiList[Math.floor(Math.random() * upiList.length)])
  const [selectedBank] = useState(() => bankAccounts[Math.floor(Math.random() * bankAccounts.length)])
  const [uploading, setUploading] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      toast.success('Payment screenshot uploaded successfully!')
    }, 2000)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <QrCode className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-bold text-sm tracking-widest uppercase">Instant Pay</span>
        </div>
        <h1 className="font-display text-3xl font-bold">UPI Payment</h1>
      </header>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0" />
        <p className="text-yellow-200/80 text-xs">
          <span className="font-bold text-yellow-500">Security Note:</span> New QR and bank details are assigned each session for your security. Do not save these for future use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code Card */}
        <Card className="bg-white border-slate-200 p-8 rounded-3xl flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-900">Scan QR Code</h3>
            <Badge className="bg-green-500/10 text-green-400 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              {selectedQR.label}
            </Badge>
          </div>
          
          <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-black/50 mb-8 transform hover:scale-105 transition-transform duration-500">
            <img 
              src={selectedQR.url} 
              alt="Payment QR" 
              className="w-48 h-48 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-2xl mb-8">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Scan to pay instantly</span>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-slate-200 hover:bg-slate-50 h-12 rounded-xl text-slate-700 hover:text-slate-900"
            onClick={() => copyToClipboard('kiranakarpvtltd@kotak')}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy UPI ID
          </Button>
        </Card>

        {/* Bank Account Card */}
        <Card className="bg-white border-slate-200 p-8 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-8">Bank Details</h3>
          
          <div className="space-y-4">
            {[
              { label: 'Merchant Name', value: selectedBank.name, icon: User },
              { label: 'Account Number', value: `••••••••${selectedBank.account.slice(-4)}`, realValue: selectedBank.account, icon: CreditCard },
              { label: 'IFSC Code', value: selectedBank.ifsc, icon: ShieldCheck },
              { label: 'Bank Name', value: selectedBank.bank, icon: Building2 },
            ].map((item) => (
              <div key={item.label} className="group bg-slate-50 p-4 rounded-2xl flex justify-between items-center hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-brand-muted group-hover:text-brand-gold transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-brand-muted hover:text-brand-gold"
                  onClick={() => copyToClipboard(item.realValue || item.value)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="bg-white border-slate-200 p-12 rounded-3xl border-2 border-dashed border-slate-200 hover:border-brand-gold/30 transition-all group overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-brand-gold/10 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
            <Upload className="w-8 h-8 text-brand-gold" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">Upload Payment Screenshot</h3>
          <p className="text-slate-600 text-sm max-w-md mb-8">
            Please upload a clear screenshot of your payment confirmation to speed up the verification process.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <label className="cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                onChange={handleUpload}
                disabled={uploading}
              />
              <div className={cn(
                "bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-12 rounded-xl px-8 flex items-center shadow-lg shadow-brand-gold/10 transition-all",
                uploading && "opacity-50 cursor-not-allowed"
              )}>
                {uploading ? "Uploading..." : "Select File"}
              </div>
            </label>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Supports JPG, PNG (Max 5MB)</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
