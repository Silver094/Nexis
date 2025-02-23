from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from database.models import users_collection, habits_collection
from backend.ml_insights import generate_insights

# Create a Blueprint (modular API routes)
routes = Blueprint("routes", __name__)

# 🟢 User Registration
@routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    print(data)
    

    # Check if user exists
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 409

    # Hash password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Store user
    users_collection.insert_one({"email": email, "password": hashed_password})

    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token}), 200

# 🔵 User Login
@routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    # Generate JWT token
    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token}), 200

# 🟢 Create a Habit (Authenticated)
@routes.route("/habits", methods=["POST"])
@jwt_required()
def create_habit():
    user_email = get_jwt_identity()
    data = request.get_json()
    habit_name = data.get("name")

    # Check if habit already exists
    if habits_collection.find_one({"user_email": user_email, "name": habit_name}):
        return jsonify({"message": "Habit already exists"}), 400

    habits_collection.insert_one({"user_email": user_email, "name": habit_name, "streak": 0})
    return jsonify({"message": "Habit added successfully"}), 201

# 🔵 Get All Habits (Authenticated)
@routes.route("/habits", methods=["GET"])
@jwt_required()
def get_habits():
    user_email = get_jwt_identity()
    habits = list(habits_collection.find({"user_email": user_email}, {"_id": 0}))
    return jsonify(habits), 200

# 🟠 Update Habit Streak (Authenticated)
@routes.route("/habits/<habit_name>", methods=["PUT"])
@jwt_required()
def update_habit(habit_name):
    user_email = get_jwt_identity()
    habits_collection.update_one({"user_email": user_email, "name": habit_name}, {"$inc": {"streak": 1}})
    return jsonify({"message": "Habit updated successfully"}), 200

# 🔴 Delete a Habit (Authenticated)
@routes.route("/habits/<habit_name>", methods=["DELETE"])
@jwt_required()
def delete_habit(habit_name):
    user_email = get_jwt_identity()
    habits_collection.delete_one({"user_email": user_email, "name": habit_name})
    return jsonify({"message": "Habit deleted successfully"}), 200

@routes.route("/api/insights", methods=["GET"])
@jwt_required()
def get_user_insights():
    user_email = get_jwt_identity()
    insights = generate_insights(user_email)  # Function from ml_insights.py
    return jsonify({"insights": insights})

