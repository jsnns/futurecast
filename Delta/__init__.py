from delta.account import Account
from delta.schedule import Schedule
from delta.schedule import Once
from delta.transaction import Transaction
from delta.report import TransactionSet as Log
from delta.report import BalanceSheet as Report

from datetime import datetime
from dateutil.relativedelta import relativedelta

Monthly = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))