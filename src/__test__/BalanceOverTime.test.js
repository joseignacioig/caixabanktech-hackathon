import React from "react";
import { render, screen } from "@testing-library/react";
import { useStore } from "@nanostores/react";
import BalanceOverTime from "../components/BalanceOverTime";

jest.mock("@nanostores/react", () => ({
  useStore: jest.fn(),
}));

describe("BalanceOverTime Component", () => {
  test("muestra el balance acumulativo correcto para una serie de transacciones de ingresos y gastos", () => {
    useStore.mockReturnValue([
      { type: "income", amount: 200, date: "2023-10-01" },
      { type: "expense", amount: 50, date: "2023-10-02" },
      { type: "income", amount: 100, date: "2023-10-03" },
    ]);

    render(React.createElement(BalanceOverTime));

    expect(screen.getByText("200.00 €")).toBeInTheDocument();
    expect(screen.getByText("150.00 €")).toBeInTheDocument();
    expect(screen.getByText("250.00 €")).toBeInTheDocument();
  });

  test("muestra el balance como 0 cuando no hay transacciones", () => {
    useStore.mockReturnValue([]);

    render(React.createElement(BalanceOverTime));

    expect(screen.queryByText(/€/)).toBeNull();
  });

  test("ordena correctamente las transacciones por fecha y calcula el balance acumulativo", () => {
    useStore.mockReturnValue([
      { type: "expense", amount: 20, date: "2023-10-05" },
      { type: "income", amount: 100, date: "2023-10-01" },
      { type: "expense", amount: 50, date: "2023-10-03" },
    ]);

    render(React.createElement(BalanceOverTime));

    expect(screen.getByText("100.00 €")).toBeInTheDocument();
    expect(screen.getByText("50.00 €")).toBeInTheDocument();
    expect(screen.getByText("30.00 €")).toBeInTheDocument();
  });
});
