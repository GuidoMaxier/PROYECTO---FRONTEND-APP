    // Código JavaScript para la página de Registro (register.js)
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username_r = document.getElementById('username_r').value;
        const password_r = document.getElementById('password_r').value;

        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username_r, password_r })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    });

