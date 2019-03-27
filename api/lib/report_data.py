from api.lib.dynamic_report import report
from api.delta.analysis import get_stats as get_report_stats, get_budget as get_report_budget, bills_to_pay

def get_report():
    return report

def update_report():
    return report.update()

def get_balances():
    return report.bal.sheet

def get_transactions():
    return report.tx_set.log

def get_stats():
    return get_report_stats(report.bal)

def get_budget():
    budget = get_report_budget(report.bal)
    return [[cat[0], cat[1], round(float(cat[2]), 4)] for cat in budget["budget"]]
