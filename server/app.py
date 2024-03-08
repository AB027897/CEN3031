from flask import Flask, request, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder="../client/build")
CORS(app)


@app.route('/signupvalidation')
def home():
    account = json.loads(request.headers["account"])
    email = account['email']
    password = account['password']
    return "Hello World"


@app.route('/<path:path>')
def serve_file(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)