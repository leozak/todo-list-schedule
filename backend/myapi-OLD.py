import os
import hashlib
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base
from pydantic import BaseModel

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@db:5432/tarefas",
)

ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")

# origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

# Configura o FastAPI
app = FastAPI(title="Trask Manager API", version="0.3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

# SQLAlchemy
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
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
    pin: bool
    done: bool
    username: str
    date: str

# Tabela de to-dos
class Task(Base):
    __tablename__ = "task"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    title = Column("title", String)
    description = Column("description", String)
    priority = Column("priority", Integer)
    pin = Column("pin", Boolean)
    done = Column("done", Boolean)
    username = Column("username", ForeignKey("users.username"))
    date = Column("date", String)

    def __init__(self, title, description, username, priority=0, date=datetime.isoformat(datetime.now(), timespec="seconds"), pin=False, done=False):
        self.title = title
        self.description = description
        self.priority = priority
        self.pin = pin
        self.done = done
        self.username = username
        self.date = date
        

# Cria as tabelas
Base.metadata.create_all(bind=engine)


#
# Dependency que retorna a sessão de banco de dados
def get_db():
    """
    Gera uma nova sessão de banco de dados.
    """
    new_db = Session()
    try:
        yield new_db
    finally:
        new_db.close()


#
# DEV: Mostra todos os registros do DB
@app.get("/")
async def root(username: str):
    """Listagem de todas as tasks do usuário."""
    task = session.query(Task).all()
    return task


#
# Login de um usuário
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


#
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

#
# Retorna todas as tasks de um usuário
@app.get("/tasks/{username}")
async def get_tasks(username: str):
    """Listagem de todas as tasks do usuário."""
    tasks = session.query(Task).filter(Task.username == username).order_by(Task.date).all()

    if not tasks:
        return {
            "success": False,
            "message": "Message not found"
        }

    tasks_list = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "pin": task.pin,
            "done": task.done,
            "date": task.date
        }
        for task in tasks
    ]

    return tasks_list


#
# Cria uma nova task
@app.post("/tasks/create")
async def create_task(task: TaskSchema):
    """Cria uma nova task."""
    try:
        new_task = Task(title=task.title, description=task.description, priority=task.priority, pin=task.pin, done=task.done, date=task.date, username=task.username)
        session.add(new_task)
        session.commit()
        return {
            "success": True,
            "message": "Task created",
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "priority": new_task.priority,
            "pin": new_task.pin,
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


#
# Schema para alterar uma task
class TaskUpdateSchema(BaseModel):
    title: str
    description: str
    priority: int
    pin: bool
    done: bool
    date: str

#
# Altera uma task
@app.put("/tasks/update/{id}")
async def update_task(id: int, task: TaskUpdateSchema):
    """Altera uma task."""
    try:
        session.query(Task).filter(Task.id == id).update({
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "pin": task.pin,
            "done": task.done,
            "date": task.date
        })
        session.commit()
        return {
            "success": True,
            "message": "Task updated",
            "id": id,
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "pin": task.pin,
            "done": task.done,
            "date": task.date
        }
    except Exception as e:
        session.rollback()
        return {
            "success": False,
            "message": "Error updating task"
        }
    finally:
        session.close()

#
# Deletar uma tarefa
@app.delete("/tasks/delete/{id}")
async def delete_task(id: int):
    """Deleta uma task."""
    try:
        session.query(Task).filter(Task.id == id).delete()
        session.commit()
        return {
            "success": True,
            "message": "Task deleted",
            "id": id
        }
    except Exception as e:
        session.rollback()
        return {
            "success": False,
            "message": "Error deleting task"
        }
    finally:
        session.close()


#
# Schema para mudar o status de conclusão
class TaskDoneSchema(BaseModel):
    done: bool

#
# Muda o status de conclusão
@app.patch("/tasks/done/{id}")
async def done_task(id: int, task: TaskDoneSchema):
    """Muda o status de conclusão de uma task."""
    try:
        session.query(Task).filter(Task.id == id).update({"done": task.done})
        session.commit()
        return {
            "success": True,
            "message": "Task done updated",
            "id": id,
            "done": task.done,
        }
    except Exception as e:
        session.rollback()
        return {
            "success": False,
            "message": "Error updating done"
        }
    finally:
        session.close()


#
# Schema para fixar ou desafixar uma tarefa
class TaskPinSchema(BaseModel):
    pin: bool

#
# Fixa ou desafixa uma tarefa
@app.patch("/tasks/pin/{id}")
async def pin_task(id: int, task: TaskPinSchema):
    """Fixa ou desafixa uma tarefa."""
    try:
        session.query(Task).filter(Task.id == id).update({"pin": task.pin})
        session.commit()
        return {
            "success": True,
            "message": "Task pin updated",
            "id": id,
            "done": task.pin,
        }
    except Exception as e:
        session.rollback()
        return {
            "success": False,
            "message": "Error updating pin"
        }
    finally:
        session.close()
