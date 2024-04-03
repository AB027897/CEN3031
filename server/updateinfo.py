import firebase_admin
from firebase_admin import credentials, auth


def update_email(user_id, new_email):
    try:
        user = auth.update_user(user_id, email = new_email)
        ref = db.child("accounts").child(user_id)
        ref.update({"email": new_email})
    except Exception as e:
        print('Error updating user:', e)