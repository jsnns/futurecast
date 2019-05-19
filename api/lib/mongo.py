from flask_pymongo import PyMongo, ObjectId
from api import app

PROD = "mongodb+srv://adder-api:6%23L%409WR%21*ZdX2Q%3DBc%29Tm@sansburymoney-vwerh.mongodb.net/test?retryWrites=true"

LOCAL = "mongodb://localhost:27017/new"

app.config["MONGO_URI"] = LOCAL

mongo = PyMongo(app)

tx_collection = mongo.db.txs
ac_collection = mongo.db.accounts
