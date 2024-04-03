from firebase import get_firebase
import secrets

def init_database():
    global firebase_app
    global db
    global storage
    firebase_app = get_firebase()
    db = firebase_app.database()
    storage = firebase_app.storage()


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


def add_post(uuid, charity_type, title, preview_caption, body, token):
    data = {
        'title': title,
        'preview_caption': preview_caption,
        'body': body,
        'n': 0
    }
    post_ref = db.child("posts").child(charity_type).child(uuid)
    posts = post_ref.get().val()
 
    if posts:
        remove_post(uuid, charity_type)
        db.child("posts").child(charity_type).child(uuid).set(data, token=token)
    else:
        db.child("posts").child(charity_type).child(uuid).set(data, token=token)

def get_post(uuid, charity_type, token):
    posts = db.child("posts").child(charity_type).child(uuid).get(token=token).val()
    if posts:
        return posts
    return ""


def remove_post(uuid, charity_type):
    data = db.child("posts").child(charity_type).child(uuid).get().val()
    n = data.get("n")

    for i in range(n):
        path = "{}/{}".format(uuid,"image{}".format(i)) + ".png"
        print(path)
        remove_image(path)

    data_ref = db.child("posts").child(charity_type).child(uuid)
    data_ref.remove()

def upload_image(uuid, charity_type, token, local_file_path):
    try:
        data = db.child("posts").child(charity_type).child(uuid).get(token=token).val()
        n = data.get("n")
        file_name = "image{}".format(n)

        path = "{}/{}".format(uuid, file_name)
        storage.child("images/"+path+".png").put(local_file_path, token=token)
        db.child("posts").child(charity_type).child(uuid).update({"image{}".format(str(n)):path}, token=token)
        db.child("posts").child(charity_type).child(uuid).update({"n": n + 1}, token=token)

    except Exception as e:
        print("Error:", e)


def remove_image(path, token):
    try:
        storage.delete("images/" + path, token)
    except Exception as e:
        print("Error removing image from storage:", e)
