from flask import Blueprint

from ..controllers.film_controller import FilmController

film_bp = Blueprint('film_bp', __name__)

film_bp.route('/', methods=['GET'])(FilmController.get_all)
film_bp.route('/<int:film_id>', methods=['GET'])(FilmController.get)
film_bp.route('/', methods=['POST'])(FilmController.create)
film_bp.route('/<int:film_id>', methods=['PUT'])(FilmController.update)
film_bp.route('/<int:film_id>', methods=['DELETE'])(FilmController.delete)