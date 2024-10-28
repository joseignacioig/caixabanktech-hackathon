import React from "react";
import { render, screen } from "@testing-library/react";
import { useStore } from "@nanostores/react";
import Statistics from "../components/Statistics";

jest.mock("@nanostores/react", () => ({
  useStore: jest.fn(),
}));

describe("Statistics Component", () => {
  test('visualiza correctamente el gasto total de todas las transacciones de tipo "expense"', () => {
    useStore.mockReturnValue([
      { type: "expense", amount: 50, date: "2023-10-01", category: "Food" },
      {
        type: "expense",
        amount: 100,
        date: "2023-10-01",
        category: "Transport",
      },
    ]);

    render(<Statistics />);

    expect(screen.getByText(/Average Daily Expense:/)).toHaveTextContent(
      "75.00 €"
    );
    expect(screen.getByText(/Highest Spending Category:/)).toHaveTextContent(
      "Transport (100.00 €)"
    );
  });

  test('muestra "No data available" si no hay transacciones de gasto', () => {
    useStore.mockReturnValue([]);

    render(<Statistics />);

    expect(screen.getByText(/Average Daily Expense:/)).toHaveTextContent(
      "0.00 €"
    );
    expect(screen.getByText(/Highest Spending Category:/)).toHaveTextContent(
      "No data available"
    );
  });

  test("calcula correctamente el promedio de gasto diario cuando hay múltiples fechas únicas", () => {
    useStore.mockReturnValue([
      { type: "expense", amount: 50, date: "2023-10-01", category: "Food" },
      {
        type: "expense",
        amount: 150,
        date: "2023-10-02",
        category: "Shopping",
      },
    ]);

    render(<Statistics />);

    expect(screen.getByText(/Average Daily Expense:/)).toHaveTextContent(
      "100.00 €"
    );
    expect(screen.getByText(/Highest Spending Category:/)).toHaveTextContent(
      "Shopping (150.00 €)"
    );
  });
});
