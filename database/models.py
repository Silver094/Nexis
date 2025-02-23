from datetime import datetime
from database.connection import db

# Collections
users_collection = db["users"]
habits_collection = db["habits"]
insights_collection = db["insights"]

def insert_habit(user_id, habit_name, duration=0, status="pending"):
    """Insert a new habit only if it doesn’t already exist"""
    if not habit_name:
        return {"error": "Habit name cannot be empty"}

    existing_habit = habits_collection.find_one({"user_id": user_id, "habit_name": habit_name})

    if existing_habit:
        return {"error": "Habit already exists for this user"}

    habit_data = {
        "user_id": user_id,
        "habit_name": habit_name,
        "timestamp": datetime.utcnow(),
        "duration": duration,
        "status": status
    }

    habits_collection.insert_one(habit_data)
    return {"message": "Habit inserted successfully"}

