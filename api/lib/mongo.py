from flask_pymongo import PyMongo, ObjectId
from api import app

# configuration
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017

app.config["MONGO_URI"] = "mongodb+srv://adder-api:6%23L%409WR%21*ZdX2Q%3DBc%29Tm@sansburymoney-vwerh.mongodb.net/test?retryWrites=true"


#"mongodb://localhost:27017/new"

mongo = PyMongo(app)

tx_collection = mongo.db.txs
ac_collection = mongo.db.accounts
