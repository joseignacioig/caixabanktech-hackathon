// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { lightTheme, darkTheme } from "./theme"; // Import both themes
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import Analysis from "./components/Analysis";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import SupportPage from "./components/SupportPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import for route protection
import { authStore } from "./stores/authStore"; // Import auth store for authentication state
import { useStore } from "@nanostores/react"; // Nanostores to track auth
import BudgetAlert from "./components/BudgetAlert"; // Importar BudgetAlert
import PublicRoute from "./components/PublicRoute";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import AlertBanner from "./components/AlertBanner";

function App() {
  const auth = useStore(authStore); // Get authentication status from auth store

  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Use effect to apply theme on load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Apply the correct baseline for the theme */}
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Container sx={{ flex: 1, mt: 4 }}>
            {auth.isAuthenticated && (
              <>
                <BudgetAlert />
                <AlertBanner />
              </>
            )}
            <Routes>
              {/* Protected routes */}
              <Route
                element={
                  <ProtectedRoute isAuthenticated={auth.isAuthenticated} />
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<TransactionList />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<SupportPage />} />
              </Route>

              {/* Public routes */}

              <Route
                element={<PublicRoute isAuthenticated={auth.isAuthenticated} />}
              >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
              </Route>
            </Routes>
          </Container>
          <Footer /> {/* Always stick footer to the bottom */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
