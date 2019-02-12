from api import app
from flask import jsonify
from api.lib.report_data import get_balances, get_transactions, get_stats, get_budget

import json


@app.route("/report/balances/<report>")
def get_report_balances(report):
    balances = get_balances(report)
    return jsonify(balances)

@app.route("/report/transactions/<report>")
def get_report_transactions(report):
    transactions = get_transactions(report)
    tx = [{"day": t["day"], "transactions": [tt.toJSON() for tt in t["transactions"]]} for t in transactions]
    return jsonify(tx)

@app.route("/report/stats/<report>")
def get_report_stats(report):
    stats = get_stats(report)
    stats = {s[0]: s[1] for s in stats}
    return jsonify(stats)

@app.route("/report/budget/<report>")
def get_report_budget(report):
    budget = get_budget(report)
    return jsonify(budget)

@app.route("/reports")
def get_reports_list():
    # TODO: make this list dynamic
    return jsonify(["reality", "test", "target"])