from flask import Flask, request, send_file, Response
from flask import Flask, request, send_file, Response
from flask_cors import CORS
import json
import os
# from firebase import *
from firebase import init_app, create_user, authenticate_user

app = Flask(__name__, static_folder="../client/build")
app = Flask(__name__, static_folder="../client/build")
CORS(app)
init_app()


@app.route('/signupvalidation', methods=['POST'])
def validateSignup():
    account = json.loads(request.headers["account"])
    email = account['email']
    password = account['password']
    if not email or not password:
        return Response("Email and password are required.", status=200, mimetype="text/plain")
    return Response(create_user(email, password), status=200, mimetype="text/plain")
    return Response(create_user(email, password), status=200, mimetype="text")
    


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return Response("Email and password are required.", status=400, mimetype="text/plain")
    result = authenticate_user(email, password)
    return Response(result, status=200, mimetype="text/plain")
    if isinstance(result, str):
        return Response(result, status=401, mimetype="text/plain")
    else:
        return Response("Login successful.", status=200, mimetype="text/plain")



@app.route('/', defaults={'file': ''})
@app.route('/<path:file>')
def serve_file(file):
    path = app.static_folder + "/" + file
    if file != "" and os.path.exists(path):
        return send_file(path)
    else:
        return send_file(os.path.join(app.static_folder, 'index.html'))
    


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)