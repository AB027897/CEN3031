from flask import Flask, request, send_file, Response
from flask_cors import CORS
import json
import os
from firebase import *
from post import *

app = Flask(__name__, static_folder="../client/build")
CORS(app)
init_app()
init_database()

@app.route('/signupvalidation')
def validateSignup():
    account = json.loads(request.headers["account"])
    email = account['email']
    password = account['password']
    if not email or not password:
        return Response("Email and password are required.", status=200, mimetype="text/plain")
    result = create_user(email, password)
    if type(result) == str:
        return Response(result, status=200, mimetype="text/plain")
    token = create_token(result)
    result['token'] = token
    return Response(json.dumps(result), status=200, mimetype="application/json")


@app.route('/loginvalidation')
def login():
    account = json.loads(request.headers["account"])
    email = account['email']
    password = account['password']
    if not email or not password:
        return Response("Email and password are required.", status=200, mimetype="text/plain")
    result = authenticate_user(email, password)
    if type(result) == str:
        return Response(result, status=200, mimetype="text/plain")
    token = create_token(result)
    result['token'] = token
    return Response(json.dumps(result), status=200, mimetype="application/json")


@app.route('/addaccountinfo')
def add_donor_info():
    account = json.loads(request.headers["account"])
    add_account(account['uuid'], account['token'], account['account_type'], account['name'], account['email'], account['phone'], account['dob'], account['charity_type'])
    return Response("", status=200, mimetype="text/plain")

@app.route('/getaccountinfo')
def get_account_info():
    account = json.loads(request.headers["account"])
    account_info = get_account(account['uuid'], account['token'])
    return Response(json.dumps(account_info), status=200, mimetype="application/json")


@app.route('/signintoken')
def signin():
    token = json.loads(request.headers["account"])
    user = signin_token(token)
    if type(user) == str:
        return Response(user, status=200, mimetype="text/plain")
    return Response(json.dumps(user), status=200, mimetype="application/json")

@app.route('/addpost')
def post_add():
    post_info = json.loads(request.headers["account"])
    add_post(post_info["uuid"], post_info["charity_type"], post_info["title"], post_info["preview_caption"], post_info["body"], post_info["token"])
    return Response("", status=200, mimetype="text/plain")

@app.route('/getpost')
def post_get():
    user_info = json.loads(request.headers["account"])
    post = get_post(user_info["uuid"], user_info["charity_type"], user_info["token"])
    if post != "":
        return Response(json.dumps(post), status=200, mimetype="application/json")
    return Response("", status=200, mimetype="text/plain")

@app.route('/addimage', methods=['POST'])
def add_image():
    user_info = json.loads(request.headers["account"])
    for label in request.files:
        image = request.files[label]
        upload_image(user_info["uuid"], user_info["charity_type"], user_info["token"], image.read())
    return Response("", status=200, mimetype="text/plain")

@app.route('/getimage')
def get_image():
    user_info = json.loads(request.headers["account"])
    urls = get_images(user_info["uuid"], user_info["charity_type"], user_info["token"])
    return Response(json.dumps(urls), status=200, mimetype="application/json")

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