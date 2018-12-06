from deltaengine.forecast import Forecast
from enum import Enum

class ReportTypes(Enum):
    THREE_MONTHS = 120
    YEAR = 400
    DECADE = 4000
    LIFE =  (90-18) * 365 + 365

def ThreeMonths(*, scene="reality", use_interest=False, yearly_interest=0.07, props=[]):
    return Forecast(days=ReportTypes.THREE_MONTHS.value, scene=scene, use_interest=use_interest, yearly_interest=yearly_interest, props=props)

def Year(*, scene="reality", use_interest=False, yearly_interest=0.07, props=[]):
    return Forecast(days=ReportTypes.YEAR.value, scene=scene, use_interest=use_interest, yearly_interest=yearly_interest, props=props)

def Decade(*, scene="reality", use_interest=False, yearly_interest=0.07, props=[]):
    return Forecast(days=ReportTypes.DECADE.value, scene=scene, use_interest=use_interest, yearly_interest=yearly_interest, props=props)

def Life(*, scene="reality", use_interest=False, yearly_interest=0.07, props=[]):
    return Forecast(days=ReportTypes.LIFE.value, scene=scene, use_interest=use_interest, yearly_interest=yearly_interest, props=props)
