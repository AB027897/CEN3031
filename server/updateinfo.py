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

firebase = pyrebase.initialize_app(cred)
db = firebase.database()
storage = firebase.storage()
auth = firebase.auth()


def update_email(user_id, email):
    ref = "accounts/{}".format(user_id)
    cur = db.child(ref).get().val()
    cur["email"] = email
    db.child(ref).update(cur)


def update_account_type(user_id, account_type):
    ref = "accounts/{}".format(user_id)
    cur = db.child(ref).get().val()
    cur["account type"] = account_type
    db.child(ref).update(cur)


def update_name(user_id, name):
    ref = "accounts/{}".format(user_id)
    cur = db.child(ref).get().val()
    cur["name"] = name
    db.child(ref).update(cur)


def update_phone_number(user_id, phone):
    ref = "accounts/{}".format(user_id)
    cur = db.child(ref).get().val()
    cur["phone number"] = phone
    db.child(ref).update(cur)


def update_type(user_id, charity_type):
    ref = "accounts/{}".format(user_id)
    cur = db.child(ref).get().val()
    cur["type"] = charity_type
    db.child(ref).update(cur)