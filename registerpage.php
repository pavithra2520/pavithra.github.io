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
    $email = $_POST['email']; // Corrected email variable
    $password = $_POST['password']; // Corrected password variable
    $confirm_password = $_POST['confirm-password']; // Confirm password

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo "<script>alert('Passwords do not match.'); window.location.href='register.html';</script>";
        exit();
    }

    // Check if username or email already exists
    $check_sql = "SELECT * FROM userss WHERE username = ? OR email = ?";
    $stmt_check = $conn->prepare($check_sql);
    $stmt_check->bind_param("ss", $username, $email);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // Username or email already taken
        echo "<script>alert('Username or email already taken.'); window.location.href='register.html';</script>";
        exit();
    }
    $stmt_check->close();

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert the user into the database
    $sql = "INSERT INTO userss (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        // If the registration is successful, log in the user and redirect to index.html
        $_SESSION['username'] = $username;
        echo "<script>alert('Registration successful!'); window.location.href='in.html';</script>";
    } else {
        echo "<script>alert('Registration failed. Please try again.'); window.location.href='register.html';</script>";
    }

    // Close the statement and the connection
    $stmt->close();
    $conn->close();
}
?>
