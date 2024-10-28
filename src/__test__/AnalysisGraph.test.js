import React from "react";
import { render, screen } from "@testing-library/react";
import { useStore } from "@nanostores/react";
import AnalysisGraph from "../components/AnalysisGraph";

jest.mock("@nanostores/react", () => ({
  useStore: jest.fn(),
}));

describe("AnalysisGraph Component", () => {
  test("muestra el gráfico de categorías con los datos de ingresos y gastos correctos", () => {
    useStore.mockReturnValue([
      { category: "Food", type: "expense", amount: 50 },
      { category: "Food", type: "income", amount: 20 },
      { category: "Transport", type: "expense", amount: 30 },
      { category: "Transport", type: "income", amount: 100 },
    ]);

    render(React.createElement(AnalysisGraph));

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
  });

  test("actualiza el gráfico cuando cambian las transacciones", () => {
    const { rerender } = render(React.createElement(AnalysisGraph));

    useStore.mockReturnValue([
      { category: "Food", type: "expense", amount: 50 },
      { category: "Transport", type: "income", amount: 100 },
    ]);
    rerender(React.createElement(AnalysisGraph));

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();

    useStore.mockReturnValue([
      { category: "Food", type: "expense", amount: 75 },
      { category: "Entertainment", type: "income", amount: 200 },
    ]);
    rerender(React.createElement(AnalysisGraph));

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.queryByText("Transport")).not.toBeInTheDocument();
  });

  test("muestra mensaje de carga mientras se renderiza el gráfico", () => {
    render(React.createElement(AnalysisGraph));

    expect(screen.getByText("Loading graph...")).toBeInTheDocument();
  });
});
