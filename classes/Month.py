month_name = ["Unknown",
          "January",
          "Febuary",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"]

bal_cols = ["Low", "High", "Change"]

class MonthData:
    def __init__(self, month, year, *, raw_data):
        self.number = month
        self.name = month_name[month]
        self.year = year
        self.raw_data = raw_data
        self.bal_data = self.get_bal_data(self.raw_data)

    def get_bal_data(self, raw_data):
        # data pieces
        first_day = raw_data.iloc[0]
        last_day = raw_data.iloc[-1]
        
        # formatted arrays
        balances = raw_data.balance
        
        # calculations
        balance_low = round(min(balances), 2)
        balance_high = round(max(balances), 2)
        balance_change = last_day.balance - first_day.balance

        return [balance_low, balance_high, balance_change]
        
    def __str__(self):
        month_header = " ".join(["="*10, self.name[:3], "="*10]) + "\n"
        return  month_header + "\n".join([
            "{}: ${:,}".format(bal_cols[i-1], self.bal_data[i-1]) for i in range(len(bal_cols))
        ])