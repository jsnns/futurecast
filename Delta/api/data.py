from flask import Flask
from flask import jsonify
import json
import Delta.api.config as cfg
app = Flask(__name__)

@app.route("/")
def root():
    api_description = dict(
        version=cfg.API_VERSION,
        name=cfg.API_NAME,
        author=cfg.AUTHOR
    )
    
    return jsonify(api_description)

@app.route("/data/<scene>/<dataset>", methods=["GET"])
def get_data(scene, dataset):
    filename = f"data/{scene}/{dataset}.json"
    with open(filename) as json_file:
        data = json.load(json_file)
    
    return jsonify(data)

@app.route("/data/<scene>/<dataset>", methods=["POST"])
def post_data(scene, dataset):
    