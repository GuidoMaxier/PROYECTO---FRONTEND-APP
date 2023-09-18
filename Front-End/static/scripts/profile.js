window.addEventListener('load', function () {
    // Comprobar si `userData` está en localStorage y contiene datos del usuario
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        displayProfileData(userData);
    } else {
        // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
        window.location.href = "./login.html";
    }
});

document.getElementById("logout").addEventListener("click", logout);

// function displayProfileData(userData) {
//     // Mostrar los datos del usuario desde `userData`
//     document.getElementById("username").innerText = userData.username;
//     document.getElementById("email").innerText = userData.email;
//     document.getElementById("nombre").innerText = userData.nombre;
//     document.getElementById("apellido").innerText = userData.apellido;
  
// }

function displayProfileData(userData) {
    // Asignar los datos del usuario a los campos de entrada
    // document.getElementsByName("id_usuario")[0].value = userData.id_usuario;
    document.getElementsByName("nombre")[0].value = userData.nombre;
    document.getElementsByName("apellido")[0].value = userData.apellido;
    document.getElementsByName("email")[0].value = userData.email;
    document.getElementsByName("username")[0].value = userData.username;
    document.getElementsByName("contraseña")[0].value = userData.contraseña;
    // document.getElementsByName("fecha_nacimiento")[0].value = userData.fecha_nacimiento;
   // Asignar la ruta de la imagen de perfil al elemento de vista previa
   document.getElementById("imagen_perfil_preview").src = userData.ruta_imagen_perfil;
}

function logout() {
    // Eliminar `userData` de localStorage al cerrar sesión
    localStorage.removeItem('userData');
    
    const url = "http://127.0.0.1:5000/logout";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "./index.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}



















// window.addEventListener('load', function () {
//     getProfile();
// });

// document.getElementById("logout").addEventListener("click", logout);

// function getProfile() {
//     const url = "http://127.0.0.1:5000/profile";
    
//     fetch(url, {
//         method: 'GET',
//         credentials: 'include'
//         // headers: {
//         //     'Content-Type': 'application/json'
//         // }
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json().then(data => {

//                 document.getElementById("username").innerText = data.username;
//                 document.getElementById("email").innerText = data.email;
//                 document.getElementById("nombre").innerText = data.nombre;
//                 document.getElementById("apellido").innerText = data.apellido;
//             });
//         } else {
//             return response.json().then(data => {
//                 document.getElementById("message").innerHTML = data.message;
//             });
//         }
//     })
//     .catch(error => {
//         document.getElementById("message").innerHTML = "An error occurred.";
//     });
// }

// function logout() {
//     const url = "http://127.0.0.1:5000/logout";
    
//     fetch(url, {
//         method: 'GET',
//         credentials: 'include'
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json().then(data => {
//                 window.location.href = "./index.html";
//             });
//         } else {
//             return response.json().then(data => {
//                 document.getElementById("message").innerHTML = data.message;
//             });
//         }
//     })
//     .catch(error => {
//         document.getElementById("message").innerHTML = "An error occurred.";
//     });
// }