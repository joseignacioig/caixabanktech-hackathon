import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { login } from "../stores/authStore";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const formValidation = (email, password, confirmPassword) => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return { isValid: false, errorMessage: "Please fill in all fields" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        errorMessage: "Please enter a valid email address",
      };
    }

    if (password.length < 8) {
      return {
        isValid: false,
        errorMessage: "Password must be at least 8 characters long",
      };
    }

    if (password !== confirmPassword) {
      return {
        isValid: false,
        errorMessage: "Passwords do not match",
      };
    }

    return { isValid: true, errorMessage: "" };
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Instructions:

    // Validate that all fields (email, password, confirmPassword) are filled.
    // - If any field is empty, display an error message.

    // Check if the passwords match.
    // - If the passwords do not match, set an appropriate error message.

    const validation = formValidation(email, password, confirmPassword);
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    // Check if the email is already registered in localStorage.
    // - Retrieve the existing user from localStorage and verify if the entered email already exists.
    // - If the email exists, set an error message.

    const defaultCredentials = {
      email: "default@example.com",
    };

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some((user) => user.email === email);

    if (userExists || email === defaultCredentials.email) {
      setError("Email is already registered");
      return;
    }

    // Save the new user's data to localStorage.
    // - If validation passes, store the new user's email and password in localStorage.

    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Automatically log the user in after successful registration.
    // - Call the `login` function to set the authenticated user in the store.
    login(newUser);

    // Redirect the user to the dashboard.
    // - After successful registration and login, redirect the user to the home/dashboard page.

    setSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        mb: 8
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onFocus={() => setError("")}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onFocus={() => setError("")}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onFocus={() => setError("")}
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Account created successfully! Redirecting to login...
        </Alert>
      )}

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
