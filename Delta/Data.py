from google.cloud import firestore

# Add a new document
db = firestore.Client()

transactions = db.collection("transactions")
accounts = db.collection("accounts")
schedules = db.collection("schedules")