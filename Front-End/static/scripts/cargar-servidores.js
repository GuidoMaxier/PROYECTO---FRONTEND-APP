window.addEventListener('load', function () {
  // Comprobar si `userData` está en localStorage y contiene datos del usuario
  const storedUserData = localStorage.getItem('userData');
  
  if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // Obtener el ID de usuario
      const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
      cargarServidores(idUsuario);

  } else {
      // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
     // alert("Esta siendo redireccionado...");
      window.location.href = "/Front-End/templates/index.html";
  }
});


function cargarServidores(idUsuario){

  fetch(`http://127.0.0.1:5000/servidor/user/${idUsuario}`, {
      method: 'GET',
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
    
      // Recorrer la lista de servidores y crear elementos HTML para cada uno de ellos
      servers.forEach((server) => {
        const newServerItem = document.createElement('div');
        newServerItem.classList.add('profile1');

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
        newServerItem.addEventListener('click', () => {
          toggleChannelColumnVisibility();
          // Aquí puedes realizar acciones específicas al hacer clic en un servidor
          // Por ejemplo, cargar canales relacionados con el servidor seleccionado.
        });
      });
    })
    .catch((error) => {
      console.error(error.message); // Maneja errores si ocurrieron
    });
  }