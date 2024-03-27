# from typesense import Client as TypesenseClient
# from firebase import get_firebase

# # Initialize Firestore client
# firebase = get_firebase()
# db = firebase.database()

# client = TypesenseClient({
#         'nodes': [{
#             'host': 'ul1p783ztkoredcyp-1.a1.typesense.net',
#             'port': '443',
#             'protocol': 'https'
#         }],
#         'api_key': 'WFwOG63UuT4s6AyZZKUfb2w9Z41AQrOh',
#         'connection_timeout_seconds': 2
#     })

    
# # Define the schema for the "charities" collection
# charities_schema = {
#     'name': 'charities',
#     'fields': [
#         {'name': 'id', 'type': 'string'},
#         {'name': 'name', 'type': 'string'},
#         {'name': 'email', 'type': 'string'},
#         {'name': 'phone_number', 'type': 'string'},
#         {'name': 'type', 'type': 'string'},
#         {'name': 'post_title', 'type': 'string'},
#         {'name': 'post_body', 'type': 'string'},
#         {'name': 'preview_caption', 'type': 'string'}
#     ]
# }

# # Create the collection with the defined schema
# client.collections.create(charities_schema)


# # Function to index a new document to Typesense
# def on_charity_create(event, context):
#     # Get the document ID and data from the event
#     charity_id = context.resource.split('/')[-1]
#     charity_data = event['value']

#     # Index the document in Typesense
#     index_charity_data(charity_id, charity_data)


# # Function to update an existing document in Typesense
# def on_charity_update(event, context):
#     # Get the document ID and updated data from the event
#     charity_id = context.resource.split('/')[-1]
#     charity_data = event['value']

#     # Update the document in Typesense
#     update_charity_data(charity_id, charity_data)


# # Function to delete a document from Typesense
# def on_charity_delete(event, context):
#     # Get the document ID from the event
#     charity_id = context.resource.split('/')[-1]

#     # Delete the document from Typesense
#     delete_charity_data(charity_id)


# def index_charity_data(client, user_data):
#     try:
#         # index the user's info data
#         info_data = user_data['info']
#         identifier = next(iter(info_data))  # get user's identifier key
#         info_document = {
#             'userID': identifier,
#             'email': info_data[identifier].get('email', ''),
#             'name': info_data[identifier].get('name', ''),
#             'phone_number': info_data[identifier].get('phone number', ''),
#             'type': info_data[identifier].get('type', '')
#         }
#         client.collections['charities'].documents.create(info_document)

#         # index the user's post data
#         post_data = user_data['post']
#         post_document = {
#             'userID': identifier,
#             'post_title': post_data.get('title', ''),
#             'post_body': post_data.get('body', ''),
#             'preview_caption': post_data.get('preview_caption', '')
#         }
#         client.collections['charities'].documents.create(post_document)

#         print("User data indexed successfully.")
#     except Exception as e:
#         print(f"Error indexing user data: {str(e)}")


# # Function to update charity data in Typesense
# def update_charity_data(charity_id, charity_data):
#     # Get the updated data for the document
#     updated_document = {
#         'name': charity_data.get('name', ''),
#         'email': charity_data.get('email', ''),
#         'phone_number': charity_data.get('phone number', ''),
#     }

#     # Update the document in Typesense
#     client.collections['charities'].documents(charity_id).update(updated_document)


# # Function to delete charity data from Typesense
# def delete_charity_data(charity_id):
#     # Delete the document from Typesense
#     client.collections['charities'].documents(charity_id).delete()


# def search_charities(query):
#     try:
#         # Perform the search query on the Realtime Database
#         # Use 'contains' operator for partial matching
#         results = db.child("charities").order_by_child("name").start_at(query).end_at(query + "\uf8ff").get()
        
#         # Convert the result to a list of dictionaries
#         search_results = [charity.val() for charity in results.each()]

#         return search_results
#     except Exception as e:
#         print(f"Error searching charities: {str(e)}")
#         return None
