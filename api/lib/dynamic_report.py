import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from delta import Schedule, Transaction, Account, Once, Log, Report
from api.lib.mongo import tx_collection, ac_collection

def TX_JSON(j):
    if "schedule" in j:
        js = j["schedule"]
        if "interval" in js:
            s = Schedule(start=datetime.fromtimestamp(js["start"]), end=datetime.fromtimestamp(js["end"]), interval=relativedelta(days=js["interval"]["days"], months=js["interval"]["months"]))
        else:
            day = datetime.fromtimestamp(js["start"])
            s = Once(day.year, day.month, day.day)
        t = Transaction(name=j["name"], category=j["category"], schedule=s, value=j["value"], monthly=j["monthly_value"])
        return t
    return None

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
