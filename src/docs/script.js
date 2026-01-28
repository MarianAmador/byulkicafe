function login() {
    const username= document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    if (username === 'MarianAmador' && password === '120904') {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        location.href = 'home.html';
    } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
    
}