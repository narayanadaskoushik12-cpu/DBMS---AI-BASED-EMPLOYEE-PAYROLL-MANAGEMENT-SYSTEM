import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Grid,
  FileText,
  Sparkles,
  LogOut,
  Search,
  Filter,
  ShieldCheck,
  Zap,
  Lock,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Heart,
  BarChart3,
  Bot
} from 'lucide-react';
import { ALL_DIMENSIONS, ROLE_PROFILES, DimensionItem, RoleProfile } from '../data/dimensionsData';
import ConstellationCanvas from './ConstellationCanvas';
import DimensionDetailModal from './DimensionDetailModal';
import InteractivePayslip from './InteractivePayslip';
import NovelFeaturesShowcase from './NovelFeaturesShowcase';

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

export default function DashboardView({ userRole, onLogout }: DashboardProps) {
  const profile: RoleProfile = ROLE_PROFILES[userRole] || ROLE_PROFILES['employee'];

  // Tabs: 'constellation' (3D), 'grid' (All Dimensions), 'payslip' (Interactive PDF), 'novelty' (5 New Dimensions + Simulators)
  const [activeTab, setActiveTab] = useState<'constellation' | 'grid' | 'payslip' | 'novelty'>('constellation');
  const [selectedDim, setSelectedDim] = useState<DimensionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyAllowed, setShowOnlyAllowed] = useState(false);

  // Filter dimensions
  const categories = ['All', ...Array.from(new Set(ALL_DIMENSIONS.map((d) => d.category)))];

  const filteredDimensions = ALL_DIMENSIONS.filter((dim) => {
    const matchesSearch =
      dim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dim.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || dim.category === selectedCategory;
    const matchesAccess = !showOnlyAllowed || dim.roleAccess.includes(userRole as any);
    return matchesSearch && matchesCat && matchesAccess;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-sky-500/25">
            45D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-white">
                AURA <span className="text-gradient-cyan">PAYROLL</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800/40">
                AI OPERATING SYSTEM
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              45 Employee Life Dimensions &bull; Real-Time Telemetry
            </div>
          </div>
        </div>

        {/* User Profile Pill & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover border border-sky-400"
            />
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {profile.name}
                <span
                  className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase"
                  style={{ backgroundColor: `${profile.color}25`, color: profile.color }}
                >
                  {profile.badge}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Access Level: {profile.accessibleCount} / 45 Dimensions
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 md:px-3 md:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Switch Role / Logout"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span className="hidden md:inline">Switch Role</span>
          </button>
        </div>
      </header>

      {/* Main View Mode Selector Tabs */}
      <div className="px-4 md:px-8 py-3 bg-slate-900/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/10">
          <button
            onClick={() => setActiveTab('constellation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'constellation'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Constellation Orbit</span>
          </button>

          <button
            onClick={() => setActiveTab('grid')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'grid'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All 45 Dimensions Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('payslip')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'payslip'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive 3D Payslip</span>
          </button>

          <button
            onClick={() => setActiveTab('novelty')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'novelty'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-amber-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>★ Novel Star Features (41-45 & Simulators)</span>
          </button>
        </div>

        {/* Quick Stat Pill */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">
            Your Active Privilege:
            <span className="ml-1 text-emerald-400 font-mono font-bold">
              {profile.accessibleCount} Unlocked
            </span>{' '}
            /
            <span className="ml-1 text-slate-500 font-mono">
              {45 - profile.accessibleCount} Role Restricted
            </span>
          </span>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 p-4 md:p-8 relative">
        {/* TAB 1: 3D Constellation Orbit */}
        {activeTab === 'constellation' && (
          <div className="relative w-full h-[76vh] rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col">
            {/* Overlay Instructions Header */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none max-w-sm">
              <div className="px-3 py-1 rounded-full bg-sky-950/90 text-sky-300 border border-sky-500/30 text-[11px] font-mono inline-block mb-1">
                INTERACTIVE 3D FIBONACCI SPHERE
              </div>
              <h3 className="text-lg font-bold text-white">45-Dimension Spatial Universe</h3>
              <p className="text-xs text-slate-400">
                Drag to rotate the 3D orbit. Click any hovering dimension node to inspect its AI layer, metrics, and role permissions.
              </p>
            </div>

            {/* Selected Node Quick Banner if selected */}
            {selectedDim && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md z-10 p-4 rounded-xl glass-panel-active border border-sky-400/50 shadow-2xl flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono text-sky-400 uppercase font-bold">
                    DIMENSION #{selectedDim.id} &bull; {selectedDim.category}
                  </div>
                  <div className="text-sm font-bold text-white">{selectedDim.name}</div>
                  <div className="text-xs text-slate-300 font-mono">{selectedDim.metricLabel}: {selectedDim.metric}</div>
                </div>
                <button
                  onClick={() => setSelectedDim(selectedDim)}
                  className="px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-semibold hover:bg-sky-400 cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            )}

            {/* Three.js Canvas */}
            <ConstellationCanvas
              dimensions={ALL_DIMENSIONS}
              selectedDim={selectedDim}
              onSelectDim={(dim) => setSelectedDim(dim)}
            />
          </div>
        )}

        {/* TAB 2: All 45 Dimensions Grid */}
        {activeTab === 'grid' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dimensions, metrics, or AI layers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                <div className="flex items-center gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnlyAllowed}
                      onChange={(e) => setShowOnlyAllowed(e.target.checked)}
                      className="accent-sky-400"
                    />
                    <span>Show Only My Role Access</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 45 Dimensions Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDimensions.map((dim) => {
                const isAllowed = dim.roleAccess.includes(userRole as any);
                return (
                  <motion.div
                    key={dim.id}
                    onClick={() => setSelectedDim(dim)}
                    whileHover={{ y: -4 }}
                    className={`p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border relative overflow-hidden ${
                      isAllowed
                        ? 'glass-panel hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-500/10'
                        : 'glass-panel-subtle opacity-70 border-slate-800'
                    }`}
                  >
                    <div>
                      {/* Top Card Info */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                          style={{
                            backgroundColor: `${dim.color}15`,
                            color: dim.color,
                            border: `1px solid ${dim.color}35`,
                          }}
                        >
                          DIM #{dim.id}
                        </span>

                        <div className="flex items-center gap-1">
                          {dim.rare && (
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]" title="Rare / Novel Star Feature">
                              ★
                            </span>
                          )}
                          {!isAllowed && (
                            <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px]" title="Restricted for this Role">
                              <Lock className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                        {dim.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {dim.description}
                      </p>
                    </div>

                    {/* Bottom Metric & AI Layer */}
                    <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-500 uppercase">{dim.metricLabel}</span>
                        <span className="font-mono font-bold" style={{ color: dim.color }}>
                          {dim.metric}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                        <Bot className="w-3 h-3 text-sky-400 shrink-0" />
                        <span className="truncate">{dim.aiLayer}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Interactive 3D Payslip */}
        {activeTab === 'payslip' && (
          <InteractivePayslip profile={profile} />
        )}

        {/* TAB 4: Novelty Star Features Showcase */}
        {activeTab === 'novelty' && (
          <NovelFeaturesShowcase profile={profile} />
        )}
      </main>

      {/* Dimension Detail Inspector Modal */}
      <DimensionDetailModal
        dim={selectedDim}
        onClose={() => setSelectedDim(null)}
        userRole={userRole}
      />
    </div>
  );
}
