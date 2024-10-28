import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportButton from '../components/ExportButton';

global.URL.createObjectURL = jest.fn(() => 'mock-url');
document.body.appendChild = jest.fn();
document.body.removeChild = jest.fn();

describe('ExportButton Component', () => {
  const sampleData = [
    { description: 'Coffee', amount: 3.5, type: 'expense', category: 'Food', date: '2023-10-01' },
    { description: 'Salary', amount: 1000, type: 'income', category: 'Work', date: '2023-10-02' },
  ];
  const headers = ['Description', 'Amount', 'Type', 'Category', 'Date'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('el botón se desactiva cuando no hay datos', () => {
    render(React.createElement(ExportButton, { data: [], headers }));

    const button = screen.getByRole('button', { name: /export csv/i });
    expect(button).toBeDisabled();
  });

  test('el botón está habilitado cuando hay datos', () => {
    render(React.createElement(ExportButton, { data: sampleData, headers }));

    const button = screen.getByRole('button', { name: /export csv/i });
    expect(button).toBeEnabled();
  });

  test('llama a URL.createObjectURL y descarga el archivo cuando se hace clic en el botón', () => {
    render(React.createElement(ExportButton, { data: sampleData, headers, filename: 'test.csv' }));

    const button = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(button);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });

  test('convierte los datos en formato CSV correctamente', () => {
    render(React.createElement(ExportButton, { data: sampleData, headers }));

    const button = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(button);

    const csvContent = `Description,Amount,Type,Category,Date\n"Coffee","3.5","expense","Food","2023-10-01"\n"Salary","1000","income","Work","2023-10-02"`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
  });
});
