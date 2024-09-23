<?php
// Start session
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bussbookingg";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Basic input validation
    if (empty($username) || empty($password)) {
        echo "<script>alert('Both username and password are required!'); window.location.href='login.html';</script>";
        exit();
    }

    // Prepare and execute the SQL query to check credentials
    $sql = "SELECT * FROM userss WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Store user information in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            // Redirect to index.html after successful login
            header("Location: in.html"); // Make sure there are no spaces in the filename
            exit();
        } else {
            echo "<script>alert('Invalid username or password. Please try again!'); window.location.href='index.html';</script>";
        }
    } else {
        echo "<script>alert('Invalid username or password. Please try again!'); window.location.href='index.html';</script>";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
