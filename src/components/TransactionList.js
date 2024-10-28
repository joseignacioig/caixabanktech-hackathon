import React, { useState, useMemo, useCallback } from "react";
import { useStore } from "@nanostores/react";
import {
  deleteTransaction,
  transactionsStore,
} from "../stores/transactionStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import TransactionForm from "./TransactionForm";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";

function TransactionList() {
  const transactions = useStore(transactionsStore);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleDelete = useCallback((id) => {
    deleteTransaction(id);
  }, []);

  const handleEdit = useCallback((transaction) => {
    setTransactionToEdit(transaction);
    setIsFormOpen(true);
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = transactions.map((transaction) => transaction.category);
    return [...new Set(categories)];
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    if (filterCategory) {
      filtered = filtered.filter(
        (transaction) => transaction.category === filterCategory
      );
    }

    if (filterType) {
      filtered = filtered.filter(
        (transaction) => transaction.type === filterType
      );
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        if (sortField === "amount") {
          return b.amount - a.amount;
        }
        if (sortField === "date") {
          return new Date(b.date) - new Date(a.date);
        }
        return 0;
      });
    }

    return filtered;
  }, [transactions, filterCategory, filterType, sortField]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTransactions = filteredAndSortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setTransactionToEdit(null);
  };

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Transaction List
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openForm()}
          >
            Add Transaction
          </Button>
          <ExportButton
            data={transactions}
            filename="transactions.csv"
            headers={["Description", "Amount", "Type", "Category", "Date"]}
            label="Export transactions"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            justifyContent: "end",
            flexGrow: 1,
          }}
        >
          <DownloadProfilerData />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredAndSortedTransactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {isFormOpen && (
        <TransactionForm
          onClose={closeForm}
          transactionToEdit={transactionToEdit}
        />
      )}
    </Box>
  );
}

export default TransactionList;
