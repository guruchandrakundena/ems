from sqlalchemy import Column, Integer, String, DateTime, Date, Text
from sqlalchemy.sql import func
from app.db.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    role = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)  # Full-Time, Contract
    location = Column(String(50), nullable=False)  # Onshore, Offshore
    status = Column(String(50), nullable=False, default="Active")  # Active, On Bench, Inactive
    skills = Column(Text, nullable=True)  # Stored as comma-separated values
    join_date = Column(Date, nullable=True)
    manager = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
