import Header from "../components/Header";
import Layout from "../components/Layout";
import {
  FutureInstallments,
  PaidInstallments,
  PendingInstallments,
} from "../components/Installments";
import Summary from "../components/Summary";
import PaymentButton from "../components/PaymentButton";
import { getData } from "./api/all-data";
import { useRouter } from "next/router";
import Error from "next/error";

export async function getServerSideProps() {
  try {
    const data = await getData();
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { error: error.message } };
  }
}

export default function IndexPage({ data, error }) {
  const router = useRouter();

  if (error) {
    return <Error statusCode="500" />;
  }

  const {
    student,
    orders: { paidOrders, pendingOrders, futureOrders },
  } = data;

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
