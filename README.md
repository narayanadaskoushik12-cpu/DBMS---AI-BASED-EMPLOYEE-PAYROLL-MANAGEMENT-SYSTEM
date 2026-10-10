# 🌿 VERDANT PAYROLL OS
### Next-Gen AI-Based Employee Payroll Management System (DBMS Project)

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_18-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB_8.3-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 1. Project Overview & Architecture

**VERDANT PAYROLL OS** is an enterprise-grade, AI-driven Employee Payroll & Life Management System developed for a Database Management System (DBMS) capstone. Moving far beyond traditional static payroll spreadsheets, this platform models the complete employee lifecycle across **45 dimensions** unified into **5 Master Life Domains**.

The design implements a **Cyber-Botanical & Neon Emerald** aesthetic featuring **scroll-driven 3D WebGL graphics** (Three.js / React Three Fiber) and **Polyglot Persistence** where each database handles the workload it performs best:
- **PostgreSQL 18.4 (pgAdmin)**: System of Record for ACID transactional data (Employee roster, salary calculations, tax deductions, and cryptographic checksums).
- **MongoDB v8.3.8 (NoSQL Document Store)**: High-volume unstructured documents (Immutable audit trail logs, RAG chat history, and grievance tickets).
- **Kafka Event Streaming**: Asynchronous event topic bus for notifications, background audit logging, and WebSockets live push alerts.
- **RAG & Vector Search**: Cosine similarity embedding retrieval for policy and labour-code compliance.

---

## 🏗️ 2. Polyglot Persistence Architecture: PostgreSQL vs MongoDB

```
                                    +-----------------------------------+
                                    |    Vite 3D Frontend (Port 5173)   |
                                    +-----------------+-----------------+
                                                      |
                                          HTTP REST & WebSocket
                                                      |
                                                      v
                                    +-----------------------------------+
                                    |    FastAPI Gateway (Port 8000)    |
                                    +--------+------------------+-------+
                                             |                  |
                       ACID Relational Core  |                  | Unstructured & Audit Trail
                                             v                  v
                             +-----------------------+  +-----------------------+
                             |   PostgreSQL 18.4     |  |     MongoDB v8.3.8    |
                             |   (pgAdmin / SQL)     |  |    (Document Store)   |
                             +-----------------------+  +-----------------------+
                             | - employees           |  | - audit_logs          |
                             | - salary_slips        |  | - chat_history        |
                             | - departments         |  | - grievances          |
                             | - statutory_tax       |  | - notifications       |
                             +-----------------------+  +-----------------------+
```

### Why Both Databases Are Used:
1. **PostgreSQL (pgAdmin)**:
   - **ACID Transactions**: A payroll disbursement run must execute completely for all employees or rollback entirely.
   - **Referential Integrity**: Strict Foreign Key constraints linking `salary_slips.emp_id` to `employees.emp_id`.
   - **Mathematical Accuracy**: Deterministic Gross-to-Net formulas (Basic, HRA, Special Allowance, PF, PT, TDS).
   - **pgAdmin**: Used to inspect tables, write SQL queries, verify indexes, and review execution plans (`EXPLAIN ANALYZE`).

2. **MongoDB (NoSQL Document Store)**:
   - **Schema Flexibility**: Audit logs and whistleblowing reports have variable schemas depending on whether the actor was an Admin, Manager, or Employee.
   - **High-Write Volume**: Real-time audit events ("who viewed or modified what") and user chat histories are written without schema locking.

---

## 🌿 3. The 5 Unified Life Domains (Consolidating 45 Dimensions)

Rather than cluttering users with 45 disjointed cards, the application unifies all dimensions into **5 organic domains**:

1. 💰 **01 — Quantum Wealth & Streaming Compensation**
   * *Combines 7 dimensions*: Core Salary, Financial Wellness, Per-Minute Real-Time Streaming Salary (UPI Transfer), Patent Code Royalties, Housing HRA, Gross-to-Net, and Salary What-If Simulator.
2. 🛡️ **02 — Holistic Health, Life Continuity & Wellness**
   * *Combines 7 dimensions*: Emergency Hospitalization Mode, Health Insurance Gap Analyzer, Overtime Fatigue Guard, Workplace Safety Incident Bridge, Children's Education Fund, and Life Events Engine.
3. 🧠 **03 — Adaptive Talent, Career Twin & Future Work**
   * *Combines 7 dimensions*: 5-Year Career Digital Twin, $120/mo AI Co-Pilot Tooling Allowance, Internal Gig Marketplace, 2-Week Apprentice Shadowing, 360 Appraisals, and Meeting Cost-Per-Hour.
4. 🌍 **04 — Global Nomadic, Inclusion & Sustainable Culture**
   * *Combines 8 dimensions*: 14-day Nomadic Workation Tax Sentry, Green Commute Carbon Ledger, Peer Recognition Cheers, Festival Advance Planner, Maternity Return-to-Work, and Indic Voice Assistant (Telugu/Hindi/Tamil).
5. 🔐 **05 — Data Sovereignty, Cryptographic Trust & Sentinel**
   * *Combines 8 dimensions*: Self-Sovereign Data Passport (Time-limited sharing for bank loans), SHA-256 Verifiable Payslips, Autonomous Ghost Employee Sentry, Anonymous Whistleblowing, and Labour Code Legal Triage.

---

## ⚡ 4. Mandatory Review Requirements Implemented

| Requirement | Implementation Detail | Location in Project |
| :--- | :--- | :--- |
| **1. Database** | PostgreSQL 18.4 (`payroll_db`) with relational ACID tables + MongoDB (`payroll_nosql_db`) | `backend/database.py`, `backend/mongo_service.py` |
| **2. RAG / Vector DB** | Cosine similarity vector search over indexed corporate policy documents and labour laws | `backend/rag_service.py` (`POST /api/rag/ask`) |
| **3. JWT with RBAC** | Bcrypt password hashing (12 rounds) + RFC 7519 HS256 signed access tokens with Role claims | `backend/auth.py` (`POST /api/auth/login`) |
| **4. Microservices** | Modular FastAPI architecture behind a unified API gateway (Auth, Employee, Payroll, RAG, Kafka) | `backend/main.py` |
| **5. Kafka Event Bus** | Partitioned asynchronous event topic bus (`payroll-events`, `alert-events`, `leave-events`, `notification-events`) | `backend/kafka_bus.py`, WebSockets |
| **6. Real-Time UI** | Bi-directional WebSockets (`/ws/live`), live per-second streaming salary ticker, instant Kafka toast alerts | `frontend/src/components/RealTimeTickerBar.tsx` |

---

## 🚀 5. Getting Started & Running the Project

### Prerequisites
- **Python 3.12+**
- **Node.js 20+** and npm
- **PostgreSQL 18** (Active on port `5432` with password `615461`)
- **MongoDB** (Active on port `27017`)

---

### ⭐ The 1-Click Startup Launcher (Recommended)
You do not need to open multiple terminals manually. Simply double-click:
📁 **`start.bat`** (Located in the root project directory)

*What happens automatically:*
1. Checks and verifies that the **PostgreSQL 18** service is active.
2. Boots the **FastAPI Backend Server** on `http://127.0.0.1:8000`.
3. Boots the **3D Cyber-Botanical Frontend** on `http://localhost:5173`.
4. Opens your browser automatically to **`http://localhost:5173/`**.

---

### Manual Step-by-Step Launch (Alternative)

#### 1. Setup & Start Backend
```powershell
cd backend
python -m pip install -r ../requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```
Backend API will be live at `http://127.0.0.1:8000` (Docs at `http://127.0.0.1:8000/docs`).

#### 2. Setup & Start Frontend
```powershell
cd frontend
npm install
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## 🖥️ 6. Using pgAdmin and MongoDB

### How to Inspect in pgAdmin:
1. Open **pgAdmin 4**.
2. Connect to your PostgreSQL server using password `615461`.
3. Expand **Databases** &rarr; **`payroll_db`** &rarr; **Schemas** &rarr; **public** &rarr; **Tables**.
4. Right-click on **`employees`** or **`salary_slips`** &rarr; select **View/Edit Data** &rarr; **All Rows**.
5. You will see every registered employee and their itemized salary calculations.

### How to Inspect in MongoDB Compass / Shell:
1. Connect to `mongodb://localhost:27017`.
2. Open database **`payroll_nosql_db`**.
3. Inspect collections:
   - **`audit_logs`**: See immutable audit entries whenever an employee is added or when payroll runs.
   - **`chat_history`**: See dialogue questions, cosine similarity scores, and cited policy clauses.

---

## 👥 Demo Profiles & Roles

| Role | Name | Department | Credentials |
| :--- | :--- | :--- | :--- |
| **Super Admin** | Vikramaditya Rao | Executive Leadership | `vikramaditya.rao@synthetica.eco` |
| **Head of HR** | Pooja Sundaram | People & Talent | `pooja.sundaram@synthetica.eco` |
| **Payroll Accountant** | Karthik Subramanian | Finance & Tax | `karthik.sub@synthetica.eco` |
| **Engineering Director**| Arjun Venkataraman | Engineering & Architecture | `arjun.v@synthetica.eco` |
| **Senior Engineer** | Ananya Sharma | Product Engineering | `ananya.sharma@synthetica.eco` |

---

## 📄 License
Academic Project &copy; 2026. All rights reserved.
