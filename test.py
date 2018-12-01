from deltaengine.Forecast import Forecast

mod = 1

fc = Forecast(days=450*mod)
fci = Forecast(days=450*mod, use_interest=True, yearly_interest=0.07)

fci_frame = fci.describe_month(12, 2019+(mod-1))
fc_frame = fc.describe_month(12, 2019+(mod-1))

print(fci_frame)
print(fc_frame)