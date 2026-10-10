import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Coins,
  Bot,
  GitFork,
  Target,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Award
} from 'lucide-react';
import { RoleProfile } from '../data/dimensionsData';
import confetti from 'canvas-confetti';

interface SimulatorProps {
  profile: RoleProfile;
}

export default function NovelFeaturesShowcase({ profile }: SimulatorProps) {
  // Dimension 44: Real-time Streaming Salary Counter
  const [streamingCount, setStreamingCount] = useState(3412.50);
  const [withdrawnTotal, setWithdrawnTotal] = useState(0);

  // Dimension 2: Salary What-if Simulator
  const [homeLoan, setHomeLoan] = useState(25); // in Lakhs
  const [cityChoice, setCityChoice] = useState('Bangalore');
  const [taxRegimeChoice, setTaxRegimeChoice] = useState('new');

  // Trigger stream withdrawal
  const handleInstantStreamWithdraw = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setWithdrawnTotal(prev => prev + 1000);
    setStreamingCount(prev => Math.max(0, prev - 1000));
  };

  // What-if simulated calculations
  const loanEmi = Math.round((homeLoan * 100000 * 0.085) / 12);
  const cityCostDelta = cityChoice === 'Bangalore' ? 12 : cityChoice === 'Mumbai' ? 22 : 0;
  const simulatedMonthlySurplus = Math.round(142500 - loanEmi - (cityCostDelta * 450));

  return (
    <div className="space-y-6">
      {/* Dimension 44: Real-Time Streaming Salary Counter */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Coins className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40">
                  DIMENSION #44 &bull; LIVE STREAMING
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Real-Time Per-Minute Salary Streaming Vault</h3>
            </div>
          </div>

          <button
            onClick={handleInstantStreamWithdraw}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Instant One-Tap UPI Transfer (₹1,000)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Accrued Work-Time Balance</span>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">
              ₹{streamingCount.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">+₹1.85 streaming every 60 seconds</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Instant Withdrawn to UPI</span>
            <span className="text-3xl font-extrabold text-white font-mono">
              ₹{withdrawnTotal.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 block mt-1">Zero interest & zero penalty EWA</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Liquidity Health Buffer</span>
            <span className="text-3xl font-extrabold text-sky-400 font-mono">94% Safe</span>
            <span className="text-[10px] text-slate-400 block mt-1">Safe withdrawal headroom remaining</span>
          </div>
        </div>
      </div>

      {/* Dimension 2 & 13: Salary What-If Simulator */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-sky-400">DIMENSION #2 &bull; MONTE CARLO ENGINE</div>
            <h3 className="text-lg font-bold text-white">Interactive Salary "What-If" Life Simulator</h3>
            <p className="text-xs text-slate-400">
              Model personal financial impact before taking big life decisions (Home loans, transfers, tax regimes).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-4 p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Home Loan Amount</span>
                <span className="text-sky-400 font-mono">₹{homeLoan} Lakhs</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={homeLoan}
                onChange={(e) => setHomeLoan(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Estimated EMI: ₹{loanEmi.toLocaleString()}/mo</span>
            </div>

            <div>
              <span className="block font-semibold text-slate-300 mb-1">Relocation City Target</span>
              <div className="grid grid-cols-3 gap-1.5">
                {['Hyderabad', 'Bangalore', 'Mumbai'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCityChoice(c)}
                    className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                      cityChoice === c
                        ? 'bg-sky-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-semibold text-slate-300 mb-1">Tax Regime Preference</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setTaxRegimeChoice('new')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                    taxRegimeChoice === 'new'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  New (115BAC)
                </button>
                <button
                  onClick={() => setTaxRegimeChoice('old')}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                    taxRegimeChoice === 'old'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Old Regime (80C)
                </button>
              </div>
            </div>
          </div>

          {/* Outcome Projection Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-sky-500/25 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase">Simulated Monthly Surplus</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">
                  ₹{simulatedMonthlySurplus.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Remaining free liquidity after ₹{loanEmi.toLocaleString()} EMI deduction and {cityChoice} living index adjustment.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Financial health index stays safely above 75/100</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-purple-500/25 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase">Freedom Date (FIRE Metric)</span>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  18 Oct 2038
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  With your current equity vesting of {profile.employeeData.esopValue} and disciplined goal deductions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>12 years to full financial independence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dimension 41, 43, 45 Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dim 41: AI Co-Pilot Allowance */}
        <div className="p-5 rounded-2xl glass-panel border border-sky-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-sky-400">DIM #41 &bull; AI SYNERGY</span>
            <Bot className="w-4 h-4 text-sky-400" />
          </div>
          <h4 className="text-sm font-bold text-white">AI Co-Pilot Model Allowance</h4>
          <p className="text-xs text-slate-400">
            $120 / month dedicated credit pool for Claude Opus, GPT-4o, and Cursor.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-mono font-bold">100% Employer Funded</span>
            <span className="text-slate-500">Active</span>
          </div>
        </div>

        {/* Dim 43: Innovation Royalties */}
        <div className="p-5 rounded-2xl glass-panel border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">DIM #43 &bull; IP ROYALTIES</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <h4 className="text-sm font-bold text-white">Patent & Code Royalty Vault</h4>
          <p className="text-xs text-slate-400">
            2 Granted patents and 1 internal open-source framework generating royalties.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-mono font-bold">{profile.employeeData.patentRoyalties}</span>
            <span className="text-slate-500">Credited Monthly</span>
          </div>
        </div>

        {/* Dim 45: Cross-Skilling Apprenticeship */}
        <div className="p-5 rounded-2xl glass-panel border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400">DIM #45 &bull; SHADOWING</span>
            <GitFork className="w-4 h-4 text-purple-400" />
          </div>
          <h4 className="text-sm font-bold text-white">Internal Apprenticeship Swap</h4>
          <p className="text-xs text-slate-400">
            Sprint 3 rotation: Engineering to AI Infrastructure team with learning stipend.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-purple-400 font-mono font-bold">+₹15,000 Stipend</span>
            <span className="text-slate-500">Ongoing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
