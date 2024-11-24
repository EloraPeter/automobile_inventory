// After a successful signup, redirect and ensure the token is sent in the header when accessing the dashboard
//window.location.href = data.redirect;  // Redirect to the dashboard

// Optionally, you can directly handle the redirect and ensure token is passed for authorization
// fetch('http://localhost:3000/dashboard', {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}` // Sending JWT token in the Authorization header
//   }
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// })
// .catch(error => {
//   console.error(error);
// });


fetch('http://localhost:3000/dashboard', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure the token is sent
    }
  })
  .then(response => {
    if (response.ok) {
      return response.text();  // Expecting HTML file to be sent back
    }
    throw new Error('Failed to load dashboard');
  })
  .then(data => {
    document.body.innerHTML = data;  // Inject the dashboard HTML into the page
  })
  .catch(error => {
    console.error(error);
    alert('Error accessing dashboard: ' + error.message);
  });
  
