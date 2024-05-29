#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

users = [
    {"name": "Alice", "email": "alice@outlook.com","age": 18, "favoriteColor": "blue",},
    {"name": "Erik", "email": "erik@forsum.se","age": 19, "favoriteColor": "blue",},
    {"name": "Michael", "email": "michael@safari.se","age": 20, "favoriteColor": "blue",},
    {"name": "Melker", "email": "melker@safari.se","age": 18, "favoriteColor": "blue",}
]

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5000"])

@app.route('/users', methods=['GET'])
def search_user():
    user_query = str(request.args.get('query')) #/users?query=alice
    response_list = []
    for user in users:
        if user_query.lower() in user["email"].split("@")[0].lower() or user_query.lower() in user["name"].lower():
            response_list.append(user)    

    if len(response_list) > 0:
        response = jsonify(response_list)
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
        return response
    else:
        return jsonify({'error': 'User not found'})

@app.route('/users/<name>', methods=['GET'])
def search_name(name):
    found_users = list(filter(lambda p: p.get("name").lower() == name.lower(), users))
    if len(found_users ) > 1:
        return jsonify({'error': 'Found to many users'})
    elif len(found_users) == 0:
        return jsonify({'error': 'Found no users'})
    else:
        response = jsonify(found_users[0])
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
        return response
    
app.run()