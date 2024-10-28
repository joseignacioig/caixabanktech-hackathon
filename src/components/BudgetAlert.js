import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { Alert } from "@mui/material";
import { budgetAlertStore } from "../stores/budgetAlertStore";

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);
  const budgetAlert = useStore(budgetAlertStore);

  // Instructions:
  // - Calculate the total expenses from the transactions.
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Determine if the budget has been exceeded
  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit; // Replace with a comparison of totalExpense and userSettings.totalBudgetLimit

  // Use the useEffect hook to update the budgetAlertStore when the budget is exceeded
  useEffect(() => {
    // Instructions:
    // - If the budget has been exceeded, set the `isVisible` property in the `budgetAlertStore` to true and provide a warning message.
    // - If the budget has not been exceeded, set `isVisible` to false and clear the message.
    if (budgetExceeded) {
      budgetAlertStore.set({
        isVisible: true,
        message: `You have exceeded your total budget limit of ${userSettings.totalBudgetLimit}!`,
      });
    } else {
      budgetAlertStore.set({
        isVisible: false,
        message: "",
      });
    }
  }, [budgetExceeded, userSettings.totalBudgetLimit]);

  return (
    // Conditional rendering of the alert
    // Instructions:
    // - If the budget is exceeded, return an `Alert` component with the appropriate message and severity.
    userSettings.alertsEnabled && budgetAlert.isVisible ? (
      <Alert severity="warning" sx={{ mb: 2 }}>
        {budgetAlert.message}
      </Alert>
    ) : null
  );
};

export default BudgetAlert;
