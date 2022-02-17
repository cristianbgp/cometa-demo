import PaymentButton from "./PaymentButton";
import { render, screen } from "@testing-library/react";
import { PaymentContextProvider } from "../contexts/PaymentContext";
import { futureOrdersResponse } from "../utils/mockDataResponses";

const order = futureOrdersResponse[0];

describe("PaymentButton", () => {
  it("should render correctly", () => {
    render(
      <PaymentContextProvider value={{ selectedOrders: [order] }}>
        <PaymentButton />
      </PaymentContextProvider>
    );
    expect(screen.getByText(/ir a pagar/i)).toBeInTheDocument();
  });

  it("should not render if there are not orders", () => {
    render(
      <PaymentContextProvider value={{ selectedOrders: [] }}>
        <PaymentButton />
      </PaymentContextProvider>
    );
    expect(screen.queryByText(/ir a pagar/i)).not.toBeInTheDocument();
  });

  it("should call onClick", () => {
    const onClick = jest.fn();
    render(
      <PaymentContextProvider value={{ selectedOrders: [order] }}>
        <PaymentButton onClick={onClick} />
      </PaymentContextProvider>
    );
    screen.getByText(/ir a pagar/i).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
