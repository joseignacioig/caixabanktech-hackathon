import React, { Profiler, Suspense, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import { transactionsStore } from "../stores/transactionStore";
import NotificationPopup from "./NotificationPopup";

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (transactions.length > 0) {
      setLoading(false);
    } else {
      setError("No transactions found.");
    }

    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    if (balance < 0) {
      setShowNotification(true);
    }
  }, [transactions]);

  // Replace the placeholder values with calculations for total income, total expenses, and balance.
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const handleCloseNotification = () => setShowNotification(false);

  const balance = totalIncome - totalExpense;

  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
        <NotificationPopup
          open={showNotification}
          onClose={handleCloseNotification}
          message="Warning: Your balance is negative!"
        />
        <Typography variant="h4" gutterBottom color="primary">
          Financial Summary
        </Typography>

        {/* Action Buttons Section */}
        {/* Instructions:
                    - Add a section with ExportButton and DownloadProfilerData components.
                    - The ExportButton should export the transaction data as a CSV file.
                    - The DownloadProfilerData button should export profiler data in JSON format.
                */}
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex" }}>
            <ExportButton
              data={transactions}
              filename="transactions.csv"
              headers={["Description", "Amount", "Type", "Category", "Date"]}
              label="Export transactions"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", flexGrow: 1 }}>
            <DownloadProfilerData />
          </Box>
        </Box>

        {/* Totals Section */}
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 1, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Total Income
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-income"
                sx={{ color: "#2e7d32", textAlign: "center" }}
              >
                {totalIncome.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 1, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Total Expenses
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-expenses"
                sx={{ textAlign: "center", color: "#c62828" }}
              >
                {totalExpense.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 1, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Balance
              </Typography>
              <Typography
                variant="h5"
                data-testid="balance"
                sx={{
                  color: balance >= 0 ? "#2e7d32" : "#c62828",
                  textAlign: "center",
                }}
              >
                {balance.toFixed(2)} €
              </Typography>
              {/* Instructions:
                                - If the balance is negative, show a warning message.
                                - Display a message or alert if the budget limit has been exceeded.
                            */}
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        {/* Instructions:
                    - Use the `AnalysisGraph` component to show a breakdown of income and expenses by category.
                    - Use the `BalanceOverTime` component to show the user's balance over time.
                */}

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Income and Expenses by Category
            </Typography>
            <Suspense fallback={<CircularProgress />}>
              <AnalysisGraph transactions={transactions} />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
            Balance Over Time
            </Typography>
            <Suspense fallback={<CircularProgress />}>
              <BalanceOverTime transactions={transactions} />
            </Suspense>
          </Grid>
        </Grid>

        {/* Statistics and Recommendations Section */}
        {/* Instructions:
                    - Use the `Statistics` component to show key financial metrics.
                    - Use the `Recommendations` component to display financial advice.
                */}

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <Statistics transactions={transactions} />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <Recommendations />
            </Suspense>
          </Grid>
        </Grid>

        {/* Recent Transactions Section */}
        {/* Instructions:
                    - Display a list or table of recent transactions using the `RecentTransactions` component.
                    - Ensure that each transaction shows key details such as description, amount, type, and date.
                */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          <Suspense fallback={<CircularProgress />}>
            <RecentTransactions
              limit={5}
              columns={["Description", "Amount", "Type", "Category", "Date"]}
            />
          </Suspense>
        </Box>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
