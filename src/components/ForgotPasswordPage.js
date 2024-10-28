import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending a password recovery email.
    // Instructions:
    // - If the email matches 'user@example.com', display a success message.
    // - If the email does not match, display an error message indicating the email is not found.
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some((user) => user.email === email || email === "default@example.com");

    if (userExists) {
      setMessage("A reset link has been sent to your email.");
    } else {
      setError("Email not found. Please try again.");
    }

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="text"
          onFocus={() => setError("")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Send Reset Link
        </Button>
      </form>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        {message && (
          <Alert color="secondary" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );
}

export default ForgotPasswordPage;
