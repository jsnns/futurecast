from delta import Account
from delta import Transaction
from delta import Schedule
from delta import TransactionSet
from delta import BalanceSheet

from dateutil.relativedelta import relativedelta
from datetime import datetime

import matplotlib.pyplot as plt
import matplotlib.dates as mdates


DayOfMonth = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))

Bridgewater = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))

accounts = [
    Account(name="Simple", balance=575),
    Account(name="360 Checking", balance=2171),
    Account(name="360 Savings", balance=2627),
    Account(name="Schwab 401k", balance=17589),
    Account(name="Payflex", balance=3150)
]

tx = TransactionSet(
    # income
    Transaction(name="Bridgewater",     category="income",  schedule=Bridgewater,      value=2600),

    # expenses
    Transaction(name="1KennedyFlats",   category="rent",    schedule=DayOfMonth(1),    value=-1750),
    Transaction(name="Ryan",            category="debt",    schedule=DayOfMonth(20),   value=-1750),

    end=datetime.today() + relativedelta(months=5)
)

bal = BalanceSheet(log=tx.log, accounts=0)
balances = bal.sheet

y = [o["balance"] for o in balances]
x = [o["day"] for o in balances]

plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d/%Y'))
plt.gca().xaxis.set_major_locator(mdates.DayLocator())
plt.plot(x,y)
plt.gcf().autofmt_xdate()
plt.savefig('plot/plot.png')
