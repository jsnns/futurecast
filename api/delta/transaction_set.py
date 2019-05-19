from datetime import datetime
from dateutil.relativedelta import relativedelta

class TransactionSet:
    def __init__(self, *args, **kwargs):
        self.end = kwargs.get("end")
        self.date = datetime.now()
        self.date = self.date.replace(hour=0, minute=0, second=0, microsecond=0)
        self.transactions = kwargs.get("transactions")
        self.log = [day for day in self.log_generator()]

    @property
    def income(self):
        total_income = 0
        for tx in self.transactions:
            if tx.category == "income":
                total_income += tx.monthly_value
        return total_income


    @property
    def expenses(self):
        total_expenses = 0
        for tx in self.transactions:
            if tx.value < 0 and tx.category != "once":
                total_expenses += tx.monthly_value
        return total_expenses

    def day_range(self):
        i = 0
        while True:
            day = self.date + relativedelta(days=i)
            if day > self.end:
                break

            i += 1
            yield day

    def log_generator(self):
        for day in self.day_range():
            yield {
                "day": day,
                "transactions": [transaction for transaction in self.transactions if transaction.schedule.occurs_on_day(day)]
            }
