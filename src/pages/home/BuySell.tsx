import { useState } from 'react'
import { TrendingUp, TrendingDown, History, Info, Bitcoin, Coins as CoinIcon, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { orders } from '@/lib/dummyData'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function BuySell() {
  const [selectedAsset, setSelectedAsset] = useState('BTC')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const assets = [
    { id: 'BTC', name: 'Bitcoin', price: '$43,200', icon: Bitcoin, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'ETH', name: 'Ethereum', price: '$2,800', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'iTK', name: 'iToken', price: '$0.42', icon: CoinIcon, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  ]

  const currentAsset = assets.find(a => a.id === selectedAsset)

  const handleAction = (type: 'Buy' | 'Sell') => {
    if (!amount) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success(`${type} order for ${amount} ${selectedAsset} successful!`)
      setAmount('')
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <span className="text-orange-400 font-bold text-sm tracking-widest uppercase">Trading</span>
        </div>
        <h1 className="font-display text-3xl font-bold">Exchange</h1>
      </header>

      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="bg-white border border-slate-200 p-1 h-14 rounded-2xl mb-8">
          <TabsTrigger value="buy" className="rounded-xl px-12 data-[state=active]:bg-brand-gold data-[state=active]:text-black font-bold h-full transition-all">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="rounded-xl px-12 data-[state=active]:bg-brand-gold data-[state=active]:text-black font-bold h-full transition-all">
            Sell
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {assets.map((asset) => (
            <Card
              key={asset.id}
              onClick={() => setSelectedAsset(asset.id)}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 rounded-2xl border-slate-200 relative overflow-hidden group",
                selectedAsset === asset.id 
                  ? "bg-brand-gold/10 border-brand-gold/50 shadow-lg shadow-brand-gold/5" 
                  : "bg-white hover:bg-slate-50"
              )}
            >
              <div className="flex justify-between items-start relative z-10">
                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", asset.bg, asset.color)}>
                  <asset.icon className="w-6 h-6" />
                </div>
                {selectedAsset === asset.id && (
                  <Badge className="bg-brand-gold text-black border-none animate-in zoom-in duration-300">Selected</Badge>
                )}
              </div>
              <div className="mt-6 relative z-10">
                <p className="text-slate-900 font-bold text-lg">{asset.name}</p>
                <p className="text-slate-600 text-sm">{asset.price}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-brand-gold/5" />
            </Card>
          ))}
        </div>

        <TabsContent value="buy">
          <Card className="bg-white border-slate-200 p-8 rounded-3xl">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600 uppercase px-1 block">Amount to Spend (USD)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                  <Input 
                    type="number"
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full min-h-16 pl-10 h-16 rounded-2xl text-2xl font-bold bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-gold"
                  />
                </div>
              </div>
              
              <div className="bg-slate-50 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Asset Price</span>
                  <span className="font-bold text-slate-900">{currentAsset?.price}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-slate-600">You will receive</span>
                  <span className="font-bold text-brand-gold">
                    {amount ? (parseFloat(amount) / parseFloat(currentAsset?.price.replace('$', '').replace(',', '') || '1')).toFixed(6) : '0.00'} {selectedAsset}
                  </span>
                </div>
              </div>

              <Button 
                onClick={() => handleAction('Buy')}
                disabled={loading || !amount}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-16 rounded-2xl text-lg shadow-xl shadow-brand-gold/10"
              >
                {loading ? 'Processing...' : `Confirm Buy ${selectedAsset}`}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sell">
          <Card className="bg-white border-slate-200 p-8 rounded-3xl">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600 uppercase px-1 block">Amount to Sell ({selectedAsset})</label>
                <Input 
                  type="number"
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full min-h-16 h-16 rounded-2xl text-2xl font-bold bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-gold"
                />
              </div>
              
              <div className="bg-slate-50 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Asset Price</span>
                  <span className="font-bold text-slate-900">{currentAsset?.price}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-slate-600">Total Payout</span>
                  <span className="font-bold text-brand-gold">
                    ${amount ? (parseFloat(amount) * parseFloat(currentAsset?.price.replace('$', '').replace(',', '') || '0')).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>

              <Button 
                onClick={() => handleAction('Sell')}
                disabled={loading || !amount}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold h-16 rounded-2xl text-lg shadow-xl shadow-red-500/10"
              >
                {loading ? 'Processing...' : `Confirm Sell ${selectedAsset}`}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-white border-slate-200 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-600" />
          <h3 className="text-xl font-bold text-slate-900">Order History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs min-w-[100px]">Date</TableHead>
              <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs min-w-[80px]">Asset</TableHead>
              <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs min-w-[80px]">Type</TableHead>
              <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs min-w-[100px]">Amount</TableHead>
              <TableHead className="text-slate-600 h-12 px-6 py-4 font-bold uppercase text-xs text-right min-w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="px-6 py-4 text-sm font-medium text-slate-700">{order.date}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{order.asset}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold border-none",
                    order.type === 'Buy' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-500"
                  )}>
                    {order.type}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 font-mono font-bold text-slate-900">{order.amount}</TableCell>
                <TableCell className="text-right px-6 py-4">
                  <Badge className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border-none",
                    order.status === 'Completed' ? 'bg-white/10 text-white' : 
                    order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 
                    'bg-red-500/10 text-red-400'
                  )}>
                    {order.status}
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
