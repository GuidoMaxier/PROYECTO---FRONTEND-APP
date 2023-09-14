from ..database import DatabaseConnection
from .exceptions import FilmNotFound, InvalidDataError
class Film:
    """Film model class"""

    def __init__(self, film_id = None, 
                 title = None, 
                 description = None, 
                 release_year = None, 
                 language_id = None, 
                 original_language_id = None, 
                 rental_duration = None,
                 rental_rate = None, 
                 length = None, 
                 replacement_cost = None,
                 rating = None, 
                 special_features = None, 
                 last_update = None):
        
        
        """Constructor method"""
        self.film_id = film_id
        self.title = title
        self.description = description
        self.release_year = release_year
        self.language_id = language_id
        self.original_language_id = original_language_id
        self.rental_duration = rental_duration
        self.rental_rate = rental_rate
        self.length = length
        self.replacement_cost = replacement_cost
        self.rating = rating
        self.special_features = special_features
        self.last_update = last_update

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
        if self.special_features is not None:
            special_features = list(self.special_features)
        else:
            special_features = None
        return {
            "film_id": self.film_id,
            "title": self.title,
            "description": self.description,
            "release_year": self.release_year,
            "language_id": self.language_id,
            "original_language_id": self.original_language_id,
            "rental_duration": self.rental_duration,
            "rental_rate": int(self.rental_rate*100),
            "length": self.length,
            "replacement_cost": int(self.replacement_cost*100),
            "rating": self.rating,
            "special_features": special_features,
            "last_update": str(self.last_update)
        }
    
    @classmethod
    def get(cls, film):
        """Get a film by id
        Args:
            - film (Film): Film object with the id attribute
        Returns:
            - Film: Film object
        """

        query = """SELECT film_id, title, description, release_year,
        language_id, original_language_id, rental_duration, rental_rate,
        length, replacement_cost, rating, special_features, last_update 
        FROM sakila.film WHERE film_id = %s"""
        params = film.film_id,
        result = DatabaseConnection.fetch_one(query, params=params)

        if result is not None:
            return cls(*result)
        
        raise FilmNotFound(film.film_id) #EJERCICIO N° 1
    
    @classmethod
    def get_all(cls):
        """Get all films
        Returns:
            - list: List of Film objects
        """
        query = """SELECT film_id, title, description, release_year,
        language_id, original_language_id, rental_duration, rental_rate,
        length, replacement_cost, rating, special_features, last_update 
        FROM sakila.film"""
        results = DatabaseConnection.fetch_all(query)

        films = []
        if results is not None:
            for result in results:
                films.append(cls(*result))
        return films


    @classmethod
    def create(cls, film):
        """Create a new film
        Args:
            - film (Film): Film object

        Raises:
            - InvalidDataError: If input data is not valid
      
        """

        # Validaciones de datos de entrada, EJERCICIO N° 2
        if len(film.title) < 3:
            raise InvalidDataError("Title must have at least three characters")
        
        if not isinstance(film.language_id, int) or not isinstance(film.rental_duration, int):
            raise InvalidDataError("Invalid data types for some attributes")
        
        if film.special_features is not None and (not isinstance(film.special_features, list) \
                or not all(isinstance(feature, str) for feature in film.special_features) \
                or not all(feature in ["Trailers", "Commentaries", "Deleted Scenes", "Behind the Scenes"]
                            for feature in film.special_features)):
            raise InvalidDataError("Invalid special features")
       
        
        # Construir la consulta SQL
        query = """INSERT INTO sakila.film (title, description, release_year,
        language_id, original_language_id, rental_duration, rental_rate,
        length, replacement_cost, rating, special_features) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        
        if film.special_features is not None:
            special_features = ','.join(film.special_features)
        else:
            special_features = None

        params = film.title, film.description, film.release_year, \
                 film.language_id, film.original_language_id, \
                 film.rental_duration, film.rental_rate, film.length, \
                 film.replacement_cost, film.rating, special_features
        
        try:
            # Ejecutar la consulta SQL
            DatabaseConnection.execute_query(query, params=params)
        except Exception as e:
            # Puedes manejar cualquier excepción de la base de datos aquí
            raise InvalidDataError("Failed to create film")
        

    def exists(self):
        # Verificar si el ID de la película existe en la base de datos
        return Film.query.filter_by(film_id=self.film_id).first() is not None    

    @classmethod
    def update(cls, film):
        """Update a film
        Args:
            - film (Film): Film object
        """
        allowed_columns = {'title', 'description', 'release_year',
                           'language_id', 'original_language_id',
                           'rental_duration', 'rental_rate', 'length',
                           'replacement_cost', 'rating', 'special_features'}
        query_parts = []
        params = []
        for key, value in film.__dict__.items():
            if key in allowed_columns and value is not None:
                if key == 'special_features':
                    if len(value) == 0:
                        value = None
                    else:
                        value = ','.join(value)
                query_parts.append(f"{key} = %s")
                params.append(value)
        params.append(film.film_id)

        query = "UPDATE sakila.film SET " + ", ".join(query_parts) + " WHERE film_id = %s"
        DatabaseConnection.execute_query(query, params=params)

    
    @classmethod
    def delete(cls, film):
        """Delete a film
        Args:
            - film (Film): Film object with the id attribute
        """
        query = "DELETE FROM sakila.film WHERE film_id = %s"
        params = film.film_id,
        DatabaseConnection.execute_query(query, params=params)