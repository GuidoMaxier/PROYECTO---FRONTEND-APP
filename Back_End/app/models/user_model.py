from ..database import DatabaseConnection
from .exceptions import FilmNotFound, InvalidDataError


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
    def get(cls, user):
        """Get a film by id
        Args:
            - film (Film): Film object with the id attribute
        Returns:
            - Film: Film object
        """

        query = """SELECT * FROM Discord2.usuarios WHERE id_usuario = %s"""
        params = user.id_usuario,
        result = DatabaseConnection.fetch_one(query, params=params)

        if result is not None:
            return cls(*result)
        
        raise FilmNotFound(user.id_usuario) #EJERCICIO N° 1
    


    @classmethod
    def get_all(cls):
        """Get all films
        Returns:
            - list: List of Film objects
        """
        query = """SELECT * FROM Discord2.usuarios"""
        results = DatabaseConnection.fetch_all(query)

        films = []
        if results is not None:
            for result in results:
                films.append(cls(*result))
        return films



    @classmethod
    def create(cls, user):
        """Create a new film
        Args:
            - film (Film): Film object

        Raises:
            - InvalidDataError: If input data is not valid
      
        """

        # Validaciones de datos de entrada, EJERCICIO N° 2
        # if len(film.title) < 3:
        #     raise InvalidDataError("user_name must have at least three characters")
        
        # if not isinstance(film.language_id, int) or not isinstance(film.rental_duration, int):
        #     raise InvalidDataError("Invalid data types for some attributes")
        
        # if film.special_features is not None and (not isinstance(film.special_features, list) \
        #         or not all(isinstance(feature, str) for feature in film.special_features) \
        #         or not all(feature in ["Trailers", "Commentaries", "Deleted Scenes", "Behind the Scenes"]
        #                     for feature in film.special_features)):
        #     raise InvalidDataError("Invalid special features")
       
        
        # Construir la consulta SQL
        query = """INSERT INTO Discord2.usuarios (nombre, apellido, email, username, contraseña, fecha_nacimiento, ruta_imagen_perfil) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        

        params = user.nombre, user.apellido, user.email, \
                 user.username, user.contraseña, \
                 user.fecha_nacimiento, user.ruta_imagen_perfil
        
        try:
            # Ejecutar la consulta SQL
            DatabaseConnection.execute_query(query, params=params)
        except Exception as e:
            # Puedes manejar cualquier excepción de la base de datos aquí
            raise InvalidDataError("Failed to create film")
        

    # def exists(self):
    #     # Verificar si el ID de la película existe en la base de datos
    #     return User.query.filter_by(id_usuario=self.id_usuario).first() is not None  
    

    @classmethod
    def is_registered(cls, user):
        query = """SELECT id_usuario FROM Discord2.usuarios 
        WHERE username = %(username)s and contraseña = %(contraseña)s"""
        params = user.__dict__
        result = DatabaseConnection.fetch_one(query, params=params)

        if result is not None:
            return True
        return False  


    # @classmethod
    # def update(cls, user):
    #     """Update a user
    #     Args:
    #         - film (Film): User object
    #     """
    #     allowed_columns = {'nombre', 'apellido', 'email', 'username', 'contraseña', 
    #                        'fecha_nacimiento', 'ruta_imagen_perfil'}


    #     query_parts = []
    #     params = []
    #     for key, value in user.__dict__.items():
    #         if key in allowed_columns and value is not None:
    #             if key == 'special_features':
    #                 if len(value) == 0:
    #                     value = None
    #                 else:
    #                     value = ','.join(value)
    #             query_parts.append(f"{key} = %s")
    #             params.append(value)
    #     params.append(film.user_id)

    #     query = "UPDATE Discord2.usuarios SET " + ", ".join(query_parts) + " WHERE id_usuario = %s"
    #     DatabaseConnection.execute_query(query, params=params)

    
    @classmethod
    def delete(cls, user):
        """Delete a film
        Args:
            - film (Film): Film object with the id attribute
        """
        query = "DELETE FROM Discord2.usuarios WHERE id_usuario = %s"
        params = user.uid_usuario,
        DatabaseConnection.execute_query(query, params=params)