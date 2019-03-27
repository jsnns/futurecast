import math

def get_stats(report):

  _income = report.tx_set.income
  _expenses = report.tx_set.expenses

  min_balance = math.floor(min(report.balances))
  budget_difference = _income + _expenses
  runway_length = round((report.current_balance / report.emergency_fund), 2)

  return {
    "Min Balance": f"${min_balance}",
    "Budget Difference": f"${budget_difference}",
    "Runway Length": f"{runway_length} mo"
  }
