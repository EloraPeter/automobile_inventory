//signup.js


document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful!');
            // Store the token in localStorage or sessionStorage
            localStorage.setItem('token', data.token);
            // Redirect to the dashboard
            window.location.href = '/dashboard';
        } else {
            alert(data.error || 'An error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error, please try again');
    }
});


