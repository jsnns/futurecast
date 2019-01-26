from data.reality import transactions, accounts
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

from delta import (
    TransactionSet,
    BalanceSheet
)

tx_set = TransactionSet(transactions=transactions, end=datetime(2020,1,1))
bal_sheet = BalanceSheet(log=tx_set.log, accounts=accounts)

print("tabulating_data")
print(tabulate(bal_sheet.sheet))