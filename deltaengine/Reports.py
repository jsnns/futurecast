from deltaengine.Forecast import Forecast
from enum import Enum

class ReportData(Forecast):

    def __init__(self, *, report_type, scene="reality", interest=False, yearly_interest=0.07):
        super().__init__(days=report_type.value, scene=scene, use_interest=interest, yearly_interest=yearly_interest)

class ReportTypes(Enum):
    THREE_MONTHS = 120
    YEAR = 400
    DECADE = 4000
    LIFE =  (90-18) * 365 + 365
