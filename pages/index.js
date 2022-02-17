import Header from "../components/Header";
import Layout from "../components/Layout";
import {
  FutureInstallments,
  PaidInstallments,
  PendingInstallments,
} from "../components/Installments";
import Summary from "../components/Summary";
import PaymentButton from "../components/PaymentButton";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const hash = "OcJn4jYChW";

  const studentPromise = fetch(
    "http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/",
    {
      headers: {
        hash,
      },
    }
  ).then((res) => res.json());
  const orderPromise = fetch(
    "http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders/",
    {
      headers: {
        hash,
      },
    }
  ).then((res) => res.json());

  // eslint-disable-next-line no-undef
  const [student, orders] = await Promise.all([studentPromise, orderPromise]);

  const [paidOrders, pendingOrders, futureOrders] = orders.reduce(
    (acc, order) => {
      if (order.status === "PAID") {
        acc[0].push(order);
      } else if (order.status === "DUE") {
        acc[1].push(order);
      } else if (order.status === "OUTSTANDING") {
        acc[2].push(order);
      }
      return acc;
    },
    [[], [], []]
  );

  return {
    props: {
      data: {
        student,
        orders: {
          paidOrders,
          pendingOrders,
          futureOrders,
        },
      },
    },
  };
}

export default function IndexPage({ data }) {
  const {
    student,
    orders: { paidOrders, pendingOrders, futureOrders },
  } = data;
  const router = useRouter();

  const goToPaymentPage = () => {
    router.push({ pathname: "/payment" });
  };

  return (
    <Layout>
      <Header school={student.school} />
      <main className="p-4">
        <Summary student={student} />
        <PaidInstallments orders={paidOrders} />
        <PendingInstallments orders={pendingOrders} />
        <FutureInstallments orders={futureOrders} />
      </main>
      <PaymentButton onClick={goToPaymentPage} />
    </Layout>
  );
}
