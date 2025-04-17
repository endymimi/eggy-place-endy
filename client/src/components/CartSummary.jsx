import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import MyButton from "./MyButton";
import { calculateTotalPrice } from "../utils/CartUtils";
import {useNavigate,useLocation} from "react-router-dom"

const CartSummary = ({handlePayNow}) => {
  const { cart } = useContext(CartContext);
  const totalPrice = calculateTotalPrice(cart);
const location = useLocation()

  // console.log(location.pathname);
  
  const navigate = useNavigate()
  function handleCheckOut (){
    navigate("/check-out")
  }

  return (
    <section className="p-[15px] rounded-[10px] bg-black w-full h-fit mt-3 sticky top-31 ">
      <h1 className="font-[500] text-[24px] pb-[15px]">Summary</h1>
      <div className="bg-[#252422] p-[10px] rounded-[8px] w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-[400] text-[18px]">
            {" "}
            Product Total({cart.length}){" "}
          </h3>
          <p className="text-[#B67B0F] font-[500] text-[18px] ">
            <span>&#8358;</span>
            <span className="ms-1">{totalPrice}</span>
          </p>
        </div>
        <div className="flex justify-between items-center   ">
          <h3 className="font-[400] text-[18px]">VAT </h3>
          <p className="text-[#B67B0F] font-[500] text-[18px]">
            <span>&#8358; </span>
            1000
          </p>
        </div>
        <div className="flex justify-between items-center   ">
          <h3 className="font-[400] text-[18px]">Delivery </h3>
          <p className="text-[#B67B0F] font-[500] text-[18px]">
            <span>&#8358; </span>
            1500
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center font-[600] text-[18px]  ">
          <h1>Total </h1>
          <p className="text-[#B67B0F]">
            <span>&#8358; </span> {(totalPrice + 2500).toLocaleString()}{" "}
          </p>
        </div>
      </div>
      <div className="mt-4">
        {location.pathname === "/check-out" ? <>
          <MyButton
          text="Pay Now"
          className="w-full h-[56px] text-[20px] font-[500]"
          onClick={handlePayNow}
          // onClick={handleCheckOut}
          // disabled={true}
        />
        </> : <>
          <MyButton
          text="Check Out"
          className="w-full h-[56px] text-[20px] font-[500]"
          onClick={handleCheckOut}
        />
        </>}
       
      </div>
    </section>
  );
};

export default CartSummary;
