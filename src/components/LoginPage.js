import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/authStore";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  const defaultCredentials = {
    email: "default@example.com",
    password: "password123",
  };

  const formValidation = (email, password) => {
    if (!email.trim() || !password.trim()) {
      return { isValid: false, errorMessage: "Please fill in all fields" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        errorMessage: "Please enter a valid email address",
      };
    }

    return { isValid: true, errorMessage: "" };
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Validate that fields are not empty
    // Instructions:
    // - Check if the email and password fields are filled.

    const validation = formValidation(email, password);

    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    // Validate credentials
    // Instructions:
    // - Check if the entered credentials match the default credentials or the stored user credentials.
    // - If valid, call the `login` function and navigate to the homepage.
    // - If invalid, set an error message.
    if (
      email === defaultCredentials.email &&
      password === defaultCredentials.password
    ) {
      login(defaultCredentials);
      navigate("/");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      login(user);
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleToggleCredentials = () => {
    setShowCredentials(!showCredentials);
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
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="text"
          value={email}
          onFocus={() => setError("")}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onFocus={() => setError("")}
          onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>
      </form>

      {/* Show error message when applicable */}
      {/* - Use the Alert component to display the error message if one exists. */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/forgot-password")}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleToggleCredentials}
        >
          {showCredentials
            ? "Hide Default Credentials"
            : "Show Default Credentials"}
        </Button>
      </Box>

      {showCredentials && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Email:</strong> {defaultCredentials.email}
          <br />
          <strong>Password:</strong> {defaultCredentials.password}
        </Alert>
      )}
    </Box>
  );
}

export default LoginPage;
