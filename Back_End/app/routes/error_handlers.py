from flask import Blueprint
from ..models.exceptions import FilmNotFound, InvalidDataError

errors = Blueprint("errors", __name__)



# Define el manejador para FilmNotFound  //// BORRAR

#EJERCICIO N°1
@errors.app_errorhandler(FilmNotFound)
def handle_film_not_found(error):
        return error.get_response()


#EJERCICIO N°2
@errors.app_errorhandler(InvalidDataError)
def handle_InvalidDataError(error):
        return error.get_response()
