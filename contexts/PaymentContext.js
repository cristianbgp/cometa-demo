import { createContext, useContext, useMemo, useState } from "react";

const PaymentContext = createContext();

export function PaymentContextProvider({ children, value }) {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const addToSelectedOrders = (order) => {
    setSelectedOrders([...selectedOrders, order]);
  };

  const removeFromSelectedOrders = (order) => {
    setSelectedOrders(selectedOrders.filter((o) => o.id !== order.id));
  };

  const totalPayment = useMemo(() => {
    return selectedOrders.reduce((total, order) => {
      let newTotal = total + Number(order.price);
      if (Boolean(order.interest) && order.interest !== "None") {
        newTotal = newTotal + Number(order.interest);
      }
      return newTotal;
    }, 0);
  }, [selectedOrders]);

  const currency = useMemo(() => {
    return selectedOrders.length > 0
      ? selectedOrders[0].price_currency
      : undefined;
  }, [selectedOrders]);

  return (
    <PaymentContext.Provider
      value={{
        selectedOrders,
        totalPayment,
        addToSelectedOrders,
        removeFromSelectedOrders,
        currency,
        ...value,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  return useContext(PaymentContext);
}
