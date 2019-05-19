from api import app
from flask import jsonify, request
from bson.json_util import dumps
import json
from api.lib.dynamic_report import report
from api.lib.mongo import tx_collection, ac_collection
from flask_pymongo import PyMongo, ObjectId

from api.db import Account as AccountDB

@app.route("/ac", methods=["POST"])
def new_ac():
    body = request.json
    new_account = AccountDB(body)
    new_account.save()
    return jsonify({ "id": str(new_account.id) })


@app.route("/ac", methods=["PUT"])
def update_ac():
    body = request.json
    query_id = body["_id"]

    if "_id" in body["update"]:
        del body["update"]["_id"]

    to_update = AccountDB.objects(id=query_id).update(body["update"])
    return jsonify({"success": True, "return": to_update})


@app.route("/ac", methods=["GET"])
def get_all_acs():
    return jsonify(json.loads(AccountDB.objects.to_json()))
