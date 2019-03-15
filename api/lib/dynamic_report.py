import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from delta import Schedule, Transaction, Account, Once, Log, Report
from api.lib.mongo import tx_collection, ac_collection

def TX_JSON(j):
    if not j:
        j = {}

    if "schedule" not in j:
        j["schedule"] = {
            "start": 0,
            "end": 0,
        }

    if "category" not in j:
        j["category"] = ""

    if "monthly_value" not in j:
        j["monthly_value"] = 0

    if "name" not in j:
        j["name"] = ""

    if "value" not in j:
        j["value"] = 0

    js = j["schedule"]

    if "interval" in js:
        if "days" not in js["interval"]:
            js["interval"]["days"] = 0
        if "months" not in js["interval"]:
            js["interval"]["months"] = 0
        s = Schedule(start=datetime.fromtimestamp(js["start"]), end=datetime.fromtimestamp(js["end"]), interval=relativedelta(days=js["interval"]["days"], months=js["interval"]["months"]))
    else:
        day = datetime.fromtimestamp(js["start"])
        s = Once(day.year, day.month, day.day)

    t = Transaction(name=j["name"], category=j["category"], schedule=s, value=j["value"], monthly=j["monthly_value"])
    return t

def AC_JSON(j):
    return Account(name=j["name"], balance=j["balance"])

class R:
    def __init__(self):
        self.accounts = [AC_JSON(ac) for ac in ac_collection.find({})]
        self.txs = [TX_JSON(tx) for tx in tx_collection.find({})]
        self.tx_set = Log(transactions=self.txs, end=(datetime.today() + relativedelta(months=24)))
        self.bal = Report(tx_set=self.tx_set, accounts=self.accounts)

    def update(self):
        self.accounts = [AC_JSON(ac) for ac in ac_collection.find({})]
        self.txs = [TX_JSON(tx) for tx in tx_collection.find({})]
        self.tx_set = Log(transactions=self.txs, end=datetime.today() + relativedelta(months=24))
        self.bal = Report(tx_set=self.tx_set, accounts=self.accounts)

report = R()
