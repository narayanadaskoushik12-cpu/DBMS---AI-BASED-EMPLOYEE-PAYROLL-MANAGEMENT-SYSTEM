import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Building,
  Briefcase,
  Mail,
  User,
  Sparkles,
  Lock,
  Layers,
  Database,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingProps {
  userRole: string;
  onEmployeeAdded?: () => void;
}

export default function EmployeeOnboardingPortal({ userRole, onEmployeeAdded }: OnboardingProps) {
  const isAuthorized = userRole === 'admin' || userRole === 'hr';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('Product Engineering');
  const [grossSalary, setGrossSalary] = useState(150000);
  const [taxRegime, setTaxRegime] = useState('New Regime (115BAC)');
  const [esopValue, setEsopValue] = useState('₹18.0 L');
  const [patentRoyalties, setPatentRoyalties] = useState('₹5,000/mo');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Live database roster state
  const [dbEmployees, setDbEmployees] = useState<any[]>([]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/employees');
      if (res.ok) {
        const data = await res.json();
        setDbEmployees(data);
      }
    } catch (e) {
      console.log('Backend sync offline', e);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role,
          designation,
          department,
          gross_salary: Number(grossSalary),
          tax_regime: taxRegime,
          esop_value: esopValue,
          patent_royalties: patentRoyalties
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to enroll employee');
      }

      const created = await res.json();
      setSuccessMessage(`Employee ${created.name} (${created.emp_id}) enrolled successfully in PostgreSQL!`);
      confetti({
        particleCount: 90,
        spread: 80,
        colors: ['#10b981', '#34d399', '#6ee7b7'],
        origin: { y: 0.6 }
      });

      // Clear fields
      setName('');
      setEmail('');
      setDesignation('');

      // Refresh list
      fetchEmployees();
      if (onEmployeeAdded) onEmployeeAdded();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error connecting to PostgreSQL backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-rose-500/30 text-center max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Privilege Escalation Required</h3>
        <p className="text-xs text-rose-300/80 leading-relaxed">
          The <strong>Employee Onboarding & Talent Provisioning Portal</strong> is role-restricted to <strong>Super Admin & Head of HR</strong>.
          Your current active session is authenticated as <em>{userRole.toUpperCase()}</em>.
        </p>
        <span className="text-[11px] font-mono text-emerald-400 block">
          💡 Switch to Admin or HR from the top-right menu to access this feature.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="cyber-glass neon-border-emerald p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800">
                POSTGRESQL 18.4 PERSISTENCE
              </span>
              <span className="text-xs font-mono text-emerald-300">
                ROLE AUTHORIZED: {userRole.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Add New Employee & Provision Payroll
            </h2>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Connected to payroll_db</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Onboarding Form (7 Cols) */}
        <div className="lg:col-span-7 cyber-glass p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Candidate Bio-Profile & Compensation Package
          </h3>

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-400 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-xs text-rose-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3.5 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white placeholder-emerald-800 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh.c@synthetica.eco"
                  className="w-full px-3.5 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white placeholder-emerald-800 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Access Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="accountant">Accountant</option>
                  <option value="hr">HR Specialist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Designation</label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Cloud Architect"
                  className="w-full px-3.5 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white placeholder-emerald-800 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Product Engineering">Product Engineering</option>
                  <option value="Core Architecture">Core Architecture</option>
                  <option value="Finance & Tax">Finance & Tax</option>
                  <option value="People & Culture">People & Culture</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-emerald-900/40">
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">
                  Gross Monthly CTC (₹)
                </label>
                <input
                  type="number"
                  step="5000"
                  required
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Tax Regime</label>
                <select
                  value={taxRegime}
                  onChange={(e) => setTaxRegime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#020d07] border border-emerald-900 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="New Regime (115BAC)">New Regime (115BAC)</option>
                  <option value="Old Regime (Section 80C)">Old Regime (Section 80C)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Writing ACID Transaction to PostgreSQL...</span>
              ) : (
                <>
                  <span>Commit Employee Record to PostgreSQL</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Database Directory (5 Cols) */}
        <div className="lg:col-span-5 cyber-glass p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Live PostgreSQL Records ({dbEmployees.length})
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">SELECT * FROM employees</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {dbEmployees.map((emp) => (
              <div
                key={emp.id}
                className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 text-xs space-y-1 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    {emp.name}
                    <span className="text-[10px] font-mono px-1.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {emp.emp_id}
                    </span>
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {emp.role}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-300/70">
                  {emp.designation} &bull; {emp.department}
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-emerald-400">
                  <span>Gross: ₹{emp.gross_salary?.toLocaleString()}</span>
                  <span className="text-emerald-300">Net Take-Home: ₹{emp.net_salary?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
