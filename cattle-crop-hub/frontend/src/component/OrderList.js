// OrderList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../redux/orderSlice";

const OrderList = ({ userId }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const status = useSelector((state) => state.order.status);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    // Fetch orders when the component mounts
    dispatch(fetchOrders(userId));
  }, [dispatch, userId]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      {orders.map((order) => (
        <div key={order._id} className="border border-gray-300 bg-blue-200 rounded border border-slate-300 rounded p-4 mb-8">
          <p className="text-xl font-semibold mb-2">Order ID: {order._id}</p>
          <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p className="text-xl mt-2">User: {order.userId.firstName} {order.userId.lastName}</p>
          <h3 className="text-xl font-semibold mt-4">Products:</h3>
          <table className="min-w-full border border-collapse border-gray-300 bg-blue-500 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b text-center">{product.productName}</td>
                  <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">{product.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
