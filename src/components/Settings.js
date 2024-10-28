import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import {
  updateBudgetAlert,
} from "../stores/budgetAlertStore";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { expenseCategories } from "../constants/categories";
import { transactionsStore } from "../stores/transactionStore";

function Settings() {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);

  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(
    userSettings.totalBudgetLimit
  );
  const [categoryLimits, setCategoryLimits] = useState(
    userSettings.categoryLimits || {}
  );

  const handleCategoryLimitChange = (category, value) => {
    setCategoryLimits((prevLimits) => ({
      ...prevLimits,
      [category]: parseFloat(value) || 0,
    }));
  };

  const handleSave = () => {
    // Instructions:
    // - Validate the total category limits.
    // - If the total category limits exceed the total budget limit, set an error message.
    // - If validation passes, clear the error message and save the updated settings to the store.
    // - After saving, display a success message indicating that the settings were saved successfully.
    // Instructions:
    // - Check if the total expense exceeds the total budget limit.
    // - If exceeded, set the budgetExceeded state to true and update the budget alert.
    const totalCategoryLimits = Object.values(categoryLimits).reduce(
      (acc, limit) => acc + limit,
      0
    );

    if (totalCategoryLimits > totalBudgetLimit) {
      setError("The sum of category limits exceeds the total budget limit.");
      setSuccessMessage("");
    } else {
      setError("");
      userSettingsStore.set({
        ...userSettings,
        totalBudgetLimit,
        categoryLimits,
      });
      setSuccessMessage("Settings saved successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      const totalExpenses = transactions.reduce((acc, transaction) => {
        return transaction.type === "expense" ? acc + transaction.amount : acc;
      }, 0);

      if (totalExpenses > totalBudgetLimit) {
        setBudgetExceeded(true);
        updateBudgetAlert(totalBudgetLimit);
      } else {
        setBudgetExceeded(false);
      }
    }
  };

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Settings
      </Typography>

      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={userSettings.alertsEnabled}
            onChange={(e) =>
              userSettingsStore.set({
                ...userSettings,
                alertsEnabled: e.target.checked,
              })
            }
          />
        }
        label="Enable Alerts"
        // Instructions: Add `checked` and `onChange` to control the `alertsEnabled` state
      />

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Total Budget Limit (€)
        </Typography>
        <TextField
          type="number"
          name="totalBudgetLimit"
          onFocus={() => setError("")}
          fullWidth
          margin="normal"
          value={totalBudgetLimit}
          // Instructions: Bind the value and `onChange` to control the `totalBudgetLimit` state
          onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || "")}
          inputProps={{ min: 0, step: "0.01" }}
          sx={{ mt: 1 }}
        />
      </Paper>

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Category Budget Limits (€)
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {expenseCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <TextField
                label={category}
                type="number"
                onFocus={() => setError("")}
                fullWidth
                margin="normal"
                value={categoryLimits[category] || ""}
                onChange={(e) =>
                  handleCategoryLimitChange(category, e.target.value)
                }
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ boxShadow: 2 }}
          // Instructions: Add `onClick` handler to save the settings by calling `handleSave`
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Settings;
