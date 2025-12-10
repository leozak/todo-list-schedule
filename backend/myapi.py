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


class TodosSchema(BaseModel):
    id: int
    title: str
    description: str
    priority: int
    date: str
    done: bool
    username: str

# Tabela de to-dos
class Todo(Base):
    __tablename__ = "todos"

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
    """DEV: Listagem de todos os to-dos do DB."""
    todos = session.query(Todo).filter(Todo.username == username).all()
    return todos


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
            new_user = User(name=user.name, username=user.username, password=user.password)
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



@app.post("/users/update")
async def update_user(username: str, name: str, password: str):
    """Atualiza um usuário."""
    user = session.query(User).filter(User.username == username).first()
    user.name = name
    user.password = password
    session.commit()
    return {"message": "User updated"}


@app.post("/users/login")
async def login_user(user: LoginSchema):
    """Login de um usuário."""

    print("LOGIN")

    existing_user = session.query(User).filter_by(username=user.username, password=user.password).first()

    if (existing_user):
        print("username", existing_user.username)
        print("password", existing_user.password)
        return {
                "success": True,
                "message": "User logged in",
            }
    else:
        return {
                "success": False,
                "message": "User not found",
            }
    

    # if user and user.password == password:
    #     return {"name": user.name,
    #             "username": user.username,
    #             "message": "Login successful",
    #             "success": True,
    #     }
    # else:
    #     return {"message": "Invalid username or password",
    #             "success": False,}