from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from config.database import Base

class Task(Base):
    __tablename__ = "task"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    title = Column("title", String)
    description = Column("description", String)
    priority = Column("priority", Integer)
    pin = Column("pin", Boolean)
    done = Column("done", Boolean)
    email = Column("email", ForeignKey("user.email"))
    date = Column("date", String)

    def __init__(self, title, description, email, priority=0, date=datetime.isoformat(datetime.now(), timespec="seconds"), pin=False, done=False):
        self.title = title
        self.description = description
        self.priority = priority
        self.pin = pin
        self.done = done
        self.email = email
        self.date = date