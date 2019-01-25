from delta import Account
from delta import Transaction
from delta import Schedule

import math
import matplotlib.pyplot as plt
from datetime import datetime
from dateutil.relativedelta import relativedelta

class TransactionSet:
    def __init__(self, *args, **kwargs):
        self.transactions = kwargs.get("transactions")
        self.end = kwargs.get("end")
        self.date = datetime.now()
        self.date = self.date.replace(hour=0, minute=0, second=0, microsecond=0)

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

    @property
    def log(self):
        return [day for day in self.log_generator()]

class BalanceSheet:
    def __init__(self, *args, **kwargs):
        self.log = kwargs.get("log")
        self.accounts = kwargs.get("accounts")

        self._stats = {}
        self.balances = [o["balance"] for o in self.sheet]
        self.days = [o["day"].date() for o in self.sheet]

        self._stats["AverageBalance"] = math.floor(min(self.balances))
        self._stats["MinimumBalance"] = math.floor(sum(self.balances) / float(len(self.balances)))
    
    def daily_change_generator(self):
        for day in self.log:
            transactions = day["transactions"]
            value_array = [tx.value for tx in transactions]
            yield {
                "day": day["day"],
                "change": sum(value_array)
            }

    def balance_on_day(self, n):
        if n == 1:
            return {
                "day": self.daily_change[0]["day"],
                "balance": sum([account.balance for account in self.accounts])
            }
        return {
            "day": self.daily_change[n-1]["day"],
            "balance": self.balance_on_day(n-1)["balance"] + self.daily_change[n-1]["change"]
        }

    @property
    def sheet(self):
        return [self.balance_on_day(i+1) for i in range(len(self.log))]

    
    @property
    def daily_change(self):
        return [days_change for days_change in self.daily_change_generator()]

    def create_plot(self):
        x = self.balances
        y = self.days
        plt.plot(x, y)
        plt.title("Balance over Time")
        plt.xlabel("Day")
        plt.ylabel("Balance")

        ymin = min(y)
        xpos = y.index(ymin)
        xmin = x[xpos]

        plt.annotate(f'${ymin}', xy=(xmin, ymin), xytext=(xmin, ymin-200))
        axes = plt.gca()
        axes.set_ylim([2000, None])

        plt.locator_params(numticks=25)
        plt.savefig(f'plot/plot-{datetime.now().strftime("%Y-%d-%m")}.png')

    @property
    def stats(self):
        return "\n".join([f"{key}: {val}" for key, val in self._stats.iteritems()])