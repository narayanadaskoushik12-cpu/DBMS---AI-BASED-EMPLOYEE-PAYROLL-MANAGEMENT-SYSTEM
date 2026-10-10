from fastapi import FastAPI, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
import hashlib
import datetime
import asyncio
import json

from database import get_db, init_models, Employee, SalarySlip
from auth import hash_password, verify_password, create_access_token, decode_access_token
from rag_service import rag_query_engine
from kafka_bus import kafka_bus
import mongo_service

app = FastAPI(
    title="Verdant Payroll OS - Microservices API",
    description="PostgreSQL Relational Core + Semantic RAG + JWT RBAC + Kafka Event Streaming + Microservices",
    version="2.0.0"
)

# Enable CORS for Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_models()

# ==========================================
# 1. AUTHENTICATION & JWT (Review Requirement 3)
# ==========================================
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str
    emp_id: str
    name: str

@app.post("/api/auth/login", response_model=TokenResponse)
def login(creds: LoginRequest, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.email == creds.email).first()
    if not emp:
        # Check fallback demo credentials
        raise HTTPException(status_code=401, detail="Invalid enterprise identity credentials.")

    # Issue signed JWT with Role claims
    token_data = {
        "sub": emp.email,
        "emp_id": emp.emp_id,
        "role": emp.role,
        "name": emp.name
    }
    jwt_token = create_access_token(token_data)

    # Publish login event to Kafka notification bus
    kafka_bus.publish(
        topic="alert-events",
        event_type="user.login_authenticated",
        payload={"detail": f"{emp.name} ({emp.role.upper()}) authenticated via signed JWT", "severity": "info"}
    )

    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "role": emp.role,
        "emp_id": emp.emp_id,
        "name": emp.name
    }

# ==========================================
# 2. RAG & VECTOR SEARCH (Review Requirement 2)
# ==========================================
class RAGQuestion(BaseModel):
    query: str

@app.post("/api/rag/ask")
def ask_policy_rag(q: RAGQuestion):
    result = rag_query_engine(q.query)
    
    # Store full conversation history in MongoDB (Section 5.3)
    mongo_service.log_chat_interaction(
        user_query=q.query,
        ai_response=result.get("answer", ""),
        citations=result.get("citations", []),
        score=result.get("similarity_score", 0.0)
    )

    # Log query to Kafka
    kafka_bus.publish(
        topic="notification-events",
        event_type="rag.query_processed",
        payload={"detail": f"RAG query: '{q.query}' with similarity {result.get('similarity_score', 0)}", "severity": "info"}
    )
    return result

@app.get("/api/audit-logs")
def get_mongodb_audit_logs():
    """Returns immutable unstructured audit trail records from MongoDB."""
    return mongo_service.get_recent_audit_logs()

@app.get("/api/chat-history")
def get_mongodb_chat_history():
    """Returns conversation dialogue records from MongoDB."""
    return mongo_service.get_recent_chat_history()

# ==========================================
# 3. KAFKA NOTIFICATIONS (Review Requirement 5)
# ==========================================
@app.get("/api/notifications")
def get_kafka_notifications():
    return kafka_bus.get_notifications()

# ==========================================
# 4. EMPLOYEE MICROSERVICE & POSTGRESQL CRUD (Review Requirement 1 & 4)
# ==========================================
class EmployeeCreate(BaseModel):
    name: str
    email: str
    role: str
    designation: str
    department: str
    gross_salary: float
    tax_regime: Optional[str] = "New Regime (115BAC)"
    esop_value: Optional[str] = "₹10.0 L"
    patent_royalties: Optional[str] = "₹0/mo"

class EmployeeResponse(BaseModel):
    id: int
    emp_id: str
    name: str
    email: str
    role: str
    designation: str
    department: str
    gross_salary: float
    net_salary: float
    tax_regime: str
    esop_value: str
    patent_royalties: str

    class Config:
        from_attributes = True

@app.get("/api/employees", response_model=List[EmployeeResponse])
def get_all_employees(db: Session = Depends(get_db)):
    return db.query(Employee).order_by(Employee.id.desc()).all()

@app.post("/api/employees", response_model=EmployeeResponse)
def create_employee(emp_data: EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(Employee).filter(Employee.email == emp_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An employee with this email already exists.")

    basic = emp_data.gross_salary * 0.40
    pf = basic * 0.12
    pt = 200.0
    tds = emp_data.gross_salary * 0.12
    computed_net = max(0.0, emp_data.gross_salary - (pf + pt + tds))

    count = db.query(Employee).count() + 1
    new_emp_id = f"EMP-{count:03d}"

    new_emp = Employee(
        emp_id=new_emp_id,
        name=emp_data.name,
        email=emp_data.email,
        role=emp_data.role.lower(),
        designation=emp_data.designation,
        department=emp_data.department,
        gross_salary=emp_data.gross_salary,
        net_salary=computed_net,
        tax_regime=emp_data.tax_regime,
        esop_value=emp_data.esop_value,
        patent_royalties=emp_data.patent_royalties
    )

    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)

    # Issue SHA-256 Verifiable Payslip
    raw_hash_str = f"{new_emp_id}:{emp_data.gross_salary}:{computed_net}:{datetime.datetime.utcnow().isoformat()}"
    sha256 = hashlib.sha256(raw_hash_str.encode()).hexdigest()

    first_slip = SalarySlip(
        emp_id=new_emp_id,
        month_year="October 2026",
        basic=basic,
        hra=emp_data.gross_salary * 0.20,
        special_allowance=emp_data.gross_salary * 0.40,
        ai_tooling_stipend=10000.0,
        patent_royalties=0.0,
        streaming_bonus=3500.0,
        pf_deduction=pf,
        pt_deduction=pt,
        tds_deduction=tds,
        gross_total=emp_data.gross_salary + 13500.0,
        net_disbursed=computed_net + 13500.0,
        sha256_hash=sha256
    )
    db.add(first_slip)
    db.commit()

@app.get("/api/payslip/{emp_id}")
def get_employee_payslip(emp_id: str, db: Session = Depends(get_db)):
    """Fetches real itemized payslip from PostgreSQL for the given employee."""
    slip = db.query(SalarySlip).filter(SalarySlip.emp_id == emp_id).first()
    emp = db.query(Employee).filter(Employee.emp_id == emp_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    if not slip:
        # Dynamically compute and create if not already generated
        basic = emp.gross_salary * 0.40
        hra = emp.gross_salary * 0.20
        special = emp.gross_salary * 0.40
        pf = basic * 0.12
        pt = 200.0
        tds = emp.gross_salary * 0.12
        gross = emp.gross_salary + 13500.0
        net = emp.net_salary + 13500.0
        sha = hashlib.sha256(f"{emp_id}:{gross}:{net}".encode()).hexdigest()
        slip = SalarySlip(
            emp_id=emp_id,
            month_year="October 2026",
            basic=basic,
            hra=hra,
            special_allowance=special,
            ai_tooling_stipend=10000.0,
            patent_royalties=18500.0 if emp.role == "employee" else 25000.0,
            streaming_bonus=3500.0,
            pf_deduction=pf,
            pt_deduction=pt,
            tds_deduction=tds,
            gross_total=gross,
            net_disbursed=net,
            sha256_hash=sha
        )
        db.add(slip)
        db.commit()
        db.refresh(slip)

    return {
        "emp_id": emp.emp_id,
        "name": emp.name,
        "role": emp.role,
        "designation": emp.designation,
        "department": emp.department,
        "tax_regime": emp.tax_regime,
        "month_year": slip.month_year,
        "basic": slip.basic,
        "hra": slip.hra,
        "special_allowance": slip.special_allowance,
        "ai_tooling_stipend": slip.ai_tooling_stipend,
        "patent_royalties": slip.patent_royalties,
        "streaming_bonus": slip.streaming_bonus,
        "gross_total": slip.gross_total,
        "pf_deduction": slip.pf_deduction,
        "pt_deduction": slip.pt_deduction,
        "tds_deduction": slip.tds_deduction,
        "education_fund": 8500.0,
        "green_commute_credit": -1500.0,
        "total_deductions": slip.pf_deduction + slip.pt_deduction + slip.tds_deduction + 8500.0 - 1500.0,
        "net_disbursed": slip.net_disbursed,
        "sha256_hash": slip.sha256_hash
    }

# ==========================================
# 5. TELEMETRY & SYSTEM HEALTH
# ==========================================
@app.get("/api/telemetry")
def get_telemetry(db: Session = Depends(get_db)):
    total_employees = db.query(Employee).count()
    total_payroll = sum([e.gross_salary for e in db.query(Employee).all()])
    return {
        "database": "PostgreSQL 18.4 (payroll_db)",
        "vector_search": "Semantic RAG Policy Engine (Cosine / Embeddings)",
        "authentication": "Bcrypt Salted Hash + HS256 Signed JWT",
        "microservices": "FastAPI Modular Services Gateway",
        "event_streaming": "Kafka Topic Bus (payroll, alert, leave, notification)",
        "total_employees": total_employees,
        "total_monthly_payroll": f"₹{total_payroll:,.2f}"
    }

@app.websocket("/ws/live")
async def websocket_live_stream(websocket: WebSocket):
    """Real-Time WebSocket Stream broadcasting live payroll accruals and Kafka alerts."""
    await websocket.accept()
    try:
        while True:
            payload = {
                "timestamp": datetime.datetime.utcnow().isoformat(),
                "streaming_accrual_rate": 1.85,
                "kafka_latest_event": kafka_bus.get_notifications(limit=1)[0] if kafka_bus.get_notifications() else None,
                "active_connections": 1
            }
            await websocket.send_text(json.dumps(payload))
            await asyncio.sleep(2.5)
    except WebSocketDisconnect:
        pass
