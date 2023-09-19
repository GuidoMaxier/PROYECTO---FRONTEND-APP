window.addEventListener('load', function () {
    // Comprobar si `userData` está en localStorage y contiene datos del usuario
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        displayProfileData(userData);
    } else {
        // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
       // alert("Esta siendo redireccionado...");
        window.location.href = "./index.html";
    }
});

// Llamar a la función para logout el usuario cuando se hace clic en el botón
document.getElementById("logout").addEventListener("click", logout);

// Llamar a la función para eliminar el usuario cuando se hace clic en el botón
document.getElementById('Eliminar-usuario').addEventListener('click', eliminarUsuario);




function displayProfileData(userData) {
    // Asignar los datos del usuario a los campos de entrada
    // document.getElementsByName("id_usuario")[0].value = userData.id_usuario;
    document.getElementsByName("nombre")[0].value = userData.nombre;
    document.getElementsByName("apellido")[0].value = userData.apellido;
    document.getElementsByName("email")[0].value = userData.email;
    document.getElementsByName("username")[0].value = userData.username;
    document.getElementsByName("contraseña")[0].value = userData.contraseña;
    // document.getElementsByName("fecha_nacimiento")[0].value = userData.fecha_nacimiento;
   // Asignar la ruta de la imagen de perfil al elemento de vista previa
   document.getElementById("imagen_perfil_preview").src = userData.ruta_imagen_perfil;
}


function logout() {
    // Eliminar `userData` de localStorage al cerrar sesión
    localStorage.removeItem('userData');
    
    const url = "http://127.0.0.1:5000/logout";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
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


// Función para eliminar el usuario
function eliminarUsuario() {
    // Hacer una solicitud DELETE al backend
    fetch(`http://127.0.0.1:5000/user/${userData.id_usuario}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 200) {
          // Usuario eliminado exitosamente, redireccionar a index.html
          window.location.href = 'index.html';
        } else {
          // Handle errores aquí
          console.error('Error al eliminar el usuario');
        }
      })
      .catch(error => {
        console.error('Error al comunicarse con el backend', error);
      });
  }
  
  






    // Obtén la referencia a la imagen
    var imagen = document.getElementById("imagen_perfil_preview");

    // Agrega un evento de clic a la imagen
    imagen.addEventListener("click", function() {
        alert("¡Haz hecho clic en la imagen!");
        // Puedes cambiar "¡Haz hecho clic en la imagen!" al mensaje que desees mostrar.
    });













