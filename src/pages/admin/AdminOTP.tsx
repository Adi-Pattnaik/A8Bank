import { useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { KeyRound, Eye, EyeOff, Edit, Info, ShieldCheck, User as UserIcon } from 'lucide-react'
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
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { users as initialUsers } from '@/lib/dummyData'
import { toast } from 'sonner'

export default function AdminOTP() {
  const [users, setUsers] = useState(initialUsers)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [newOtp, setNewOtp] = useState('')
  const [showOtp, setShowOtp] = useState<Record<number, boolean>>({})

  const toggleOtp = (id: number) => {
    setShowOtp(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleUpdateOtp = () => {
    if (newOtp.length !== 6) {
      toast.error('OTP must be exactly 6 digits')
      return
    }
    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, otp: newOtp } : u))
    toast.success(`OTP updated for ${editingUser.name}`)
    setEditingUser(null)
    setNewOtp('')
  }

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden text-slate-900">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-10">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <KeyRound className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Access Management</span>
          </div>
          <h1 className="font-display text-4xl font-bold">User OTPs</h1>
        </header>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 mb-12 flex items-start gap-4">
          <div className="bg-blue-500/20 p-3 rounded-2xl">
            <Info className="w-6 h-6 text-blue-400" />
          </div>
          <div className="max-w-2xl">
            <h4 className="font-bold text-white text-lg mb-1">Global Access Policy</h4>
            <p className="text-blue-200/60 text-sm leading-relaxed">
              Users log in with their assigned OTP every time. Update it here to change their access instantly. All changes are logged and synchronized across sessions.
            </p>
          </div>
        </div>

        <Card className="bg-white border-slate-200 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="px-6 py-4 h-14 min-w-[200px] text-slate-600 font-bold uppercase tracking-wider text-xs">User</TableHead>
                <TableHead className="px-6 py-4 h-14 min-w-[140px] text-slate-600 font-bold uppercase tracking-wider text-xs">Phone Number</TableHead>
                <TableHead className="px-6 py-4 h-14 min-w-[160px] text-slate-600 font-bold uppercase tracking-wider text-xs">Current OTP</TableHead>
                <TableHead className="px-6 py-4 h-14 text-slate-600 font-bold uppercase tracking-wider text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-slate-200 hover:bg-slate-50 transition-colors group">
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold group-hover:bg-[#FF6B35]/10 group-hover:text-[#FF6B35] transition-colors">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-slate-900">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="font-mono text-slate-600">{user.phone}</span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-lg tracking-widest bg-slate-100 px-4 py-2 rounded-xl text-slate-900">
                        {showOtp[user.id] ? user.otp : '••••••'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleOtp(user.id)}
                        className="text-slate-500 hover:text-slate-900"
                      >
                        {showOtp[user.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <Button 
                      onClick={() => setEditingUser(user)}
                      className="bg-white/5 hover:bg-[#FF6B35] text-white font-bold rounded-xl transition-all"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Update OTP
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="bg-white border-slate-200 max-w-md rounded-2xl p-8">
            <DialogHeader className="items-center text-center">
              <div className="bg-[#FF6B35]/10 p-5 rounded-3xl mb-4">
                <ShieldCheck className="w-10 h-10 text-[#FF6B35]" />
              </div>
              <DialogTitle className="text-2xl font-display font-bold text-slate-900">Update Account OTP</DialogTitle>
              <DialogDescription className="text-slate-600 mt-2">
                Set a new 6-digit access code for <span className="text-slate-900 font-bold">{editingUser?.name}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 px-1 block">New 6-Digit Code</label>
                <Input 
                  type="text"
                  maxLength={6}
                  value={newOtp}
                  onChange={(e) => setNewOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full min-h-14 h-14 text-center text-2xl font-mono font-bold tracking-[0.4em] rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:border-[#FF6B35]"
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex flex-col gap-3 w-full">
                <Button 
                  onClick={handleUpdateOtp}
                  className="w-full bg-[#FF6B35] hover:bg-[#ff8558] text-white font-bold h-14 rounded-2xl shadow-xl shadow-[#FF6B35]/20"
                >
                  Save Changes
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setEditingUser(null)}
                  className="w-full h-12 rounded-xl font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
