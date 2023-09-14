from flask import jsonify

class CustomException(Exception):

    def __init__(self, status_code, name = "Custom Error", description = 'Error'): 
        super().__init__()
        self.description = description
        self.name = name
        self.status_code = status_code

    def get_response(self):
        response = jsonify({
            'error': {
                'code': self.status_code,
                'name': self.name,
                'description': self.description,
            }
        })
        response.status_code = self.status_code
        return response
    
#EJERCICIO 1
class FilmNotFound(CustomException):
    def __init__(self, film_id):
        super().__init__(status_code=404, name="Film Not Found", description=f"Film with id {film_id} not found")


#EJERCICIO 2
class InvalidDataError(CustomException):
    def __init__(self, description):
        super().__init__(400, "Invalid Data", description)

