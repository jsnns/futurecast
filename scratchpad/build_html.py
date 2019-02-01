from tabulate import tabulate
from datetime import datetime

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
    
        {tabulate(budget["budget"], headers=("Category", "$", "% Budget"), tablefmt="html")}
        <br>
        {tabulate(bal.stats, headers=("Stat", "Value"), tablefmt="html")}
        <br>
        {input("What changed since you last reported? ")}
    </div>
    """