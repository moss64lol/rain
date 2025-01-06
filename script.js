const API_URL = 'https://rainvillage.co.uk'; 


function showRegister() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}


function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}


async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('register-error').innerText = 'Passwords do not match.';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, confirmPassword }),
        });
        const data = await response.text();
        if (response.ok) {
            alert('Registration successful!');
            showLogin();
        } else {
            document.getElementById('register-error').innerText = data;
        }
    } catch (err) {
        console.error(err);
    }
}


async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            alert('Login successful!');
            loadComments();
        } else {
            document.getElementById('login-error').innerText = data;
        }
    } catch (err) {
        console.error(err);
    }
}



