from api import app
from flask import jsonify
from api.lib.report_data import get_balances, get_transactions

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

