import uuid
from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column
from sqlalchemy.dialects.sqlite import JSON  # Using SQLite JSON for local dev

# ---------------------------------------------------------
# The Base Model (Every table will have these timestamps)
# ---------------------------------------------------------
class TimestampModel(SQLModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# ---------------------------------------------------------
# 1. The Master Patient Index
# ---------------------------------------------------------
class User(TimestampModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # Core Identity
    email: str = Field(index=True, unique=True)
    phone_number: str = Field(index=True, unique=True)
    hashed_password: str
    
    # Demographics (Crucial for Vernacular AI)
    full_name: str
    preferred_language: str = Field(default="en")  # Options: 'en', 'hi', 'bn'
    
    # ABHA / Indian Health Stack Integration
    abha_id: Optional[str] = Field(default=None, index=True)
    
    # Medical Profile (Allergies, chronic conditions)
    # Stored as JSON so we can add fields flexibly
    medical_profile: dict = Field(default={}, sa_column=Column(JSON))

    # Relationships
    prescriptions: List["Prescription"] = Relationship(back_populates="patient")
    vitals: List["VitalSign"] = Relationship(back_populates="patient")

# ---------------------------------------------------------
# 2. The Prescription / Consultation Record
# ---------------------------------------------------------
class Prescription(TimestampModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    patient_id: uuid.UUID = Field(foreign_key="user.id")
    doctor_name: str
    
    # The image of the prescription
    image_url: str
    
    # The AI-Extracted Data (Medicine names, dosages)
    extracted_data: dict = Field(default={}, sa_column=Column(JSON))
    
    # Status: 'pending_verification', 'verified', 'rejected'
    status: str = Field(default="pending_verification")
    
    patient: Optional[User] = Relationship(back_populates="prescriptions")

# ---------------------------------------------------------
# 3. The IoT Stream (For the MedAI Band)
# ---------------------------------------------------------
class VitalSign(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  # Auto-increment
    patient_id: uuid.UUID = Field(foreign_key="user.id")
    
    # Types: 'heart_rate', 'spo2', 'temperature'
    type: str 
    value: float
    unit: str
    
    # Exact timestamp of the reading
    recorded_at: datetime = Field(default_factory=datetime.utcnow)
    
    patient: Optional[User] = Relationship(back_populates="vitals")