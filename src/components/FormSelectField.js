import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function FormSelectField({ label, value, onChange, options, name }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        name={name}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelectField;
