    // Código JavaScript para la página de Registro (register.js)
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

         // Obtener los valores de los campos de entrada
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username_r').value;
        const contraseña = document.getElementById('password_r').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;

        // Realizar validaciones en el lado del cliente
        if (!nombre || !apellido || !email || !username || !contraseña || !fecha_nacimiento) {
            alert('Todos los campos son obligatorios.');
            document.getElementById("message").innerHTML = 'Todos los campos son obligatorios.';
            return; }

        // Verificar si la contraseña tiene al menos 8 caracteres
        if (contraseña.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            document.getElementById("message").innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
            return;
        }    

        // Realizar más validaciones 
        //......... 

        // Crear el objeto de datos para enviar al servidor    
        const data = {
            'nombre': nombre, 
            'apellido': apellido, 
            'email': email, 
            'username': username, 
            'contraseña': contraseña, 
            'fecha_nacimiento': fecha_nacimiento,
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
        // .then(response => response.json())
        // .then(data => {
        //     alert(data.message);
        // });
        .then(response => {
            if (response.status === 201) {
                // Registro exitoso (debemos redireccionar al login)
                alert('Debemos redireccionar al login');
                return response.json();
            } else if (response.status === 400) {
                // Error de validación (nombre de usuario o email ya existen)
                return response.json().then(data => {
                    alert(data.message); // Mostrar el mensaje de error al usuario
                });
            } else {
                // Otro error en el servidor
                alert('Error en el servidor. Por favor, inténtelo de nuevo más tarde.');
            }
        })
    });

