class Account:
    def __init__(self, *args, **kwargs):
        if type(kwargs.get("storage_id")) is str:
            account = accounts.document(kwargs.get("storage_id")).get()

            self._balance = account.get('balance')
            self.name = account.get("name")

            return None
        
        self._balance = kwargs.get("balance")
        self.name = kwargs.get("name")

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, balance):
        self._balance = balance