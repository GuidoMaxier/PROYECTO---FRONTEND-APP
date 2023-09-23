window.addEventListener('load', function () {
    // Comprobar si `userData` está en localStorage y contiene datos del usuario
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        //displayProfileData(userData);
        const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;

        obtenerDatosUsuarioDesdeAPI(idUsuario)

    } else {
        // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
       // alert("Esta siendo redireccionado...");
        window.location.href = "./index.html";
    }
});

///////////////////////// READ ////////////////////////////
// Función para obtener los datos del usuario desde la API y actualizar el formulario
function obtenerDatosUsuarioDesdeAPI(idUsuario) {
    const url = `http://127.0.0.1:5000/${idUsuario}`;
    
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario desde la API');
        }
        
        return response.json();
      })
      .then((data) => {
        // Actualiza los campos del formulario con los nuevos datos
        displayProfileData(data);
        // document.querySelector('input[name="nombre"]').value = data.nombre;
        // document.querySelector('input[name="apellido"]').value = data.apellido;
        // document.querySelector('input[name="email"]').value = data.email;
        // document.querySelector('input[name="username"]').value = data.username;
      });
}

///////////////////////// READ ////////////////////////////
function displayProfileData(Data) {
    // Asignar los datos del usuario a los campos de entrada
    //document.getElementsByName("id_usuario")[0].value = Data.id_usuario;
    document.getElementsByName("nombre")[0].value = Data.nombre;
    document.getElementsByName("apellido")[0].value = Data.apellido;
    document.getElementsByName("email")[0].value = Data.email;
    document.getElementsByName("username")[0].value = Data.username;

    // Asignar la ruta de la imagen de perfil al elemento de vista previa
    document.getElementById("imagen_perfil_preview").src = Data.ruta_imagen_perfil;

    //document.getElementsByName("contraseña")[0].value = userData.contraseña;
    // document.getElementsByName("fecha_nacimiento")[0].value = userData.fecha_nacimiento;
    
}



// Llamar a la función para logout el usuario cuando se hace clic en el botón
document.getElementById("logout").addEventListener("click", logout);
function logout() {
       
    const url = "http://127.0.0.1:5000/logout";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                // Eliminar `userData` de localStorage al cerrar sesión
                localStorage.removeItem('userData');
                window.location.href = "./index.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}



/////////////////////////// DELETE ////////////////////////////////

// Llamar a la función para eliminar el usuario cuando se hace clic en el botón
document.getElementById('Eliminar-usuario').addEventListener('click', eliminarUsuario);

// Función para eliminar el usuario
function eliminarUsuario() {
    // Mostrar un cuadro de diálogo de confirmación
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.');

    // Si el usuario confirmó la eliminación
    if (confirmacion) {
        // Obtener el ID del usuario desde localStorage
        const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;

        // Hacer una solicitud DELETE al backend con la URL correcta
        fetch(`http://127.0.0.1:5000/${idUsuario}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 200) {
                    // Usuario eliminado exitosamente, redireccionar a index.html o realizar cualquier otra acción necesaria
                    localStorage.removeItem('userData');
                    window.location.href = "./index.html";
                } else {
                    // Handle errores aquí
                    console.error('Error al eliminar el usuario');
                }
            })
            .catch(error => {
                console.error('Error al comunicarse con el backend', error);
            });
    }
}

  
 

////////////////////// UPDATE DATOS PERFIL //////////////////////
document.getElementById('Guardar-Cambios').addEventListener('click', (event) => {
    event.preventDefault();

    const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
    const formData = new FormData(); // Crea un nuevo objeto FormData

    // Obtén los valores de nombre, apellido, email y username del formulario
    const nombre = document.querySelector('input[name="nombre"]').value;
    const apellido = document.querySelector('input[name="apellido"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const username = document.querySelector('input[name="username"]').value;
    const rutaImagen = document.getElementById("imagen_perfil_preview").getAttribute("src");

    // Agrega los valores al objeto FormData
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('ruta_imagen_perfil', rutaImagen);

    // Realiza la solicitud de actualización utilizando fetch
    fetch(`http://127.0.0.1:5000/${idUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convierte FormData a objeto y luego a JSON
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            // Actualiza los campos del formulario con los nuevos datos
            obtenerDatosUsuarioDesdeAPI(idUsuario);
            alert("Usuario actualizado con éxito");
            console.log('Usuario actualizado con éxito');
        })
        .catch((error) => {
            console.error('Error al actualizar el usuario', error);
            // Puedes mostrar un mensaje de error al usuario u otras acciones en caso de error
        });
});


////////////////////// UPDATE CLAVE //////////////////////

function cambiarClave(nuevaClave, confirmacion) {
    const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
    
    if (nuevaClave !== confirmacion) {
        // Las contraseñas no coinciden, puedes mostrar un mensaje de error aquí
        alert("La nueva contraseña y la confirmación no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    // Define los datos que se enviarán al servidor
    const datos = {
        id_usuario: idUsuario,
        contraseña: nuevaClave,
    };

    // Realiza la solicitud de cambio de contraseña utilizando fetch
    fetch(`http://127.0.0.1:5000/cambiarclave`, {
        method: 'POST', // Puedes utilizar POST u otro método según la configuración de tu servidor
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos), // Convierte los datos a formato JSON
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña');
        }
        
        return response.json();
    })
    .then((data) => {
        // Contraseña cambiada exitosamente, puedes mostrar un mensaje de éxito aquí
        alert("Contraseña cambiada exitosamente");
        console.log('Contraseña cambiada exitosamente', data);

        // Cierra la ventana modal de cambio de contraseña si es necesario
        const modal = document.getElementById("modal-clave");
        modal.style.display = "none";

        // Limpia los campos de contraseña si es necesario
        document.getElementById("nuevaclave").value = "";
        document.getElementById("confirmacion").value = "";

        // Puedes realizar otras acciones aquí, como redirigir al usuario o actualizar los datos en el frontend
    })
    .catch((error) => {
        console.error('Error al cambiar la contraseña', error);
        // Puedes mostrar un mensaje de error al usuario u otras acciones en caso de error
    });
}

document.getElementById("guardarClave").addEventListener("click", function () {
    const nuevaClave = document.getElementById("nuevaclave").value;
    const confirmacion = document.getElementById("confirmacion").value;
    
    cambiarClave(nuevaClave, confirmacion);
});

// Botón para abrir la ventana modal de cambio de contraseña
document.getElementById("Cambiar-Clave").addEventListener("click", function () {
    const modal = document.getElementById("modal-clave");
    modal.style.display = "block";
});

// Función para cerrar la ventana modal
document.getElementById('closeClave').addEventListener('click', function () {
    document.getElementById('modal-clave').style.display = 'none';
  });



  
  









