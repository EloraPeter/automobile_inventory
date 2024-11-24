//login.js

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful');
            localStorage.setItem('token', data.token);  // Store JWT token in localStorage
            // Redirect or update UI to show dashboard
        } else {
            alert(data.error || 'Something went wrong');
        }
    } catch (error) {
        console.error(error);
        alert('Error during login');
    }
});
