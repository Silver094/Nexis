from flask import Flask, jsonify
from werkzeug.exceptions import Unauthorized
from flask_jwt_extended import JWTManager
from backend.config import Config
from backend.routes import routes
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = Config.SECRET_KEY
jwt = JWTManager(app)

# Handle expired JWT tokens
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"message": "Token has expired", "error": "token_expired"}), 401

# Handle invalid JWT tokens
@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message": "Invalid token", "error": "invalid_token"}), 401

# Handle missing JWT tokens
@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"message": "Token is missing", "error": "token_missing"}), 401

# Handle revoked tokens (if using revocation feature)
@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return jsonify({"message": "Token has been revoked", "error": "token_revoked"}), 401


# Register API routes
app.register_blueprint(routes)

if __name__ == "__main__":
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=5000)
    app.run(debug=True)


