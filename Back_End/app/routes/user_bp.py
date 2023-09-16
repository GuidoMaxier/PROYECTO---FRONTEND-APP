from flask import Blueprint

from ..controllers.user_controller import UserController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/', methods=['GET'])(UserController.get_all)
user_bp.route('/<int:id_usuario>', methods=['GET'])(UserController.get)

user_bp.route('/register2', methods=['POST'])(UserController.create)
user_bp.route('/login2', methods=['POST'])(UserController.login)



user_bp.route('/auth/profile', methods=['GET'])(UserController.show_profile)
user_bp.route('/auth/logout', methods=['GET'])(UserController.logout)


user_bp.route('/<int:id_usuario>', methods=['PUT'])(UserController.update)
user_bp.route('/<int:id_usuario>', methods=['DELETE'])(UserController.delete)