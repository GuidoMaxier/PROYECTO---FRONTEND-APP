from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)

# Esto habilita CORS para toda la aplicación, 
# permitiendo cualquier origen (no recomendado en producción).
CORS(app)  

# Configura la conexión a la base de datos MySQL
db = mysql.connector.connect(
    host="localhost",
    user="Guido_Maxier",
    password="mi_clave",
    database="prueba"
)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username_r']
    password = data['password_r']

    cursor = db.cursor()
    cursor.execute("INSERT INTO prueba.users (username, password) VALUES (%s, %s)", (username, password))
    db.commit()
    cursor.close()
    return jsonify({"message": "Registro exitoso"})



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    cursor = db.cursor()
    cursor.execute("SELECT * FROM prueba.users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        return jsonify({"message": "Inicio de sesión exitoso"})
    else:
        return jsonify({"message": "Inicio de sesión fallido"})

if __name__ == '__main__':
    app.run()
