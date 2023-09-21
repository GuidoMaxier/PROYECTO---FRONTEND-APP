from ..database import DatabaseConnection
from .exceptions import FilmNotFound, InvalidDataError


from werkzeug.security import generate_password_hash, check_password_hash



class User:
    """User model class"""

    def __init__(self, 
                 id_usuario = None, 
                 nombre = None, 
                 apellido = None, 
                 email = None, 
                 username = None, 
                 contraseña = None, 
                 fecha_nacimiento = None,
                 ruta_imagen_perfil = None 
                 ):
        
        """Constructor method"""
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.apellido = apellido
        self.email = email
        self.username = username
        self.contraseña = contraseña
        self.fecha_nacimiento = fecha_nacimiento
        self.ruta_imagen_perfil = ruta_imagen_perfil

    def serialize(self):
        """Serialize object representation
        Returns:
            dict: Object representation
        Note:
            - The last_update attribute is converted to string
            - The special_features attribute is converted to list if it is not
            null in the database. Otherwise, it is converted to None
            - The attributes rental_rate and replacement_cost are converted to 
            int, because the Decimal type may lose precision if we convert 
            it to float
        """

        return {
            "id_usuario": self.id_usuario,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "username": self.username,
            "contraseña": self.contraseña,
            "fecha_nacimiento": self.fecha_nacimiento,
            "ruta_imagen_perfil": self.ruta_imagen_perfil
        }
    

    
    @classmethod
    def get(cls, user_data):
        """Get a user by id
        Args:
            - user (Film): User object with the id attribute
        Returns:
            - User: User object
        """
    
        query = """SELECT * FROM Discord2.usuarios WHERE id_usuario = %s"""
        params = (user_data.id_usuario,)
        result = DatabaseConnection.fetch_one(query, params=params)

        if result is not None:
            return cls(*result)

        raise FilmNotFound(user_data.id_usuario)
    

    @classmethod
    def obtener_datos_del_usuario(cls, user_data):

        # Consulta SQL para obtener los datos del usuario
        query = "SELECT * FROM Discord2.usuarios WHERE username = %s"
        params = (user_data.username,)
                
        # Recupera los datos del usuario
        result = DatabaseConnection.fetch_one(query, params=params)
    
        if result is not None:
            return cls(*result)
        
        raise FilmNotFound(user_data.id_usuario) #controlar esta salida

  


    
    @classmethod
    def get_all(cls):
        """Get all usuarios
        Returns:
            - list: List of User objects
        """
        query = """SELECT * FROM Discord2.usuarios"""
        results = DatabaseConnection.fetch_all(query)

        users = []
        if results is not None:
            for result in results:
                users.append(cls(*result))
        return users



    @classmethod
    def create(cls, user_data):
        """Create a new usuario
        Args:
            - user (User): User object

        Raises:
            - InvalidDataError: If input data is not valid
      
        """

        # Validar los datos aquí
        if len(user_data.username) < 3:
            raise InvalidDataError("El nombre de usuario debe tener al menos tres caracteres")
        

        # Generar el hash de la contraseña
        hashed_password = generate_password_hash(user_data.contraseña, method='scrypt')

        query = """INSERT INTO Discord2.usuarios (nombre, apellido, email, username, contraseña, fecha_nacimiento, ruta_imagen_perfil) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)"""

        params = (user_data.nombre, user_data.apellido, user_data.email, user_data.username, hashed_password,
                  user_data.fecha_nacimiento, user_data.ruta_imagen_perfil)

        try:
            DatabaseConnection.execute_query(query, params=params)
        except Exception as e:
            raise InvalidDataError("No se pudo crear el usuario")



    @classmethod
    def is_registered(cls, user_data):
        query = """SELECT contraseña FROM Discord2.usuarios 
        WHERE username = %s"""
        params = (user_data.username,)
        result = DatabaseConnection.fetch_one(query, params=params)

        if result is not None:
            hashed_password = result[0]  # Extraer el hash de la tupla
            if check_password_hash(hashed_password, user_data.contraseña):
                return True

        return False

     


    @classmethod
    def update(cls, user_data):
        allowed_columns = ['nombre', 'apellido', 'email', 'username', 'fecha_nacimiento', 'ruta_imagen_perfil']

        query_parts = []
        params = []

        for key, value in user_data.__dict__.items():
            if key in allowed_columns and value is not None:
                query_parts.append(f"{key} = %s")
                params.append(value)

        params.append(user_data.id_usuario)

        if query_parts:
            query = f"UPDATE Discord2.usuarios SET {', '.join(query_parts)} WHERE id_usuario = %s"
            DatabaseConnection.execute_query(query, params=params)
        else:
            # No se proporcionaron datos válidos para actualizar
            raise InvalidDataError("No se proporcionaron datos válidos para actualizar el usuario")
        
            
    @classmethod
    def delete(cls, user_data):
            """Delete a user
            Args:
                - user (User): User object with the id attribute
            """
            query = "DELETE FROM Discord2.usuarios WHERE id_usuario = %s"
            params = user_data.id_usuario,
            DatabaseConnection.execute_query(query, params=params)


    @classmethod
    def check_username(cls, username):
        """Cheamos diponibilidad del usermane"""
        query = "SELECT id_usuario FROM Discord2.usuarios WHERE username=%s"
        params = (username,)
        result = DatabaseConnection.fetch_one(query, params=params)
        
        return result
    

    @classmethod
    def check_email(cls, email):
        """Cheamos diponibilidad del email"""
        query = "SELECT id_usuario FROM Discord2.usuarios WHERE email=%s"
        params = (email,)
        result = DatabaseConnection.fetch_one(query, params=params)
        return result