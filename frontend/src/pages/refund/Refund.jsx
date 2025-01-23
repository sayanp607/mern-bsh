import React from "react";
import "./refund.css"; // Assuming CSS is in RefundPolicy.css

const RefundPolicy = () => {
  return (
    <div className="refund-container">
      <h1>Refund/Cancellation Policy</h1>
      <form className="refund-form">
        <p>
          You are entitled to a refund in the case of the purchased course not
          being assigned to you within the expiration date from your date of
          purchase or if you have paid twice for the same course.
        </p>
        <p>
          Under any other circumstance, we will not consider any requests for
          refund as this is a digital course purchase.
        </p>
      </form>
    </div>
  );
};

export default RefundPolicy;
