from firebase import get_firebase
import secrets
from typesense_operations import *

def init_database():
    global firebase_app
    global db
    firebase_app = get_firebase()
    db = firebase_app.database()


def add_donor(user_id, account_type, name, email, phone, dob, token):
    data = {
        'account type' : account_type,
        'name': name,
        'email': email,
        'phone number': phone,
        'dob': dob
    }
    db.child("accounts").child(user_id).set(data, token = token)


def add_charity(user_id, account_type, name, email, phone, charity_type, token):
    data = {
        'account type' : account_type,
        'name': name,
        'email': email,
        'phone number': phone,
        'type': charity_type
    }    
    db.child("accounts").child(user_id).set(data, token=token)

    typesense_data = {
        'user_id' : str(user_id),
        'name': name,
        'email': email,
        'phone number': phone,
        'type': charity_type
    }    
    if all(typesense_data.values()):
        on_charity_change(typesense_data)

def add_account(user_id, token, account_type, name="", email="", phone="", dob="", charity_type=""):
    if account_type == "donor":
        add_donor(user_id, account_type, name, email, phone, dob, token)
    else:
        add_charity(user_id, account_type, name, email, phone, charity_type, token)

def get_account(user_id, token):
    user_info = db.child("accounts").child(user_id).get(token=token)
    return user_info.val()


def add_post(user_id, post_type, title, preview_caption, body):
    data = {
        'title': title,
        'preview_caption': preview_caption,
        'body': body,
        'n': 0,
    }

def get_post(user_id, type):
    post_data = db.child("posts").child(type).child(user_id).get().val()
    return post_data

def remove_post(type, user_id):
    data = db.child("posts").child(type).child(user_id).get().val()
    n = data.get("n")

    for i in range(n):
        str = data.get("image{}".format(i))
        remove_image(str)

    data_ref = db.child("posts").child(type).child(user_id)
    data_ref.remove()
    
    on_post_delete(user_id)


# def add_image(type, user_id, local_file_path):
#     try:
#         data = db.child("posts").child(type).child(user_id).get().val()
#         n = data.get("n")
#         file_name = "image{}".format(n)

#         path = "{}/{}".format(user_id, file_name)
#         storage.child(path).put(local_file_path)
#         db.child("posts").child(type).child(user_id).update({"image{}".format(str(n)):path})
#         db.child("posts").child(type).child(user_id).update({"n": n + 1})

#     except Exception as e:
#         print("Error:", e)

# def get_image(user_id, post_type, image_data):
    # try:
    #     data = db.child("posts").child(post_type).child(user_id).get().val()
    #     n = data.get("n")
    #     file_name = f"image{n}"

    #     path = f"{user_id}/{file_name}"

    #     storage.child(path).put(image_data)

    #     image_url = storage.child(path).get_url(None)

    #     return image_url
    # except Exception as e:
    #     print("Error:", e)
    #     return None


def remove_image(path):
    token = secrets.token_hex(32)
    try:
        storage.delete(path, token)
    except Exception as e:
        print("Error removing image from storage:", e)