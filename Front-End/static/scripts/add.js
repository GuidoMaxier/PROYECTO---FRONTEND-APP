// Obtener elementos de las ventanas modales
const serverModal = document.getElementById('serverModal');
const profileModal = document.getElementById('profileModal');

const channelModal = document.getElementById('channelModal');
const serverNameInput = document.getElementById('serverNameInput');
const channelNameInput = document.getElementById('channelNameInput');
const serverList = document.getElementById('serverList');
const channelList = document.getElementById('channelList');
const channelColumn = document.getElementById('channel_column');
const messages = document.getElementById('messages');
const noServers = document.getElementById('no_servers');

const currentDate = new Date().toISOString().slice(0, 10); // AAAA-MM-DD


const usuarioId = JSON.parse(localStorage.getItem('userData')).id_usuario;



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


// Mostrar ventana modal para Profile
document.getElementById('button-profile').addEventListener('click', () => {
    
    profileModal.style.display = 'block';
});

//Se cierra la ventana Profile
document.getElementById('closeProfile').addEventListener('click', () => {
    profileModal.style.display = 'none';
});



/// Capturar nombre de servidor y agregarlo
document.getElementById('createServer').addEventListener('click', () => {

    noShowServers();
    const newServerName = serverNameInput.value;
    if (newServerName) {


        const serverData = {
            nombre: newServerName,
            descripcion: "generica",
            fecha_creacion: '2020-12-12',//currentDate,
            id_usuario: usuarioId,
          };

        crearServidor(serverData);
    

        serverModal.style.display = 'none';
        serverNameInput.value = ''; // Limpiar el input

        // // Agregar un evento click al nuevo servidor
        // newServerItem.addEventListener('click', () => {
 
        //     toggleChannelColumnVisibility();
        // });
    }
});


// Variable para llevar el seguimiento del estado de la columna
let channelColumnVisible = true;

// Función para alternar la visibilidad de la columna "channel_column"
function toggleChannelColumnVisibility() {
    if (channelColumnVisible) {
        // Si la columna está visible, la ocultamos
        channelColumn.style.display = 'none';
    } else {
        // Si la columna está oculta, la mostramos
        channelColumn.style.display = 'block';
    }
    // Invertir el estado de la columna
    channelColumnVisible = !channelColumnVisible;
}


// Función ocultar "no_servers"
function noShowServers() {
    noServers.style.display = 'none';
}


// Define la función que se ejecutará al hacer clic en el elemento
function miFuncion(nombreDelServidor) {
    // Hacer lo que necesites con el nombre del servidor
    console.log('Hiciste clic en el servidor:', nombreDelServidor);
}

// Capturar nombre de canal y agregarlo
document.getElementById('createChannel').addEventListener('click', () => {
    const newChannelName = channelNameInput.value;

    if (newChannelName) {

        const canalData = {
            nombre: newChannelName,   
            servidor_id: serverId,
          };

        crearCanal(canalData);
        console.log(serverId)


        channelModal.style.display = 'none';
        channelNameInput.value = ''; // Limpiar el input



        //AGREGANDO FUNCIONAAAA
        // Agregar un evento click al nuevo elemento
        // newContents.addEventListener('click', () => {
        //     showMessages();
        // });
    }
});


// Función para mostrar la columna "channel_column"  FUNCIONAAAAAA
function showMessages() {
    // Mostrar la columna "channel_column"
    messages.style.display = 'block';
   
}



// Botón de cierre para la ventana modal de servidor
document.getElementById('closeServerModal').addEventListener('click', () => {
    serverModal.style.display = 'none';
});

// Botón de cierre para la ventana modal de canal
document.getElementById('closeChannelModal').addEventListener('click', () => {
    channelModal.style.display = 'none';
});
