from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

def bills_to_pay(log, adjustment):

    today = datetime.today()

    bill_sets = [tx["transactions"] for tx in log if tx["day"] > today and tx["day"] < today + relativedelta(days=14)]

    bills = []

    print(bill_sets)

    for bill_set in bill_sets:
        bills += bill_set

    output = dict(payments=[], _budgets={}, windfalls=[], income=[])
    for bill in bills:
        bill_obj = {
            "name": bill.name,
            "value": bill.value,
            "date": [o for o in bill.schedule.occurances if o > today][0]
        }
        if bill.value < 0:
            if bill.category is not "once":
                if bill.name not in ["Food", "Transport"]:
                    output["payments"].append(bill_obj)
                else:
                    if bill.name not in output["_budgets"]:
                        output["_budgets"][bill.name] = 0
                    output["_budgets"][bill.name] += bill.value
            else:
                output["windfalls"].append(bill_obj)
        else:
            output["income"].append(bill_obj)

    output["payments"] = sorted(output["payments"], key = lambda i: i['date'])

    return output
