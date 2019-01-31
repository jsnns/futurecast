#!/usr/bin/env python

# stdlib
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tabulate import tabulate

# local
from delta import (
    Account,
    BalanceSheet,
    Schedule,
    Once,
    Transaction,
    TransactionSet
)

# Income
Bridgewater = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))
ChickFilA = Schedule(start=datetime(2019,1,17), interval=relativedelta(weeks=2))

# Schedules
MonthlyOn = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))
EverySunday = Schedule(start=datetime(2019,1,20), interval=relativedelta(weeks=1))
RyanKautz = Schedule(start=datetime(2019,1,18), interval=relativedelta(months=1), end=datetime(2019,8,1))

accounts = [
    Account(name="360 Checking", balance=539),
    Account(name="360 Savings", balance=5642),
]

transactions = [
    # Income
    Transaction(name="Bridgewater",     category="income",      schedule=Bridgewater,       value=2650,     monthly=5300),
    Transaction(name="ChickFilA",       category="income",      schedule=ChickFilA,         value=500,      monthly=1000),
    
    # Expenses
    Transaction(name="Ryan",            category="debt",         schedule=RyanKautz,        value=-1750),
    Transaction(name="1KennedyFlats",   category="rent",         schedule=MonthlyOn(1),     value=-1750),
    Transaction(name="Sprint",          category="bills",        schedule=MonthlyOn(10),    value=-435),
    Transaction(name="Comcast",         category="bills",        schedule=MonthlyOn(17),    value=-190),
    Transaction(name="Eversource",      category="bills",        schedule=MonthlyOn(4),     value=-219),
    Transaction(name="PrimeStorage",    category="storage",      schedule=MonthlyOn(3),     value=-85),
    Transaction(name="Transport",       category="transport",    schedule=EverySunday,      value=-132,     monthly=-528),
    Transaction(name="Food",            category="food",         schedule=EverySunday,      value=-100,     monthly=-400),
    
    # Windfalls
    Transaction(name="Fair",            category="once",        schedule=Once(2019,2,1),    value=-545),
    Transaction(name="HalfFair",        category="once",        schedule=Once(2019,2,15),   value=-280),
    Transaction(name="TowCar",          category="once",        schedule=Once(2019,2,15),   value=-200),
    Transaction(name="Mechanic",        category="once",        schedule=Once(2019,2,10),   value=-1875)
]

def make_html(tx_set, bal):
    budget = tx_set.budget
    css = """
    th {
        text-align: "left" !important;
        padding: 5;
    }

    td {
        padding: 5;
    }
    """
    return f"""
    <style>
        {css}
    </style>
    <div>
        <h1>Financial Status as of {datetime.today().date()}</h1>
        <br />
        <img src="///Users/jacob/personal/adder/output/{datetime.today().strftime("%Y-%d-%m")}.png" />
        <img src="///Users/jacob/personal/adder/output/budget-{datetime.today().strftime("%Y-%d-%m")}.png"/>
    
        {tabulate(budget["budget"], headers=("Category", "$", "% Budget"), tablefmt=OUTPUT_FOMAT)}
        <br>
        {tabulate(bal.stats, headers=("Stat", "Value"), tablefmt=OUTPUT_FOMAT)}
    </div>
    """



if __name__ == "__main__":

    REPORT_LEGTH_MONTHS = 6
    SHOW_ROWS = 15
    OUTPUT_FOMAT = "html"
    
    tx_set = TransactionSet(transactions=transactions, end=datetime.today() + relativedelta(months=REPORT_LEGTH_MONTHS))
    bal = BalanceSheet(log=tx_set.log, accounts=accounts)

    tx_set.budget_plot()
    bal.create_plot()

    if OUTPUT_FOMAT == "html":
        with open(f"output/html/{datetime.today().strftime('%Y-%d-%m')}.html", "w") as f:
            f.write(make_html(tx_set, bal))
