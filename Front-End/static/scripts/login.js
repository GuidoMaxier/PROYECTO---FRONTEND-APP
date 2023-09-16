 // Código JavaScript para la página de Inicio de Sesión (login.js)
 document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // const username = document.getElementById('username').value;
    // const password = document.getElementById('password').value;

    const data = {

        'username': document.getElementById('username').value,
        'contraseña': document.getElementById('password').value
    }

    fetch('http://127.0.0.1:5000/login2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    // .then(response => response.json())
    // .then(data => {
    //     alert(data.message);
    // });
    .then(response => {
        if (response.status === 200) {
            // Redirect to profile page if login is successful
            return response.json()
            .then(data => {
                alert(data.message);
                window.location.href = "C:/Users/Guido Maxier/Documents/GitHub/PROYECTO---UI-web-app/BORRAR/profile.html";
                
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
});


