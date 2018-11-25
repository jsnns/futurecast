months = ["Unknown",
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
    def __init__(self, month, year, bal_data):
        self.number = month
        self.name = month_names[month]
        self.year = year
        self.bal_data = bal_data
        
    def __str__(self):
        month_header = " ".join(["="*10, self.name[:3], "="*10]) + "\n"
        return  month_header + "\n".join([
            "{}: ${:,}".format(bal_cols[i-1], self.bal_data[i-1]) for i in range(len(bal_cols))
        ])