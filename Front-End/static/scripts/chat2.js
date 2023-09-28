document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://127.0.0.1:5000/api';
    const chatMessages = document.getElementById('chat');
    const sendButton = document.getElementById('send_button');
    const messageText = document.getElementById('message_text');

    function agregarMensaje(message) {
        const mensaje = document.createElement('div');
        //mensaje.classList.add('message');
        mensaje.innerHTML = `<strong>${message.usuario}:</strong> ${message.mensaje}`;
        chatMessages.appendChild(mensaje);
    }

    //obtenemos lo mensajes de la base de datos falsa
    function obtenerMensajes() {
        fetch(`${apiUrl}/mensajes`)
            .then(response => response.json())
            .then(data => {
                chatMessages.innerHTML = ''; // Borra los mensajes existentes antes de agregar nuevos
                data.forEach(message => {
                    agregarMensaje(message);
                });
            })
            .catch(error => console.error('Error al obtener mensajes:', error));
    }

    obtenerMensajes();

    send_button.addEventListener('click', function() {
        const mensaje = messageText.value;
        const usuario = 'Usuario';  // Puedes obtener el nombre del usuario de tu sistema de autenticación
        console.log('message_text', mensaje);

        const data = { mensaje, usuario };

        fetch(`${apiUrl}/enviar_mensaje`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData); // Aquí puedes manejar la respuesta del servidor
            obtenerMensajes(); // Actualiza los mensajes después de enviar uno nuevo
        })
        .catch(error => console.error('Error al enviar mensaje:', error));

        messageText.value = '';
    });

    // Actualiza el chat automáticamente cada 1 segundos
    setInterval(obtenerMensajes, 1000); // 1000 ms = 1 segundos
});



































