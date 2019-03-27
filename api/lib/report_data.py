from flask_pymongo import PyMongo, ObjectId
from bson.json_util import dumps
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from delta import Schedule, Transaction, Account, Once, Log, Report
from api.lib.mongo import tx_collection, ac_collection


from api.lib.dynamic_report import report

def get_report():
    return report

def update_report():
    return report.update()

def get_balances(report_name):
    return report.bal.sheet

def get_transactions(report_name):
    return report.tx_set.log

def get_stats(report_name):
    return report.bal.stats

def get_budget(report_name):
    budget = report.tx_set.budget
    return [[cat[0], cat[1], round(float(cat[2]), 4)] for cat in budget["budget"]]
