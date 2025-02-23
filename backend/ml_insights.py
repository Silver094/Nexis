import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression
from scipy.stats import variation
from database.models import habits_collection

def get_user_habit_data(user_id):
    """Fetch user habit data from MongoDB"""
    habits = list(habits_collection.find({"user_id": user_id}, {"_id": 0, "streak": 1, "timestamp": 1}))

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

def generate_insights(user_id):
    """Generate ML-based habit insights"""
    X, y = get_user_habit_data(user_id)

    if X is None or y is None:
        return {"message": "Not enough data for analysis"}

    model = LinearRegression()
    model.fit(X, y)

    # Predict next week's streaks
    future_X = np.array(range(len(X), len(X) + 7)).reshape(-1, 1)
    predictions = model.predict(future_X)

    insights = {
        "trend": "Increasing" if model.coef_[0] > 0 else "Decreasing",
        "next_week_prediction": predictions.tolist(),
        "habit_consistency": calculate_consistency(y),
        "habit_strength": cluster_habits(y),
    }

    return insights
