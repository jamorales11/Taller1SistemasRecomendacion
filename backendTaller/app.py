from crypt import methods
from flask import FLask, jsonify, request

users = {"001": "Julio", "002": "Maria"}

app = Flask(__name__)

@app.route("/")
def hello_from_root():
    return jsonify(message = "Hello from Root")

@app.route("/find_user", methods= ["POST", "GET"])
def get_user():
    print(request.json)
    data = request.json
    user = data["id"]

    return {"user":users[id]}

