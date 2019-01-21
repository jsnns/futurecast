import unittest
from delta import TransactionSet
from delta import BalanceSheet
from delta import Transaction
from delta import Schedule

from datetime import datetime
from dateutil.relativedelta import relativedelta


class TransactionSetTest(unittest.TestCase):
    def test_log_generation(self):
        DayOfMonth = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))

        tx = TransactionSet(
            Transaction(name="test_1", value=100, schedule=DayOfMonth(1)),
            Transaction(name="test_2", value=-100, schedule=DayOfMonth(1)),
            Transaction(name="test_3", value=100, schedule=DayOfMonth(2)),
            Transaction(name="test_4", value=-100, schedule=DayOfMonth(3)),
            end=datetime(2020,1,1)
        )

        self.assertEqual(True, False) # TODO: write this test
    