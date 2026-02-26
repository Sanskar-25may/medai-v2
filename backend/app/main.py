from contextlib import asynccontextmanager
import hashlib, os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Session, select
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from dotenv import load_dotenv
from app.database import create_db_and_tables, get_session
from app.models.models import User
from app.api import voice_agent

load_dotenv()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("Startup: Database tables created.")
    yield
    print("Shutdown: Cleaning up...")

app = FastAPI(lifespan=lifespan, title="MedAI 2.0 Brain")

# --- CORS SECURITY SETUP ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONNECT THE ROUTER ---
app.include_router(voice_agent.router)

@app.get("/")
def home():
    return {"status": "MedAI Backend is officially Live!"}

@app.get("/health")
def health_check():
    return {"database": "connected", "latency": "low"}

@app.get("/api/health-check")
def web_health_check():
    return {"message": "Connection Successful! The AI Brain is online."}


# ── AUTH SCHEMAS ────────────────────────────────────────────
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str


def _hash(pw: str) -> str:
    """Simple SHA-256 hash for passwords."""
    return hashlib.sha256(pw.encode()).hexdigest()


# ── AUTHENTICATION ENDPOINTS ───────────────────────────────

@app.post("/api/signup")
def signup(data: SignupRequest, session: Session = Depends(get_session)):
    # Check if email already exists
    existing = session.exec(select(User).where(User.email == data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Create new user with hashed password
    new_user = User(
        full_name=data.name,
        email=data.email,
        phone_number="",           # optional field, user can add later
        hashed_password=_hash(data.password),
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message": "Account created successfully!", "user_name": new_user.full_name}

@app.post("/api/login")
def login(data: LoginRequest, session: Session = Depends(get_session)):
    # Find user by email
    db_user = session.exec(select(User).where(User.email == data.email)).first()

    # Verify credentials
    if not db_user or db_user.hashed_password != _hash(data.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful!", "user_name": db_user.full_name}


# ── GOOGLE SIGN-IN ─────────────────────────────────────────

class GoogleLoginRequest(BaseModel):
    credential: str  # The JWT token from Google Identity Services

@app.post("/api/google-login")
def google_login(data: GoogleLoginRequest, session: Session = Depends(get_session)):
    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(
            data.credential, google_requests.Request(), GOOGLE_CLIENT_ID
        )
        google_email = idinfo["email"]
        google_name = idinfo.get("name", google_email.split("@")[0])
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    # Check if user already exists
    db_user = session.exec(select(User).where(User.email == google_email)).first()

    if not db_user:
        # Auto-create account for first-time Google users
        db_user = User(
            full_name=google_name,
            email=google_email,
            phone_number="",
            hashed_password="GOOGLE_AUTH",  # No password needed for Google users
        )
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return {"message": "Account created via Google!", "user_name": db_user.full_name, "is_new": True}

    return {"message": "Login successful!", "user_name": db_user.full_name, "is_new": False}