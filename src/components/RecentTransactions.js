import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";

function RecentTransactions({
  limit = 5,
  columns = ["Description", "Amount (€)", "Type", "Category", "Date"],
}) {

  const transactions = useStore(transactionsStore);

  // Recent transactions
  // Instructions:
  // - Sort the transactions by date, showing the most recent first.
  // - Extract only the specified number of transactions for display (default is 5).
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over recentTransactions and render each transaction in a table row */}
            {recentTransactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentTransactions;
