import typesense
from typesense import Client
import requests

def init_typesense():
    global client
    
    client = Client({
        'nodes': [{
            'host': 'localhost',
            'port': '8108',
            'protocol': 'http'
        }],
        'api_key': 'xyz',
        'connection_timeout_seconds': 2
    })   

    headers = {
    "Content-Type": "application/json",
    "X-TYPESENSE-API-KEY": "xyz"
    }

    url = "http://localhost:8108/collections/charities/documents/export"

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        # Print the exported documents in JSONL format
        print(response.text)
    else:
        # Print an error message if the request failed
        print(f"Failed to export documents: {response.status_code}")


    
    # # Define the schema for the "charities" collection
    # charities_schema = {
    #     'name': 'charities',
    #     'fields': [
    #         {'name': 'id', 'type': 'string'},
    #         {'name': 'email', 'type': 'string'},
    #         {'name': 'name', 'type': 'string'},
    #         {'name': 'phone number', 'type': 'string'},
    #         {'name': 'type', 'type': 'string'}  # Type of charity
    #     ]
    # }

    # # Define the schema for the "posts" collection
    # posts_schema = {
    #     'name': 'posts',
    #     'fields': [
    #         {'name': 'id', 'type': 'string'},
    #         {'name': 'body', 'type': 'string'},
    #         {'name': 'n', 'type': 'string[]'},  # Array of photo URLs
    #         {'name': 'preview_caption', 'type': 'string'},
    #         {'name': 'title', 'type': 'string'}
    #     ]
    # }
    

    # #  # Create the collections with defined schemas
    # client.collections.create(charities_schema)
    # client.collections.create(posts_schema)

def on_charity_change(data):
    user_id = data.get('user_id')
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone number')
    charity_type = data.get('type')
    
    document_id = user_id
    
    document = {
        'id': user_id,
        'name': name,
        'email': email,
        'phone number': phone,
        'type': charity_type
    }
    
    if document_exists_in_typesense(document_id):
        on_charity_update(document)
    else:
        on_charity_create(document)

def document_exists_in_typesense(document_id):
    try:
        client.collections['charities'].documents[document_id].retrieve()
        return True
    except typesense.exceptions.ObjectNotFound:
        return False


def on_charity_create(data):

    document = {
        'id': data.get('id', ''),
        'name': data.get('name', ''),
        'email': data.get('email', ''),
        'phone number': data.get('phone number', ''),
        'type': data.get('type', '')
    }
    
    client.collections['charities'].documents.create(document)


def on_charity_update(data):
    document = {
        'id': data.get('id', ''),
        'name': data.get('name', ''),
        'email': data.get('email', ''),
        'phone number': data.get('phone number', ''),
        'type': data.get('type', '')
    }
    
    client.collections['charities'].documents[data.get('id', '')].update(document)


def on_post_create(post_data):
    document = {
        # 'n': post_data['n'],
        'body': post_data['body'],
        'preview_caption': post_data['preview_caption'],
        'title': post_data['title']
    }
    client.collections['posts'].documents.create(document)

def on_post_update(post_data):
    document = {
        'title': post_data['title'],
        'body': post_data['body'],
        'preview_caption': post_data.get('preview_caption', ''),
        # 'n': post_data['n'],
    }
    client.collections['posts'].documents(post_data['id']).update(document)


def on_charity_delete(event):
    document_id = event.path.split('/')[-1]
    client.collections['charities'].documents.delete(document_id)


def on_post_delete(post_id):
    client.collections['posts'].documents(post_id).delete()



def search_documents(collection_name, search_value, query_by):
    search_params = {
        'q': search_value,
        'query_by': query_by
    }
    search_results = client.collections[collection_name].documents.search(search_params)
    return search_results