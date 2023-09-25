// Obtener elementos de las ventanas modales
const serverModal = document.getElementById('serverModal');
const channelModal = document.getElementById('channelModal');
const serverNameInput = document.getElementById('serverNameInput');
const channelNameInput = document.getElementById('channelNameInput');
const serverList = document.getElementById('serverList');

// Mostrar ventana modal para crear servidor
document.getElementById('create-server').addEventListener('click', () => {
    serverNameInput.value = ''; // Limpiar el input
    serverModal.style.display = 'block';
});

// Capturar nombre de servidor y agregarlo
document.getElementById('createServer').addEventListener('click', () => {
    const newServerName = serverNameInput.value;
    if (newServerName) {
        const serverItem = document.createElement('li');
        serverItem.classList.add('server');
        serverItem.textContent = newServerName;

        // Agrega el nuevo servidor a la lista de servidores
        serverList.appendChild(serverItem);

        serverModal.style.display = 'none';
        serverNameInput.value = ''; // Limpiar el input
    }
});

// Botón de cierre para la ventana modal de servidor
document.getElementById('closeServerModal').addEventListener('click', () => {
    serverModal.style.display = 'none';
});

// Mostrar ventana modal para crear canal
document.getElementById('create-channel').addEventListener('click', () => {
    channelNameInput.value = ''; // Limpiar el input
    channelModal.style.display = 'block';
});

// Capturar nombre de canal y agregarlo
document.getElementById('createChannel').addEventListener('click', () => {
    const newChannelName = channelNameInput.value;
    if (newChannelName) {
        // Crear un nuevo contenedor de canales
        const newContents = document.createElement('div');
        newContents.classList.add('contents');
        
        // Crear la lista de canales dentro del nuevo contenedor
        const newChannelList = document.createElement('ul');
        newChannelList.classList.add('channel-list');
        
        const channelItem = document.createElement('li');
        channelItem.classList.add('Channel');
        channelItem.textContent = `# ${newChannelName}`;
        
        newChannelList.appendChild(channelItem);
        newContents.appendChild(newChannelList);
        
        // Agregar el nuevo contenedor al servidor
        serverList.appendChild(newContents);
        
        channelModal.style.display = 'none';
        channelNameInput.value = ''; // Limpiar el input
    }
});

// Botón de cierre para la ventana modal de canal
document.getElementById('closeChannelModal').addEventListener('click', () => {
    channelModal.style.display = 'none';
});
