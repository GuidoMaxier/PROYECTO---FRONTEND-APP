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



function displayProfileData(userData) {
    // Asignar los datos del usuario a los campos de entrada
    // document.getElementsByName("id_usuario")[0].value = userData.id_usuario;
    document.getElementsByName("nombre")[0].value = userData.nombre;
    document.getElementsByName("apellido")[0].value = userData.apellido;
    document.getElementsByName("email")[0].value = userData.email;
    document.getElementsByName("username")[0].value = userData.username;

    // Asignar la ruta de la imagen de perfil al elemento de vista previa
    document.getElementById("imagen_perfil_preview").src = userData.ruta_imagen_perfil;

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



// Función para eliminar el usuario
function eliminarUsuario() {
    // Obtener el ID del usuario desde localStorage
    const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;

    // Hacer una solicitud DELETE al backend con la URL correcta
    fetch(`http://127.0.0.1:5000/${idUsuario}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status === 200) {
                // Usuario eliminado exitosamente, redireccionar a index.html
                logout()
                //window.location.href = './index.html';
            } else {
                // Handle errores aquí
                console.error('Error al eliminar el usuario');
            }
        })
        .catch(error => {
            console.error('Error al comunicarse con el backend', error);
        });
}
  
  
// Llamar a la función para eliminar el usuario cuando se hace clic en el botón
document.getElementById('Eliminar-usuario').addEventListener('click', eliminarUsuario);

function funciono() {
   // alert("funciono");
    //alert("hola: ");
}

////////////////////// UPDATE //////////////////////

document.getElementById('Guardar-Cambios').addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
      
        const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
        // Reemplaza con el ID del usuario que deseas actualizar
        const formData = new FormData(event.target); // Obtiene los datos del formulario
      
        // Convierte los datos del formulario a un objeto JavaScript
        const formDataObject = {
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "username": self.username,
            "ruta_imagen_perfil": self.ruta_imagen_perfil
        };

        // formData.forEach((value, key) => {
        //   formDataObject[key] = value;  
        // } );
      
        // Realiza la solicitud de actualización utilizando fetch
        fetch(`http://127.0.0.1:5000/${idUsuario}`, {
          method: 'PUT', // Método HTTP PUT para la actualización
          headers: {
            'Content-Type': 'application/json', // Indica que estás enviando datos en formato JSON
          },
          body: JSON.stringify(formDataObject), // Convierte los datos a formato JSON
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error al actualizar el usuario');
            }
            
            return response.json(); // Si la respuesta es exitosa, lee la respuesta JSON
          })
          .then((data) => {
            obtenerDatosUsuarioDesdeAPI(idUsuario);
            alert("Usuario actualizado con éxito");
            console.log('Usuario actualizado con éxito', data);
            // Puedes realizar acciones adicionales aquí, como redirigir al usuario a otra página
          })
          .catch((error) => {
            console.error('Error al actualizar el usuario', error);
            // Puedes mostrar un mensaje de error al usuario u otras acciones en caso de error
          });
      });
























 

// Función para obtener los datos del usuario desde la API
function obtenerDatosUsuarioDesdeAPI(idUsuario) {
    const url = `http://127.0.0.1:5000/${idUsuario}`;
    
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario desde la API');
        }
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(data));
        return response.json();
      });
  }
 

  const idUsuario = 1; // Reemplaza con el ID del usuario que deseas obtener
  
//   obtenerDatosUsuarioDesdeAPI(idUsuario)
//     .then((data) => {
//       console.log('Datos del usuario obtenidos con éxito', data);
      
//       // Puedes utilizar los datos obtenidos en tu aplicación, como actualizar la página con la información del usuario.
//       // Ejemplo: Actualizar el nombre de usuario en la página
//       document.getElementById('username').textContent = data.username;
//     })
//     .catch((error) => {
//       console.error('Error al obtener los datos del usuario', error);
//     });

  
  
  
//   // Función para abrir la ventana modal
// document.getElementById('avatarButton').addEventListener('click', function () {
//     document.getElementById('modal').style.display = 'block';
//   });
  
//   // Función para cerrar la ventana modal
//   document.getElementById('closeButton').addEventListener('click', function () {
//     document.getElementById('modal').style.display = 'none';
//   });
  
//   let selectedAvatar = ''; // Variable para guardar la ruta de la imagen seleccionada
  
//   // Función para seleccionar un avatar
//   function seleccionarAvatar(avatarPath) {
//     selectedAvatar = avatarPath;
//   }
  
//   // Función para guardar la imagen seleccionada y cerrar la ventana modal
//   document.getElementById('guardarButton').addEventListener('click', function () {
//     if (selectedAvatar) {
//       document.getElementById('imagen_perfil_preview').src = selectedAvatar;
//       document.getElementById('modal').style.display = 'none';
//       // Aquí puedes hacer algo con la variable selectedAvatar, como enviarla al servidor.
//     }
//   });
  
  









