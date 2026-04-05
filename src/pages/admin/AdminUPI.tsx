import { useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { QrCode, Building2, Plus, Trash2, Globe, ShieldCheck, CreditCard, Landmark } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { upiList as initialUpi, bankAccounts as initialBanks } from '@/lib/dummyData'
import { toast } from 'sonner'

export default function AdminUPI() {
  const [upiList, setUpiList] = useState(initialUpi)
  const [banks, setBanks] = useState(initialBanks)
  
  // New UPI state
  const [upiLabel, setUpiLabel] = useState('')
  const [upiId, setUpiId] = useState('')
  const [isUpiDialogOpen, setIsUpiDialogOpen] = useState(false)

  // New Bank state
  const [bankForm, setBankForm] = useState({ name: '', account: '', ifsc: '', bank: '' })
  const [isBankDialogOpen, setIsBankDialogOpen] = useState(false)

  const handleAddUpi = () => {
    const newUpi = {
      id: Date.now(),
      label: upiLabel,
      url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${upiId}`
    }
    setUpiList([...upiList, newUpi])
    toast.success('UPI QR Code added')
    setIsUpiDialogOpen(false)
    setUpiLabel('')
    setUpiId('')
  }

  const handleAddBank = () => {
    setBanks([...banks, { ...bankForm, id: Date.now() }])
    toast.success('Bank account added')
    setIsBankDialogOpen(false)
    setBankForm({ name: '', account: '', ifsc: '', bank: '' })
  }

  const deleteUpi = (id: number) => {
    setUpiList(upiList.filter(u => u.id !== id))
    toast.error('UPI QR Code deleted')
  }

  const deleteBank = (id: number) => {
    setBanks(banks.filter(b => b.id !== id))
    toast.error('Bank account removed')
  }

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden text-slate-900">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-orange-400">
              <QrCode className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Financial Infrastructure</span>
            </div>
            <h1 className="font-display text-4xl font-bold">UPI & Bank Console</h1>
          </div>
          
          <div className="flex gap-4">
            <Dialog open={isUpiDialogOpen} onOpenChange={setIsUpiDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-white/90 font-bold h-12 rounded-xl px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200 rounded-2xl max-w-md">
                <DialogHeader className="items-center text-center">
                  <div className="bg-brand-gold/10 p-5 rounded-3xl mb-4">
                    <QrCode className="w-10 h-10 text-brand-gold" />
                  </div>
                  <DialogTitle className="text-2xl font-display font-bold text-slate-900">Generate Payment QR</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Label (e.g. UPI 1)</label>
                    <Input 
                      value={upiLabel} 
                      onChange={e => setUpiLabel(e.target.value)}
                      placeholder="Enter label"
                      className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">UPI ID</label>
                    <Input 
                      value={upiId} 
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="merchant@upi"
                      className="w-full min-h-12 h-12 rounded-xl font-mono bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddUpi} className="w-full bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-12 rounded-xl">
                    Generate and Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isBankDialogOpen} onOpenChange={setIsBankDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF6B35] hover:bg-[#ff8558] text-white font-bold h-12 rounded-xl px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bank Account
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200 rounded-2xl max-w-md">
                <DialogHeader className="items-center text-center">
                  <div className="bg-[#FF6B35]/10 p-5 rounded-3xl mb-4">
                    <Building2 className="w-10 h-10 text-[#FF6B35]" />
                  </div>
                  <DialogTitle className="text-2xl font-display font-bold text-slate-900">New Merchant Account</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Account Name</label>
                    <Input 
                      value={bankForm.name} 
                      onChange={e => setBankForm({...bankForm, name: e.target.value})}
                      placeholder="NovaPay Pvt Ltd"
                      className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Account No</label>
                    <Input 
                      value={bankForm.account} 
                      onChange={e => setBankForm({...bankForm, account: e.target.value})}
                      placeholder="1234567890"
                      className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">IFSC Code</label>
                    <Input 
                      value={bankForm.ifsc} 
                      onChange={e => setBankForm({...bankForm, ifsc: e.target.value})}
                      placeholder="HDFC0001234"
                      className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Bank Name</label>
                    <Input 
                      value={bankForm.bank} 
                      onChange={e => setBankForm({...bankForm, bank: e.target.value})}
                      placeholder="HDFC Bank"
                      className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddBank} className="w-full bg-[#FF6B35] hover:bg-[#ff8558] text-white font-bold h-12 rounded-xl">
                    Register Bank Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Globe className="w-5 h-5 text-brand-gold" />
            <h3 className="text-2xl font-bold">QR Infrastructure</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upiList.map((upi) => (
              <Card key={upi.id} className="bg-white border-slate-200 p-6 rounded-2xl flex flex-col items-center group relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteUpi(upi.id)}
                    className="text-slate-500 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-white p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black">
                  <img src={upi.url} alt={upi.label} className="w-32 h-32 rounded-lg" />
                </div>
                <p className="font-bold text-slate-900 mb-1">{upi.label}</p>
                <div className="flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Live System
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <Landmark className="w-5 h-5 text-[#FF6B35]" />
            <h3 className="text-2xl font-bold">Bank Accounts</h3>
          </div>
          <Card className="bg-white border-slate-200 rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="px-6 py-4 h-14 min-w-[180px] text-slate-600 font-bold uppercase tracking-wider text-xs">Merchant Name</TableHead>
                  <TableHead className="px-6 py-4 h-14 min-w-[140px] text-slate-600 font-bold uppercase tracking-wider text-xs">Account No</TableHead>
                  <TableHead className="px-6 py-4 h-14 min-w-[120px] text-slate-600 font-bold uppercase tracking-wider text-xs">IFSC</TableHead>
                  <TableHead className="px-6 py-4 h-14 min-w-[120px] text-slate-600 font-bold uppercase tracking-wider text-xs">Bank</TableHead>
                  <TableHead className="px-6 py-4 h-14 text-slate-600 font-bold uppercase tracking-wider text-xs text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banks.map((bank) => (
                  <TableRow key={bank.id} className="border-slate-200 hover:bg-slate-50 transition-colors group">
                    <TableCell className="px-6 py-5 font-bold text-slate-900 tracking-wide">{bank.name}</TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CreditCard className="w-4 h-4 shrink-0" />
                        <span className="font-mono">{bank.account}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5 font-mono text-slate-600">{bank.ifsc}</TableCell>
                    <TableCell className="px-6 py-5">
                      <Badge variant="outline" className="border-slate-200 text-slate-700 font-bold">{bank.bank}</Badge>
                    </TableCell>
                    <TableCell className="px-6 py-5 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteBank(bank.id)}
                        className="text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      </main>
    </div>
  )
}
