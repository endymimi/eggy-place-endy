import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import MyButton from "../components/MyButton";

const PK = import.meta.env.VITE_TEST_PUBLIC_KEY

const Test = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  function payment(e){
    e.preventDefault();
    if(email || amount){
        const paystackInstance = new PaystackPop();
        const onSuccess = (transaction) =>
          {alert(`Succesful! Ref: ${transaction.reference}`),setEmail(""),setAmount("");}
        paystackInstance.newTransaction({
          key: PK,
          email,
          amount:amount * 100,
          onSuccess,
          onCancel(){
            alert("cancelled transaction")
          }
        });
      }
    

  }
  return (
    <>
      <form onSubmit={payment} className="wrapper border-8 border-red-300 bg-[#252422] h-130 ">
        <input required type="email" className="placeholder-white border border-white w-100 h-10" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/> <br /> <br />
        <input required type="number" className="placeholder-white border border-white w-100 h-10" placeholder="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/> <br /> <br />
        <div>

        <MyButton text="pay now" className="p-8" />
        </div>
      </form>
    </>
  );
};

export default Test;
