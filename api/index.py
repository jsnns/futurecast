from api import app
from flask import jsonify
from api.lib.report_data import get_balances, get_transactions
from api.lib.dynamic_report import report

params = {
    "report_name": {"name": "report", "type": "str", "where": "in-url"}
}

@app.route("/update")
def update_report():
    report.update()
    return jsonify({"success": True})

@app.route("/")
def manifest():
    api_data = {
        "/report/balances/<report>": {
            "methods": ["GET"],
            "desc": "get a list of all balances for the given report",
            "params": [params["report_name"]]
        },
        "/report/transactions/<report>": {
            "methods": ["GET"],
            "desc": "get a list of all transactions for the given report",
            "params": [params["report_name"]]
        },
        "/report/stats/<report>": {
            "methods": ["GET"],
            "desc": "get stats about a give report",
            "params": [params["report_name"]]
        },
        "/reports": {
            "methods": ["GET"],
            "desc": "get a list of avaliable report names",
        }
    }
    return jsonify(api_data)
