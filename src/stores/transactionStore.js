import { atom } from "nanostores";

const initialTransactions = JSON.parse(
  localStorage.getItem("transactions")
) || [
  {
    id: 1730050032447,
    description: "Caixabank Tech",
    amount: 2300,
    type: "income",
    category: "Salary",
    date: "2024-10-27",
  },
  {
    id: 1730049802671,
    description: "Shoes",
    amount: 110,
    type: "expense",
    category: "Clothing",
    date: "2024-10-21",
  },
  {
    id: 1730049959397,
    description: "Pharmacy",
    amount: 50,
    type: "expense",
    category: "Health",
    date: "2024-10-24",
  },
  {
    id: 1730049979509,
    description: "Rent",
    amount: 850,
    type: "expense",
    category: "Housing",
    date: "2024-10-18",
  },
  {
    id: 1730050013378,
    description: "Supermarket",
    amount: 130,
    type: "expense",
    category: "Food",
    date: "2024-10-26",
  },
  {
    id: 1730050032447,
    description: "Caixabank Tech",
    amount: 2300,
    type: "income",
    category: "Salary",
    date: "2024-09-27",
  },
];

export const transactionsStore = atom(initialTransactions);

export const setTransactions = (transactions) => {
  transactionsStore.set(transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = [...currentTransactions, transaction];
  setTransactions(updatedTransactions);
};

export const deleteTransaction = (id) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = currentTransactions.filter(
    (transaction) => transaction.id !== id
  );
  setTransactions(updatedTransactions);
};
