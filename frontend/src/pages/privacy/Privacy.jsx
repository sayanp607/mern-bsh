import React from "react";
import "./privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <div className="privacy-content">
        <h5>
          Welcome to Bong Study Hub. We prioritize your privacy and are
          committed to protecting your personal information. This policy
          explains how we collect, use, and safeguard your data.
        </h5>

        <h2>Information We Collect</h2>
        <h5>
          We collect personal details such as your name, email address, and
          contact number when you register for our courses or interact with our
          website.
        </h5>

        <h2>How We Use Your Data</h2>
        <ul>
          <li>To provide guidance and support for WBJEE preparation.</li>
          <li>
            To send important course updates and mentorship notifications.
          </li>
          <li>To improve our website experience and services.</li>
        </ul>

        <h2>Cookies & Tracking</h2>
        <h5>
          We use cookies to enhance your experience on our platform. You can
          choose to disable cookies in your browser settings.
        </h5>

        <h2>Data Security</h2>
        <h5>
          Your information is securely stored, and we do not share your data
          with third parties without your consent.
        </h5>

        <h2>Contact Us</h2>
        <h5>
          If you have any questions about our privacy policy, reach out to us at{" "}
          <strong>support@bongstudyhub.com</strong>.
        </h5>
      </div>
    </div>
  );
};

export default Privacy;
