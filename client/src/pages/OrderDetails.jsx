import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("customerToken");
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(res.data.order);
      } catch (err) {
        // console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="text-center text-white">Loading...</div>;

  if (!order)
    return (
      <div className="text-center text-red-400 mt-10">
        Order not found or you do not have access.
      </div>
    );

  const { status, paymentRef, totalPrice, recipientInfo, deliveryAddress } = order;

  return (
    <div className="wrapper min-h-screen  bg-[#1a1a1a] text-white px-4 py-8">
      <div className=" md:grid grid-cols-2 gap-20 bg-[#2a2a2a] rounded-lg shadow-md p-6 space-y-6">
       <div>
       <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4">
          Order Details
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === "paid"
                  ? "bg-green-600 text-white"
                  : "bg-yellow-600 text-black"
              }`}
            >
              {status.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payment Ref:</span>
            <span className="text-sm text-gray-200">{paymentRef}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Price:</span>
            <span className="text-lg font-semibold text-[#00ff88]">
              ₦{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <hr className="border-gray-600" />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recipient Info</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-gray-400">Full Name: </span>
              {recipientInfo?.fullName}
            </p>
            <p>
              <span className="text-gray-400">Email: </span>
              {recipientInfo?.email}
            </p>
            <p>
              <span className="text-gray-400">Phone Number: </span>
              {recipientInfo?.phoneNumber}
            </p>
          </div>
        </div>

        <hr className="border-gray-600" />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Delivery Address</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-gray-400">Address: </span>
              {deliveryAddress?.address}
            </p>
            <p>
              <span className="text-gray-400">City: </span>
              {deliveryAddress?.city}
            </p>
            <p>
              <span className="text-gray-400">State: </span>
              {deliveryAddress?.state}
            </p>
          </div>
        </div>
       </div>
       <div>

        {order?.orderItems?.length > 0 && (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Ordered Items</h3>
              <div className="">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#1f1f1f] rounded-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-700"
                  >
                    <img
                      src={item.image || "default-image-url"} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md border border-gray-600"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg text-[#00ff88]">{item.title}</p>
                      <p className="text-sm text-gray-400 mb-1">category: {item.category}</p>
                      <p className="text-sm text-gray-400">
                        Price: ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
       </div>

      </div>
    </div>
  );
};

export default OrderDetails;