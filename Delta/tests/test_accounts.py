import unittest
from delta.account import Account


class AccountTest(unittest.TestCase):
    def test_save(self):
        a = Account(name="Simple", balance=100)
        
        document = a.save()

        a_2 = Account(storage_id=document.id)

        self.assertEqual(a.balance, a_2.balance)