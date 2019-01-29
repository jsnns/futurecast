from delta import Schedule

class Transaction:
    def __init__(self, *args, **kwargs):
        
        self.name = kwargs.get("name")
        self._value = kwargs.get("value")
        self.category = kwargs.get("category")
        self.schedule = kwargs.get("schedule")
        self.monthly_value = kwargs.get("monthly")

        if not self.monthly_value:
            self.monthly_value = self._value

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, value):
        self._value = value