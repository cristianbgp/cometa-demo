import { render, screen } from "@testing-library/react";
import { PaymentContextProvider } from "../contexts/PaymentContext";
import { studentResponse } from "../utils/mockDataResponses";
import Summary from "./Summary";

const student = studentResponse;
const totalPayment = 5000;
const currency = "PEN";

describe("Summary", () => {
  it("should render correctly", () => {
    render(
      <PaymentContextProvider value={{ totalPayment, currency }}>
        <Summary student={student} />
      </PaymentContextProvider>
    );
    expect(
      screen.getByText(`${student.first_name} ${student.last_name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(student.cohort)).toBeInTheDocument();
    expect(screen.getByText(/total a pagar/i)).toBeInTheDocument();
    expect(
      screen.getByText(`${currency}$ ${totalPayment}`)
    ).toBeInTheDocument();
  });

  it("should render empty total payment", () => {
    render(
      <PaymentContextProvider value={{ totalPayment: 0 }}>
        <Summary student={student} />
      </PaymentContextProvider>
    );
    expect(screen.getByText(/total a pagar/i)).toBeInTheDocument();
    expect(screen.getByText(/---/)).toBeInTheDocument();
  });
});
