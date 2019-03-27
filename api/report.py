from api import app
from flask import jsonify
from api.lib.report_data import get_balances, get_transactions, get_stats, get_budget, get_report
from api.lib.bills_to_pay import bills_to_pay

import json

def get_json_from(path):
    with open(path) as jsonfile:
        return json.load(jsonfile)

def get_json_paths(year, month, day, paths):
    return {
        f"{x}": get_json_from(f"frontend/{year}/{month}/{day}/{x}.json") for x in paths
    }

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
    return jsonify(stats)

@app.route("/report/budget/<report>")
def get_report_budget(report):
    budget = get_budget(report)
    return jsonify(budget)

@app.route("/reports")
def get_reports_list():
    # TODO: make this list dynamic
    return jsonify(["reality", "test", "target"])

@app.route("/history/<year>/<month>/<day>")
def get_history(year, month, day):
    paths = ["balances", "budget", "stats", "transactions"]
    try:
        return jsonify(get_json_paths(year, month, day, paths))
    except FileNotFoundError as e:
        return jsonify({
            "message": "file not found",
            "status": 404
        })

@app.route("/history/<year>/<month>/<day>/<report>")
def get_subreport_history(year, month, day, report):
    try:
        return jsonify(get_json_paths(year, month, day, [report])[report])
    except FileNotFoundError as e:
        return jsonify({
            "message": "file not found",
            "status": 404
        })

@app.route("/report/bills/<days>")
def get_bills(days):
    report = get_report()
    return jsonify(bills_to_pay(report.txs, int(days)))
