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

// Capturar nombre de servidor y agregarlo
document.getElementById('createServer').addEventListener('click', () => {
    const newServerName = serverNameInput.value;
    if (newServerName) {
        const serverItem = document.createElement('li');
        serverItem.classList.add('server');
        serverItem.textContent = newServerName;
        serverList.appendChild(serverItem);
        serverModal.style.display = 'none';
        serverNameInput.value = ''; // Limpiar el input
    }
});

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
