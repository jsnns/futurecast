from data.__main__ import transactions, accounts
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

from delta import (
    TransactionSet,
    BalanceSheet
)

tx_set = TransactionSet(transactions=transactions, end=datetime(2025,1,1))
bal_sheet = BalanceSheet(log=tx_set.log, accounts=accounts)

print(bal_sheet.sheet)