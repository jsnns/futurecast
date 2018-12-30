import pandas as pd
import datetime
import math
import numpy as np
from deltaengine.util import to_datetime

class Data:
    def __init__(self, *, days=365, scene="reality", props=[]):
        self.days = days
        self.scene = scene
        self.props = props

        self.get_forecast()

    def init_data(self):
        self.expenses = self.get_expenses_map()
        self.windfalls = self.get_windfalls()
        self.daily_burn = self.get_ongoing_expense_burn()
        self.income = self.data_file("income")
        self.accounts = self.data_file("accounts")
    
    def get_forecast(self, *, new_data=False):
        self.init_data()
        
        initial_balance = self.get_balance()
        
        balance_array = []
        date_array = [datetime.datetime.now() + datetime.timedelta(days=i) for i in range(0, self.days)]
        change_array = [self.change_for_day(d) for d in date_array]

        for i, change in enumerate(change_array):
            b = self.get_single_balance(balance_array[-1] if balance_array else initial_balance, change)
            balance_array.append(b)
        
        cols = ["balance", "date", "change"]
        forecast_data = np.transpose([balance_array, date_array, change_array])
        
        self.data = pd.DataFrame(forecast_data, columns=cols)

    def change_for_day(self, dt):
        change = 0
        change += self.get_income_for_day(dt)
        
        try:
            change += self.expenses[str(dt.strftime("%Y-%m-%d"))]
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
    
    def data_file(self, file):
        if self.props and file == "windfalls":
            df = pd.read_json("data/{}/{}.json".format(self.scene, file), convert_dates=False)
            for prop in self.props:
                df = df.append(pd.read_json("data/props/{}.json".format(prop), convert_dates=False))
            return df

        return pd.read_json("data/{}/{}.json".format(self.scene, file), convert_dates=False)

    def get_single_balance(self, last_balance, change):
        balance = last_balance
        balance += change
        return balance

    def get_income_for_day(self, dt):
        for i, income in self.data_file("income").iterrows():
            start_date = to_datetime(income.start)

            days_since_income = (start_date - dt).days
            if days_since_income % income.interval == income.interval - 1: # TODO: wtf
                return self.income.sum(axis=0).amount
            return 0

    def get_ongoing_expense_burn(self):
        burn = 0
        df = self.data_file("expenses")
        burn = df[df.ongoing == True].sum(axis=0).amount
        return -math.ceil(burn / 30)

    def get_expenses_map(self):
        emap = {}
        data = self.data_file("expenses")
        today = datetime.datetime.now()

        for i in range(0, self.days):
            day = today + datetime.timedelta(days=i)
            am = 0
            for i, expense in data.iterrows():
                a_correct_day = (to_datetime(expense.start) - day).days % expense.interval == expense.interval-1
                not_after = (to_datetime(expense.end) > day) and (to_datetime(expense.start) < day)
                
                if a_correct_day and not_after and not expense.ongoing:
                    am += expense.amount

            emap[day.strftime("%Y-%m-%d")] = -am
        return emap

    def get_windfalls(self):
        wmap = {}
        for i, e in self.data_file("windfalls").iterrows():
            if e.date not in wmap:
                wmap[e.date] = 0
            wmap[e.date] += e.amount
        return wmap

    def get_balance(self):
        bal = self.accounts[self.accounts.type == "liquid"].sum(axis=0).balance
        return bal