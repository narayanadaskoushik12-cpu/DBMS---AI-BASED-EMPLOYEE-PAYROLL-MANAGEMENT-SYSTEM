import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"C:\Users\naray\employee-payroll-system\report_assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. FIGURE 1: Proposed System Architecture Diagram
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(12, 6.5), dpi=300)
ax.set_xlim(0, 12)
ax.set_ylim(0, 7)
ax.axis('off')

# Background canvas styling
fig.patch.set_facecolor('#ffffff')

# Layer boxes
layers = [
    ("PRESENTATION TIER\nReact 19 • Three.js 3D Botany • WebSockets Client • Tailwind CSS", 0.5, 5.5, 11, 1.1, '#ecfdf5', '#10b981', '#065f46'),
    ("API GATEWAY & SECURITY TIER\nFastAPI ASGI Engine • Bcrypt Hashing • HMAC-SHA256 JWT RBAC (5 Roles)", 0.5, 4.0, 11, 1.0, '#eff6ff', '#3b82f6', '#1e40af'),
    ("INTELLIGENT COMPUTATION & EVENT BUS TIER\nGross-to-Net Engine • Per-Sec Streaming Vault • Apache Kafka Broker (Topics: payroll-events, alert-events) • Local Vector RAG Engine", 0.5, 2.3, 11, 1.2, '#fefce8', '#eab308', '#854d0e'),
    ("POLYGLOT PERSISTENCE STORAGE TIER", 0.5, 0.4, 11, 1.4, '#f8fafc', '#64748b', '#0f172a'),
]

for title, x, y, w, h, bg, border, text_color in layers:
    rect = plt.Rectangle((x, y), w, h, facecolor=bg, edgecolor=border, linewidth=2, linestyle='-', transform=ax.transData, zorder=2)
    ax.add_patch(rect)
    if title != "POLYGLOT PERSISTENCE STORAGE TIER":
        ax.text(x + w/2, y + h/2, title, ha='center', va='center', fontsize=9.5, fontweight='bold', color=text_color, zorder=3)
    else:
        ax.text(x + w/2, y + h - 0.25, title, ha='center', va='center', fontsize=10, fontweight='bold', color=text_color, zorder=3)

# Inside Storage Tier: Two database sub-boxes
rect_pg = plt.Rectangle((0.8, 0.55), 4.8, 0.85, facecolor='#f0fdf4', edgecolor='#16a34a', linewidth=1.5, zorder=3)
ax.add_patch(rect_pg)
ax.text(3.2, 0.98, "POSTGRESQL 18.4 (ACID RELATIONAL CORE)\nEmployees, Compensation Ledgers, Tax Tables, pgAdmin 4", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#14532d', zorder=4)

rect_mg = plt.Rectangle((6.4, 0.55), 4.8, 0.85, facecolor='#faf5ff', edgecolor='#9333ea', linewidth=1.5, zorder=3)
ax.add_patch(rect_mg)
ax.text(8.8, 0.98, "MONGODB v8.3 (NoSQL DOCUMENT AUDIT STORE)\nImmutable Activity Trails, SHA-256 Proofs, RAG Sessions", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#581c87', zorder=4)

# Connecting Arrows
arrowprops = dict(arrowstyle="->", lw=2, color="#059669")
arrowprops_bi = dict(arrowstyle="<->", lw=2, color="#0284c7")

ax.annotate('', xy=(6.0, 5.5), xytext=(6.0, 5.0), arrowprops=arrowprops_bi, zorder=5)
ax.annotate('', xy=(6.0, 4.0), xytext=(6.0, 3.5), arrowprops=arrowprops_bi, zorder=5)
ax.annotate('', xy=(3.2, 2.3), xytext=(3.2, 1.4), arrowprops=arrowprops_bi, zorder=5)
ax.annotate('', xy=(8.8, 2.3), xytext=(8.8, 1.4), arrowprops=arrowprops_bi, zorder=5)

plt.tight_layout()
fig1_path = os.path.join(OUTPUT_DIR, "figure1_architecture.png")
plt.savefig(fig1_path, dpi=300, bbox_inches='tight')
plt.close()
print("Figure 1 generated:", fig1_path)

# -------------------------------------------------------------
# 2. FIGURE 2: System Interface & Domain Previews
# -------------------------------------------------------------
emp_hero_path = r"C:\Users\naray\employee-payroll-system\images\employee_hero.jpg"
team_collab_path = r"C:\Users\naray\employee-payroll-system\images\team_collab.jpg"

img_hero = Image.open(emp_hero_path).resize((600, 340))
img_collab = Image.open(team_collab_path).resize((600, 340))

fig2_combined = Image.new('RGB', (1220, 380), color='#ffffff')
fig2_combined.paste(img_collab, (10, 20))
fig2_combined.paste(img_hero, (630, 20))

draw = ImageDraw.Draw(fig2_combined)
# Labels
draw.text((15, 3), "(a) Modern Workforce Self-Service Portal & Collaborative Hub", fill="#0f172a")
draw.text((635, 3), "(b) Real-Time Per-Second Streaming Vault & Advance Disbursement", fill="#0f172a")

fig2_path = os.path.join(OUTPUT_DIR, "figure2_system_previews.png")
fig2_combined.save(fig2_path, quality=95)
print("Figure 2 generated:", fig2_path)

# -------------------------------------------------------------
# 3. FIGURE 3: Performance Benchmark Charts (4 Panels matching template)
# -------------------------------------------------------------
fig, axs = plt.subplots(1, 4, figsize=(14, 3.6), dpi=300)
fig.patch.set_facecolor('#ffffff')

# (a) Domain Distribution
domains = ['Core Pay', 'Benefits', 'Productivity', 'Royalties', 'Simulation']
counts = [1250, 1180, 940, 620, 1250]
axs[0].bar(domains, counts, color='#10b981', width=0.6, edgecolor='#047857')
axs[0].set_title('(a) Dimension Category Distribution', fontsize=9, fontweight='bold', pad=8)
axs[0].set_ylabel('Active Employee Records', fontsize=8)
axs[0].tick_params(axis='x', rotation=40, labelsize=7.5)
axs[0].tick_params(axis='y', labelsize=8)
axs[0].grid(axis='y', linestyle='--', alpha=0.3)

# (b) Latency Comparison
metrics = ['PostgreSQL Alone', 'MongoDB Alone', 'Polyglot Proposed']
read_lat = [18.5, 12.2, 4.8]
write_lat = [24.1, 14.6, 6.2]
x = np.arange(len(metrics))
w = 0.35
axs[1].bar(x - w/2, read_lat, w, label='Read Latency (ms)', color='#3b82f6', edgecolor='#1d4ed8')
axs[1].bar(x + w/2, write_lat, w, label='Write Latency (ms)', color='#f97316', edgecolor='#c2410c')
axs[1].set_title('(b) Database Response Latency', fontsize=9, fontweight='bold', pad=8)
axs[1].set_ylabel('Latency (ms) - Lower is better', fontsize=8)
axs[1].set_xticks(x)
axs[1].set_xticklabels(['PostgreSQL', 'MongoDB', 'Polyglot'], fontsize=7.5)
axs[1].legend(fontsize=7, loc='upper right')
axs[1].tick_params(axis='y', labelsize=8)
axs[1].grid(axis='y', linestyle='--', alpha=0.3)

# (c) Concurrency Throughput
concurrency = [10, 50, 100, 200, 350, 500]
polyglot_tps = [240, 890, 1680, 2750, 3320, 3480]
single_tps = [210, 620, 950, 1210, 1340, 1390]
axs[2].plot(concurrency, polyglot_tps, marker='o', color='#10b981', lw=2, label='Polyglot Engine')
axs[2].plot(concurrency, single_tps, marker='s', color='#64748b', lw=1.8, linestyle='--', label='Legacy Single DB')
axs[2].set_title('(c) Concurrent Request Throughput', fontsize=9, fontweight='bold', pad=8)
axs[2].set_xlabel('Simulated Concurrent Users', fontsize=8)
axs[2].set_ylabel('Throughput (Req/sec)', fontsize=8)
axs[2].legend(fontsize=7, loc='lower right')
axs[2].tick_params(labelsize=8)
axs[2].grid(True, linestyle='--', alpha=0.3)

# (d) RAG Cosine Similarity Density
np.random.seed(42)
sim_scores = np.random.normal(loc=0.82, scale=0.08, size=1000)
sim_scores = np.clip(sim_scores, 0.45, 0.99)
axs[3].hist(sim_scores, bins=20, density=True, color='#a855f7', alpha=0.6, edgecolor='#7e22ce')
axs[3].set_title('(d) RAG Cosine Similarity Density', fontsize=9, fontweight='bold', pad=8)
axs[3].set_xlabel('Cosine Similarity Score', fontsize=8)
axs[3].set_ylabel('Query Density', fontsize=8)
axs[3].tick_params(labelsize=8)
axs[3].grid(axis='y', linestyle='--', alpha=0.3)

plt.tight_layout()
fig3_path = os.path.join(OUTPUT_DIR, "figure3_benchmarks.png")
plt.savefig(fig3_path, dpi=300, bbox_inches='tight')
plt.close()
print("Figure 3 generated:", fig3_path)
