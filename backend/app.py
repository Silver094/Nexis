from flask import Flask
from flask_jwt_extended import JWTManager
from backend.config import Config
from backend.routes import routes
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = Config.SECRET_KEY
jwt = JWTManager(app)

# Register API routes
app.register_blueprint(routes)

if __name__ == "__main__":
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=5000)
    app.run(debug=True)


