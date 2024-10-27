import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { PAYMENT_SERVER_URL } from "@/config/config";

const CheckoutReturnPage: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    const fetchSessionStatus = async () => {
      const response = await fetch(
        `${PAYMENT_SERVER_URL}/session-status?session_id=${sessionId}`
      );
      const data = await response.json();
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    };

    if (sessionId) {
      fetchSessionStatus();
    }
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default CheckoutReturnPage;
