from flask import Flask
from flask_restful import Api, Resource


app = Flask(__name__)
api = Api(app)

users = {"melker" : {"age":18, "gender" : "male"},
         "bill" : {"age":70, "gender" : "male"}}


class User(Resource):
    def get(self, user_id):
        return users[user_id]

    def put(self, user_id):
        return
    
api.add_resource(User, "/user/<int:user_id>")

if __name__ == "__main__":
    app.run(debug=True)









# api = Api(app)
# @app.route("/get-user/<user_id>")
# def get_user(user_id):
#     user_data = {
#         "user_id" : user_id,
#         "name" : "John Doe",
#         "email" : "john.doe@example.com"
#     }

#     extra = request.args.get("extra")
#     if extra:
#         user_data["extra"] = extra
#     return jsonify(user_data), 200

# @app.route("/create-user", methods=["POST"])
# def create_user():
#     data = request.get_json()

#     return jsonify(data), 201

