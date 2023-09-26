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
        // Crear la estructura HTML deseada
        const newContents = document.createElement('div');
        newContents.classList.add('contents2');
        newContents.id = 'contents2'; // Asignar un id si es necesario
        

        const newChannelList = document.createElement('div');
        newChannelList.classList.add('channel-list');
        newChannelList.id = 'channelList'; // Asignar un id si es necesario

        const channelItem = document.createElement('p');
        channelItem.classList.add('Channel');
        channelItem.textContent = `# ${newChannelName}`;

        newChannelList.appendChild(channelItem);
        newContents.appendChild(newChannelList);

        // Agregar los elementos adicionales al contenido
        const holder1 = document.createElement('div');
        holder1.classList.add('holder');
        const img1 = document.createElement('img');
        img1.src = 'icons/user-plus.svg';
        const hover1 = document.createElement('div');
        hover1.classList.add('hover2');
        hover1.textContent = 'Crear invitación';
        holder1.appendChild(img1);
        holder1.appendChild(hover1);

        const holder2 = document.createElement('div');
        holder2.classList.add('holder');
        const img2 = document.createElement('img');
        img2.src = 'icons/conf16.svg';
        const hover2 = document.createElement('div');
        hover2.classList.add('hover2');
        hover2.textContent = 'Editar canal';
        holder2.appendChild(img2);
        holder2.appendChild(hover2);

        const optionsDiv = document.createElement('div');
        optionsDiv.appendChild(holder1);
        optionsDiv.appendChild(holder2);

        newContents.appendChild(optionsDiv);

        // Agregar el nuevo contenido a la lista de servidores
        channelList.appendChild(newContents);

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
