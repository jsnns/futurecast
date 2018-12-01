import pandas as pd
import datetime
import math
import numpy as np

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
    
    def data_file(self, file):
        if self.props and file == "windfalls":
            df = pd.read_csv("data/{}/{}.csv".format(self.scene, file))
            for prop in self.props:
                df = df.append(pd.read_csv("data/props/{}.csv".format(prop)))
            return df

        return pd.read_csv("data/{}/{}.csv".format(self.scene, file))

    def get_single_balance(self, last_balance, change):
        balance = last_balance
        balance += change
        return balance

    def get_income_for_day(self, dt):
        nov9 = datetime.datetime(2018, 11, 23)
        days_since_paycheck = (nov9-dt).days
        if days_since_paycheck % 14 == 13:
            return self.income.sum(axis=0).amount
        return 0

    def get_ongoing_expense_burn(self):
        burn = 0
        df = self.data_file("expenses")
        burn = df[df.date == "-"].sum(axis=0).amount
        return -math.ceil(burn / 30)

    def get_expenses_map(self):
        emap = {}
        data = self.data_file("expenses")
        for i in range(1, 31):
            emap[str(i)] = -data[data.date == str(i)].sum(axis=0).amount
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