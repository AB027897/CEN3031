from firebase import get_firebase
import secrets

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


def add_account(user_id, token, account_type, name="", email="", phone="", dob="", charity_type=""):
    if account_type == "donor":
        add_donor(user_id, account_type, name, email, phone, dob, token)
    else:
        add_charity(user_id, account_type, name, email, phone, charity_type, token)

def get_account(user_id, token):
    user_info = db.child("accounts").child(user_id).get(token=token)
    return user_info.val()


def add_post(user_id, title, preview_caption, body):
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