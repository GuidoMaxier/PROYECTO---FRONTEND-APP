// Obtener elementos de las ventanas modales
const serverModal = document.getElementById('serverModal');
const channelModal = document.getElementById('channelModal');
const serverNameInput = document.getElementById('serverNameInput');
const channelNameInput = document.getElementById('channelNameInput');
const serverList = document.getElementById('serverList');
const channelList = document.getElementById('channelList');


// Mostrar ventana modal para crear servidor
document.getElementById('create-server').addEventListener('click', () => {
    serverNameInput.value = ''; // Limpiar el input
    serverModal.style.display = 'block';
});

// Mostrar ventana modal para crear canal
document.getElementById('create-channel').addEventListener('click', () => {
    channelNameInput.value = ''; // Limpiar el input
    channelModal.style.display = 'block';
});

/// Capturar nombre de servidor y agregarlo
document.getElementById('createServer').addEventListener('click', () => {
    const newServerName = serverNameInput.value;
    if (newServerName) {
        // Crear la estructura HTML deseada
        const newServerItem = document.createElement('div');
        newServerItem.classList.add('profile1');

        const serverIcon = document.createElement('p');
        serverIcon.textContent = newServerName[0];

        const whiteLine = document.createElement('div');
        whiteLine.classList.add('white_line');

        const hoverText = document.createElement('div');
        hoverText.classList.add('hover');
        hoverText.textContent = newServerName;

        newServerItem.appendChild(serverIcon);
        newServerItem.appendChild(whiteLine);
        newServerItem.appendChild(hoverText);

        // Agregar el nuevo servidor a la lista de servidores
        serverList.appendChild(newServerItem);

        serverModal.style.display = 'none';
        serverNameInput.value = ''; // Limpiar el input

        // Agregar un evento click al nuevo elemento
        newServerItem.addEventListener('click', () => {
            miFuncion(newServerName);
        });
    }
});

// Define la función que se ejecutará al hacer clic en el elemento
function miFuncion(nombreDelServidor) {
    // Hacer lo que necesites con el nombre del servidor
    console.log('Hiciste clic en el servidor:', nombreDelServidor);
}

// Capturar nombre de canal y agregarlo
document.getElementById('createChannel').addEventListener('click', () => {
    const newChannelName = channelNameInput.value;
    if (newChannelName) {

        const channelItem = document.createElement('div');
        channelItem.classList.add('channel-list');
        channelItem.textContent = `# ${newChannelName}`;
        
        

        // Agrega el nuevo canal a la lista del contenido
        channelList.appendChild(channelItem);
        newContents.appendChild(newChannelList);

        channelModal.style.display = 'none';
        channelNameInput.value = ''; // Limpiar el input
    }
});

// Botón de cierre para la ventana modal de servidor
document.getElementById('closeServerModal').addEventListener('click', () => {
    serverModal.style.display = 'none';
});

// Botón de cierre para la ventana modal de canal
document.getElementById('closeChannelModal').addEventListener('click', () => {
    channelModal.style.display = 'none';
});
