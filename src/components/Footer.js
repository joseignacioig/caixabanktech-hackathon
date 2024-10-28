import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import backgroundImage from "../assets/bgmaps.png";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        p: 3,
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "bgFooter",
          opacity: 0.6,
          zIndex: 1,
        }}
      />
      {/* Search bar */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Box mb={2}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 400,
              mx: "auto",
              borderRadius: "20px",
            }}
          >
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Find your branch..."
            />
            <Button
              type="submit"
              sx={{
                color: "#1976d2",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Search
            </Button>
          </Paper>
        </Box>

        <Typography variant="body2" sx={{ color: "text.primary", mt: 2 }}>
          © {new Date().getFullYear()} Personal Finance Assistant
        </Typography>

        {/* Social media icons */}
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <IconButton aria-label="facebook" color="primary">
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="twitter" color="primary">
            <TwitterIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="instagram" color="primary">
            <InstagramIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box mt={2}>
          <Typography variant="caption" sx={{ color: "text.primary" }}>
            <Link
              style={{
                marginRight: "10px",
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              Privacy Policy
            </Link>
            |
            <Link
              style={{
                margin: "0 10px",
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              Terms of Service
            </Link>
            |
            <Link
              style={{
                marginLeft: "10px",
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              Cookie Policy
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
