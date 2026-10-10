from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import create_engine
import datetime

DATABASE_URL = "postgresql://postgres:615461@localhost:5432/payroll_db"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    code = Column(String(20), unique=True, nullable=False)

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(String(50), unique=True, index=True, nullable=False) # e.g. EMP-109
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    role = Column(String(50), nullable=False, default="employee") # admin, hr, accountant, manager, employee
    designation = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    gross_salary = Column(Float, nullable=False)
    net_salary = Column(Float, nullable=False)
    tax_regime = Column(String(50), default="New Regime (115BAC)")
    esop_value = Column(String(50), default="₹15.0 L")
    patent_royalties = Column(String(50), default="₹0/mo")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SalarySlip(Base):
    __tablename__ = "salary_slips"
    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(String(50), ForeignKey("employees.emp_id"), nullable=False)
    month_year = Column(String(30), nullable=False)
    basic = Column(Float, nullable=False)
    hra = Column(Float, nullable=False)
    special_allowance = Column(Float, nullable=False)
    ai_tooling_stipend = Column(Float, default=10000.0)
    patent_royalties = Column(Float, default=0.0)
    streaming_bonus = Column(Float, default=3500.0)
    pf_deduction = Column(Float, nullable=False)
    pt_deduction = Column(Float, nullable=False)
    tds_deduction = Column(Float, nullable=False)
    gross_total = Column(Float, nullable=False)
    net_disbursed = Column(Float, nullable=False)
    sha256_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Auto-create tables & seed default employees if empty
def init_models():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(Employee).count() == 0:
        seed_data = [
            Employee(
                emp_id="EMP-001",
                name="Vikramaditya Rao",
                email="vikramaditya.rao@synthetica.eco",
                role="admin",
                designation="Chief Executive Officer",
                department="Executive Leadership",
                gross_salary=450000.0,
                net_salary=348200.0,
                tax_regime="New Regime (115BAC)",
                esop_value="₹1.45 Cr",
                patent_royalties="₹45,000/mo"
            ),
            Employee(
                emp_id="EMP-014",
                name="Pooja Sundaram",
                email="pooja.sundaram@synthetica.eco",
                role="hr",
                designation="VP - Human Resources",
                department="People & Talent",
                gross_salary=280000.0,
                net_salary=218500.0,
                tax_regime="New Regime (115BAC)",
                esop_value="₹42.8 L",
                patent_royalties="₹12,000/mo"
            ),
            Employee(
                emp_id="EMP-027",
                name="Karthik Subramanian",
                email="karthik.sub@synthetica.eco",
                role="accountant",
                designation="Head of Payroll Accounts",
                department="Finance & Taxation",
                gross_salary=220000.0,
                net_salary=174300.0,
                tax_regime="Old Regime (Section 80C)",
                esop_value="₹28.4 L",
                patent_royalties="₹8,000/mo"
            ),
            Employee(
                emp_id="EMP-045",
                name="Arjun Venkataraman",
                email="arjun.v@synthetica.eco",
                role="manager",
                designation="Engineering Director",
                department="Engineering & Architecture",
                gross_salary=310000.0,
                net_salary=242800.0,
                tax_regime="New Regime (115BAC)",
                esop_value="₹65.0 L",
                patent_royalties="₹28,500/mo"
            ),
            Employee(
                emp_id="EMP-108",
                name="Ananya Sharma",
                email="ananya.sharma@synthetica.eco",
                role="employee",
                designation="Senior Software Engineer",
                department="Product Engineering",
                gross_salary=185000.0,
                net_salary=142500.0,
                tax_regime="New Regime (115BAC)",
                esop_value="₹22.5 L",
                patent_royalties="₹18,500/mo"
            )
        ]
        db.add_all(seed_data)
        db.commit()
    db.close()
