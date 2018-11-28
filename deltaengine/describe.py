import pandas as pd
import matplotlib.pyplot as plt
import importlib
import deltaengine.forecast as forecast
from classes.Month import MonthData as Month
from classes.Year import YearData as Year

class Forecast:
    def __init__(self, days):
        self.forecast = forecast.get_forecast(days)
        self.days = days

    def describe_month(self, month_number, year_number):
        # change in balance
        # lowest point
        
        # filter forecast data
        fc = [(f if f.date.month == month_number and f.date.year == year_number else None) for i, f in self.forecast.iterrows()]
        fc = [f for f in fc if f is not None]
        
        # data pieces
        first_day = fc[0]
        last_day = fc[-1]
        
        # formatted arrays
        balances = [f.balance for i, f in enumerate(fc)]
        
        # calculations
        balance_low = round(min(balances), 2)
        balance_high = round(max(balances), 2)
        balance_change = last_day.balance - first_day.balance

        bal_data = [balance_low, balance_high, balance_change]
        month = Month(month_number, year_number, bal_data)
        
        return month

    def describe_year(self, year_num):
        year = Year(year_num, [])
        
        for month in range (1,13):   
            month_data = self.describe_month(month, year_num)
            
            year.add(month_data)
            
        return year

    def describe_years(self, list):
        data = []
        index = []
        for year_num in list:
            year_data = self.describe_year(year_num)
            for month_data in year_data.months:
                data.append(month_data.bal_data)
                index.append(month_data.name + " " + str(month_data.year))
        
        df = pd.DataFrame(data, index=index, columns=bal_cols)
            
        return df

    def describe_months(self, list):
        return [self.describe_month(m[0], m[1]) for m in list]