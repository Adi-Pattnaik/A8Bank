import { useState, useEffect } from 'react'
import { Pickaxe, Zap, Activity, Database, Play, Pause, Gift } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { miningStats } from '@/lib/dummyData'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Mine() {
  const [isActive, setIsActive] = useState(true)
  const [logs, setLogs] = useState([
    { time: '14:32:01', msg: 'Block #48291 processed — +0.000008 iTK' },
    { time: '14:31:45', msg: 'Hash validated successfully' },
    { time: '14:31:30', msg: 'Searching for next nonse...' },
    { time: '14:31:12', msg: 'Mining difficulty adjusted to 14.5T' },
    { time: '14:30:55', msg: 'System integrity verified' },
  ])

  const handleClaim = () => {
    toast.success('0.00042 iTK claimed and added to your wallet!')
  }

  const toggleMining = () => {
    setIsActive(!isActive)
    toast.info(isActive ? 'Mining paused' : 'Mining resumed')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-bold text-sm tracking-widest uppercase">Earning</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Mining Rewards</h1>
        </div>

        <Card className={cn(
          "px-6 py-3 rounded-2xl border-white/10 flex items-center gap-4 transition-all duration-500",
          isActive ? "bg-green-500/5 ring-2 ring-green-500/20" : "bg-white/5 opacity-60"
        )}>
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-green-500 animate-pulse" : "bg-brand-muted")} />
            <span className={cn("text-xs font-bold uppercase tracking-wider", isActive ? "text-green-400" : "text-brand-muted")}>
              {isActive ? "Mining Active" : "Mining Paused"}
            </span>
          </div>
          <Button
            size="sm"
            onClick={toggleMining}
            className={cn(
              "rounded-lg px-4 h-8 font-bold text-[10px] uppercase",
              isActive ? "bg-white/10 hover:bg-white/20 text-white" : "bg-brand-gold hover:bg-brand-gold-light text-black"
            )}
          >
            {isActive ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
            {isActive ? "Pause" : "Resume"}
          </Button>
        </Card>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Hash Rate', value: miningStats.hashRate, icon: Activity, color: 'text-blue-400' },
          { label: 'Earnings Today', value: miningStats.earningsToday, icon: Gift, color: 'text-brand-gold' },
          { label: 'Total Mined', value: miningStats.totalMined, icon: Database, color: 'text-purple-400' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-brand-card border-white/[0.08] p-6 rounded-2xl group hover:border-brand-gold/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="border-white/5 text-[10px] text-brand-muted">Real-time</Badge>
            </div>
            <p className="text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-display font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress & Claim */}
        <Card className="bg-brand-card border-white/[0.08] p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold">Daily Progress</h3>
              <p className="text-2xl font-bold text-brand-gold">{miningStats.progress}%</p>
            </div>
            <div className="bg-white/10 rounded-full h-4 overflow-hidden mb-8">
              <div
                className="bg-gradient-to-r from-brand-gold to-brand-gold-light h-full rounded-full transition-all duration-1000"
                style={{ width: `${miningStats.progress}%` }}
              />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-brand-muted">Hardware Status</span>
                <span className="text-green-400 font-bold">Optimal</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-brand-muted">Pool Efficiency</span>
                <span className="text-white font-bold">99.8%</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-brand-muted">Current Block</span>
                <span className="text-white font-bold font-mono">#48292</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleClaim}
            className="w-full bg-brand-gold hover:bg-brand-gold-light text-black font-bold h-14 rounded-2xl text-lg shadow-xl shadow-brand-gold/20"
          >
            Claim Rewards
          </Button>
        </Card>

        {/* Live Logs */}
        <Card className="bg-brand-card border-white/[0.08] p-0 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <CPU className="w-5 h-5 text-brand-muted" /> */}
              <h3 className="text-lg font-bold">System Log</h3>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
          </div>
          <div className="p-6 font-mono text-xs space-y-3 h-[300px] overflow-y-auto scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-4 group">
                <span className="text-brand-muted/40 shrink-0 group-hover:text-brand-gold/40 transition-colors">[{log.time}]</span>
                <span className={cn(
                  "transition-colors",
                  log.msg.includes('+') ? "text-green-400 font-bold" : "text-brand-muted group-hover:text-white"
                )}>
                  {log.msg}
                </span>
              </div>
            ))}
            <div className="animate-pulse flex gap-4">
              <span className="text-brand-gold/40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="text-brand-gold font-bold">Synchronizing with node network...</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
