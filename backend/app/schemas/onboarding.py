from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date


class OnboardingBase(BaseModel):
    employee_id: Optional[int] = None
    employee_name: str
    email: EmailStr
    department: str
    role: str
    start_date: Optional[date] = None
    status: str = "Pending"
    onboarding_stage: Optional[str] = None
    assigned_buddy: Optional[str] = None
    notes: Optional[str] = None
    completed_tasks: Optional[str] = None
    pending_tasks: Optional[str] = None


class OnboardingCreate(OnboardingBase):
    pass


class OnboardingUpdate(BaseModel):
    employee_id: Optional[int] = None
    employee_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    role: Optional[str] = None
    start_date: Optional[date] = None
    status: Optional[str] = None
    onboarding_stage: Optional[str] = None
    assigned_buddy: Optional[str] = None
    notes: Optional[str] = None
    completed_tasks: Optional[str] = None
    pending_tasks: Optional[str] = None


class OnboardingInDB(OnboardingBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Onboarding(OnboardingInDB):
    pass
