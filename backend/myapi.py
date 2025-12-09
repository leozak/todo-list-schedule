from datetime import datetime, timezone
from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base

# Configura o FastAPI
app = FastAPI(title="To-do List Schedule", version="0.1")

# Configura o DB com SQLAlchemy
db = create_engine("sqlite:///to-do-list.db")
Session = sessionmaker(bind=db)
session = Session()

Base = declarative_base()

# Tabela de usuários
class User(Base):
    __tablename__ = "users"

    username = Column("username", String, primary_key=True, unique=True)
    name = Column("name", String)
    password = Column("password", String)

    def __init__(self, username, name, password):
        self.username = username
        self.name = name
        self.password = password



# Tabela de to-dos
class Todo(Base):
    __tablename__ = "todos"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    title = Column("title", String)
    description = Column("description", String)
    priority = Column("priority", Integer)
    date = Column("date", String)
    done = Column("done", Boolean)
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
@app.get("/")
async def root():
    """DEV: Listagem de todos os to-dos do DB."""
    todos = session.query(Todo).all()
    return todos


# Cria um novo usuário
@app.post("/users/create")
async def create_user(username: str, name: str, password: str):
    user = User(username, name, password)
    session.add(user)
    session.commit()
    return {"message": "User created"}