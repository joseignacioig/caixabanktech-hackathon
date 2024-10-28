import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { updateBudgetAlert } from '../stores/budgetAlertStore';
import Settings from '../components/Settings';

jest.mock('@nanostores/react', () => ({
  useStore: jest.fn(),
}));

jest.mock('../stores/userSettingsStore', () => ({
  userSettingsStore: {
    set: jest.fn(),
  },
}));

jest.mock('../stores/budgetAlertStore', () => ({
  updateBudgetAlert: jest.fn(),
}));

describe('Settings Component', () => {
  beforeEach(() => {
    useStore.mockReturnValue({
      totalBudgetLimit: 500,
      alertsEnabled: true,
      categoryLimits: {
        Food: 100,
        Transport: 50,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('llama a userSettingsStore.set con los valores actualizados al guardar', () => {
    render(React.createElement(Settings));

    fireEvent.change(screen.getByLabelText('Total Budget Limit (€)'), {
      target: { value: '400' },
    });
    fireEvent.change(screen.getByLabelText('Transport'), {
      target: { value: '200' },
    });
    fireEvent.click(screen.getByText('Save Settings'));

    expect(userSettingsStore.set).toHaveBeenCalledWith({
      totalBudgetLimit: 400,
      alertsEnabled: true,
      categoryLimits: { Food: 100, Transport: 200 },
    });
  });

  test('llama a updateBudgetAlert si los gastos superan el límite de presupuesto', () => {
    useStore.mockReturnValueOnce([
      { type: 'expense', amount: 600, date: '2023-10-01' },
    ]);

    render(React.createElement(Settings));

    fireEvent.change(screen.getByLabelText('Total Budget Limit (€)'), {
      target: { value: '500' },
    });
    fireEvent.click(screen.getByText('Save Settings'));

    expect(updateBudgetAlert).toHaveBeenCalledWith(500);
  });

  test('no llama a updateBudgetAlert si los gastos no superan el límite de presupuesto', () => {
    useStore.mockReturnValueOnce([
      { type: 'expense', amount: 300, date: '2023-10-01' },
    ]);

    render(React.createElement(Settings));

    fireEvent.change(screen.getByLabelText('Total Budget Limit (€)'), {
      target: { value: '500' },
    });
    fireEvent.click(screen.getByText('Save Settings'));

    expect(updateBudgetAlert).not.toHaveBeenCalled();
  });
});
