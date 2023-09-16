
from ..models.user_model import User

from flask import Flask, request, session, make_response

from decimal import Decimal


from ..routes.error_handlers import handle_film_not_found


from flask_cors import cross_origin 



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

        user = User(**data)
        User.create(user)
        return {'message': 'Creacion de Usuario Exitosa'}, 201


    @classmethod
    def update(cls, id_usuario):
        """Update a film"""
        data = request.json

        # TODO: Validate data

        
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

            # Si el inicio de sesión es exitoso, establece la cookie
            response = make_response('Inicio de sesión exitoso')
            

            response.set_cookie('username', data.get('username'))

            print(response)

            # Devuelve la respuesta con la cookie establecida
            return response, 200
        
        # if User.is_registered(user):
        #     session['username'] = data.get('username')

        #     return {"message": "Sesion iniciada"}, 200
        else:
            return {"message": "Usuario o contraseña incorrectos"}, 401
    

    @classmethod
    def show_profile(cls):

        user_nombre = session.get('username')

        if user_nombre is None:
                return {"message": "Usuario no encontrado user_nombre"}, 404
        

        user = User.get(User(username = user_nombre))
        if user is None:
            return {"message": "Usuario no encontrado"}, 404
        else:
            return user.serialize(), 200
    

        
    @classmethod
    def logout(cls):
        session.pop('username', None)
        return {"message": "Sesion cerrada"}, 200
    

    @classmethod
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')  # Cambia la URL según tu configuración
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response
    
