import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../../context/UserContext";
const Test = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { user, isAuth } = UserData();
  // Check if payment is already successful
  useEffect(() => {
    const status = localStorage.getItem("paymentSuccess");
    if (status === "true") {
      setPaymentSuccess(true);
    }
  }, []);

  const handlePayment = async () => {
    try {
      // Create an order
      const { data: order } = await axios.post(
        `http://localhost:5000/api/payment/create-order`,
        {
          amount: 500, // Amount in INR
          currency: "INR",
        }
      );

      const options = {
        key: "rzp_test_W4QHp3KSrawzYv", // Add Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: "Batch Payment",
        description: "Payment for batch details PDF",
        order_id: order.id,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            `http://localhost:5000/api/payment/verify-payment`,
            response
          );
          if (verifyResponse.data.success) {
            // Payment is successful, store the success flag
            localStorage.setItem("paymentSuccess", "true");
            setPaymentSuccess(true);
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
      <h1>Test Series Purchase</h1>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {!paymentSuccess ? (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <img
                      src="/logo.jpg" // Replace with the actual image URL
                      alt="Batch"
                      style={{
                        width: "400px",
                        height: "400px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <p>
                    <strong>Batch Name:</strong> WBJEE Test Series Batch
                  </p>
                  <p>
                    <strong>Price:</strong> ₹500
                  </p>
                  <button
                    onClick={handlePayment}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <div>
                  <h3>Thank you for your payment!</h3>
                  <p>Your batch details PDF is ready to download:</p>
                  <a
                    href="/react.pdf" // Replace with the actual PDF file URL
                    download
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      textDecoration: "none",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Download PDF
                  </a>
                </div>
              )}
            </>
          ) : (
            <div>
              <h3>Hello admin!</h3>
              <p>Your test series PDF is ready to download:</p>
              <a
                href="/react.pdf" // Replace with the actual PDF file URL
                download
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  textDecoration: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Download PDF
              </a>
            </div>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}
      {/* {!paymentSuccess ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <img
              src="/logo.jpg" // Replace with the actual image URL
              alt="Batch"
              style={{ width: "300px", height: "200px", borderRadius: "10px" }}
            />
          </div>
          <p>
            <strong>Batch Name:</strong> WBJEE Premium Counseling Batch
          </p>
          <p>
            <strong>Price:</strong> ₹99
          </p>
          <button
            onClick={handlePayment}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Buy Now
          </button>
        </>
      ) : (
        <div>
          <h3>Thank you for your payment!</h3>
          <p>Your batch details PDF is ready to download:</p>
          <a
            href="/react.pdf" // Replace with the actual PDF file URL
            download
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              textDecoration: "none",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Download PDF
          </a>
        </div>
      )} */}
    </div>
  );
};

export default Test;
