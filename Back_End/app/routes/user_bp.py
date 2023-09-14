from flask import Blueprint

from ..controllers.user_controller import UserController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/', methods=['GET'])(UserController.get_all)
user_bp.route('/<int:id_usuario>', methods=['GET'])(UserController.get)
user_bp.route('/', methods=['POST'])(UserController.create)
user_bp.route('/<int:id_usuario>', methods=['PUT'])(UserController.update)
user_bp.route('/<int:id_usuario>', methods=['DELETE'])(UserController.delete)