<?php
// Start session
session_start();

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bussbookingg";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $rating = $_POST['rating'];
    $comments = $_POST['comments'];

    // Debugging output
    var_dump($name, $email, $rating, $comments);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO feedback (name, email, rating, comments) VALUES (?, ?, ?, ?)");
    
    if ($stmt === false) {
        die("MySQL prepare failed: " . htmlspecialchars($conn->error));
    }

    $stmt->bind_param("ssis", $name, $email, $rating, $comments);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>alert('Thank you for your feedback!'); window.location.href='in.html';</script>";
    } else {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
        echo "<script>alert('Error submitting your feedback. Please try again.'); window.location.href='feedback.html';</script>";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
