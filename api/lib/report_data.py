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
