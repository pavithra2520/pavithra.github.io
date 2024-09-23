document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Here you would typically send a request to your server
    alert(`Logged in as ${username}`);
});
    document.getElementById('login-form').onsubmit = function(event) {
        event.preventDefault(); // Prevent form submission
        // Add your login logic here (e.g., validation)
        window.location.href = 'in.html'; // Redirect to index.html
    };
