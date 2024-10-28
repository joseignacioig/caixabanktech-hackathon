import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BalanceOverTime() {
  const transactions = useStore(transactionsStore);

  // Instructions:
  // - Sort the transactions by date to display the balance over time.
  // - Calculate the cumulative balance as you iterate through the sorted transactions.
  // - Each object in the 'data' array should be of the form: { date, Balance }, where 'date' is the transaction date and 'Balance' is the cumulative balance at that date.
  const data = transactions
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, transaction) => {
      const lastBalance = acc.length > 0 ? acc[acc.length - 1].Balance : 0;
      const newBalance =
        transaction.type === "income"
          ? lastBalance + transaction.amount
          : lastBalance - transaction.amount;

      acc.push({
        date: new Date(transaction.date).toLocaleDateString(),
        Balance: newBalance,
      });

      return acc;
    }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />{" "}
        {/* Format balance in tooltip */}
        <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default React.memo(BalanceOverTime);