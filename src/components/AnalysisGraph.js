import React, { useEffect, useState, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalysisGraphContent = () => {
  const transactions = useStore(transactionsStore);
  const [data, setData] = useState([]);

  useEffect(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = { category: transaction.category, Income: 0, Expense: 0 };
      }
      if (transaction.type === "income") {
        acc[transaction.category].Income += transaction.amount;
      } else if (transaction.type === "expense") {
        acc[transaction.category].Expense += transaction.amount;
      }
      return acc;
    }, {});

    setData(Object.values(categoryTotals));
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function AnalysisGraph() {
  return (
    <Suspense fallback={<div>Loading graph...</div>}>
      <AnalysisGraphContent />
    </Suspense>
  );
}