// function cargarMensajes(canalId) {
//     // Limpiar la lista de mensajes existentes
//     // (debes tener un elemento HTML donde mostrar los mensajes, por ejemplo, un div con el id 'messageList')
//     messageList.innerHTML = '';

//     fetch(`http://127.0.0.1:5000/mensaje/canal/${canalId}`, {
//         method: 'GET',
//         credentials: 'include',
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error('Error al obtener la lista de mensajes');
//         }
//         return response.json();
//     })
//     .then((data) => {
//         // La respuesta del servidor con la lista de mensajes se encuentra en 'data'
//         const mensajes = data;

//         // Recorrer la lista de mensajes y mostrarlos en la interfaz de usuario
//         mensajes.forEach((mensaje) => {
//             // Crea elementos HTML para mostrar cada mensaje en la lista

//             const mensajeItem = document.createElement('div');
//             mensajeItem.textContent = mensaje.contenido;

//             // Agrega el mensajeItem al messageList (elemento HTML donde mostrar los mensajes)
//             messageList.appendChild(mensajeItem);
//         });
//     })
//     .catch((error) => {
//         console.error(error.message); // Maneja errores si ocurrieron
//     });
// }


// function obtenerDatosUsuarioMensaje(idUsuario) {
//     const url = `http://127.0.0.1:5000/${idUsuario}`;
    
//     return fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Error al obtener los datos del usuario desde la API');
//         }
        
//         return response.json();
//       })
//       .then((data) => {
//         // Actualiza los campos del formulario con los nuevos datos
//         displayProfileData(data);

//       });
// }

function cargarMensajesEnChat() {
    const chatElement = document.getElementById("chat");
  
    // Limpiar el chat actual (si es necesario)
    chatElement.innerHTML = "";
  
    // ID del canal del que deseas cargar los mensajes
    // Reemplaza con el ID del canal deseado
  
    // Realizar una solicitud al servidor para obtener los mensajes del canal
    fetch(`http://127.0.0.1:5000/mensaje/canal/${canalId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener mensajes');
        }
        return response.json();
      })
      .then((mensajes) => {
        // Recorrer los mensajes y agregarlos al chat
        mensajes.forEach((mensaje) => {

         obtenerDatosUsuario(mensaje.usuario_id)
            .then((datosUsuario) => {
                //console.log(datosUsuario); // Aquí puedes acceder a los datos del usuario
                const mensajeElement = document.createElement("div");







                
                mensajeElement.classList.add("mensaje");
                mensajeElement.textContent = `${datosUsuario.username}: ${mensaje.contenido}`;
        
                chatElement.appendChild(mensajeElement);
            })
            .catch((error) => {
                console.error(error);
            });

        });
      })
      .catch((error) => {
        console.error("Error al obtener mensajes:", error);
      });
  }
  
  // Llamar a la función para cargar los mensajes en el chat
//   cargarMensajesEnChat();

// Función para obtener los datos del usuario desde la API y actualizar el formulario
function obtenerDatosUsuario(idUsuario) {
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
        return data
      });
}
  