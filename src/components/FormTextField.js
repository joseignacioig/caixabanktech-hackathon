import React from "react";
import { TextField } from "@mui/material";

function FormTextField({ label, value, onChange, type = "text", name }) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      name={name}
      inputProps={type === "number" ? { min: 0, step: "0.01" } : {}}
    />
  );
}

export default FormTextField;
