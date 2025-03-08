import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Calculate totals
  const totalAmount = getCartAmount() || 0;
  const finalTotal = totalAmount > 0 ? totalAmount + delivery_fee : 0;

  return (
    <div className="w-full">
      <div className="text-2xl ">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm pr-10">
        <div className="flex justify-between">
          <p className="font-semibold">SUB TOTAL:</p>
          <p>
            {currency} {totalAmount.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="font-semibold">SHIPPING FEE: </p>
          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>TOTAL: </b>
          <b>
            {currency} {finalTotal.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
