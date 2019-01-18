from delta.data import transactions
from delta import Schedule

class Transaction:
    def __init__(self, *args, **kwargs):
        if type(kwargs.get("storage_id")) is str:
            transaction = transactions.document(kwargs.get("storage_id")).get()
            self.name = transaction.get("name")
            self._value = transaction.get("value")
            self.category = transaction.get("category")
            self.schedule = Schedule(storage_id=kwargs.get("schedule_id"))
            return None
        
        self.name = kwargs.get("name")
        self._value = kwargs.get("value")
        self.category = kwargs.get("category")
        self.schedule = kwargs.get("schedule")

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, value):
        self._value = value            

    def to_dict(self):
        return {
            "name": self.name,
            "value": self.value,
            "category": self.category,
            "schedule": self.schedule.to_dict()
        }

    # TODO: use a decorator
    def save(self):
        return transactions.add(self.to_dict())[1]
