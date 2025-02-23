from database.models import users_collection, habits_collection, insights_collection

def initialize_db():
    print("✅ Initializing Database...")

    # Ensure Users Collection Exists
    if "users" not in users_collection.database.list_collection_names():
        users_collection.create_index("email", unique=True)  # Unique email index
        print("✅ Created Users collection.")

    # Ensure Habits Collection Exists
    if "habits" not in habits_collection.database.list_collection_names():
        habits_collection.create_index([("user_id", 1), ("name", 1)], unique=True)  # Avoid duplicate habits per user
        print("✅ Created Habits collection.")

    # Ensure AI Insights Collection Exists
    if "insights" not in insights_collection.database.list_collection_names():
        insights_collection.create_index("user_id")  # AI insights linked to user
        print("✅ Created Insights collection.")

if __name__ == "__main__":
    initialize_db()
