from sqlalchemy import Column, Integer, String, DateTime, Date, Text, ForeignKey, Numeric
from sqlalchemy.sql import func
from app.db.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, default="Active")  # Active, Completed, On Hold
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    budget = Column(Numeric(15, 2), nullable=True)
    technology_stack = Column(Text, nullable=True)  # Stored as comma-separated values
    project_manager = Column(String(255), nullable=True)
    team_size = Column(Integer, nullable=True)
    priority = Column(String(50), nullable=True)  # High, Medium, Low
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
