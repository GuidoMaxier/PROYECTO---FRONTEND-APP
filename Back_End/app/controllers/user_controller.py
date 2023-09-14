from ..models.user_model import User

from flask import request

from decimal import Decimal


from ..routes.error_handlers import handle_film_not_found



class UserController:
    """Usuarios controller class"""

    @classmethod
    def get(cls, id_usuario):
        """Get a usuario by id"""
        user = User(id_usuario=id_usuario)
        result = User.get(user)

        if result is not None:
            return result.serialize(), 200

        
    @classmethod
    def get_all(cls):
        """Get all users"""
        user_objects = User.get_all()
        users = []
        for user in user_objects:
            users.append(user.serialize())
        return users, 200
    

    @classmethod
    def create(cls):
        """Create a new usuario"""
        data = request.json
        # TODO: Validate data
        # if data.get('rental_rate') is not None:
        #     if isinstance(data.get('rental_rate'), int):
        #         data['rental_rate'] = Decimal(data.get('rental_rate'))/100
        
        # if data.get('replacement_cost') is not None:
        #     if isinstance(data.get('replacement_cost'), int):
        #         data['replacement_cost'] = Decimal(data.get('replacement_cost'))/100

        user = User(**data)
        User.create(user)
        return {'message': 'User created successfully'}, 201


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

        film = User(**data)

        # TODO: Validate film exists
        User.update(film)
        return {'message': 'Film updated successfully'}, 200
    
    @classmethod
    def delete(cls, film_id):
        """Delete a film"""
        film = User(film_id=film_id)

        # TODO: Validate film exists
        User.delete(film)
        return {'message': 'Film deleted successfully'}, 204