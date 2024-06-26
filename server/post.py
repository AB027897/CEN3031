from firebase import get_firebase
from admin import *
from financial import *
from typesense_operations import *
import filetype

# initialize the database
def init_database():
    global firebase_app
    global db
    global storage
    firebase_app = get_firebase()
    db = firebase_app.database()
    storage = firebase_app.storage()

# adding donor using account information
def add_donor(user_id, account_type, name, email, phone, dob, preferences, token):
    data = {
        'account type' : account_type,
        'name': name,
        'email': email,
        'phone number': phone,
        'dob': dob,
        'preferences': preferences
    }
    # update using firebase_admin
    error = update_email(user_id, email)
    if type(error) != str:
        # add to firebase database
        db.child("accounts").child(user_id).set(data, token = token)
    else:
        return error
   
# adding charity using account information
def add_charity(user_id, account_type, name, email, phone, charity_type, id, token):
    data = {
        'account type' : account_type,
        'name': name,
        'email': email,
        'phone number': phone,
        'type': charity_type,
        'id': id
    }
    # update user's email using firebase_admin
    error = update_email(user_id, email)
    if type(error) != str:
        # add to firebase database
        db.child("accounts").child(user_id).set(data, token=token)
    else:
        return error

# adding account in general using account information
def add_account(user_id, token, account_type, name="", email="", phone="", dob="", charity_type="", account_number="", routing_number="", country="", preferences=""):
    if account_type == "donor":
        return add_donor(user_id, account_type, name, email, phone, dob, preferences, token)
    else:
        account_info = get_account(user_id, token)
        id = ""
        if account_info != None:
            try:
                id = account_info["id"]
                if id == "":
                    raise Exception("Invalid id")
            except:
                # create charity account based on country
                account = create_charity_account(email, country)
                if type(account) == str:
                    return account
                id = account["id"]
                # create bank account based on country
                bank_account = create_bank_account(id, account_number, routing_number, country)
                print(bank_account)
                if type(bank_account) == str:
                    return bank_account
        return add_charity(user_id, account_type, name, email, phone, charity_type, id, token)

# access account using user_id
def get_account(user_id, token):
    user_info = db.child("accounts").child(user_id).get(token=token)
    return user_info.val()

# adding posts to the charity
def add_post(uuid, charity_type, title, preview_caption, body, token):
    data = {
        'title': title,
        'preview_caption': preview_caption,
        'body': body,
        'n': 0,
    }
    # reference to the post 
    post_ref = db.child("posts").child(charity_type).child(uuid)
    posts = post_ref.get().val()
    if posts:
        # if there already is one, remove the previous post 
        remove_post(uuid, charity_type, token)
        # adding post to firebase database
        db.child("posts").child(charity_type).child(uuid).set(data, token=token)
    else:
        # adding post to firebase database
        db.child("posts").child(charity_type).child(uuid).set(data, token=token)

    charity_info = get_account(uuid, token)
    charity_name = charity_info.get('name', '')

    typesense_data = {
        'id' : uuid,
        'charity_type': charity_type,
        'charity_name': charity_name,
        'preview_caption': preview_caption,
        'body': body
    }    
    # update the typesense database
    on_post_change(typesense_data)

# retrieve post of user
def get_post(uuid, charity_type, token):
    posts = db.child("posts").child(charity_type).child(uuid).get(token=token).val()
    if posts:
        return posts
    return ""

# removing posts and corresponding images of user
def remove_post(uuid, charity_type, token):
    data = db.child("posts").child(charity_type).child(uuid).get(token=token).val()
    n = data.get("n")
    for i in range(n):
        path = "{}/{}".format(uuid,"image{}".format(i)) + ".png"
        remove_image(path, token)
    data_ref = db.child("posts").child(charity_type).child(uuid)
    data_ref.remove(token=token)

# upload image to the charity post using firebase storage
def upload_image(uuid, charity_type, token, local_file_path):
    try:
        data = db.child("posts").child(charity_type).child(uuid).get(token=token).val()
        n = data.get("n")
        file_name = "image{}".format(n)
        path = "{}/{}".format(uuid, file_name)
        # Need to fix the security of firebase storage to allow for tokens
        # update firebase storage
        storage.child("images/"+path+".png").put(local_file_path, content_type=filetype.guess(local_file_path).mime)
        db.child("posts").child(charity_type).child(uuid).update({"image{}".format(str(n)):path}, token=token)
        db.child("posts").child(charity_type).child(uuid).update({"n": n + 1}, token=token)
    except Exception as e:
        print("Error:", e)

# removing image from firebase storage
def remove_image(path, token):
    try:
        storage.delete("images/" + path, token)
    except Exception as e:
        print("Error removing image from storage:", e)

# get all the images of a particular post
def get_images(uuid, charity_type, token):
    arr = []
    post = get_post(uuid, charity_type, token)
    for i in range(int(post["n"])):
        path = "{}/{}/{}".format("images", uuid, "image"+str(i)+".png")
        url = storage.child(path).get_url(token=token)
        arr.append(url)
    return arr

# get all the posts of a charity type
def get_all_posts(charity_type = None):
    if charity_type != None:
        charity_posts = db.child("posts/" + charity_type).get()
        posts = []
        for charity in charity_posts:
            uuid = charity.key()
            charity_type = get_account(uuid, "")["type"]
            name = db.child("accounts/"+uuid+"/name").get().val()
            preview_caption = charity.val()["preview_caption"]
            data = {
                "uuid": uuid,
                "title": name,
                "preview_caption": preview_caption,
                "type": charity_type
            }
            posts.append(data)
        return posts
    else:
        all_charities = db.child("posts").get()
        posts = []
        for charity in all_charities.each():
            charity_type = charity.key()
            for uuid, post_data in charity.val().items():
                if isinstance(post_data, dict):
                    name = db.child("accounts/"+uuid+"/name").get().val()
                    preview_caption = post_data.get("preview_caption", "")
                    body = post_data.get("body", "")
                    typesense_data = {
                        'id': uuid,
                        'charity_type': charity_type,
                        'charity_name': name,
                        'preview_caption': preview_caption,
                        'body': body
                    }
                    # also update the typesense database
                    on_post_change(typesense_data)