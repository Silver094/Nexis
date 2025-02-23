from pymongo import MongoClient
from backend.config import Config

# Establish connection with connection pooling
client = MongoClient(Config.MONGO_URI, maxPoolSize=Config.CONNECTION_POOL_SIZE)

# Access the database
db = client.nexis_db
