// fetch('/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ first_name, last_name, email, password })
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.message === 'User created successfully') {
//       window.location.href = '/login'; // Redirect to login page after signup success
//     } else {
//       alert(data.error);
//     }
//   })
//   .catch(error => console.error('Error:', error));
  

// const form = document.querySelector('signup-form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
  
//   const firstName = document.getElementById('first_name').value;
//   const lastName = document.getElementById('last_name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   // Send the POST request
//   fetch('http://localhost:3000/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.message === 'User created successfully') {
//       // Redirect to login page
//       window.location.href = 'http://127.0.0.1:5500/login';  // Adjust this URL as necessary
//     } else {
//       console.error(data.error);
//       alert(data.error || 'An error occurred');
//     }
//   })
//   .catch(error => {
//     console.error('Network error:', error);
//     alert('Network error, please try again');
//   });
// });
