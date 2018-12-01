import pandas as pd
import calendar
import datetime
from deltaengine.DataWithInterest import DataWithInterest
from deltaengine.Data import Data
from deltaengine.classes.Month import Month
from deltaengine.classes.Year import Year

class Forecast:
    def __init__(self, *, days=1000, scene="data", use_interest=False, yearly_interest=0.07):
        if use_interest:
            data_set = DataWithInterest(days=days, scene=scene, yearly_interest=yearly_interest)
        else:
            data_set = Data(days=days, scene=scene)

        self.data_set = data_set
        self.data = data_set.data
        self.days = days

    def describe_month(self, month_number, year_number):
        # change in balance
        # lowest point
        
        # filter forecast data
        month_range = calendar.monthrange(year_number, month_number)
        fc = self.data[(self.data.date >= datetime.datetime(year_number, month_number, month_range[0])) & (self.data.date <= datetime.datetime(year_number, month_number, month_range[1]))]


        month = Month(month_number, year_number, raw_data=fc)
        
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