from deltaengine.Data import Data

class DataWithInterest(Data):

    def __init__(self, *, yearly_interest=0.07, days=365, scene="reality", props=[]):
        self.daily_interest = yearly_interest / 365
        
        super().__init__(days=days, scene=scene, props=props)
    
    def get_single_balance(self, last_balance, change):
        return super().get_single_balance(last_balance, change) * (1 + self.daily_interest)