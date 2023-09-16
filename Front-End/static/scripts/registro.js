    // Código JavaScript para la página de Registro (register.js)
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username_r = document.getElementById('username_r').value;
        const password_r = document.getElementById('password_r').value;

        const data = {
            'nombre': 'None', 
            'apellido': 'None', 
            'email': 'None', 
            'username': username_r, 
            'contraseña': password_r, 
            'fecha_nacimiento': '2010-12-12',
            'ruta_imagen_perfil':'ruta' 

            }

        fetch('http://127.0.0.1:5000/register2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    });

