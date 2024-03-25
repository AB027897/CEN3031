from firebase import get_firebase

firebase = get_firebase()
db = firebase.database()


def add_donor(user_id, name, email, phone, dob):
    data = {
        'name': name,
        'email': email,
        'phone number': phone,
        'date of birth': dob
    }
    db.child("donors").child(user_id).child('info').set(data)


def add_charity(user_id, name, email, phone, dob):
    data = {
        'name': name,
        'email': email,
        'phone number': phone,
        'date of birth': dob
    }
    db.child("charities").child(user_id).child('info').set(data)


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
            