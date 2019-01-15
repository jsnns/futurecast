from datetime import datetime
from dateutil.relativedelta import relativedelta


class Schedule:
    def __init__(self, interval, start, end=None):
        self._interval = interval
        self.start = start
        self.end = end

    def get_occurance(self, n):
        occurance = self.start + (self.interval * n)

        if self.end and occurance > self.end:
            return None

        return occurance

    @property
    def interval(self):
        return self._interval

    @interval.setter
    def interval(self, interval):
        self._interval = interval