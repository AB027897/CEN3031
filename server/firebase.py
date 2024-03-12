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
    "messagingSenderId": os.getenv("MESSAGING_SENDER_ID"), 
    "appId": os.getenv("APP_ID"),
    "measurementId": os.getenv("MEASUREMENT_ID"),
    "databaseURL" : ""
}


def init_app():
    firebase_app= pyrebase.initialize_app(cred)
    global auth 
    auth = firebase_app.auth()

def create_user(email, password):
    try:
        user = auth.create_user_with_email_and_password(email, password)
    except Exception as err:
        error = json.loads(err.args[1])
        return error["error"]["message"]
        