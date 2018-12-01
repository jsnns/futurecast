import pandas as pd

bal_cols = ["Low", "High", "Change"]

class Year:
    def __init__(self, year, months_data):
        self.year = year
        self.months_data = months_data
        
    def data(self):
        return [m.bal_data for m in self.months_data]
    
    def add(self, data):
        self.months_data.append(data)
        
    def frame(self):
        df = pd.DataFrame(self.data(), columns=bal_cols)
        indexes = {}
        for i, e in enumerate(self.months_data):
            indexes[i] = e.name + " " + str(e.year)
        df = df.rename(index=indexes)
        return df