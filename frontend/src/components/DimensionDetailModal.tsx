import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { DimensionItem } from '../data/dimensionsData';

interface ModalProps {
  dim: DimensionItem | null;
  onClose: () => void;
  userRole: string;
}

export default function DimensionDetailModal({ dim, onClose, userRole }: ModalProps) {
  if (!dim) return null;

  const hasAccess = dim.roleAccess.includes(userRole as any);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl glass-panel border border-white/15 overflow-hidden shadow-2xl shadow-sky-950/50"
        >
          {/* Header Banner */}
          <div
            className="p-6 relative border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${dim.color}25 0%, #0f172a 100%)`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider"
                  style={{
                    backgroundColor: `${dim.color}20`,
                    color: dim.color,
                    border: `1px solid ${dim.color}50`,
                  }}
                >
                  DIMENSION #{dim.id} &bull; {dim.category.toUpperCase()}
                </span>
                {dim.rare && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> NOVEL FEATURE
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-white">{dim.name}</h2>
            <p className="text-sm text-slate-300 mt-1 font-medium">{dim.tagline}</p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Description & Metric highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" /> Operational Scope
                </h4>
                {dim.description}
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-center items-center text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">
                  {dim.metricLabel}
                </span>
                <span
                  className="text-2xl font-extrabold mt-1 font-mono"
                  style={{ color: dim.color }}
                >
                  {dim.metric}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Live Metric Sync
                </span>
              </div>
            </div>

            {/* AI Layer Pill */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-950/40 via-purple-950/30 to-slate-900 border border-sky-500/25 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-sky-400 font-bold">
                    Integrated AI & Neural Layer
                  </div>
                  <div className="text-sm font-semibold text-white">{dim.aiLayer}</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                ACTIVE
              </span>
            </div>

            {/* Key Features List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                Key Capabilities & Algorithms
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {dim.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-sky-500/30 transition-all flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Access Matrix */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-300 block">
                  Role Permission Matrix
                </span>
                <span className="text-[11px] text-slate-400">
                  Current User Role:{' '}
                  <span className="font-semibold text-white capitalize">{userRole}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['admin', 'hr', 'accountant', 'manager', 'employee'] as const).map((r) => {
                  const allowed = dim.roleAccess.includes(r);
                  return (
                    <span
                      key={r}
                      className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold font-mono ${
                        allowed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800/40 text-slate-500 border border-slate-700/30 line-through'
                      }`}
                    >
                      {r}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              {hasAccess ? (
                <span className="text-emerald-400">Access Authorized for Your Role</span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Restricted (Requires Higher Privileges)
                </span>
              )}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-all shadow-md shadow-sky-500/20 cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
