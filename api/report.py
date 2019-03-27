from api import app
from flask import jsonify
from api.lib.report_data import get_balances, get_transactions, get_stats, get_budget, get_report
from api.delta.analysis.bills_to_pay import bills_to_pay

@app.route("/report/balances")
def get_report_balances():
    balances = get_balances()
    return jsonify(balances)

@app.route("/report/transactions")
def get_report_transactions():
    transactions = get_transactions()
    tx = [{"day": t["day"], "transactions": [tt.toJSON() for tt in t["transactions"]]} for t in transactions]
    return jsonify(tx)

@app.route("/report/stats")
def get_report_stats():
    stats = get_stats()
    return jsonify(stats)

@app.route("/report/budget")
def get_report_budget():
    budget = get_budget()
    return jsonify(budget)

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

@app.route("/history/<year>/<month>/<day>")
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
    return jsonify(bills_to_pay(report, int(days)))
