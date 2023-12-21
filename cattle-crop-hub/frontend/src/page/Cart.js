import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  
  const handlePayment = async () => {
    if (user.email) {
      try {
        // Create an array of product details to send to the server
        const orderedProducts = productCartItem.map((item) => ({
          productId: item._id,
          productName: item.name,
          quantity: item.qty,
          totalPrice: item.total,
        }));
  
        // Send a request to the server to create the order
        const orderResponse = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id, // Assuming user has an _id property
            products: orderedProducts,
          }),
        });
  
        if (orderResponse.ok) {
          // If the order is created successfully, proceed to payment
          toast('Order created successfully');
        } else {
          // Handle specific errors based on response status
          if (orderResponse.status === 400) {
            toast('Bad request. Please check your data.');
          } else if (orderResponse.status === 500) {
            toast('Server error. Please try again later.');
          } else {
            toast('Failed to create order. Please try again.');
          }
        }
      } catch (error) {
        console.error(error);
        toast('An unexpected error occurred. Please try again.');
      }
    } else {
      toast('You have not logged in!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  
  return (
    <>
    
      <div className="p-2 md:p-4 min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
        <div className="my-4 flex gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-blue-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-blue-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Place order
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </>
  );
};

export default Cart;