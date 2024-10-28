import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({
  transactions,
  dataKeyIncome = "income",
  dataKeyExpense = "expense",
}) {
  // Instructions:
  // - Group transactions by month.
  // - For each month, calculate the total income and expense.
  const dataMap = {}; // Implement logic to group transactions by month and calculate totals

  transactions.forEach((t) => {
    // Instructions:
    // - Extract the month and year from each transaction's date.
    const date = new Date(t.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as YYYY-MM

    // - Check if the month is already in `dataMap`. If not, initialize it.
    if (!dataMap[monthYear]) {
      dataMap[monthYear] = { month: monthYear, income: 0, expense: 0 };
    }

    // - Accumulate the income and expense amounts based on the transaction type.
    if (t.type === "income") {
      dataMap[monthYear].income += t.amount;
    } else if (t.type === "expense") {
      dataMap[monthYear].expense += t.amount;
    }
  });

  // Instructions:
  // - Convert the data map into an array and sort it by date.
  // - The array should contain objects with the following structure: { month, income, expense }
  const data = Object.values(dataMap).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKeyIncome}
          stroke="#82ca9d"
          name="Income"
        />
        <Line
          type="monotone"
          dataKey={dataKeyExpense}
          stroke="#8884d8"
          name="Expense"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;
