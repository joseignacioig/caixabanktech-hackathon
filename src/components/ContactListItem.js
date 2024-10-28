import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";

function ContactListItem({ name, email, phone, company, onContactClick }) {
  return (
    <ListItem sx={{ mb: 2 }}>
      <ListItemAvatar>
        <Avatar alt={name} src={`https://i.pravatar.cc/150?u=${email}`} />
      </ListItemAvatar>
      <ListItemText
        primary={`${name} - ${email.toLowerCase()}`}
        secondary={`Phone: ${phone} • Company: ${company}`}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onContactClick}
        sx={{ ml: 2 }}
      >
        Contact
      </Button>
    </ListItem>
  );
}

export default ContactListItem;
