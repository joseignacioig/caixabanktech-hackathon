import React, { useState, useEffect, Profiler, Suspense } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  TextField,
  Button,
} from "@mui/material";
import { onRenderCallback } from "../utils/onRenderCallback";
import ContactListItem from "./ContactListItem";

function SupportPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Implement the effect to get user data from the API
  // Instructions:
  // - Use the `useEffect` hook to make the request to the `https://jsonplaceholder.typicode.com/users` URL.
  // - If the response is successful, save the data in the `users` state and change `loading` to false.
  // - If there is an error, it saves the error message in `error` state and changes `loading` to false.

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filter users by search term
  // Instructions:
  // - Implement logic to filter users by `searchTerm`.
  // - Use the `filter` method to check if the `user.name` contains the `searchTerm`.
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          {`Error: ${error}`}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Support Contacts
        </Typography>

        {/* Implement the search bar */}
        {/* Instructions:
                    - Uses the `TextField` component of Material UI.
                    - The `label` must be ‘Search by Name’ and must be a fullWidth text field.
                    - The value of the field must be linked to `searchTerm` and must be updated when the user types into the field.
                */}

        {/* Here is the search bar */}
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />

        {/* Implement the support contact list */}
        {/* Instructions:
                    - Use the `List` component of Material UI to display contacts.
                    - Within each `ListItem`, use `ListItemAvatar` to display an avatar with the `Avatar` component.
                    - For text, use `ListItemText` with `primary` as the name and email, and `secondary` for the phone and company.
                    - Add a contact button with the `Button` component of Material UI, which uses the `href` property to open the email with `mailto:${user.email}`.
                    - Don't forget to add `sx` to style the list.
                */}

        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {filteredUsers.map((user) => (
                <ContactListItem
                key={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                company={user.company.name}
                onContactClick={() => window.location.href = `mailto:${user.email}`}
              />
              ))}
            </List>
          </Paper>
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default SupportPage;