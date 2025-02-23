from database.connection import db
from datetime import datetime, timedelta

habits_collection = db["habits"]

# Sample user email and user_id
user_email = "test@example.com"
user_id = "user123"  # Add a unique user_id

# Generate past 10 days of habit tracking data
habit_history = []
for i in range(20):
    habit_history.append({
        "user_id": user_id,  # Add user_id to each document
        "user_email": user_email,
        "name": f"Morning Run {i+1}",  # Make name unique for each document
        "streak": i + 1,
        "timestamp": datetime.utcnow() - timedelta(days=i),
        "status": "completed" if i % 2 == 0 else "missed"  # Alternating pattern
    })

habits_collection.insert_many(habit_history)
print("Sample habit history inserted!")