#!/usr/bin/env python

# stdlib
import warnings
from datetime import datetime

# 3rdparty
from dateutil.relativedelta import relativedelta

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

Bridgewater = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))
ChickFilA = Schedule(start=datetime(2019,1,17), interval=relativedelta(weeks=2))

TaxReturn = SingleTransaction(date=datetime(2019, 2, 15))
Mechanic = SingleTransaction(date=datetime(2019, 2, 15))
SkyFlixPayment = SingleTransaction(date=datetime(2019, 1, 25))
Fair = SingleTransaction(date=datetime(2019, 2, 1))

accounts = [
    Account(name="Simple", balance=845),
    Account(name="360 Checking", balance=36),
    Account(name="360 Savings", balance=4427),
]

transactions = [
    Transaction(name="Bridgewater",     category="income",  schedule=Bridgewater,      value=2600),
    Transaction(name="ChickFilA",       category="income",  schedule=ChickFilA,        value=200),

    Transaction(name="1KennedyFlats",   category="rent",         schedule=DayOfMonth(1),    value=-1750),
    Transaction(name="Ryan",            category="debt",         schedule=DayOfMonth(18),   value=-1750),
    Transaction(name="Sprint",          category="bills",        schedule=DayOfMonth(20),   value=-460),
    Transaction(name="Comcast",         category="bills",        schedule=DayOfMonth(17),   value=-190),
    Transaction(name="PrimeStorage",    category="storage",      schedule=DayOfMonth(3),    value=-85),
    Transaction(name="Transport",       category="transport",    schedule=WeeklyOnSunday,   value=-100),
    Transaction(name="Food",            category="food",         schedule=WeeklyOnSunday,   value=-100),
    
    Transaction(name="Fair",            category="transport",    schedule=Fair,             value=-545),
    Transaction(name="Mechanic",        category="transfer",     schedule=Mechanic,         value=-1875),
    Transaction(name="Tax Return",      category="bonus",        schedule=TaxReturn,        value=1650)
]

tx_set = TransactionSet(
    transactions=transactions,
    end=datetime.today() + relativedelta(months=5)
)

bal = BalanceSheet(log=tx_set.log, accounts=accounts)
bal.create_plot()

print(bal.stats)