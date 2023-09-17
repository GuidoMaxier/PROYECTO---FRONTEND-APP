  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    login();
  });

  function login() {
  const data = {
      username: document.getElementById('username').value,
      contraseña: document.getElementById('password').value
  };

  fetch('http://127.0.0.1:5000/login2', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
  })
  .then(response => {
      if (response.status === 200) {
          // Si el inicio de sesión es exitoso, guarda los datos en localStorage
          return response.json()
          .then(data => {
              
              // Almacena userData en localStorage
              localStorage.setItem('userData', JSON.stringify(data));
              // Redirige a la página de perfil
              window.location.href = "./profile.html";
          });
      } else {
          return response.json().then(data => {
              alert(data.message);
              document.getElementById("message").innerHTML = data.message;
             
          });
      }
  })
  .catch(error => {
      document.getElementById("message").innerHTML = "An error occurred.";
  });
  }





















// function login() {
//     const data = {

//         username: document.getElementById('username').value,
//         contraseña: document.getElementById('password').value
//     };

//     fetch('http://127.0.0.1:5000/login2', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//         credentials: 'include'
//     })
//     // .then(response => response.json())
//     // .then(data => {
//     //     alert(data.message);
//     // });
//     .then(response => {
//         if (response.status === 200) {
//             // Redirect to profile page if login is successful
//             return response.json()
//             .then(data => {
//                 // alert(data.message);
//                 window.location.href = "./profile.html";
                
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



// // Función para realizar el inicio de sesión
// function login2(username, password) {
//     // Define los datos del usuario para enviar al backend
//     const userData = {
//       username: username,
//       contraseña: password
//     };
  
//     // Realiza una solicitud POST al endpoint de inicio de sesión de tu API
//     fetch('http://127.0.0.1:5000/login2', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     })
//     .then(response => {
//       if (response.ok) {
//         // Si la respuesta es exitosa, el usuario está autenticado
//         return response.json();
//       } else {
//         // Si la respuesta indica un error, maneja el error de inicio de sesión
//         throw new Error('Error de inicio de sesión');
//       }
//     })
//     .then(data => {
//       // Maneja la respuesta del backend (por ejemplo, guarda el token en localStorage)
//       const token = data.token;
//       localStorage.setItem('token', token);
  
//       // Redirige a la página de inicio o realiza otras acciones necesarias
//       window.location.href = './profile.html'; // Reemplaza '/inicio' con la URL adecuada
//     })
//     .catch(error => {
//       // Maneja el error de inicio de sesión
//       console.error(error);
//       // Muestra un mensaje de error al usuario o realiza otras acciones necesarias
//     });
//   }
  
// // document.addEventListener('DOMContentLoaded', function () {
// //     const loginForm = document.getElementById('login-form');
    
// //     loginForm.addEventListener('submit', function (e) {
// //         e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
        
// //         // Obtiene los valores de los campos del formulario
// //         const username = document.getElementById('username').value;
// //         const password = document.getElementById('password').value;

// //         // Crea un objeto con los datos del formulario
// //         const formData = {
// //             username: username,
// //             contraseña: password // Asegúrate de que coincide con el nombre del campo en tu backend
// //         };

// //         // Realiza una solicitud POST al backend utilizando fetch
// //         fetch('http://127.0.0.1:5000/login2', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify(formData)
// //         })
// //         .then(response => {
// //             if (response.status === 200) {
// //                 // El inicio de sesión fue exitoso
// //                 return response.json();
// //             } else {
// //                 // El inicio de sesión falló, maneja el error según corresponda
// //                 console.error('Error en el inicio de sesión');
// //                 return Promise.reject('Inicio de sesión fallido');
// //             }
// //         })
// //         .then(data => {
// //             // Maneja la respuesta exitosa desde el backend
// //             // data contiene la respuesta del backend, por ejemplo, los datos del usuario
// //             console.log('Inicio de sesión exitoso', data);
// //             // Redirecciona al perfil del usuario o realiza otras acciones necesarias
// //             window.location.href = './profile.html';
// //         })
// //         .catch(error => {
// //             // Maneja cualquier error que pueda ocurrir durante la solicitud
// //             console.error('Error:', error);
// //         });
// //     });
// // });

  

