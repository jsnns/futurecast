from datetime import datetime
from dateutil.relativedelta import relativedelta


class Schedule:
    def __init__(self, *args, **kwargs):
        self._interval = kwargs.get("interval")
        self.start = kwargs.get("start")
        self.end = kwargs.get("end")

    def get_occurance(self, n):
        occurance = self.start + (self.interval * n)

        if self.end and occurance > self.end:
            return None

        return occurance

    def occurances(self, end):
        i = 0
        while True:
            occurance = self.get_occurance(i)
            if not occurance or occurance > end:
                break
            i += 1
            yield occurance
    
    def occurs_on_day(self, day):
        for occurance in self.occurances(day):
            if day == occurance:
                return True

    @property
    def interval(self):
        return self._interval.normalized()

    @interval.setter
    def interval(self, interval):
        self._interval = interval

class SingleTransaction(Schedule):
    def __init__(self, *args, **kwargs):
        super().__init__(interval=None, start=kwargs.get("date"), end=None)

    def get_occurance(self, n):
        if n == 0:
            return self.start
        return None
    
    def occurances(self, end):
        yield self.get_occurance(0)
        