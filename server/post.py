from firebase import get_firebase

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
        'date of birth': dob
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
    }
    post_ref = db.child("charities").child(user_id).child("post")
    posts = post_ref.get().val()
 
    if posts:
        for post_id, post_data in posts.items():
            post_ref = db.child("charities").child(user_id).child("post").child(post_id)
            post_ref.remove()
            db.child("charities").child(user_id).child('post').set(data)
    else:
        db.child("charities").child(user_id).child('post').set(data)


def remove_post(user_id):
    post_ref = db.child("charities").child(user_id).child("post")
    posts = post_ref.get().val()
   
    if posts:
        for post_id, post_data in posts.items():
            post_ref = db.child("charities").child(user_id).child("post").child(post_id)
            post_ref.remove()
            