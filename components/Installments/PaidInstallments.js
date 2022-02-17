import { CheckIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CollapseCard from "./../CollapseCard";

function PaidItem({ order }) {
  console.log(order);
  let totalPrice = Number(order.price);
  if (Boolean(order.interest) && order.interest !== "None") {
    totalPrice = totalPrice + Number(order.interest);
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-light">{order.name}</p>
        <p className="text-sm font-light">
          Pagado el{" "}
          {format(new Date(order.payin.created), "dd 'de' MMM", {
            locale: es,
          })}
        </p>
      </div>
      <div className="flex items-center">
        <p className="mr-4 font-light">
          {order.price_currency}$ {totalPrice}
        </p>
        <CheckIcon className="h-8 w-8 text-gray-400" />
      </div>
    </div>
  );
}

export default function PaidInstallments({ orders }) {
  return (
    <CollapseCard title="Cuotas pagadas" subTitle="Dale click para expandir">
      {orders.map((order) => (
        <PaidItem key={order.id} order={order} />
      ))}
    </CollapseCard>
  );
}
