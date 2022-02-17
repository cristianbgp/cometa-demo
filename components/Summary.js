import { usePaymentContext } from "../contexts/PaymentContext";
import Card from "./Card";

export default function Summary({ student }) {
  const { totalPayment, currency } = usePaymentContext();
  const { first_name, last_name, cohort } = student;

  const hasPayment = totalPayment > 0;

  return (
    <Card>
      <div className="mb-4 flex justify-between font-light">
        <p>
          {first_name} {last_name}
        </p>
        <p>{cohort}</p>
      </div>
      <div className="flex justify-between text-lg font-light">
        <p>Total a pagar</p>
        <p>{hasPayment ? `${currency}$ ${totalPayment}` : "$ ---"}</p>
      </div>
    </Card>
  );
}
