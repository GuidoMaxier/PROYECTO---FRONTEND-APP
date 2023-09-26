
// Obtén una referencia al contenedor de mensajes y a los elementos de entrada
const chatContainer = document.getElementById('chat');
const messageText = document.getElementById('message_text');
const sendButton = document.getElementById('send_button');

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
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Función para enviar un mensaje
function sendMessage() {
    const message = messageText.value.trim();
    if (message !== '') {
        const dateTime = getDateTime();
        addMessage('images/monkey_256.png', 'Usuario Actual', message, dateTime);
        messageText.value = '';
        // Desplazarse al final del historial de mensajes
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Función para agregar un mensaje
function addMessage(avatarSrc, userName, messageText, messageTime) {
    // Crea un nuevo mensaje
    const message = document.createElement('div');
    message.classList.add('message');

    const userAvatar = document.createElement('img');
    userAvatar.classList.add('user_avatar');
    userAvatar.src = avatarSrc;
    userAvatar.alt = 'User Avatar';

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
