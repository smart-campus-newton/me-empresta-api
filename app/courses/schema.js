const Schema = {
    'id': '/courses',
    'type': 'object',
    'properties': {
        'code': {
            'type': 'string'
        },
        'name': {
            'type': 'string',
            'minLength': 1
        },
        'status': {
            'type': 'string',
            'emun': ['active', 'inactive']
        }
    },
    'required': ['name']
}

module.exports = Schema;
