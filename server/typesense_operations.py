import typesense
from typesense import Client
import os
import requests

posts_schema = {
    'name': 'posts',
    'fields': [
        {'name': 'id', 'type': 'string'},
        {'name': 'charity_name', 'type': 'string'},  # NEW: name of the charity
        {'name': 'body', 'type': 'string'},
        {'name': 'preview_caption', 'type': 'string'},
    ]
}

def init_typesense():
    global client

    api_key = os.getenv("TYPESENSE_API_KEY")
    
    client = Client({
        'nodes': [{
            'host': 'localhost',
            'port': '8108',
            'protocol': 'http'
        }],
        'api_key': api_key,
        'connection_timeout_seconds': 2
    })

    # TODO: comment out below if do NOT want to delete collections!
    # delete_collection()

    existing_collections = client.collections.retrieve()
    existing_collection_names = [collection['name'] for collection in existing_collections]

    if 'posts' not in existing_collection_names:
        client.collections.create(posts_schema)
        print("Posts collection created!")
    else:
        print("Posts collection already exists!")

    # TODO: comment out when don't want to print documents
    export_documents("posts")

    # TODO: comment out when don't want to print size of collections
    # get_collection_size("posts")


def export_documents(collection_name):
    api_key = os.getenv("TYPESENSE_API_KEY")
    headers = {
        "Content-Type": "application/json",
        "X-TYPESENSE-API-KEY": api_key
    }
    url = f"http://localhost:8108/collections/{collection_name}/documents/export"

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(f"Documents for {collection_name}:")
        print(response.text)
    else:
        print(f"Failed to export documents for {collection_name}: {response.status_code}")   


# def get_collection_size(collection_name):
#     api_key = os.getenv("TYPESENSE_API_KEY")
#     base_url = 'http://localhost:8108'

#     url = f"{base_url}/collections/{collection_name}/documents"
#     headers = {"Content-Type": "application/json", "X-TYPESENSE-API-KEY": api_key}

#     response = requests.get(url, headers=headers)

#     if response.status_code == 200:
#         documents = response.json()
#         collection_size = len(documents)
#         print(f"Number of documents in collection '{collection_name}': {collection_size}")
#         return collection_size
#     else:
#         print(f"Failed to fetch documents for collection '{collection_name}': {response.status_code}")

def delete_collection():
    try:
        client.collections['posts'].delete()
        print("Existing 'posts' collection deleted successfully!")
    except Exception as e:
        print("Error deleting 'posts' collection:", e)

def on_post_change(data):
    post_id = data.get('id')
    charity_type = data.get('charity_type')
    charity_name = data.get('charity_name')
    preview_caption = data.get('preview_caption')
    body = data.get('body')
    
    document_id = post_id
    
    document = {
        'id': post_id,
        'charity_type': charity_type,
        'charity_name': charity_name,
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
        'id': data.get('id', ''),
        'charity_name': str(data.get('charity_name', '')),
        'body': data.get('body', ''),
        'preview_caption': data.get('preview_caption', ''),
        'charity_type': data.get('charity_type', '')
    }
    
    client.collections['posts'].documents.create(document)


def on_post_update(data):
    document = {
        'id': data.get('id', ''),
        'charity_name': str(data.get('charity_name', '')),
        'body': data.get('body', ''),
        'preview_caption': data.get('preview_caption', ''),
        'charity_type': data.get('charity_type', '')
    }
    
    client.collections['posts'].documents[data.get('id', '')].update(document)


# we can search by query_by, meaning for fields like preview_caption, name, etc
def search_documents(collection_names, search_value):
    results = []

    for collection_name in collection_names:
        search_params = {
            'q': search_value,
            'query_by': "name",
        }
        search_results = client.collections[collection_name].documents.search(search_params)
        results.extend(search_results)
        print(search_results)    
    return results