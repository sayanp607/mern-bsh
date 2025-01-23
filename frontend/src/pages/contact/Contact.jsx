import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showNumber, setShowNumber] = useState(false);

  // Check if payment is already successful
  useEffect(() => {
    const paymentStatus = localStorage.getItem("paymentSuccess");
    if (paymentStatus === "true") {
      setShowNumber(true);
    }
  }, []);

  const handlePayment = async () => {
    try {
      // Create an order
      const { data: order } = await axios.post(
        `http://localhost:5000/api/payment/create-order`,
        {
          amount: 99, // Amount in INR
          currency: "INR",
        }
      );

      const options = {
        key: "rzp_test_W4QHp3KSrawzYv", // Add Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: "Contact Us Payment",
        description: "Payment for showing phone number",
        order_id: order.id,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            `http://localhost:5000/api/payment/verify-payment`,
            response
          );
          if (verifyResponse.data.success) {
            // Payment is successful, store the success flag
            localStorage.setItem("paymentSuccess", "true");
            setShowNumber(true);
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Councelling</h1>
      <p>
        For any kind of batch related problems or WBJEE related questions, feel
        free to have a "one to one doubt solution" after a payment.
      </p>
      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "yellow",
        }}
      >
        Pay Now
      </button>
      {showNumber && <h3>Contact Number: +91-98832 84104</h3>}
    </div>
  );
};

export default ContactUs;
