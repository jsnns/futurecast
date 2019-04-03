from api.delta import Account
from api.delta import Transaction
from api.delta import Schedule

import math
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate


class Report:
    def __init__(self, *args, **kwargs):
        self.tx_set = kwargs.get("tx_set")
        self.log = self.tx_set.log
        self.accounts = kwargs.get("accounts")

        self.current_balance = sum([account.balance for account in self.accounts])

        self.emergency_fund = abs(self.tx_set.expenses)

        self.interest_rate = kwargs.get("interest_rate")

        if not self.interest_rate:
            self.interest_rate = 1

        self.daily_interest = ((self.interest_rate / 100) / 365) + 1

        self.daily_change = [days_change for days_change in self.daily_change_generator()]
        self.sheet = self.balance_on_day()

        self.balances = [o["balance"] for o in self.sheet]
        self.mins = [o["minimum"] for o in self.sheet]
        self.days = [o["day"].date() for o in self.sheet]

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
                "balance": (r[len(r)-1]["balance"] + self.daily_change[i-1]["change"]) * self.daily_interest,
                "emergency_fund": self.emergency_fund
            })

        for i, day in enumerate(r):
            days = r[i:]
            balances = [day["balance"] for day in days]
            r[i]["minimum"] = math.floor(min(balances))
            r[i]["min_onhand"] = day["balance"] - math.floor(min(balances))
            r[i]["runway_length"] = round(day["balance"] / self.emergency_fund, 2)

        return r
