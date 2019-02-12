from importlib import import_module

def get_report(report_name):
    report = import_module(f".{report_name}", package="data")
    return report

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
    return [[cat[0], cat[1], round(float(cat[2])/100, 2)] for cat in budget["budget"]]