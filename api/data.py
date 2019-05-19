from api import app
from flask import jsonify, request
from bson.json_util import dumps
import json
from api.lib.dynamic_report import report
from api.lib.mongo import tx_collection, ac_collection
from flask_pymongo import PyMongo, ObjectId

@app.route("/tx", methods=["POST"])
def new_tx():
    body = request.json
    tx_id = tx_collection.insert_one(body).inserted_id
    report.update()
    return jsonify({"id": str(tx_id)})


@app.route("/tx", methods=["PUT"])
def update_tx():
    body = request.json
    if "_id" in body["update"]:
        del body["update"]["_id"]
    tx_collection.find_one_and_update({"_id": ObjectId(body['_id'])}, {"$set": body["update"]})
    report.update()
    return jsonify({"success": True})


@app.route("/tx", methods=["GET"])
def get_all_txs():
    txs = [tx for tx in tx_collection.find({})]
    return jsonify(json.loads(dumps(txs)))


@app.route("/tx/<id>", methods=["DELETE"])
def delete_tx(id):
    result = tx_collection.delete_one({"_id": ObjectId(id)})
    report.update()
    return jsonify({ "deleted_count": result.deleted_count })


@app.route("/tx/nuke", methods=["GET"])
def nuke_tx():
    txs = [tx for tx in tx_collection.find({})]
    for t in txs:
        result = tx_collection.delete_one({"_id": ObjectId(t['_id'])})
    report.update()
    return ""
