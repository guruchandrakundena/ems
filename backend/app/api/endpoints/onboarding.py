from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.onboarding import Onboarding
from app.schemas.onboarding import Onboarding as OnboardingSchema, OnboardingCreate, OnboardingUpdate
from app.core.deps import get_current_active_user

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])


@router.get("", response_model=List[OnboardingSchema])
def get_onboarding_records(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get all onboarding records."""
    onboarding_records = db.query(Onboarding).offset(skip).limit(limit).all()
    return onboarding_records


@router.get("/{onboarding_id}", response_model=OnboardingSchema)
def get_onboarding_record(
    onboarding_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get a specific onboarding record by ID."""
    onboarding = db.query(Onboarding).filter(Onboarding.id == onboarding_id).first()
    if not onboarding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Onboarding record not found"
        )
    return onboarding


@router.post("", response_model=OnboardingSchema, status_code=status.HTTP_201_CREATED)
def create_onboarding_record(
    onboarding_data: OnboardingCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Create a new onboarding record."""
    db_onboarding = Onboarding(**onboarding_data.model_dump())
    db.add(db_onboarding)
    db.commit()
    db.refresh(db_onboarding)
    return db_onboarding


@router.put("/{onboarding_id}", response_model=OnboardingSchema)
def update_onboarding_record(
    onboarding_id: int,
    onboarding_data: OnboardingUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Update an onboarding record."""
    onboarding = db.query(Onboarding).filter(Onboarding.id == onboarding_id).first()
    if not onboarding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Onboarding record not found"
        )

    update_data = onboarding_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(onboarding, field, value)

    db.commit()
    db.refresh(onboarding)
    return onboarding


@router.delete("/{onboarding_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_onboarding_record(
    onboarding_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Delete an onboarding record."""
    onboarding = db.query(Onboarding).filter(Onboarding.id == onboarding_id).first()
    if not onboarding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Onboarding record not found"
        )

    db.delete(onboarding)
    db.commit()
    return None
