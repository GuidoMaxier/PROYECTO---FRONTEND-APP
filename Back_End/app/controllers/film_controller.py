from ..models.film_model import Film

from flask import request

from decimal import Decimal


from ..routes.error_handlers import handle_film_not_found



class FilmController:
    """Film controller class"""

    @classmethod
    def get(cls, film_id):
        """Get a film by id"""
        film = Film(film_id=film_id)
        result = Film.get(film)

        if result is not None:
            return result.serialize(), 200



        
    @classmethod
    def get_all(cls):
        """Get all films"""
        film_objects = Film.get_all()
        films = []
        for film in film_objects:
            films.append(film.serialize())
        return films, 200
    
    @classmethod
    def create(cls):
        """Create a new film"""
        data = request.json
        # TODO: Validate data
        if data.get('rental_rate') is not None:
            if isinstance(data.get('rental_rate'), int):
                data['rental_rate'] = Decimal(data.get('rental_rate'))/100
        
        if data.get('replacement_cost') is not None:
            if isinstance(data.get('replacement_cost'), int):
                data['replacement_cost'] = Decimal(data.get('replacement_cost'))/100

        film = Film(**data)
        Film.create(film)
        return {'message': 'Film created successfully'}, 201


    @classmethod
    def update(cls, film_id):
        """Update a film"""
        data = request.json
        # TODO: Validate data
        if data.get('rental_rate') is not None:
            if isinstance(data.get('rental_rate'), int):
                data['rental_rate'] = Decimal(data.get('rental_rate'))/100
        
        if data.get('replacement_cost') is not None:
            if isinstance(data.get('replacement_cost'), int):
                data['replacement_cost'] = Decimal(data.get('replacement_cost'))/100
        
        data['film_id'] = film_id

        film = Film(**data)

        # TODO: Validate film exists
        Film.update(film)
        return {'message': 'Film updated successfully'}, 200
    
    @classmethod
    def delete(cls, film_id):
        """Delete a film"""
        film = Film(film_id=film_id)

        # TODO: Validate film exists
        Film.delete(film)
        return {'message': 'Film deleted successfully'}, 204