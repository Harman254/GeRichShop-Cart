"use client";
import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";
import { Content } from "next/font/google";
const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, TotalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <div className="text-center p-6">
      <img
        src="148767.png"
        width={50}
        height={50}
        alt="Success Icon"
        className="mx-auto mb-4"
      />
      <h2 className="font-bold text-3xl text-slate-800">
        Your Order Has Been Successfully Submitted
      </h2>
      <p className="text-lg text-slate-600">
        Thank you for choosing us for your shopping needs. We appreciate your
        business!
      </p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-black text-white rounded-md hover:shadow-xl hover:shadow-slate-700 hover:bg-slate-500">
          Continue Shopping
        </button>
      </div>
    </div>
  ) : (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-slate-700 px-4">Cart</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <CartLineItem
            key={item.sku}
            dispatch={dispatch}
            item={item}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))}
      </ul>
      <div className="cart_totals mt-8 p-4 bg-gray-100 rounded-lg  flex flex-col items-center">
        <p className="text-lg font-semibold">Total Items: {TotalItems}</p>
        <p className="text-lg font-semibold">Total Price: {totalPrice}</p>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg hover:b mt-4 w-1/2 hover:shadow-xl hover:shadow-slate-700"
          onClick={onSubmitOrder}
          disabled={!TotalItems}
        >
          Place Order
        </button>
      </div>
    </>
  );

  const Content = <main className="main">{pageContent}</main>;

  return Content;
};

export default Cart;
