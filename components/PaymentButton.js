import clsx from "clsx";
import { usePaymentContext } from "../contexts/PaymentContext";

const noop = () => {};

export default function PaymentButton({ onClick = noop }) {
  const { selectedOrders } = usePaymentContext();
  const hasSelectedOrders = selectedOrders.length > 0;

  if (!hasSelectedOrders) return null;

  return (
    <footer className="mx-auto my-0 h-20 w-full">
      <button
        onClick={onClick}
        disabled={!hasSelectedOrders}
        className={clsx(
          "fixed bottom-4 left-1/2 w-full max-w-[40rem] -translate-x-1/2 rounded-full bg-gray-800 p-4 text-xl text-white hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75",
          !hasSelectedOrders && "cursor-not-allowed"
        )}
      >
        IR A PAGAR
      </button>
    </footer>
  );
}
