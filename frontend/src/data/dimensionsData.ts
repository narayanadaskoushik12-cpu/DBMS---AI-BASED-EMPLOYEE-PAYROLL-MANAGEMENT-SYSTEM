export interface DimensionItem {
  id: number;
  category: string;
  name: string;
  tagline: string;
  description: string;
  rare: boolean;
  metric: string;
  metricLabel: string;
  color: string;
  iconName: string;
  features: string[];
  roleAccess: ('admin' | 'hr' | 'accountant' | 'manager' | 'employee')[];
  aiLayer: string;
}

export const ALL_DIMENSIONS: DimensionItem[] = [
  // 1 to 20
  {
    id: 1,
    category: "Financial Core",
    name: "Pay & Salary",
    tagline: "Predictive & Explainable Compensation",
    description: "Real-time AI net pay forecasting, inflation-adjusted purchasing power, and automated salary delta explainability.",
    rare: true,
    metric: "₹1,42,500",
    metricLabel: "Projected Net Pay",
    color: "#38bdf8",
    iconName: "Banknote",
    features: [
      "Predictive payslip (forecasts net pay mid-month from real-time attendance)",
      "'Why did my salary change?' plain-language difference explainer",
      "Real-salary tracker adjusted for regional inflation index",
      "Automated algorithmic pay-equity gap auditor"
    ],
    roleAccess: ["admin", "hr", "accountant", "manager", "employee"],
    aiLayer: "Explainable Regression AI + Anomaly Detector"
  },
  {
    id: 2,
    category: "Financial Wellness",
    name: "Financial Wellness",
    tagline: "Stress Index & What-If Simulator",
    description: "Proactive financial health scoring, zero-predatory wage access, and life-event scenario modeling.",
    rare: true,
    metric: "14 / 100",
    metricLabel: "Financial Stress Score (Low)",
    color: "#10b981",
    iconName: "HeartHandshake",
    features: [
      "Salary what-if simulator ('What if I take ₹25L home loan / relocate?')",
      "Financial stress score with early wellness assistance recommendations",
      "Earned wage access with AI risk scoring for mid-month liquidity",
      "Savings autopilot: auto-allocates 15% directly into high-yield accounts"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Financial Stress Predictive Model & Monte Carlo What-If"
  },
  {
    id: 3,
    category: "Life & Continuity",
    name: "Life Events Engine",
    tagline: "One-Click Cascade Orchestration",
    description: "Marriage, childbirth, or emergency hospital admissions auto-propagate to insurance, leave balances, and tax forms.",
    rare: true,
    metric: "4 Triggers",
    metricLabel: "Automated Life Policies Active",
    color: "#f59e0b",
    iconName: "Sparkles",
    features: [
      "Universal life trigger cascades into PF, tax slabs, and dependents",
      "Emergency Hospitalization Mode: instant cashless pre-approval & advance",
      "Maternity/Paternity flexible phase-in calendar",
      "Bereavement support & instant compassionate leave grant"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Automated Policy Multi-Agent Orchestrator"
  },
  {
    id: 4,
    category: "Health & Care",
    name: "Health & Insurance",
    tagline: "Preventative Coverage & Family Gap Analyzer",
    description: "Analyzes life-stage insurance needs, flags coverage blindspots, and prevents insurance claim fraud.",
    rare: true,
    metric: "₹15,00,000",
    metricLabel: "Optimal Family Cover Target",
    color: "#ec4899",
    iconName: "ShieldPulse",
    features: [
      "Insurance gap analyzer matching age, liabilities, and dependants",
      "Family health risk forecaster & annual screening reminders",
      "Cashless pre-approval predictor with real-time TPA sync",
      "Subsidized executive checkup scheduler"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Actuarial Health Risk Predictor"
  },
  {
    id: 5,
    category: "Mental Wellbeing",
    name: "Mental Wellbeing & Fatigue",
    tagline: "Overtime Fatigue Guard & NLP Radar",
    description: "Guardrails against employee burnout by analyzing work hours, communication strain, and anonymous team sentiment.",
    rare: true,
    metric: "91 / 100",
    metricLabel: "Vigor & Balance Index",
    color: "#8b5cf6",
    iconName: "Activity",
    features: [
      "Overtime fatigue guard: automatically flags excessive weekly hours",
      "Anonymous sentiment radar: NLP detection of organizational stress",
      "Work-life balance tier unlocking wellness recharge days",
      "Confidential 1-on-1 mental counseling credit access"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Transformer-based Sentiment Analysis & Fatigue Classifier"
  },
  {
    id: 6,
    category: "Time & Productivity",
    name: "Leave & Time Dynamics",
    tagline: "Burnout-Aware Scheduling & Smart Calendar",
    description: "Algorithmic leave optimization that maximizes long weekends while guaranteeing zero departmental coverage blackouts.",
    rare: true,
    metric: "18 Days",
    metricLabel: "Optimized Balance Remaining",
    color: "#06b6d4",
    iconName: "CalendarClock",
    features: [
      "Smart leave planner: recommends best bridge days around public holidays",
      "Burnout nudges: 'You haven't taken a continuous 3-day break in 85 days'",
      "Automated Loss-of-Pay (LOP) calculations with shift sync",
      "Geo-fenced mobile check-in with tamper-proof validation"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Genetic Algorithm Holiday Optimizer"
  },
  {
    id: 7,
    category: "Career & Growth",
    name: "Skills & Career Twin",
    tagline: "5-Year Career Digital Twin & Pay Mapper",
    description: "Simulates career trajectories, market compensation delta for new skills, and generates automated raise-readiness audits.",
    rare: true,
    metric: "+₹3.4L",
    metricLabel: "Next High-Value Skill Increment",
    color: "#6366f1",
    iconName: "Cpu",
    features: [
      "Skill-to-salary mapper: demonstrates real market value of upskilling",
      "Career Digital Twin: simulates 5-year earnings across promotion paths",
      "Raise-readiness score: objective data-backed increment assessment",
      "Manager appraisal bias detector for fair review calibration"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Digital Twin Predictive Compensation Model"
  },
  {
    id: 8,
    category: "Governance & Security",
    name: "Trust, Privacy & Security",
    tagline: "Cryptographic Payslips & Access Ledger",
    description: "Verifiable digital signature hashes for tamper-proof bank verification and an employee data transparency monitor.",
    rare: true,
    metric: "SHA-256",
    metricLabel: "Cryptographic Hash Verified",
    color: "#14b8a6",
    iconName: "Lock",
    features: [
      "Verifiable payslips: banks instantly verify authentic salary certificates",
      "'Who viewed my data' transparent employee audit dashboard",
      "Ghost employee identification via anomalous banking & IP patterns",
      "Zero-Knowledge data isolation between payroll officers and managers"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Behavioral Anomaly & Fraud Isolation Engine"
  },
  {
    id: 9,
    category: "Workplace Culture",
    name: "Culture & Peer Recognition",
    tagline: "Micro-Bonus Tokens & Peer Cheers",
    description: "Gamified appreciation tokens that employees award each other, redeemable for tangible micro-bonuses in payroll.",
    rare: true,
    metric: "450 Tokens",
    metricLabel: "Available Peer Cheers",
    color: "#f43f5e",
    iconName: "Award",
    features: [
      "Peer recognition tokens with direct payroll micro-bonus conversion",
      "Internal interest-free emergency micro-loan peer pool",
      "Team shoutouts feed with live leaderboards",
      "Core company value milestone achievements"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Social Recognition Network Graph"
  },
  {
    id: 10,
    category: "Sustainability",
    name: "Commute & Green Ledger",
    tagline: "Carbon Footprint & Green Allowance",
    description: "Links daily commute choices to a verified personal carbon savings ledger with green commute salary bonuses.",
    rare: true,
    metric: "142 kg CO2",
    metricLabel: "Carbon Offset Saved This Quarter",
    color: "#22c55e",
    iconName: "Leaf",
    features: [
      "Green commute rewards: EV, carpooling and metro commute allowances",
      "Corporate ESG payroll contribution matching",
      "Team environmental leaderboard and eco-credits",
      "Subsidized public transit pass integrations"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Commute Route Carbon Calculus Engine"
  },
  {
    id: 11,
    category: "Accessibility & Inclusion",
    name: "Regional Voice Assistant",
    tagline: "Multilingual Voice Interface (Indic Languages)",
    description: "Voice-activated payroll queries in Hindi, Telugu, Tamil, and Marathi tailored for desk and non-desk frontline workers.",
    rare: true,
    metric: "4 Languages",
    metricLabel: "Voice NLP Modules Enabled",
    color: "#eab308",
    iconName: "Mic",
    features: [
      "Voice bot for 'What is my net pay this month?' in regional Indian languages",
      "WhatsApp automated payslip delivery and interactive query bot",
      "Audio-guided tax declaration submission for non-desk staff",
      "Real-time speech-to-text leave application"
    ],
    roleAccess: ["admin", "hr", "accountant", "manager", "employee"],
    aiLayer: "Indic Speech-to-Intent Deep Learning Pipeline"
  },
  {
    id: 12,
    category: "Life Cycle & Exit",
    name: "Exit & Gratuity Projector",
    tagline: "Full-and-Final Simulator & Retirement Math",
    description: "Simulates exact full-and-final settlement breakdown, gratuity maturity, PF compound growth, and notice period handover.",
    rare: true,
    metric: "₹18,45,000",
    metricLabel: "Projected Gratuity & PF Maturity",
    color: "#64748b",
    iconName: "Hourglass",
    features: [
      "Full-and-final settlement simulator (leave encashment, gratuity, notice buyout)",
      "Retirement PF growth forecasting with inflation adjustments",
      "Knowledge-transfer completion score during notice period",
      "Alumni network and tax Form-16 archive access"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Actuarial Gratuity Compound Forecasting"
  },
  {
    id: 13,
    category: "Housing & Relocation",
    name: "Housing & Relocation",
    tagline: "Rent vs Buy & Cost-of-Living Equalizer",
    description: "Computes purchasing parity between metros (e.g. Bangalore vs Hyderabad) and optimizes HRA tax exemptions.",
    rare: true,
    metric: "₹18,200",
    metricLabel: "Annual Tax Saved via HRA Optimizer",
    color: "#0284c7",
    iconName: "Home",
    features: [
      "Rent vs Buy advisor based on monthly cashflow and home loan EMI",
      "City cost-of-living salary equalizer for internal corporate transfers",
      "HRA automated optimizer for maximum permissible tax relief",
      "Company lease rent deduction direct-to-landlord facility"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "City Living Index Parity Solver"
  },
  {
    id: 14,
    category: "Family & Childcare",
    name: "Children's Education",
    tagline: "School Tuition Fund & Zero-Cost Advance",
    description: "Long-term education inflation projection with dedicated automated monthly deductions and zero-interest school fee advances.",
    rare: true,
    metric: "₹8,500/mo",
    metricLabel: "Dedicated Education Deduction Goal",
    color: "#f97316",
    iconName: "GraduationCap",
    features: [
      "15-year higher education inflation predictor & SIP auto-link",
      "Annual school fee advance with zero-interest 10-month payroll recovery",
      "Daycare & crèche corporate tie-up subsidy tracker",
      "Merit scholarship rewards for employee children"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Educational Inflation Actuarial Curve"
  },
  {
    id: 15,
    category: "Legal & Compliance",
    name: "Grievance & Labour Code",
    tagline: "AI SLA Triage & Legal Assistant",
    description: "Automated routing of workplace complaints with Indian labour code compliance auditing and dispute evidence collection.",
    rare: true,
    metric: "100%",
    metricLabel: "Statutory SLA Compliance",
    color: "#ef4444",
    iconName: "Scale",
    features: [
      "AI grievance triage: categorizes urgency and routes to POSH / HR committee",
      "Indian Labour Code explainer (wages, overtime rights, notice legality)",
      "Payslip dispute assistant that auto-pulls timesheet & swipe records",
      "Automated escalation triggers when SLA exceeds 72 hours"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Legal NLP Classifier & SLA Sentinel"
  },
  {
    id: 16,
    category: "Ethics & Integrity",
    name: "Ethics & Whistleblowing",
    tagline: "Anonymous Protected Channel & Retaliation Guard",
    description: "End-to-end cryptographic reporting preserving reporter anonymity while scanning for retaliatory rating drops.",
    rare: true,
    metric: "Zero-Trace",
    metricLabel: "Identity Protection Status",
    color: "#991b1b",
    iconName: "EyeOff",
    features: [
      "Anonymous whistleblowing channel with asymmetric key reply capability",
      "Anti-retaliation sentinel: flags sudden punitive manager actions post-report",
      "Independent ethics committee audit log",
      "External independent ombudsman escalation pathway"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Manager Bias & Retaliation Detection Algorithm"
  },
  {
    id: 17,
    category: "Workforce Flexibility",
    name: "Contract & Gig Workers",
    tagline: "Milestone Verification & Conversion Predictor",
    description: "Releases milestone-verified payments to freelancers and predicts which contractors should be converted to full-time.",
    rare: true,
    metric: "3 Candidates",
    metricLabel: "Recommended for Full-Time Conversion",
    color: "#a855f7",
    iconName: "Briefcase",
    features: [
      "Milestone-based pay engine tied to GitHub commits or Jira deliverables",
      "Contractor-to-permanent conversion score based on long-term project impact",
      "Contract expiry countdown with auto-compliance renewal triggers",
      "TDS 194J / 194C contractor withholding calculation"
    ],
    roleAccess: ["admin", "hr", "accountant", "manager"],
    aiLayer: "Contractor Conversion Machine Learning Classifier"
  },
  {
    id: 18,
    category: "Global Operations",
    name: "Remote & Global Work",
    tagline: "Multi-Country Tax Sentry & FX Optimizer",
    description: "Monitors cross-border tax residency triggers for nomads and times salary remittances during optimal forex windows.",
    rare: true,
    metric: "183 Days",
    metricLabel: "Tax Residency Threshold Monitored",
    color: "#0ea5e9",
    iconName: "Globe2",
    features: [
      "Multi-country tax-residency tracker: alerts before crossing 183-day limit",
      "Forex payout timing optimizer for cross-border contractor payouts",
      "Entity-of-Record (EOR) statutory compliance harmonization",
      "Timezone overlap compensation allowance calculation"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Forex Volatility Predictor & Cross-Border Tax Engine"
  },
  {
    id: 19,
    category: "Culture & Celebrations",
    name: "Festivals & Cultural Leave",
    tagline: "Custom Calendar & Festival Advance",
    description: "Predicts festival-season cash spikes (Diwali, Eid, Christmas) with zero-fee salary advances and personalized holidays.",
    rare: true,
    metric: "₹40,000",
    metricLabel: "Approved Festival Advance Limit",
    color: "#d946ef",
    iconName: "PartyPopper",
    features: [
      "Automated festival advance pool with interest-free 4-month repayment",
      "Personalized religious and regional holiday calendar selector",
      "Festival gifting stipend allocation",
      "Cultural celebration team budget tracker"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Seasonal Cashflow & Holiday Forecast Engine"
  },
  {
    id: 20,
    category: "Capital & Wealth",
    name: "Equity & ESOP Simulator",
    tagline: "Vesting Schedule & Valuation Modeling",
    description: "Models portfolio valuation under future funding rounds, IPO scenarios, and computes perquisite tax liability upon exercise.",
    rare: true,
    metric: "₹48.2L",
    metricLabel: "Projected Series-C ESOP Valuation",
    color: "#e11d48",
    iconName: "TrendingUp",
    features: [
      "Interactive ESOP valuation simulator across 3x, 5x, and 10x company growth",
      "Real-time vesting calendar with cliff countdowns",
      "Perquisite tax estimator on share exercise",
      "Secondary sale and buyback window notifications"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Monte Carlo Equity & Black-Scholes Valuation Engine"
  },

  // 21 to 40
  {
    id: 21,
    category: "Safety & Health",
    name: "Workplace Safety & Incident",
    tagline: "Incident-to-Insurance Automatic Bridge",
    description: "Instantly triggers workers compensation, emergency medical leave, and generates incident heatmaps across facilities.",
    rare: true,
    metric: "Zero LTI",
    metricLabel: "Lost-Time Injury Rate",
    color: "#ea580c",
    iconName: "HardHat",
    features: [
      "One-click incident-to-insurance bridge: auto-initiates claim and leave",
      "Facility hazard heatmap with targeted safety training suggestions",
      "Ergonomic assessment survey with equipment stipend allocation",
      "Worker safety compliance regulatory filings"
    ],
    roleAccess: ["admin", "hr", "manager"],
    aiLayer: "Incident Pattern Detection & Risk Cluster AI"
  },
  {
    id: 22,
    category: "Diversity & Inclusion",
    name: "Inclusion & Pay Equity",
    tagline: "Maternity Phase-In & Gender Gap Auditor",
    description: "Audits promotion velocity and pay equity across demographic cohorts while facilitating seamless maternity returns.",
    rare: true,
    metric: "98.4%",
    metricLabel: "Equal Pay Parity Score",
    color: "#ec4899",
    iconName: "Users",
    features: [
      "Maternity return-to-work planner: phased 50% hours with full pay continuity",
      "Algorithmic pay-gap and promotion-speed auditor by gender and tenure",
      "Late-night shift safe-commute tracking and cab vouchers",
      "Neurodiversity and caregiver flexible schedule allowances"
    ],
    roleAccess: ["admin", "hr", "manager"],
    aiLayer: "Statistical Parity & Bias Mitigation Model"
  },
  {
    id: 23,
    category: "Universal Accessibility",
    name: "Accessibility & Adaptive UI",
    tagline: "Screen-Reader & High-Contrast Modes",
    description: "WCAG AAA compliant visual modes, font scaling, screen reader semantic mappings, and keyboard-first navigability.",
    rare: true,
    metric: "WCAG AAA",
    metricLabel: "Compliance Certification",
    color: "#059669",
    iconName: "Accessibility",
    features: [
      "Adaptive interface: instant switch between normal, high-contrast, and large font",
      "Full keyboard shortcut navigation for complete payroll operations",
      "Voice-guided navigation and screen reader auditory confirmation",
      "Reasonable accommodation expense tracker"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Dynamic DOM Accessibility Reformatter"
  },
  {
    id: 24,
    category: "Time Economics",
    name: "Productivity & Time Value",
    tagline: "Meeting Cost-Per-Hour & Effort Fairness",
    description: "Reveals aggregate salary cost burned by recurring multi-person meetings and evaluates compensation effort fairness.",
    rare: true,
    metric: "₹14,500/hr",
    metricLabel: "Current Meeting Burn Rate",
    color: "#f59e0b",
    iconName: "Clock",
    features: [
      "Real-time Meeting Cost Calculator: displays rupee value of attendee salaries",
      "Effort vs pay fairness index benchmarking output against market compensation",
      "No-meeting focus day automated payroll productivity index",
      "Deep work block protection score"
    ],
    roleAccess: ["admin", "hr", "manager"],
    aiLayer: "Calendar Cost & Organizational Network Analytics"
  },
  {
    id: 25,
    category: "Internal Mobility",
    name: "Internal Talent Marketplace",
    tagline: "Skill-Gig Board & Idle Talent Matching",
    description: "Staff take on cross-functional internal sprints for micro-bonuses while resolving departmental resource crunches.",
    rare: true,
    metric: "12 Gigs Open",
    metricLabel: "Internal Sprints with Cash Rewards",
    color: "#6366f1",
    iconName: "Network",
    features: [
      "Internal gig board: pick up engineering or marketing tasks for direct pay",
      "Auto-matching engine pairing underutilized employees with team bottlenecks",
      "Skill verification via peer code/design review",
      "Internal transfer velocity tracker"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Bipartite Skill Matching Recommendation Engine"
  },
  {
    id: 26,
    category: "Mentorship & Social",
    name: "Mentorship & Social Graph",
    tagline: "Career Mentoring & Attrition Graph",
    description: "Pairs junior talent with senior mentors and analyzes informal organizational communication hubs to pinpoint attrition risks.",
    rare: true,
    metric: "88% Match",
    metricLabel: "Optimal Senior Mentor Pairing",
    color: "#8b5cf6",
    iconName: "UserCheck",
    features: [
      "AI mentor matching based on target career paths and skill aspirations",
      "Organizational social graph isolating indispensable cross-team nodes",
      "Flight-risk sentinel when key social connectors show disengagement",
      "Mentorship stipend credits for active senior guides"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Graph Neural Network & Community Detection"
  },
  {
    id: 27,
    category: "Engagement",
    name: "Gamification & Milestones",
    tagline: "Streaks, Badges & Wellness Rewards",
    description: "Tracks continuous learning, fitness streaks, and tenure milestones unlocking small cash bonuses or charity matching.",
    rare: true,
    metric: "42 Day Streak",
    metricLabel: "Learning & Wellness Milestone",
    color: "#10b981",
    iconName: "Zap",
    features: [
      "Learning streaks that unlock tangible learning stipends",
      "Fairness-adjusted team fitness & step challenge rewards",
      "Work anniversary digital badges with commemorative loyalty cash",
      "Charity reward token redemption"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Behavioral Reinforcement Engine"
  },
  {
    id: 28,
    category: "Expense Management",
    name: "Travel & Expense Reimbursement",
    tagline: "OCR Snap-to-Reimburse & Fraud Sentry",
    description: "Photograph a receipt for instant OCR extraction, policy threshold check, and immediate approval in next payroll cycle.",
    rare: true,
    metric: "1.8 Seconds",
    metricLabel: "Average Receipt OCR Processing Time",
    color: "#06b6d4",
    iconName: "Receipt",
    features: [
      "Receipt-to-reimbursement in one snap: OCR parses amount, GST, and vendor",
      "Duplicate claim & personal expense anomaly detector",
      "Corporate card auto-reconciliation with automated GST input tax credit",
      "Per-diem auto-calculation by travel tier"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Multi-modal OCR + Fraud Anomaly Filter"
  },
  {
    id: 29,
    category: "Hardware & Assets",
    name: "Asset Lifecycle & Deductions",
    tagline: "Device Provisioning & Exit Recovery",
    description: "Tracks company laptops, monitors, and tokens with automated fair-depreciation deduction workflows if unreturned.",
    rare: true,
    metric: "3 Devices",
    metricLabel: "Active Allocated Hardware",
    color: "#475569",
    iconName: "Laptop",
    features: [
      "Device allocation & serial number vault tied to employee profile",
      "Depreciation calculator: buy your work laptop at 3-year residual book value",
      "Automated exit settlement clearance checklist for hardware returns",
      "Asset damage insurance coverage status"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Asset Residual Valuation Curve"
  },
  {
    id: 30,
    category: "Life Aspirations",
    name: "Goal-Based Payroll",
    tagline: "Freedom Date & Dream Fund",
    description: "Allocate percentage deductions to personal goals (car, home, wedding) and calculate your Financial Independence date.",
    rare: true,
    metric: "14 Nov 2034",
    metricLabel: "Projected Financial Freedom Date",
    color: "#16a34a",
    iconName: "Target",
    features: [
      "Goal-based savings vaults: auto-deducts towards car downpayment or wedding",
      "'Freedom Date' calculator: calculates financial independence year",
      "Compound interest simulation with conservative vs aggressive asset yields",
      "Micro-investing rounding up surplus monthly salary"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "FIRE (Financial Independence) Compound Engine"
  },
  {
    id: 31,
    category: "ESG & Carbon",
    name: "Personal ESG & Philanthropy",
    tagline: "Carbon Ledger & 100% Match CSR",
    description: "Logs commute carbon savings and matches employee charitable donations rupee-for-rupee straight through payroll.",
    rare: true,
    metric: "₹5,000 Matched",
    metricLabel: "Corporate CSR Donation Doubling",
    color: "#15803d",
    iconName: "Heart",
    features: [
      "Personal carbon ledger calculated from travel and office resource usage",
      "Corporate CSR donation matching: 1:1 deduction to verified non-profits",
      "Paid volunteer day off tracking and impact metrics",
      "Annual personal ESG certificate for social impact"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Greenhouse Gas Emissions Calculator"
  },
  {
    id: 32,
    category: "Data Sovereignty",
    name: "Data Passport & Sovereignty",
    tagline: "Self-Sovereign Identity & Access Ledger",
    description: "Employees control what verified salary and tenure data external banks or landlords can inspect and for how long.",
    rare: true,
    metric: "2 Active Shares",
    metricLabel: "Time-Limited Bank Disclosures",
    color: "#4338ca",
    iconName: "Key",
    features: [
      "Employee data passport: create expiring verification links for home loans",
      "Granular consent ledger: see every HR query and external data disclosure",
      "One-click Right-to-be-Forgotten request workflow after company exit",
      "Zero-Knowledge Proof salary range verification without exact rupee disclosure"
    ],
    roleAccess: ["admin", "hr", "employee"],
    aiLayer: "Zero-Knowledge Cryptographic Token Engine"
  },
  {
    id: 33,
    category: "Tax Optimization",
    name: "Tax & Statutory Compliance",
    tagline: "New vs Old Regime AI & Form 16",
    description: "Live comparative analysis between old and new Indian tax regimes, automated 80C/80D proof verification, and Form-16.",
    rare: false,
    metric: "₹24,800",
    metricLabel: "Savings with Recommended New Regime",
    color: "#0284c7",
    iconName: "FileSpreadsheet",
    features: [
      "Old vs New tax regime simulator that evaluates allowances and investments",
      "AI OCR investment declaration verification (LIC, PPF, Tuition fees)",
      "Automated Form 16 Part A & B batch compilation with digital signatures",
      "Statutory PF, ESI, Professional Tax, and TDS automated Challan generation"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Tax Slab Optimization Algorithm"
  },
  {
    id: 34,
    category: "Appraisal & Reviews",
    name: "Performance & Appraisal",
    tagline: "360 Reviews & Rating-Linked Hikes",
    description: "Aligns quarterly OKRs, manager reviews, and peer ratings directly with transparent, rule-based bonus percentages.",
    rare: false,
    metric: "4.7 / 5.0",
    metricLabel: "Weighted Annual Appraisal Rating",
    color: "#7c3aed",
    iconName: "BarChart3",
    features: [
      "Dynamic OKR and KPI tracking linked to variable compensation payout",
      "360-degree feedback collation with sentiment scoring",
      "Automated compensation hike matrix linking rating tier to hike percentages",
      "Manager bell-curve normalization simulator"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Bell-Curve Calibration & NLP Feedback Summarizer"
  },
  {
    id: 35,
    category: "Recruitment & Onboarding",
    name: "Recruitment & Candidate Settle",
    tagline: "Offer Modeling & Automated Onboarding",
    description: "Converts candidate salary requirements to CTC structures, issues offer letters, and automates digital joining verification.",
    rare: false,
    metric: "4 Days",
    metricLabel: "Average Time-to-Onboard",
    color: "#db2777",
    iconName: "UserPlus",
    features: [
      "CTC builder: auto-breaks gross offer into Basic, HRA, and Retirals",
      "Automated digital offer letter generation and e-signature tracking",
      "Paperless onboarding vault: Aadhaar/PAN validation and bank verification",
      "Predictive candidate joining probability based on engagement"
    ],
    roleAccess: ["admin", "hr", "manager"],
    aiLayer: "Offer Acceptance Machine Learning Predictor"
  },
  {
    id: 36,
    category: "Executive Telemetry",
    name: "Analytics & Cost Forecasting",
    tagline: "Departmental Cost & Next-Month Forecast",
    description: "Executive dashboards detailing payroll burn, overtime spikes, departmental variance, and predictive cost forecasting.",
    rare: false,
    metric: "₹4.82 Cr",
    metricLabel: "Total Monthly Organization Payroll",
    color: "#2563eb",
    iconName: "PieChart",
    features: [
      "Departmental payroll cost distribution and year-on-year drift",
      "Next-quarter payroll forecast incorporating scheduled increments and hiring",
      "Natural language analytics: 'Show me Sales overtime expense in Q3'",
      "Industry salary benchmarking across percentiles"
    ],
    roleAccess: ["admin", "hr", "accountant"],
    aiLayer: "Time-Series ARIMA / Prophet Payroll Cost Predictor"
  },
  {
    id: 37,
    category: "Conversational AI",
    name: "AI Copilot & Policy Bot",
    tagline: "Instant Answers & Leave Balance Helper",
    description: "24/7 intelligent conversational copilot answering salary questions, policy limits, tax declarations, and leave rules.",
    rare: false,
    metric: "< 1 sec",
    metricLabel: "Average Policy Query Response Time",
    color: "#8b5cf6",
    iconName: "Bot",
    features: [
      "Answers questions: 'How much medical insurance cover do my parents have?'",
      "One-click action execution: 'Apply for 2 days leave starting tomorrow'",
      "Company policy handbook semantic search and citation",
      "Available across Web, Slack, and Mobile app"
    ],
    roleAccess: ["admin", "hr", "accountant", "manager", "employee"],
    aiLayer: "RAG (Retrieval-Augmented Generation) Enterprise Model"
  },
  {
    id: 38,
    category: "Security & Auditing",
    name: "Fraud Sentinel & Audit Log",
    tagline: "Ghost Employee & Discrepancy Sentry",
    description: "Continuous background auditing detecting duplicate bank accounts, anomalous pay adjustments, and ghost employees.",
    rare: false,
    metric: "Zero Flags",
    metricLabel: "Integrity Status in Current Payroll Run",
    color: "#dc2626",
    iconName: "ShieldAlert",
    features: [
      "Ghost employee detector: flags records lacking badge activity or devices",
      "Duplicate bank account and IFSC anomaly scanning before bank payout",
      "Immutable tamper-evident audit log for every compensation edit",
      "Granular role-based security access matrices"
    ],
    roleAccess: ["admin", "accountant"],
    aiLayer: "Graph Pattern Anomaly Isolation AI"
  },
  {
    id: 39,
    category: "Attendance Telemetry",
    name: "Attendance & Shift Logistics",
    tagline: "Biometric & Geo-Fence Sync",
    description: "Seamless integration with biometric turnstiles, rotational shift patterns, and automated late-coming grace periods.",
    rare: false,
    metric: "96.8%",
    metricLabel: "Monthly Punctuality Index",
    color: "#0d9488",
    iconName: "Fingerprint",
    features: [
      "Hardware biometric & geo-fenced mobile punch reconciliation",
      "Night shift & rotational roster allowance automated calculation",
      "Grace-period logic and automatic loss-of-pay deductions",
      "Overtime pre-approval workflow and compensatory-off credits"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Attendance Anomaly & Pattern Clustering"
  },
  {
    id: 40,
    category: "Core Calculations",
    name: "Gross-to-Net Engine",
    tagline: "Arrears, Retirals & Bank File Creator",
    description: "Calculates Basic, HRA, DA, Special Allowances, PF, ESI, PT, and exports automated NEFT/RTGS bank transfer files.",
    rare: false,
    metric: "₹1,85,000",
    metricLabel: "Gross CTC per Month",
    color: "#3b82f6",
    iconName: "Calculator",
    features: [
      "Automated gross-to-net calculation engine adhering to Indian wage laws",
      "Retroactive arrears computation following past promotion effective dates",
      "Direct bank batch upload file generation (HDFC, ICICI, SBI formats)",
      "High-speed batch processing capable of handling 50,000+ employees"
    ],
    roleAccess: ["admin", "accountant"],
    aiLayer: "Deterministic Compliant Formula Solver"
  },

  // 41 to 45: The 5 New Dimensions
  {
    id: 41,
    category: "AI Future of Work",
    name: "AI Agent Teammate & Co-Pilot Allowance",
    tagline: "Human-AI Synergy & Tooling Budget",
    description: "Assigns and tracks AI tooling allowances (e.g. Claude, OpenAI, Cursor credits) and measures productivity leverage.",
    rare: true,
    metric: "$120 / mo",
    metricLabel: "Allocated AI Tooling Stipend",
    color: "#38bdf8",
    iconName: "Sparkle",
    features: [
      "Direct payroll allowance for licensed AI models and productivity tools",
      "Human-AI Synergy Index measuring output amplification",
      "Automated team token expense pooled budgeting",
      "Department AI tool ROI analytics and subscription reconciliation"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "AI Tool ROI & Output Synergy Analytics"
  },
  {
    id: 42,
    category: "Global Mobility",
    name: "Workation & Nomadic Payroll",
    tagline: "2-4 Week Remote Workation Sentry",
    description: "Enables flexible overseas or coastal workations with real-time tax compliance alerts, coworking stipends, and travel safety.",
    rare: true,
    metric: "14 Days",
    metricLabel: "Workation Allowance Remaining",
    color: "#06b6d4",
    iconName: "Palmtree",
    features: [
      "One-click workation request with automatic tax nexus checking",
      "Local coworking desk stipend and high-speed Wi-Fi allowance",
      "International travel health insurance instant activation",
      "Timezone overlap schedule optimizer"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Jurisdiction Tax Nexus & Geo-Compliance Engine"
  },
  {
    id: 43,
    category: "IP & Innovation",
    name: "Innovation & Patent Royalties",
    tagline: "Automated Royalty Micro-Bonuses",
    description: "Rewarding internal patents, open-source tools, and high-impact design systems with ongoing monthly royalty micro-deposits.",
    rare: true,
    metric: "₹18,500/mo",
    metricLabel: "Active Patent & Code Royalties",
    color: "#f59e0b",
    iconName: "Lightbulb",
    features: [
      "Automated recurring micro-bonuses for granted patents and trade secrets",
      "Open-source repository sponsorship direct to contributor payroll",
      "Innovation bounty board with milestone payout integration",
      "Company IP attribution ledger registered to employee profile"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Patent Impact & Code Citation Value Engine"
  },
  {
    id: 44,
    category: "Fintech Streaming",
    name: "Real-Time Streaming Salary",
    tagline: "Per-Minute / Daily Salary Streaming Vault",
    description: "Allows employees to watch their accrued salary accumulate in real-time with one-tap instant transfers without loan interest.",
    rare: true,
    metric: "₹3,412.50",
    metricLabel: "Accrued Real-Time Balance Today",
    color: "#10b981",
    iconName: "Coins",
    features: [
      "Live counter streaming rupee balance every working minute",
      "One-tap instant withdrawal to UPI / bank with zero predatory interest",
      "Smart liquidity guard: prevents overdrawing beyond safe buffer",
      "Daily automated micro-accrual ledger"
    ],
    roleAccess: ["admin", "hr", "accountant", "employee"],
    aiLayer: "Streaming Liquidity Risk & Cashflow Buffer Model"
  },
  {
    id: 45,
    category: "Internal Growth",
    name: "Internal Shadowing & Skill Rotation",
    tagline: "Cross-Skilling Apprentice Sponsor",
    description: "Enables 2-week cross-department shadowing (e.g. Support to Product) with an adjusted rotational learning stipend.",
    rare: true,
    metric: "Sprint 3",
    metricLabel: "Active Cross-Team Apprenticeship",
    color: "#a855f7",
    iconName: "GitFork",
    features: [
      "2-week cross-departmental rotational placement with mentor pairing",
      "Shadowing stipend and bonus training credit allocation",
      "Post-rotation bilateral evaluation and permanent transfer pathway",
      "Cross-discipline team synergy score"
    ],
    roleAccess: ["admin", "hr", "manager", "employee"],
    aiLayer: "Cross-Functional Skill Compatibility Matcher"
  }
];

export interface RoleProfile {
  id: 'admin' | 'hr' | 'accountant' | 'manager' | 'employee';
  name: string;
  badge: string;
  title: string;
  department: string;
  avatar: string;
  accessibleCount: number;
  description: string;
  color: string;
  employeeData: {
    name: string;
    empId: string;
    designation: string;
    grossSalary: string;
    netSalary: string;
    taxRegime: string;
    esopValue: string;
    leaveBalance: number;
    financialStressScore: number;
    patentRoyalties: string;
    streamingAccrued: string;
  };
}

export const ROLE_PROFILES: Record<string, RoleProfile> = {
  admin: {
    id: 'admin',
    name: "Vikramaditya Rao",
    badge: "Super Admin & Founder",
    title: "Chief Executive & Systems Officer",
    department: "Executive Leadership",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    accessibleCount: 45,
    description: "Complete unrestricted telemetry across all 45 dimensions, financial vaults, AI fraud sentinels, and company equity pools.",
    color: "#38bdf8",
    employeeData: {
      name: "Vikramaditya Rao",
      empId: "EMP-001",
      designation: "Chief Executive Officer",
      grossSalary: "₹4,50,000",
      netSalary: "₹3,48,200",
      taxRegime: "New Regime (115BAC)",
      esopValue: "₹1.45 Cr",
      leaveBalance: 24,
      financialStressScore: 8,
      patentRoyalties: "₹45,000/mo",
      streamingAccrued: "₹8,920.00"
    }
  },
  hr: {
    id: 'hr',
    name: "Pooja Sundaram",
    badge: "Head of People & Culture",
    title: "VP of Human Resources",
    department: "People & Talent",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    accessibleCount: 39,
    description: "Orchestration of life events, mental wellbeing fatigue radar, 360 appraisals, cross-skilling swaps, and employee grievances.",
    color: "#f43f5e",
    employeeData: {
      name: "Pooja Sundaram",
      empId: "EMP-014",
      designation: "VP - Human Resources",
      grossSalary: "₹2,80,000",
      netSalary: "₹2,18,500",
      taxRegime: "New Regime (115BAC)",
      esopValue: "₹42.8 L",
      leaveBalance: 21,
      financialStressScore: 12,
      patentRoyalties: "₹12,000/mo",
      streamingAccrued: "₹5,400.00"
    }
  },
  accountant: {
    id: 'accountant',
    name: "Karthik Subramanian",
    badge: "Principal Payroll Controller",
    title: "Head of Statutory & Tax Accounts",
    department: "Finance & Taxation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    accessibleCount: 32,
    description: "Statutory Form 16, Gross-to-Net execution, NEFT banking batch disbursement, fraud isolation, and real-time streaming liquidity.",
    color: "#10b981",
    employeeData: {
      name: "Karthik Subramanian",
      empId: "EMP-027",
      designation: "Head of Payroll Accounts",
      grossSalary: "₹2,20,000",
      netSalary: "₹1,74,300",
      taxRegime: "Old Regime (Section 80C)",
      esopValue: "₹28.4 L",
      leaveBalance: 19,
      financialStressScore: 15,
      patentRoyalties: "₹8,000/mo",
      streamingAccrued: "₹4,120.00"
    }
  },
  manager: {
    id: 'manager',
    name: "Arjun Venkataraman",
    badge: "Engineering Director",
    title: "Head of Core Infrastructure",
    department: "Engineering & Architecture",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    accessibleCount: 28,
    description: "Department payroll budgets, meeting cost analytics, overtime fatigue guard, appraisal bias auditor, and skill gig allocation.",
    color: "#a855f7",
    employeeData: {
      name: "Arjun Venkataraman",
      empId: "EMP-045",
      designation: "Engineering Director",
      grossSalary: "₹3,10,000",
      netSalary: "₹2,42,800",
      taxRegime: "New Regime (115BAC)",
      esopValue: "₹65.0 L",
      leaveBalance: 16,
      financialStressScore: 18,
      patentRoyalties: "₹28,500/mo",
      streamingAccrued: "₹6,150.00"
    }
  },
  employee: {
    id: 'employee',
    name: "Ananya Sharma",
    badge: "Senior Software Engineer",
    title: "Full Stack & Distributed Systems",
    department: "Product Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    accessibleCount: 26,
    description: "Personal self-service: 3D interactive payslip, salary delta explainer, Career Digital Twin, Goal-based payroll, and Data Passport.",
    color: "#f59e0b",
    employeeData: {
      name: "Ananya Sharma",
      empId: "EMP-108",
      designation: "Senior Software Engineer",
      grossSalary: "₹1,85,000",
      netSalary: "₹1,42,500",
      taxRegime: "New Regime (115BAC)",
      esopValue: "₹22.5 L",
      leaveBalance: 18,
      financialStressScore: 14,
      patentRoyalties: "₹18,500/mo",
      streamingAccrued: "₹3,412.50"
    }
  }
};
