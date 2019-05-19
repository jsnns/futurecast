from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
cors = CORS(app, resources={
  r"/*": {"origins": "*"}
})

import api.index      # nopep8
import api.analysis   # nopep8
import api.data       # nopep8
import api.account    # nopep8
