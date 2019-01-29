from datetime import datetime
from dateutil.relativedelta import relativedelta


class Schedule:
    def __init__(self, *args, **kwargs):
        self._interval = kwargs.get("interval")
        self.start = kwargs.get("start")
        self.end = kwargs.get("end")

        if not self.end:
            self.end = datetime(2100,1,1)

        self.occurances = self.get_occurances(self.end)

    def get_occurance(self, n):
        if len(self.occurances) < n+1:
            return None
        return self.occurances[n]

    def next_occurance(self, prev):
        if not self._interval:
            return None

        occurance = prev + self._interval

        if self.end and occurance > self.end:
            return None

        return occurance

    def get_occurances(self, end):
        i = [self.start]
        while True:
            occurance = self.next_occurance(i[len(i)-1])
            if not occurance or occurance > self.end:
                break
            i.append(occurance)
        return i
            
    
    def occurs_on_day(self, day):
        for occurance in self.occurances:
            if day == occurance:
                return True

class Once(Schedule):
    def __init__(self, *args, **kwargs):
        super().__init__(interval=None, start=datetime(args[0], args[1], args[2]), end=None)
        self.occurances = [self.start]

    def get_occurance(self, n):
        if n == 0:
            return self.start
        return None