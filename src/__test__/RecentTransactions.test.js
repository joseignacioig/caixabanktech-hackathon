import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStore } from '@nanostores/react';
import RecentTransactions from '../components/RecentTransactions';

jest.mock('@nanostores/react', () => ({
  useStore: jest.fn(),
}));

describe('RecentTransactions Component', () => {
  test('muestra las transacciones más recientes en orden descendente por fecha', () => {
    useStore.mockReturnValue([
      { description: 'Lunch', amount: 15, type: 'expense', category: 'Food', date: '2023-10-03' },
      { description: 'Salary', amount: 1000, type: 'income', category: 'Work', date: '2023-10-01' },
      { description: 'Groceries', amount: 40, type: 'expense', category: 'Food', date: '2023-10-05' },
    ]);

    render(React.createElement(RecentTransactions, { limit: 5 }));

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Groceries');
    expect(rows[2]).toHaveTextContent('Lunch');
    expect(rows[3]).toHaveTextContent('Salary');
  });

  test('limita el número de transacciones mostradas al valor de "limit"', () => {
    useStore.mockReturnValue([
      { description: 'Lunch', amount: 15, type: 'expense', category: 'Food', date: '2023-10-03' },
      { description: 'Salary', amount: 1000, type: 'income', category: 'Work', date: '2023-10-01' },
      { description: 'Groceries', amount: 40, type: 'expense', category: 'Food', date: '2023-10-05' },
      { description: 'Dinner', amount: 25, type: 'expense', category: 'Food', date: '2023-10-02' },
      { description: 'Transport', amount: 20, type: 'expense', category: 'Transport', date: '2023-10-04' },
      { description: 'Coffee', amount: 5, type: 'expense', category: 'Food', date: '2023-10-06' },
    ]);

    render(React.createElement(RecentTransactions, { limit: 3 }));

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);
  });

  test('muestra el formato correcto de las columnas para cada transacción', () => {
    useStore.mockReturnValue([
      { description: 'Lunch', amount: 15, type: 'expense', category: 'Food', date: '2023-10-03' },
    ]);

    render(React.createElement(RecentTransactions, { limit: 1 }));

    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('15.00 €')).toBeInTheDocument();
    expect(screen.getByText('expense')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText(new Date('2023-10-03').toLocaleDateString())).toBeInTheDocument();
  });
});
