document.addEventListener('DOMContentLoaded', function () {

    // Get the elements for both forms and toggler links
    const loginForm = document.getElementById('form-box');
    const signupForm = document.getElementById('form-box-signup');
    const toggleToSignup = document.getElementById('toggle-to-signup');
    const toggleToLogin = document.getElementById('toggle-to-login');

    // Function to show login form
    function showLoginForm() {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }

    // Function to show signup form
    function showSignupForm() {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    }

    // Add event listener for toggling to signup form
    toggleToSignup.addEventListener('click', function (event) {
        event.preventDefault();
        showSignupForm();
    });

    // Add event listener for toggling to login form
    toggleToLogin.addEventListener('click', function (event) {
        event.preventDefault();
        showLoginForm();
    });

    // Initially, show login form
    showLoginForm();

});




// Signup form handling
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(form);
  const data = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    // Send data to server for signup
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle the server response
    if (response.ok) {
      const result = await response.json();
      alert(result.message); // Show success message
      window.location.href = 'http://localhost:3000/login'; // Redirect to login page
    } else {
      const errorResult = await response.json();
      alert(errorResult.message || 'Sign-up failed'); // Show error message if signup fails
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error with the signup');
  }
});

// Login form handling (client-side)
const loginForm = document.querySelector('#login-form');
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(loginForm);
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    // Send data to server for login
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle the server response
    if (response.ok) {
      const result = await response.json();
      const { token } = result; // Get the token from the server response

      // Store the JWT token in localStorage
      localStorage.setItem('token', token);

      alert('Login successful!');
      window.location.href = 'http://localhost:3000/dashboard'; // Redirect to dashboard after successful login
    } else {
      const errorResult = await response.json();
      alert(errorResult.message || 'Login failed'); // Show error message if login fails
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error with the login');
  }
});

// Example of accessing a protected route (Dashboard)
const protectedRoute = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No token found, please log in first.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Send token as Authorization header
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Dashboard Data:', result.message); // Handle the protected route data
    } else {
      alert('Failed to access dashboard. Please log in again.');
      window.location.href = 'http://localhost:3000/login'; // Redirect to login page
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error accessing protected route');
  }
};
