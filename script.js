const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Get the password input element
const password = document.getElementById("input");

// Add an event listener to the password input
password.addEventListener("invalid", function() {
  // When the input is invalid, set the border to red
  password.style.border = "2px solid red";
});


// Get the signup button and form
const signupButton = document.getElementById('signup-button');


// Get the signin button and form
const signinButton = document.getElementById('signin-button');


// Add an onclick event listener to the signup button
signupButton.addEventListener('click', () => {
  // Submit the signup form
  signupForm.submit();
});

// Add an onclick event listener to the signin button
signinButton.addEventListener('click', () => {
  // Submit the signin form
  signinForm.submit();
});


const form = document.getElementById('login-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get the email and password values from the form
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Send a POST request to the server with the email and password
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server's response
      if (data.error) {
        alert(data.error);
      } else {
        // Save the JWT token in the browser's local storage for future use
localStorage.setItem('token', data.token);
// Redirect the user to the dashboard or home page
window.location.href = '/dashboard';
}
})
.catch((err) => {
console.error(err);
});
});

const signUp = document.getElementById('signup-form');
signUp.addEventListener('submitup', (event) => {
  event.preventDefault();
  // Get the form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // Send a POST request to the server with the form values
  fetch('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server's response
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        // Redirect the user to the login page
        window.location.href = '/login';
	}
	})
	.catch((err) => {
	console.error(err);
	});
	});

