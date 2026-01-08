from sqlalchemy import Column, String

from config.database import Base

class User(Base):
    __tablename__ = "users"

    name = Column("name", String)
    username = Column("username", String, primary_key=True, unique=True)
    password = Column("password", String)

    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password