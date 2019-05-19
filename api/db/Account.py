from mongoengine import *

class Account(Document):
  balance = FloatField(default=0.0)
  name = StringField(default="n/a")
