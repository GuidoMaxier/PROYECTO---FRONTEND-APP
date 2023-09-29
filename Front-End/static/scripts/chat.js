
// Obtén una referencia al contenedor de mensajes y a los elementos de entrada
const chatContainer = document.getElementById('chat');
const messageText = document.getElementById('message_text');
const sendButton = document.getElementById('send_button');

const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
const avatar = JSON.parse(localStorage.getItem('userData')).ruta;

// Agregar un evento click al botón "Enviar"
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Agregar un evento keypress al área de texto para permitir el envío con Enter
messageText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
        e.preventDefault(); // Evitar el salto de línea en el textarea
    }
});

// Función para obtener la fecha y hora en el formato deseado
function getDateTime() {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const day = currentTime.getDate().toString().padStart(2, '0');
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Función para enviar un mensaje
function sendMessage() {
    const message = messageText.value.trim();
    if (message !== '') {
        //const dateTime = getDateTime();
        const currentDate = new Date().toISOString().slice(0, 10); // AAAA-MM-DD

        enviarMensaje(canalId, idUsuario, message, currentDate);

        //addMessage('../assets/monkey.png', 'Usuario Actual', message, dateTime);
        messageText.value = '';
        // Desplazarse al final del historial de mensajes
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Función para agregar un mensaje
function addMessage(avatarSrc, userName, messageText, messageTime, id_mensaje) {
    // Crea un nuevo mensaje
    const message = document.createElement('div');
    message.classList.add('message');

    const userAvatar = document.createElement('img');
    userAvatar.classList.add('user_avatar');
    userAvatar.src = avatarSrc;
    userAvatar.alt = 'User Avatar';

    //     // Almacenar el id_servidor como un atributo personalizado
    message.dataset.messageid = id_mensaje;

    const messageContent = document.createElement('div');
    messageContent.classList.add('message_content');

    const userElement = document.createElement('span');
    userElement.classList.add('user_name');
    userElement.textContent = `${userName} - ${messageTime}`;

    const messageElement = document.createElement('span');
    messageElement.classList.add('message_text');
    messageElement.textContent = messageText;


    /*FUNCIONA MUY BIEN*/
    const editButton = document.createElement('span');
    editButton.classList.add('edit_button');
    editButton.textContent = 'Editar';
    
    editButton.addEventListener('click', () => {
        if (editButton.textContent === 'Editar') {
            // Habilitar la edición del mensaje
            messageElement.contentEditable = true;
            messageElement.classList.add('editable');
            messageElement.focus();

            // Cambiar el texto del botón a "Guardar"
            editButton.textContent = 'Guardar';
        } else {
            // Guardar el mensaje editado
            const newMessage = messageElement.textContent.trim();
            if (newMessage !== '') {
                // Actualizar el contenido del mensaje
                messageElement.textContent = newMessage;
                // Deshabilitar la edición
                messageElement.contentEditable = false;
                messageElement.classList.remove('editable');
                // Cambiar el texto del botón de nuevo a "Editar"
                editButton.textContent = 'Editar';
            }
        }
    });



    // Botón para eliminar
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete_button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
        // Lógica para eliminar el mensaje aquí
        chatContainer.removeChild(message);
        //llamamos a la fetch para que elimine el msj de la base de datos le tenemos 
        // mandar el id del mensaje
    });

    const messageButtons = document.createElement('div');
    messageButtons.classList.add('message_buttons');
    messageButtons.appendChild(editButton);
    messageButtons.appendChild(deleteButton);

    messageContent.appendChild(userElement);
    messageContent.appendChild(messageElement);
    messageContent.appendChild(messageButtons);

    message.appendChild(userAvatar);
    message.appendChild(messageContent);

    chatContainer.appendChild(message);
}
