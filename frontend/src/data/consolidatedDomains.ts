export interface ConsolidatedDomain {
  id: string;
  number: string;
  title: string;
  subTitle: string;
  accentColor: string;
  bgGlow: string;
  iconName: string;
  tagline: string;
  description: string;
  botanicalArchetype: string;
  coveredDimensionsCount: number;
  coveredDimensions: string[];
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  aiFeature: {
    name: string;
    type: string;
    description: string;
  };
  keyPillars: {
    title: string;
    detail: string;
  }[];
  roleAccess: ('admin' | 'hr' | 'accountant' | 'manager' | 'employee')[];
}

export const CONSOLIDATED_DOMAINS: ConsolidatedDomain[] = [
  {
    id: "wealth-engine",
    number: "01",
    title: "Quantum Wealth & Streaming Compensation",
    subTitle: "Earnings, Streaming Liquidity, What-If & IP Royalties",
    accentColor: "#10b981", // Emerald Neon
    bgGlow: "rgba(16, 185, 129, 0.15)",
    iconName: "Coins",
    botanicalArchetype: "Emerald Spore Network",
    tagline: "Fluid, inflation-indexed, per-minute capital distribution",
    description: "Consolidates all salary structures, monthly tax withholding, per-minute streaming payroll, automated patent code royalties, and Monte Carlo what-if life simulation into a single self-balancing wealth vault.",
    coveredDimensionsCount: 7,
    coveredDimensions: [
      "Pay & Salary (Predictive payslip, inflation tracker)",
      "Financial Wellness (Stress index, EWA liquidity)",
      "Real-Time Streaming Salary (Live per-minute counter, instant UPI)",
      "Innovation & Patent Royalties (Recurring code royalties)",
      "Housing & Relocation (HRA optimizer, city parity)",
      "Gross-to-Net Engine (NEFT/RTGS batch files, arrears)",
      "Salary What-If Simulator (Home loan, tax regime modeling)"
    ],
    metrics: [
      { label: "Streaming Accrual Today", value: "₹3,412.50", change: "+₹1.85/min" },
      { label: "Net Take-Home Projection", value: "₹1,42,500", change: "98.4% Acc" },
      { label: "Patent & Code Royalties", value: "₹18,500/mo", change: "Active IP" }
    ],
    aiFeature: {
      name: "Autonomous Compensation Delta Explainer",
      type: "Explainable Regression Neural Network",
      description: "Instantly audits month-over-month salary variances in plain natural language, isolating statutory changes, bonuses, and SIP goals."
    },
    keyPillars: [
      { title: "Streaming Vault", detail: "Per-minute liquidity withdrawal with zero interest or penalty." },
      { title: "Why-Salary-Changed AI", detail: "Plain English breakdown of every rupee variance." },
      { title: "Monte Carlo Simulator", detail: "Test 15-year salary curves under different cities & loan amounts." }
    ],
    roleAccess: ["admin", "hr", "accountant", "manager", "employee"]
  },
  {
    id: "vitality-care",
    number: "02",
    title: "Holistic Health, Life Continuity & Wellness",
    subTitle: "Physical, Mental Burnout, Insurance & Life Events",
    accentColor: "#059669", // Deep Emerald
    bgGlow: "rgba(5, 150, 105, 0.15)",
    iconName: "ShieldPulse",
    botanicalArchetype: "Bio-Luminescent Fern",
    tagline: "Proactive biological balance, family coverage & crisis shield",
    description: "Unifies healthcare coverage, family insurance gap analyzers, mental wellbeing sentiment radars, overtime fatigue guards, and the automated one-click Life Event engine into a cohesive bio-protective continuum.",
    coveredDimensionsCount: 7,
    coveredDimensions: [
      "Life Events Engine (Marriage, childbirth, compassionate auto-triggers)",
      "Health & Insurance (Gap analyzer, cashless pre-approval)",
      "Mental Wellbeing & Fatigue (Overtime fatigue guard, sentiment radar)",
      "Workplace Safety & Incident (Incident-to-insurance automatic bridge)",
      "Children's Education & Family Care (Tuition advance, fee SIP)",
      "Emergency Hospitalization Mode (Instant advance & pre-auth)",
      "Wellness & Gamification Streaks (Fitness milestones, wellness days)"
    ],
    metrics: [
      { label: "Fatigue & Balance Guard", value: "92 / 100", change: "Optimal" },
      { label: "Family Insurance Shield", value: "₹15,00,000", change: "100% Saturated" },
      { label: "Life Policy Triggers", value: "Zero Delay", change: "Auto-sync" }
    ],
    aiFeature: {
      name: "Overtime Fatigue Sentinel & Sentiment Radar",
      type: "Transformer Biometric & Schedule Analysis",
      description: "Continuously scans work schedules and communication strain to detect early burnout 3 weeks before it impacts wellness."
    },
    keyPillars: [
      { title: "Emergency Mode", detail: "Single click auto-initiates insurance pre-approval and salary advance." },
      { title: "Fatigue Guard", detail: "Blocks unsustainable overtime allocations automatically." },
      { title: "Family Gap Analyzer", detail: "Identifies medical coverage shortfalls for parents and dependents." }
    ],
    roleAccess: ["admin", "hr", "manager", "employee"]
  },
  {
    id: "intellect-career",
    number: "03",
    title: "Adaptive Talent, Career Twin & Future Work",
    subTitle: "Skills Digital Twin, Human-AI Synergy, Gigs & Shadowing",
    accentColor: "#34d399", // Mint Emerald
    bgGlow: "rgba(52, 211, 153, 0.15)",
    iconName: "Cpu",
    botanicalArchetype: "Synaptic Neural Vine",
    tagline: "Augment human output with AI co-pilots and 5-year career twins",
    description: "Merges internal talent gig marketplaces, AI tooling stipends, 5-year career digital twins, raise-readiness audits, and cross-functional apprentice shadowing into an organic professional growth canopy.",
    coveredDimensionsCount: 7,
    coveredDimensions: [
      "Skills & Career Digital Twin (5-year simulation, raise-readiness)",
      "AI Agent Teammate & Co-Pilot Allowance ($120/mo tooling stipend)",
      "Internal Talent Marketplace (Skill-gig board, micro-sprints)",
      "Internal Shadowing & Skill Rotation (2-week apprentice swap)",
      "Performance & Appraisal (360 feedback, manager bias auditor)",
      "Mentorship & Social Graph (Network hubs, flight risk sentinel)",
      "Productivity & Time Value (Meeting cost-per-hour calculator)"
    ],
    metrics: [
      { label: "AI Co-Pilot Credit", value: "$120 / mo", change: "Fully Funded" },
      { label: "Raise-Readiness Score", value: "88% Ready", change: "+14% MoM" },
      { label: "Internal Gig Earnings", value: "₹24,000", change: "Sprint 4" }
    ],
    aiFeature: {
      name: "5-Year Career Digital Twin & Appraisal Bias Filter",
      type: "Multi-Agent Career Trajectory Neural Model",
      description: "Projects lifetime compensation paths across promotions while mathematically auditing manager review subjectivity."
    },
    keyPillars: [
      { title: "AI Model Allowance", detail: "Direct payroll funding for Claude, GPT, and modern coding copilots." },
      { title: "Career Digital Twin", detail: "Simulate your salary 5 years into the future under multiple roles." },
      { title: "Apprentice Swap", detail: "Shadow other departments for 2 weeks with a dedicated learning stipend." }
    ],
    roleAccess: ["admin", "hr", "manager", "employee"]
  },
  {
    id: "global-culture",
    number: "04",
    title: "Global Nomadic, Inclusion & Sustainable Culture",
    subTitle: "Workations, Green Ledger, Inclusive Sprints & Culture",
    accentColor: "#10b981", // Emerald
    bgGlow: "rgba(16, 185, 129, 0.15)",
    iconName: "Globe2",
    botanicalArchetype: "Emerald Canopy & Flora",
    tagline: "Border-free flexibility, verified green footprints and peer recognition",
    description: "Harmonizes remote workations, global tax residency compliance, green commute carbon credits, peer recognition cheers, festival bonus planning, and universal screen-adaptive inclusion.",
    coveredDimensionsCount: 8,
    coveredDimensions: [
      "Workation & Nomadic Payroll (2-4 week remote workation tax alerts)",
      "Remote & Global Work (183-day cross-border tax tracking, forex timing)",
      "Commute & Green Ledger (Personal carbon ledger, EV commute credit)",
      "Culture & Peer Recognition (Cheer tokens convertible to cash bonuses)",
      "Festivals & Cultural Leave (Personalized calendars, festival advances)",
      "Inclusion & Pay Equity (Maternity phase-in, promotion velocity)",
      "Accessibility & Adaptive UI (WCAG AAA high-contrast and screen-reader)",
      "Regional Voice Assistant (Indic language voice bot in Telugu/Hindi/Tamil)"
    ],
    metrics: [
      { label: "Workation Allowance", value: "14 Days", change: "Tax Cleared" },
      { label: "Carbon Offset Saved", value: "142 kg CO2", change: "+18 kg Credit" },
      { label: "Peer Cheer Tokens", value: "450 Tokens", change: "Redeemable" }
    ],
    aiFeature: {
      name: "Global Tax Sentry & Indic Voice Pipeline",
      type: "Multi-Jurisdiction Tax Engine & Indic Voice Transformer",
      description: "Tracks physical location against 183-day international tax nexus while powering hands-free payroll queries in regional Indian languages."
    },
    keyPillars: [
      { title: "Nomadic Workation", detail: "Work from anywhere with automated cross-border tax risk scanning." },
      { title: "Green Commute Credit", detail: "Earn direct salary rebates for cycling, metro, and EV carpooling." },
      { title: "Indic Voice Bot", detail: "Ask 'How much is my salary?' in Telugu, Hindi, or Tamil." }
    ],
    roleAccess: ["admin", "hr", "accountant", "manager", "employee"]
  },
  {
    id: "governance-sovereignty",
    number: "05",
    title: "Data Sovereignty, Cryptographic Trust & Sentinel",
    subTitle: "Self-Sovereign Identity, Ghost Detection & Compliance",
    accentColor: "#047857", // Forest Emerald
    bgGlow: "rgba(4, 120, 87, 0.15)",
    iconName: "Lock",
    botanicalArchetype: "Crystalline Emerald Geode",
    tagline: "Employee self-sovereign data vaults & autonomous fraud sentinels",
    description: "Guarantees absolute integrity with cryptographic SHA-256 payslips, zero-knowledge bank disclosures, anonymous whistleblowing retaliation sentinels, ghost employee detection, and statutory compliance.",
    coveredDimensionsCount: 8,
    coveredDimensions: [
      "Data Passport & Sovereignty (Time-limited self-sovereign disclosures)",
      "Trust & Verifiable Payslips (Cryptographic bank verification)",
      "Fraud Sentinel & Audit Log (Ghost employee isolation, duplicate accounts)",
      "Ethics & Whistleblowing (Anonymous reporting, anti-retaliation sentinel)",
      "Grievance & Labour Code (Indian labour code explainer, SLA triage)",
      "Tax & Statutory Compliance (New vs Old regime optimizer, Form 16)",
      "Asset Lifecycle & Hardware Deductions (Device vault, exit settlement)",
      "Exit & Gratuity Projector (Full-and-final settlement simulator)"
    ],
    metrics: [
      { label: "Data Passport Status", value: "Self-Sovereign", change: "Encrypted" },
      { label: "Fraud Sentry Flags", value: "0 Anomalies", change: "Audited" },
      { label: "Tax Regime Benefit", value: "₹24,800 Save", change: "Optimized" }
    ],
    aiFeature: {
      name: "Zero-Knowledge Data Passport & Ghost Employee Isolation",
      type: "Cryptographic ZK Proof & Graph Anomaly Clustering",
      description: "Generates time-expiring verifiable salary credentials for mortgage applications without leaking unneeded personal records."
    },
    keyPillars: [
      { title: "Data Passport", detail: "Share verified income with landlords/banks with 24h self-destruct." },
      { title: "Ghost Sentry", detail: "Detects phantom accounts and payroll skimming autonomously." },
      { title: "Verifiable Payslips", detail: "Instant cryptographic digital signatures that banks trust." }
    ],
    roleAccess: ["admin", "hr", "accountant", "manager", "employee"]
  }
];
