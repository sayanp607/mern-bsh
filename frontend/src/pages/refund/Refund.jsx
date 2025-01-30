import React from "react";
import "./refund.css"; // Assuming CSS is in RefundPolicy.css

const RefundPolicy = () => {
  return (
    <div className="refund-container">
      <h1>Refund/Cancellation Policy</h1>
      <form className="refund-form">
        <h2>
          You are entitled to a refund in the case of the purchased course not
          being assigned to you within the expiration date from your date of
          purchase or if you have paid twice for the same course.
        </h2>
        <h2>
          Under any other circumstance, we will not consider any requests for
          refund as this is a digital course purchase.
        </h2>
      </form>
    </div>
  );
};

export default RefundPolicy;
