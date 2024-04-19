from flask import Flask, request, send_file, Response
from flask_cors import CORS
import json
import os
from firebase import *
from post import *
from financial import *
from typesense_operations import *

app = Flask(__name__, static_folder="../client/build")
CORS(app)
init_app()
init_database()
init_typesense()

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
    response = add_account(account['uuid'], account['token'], account['account_type'], account['name'], account['email'], account['phone'], account['dob'], account['charity_type'], account["account_number"], account["routing_number"], account["country"], account["preferences"])
    print(response)
    if type(response) == str:
        return Response(json.dumps(response), status=200, mimetype="application/json")
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

@app.route('/setposttoken')
def post_set_token():
    uuid = json.loads(request.headers["account"])
    account = {"localId" : uuid}
    token = create_token(account)
    return Response(token, status=200, mimetype="text/plain")

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

@app.route('/donatecharity')
def donate_charity():
    user_info = json.loads(request.headers["account"])
    charity_info = get_account(user_info["charity"], user_info["token"])
    card = create_card_token(user_info["number"], user_info["exp_month"], user_info["exp_year"], user_info["cvc"])
    charge_card(user_info["amount"], card)
    transfer_money(user_info["amount"], charity_info["id"])
    return Response("", status=200, mimetype="text/plain")

@app.route('/typesense')
def search_handler():
    #get_all_posts()
    query = json.loads(request.headers["account"])
    collection_names = ['charities', 'posts']

    results = search_documents(collection_names, query)

    json_results = json.dumps(results)
    return Response(json_results, status=200, mimetype='application/json')

@app.route('/getrecs')
def get_recommended():
    account = json.loads(request.headers["account"])
    account_info = get_account(account["uuid"], account["token"])
    preferences = ""
    if account_info["account type"] == "donor":
        preferences = account_info["preferences"]
    else:
        preferences = [account_info["type"]]
    recs = []
    for preference in preferences:
        recs = recs + get_all_posts(preference)
    return Response(json.dumps(recs), status=200, mimetype="application/json")

@app.route('/financial')
def finance():
    user_info = json.loads(request.headers["account"])
    payment_intent(user_info["amount"])
    charity_info = signin_token(user_info["charity"])
    print(charity_info)
    transfer_money(user_info["amount"], charity_info["id"])
    return Response("", status=200, mimetype="text/plain")

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