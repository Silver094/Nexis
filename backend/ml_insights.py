import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression
from scipy.stats import variation
from database.models import habits_collection

def get_user_habit_data(user_email):
    """Fetch user habit data from MongoDB"""
    habits = list(habits_collection.find({"user_email": user_email}, {"_id": 0, "streak": 1, "timestamp": 1}))

    if not habits:
        return None, None
    
    X = np.array(range(len(habits))).reshape(-1, 1)  # Days
    y = np.array([habit["streak"] for habit in habits])  # Streak counts

    return X, y

def calculate_consistency(y):
    """Analyze habit consistency using variation coefficient"""
    if len(y) < 2:
        return "Not enough data"

    consistency_score = variation(y)  # Coefficient of variation

    if consistency_score < 0.3:
        return "Highly Consistent"
    elif consistency_score < 0.7:
        return "Moderately Consistent"
    else:
        return "Inconsistent"

def cluster_habits(y):
    """Classify habits into clusters based on performance"""
    if len(y) < 3:
        return "Insufficient data for clustering"

    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    y_reshaped = np.array(y).reshape(-1, 1)
    kmeans.fit(y_reshaped)

    cluster_label = kmeans.predict(y_reshaped)[-1]  # Get user's latest cluster
    cluster_map = {0: "Weak", 1: "Moderate", 2: "Strong"}
    
    return cluster_map[cluster_label]

from database.connection import db

def generate_insights(user_email):
    print(f"Generating insights for: {user_email}")  # Debug log

    habits = list(db["habits"].find({"user_email": user_email}))
    print(f"Total habits found: {len(habits)}")  # Debug log

    if len(habits) < 5:  # Not enough data
        return {"message": "Not enough data for analysis"}

    # Simulate AI-based analysis (replace with ML logic later)
    completed = sum(1 for h in habits if h.get("status") == "completed")
    missed = sum(1 for h in habits if h.get("status") == "missed")

    print(f"Completed: {completed}, Missed: {missed}")  # Debug log

    return {
        "consistency_score": round(completed / (completed + missed) * 100, 2),
        "recommendation": "Try to maintain streaks on missed days."
    }

