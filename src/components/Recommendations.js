import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Box } from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts") // It's a test of an API to check error handling; I'm not sure if this is what's expected for the task
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        return response.json();
      })
      .then((data) => {
        setRecommendations(data.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Implement logic to compare expenses between months
  // Instructions:
  // - Use the transactions to calculate expenses for the current and previous months.
  // - Filter transactions by type ('expense') and by month/year.
  // - Compare the total expenses of this month with last month.

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const expenses = transactions.filter(
    (transaction) =>
      transaction.type === "expense" &&
      new Date(transaction.date).getFullYear() === currentYear
  );

  const expenseThisMonth = expenses
    .filter(
      (transaction) => new Date(transaction.date).getMonth() === currentMonth
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const lastMonthDate = new Date(currentYear, currentMonth - 1);
  const expenseLastMonth = expenses
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === lastMonthDate.getMonth() &&
        transactionDate.getFullYear() === lastMonthDate.getFullYear()
      );
    })
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Generate a message based on the comparison between months
  // Instructions:
  // - If there are no expenses for last month, display a message encouraging the user to keep recording.
  // - If expenses have increased, calculate the percentage increase and suggest reviewing expenses.
  // - If expenses have decreased, congratulate the user and show the percentage decrease.
  // - If expenses are the same, notify the user that their spending hasn't changed.

  let message = ""; // Implement logic to generate the appropriate message based on the comparison

  if (expenseLastMonth === 0) {
    message = "This is your first month recording expenses. Keep it up!";
  } else if (expenseThisMonth > expenseLastMonth) {
    const increasePercentage =
      ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100;
    message = `Your expenses have increased by ${increasePercentage.toFixed(
      2
    )}%. Consider reviewing your spending.`;
  } else if (expenseThisMonth < expenseLastMonth) {
    const decreasePercentage =
      ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100;
    message = `Great job! You've reduced your expenses by ${decreasePercentage.toFixed(
      2
    )}%.`;
  } else {
    message = "Your expenses have remained the same as last month.";
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Recommendations</Typography>
      {/* Display the recommendation message according to the change in expenditure */}
      <Typography>{message}</Typography>
    </Box>
  );
}

export default Recommendations;
