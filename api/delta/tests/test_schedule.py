import unittest
from api.delta.schedule import Schedule
from datetime import datetime
from dateutil.relativedelta import relativedelta
from datetime import timedelta


class ScheduleTest(unittest.TestCase):
    def test_get_occurance_timedelta(self):
        start = datetime(2019, 1, 1)
        interval = relativedelta(days=7)

        s = Schedule(interval=interval, start=start)

        self.assertEqual(s.get_occurance(1), datetime(2019, 1, 8))
        self.assertEqual(s.get_occurance(2), datetime(2019, 1, 15))

    def test_get_occurance_relativedelta(self):
        start = datetime(2019, 1, 1)
        interval = relativedelta(months=1)

        s = Schedule(interval=interval, start=start)

        self.assertEqual(s.get_occurance(1), datetime(2019, 2, 1))
        self.assertEqual(s.get_occurance(2), datetime(2019, 3, 1))

    def test_get_occurance_stops(self):
        start = datetime(2019, 1, 1)
        end = datetime(2019, 1, 8)
        interval = relativedelta(days=7)

        s = Schedule(interval=interval, start=start, end=end)

        self.assertEqual(s.get_occurance(1), datetime(2019, 1, 8))
        self.assertEqual(s.get_occurance(2), None)

    def test_occurances(self):
        start = datetime(2019, 1, 1)
        end = datetime(2019, 6, 1)
        interval = relativedelta(months=1)

        s = Schedule(interval=interval, start=start, end=end)

        for o in s.occurances:
            self.assertLessEqual(o, end)
