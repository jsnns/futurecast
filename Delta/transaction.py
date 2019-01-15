class Transaction:
    def __init__(self, name, value, schedule, *args, category):
        self.name = name
        self._value = value
        self.category = category
        self.schedule = schedule

    @property
    def value(self):
        return self._value

    @price.setter
    def value(self, value):
        self._value = value