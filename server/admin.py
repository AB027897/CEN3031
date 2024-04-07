import firebase_admin
from firebase_admin import credentials, auth

credentials = credentials.Certificate("./serviceAccount.json")
firebase_admin = firebase_admin.initialize_app(credentials)

def update_email(user_id, new_email):
    try:
        user = auth.update_user(user_id, email = new_email)
        return True
    except Exception as e:
        print('Error updating user:', e)
        return False