from dotenv import dotenv_values

class Config:
    config = dotenv_values("Back_End\.env")
    
    SECRET_KEY = config['SECRET_KEY']
    SERVER_NAME = "127.0.0.1:5000"
    DEBUG = True

    DATABASE_USERNAME = config['DATABASE_USERNAME']
    DATABASE_PASSWORD = config['DATABASE_PASSWORD']
    DATABASE_HOST = config['DATABASE_HOST']
    DATABASE_PORT = config['DATABASE_PORT']
    SESSION_TYPE = 'filesystem'
    PERMANENT_SESSION_LIFETIME = 7200

    TEMPLATE_FOLDER = "templates/"
    STATIC_FOLDER = "static_folder/"

# Back_End\config.py
# Back_End\run.py
# Back_End\.env