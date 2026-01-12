from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from decimal import Decimal


class ProjectBase(BaseModel):
    name: str
    client_id: Optional[int] = None
    description: Optional[str] = None
    status: str = "Active"
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget: Optional[Decimal] = None
    technology_stack: Optional[str] = None
    project_manager: Optional[str] = None
    team_size: Optional[int] = None
    priority: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    client_id: Optional[int] = None
    description: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget: Optional[Decimal] = None
    technology_stack: Optional[str] = None
    project_manager: Optional[str] = None
    team_size: Optional[int] = None
    priority: Optional[str] = None


class ProjectInDB(ProjectBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Project(ProjectInDB):
    pass
