from sqlalchemy import Column, String

from config.database import Base

class User(Base):
    __tablename__ = "user"

    email = Column("email", String, primary_key=True, unique=True)
    name = Column("name", String)
    password = Column("password", String)

    def __init__(self, name, email, password):
        self.email = email
        self.name = name
        self.password = password