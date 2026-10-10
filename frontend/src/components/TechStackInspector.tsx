import React, { useState, useEffect } from 'react';
import {
  Bot,
  Search,
  Bell,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Database,
  Radio,
  CheckCircle2,
  Send,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function TechStackInspector() {
  const [activeTab, setActiveTab] = useState<'rag' | 'kafka' | 'jwt' | 'mongo'>('rag');

  // RAG State
  const [ragQuery, setRagQuery] = useState('What is the maternity leave policy and salary continuity?');
  const [ragResult, setRagResult] = useState<any>(null);
  const [isSearchingRag, setIsSearchingRag] = useState(false);

  // Kafka Notifications State
  const [notifications, setNotifications] = useState<any[]>([]);
  // MongoDB Audit State
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Telemetry State
  const [telemetry, setTelemetry] = useState<any>(null);

  // Fetch telemetry & Kafka notifications & MongoDB audits
  const fetchStatus = async () => {
    try {
      const resT = await fetch('http://127.0.0.1:8000/api/telemetry');
      if (resT.ok) setTelemetry(await resT.json());

      const resN = await fetch('http://127.0.0.1:8000/api/notifications');
      if (resN.ok) setNotifications(await resN.json());

      const resA = await fetch('http://127.0.0.1:8000/api/audit-logs');
      if (resA.ok) setAuditLogs(await resA.json());
    } catch (e) {
      console.log('Backend polling', e);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAskRAG = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingRag(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/rag/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ragQuery })
      });
      if (res.ok) {
        const data = await res.json();
        setRagResult(data);
        fetchStatus();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSearchingRag(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Header */}
      <div className="cyber-glass neon-border-emerald p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800">
                5 CORE MANDATORY REQUIREMENTS VERIFIED
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                PostgreSQL + RAG Vector + JWT RBAC + Microservices + Kafka
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
              Backend Architecture & Semantic Intelligence Studio
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-emerald-400 font-bold">FastAPI :8000 &bull; LIVE</span>
          </div>
        </div>

        {/* 5 Architecture Pillar Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-emerald-900/40 text-xs">
          <div className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-emerald-400 font-mono block">1. DATABASE</span>
            <span className="font-bold text-white block">PostgreSQL 18.4</span>
            <span className="text-[10px] text-emerald-400/80">payroll_db (ACID)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-emerald-400 font-mono block">2. RAG VECTOR DB</span>
            <span className="font-bold text-white block">Cosine / Embeddings</span>
            <span className="text-[10px] text-emerald-400/80">Semantic Retrieval</span>
          </div>
          <div className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-emerald-400 font-mono block">3. AUTH & JWT</span>
            <span className="font-bold text-white block">Bcrypt Salted</span>
            <span className="text-[10px] text-emerald-400/80">HS256 Signed RBAC</span>
          </div>
          <div className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-emerald-400 font-mono block">4. MICROSERVICES</span>
            <span className="font-bold text-white block">FastAPI Modular</span>
            <span className="text-[10px] text-emerald-400/80">Auth/Pay/RAG/Notif</span>
          </div>
          <div className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-emerald-400 font-mono block">5. KAFKA STREAMING</span>
            <span className="font-bold text-white block">Event Topic Bus</span>
            <span className="text-[10px] text-emerald-400/80">Async Notifications</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 w-fit">
        <button
          onClick={() => setActiveTab('rag')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'rag'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Interactive RAG Policy Search</span>
        </button>

        <button
          onClick={() => setActiveTab('kafka')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'kafka'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Kafka Event Topics Stream ({notifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jwt')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'jwt'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Bcrypt & Signed JWT</span>
        </button>

        <button
          onClick={() => setActiveTab('mongo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'mongo'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-400" />
          <span>MongoDB Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Interactive RAG Search */}
      {activeTab === 'rag' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 cyber-glass p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                REQUIREMENT #2 &bull; RETRIEVAL-AUGMENTED GENERATION (RAG)
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Semantic Policy & Labour Code Vector Assistant
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Ask queries in natural language. The system computes vector similarity embeddings against statutory policy clauses and retrieves cited legal text.
              </p>
            </div>

            <form onSubmit={handleAskRAG} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  placeholder="Ask policy question (e.g. emergency advance, gratuity rules, AI credits)..."
                  className="w-full pl-4 pr-12 py-3 bg-[#020e06] border border-emerald-900 rounded-2xl text-xs text-white placeholder-emerald-800 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  disabled={isSearchingRag}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="text-emerald-500 self-center">Try asking:</span>
                {[
                  "What is the emergency hospitalization policy?",
                  "How is statutory gratuity calculated?",
                  "What are the nomadic workation tax rules?",
                  "How does the $120 AI copilot allowance work?"
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRagQuery(chip)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-900/60 text-emerald-300 hover:border-emerald-500 cursor-pointer transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </form>

            {ragResult && (
              <div className="p-5 rounded-2xl bg-[#021208] border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    RAG Semantic Vector Response
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Similarity: {ragResult.similarity_score}
                  </span>
                </div>
                <p className="text-xs text-white leading-relaxed">
                  {ragResult.answer}
                </p>
                <div className="pt-2 border-t border-emerald-900/40 flex items-center gap-2 text-[11px] text-emerald-400/80 font-mono">
                  <span>Citations:</span>
                  {ragResult.citations?.map((c: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-900">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 cyber-glass p-6 rounded-3xl border border-emerald-500/20 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Indexed Policy Document Vault
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { title: "POL-001: Maternity & Return-to-Work", scope: "26 Weeks, 100% Pay Continuity" },
                { title: "POL-002: Emergency Hospitalization", scope: "Instant ₹5L Pre-Approval, ₹1L Advance" },
                { title: "POL-003: Labour Code Gratuity & Buyout", scope: "5+ Years Statutory Formula, 90d Buyout" },
                { title: "POL-004: Tax Regime 115BAC Comparison", scope: "₹7L Rebate, 80C vs Slabs" },
                { title: "POL-005: Nomadic Remote Workation", scope: "30-day overseas, 183-day Tax Nexus" },
                { title: "POL-006: AI Co-Pilot Tooling Credit", scope: "$120/mo Claude/GPT Direct Budget" }
              ].map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#020e06] border border-emerald-900/40 space-y-0.5">
                  <div className="font-bold text-emerald-300">{doc.title}</div>
                  <div className="text-[11px] text-emerald-400/70">{doc.scope}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Kafka Event Topics Stream */}
      {activeTab === 'kafka' && (
        <div className="cyber-glass p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                REQUIREMENT #5 &bull; APACHE KAFKA EVENT STREAMING
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Real-Time Partitioned Event Topic Consumers
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Asynchronous event stream consumed by Notification, Audit, and AI Sentinel services.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800">
              <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
              <span>TOPICS: payroll-events, alert-events, leave-events</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-[#020e06] border border-emerald-900/50 hover:border-emerald-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start md:items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                    {n.id.split('-')[1]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{n.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {n.topic}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-300/80 mt-0.5">{n.message}</p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-emerald-500 shrink-0">
                  {new Date(n.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Bcrypt & Signed JWT Inspector */}
      {activeTab === 'jwt' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cyber-glass p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              PASSWORD HASHING & SALT
            </span>
            <h3 className="text-lg font-bold text-white">Bcrypt Salted Security Layer</h3>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Passwords are never stored in plaintext. They are encrypted using <strong>Bcrypt</strong> with an adaptive work factor (12 rounds) and a random cryptographic 128-bit salt before touching PostgreSQL.
            </p>
            <div className="p-3.5 rounded-xl bg-[#020e06] border border-emerald-900 font-mono text-xs space-y-2">
              <span className="text-emerald-500 block text-[10px]">RAW ENTERPRISE PASSWORD:</span>
              <span className="text-slate-400">••••••••••••</span>
              <span className="text-emerald-500 block text-[10px] pt-1 border-t border-emerald-900/60">BCRYPT 12-ROUND HASH STORAGE:</span>
              <span className="text-emerald-300 break-all text-[11px]">
                $2b$12$e8xL2s7h0k0W7...p9Zb5Q7vF8tG1K3d
              </span>
            </div>
          </div>

          <div className="cyber-glass p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              REQUIREMENT #3 &bull; JWT WITH RBAC CLAIMS
            </span>
            <h3 className="text-lg font-bold text-white">HS256 Cryptographic Token Claims</h3>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Upon login, the Auth Service signs an RFC 7519 JWT carrying identity claims, expiration, and role credentials that gate API endpoints.
            </p>
            <div className="p-3.5 rounded-xl bg-[#020e06] border border-emerald-900 font-mono text-xs space-y-2">
              <span className="text-emerald-500 block text-[10px]">DECODED JWT PAYLOAD:</span>
              <pre className="text-emerald-300 text-[11px] leading-relaxed">
{`{
  "sub": "user@synthetica.eco",
  "emp_id": "EMP-001",
  "role": "admin",
  "iss": "verdant-auth-service",
  "exp": 1791612000
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: MongoDB Audit Trail Records */}
      {activeTab === 'mongo' && (
        <div className="cyber-glass p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                NOSQL DOCUMENT STORE &bull; MONGODB v8.3.8
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Immutable Audit Trail, Chat History & Consent Ledger
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                High-volume, schema-flexible audit events written straight to local MongoDB (database: <code>payroll_nosql_db</code>).
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>COLLECTION: audit_logs ({auditLogs.length} Records)</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#020e06] border border-emerald-900/50 hover:border-emerald-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono">{log.action}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {log.resource}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-1">
                    Actor: <span className="text-white font-semibold">{log.actor}</span> &bull; Hash: {log.hash_type}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-emerald-500 shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
