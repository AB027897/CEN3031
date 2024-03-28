from flask import Flask, request, send_file, Response, jsonify
from flask_cors import CORS
import json
import os
# from firebase import *
# TODO: REMOVE IMPORTS BELOW WHEN COMMITING
from firebase import init_app, create_user, authenticate_user, get_firebase, create_token, signin_token
# from typesense import Client as TypesenseClient
# from typesense_operations import initialize_typesense_client, index_user_data, search_charities

app = Flask(__name__, static_folder="..\\client\\build")
CORS(app)
init_app()

firebase_app = get_firebase()

# client = initialize_typesense_client()

# charities_data = fetch_charities(firebase_app)

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
    print(token)
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

@app.route('/signintoken')
def signin():
    token = json.loads(request.headers["account"])
    user = signin_token(token)
    if type(user) == str:
        return Response(user, status=200, mimetype="text/plain")
    return Response(json.dumps(user), status=200, mimetype="application/json")

# @app.route('/search', methods=['GET'])
# def search():
#     query = request.args.get('q')
#     if not query:
#         return jsonify({'error': 'Query parameter "q" is required'}), 400

#     try:
#         # Call the search function in typesense_operations.py
#         search_results = search_charities(query)
#         if search_results is not None:
#             return jsonify(search_results)
#         else:
#             return jsonify({'error': 'An error occurred while searching'}), 500
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

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