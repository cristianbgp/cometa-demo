export async function getData() {
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
    student,
    orders: {
      paidOrders,
      pendingOrders,
      futureOrders,
    },
  };
}

export default async function handler(_request, response) {
  try {
    const data = await getData();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
