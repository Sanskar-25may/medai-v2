from sqlmodel import SQLModel, create_engine, Session
# We import models so SQLModel knows about them before creating tables
from app.models import models 

sqlite_file_name = "medai.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# This argument is needed specifically for SQLite
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    """Creates the database tables based on our models."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Dependency for FastAPI to get a DB session."""
    with Session(engine) as session:
        yield session