import PaidInstallments from "./PaidInstallments";
import { render, screen } from "@testing-library/react";
import { paidOrdersResponse } from "../../utils/mockDataResponses";
import userEvent from "@testing-library/user-event";

const title = /Cuotas pagadas/i;
const subTitle = /Dale click para expandir/i;

describe("PaidInstallments", () => {
  it("should render correctly", () => {
    render(<PaidInstallments orders={paidOrdersResponse} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subTitle)).toBeInTheDocument();
    userEvent.click(screen.getByText(title));
    expect(screen.queryByText(subTitle)).not.toBeInTheDocument();

    paidOrdersResponse.forEach((order) => {
      expect(screen.getByText(order.name)).toBeInTheDocument();
    });
  });
});
