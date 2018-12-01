import pandas as pd
import datetime
import math
import numpy as np

class Data:
    def __init__(self, *, days=365, scene="data"):
        self.days = days
        self.scene = scene
        self.expenses = self.get_expenses_map()
        self.windfalls = self.get_windfalls()
        self.daily_burn = self.get_ongoing_expense_burn()
        self.income = self.data_file("income").iterrows()

        self.data = self.get_forecast()
    
    def data_file(self, file):
        return pd.read_csv("{}/{}.csv".format(self.scene, file))

    def get_forecast(self):
        initial_balance = self.get_balance()
        
        balance_array = []
        date_array = [datetime.datetime.now() + datetime.timedelta(days=i) for i in range(0, self.days)]
        change_array = [self.change_for_day(d) for d in date_array]

        for i, change in enumerate(change_array):
            b = self.get_single_balance(balance_array[-1] if balance_array else 0, change)
            balance_array.append(b)
        
        cols = ["balance", "date", "change"]
        forecast_data = np.transpose([balance_array, date_array, change_array])
        
        return pd.DataFrame(forecast_data, columns=cols)

    def get_single_balance(self, last_balance, change):
        balance = last_balance
        balance += change
        return balance

    def get_ongoing_expense_burn(self):
        burn = 0
        for i, e in self.data_file("expenses").iterrows():
            if e.date == "-":
                burn += e.amount
        return -math.ceil(burn / 30)

    def get_income_for_day(self, dt):
        nov9 = datetime.datetime(2018, 11, 23)
        days_since_paycheck = (nov9-dt).days
        change = 0
        if days_since_paycheck % 14 == 13:
            for i, e in self.income:
                change += e.amount
        return change

    def get_expenses_map(self):
        emap = {}
        for i, e in self.data_file("expenses").iterrows():
            if e.date not in emap:
                emap[e.date] = 0
            emap[e.date] -= e.amount
        return emap

    def get_windfalls(self):
        wmap = {}
        for i, e in self.data_file("windfalls").iterrows():
            if e.date not in wmap:
                wmap[e.date] = 0
            wmap[e.date] += e.amount
        return wmap

    def change_for_day(self, dt):
        change = 0
        change += self.get_income_for_day(dt)
        try:
            change += self.expenses[str(dt.day)]
        except Exception as error:
            pass
        try:
            change += self.windfalls["{}-{}-{}".format(dt.year, dt.month, dt.day)]
        except Exception as error:
            pass
        try:
            change += self.daily_burn
        except Exception as error:
            pass
        return change

    def get_balance(self):
        change = 0
        for i, a in self.data_file("accounts").iterrows():
            if a.type == "liquid":
                change += a.balance
        return change