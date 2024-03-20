import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Initialize Firebase Admin SDK
cred = credentials.Certificate("path/to/serviceAccountKey.json")  # Path to your service account key JSON file

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://donorgram-58b90-default-rtdb.firebaseio.com/'
})

# Get a reference to the Firebase Realtime Database
ref = db.reference()
user_id = "userID_1"  # Replace with the actual user ID

# Add post data
post_data = {
    'name': 'Samuel Kim',
    'age': 19
}

# Push the post data under the specified user's posts node
post_ref = ref.child('users').child(user_id).child('user_data').push()
post_ref.set(post_data)