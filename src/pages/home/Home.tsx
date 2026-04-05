import { useNavigate } from "react-router-dom";
import {
  Coins,
  DollarSign,
  QrCode,
  TrendingUp,
  Pickaxe,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const quickActions = [
    {
      name: "iTokens",
      icon: Coins,
      desc: "Your token portfolio",
      path: "/home/itokens",
      accent: "from-amber-500/20 to-amber-600/5",
      border: "hover:border-amber-400/40",
      shadow: "hover:shadow-amber-500/10",
      emoji: "🪙",
    },
    {
      name: "USDT",
      icon: DollarSign,
      desc: "Tether & stablecoin",
      path: "/home/usdt",
      accent: "from-emerald-500/20 to-emerald-600/5",
      border: "hover:border-emerald-400/40",
      shadow: "hover:shadow-emerald-500/10",
      emoji: "💵",
    },
    {
      name: "UPI",
      icon: QrCode,
      desc: "Pay via QR or bank",
      path: "/home/upi",
      accent: "from-blue-500/20 to-blue-600/5",
      border: "hover:border-blue-400/40",
      shadow: "hover:shadow-blue-500/10",
      emoji: "📲",
    },
    {
      name: "Buy / Sell",
      icon: TrendingUp,
      desc: "Trade crypto assets",
      path: "/home/buysell",
      accent: "from-orange-500/20 to-orange-600/5",
      border: "hover:border-orange-400/40",
      shadow: "hover:shadow-orange-500/10",
      emoji: "📈",
    },
    {
      name: "Mine",
      icon: Pickaxe,
      desc: "Mining rewards",
      path: "/home/mine",
      accent: "from-violet-500/20 to-violet-600/5",
      border: "hover:border-violet-400/40",
      shadow: "hover:shadow-violet-500/10",
      emoji: "⛏️",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Good morning, Aryan <span className="inline-block origin-[70%_70%] animate-[wave_1.2s_ease-in-out_2] motion-reduce:animate-none">👋</span>
        </h1>
        <p className="text-brand-muted mt-1.5 text-sm font-medium">{today}</p>
      </header>

      {/* Balance Card */}
      <div className="relative group overflow-hidden bg-gradient-to-br from-amber-500 via-brand-gold to-amber-600 rounded-3xl p-8 text-black shadow-xl shadow-amber-500/25 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.3)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 -m-12 w-72 h-72 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-500" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-300/30 rounded-full blur-2xl" />

        <div className="relative flex flex-col h-full justify-between z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-black/70 text-xs font-bold uppercase tracking-[0.2em] mb-1.5">
                Total Balance
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight drop-shadow-sm">
                $12,480.50
              </h2>
            </div>
            <div className="bg-black/15 hover:bg-black/25 p-3.5 rounded-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center group/btn">
              <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <div className="mt-14 flex justify-between items-end">
            <div>
              <p className="font-mono text-base md:text-lg tracking-[0.35em] opacity-85">
                •••• •••• •••• 4291
              </p>
              <p className="text-xs font-semibold mt-2 opacity-70 tracking-wider">
                VALID THRU: 12/28
              </p>
            </div>
            <h3 className="font-display text-2xl font-bold italic opacity-50 group-hover:opacity-70 transition-opacity">
              NovaPay
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Quick Services</h3>
          <span className="text-brand-muted text-xs font-medium cursor-pointer hover:text-brand-gold hover:underline underline-offset-2 decoration-2 transition-all duration-300">
            See all
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.name}
              onClick={() => navigate(action.path)}
              className={cn(
                "bg-brand-card border border-slate-200/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden",
                "hover:border-opacity-100 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1",
                "active:scale-[0.98] active:translate-y-0",
                action.border,
                action.shadow
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                action.accent
              )} />
              <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-20 transition-all duration-300">
                <action.icon className="w-16 h-16 text-slate-900" />
              </div>

              <div className="flex flex-col h-full relative z-10">
                <div className="text-3xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 origin-left">
                  {action.emoji}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">
                  {action.name}
                </h4>
                <p className="text-brand-muted text-xs line-clamp-1 group-hover:text-slate-600 transition-colors">
                  {action.desc}
                </p>

                <div className="mt-4 flex justify-end">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-gold/20 group-hover:text-brand-gold transition-all duration-300">
                    <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
