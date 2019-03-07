from delta import Account
from delta import Transaction
from delta import Schedule

import math
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

import warnings
warnings.filterwarnings("ignore")

class TransactionSet:
    def __init__(self, *args, **kwargs):
        self.end = kwargs.get("end")
        self.date = datetime.now()
        self.date = self.date.replace(hour=0, minute=0, second=0, microsecond=0)
        self.transactions = kwargs.get("transactions")
        self.budget = self.get_budget()

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

    def get_budget(self):
        budget = dict(expenses=0, income=0, category={}, budget=[])

        for tx in self.transactions:
            if tx.value < 0 and tx.category != "once":
                budget["expenses"] += tx.monthly_value

            if tx.category == "income":
                budget["income"] += tx.monthly_value
            elif tx.category != "once":
                if tx.category not in budget["category"]:
                    budget["category"][tx.category] = 0
                budget["category"][tx.category] += tx.monthly_value

        for cat, val in budget["category"].items():
            budget["budget"].append([
                f"{cat}",
                f"{val}",
                abs(float(val)) / float(budget["income"])
            ])

        return budget

    @property
    def log(self):
        return [day for day in self.log_generator()]

class BalanceSheet:
    def __init__(self, *args, **kwargs):
        self.tx_set = kwargs.get("tx_set")
        self.log = self.tx_set.log
        self.accounts = kwargs.get("accounts")

        self.current_balance = sum([account.balance for account in self.accounts])

        self.interest_rate = kwargs.get("interest_rate")
        if not self.interest_rate:
            self.interest_rate = 1
        self.daily_interest = ((self.interest_rate / 100) / 365) + 1

        self.daily_change = [days_change for days_change in self.daily_change_generator()]
        self.sheet = self.balance_on_day()

        self.balances = [o["balance"] for o in self.sheet]
        self.days = [o["day"].date() for o in self.sheet]

        self.stats = {
            "Minimum Balance": math.floor(min(self.balances)),
            "Monthly Free": self.tx_set.budget["income"] + self.tx_set.budget["expenses"]
        }

    def daily_change_generator(self):
        for day in self.log:
            transactions = day["transactions"]
            value_array = [tx.value for tx in transactions]
            yield {
                "day": day["day"],
                "change": sum(value_array)
            }

    def balance_on_day(self):
        r = []
        r.append({
            "day": self.daily_change[0]["day"],
            "balance": self.current_balance
        })

        for i in range(2, len(self.daily_change)):
            r.append({
                "day": self.daily_change[i-1]["day"],
                "balance": (r[len(r)-1]["balance"] + self.daily_change[i-1]["change"]) * self.daily_interest
            })
        return r
