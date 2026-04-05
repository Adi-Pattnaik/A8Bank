import { useState } from 'react'
import { Coins, Send, ArrowDownLeft, ArrowUpRight, History, MoreHorizontal } from 'lucide-react'
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
import { tokenTransactions } from '@/lib/dummyData'
import { toast } from 'sonner'

export default function ITokens() {
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)
  const [sendLoading, setSendLoading] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    setSendLoading(true)
    setTimeout(() => {
      setSendLoading(false)
      setIsSendDialogOpen(false)
      toast.success('Tokens sent successfully!')
    }, 1500)
  }

  const stats = [
    { label: 'Total Balance', value: '1,240 iTK', icon: Coins, color: 'text-brand-gold' },
    { label: 'Total Sent', value: '250 iTK', icon: ArrowUpRight, color: 'text-red-400' },
    { label: 'Total Received', value: '1,800 iTK', icon: ArrowDownLeft, color: 'text-green-400' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-5 h-5 text-brand-gold" />
            <span className="text-brand-gold font-bold text-sm tracking-widest uppercase">Portfolio</span>
          </div>
          <h1 className="font-display text-3xl font-bold">iTokens</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-4 py-2 text-lg font-bold rounded-xl">
            1,240 iTK
          </Badge>
          
          <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-12 rounded-xl px-6">
                <Send className="w-4 h-4 mr-2" />
                Send Tokens
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-slate-200 max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-slate-900">Send iTokens</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Transfer tokens instantly to any NovaPay user via their phone number.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSend} className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 block">Recipient Phone</label>
                  <Input 
                    placeholder="9876543210" 
                    className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-gold"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 block">Amount (iTK)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-gold"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 block">Note (Optional)</label>
                  <Input 
                    placeholder="For dinner tonight..." 
                    className="w-full min-h-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <DialogFooter className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={sendLoading}
                    className="w-full bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-12 rounded-xl"
                  >
                    {sendLoading ? 'Processing...' : 'Confirm Transfer'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white border-slate-200 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-brand-gold/5 transition-all" />
          </Card>
        ))}
      </div>

      <Card className="bg-white border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-600" />
            <h3 className="font-bold text-slate-900">Transaction History</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="px-6 py-4 h-12 text-slate-600 font-bold tracking-wider uppercase text-xs min-w-[100px]">Date</TableHead>
              <TableHead className="px-6 py-4 h-12 text-slate-600 font-bold tracking-wider uppercase text-xs min-w-[80px]">Type</TableHead>
              <TableHead className="px-6 py-4 h-12 text-slate-600 font-bold tracking-wider uppercase text-xs min-w-[100px]">Amount</TableHead>
              <TableHead className="px-6 py-4 h-12 text-slate-600 font-bold tracking-wider uppercase text-xs text-right min-w-[90px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenTransactions.map((tx) => (
              <TableRow key={tx.id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="px-6 py-4 font-medium text-sm text-slate-700">{tx.date}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tx.type === 'Received' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm text-slate-900">{tx.type}</span>
                  </div>
                </TableCell>
                <TableCell className={`px-6 py-4 font-bold ${tx.type === 'Received' ? 'text-green-600' : 'text-slate-900'}`}>
                  {tx.amount}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Badge className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border-none",
                    tx.status === 'Success' ? 'bg-green-500/10 text-green-400' : 
                    tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 
                    'bg-red-500/10 text-red-400'
                  )}>
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
