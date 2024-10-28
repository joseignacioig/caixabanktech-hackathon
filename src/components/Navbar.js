import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Avatar,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import { authStore, logout } from "../stores/authStore";
import { useStore } from "@nanostores/react";
import Logo from "../assets/caixabank-icon-blue.png";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const auth = useStore(authStore);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      {!isMobile ? (
        <AppBar
          position="static"
          elevation={0}
          color="background.paper"
        >
          <Toolbar>
            <Box display="flex" alignItems="center">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: 40, height: 30, marginRight: 8 }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                CaixaBankNow
              </Typography>
            </Box>

            {/* Navigation links alineados a la derecha */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                ml: 4,
                color: "#text.primary",
              }}
            >
              {auth.isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to="/"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    component={Link}
                    to="/transactions"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Transactions
                  </Button>
                  <Button
                    component={Link}
                    to="/analysis"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Analysis
                  </Button>
                  <Button
                    component={Link}
                    to="/settings"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Settings
                  </Button>
                  <Button
                    component={Link}
                    to="/support"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Support
                  </Button>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2, borderColor: "text.secondary" }}
                  />
                  <Button
                    color="inherit"
                    onClick={logout}
                    sx={{ color: "text.primary" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>

            {/* Notifications and User Avatar */}
            <Box>
              {auth.isAuthenticated && (
                <>
                  <IconButton color="inherit" sx={{ color: "text.primary" }}>
                    <IconButton
                      onClick={toggleTheme}
                      color="inherit"
                      sx={{ color: "text.primary" }}
                    >
                      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                  </IconButton>
                  <IconButton>
                    <Avatar alt={auth.user.email} src={auth.user.avatarUrl} />
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{bgcolor: "background.paper" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Side: Menu Icon and Brand Name */}
            <Box display="flex" alignItems="center">
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "text.primary", ml: isMobile ? 1 : 0 }}
              >
                CaixaBankNow
              </Typography>
            </Box>

            {/* Right Side: Notifications and Avatar */}
            <Box display="flex" alignItems="center">
              {auth.isAuthenticated && (
                <>
                  <IconButton
                    onClick={toggleTheme}
                    color="inherit"
                    sx={{ color: "text.primary" }}
                  >
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  <IconButton>
                    <Avatar alt={auth.user.email} />
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {auth.isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/transactions"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Transactions
              </Button>
              <Button
                component={Link}
                to="/analysis"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Analysis
              </Button>
              <Button
                component={Link}
                to="/settings"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Settings
              </Button>
              <Button
                component={Link}
                to="/support"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Support
              </Button>
              <Button
                fullWidth
                onClick={logout}
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                fullWidth
                sx={{
                  color: "text.primary",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
