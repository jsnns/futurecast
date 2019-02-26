from flask_pymongo import PyMongo, ObjectId
from bson.json_util import dumps
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from delta import Schedule, Transaction, Account, Once, Log, Report
from api.data import tx_collection, ac_collection

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
    return {}

def AC_JSON(j):
    return Account(name=j["name"], balance=j["balance"])

class R:
    def __init__(self):
        self.accounts = [AC_JSON(ac) for ac in ac_collection.find({})]
        self.txs = [TX_JSON(tx) for tx in tx_collection.find({})]
        self.tx_set = Log(transactions=self.txs, end=datetime.today() + relativedelta(months=24))
        self.bal = Report(tx_set=self.tx_set, accounts=self.accounts)

def get_report(report_name):
    return R()

def get_balances(report_name):
    report = get_report(report_name)
    return report.bal.sheet

def get_transactions(report_name):
    report = get_report(report_name)
    return report.tx_set.log

def get_stats(report_name):
    report = get_report(report_name)
    return report.bal.stats

def get_budget(report_name):
    budget = get_report(report_name).tx_set.budget
    return [[cat[0], cat[1], round(float(cat[2]), 4)] for cat in budget["budget"]]