import React, { useMemo, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ExportButton from "./ExportButton"; // Import the refactored ExportButton
import { userSettingsStore } from "../stores/userSettingsStore";

function Analysis() {
  const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);

  const [timeFrame, setTimeFrame] = useState("monthly");
  const [reportType, setReportType] = useState("trend");

  // Prepare the data for the trend analysis report based on the selected time frame (daily, weekly, monthly, yearly).
  // Each object in the array should have the structure: { key, income, expense }
  const trendData = useMemo(() => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      let key;

      switch (timeFrame) {
        case "daily":
          key = date.toISOString().split("T")[0];
          break;
        case "weekly":
          key = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
          break;
        case "monthly":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`
          break;
        case "yearly":
          key = date.getFullYear().toString();
          break;
        default:
          key = date.toISOString().split("T")[0];
      }

      if (!acc[key]) {
        acc[key] = { income: 0, expense: 0 };
      }
      acc[key][transaction.type] += transaction.amount;

      return acc;
    }, {});

    return Object.keys(groupedData)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((key) => ({
        key,
        income: groupedData[key].income,
        expense: groupedData[key].expense,
      }));
  }, [transactions, timeFrame]);

  // Prepare the data for the budget vs actual report.
  // Each object in the array should have the structure: { key, budget, actual }
  const budgetData = useMemo(() => {
    // Agrupar gastos por categoría
    const actualExpenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      }
      return acc;
    }, {});
  
    return Object.keys(userSettings.categoryLimits).map((category) => ({
      key: category,
      budget: userSettings.categoryLimits[category] || 0,
      actual: actualExpenses[category] || 0,
    }));
  }, [transactions, userSettings.categoryLimits]);

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Advanced Analysis
      </Typography>

      {transactions.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No transactions available.
        </Typography>
      )}

      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="report-type-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="trend">Trend Analysis</MenuItem>
              <MenuItem value="budget">Budget vs. Actual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ExportButton
            data={reportType === "trend" ? trendData : budgetData}
            label={"Export analysis"}
            filename={
              reportType === "trend"
                ? "Trend_Analysis.csv"
                : "Budget_vs_Actual.csv"
            }
            headers={
              reportType === "trend"
                ? ["key", "income", "expense"]
                : ["key", "budget", "actual"]
            }
          />
        </Grid>
      </Grid>

      {reportType === "trend" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Income and Expenses Trend
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#28B463"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#E74C3C"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {reportType === "budget" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Budget vs. Actual Expenses
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="#3498DB" name="Budget" />
                  <Bar dataKey="actual" fill="#E74C3C" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Savings Goals
            </Typography>
            <Typography>No savings goals set.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Net Worth Over Time
            </Typography>
            <Typography>No net worth data available.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
