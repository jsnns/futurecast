from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

def bills_to_pay(report, days=14):
    today = datetime.today()

    bills = report.tx_set.transactions
    output = []
    for bill in bills:
        occurs = [o for o in bill.schedule.occurances if o > today and o < today + relativedelta(days=days)]
        for o in occurs:
            bill_obj = {
                "name": bill.name,
                "value": bill.value,
                "date": int(o.timestamp())
            }
            output.append(bill_obj)
    return output
