# vue-js-3-rails-restful-api-collection

This is an example of vuejs 3 application access to Rails RESTFul API. It allows retrive items, edit and add new rows.
All code is written using Composition API.
Bootstrap 5 is used for layout.

## Usage

list_url - collection index url, for example '/posts'

item_name - name of an item for POST and PATCH requests

fields - an array of hashes containing information about fields

    example:
    [
      { input_type: 'string', input_field: 'name' },
      { input_type: 'string', input_field: 'content' },
    ]
(input_type is not used yet)
