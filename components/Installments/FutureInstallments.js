import { format } from "date-fns";
import { es } from "date-fns/locale";
import CheckBox from "../Checkbox";
import { usePaymentContext } from "./../../contexts/PaymentContext";
import CollapseCard from "./../CollapseCard";

function FutureItem({ order }) {
  const { addToSelectedOrders, removeFromSelectedOrders, selectedOrders } =
    usePaymentContext();

  const handleOnChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      addToSelectedOrders(order);
    } else {
      removeFromSelectedOrders(order);
    }
  };

  const shouldBeChecked = selectedOrders.some(
    (selectedOrder) => selectedOrder.id === order.id
  );

  return (
    <div className="flex items-center justify-between font-light">
      <div>
        <p>{order.name}</p>
        <p className="text-sm">
          Vence el{" "}
          {format(new Date(order.due), "dd 'de' MMM", {
            locale: es,
          })}
        </p>
      </div>
      <div className="flex items-center">
        <div className="mx-4 flex flex-col items-end">
          <span>
            {order.price_currency}$ {order.price}
          </span>
        </div>
        <CheckBox shouldBeChecked={shouldBeChecked} onChange={handleOnChange} />
      </div>
    </div>
  );
}

export default function FutureInstallments({ orders }) {
  return (
    <CollapseCard
      title="Cuotas futuras"
      subTitle="Dale click para expandir"
      defaultOpen
    >
      {orders.map((order) => (
        <FutureItem key={order.id} order={order} />
      ))}
    </CollapseCard>
  );
}
