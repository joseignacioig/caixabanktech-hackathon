import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  transactionsStore,
  addTransaction,
  setTransactions,
} from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";
import FormSelectField from "./FormSelectField";
import FormTextField from "./FormTextField";

function TransactionForm({ transactionToEdit, onClose }) {
  const transactions = useStore(transactionsStore);
  const [error, setError] = useState("");
  // Local state variables
  // Instructions:
  // - Ensure the form fields are correctly initialized when in "edit mode."
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Implement the function to assign a category based on description keywords
  const assignCategory = (desc) => {
    // Instructions:
    // - Loop through `categoryKeywords` to find matching keywords
    // - If a keyword is found in the description, return the category
    // - Return 'Other Expenses' if no category is found

    const lowerDesc = desc.toLowerCase();

    const category = Object.entries(categoryKeywords).find(
      ([category, keywords]) =>
        keywords.some((keyword) => lowerDesc.includes(keyword.toLowerCase()))
    );

    return category ? category[0] : "Other Expenses";
  };

  // Auto-assign a category if adding a new transaction
  useEffect(() => {
      // Instructions:
      // - Call the `assignCategory` function to determine the category based on the description
      // - Then, update the category state with the result
      const category = assignCategory(description);
      setCategory(category);

    // Instructions: Add the proper dependencies to the useEffect hook
  }, [description]);

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount.toString());
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instructions:
    // - Validate that all fields are filled in.
    // - If editing, update the transaction in the store.
    // - If adding a new transaction, create it and save it to the store.
    // - The transaction type should be either "income" or "expense".
    // - Ensure the transaction has the following structure: { id, description, amount, type, category, date }

    if (!description.trim() || !amount || !type || !category || !date) {
      setError("Please fill in all fields.");
      return;
    }

    if (amount <= 0) {
      setError("Amount should be greater than zero.");
      return;
    }

    const transaction = {
      id: transactionToEdit ? transactionToEdit.id : Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    if (transactionToEdit) {
      const updatedTransactions = transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      );
      setTransactions(updatedTransactions);
    } else {
      addTransaction(transaction);
    }

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="amount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelectField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={[
                  { label: "Income", value: "income" },
                  { label: "Expense", value: "expense" },
                ]}
                name="type"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelectField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  ...allCategories.map((cat) => ({
                    label: cat,
                    value: cat,
                  })),
                  { label: "Other Expenses", value: "Other Expenses" },
                ]}
                name="category"
              />
            </Grid>
            {/* Fill in the remaining field for date type */}
            <Grid item xs={12} sm={6}>
              <FormTextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ px: 3, fixed: true }}>
              <Typography color="error">{error}</Typography>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-transaction-button"
            >
              {transactionToEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default React.memo(TransactionForm);