from api import app
from flask import jsonify, request
from flask_pymongo import PyMongo, ObjectId
from bson.json_util import dumps
import json

# configuration
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017

app.config["MONGO_URI"] = "mongodb://localhost:27017/test-tx"
mongo = PyMongo(app)

tx_collection = mongo.db.txs
ac_collection = mongo.db.accounts

@app.route("/ac", methods=["POST"])
def new_ac():
    body = request.json
    ac_id = ac_collection.insert_one(body).inserted_id
    return jsonify({"id": str(ac_id)})

@app.route("/ac", methods=["PUT"])
def update_ac():
    body = request.json
    if "_id" in body["update"]:
        del body["update"]["_id"]
    ac_collection.find_one_and_update({"_id": ObjectId(body['_id'])}, {"$set": body["update"]})
    return jsonify({"success": True})
    
@app.route("/ac", methods=["GET"])
def get_all_acs():
    acs = [ac for ac in ac_collection.find({})]
    return jsonify(json.loads(dumps(acs)))


@app.route("/tx", methods=["POST"])
def new_tx():
    body = request.json
    tx_id = tx_collection.insert_one(body).inserted_id
    return jsonify({"id": str(tx_id)})

@app.route("/tx", methods=["PUT"])
def update_tx():
    body = request.json
    if "_id" in body["update"]:
        del body["update"]["_id"]
    tx_collection.find_one_and_update({"_id": ObjectId(body['_id'])}, {"$set": body["update"]})
    return jsonify({"success": True})
    
@app.route("/tx", methods=["GET"])
def get_all_txs():
    txs = [tx for tx in tx_collection.find({})]
    return jsonify(json.loads(dumps(txs)))

@app.route("/tx/nuke", methods=["GET"])
def nuke_tx():
    txs = [tx for tx in tx_collection.find({})]
    for t in txs:
        result = tx_collection.delete_one({"_id": ObjectId(t['_id'])})
    return ""

@app.route("/tx/<id>", methods=["DELETE"])
def delete_tx(id):
    result = tx_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({ "deleted_count": result.deleted_count })