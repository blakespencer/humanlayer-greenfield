# Python + FastAPI Template

Modern, high-performance Python web framework with automatic OpenAPI documentation and async support.

## Initialization

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install core dependencies
pip install fastapi uvicorn[standard] sqlalchemy alembic pydantic-settings pytest
```

## What's Included

- ✅ FastAPI 0.119+ framework
- ✅ Async/await support
- ✅ Automatic OpenAPI docs
- ✅ Pydantic validation
- ✅ Type hints
- ✅ SQLAlchemy ORM

## Project Structure

```
fastapi-project/
├── app/
│   ├── __init__.py
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   │   └── __init__.py
│   ├── schemas/             # Pydantic schemas
│   │   └── __init__.py
│   ├── routers/             # API routes
│   │   ├── __init__.py
│   │   └── users.py
│   ├── services/            # Business logic
│   │   └── __init__.py
│   ├── dependencies.py      # Dependency injection
│   └── middleware/          # Custom middleware
│       └── __init__.py
├── tests/
│   ├── __init__.py
│   └── test_main.py
├── alembic/                 # Database migrations
├── requirements.txt
├── .env
└── README.md
```

## Required Packages

```bash
# Core
pip install fastapi uvicorn[standard]

# Database
pip install sqlalchemy alembic psycopg2-binary

# Validation & Settings
pip install pydantic pydantic-settings python-dotenv

# Authentication
pip install python-jose[cryptography] passlib[bcrypt] python-multipart

# Testing
pip install pytest pytest-asyncio httpx

# CORS
pip install python-multipart

# Save dependencies
pip freeze > requirements.txt
```

Or use `requirements.txt`:
```txt
fastapi==0.119.0
uvicorn[standard]==0.34.0
sqlalchemy==2.0.36
alembic==1.14.0
psycopg2-binary==2.9.10
pydantic==2.10.4
pydantic-settings==2.7.0
python-dotenv==1.0.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.20
pytest==8.3.4
pytest-asyncio==0.25.2
httpx==0.28.1
```

## Main Application

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import users
from app.database import engine
from app.models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="My API",
    description="API description",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/v1", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

## Configuration

```python
# app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Application
    app_name: str = "My API"
    debug: bool = False

    # Database
    database_url: str

    # JWT
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
```

## Database Setup

```python
# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## Models

```python
# app/models/user.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

## Schemas (Pydantic)

```python
# app/schemas/user.py
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: str | None = None
    password: str | None = None

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
```

## Router Example

```python
# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()

@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users", response_model=list[UserResponse])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

## Environment Variables

```env
# .env
# Application
APP_NAME="My API"
DEBUG=true

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb

# JWT
SECRET_KEY=your-secret-key-here-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Database Migrations (Alembic)

```bash
# Initialize Alembic
alembic init alembic

# Edit alembic/env.py to use your database URL and models

# Create migration
alembic revision --autogenerate -m "create users table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Testing

```python
# tests/test_main.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the API"}

def test_create_user():
    response = client.post(
        "/api/v1/users",
        json={"email": "test@example.com", "name": "Test User", "password": "password123"}
    )
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"
```

Run tests:
```bash
pytest
pytest -v
pytest --cov=app
```

## Run Application

```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

Access:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/mydb
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Best Practices

1. **Type Hints** - Use type hints everywhere
2. **Async/Await** - Use async for I/O operations
3. **Dependency Injection** - Use FastAPI's Depends()
4. **Pydantic Models** - Validate all input/output
5. **Error Handling** - Use HTTPException with proper status codes
6. **Documentation** - FastAPI auto-generates OpenAPI docs
7. **Testing** - Write tests with pytest and TestClient

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Pydantic Documentation](https://docs.pydantic.dev)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org)
- [Alembic Documentation](https://alembic.sqlalchemy.org)
