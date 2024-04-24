import typesense
from typesense import Client
import os
import requests

# scheme of the post 
posts_schema = {
    'name': 'posts',
    'fields': [
        {'name': 'id', 'type': 'string'},
        {'name': 'charity_name', 'type': 'string'},  # NEW: name of the charity
        {'name': 'body', 'type': 'string'},
        {'name': 'preview_caption', 'type': 'string'},
    ]
}

# initializing necessary typesense variables
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

    try:
        # Check if 'posts' collection exists & all fields are matching
        existing_collection = client.collections['posts'].retrieve()
        existing_fields = existing_collection.get('fields', [])
        existing_field_names = [field['name'] for field in existing_fields if field['name'] != 'id']

        print("Existing schema fields:", existing_field_names)
        print("Posts schema fields:", [field['name'] for field in posts_schema['fields']])

        # Exclude 'id' field from the comparison
        posts_field_names = [field['name'] for field in posts_schema['fields'] if field['name'] != 'id']

        if all(field in existing_field_names for field in posts_field_names):
            print("Schema match, posts collection already exists!")
        else:
            client.collections['posts'].delete()
            print("Deleted 'posts' collection; schema mismatch")
    except typesense.exceptions.ObjectNotFound:
        # 'posts' collection doesn't exist
        pass

    existing_collections = client.collections.retrieve()
    existing_collection_names = [collection['name'] for collection in existing_collections]

    if 'posts' not in existing_collection_names:
        client.collections.create(posts_schema)
        print("Posts collection created!")
    else:
        print("Posts collection already exists!")

    # TODO: comment out when don't want to print documents in terminal
    export_documents("posts")

# exporting documents from typesense
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

# delete all the posts from the collectoin
def delete_collection():
    try:
        client.collections['posts'].delete()
        print("Existing 'posts' collection deleted successfully!")
    except Exception as e:
        print("Error deleting 'posts' collection:", e)

# edit typesense collections
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

# check if posts exists in typesense
def post_exists_in_typesense(document_id):
    try:
        client.collections['posts'].documents[document_id].retrieve()
        return True
    except typesense.exceptions.ObjectNotFound:
        return False

# adding data to typesense
def on_post_create(data):
    document = {
        'id': data.get('id', ''),
        'charity_name': str(data.get('charity_name', '')),
        'body': data.get('body', ''),
        'preview_caption': data.get('preview_caption', ''),
        'charity_type': data.get('charity_type', '')
    }
    
    client.collections['posts'].documents.create(document)

# update data in typesense
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
def search_documents(search_value):
    search_params = {
        'q': search_value,
        'query_by': 'body, charity_name, preview_caption',
    }
    search_results = client.collections['posts'].documents.search(search_params)
    return search_results