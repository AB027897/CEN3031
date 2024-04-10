import typesense
from typesense import Client
import requests


def read_api_key_from_file():
    with open('typesense_api_key.txt', 'r') as file:
        return file.read().strip()

def init_typesense():
    global client

    api_key = read_api_key_from_file()
    
    client = Client({
        'nodes': [{
            'host': 'localhost',
            'port': '8108',
            'protocol': 'http'
        }],
        'api_key': api_key,
        'connection_timeout_seconds': 2
    })

    headers = {
    "Content-Type": "application/json",
    "X-TYPESENSE-API-KEY": "xyz"
    }

    url_charities = "http://localhost:8108/collections/charities/documents/export"

    response = requests.get(url_charities, headers=headers)

    if response.status_code == 200:
        print(response.text)
    else:
        print(f"Failed to export documents: {response.status_code}")


    url_posts = "http://localhost:8108/collections/posts/documents/export"

    response = requests.get(url_posts, headers=headers)

    if response.status_code == 200:
        print(response.text)
    else:
        print(f"Failed to export documents for posts: {response.status_code}")


   

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
    
    if charity_exists_in_typesense(document_id):
        on_charity_update(document)
    else:
        on_charity_create(document)

def charity_exists_in_typesense(document_id):
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


def on_post_change(data):
    post_id = data.get('post_id')
    charity_type = data.get('charity_type')
    title = data.get('title')
    preview_caption = data.get('preview_caption')
    body = data.get('body')
    
    document_id = post_id
    
    document = {
        'uuid': post_id,
        'charity_type': charity_type,
        'title': title,
        'preview_caption': preview_caption,
        'body': body
    }
    
    if post_exists_in_typesense(document_id):
        on_post_update(document)
    else:
        on_post_create(document)

def post_exists_in_typesense(document_id):
    try:
        client.collections['posts'].documents[document_id].retrieve()
        return True
    except typesense.exceptions.ObjectNotFound:
        return False

def on_post_create(data):
    document = {
        'id': data.get('uuid', ''),
        'title': data.get('title', ''),
        'body': data.get('body', ''),
        'preview_caption': data.get('preview_caption', ''),
        'charity_type': data.get('charity_type', '')
    }
    
    client.collections['posts'].documents.create(document)

def on_post_update(data):
    document = {
        'uuid': data.get('uuid', ''),
        'title': data.get('title', ''),
        'body': data.get('body', ''),
        'preview_caption': data.get('preview_caption', ''),
        'charity_type': data.get('charity_type', '')
    }
    
    client.collections['posts'].documents[data.get('uuid', '')].update(document)

# we can search by query_by, meaning for fields like title, preview_caption, name, etc
def search_documents(collection_names, search_value):
    results = []

    for collection_name in collection_names:
        search_params = {
            'q': search_value
        }
        search_results = client.collections[collection_name].documents.search(search_params)
        results.extend(search_results)

    return results
