import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    SECRET_KEY = os.getenv("SECRET_KEY")
    CONNECTION_POOL_SIZE = int(os.getenv("CONNECTION_POOL_SIZE", 10))
