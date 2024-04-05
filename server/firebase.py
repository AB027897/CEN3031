import pyrebase
import os
from dotenv import load_dotenv
import json

load_dotenv()

cred = {
    "apiKey": os.getenv("API_KEY"),
    "authDomain": os.getenv("AUTH_DOMAIN"),
    "projectId": os.getenv("PROJECT_ID"),
    "storageBucket": os.getenv("STORAGE_BUCKET"),
    "serviceAccount" : "./serviceAccount.json",
    "messagingSenderId": os.getenv("MESSAGING_SENDER_ID"), 
    "appId": os.getenv("APP_ID"),
    "measurementId": os.getenv("MEASUREMENT_ID"),
    "databaseURL" : os.getenv("DATABASE_URL")
}


def init_app():
    global firebase_app
    firebase_app = pyrebase.initialize_app(cred)
    global auth 
    auth = firebase_app.auth()

    

def get_firebase():
    return firebase_app

def create_user(email, password):
    try:
        user = auth.create_user_with_email_and_password(email, password)
        return user
    except Exception as err:
        error = json.loads(err.args[1])
        return str(error["error"]["message"])


def authenticate_user(email, password):
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return user
    except Exception as err:
        error = json.loads(err.args[1])
        return str(error["error"]["message"])

def create_token(user):
    try:
        token = auth.create_custom_token(user['localId'])
        return token
    except Exception as err:
        error = json.loads(err.args[1])
        return str(error["error"]["message"])

def signin_token(token):
    try:
        user = auth.sign_in_with_custom_token(token)
        user = auth.get_account_info(user['idToken'])['users'][0]
        return user
    except Exception as err:
        error = json.loads(err.args[1])
        return str(error["error"]["message"])
