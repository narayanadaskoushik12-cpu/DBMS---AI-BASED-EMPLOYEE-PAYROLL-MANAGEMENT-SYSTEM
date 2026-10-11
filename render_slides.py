import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = r"C:\Users\naray\employee-payroll-system"
ASSETS_DIR = os.path.join(ROOT_DIR, "ai_video_assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

W, H = 1280, 720

# Fonts
FONT_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 38)
FONT_SUB = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 20)
FONT_BADGE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 13)
FONT_CARD_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)
FONT_CARD_SUB = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 15)
FONT_MONO_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 18)
FONT_MONO_SMALL = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 13)
FONT_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)

# Presenter photo
PRESENTER_PATH = os.path.join(ROOT_DIR, "images", "employee_hero.jpg")
presenter_raw = Image.open(PRESENTER_PATH).convert("RGBA")

# Let's crop presenter to a portrait (head and shoulders)
pw, ph = presenter_raw.size
# The woman is centered around x=0.55 to 0.85
crop_box = (int(pw * 0.40), int(ph * 0.08), int(pw * 0.85), int(ph * 0.95))
presenter_crop = presenter_raw.crop(crop_box).resize((440, 560), Image.Resampling.LANCZOS)

def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=int(width))

def create_base_canvas():
    img = Image.new("RGB", (W, H), color="#f8fafc")
    draw = ImageDraw.Draw(img)
    # Subtle background gradient/lighting
    for y in range(H):
        alpha = y / H
        r = int(248 - 10 * alpha)
        g = int(250 - 6 * alpha)
        b = int(252 - 12 * alpha)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    
    # Grid pattern dots
    for gx in range(40, W, 40):
        for gy in range(40, H, 40):
            draw.ellipse([gx-1, gy-1, gx+1, gy+1], fill="#e2e8f0")
            
    return img, draw

def place_presenter(img, draw):
    # Presenter card frame on right
    frame_box = [780, 50, 1230, 620]
    draw_rounded_rect(draw, frame_box, radius=24, fill="#ffffff", outline="#cbd5e1", width=2)
    
    # Clip presenter inside
    mask = Image.new("L", (450, 570), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, 450, 570], radius=22, fill=255)
    
    p_resized = presenter_crop.resize((450, 570), Image.Resampling.LANCZOS)
    img.paste(p_resized, (780, 50), mask)
    
    # Glass badge on presenter
    draw_rounded_rect(draw, [800, 70, 990, 105], radius=18, fill=(2, 20, 12, 200), outline="#10b981", width=1)
    draw.text((820, 80), "● AI PRESENTER", font=FONT_BADGE, fill="#34d399")

def draw_header(draw, badge_text, title_text, sub_text):
    # Badge pill
    draw_rounded_rect(draw, [50, 45, 50 + len(badge_text)*10 + 24, 75], radius=15, fill="#0f172a")
    draw.text((62, 52), badge_text, font=FONT_BADGE, fill="#ffffff")
    
    # Title
    draw.text((50, 90), title_text, font=FONT_TITLE, fill="#0f172a")
    
    # Subtitle
    draw.text((50, 142), sub_text, font=FONT_SUB, fill="#64748b")

def draw_browser_mockup(draw, box, title_url="http://localhost:5173/dashboard"):
    x0, y0, x1, y1 = box
    draw_rounded_rect(draw, box, radius=16, fill="#ffffff", outline="#94a3b8", width=2)
    # Browser top bar
    draw_rounded_rect(draw, [x0, y0, x1, y0+36], radius=16, fill="#e2e8f0")
    draw.rectangle([x0, y0+20, x1, y0+36], fill="#e2e8f0")
    draw.line([(x0, y0+36), (x1, y0+36)], fill="#cbd5e1", width=1)
    # Browser dots
    draw.ellipse([x0+12, y0+12, x0+22, y0+22], fill="#ef4444")
    draw.ellipse([x0+28, y0+12, x0+38, y0+22], fill="#f59e0b")
    draw.ellipse([x0+44, y0+12, x0+54, y0+22], fill="#10b981")
    # Address bar
    draw_rounded_rect(draw, [x0+70, y0+8, x1-20, y0+28], radius=8, fill="#ffffff", outline="#cbd5e1", width=1)
    draw.text((x0+82, y0+11), title_url, font=FONT_MONO_SMALL, fill="#475569")

# -------------------------------------------------------------
# SLIDE 1: INTRO & OVERVIEW
# -------------------------------------------------------------
s1_img, s1_draw = create_base_canvas()
place_presenter(s1_img, s1_draw)
draw_header(s1_draw, "NEXT-GEN WORKFORCE PLATFORM", "VERDANT PAYROLL OS", "Smart Digital Compensation & Financial Operating System")

# Browser mockup
draw_browser_mockup(s1_draw, [50, 185, 740, 610])
# Inside browser
draw_rounded_rect(s1_draw, [70, 235, 720, 360], radius=12, fill="#021a10", outline="#10b981", width=1)
s1_draw.text((90, 255), "🌿 VERDANT 3D BOTANICAL WORKSPACE", font=FONT_CARD_TITLE, fill="#ffffff")
s1_draw.text((90, 290), "Continuous Per-Second Salary Accrual • Polyglot Database • Vector RAG", font=FONT_CARD_SUB, fill="#a7f3d0")
s1_draw.text((90, 325), "WS Live Streaming 🟢  |  ACID Transactional Core  |  SHA-256 Ledger", font=FONT_MONO_SMALL, fill="#34d399")

# 2 KPI Cards
draw_rounded_rect(s1_draw, [70, 380, 380, 580], radius=12, fill="#f8fafc", outline="#cbd5e1")
s1_draw.text((90, 400), "Today's Streaming Vault", font=FONT_CARD_SUB, fill="#64748b")
s1_draw.text((90, 430), "₹3,412.50", font=FONT_TITLE, fill="#10b981")
s1_draw.text((90, 490), "⚡ Rate: ₹0.078 / second", font=FONT_MONO_SMALL, fill="#0f172a")
s1_draw.text((90, 525), "Shift Active: 6h 42m 18s", font=FONT_CARD_SUB, fill="#475569")

draw_rounded_rect(s1_draw, [410, 380, 720, 580], radius=12, fill="#f8fafc", outline="#cbd5e1")
s1_draw.text((430, 400), "Net Disbursed Take-Home", font=FONT_CARD_SUB, fill="#64748b")
s1_draw.text((430, 430), "₹1,42,500", font=FONT_TITLE, fill="#0f172a")
s1_draw.text((430, 490), "🛡️ Fully Tax-Compliant", font=FONT_MONO_SMALL, fill="#059669")
s1_draw.text((430, 525), "PostgreSQL 18.4 Verified", font=FONT_CARD_SUB, fill="#475569")

s1_img.save(os.path.join(ASSETS_DIR, "slide_1.png"))

# -------------------------------------------------------------
# SLIDE 2: REAL-TIME STREAMING & AUTH PIPELINE
# -------------------------------------------------------------
s2_img, s2_draw = create_base_canvas()
place_presenter(s2_img, s2_draw)
draw_header(s2_draw, "CORE REAL-TIME COMPENSATION", "Real-Time Streaming & Auth", "Per-Second Wage Accruals & Strict Role-Based Access Control")

# Live Vault Card
draw_rounded_rect(s2_draw, [50, 185, 380, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
draw_rounded_rect(s2_draw, [50, 185, 380, 230], radius=16, fill="#021a10")
s2_draw.text((70, 198), "● REAL-TIME SALARY VAULT", font=FONT_BADGE, fill="#34d399")

s2_draw.text((70, 250), "Gross Accrued Today:", font=FONT_CARD_SUB, fill="#64748b")
s2_draw.text((70, 280), "₹3,412.50", font=FONT_TITLE, fill="#10b981")
s2_draw.text((70, 335), "Available Advance (50%):", font=FONT_CARD_SUB, fill="#64748b")
s2_draw.text((70, 360), "₹1,706.25", font=FONT_CARD_TITLE, fill="#0f172a")

# Instant UPI Button
draw_rounded_rect(s2_draw, [70, 410, 360, 465], radius=12, fill="#10b981")
s2_draw.text((95, 427), "⚡ Instant UPI Withdrawal", font=FONT_CARD_SUB, fill="#ffffff")

draw_rounded_rect(s2_draw, [70, 485, 360, 585], radius=10, fill="#f0fdf4", outline="#bbf7d0")
s2_draw.text((85, 500), "✓ Zero Predatory Interest", font=FONT_CARD_SUB, fill="#166534")
s2_draw.text((85, 528), "✓ Sub-Second UPI Settlement", font=FONT_CARD_SUB, fill="#166534")
s2_draw.text((85, 555), "✓ Atomic Ledger Deductions", font=FONT_CARD_SUB, fill="#166534")

# Flow pipeline on right of content area
pipeline_boxes = [
    ("React 19 Frontend", "Three.js 3D Viewport & WebSockets Client", "#eff6ff", "#3b82f6"),
    ("FastAPI Gateway", "Bcrypt Hashing & HMAC-SHA256 JWT Token", "#f0fdf4", "#16a34a"),
    ("RBAC Role Guard", "5 Scoped Roles (Admin, HR, Finance, Lead, Emp)", "#fefce8", "#ca8a04"),
    ("PostgreSQL 18.4", "ACID Disbursement & Row-Level Locks", "#f5f3ff", "#9333ea")
]

py = 185
for title, sub, bg, bdr in pipeline_boxes:
    draw_rounded_rect(s2_draw, [410, py, 740, py+88], radius=12, fill=bg, outline=bdr, width=1)
    s2_draw.text((430, py+14), title, font=FONT_CARD_TITLE, fill="#0f172a")
    s2_draw.text((430, py+46), sub, font=FONT_CARD_SUB, fill="#475569")
    if py < 450:
        s2_draw.text((565, py+86), "↓", font=FONT_CARD_TITLE, fill="#64748b")
    py += 105

s2_img.save(os.path.join(ASSETS_DIR, "slide_2.png"))

# -------------------------------------------------------------
# SLIDE 3: SEMANTIC VECTOR RAG AI ASSISTANT
# -------------------------------------------------------------
s3_img, s3_draw = create_base_canvas()
place_presenter(s3_img, s3_draw)
draw_header(s3_draw, "COGNITIVE POLICY INTELLIGENCE", "Semantic Vector RAG AI", "Sub-25ms Labor Policy Query Resolution with Zero External API Cost")

# AI Chat Mockup
draw_rounded_rect(s3_draw, [50, 185, 430, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
draw_rounded_rect(s3_draw, [50, 185, 430, 230], radius=16, fill="#0f172a")
s3_draw.text((70, 198), "🤖 VERDANT HR POLICY COPILOT", font=FONT_BADGE, fill="#38bdf8")

# User Query bubble
draw_rounded_rect(s3_draw, [70, 250, 410, 310], radius=12, fill="#f1f5f9", outline="#cbd5e1")
s3_draw.text((85, 260), "Employee Question:", font=FONT_BADGE, fill="#64748b")
s3_draw.text((85, 280), "\"What is the maternity leave policy?\"", font=FONT_CARD_SUB, fill="#0f172a")

# AI Response bubble
draw_rounded_rect(s3_draw, [70, 325, 410, 490], radius=12, fill="#ecfdf5", outline="#10b981", width=1)
s3_draw.text((85, 338), "Verified Policy Citation:", font=FONT_BADGE, fill="#059669")
s3_draw.text((85, 362), "• 26 Weeks fully paid leave", font=FONT_CARD_SUB, fill="#065f46")
s3_draw.text((85, 390), "• Sec 5(3) Maternity Benefit Act", font=FONT_CARD_SUB, fill="#065f46")
s3_draw.text((85, 418), "• Cosine Similarity: 0.516", font=FONT_MONO_SMALL, fill="#047857")
s3_draw.text((85, 448), "Latency: 18.4ms (In-Memory)", font=FONT_MONO_SMALL, fill="#059669")

# RAG Badges
draw_rounded_rect(s3_draw, [70, 510, 410, 585], radius=10, fill="#f8fafc", outline="#cbd5e1")
s3_draw.text((85, 525), "✓ 100% Confidential (Local Embeddings)", font=FONT_CARD_SUB, fill="#334155")
s3_draw.text((85, 555), "✓ Zero External OpenAI API Fees", font=FONT_CARD_SUB, fill="#334155")

# RAG Architecture cards
rag_boxes = [
    ("Dense Vector Space", "Statutory Labor Codes & HR Rules Chunked (250 tokens)", "#faf5ff", "#a855f7"),
    ("Cosine Similarity Engine", "Mathematical Dot Product Ranking (θ > 0.50 threshold)", "#fdf4ff", "#d946ef"),
    ("Contextual Synthesis", "Top-k Document Citations Assembled into Answers", "#ecfdf5", "#10b981"),
    ("MongoDB Audit Logger", "Session Chat Logs & Cryptographic SHA-256 Receipts", "#f0fdf4", "#16a34a")
]

py = 185
for title, sub, bg, bdr in rag_boxes:
    draw_rounded_rect(s3_draw, [450, py, 740, py+88], radius=12, fill=bg, outline=bdr, width=1)
    s3_draw.text((470, py+14), title, font=FONT_CARD_TITLE, fill="#0f172a")
    s3_draw.text((470, py+46), sub, font=FONT_CARD_SUB, fill="#475569")
    if py < 450:
        s3_draw.text((585, py+86), "↓", font=FONT_CARD_TITLE, fill="#64748b")
    py += 105

s3_img.save(os.path.join(ASSETS_DIR, "slide_3.png"))

# -------------------------------------------------------------
# SLIDE 4: SYSTEM ARCHITECTURE & TECH STACK
# -------------------------------------------------------------
s4_img, s4_draw = create_base_canvas()
place_presenter(s4_img, s4_draw)
draw_header(s4_draw, "DISTRIBUTED MICROSERVICES", "System Architecture & Stack", "Decoupled Polyglot Architecture & Distributed Kafka Event Bus")

tech_cards = [
    ("FastAPI (Python 3.12)", "High-Concurrency Async ASGI Engine • Pydantic v2 • Sub-15ms Latency", "⚡", "#eff6ff", "#3b82f6"),
    ("PostgreSQL 18.4", "ACID Relational Core • Financial Ledgers • Strict Row Locks • pgAdmin 4", "🐘", "#f0fdf4", "#16a34a"),
    ("MongoDB v8.3", "NoSQL Document Store • Immutable SHA-256 Audit Trails • Telemetry Logs", "🍃", "#faf5ff", "#9333ea"),
    ("Apache Kafka", "Real-Time Event Broker • Topics: payroll-events & alert-events", "📡", "#fefce8", "#ca8a04"),
    ("React 19 & Three.js", "3D Procedural Cyber-Botanical Workspace • Live WebSockets Ticker", "🌿", "#ecfdf5", "#10b981")
]

py = 185
for name, desc, icon, bg, bdr in tech_cards:
    draw_rounded_rect(s4_draw, [50, py, 740, py+75], radius=14, fill=bg, outline=bdr, width=1.5)
    s4_draw.text((70, py+22), icon, font=FONT_TITLE, fill="#0f172a")
    s4_draw.text((120, py+12), name, font=FONT_CARD_TITLE, fill="#0f172a")
    s4_draw.text((120, py+44), desc, font=FONT_CARD_SUB, fill="#475569")
    py += 86

s4_img.save(os.path.join(ASSETS_DIR, "slide_4.png"))

# -------------------------------------------------------------
# SLIDE 5: CURRENT VS FUTURE ROADMAP
# -------------------------------------------------------------
s5_img, s5_draw = create_base_canvas()
place_presenter(s5_img, s5_draw)
draw_header(s5_draw, "STRATEGIC ROADMAP", "Current vs. Planned Enhancements", "Transforming Workforce Payroll into an Empowering Financial Ecosystem")

# Current Column
draw_rounded_rect(s5_draw, [50, 185, 380, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
draw_rounded_rect(s5_draw, [50, 185, 380, 235], radius=16, fill="#064e3b")
s5_draw.text((70, 200), "CURRENT ARCHITECTURE", font=FONT_BADGE, fill="#34d399")

c_items = [
    ("Per-Second Wage Accrual", "Accrues dynamically with real-time WebSockets streaming."),
    ("Polyglot Persistence", "PostgreSQL 18.4 ACID core + MongoDB v8.3 audit trail."),
    ("Local Vector RAG AI", "Sub-25ms policy retrieval with zero external API fees."),
    ("Automated 1-Click Launch", "Code word DHEERAJ orchestrating full local ecosystem.")
]

cy = 250
for h, d in c_items:
    s5_draw.text((70, cy), "✓ " + h, font=FONT_CARD_TITLE, fill="#047857")
    s5_draw.text((90, cy+26), d, font=FONT_CARD_SUB, fill="#475569")
    cy += 85

# Future Column
draw_rounded_rect(s5_draw, [410, 185, 740, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
draw_rounded_rect(s5_draw, [410, 185, 740, 235], radius=16, fill="#0f172a")
s5_draw.text((430, 200), "PLANNED ENHANCEMENTS", font=FONT_BADGE, fill="#38bdf8")

f_items = [
    ("IoT Biometric Edge Hardware", "Direct facial & fingerprint scanner ingestion via MQTT."),
    ("Multi-Currency Forex Clearing", "Automated international payroll for global remote teams."),
    ("Native Mobile App Suite", "React Native iOS & Android apps with push wage advances."),
    ("Monte Carlo Life Simulators", "Expanded predictive sandbox for loans and tax regimes.")
]

fy = 250
for h, d in f_items:
    s5_draw.text((430, fy), "→ " + h, font=FONT_CARD_TITLE, fill="#0369a1")
    s5_draw.text((450, fy+26), d, font=FONT_CARD_SUB, fill="#475569")
    fy += 85

s5_img.save(os.path.join(ASSETS_DIR, "slide_5.png"))
print("All 5 slides rendered successfully to PNG!")
