from flask_pymongo import PyMongo, ObjectId
from api import app

# configuration
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017

app.config["MONGO_URI"] = "mongodb://localhost:27017/test-tx"
mongo = PyMongo(app)

tx_collection = mongo.db.txs
ac_collection = mongo.db.accounts