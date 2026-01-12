from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date


class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str
    department: str
    type: str  # Full-Time, Contract
    location: str  # Onshore, Offshore
    status: str = "Active"  # Active, On Bench, Inactive
    skills: Optional[str] = None  # Comma-separated
    join_date: Optional[date] = None
    manager: Optional[str] = None


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    type: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    skills: Optional[str] = None
    join_date: Optional[date] = None
    manager: Optional[str] = None


class EmployeeInDB(EmployeeBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Employee(EmployeeInDB):
    pass
