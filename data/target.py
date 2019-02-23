#!/usr/bin/env python

# stdlib
from datetime import datetime
from tabulate import tabulate
from dateutil.relativedelta import relativedelta

# local
from delta import Account
from delta import Report
from delta import Schedule
from delta import Once
from delta import Transaction
from delta import Log
from delta import Monthly


####### REPORT SCHEDULES
Bridgewater     = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))
SeventhAvenue   = Schedule(start=datetime(2019,3,15), interval=relativedelta(weeks=1))
RyanKautz       = Schedule(start=datetime(2019,1,19), interval=relativedelta(weeks=4),  end=datetime(2019,6,20))
Weekly          = Schedule(start=datetime(2019,1,20), interval=relativedelta(weeks=1))

####### ACCOUNTS
accounts = [

    Account(name="Simple",   balance=0),
    Account(name="Checking", balance=30),
    Account(name="Savings",  balance=452)

]

txs = []

def TX(name, schedule, value, category, *, monthly=None):
    txs.append(Transaction(name=name, category=category, schedule=schedule, value=value, monthly=monthly))

####### TRANSACTIONS
# INCOME
TX("Bridgewater", Bridgewater, 2650, "income", monthly=5300)
TX("7thAvenue", SeventhAvenue, 250, "income", monthly=1000)

# BUDGETS
TX("Uber/Lyft", Weekly, 0, "transport/rideshare", monthly=0)
TX("Food", Weekly, -100, "food", monthly=-400)
TX("The DPZ Haircut", Monthly(20), -40, "health/fitness")

# BILLS
TX("Ryan Kautz", RyanKautz, -1750, "debt")
TX("MTA", Monthly(25), -90, "transport/train")
TX("KennedyFlats", Monthly(2), -1899, "rent")
TX("KennedyFlats", Monthly(2), -80, "health/fitness")
TX("Eversource", Monthly(4), -190, "utilities")
TX("Comcast", Monthly(17), -85, "internet")

# SPRINT
TX("Sprint", Monthly(10), -517, "electronics")

# WINDFALLS
TX("Chick-Fil-A", Once(2019, 3, 1), 120, "once")
TX("Rent-Off", Once(2019,3,1), 80, "once")

REPORT_LENGTH = 24

tx_set = Log(transactions=txs, end=datetime.today() + relativedelta(months=REPORT_LENGTH))
bal = Report(tx_set=tx_set, accounts=accounts)

if __name__ == "__main__":
    print(tx_set.balance)
    print(tabulate(bal.stats, headers=("Stat", "Value")))