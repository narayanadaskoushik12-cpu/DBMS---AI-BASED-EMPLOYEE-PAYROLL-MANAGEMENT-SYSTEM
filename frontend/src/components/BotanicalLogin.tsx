import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  Leaf
} from 'lucide-react';
import { ROLE_PROFILES } from '../data/dimensionsData';
import Botanical3DCanvas from './Botanical3DCanvas';

interface LoginModalProps {
  onLogin: (role: string) => void;
}

export default function BotanicalLogin({ onLogin }: LoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>('employee');
  const [username, setUsername] = useState('ananya.sharma@synthetica.eco');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const activeProfile = ROLE_PROFILES[selectedRole];

  const handleRoleQuickSelect = (roleKey: string) => {
    setSelectedRole(roleKey);
    if (roleKey === 'admin') setUsername('vikramaditya.rao@synthetica.eco');
    else if (roleKey === 'hr') setUsername('pooja.sundaram@synthetica.eco');
    else if (roleKey === 'accountant') setUsername('karthik.sub@synthetica.eco');
    else if (roleKey === 'manager') setUsername('arjun.v@synthetica.eco');
    else setUsername('ananya.sharma@synthetica.eco');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(selectedRole);
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-[#020906]">
      {/* 3D Cyber-Botanical Scene */}
      <Botanical3DCanvas activeIndex={0} />

      {/* Ambient Neon Emerald Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[450px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Brand Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 text-center max-w-2xl px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wide mb-3 backdrop-blur-md shadow-lg shadow-emerald-500/10">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>CYBER-BOTANICAL ENTERPRISE ECOSYSTEM</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          VERDANT <span className="text-gradient-emerald">PAYROLL OS</span>
        </h1>
        <p className="text-emerald-200/70 text-sm md:text-base mt-2">
          Organic Human Capital Telemetry & Unified 5-Domain Architecture
        </p>
      </motion.div>

      {/* Main Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-2xl overflow-hidden cyber-glass neon-border-emerald shadow-2xl shadow-black/80"
      >
        {/* Left Side: Role Selector */}
        <div className="md:col-span-5 bg-[#03120b]/80 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-900/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bio-Metric Access Role
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-800/40">
                Eco-RBAC
              </span>
            </div>

            <div className="space-y-2 mb-6">
              {Object.values(ROLE_PROFILES).map((role) => {
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleQuickSelect(role.id)}
                    type="button"
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-emerald-950/20 border-emerald-900/30 hover:bg-emerald-950/50 hover:border-emerald-600/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                        isActive ? 'bg-emerald-500 text-slate-950 border-emerald-300' : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}>
                        {role.id.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          {role.name}
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="text-[11px] text-emerald-300/60">{role.badge}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-950 border border-emerald-800/60">
                      5 Domains
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs">
            <div className="flex items-center justify-between text-emerald-200 font-semibold mb-1">
              <span>{activeProfile.badge}</span>
              <span className="text-emerald-400 font-mono">5 Unified Domains</span>
            </div>
            <p className="text-emerald-300/60 text-[11px] leading-relaxed">
              {activeProfile.description}
            </p>
          </div>
        </div>

        {/* Right Side: Credentials */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#04190e]/70 to-[#020d07]/90">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-emerald-400" />
                  Sign In to Verdant Portal
                </h2>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Authenticate cryptographic credentials to cultivate your ecosystem.
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Bio-Encrypted
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  Eco-Identity Identifier
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#020b06] border border-emerald-800/60 rounded-xl text-sm text-emerald-100 placeholder-emerald-800 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-emerald-200">
                    Passkey / Botanical Token
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    Recovery Seed
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-[#020b06] border border-emerald-800/60 rounded-xl text-sm text-emerald-100 placeholder-emerald-800 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-500 hover:text-emerald-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-200">
                    Role Privilege: <strong className="text-white">{activeProfile.badge}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 font-bold">
                  5 DOMAINS LINKED
                </span>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 disabled:opacity-50 cursor-pointer"
              >
                {isAuthenticating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                    <span>Nurturing Bio-Telemetry...</span>
                  </div>
                ) : (
                  <>
                    <span>Enter {activeProfile.badge} Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-emerald-400/60">
            <span>Cyber-Botanical & Neon Emerald Theme Active</span>
            <span className="font-mono">Verdant v5.0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
