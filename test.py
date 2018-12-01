from deltaengine.Forecast import Forecast

mod = 1

fc = Forecast(days=450*mod)

print(fc.describe_month(12, 2018))