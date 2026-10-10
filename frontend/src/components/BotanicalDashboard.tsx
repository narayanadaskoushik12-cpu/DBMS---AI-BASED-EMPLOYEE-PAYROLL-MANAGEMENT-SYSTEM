import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coins,
  ShieldCheck,
  Cpu,
  Globe2,
  Lock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Leaf,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Bot,
  Zap,
  Layers,
  FileText,
  DollarSign,
  Compass,
  Sliders,
  UserPlus
} from 'lucide-react';
import { CONSOLIDATED_DOMAINS, ConsolidatedDomain } from '../data/consolidatedDomains';
import { ROLE_PROFILES, RoleProfile } from '../data/dimensionsData';
import BotanicalScrollCanvas from './BotanicalScrollCanvas';
import DomainInteractiveModal from './DomainInteractiveModal';
import InteractivePayslip from './InteractivePayslip';
import NovelFeaturesShowcase from './NovelFeaturesShowcase';
import EmployeeOnboardingPortal from './EmployeeOnboardingPortal';
import TechStackInspector from './TechStackInspector';
import RealTimeTickerBar from './RealTimeTickerBar';

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

export default function BotanicalDashboard({ userRole, onLogout }: DashboardProps) {
  const profile: RoleProfile = ROLE_PROFILES[userRole] || ROLE_PROFILES['employee'];
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const [selectedModalDomain, setSelectedModalDomain] = useState<ConsolidatedDomain | null>(null);
  const [activeTab, setActiveTab] = useState<'domains' | 'payslip' | 'simulators' | 'onboarding' | 'tech-stack'>('domains');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress for 3D camera travel
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = window.scrollY / totalScroll;
        setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const domainIcons: Record<string, any> = {
    Coins,
    ShieldPulse: ShieldCheck,
    Cpu,
    Globe2,
    Lock
  };

  return (
    <div className="min-h-screen bg-[#020a06] text-emerald-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* 3D Animated Cyber-Botanical Canvas Responding to Scroll & Domain Selection */}
      <BotanicalScrollCanvas
        scrollProgress={scrollProgress}
        activeDomainIndex={activeDomainIndex}
      />

      {/* Top Fixed Header */}
      <header className="sticky top-0 z-40 cyber-glass border-b border-emerald-500/20 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-emerald-500/30">
            <Leaf className="w-5 h-5 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-white">
                VERDANT <span className="text-gradient-emerald">PAYROLL OS</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                CYBER-BOTANICAL
              </span>
            </div>
            <div className="text-[11px] text-emerald-300/70">
              5 Unified Life Domains &bull; 3D Scroll-Reactive Telemetry
            </div>
          </div>
        </div>

        {/* User Role & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-400/50">
              {profile.id.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {profile.name}
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase bg-emerald-900/80 text-emerald-300 border border-emerald-700/50">
                  {profile.badge}
                </span>
              </div>
              <div className="text-[10px] text-emerald-400/80 font-mono">
                5 Unified Domains Fully Active
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 md:px-3 md:py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-700/50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Switch Role</span>
          </button>
        </div>
      </header>

      {/* Real-Time Live Ticker & WebSocket Alert Bar */}
      <RealTimeTickerBar />

      {/* Main Tabs Navigation */}
      <div className="sticky top-[61px] z-30 px-4 md:px-8 py-3 bg-[#03150c]/80 backdrop-blur-md border-b border-emerald-900/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30">
          <button
            onClick={() => setActiveTab('domains')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5 Unified Domains (Scroll-Based)</span>
          </button>

          <button
            onClick={() => setActiveTab('payslip')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'payslip'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Cyber-Payslip</span>
          </button>

          <button
            onClick={() => setActiveTab('simulators')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'simulators'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Streaming & What-If Simulators</span>
          </button>

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'onboarding'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Employee (Database)</span>
          </button>

          <button
            onClick={() => setActiveTab('tech-stack')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tech-stack'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>5 Requirements Studio (RAG & Kafka)</span>
          </button>
        </div>

        {/* Scroll Indicator Feedback */}
        <div className="hidden md:flex items-center gap-2.5 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3D SCROLL TRAVEL: {Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-12 relative z-10">
        {activeTab === 'domains' && (
          <div className="space-y-16">
            {/* Hero Introduction with Scroll Callout */}
            <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                SCROLL DOWN TO EXPLORE 3D LIVING FLORA
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Architectural <span className="text-gradient-emerald">Human Capital Ecosystem</span>
              </h2>
              <p className="text-emerald-200/70 text-sm md:text-base">
                Scroll through the 5 unified domains below. Notice how the background 3D bio-flora rotates and morphs organically as you scroll.
              </p>
            </div>

            {/* Quick Sticky Pillar Jump Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sticky top-[125px] z-20">
              {CONSOLIDATED_DOMAINS.map((dom, idx) => {
                const IconComponent = domainIcons[dom.iconName] || Leaf;
                const isCurrent = activeDomainIndex === idx;
                return (
                  <button
                    key={dom.id}
                    onClick={() => {
                      setActiveDomainIndex(idx);
                      const el = document.getElementById(`pillar-${dom.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-emerald-950 border-emerald-400 shadow-lg shadow-emerald-500/25 scale-105'
                        : 'cyber-glass-card hover:border-emerald-500/40 opacity-85'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 block">
                        {dom.number}
                      </span>
                      <span className="text-xs font-bold text-white truncate block max-w-[120px]">
                        {dom.title.split('&')[0]}
                      </span>
                    </div>
                    <IconComponent className="w-4 h-4 text-emerald-400 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* 5 Distinct Scroll-Based Showcase Sections */}
            <div className="space-y-24 pb-16">
              {CONSOLIDATED_DOMAINS.map((dom, idx) => {
                const IconComponent = domainIcons[dom.iconName] || Leaf;
                return (
                  <motion.div
                    key={dom.id}
                    id={`pillar-${dom.id}`}
                    onViewportEnter={() => setActiveDomainIndex(idx)}
                    viewport={{ amount: 0.4 }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="cyber-glass neon-border-emerald p-6 md:p-10 rounded-3xl relative overflow-hidden space-y-8"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-900/40 pb-6">
                      <div className="max-w-3xl space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            {dom.botanicalArchetype.toUpperCase()}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            AUTONOMOUS
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                          {dom.title}
                        </h3>
                        <p className="text-sm md:text-base text-emerald-200/80 leading-relaxed">
                          {dom.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedModalDomain(dom)}
                        className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer shrink-0 active:scale-95"
                      >
                        <Zap className="w-4 h-4 text-slate-950" />
                        <span>Launch 3D Interactive Studio</span>
                      </button>
                    </div>

                    {/* 3 Real-Time Metric Telemetry Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {dom.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-[#03150c]/85 border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
                        >
                          <span className="text-xs text-emerald-400/80 font-mono uppercase font-semibold">
                            {m.label}
                          </span>
                          <div className="my-2">
                            <span className="text-3xl font-extrabold text-white font-mono">
                              {m.value}
                            </span>
                          </div>
                          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> {m.change}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* AI Neural Algorithm Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#041a0e] to-teal-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-mono uppercase font-bold text-emerald-400">
                            BIO-NEURAL LAYER &bull; {dom.aiFeature.type}
                          </div>
                          <div className="text-sm font-bold text-white">
                            {dom.aiFeature.name}
                          </div>
                          <p className="text-xs text-emerald-200/70 mt-0.5">
                            {dom.aiFeature.description}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-500/40 shrink-0">
                        ONLINE & LEARNING
                      </span>
                    </div>

                    {/* Architectural Pillars (Interactive Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {dom.keyPillars.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#021008] border border-emerald-900/40 hover:border-emerald-500/30 transition-all space-y-1.5"
                        >
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            {p.title}
                          </span>
                          <p className="text-[11px] text-emerald-300/70 leading-relaxed">
                            {p.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Interactive Payslip */}
        {activeTab === 'payslip' && (
          <InteractivePayslip profile={profile} />
        )}

        {/* TAB 3: Simulators */}
        {activeTab === 'simulators' && (
          <NovelFeaturesShowcase profile={profile} />
        )}

        {/* TAB 4: Employee Onboarding Portal (PostgreSQL) */}
        {activeTab === 'onboarding' && (
          <EmployeeOnboardingPortal userRole={userRole} />
        )}

        {/* TAB 5: 5 Requirements Studio (RAG, Kafka, JWT, DB) */}
        {activeTab === 'tech-stack' && (
          <TechStackInspector />
        )}
      </main>

      {/* 3D Domain Studio Modal */}
      <DomainInteractiveModal
        domain={selectedModalDomain}
        onClose={() => setSelectedModalDomain(null)}
        userRole={userRole}
      />
    </div>
  );
}
