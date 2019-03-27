import unittest
from api.delta import TransactionSet
from api.delta import BalanceSheet
from api.delta import Transaction
from api.delta import Schedule

from datetime import datetime
from dateutil.relativedelta import relativedelta


class TransactionSetTest(unittest.TestCase):
    def test_log_generation(self):
        DayOfMonth = lambda day: Schedule(start=datetime(2019,1,day), interval=relativedelta(months=1))

        tx = TransactionSet(
            transactions= [
                Transaction(name="test_1", value=100, schedule=DayOfMonth(1)),
                Transaction(name="test_2", value=-100, schedule=DayOfMonth(1)),
                Transaction(name="test_3", value=100, schedule=DayOfMonth(2)),
                Transaction(name="test_4", value=-100, schedule=DayOfMonth(3))
            ],
            end=datetime.today() + relativedelta(months=6)
        )

        first_datetime = datetime.today() + relativedelta(months=1, day=1) # the next month

        first_day_tx = [day["transactions"] for day in tx.log if day["day"].date() == first_datetime.date()][0]

        self.assertEqual(len(first_day_tx), 2)
        self.assertEqual(first_day_tx[0].value, 100)
