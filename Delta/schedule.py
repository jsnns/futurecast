from datetime import datetime
from dateutil.relativedelta import relativedelta
from delta.data import schedules


class Schedule:
    def __init__(self, *args, **kwargs):
        if type(kwargs.get("storage_id")) is str:
            schedule = schedules.document(kwargs.get("storage_id")).get()
            
            self.end = schedule.get("end")
            self.start = schedule.get("start")
            self._interval = relativedelta(days=schedule.get("interval"))

            return None
        
        self._interval = kwargs.get("interval")
        self.start = kwargs.get("start")
        self.end = kwargs.get("end")

    def get_occurance(self, n):
        occurance = self.start + (self.interval * n)

        if self.end and occurance > self.end:
            return None

        return occurance

    def occurances(self, end):
        n = 0
        while True:
            o = self.get_occurance(n)
            if o > end:
                break
            n += 1
            yield o
    
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

    def to_dict(self):
        return {
            "end": self.end,
            "start": self.start,
            "interval": self.interval.days # in days so a week becomes 7 days etc
        }

    # TODO: use a decorator
    def save(self):
        return schedules.add(self.to_dict())[1]