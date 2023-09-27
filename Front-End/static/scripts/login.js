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
              alert(data.message + "\n Te invitamos a crear una cuenta de usuario");
              //document.getElementById("message").innerHTML = data.message;
             
          });
      }
  })
  .catch(error => {
      document.getElementById("message").innerHTML = "An error occurred.";
  });
  }





