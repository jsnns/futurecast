from delta import Schedule
from datetime import datetime
from dateutil.relativedelta import relativedelta

Bridgewater = Schedule(start=datetime(2019,1,18), interval=relativedelta(weeks=2))

for i, o in enumerate(Bridgewater.occurances(datetime(2020,1,1))):
    print(o.date())