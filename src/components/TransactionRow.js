import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function TransactionRow({ transaction, onEdit, onDelete }) {
    return (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type === 'income' ? 'Income' : 'Expense'}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString('en-US')}</TableCell>
            <TableCell>
                {/* Add functionality for the edit button */}
                <Button>
                    Edit
                </Button>
                {/* Add functionality for the delete button */}
                <Button>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default TransactionRow;
