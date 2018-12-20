import datetime

def to_datetime(str):
    a = str.split("-")
    return datetime.datetime(int(a[0]), int(a[1]), int(a[2]))