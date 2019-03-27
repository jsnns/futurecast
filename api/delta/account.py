class Account:
    def __init__(self, *args, **kwargs):
        self._balance = kwargs.get("balance")
        self.name = kwargs.get("name")

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, balance):
        self._balance = balance

    def toJSON(self):
        return {
            "balance": self.balance,
            "name": self.name
        }

