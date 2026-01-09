import os
import hashlib
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from config.database import Base, engine, get_db

from models.user import User
from models.task import Task

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")

origins = [origins.strip() for origins in CORS_ORIGINS.split(",")]


Base.metadata.create_all(bind=engine)

# Configura o FastAPI
app = FastAPI(title="Trask Manager API", version="0.3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )


#
# DEV: Mostra todos os registros do DB
@app.get("/")
async def root(db: Session = Depends(get_db)):
    """Status da API."""
    return {"status": "online", "message": "API de Tarefas"}


#
# Login de um usuário
class LoginSchema(BaseModel):
    username: str
    password: str

@app.post("/users/login")
async def login_user(user: LoginSchema, db: Session = Depends(get_db)):
    """Login de um usuário."""
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    existing_user = db.query(User).filter_by(username=user.username, password=hashed_password).first()
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
class UserCreateSchema(BaseModel):
    name: str
    username: str
    password: str

@app.post("/users/create", status_code=201)
async def create_user(user: UserCreateSchema, db: Session = Depends(get_db)):
    """Creates a new user."""
    try:
        existing_user = db.query(User).filter_by(username=user.username).first()
        if existing_user:
            return {
                "success": False,
                "message": "User already exists"
            }
        else:
            hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
            new_user = User(name=user.name, username=user.username, password=hashed_password)
            db.add(new_user)
            db.commit()
            return {
                "success": True,
                "message": "User created",
                "name": user.name,
                "username": user.username
            }
    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": "Error creating user"
        }
    finally:
        db.close()

#
# Retorna todas as tasks de um usuário
@app.get("/tasks/{username}")
async def get_tasks(username: str, db: Session = Depends(get_db)):
    """Listagem de todas as tasks do usuário."""
    tasks = db.query(Task).filter(Task.username == username).order_by(Task.date).all()

    if not tasks:
        return {
            "success": False,
            "message": "Message not found",
            "tasks": []
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
class TaskCreateSchema(BaseModel):
    title: str
    description: str
    priority: int
    pin: bool
    done: bool
    username: str
    date: str

@app.post("/tasks/create", status_code=201)
async def create_task(task: TaskCreateSchema, db: Session = Depends(get_db)):
    """Cria uma nova task."""
    try:
        new_task = Task(title=task.title, description=task.description, priority=task.priority, pin=task.pin, done=task.done, date=task.date, username=task.username)
        db.add(new_task)
        db.commit()
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
        db.rollback()
        return {
            "success": False,
            "message": "Error creating task"
        }
    finally:
        db.close()


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
async def update_task(id: int, task: TaskUpdateSchema, db: Session = Depends(get_db)):
    """Altera uma task."""
    try:
        db.query(Task).filter(Task.id == id).update({
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "pin": task.pin,
            "done": task.done,
            "date": task.date
        })
        db.commit()
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
        db.rollback()
        return {
            "success": False,
            "message": "Error updating task"
        }
    finally:
        db.close()

#
# Deletar uma tarefa
@app.delete("/tasks/delete/{id}")
async def delete_task(id: int, db: Session = Depends(get_db)):
    """Deleta uma task."""
    try:
        db.query(Task).filter(Task.id == id).delete()
        db.commit()
        return {
            "success": True,
            "message": "Task deleted",
            "id": id
        }
    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": "Error deleting task"
        }
    finally:
        db.close()


#
# Muda o status de conclusão de uma tarefa
class TaskDoneSchema(BaseModel):
    done: bool

@app.patch("/tasks/done/{id}")
async def done_task(id: int, task: TaskDoneSchema, db: Session = Depends(get_db)):
    """Muda o status de conclusão de uma task."""
    try:
        db.query(Task).filter(Task.id == id).update({"done": task.done})
        db.commit()
        return {
            "success": True,
            "message": "Task done updated",
            "id": id,
            "done": task.done,
        }
    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": "Error updating done"
        }
    finally:
        db.close()


#
# Fixa ou desafixa uma tarefa
class TaskPinSchema(BaseModel):
    pin: bool

@app.patch("/tasks/pin/{id}")
async def pin_task(id: int, task: TaskPinSchema, db: Session = Depends(get_db)):
    """Fixa ou desafixa uma tarefa."""
    try:
        db.query(Task).filter(Task.id == id).update({"pin": task.pin})
        db.commit()
        return {
            "success": True,
            "message": "Task pin updated",
            "id": id,
            "done": task.pin,
        }
    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": "Error updating pin"
        }
    finally:
        db.close()
