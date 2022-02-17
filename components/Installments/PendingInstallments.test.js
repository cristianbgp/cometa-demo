import PendingInstallments from "./PendingInstallments";
import { render, screen } from "@testing-library/react";
import { dueOrdersResponse } from "../../utils/mockDataResponses";
import { PaymentContextProvider } from "../../contexts/PaymentContext";

const title = /Cuotas pendientes/i;
const subTitle = /Dale click para expandir/i;

describe("PendingInstallments", () => {
  it("should render correctly", () => {
    const addToSelectedOrders = jest.fn();
    const removeFromSelectedOrders = jest.fn();

    render(
      <PaymentContextProvider
        value={{
          addToSelectedOrders,
          removeFromSelectedOrders,
          selectedOrders: [],
        }}
      >
        <PendingInstallments orders={dueOrdersResponse} />
      </PaymentContextProvider>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText(subTitle)).not.toBeInTheDocument();

    dueOrdersResponse.forEach((order) => {
      expect(screen.getByText(order.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${order.price_currency}$ ${order.price}`)
      ).toBeInTheDocument();
    });
  });
});
