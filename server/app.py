from flask import Flask, request, send_file, Response, jsonify
from flask_cors import CORS
import json
import os
# from firebase import *
from firebase import init_app, create_user, authenticate_user, fetch_charities
from typesense import Client as TypesenseClient
# from typesense_operations import *
from typesense_operations import create_charities_collection

app = Flask(__name__, static_folder="../client/build")

client = TypesenseClient({
    'api_key': 'WFwOG63UuT4s6AyZZKUfb2w9Z41AQrOh',
    'nodes': [{
        'host': 'ul1p783ztkoredcyp-1.a1.typesense.net',
        'port': '443',
        'protocol': 'https'
    }]
})


CORS(app)
init_app()
create_charities_collection(client)

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
    return Response(json.dumps(result), status=200, mimetype="application/json")


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Query parameter "q" is required'}), 400

    try:
        search_results = client.collections['charities'].documents.search({
            'q': query,
            'query_by': 'name,email,phone_number,type'  # Fields to search within
        })
        return jsonify(search_results['hits'])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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