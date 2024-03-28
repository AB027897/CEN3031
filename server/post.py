import pyrebase
import os
import secrets
from firebase import get_firebase

cred = {
    "apiKey": os.getenv("API_KEY"),
    "authDomain": os.getenv("AUTH_DOMAIN"),
    "projectId": os.getenv("PROJECT_ID"),
    "storageBucket": os.getenv("STORAGE_BUCKET"),
    "messagingSenderId": os.getenv("MESSAGING_SENDER_ID"), 
    "appId": os.getenv("APP_ID"),
    "measurementId": os.getenv("MEASUREMENT_ID"),
    "databaseURL": os.getenv("DATABASE_URL")
}

firebase = get_firebase()
db = firebase.database()
storage = firebase.storage()
auth = firebase.auth()


def add_account(user_id, name, email, phone, dob):
    data = {
        'name': name,
        'email': email,
        'phone number': phone,
        'dob': dob
    }
    db.child("accounts").child(user_id).child('info').set(data)


def add_post(type, name, title, preview_caption, body):
    data = {
        'title': title,
        'preview_caption': preview_caption,
        'body': body,
        'n': 0
    }
    post_ref = db.child("posts").child(type).child(name)
    posts = post_ref.get().val()
 
    if posts:
        remove_post(type, user_id)
        db.child("posts").child(type).child(name).set(data)
    else:
        db.child("posts").child(type).child(name).set(data)


def remove_post(type, name):
    data = db.child("posts").child(type).child(name).get().val()
    n = data.get("n")

    for i in range(n):
        str = data.get("image{}".format(i))
        remove_image(str)

    data_ref = db.child("posts").child(type).child(name)
    data_ref.remove()

def upload_image(type, name, local_file_path):
    try:
        data = db.child("posts").child(type).child(name).get().val()
        n = data.get("n")
        file_name = "image{}".format(n)

        path = "{}/{}".format(user_id, file_name)
        storage.child(path).put(local_file_path)
        db.child("posts").child(type).child(name).update({"image{}".format(str(n)):path})
        db.child("posts").child(type).child(name).update({"n": n + 1})

    except Exception as e:
        print("Error:", e)


def remove_image(path):
    token = secrets.token_hex(32)
    try:
        storage.delete(path, token)
    except Exception as e:
        print("Error removing image from storage:", e)