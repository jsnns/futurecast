import unittest
from delta.transaction import Transaction
from delta.schedule import Schedule
from dateutil.relativedelta import relativedelta
from datetime import datetime


class TransactionTest(unittest.TestCase):
    def test_save_transaction(self):
        s = Schedule(interval=relativedelta(days=1), start=datetime(2019, 1, 1))
        t = Transaction(schedule=s, value=10, category="food", name="lol")
        document = t.save()
        document_id = document.id

        t_2 = Transaction(storage_id=document_id)
        self.assertEqual(t.value, t_2.value)
