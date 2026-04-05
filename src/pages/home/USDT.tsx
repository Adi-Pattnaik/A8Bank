import { useState } from 'react'
import { DollarSign, ArrowRightLeft, History, Info, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usdtTransactions } from '@/lib/dummyData'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function USDT() {
  const [amount, setAmount] = useState('')
  const [swapLoading, setSwapLoading] = useState(false)

  const handleSwap = () => {
    if (!amount) return
    setSwapLoading(true)
    setTimeout(() => {
      setSwapLoading(false)
      toast.success('Swap initiated!')
      setAmount('')
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">Stablecoin</span>
        </div>
        <h1 className="font-display text-3xl font-bold">USDT Wallet</h1>
      </header>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-brand-gold to-[#e8940f] border-none p-8 rounded-3xl text-black shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-110 transition-transform">
          <DollarSign className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <p className="text-black/60 text-xs font-bold uppercase tracking-widest mb-1">Available Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold">$3,200.00</h2>
            <span className="text-xl font-bold opacity-60">USDT</span>
          </div>
          <div className="mt-8 flex gap-4">
            <Button variant="secondary" className="bg-black/10 hover:bg-black/20 text-black border-none font-bold rounded-xl px-6">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button variant="secondary" className="bg-black/10 hover:bg-black/20 text-black border-none font-bold rounded-xl px-6">
              Withdraw
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Swap Section */}
        <Card className="bg-white border-slate-200 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-brand-gold" />
              Swap Assets
            </h3>
            <Badge variant="outline" className="text-slate-600 border-slate-200 px-3 py-1">Zero Fee</Badge>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-600 uppercase px-1 block">From</label>
              <div className="flex gap-2">
                <Select defaultValue="usdt">
                  <SelectTrigger className="w-32 min-h-14 h-14 rounded-2xl bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-brand-gold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="itk">iTK</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 min-h-14 h-14 rounded-2xl text-xl font-bold bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-gold"
                />
              </div>
            </div>

            <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-brand-gold p-3 rounded-full shadow-lg shadow-brand-gold/20">
                <ArrowRightLeft className="w-5 h-5 text-black rotate-90" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-600 uppercase px-1 block">To</label>
              <div className="flex gap-2">
                <Select defaultValue="itk">
                  <SelectTrigger className="w-32 min-h-14 h-14 rounded-2xl bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-brand-gold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="itk">iTK</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  disabled 
                  placeholder="0.00" 
                  className="flex-1 min-h-14 h-14 rounded-2xl text-xl font-bold bg-slate-100 border-slate-200 text-slate-900"
                  value={amount ? (parseFloat(amount) * 42).toFixed(2) : ''}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600 text-xs">
                <Info className="w-3 h-3" />
                Exchange Rate
              </div>
              <p className="text-xs font-bold text-brand-gold">1 USDT ≈ 42 iTK</p>
            </div>

            <Button 
              onClick={handleSwap}
              disabled={swapLoading || !amount}
              className="w-full bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-14 rounded-2xl transition-all"
            >
              {swapLoading ? 'Swapping...' : 'Swap Now'}
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white border-slate-200 p-0 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center gap-2">
            <History className="w-5 h-5 text-slate-600" />
            <h3 className="text-xl font-bold text-slate-900">Wallet Activity</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs min-w-[120px]">Date</TableHead>
                <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs min-w-[120px]">Type</TableHead>
                <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs text-right min-w-[100px]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usdtTransactions.map((tx) => (
                <TableRow key={tx.id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                  <TableCell className="px-6 py-4 text-sm font-medium text-slate-700">{tx.date}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{tx.type}</span>
                      <Badge className={cn(
                        "mt-1 w-fit px-2 py-0.5 rounded-md text-[9px] uppercase font-bold",
                        tx.status === 'Success' ? 'bg-green-500/10 text-green-400' : 
                        tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 
                        'bg-red-500/10 text-red-400'
                      )}>
                        {tx.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6 py-4 font-mono font-bold text-slate-900">
                    {tx.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
