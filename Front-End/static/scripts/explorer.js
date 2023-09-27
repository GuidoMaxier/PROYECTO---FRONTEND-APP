const container = document.getElementById('container')


// Se abre la ventana Explorador
document.getElementById('explorer').addEventListener('click', () => {
    
    container.style.display = 'block';
});

//Se cierra la ventana explorador
document.getElementById('close-container').addEventListener('click', () => {
    container.style.display = 'none';
});





let currentPhoto = "";
    
function openModal(photoName) {
    currentPhoto = photoName;
    const modal = document.getElementById("modal_e");
    modal.style.display = "block";
}
    
function closeModal() {
    const modal = document.getElementById("modal_e");
    modal.style.display = "none";
}
    
function confirmation() {
    lert(`Te has unido al servidor ${currentPhoto}`);
    closeModal();
}

