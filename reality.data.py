from delta import Account
from delta import Transaction
from delta import Schedule
from delta import SingleTransaction
from delta import TransactionSet
from delta import BalanceSheet

from dateutil.relativedelta import relativedelta
from datetime import datetime

import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import warnings
from tabulate import tabulate
import math

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
    Account(name="360 Checking", balance=191),
    Account(name="360 Savings", balance=2600),
]

tx = TransactionSet(
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

    end=datetime.today() + relativedelta(months=5)
)


bal = BalanceSheet(log=tx.log, accounts=sum([account.balance for account in accounts]))
balances = bal.sheet

y = [o["balance"] for o in balances]
x = [o["day"].date() for o in balances]

print(tabulate(balances[:30]))
print(
    "\n",
    f"Minimum Balance: ${min(y)}",
    "\n"
    f" Average Balance: ${math.floor(sum(y) / float(len(y)))}",
    "\n"
)

plt.plot(x,y)
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
plt.savefig('plot/plot.png')
