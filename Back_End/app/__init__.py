from flask import Flask, request, session
from flask_cors import CORS
from config import Config


from .routes.film_bp import film_bp

from .routes.user_bp import user_bp

from .database import DatabaseConnection

from .routes.error_handlers import errors 



def init_app():
    """Crea y configura la aplicación Flask"""
    
    app = Flask(__name__, static_folder = Config.STATIC_FOLDER, template_folder = Config.TEMPLATE_FOLDER)
    
    CORS(app, supports_credentials=True)

    app.config.from_object(
        Config
    )

    DatabaseConnection.set_config(app.config)

    # app.register_blueprint(film_bp, url_prefix = '/films')

    app.register_blueprint(user_bp)

    app.register_blueprint(errors) #Agregado





    return app