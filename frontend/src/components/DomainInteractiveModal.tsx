import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Bot,
  Zap,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Leaf
} from 'lucide-react';
import { ConsolidatedDomain } from '../data/consolidatedDomains';
import confetti from 'canvas-confetti';

interface ModalProps {
  domain: ConsolidatedDomain | null;
  onClose: () => void;
  userRole: string;
}

export default function DomainInteractiveModal({ domain, onClose, userRole }: ModalProps) {
  if (!domain) return null;

  const handleExecuteAction = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      colors: ['#10b981', '#34d399', '#a7f3d0'],
      origin: { y: 0.5 }
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Holographic backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window with 3D Cyber Card Zoom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateX: 15, y: 40 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateX: -10, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl rounded-3xl cyber-glass neon-border-emerald overflow-hidden shadow-2xl shadow-emerald-950/80"
          style={{ perspective: 1200 }}
        >
          {/* Top Banner */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-[#031c10] via-[#052918] to-[#02130b] border-b border-emerald-500/20 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  {domain.botanicalArchetype.toUpperCase()}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ACTIVE SPECIFICATION
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 flex items-center justify-center border border-emerald-500/30 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {domain.title}
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1">{domain.tagline}</p>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {domain.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#021008] border border-emerald-500/20 flex flex-col justify-between"
                >
                  <span className="text-[11px] text-emerald-400/80 font-mono uppercase font-semibold">
                    {m.label}
                  </span>
                  <div className="text-2xl font-extrabold text-white font-mono my-1.5">
                    {m.value}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {m.change}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Autonomous Layer Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-[#02140a] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  Neural Algorithm: {domain.aiFeature.type}
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                  REAL-TIME
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                {domain.aiFeature.name}
              </h4>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                {domain.aiFeature.description}
              </p>
            </div>

            {/* Architectural Pillars */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase block">
                Core Architectural Capabilities
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {domain.keyPillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#03150c] border border-emerald-900/40 space-y-1"
                  >
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {p.title}
                    </span>
                    <p className="text-[11px] text-emerald-300/70 leading-relaxed">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 bg-[#020e06] border-t border-emerald-900/40 flex items-center justify-between">
            <span className="text-xs text-emerald-400/80 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bio-Telemetry Synchronized &bull; Role Access Verified</span>
            </span>

            <button
              onClick={handleExecuteAction}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Simulate Live Event Trigger</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
