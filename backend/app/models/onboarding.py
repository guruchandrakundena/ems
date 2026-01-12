from sqlalchemy import Column, Integer, String, DateTime, Date, Text, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base


class Onboarding(Base):
    __tablename__ = "onboarding"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    employee_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False)
    role = Column(String(255), nullable=False)
    start_date = Column(Date, nullable=True)
    status = Column(String(50), nullable=False, default="Pending")  # Pending, In Progress, Completed
    onboarding_stage = Column(String(100), nullable=True)  # Documentation, Equipment Setup, Training, etc.
    assigned_buddy = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    completed_tasks = Column(Text, nullable=True)  # Stored as comma-separated values
    pending_tasks = Column(Text, nullable=True)  # Stored as comma-separated values
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
