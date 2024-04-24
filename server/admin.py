import firebase_admin
from firebase_admin import credentials, auth

#credentials for firebase
credentials = credentials.Certificate("./serviceAccount.json")

#initializing firebase admin app (has access to email/pw update)
firebase_admin = firebase_admin.initialize_app(credentials)

#updating email to new_email
def update_email(user_id, new_email):
    try:
        user = auth.update_user(user_id, email = new_email)
    except Exception as e:
        print('Error updating user:', e)
        return str(e)