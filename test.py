from deltaengine.Reports import ReportData, ReportTypes

print(ReportData(report_type=ReportTypes.THREE_MONTHS, props=["parker-visits-in-spring-2019"]).data_set.get_windfalls())