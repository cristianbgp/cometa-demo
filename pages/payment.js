import { SpeakerphoneIcon } from "@heroicons/react/outline";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Error from "next/error";
import Card from "../components/Card";
import CollapseCard from "../components/CollapseCard";
import Header from "../components/Header";
import Layout from "../components/Layout";
import PaymentButton from "../components/PaymentButton";
import { usePaymentContext } from "../contexts/PaymentContext";
import { getData } from "./api/all-data";

function SelectedOrdersSection({ orders }) {
  const { selectedOrders, removeFromSelectedOrders, addToSelectedOrders } =
    usePaymentContext();
  const hasSelectedOrders = selectedOrders.length > 0;

  if (!hasSelectedOrders) {
    return (
      <div className="m-16 flex flex-col items-center justify-center">
        <SpeakerphoneIcon className="mb-4 h-8 w-8" />
        <p className="font-bold">Ningún pago ha sido seleccionado</p>
      </div>
    );
  }

  const { pendingOrders, futureOrders } = orders;

  const restPendingOrFutureOrders = [...pendingOrders, ...futureOrders]
    .filter(
      (order) =>
        !selectedOrders.some((selectedOrder) => selectedOrder.id === order.id)
    )
    .sort((a, b) => new Date(a.due) - new Date(b.due));

  const hasRestPendingOrFutureOrders = restPendingOrFutureOrders.length > 0;

  const selectedOrdersSorted = selectedOrders.sort(
    (a, b) => new Date(a.due) - new Date(b.due)
  );

  const addNextOrder = () => {
    const nextOrder = restPendingOrFutureOrders[0];
    if (nextOrder) {
      addToSelectedOrders(nextOrder);
    }
  };

  return (
    <div className="my-4">
      <p className="mx-4 my-4 font-bold">
        {selectedOrders.length} Pagos Seleccionados
      </p>
      {selectedOrdersSorted.map((order, index) => {
        const lastOne = index === selectedOrders.length - 1;
        let totalPrice = Number(order.price);
        if (Boolean(order.interest) && order.interest !== "None") {
          totalPrice = totalPrice + Number(order.interest);
        }

        return (
          <CollapseCard
            key={order.id}
            title={order.name}
            leftContent={
              lastOne ? (
                <span
                  className="flex rounded-full p-2 hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75"
                  onClick={() => removeFromSelectedOrders(order)}
                  onKeyDown={() => removeFromSelectedOrders(order)}
                  role="button"
                  tabIndex="0"
                  aria-label="Eliminar"
                >
                  <TrashIcon className="h-5 w-5" />
                </span>
              ) : null
            }
            rightContent={`${order.price_currency}$ ${totalPrice}`}
            className="!mt-0 !rounded-none border-b"
          >
            <div className="flex justify-between">
              <p className="text-sm">Costo</p>
              <span className="mr-10 text-sm font-light">{`${order.price_currency}$ ${order.price}`}</span>
            </div>
            {order.interest && order.interest !== "None" && (
              <div className="flex justify-between">
                <p className="text-sm">Interés</p>
                <span className="mr-10 text-sm font-light">{`${order.price_currency}$ ${order.interest}`}</span>
              </div>
            )}
            <p className="text-sm">
              Vence el{" "}
              {format(new Date(order.due), "dd 'de' MMM", {
                locale: es,
              })}
            </p>
          </CollapseCard>
        );
      })}
      {hasRestPendingOrFutureOrders && (
        <button
          onClick={addNextOrder}
          className="flex w-full items-center justify-between bg-white p-4 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75"
        >
          <span className="font-light">Agregar otro mes para pagar</span>
          <PlusCircleIcon className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}

function PaymentSection() {
  const { totalPayment, currency } = usePaymentContext();
  const hasPayment = totalPayment > 0;

  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-2xl -translate-x-1/2 bg-white p-4">
      <div className="my-4 flex justify-between text-lg font-light">
        <p className="text-xl font-bold">Total a pagar</p>
        <p className="text-2xl font-bold">
          {hasPayment ? `${currency}$ ${totalPayment}` : "$ ---"}
        </p>
      </div>
      <PaymentButton />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getData();
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { error: error.message } };
  }
}

export default function PaymentPage({ data, error }) {
  if (error) {
    return <Error statusCode="500" />;
  }

  const { student, orders } = data;
  const { first_name, last_name, cohort } = student;

  return (
    <Layout>
      <Header school={student.school} />
      <main className="mb-60">
        <Card className="m-4">
          <div className="flex justify-between font-light">
            <p>
              {first_name} {last_name}
            </p>
            <p>{cohort}</p>
          </div>
        </Card>
        <SelectedOrdersSection orders={orders} />
      </main>
      <PaymentSection />
    </Layout>
  );
}
