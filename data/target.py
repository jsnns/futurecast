from data.__main__ import transactions, accounts
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

from delta import (
    TransactionSet,
    BalanceSheet,
    Transaction,
    Schedule,
    SingleTransaction
)

RebeccaFirstSoftware = Schedule(start=datetime(2019,9,1), interval=relativedelta(weeks=2))
RebeccaSecondSoftware = Schedule(start=datetime(2020,9,1), interval=relativedelta(weeks=2))
RebeccaThirdSoftware = Schedule(start=datetime(2021,9,1), interval=relativedelta(weeks=2))

JacobRaise = Schedule(start=datetime(2021,1,1), interval=relativedelta(weeks=2))

BuyFirstHome = SingleTransaction(date=datetime(2023,6,1))
LooseRent = Schedule(start=datetime(2023,6,1), interval=relativedelta(months=1))

WorkOnBusiness = Schedule(start=datetime(2025,1,1), interval=relativedelta(weeks=2))
BusinessReturns = Schedule(start=datetime(2027,1,1), interval=relativedelta(months=1))

SecondStageBusinessReturns = Schedule(start=datetime(2035,1,1), interval=relativedelta(months=1))

# working and investing towards a first house
save = [
    Transaction(schedule=RebeccaFirstSoftware, value=500),
    Transaction(schedule=RebeccaSecondSoftware, value=1000),
    Transaction(schedule=RebeccaThirdSoftware, value=1000),

    Transaction(schedule=JacobRaise, value=1000),

    Transaction(schedule=BuyFirstHome, value=-250000),
    Transaction(schedule=LooseRent, value=1750)
]

# working for ourselves and investing in wealth creation
invest = [
    Transaction(schedule=WorkOnBusiness, value=-4500),
    Transaction(schedule=BusinessReturns, value=100000),
    Transaction(schedule=SecondStageBusinessReturns, value=500000)
]

# working for ourselves and building our empire
build = []


if __name__ == "__main__":
    tx_set = TransactionSet(transactions=(transactions + save + invest), end=datetime(2035,1,1))
    bal_sheet = BalanceSheet(log=tx_set.log, accounts=accounts, interest_rate=5)

    bal_sheet.create_plot(name="target")
    print(bal_sheet.stats)