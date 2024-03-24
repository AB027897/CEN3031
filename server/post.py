import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


cred = credentials.Certificate('key.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://donorgram-58b90-default-rtdb.firebaseio.com/'
})


def add_donor(user_id, name, email, phone, dob):
    ref = db.reference('/donors' + user_id)
    data = {
        'name': name,
        'email': email,
        'phone number': phone,
        'date of birth': dob
    }

    post = ref.child('info').push()
    post.set(data)
    return


def add_charity(user_id, name, email, phone, dob):
    ref = db.reference('/donors/' + user_id)
    data = {
        'name': name,
        'email': email,
        'phone number': phone,
        'date of birth': dob
    }
    post = ref.child('info').push()
    post.set(data)


def add_post(user_id, title, preview_caption, body):
    ref = db.reference('/charities/' + user_id)
    data = {
        'title': title,
        'preview_caption': preview_caption,
        'body': body,
    }

    post_ref = ref.child('post')
    post_data = post_ref.get()

    if post_data:
        post_data.update(data)
        post_ref.set(data)

    else:
        post = ref.child('charities').child(user_id).child('post').push()
        post.set(data)
