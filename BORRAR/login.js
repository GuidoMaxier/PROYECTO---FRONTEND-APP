// document.getElementById("loginForm").addEventListener("submit", function (event) {
//     event.preventDefault();
//     login();
// });

// function login() {
//     const data = {
//         username: document.getElementById("username").value,
//         password: document.getElementById("password").value,
//     };

//     fetch("http://127.0.0.1:5000/auth/login", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//         credentials: 'include'
//     })
//     .then(response => {
//         if (response.status === 200) {
//             // Redirect to profile page if login is successful
//             return response.json().then(data => {
//                 window.location.href = "profile.html";
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

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
        
        // Obtiene los valores de los campos del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Crea un objeto con los datos del formulario
        const formData = {
            username: username,
            contraseña: password // Asegúrate de que coincide con el nombre del campo en tu backend
        };

        // Realiza una solicitud POST al backend utilizando fetch
        fetch('http://127.0.0.1:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 200) {
                // El inicio de sesión fue exitoso
                return response.json();
            } else {
                // El inicio de sesión falló, maneja el error según corresponda
                console.error('Error en el inicio de sesión');
                return Promise.reject('Inicio de sesión fallido');
            }
        })
        .then(data => {
            // Maneja la respuesta exitosa desde el backend
            // data contiene la respuesta del backend, por ejemplo, los datos del usuario
            console.log('Inicio de sesión exitoso', data);
            // Redirecciona al perfil del usuario o realiza otras acciones necesarias
        })
        .catch(error => {
            // Maneja cualquier error que pueda ocurrir durante la solicitud
            console.error('Error:', error);
        });
    });
});