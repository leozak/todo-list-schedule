import hashlib
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base
from pydantic import BaseModel

# Configura o FastAPI
app = FastAPI(title="To-do List Schedule", version="0.1")

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

# SQLAlchemy
db = create_engine("sqlite:///to-do-list.db")
Session = sessionmaker(bind=db)
session = Session()

Base = declarative_base()

class UserSchema(BaseModel):
    name: str
    username: str
    password: str

class LoginSchema(BaseModel):
    username: str
    password: str

# Tabela de usuários
class User(Base):
    __tablename__ = "users"

    name = Column("name", String)
    username = Column("username", String, primary_key=True, unique=True)
    password = Column("password", String)

    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password


class TaskSchema(BaseModel):
    id: int
    title: str
    description: str
    priority: int
    date: str
    done: bool
    username: str

# Tabela de to-dos
class Task(Base):
    __tablename__ = "task"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    title = Column("title", String)
    description = Column("description", String)
    priority = Column("priority", Integer)
    done = Column("done", Boolean)
    date = Column("date", String)
    username = Column("username", ForeignKey("users.username"))

    def __init__(self, title, description, username, priority=0, date=datetime.isoformat(datetime.now(), timespec="seconds"), done=False):
        self.title = title
        self.description = description
        self.priority = priority
        self.date = date
        self.done = done
        self.username = username
        

# Cria as tabelas
Base.metadata.create_all(bind=db)

# DEV: Mostra todos os registros do DB
@app.get("/{username}")
async def root(username: str):
    """Listagem de todas as tasks do usuário."""
    task = session.query(Task).filter(Task.username == username).all()
    return task


# Cria um novo usuário
@app.post("/users/create")
async def create_user(user: UserSchema):
    """Creates a new user."""
    try:
        existing_user = session.query(User).filter_by(username=user.username).first()
        if existing_user:
            return {
                "success": False,
                "message": "User already exists"
            }
        else:
            hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
            new_user = User(name=user.name, username=user.username, password=hashed_password)
            session.add(new_user)
            session.commit()
            return {
                "success": True,
                "message": "User created",
                "name": user.name,
                "username": user.username
            }
    except Exception as e:
        session.rollback()
        return {
            "success": False,
            "message": "Error creating user"
        }
    finally:
        session.close()


@app.post("/tasks/create")
async def create_task(task: TaskSchema):
    """Cria uma nova task."""
    try:
        new_task = Task(title=task.title, description=task.description, priority=task.priority, done=task.done, date=task.date, username=task.username)
        session.add(new_task)
        session.commit()
        return {
            "success": True,
            "message": "Task created",
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "priority": new_task.priority,
            "date": new_task.date,
            "done": new_task.done,
            "username": new_task.username
        }
    except Exception as e:
        session.rollback()
        return {
            "success": False,
            "message": "Error creating task"
        }
    finally:
        session.close()


# @app.post("/users/update")
# async def update_user(username: str, name: str, password: str):
#     """Atualiza um usuário."""
#     user = session.query(User).filter(User.username == username).first()
#     user.name = name
#     user.password = password
#     session.commit()
#     return {"message": "User updated"}


@app.post("/users/login")
async def login_user(user: LoginSchema):
    """Login de um usuário."""
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    existing_user = session.query(User).filter_by(username=user.username, password=hashed_password).first()
    if (existing_user):
        return {
                "success": True,
                "message": "User logged in",
                "name": existing_user.name,
                "username": existing_user.username
            }
    else:
        return {
                "success": False,
                "message": "User not found",
            }