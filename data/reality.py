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
from scratchpad.build_html import make_html


####### REPORT SCHEDULES
Bridgewater     = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))
ChickFilA       = Schedule(start=datetime(2019,1,17), interval=relativedelta(weeks=2))
Weekly          = Schedule(start=datetime(2019,1,20), interval=relativedelta(weeks=1))
RyanKautz       = Schedule(start=datetime(2019,1,18), interval=relativedelta(months=1), end=datetime(2019,6,15))

####### ACCOUNTS
accounts = [

    Account(name="Checking", balance=-3),
    Account(name="Savings", balance=4559)

]

####### TRANSACTIONS
txs = [

    Transaction(name="Bridgewater",     category="income",  schedule=Bridgewater,       value=2650,     monthly=5300),       ### INCOME
    Transaction(name="ChickFilA",       category="income",  schedule=ChickFilA,         value=100,      monthly=200),
    
    Transaction(name="Ryan",            category="debt",    schedule=RyanKautz,         value=-1750,    autopay=False),      ### BILLS
    Transaction(name="1KF",             category="rent",    schedule=Monthly(2),        value=-1899,    autopay=True),
    Transaction(name="1KF-Util",        category="bill",    schedule=Monthly(2),        value=-80,      autopay=True),
    Transaction(name="Sprint",          category="bill",    schedule=Monthly(10),       value=-435,     autopay=True),
    Transaction(name="Eversource",      category="bill",    schedule=Monthly(4),        value=-70,      autopay=True),
    Transaction(name="Comcast",         category="bill",    schedule=Monthly(17),       value=-85,      autopay=False),
    Transaction(name="Transport",       category="travel",  schedule=Weekly,            value=-132,     monthly=-528),
    Transaction(name="Food",            category="food",    schedule=Weekly,            value=-100,     monthly=-400),
    
    Transaction(name="Fair",            category="once",    schedule=Once(2019,2,13),   value=-545),                         ### WINDFALLS
    Transaction(name="HalfFair",        category="once",    schedule=Once(2019,2,13),   value=-280),
    Transaction(name="TowCar",          category="once",    schedule=Once(2019,2,13),   value=-200),
    Transaction(name="Mechanic",        category="once",    schedule=Once(2019,2,13),   value=-1875),
    Transaction(name="CTTaxReturn",     category="once",    schedule=Once(2019,2,13),   value=222)

]

REPORT_LENGTH = 6

tx_set = Log(transactions=txs, end=datetime.today() + relativedelta(months=REPORT_LENGTH))
bal = Report(log=tx_set.log, accounts=accounts)

BUDGETFIG = f'output/budget-{datetime.now().strftime("%Y-%m-%d")}.png'
BALANCEFIG = f'output/{datetime.now().strftime("%Y-%m-%d")}.png'
HTML = f'output/html/{datetime.now().strftime("%Y-%m-%d")}.html'


if __name__ == "__main__":

    tx_set.budget_plot(BALANCEFIG)
    bal.create_plot(BUDGETFIG)

    print(tabulate(bal.stats, headers=("Stat", "Value")))

    with open(HTML, "w") as f:
        f.write(make_html(tx_set, bal, BUDGETFIG, BALANCEFIG))
