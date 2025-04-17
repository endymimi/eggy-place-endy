import React, { useContext, useEffect, useState } from "react";
import UseTitle from "../Hooks/UseTitle";
import CartSummary from "../components/CartSummary";
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import paystackLogo from "../assets/paystack-22011114164191027495287.png";
import { useAuth } from "../context/AuthContext";
import PaystackPop from "@paystack/inline-js";
import { calculateTotalPrice } from "../utils/CartUtils";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const PK = import.meta.env.VITE_TEST_PUBLIC
const baseUrl = import.meta.env.VITE_API_URL;


const CheckOut = () => {
  UseTitle("let's checkout");
  const {cart} = useContext(CartContext)
  const {user} = useAuth();
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
      email: recipientInfo.email,
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
            console.log(response);
            
            navigate("/orders")
          } else {
            alert(data.errMsg || "Failed to create order.");
          }
        } catch (err) {
          // console.log(err.message);
          
          alert("Something went wrong while submitting the order.", err.message);
        }
      },
      onCancel() {
        alert("Transaction was cancelled.");
      },
    });
  };
  // const handlePayNow =async () => {
  //   const recipientInfo = JSON.parse(sessionStorage.getItem("recipientInfo"));
  //   const deliveryAddress = JSON.parse(sessionStorage.getItem("deliveryAddress"));
  
  //   if (!recipientInfo) {
  //     alert("Please fill in the recipient information.");
  //     return;
  //   }
  
  //   if (!deliveryAddress) {
  //     alert("Please add a delivery address.");
  //     return;
  //   }
  
  //   if (!user) {
  //     alert("You need to be signed in to continue.");
  //     return;
  //   }
  //   const req = await fetch(`http://localhost:4040/api/order`,{
       
  //   });
  //   const res = await req.json();
  //   console.log(res);
    

  //   if(recipientInfo || deliveryAddress || user){
  //     const paystackInstance = new PaystackPop();
  //     const onSuccess = (transaction) =>
  //       {alert(`Succesful! Ref: ${transaction.reference}`)}
  //     paystackInstance.newTransaction({
  //       key: PK,
  //       email:recipientInfo.email,
  //       amount:totalPrice  * 100,
  //       onSuccess,
  //       onCancel(){
  //         alert("cancelled transaction")
  //       }
  //     });
  //   }  };
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
          <div className="bg-[#252422] py-3  px-3 rounded-lg  ">
            <div className="text-[#FFFFFF] border-b-1  border-[#FBFBFB] pb-3 flex justify-between">
              <h1 className="text-[18px] md:text-[24px] font-[500]">
                Recipient Information
              </h1>
              <button
                className="cursor-pointer text-[#B67B0F] text-[20px] md:text-[18px] font-[400]  "
                onClick={handleFormActivity}
              >
                 {savedInfo ? "Edit" : "Add"}

              </button>
              <dialog id="my_modal_1" className="modal ">
                <div className="modal-box bg-[#100101]  ">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                      document.getElementById("my_modal_1").close();
                    }}
                  >
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>

                    <h3 className="font-bold text-lg">Add Contact Info</h3>
                    <p className="py-4">
                      Who do you want your order to be delivered to?
                    </p>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Full Name *</label>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        required
                        value={recipientInfo.fullName}
                        onChange={handleChange}
                        name="fullName"
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">Phone Number *</label>
                      <Input
                        type="text"
                        required
                        maxlength="11"
                        minlength="11"
                        pattern="^0[789][01]\d{8}$"
                        placeholder="e.g 0700000000"
                        value={recipientInfo.phoneNumber}
                        onChange={handleChange}
                        name="phoneNumber"
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">Email *</label>
                      <Input
                        placeholder="Email address"
                        type="email"
                        required
                        value={recipientInfo.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                    <div>
                      <MyButton
                        text="Add Contact Info"
                        className="w-full h-[45px] font-[500] text-[20px]"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
            <div>
              {savedInfo && (
                <div className="flex  flex-col gap-3 py-3">
                  <p className="font-[500] text-[white] text-[18px]">
                    {savedInfo.fullName}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedInfo.phoneNumber}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedInfo.email}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/*div-2  */}
          <div className="bg-[#252422] py-10 px-3 rounded-lg  ">
            <div className="text-[#FFFFFF] border-b-1 border-[#FBFBFB] pb-3 flex justify-between">
              <h1 className="text-[18px] md:text-[24px] font-[500]">
                Delivery Address
              </h1>
              <button
                className="cursor-pointer text-[#B67B0F] text-[20px] md:text-[18px] font-[400]  "
                onClick={handleFormActivity2}
              >
                {savedAddress ? "Edit" : "Add"}

              </button>
              <dialog id="my_modal_02" className="modal ">
                <div className="modal-box bg-[#100101]">
                  <form
                    method="dialog"
                    onSubmit={(e) => {
                      handleSubmitAddress(e);
                      document.getElementById("my_modal_02").close();
                    }}
                  >
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>

                    <h3 className="font-bold text-lg">Add Address</h3>
                    <p className="py-4">
                      Where do you want your order to be delivered to?
                    </p>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Address *</label>
                      <Input
                        placeholder="Address"
                        type="text"
                        required
                        name="address"
                        value={deliveryAddress.address}
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">State *</label>
                      <Input
                        placeholder="state"
                        type="text"
                        required
                        name="state"
                        value={deliveryAddress.state}
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">City *</label>
                      <Input
                        placeholder="city"
                        type="text"
                        required
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleAddress}
                      />
                    </div>
                    <div>
                      <MyButton
                        text="Add Address"
                        className="w-full h-[45px] font-[500] text-[20px]"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
            <div>
              {savedAddress && (
                <div className="flex   gap-3 py-3 items-center">
                  <p className="font-[500] text-[white] text-[18px]">
                    {savedAddress.address}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedAddress.state}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedAddress.city}
                  </p>
                </div>
              )}
            </div>
          </div>
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
