from api.delta.account import Account
from api.delta.schedule import Schedule
from api.delta.schedule import Once
from api.delta.transaction import Transaction
from api.delta.report import Report
from api.delta.transaction_set import TransactionSet as Log

from datetime import datetime
from dateutil.relativedelta import relativedelta

Monthly = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))
