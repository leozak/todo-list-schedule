import os
import hashlib
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from pydantic import BaseModel
from typing import Union

from config.database import Base, engine, get_db

from models.user import User
from models.task import Task

load_dotenv()

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")
SECRET_KEY = os.getenv("SECRET_KEY", "79a9ebd164d2d36fab50c5bd4b2828b4e1325ec0c6b9c6d1c2b2c3b2c4b2c5b2")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login-form")

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
# Cria um novo token
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    """Cria um novo token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


#
# Verifica a validade do token
def verify_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Verifica a validade do token."""
    try:
        payload = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(User).filter_by(email=payload.get("sub")).first()
        if not user:
            raise HTTPException(status_code=401, detail={"success": False, "message": "User not found."})
        return {
            "success": True,
            "message": "Token valid.",
            "name": user.name,
            "email": user.email
        }
    except JWTError:
        raise HTTPException(status_code=401, detail={"success": False, "message": "Invalid token."})


#
# Status da API
@app.get("/")
async def root(db: Session = Depends(get_db)):
    """Status da API."""
    return {"status": "online", "message": "Task Manager API is running."}


#
# Login de um usuário
class LoginSchema(BaseModel):
    email: str
    password: str

@app.post("/users/login")
async def login_user(user: LoginSchema, db: Session = Depends(get_db)):
    """Login de um usuário."""
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    existing_user = db.query(User).filter_by(email=user.email, password=hashed_password).first()
    if (not existing_user):
        raise HTTPException(status_code=401, detail={"success": False, "message": "User not found or password incorrect."})
    else:
        access_token = create_access_token(data={"sub": existing_user.email})
        refresh_token = create_access_token(data={"sub": existing_user.email, "type": "refresh"}, expires_delta=timedelta(days=7))
        return {
            "success": True,
            "message": "User logged in.",
            "name": existing_user.name,
            "email": existing_user.email,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }

@app.post("/users/login-form")
async def login_form_user(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login de um usuário."""
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    existing_user = db.query(User).filter_by(email=user.username, password=hashed_password).first()
    if (not existing_user):
        raise HTTPException(status_code=401, detail={"success": False, "message": "User not found or password incorrect."})
    else:
        access_token = create_access_token(data={"sub": existing_user.email})
        refresh_token = create_access_token(data={"sub": existing_user.email, "type": "refresh"}, expires_delta=timedelta(days=7))
        return {
            "success": True,
            "message": "User logged in.",
            "name": existing_user.name,
            "email": existing_user.email,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }

@app.get("/verify-token")
async def validate_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Verifica a validade do token."""
    user = verify_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail={"success": False, "message": "Invalid token."})
    return {
        "success": True,
        "message": "Token valid."
    }


#
# Atualiza o token de autenticação
@app.get("/refresh-token")
async def refresh_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Atualiza o token de autenticação."""
    user = verify_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail={"success": False, "message": "User not found."})
    access_token = create_access_token(data={"sub": user["email"]})
    refresh_token = create_access_token(data={"sub": user["email"], "type": "refresh"}, expires_delta=timedelta(days=7))
    return {
        "success": True,
        "message": "Token refreshed.",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer"
    }

#
# Cria um novo usuário
class UserCreateSchema(BaseModel):
    name: str
    email: str
    password: str

@app.post("/users/create", status_code=201)
async def create_user(user: UserCreateSchema, db: Session = Depends(get_db)):
    """Creates a new user."""
    try:
        existing_user = db.query(User).filter_by(email=user.email).first()
        if existing_user:
            return {
                "success": False,
                "message": "User already exists",
                "name": existing_user.name,
                "email": existing_user.email
            }
        else:
            hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
            new_user = User(name=user.name, email=user.email, password=hashed_password)
            
            add_first_task = Task(title="Resolva o que é crítico agora", description="A prioridade Urgente deve ser usada para tarefas que exigem atenção imediata, como prazos que vencem hoje ou problemas que impedem seu progresso. Se não pode esperar, é urgente.", priority=0, pin=True, done=False, email=user.email, date="2026-01-09")
            add_secound_task = Task(title="Organize suas metas principais", description="A prioridade Importante é para atividades que trazem valor real ao seu projeto. Use para tarefas que têm prazo definido, mas não são emergências. A maior parte do seu trabalho deve estar aqui.", priority=1, pin=True, done=False, email=user.email, date="2026-01-09")
            add_tird_task = Task(title="Ideias para quando sobrar tempo", description="A prioridade Opcional serve para ideias, melhorias desejáveis (nice-to-have) ou tarefas sem prazo. São coisas que você gostaria de fazer, mas não afetarão seu projeto se ficarem para depois.", priority=2, pin=True, done=False, email=user.email, date="2026-01-09")

            db.add(new_user)
            db.commit()
            db.add(add_first_task)
            db.add(add_secound_task)
            db.add(add_tird_task)
            db.commit()
            
            db.commit()
            return {
                "success": True,
                "message": "User created",
                "name": user.name,
                "email": user.email
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
# Atualização das informações de um usuário
class UserUpdateSchema(BaseModel):
    name: str = None
    email: str
    password: str = None

@app.post("/users/update")
async def update_user(user: UserUpdateSchema, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Atualiza as informações de um usuário."""
    user_data = verify_token(token, db)
    if not user_data:
        raise HTTPException(status_code=401, detail={"success": False, "message": "User not authenticated."})
    existing_user = db.query(User).filter_by(email=user_data["email"]).first()
    if existing_user:
        if user.password:
            hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
            existing_user.password = hashed_password
        if user.name:
            existing_user.name = user.name
        db.commit()
        return {
            "success": True,
            "message": "User updated",
            "name": existing_user.name,
            "email": existing_user.email
        }



#
# Retorna todas as tasks de um usuário
@app.get("/tasks/{username}")
async def get_tasks(username: str, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Listagem de todas as tasks do usuário."""
    user = verify_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail={"success": False, "message": "User not authenticated."})
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
