// OrdersPlaced.js
import React from "react";
import OrderList from "../component/OrderList";
import { useSelector } from "react-redux";

const OrdersPlaced = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="">
      
      { <OrderList />}
    </div>
  );
};

export default OrdersPlaced;
