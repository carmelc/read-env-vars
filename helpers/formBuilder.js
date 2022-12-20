export const formBuilder = () => {
    return {
        form: {
            namespace: 'wix.forms.form',
            fields: [
                {
                    id: '3add679b-c9c0-4db5-b75e-c5a8199cdf14',
                    target: 'first_name',
                    view: {'fieldType': 'CONTACTS_FIRST_NAME', 'label': 'First name'},
                    validation: {'string': {}},
                    pii: true
                },
                {
                    id: 'ce4e13f0-ab9c-4438-8f28-50ae0c70a9e0',
                    target: 'last_name',
                    view: {'fieldType': 'CONTACTS_LAST_NAME', 'label': 'Last name'},
                    validation: {'string': {}},
                    pii: true
                },
                {
                    id: '7fc95c23-c309-418c-b862-11c4a7bda68d',
                    target: 'email',
                    view: {'fieldType': 'CONTACTS_EMAIL', 'label': 'Email'},
                    validation: {'string': {format: 'EMAIL'}},
                    pii: true
                },
                {
                    id: 'efdb0296-972a-4b2a-a78d-913823cd5ad6',
                    target: 'subject',
                    view: {'fieldType': 'TEXT_INPUT', 'label': 'Subject'},
                    validation: {'string': {}},
                    pii: false
                },
                {
                    id: 'e24f13d3-ee44-46c1-b2c5-f0842fe07996',
                    target: 'description',
                    view: {'fieldType': 'TEXT_AREA', 'label': 'Description'},
                    validation: {'string': {}},
                    pii: false
                }
            ],
            postSubmissionTriggers: {
                upsertContact: {
                    fieldsMapping: {
                        first_name: {contactField: 'FIRST_NAME'},
                        last_name: {contactField: 'LAST_NAME'},
                        email: {contactField: 'EMAIL', emailInfo: {tag: 'UNTAGGED'}},
                    },
                },
            },
        }
    }
}
