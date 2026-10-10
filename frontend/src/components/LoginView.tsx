import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Flame,
  Award
} from 'lucide-react';
import { ROLE_PROFILES, RoleProfile } from '../data/dimensionsData';
import ThreeBackground from './ThreeBackground';

interface LoginModalProps {
  onLogin: (role: string) => void;
}

export default function LoginView({ onLogin }: LoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>('employee');
  const [username, setUsername] = useState('ananya.sharma@enterprise.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const activeProfile = ROLE_PROFILES[selectedRole];

  const handleRoleQuickSelect = (roleKey: string) => {
    setSelectedRole(roleKey);
    const p = ROLE_PROFILES[roleKey];
    if (roleKey === 'admin') setUsername('vikramaditya.rao@enterprise.ai');
    else if (roleKey === 'hr') setUsername('pooja.sundaram@enterprise.ai');
    else if (roleKey === 'accountant') setUsername('karthik.sub@enterprise.ai');
    else if (roleKey === 'manager') setUsername('arjun.v@enterprise.ai');
    else setUsername('ananya.sharma@enterprise.ai');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(selectedRole);
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* 3D WebGL Background Scene */}
      <ThreeBackground />

      {/* Ambient Radial Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Brand Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 text-center max-w-2xl px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-400 text-xs font-medium tracking-wide mb-3 backdrop-blur-md shadow-lg shadow-sky-500/10">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Next-Gen Enterprise Human Capital & Payroll OS</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          AURA <span className="text-gradient-cyan">PAYROLL</span> 45D
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          An AI-powered 45-Dimension Employee Life & Compensation Operating System
        </p>
      </motion.div>

      {/* Main Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-black/60"
      >
        {/* Left Side: Role Selector & Role Details (5 Cols) */}
        <div className="md:col-span-5 bg-slate-950/75 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" /> Select Your Access Role
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-sky-950/80 text-sky-300 border border-sky-800/40">
                RBAC Level
              </span>
            </div>

            {/* Quick Role Switch Buttons */}
            <div className="space-y-2 mb-6">
              {Object.values(ROLE_PROFILES).map((role) => {
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleQuickSelect(role.id)}
                    type="button"
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                      isActive
                        ? 'bg-slate-800/90 border-sky-400/60 shadow-lg shadow-sky-500/15'
                        : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={role.avatar}
                        alt={role.name}
                        className={`w-9 h-9 rounded-full object-cover border-2 transition-all ${
                          isActive ? 'border-sky-400 scale-105' : 'border-slate-700'
                        }`}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          {role.name}
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        <div className="text-[11px] text-slate-400">{role.badge}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${role.color}15`,
                          color: role.color,
                          border: `1px solid ${role.color}40`,
                        }}
                      >
                        {role.accessibleCount}/45 D
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Feature Telemetry Summary */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
              <span>{activeProfile.badge}</span>
              <span className="text-emerald-400 font-mono">
                {activeProfile.accessibleCount} Dimensions Active
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {activeProfile.description}
            </p>
          </div>
        </div>

        {/* Right Side: Credential Form (7 Cols) */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900/60 to-slate-950/80">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-sky-400" />
                  Sign In to Portal
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Authenticate your cryptographic credentials to unlock your 45-Dimension workspace.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Telemetry Security
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  256-Bit Encrypted
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username / Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Corporate Enterprise Identity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-mono"
                    placeholder="name@enterprise.ai"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Security Passkey / Vault Code
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] text-sky-400 hover:text-sky-300"
                  >
                    Forgot Passkey?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-mono"
                    placeholder="Enter passkey"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Permission Preview Pill */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-sky-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-xs">
                    {activeProfile.accessibleCount}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">
                      Access Granted: {activeProfile.badge}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {activeProfile.accessibleCount} Dimensions Unlocked & Verified
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 disabled:opacity-50 cursor-pointer"
              >
                {isAuthenticating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Synchronizing 45-D Telemetry...</span>
                  </div>
                ) : (
                  <>
                    <span>Enter {activeProfile.badge} Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Demo Hint */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>💡 Tip: Click any role on the left to test different access levels</span>
            <span className="text-slate-500 font-mono">v4.5-Enterprise</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
