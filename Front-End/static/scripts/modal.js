// Función para abrir la ventana modal
document.getElementById('imagen_perfil_preview').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'block';
  });
  
  // Función para cerrar la ventana modal
  document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
  });
  
  let selectedAvatar = ''; // Variable para guardar la ruta de la imagen seleccionada
  
// Función para seleccionar un avatar
function seleccionarAvatar(avatarPath) {
    selectedAvatar = avatarPath;
  
    // Resetea los bordes de todas las imágenes
    const images = document.querySelectorAll('.image-container img');
    images.forEach(image => {
      image.style.border = '3px solid rgb(17, 17, 17)'; // Borde rojo para las no seleccionadas
    });
  
    // Establece el borde verde para la imagen seleccionada
    const selectedImage = document.querySelector(`.image-container img[src="${avatarPath}"]`);
    selectedImage.style.border = '4px solid lime'; // Borde verde para la seleccionada
  }
  
  // Función para guardar la imagen seleccionada y cerrar la ventana modal
  document.getElementById('guardarButton').addEventListener('click', function () {
    if (selectedAvatar) {
      document.getElementById('imagen_perfil_preview').src = selectedAvatar;
      document.getElementById('modal').style.display = 'none';
      // Aquí puedes hacer algo con la variable selectedAvatar, como enviarla al servidor.
    }
  });



  