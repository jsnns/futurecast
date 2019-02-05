#!/usr/bin/env python

# stdlib
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate
from scratchpad.build_html import make_html

# local
from delta import (
    Account,
    BalanceSheet,
    Schedule,
    Once,
    Transaction,
    TransactionSet
)

# Income
Bridgewater = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))
ChickFilA = Schedule(start=datetime(2019,1,17), interval=relativedelta(weeks=2))

# Schedules
MonthlyOn = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))
EverySunday = Schedule(start=datetime(2019,1,20), interval=relativedelta(weeks=1))
RyanKautz = Schedule(start=datetime(2019,1,18), interval=relativedelta(months=1), end=datetime(2019,8,1))

accounts = [
    Account(name="360 Checking",    balance=572.47),
    Account(name="360 Savings",     balance=5529.07),
]

transactions = [
    # Income
    Transaction(name="Bridgewater",     category="income",      schedule=Bridgewater,       value=2650,     monthly=5300),
    Transaction(name="ChickFilA",       category="income",      schedule=ChickFilA,         value=200,      monthly=400),
    
    # Expenses
    Transaction(name="Ryan",            category="debt",         schedule=RyanKautz,        value=-1750),
    Transaction(name="1KennedyFlats",   category="rent",         schedule=MonthlyOn(2),     value=-1800,    autopay=True),
    Transaction(name="Sprint",          category="bills",        schedule=MonthlyOn(10),    value=-435,     autopay=True),
    Transaction(name="Comcast",         category="bills",        schedule=MonthlyOn(17),    value=-190),
    Transaction(name="Eversource",      category="bills",        schedule=MonthlyOn(4),     value=-100,     autopay=True),
    Transaction(name="Transport",       category="transport",    schedule=EverySunday,      value=-132,     monthly=-528),
    Transaction(name="Food",            category="food",         schedule=EverySunday,      value=-100,     monthly=-400),
    
    # Windfalls
    Transaction(name="Fair",            category="once",        schedule=Once(2019,2,5),    value=-545),
    Transaction(name="HalfFair",        category="once",        schedule=Once(2019,2,15),   value=-280),
    Transaction(name="TowCar",          category="once",        schedule=Once(2019,2,15),   value=-200),
    Transaction(name="Mechanic",        category="once",        schedule=Once(2019,2,10),   value=-1875),
    Transaction(name="SkyFlix@",        category="once",        schedule=Once(2019,2,6),    value=838),
    Transaction(name="SellTires",       category="once",        schedule=Once(2019,2,10),   value=650),
    Transaction(name="CTTaxReturn",     category="once",        schedule=Once(2019,2,14),   value=222),
]

REPORT_LEGTH_MONTHS = 6
SHOW_ROWS = 15

tx_set = TransactionSet(transactions=transactions, end=datetime.today() + relativedelta(months=REPORT_LEGTH_MONTHS))
bal = BalanceSheet(log=tx_set.log, accounts=accounts)

if __name__ == "__main__":

    tx_set.budget_plot()
    bal.create_plot()

    print(tabulate(bal.stats, headers=("Stat", "Value")))

    with open(f"output/html/{datetime.today().strftime('%Y-%m-%d')}.html", "w") as f:
        f.write(make_html(tx_set, bal))
