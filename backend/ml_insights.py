from database.models import habits_collection
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans

def generate_insights(user_email):
    # Fetch user habits
    user_habits = list(habits_collection.find({"user_email": user_email}, {"_id": 0}))

    if not user_habits:
        return {"message": "No habits found for insights."}

    # Extract habit streaks
    streaks = [habit.get("streak", 0) for habit in user_habits]
    habit_names = [habit.get("name", "Unknown") for habit in user_habits]
    
    # Convert to DataFrame
    df = pd.DataFrame({"habit": habit_names, "streak": streaks})

    # 🔹 Basic Insights
    avg_streak = float(np.mean(streaks) if streaks else 0)
    max_streak = int(np.max(streaks) if streaks else 0)

    # 🔹 Trend Analysis (Regression)
    if len(streaks) >= 2:  # Regression needs at least 2 data points
        X = np.arange(len(streaks)).reshape(-1, 1)  # Time index
        y = np.array(streaks).reshape(-1, 1)

        model = LinearRegression()
        model.fit(X, y)
        predicted_next_streak = round(model.predict([[len(streaks)]])[0][0], 2)
    else:
        predicted_next_streak = "Insufficient data for trend prediction"

    # 🔹 Anomaly Detection (Z-score)
    streaks_arr = np.array(streaks)
    mean_streak = np.mean(streaks_arr)
    std_streak = np.std(streaks_arr)

    if std_streak > 0:
        z_scores = (streaks_arr - mean_streak) / std_streak
        anomalies = [habit_names[i] for i, z in enumerate(z_scores) if abs(z) > 2]  # Outliers
    else:
        anomalies = []

    # 🔹 Clustering Similar Users (K-Means)
    if len(streaks) >= 3:
        kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)  # 2 habit engagement groups
        df["cluster"] = kmeans.fit_predict(df[["streak"]])
        cluster_label = df["cluster"].iloc[0]  # User's cluster
        suggestion = "You belong to a high-engagement group!" if cluster_label == 1 else "Try maintaining better consistency!"
    else:
        suggestion = "Not enough data for habit clustering."

    # 🔹 Final Insights
    insights = {
        "total_habits": len(user_habits),
        "average_streak": round(avg_streak, 2),
        "longest_streak": max_streak,
        "predicted_next_streak": predicted_next_streak,
        "anomalous_habits": anomalies if anomalies else "No anomalies detected",
        "cluster_suggestion": suggestion
    }

    return insights
