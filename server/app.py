from flask import Flask, request, send_file, Response
from flask_cors import CORS
import json
import os
from firebase import *

app = Flask(__name__, static_folder="../client/build")
CORS(app)
init_app()


@app.route('/signupvalidation')
def validateSignup():
    account = json.loads(request.headers["account"])
    email = account['email']
    password = account['password']
    return Response(create_user(email, password), status=200, mimetype="text")
    
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