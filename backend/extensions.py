"""
Shared extensions for the Flask application
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize SQLAlchemy without binding to app
db = SQLAlchemy()
migrate = Migrate()