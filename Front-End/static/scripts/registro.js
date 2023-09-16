    // Código JavaScript para la página de Registro (register.js)
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const data = {
            'nombre': document.getElementById('nombre').value, 
            'apellido': document.getElementById('apellido').value, 
            'email': document.getElementById('email').value, 
            'username': document.getElementById('username_r').value, 
            'contraseña': document.getElementById('password_r').value, 
            'fecha_nacimiento': document.getElementById('fecha_nacimiento').value,
            'ruta_imagen_perfil':'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest-300x300.png' 

            }

        fetch('http://127.0.0.1:5000/register2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include' // Incluir las cookies y credenciales
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    });

