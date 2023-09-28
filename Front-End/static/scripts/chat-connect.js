window.addEventListener('load', function () {
    // Comprobar si `userData` está en localStorage y contiene datos del usuario
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        //displayProfileData(userData);
        const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;

        obtenerDatosUsuarioDesdeAPI(idUsuario)

    } else {
        // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
       // alert("Esta siendo redireccionado...");
        window.location.href = "/Front-End/templates/index.html";
    }
});

///////////////////////// READ ////////////////////////////
// Función para obtener los datos del usuario desde la API y actualizar el formulario
function obtenerDatosUsuarioDesdeAPI(idUsuario) {
    const url = `http://127.0.0.1:5000/${idUsuario}`;
    
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario desde la API');
        }
        
        return response.json();
      })
      .then((data) => {
        // Actualiza los campos del formulario con los nuevos datos
        displayProfileData(data);
        // document.querySelector('input[name="nombre"]').value = data.nombre;
        // document.querySelector('input[name="apellido"]').value = data.apellido;
        // document.querySelector('input[name="email"]').value = data.email;
        // document.querySelector('input[name="username"]').value = data.username;
      });
}

///////////////////////// READ ////////////////////////////
function displayProfileData(Data) {
    // Asignar los datos del usuario a los campos de entrada
    //document.getElementsByName("id_usuario")[0].value = Data.id_usuario;
    //document.getElementsByName("nombre")[0].value = Data.nombre;
    // document.getElementsByName("apellido")[0].value = Data.apellido;
    // document.getElementsByName("email")[0].value = Data.email;
    //document.getElementsByName("username")[0].value = Data.username;
    

    // Asignar la ruta de la imagen de perfil al elemento de vista previa
    document.getElementById("imagen_perfil_preview").src = Data.ruta_imagen_perfil;
    document.getElementsByName("username")[0].textContent = Data.username;
    document.getElementsByName("id_usuario")[0].textContent = "#" + Data.id_usuario;

    //document.getElementsByName("contraseña")[0].value = userData.contraseña;
    // document.getElementsByName("fecha_nacimiento")[0].value = userData.fecha_nacimiento;
    
}



  document.getElementById('openProfile').addEventListener('click', () => {
    // URL de la página a la que deseas redirigir
    const profileURL = '/Front-End/templates/profile.html';

    // Opciones para la ventana emergente
    const popupOptions = 'width=400,height=400,menubar=no,location=no,resizable=no,scrollbars=no,status=no';

    // Abrir la ventana emergente
    const popupWindow = window.open(profileURL, 'Profile', popupOptions);

    // Enfocar la ventana emergente (opcional)
    if (popupWindow) {
        popupWindow.focus();
    }
});