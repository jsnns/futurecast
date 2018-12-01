from deltaengine.Forecast import Forecast
from enum import Enum

class ReportData(Forecast):

    def __init__(self, *, report_type, scene="data"):
        super().__init__(days=report_type.value, scene=scene)

class ReportTypes(Enum):
    THREE_MONTHS = 120
    YEAR = 400
    DECADE = 4000
    LIFE =  40000
