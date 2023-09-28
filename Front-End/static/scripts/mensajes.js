function cargarMensajes(channelId) {
    // Limpiar la lista de mensajes existentes
    // (debes tener un elemento HTML donde mostrar los mensajes, por ejemplo, un div con el id 'messageList')
    messageList.innerHTML = '';

    fetch(`http://127.0.0.1:5000/mensaje/canal/${channelId}`, {
        method: 'GET',
        credentials: 'include',
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al obtener la lista de mensajes');
        }
        return response.json();
    })
    .then((data) => {
        // La respuesta del servidor con la lista de mensajes se encuentra en 'data'
        const mensajes = data;

        // Recorrer la lista de mensajes y mostrarlos en la interfaz de usuario
        mensajes.forEach((mensaje) => {
            // Crea elementos HTML para mostrar cada mensaje en la lista
            const mensajeItem = document.createElement('div');
            mensajeItem.textContent = mensaje.contenido;
            // Agrega el mensajeItem al messageList (elemento HTML donde mostrar los mensajes)
            messageList.appendChild(mensajeItem);
        });
    })
    .catch((error) => {
        console.error(error.message); // Maneja errores si ocurrieron
    });
}
