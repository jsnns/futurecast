from data.reality import tx_set, bal, Bridgewater
from datetime import datetime
from tabulate import tabulate

log = tx_set.log

next_paycheck = [o for o in Bridgewater.occurances if o > datetime.today()][0]

bill_sets = [tx["transactions"] for tx in log if tx["day"] < next_paycheck]
bills = []

for bill_set in bill_sets:
    bills += bill_set

output = dict(payments=[], _budgets={}, windfalls=[], income=[])
for bill in bills:
    if bill.value < 0:
        if bill.category is not "once":
            if bill.name not in ["Food", "Transport"]:
                output["payments"].append([bill.name, bill.value])
            else:
                if bill.name not in output["_budgets"]:
                    output["_budgets"][bill.name] = 0
                output["_budgets"][bill.name] += bill.value
        else:
            output["windfalls"].append([bill.name, bill.value])
    else:
        output["income"].append([bill.name, bill.value])

for o in output:
    print(f"<h1>{o.upper()}</h1>")
    if o[0] == "_":
        print(tabulate([[oo, output[o][oo]] for oo in output[o]], tablefmt="html"))
    else:
        print(tabulate(output[o], tablefmt="html"))