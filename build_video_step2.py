import os
import subprocess
import wave
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import win32com.client
import imageio_ffmpeg

ROOT_DIR = r"C:\Users\naray\employee-payroll-system"
ASSETS_DIR = os.path.join(ROOT_DIR, "ai_video_assets")
os.makedirs(ASSETS_DIR, exist_ok=True)
OUTPUT_MP4 = os.path.join(ROOT_DIR, "verdant_payroll_video.mp4")
BRAIN_DIR = r"C:\Users\naray\.gemini\antigravity\brain\31a9b43a-8ba7-4a2b-99c0-bb04936a6ae6"

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
W, H = 1280, 720
FPS = 25

# Fonts
FONT_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 36)
FONT_SUB = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 19)
FONT_BADGE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 13)
FONT_CARD_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 19)
FONT_CARD_SUB = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 14)
FONT_MONO_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 18)
FONT_MONO_SMALL = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 13)
FONT_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)
FONT_ICON = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 14)

# Load and crop presenter
PRESENTER_PATH = os.path.join(ROOT_DIR, "images", "employee_hero.jpg")
presenter_raw = Image.open(PRESENTER_PATH).convert("RGBA")
pw, ph = presenter_raw.size
crop_box = (int(pw * 0.40), int(ph * 0.08), int(pw * 0.85), int(ph * 0.95))
presenter_base = presenter_raw.crop(crop_box)

def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=int(width))

def create_base_canvas():
    img = Image.new("RGB", (W, H), color="#f8fafc")
    draw = ImageDraw.Draw(img)
    for y in range(H):
        alpha = y / H
        r = int(248 - 10 * alpha)
        g = int(250 - 6 * alpha)
        b = int(252 - 12 * alpha)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    for gx in range(40, W, 40):
        for gy in range(40, H, 40):
            draw.ellipse([gx-1, gy-1, gx+1, gy+1], fill="#e2e8f0")
    return img, draw

def place_presenter(img, draw, scale_offset=0.0):
    frame_box = [780, 50, 1230, 620]
    draw_rounded_rect(draw, frame_box, radius=24, fill="#ffffff", outline="#cbd5e1", width=2)
    
    # Breathing scale calculation
    fw, fh = 450, 570
    sw = int(fw * (1.0 + scale_offset))
    sh = int(fh * (1.0 + scale_offset))
    p_resized = presenter_base.resize((sw, sh), Image.Resampling.LANCZOS)
    
    # Center crop back to 450x570
    ox = (sw - fw) // 2
    oy = (sh - fh) // 2
    p_crop = p_resized.crop((ox, oy, ox + fw, oy + fh))
    
    mask = Image.new("L", (fw, fh), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, fw, fh], radius=22, fill=255)
    
    img.paste(p_crop, (780, 50), mask)
    draw_rounded_rect(draw, [800, 70, 990, 105], radius=18, fill=(2, 20, 12, 220), outline="#10b981", width=1)
    draw.text((820, 80), "● AI PRESENTER", font=FONT_BADGE, fill="#34d399")

def draw_header(draw, badge_text, title_text, sub_text):
    draw_rounded_rect(draw, [50, 45, 50 + len(badge_text)*10 + 24, 75], radius=15, fill="#0f172a")
    draw.text((62, 52), badge_text, font=FONT_BADGE, fill="#ffffff")
    draw.text((50, 90), title_text, font=FONT_TITLE, fill="#0f172a")
    draw.text((50, 140), sub_text, font=FONT_SUB, fill="#64748b")

def draw_browser_mockup(draw, box, title_url="http://localhost:5173/dashboard"):
    x0, y0, x1, y1 = box
    draw_rounded_rect(draw, box, radius=16, fill="#ffffff", outline="#94a3b8", width=2)
    draw_rounded_rect(draw, [x0, y0, x1, y0+36], radius=16, fill="#e2e8f0")
    draw.rectangle([x0, y0+20, x1, y0+36], fill="#e2e8f0")
    draw.line([(x0, y0+36), (x1, y0+36)], fill="#cbd5e1", width=1)
    draw.ellipse([x0+12, y0+12, x0+22, y0+22], fill="#ef4444")
    draw.ellipse([x0+28, y0+12, x0+38, y0+22], fill="#f59e0b")
    draw.ellipse([x0+44, y0+12, x0+54, y0+22], fill="#10b981")
    draw_rounded_rect(draw, [x0+70, y0+8, x1-20, y0+28], radius=8, fill="#ffffff", outline="#cbd5e1", width=1)
    draw.text((x0+82, y0+11), title_url, font=FONT_MONO_SMALL, fill="#475569")

def draw_subtitles(draw, text_before, text_highlight, text_after):
    sub_box = [340, 645, 940, 695]
    draw_rounded_rect(draw, sub_box, radius=25, fill="#020906", outline="#10b981", width=1)
    
    # Calculate widths for inline highlight
    full_str = f"{text_before} {text_highlight} {text_after}".strip()
    # Centered text drawing
    x_curr = 365
    draw.text((x_curr, 658), text_before + " ", font=FONT_SUBTITLE, fill="#ffffff")
    x_curr += int(draw.textlength(text_before + " ", font=FONT_SUBTITLE))
    draw.text((x_curr, 658), text_highlight + " ", font=FONT_SUBTITLE, fill="#34d399")
    x_curr += int(draw.textlength(text_highlight + " ", font=FONT_SUBTITLE))
    draw.text((x_curr, 658), text_after, font=FONT_SUBTITLE, fill="#ffffff")

print("Building slide generator functions...")

def build_scene_1(scale_offset=0.0):
    img, draw = create_base_canvas()
    place_presenter(img, draw, scale_offset)
    draw_header(draw, "NEXT-GEN WORKFORCE PLATFORM", "VERDANT PAYROLL OS", "Smart Digital Compensation & Financial Operating System")
    draw_browser_mockup(draw, [50, 185, 740, 610])
    draw_rounded_rect(draw, [70, 235, 720, 355], radius=12, fill="#021a10", outline="#10b981", width=1)
    draw.text((90, 255), "VERDANT 3D BOTANICAL WORKSPACE", font=FONT_CARD_TITLE, fill="#ffffff")
    draw.text((90, 288), "Continuous Per-Second Salary Accrual • Polyglot Database • Vector RAG", font=FONT_CARD_SUB, fill="#a7f3d0")
    draw.text((90, 322), "[LIVE] WS Streaming Connected  |  [ACID] Relational  |  [SHA-256] Logs", font=FONT_MONO_SMALL, fill="#34d399")
    
    draw_rounded_rect(draw, [70, 375, 380, 580], radius=12, fill="#f8fafc", outline="#cbd5e1")
    draw.text((90, 395), "Today's Streaming Vault", font=FONT_CARD_SUB, fill="#64748b")
    draw.text((90, 425), "₹3,412.50", font=FONT_TITLE, fill="#10b981")
    draw.text((90, 485), "Rate: ₹0.078 / second", font=FONT_MONO_SMALL, fill="#0f172a")
    draw.text((90, 520), "Shift Active: 6h 42m 18s", font=FONT_CARD_SUB, fill="#475569")

    draw_rounded_rect(draw, [410, 375, 720, 580], radius=12, fill="#f8fafc", outline="#cbd5e1")
    draw.text((430, 395), "Net Disbursed Take-Home", font=FONT_CARD_SUB, fill="#64748b")
    draw.text((430, 425), "₹1,42,500", font=FONT_TITLE, fill="#0f172a")
    draw.text((430, 485), "[OK] Fully Tax-Compliant", font=FONT_MONO_SMALL, fill="#059669")
    draw.text((430, 520), "PostgreSQL 18.4 Verified", font=FONT_CARD_SUB, fill="#475569")
    return img

def build_scene_2(scale_offset=0.0, counter_val=3412.50):
    img, draw = create_base_canvas()
    place_presenter(img, draw, scale_offset)
    draw_header(draw, "CORE REAL-TIME COMPENSATION", "Real-Time Streaming & Auth", "Per-Second Wage Accruals & Strict Role-Based Access Control")
    draw_rounded_rect(draw, [50, 185, 380, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
    draw_rounded_rect(draw, [50, 185, 380, 230], radius=16, fill="#021a10")
    draw.text((70, 198), "● REAL-TIME SALARY VAULT", font=FONT_BADGE, fill="#34d399")
    draw.text((70, 250), "Gross Accrued Today:", font=FONT_CARD_SUB, fill="#64748b")
    draw.text((70, 280), f"₹{counter_val:,.2f}", font=FONT_TITLE, fill="#10b981")
    draw.text((70, 335), "Available Advance (50%):", font=FONT_CARD_SUB, fill="#64748b")
    draw.text((70, 360), f"₹{(counter_val*0.5):,.2f}", font=FONT_CARD_TITLE, fill="#0f172a")
    draw_rounded_rect(draw, [70, 410, 360, 465], radius=12, fill="#10b981")
    draw.text((95, 427), "⚡ Instant UPI Withdrawal", font=FONT_CARD_SUB, fill="#ffffff")
    draw_rounded_rect(draw, [70, 485, 360, 585], radius=10, fill="#f0fdf4", outline="#bbf7d0")
    draw.text((85, 500), "✓ Zero Predatory Interest", font=FONT_CARD_SUB, fill="#166534")
    draw.text((85, 528), "✓ Sub-Second UPI Settlement", font=FONT_CARD_SUB, fill="#166534")
    draw.text((85, 555), "✓ Atomic Ledger Deductions", font=FONT_CARD_SUB, fill="#166534")
    
    pipeline_boxes = [
        ("React 19 Frontend", "Three.js 3D Viewport & WebSockets Client", "#eff6ff", "#3b82f6"),
        ("FastAPI Gateway", "Bcrypt Hashing & HMAC-SHA256 JWT Token", "#f0fdf4", "#16a34a"),
        ("RBAC Role Guard", "5 Scoped Roles (Admin, HR, Finance, Lead, Emp)", "#fefce8", "#ca8a04"),
        ("PostgreSQL 18.4", "ACID Disbursement & Row-Level Locks", "#f5f3ff", "#9333ea")
    ]
    py = 185
    for title, sub, bg, bdr in pipeline_boxes:
        draw_rounded_rect(draw, [410, py, 740, py+88], radius=12, fill=bg, outline=bdr, width=1)
        draw.text((430, py+14), title, font=FONT_CARD_TITLE, fill="#0f172a")
        draw.text((430, py+46), sub, font=FONT_CARD_SUB, fill="#475569")
        if py < 450:
            draw.text((565, py+86), "↓", font=FONT_CARD_TITLE, fill="#64748b")
        py += 105
    return img

def build_scene_3(scale_offset=0.0):
    img, draw = create_base_canvas()
    place_presenter(img, draw, scale_offset)
    draw_header(draw, "COGNITIVE POLICY INTELLIGENCE", "Semantic Vector RAG AI", "Sub-25ms Labor Policy Query Resolution with Zero External API Cost")
    draw_rounded_rect(draw, [50, 185, 430, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
    draw_rounded_rect(draw, [50, 185, 430, 230], radius=16, fill="#0f172a")
    draw.text((70, 198), "🤖 VERDANT HR POLICY COPILOT", font=FONT_BADGE, fill="#38bdf8")
    draw_rounded_rect(draw, [70, 250, 410, 310], radius=12, fill="#f1f5f9", outline="#cbd5e1")
    draw.text((85, 260), "Employee Question:", font=FONT_BADGE, fill="#64748b")
    draw.text((85, 280), "\"What is the maternity leave policy?\"", font=FONT_CARD_SUB, fill="#0f172a")
    draw_rounded_rect(draw, [70, 325, 410, 490], radius=12, fill="#ecfdf5", outline="#10b981", width=1)
    draw.text((85, 338), "Verified Policy Citation:", font=FONT_BADGE, fill="#059669")
    draw.text((85, 362), "• 26 Weeks fully paid leave", font=FONT_CARD_SUB, fill="#065f46")
    draw.text((85, 390), "• Sec 5(3) Maternity Benefit Act", font=FONT_CARD_SUB, fill="#065f46")
    draw.text((85, 418), "• Cosine Similarity: 0.516", font=FONT_MONO_SMALL, fill="#047857")
    draw.text((85, 448), "Latency: 18.4ms (In-Memory)", font=FONT_MONO_SMALL, fill="#059669")
    draw_rounded_rect(draw, [70, 510, 410, 585], radius=10, fill="#f8fafc", outline="#cbd5e1")
    draw.text((85, 525), "✓ 100% Confidential (Local Embeddings)", font=FONT_CARD_SUB, fill="#334155")
    draw.text((85, 555), "✓ Zero External OpenAI API Fees", font=FONT_CARD_SUB, fill="#334155")

    rag_boxes = [
        ("Dense Vector Space", "Statutory Labor Codes & HR Rules Chunked (250 tokens)", "#faf5ff", "#a855f7"),
        ("Cosine Similarity Engine", "Mathematical Dot Product Ranking (θ > 0.50 threshold)", "#fdf4ff", "#d946ef"),
        ("Contextual Synthesis", "Top-k Document Citations Assembled into Answers", "#ecfdf5", "#10b981"),
        ("MongoDB Audit Logger", "Session Chat Logs & Cryptographic SHA-256 Receipts", "#f0fdf4", "#16a34a")
    ]
    py = 185
    for title, sub, bg, bdr in rag_boxes:
        draw_rounded_rect(draw, [450, py, 740, py+88], radius=12, fill=bg, outline=bdr, width=1)
        draw.text((470, py+14), title, font=FONT_CARD_TITLE, fill="#0f172a")
        draw.text((470, py+46), sub, font=FONT_CARD_SUB, fill="#475569")
        if py < 450:
            draw.text((585, py+86), "↓", font=FONT_CARD_TITLE, fill="#64748b")
        py += 105
    return img

def build_scene_4(scale_offset=0.0):
    img, draw = create_base_canvas()
    place_presenter(img, draw, scale_offset)
    draw_header(draw, "DISTRIBUTED MICROSERVICES", "System Architecture & Stack", "Decoupled Polyglot Architecture & Distributed Kafka Event Bus")
    tech_cards = [
        ("FastAPI (Python 3.12)", "High-Concurrency Async ASGI Engine • Pydantic v2 • Sub-15ms Latency", "API", "#eff6ff", "#3b82f6"),
        ("PostgreSQL 18.4", "ACID Relational Core • Financial Ledgers • Strict Row Locks • pgAdmin 4", "SQL", "#f0fdf4", "#16a34a"),
        ("MongoDB v8.3", "NoSQL Document Store • Immutable SHA-256 Audit Trails • Telemetry Logs", "NoSQL", "#faf5ff", "#9333ea"),
        ("Apache Kafka", "Real-Time Event Broker • Topics: payroll-events & alert-events", "BUS", "#fefce8", "#ca8a04"),
        ("React 19 & Three.js", "3D Procedural Cyber-Botanical Workspace • Live WebSockets Ticker", "UI", "#ecfdf5", "#10b981")
    ]
    py = 185
    for name, desc, badge_lbl, bg, bdr in tech_cards:
        draw_rounded_rect(draw, [50, py, 740, py+75], radius=14, fill=bg, outline=bdr, width=2)
        draw_rounded_rect(draw, [65, py+15, 115, py+60], radius=8, fill=bdr)
        draw.text((72, py+26), badge_lbl, font=FONT_ICON, fill="#ffffff")
        draw.text((130, py+12), name, font=FONT_CARD_TITLE, fill="#0f172a")
        draw.text((130, py+44), desc, font=FONT_CARD_SUB, fill="#475569")
        py += 86
    return img

def build_scene_5(scale_offset=0.0):
    img, draw = create_base_canvas()
    place_presenter(img, draw, scale_offset)
    draw_header(draw, "STRATEGIC ROADMAP", "Current vs. Planned Enhancements", "Transforming Workforce Payroll into an Empowering Financial Ecosystem")
    draw_rounded_rect(draw, [50, 185, 380, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
    draw_rounded_rect(draw, [50, 185, 380, 235], radius=16, fill="#064e3b")
    draw.text((70, 200), "CURRENT ARCHITECTURE", font=FONT_BADGE, fill="#34d399")
    c_items = [
        ("Per-Second Wage Accrual", "Accrues dynamically with real-time WebSockets streaming."),
        ("Polyglot Persistence", "PostgreSQL 18.4 ACID core + MongoDB v8.3 audit trail."),
        ("Local Vector RAG AI", "Sub-25ms policy retrieval with zero external API fees."),
        ("Automated 1-Click Launch", "Code word DHEERAJ orchestrating full local ecosystem.")
    ]
    cy = 250
    for h, d in c_items:
        draw.text((70, cy), "✓ " + h, font=FONT_CARD_TITLE, fill="#047857")
        draw.text((90, cy+26), d, font=FONT_CARD_SUB, fill="#475569")
        cy += 85

    draw_rounded_rect(draw, [410, 185, 740, 610], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
    draw_rounded_rect(draw, [410, 185, 740, 235], radius=16, fill="#0f172a")
    draw.text((430, 200), "PLANNED ENHANCEMENTS", font=FONT_BADGE, fill="#38bdf8")
    f_items = [
        ("IoT Biometric Edge Hardware", "Direct facial & fingerprint scanner ingestion via MQTT."),
        ("Multi-Currency Forex Clearing", "Automated international payroll for global remote teams."),
        ("Native Mobile App Suite", "React Native iOS & Android apps with push wage advances."),
        ("Monte Carlo Life Simulators", "Expanded predictive sandbox for loans and tax regimes.")
    ]
    fy = 250
    for h, d in f_items:
        draw.text((430, fy), "→ " + h, font=FONT_CARD_TITLE, fill="#0369a1")
        draw.text((450, fy+26), d, font=FONT_CARD_SUB, fill="#475569")
        fy += 85
    return img

print("All scene generator functions defined.")
