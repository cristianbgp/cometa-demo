import FutureInstallments from "./FutureInstallments";
import { render, screen } from "@testing-library/react";
import { futureOrdersResponse } from "../../utils/mockDataResponses";
import { PaymentContextProvider } from "../../contexts/PaymentContext";

const title = /Cuotas futuras/i;
const subTitle = /Dale click para expandir/i;

describe("FutureInstallments", () => {
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
        <FutureInstallments orders={futureOrdersResponse} />
      </PaymentContextProvider>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText(subTitle)).not.toBeInTheDocument();

    futureOrdersResponse.forEach((order) => {
      expect(screen.getByText(order.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${order.price_currency}$ ${order.price}`)
      ).toBeInTheDocument();
    });
  });
});
