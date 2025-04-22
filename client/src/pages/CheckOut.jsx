import React, { useContext, useEffect, useState } from "react";
import UseTitle from "../Hooks/UseTitle";
import CartSummary from "../components/CartSummary";
import paystackLogo from "../assets/paystack-22011114164191027495287.png";
import { useAuth } from "../context/AuthContext";
import PaystackPop from "@paystack/inline-js";
import { calculateTotalPrice } from "../utils/CartUtils";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Recipient from "../features/checkout/Recipient";
import Delivery from "../features/checkout/Delivery";

const PK = import.meta.env.VITE_TEST_PUBLIC
const baseUrl = import.meta.env.VITE_API_URL;

const CheckOut = () => {
  UseTitle("let's checkout");
  const {cart} = useContext(CartContext)
  const {user} = useAuth();
  // console.log(typeof user);
  // console.log(user);
  
  const navigate = useNavigate()
  const [savedInfo, setSavedInfo] = useState(null);
  const token = localStorage.getItem("customerToken")
  const [recipientInfo, setRecipientInfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    state: "",
    address: "",
    city: "",
  });
  const totalPrice = calculateTotalPrice(cart) + 2500;

  const handlePayNow = async () => {
    const recipientInfo = JSON.parse(sessionStorage.getItem("recipientInfo"));
    const deliveryAddress = JSON.parse(sessionStorage.getItem("deliveryAddress"));
  
    if (!recipientInfo) return alert("Please fill in the recipient information.");
    if (!deliveryAddress) return alert("Please add a delivery address.");
    if (!user) return alert("You need to be signed in to continue.");
  
    const paystackInstance = new PaystackPop();
  
    paystackInstance.newTransaction({
      key: PK,
      email: user.email,
      amount: totalPrice * 100,
      onSuccess: async (transaction) => {
        try {
          const response = await fetch(`${baseUrl}/api/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({
              orderItems: cart,
              recipientInfo,
              deliveryAddress,
              totalPrice,
              paymentRef: transaction.reference,
            }),
          });
  
          const data = await response.json();
  
          if (data.success) {
            alert(` ${data.message} ${transaction.reference}`);
            
            navigate("/orders")
          } else {
            alert(data.errMsg || "Failed to create order.");
          }
        } catch (err) {          
          alert("Something went wrong while submitting the order.", err.message);
        }
      },
      onCancel() {
        alert("Transaction was cancelled.");
      },
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipientInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("recipientInfo", JSON.stringify(recipientInfo));

    setSavedInfo(recipientInfo);

    setRecipientInfo({
      fullName: "",
      phoneNumber: "",
      email: "",
    });
  };

  const stored = sessionStorage.getItem("recipientInfo");
const handleFormActivity = function(){
  document.getElementById("my_modal_1").showModal();
  if (stored) {
    setRecipientInfo(JSON.parse(stored));
  }
}
// delivery info

const handleAddress = (e) => {
  const { name, value } = e.target;
  setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
};
const handleSubmitAddress = (e) => {
  e.preventDefault();
  
  sessionStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));
  
  setSavedAddress(deliveryAddress);
  
  setDeliveryAddress({
      fullName: "",
      phoneNumber: "",
      email: "",
    });
  };
  const stored2 = sessionStorage.getItem("deliveryAddress");
  const handleFormActivity2 = function(){
  document.getElementById("my_modal_02").showModal() ; 
  if (stored2) {
    setDeliveryAddress(JSON.parse(stored2));
  }
  }
  useEffect(() => {
    const storedData = sessionStorage.getItem("recipientInfo");
    if (storedData) {
      setSavedInfo(JSON.parse(storedData));
    }
    // delivery add
    const storedDeliveryData = sessionStorage.getItem("deliveryAddress");
    if (storedDeliveryData) {
      setSavedAddress(JSON.parse(storedDeliveryData));
    }
  }, []);
  return (
    <>
      <main className="wrapper md:grid grid-cols-3 py-1 bg-[#2F2F2F] gap-6 ">
        {/* section-1 */}
        <section className="col-span-2 bg-[#100101] mt-3 p-4 flex flex-col justify-between gap-y-[14px] rounded-lg ">
          {/*div-1  */}
          <Recipient handleFormActivity={handleFormActivity} handleSubmit={handleSubmit} handleChange={handleChange} recipientInfo={recipientInfo} setRecipientInfo={setRecipientInfo} savedInfo={savedInfo} />
          {/*div-2  */}
          <Delivery  handleFormActivity2={handleFormActivity2} savedAddress={savedAddress} deliveryAddress={deliveryAddress} handleAddress={handleAddress} handleSubmitAddress={handleSubmitAddress}  setSavedAddress={setSavedAddress}/>
          {/*div-3  */}
          <div className="bg-[#252422] py-10 px-3 rounded-lg  ">
            <h1 className="text-[#FFFFFF] border-b-1 border-[#FBFBFB] pb-3">
              Payment Method
            </h1>
            <div className="mt-3 bg-white w-22">
              <img
                src={paystackLogo}
                alt="paystack-logo"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
        {/* section-2 */}
        <section className=" text-white">
          <CartSummary handlePayNow={handlePayNow}/>
        </section>
      </main>
    </>
  );
};

export default CheckOut;