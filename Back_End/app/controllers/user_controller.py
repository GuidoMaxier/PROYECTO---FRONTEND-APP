
from ..models.user_model import User

from flask import request, session

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
    def update(cls, id_usuario):
        """Update a film"""
        data = request.json

        # TODO: Validate data
        # if data.get('rental_rate') is not None:
        #     if isinstance(data.get('rental_rate'), int):
        #         data['rental_rate'] = Decimal(data.get('rental_rate'))/100
        
        # if data.get('replacement_cost') is not None:
        #     if isinstance(data.get('replacement_cost'), int):
        #         data['replacement_cost'] = Decimal(data.get('replacement_cost'))/100
        
        data['id_usuario'] = id_usuario

        user = User(**data)

        # TODO: Validate film exists
        User.update(user)
        return {'message': 'Film updated successfully'}, 200
    
    @classmethod
    def delete(cls, id_usuario):
        """Delete a film"""
        user = User(id_usuario=id_usuario)

        # TODO: Validate film exists
        User.delete(user)
        return {'message': 'Film deleted successfully'}, 204
    

    

    @classmethod
    def login(cls):
        data = request.json
        user = User(
            username = data.get('username'),
            contraseña = data.get('contraseña')
        )
        
        if User.is_registered(user):
            session['username'] = data.get('username')
            return {"message": "Sesion iniciada"}, 200
        else:
            return {"message": "Usuario o contraseña incorrectos"}, 401
    
    """ @classmethod
    def show_profile(cls):
        username = session.get('username')
        user = User.get(User(username = username))
        if user is None:
            return {"message": "Usuario no encontrado"}, 404
        else:
            return {
                "user_id": user.user_id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "date_of_birth": user.date_of_birth,
                "phone_number": user.phone_number,
                "creation_date": user.creation_date,
                "last_login": user.last_login,
                "status_id": user.status_id,
                "role_id": user.role_id
            }, 200 """

    @classmethod
    def show_profile(cls):
        username = session.get('username')
        user = User.get(User(username = username))
        if user is None:
            return {"message": "Usuario no encontrado"}, 404
        else:
            return user.serialize(), 200
    
    @classmethod
    def logout(cls):
        session.pop('username', None)
        return {"message": "Sesion cerrada"}, 200
    
