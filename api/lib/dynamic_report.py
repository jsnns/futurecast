import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from api.delta import Schedule, Transaction, Account, Once, Log, Report
from api.lib.mongo import tx_collection, ac_collection

from api.db import Account as AccountDB

def TX_JSON(tx_body):
    if not tx_body:
        tx_body = {}

    if "schedule" not in tx_body:
        tx_body["schedule"] = {
            "start": 0,
            "end": 0,
        }

    if "category" not in tx_body:
        tx_body["category"] = ""

    if "monthly_value" not in tx_body:
        tx_body["monthly_value"] = 0

    if "name" not in tx_body:
        tx_body["name"] = ""

    if "value" not in tx_body:
        tx_body["value"] = 0

    schedule_body = tx_body["schedule"]

    if "start" not in schedule_body:
        schedule_body["start"] = 0

    if tx_body["category"] == "once":
        day = datetime.fromtimestamp(schedule_body["start"])
        s = Once(day.year, day.month, day.day)

    else:
        if "end" not in schedule_body or not schedule_body["end"]:
            schedule_body["end"] = 0

        if "days" not in schedule_body:
            schedule_body["days"] = None

        if "months" not in schedule_body:
            schedule_body["months"] = None

        s = Schedule(start=datetime.fromtimestamp(schedule_body["start"]),
                    end=datetime.fromtimestamp(schedule_body["end"]),
                    interval=relativedelta(
                        days=schedule_body["days"] or 0,
                        months=schedule_body["months"] or 0)
                    )

    t = Transaction(name=tx_body["name"], category=tx_body["category"], schedule=s, value=tx_body["value"], monthly=tx_body["monthly_value"])
    return t

def ToAccount(account):
    return Account(name=account["name"], balance=account["balance"])

class R:
    def __init__(self):
        self.update()

    def update(self):
        self.accounts = [ToAccount(account) for account in AccountDB.objects]
        self.txs = [TX_JSON(tx) for tx in tx_collection.find({})]
        self.tx_set = Log(transactions=self.txs, end=datetime.today() + relativedelta(months=24))
        self.bal = Report(tx_set=self.tx_set, accounts=self.accounts)

report = R()
