import pandas as pd
import numpy as np
from database.models import habits_collection

def get_habit_data(user_email):
    """Fetch user's habit history from MongoDB"""
    habits = list(habits_collection.find({"user_email": user_email}))
    
    df = pd.DataFrame(habits)
    
    if df.empty:
        return None

    # Convert timestamp to datetime format
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    
    # Extract features (day of week, time of day, success rate)
    df["hour"] = df["timestamp"].dt.hour
    df["day_of_week"] = df["timestamp"].dt.day_name()
    df["success"] = df["status"].apply(lambda x: 1 if x == "completed" else 0)

    return df
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

def train_model(user_email):
    """Train an ML model to predict best habit times"""
    df = get_habit_data(user_email)
    if df is None:
        return "Not enough data"

    # Select features (hour, day_of_week)
    X = df[["hour"]]
    y = df["success"]

    # Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train Model
    model = LogisticRegression()
    model.fit(X_train, y_train)

    return model

def generate_insights(user_email):
    """Generate AI-based insights for habit consistency"""
    model = train_model(user_email)
    df = get_habit_data(user_email)

    if df is None:
        return "Not enough data for insights."

    # Find best time to complete habits
    best_hour = df.groupby("hour")["success"].mean().idxmax()

    insight_text = f"You are most consistent when you complete your habits at {best_hour}:00."

    # Save to DB
    insights_collection.insert_one({"user_email": user_email, "insight": insight_text})

    return insight_text
