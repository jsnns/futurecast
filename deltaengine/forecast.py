import pandas as pd
import datetime
import math
import numpy as np

def data(file):
    return pd.read_csv("data/{}.csv".format(file))

def get_forecast(days):
    initial_balance = get_balance()
    
    balance_array = []
    date_array = [datetime.datetime.now() + datetime.timedelta(days=i) for i in range(0, days)]
    change_array = [change_for_day(d) for d in date_array]
    
    for i, change in enumerate(change_array):
        balance = balance_array[i-1] if i > 0 else initial_balance
        balance += change
        balance_array.append(balance)
    
    cols = ["balance", "date", "change"]
    forecast_data = np.transpose([balance_array, date_array, change_array])
    
    return pd.DataFrame(forecast_data, columns=cols)

def get_ongoing_expense_burn():
    burn = 0
    for i, e in data("expenses").iterrows():
        if e.date == "-":
            burn += e.amount
    return -math.ceil(burn / 30)

def get_income_for_day(dt):
    nov9 = datetime.datetime(2018, 11, 23)
    days_since_paycheck = (nov9-dt).days
    change = 0
    if days_since_paycheck % 14 == 13:
        for i, e in data("income").iterrows():
            change += e.amount
    return change

def get_expenses_for_day(dt):
    day = dt.day
    change = 0
    for i, e in data("expenses").iterrows():
        if e.date == str(day):
            change -= e.amount
    return change

def get_windfalls_for_day(dt):
    day = dt.day
    change = 0
    for i, e in data("windfalls").iterrows():
        if (datetime.datetime(e.year, e.month, e.day) - dt).days == -1:
            change += e.amount
    return change

def change_for_day(dt):
    change = 0
    change += get_income_for_day(dt)
    change += get_expenses_for_day(dt)
    change += get_ongoing_expense_burn()
    change += get_windfalls_for_day(dt)
    return change

def get_balance():
    change = 0
    for i, a in data("accounts").iterrows():
        if a.type == "liquid":
            change += a.balance
    return change