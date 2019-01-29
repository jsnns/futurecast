#!/usr/bin/env python

# stdlib
import warnings
from datetime import datetime

# 3rdparty
from dateutil.relativedelta import relativedelta

from tabulate import tabulate

# local
from delta import (
    Account,
    BalanceSheet,
    Schedule,
    SingleTransaction,
    Transaction,
    TransactionSet
)

warnings.filterwarnings("ignore")


DayOfMonth = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))
WeeklyOnSunday = Schedule(start=datetime(2019,1,20), interval=relativedelta(weeks=1))

RyanKautz = Schedule(start=datetime(2019,1,18), interval=relativedelta(months=1), end=datetime(2019,8,1))

Bridgewater = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))
ChickFilA = Schedule(start=datetime(2019,1,17), interval=relativedelta(weeks=2))

TaxReturn = SingleTransaction(date=datetime(2019, 2, 15))
Mechanic = SingleTransaction(date=datetime(2019, 2, 15))
SkyFlixPayment = SingleTransaction(date=datetime(2019, 1, 25))
Fair = SingleTransaction(date=datetime(2019, 2, 1))

accounts = [
    Account(name="360 Checking", balance=222),
    Account(name="360 Savings", balance=4427),
]

Ryan = Transaction(name="Ryan",            category="debt",    schedule=RyanKautz,        value=-1750)

transactions = [
    Transaction(name="Bridgewater",     category="income",  schedule=Bridgewater,      value=2650),
    Transaction(name="ChickFilA",       category="income",  schedule=ChickFilA,        value=200),
    
    Ryan,

    Transaction(name="1KennedyFlats",   category="rent",         schedule=DayOfMonth(1),    value=-1750),
    Transaction(name="Sprint",          category="bills",        schedule=DayOfMonth(10),   value=-435),
    Transaction(name="Comcast",         category="bills",        schedule=DayOfMonth(17),   value=-190),
    Transaction(name="PrimeStorage",    category="storage",      schedule=DayOfMonth(3),    value=-85),
    
    Transaction(name="Transport",       category="transport",    schedule=WeeklyOnSunday,   value=-132),
    Transaction(name="Food",            category="food",         schedule=WeeklyOnSunday,   value=-100),
    
    Transaction(name="Fair",            category="transport",    schedule=Fair,             value=-545),
    Transaction(name="Mechanic",        category="transfer",     schedule=Mechanic,         value=-1875),
    Transaction(name="Tax Return",      category="bonus",        schedule=TaxReturn,        value=1650)
]


if __name__ == "__main__":
    tx_set = TransactionSet(transactions=transactions, end=datetime.today() + relativedelta(months=12))
    bal = BalanceSheet(log=tx_set.log, accounts=accounts)

    owed = 15070
    for o in Ryan.schedule.occurances:
        owed -= 1750
        print(f'Payment: {o.date()} ${owed}')

        days_to_pay_off = [line for line in bal.sheet if line["balance"] > owed and line["day"] < o]
        if len(days_to_pay_off) > 1:
            print(f'Balance before pay day: ${days_to_pay_off[0]["balance"]}', "\n")
        else:
            days_to_pay_off = [line for line in bal.sheet if line["day"] < o]
            if len(days_to_pay_off) > 1:
                print(f'Off by ${owed-days_to_pay_off[0]["balance"]}\n')
            else:
                print("---------\n")

    print("\n")
    bal.create_plot()
    # print(tabulate(bal.sheet))
    print(bal.stats)