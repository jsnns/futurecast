def get_budget(report):
    budget = dict(expenses=0, income=0, category={}, budget=[])

    for tx in report.tx_set.transactions:
        if tx.value < 0 and tx.category != "once":
            budget["expenses"] += tx.monthly_value

        if tx.category == "income":
            budget["income"] += tx.monthly_value
        elif tx.category != "once":
            if tx.category not in budget["category"]:
                budget["category"][tx.category] = 0
            budget["category"][tx.category] += tx.monthly_value

    for cat, val in budget["category"].items():
        if budget["income"] != 0:
            budget["budget"].append([
                f"{cat}",
                f"{val}",
                abs(float(val)) / float(budget["income"])
            ])

    return budget
