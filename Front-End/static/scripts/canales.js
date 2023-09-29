function cargarCanales(serverId) {
  // Limpiar la lista de canales existentes
  channelList.innerHTML = '';

  fetch(`http://127.0.0.1:5000/canal/server/${serverId}`, {
      method: 'GET',
      credentials: 'include',
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error('Error al obtener la lista de canales');
      }
      return response.json();
  })
  .then((data) => {
      // La respuesta del servidor con la lista de canales se encuentra en 'data'
      const canales = data;

      // Recorrer la lista de canales y crear elementos HTML para cada uno de ellos
      canales.forEach((canal) => {
          const newContents = document.createElement('div');
          newContents.classList.add('contents2');
          newContents.id = 'contents2'; // Asignar un id si es necesario

          const newChannelList = document.createElement('div');
          newChannelList.classList.add('channel-list');
          newChannelList.id = 'channelList'; // Asignar un id si es necesario

          // Almacenar el id_canal como un atributo personalizado
          newContents.dataset.channelId = canal.id_canal;

          const channelItem = document.createElement('p');
          channelItem.classList.add('Channel');
          channelItem.textContent = `# ${canal.nombre}`;

          newChannelList.appendChild(channelItem);
          newContents.appendChild(newChannelList);

          // Agregar los elementos adicionales al contenido
          const holder1 = document.createElement('div');
          holder1.classList.add('holder');
          const img1 = document.createElement('img');
          img1.src = '../assets/user-plus-16.svg';
          const hover1 = document.createElement('div');
          hover1.classList.add('hover2');
          hover1.textContent = 'Crear invitación';
          holder1.appendChild(img1);
          holder1.appendChild(hover1);

          const holder2 = document.createElement('div');
          holder2.classList.add('holder');
          const img2 = document.createElement('img');
          img2.src = '../assets/settings-16.svg';
          const hover2 = document.createElement('div');
          hover2.classList.add('hover2');
          hover2.textContent = 'Editar canal';
          holder2.appendChild(img2);
          holder2.appendChild(hover2);

          const optionsDiv = document.createElement('div');
          optionsDiv.appendChild(holder1);
          optionsDiv.appendChild(holder2);

          newContents.appendChild(optionsDiv);

          // Agregar el nuevo contenido a la lista de canales
          channelList.appendChild(newContents);

          // Agregar un evento click al nuevo elemento
          newContents.addEventListener('click', () => {
              canalId = newContents.dataset.channelId;
              console.log("canal nro: " + canalId);
              
              //cargarMensajes(canalId);
              showMessages();
              cargarMensajesEnChat();
              // obtenerMensaje();

          });
      });
  })
  .catch((error) => {
      console.error(error.message); // Maneja errores si ocurrieron
  });
}

  ////////////////// CREATE CANALES //////////////////////
  function crearCanal(canalData) {

    console.log(canalData);
  
  
        // Realiza la solicitud HTTP POST al backend
        fetch('http://127.0.0.1:5000/canal/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(canalData),
          
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error al crear el servidor');
            }
            return response.json();
          })
          .then((data) => {
            // La respuesta del servidor se encuentra en 'data'
            // const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
            console.log(data.message); // Muestra el mensaje de éxito en la consola
            cargarCanales(serverId);
  
            // Aquí puedes realizar cualquier otra acción después de crear el servidor con éxito
          })
          .catch((error) => {
            console.error(error.message); // Maneja errores si ocurren
      });
    }