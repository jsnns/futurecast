import pandas as pd
import matplotlib.pyplot as plt

def describe_month(month_number, year_number):
    # change in balance
    # lowest point
    
    # filter forecast data
    forecast = [(f if f.date.month == month_number and f.date.year == year_number else None) for i, f in long_forecast.iterrows()]
    forecast = [f for f in forecast if f is not None]
    
    # data pieces
    first_day = forecast[0]
    last_day = forecast[-1]
    
    # formatted arrays
    balances = [f.balance for i, f in enumerate(forecast)]
    
    # calculations
    balance_low = round(min(balances), 2)
    balance_high = round(max(balances), 2)
    balance_change = last_day.balance - first_day.balance

    bal_data = [balance_low, balance_high, balance_change]
    month = MonthData(month_number, year_number, bal_data)
    
    return month

def describe_year(year_num):
    year = YearData(year_num, [])
    
    for month in range (1,13):
        month_name = months[month]        
        month_data = describe_month(month, year_num)
        
        year.add(month_data)
        
    return year

def describe_years(list):
    data = []
    index = []
    for year_num in list:
        year_data = describe_year(year_num)
        for month_data in year_data.months:
            data.append(month_data.bal_data)
            index.append(months[month_data.number] + " " + str(month_data.year))
    
    df = pd.DataFrame(data, index=index, columns=bal_cols)
        
    return df

def describe_months(list):
    return [describe_month(m[0], m[1]) for m in list]