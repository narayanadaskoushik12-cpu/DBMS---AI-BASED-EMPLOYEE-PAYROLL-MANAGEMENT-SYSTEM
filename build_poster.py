import os
import base64
import shutil
from html2image import Html2Image

ROOT_DIR = r"C:\Users\naray\employee-payroll-system"
BRAIN_DIR = r"C:\Users\naray\.gemini\antigravity\brain\31a9b43a-8ba7-4a2b-99c0-bb04936a6ae6"

# 1. Read base64 strings
with open(os.path.join(ROOT_DIR, "images", "employee_hero.jpg"), "rb") as f:
    hero_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(ROOT_DIR, "images", "team_collab.jpg"), "rb") as f:
    collab_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verdant Payroll OS - Project Presentation Poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }}

    body {{
      background: #020906;
      display: flex;
      justify-content: center;
      padding: 0;
      margin: 0;
      color: #e6f7ef;
      -webkit-font-smoothing: antialiased;
    }}

    .poster-container {{
      width: 1080px;
      height: 1620px;
      max-height: 1620px;
      background: #ffffff;
      color: #0f172a;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }}

    /* Top Brand Header */
    .top-header {{
      padding: 22px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      border-bottom: 2px solid #f1f5f9;
    }}

    .brand-left {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .brand-logo {{
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 800;
      font-size: 26px;
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.28);
    }}

    .brand-name {{
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }}

    .brand-sub {{
      font-size: 13px;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }}

    .brand-tagline-script {{
      font-family: 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
      font-size: 32px;
      color: #059669;
      transform: rotate(-2deg);
      letter-spacing: 0.5px;
    }}

    .brand-cert {{
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: #475569;
      font-weight: 700;
      text-align: right;
    }}

    .brand-badge-icon {{
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #ecfdf5;
      color: #10b981;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      border: 1px solid #a7f3d0;
    }}

    /* Hero Section */
    .hero-section {{
      background: linear-gradient(135deg, #021a10 0%, #064e3b 50%, #032115 100%);
      color: #ffffff;
      padding: 38px 48px;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 36px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }}

    .hero-section::after {{
      content: '';
      position: absolute;
      right: -60px;
      top: -60px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }}

    .hero-badge {{
      display: inline-block;
      padding: 6px 16px;
      background: rgba(16, 185, 129, 0.22);
      border: 1px solid rgba(52, 211, 153, 0.5);
      border-radius: 50px;
      color: #a7f3d0;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }}

    .hero-title {{
      font-size: 40px;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 14px;
      letter-spacing: -0.5px;
    }}

    .hero-title span {{
      color: #34d399;
      text-shadow: 0 0 20px rgba(52, 211, 153, 0.4);
    }}

    .hero-desc {{
      font-size: 14px;
      line-height: 1.6;
      color: #d1fae5;
      margin-bottom: 22px;
    }}

    .hero-chips {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 22px;
    }}

    .hero-chip-item {{
      text-align: center;
      padding: 10px 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      backdrop-filter: blur(8px);
    }}

    .hero-chip-icon {{
      font-size: 20px;
      margin-bottom: 4px;
      color: #34d399;
    }}

    .hero-chip-text {{
      font-size: 11px;
      font-weight: 700;
      line-height: 1.2;
    }}

    .hero-cta {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #10b981;
      color: #022c22;
      font-weight: 800;
      font-size: 13px;
      padding: 12px 28px;
      border-radius: 50px;
      box-shadow: 0 10px 24px rgba(16, 185, 129, 0.45);
      letter-spacing: 0.3px;
    }}

    /* Hero Visual Card with Employee Photo */
    .hero-visual-card {{
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      border: 2px solid rgba(52, 211, 153, 0.4);
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.55);
      background: #020906;
      height: 310px;
    }}

    .hero-emp-photo {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: contrast(1.05) brightness(0.95);
    }}

    .hero-visual-badge {{
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(2, 20, 12, 0.82);
      border: 1px solid rgba(52, 211, 153, 0.5);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      color: #34d399;
      display: flex;
      align-items: center;
      gap: 6px;
      backdrop-filter: blur(6px);
    }}

    .pulse-dot {{
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
    }}

    /* Floating Glass Card Over Photo */
    .hero-overlay-card {{
      position: absolute;
      bottom: 12px;
      left: 12px;
      right: 12px;
      background: rgba(2, 20, 12, 0.88);
      border: 1px solid rgba(52, 211, 153, 0.4);
      border-radius: 14px;
      padding: 12px 14px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.6);
    }}

    .overlay-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }}

    .overlay-stat {{
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(52, 211, 153, 0.2);
      border-radius: 8px;
      padding: 6px 10px;
    }}

    .overlay-stat-lbl {{
      font-size: 9px;
      color: #a7f3d0;
      text-transform: uppercase;
      font-weight: 700;
    }}

    .overlay-stat-val {{
      font-size: 17px;
      font-weight: 800;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
    }}

    .overlay-footer-tag {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #6ee7b7;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
    }}

    /* Section Headings */
    .section-title {{
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      letter-spacing: -0.3px;
    }}

    .section-title::before {{
      content: '';
      width: 5px;
      height: 20px;
      background: #10b981;
      border-radius: 4px;
    }}

    /* 6 Core Architecture Features Grid */
    .features-wrap {{
      padding: 26px 48px 16px 48px;
    }}

    .features-grid {{
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 12px;
    }}

    .feature-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 14px 10px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }}

    .feature-icon-circle {{
      width: 44px;
      height: 44px;
      border-radius: 12px;
      margin: 0 auto 10px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }}

    .f-icon-1 {{ background: #ecfdf5; color: #10b981; }}
    .f-icon-2 {{ background: #f0fdf4; color: #16a34a; }}
    .f-icon-3 {{ background: #e0f2fe; color: #0284c7; }}
    .f-icon-4 {{ background: #fef3c7; color: #d97706; }}
    .f-icon-5 {{ background: #fae8ff; color: #a855f7; }}
    .f-icon-6 {{ background: #ffe4e6; color: #e11d48; }}

    .feature-card h4 {{
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }}

    .feature-card p {{
      font-size: 10px;
      color: #64748b;
      line-height: 1.4;
      font-weight: 500;
    }}

    /* End-to-End Stepper Workflow */
    .journey-wrap {{
      padding: 8px 48px 18px 48px;
    }}

    .journey-stepper {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 14px 22px;
      border-radius: 16px;
    }}

    .step-item {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }}

    .step-bubble {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #10b981;
      color: #ffffff;
      font-weight: 800;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.35);
    }}

    .step-label {{
      font-size: 11px;
      font-weight: 700;
      color: #1e293b;
    }}

    .step-arrow {{
      color: #94a3b8;
      font-size: 16px;
      font-weight: bold;
    }}

    /* System Previews Section with Employee Domain Image */
    .previews-wrap {{
      padding: 8px 48px 20px 48px;
    }}

    .previews-grid {{
      display: grid;
      grid-template-columns: 1.15fr 0.95fr 0.9fr;
      gap: 16px;
    }}

    .preview-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      display: flex;
      flex-direction: column;
    }}

    .preview-header {{
      padding: 10px 14px;
      background: #f1f5f9;
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .preview-header-badge {{
      background: #dcfce7;
      color: #15803d;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
    }}

    .preview-body {{
      padding: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .preview-img-container {{
      position: relative;
      height: 118px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      border: 1px solid #cbd5e1;
    }}

    .preview-img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }}

    .preview-img-overlay {{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(2,9,6,0.85) 0%, transparent 100%);
      padding: 6px 8px;
      color: #ffffff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }}

    .ui-mock-row {{
      display: flex;
      justify-content: space-between;
      padding: 6px 10px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 11px;
      margin-bottom: 5px;
    }}

    .ui-mock-val {{
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #059669;
    }}

    /* Tech Stack & Tools Section */
    .tech-wrap {{
      padding: 8px 48px 24px 48px;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 24px;
    }}

    .tech-grid {{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
    }}

    .tools-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }}

    .tech-chip {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 6px;
      text-align: center;
    }}

    .tech-icon {{
      font-size: 20px;
      margin-bottom: 4px;
    }}

    .tech-name {{
      font-size: 11px;
      font-weight: 800;
      color: #0f172a;
    }}

    .tech-role {{
      font-size: 9px;
      color: #64748b;
      font-weight: 500;
    }}

    /* Bottom Footer Banner */
    .bottom-footer {{
      margin-top: auto;
      background: #020906;
      color: #ffffff;
      padding: 18px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #064e3b;
    }}

    .footer-left {{
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 800;
    }}

    .footer-credit {{
      font-size: 11px;
      color: #94a3b8;
      font-weight: 500;
    }}

    .footer-right-badge {{
      font-family: 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
      font-size: 24px;
      color: #34d399;
    }}
  </style>
</head>
<body>

  <div class="poster-container">
    <!-- Top Header -->
    <header class="top-header">
      <div class="brand-left">
        <div class="brand-logo">🌿</div>
        <div>
          <h1 class="brand-name">VERDANT PAYROLL OS</h1>
          <p class="brand-sub">AI-Based Employee Payroll Management System &bull; DBMS Project</p>
        </div>
      </div>
      <div class="brand-tagline-script">
        Nurture Capital, Empower Humans
      </div>
      <div class="brand-cert">
        <div>
          <div>ACID Compliant</div>
          <div style="color: #059669;">Polyglot Persistence</div>
        </div>
        <div class="brand-badge-icon">🛡️</div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
      <div>
        <span class="hero-badge">Next-Gen DBMS Architecture</span>
        <h2 class="hero-title">
          Intelligent Payroll for a <span>Smarter Workforce</span>
        </h2>
        <p class="hero-desc">
          Unifies 45 employee life dimensions into 5 master domains. Powered by per-second salary streaming, semantic RAG policy search, PostgreSQL 18.4 transactions, and local MongoDB audit ledgers.
        </p>

        <div class="hero-chips">
          <div class="hero-chip-item">
            <div class="hero-chip-icon">🔐</div>
            <div class="hero-chip-text">Bcrypt + JWT RBAC</div>
          </div>
          <div class="hero-chip-item">
            <div class="hero-chip-icon">⚡</div>
            <div class="hero-chip-text">Live Streaming Vault</div>
          </div>
          <div class="hero-chip-item">
            <div class="hero-chip-icon">🤖</div>
            <div class="hero-chip-text">Vector RAG Policy</div>
          </div>
          <div class="hero-chip-item">
            <div class="hero-chip-icon">📡</div>
            <div class="hero-chip-text">Kafka Event Bus</div>
          </div>
        </div>

        <div class="hero-cta">
          <span>Explore 5 Unified Domains &rarr;</span>
        </div>
      </div>

      <!-- Hero Visual: Real Corporate Employee Image with Live Overlays -->
      <div class="hero-visual-card">
        <img src="data:image/jpeg;base64,{hero_b64}" alt="Employee in Modern Corporate Workspace" class="hero-emp-photo" />
        <div class="hero-visual-badge">
          <span class="pulse-dot"></span>
          <span>VERDANT 3D OS &bull; LIVE</span>
        </div>
        <div class="hero-overlay-card">
          <div class="overlay-grid">
            <div class="overlay-stat">
              <div class="overlay-stat-lbl">Streaming Today</div>
              <div class="overlay-stat-val">₹3,412.50</div>
            </div>
            <div class="overlay-stat">
              <div class="overlay-stat-lbl">Net Take-Home</div>
              <div class="overlay-stat-val">₹1,42,500</div>
            </div>
          </div>
          <div class="overlay-footer-tag">
            <span>⚡ REAL-TIME DISBURSEMENT</span>
            <span>UPI: INSTANT</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Core Architecture Features (6 Cards) -->
    <div class="features-wrap">
      <h3 class="section-title">Key Core Architecture Features</h3>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-circle f-icon-1">🔑</div>
          <h4>JWT & RBAC</h4>
          <p>Bcrypt salted hashes & signed JWT access gating 5 distinct employee roles.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-circle f-icon-2">💵</div>
          <h4>Real-Time Streaming</h4>
          <p>Salary accrues per second with one-tap instant UPI wage withdrawals.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-circle f-icon-3">🔍</div>
          <h4>Semantic RAG</h4>
          <p>Cosine similarity vector search over labour codes and company policies.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-circle f-icon-4">📡</div>
          <h4>Kafka Events</h4>
          <p>Decoupled async topics delivering real-time WebSockets notifications.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-circle f-icon-5">🛡️</div>
          <h4>Polyglot DB</h4>
          <p>PostgreSQL 18.4 ACID core paired with MongoDB v8.3 immutable audit logs.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-circle f-icon-6">🧮</div>
          <h4>What-If Simulator</h4>
          <p>Monte Carlo life modeling for home loans, relocations, and tax regimes.</p>
        </div>
      </div>
    </div>

    <!-- Complete Employee Lifecycle Workflow Stepper -->
    <div class="journey-wrap">
      <h3 class="section-title">End-to-End Employee Lifecycle & Payroll Workflow</h3>
      <div class="journey-stepper">
        <div class="step-item">
          <div class="step-bubble">1</div>
          <span class="step-label">Bio-Auth</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step-item">
          <div class="step-bubble">2</div>
          <span class="step-label">Role RBAC</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step-item">
          <div class="step-bubble">3</div>
          <span class="step-label">PostgreSQL ACID</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step-item">
          <div class="step-bubble">4</div>
          <span class="step-label">Gross-to-Net</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step-item">
          <div class="step-bubble">5</div>
          <span class="step-label">Kafka Publish</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step-item">
          <div class="step-bubble">6</div>
          <span class="step-label">Mongo Audit</span>
        </div>
        <span class="step-arrow">&rarr;</span>
        <div class="step-item">
          <div class="step-bubble">7</div>
          <span class="step-label">SHA-256 Payslip</span>
        </div>
      </div>
    </div>

    <!-- Previews Section with Employee Domain Image, PostgreSQL & MongoDB -->
    <div class="previews-wrap">
      <h3 class="section-title">Employee Domain & Database Previews</h3>
      <div class="previews-grid">

        <!-- Card 1: Employee Collaborative Workplace -->
        <div class="preview-card">
          <div class="preview-header">
            <span>EMPLOYEE WORKPLACE & PORTAL</span>
            <span class="preview-header-badge">DOMAIN 1</span>
          </div>
          <div class="preview-body">
            <div class="preview-img-container">
              <img src="data:image/jpeg;base64,{collab_b64}" alt="Team Collaboration & Workforce Meeting" class="preview-img" />
              <div class="preview-img-overlay">
                <span>5-DOMAIN COLLABORATIVE HUB</span>
                <span>Active 1,250 Emp</span>
              </div>
            </div>
            <div class="ui-mock-row">
              <span>Attendance & Biometrics</span>
              <span class="ui-mock-val">99.8% Sync</span>
            </div>
            <div class="ui-mock-row">
              <span>On-Demand Wage Access</span>
              <span class="ui-mock-val">Auto-Approved</span>
            </div>
          </div>
        </div>

        <!-- Card 2: PostgreSQL 18.4 & Payslip Engine -->
        <div class="preview-card">
          <div class="preview-header">
            <span>POSTGRESQL 18 &bull; PAYSPLIP</span>
            <span>pgAdmin 4</span>
          </div>
          <div class="preview-body">
            <div class="ui-mock-row">
              <span>Basic Salary</span>
              <span class="ui-mock-val">₹75,000</span>
            </div>
            <div class="ui-mock-row">
              <span>House Rent (HRA)</span>
              <span class="ui-mock-val">₹37,500</span>
            </div>
            <div class="ui-mock-row">
              <span>AI Tooling Allowance</span>
              <span class="ui-mock-val">+₹10,000</span>
            </div>
            <div class="ui-mock-row">
              <span>Patent Royalties</span>
              <span class="ui-mock-val">+₹18,500</span>
            </div>
            <div class="ui-mock-row" style="background: #ecfdf5; border-color: #10b981;">
              <strong>Net Take-Home</strong>
              <strong class="ui-mock-val">₹1,48,800</strong>
            </div>
          </div>
        </div>

        <!-- Card 3: MongoDB Audit & Kafka AI Layer -->
        <div class="preview-card">
          <div class="preview-header">
            <span>MONGODB v8.3 & KAFKA AI</span>
            <span>NoSQL & Events</span>
          </div>
          <div class="preview-body">
            <div class="ui-mock-row">
              <span>Audit Action</span>
              <span class="ui-mock-val">PAYROLL_DISBURSED</span>
            </div>
            <div class="ui-mock-row">
              <span>Audit Signature</span>
              <span class="ui-mock-val">SHA-256 Valid</span>
            </div>
            <div class="ui-mock-row">
              <span>Semantic RAG Policy</span>
              <span class="ui-mock-val">Cosine: 0.516</span>
            </div>
            <div class="ui-mock-row">
              <span>Kafka Offset</span>
              <span class="ui-mock-val">Topic #payroll-events</span>
            </div>
            <div class="ui-mock-row">
              <span>WebSocket Stream</span>
              <span class="ui-mock-val" style="color: #10b981;">● Connected</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Core Technology Stack & Infrastructure -->
    <div class="tech-wrap">
      <div>
        <h3 class="section-title">Core Technology Stack</h3>
        <div class="tech-grid">
          <div class="tech-chip">
            <div class="tech-icon">⚛️</div>
            <div class="tech-name">React 19</div>
            <div class="tech-role">Frontend</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">🌐</div>
            <div class="tech-name">Three.js</div>
            <div class="tech-role">3D Graphics</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">⚡</div>
            <div class="tech-name">FastAPI</div>
            <div class="tech-role">Python API</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">🐘</div>
            <div class="tech-name">PostgreSQL</div>
            <div class="tech-role">ACID Core</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">🍃</div>
            <div class="tech-name">MongoDB</div>
            <div class="tech-role">NoSQL Audit</div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="section-title">Tools & Infrastructure</h3>
        <div class="tools-grid">
          <div class="tech-chip">
            <div class="tech-icon">🐘</div>
            <div class="tech-name">pgAdmin 4</div>
            <div class="tech-role">SQL Manager</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">🍃</div>
            <div class="tech-name">Compass</div>
            <div class="tech-role">Mongo UI</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">🐙</div>
            <div class="tech-name">Git & GitHub</div>
            <div class="tech-role">Repository</div>
          </div>
          <div class="tech-chip">
            <div class="tech-icon">💻</div>
            <div class="tech-name">VS Code</div>
            <div class="tech-role">Environment</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <footer class="bottom-footer">
      <div class="footer-left">
        <span>🌿 VERDANT PAYROLL OS</span>
        <span style="color: #34d399;">&bull;</span>
        <span class="footer-credit">Built with Passion &bull; Powered by AI & Polyglot Databases</span>
      </div>
      <div class="footer-right-badge">
        Next-Gen Enterprise Human Capital
      </div>
    </footer>
  </div>

</body>
</html>
"""

# Save poster.html
poster_path = os.path.join(ROOT_DIR, "poster.html")
with open(poster_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print("Saved poster.html successfully!")

# Render to project_poster.png
hti = Html2Image(output_path=ROOT_DIR)
hti.screenshot(html_file=poster_path, save_as="project_poster.png", size=(1080, 1620))
print("Rendered project_poster.png successfully!")

# Copy to brain artifacts directory
brain_poster = os.path.join(BRAIN_DIR, "project_poster.png")
shutil.copyfile(os.path.join(ROOT_DIR, "project_poster.png"), brain_poster)
print(f"Copied to brain artifact: {brain_poster}")
