// window.addEventListener('load', function () {
//   // Comprobar si `userData` está en localStorage y contiene datos del usuario
//   const storedUserData = localStorage.getItem('userData');
  
//   if (storedUserData) {
//       const userData = JSON.parse(storedUserData);
//       // Obtener el ID de usuario
//       const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
//       cargarServidores(idUsuario);

//   } else {
//       // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
//      // alert("Esta siendo redireccionado...");
//       window.location.href = "/Front-End/templates/index.html";
//   }
// });

////////////// READ SERVIDORES //////////////////////////
function cargarServidores(idUsuario) {
  // Limpiar la lista de servidores existentes
  serverList.innerHTML = '';

  fetch(`http://127.0.0.1:5000/servidor/user/${idUsuario}`, {
      method: 'GET',
      credentials: 'include',
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error('Error al obtener la lista de servidores');
      }
      return response.json();
  })
  .then((data) => {
      // La respuesta del servidor con la lista de servidores se encuentra en 'data'
      const servers = data;

      if (Array.isArray(data) && data.length > 0) {
        noShowServers();}

      // Recorrer la lista de servidores y crear elementos HTML para cada uno de ellos
      servers.forEach((server) => {
          const newServerItem = document.createElement('div');
          newServerItem.classList.add('profile1');

          // Almacenar el id_servidor como un atributo personalizado
          newServerItem.dataset.serverId = server.id_servidor;

          const serverIcon = document.createElement('p');
          serverIcon.textContent = server.nombre[0];

          const whiteLine = document.createElement('div');
          whiteLine.classList.add('white_line');

          const hoverText = document.createElement('div');
          hoverText.classList.add('hover');
          hoverText.textContent = server.nombre;

          newServerItem.appendChild(serverIcon);
          newServerItem.appendChild(whiteLine);
          newServerItem.appendChild(hoverText);

          // Agregar el nuevo servidor a la lista de servidores en el frontend
          serverList.appendChild(newServerItem);

          // Agregar un evento click al nuevo servidor
          newServerItem.addEventListener('click', (event) => {
              serverId = event.currentTarget.dataset.serverId;
  
              //toggleChannelColumnVisibility();
              cargarCanales(serverId);
              //const serverId = this.getAttribute('data-server-id');
    
              // Imprime el valor en la consola o haz lo que necesites con él
              console.log('Valor de data-server-id:', serverId);
          });
      });
  })
  .catch((error) => {
      console.error(error.message); // Maneja errores si ocurrieron
  });
}




  ////////////////// CREATE SERVIDORES //////////////////////
function crearServidor(serverData) {


  console.log(serverData);


      // Realiza la solicitud HTTP POST al backend
      fetch('http://127.0.0.1:5000/servidor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverData),
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al crear el servidor');
          }
          return response.json();
        })
        .then((data) => {
          // La respuesta del servidor se encuentra en 'data'
          console.log(data.message); // Muestra el mensaje de éxito en la consola
          cargarServidores(serverData.id_usuario)

          // Aquí puedes realizar cualquier otra acción después de crear el servidor con éxito
        })
        .catch((error) => {
          console.error(error.message); // Maneja errores si ocurren
    });
  }