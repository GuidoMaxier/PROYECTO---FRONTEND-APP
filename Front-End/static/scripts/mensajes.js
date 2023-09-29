
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

                const avatarSrc = datosUsuario.ruta_imagen_perfil;
                const userName = datosUsuario.username;
                const messageTime = mensaje.fecha;
                const messageText = mensaje.contenido;
                const id_mensaje = mensaje.id_mensaje;


                addMessage(avatarSrc, userName, messageText, messageTime, id_mensaje)


                // const mensajeElement = document.createElement("div");

                // mensajeElement.classList.add("mensaje");
                // mensajeElement.textContent = `${datosUsuario.username}: ${mensaje.contenido}`;
        
                // chatElement.appendChild(mensajeElement);
                })
                .catch((error) => {
                    console.error(error);
                });

        });
      })
      .catch((error) => {
        console.error("Error al obtener mensajes:", error);
      });
          // Actualiza el chat automáticamente cada 1 segundos
    // setInterval(obtenerMensajes, 1000); // 1000 ms = 1 segundos
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
  

function enviarMensaje(canalId, usuarioId, contenido, fecha) {
    const url = 'http://127.0.0.1:5000/mensaje/'; // Reemplaza con la URL correcta de tu backend
  
    // Crear un objeto con los datos del mensaje
    const mensajeData = {
      canal_id: canalId,
      usuario_id: usuarioId,
      contenido: contenido,
      fecha: fecha
    };

    console.log(mensajeData);

    // Configurar la solicitud POST
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mensajeData),
    };
  
    // Realizar la solicitud POST al servidor
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar el mensaje al servidor');
        }
        return response.json();
      })
      .then((data) => {
        // Los datos de respuesta desde el servidor, si los hay, estarán disponibles aquí
        cargarMensajesEnChat();
        console.log('Mensaje enviado exitosamente:', data);
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      });
  }