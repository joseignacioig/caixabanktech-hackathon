import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { userSettingsStore } from "../stores/userSettingsStore";
import { Alert, Collapse } from "@mui/material";

function AlertBanner() {
  const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);

  // Extract the necessary values from user settings (budget limits, category limits, alerts status).
  const { categoryLimits, alertsEnabled } = userSettings;

  // If alerts are disabled in the settings, return null to avoid rendering the component.
  if (!alertsEnabled) return null;

  // Calculate the total expenses and income from the transaction data.
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate the balance and check if it's negative.
  const balance = totalIncome - totalExpenses;
  const isBalanceNegative = balance < 0;

  // Calculate expenses per category and check if any category limit has been exceeded.
  const categoryExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  const exceededCategories = Object.keys(categoryLimits).filter(
    (category) => categoryExpenses[category] > categoryLimits[category]
  );

  return (
    <div>
      {/* Negative balance alert */}
      <Collapse in={isBalanceNegative}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Warning: Your account balance is negative ({balance.toFixed(2)} €)!
        </Alert>
      </Collapse>

      {/* Alerts by category */}
      {exceededCategories.map((category) => (
        <Alert severity="warning" sx={{ mb: 2 }} key={category}>
          You have exceeded your budget limit for {category} (
          {categoryLimits[category]} €)!
        </Alert>
      ))}
    </div>
  );
}

export default AlertBanner;
