import typesense

def create_charities_collection(client):
    charities_schema = {
        'name': 'charities',
        'fields': [
            {'name': 'email', 'type': 'string'},
            {'name': 'phone_number', 'type': 'string'},
            {'name': 'name', 'type': 'string'},
            {'name': 'type', 'type': 'string'}
        ],
        # 'default_sorting_field': 'name'
    }

    client.collections.create(charities_schema)
