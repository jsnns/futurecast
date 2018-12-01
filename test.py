from deltaengine.Reports import ReportTypes, ReportData

data = ReportData(report_type=ReportTypes.THREE_MONTHS)

print(data.describe_month(12, 2018))